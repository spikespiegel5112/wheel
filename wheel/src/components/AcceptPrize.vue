<template>
  <div class="wheel_accpetprize_wrapper">
    <div class="banner">
      <img src="../image/wheel/accept_prize_banner_00000.png" />
    </div>
    <div class="accpetprize">
      <h1>下载趣谷APP,领取奖品</h1>
      <ul>
        <li>
          <a>
            <span class="android"></span>
            <label>立即领取</label>
          </a>
        </li>
        <li>
          <a>
            <span class="ios"></span>
            <label>立即领取</label>
          </a>
        </li>
      </ul>
      <div class="hint">
        用领取奖品手机号{{prizeData.loginId}}登录即可领取
      </div>
    </div>
    <div class="prizedescribe">
      <h1 class="title">奖品描述</h1>
      <ul class="main">
        <li>
          <div class="prizetitle">
            <img class="icon" :src="prizeData.rewardImage+'-style_100x100'" />
            <div class="title">
              <label>恭喜你，抽中{{prizeData.rewardName}}</label>
              <div class="prize">
                <span>￥{{prizeData.rewardValue}}</span>
                <a>免费领取</a>
              </div>
            </div>
          </div>
          <div class="productfeature">
            <h1>产品特点</h1>
            <!--<a class="receive">立即领取</a>-->
            <div class="productbanner">
              <img src="../image/wheel/prizepreview_00000.jpg"/>
            </div>
          </div>
        </li>

      </ul>
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
        sendBindWxMsgRequest: 'message-service/1.0.0/sms/sendBindWxMsg',
        rotatingFlag: false

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
      prizeData(){
        console.log('JSON', JSON.parse(sessionStorage.getItem('prizeData')))
        return JSON.parse(sessionStorage.getItem('prizeData'));
      }
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

      this.$remResizing({
        fontSize: 20,
      });


    },
    methods: {}
  }


</script>

<style scoped lang="css">

</style>
