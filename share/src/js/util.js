import $ from 'jquery';

let util = {};
util.install = function (Vue) {
  Vue.prototype.$initJSSDK = () => {
    let getSignatureRequest = 'account-service/1.0.0/weChat/getSignature';

      console.log('initJSSDK', location.href.split('#')[0])
    this.$http.post(this.$baseUrl + getSignatureRequest, {
      url: location.href.split('#')[0],
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        let ret = '';
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then(response => {
      console.log(response)

      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx67c26ff8068af257', // 必填，公众号的唯一标识
        timestamp: response.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
        signature: response.data.signature,// 必填，签名
        jsApiList: [
          'closeWindow', 'chooseWXPay', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'hideMenuItems'
        ] // 必填，需要使用的JS接口列表
      });
      wx.error(error => {
        console.log(error)
        alert('error')
      });
      wx.ready((e) => {
        console.log(e)
        // alert('dsds')
        wx.checkJsApi({
          jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
            // alert('check')
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//		    	alert(JSON.stringify(res));
          }

        });

        wx.onMenuShareTimeline({
          title: '免费畅享全年NBA直播的机会在这里', // 分享标题
          link: this.$domainUrl + '/?routeto=shareredirect&state=' + this.stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://resource.zan-qian.com/share/red_packet20180727191755.png-style_108x144', // 分享图标

          success: function () {

          }
        });

        wx.onMenuShareAppMessage({
          title: '免费畅享全年NBA直播的机会在这里', // 分享标题
          desc: '千万不要错过哦', // 分享描述
          link: this.$domainUrl + '/?routeto=shareredirect&state=' + this.stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://resource.zan-qian.com/share/red_packet20180727191755.png-style_108x144', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // alert('ddd')
// 用户点击了分享后执行的回调函数
          }
        });
      })
    });
  };


  Vue.prototype.$checkEnvironment = () => {
    let environmentDictionary = [{
      name: 'ios',
      method: "window.webkit.messageHandlers.token.postMessage('')",
      checker: 'window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.token',
      getter: 'window.webkit.messageHandlers.token',
      status: false
    }, {
      name: 'android',
      method: 'window.android.getToken()',
      checker: 'window.android',
      getter: 'window.android.getToken()',
      status: false
    }, {
      name: 'wechat',
      checker: "console",
      getter: '',
      status: false
    }];
    let environment;
    let that = this;
    for (let i = 0; i < environmentDictionary.length; i++) {
      let item = environmentDictionary[i];
      if (item.name === 'ios' && window.webkit !== undefined) {
        environment = eval(item.checker) ? item.name : '';
      } else {
        environment = eval(item.checker) !== undefined ? item.name : '';
      }
      if (environment !== '') {
        break;
      }
    }

    return environment;
  };

  Vue.prototype.$getDevice = (options) => {
    //判断访问终端
    let u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) === " qq" //是否QQ
    };
  }

  Vue.prototype.$remResizing = (options) => {
    options = $.extend({
      fontSize: 16,
      baseline: 320,
      threshold: 0,
      basedonnarrow: false,
      basedonwide: false,
      dropoff: false,
      aligncenter: false,
      inward: false
    }, options);
    let htmlEl = $('html'),
      bodyEl = $('body'),
      frontline = $(window).width(),
      windowHeight = $(window).height();
    let sizeConstraint = function () {
      if (options.basedonnarrow) {
        orientationSensor({
          portrait: function () {
            frontline = $(window).width(),
              windowHeight = $(window).height();
          },
          landscape: function () {
            frontline = $(window).height(),
              windowHeight = $(window).width();
          }
        });
      } else {
        frontline = $(window).width(),
          windowHeight = $(window).height();
      }
      let factor = 0;
      if (options.baseline === 0) {
        //alert('当最小宽度等于0时')
        factor = 1;
      } else if (frontline <= options.baseline) {
        //alert('当最小宽度不等于0且屏幕宽度小于等于最小宽度时')
        if (options.inward) {
          factor = frontline / options.threshold;
        } else {
          factor = frontline / options.baseline;
        }
      } else if (frontline > options.baseline && frontline <= options.threshold || options.threshold === 0) {
        //alert('当屏幕宽度大于最小宽度且小于等于最大宽度，或没有最大宽度时')
        if (options.threshold >= 0) {
          if (options.inward) {
            factor = frontline / options.threshold;
          } else {
            factor = frontline / options.baseline;
          }
        }
      } else if (frontline > options.threshold) {
        //alert('当屏幕宽度大于最大宽度时')
        factor = frontline / options.threshold;

        if (options.aligncenter) {
          bodyEl.css({
            margin: '0 auto',
            width: options.threshold
          });
        } else {
          bodyEl.css('margin', 0);
        }
        // if (options.dropoff) {
        //  alert('dsadas')
        //  htmlEl.css('font-size', 'none');
        //  return;
        // };
      }
      htmlEl.css('font-size', options.fontSize * factor);
      if (options.dropoff && frontline > options.threshold) {
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

      //console.log((frontline < windowHeight) ? orientation = 'portrait' : orientation = 'landscape')
      return (windowWidth < windowHeight) ? orientation = 'portrait' : orientation = 'landscape';
    }
  }

  Vue.prototype.$generateUrlParams = data => {
    let result = '?';
    Object.keys(data).forEach((item, index) => {
      if (index < Object.keys(data).length - 1) {
        result += item + '=' + data[item] + '&';
      } else {
        result += item + '=' + data[item];
      }
    });
    return result;
  };


  Vue.prototype.$generateRandomList = count => {
    let orderedArr = [];
    let upsetArr = [];
    let loopTimes = count;
    let rand = 0;

    for (let i = 0; i < count; i++) {
      orderedArr.push(i);
    }
    console.log(orderedArr);
    //真随机算法
    for (let i = 0; i < loopTimes; i++) {
      rand = parseInt(Math.floor(Math.random() * count));
      for (let j = 0; j < i; j++) {
        if (upsetArr[j] === rand) {
          upsetArr.splice(j, 1);
          loopTimes++;
        }
      }
      upsetArr.push(rand);
    }
    return upsetArr;
  };
  

  Vue.prototype.$autoHeight = (options) => {
    options = $.extend({
      reference: '',
      target: '',
      content: 'body',
      offset: 0,
      scale: 1,
      minHeight: 0,
      returnValue: false
    }, options);
    let windowHeight = $(window).height();
    let targetHeight = 0;
    let referenceHeight = $(options.reference).height();
    let contentHeight = $(options.content).height();
    let pageHeight = document.body.scrollHeight;
    let offset = Number(options.offset);
    if (referenceHeight < options.minHeight || windowHeight < options.minHeight) {
      targetHeight = options.minHeight * options.scale;

    } else if (referenceHeight > windowHeight) {
      targetHeight = referenceHeight * options.scale + offset;
    } else if (contentHeight > windowHeight) {
      targetHeight = contentHeight * options.scale + offset;
    } else {
      targetHeight = windowHeight * options.scale + offset;

      // $(window).resize(function () {
      //     pageHeight = document.body.scrollHeight;
      //     targetHeight = windowHeight * options.scale + offset;
      // });
    }
    // window.onresize = () => {
    //     targetHeight = document.body.scrollHeight * options.scale + offset;
    //     // targetHeight = windowHeight * options.scale + offset;
    //     $(options.target).height(targetHeight);
    //     if (options.returnValue) {
    //         console.log(targetHeight)
    //         return targetHeight;
    //     }
    // };
    if (options.returnValue) {
      // console.log(targetHeight)
      return targetHeight;
    } else {
      $(options.target).height(targetHeight);
    }
  };

  Vue.prototype.$quickSort = (arr) => {
    let that = this;
    //如果数组<=1,则直接返回
    if (arr.length <= 1) {
      return arr;
    }
    let pivotIndex = Math.floor(arr.length / 2);
    //找基准，并把基准从原数组删除
    let pivot = arr.splice(pivotIndex, 1)[0];
    //定义左右数组
    let left = [];
    let right = [];

    //比基准小的放在left，比基准大的放在right
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] <= pivot) {
        left.push(arr[i]);
      }
      else {
        right.push(arr[i]);
      }
    }
    //递归
    return Vue.prototype.$quickSort(left).concat([pivot], Vue.prototype.$quickSort(right));
  };


  Vue.prototype.$align = (options) => {
    options = $.extend({
      position: 'both',
      target: '',
      container: '',
      positive: false,
      isImage: false,
      offsetX: 0,
      offsetY: 0,
      ignoreY: 0,
      ignoreX: 0
    }, options);

    let that = $(options.target),
      imgSrc = that.attr('src'),
      reload = false,
      container = $(options.container),
      thisWidth = 0,
      thisHeight = 0,
      containerWidth = 0,
      containerHeight = 0,
      timer,
      imageObj = new Image(),
      offsetX = Number(options.offsetX),
      offsetY = Number(options.offsetY),
      ignoreX = Number(options.ignoreX),
      ignoreY = Number(options.ignoreY),
      ignoredElX = '',
      ignoredElY = '',
      windowWidth = $(window).width(),
      windowHeight = $(window).height();
    //_this.attr('src', imgSrc + '?' + Date.parse(new Date()))
    let tools = {
      calculateIgnore: function () {
        if (typeof options.ignoreY === 'string' || typeof options.ignoreX === 'string') {
          let ignoreArrX = options.ignoreX.split(','),
            ignoreArrY = options.ignoreY.split(',');
          for (let i = 0; i < ignoreArrX.length; i++) {
            ignoreX += $(ignoreArrX[i]).width();
          }
          for (let i = 0; i < ignoreArrY.length; i++) {
            ignoreY += $(ignoreArrY[i]).height();
          }
          ignoredElX = $(ignoreArrX.join(','));
          ignoredElY = $(ignoreArrY.join(','));
          console.log(ignoreY);
        } else {
          ignoreX = options.ignoreX;
          ignoreY = options.ignoreY;
        }
      }
    };
    initAligning();
    $(window).resize(function () {
      initAligning();
    });

    function initAligning() {
      //当居中元素是img标签时，特殊处理！
      if (that.is('img')) {
        //递归判断需要居中的图片是否加载完成，如果没有就重载
        let checkImageLoaded = function () {
          that.each(function (index) {
            let $this = $(options.target);
            let imageSrc = $this.attr('src');
            containerWidth = container.eq(index).width();
            containerHeight = container.eq(index).height();
            if ($this.height() <= 0) {
              imageObj.src = imageSrc;

              // console.log($this.outerWidth())
              checkPosition($this, imageObj.width, imageObj.height);
            } else {
              checkPosition($this);
            }
          });
        };
        checkImageLoaded();
        //缺省情况
      } else {

        //需要遍历每个居中对象，判断其每个container尺寸不同时，需分别处理
        //当设置了container时，以container尺寸大小居中
        if (options.container != '') {
          for (let i = 0; i < that.length; i++) {
            let $this = $(options.target);
            containerHeight = container.eq(i).height();
            containerWidth = container.eq(i).width();
            console.log(containerHeight);

            if ($this.is(':hidden')) {
              return true;
            } else {
              checkPosition($this);
            }
          }
          //当没有设置container时，以窗口尺寸大小居中
        } else {
          containerWidth = $(window).width();
          containerHeight = $(window).height();
          that.each(function (index) {
            let $this = $(options.target);
            if ($this.is(':hidden')) {
              return true;
            } else {
              checkPosition($this);
            }
          });
        }
      }
    }

    function checkPosition(_this, imageWidth, imageHeight) {
      let marginY, marginX;

      checkBrowser({
        ie: function () {
          window.clearTimeout(timer);
        },
        other: function () {
          clearTimeout(timer);
        }
      });

      if (arguments[1] != null && arguments[2] != null) {
        thisWidth = imageWidth;
        thisHeight = imageHeight;

      } else {
        thisWidth = _this.outerWidth();
        thisHeight = _this.outerHeight();
      }

      switch (options.position) {
        case 'both':
          // console.log(thisHeight)
          marginY = (containerHeight - thisHeight) / 2;
          marginX = (containerWidth - thisWidth) / 2;
          if (options.positive && marginY < 0 || marginX < 0) {
            marginY = marginX = 0;
          }
          if (thisWidth <= containerWidth) {
            if (options.offsetX !== 0) {
              _this.css({
                'margin': marginY + offsetY - ignoreY + 'px ' + (containerWidth - thisWidth) / 2 + offsetX - ignoreX + 'px'
              });
            } else {
              _this.css({
                'margin': marginY + offsetY - ignoreY + 'px auto'
              });
            }
          } else {
            let marginX = (containerWidth - thisWidth) / 2;
            _this.css({
              'margin': marginY + offsetY - ignoreY + 'px ' + (marginX + options.offsetX) + 'px'
            });
          }
          break;
        case 'top':
          aligning(function (thisWidth, thisHeight) {
            _this.css({
              'margin': '0 ' + ((containerWidth - thisWidth) / 2 + offsetX - ignoreX) + 'px'
            });
          });
          break;
        case 'right':
          if (thisHeight <= containerHeight) {
            if (options.offsetY !== 0) {
              _this.css({
                'margin': marginY + offsetY - ignoreY + 'px 0'
              });
            } else {
              _this.css({
                'margin': marginY + offsetY - ignoreY + 'px 0'
              });
            }
          } else {
            marginX = (containerWidth - thisWidth) / 2;
            _this.css({
              'margin': (containerHeight - thisHeight) / 2 + offsetY - ignoreY + 'px 0'
            });
          }


          // aligning(function(thisWidth, thisHeight) {
          // 	_this.css({
          // 		'margin': (windowHeight - thisHeight) / 2 + 'px 0 0 ' + (containerWidth - thisWidth) + 'px'
          // 	});
          // });
          break;
        case 'bottom':
          aligning(function (thisWidth, thisHeight) {
            tools.calculateIgnore();
            if (ignoreY <= windowHeight) {
              _this.css({
                'margin': (windowHeight - thisHeight + offsetY - ignoreY) + 'px auto 0'
              });
              console.log(ignoreY);
              console.log(windowHeight);
            }
            ;
          });
          break;
        case 'left':
          aligning(function (thisWidth, thisHeight) {
            _this.css({
              'margin': (windowHeight - thisHeight) / 2 + 'px 0 0 0'
            });
          });
          break;
      }
    }

    function aligning(callback) {
      thisWidth = that.outerWidth();
      thisHeight = that.outerHeight();
      return callback(thisWidth, thisHeight);
    }

    function checkBrowser(callback) {
      callback = $.extend({
        ie: function () {
        },
        other: function () {
        }
      }, callback);
      if (navigator.appName.indexOf('Explorer') > -1) {
        console.log('IE');
        callback.ie();
      } else {
        // console.log('other')
        callback.other();
      }
    }

    //屏幕方向探测器
    function orientationSensor(callback) {
      let windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        orientation = '';
      callback = $.extend({
        portrait: function () {
        },
        landscape: function () {
        },
        orientationchange: function (windowWidth, windowHeight) {
        }
      }, callback);

      checkoritation();
      $(window).resize(function () {
        checkoritation();
      });

      function checkoritation() {
        callback.orientationchange();
        if (windowWidth < windowHeight) {
          return callback.portrait();
        } else {
          return callback.landscape();
        }
      }

      return (windowWidth < windowHeight) ? orientation = 'portrait' : orientation = 'landscape';
    }


  };


};
export default util;
