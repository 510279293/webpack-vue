const path = require('path')
const webpack = require('webpack')
module.exports = {
    mode: 'development',
    // 入口文件，路径相对于本文件所在的位置，可以写成字符串，数组，对象
    entry: {
      // 配置入口文件 path.resolve([from ...], to) 将to 参数解析成绝对路径
      main: path.resolve(__dirname, '../src/main.js')
    },
    output: {
      // 配置打包文件输出的目录
      path: path.resolve(__dirname, '../dist'),
      // 基于文件的md5生成Hash名称的script来防止缓存
      filename: 'js/[name].[hash:8].js',
      // 非主入口的文件名，即未被列在entry中，却又需要被打包出来的文件命名配置
      chunkFilename: 'js/[name].[hash:8].js',
      // 资源引用的路径, 设置这个属性会出现很多问题：
      // 1. 可以看成输出文件的另一种路径，差别路径是相对与生成的html文件
      // 2. 也可以看成网站运行时的访问路径
      // 3.该属性的好处在于当你配置了图片CDN的地址，本地开发时引用本地的图片资源，上线打包时就将资源全部指向CDN了，如果没有确定的发布地址不建议配置该属性，特别是在打包图片时，路径很容易出现混乱，如果没有设置，则默认从站点根目录加载
      publicPath: '/assets/'
    },
    devServer: {
      host: '127.0.0.1',
      hot: true,
      port: 3333,
      contentBase: './dist'
    },
    resolve: {
      // 模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js'
      }
    },
    module: {
        rules: [
            {
             test: /\.vue$/,
             use: [
               {
                 loader: 'cache-loader'
               },
               {
                 loader: 'thread-loader'
               },
               {
                 loader: 'vue-loader',
                 options: {
                   compilerOptions: {
                     preserveWhitespace: false
                   }
                 }
               }
             ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                      loader: 'babel-loader'
                    },
                    {
                      loader: 'thread-loader'
                    },
                    {
                      loader: 'babel-loader'
                    }
                ]
            },
            {
              test: /\.less$/,
              use: [
                {
                  loader: 'style-loader'
                },
                {
                  loader: 'css-loader'
                },
                {
                  loader: 'less-loader'
                },
                {
                  loader: 'postcss-loader'
                }
              ]
            },
            {
              test: /\.(jpe?g|png|gif)$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                          name: 'img/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
            {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'media/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 4096,
                    fallback: {
                      loader: 'file-loader',
                      options: {
                        name: 'fonts/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              ]
            },
        ]
    },
    plugins: [

    ]
}