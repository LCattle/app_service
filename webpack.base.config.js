var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var libDir = path.resolve(__dirname, './src');
console.log(libDir);
module.exports = {
  entry: {
    'partprice': ['./src/view/partprice/partprice'],
    'findparts': ['./src/view/findparts/findparts'],
    'examine': ['./src/view/examine/examine'],
    'satisfaction': ['./src/view/satisfaction/satisfaction'],
  },
  output: {
    path: __dirname + '/build',
    //publicPath: '/',
    filename: 'static/js/[name].js'
  },
  resolve: {
    //  第一项扩展非常重要，千万不要忽略，否则经常出现模块无法加载错误
    extensions: [' ', '.js', '.es6']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      },
      // {
      //   test: /\.svg$/i, loader: 'inline'
      // },
      // { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" },
      {
        test: /\.woff$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'static/hd/css/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.ttf$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: 'static/css/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: 'static/css/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.eot$/,
        loader: "file-loader",
        query: {
          name: 'static/css/[name].[ext]?[hash:7]'
        }
      },
      {
        // test: /\.(png|jpg|gif|svg)$/,
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          limit: 8000,
          name: 'static/img/[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ]
}