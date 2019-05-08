const path = require('path')
const webpackBaseConfig = require('./webpack.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

Object.keys(webpackBaseConfig.entry).forEach(function (name) {
  webpackBaseConfig.entry[name] = ['./config/dev-client'].concat(webpackBaseConfig.entry[name])
})
// 非常重要,若不配置则没有输出页面
webpackBaseConfig.output.publicPath = '/'
module.exports = merge(webpackBaseConfig, {
   devtool: 'cheap-module-eval-source-map',
   plugins: [
     new webpack.DefinePlugin({
       'process.env': {
         NODE_ENV: '"development"'
       }
     }),
     new HtmlwebpackPlugin({
       template: path.resolve(__dirname, '../public/index.html')
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