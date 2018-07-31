(function ($, window) {

	'use strict';


	$.extend({
		remResizing: function (options) {
			options = $.extend({
				fontSize: 16,
				baseline: 320,
				threshold: 0,
				basedOnNarrow: false,
				basedOnWide: false,
				dropOff: false,
				alignCenter: false,
				inward: false
			}, options);
			let htmlEl = $('html'),
				bodyEl = $('body'),
				frontLine = $(window).width(),
				windowHeight = $(window).height();
			let sizeConstraint = function () {
				if (options.basedOnNarrow) {
					orientationSensor({
						portrait: function () {
							frontLine = $(window).width(),
								windowHeight = $(window).height();
						},
						landscape: function () {
							frontLine = $(window).height(),
								windowHeight = $(window).width();
						}
					});
				} else {
					frontLine = $(window).width(),
						windowHeight = $(window).height();
				}
				let factor = 0;
				if (options.baseline === 0) {
					//alert('当最小宽度等于0时')
					factor = 1;
				} else if (frontLine <= options.baseline) {
					//alert('当最小宽度不等于0且屏幕宽度小于等于最小宽度时')
					if (options.inward) {
						factor = frontLine / options.threshold;
					} else {
						factor = frontLine / options.baseline;
					}
				} else if (frontLine > options.baseline && frontLine <= options.threshold || options.threshold === 0) {
					//alert('当屏幕宽度大于最小宽度且小于等于最大宽度，或没有最大宽度时')
					if (options.threshold >= 0) {
						if (options.inward) {
							factor = frontLine / options.threshold;
						} else {
							factor = frontLine / options.baseline;
						}
					}
				} else if (frontLine > options.threshold) {
					//alert('当屏幕宽度大于最大宽度时')
					factor = frontLine / options.threshold;

					if (options.alignCenter) {
						bodyEl.css({
							margin: '0 auto',
							width: options.threshold
						});
					} else {
						bodyEl.css('margin', 0);
					}
					// if (options.dropOff) {
					//  alert('dsadas')
					//  htmlEl.css('font-size', 'none');
					//  return;
					// };
				}
				htmlEl.css('font-size', options.fontSize * factor);
				if (options.dropOff && frontLine > options.threshold) {
					// alert('dsadas')
					htmlEl.css('font-size', '')
				}
			};
			if (options.baseline <= 0) {
				options.baseline = 1;
			}
			sizeConstraint();
			$(window).on('resize', function () {
				sizeConstraint();
			});

			//屏幕方向探测器
			function orientationSensor(callback) {
				let windowWidth = $(window).width(),
					windowHeight = $(window).height(),
					orientation = '';
				checkoritation();
				$(window).resize(function () {
					checkoritation();
				});

				function checkoritation() {
					if (typeof(callback) !== 'undefined') {
						if (windowWidth < windowHeight) {
							return callback.portrait();
						} else {
							return callback.landscape();
						}
					} else {
						callback = {
							portrait: function () {
							},
							landscape: function () {
							}
						}
					}
				}

				//console.log((frontLine < windowHeight) ? orientation = 'portrait' : orientation = 'landscape')
				return (windowWidth < windowHeight) ? orientation = 'portrait' : orientation = 'landscape';
			}
		},
	});

})(jQuery, window);
