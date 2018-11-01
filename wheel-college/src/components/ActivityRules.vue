<template>
  <div class="wheel_rules_wrapper">
    <div class="wheel_rulesbg_item"></div>

    <div v-if="$checkEnvironment()==='wechat'" class="common_header_wrapper">
      <div class="left_wrapper">
        <div class="previous">
          <a @click="goBack">
            <x-icon type="ios-arrow-left" size="30" class="icon-white"></x-icon>
          </a>
        </div>
      </div>
      <div class="middle_wrapper">
        活动规则
      </div>
    </div>
    <div class="rules">
      <ol>
        <li v-for="item in rulesArticle">{{item.content}}</li>
      </ol>
    </div>

  </div>

</template>

<script>

  export default {
    name: "Promotion",
    data: function () {
      return {
        baseUrl: 'http://gateway.fnvalley.com/',
        sendBindWxMsgRequest: 'message-service/1.0.0/sms/sendBindWxMsg',
        getSignatureRequest: 'account-service/1.0.0/weChat/getSignature',

        rotatingFlag: false,
        rulesArticle: [{
          content: '本次活动由趣谷APP提供。',
        }, {
          content: '用户参与抽奖即可免费获得转盘 奖品。',
        }, {
          content: '凡参与本次活动，则视为同意活 动规则及免费声明条款。',
        }, {
          content: '对于恶意刷奖，趣谷APP有权取 消获奖者获奖资格，并保留相关 法律权利。',
        }, {
          content: '本活动的最终解释权归上海骏盈 信息技术有限公司。',
        }]
      }
    },

    watch: {},
    computed: {
      activityId() {
        return this.$route.query.activityId;
      },
      channel() {
        return this.$route.query.channel;
      }
    },
    mounted() {
      this.$nextTick(() => {
        // this.$autoHeight({
        //   target: '.wheel_realpage_container'
        // });
        this.$autoHeight({
          target: '.wheel_rules_wrapper'
        });
        this.$remResizing({
          fontSize: 20,
        });
        this.initJSSDK()

      });
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      initJSSDK() {
        console.log('777', location.href.split('#')[0])
        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: location.href.split('#')[0],
        //   onConfirm() {
        //   }
        // });
        let wx = this.$wechat;
        let wechatRedirectLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=http://activity.fnvalley.com/collegewheel/index.html&response_type=code&scope=snsapi_userinfo&state=channel=' + this.channel + '$activityId=' + this.activityId + '#wechat_redirect';
        this.$http.post(this.$baseUrl + this.getSignatureRequest, {
          // url: window.location.host,
          url: location.href.split('#')[0]
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
            alert('wechat error')
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
                // alert(JSON.stringify(res));
              }

            });
            let stateCode = `channel=${this.channel}$activityId=${this.activityId}`;

            wx.onMenuShareTimeline({
              title: '吃不到鸡没关系，最swag的福利送给你', // 分享标题
              link: this.$domainUrl + '?routeto=shareredirect&state=' + stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

              // link: wechatRedirectLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg', // 分享图标

              success: function () {

              }
            });

            wx.onMenuShareAppMessage({
              title: '吃不到鸡没关系，最swag的福利送给你', // 分享标题
              desc: '不做LYB，好友携手拿好礼。更有海淘精品等你免费来领取！', // 分享描述
              // link: this.$domainUrl + '?routeto=shareredirect&state=' + stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              link: this.$domainUrl + '?routeto=shareredirect&state=' + stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
    }
  }


</script>

<style scoped lang="css">

</style>
