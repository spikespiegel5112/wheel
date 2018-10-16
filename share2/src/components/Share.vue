<template>
  <div>
    <div class="common_main_container">
      <CommonLoading :loading="wechatRedirectingFlag"/>
      <div v-if="wechatRedirectingFlag" class="common_initializing_item"></div>
      <div v-show="!wechatRedirectingFlag" class="content" id="app">
        <!--<div class="common_header_wrapper">-->
        <!--<div class="left_wrapper">-->
        <!--<a class="previous iconfont icon-backward2"></a>-->
        <!--</div>-->
        <!--<div class="middle_wrapper">-->
        <!--分享免费领取百视通-->
        <!--</div>-->
        <!--</div>-->
        <!--<div v-if="true">-->
        <div v-if="environment==='wechat'">
          <div class="share_main_wrapper">
            <div class="carousel swiper-container">
              <ul class="swiper-wrapper">
                <li class="swiper-slide" v-if="advertiseList.length>0" v-for="item in advertiseList">
                  <img :src="item.image+`-style_640x380`"/>
                </li>
                <li>
                  <div class="defaultbanner">
                    <!--<label>banner</label>-->
                    <img src="../image/share/defaultbanner_00000.jpg"/>
                  </div>
                </li>
              </ul>
              <div class="swiper-pagination"></div>
            </div>
            <div class="maincontent">
              <div class="form" v-if="loginToGetPrizeFlag">
                <div class="title">
                  <h1>好礼即将到账</h1>
                  <h2>验证手机号码领取</h2>
                </div>
                <div class="main">
                  <ul>
                    <li>
                      <div class="common_form_item">
                        <input class="common_input_item" type="text" placeholder="请输入手机号码" v-model="loginId"/>
                        <button class="common_button_item" type="text" @click="sendSmsCode">
                          {{smsCodeState?smsCodeCountDown:'获取验证码'}}
                        </button>
                      </div>
                    </li>
                    <li>
                      <div class="common_form_item">
                        <input class="common_input_item" type="text" placeholder="请输入验证码"
                               v-model="verificationCode"
                               @input="checkVerifyCode"/>
                      </div>
                    </li>
                    <li>
                      <div class="common_form_item">
                        <button v-if="receiveRewardFlag" class="common_button_item active"
                                :class="{'active':receiveRewardFlag===true}"
                                @click="acceptPrize">
                          领奖
                        </button>
                        <button v-if="receiveRewardFlag" class="common_button_item">
                          领奖
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-if="prizeData.code!==''" class="prize_wrapper">
                <!--<div class="prize_wrapper">-->

                <h1>{{prizeData.data.rewardPrompt}}</h1>
                <div class="main">
                  <div v-if="prizeData.code===10000||prizeData.code===10003" class="withpicture">
                    <div class="prizeimage">
                      <img v-if="prizeData.data.rewardType==='coin'" src="../image/share/coin.png"/>
                      <img v-if="prizeData.data.rewardType==='point'" src="../image/share/coin.png"/>
                      <img v-if="prizeData.data.rewardType==='bes_tv'" src="../image/share/bestv.png"/>
                      <img v-if="prizeData.data.rewardType==='deductible'" src="../image/share/bestv.png"/>
                    </div>
                    <div class="detail">
                      <label v-if="prizeData.data.rewardType==='coin'">{{prizeData.data.rewardValue}}趣豆！</label>
                      <label v-if="prizeData.data.rewardType==='point'">{{prizeData.data.rewardValue}}积分！</label>
                      <label v-if="prizeData.data.rewardType==='bes_tv'">百事通会员卡！</label>
                      <label v-if="prizeData.data.rewardType==='deductible'">折扣券</label>

                      <span v-if="prizeData.data.rewardType==='bes_tv'">奖品已放入您的账户</span>
                      <span v-else>想要大奖，自己发起活动吧</span>

                      <!--<a v-if="prizeData.data.rewardType==='bes_tv'" class="button" href='http://download.fnvalley.com' target="_blank">打开趣谷APP</a>-->
                      <a v-if="prizeData.data.rewardType==='bes_tv'" class="button" :href='downloadUrl'
                         target="_blank">打开趣谷APP</a>

                      <!--<a v-else class="button" href='http://download.fnvalley.com' target="_blank">我要发起</a>-->
                      <a v-else class="button" :href='downloadUrl' target="_blank">我要发起</a>
                    </div>
                  </div>
                  <div v-else class="withoutpicture">
                    <div class="detail">
                      <label>{{activityStatusDictionary.filter(item=>item.code===prizeData.code)[0].text}}</label>
                      <span>告诉你个小秘密，可以自己发起活动哦~</span>
                      <a class="button" :href='downloadUrl' target="_blank">我要发起</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="ranklist">
                <div class='common_blocktitle_item'>
                  <span><i></i></span>
                  <p>手气榜</p>
                  <span><i></i></span>
                </div>
                <ul>
                  <li v-for="(item, index) in rewardTraceListData">
                    <div class="avatar">
                      <div v-if="item.rewardUserImage!==null">
                        <!--<img :src="item.rewardUserImage"/>-->
                        <img :src="item.rewardUserImage"/>
                      </div>
                      <span class="query">?</span>
                    </div>
                    <div class="detail">
                      <div class="name">
                        <label>{{item.rewardUserNickName}}</label>
                        <span>{{$moment(item.createDate).utcOffset(0).format('MM.DD')}}</span>
                        <span>{{$moment(item.createDate).utcOffset(0).format(' hh:mm')}}</span>
                      </div>
                      <div class="comment">
                        {{item.rewardPrompt}}
                      </div>
                    </div>
                    <div class="prizename">
                      {{item.rewardValue}}{{prizeTypeDictionary.filter(item2=>item.rewardType===item2.code)[0].unit}}{{prizeTypeDictionary.filter(item2=>item.rewardType===item2.code)[0].name}}
                    </div>
                  </li>
                </ul>
                <!--<p class="hint">-->
                <!--只差一点点，大红包就是你的啦~-->
                <!--</p>-->
              </div>
              <div class="rules">
                <div class='common_blocktitle_item'>
                  <span><i></i></span>
                  <p>活动细则</p>
                  <span><i></i></span>
                </div>
                <ol>
                  <li>本次活动有效期为2018年7月16日至2018年10月31日</li>
                  <li>本次活动所有奖品为随机抽取得到</li>
                  <li>本次活动每次抽奖最高奖项为百视通半年会员</li>
                  <li>本次活动最高解释权归彬指网络科技（上海）有限公司所有</li>
                </ol>
              </div>
            </div>

          </div>
        </div>
        <div v-else>
          <div class="share_main_wrapper">
            <div class="prize_wrapper">
              <h1>Error</h1>
              <div class="main">
                <div class="withpicture">
                  <div class="prizeimage">
                    <img src="../image/share/404.png"/>
                  </div>
                  <div class="detail">
                    <span>请在微信中打开本页面</span>
                  </div>
                </div>
              </div>
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

  export default {
    name: "Promotion",
    components: {
      CommonLoading
    },
    data: function () {
      return {
        getUserInfoByTokenRequest: 'uaa/user',
        oauthTokenRequest: 'uaa/oauth/token',

        domainUrl: process.env.NODE_ENV === 'production' ? 'https://activity.fnvalley.com' : 'http://testactivity.fnvalley.com',
        sendBindWxMsgRequest: 'message-service/1.0.0/sms/sendBindWxMsg',
        verificationCodeRequest: 'message-service/1.0.0/sms/verificationCode',
        findUserActivityRewardTraceRequest: 'promotion-service/1.0.0/share_activity/findUserActivityRewardTrace',
        getAdvertiseRequest: 'advertising-service/1.0.0',


        getSignatureRequest: 'account-service/1.0.0/weChat/getSignature',

        weChatAuthorityURL: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$baseUrl + '&response_type=code&scope=snsapi_userinfo&state=' + this.stateCode + '&connect_redirect=1#wechat_redirect',
        acceptShareUserActivityRewardByAccessTokenRequest: 'promotion-service/1.0.0/share_activity/acceptShareUserActivityReward',
        get_daily_numberRequest: 'promotion-service/1.0.0/activity_participate_number/get_daily_number',


        swiperInstance: {},
        smsCodeState: false,
        smsCodeCountDown: 60,
        loginId: null,
        verifyCode: '',
        smsTemplate: 3,
        advertiseList: [],
        activityId: '',
        prizeStatus: '',
        redirectingFlag: true,
        openId: '',
        verificationCode: '',
        windowHeight: 0,
        receiveRewardFlag: false,
        rewardTraceListData: [],
        loginToGetPrizeFlag: false,
        wechatRedirectingFlag: true,
        loading: false,
        prizeData: {
          code: '',
          "data": {
            rewardPrompt: ''
          }
        },
        prizeDataMockData: {
          "code": 10000,
          "message": "success",
          "data": [{
            "loginId": "18321593357",
            "userActivityId": 322,
            "rewardId": 0,
            "userActivityRewardId": 82,
            "rewardType": "point",
            "rewardValue": null,
            "rewardStr": "point_100",
            "rewardPrompt": null,
            "rewardName": "积分",
            "rewardImage": "https://resource.fnvalley.com/test/wheel/hfs.png",
            "rewardDescription": "100积分",
            "rewardUserNickName": "呵呵",
            "rewardUserImage": "http://resource.zan-qian.com/test/memberHeadImage/1539329504749.jpg",
            "createDate": "2018-10-16 10:52:08",
            "eventId": "user_activity_reward_trace:318"
          }, {
            "loginId": "17521558498",
            "userActivityId": 322,
            "rewardId": 0,
            "userActivityRewardId": 84,
            "rewardType": "deductible",
            "rewardValue": null,
            "rewardStr": "deductible_5",
            "rewardPrompt": null,
            "rewardName": "代金券",
            "rewardImage": "https://resource.fnvalley.com/test/wheel/sz.png",
            "rewardDescription": "5元代金券",
            "rewardUserNickName": "前方高能",
            "rewardUserImage": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI9VJ2MITVA7GXoyTGJ2nlAmiaYkiaicIH7LreYXmaKkKBA49qibFVib5134FXHIq6WR36WGHycRLMia7Vg/132",
            "createDate": "2018-10-16 15:01:31",
            "eventId": "user_activity_reward_trace:319"
          }]
        },
        access_token: '',
        prizeTypeDictionary: [{
          name: '趣豆',
          code: 'coin',
          unit: ''
        }, {
          name: '积分',
          code: 'point',
          unit: ''
        }, {
          name: '百视通会员卡',
          code: 'bes_tv',
          unit: ''
        }, {
          name: '折扣券',
          code: 'deductible',
          unit: ''
        }],

        activityStatusDictionary: [{
          code: 10000,
          text: '恭喜你,抽中了！',
          type: 'withPicture'
        }, {
          code: 10001,
          text: '已参加活动',
          type: 'withoutPicture'
        }, {
          code: 10002,
          text: '今日领取次数已达上限',
          type: 'withoutPicture'
        }, {
          code: 10003,
          text: '已领取奖励',
          type: 'withoutPicture'
        }, {
          code: 10004,
          text: '哎呀，晚了一步',
          type: 'withoutPicture'
        }, {
          code: 10005,
          text: '领取奖励失败',
          type: 'withoutPicture'
        }, {
          code: 10006,
          text: '活动不在有效期内',
          type: 'withoutPicture'
        }, {
          code: 10007,
          text: '活动不存在',
          type: 'withoutPicture'
        }, {
          code: 10008,
          text: 'weChat信息错误',
          type: 'withoutPicture'
        }],
        redirectInfo: '',
        downloadUrl: '',
        environment: '',
        accessToken: '',
      }
    },
    computed: {
      userActivityId() {
        console.log('userActivityId', this.$route.query.state)
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
      }

    },
    watch: {
      weChatAuthorityURL(value) {
        console.log(value)
      },
      wechatRedirectingFlag(value) {
        if (!value) {
        }
      },
      redirectInfo(value) {
        console.log(value)
        // if (value === 'shareredirect') {
        //   location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$domainUrl + '&response_type=code&scope=snsapi_userinfo&state=' + this.stateCode + '#wechat_redirect')
        // } else {
        //   this.redirectingFlag = false;
        //   this.getUserInfoAndReceivePrize();
        //
        // }
      }
    },
    // created() {
    //   this.redirectInfo = this.$route.query.routeto;
    // },
    beforeMount() {


    },
    mounted() {
      this.wechatRedirectingFlag = false;

      this.$autoHeight({
        target: '.share_realpage_container'
      });
      this.$remResizing({
        fontSize: 20,
      });

      this.environment = this.$checkEnvironment();

      if (this.environment === 'wechat') {
        if (this.$route.query.routeto !== 'shareredirect') {
          this.wechatRedirectingFlag = false;
          this.$vux.loading.hide()
        } else {
          // alert(this.redirectInfo)
          this.$vux.loading.show({
            text: 'Loading'
          });
          this.redirectInfo = this.$route.query.routeto;
          this.stateCode = this.$route.query.state;
          this.wechatRedirectingFlag = true;

          this.reInitializePage()
        }
      }

      if (this.accessToken === '') {
        this.getAccessToken();
      } else {
        // this.getDailyTimes();
        this.initJSSDK()
      }

      this.getAdvertise();

      this.getRewardTraceList();

      this.getDownloadUrl();

      this.initJSSDK();
      console.log(Swiper)
      console.log(wx)
      // this.changeUrl();
    },
    methods: {
      getPrizeByAccessToken() {
        this.$http.post(this.$baseUrl + this.acceptShareUserActivityRewardByAccessTokenRequest + `/${this.userActivityId}`, {}, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${this.accessToken}`
          }
        }).then(response => {
          console.log('getPrizeByAccessToken', response)
          switch (response.code) {
            case 10000:
              this.prizeData = response;
              this.loginToGetPrizeFlag = false;
              break;
            case 10003:
              this.prizeData = response;
              this.loginToGetPrizeFlag = false;
              break;
            case 10010:
              this.$vux.confirm.show({
                showCancelButton: false,
                title: response.message,
                onConfirm() {
                }
              });
              break;
            default:

          }
          this.$vux.loading.hide();
          this.getRewardTraceList();
        })
      },

      getLoginIdByAccessToken() {
        let that = this;
        // that.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: 'begin to get loginId',
        //   onConfirm() {
        //   }
        // });
        this.$http.get(this.$baseUrl + this.getUserInfoByTokenRequest, {
          params: {
            access_token: this.accessToken
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.accessToken
          }
        }).then(response => {
          console.log(response)
          this.loginId = response.name;
          // alert('loginId===' + this.loginId)
          // Cookies.set('wheel-loginId', this.loginId);

        }).catch(error => {
          console.log(error)
          if (error.status === 401) {
            switch (this.environment) {
              case 'android':
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: '当前登录信息已失效，请关闭再打开页面(android)',
                  onConfirm() {
                  }
                });
                break;
              case 'ios':
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: '当前登录信息已失效，请关闭再打开页面(ios)',
                  onConfirm() {
                  }
                });
                break;
            }
          }
        });
      },
      getDailyTimes() {
        let that = this;
        this.$http.get(this.$baseUrl + this.get_daily_numberRequest + `/${this.activityId}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.accessToken
          }
        }).then(response => {
          console.log('getDailyTimes', response)
          // alert('getWechatToken+', response.data)
          this.dailyTimesFlag = true;
          this.dailyTimes = response.data;
          // sessionStorage.setItem('dailyTimes', this.dailyTimes)
        }).catch(error => {
          console.log(error)
          // alert('initJSSKD error')
          if (error.status === 401) {
            // this.$vux.confirm.show({
            //   showCancelButton: false,
            //   title: '当前登录信息已失效1',
            //   onConfirm() {
            //     that.tokenReceiveFlag = false;
            //   }
            // });
            switch (this.environment) {
              case 'android':
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: '当前登录信息已失效(android)',
                  onConfirm() {
                    that.tokenReceiveFlag = false;
                  }
                });
                break;
              case 'ios':
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: '当前登录信息已失效(ios)',
                  onConfirm() {
                    that.tokenReceiveFlag = false;
                  }
                });
                break;
            }
          }
        });
      },
      getAccessToken() {
        if (this.environment === 'wechat') {
          alert('this.getWechatToken+' + this.wechatAuthCode)
          if (!this.wechatRedirectingFlag) {
            this.getWechatToken({
              type: 'wechat_code',
              params: {
                code: this.wechatAuthCode
              }
            }).then(response => {
              console.log('this.getWechatToken', response)
              this.accessToken = response.access_token;
              sessionStorage.setItem('wheel-accessToken', this.accessToken)
              this.getPrizeByAccessToken();
              // this.getDailyTimes();

            });
            // this.$initJSSDK({
            //   state: 'channel=' + this.channel + '$activityId=' + this.activityId
            // });
            this.initJSSDK()
          }
        } else {


        }

      },
      getWechatToken(options) {
        return new Promise((resolve, reject) => {
          options = Object.assign({
            type: '',
            params: {}
          }, options);
          if (this.environment === 'wechat') {
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
              error = error.response;
              console.log('error', error)
              switch (error.data.code) {
                case 1:
                  this.dialogFlag = true;
                  this.loginToGetPrizeFlag = true;
                  this.openId = error.data.openId;
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: '没有找到此用户，请登录',
                    onConfirm() {
                      // this.reInitializePage();
                    }
                  });
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
                  this.cleanCache();
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
      reInitializePage() {
        let stateCode = this.stateCode;
        // alert('reInitializePage.stateCode', stateCode)
        location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$domainUrl + '&response_type=code&scope=snsapi_userinfo&state=' + stateCode + '#wechat_redirect')
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

      },
      sendSmsCode() {
        if (this.smsCodeState === false) {

          this.$vux.loading.show({
            text: 'Loading'
          });
          this.$vux.loading.show({
            text: 'Loading'
          });
          this.$http.get(this.$baseUrl + this.sendBindWxMsgRequest + '/' + this.loginId).then(response => {
              console.log(response)
              this.$vux.loading.hide();
              if (response.alreadySent === true) {
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: '短信已发出，请查收',
                  onConfirm() {
                  }
                });
                this.smsCodeState = true;
                if (this.smsCodeCountDown > 0) {
                  setInterval(() => {
                    this.smsCodeCountDown--;
                    if (this.smsCodeCountDown === 0) {
                      this.smsCodeState = false;
                    }
                  }, 1000)
                } else {
                  this.smsCodeState = false;
                }
              } else {
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: response.message,
                  onConfirm() {
                  }
                })
              }
            }
          ).catch(error => {
            console.log(error)
            this.$vux.loading.hide();

          })
        } else {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '短信已发出，请稍后再试',
            onConfirm() {
            }
          })
        }
      },
      checkVerifyCode() {
        console.log(this.verificationCode.toString().length)
        if (this.verificationCode.toString().length >= 5) {
          this.receiveRewardFlag = true;
        }
        console.log(this.receiveRewardFlag)
      },

      getRewardTraceList() {

        this.$vux.loading.show({
          text: 'Loading'
        });
        this.$http.get(this.$baseUrl + this.findUserActivityRewardTraceRequest + `/${this.userActivityId}`).then(response => {
          console.log('findUserActivityRewardTraceRequest', response)
          this.$vux.loading.hide();

          this.rewardTraceListData = response.data;
          this.rewardTraceListData.forEach((item, index) => {
            if (item.rewardUserImage !== null) {
              let result = Object.assign(this.rewardTraceListData[index], {
                availible: true,
                rewardUserImage: item.rewardUserImage.indexOf('resource') > 0 ? item.rewardUserImage + '-style_100x100' : item.rewardUserImage
              });
              this.$set(this.rewardTraceListData, index, result)
            }
          });
          console.log(555, this.rewardTraceListData)
        }).catch(error => {
          this.$vux.loading.hide();
          console.log(error)
        })
      },
      getAdvertise() {
        let deviceData = this.$getDevice();
        let deviceType;
        let location = 'qu_welfare_share_activity_web';
        if (deviceData.ios) {
          deviceType = 'ios'
        } else if (deviceData.android) {
          deviceType = 'android'
        } else {
          Object.keys(deviceData).forEach((item1, index1) => {
            if (deviceData[item1] === true) {
              deviceType = item1
            }
          });
        }
        if (deviceType !== 'ios' && deviceType !== 'android') {
          deviceType = 'ios';
        }

        this.$vux.loading.show({
          text: 'Loading'
        });
        this.$http.get(this.$baseUrl + this.getAdvertiseRequest + `/${deviceType}/${location}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(response => {
          console.log(response)
          this.$vux.loading.hide();

          this.advertiseList = response;
          this.$nextTick(() => {
            this.initSwiper();
          })
        }).catch(error => {
          this.$vux.loading.hide();

          console.log(error)
        })
      },
      acceptPrize() {
        console.log(this.receiveRewardParams)

        this.$vux.loading.show({
          text: 'Loading'
        });
        this.getWechatToken({
          type: 'sms',
          params: {
            username: this.loginId,
            code: this.verificationCode,
            source: 'zhinengxiaoyuan',
            promotionCode: '',
            openId: this.openId,
            channel: this.channel,
            activityId: this.activityId
          }
        }).then(response => {
          console.log(response)
          this.accessToken = response.access_token;
          this.getPrizeByAccessToken();

        }).catch(error => {

        });
        if (this.receiveRewardFlag) {


        } else {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '请输入完整的验证码',
            onConfirm() {
            }
          })
        }
      },
      imageError(index) {
        console.log(this.rewardTraceListData)
        console.log(index)

        this.$set(this.rewardTraceListData, index, Object.assign(this.rewardTraceListData[index], {
          availible: false
        }))
        // this.rewardTraceListData[index].availible = false;
      },
      initSwiper() {
        this.swiperInstance = new Swiper('.swiper-container', {
          autoplay: 5000,
          loop: true
        })
      },
      isWechat() {
        //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        let ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        console.log(this.$prodEnv)
        console.log(ua)
        return this.$prodEnv ? ua.match(/MicroMessenger/i) == 'micromessenger' : true;
        // return this.$prodEnv;
      },
      changeUrl() {
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$domainUrl + '&response_type=code&scope=snsapi_base&state=' + this.stateCode + '#wechat_redirect';
        window.history.pushState({}, 0, url);
      },
      getDownloadUrl() {
        let result;
        let deviceData = this.$getDevice();
        if (deviceData.ios) {
          result = 'https://itunes.apple.com/cn/app/%E8%B6%A3%E8%B0%B7-%E4%B8%80%E4%B8%AA%E6%87%82%E4%BD%A0%E7%9A%84app/id1397292579?mt=8'
        } else if (deviceData.android) {
          result = 'http://a.app.qq.com/o/simple.jsp?pkgname=io.cityzone.android'
        } else {
          result = 'http://download.fnvalley.com'
        }
        this.downloadUrl = result;
      }
    }
  }
</script>

<style scoped lang="css">
  @import '../assets/js/swiper/css/swiper.min.css';

</style>
