<template>
  <div class="wheel_acceptprize_wrapper">
    <CommonLoading :loading="loading"/>
    <div v-if="$checkEnvironment()==='wechat'" class="common_header_wrapper">
      <div class="left_wrapper">
        <div class="previous">
          <a @click="goBack">
            <x-icon type="ios-arrow-left" size="30"></x-icon>
          </a>
        </div>
      </div>
      <div class="middle_wrapper">
        我的奖品
      </div>
    </div>
    <div v-if="!emptyPrizeFlag" class="prizedescribe">
      <ul class="main" v-if="prizeData.length>0">
        <!--<h1 class="title">奖品描述</h1>-->
        <li v-for="item in prizeData">
          <div class="prizetitle">
            <img v-if="item.product!==null" class="icon" :src="item.product.icon+'-style_100x100'"/>
            <div class="title">
              <label>{{item.rewardValue}}{{item.rewardDescription}}</label>
              <div class="prize" v-if="item.product!==null">
                <span>￥{{item.product.originalPrice}}</span>
              </div>
            </div>
          </div>
          <div class="productfeature">
            <div v-if="item.product!==null" class="title">
              <h1>产品特点</h1>
              <a v-if="item.product.url!==''" class="wheel_product_button" :class="{active:routing}"
                 @click="checkoutPrize(item)">立即领取</a>
            </div>
            <div class="productbanner" v-if="item.product!==null">
              <img class="icon" :src="item.product.image+'-style_600x300'"/>
              <!--<img src="../image/wheel/prizepreview_00000.jpg"/>-->
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="!loading&&emptyPrizeFlag" class="empty">
      <div class="main">
        <h1>暂无奖品</h1>
        <img src="../image/wheel/emptyprize_00000.png"/>
        <p>领取奖品手机号：{{loginId}}</p>
      </div>
    </div>

  </div>

</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: "Promotion",
    data: function () {
      return {
        queryRewardTraceByLoginIdRequest: 'promotion-service/1.0.0/rotary_table_activity/queryRewardTraceByLoginId',
        getSignatureRequest: 'account-service/1.0.0/weChat/getSignature',

        rotatingFlag: false,
        accessToken: '',
        emptyPrizeFlag: true,
        prizeData: [],
        loading: false,
        routing: false
      }
    },
    computed: {
      loginId() {
        return Cookies.get('wheel-loginId')
      },
      activityId() {
        return sessionStorage.getItem('activityId')
      },
      channel() {
        return Cookies.get('wheel-channel')
      },
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
      token() {
        return this.$route.query.token;
      },
      wechatRedirectLink() {
        return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$domainUrl + '&response_type=code&scope=snsapi_userinfo&state=channel=' + this.channel + '$activityId=' + this.activityId + '#wechat_redirect';
      }
    },
    watch: {
      token() {
        this.accessToken = this.token;

      }
    },
    beforeMount() {

    },
    mounted() {
      this.$remResizing({
        fontSize: 20,
      });
      console.log(this.$route.query.token)
      this.getMyPrizeData();
      this.initJSSDK();
    },
    methods: {
      getMyPrizeData() {
        let that = this;
        this.loading = true;
        this.$http.get(this.$baseUrl + this.queryRewardTraceByLoginIdRequest, {
          params: {
            loginId: Cookies.get('wheel-loginId'),
            productDetail: 'all',
            activityId: this.activityId
          },
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('wheel-accessToken')
          }
        }).then(response => {
          console.log(response)
          this.loading = false;
          response = response.data;
          this.emptyPrizeFlag = response.length === 0;
          this.prizeData = response;
        }).catch(error => {
          this.loading = false;
          console.log(error)
          if (error.status === 401) {
            this.$vux.confirm.show({
              showCancelButton: false,
              title: '当前手机号失效，请重新登录',
              onConfirm() {
                that.$router.go(-1);
                sessionStorage.removeItem('wheel-accessToken');
                Cookies.remove('wheel-loginId');
              }
            })
          }

        })
      },
      goBack() {
        this.$router.go(-1)
      },
      initJSSDK() {

        console.log('777', location.href.split('#')[0])
        let wx = this.$wechat;

        this.$http.post(this.$baseUrl + this.getSignatureRequest, {
          // url: window.location.host,
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
      checkoutPrize(data) {
        // alert(Cookies.get('wheel-channel'))
        // alert(sessionStorage.getItem('activityId'))

        this.routing = true;
        let homeUrl = this.$domainUrl + '?code=xxxx&state=channel=' + Cookies.get('wheel-channel') + '$activityId=' + sessionStorage.getItem('activityId') + '&timestamp=' + Date.parse(new Date());
        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: this.wechatRedirectLink,
        //   onConfirm() {
        //   }
        // })
        // alert(this.wechatRedirectLink)

        history.replaceState({}, null, homeUrl);

        location.assign(data.product.url)
      }
    }
  }


</script>

<style scoped lang="css">

</style>
