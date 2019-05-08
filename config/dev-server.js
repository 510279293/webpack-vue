const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.dev')
const app = express()

// app.get('/', function(req, res){
//     res.send('hello word')
// })

var compiler = webpack(config)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        color: true,
        chunks: false
    }
})

// 使用 webpack-hot-middleware 中间件，实现热加载
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// 为了修改html文件也能实现热加载，使用webpack插件来监听html源文件改变事件
compiler.plugin('compilation',function(compilation){
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb){
        // 发布事件
        hotMiddleware.publish({ action: 'reload' });
        cb();
    })
})

app.use(devMiddleware)
app.use(hotMiddleware)

app.listen(3333, function(err){
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:3333');
})