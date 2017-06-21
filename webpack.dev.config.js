var path  = require('path');
var webpack = require('webpack');
var config = require('./webpack.base.config');
var InlineResource = require('inline-resource-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CssSplitPlugin = require('css-split-webpack-plugin').default;
var StyleExtHtmlPlugin = require('style-ext-html-webpack-plugin');
var debug = process.env.NODE_ENV || 'production';
config.plugins = (config.plugins || []).concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('static/css/[name].css?[hash:5]'),
    new CssSplitPlugin({size: 4000})
]);
config.plugins.push(new webpack.HotModuleReplacementPlugin());
var rootName = __dirname;
var pageNames = Object.keys(config.entry);
Array.from(pageNames).map((page) => {
    filename = config.entry[page] + '.html';
    console.log(filename);
    pageName = page + '.html';
    var htmlWebpackPlugin = new HtmlWebpackPlugin({
        filename: pageName,
        template: './src/view/' + page + '/' + page + '.html',
        chunks: [page],
        cache: false,
        inject: true,
        minfy: {
            removeComments: true,
            coolapseWhitespace: true,
            removeAttributeQuotes: true
        }
    });
    
    config.plugins.push(htmlWebpackPlugin);
})

config.devtool = 'cheap-source-map';
module.exports = config;