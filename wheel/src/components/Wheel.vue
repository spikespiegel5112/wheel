<template>
  <div>
    <div class="wheel_redirect_container" v-if="redirectingFlag">
      <CommonLoading :loading="initializing"/>
    </div>
    <div class="common_main_container" v-else>
      <CommonLoading :loading="initializing"/>
      <div class="content" id="app">
        <div class="wheel_realpage_container">
          <div class="title"></div>
          <div class="wheel_wrapper">
            <div class="wheel">
              <canvas id="wheelcanvas" :width="remUnit*13.5" :height="remUnit*13.5">抱歉！浏览器不支持。</canvas>
            </div>
            <div class="prizechance">
              <h1>获得1次抽奖机会</h1>
              <label>活动时间：2018.8.14~2018.8.15</label>

            </div>
          </div>
        </div>
        <CommonLoading :loading="loading"/>
      </div>
    </div>

  </div>

</template>

<script>
  import CommonLoading from './common/CommonLoading.vue'
  import wx from 'weixin-js-sdk'
  import $ from 'jquery';

  export default {
    name: "Promotion",
    components: {
      CommonLoading
    },
    data: function () {
      return {
        baseUrl: 'http://gateway.zan-qian.com/',
        redirectingFlag: false,
        initializing: false,
        loading: false,

        redirectInfo: '',
        downloadUrl: '',
        colorDictionary: ['#feebcd', '#ffb54c'],
        textColorDictionary: ['#f06949', '#feebcd'],
        dotsColorDictionary: ['#ffd800', '#fe9166'],
        wheelData: [{
          name: '比萨饼',
          value: 10,
          image: 'http://resource.zan-qian.com/test/icon/1534327599157.jpeg-style_100x100'
        }, {
          name: '酱肘子',
          value: 20,
          image: 'http://resource.zan-qian.com/test/icon/1534327599157.jpeg-style_100x100'
        }, {
          name: '红烧肉',
          value: 30,
          image: 'http://resource.zan-qian.com/test/icon/1534327599157.jpeg-style_100x100'
        }, {
          name: '炖排骨',
          value: 30,
          image: 'http://resource.zan-qian.com/test/icon/1534327599157.jpeg-style_100x100'
        }, {
          name: '小鸡炖蘑菇',
          value: 30,
          image: 'http://resource.zan-qian.com/test/icon/1534327599157.jpeg-style_100x100'
        }, {
          name: '牛排',
          value: 30,
          image: 'http://resource.zan-qian.com/test/icon/1534327599157.jpeg-style_100x100'
        }],
        wheelCanvas: {},
        remUnit: '',
        canvasWidth: '400px',
        canvasHeight: '400px',
        canvasReadyFlag: false

      }
    },
    computed: {
      userActivityId() {
        return this.$route.query.state;
      },
      identityCode() {
        return this.$route.query.state;

      },
      wechatAuthCode() {
        return this.$route.query.code
      },
      stateCode() {
        return this.$route.query.state
      },
      // canvasWidth() {
      //   return this.remUnit * 13.5 + 'px';
      // },
      // canvasHeight() {
      //   return this.remUnit * 13.5 + 'px';
      // },
    },
    watch: {
      remUnit(value) {
        // alert('dsds')
        this.$nextTick(() => {
          this.canvasWidth = value * 13.5 + 'px';
          this.canvasHeight = value * 13.5 + 'px';
          // this.canvasReadyFlag=true;
          console.log(111, this.canvasWidth)

          this.drawCanvas();

        })

      },
      weChatAuthorityURL(value) {
        console.log(value)
      },
      initializing(value) {
        if (!value) {
        }
      },
      redirectInfo(value) {
        // alert('dsds')
        // alert(value)
        console.log(value)
        if (value === 'shareredirect') {
          location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=http://activity.fnvalley.com&response_type=code&scope=snsapi_userinfo&state=' + this.stateCode + '#wechat_redirect')
        } else {
          this.redirectingFlag = false;

        }
      }
    },
    created() {
      this.redirectInfo = this.$route.query.routeto;
    },
    beforeMount() {


    },
    mounted() {
      this.initializing = false;

      this.$nextTick(() => {
        this.$autoHeight({
          target: '.wheel_realpage_container'
        });
      });
      this.$remResizing({
        fontSize: 20,
      });
      this.$nextTick(() => {
        this.remUnit = Number(document.getElementsByTagName('html')[0].style.fontSize.replace('px', ''))
      });


      this.initJSSDK();
      // this.changeUrl();
    },
    methods: {
      drawCanvas() {
        console.log(this.remUnit)
        console.log(this.canvasWidth)
        this.wheelCanvas = document.getElementById('wheelcanvas');
        // this.wheelCanvas.width = this.canvasWidth.replace('','px');
        // this.wheelCanvas.height = this.canvasWidth.replace('','px');
        let ctx = this.wheelCanvas.getContext('2d');
        let $parentEl = $('.wheel_wrapper .wheel');

        let baseAngle = Math.PI * 2 / this.wheelData.length;
        // document.querySelector('.wheel_wrapper .wheel').style.width = this.remUnit * 13.5;
        // document.querySelector('.wheel_wrapper .wheel').style.height = this.remUnit * 13.5;
        console.log(document.querySelector('.wheel_wrapper .wheel').style)

        let canvasWidth = this.remUnit * 13.5;
        let canvasHeight = this.remUnit * 13.5;
        // let canvasWidth = this.remUnit*5;
        // let canvasHeight = this.remUnit*5;
        console.log(canvasWidth)
        console.log(canvasHeight)


        ctx.font = this.remUnit;

        ctx.beginPath();
        ctx.arc(canvasWidth / 2, canvasHeight / 2, this.remUnit * 6.75, 0, Math.PI * 2, true);
        ctx.fillStyle = 'rgba(188,75,61,0.5)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(canvasWidth / 2, canvasHeight / 2, this.remUnit * 6.57, 0, Math.PI * 2, true);
        ctx.fillStyle = '#bc4b3d';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(canvasWidth / 2, canvasHeight / 2, this.remUnit * 6.35, 0, Math.PI * 2, true);
        ctx.fillStyle = '#f06949';
        ctx.fill();

        ctx.save();
        let showDots = () => {
          for (let i = 0; i < 24; i++) {
            ctx.beginPath();
            let angle = Math.PI * 2 / 24 * i;
            let translateX = canvasWidth * 0.5 + Math.cos(angle) * this.remUnit * 5.9;
            let translateY = canvasHeight * 0.5 + Math.sin(angle) * this.remUnit * 5.9;
            ctx.arc(translateX, translateY, this.remUnit * 0.35, this.remUnit, Math.PI * 2, true);
            ctx.fillStyle = i % 2 === 0 ? this.dotsColorDictionary[0] : this.dotsColorDictionary[1];
            ctx.fill();
          }
        };
        showDots();
        setInterval(() => {
          showDots();
          this.dotsColorDictionary = this.dotsColorDictionary.reverse();
        }, 1000);


        this.wheelData.forEach((item, index) => {
          let angle = baseAngle * index;
          console.log(angle + baseAngle)
          console.log(ctx.fillStyle)
          ctx.beginPath();
          ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
          // ctx.lineTo(canvasWidth - 3, canvasHeight / 2);
          // ctx.arc(canvasWidth /2, canvasHeight /2, 150, angle, angle + baseAngle, false);
          ctx.lineWidth = 3;
          ctx.arc(canvasWidth / 2, canvasHeight / 2, this.remUnit * 5.4, angle + baseAngle, angle, true);
          ctx.lineTo(canvasWidth / 2, canvasHeight / 2);

          ctx.strokeStyle = '#f06949';
          ctx.stroke();
          ctx.fillStyle = this.colorDictionary[index % 2];

          ctx.save();


          ctx.fill();

          let translateX = canvasWidth * 0.5 + Math.cos(angle + baseAngle / 2) * this.remUnit * 5;
          let translateY = canvasHeight * 0.5 + Math.sin(angle + baseAngle / 2) * this.remUnit * 5;
          ctx.font = this.remUnit * 0.7 + "px Georgia";
          ctx.fillStyle = this.textColorDictionary[index % 2];
          console.log(this.colorDictionary[index % 3])
          ctx.translate(translateX, translateY);
          ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
          ctx.fillText(this.wheelData[index].name, -ctx.measureText(this.wheelData[index].name).width / 2, 22);
          // let imageObj = new Image();
          // imageObj.width = '10';
          // imageObj.height = '10';
          // imageObj.src = this.wheelData[index].image;

          let imageObj = new Image();
          imageObj.width = '100';
          imageObj.height = '100';
          imageObj.src = this.wheelData[index].image;

          let imageWidth = this.remUnit * 2;
          let imageHeight = this.remUnit * 2;
          window.onload = () => {


          };
          ctx.drawImage(imageObj, 0,0,imageObj.width ,imageObj.height, -imageWidth / 2, this.remUnit * 1.2, this.remUnit * 2, this.remUnit * 2);


          ctx.restore();
        });

        setTimeout(() => {

          // ctx.drawImage(imageObj, -imageWidth / 2, imageHeight, this.remUnit * 3, this.remUnit * 3);


        }, 500)


        // this.wheelData.forEach((item, index) => {
        // })
      }


    },
    initJSSDK() {
      this.$http.post(this.$baseUrl + this.getSignatureRequest, {
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
            link: 'http://activity.fnvalley.com/?routeto=shareredirect&state=' + this.stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://resource.zan-qian.com/wheel/red_packet20180727191755.png-style_108x144', // 分享图标

            success: function () {

            }
          });

          wx.onMenuShareAppMessage({
            title: '免费畅享全年NBA直播的机会在这里', // 分享标题
            desc: '千万不要错过哦', // 分享描述
            link: 'http://activity.fnvalley.com/?routeto=shareredirect&state=' + this.stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://resource.zan-qian.com/wheel/red_packet20180727191755.png-style_108x144', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // alert('ddd')
// 用户点击了分享后执行的回调函数
            }
          });
        })

      });

    },


    isWechat() {
      //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
      let ua = window.navigator.userAgent.toLowerCase();
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      console.log(this.$prodEnv)
      console.log(ua)
      return this.$prodEnv ? ua.match(/MicroMessenger/i) === 'micromessenger' : true;
      // return this.$prodEnv;
    },

  }

</script>

<style scoped lang="css">

</style>
