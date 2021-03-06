const path = require('path')
const webpack = require('webpack')

module.exports = {
	entry: {
		client: './source/client/index.js',
	},
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.sass$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: () => [
						require('autoprefixer')
					]
				}
			}, {
				loader: 'sass-loader'
			}]
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
		})
	],
	resolve: {
		extensions: ['.js', '.jsx']
	}
}
