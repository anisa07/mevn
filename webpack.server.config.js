/* eslint-disable global-require */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config');

const webpackConfig = merge(baseWebpackConfig, {
	target: 'node',
	entry: {
		app: './src/entry-server.js',
	},
	devtool: false,
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'server.bundle.js',
		libraryTarget: 'commonjs2',
	},
	externals: Object.keys(require('./package.json').dependencies),
	optimization: {
		minimize: true,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': 'production',
		}),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 	},
		// }),
	],
});
module.exports = webpackConfig;
