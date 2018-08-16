module.exports = {
	lintOnSave: false,
	configureWebpack: {
		entry: {
			app: './src/main.js'
		},
		resolve: {
			extensions: ['.js', '.vue', '.json'],
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
				$: 'jquery',
				jQuery: 'jquery',
				'swiper$': 'swiper',
				// 'jsSDK$':'weixin-js-sdk',
				// 'jsSDK$': resolve('/static/assets/js/jsSDK.js'),

				// 'swiper$': resolve('/src/assets/js/swiper/swiper.esm.bundle.js'),
				// 'moment$': resolve('/src/assets/js/moment/moment.min.js'),
			}
		},

		plugins: [
			'vux-ui',
			'progress-bar',
			{
				name: 'duplicate-style',
				options: {
					cssProcessorOptions: {
						safe: true,
						zindex: false,
						autoprefixer: {
							add: true,
							browsers: [
								'iOS >= 7',
								'Android >= 4.1'
							]
						}
					}
				}
			},
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				swiper: 'Swiper',
				// jsSDK: 'weixin-js-sdk',
				// moment:'moment'
			}),
			// new webpack.ContextReplacementPlugin(
			//   /moment[\/\\]locale$/,
			//   /zh-cn/
			// ),
		]
	}

};
