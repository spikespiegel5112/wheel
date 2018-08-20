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
              <canvas id="wheelcanvas" width="430px" height="430px">抱歉！浏览器不支持。</canvas>
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
        textColorDictionary: ['red', 'blue'],

        wheelData: [{
          name: 'aaa',
          value: 10
        }, {
          name: 'bbb',
          value: 20
        }, {
          name: 'ccc',
          value: 30
        }, {
          name: 'ddd',
          value: 30
        }, {
          name: 'eee',
          value: 30
        }, {
          name: 'fff',
          value: 30
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
        // let remUnit = Number(document.getElementsByTagName('html')[0].style.fontSize.replace('px', ''))
        console.log(this.remUnit)
        this.wheelCanvas = document.getElementById('wheelcanvas');
        let ctx = this.wheelCanvas.getContext('2d');
        let $parentEl = $('.wheel_wrapper .wheel')
        // ctx.width = 13.5 / 2 * remUnit;
        // ctx.height = 13.5 * remUnit;

        let baseAngle = Math.PI * 2 / this.wheelData.length;
        document.querySelector('.wheel_wrapper .wheel').style.width = this.remUnit * 13.5 + 'px';
        document.querySelector('.wheel_wrapper .wheel').style.height = this.remUnit * 13.5 + 'px';
        console.log(document.querySelector('.wheel_wrapper .wheel').style)

        let canvasWidth = $parentEl.width();
        let canvasHeight = $parentEl.height();
        console.log(canvasWidth)
        console.log(canvasHeight)


        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.strokeStyle = "#f06549";
        ctx.font = '16px';
        // ctx.fillStyle = 'cornflowerblue';
        // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        this.wheelData.forEach((item, index) => {


          let angle = baseAngle * index;
          console.log(angle + baseAngle)
          console.log(ctx.fillStyle)
          ctx.beginPath();
          // ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
          // ctx.lineTo(canvasWidth - 3, canvasHeight / 2);
          // ctx.arc(canvasWidth /2, canvasHeight /2, 150, angle, angle + baseAngle, false);
          ctx.lineWidth = 3;
          ctx.lineTo(canvasWidth / 2, canvasHeight / 2);
          ctx.arc(canvasWidth / 2, canvasHeight / 2, 150, angle + baseAngle, angle, true);
          ctx.arc(canvasWidth / 2, canvasHeight / 2, 0, angle, angle * baseAngle, true);

          // ctx.lineTo(canvasWidth / 2, canvasHeight / 2);
          ctx.stroke();
          ctx.fillStyle = this.colorDictionary[index % 2];

          ctx.fill();
          ctx.save();

          // ctx.fillStyle = "#E5302F";
          let rewardName = item.name;
          let line_height = 17;
          let translateX = canvasWidth * 0.5 + Math.cos(angle + baseAngle / 2) * 150;
          let translateY = canvasHeight * 0.5 + Math.sin(angle + baseAngle / 2) * 150;
          // ctx.translate(translateX, translateY);
          // ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
          ctx.font = "20px Georgia";
          console.log(222, -ctx.measureText(this.wheelData[index].name).width / 2)
          console.log(333, translateX, translateY)
          // ctx.fillText('dsadsa', -ctx.measureText(this.wheelData[index].name).width / 2, 22);
          // ctx.fillText('dsadsa', canvasWidth / 2, canvasHeight / 2);
          ctx.fillStyle = this.textColorDictionary[index % 2]
          console.log(this.colorDictionary[index % 3])
          ctx.translate(translateX, translateY);
          ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
          ctx.fillText(this.wheelData[index].name, -ctx.measureText(this.wheelData[index].name).width / 2, 22);


          //
          //
          //
          //
          //
          ctx.restore();
        })
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
  }
</script>

<style scoped lang="css">

</style>
