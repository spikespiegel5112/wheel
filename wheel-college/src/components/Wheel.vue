<template>
  <div>
    <div class="common_main_container">
      <div class="content" id="app">
        <div class="wheel_mainbg_item"></div>
        <div v-if="wechatRedirectingFlag" class="common_initializing_item"></div>
        <div v-show="!wechatRedirectingFlag" class="wheel_realpage_container">
          <!--<img id="pointer" src='../image/wheel/pointer_00000.png' style="display: none"/>-->
          <div class="header">
            <div class="nav">
              <div class="left">
                <a class="a" @click="goToRules">
                  活动规则
                </a>
                <!--<a>{{accessToken}}</a>-->
              </div>
              <div class="right">
                <a class="a" @click="loginToCheckMyPrize">
                  我的奖品
                </a>
              </div>
              <!--{{window.webkit?window.webkit:''}}-->
            </div>
            <div class="chance">
              <div class="decoration">
                <span class="left">
                  <i></i>
                  <label></label>
                </span>
                <span class="right">
                  <label></label>
                  <i></i>
                </span>
              </div>
              <p>
                <!--{{checkEnvironment()==='android'?window.android.getToken():''}}-->
                <!--<div>点击</div>-->
                <label v-if="!dailyTimesFlag">点击转盘开始抽奖</label>
                <label v-else>您有<span>{{dailyTimes!==-1?dailyTimes:'无限'}}</span>次领奖机会</label>

              </p>
            </div>

          </div>

          <div class="wheel_wrapper">
            <div class="wheel">
              <canvas id="wheelcanvas" :width="remUnit*13.5" :height="remUnit*13.5">抱歉！浏览器不支持。</canvas>

              <a v-if="!alreadyReleasedPrize&&!alreadyReceivedPrize" class="begin" @click="drawAndReceivePrize">
                <!--<span>开始抽奖</span>-->
              </a>
              <a v-else class="continue" @click="checkoutPrizeDetail">
                <!--<span>领取奖品</span>-->
              </a>
            </div>
            <div class="prizechance">
              <h1>点击右上角“<span>分享</span>”可以额外获得领奖机会</h1>
              <label>每邀请一位用户参与抽奖，获得一次抽奖机会</label>
            </div>
          </div>

          <div class='common_blocktitle_item'>
            <div>
              <span></span>
              <i></i>
            </div>
            <p>中奖名单</p>
            <div>
              <i></i>
              <span></span>
            </div>
          </div>
          <div class="winninglist">
            <ul>
              <li v-for="item in rewardRecordList">
                <label>恭喜{{item.loginId.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</label>
                <span>免费获得"{{item.rewardName}}"奖品</span>
              </li>
            </ul>
          </div>
        </div>
        <CommonLoading :loading="loading"/>
      </div>
    </div>

    <div v-show="dialogFlag" class="wheel_winningdialog_wrapper">
      <div class="login">
        <div v-if="tokenReceiveFlag" class="">
          <!--<div class="crown"></div>-->
          <div class="ribbon">
            <span class="left"></span>
            <div class="middle">
              恭喜你，中奖了！
            </div>
            <span class="right"></span>
          </div>
          <div class="dialog_wrapper acceptprize">
            <p class="title">
              {{prizeData.rewardName}}
            </p>
            <div class="hint">提示：同一个奖品只能领取一次 名额有限,先到先得~</div>
            <a class="button" :class="{active:routing}"
               :href="prizeData.rewardProduct!==null?prizeData.rewardProduct.url:''"
               @click="checkoutPrizeLink">免费领取</a>
          </div>
        </div>
        <div v-if="loginToGetPrizeFlag" class="">
          <div class="ribbon">
            <span class="left"></span>
            <div class="middle">
              趣谷
            </div>
            <span class="right"></span>
          </div>
          <div class="dialog_wrapper inputphonenumber">
            <p class="title">
              免费领取精美礼品
            </p>
            <div class="form">
              <div class="inputitem">
                <input class="phone" placeholder="请输入手机号" v-model="phoneNumber"/>
              </div>
              <div class="inputitem">
                <input class="smscode" placeholder="验证码" v-model="verificationCode"/>
                <a class="button smscodebutton" :class="{disable:smsCodeState}" @click="sendSmsCode">{{smsCodeState?smsCodeCountDown+'s':'获取'}}</a>
              </div>

              <p class="hint">提示：同一个奖品只能领取一次, 名额有限,先到先得~ </p>
              <a v-if="loginToGetPrizeListFlag" class="button" @click="login">登录</a>
              <a v-else class="button" @click="receivePrizeByForm">登录</a>
            </div>
          </div>
        </div>
        <div class="close">
          <x-icon type="ios-close-outline" size="30" @click="close"></x-icon>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Cookies from 'js-cookie'
  import wx from 'weixin-js-sdk'

  export default {
    name: "Wheel",
    data() {
      return {
        getUserInfoByTokenRequest: 'uaa/user',
        oauthTokenRequest: 'uaa/oauth/token',
        getActivityInfoRequest: 'promotion-service/1.0.0/rotary_table_activity/getActivityInfo',
        participate_activityRequest: 'promotion-service/1.0.0/rotary_table_activity/participate_activity',
        verificationCodeRequest: 'message-service/1.0.0/sms/verificationCode',

        queryRewardTraceRequest: 'promotion-service/1.0.0/rotary_table_activity/queryRewardTrace',
        queryRewardTraceByLoginIdRequest: 'promotion-service/1.0.0/rotary_table_activity/queryRewardTraceByLoginIdRequest',


        getSignatureRequest: 'account-service/1.0.0/weChat/getSignature',

        participate_accept_rewardRequest: 'promotion-service/1.0.0/rotary_table_activity/participate_accept_reward',

        get_daily_numberRequest: 'promotion-service/1.0.0/activity_participate_number/get_daily_number',


        // accept_rewardRequest: 'promotion-service/1.0.0/rotary_table_activity/accept_reward',


        // accessToken: '1fac3597-fb4c-4c55-aefe-8439bd3c17fa',
        accessToken: '',
        statisticImageUrl: '',

        wechatRedirectingFlag: true,
        loading: false,
        smsCodeState: false,


        jsCookieInstance: Cookies,
        redirectInfo: '',
        downloadUrl: '',
        colorDictionary: ['#feebcd', '#ffb54c'],
        textColorDictionary: ['#C21515', '#feebcd'],
        dotsColorDictionary: ['#ffd800', '#fe9166'],
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
          name: 'third_link',
          code: 'third_link',
          unit: ''
        }],
        wheelData: [{
          name: '比萨饼',
          value: 10,
          image: 'https://pic5.40017.cn/01/000/79/0a/rBLkBVpVuxmAUQqmAAARnUFXcFc487.png'
        }, {
          name: '酱肘子',
          value: 20,
          image: 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png'
        }, {
          name: '红烧肉',
          value: 30,
          image: 'http://pic.c-ctrip.com/platform/online/home/un_index_supply.png'
        }, {
          name: '炖排骨',
          value: 30,
          image: 'http://resource.fnvalley.com/test/icon/1534327599157.jpeg-style_100x100'
        }, {
          name: '小鸡炖蘑菇',
          value: 30,
          image: 'http://resource.fnvalley.com/test/icon/1534327599157.jpeg-style_100x100'
        }, {
          name: '牛排',
          value: 30,
          image: 'http://resource.fnvalley.com/test/icon/1534327599157.jpeg-style_100x100'
        }],
        sponsor: [{
          name: ''
        }],
        activityInfo: {},
        wheelCanvas: {},
        remUnit: 0,
        canvasWidth: '400px',
        canvasHeight: '400px',
        canvasReadyFlag: false,
        rotatingFlag: false,
        verificationCode: '',
        rotateDuration: 3000,
        dialogFlag: false,
        phoneNumber: '',
        phoneNumberReceiveFlag: false,
        tokenReceiveFlag: false,
        loginToGetPrizeFlag: false,
        loginToGetPrizeListFlag: false,
        smsCodeCountDown: 0,
        smsCodeCountDownDuration: 60,
        rewardRecordList: [],
        productToken: '',
        prizeData: {},
        alreadyReleasedPrize: false,
        alreadyReceivedPrize: false,
        rewardCode: '',
        actualRotate: 0,
        dailyLimit: '',
        pageFingerPrint: '',
        environment: '',
        stateCodeData: {},
        openId: '',
        loginId: '',
        userInfo: {},

        dailyTimes: 0,
        dailyTimesFlag: false,
        channel: '',
        activityId: '',
        accessTokenReadyFlag: false,
        testString: 'xxx',
        routing: false
      }
    },
    computed: {
      // activityId() {
      //   return this.$route.query.activityId || '';
      // },

      identityCode() {
        return this.$route.query.state;
      },
      wechatAuthCode() {
        console.log(this.$route)
        return this.$route.query.code
      },
      stateCode() {
        // alert(this.$route.query.state)
        return this.$route.query.state
      },
    },
    watch: {
      remUnit(value) {
        this.$nextTick(() => {
          this.canvasWidth = value * 13.5 + 'px';
          this.canvasHeight = value * 13.5 + 'px';
        })
      },
      weChatAuthorityURL(value) {
        console.log(value)
      },
      wechatRedirectingFlag(value) {
        if (!value) {
        }
      },
      alreadyReleasedPrize(value) {
        this.$nextTick(() => {
          sessionStorage.setItem('alreadyReleasedPrize', value)
        })
      },
      alreadyReceivedPrize(value) {
        this.$nextTick(() => {
          sessionStorage.setItem('alreadyReceivedPrize', value)
        })
      },
      rewardCode(value) {
        sessionStorage.setItem('rewardCode', value)
      },
      activityRewardMappingId(value) {
        sessionStorage.setItem('activityRewardMappingId', value)
      },
      prizeData(value) {
        console.log('prizeData', value)
        sessionStorage.removeItem('prizeData')
        sessionStorage.setItem('prizeData', JSON.stringify(value))
      },
      dailyLimit(value) {
        // alert(value)
        sessionStorage.setItem('dailyLimit', value)
      },
      redirectInfo(value) {
        // alert(value)
        console.log(value)

      },
      // accessToken(value) {
      //   if (value !== '') {
      //     sessionStorage.setItem('wheel-accessToken', value)
      //   }
      // },
      accessTokenReadyFlag(value) {

      },
      loginId(value) {
        this.channel = value;
      },
      channel(value) {
        // alert('set channel+ ' + value)
        Cookies.set('wheel-channel', value)
      },
      activityId(value) {
        sessionStorage.setItem('activityId', value)
      }
    },
    beforeCreate() {
      // this.channel = this.$route.query.channel || '';
      this.activityId = this.$route.query.activityId || '';
      // alert(this.activityId)
    },
    beforeMount() {
      let fullPath = window.location.href;


      // if (window.location.href.indexOf('#/') === window.location.href.length - 2) {
      //   window.assign()
      // }

    },
    mounted() {



      // alert('before')
      this.getCacheData().then(() => {
        this.$remResizing({
          fontSize: 20,
        });
        this.$nextTick(() => {
          // this.$autoHeight({
          //   target: '.common_initializing_item'
          // });
          this.$autoHeight({
            target: '.wheel_winningdialog_wrapper'
          });

          this.remUnit = Number(document.getElementsByTagName('html')[0].style.fontSize.replace('px', ''))
        });
        this.environment = this.$checkEnvironment();
        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: this.environment,
        //   onConfirm() {
        //     // this.reInitializePage();
        //   }
        // });
        //
        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: 'this.environment++' + this.environment,
        //   onConfirm() {
        //     // this.reInitializePage();
        //   }
        // });
        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: this.accessToken,
        //   onConfirm() {
        //     // this.reInitializePage();
        //   }
        // });

        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: 'this.environment+  ' + this.environment,
        //   onConfirm() {}
        // });
        console.log('this.environment', this.environment)

        this.$nextTick(() => {
        });
        this.parseStateCode();

        if (this.environment === 'wechat') {
          if (this.$route.query.routeto !== 'shareredirect') {
            // this.$vux.confirm.show({
            //   showCancelButton: false,
            //   title: 'this.$route.query.routeto+ ' + this.$route.query.routeto,
            //   onConfirm() {
            //   }
            // });
            this.wechatRedirectingFlag = false;
            this.$vux.loading.hide()
          } else {
            // alert(this.redirectInfo)
            this.$vux.loading.show({
              text: 'Loading'
            });
            this.redirectInfo = this.$route.query.routeto;
            this.wechatRedirectingFlag = true;

            this.reInitializePage()
          }
        } else {

          // alert('routeto+' + this.$route.query.routeto)

          this.wechatRedirectingFlag = false;

          // alert('activityId+'+this.$route.query.activityId)
          // alert('channel+'+this.$route.query.channel)

          if (this.$route.query.channel !== undefined) {
            this.channel = this.$route.query.channel;
          }
          if (this.$route.query.activityId !== undefined) {
            this.activityId = this.$route.query.activityId;
          } else {
            // alert('activityId is undefined')
          }
        }
        this.getPrizeList();

        this.getRewardRecordList();

        // alert('begin to check accessToken '+ this.accessToken)
        if (this.accessToken === '') {
          // debugger
          // alert('No accessToken+' + this.accessToken)

          this.getAccessToken();
        } else {
          // debugger
          // alert('check accessToken+' + this.accessToken)
          this.getDailyTimes();
          this.initJSSDK()
        }
        //
        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: this.accessToken,
        //   onConfirm() {
        //   }
        // });

        // alert('after')

        this.checkUUID();
        this.getStatisticImageUrl();
        this.recordStatisticEvent('onLoad');

      });


      // setTimeout(function getAppToken(json) {
      //   debugger
      //   //alert("msg:"+json.token);
      //   alert(json)
      //   var gettoken = document.createElement('p');
      //   gettoken.id = 'div_id';
      //   gettoken.innerHTML = json.token;
      //   document.body.appendChild(gettoken);
      // }, 2000)


    },
    methods: {
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

      parseStateCode() {
        let result = [];
        // alert('stateCode+ ' + this.stateCode)
        // alert('stateCode+ ' + this.$route.query.state)
        if (this.stateCode !== undefined) {
          let code = decodeURIComponent(this.stateCode)

          code.split('$').forEach(item => {
            result[item.split('=')[0]] = item.split('=')[1]
          });
          // alert('result.channel+' + result.channel)
          // alert('result.activityId+' + result.activityId)
          this.stateCodeData = result;
          this.channel = result.channel;
          this.activityId = result.activityId;
        }
        console.log('parseStateCode', result)
        console.log('channel', this.channel)
        // alert('channel+ ', this.channel)

      },
      getAccessToken() {
        let that = this;
        // that.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: 'environment+   ' + this.environment,
        //   onConfirm() {
        //     // this.reInitializePage();
        //   }
        // });
        // alert('getAccessToken+' + this.accessToken)
        if (this.environment === 'wechat') {
          // alert('this.getWechatToken+' + this.wechatAuthCode)
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
              this.getDailyTimes();
              this.getLoginIdByAccessToken();
            });
            // this.$initJSSDK({
            //   state: 'channel=' + this.channel + '$activityId=' + this.activityId
            // });
            this.initJSSDK()
          }


        } else {
          // that.$vux.confirm.show({
          //   showCancelButton: false,
          //   title: 'begin to get token',
          //   onConfirm() {
          //   }
          // });
          this.$nextTick(() => {
            switch (this.environment) {
              case 'android':
                this.accessToken = window.android.getToken();
                // alert('android_accesstoken+' + this.accessToken)
                this.getLoginIdByAccessToken();
                this.getDailyTimes();
                sessionStorage.setItem('wheel-accessToken', this.accessToken)

                break;
              case 'ios':
                // this.$vux.confirm.show({
                //   showCancelButton: false,
                //   title: 'environment+ios',
                //   onConfirm() {
                //   }
                // });
                window.webkit.messageHandlers.token.postMessage('');
                window.getAppToken = function (json) {
                  that.accessToken = json.token;
                  // that.$vux.confirm.show({
                  //   showCancelButton: false,
                  //   title: 'json+   ' + json.token,
                  //   onConfirm() {
                  //   }
                  // });
                  that.getLoginIdByAccessToken();
                  that.getDailyTimes();
                  sessionStorage.setItem('wheel-accessToken', that.accessToken)
                };


                // this.$vux.confirm.show({
                //   showCancelButton: false,
                //   title: 'window.webkit.messageHandlers.token++' + window.webkit.messageHandlers.token,
                //   onConfirm() {
                //     // this.reInitializePage();
                //   }
                // });
                break;
            }
            // alert('notwechat')


          });

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
              console.log('error', error)
              switch (error.data.code) {
                case 1:
                  this.dialogFlag = true;
                  this.loginToGetPrizeFlag = true;
                  this.openId = error.data.openId;
                  this.cleanCache();

                  reject(error);
                  break;
                case 2:

                  // this.dialogFlag = true;
                  // this.loginToGetPrizeFlag = true;
                  this.cleanCache();
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
                  this.cleanCache();
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
        let stateCode = `channel=${this.channel}$activityId=${this.activityId}`;
        // alert('reInitializePage.stateCode', stateCode)
        location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$domainUrl + '&response_type=code&scope=snsapi_userinfo&state=' + stateCode + '#wechat_redirect')
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
          Cookies.set('wheel-loginId', this.loginId);

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

      getPrizeList() {
        this.loading = true;
        this.$http.get(this.$baseUrl + this.getActivityInfoRequest, {
          params: {
            activityId: this.activityId
          }
        }).then(response => {
          console.log('getPrizeList', response)
          this.loading = false;
          response = response.data;
          this.wheelData = [];
          this.activityInfo = response.activityInfo;
          // alert(JSON.parse(sessionStorage.getItem('dailyLimit')))

          if (JSON.parse(sessionStorage.getItem('dailyLimit') === 'null')) {
            this.dailyLimit = response.activityInfo.dailyLimit;
          }
          response.rewardList.forEach((item, index) => {
            let name;
            if (item.rewardType !== 'point') {
              name = item.rewardName;
            } else {
              name = item.rewardValue + item.description;
            }
            this.wheelData.push({
              name: name,
              image: item.rewardImage !== null ? item.rewardImage + '-style_100x100' : '',
              // image: 'https://pic5.40017.cn/01/000/79/0a/rBLkBVpVuxmAUQqmAAARnUFXcFc487.png',
              value: item.activityRewardMappingId,
            })

          });

          this.drawCanvas();
          this.getCachedCircleNumber();

        }).catch(error => {
          console.log(error)
          this.loading = false;
          // this.$vux.confirm.show({
          //   showCancelButton: false,
          //   title: 'getPrizeList error+ ' + error.data.message,
          //   onConfirm() {
          //   }
          // })
        })
      },

      checkoutPrizeDetail() {
        this.loading = false;
        this.recordStatisticEvent('checkoutPrizeDetail');
        // alert(Cookies.get('wheel-accessToken'))
        this.dialogFlag = true;
        // this.phoneNumberReceiveFlag = false;
        this.tokenReceiveFlag = true;


      },
      checkoutPrizeLink() {
        console.log('checkoutPrizeLink', this.prizeData)
        let homeUrl = this.$domainUrl + '?code=xxxx&state=channel=' + Cookies.get('wheel-channel') + '$activityId=' + sessionStorage.getItem('activityId');
        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: this.wechatRedirectLink,
        //   onConfirm() {
        //   }
        // })
        // alert(this.wechatRedirectLink)

        this.routing = true;
        history.replaceState({}, null, homeUrl);
        if (this.prizeData.rewardProduct !== null && this.prizeData.rewardProduct !== undefined) {
          location.assign(this.prizeData.url)
        }
      },
      drawAndReceivePrize() {
        // alert('drawAndReceivePrize')
        if (this.accessToken === '' && this.openId !== '') {
          this.dialogFlag = true;
          this.loginToGetPrizeFlag = true;
        } else if (this.accessToken === '' && this.openId === '') {
          // alert(this.accessToken)
          // alert(this.openId)
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '获取不到用户信息，请关闭页面',
            onConfirm() {
            }
          });
        } else {
          // alert('accessToken=' + this.accessToken + 'openId=' + this.openId)
          if (!this.rotatingFlag) {
            this.receivePrizeByToken();
          }
        }

      },
      getCachedCircleNumber() {
        if (sessionStorage.getItem('actualRotate') !== undefined && sessionStorage.getItem('actualRotate') !== 0) {
          this.actualRotate = sessionStorage.getItem('actualRotate');
          let offsetAngle = this.actualRotate % 360;
          // alert(offsetAngle)
          // this.wheelCanvas.style.transform = 'rotate(' + this.actualRotate + 'deg)';
          this.wheelCanvas.style.transform = 'rotate(' + offsetAngle + 'deg)';
        }
      },
      rotateWheel(offset) {
        return new Promise((resolve, reject) => {
          console.log(111, offset)

          //因为canvas绘图顺序为顺时针，旋转顺序也为顺时针的话，旋转过后的个数会从最大值往最小值数，所以索性对偏移的个数进行取反
          offset = this.wheelData.length - offset;
          let initRotateAngle = 3600;
          let unitAngle = 360 / this.wheelData.length;
          console.log(222, initRotateAngle + unitAngle * offset)
          this.actualRotate = initRotateAngle + unitAngle * offset;
          // alert(this.actualRotate)
          this.wheelCanvas.style.transform = 'rotate(-' + this.actualRotate + 'deg)';

          sessionStorage.setItem('actualRotate', this.actualRotate);
          if (!this.rotatingFlag) {
            this.rotatingFlag = true;
            this.wheelCanvas.style.transition = 'all ' + this.rotateDuration / 1000 + 's ease';
            this.wheelCanvas.style.transform = 'rotate(' + this.actualRotate + 'deg)';
            setTimeout(() => {
              this.rotatingFlag = false;
              this.wheelCanvas.style.transition = 'rotate 0s ease';
              resolve();
            }, this.rotateDuration)
          } else {
            reject();
          }
        })
      },
      validateForm() {
        return new Promise((resolve, reject) => {
          this.phoneNumber = this.phoneNumber.replace(/(^\s*)|(\s*$)/g, '');
          this.verificationCode = this.verificationCode.replace(/(^\s*)|(\s*$)/g, '');
          if (this.phoneNumber === '') {
            this.$vux.confirm.show({
              showCancelButton: false,
              title: '手机号未填写',
              onConfirm() {
              }
            });
            reject();
            return
          }

          if (/^[1-9]+[0-9]*]*$/.test(this.phoneNumber) === false) {
            this.$vux.confirm.show({
              showCancelButton: false,
              title: '手机号不是数字',
              onConfirm() {
              }
            });
            reject();
            return
          }
          if (/^[1-9]+[0-9]*]*$/.test(this.verificationCode) === false) {
            this.$vux.confirm.show({
              showCancelButton: false,
              title: '验证码不是数字',
              onConfirm() {
              }
            });
            reject();
            return
          }
          if (/^\d{6}$/.test(this.verificationCode) === false) {
            this.$vux.confirm.show({
              showCancelButton: false,
              title: '验证码不为6位数字',
              onConfirm() {
              }
            });
            reject();
            return
          }
          if (this.verificationCode === '') {
            this.$vux.confirm.show({
              showCancelButton: false,
              title: '验证码未填写',
              onConfirm() {
              }
            });
            reject();

          }
          resolve()
        })
      },
      receivePrizeByForm() {
        let that = this;
        console.log('this.channel', this.channel)
        this.validateForm().then(() => {
          this.getWechatToken({
            type: 'sms',
            params: {
              username: this.phoneNumber,
              code: this.verificationCode,
              source: 'zhinengxiaoyuan',
              promotionCode: '',
              openId: this.openId,
              channel: this.channel,
              activityId: this.activityId
            }
          }).then(response => {
            console.log('receivePrizeByForm', response)
            this.dialogFlag = false;
            this.loginToGetPrizeFlag = false;
            sessionStorage.setItem('userInfo', JSON.stringify(response));
            // Cookies.set('wheel-loginId', this.loginId);
            this.receivePrizeByToken();
            this.getLoginIdByAccessToken();

          });
        })

      },
      login() {
        this.validateForm().then(() => {
          this.getWechatToken({
            type: 'sms',
            params: {
              username: this.phoneNumber,
              code: this.verificationCode,
              source: 'zhinengxiaoyuan',
              promotionCode: '',
              openId: this.openId,
              channel: this.channel,
              activityId: this.activityId
            }
          }).then(response => {
            this.$http.post(this.$baseUrl + this.oauthTokenRequest, {
              grant_type: 'sms',
              username: this.phoneNumber,
              code: this.verificationCode
            }, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic YW5kcm9pZDphZG1pbg=='
              },
              transformRequest: [function (data) {
                let ret = '';
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }]
            }).then(response => {
              console.log(response)
              sessionStorage.setItem('wheel-accessToken', response.access_token);
              Cookies.set('wheel-loginId', this.phoneNumber);
              this.$router.push({
                name: 'myPrizeList',
                query: {
                  channel: Cookies.get('wheel-loginId'),
                  pageNo: 0,
                  activityId: this.activityId,
                  token: response.access_token
                }
              })
            }).catch(error => {
              this.$vux.confirm.show({
                showCancelButton: false,
                title: 'login error' + error.data.error_description || 'login error' + error.data.message,
                onConfirm() {
                }
              })
            })
          })
        })
      },
      receivePrizeByToken() {
        // alert('进入抽奖')
        // alert('开始抽奖+' + this.accessToken)
        // alert('开始抽奖+' + this.activityId)
        this.$http.post(this.$baseUrl + this.participate_accept_rewardRequest + `/${this.activityId}`, {}, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${this.accessToken}`
          }
        }).then(response => {
          // alert('抽奖成功')

          console.log('participate_accept_rewardRequest', response)
          let responseMetaData = response;
          response = response.data;
          switch (responseMetaData.code) {
            case 10000:
              console.log('10000', this.wheelData)
              this.rewardCode = response.rewardCode;
              this.wheelData.forEach((item1, index1) => {
                if (item1.value === response.activityRewardMappingId) {
                  //获取并缓存奖品信息不需要一定等到转盘转完再存
                  this.prizeData = Object.assign(response, {
                    rewardName: item1.name
                  });
                  this.activityRewardMappingId = response.activityRewardMappingId;
                  this.channel = this.loginId;

                  this.rotateWheel(index1).then(() => {
                    this.alreadyReceivedPrize = true;
                    this.alreadyReleasedPrize = true;

                    this.getDailyTimes();

                    // this.dailyLimit = Number(this.dailyLimit) > 0 ? Number(this.dailyLimit) - 1 : this.dailyLimit;

                    this.$store.commit('turnOffWinningPrizeChance');

                    this.checkoutPrizeDetail();

                  })
                }
              });
              break;
            case 10002:
              this.$vux.confirm.show({
                showCancelButton: false,
                title: responseMetaData.message,
                onConfirm() {
                }
              });
              break;
            case 10004:
              this.$vux.confirm.show({
                showCancelButton: false,
                title: responseMetaData.message,
                onConfirm() {
                }
              });
              break;
          }
          this.getDailyTimes();
        }).catch(error => {
          // alert('抽奖失败')
          console.log(error)
          if (error.status === 401) {
            switch (this.environment) {
              case 'android':
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: '当前登录信息已失效，请关闭再打开页面',
                  onConfirm() {
                    that.tokenReceiveFlag = false;
                    window.android.refreshToken()
                  }
                });
                break;
              case 'ios':
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: '当前登录信息已失效，请关闭再打开页面',
                  onConfirm() {
                    that.tokenReceiveFlag = false;
                    window.android.refreshToken()
                  }
                });
                break;
            }
          }
        });
        // let that = this;
        // if (this.alreadyReceivedPrize) {
        //   // alert('direct')
        //   this.$router.push({
        //     name: 'myPrizeList',
        //     query: {
        //       channel: Cookies.get('wheel-loginId'),
        //       activityId: this.activityId,
        //       pageNo: 0,
        //       token: this.accessToken
        //     }
        //   })
        // } else {
        //
        // }
      },
      drawCanvas() {
        console.log(this.remUnit)
        // console.log(this.canvasWidth)
        // console.log(this.wheelData)
        this.wheelCanvas = document.getElementById('wheelcanvas');
        let ctx = this.wheelCanvas.getContext('2d');
        let ctx2 = this.wheelCanvas.getContext('2d');

        let baseAngle = Math.PI * 2 / this.wheelData.length;
        // document.querySelector('.wheel_wrapper .wheel').style.width = this.remUnit * 13.5;
        // document.querySelector('.wheel_wrapper .wheel').style.height = this.remUnit * 13.5;

        let canvasWidth = this.remUnit * 13.5;
        let canvasHeight = this.remUnit * 13.5;
        // console.log(canvasWidth)
        // console.log(canvasHeight)

        ctx.font = this.remUnit;

        ctx2.beginPath();
        ctx2.arc(canvasWidth / 2, canvasHeight / 2, this.remUnit * 6.75, 0, Math.PI * 2, true);
        ctx2.fillStyle = 'rgba(188,75,61,0.5)';
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(canvasWidth / 2, canvasHeight / 2, this.remUnit * 6.57, 0, Math.PI * 2, true);
        ctx2.fillStyle = '#bc4b3d';
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(canvasWidth / 2, canvasHeight / 2, this.remUnit * 6.35, 0, Math.PI * 2, true);
        ctx2.fillStyle = '#f06949';
        ctx2.fill();


        ctx2.save();

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

        let imageSequence = [];

        this.wheelData.forEach((item, index) => {
          let imageObj = new Image();
          imageObj.width = '150';
          imageObj.height = '150';
          imageObj.src = this.wheelData[index].image;
          imageObj.transparency = 0.2;
          imageSequence.push(imageObj);
        });


        this.wheelData.forEach((item, index) => {
          let angle = baseAngle * index;

          if (this.checkLowestCommonDivisorWith2(this.wheelData.length)) {
            angle = angle - Math.PI;
          } else {
            angle = angle - Math.PI + baseAngle;
          }

          ctx.beginPath();
          ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
          ctx.lineWidth = 3;
          if (this.checkLowestCommonDivisorWith2(this.wheelData.length)) {
            ctx.arc(canvasWidth / 2, canvasHeight / 2, this.remUnit * 5.4, angle + baseAngle - Math.PI / this.wheelData.length, angle - Math.PI / this.wheelData.length, true);
          } else {
            ctx.arc(canvasWidth / 2, canvasHeight / 2, this.remUnit * 5.4, angle + baseAngle, angle, true);
          }
          ctx.lineTo(canvasWidth / 2, canvasHeight / 2);

          ctx.strokeStyle = '#f06949';
          ctx.stroke();
          ctx.fillStyle = this.colorDictionary[index % 2];

          ctx.save();
          ctx.fill();

          imageSequence[index].onload = () => {
            let translateX, translateY;
            if (this.checkLowestCommonDivisorWith2(this.wheelData.length)) {
              translateX = canvasWidth * 0.5 + Math.cos(angle + baseAngle / 2 - Math.PI / 2 - Math.PI / this.wheelData.length) * this.remUnit * 5;
              translateY = canvasHeight * 0.5 + Math.sin(angle + baseAngle / 2 - Math.PI / 2 - Math.PI / this.wheelData.length) * this.remUnit * 5;
            } else {
              translateX = canvasWidth * 0.5 + Math.cos(angle + baseAngle / 2) * this.remUnit * 5;
              translateY = canvasHeight * 0.5 + Math.sin(angle + baseAngle / 2) * this.remUnit * 5;
            }

            ctx.font = this.remUnit * 0.5 + "px Georgia";
            ctx.fillStyle = this.textColorDictionary[index % 2];
            ctx.translate(translateX, translateY);
            // ctx.rotate(angle + Math.PI / 2);
            ctx.rotate(angle + Math.PI / 2 + baseAngle / 2);

            // if (this.checkLowestCommonDivisorWith2(this.wheelData.length)) {
            //   //
            //   ctx.rotate(angle + Math.PI / 2);
            // } else {
            //   ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
            // }
            ctx.fillText(this.wheelData[index].name, -ctx.measureText(this.wheelData[index].name).width / 2, 22);
            // let currentImageUrlData=this.wheelCanvas.getContext('2d').toDataURL('image/png', 1);
            // console.log(currentImageUrlData)
            ctx.drawImage(imageSequence[index], -this.remUnit * 2 * 0.5, this.remUnit * 1.3, this.remUnit * 2, this.remUnit * 2);
            ctx.shadowColor = '#000'; // green for demo purposes
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // ctx.drawImage(currentImageUrlData, 0, 0, currentImageUrlData.width, currentImageUrlData.height, -this.remUnit, this.remUnit * 1.2, this.remUnit * 2, this.remUnit * 2)

            ctx.restore();
            ctx.save();

          };
          ctx.restore();
          ctx.save();

        });
        this.getCachedCircleNumber();


      },

      sendSmsCode() {
        if (this.phoneNumber === '') {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '请输入手机号',
            onConfirm() {
            }
          });
          return;
        }
        if (this.smsCodeState === false) {
          this.loading = true;
          this.$http.get(this.$baseUrl + this.verificationCodeRequest + `/${this.phoneNumber}/1`).then(response => {
              console.log(response)
              this.loading = false;
              if (response.alreadySent === true) {
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: '短信已发出，请查收',
                  onConfirm() {
                  }
                });
                this.smsCodeState = true;
                this.smsCodeCountDown = this.smsCodeCountDownDuration;
                if (this.smsCodeCountDown > 0) {
                  setInterval(() => {
                    this.smsCodeCountDown--;
                    if (this.smsCodeCountDown === 0) {
                      this.smsCodeState = false;
                      this.smsCodeCountDown = 60;
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
            this.$vux.confirm.show({
              showCancelButton: false,
              title: '短信已发出，请稍后再试',
              onConfirm() {
              }
            });
            this.loading = false;
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
      checkLowestCommonDivisorWith2(source) {
        let flag = true;
        for (let i = 2; i < source; i++) {
          source = source / 2;
          if (source !== 2) {
            flag = source % 2 === 0
          }
        }
        return flag;
      },
      changeUser() {
        this.phoneNumber = '';
        this.verificationCode = '';
        // this.phoneNumberReceiveFlag = true;
        this.tokenReceiveFlag = false;
        sessionStorage.removeItem('wheel-accessToken')
      },
      getRewardRecordList() {
        this.$http.get(this.$baseUrl + this.queryRewardTraceRequest, {
          params: {
            activityId: this.activityId
          }
        }).then(response => {
          console.log('getRewardRecordList', response)
          response = response.data;
          this.rewardRecordList = response;
        })
      },
      close() {
        this.dialogFlag = false;
        // this.phoneNumberReceiveFlag = false;
        this.tokenReceiveFlag = false;
        this.loginToGetPrizeFlag = false;
      },
      checkAuthorized() {
        let accessTokenFlag = this.accessToken !== '' && this.accessToken !== 'undefined' && this.accessToken !== undefined;
        let loginIdFlag = this.loginId !== '' && this.loginId !== undefined && this.loginId !== 'undefined';
        let result = accessTokenFlag && loginIdFlag;
        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: this.accessToken,
        //   onConfirm() {
        //   }
        // });
        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: this.loginId,
        //   onConfirm() {
        //   }
        // });
        return result;
      },
      loginToCheckMyPrize() {
        if (!this.checkAuthorized()) {
          this.dialogFlag = true;
          this.loginToGetPrizeListFlag = true;
          this.loginToGetPrizeFlag = true;
        } else {
          this.$router.push({
            name: 'myPrizeList',
            query: {
              channel: Cookies.get('wheel-loginId'),
              activityId: this.activityId,
              pageNo: 0,
              token: this.accessToken
            }
          })
        }
      },


      getCacheData() {
        return new Promise((resolve, reject) => {
          let ready = false;
          setTimeout(() => {
            let regex = new RegExp(/(true)|(false)/);
            console.log(regex.test(sessionStorage.getItem('alreadyReleasedPrize')))

            if (regex.test(sessionStorage.getItem('alreadyReleasedPrize'))) {
              this.alreadyReleasedPrize = eval(sessionStorage.getItem('alreadyReleasedPrize'));
              this.rewardCode = sessionStorage.getItem('rewardCode');
              this.activityRewardMappingId = sessionStorage.getItem('activityRewardMappingId');
              this.prizeData = JSON.parse(sessionStorage.getItem('prizeData'))
            }
            if (regex.test(sessionStorage.getItem('alreadyReceivedPrize'))) {
              this.alreadyReceivedPrize = eval(sessionStorage.getItem('alreadyReceivedPrize'));
            }
            if (typeof Number(sessionStorage.getItem('dailyLimit')) === 'number') {
              this.dailyLimit = sessionStorage.getItem('dailyLimit');
            }
            if (typeof Number(sessionStorage.getItem('activityId')) === 'number') {
              this.activityId = sessionStorage.getItem('activityId');
            }
            if (typeof JSON.parse(sessionStorage.getItem('prizeData')) === 'object') {
              this.alreadyReleasedPrize = eval(sessionStorage.getItem('alreadyReleasedPrize'));
            } else {
              console.log(Object.keys(JSON.parse(sessionStorage.getItem('prizeData'))).length > 0)
              this.cleanCache();
            }
            if (typeof JSON.parse(sessionStorage.getItem('userInfo')) === 'object') {
              this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            }
            if (sessionStorage.getItem('wheel-accessToken') !== null && sessionStorage.getItem('wheel-accessToken') !== 'null') {
              this.accessToken = sessionStorage.getItem('wheel-accessToken')
            }
            if (Cookies.get('wheel-loginId') !== null) {
              // alert('Cookies loginId+ ' + Cookies.get('wheel-loginId'))
              this.loginId = Cookies.get('wheel-loginId');
            }
            if (sessionStorage.getItem('dailyTimes') !== null && sessionStorage.getItem('dailyTimes') !== 'null') {
              this.dailyTimes = sessionStorage.getItem('dailyTimes')
            }

            resolve()
          }, 500)

        })

      },
      cleanCache() {
        this.alreadyReleasedPrize = false;
        this.alreadyReceivedPrize = false;
        this.dialogFlag = false;
        this.phoneNumberReceiveFlag = false;
        this.tokenReceiveFlag = false;
        setTimeout(() => {
          sessionStorage.removeItem('alreadyReleasedPrize')
          sessionStorage.removeItem('alreadyReceivedPrize')
          sessionStorage.removeItem('rewardCode')
          sessionStorage.removeItem('activityRewardMappingId')
          sessionStorage.removeItem('prizeData')
          sessionStorage.removeItem('actualRotate')
          sessionStorage.removeItem('dailyLimit')
          sessionStorage.removeItem('userInfo')
          sessionStorage.removeItem('wheel-accessToken')
        }, 500)
      },
      getStatisticImageUrl() {
        this.statisticImageUrl = this.$baseUrl + 'message-service/1.0.0/statistics.jpg?source=zhinengxiaoyuan&timeStamp=' + Date.parse(new Date())
      },
      recordStatisticEvent(eventCode) {
        let imageTag = document.createElement("img");
        imageTag.className = 'statistic';
        imageTag.src = `${this.$baseUrl}message-service/1.0.0/statistics.jpg?source=zhinengxiaoyuan&timeStamp=${Date.parse(new Date())}&eventId=${eventCode}&webId=${this.pageFingerPrint}`;
        imageTag.width = 0;
        imageTag.height = 0;
        document.querySelector('.wheel_realpage_container').appendChild(imageTag);
      },
      checkUUID() {
        if (!Cookies.get('wheel-pageFingerPrint')) {
          this.pageFingerPrint = this.$generateUUID();
          Cookies.set('wheel-pageFingerPrint', this.pageFingerPrint)
        } else {
          this.pageFingerPrint = Cookies.get('wheel-pageFingerPrint');
        }
      },
      initJSSDK() {
        console.log('777', location.href.split('#')[0])
        let wx = this.$wechat;
        // alert(location.href.split('#')[0])
        let wechatRedirectLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=http://activity.fnvalley.com/collegewheel/index.html&response_type=code&scope=snsapi_userinfo&state=channel=' + this.channel + '$activityId=' + this.activityId + '#wechat_redirect';
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
          console.log('getSignatureRequest', response)

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
            console.log('wechat ok!')
            // alert('wechat ok!')
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

            // alert(stateCode)
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
      checkUserAgent() {
        let ua = navigator.userAgent;
        let environment
        // 安卓
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
// IOS
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        let isWechat = !!ua.match(/MicroMessenger/i) === "micromessenger";
        if (isAndroid) {
          environment = 'android'
          // alert('Android');
        } else if (isiOS) {
          environment = 'ios'
          // alert('iOS');
        } else if (isWechat) {
          // alert('wechat');
          environment = 'wechat'
        } else {
          // alert('web');
          environment = 'web'
        }

        this.environment = environment;
        return environment;
      },
      goToRules() {
        this.$router.push({
          name: "activityRules",
          query: {
            channel: Cookies.get('wheel-loginId'),
            activityId: this.activityId,
            token: this.accessToken
          }
        })
      }
    }
  }


</script>

<style scoped lang="scss"></style>
