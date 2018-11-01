<template>
  <div class='main_container swiper-container' style="height:800px">
    <ul class="swiper-wrapper">
      <li class="segment swiper-slide">
        <img class='image' src='../img/download/left_1_00000.jpg'/>
        <!--<img class='image' src='../img/download/left_2_00000.jpg'/>-->
        <!--<img class='image' src='../img/download/left_3_00000.jpg'/>-->
        <!--<img class='image' src='../img/download/left_4_00000.jpg'/>-->

      </li>
      <li class="segment swiper-slide">
      <img class='image' src='../img/download/left_2_00000.jpg'/>
      </li>
      <li class="segment swiper-slide">
      <img class='image' src='../img/download/left_3_00000.jpg'/>
      </li>
      <li class="segment swiper-slide">
      <img class='image' src='../img/download/left_4_00000.jpg'/>
      </li>
    </ul>
  </div>


</template>

<script>
  import CommonLoading from './common/CommonLoading.vue'
  import Swiper from 'swiper/dist/js/swiper.js';
  import wx from 'weixin-js-sdk'


  export default {
    name: "Promotion",
    components: {
      CommonLoading
    },
    data: function () {
      return {
        getSignatureRequest: 'account-service/1.0.0/weChat/getSignature',

        optionalEnvironmentParamsDictionary: ['source'],
        optionalEnvironmentParams: {},
        optionalEnvironmentParamsString: '',
        statisticDownloadLink: {
          android: `${this.$redirectBaseUrl}redirect/androiddownload?source=tongcheng&webId=${this.$generateUUID()}`,
          ios: `${this.$redirectBaseUrl}redirect/iosdownload?source=tongcheng&webId=${this.$generateUUID()}`
        },
        stateCode:Math.round(new Date() / 1000)
      }
    },
    computed: {},
    watch: {},
    beforeMount() {


    },
    mounted() {
      console.log()

      this.initRemResizing();

      // this.$autoHeight({
      //   target: '.main_container'
      // });
      this.getOptionalEnvironmentParams();
      this.initJSSDK();

      this.$nextTick(()=>{
        setTimeout(()=>{
          this.initSwiper();
        }, 500)
      });
    },
    methods: {
      initRemResizing() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        this.$remResizing({
          fontSize: 20,
          threshold: 640,
        });
      },
      initSwiper() {
        const swiperInstance = new Swiper('.swiper-container', {
          // loop: true
          direction: 'vertical',
          freeMode: true,
          // slidesPerView: 'auto',
          // lazy: true,
          // observer: true,

          // slidesPerView: 1,
        })
      },
      initJSSDK() {
        console.log('777', location.href.split('#')[0])
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
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
          });
          wx.error(error => {
            console.log(error)
            alert(error)
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
              title: '边玩边赚，尽在趣谷', // 分享标题
              link: 'http://download.fnvalley.com/?state=' + this.stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg', // 分享图标

              success: function () {

              }
            });

            wx.onMenuShareAppMessage({
              title: '趣谷APP', // 分享标题
              desc: '边玩边赚，尽在趣谷', // 分享描述
              link: 'http://download.fnvalley.com/?state=' + this.stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg', // 分享图标
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
      getOptionalEnvironmentParams() {
        let resultObj = {};
        let resultStr = '';
        this.optionalEnvironmentParamsDictionary.forEach(item1 => {
          Object.keys(this.$route.query).forEach((item2, index2) => {
            if (item1 === item2) {
              resultObj[item1] = this.$route.query[item2]
            }
          })
        });
        Object.keys(resultObj).forEach((item, index) => {
          resultStr += `&${item}=${resultObj[item]}`
        });
        this.optionalEnvironmentParamsString = resultStr;
      }
    }
  }
</script>

<style scoped lang="css">
  @import '../assets/js/swiper/css/swiper.min.css';

</style>
