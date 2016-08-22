/*jshintesversion: 6 */
var PROD = process.argv.indexOf('-p') >= 0;
var webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 要加两个插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageInfo = require('./package.json');

const outputPath = __dirname + '/dist/' + packageInfo.version;
const releasePath = __dirname + '/dist/release/';

module.exports = {
	//devtool: "source-map",    //生成sourcemap,便于开发调试
	entry: [
		"./index.js"
	],
	output: {
		path: outputPath, // 输出到版本号目录
		filename: PROD ? '[name]-[hash].min.js' : '[name]-[hash].js'
	},
	module: {
		loaders: [
			{
				test: /\.(png|jpg|jpeg|gif|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=8192'
			}, {
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				loader: 'file'
			},
			{
				test: /\.css$/,
				//loader: "style!css?modules!postcss"
				loader: ExtractTextPlugin.extract('style', 'css')
			},
			{
				test: /\.json$/,
				loader: "json"
			  }
		]
	},
  postcss: [
	require('autoprefixer')
  ],
	plugins: [
		new ExtractTextPlugin( PROD ? '[name]-[hash].min.css' : '[name]-[hash].css'),
		new webpack.BannerPlugin('This file is created by realeve'),
		new HtmlWebpackPlugin({
			title: packageInfo.description + packageInfo.version,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				collapseBooleanAttributes: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				minifyJS:true,
				minifyCSS:true,
				minifyURLs:true
			},
			template: 'index.html',
			hash: false
		}),
		//将公共代码抽离出来合并为一个文件
        //new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new CopyWebpackPlugin([
			// 打包出release
			{
				from: outputPath,
				to: releasePath,
				toType: 'dir'
			}
		]),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	],
	  devServer: {
		contentBase: "./dist/public",//本地服务器所加载的页面所在的目录
		colors: true,//终端中输出结果为彩色
		historyApiFallback: true,//不跳转
		inline: true//实时刷新
	  }, 
	  //devtool: 'source-map',//配置生成Source Maps，选择合适的选项
};