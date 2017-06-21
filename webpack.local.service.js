'use strict'

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
config.entry.partprice.unshift('webpack-dev-server/client?http://127.0.0.1:9005/', 'webpack/hot/dev-server');
var complier = webpack(config);
console.log('能代理到？');
var server = new WebpackDevServer(complier, {
    contentBase: '/',
    hot: true,
    historyApiFallback: false,
    proxy: {
        '/static/app_service/*': 'http://127.0.0.1:9696',
        '/static/js/*': 'http://127.0.0.1:9696'
    },
    quiet: false,
    noInfo: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 100
    },
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})
server.listen(9005, '0.0.0.0', function () {
    console.log('启动9005端口！');
})

