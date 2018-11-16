<template>
  <div class="common_main_container">
    <div class="wolveskill_canvassdetail_wrapper">
      <!--<div v-if="$checkEnvironment()!=='wechat'" class="common_header_wrapper">-->
      <!--<div class="left_wrapper">-->
      <!--<div class="previous">-->
      <!--<a @click="goBack">-->
      <!--<x-icon type="ios-arrow-left" size="30"></x-icon>-->
      <!--</a>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="middle_wrapper">-->
      <!--西安高校狼人杀友谊赛S1-->
      <!--</div>-->
      <!--</div>-->
      <div class="header">
        <div class="avatar">
          <img v-if="userInfoData.userImage===null||userInfoData.userImage===''" src=""/>
          <img v-else :src="userInfoData.userImage"/>
        </div>
        <div class="desc">
          <h2>
            <p>{{userInfoData.userRealName}}</p>
            <span>最具人气选手投票</span>
          </h2>
          <label>{{userSchoolName}}，{{userInfoData.userMajor}}</label>
        </div>
      </div>
      <div class="maincontent">
        <div class="statistic">
          <ul>
            <li>
              <span>{{userInfoData.votes}}</span>
              <label>票数</label>
            </li>
            <li>
              <span>{{userInfoData.ranking!=='-1'?userInfoData.ranking:'100+'}}</span>
              <label>排名</label>
            </li>
          </ul>
        </div>
        <div class="canvasspicture">
          <img v-if="userInfoData.userImage===null||userInfoData.userImage===''"
               src="../image/wolveskill/canvass_default_00000.jpg"/>
          <img v-else :src="userInfoData.userImage"/>

        </div>
        <ul class="wolveskill_button_wrapper">
          <li>
            <a @click="vote">投票</a>
          </li>
          <li>
            <a @click="share">分享</a>
          </li>
        </ul>
        <div class="advertise">

        </div>
      </div>
    </div>
    <toast v-model="voteSuccessfulFlag" type="text" :time="2000" is-show-mask text="投票成功"></toast>

  </div>
</template>

<script>
  // import Cookies from 'js-cookie'
  import FnvalleySdk from '../js/FnvalleySdk'
  import Confirm from './Confirm.vue'


  // import wx from 'weixin-js-sdk'

  export default {
    name: "wolveskill",
    components: {
      Confirm
    },
    data() {
      return {
        oauthTokenRequest: 'uaa/oauth/token',
        getUserInfoByTokenRequest: 'uaa/user',
        addUserSchoolRequest: 'profile-service/1.0.0/user_school/addUserSchool',
        check_join_activityRequest: 'promotion-service/1.0.0/offline_activity/check_join_activity',
        participate_activityRequest: 'promotion-service/1.0.0/offline_activity/participate_activity',
        getUserActivityInfoRequest: 'promotion-service/1.0.0/offline_activity/getUserActivityInfo',
        voteRequest: 'promotion-service/1.0.0/offline_activity/vote',
        getSignatureRequest: 'account-service/1.0.0/weChat/getSignature',

        fnvalleySdkInstance: {},
        showAddress: false,
        activeTabIndex: 0,

        participateSuccessful: false,
        activityBeganFlag: false,
        confirmState: 'default',
        confirmFlag: false,
        rejectFlag: false,
        userInfoData: {},
        voteSuccessfulFlag: false,
        loginId: '',
        userActivityId: '',
        environment: '',
        // stateCode:''
        userSchoolName: ''
      }
    },
    computed: {
      tabBarWidth() {
        return this.tabList[this.activeTabIndex].title.length * 16 + 'px'
      },
      wechatAuthCode() {
        console.log(this.$route)
        return this.$route.query.code;
      },
      stateCode() {
        return this.$route.query.state;
      },

    },
    watch: {
      userInfoData(value) {
        if (this.$store.state.schoolList[0].filter(item => item.value === value.userSchoolName).length > 0) {
          this.userSchoolName = this.$store.state.schoolList[0].filter(item => item.value === value.userSchoolName)[0].name;
        }
      }
    },
    beforeCreate() {

    },
    beforeMount() {
      console.log(this.$route)
      this.$vux.loading.show({
        text: 'Loading'
      });
      if (this.$route.query.routeto === 'shareredirect') {
        alert('shareredirect')
        this.$vux.loading.hide();
        // this.stateCode = this.$route.query.state;
        // alert(this.stateCode)
        this.wechatRedirectingFlag = true;
        this.reInitializePage()
      } else {
        this.redirectingFlag = false;
      }
      if (this.$route.query.loginId !== undefined) {
        this.$store.commit('setLoginId', this.$route.query.loginId)
      }
      if (this.$route.query.userActivityId !== undefined) {
        this.$store.commit('setUserActivityId', this.$route.query.userActivityId)
      }
      // this.loginId = this.$route.query.loginId || '';
      // this.userActivityId = this.$route.query.userActivityId || '';
    },
    mounted() {
      // alert('mounted')
      console.log(new FnvalleySdk())
      this.fnvalleySdkInstance = new FnvalleySdk();
      console.log(this.redirectingFlag)
      if (!this.redirectingFlag) {
        this.$remResizing({
          fontSize: 20,
        });
        // this.$autoHeight({
        //   target: '.wolveskill_canvassdetail_wrapper'
        // });
        console.log(window)
        this.environment = this.$checkEnvironment();
        alert(this.environment)

        if (this.environment !== 'wechat') {
          this.parseStateCode();
          this.$getAccessToken().then(response1 => {
            alert(this.$store.state.accessToken)

            alert(this.loginId + ', ' + this.userActivityId)

            this.getUserActivityInfo();
          })
        } else {

          this.getWechatToken({
            type: 'wechat_code',
            params: {
              code: this.wechatAuthCode
            }
          }).then(response => {
            console.log('this.getWechatToken', response)
            this.$store.commit('setAccessToken', response.access_token)
            sessionStorage.setItem('wheel-accessToken', this.accessToken)
            this.parseStateCode();
            this.getUserActivityInfo();
            this.initJSSDK();

          }).catch(error => {
            this.parseStateCode();
            this.getUserActivityInfo();
          })


          // if (this.$route.query.routeto === 'shareredirect') {
          //   // alert('shareredirect')
          //   this.$vux.loading.show({
          //     text: 'Loading'
          //   });
          //   this.redirectInfo = this.$route.query.routeto;
          //   this.stateCode = this.$route.query.state;
          //   // alert(this.stateCode)
          //   this.wechatRedirectingFlag = true;
          // } else {
          //
          // }


        }

      }
    },
    methods: {
      reInitializePage() {
        let stateCode = this.stateCode;
        // alert('reInitializePage.stateCode', stateCode)
        location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$shareDomainUrl + '&response_type=code&scope=snsapi_userinfo&state=' + stateCode + '#wechat_redirect')
      },
      parseStateCode() {
        let result = [];
        // this.stateCode = this.$route.query.state;
        alert('stateCode+ ' + this.stateCode)
        // alert('stateCode+ ' + this.$route.query.state)
        if (this.stateCode !== undefined) {
          let code = decodeURIComponent(this.stateCode)

          code.split('$').forEach(item => {
            result[item.split('=')[0]] = item.split('=')[1]
          });
          // alert('result.channel+' + result.channel)
          // alert('result.activityId+' + result.activityId)
          this.stateCodeData = result;
          this.loginId = result.loginId;
          this.userActivityId = result.userActivityId;
        }
        console.log('parseStateCode', result)
        console.log('loginId', this.loginId)
        // alert('channel+ ', this.channel)

      },
      getUserActivityInfo() {
        this.$http.get(this.$baseUrl + this.getUserActivityInfoRequest + `/${this.$store.state.activityId}/${this.loginId}`, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.accessToken
          }
        }).then(response => {
          console.log(response)
          response = response.data;
          this.userInfoData = response;
          this.$vux.loading.hide();
        }).catch(error => {
          console.log(error)
          this.$vux.confirm.show({
            showCancelButton: false,
            title: 'getUserActivityInfo_error' + error,
            onConfirm() {
            }
          });
        })
      },

      handleTabClick(index) {
        console.log(index)
        this.activeTabIndex = index;
      },
      goBack() {
        this.$router.push({
          name: 'homepage'
        })
      },
      vote() {
        this.$http.post(this.$baseUrl + this.voteRequest + `/${this.userActivityId}`, {}, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.$store.state.accessToken
          }
        }).then(response => {
          console.log(response)
          switch (response.code) {
            case 10000:
              this.voteSuccessfulFlag = true;
              this.getUserActivityInfo();

          }
        })
      },
      share() {
        console.log(this.$checkEnvironment())
        if (this.$checkEnvironment() !== 'wechat') {
          let stateCode = `loginId=${this.loginId}$userActivityId=${this.userActivityId}`;

          this.fnvalleySdkInstance.openAPPShare({
            "title": "狼人杀分享拉票",
            "describe": '狼人杀分享拉票描述',
            "weburl": this.$shareDomainUrl + '?routeto=shareredirect&state=' + stateCode
          })
        } else {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '请点击右上角按钮分享',
            onConfirm() {
            }
          });
        }

      },
      initJSSDK() {

        console.log('777', location.href.split('#')[0])
        let wx = this.$wechat;
        console.log(wx)

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
            let stateCode = `loginId=${this.loginId}$userActivityId=${this.userActivityId}`;

            wx.onMenuShareTimeline({
              title: '吃不到鸡没关系，最swag的福利送给你', // 分享标题
              link: this.$shareDomainUrl + '?routeto=shareredirect&state=' + stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

              // link: wechatRedirectLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg', // 分享图标

              success: function () {

              }
            });

            wx.onMenuShareAppMessage({
              title: '吃不到鸡没关系，最swag的福利送给你', // 分享标题
              desc: '不做LYB，好友携手拿好礼。更有海淘精品等你免费来领取！', // 分享描述
              // link: this.$domainUrl + '?routeto=shareredirect&state=' + stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              link: this.$shareDomainUrl + '?routeto=shareredirect&state=' + stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

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
      getWechatAccessToken() {
        let that = this;
        // that.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: 'environment+   ' + this.environment,
        //   onConfirm() {
        //     // this.reInitializePage();
        //   }
        // });
        // alert('getWechatAccessToken+' + this.accessToken)

        // this.$initJSSDK({
        //   state: 'channel=' + this.channel + '$activityId=' + this.activityId
        // });

      },
      getWechatToken(options) {
        return new Promise((resolve, reject) => {
          options = Object.assign({
            type: '',
            params: {}
          }, options);
          if (this.$checkEnvironment() === 'wechat') {
            this.$http.post(this.$baseUrl + this.oauthTokenRequest, Object.assign({
              grant_type: options.type
            }, options.params), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic YW5kcm9pZDphZG1pbg=='
              },
              transformRequest: [function (data) {
                let ret = '';
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }]
            }).then(response => {
              console.log('oauthTokenRequest', response)
              this.accessToken = response.access_token;
              sessionStorage.setItem('wheel-accessToken', response.access_token)
              // Cookies.set('wheel-accessToken', response.access_token);

              resolve(response);
            }).catch(error => {
              console.log('error', error)
              switch (error.data.code) {
                case 1:
                  this.dialogFlag = true;
                  this.loginToGetPrizeFlag = true;
                  this.openId = error.data.openId;

                  reject(error);
                  break;
                case 2:

                  // this.dialogFlag = true;
                  // this.loginToGetPrizeFlag = true;
                  reject(error);
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: error.data.error + '，请关闭页面重新打开2',
                    onConfirm() {
                      // this.reInitializePage();
                    }
                  });
                  break;
                case 3:
                  reject(error);
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: error.data.error + '，请关闭页面重新打开3',
                    onConfirm() {
                    }
                  });
                  break;
                default:
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: 'data.error_description' + error.data.error_description,
                    onConfirm() {
                    }
                  });
                  reject(error);
              }
            })
          } else {
            alert('当前不是微信环境也不是原生环境')
          }
        })
      },
    }
  }


</script>

<style scoped lang="scss"></style>
