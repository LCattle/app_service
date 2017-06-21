var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.base.config');
var InlineResource = require('inline-resource-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//var CssSplitPlugin = require('css-split-webpack-plugin').default;
var StyleExtHtmlPlugin = require('style-ext-html-webpack-plugin');
const debug = process.env.NODE_ENV || 'production';
var libDir = path.resolve(__dirname, 'src');
//config.resolve.alias.serverApi = path.resolve(libDir, 'js/website_server_uat.js')
config.plugins = (config.plugins || []).concat([
  new webpack.ProvidePlugin({ //加载jq
    $: 'jQuery'
  }),
  // new webpack.LoaderOptionsPlugin({
  //   options: {
  //     postcss: function () {
  //       return [precss, autoprefixer];
  //     },
  //     devServer: {
  //       contentBase: "./public", //本地服务器所加载的页面所在的目录
  //       colors: true, //终端中输出结果为彩色
  //       historyApiFallback: true, //不跳转
  //       inline: true //实时刷新
  //     }
  //   }
  // }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin('static/css/[name].css?[hash]'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
  //new CssSplitPlugin({size: 4000}),
  new UglifyJsPlugin({ //压缩代码
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
        },
        except: ['$super', '$', 'exports', 'require'] //排除关键字
    }),
  //new webpack.IgnorePlugin('/^\cms.js&/')
]);

config.plugins.push(new webpack.HotModuleReplacementPlugin());

var rootName = __dirname;
var pageNames = Object.keys(config.entry);
var pageNames2 = [];
/*for (var i = 0; i < pageNames.length;  i++){
    if(pageNames[i] !== 'commons' && pageNames[i] !== 'vendor'){
        pageNames2[i] = pageNames[i];
    }
}*/
Array.from(pageNames).map((page) => {
  filename = config.entry[page] + '.html';
  console.log('filename = ' + filename)
  // if (page.indexOf('m_') !== -1) {
  //   filename = pageDirStr + page.substring(2) + '/m_index.html';
  // } else {
  //   filename = pageDirStr + page + '/index.html';
  // }
  pageName = page + '.html';
  var htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename: pageName,
    //template: path.resolve(__dirname, '.' + filename),
    template: './src/view/' + page + '/' + page + '.html',
    chunks: [page],
    cache: false,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  });
  config.plugins.push(htmlWebpackPlugin);
});

//var inlineResourcePlugin = new InlineResource({
    //compress: false,
    //rootpath: './src/pages/**/',
    //if you have only one html file,this list option can also be a character string.such as
    //list: './src/hello.html'
    //it can also be a file path string or file path array.such as
    //list: ['./src/hello.html']
    //or use glob,such as
    //list: ['./src/*.html']
    //list:['./src/pages/**/*.html']
    //list: './src/pages/**/*.html',
    //include: /\.html$/i

 // });
 /* 暂时先不支持inline
 Array.from(pageNames).map((page) => {
    var inlineResourcePlugin = new InlineResource({
        compile: true,
        compress: false,
        rootpath: './src/pages',
        template: './src/pages/' + page + '/' + page + '.html',
        test: /\.html$/i
    });
    config.plugins.push(inlineResourcePlugin);
  })*/
// eval-source-map is faster for development, conflict with StyleExtHtmlWebpackPlugin
config.devtool = 'cheap-source-map';

module.exports = config;
