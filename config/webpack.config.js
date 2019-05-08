const path = require('path')
const webpack = require('webpack')
module.exports = {
    mode: 'development',
    entry: {
      // 配置入口文件
      main: path.resolve(__dirname, '../src/main.js')
    },
    output: {
      // 配置打包文件输出的目录
      path: path.resolve(__dirname, '../dist'),
      // 生成的 js 文件名称
      filename: 'js/[name].[hash:8].js',
      // 生成的 chunk 名称
      chunkFilename: 'js/[name].[hash:8].js',
      // 资源引用的路径
      publicPath: '/assets/'
    },
    devServer: {
      host: '127.0.0.1',
      hot: true,
      port: 3333,
      contentBase: './dist'
    },
    resolve: {
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