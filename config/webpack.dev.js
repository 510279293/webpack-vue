const path = require('path')
const webpackBaseConfig = require('./webpack.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


// 为了实现热加载，需要动态向入口配置中注入 webpack-hot-middleware/client ，路径相对于本文件所在的位置
// var devClient = 'webpack-hot-middleware/client';
// 为了修改html文件也能实现热加载，需要修改上面的devClient变量，引入同级目录下的dev-client.js文件
Object.keys(webpackBaseConfig.entry).forEach(function (name) {
  webpackBaseConfig.entry[name] = ['./config/dev-client'].concat(webpackBaseConfig.entry[name])
})
// 必须修改原配置中网站运行时的访问路径，相当于绝对路径，修改完之后，当前配置文件下的很多相对路径都是相对于这个来设定；
//非常重要,若不配置则没有输出页面，
// 注意：webpack-dev-server会实时的编译，但是最后的编译的文件并没有输出到目标文件夹，而是保存到了内存当中
webpackBaseConfig.output.publicPath = '/'

module.exports = merge(webpackBaseConfig, {
   // 启用source-map，开发环境下推荐使用cheap-module-eval-source-map
   devtool: 'cheap-module-eval-source-map',
   plugins: [
     new webpack.DefinePlugin({
       'process.env': {
         NODE_ENV: '"development"'
       }
     }),
     // 自动生成html插件，如果创建多个HtmlWebpackPlugin的实例，就会生成多个页面
     new HtmlwebpackPlugin({
       // 源文件，路径相对于本文件所在的位置
       template: path.resolve(__dirname, '../public/index.html'),
       // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
       inject: 'body',
       // hash如果为true，将添加hash到所有包含的脚本和css文件，对于解除cache很有用
       // minify用于压缩html文件，其中的removeComments:true用于移除html中的注释，collapseWhitespace:true用于删除空白符与换行符
     }),
     new webpack.NamedModulesPlugin(),
     new VueLoaderPlugin(),
     // 为组件分配ID, 通过这个插件webpack 可以分析和优先考虑使用最多的模块,并为他们分配最小的ID
     new webpack.optimize.OccurrenceOrderPlugin(),
     // 允许错误不打断程序
     new webpack.NoEmitOnErrorsPlugin(), 
     // 提取css单文件的名字，路径和生产环境下的不同，要与修改后的publickPath相结合
     new ExtractTextPlugin('[name].[contenthash].css'),
     // 模块热替换插件
     new webpack.HotModuleReplacementPlugin(),
     new CleanWebpackPlugin()

   ]
})