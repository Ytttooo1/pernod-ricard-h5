require('./manifest-env')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
	devServer: {
		disableHostCheck: true,
		// 生产环境代理配置
		// proxy: {
		//   "/api": {
		//     target: "https://family.otype.com",
		//     ws: true,
		//     pathRewrite: {
		//       "^/api": "/api",
		//     },
		//   },
		// },
		// 测试环境代理配置
		proxy: {
			"/api": {
				//  target: "http://192.168.0.164:7081",
				target: "http://pernod-ricard.zhiytech.com:8011/api",
				ws: true,
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([{
				from: path.join(__dirname, '1495594893.txt'),
				to: path.join(__dirname, 'unpackage/dist', process.env.NODE_ENV === 'development' ?
					'dev' : 'build', process.env.UNI_PLATFORM, '1495594893.txt')
			}])
		]
	}
};