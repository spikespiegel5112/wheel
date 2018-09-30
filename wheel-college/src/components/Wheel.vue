<template>
  <div>
    <div class="common_main_container">
      <div class="content" id="app">
        <div class="bg"></div>

        <div class="wheel_realpage_container">
          <!--<img id="pointer" src='../image/wheel/pointer_00000.png' style="display: none"/>-->
          <div class="header">
            <div class="nav">
              <div class="left">
                <router-link class="a" :to="{name:'activityRules'}">
                  活动规则
                </router-link>
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
                您有<span>{{dailyTimes!==-1?dailyTimes:'无限'}}</span>次领奖机会
              </p>
            </div>

          </div>

          <div class="wheel_wrapper">
            <div class="wheel">
              <canvas id="wheelcanvas" :width="remUnit*13.5" :height="remUnit*13.5">抱歉！浏览器不支持。</canvas>

              <a v-if="!alreadyReleasedPrize&&!alreadyReceivedPrize" class="begin" @click="drawAndReceivePrize">
                <!--<span>开始抽奖</span>-->
              </a>
              <a v-else class="continue" @click="receivePrize">
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
        <div v-if="phoneNumberReceiveFlag" class="">
          <div class="crown"></div>
          <div class="dialog_wrapper inputphonenumber">
            <p class="hint">
              已抽中"{{prizeData.rewardName}}"<br/>
              <span>登录即可免费获得</span>
            </p>
            <div class="form">
              <div class="inputitem">
                <input class="phone" placeholder="请输入手机号" v-model="phoneNumber"/>
              </div>
              <div class="inputitem">
                <input class="smscode" placeholder="验证码" v-model="verificationCode"/>
                <a class="button smscodebutton" :class="{disable:smsCodeState}" @click="sendSmsCode">{{smsCodeState?smsCodeCountDown+'s':'获取'}}</a>
              </div>
              <a class="button" @click="receivePrizeByForm">免费领取</a>
            </div>
          </div>
        </div>
        <div v-if="tokenReceiveFlag" class="">
          <div class="crown"></div>
          <div class="dialog_wrapper acceptprize">
            <p class="hint">

              已抽中"{{prizeData.rewardName}}"
            </p>
            <div class="banner">
              <img src="../image/wheel/prize.png"/>
            </div>
            <a class="button" @click="receivePrizeByToken">免费领取</a>
            <div class="userinfo">
              <span>{{jsCookieInstance.get('wheel-loginId')}}</span>
              <!--<a @click="changeUser"><label>立即修改</label>></a>-->
            </div>
          </div>
        </div>
        <div v-if="loginToGetPrizeFlag" class="">
          <div class="dialog_wrapper inputphonenumber">
            <p class="hint">
              登 录
            </p>
            <div class="form">
              <div class="inputitem">
                <input class="phone" placeholder="请输入手机号" v-model="phoneNumber"/>
              </div>
              <div class="inputitem">
                <input class="smscode" placeholder="验证码" v-model="verificationCode"/>
                <a class="button smscodebutton" :class="{disable:smsCodeState}" @click="sendSmsCode">{{smsCodeState?smsCodeCountDown+'s':'获取'}}</a>
              </div>

              <a v-if="loginToGetPrizeListFlag" class="button" @click="login">确定</a>
              <a v-else class="button" @click="receivePrizeByForm">确定</a>
            </div>
          </div>
        </div>
        <div class="close">
          <a @click="close"></a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Cookies from 'js-cookie'

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

        redirectingFlag: false,
        initializing: false,
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
        environmentDictionary: [{
          name: 'ios',
          method: "window.webkit.messageHandlers.token.postMessage('')",
          checker: 'window.webkit',
          status: false
        }, {
          name: 'android',
          method: 'window.android.getToken()',
          checker: 'window.android',
          status: false
        }, {
          name: 'wechat',
          checker: "console",
          status: false
        }],
        dailyTimes: 0,
        channel: '',
        activityId: '',
        accessTokenReadyFlag: false
      }
    },
    computed: {
      // activityId() {
      //   return this.$route.query.activityId || 3;
      // },

      userActivityId() {
        return this.$route.query.state;
      },
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


      // canvasWidth() {
      //   return this.remUnit * 13.5 + 'px';
      // },
      // canvasHeight() {
      //   return this.remUnit * 13.5 + 'px';
      // },
    },
    watch: {
      remUnit(value) {
        this.$nextTick(() => {
          this.canvasWidth = value * 13.5 + 'px';
          this.canvasHeight = value * 13.5 + 'px';
          this.getPrizeList();
        })
      },
      weChatAuthorityURL(value) {
        console.log(value)
      },
      initializing(value) {
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
      rewardStr(value) {
        sessionStorage.setItem('rewardStr', value)
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
        if (value === 'shareredirect') {
          location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$domainUrl + '&response_type=code&scope=snsapi_userinfo&state=' + this.stateCode + '#wechat_redirect')
        }
      },
      accessToken(value) {
        if (value !== '') {
          Cookies.set('wheel-accessToken', value)
        }
      },
      accessTokenReadyFlag(value) {

      }
    },
    created() {
      this.redirectInfo = this.$route.query.routeto;
      this.channel = this.$route.query.channel;
      this.activityId = this.$route.query.activityId;

    },
    beforeMount() {
      let fullPath = window.location.href;

      // if (window.location.href.indexOf('#/') === window.location.href.length - 2) {
      //   window.assign()
      // }

    },
    mounted() {
      this.initializing = false;

      this.$nextTick(() => {
        // this.$autoHeight({
        //   target: '.wheel_realpage_container'
        // });
        this.$autoHeight({
          target: '.wheel_winningdialog_wrapper'
        });
        this.$remResizing({
          fontSize: 20,
        });
      });

      this.$nextTick(() => {
        this.remUnit = Number(document.getElementsByTagName('html')[0].style.fontSize.replace('px', ''))
      });
      this.getCacheData();
      if (this.checkEnvironment() === 'wechat') {
        this.processStateCode();
      }
      this.checkEnvironment();

      if (!this.alreadyReceivedPrize && this.checkEnvironment() === 'wechat') {
        // alert('this.getWechatToken+'+this.wechatAuthCode)

        this.getWechatToken({
          type: 'wechat_code',
          params: {
            code: this.wechatAuthCode
          }
        }).then(response => {
          console.log('this.getWechatToken', response)
          this.accessToken = response.access_token;
          let that = this;
          this.$http.get(this.$baseUrl + this.get_daily_numberRequest + `/${this.activityId}`, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + response.access_token
            }
          }).then(response => {
            console.log('get_daily_numberRequest', response)
            alert(response.data)
            this.dailyTimes = response.data;
          }).catch(error => {
            console.log(error)
            if (error.status === 401) {
              this.$vux.confirm.show({
                showCancelButton: false,
                title: '当前登录信息已失效',
                onConfirm() {
                  that.tokenReceiveFlag = false;
                }
              });
              switch (this.checkEnvironment()) {
                case 'android':
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: '当前登录信息已失效',
                    onConfirm() {
                      that.tokenReceiveFlag = false;
                      window.android.refreshToken()
                    }
                  });
                  break;
                case 'ios':
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: '当前登录信息已失效',
                    onConfirm() {
                      that.tokenReceiveFlag = false;
                      window.android.refreshToken()
                    }
                  });
                  break;
              }
            }
          });
        })
      } else {
        this.$nextTick(() => {
          if (this.checkEnvironment() !== 'wechat') {
            switch (this.checkEnvironment()) {
              case 'android':
                this.accessToken = window.android.getToken();
                // alert(this.accessToken)
                break;
              case 'ios':
                this.accessToken = window.webkit.messageHandlers.token.postMessage('')
            }
            Cookies.set('wheel-accessToken', this.accessToken)
            // alert('this.accessToken+' + this.accessToken)
            // alert('method+' + this.checkEnvironment())
          }
          this.getLoginId();
        });

      }

      this.checkUUID();
      this.getRewardRecordList();
      this.getStatisticImageUrl();
      this.recordStatisticEvent('onLoad');
      this.initJSSDK();

    },
    methods: {
      processStateCode() {
        let result = [];
        let code = decodeURIComponent(this.stateCode)

        code.split('^').forEach(item => {
          result[item.split('=')[0]] = item.split('=')[1]
        });
        this.stateCodeData = result;
        this.channel = result.channel;
        this.activityId = result.activityId;
        console.log('processStateCode', result)
        console.log('channel', this.channel)
        console.log(code)
      },
      getWechatToken(options) {
        return new Promise((resolve, reject) => {
          options = Object.assign({
            type: '',
            params: {}
          }, options);
          if (this.checkEnvironment() === 'wechat') {
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
              // Cookies.set('wheel-accessToken', response.access_token);
              this.getLoginId();

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
                    title: error.data.error_description,
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
        let stateCode = `channel=${this.loginId}^activityId=${this.activityId}`
        location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$domainUrl + '&response_type=code&scope=snsapi_userinfo&state=' + stateCode + '#wechat_redirect')
      },
      getLoginId() {
        let that = this;

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
          Cookies.set('wheel-loginId', this.loginId)
        }).catch(error => {
          console.log(error)
          if (error.status === 401) {
            switch (this.checkEnvironment()) {
              case 'android':
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: '当前登录信息已失效，请关闭再打开页面android',
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
      },

      getPrizeList() {
        this.loading = true;
        this.$http.get(this.$baseUrl + this.getActivityInfoRequest, {
          params: {
            activityId: this.activityId
          }
        }).then(response => {
          console.log(response)
          this.loading = false;
          response = response.data;
          this.wheelData = [];
          this.activityInfo = response.activityInfo;
          // alert(JSON.parse(sessionStorage.getItem('dailyLimit')))

          if (JSON.parse(sessionStorage.getItem('dailyLimit') === 'null')) {
            this.dailyLimit = response.activityInfo.dailyLimit;
          }
          response.rewardList.forEach((item, index) => {
            this.wheelData.push({
              name: item.rewardName,
              image: item.rewardImage !== null ? item.rewardImage + '-style_100x100' : '',
              // image: 'https://pic5.40017.cn/01/000/79/0a/rBLkBVpVuxmAUQqmAAARnUFXcFc487.png',
              value: item.rewardStr,
            })
          });

          // for (let i = 0; i < 8; i++) {
          //   this.wheelData.push({
          //     name: response.rewardList[i].rewardName,
          //     image: response.rewardList[i].rewardImage !== null ? response.rewardList[i].rewardImage + '-style_100x100' : '',
          //     // image: 'https://pic5.40017.cn/01/000/79/0a/rBLkBVpVuxmAUQqmAAARnUFXcFc487.png',
          //     value: response.rewardList[i].activityRewardMappingId
          //   })
          // }

          this.drawCanvas();
          this.getCachedCircleNumber();

        }).catch(error => {
          console.log(error)
          this.loading = false;
          this.$vux.confirm.show({
            showCancelButton: false,
            title: error.data.message,
            onConfirm() {
            }
          })
        })
      },
      drawPrize() {
        this.loading = true;
        this.$http.post(this.$baseUrl + this.participate_activityRequest, {}, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(response => {
          console.log(response)

          this.loading = false;
          let responseMetaData = response;
          response = response.data;

          switch (responseMetaData.code) {
            case 10000:
              this.prizeData = response;
              this.rewardCode = response.rewardCode;
              this.wheelData.forEach((item1, index1) => {
                if (item1.value === response.rewardStr) {
                  // if (item1.value === 10) {
                  this.rotateWheel(index1).then(() => {
                    this.alreadyReceivedPrize = false;
                    this.alreadyReleasedPrize = true;

                    this.dailyLimit = Number(this.dailyLimit) > 0 ? Number(this.dailyLimit) - 1 : this.dailyLimit;
                    this.rewardStr = response.rewardStr;
                    this.$store.commit('turnOffWinningPrizeChance');

                  })
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

          // }).catch(error => {
          //   this.loading = false;
          //   this.$vux.confirm.show({
          //     showCancelButton: false,
          //     title: error.data.message,
          //     onConfirm() {
          //
          //     }
          //   })
        });
      },
      receivePrize() {
        this.loading = false;
        this.recordStatisticEvent('receivePrize');
        // alert(Cookies.get('wheel-accessToken'))

        if (Cookies.get('wheel-accessToken') !== undefined) {
          this.dialogFlag = true;
          // this.phoneNumberReceiveFlag = false;
          this.tokenReceiveFlag = true;
        } else if (Cookies.get('wheel-accessToken') === undefined || Cookies.get('wheel-loginId') === undefined) {
          this.dialogFlag = true;
          // this.phoneNumberReceiveFlag = true;
          this.tokenReceiveFlag = false;
        }


      },
      drawAndReceivePrize() {
        // alert('drawAndReceivePrize')
        if (this.accessToken === '' && this.openId !== '') {
          this.dialogFlag = true;
          this.loginToGetPrizeFlag = true;
        } else if (this.accessToken === '' && this.openId === '') {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '获取不到用户信息，请关闭页面',
            onConfirm() {
            }
          });
        } else {
          this.receivePrizeByToken();
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
            this.dialogFlag = false;
            this.loginToGetPrizeFlag = false;
            sessionStorage.setItem('userInfo', JSON.stringify(response))
            this.receivePrizeByToken();
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
              Cookies.set('wheel-accessToken', response.access_token);
              Cookies.set('wheel-loginId', this.phoneNumber);
              this.$router.push({
                name: 'myPrizeList',
                query: {
                  loginId: Cookies.get('wheel-loginId'),
                  pageNo: 0,
                  token: response.access_token
                }
              })
            }).catch(error => {
              this.$vux.confirm.show({
                showCancelButton: false,
                title: error.data.error_description || error.data.message,
                onConfirm() {
                }
              })
            })
          })
        })
      },
      receivePrizeByToken() {
        let that = this;
        if (this.alreadyReceivedPrize) {
          // alert('direct')
          this.$router.push({
            name: 'acceptPrize',
            query: {
              rewardStr: this.prizeData.rewardStr
            }
          })
        } else {
          if (this.accessToken === '' && this.accessToken === undefined) {
            // alert('accessToken为空')
            return;
          }
          this.$http.post(this.$baseUrl + this.participate_accept_rewardRequest + `/${this.activityId}`, {}, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${this.accessToken}`
            }
          }).then(response => {
            console.log('participate_accept_rewardRequest', response)
            let responseMetaData = response;
            response = response.data;
            switch (responseMetaData.code) {
              case 10000:
                console.log('10000', this.wheelData)
                this.rewardCode = response.rewardCode;
                this.wheelData.forEach((item1, index1) => {
                  if (item1.value === response.rewardStr) {
                    // if (item1.value === 10) {

                    this.rotateWheel(index1).then(() => {
                      this.alreadyReceivedPrize = true;
                      this.alreadyReleasedPrize = true;

                      this.dailyLimit = Number(this.dailyLimit) > 0 ? Number(this.dailyLimit) - 1 : this.dailyLimit;
                      this.rewardStr = response.rewardStr;
                      this.prizeData = Object.assign(response, {
                        rewardName: item1.name
                      });

                      this.$store.commit('turnOffWinningPrizeChance');

                      this.receivePrize();
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
          }).catch(error => {
            console.log(error)
            if (error.status === 401) {
              switch (this.checkEnvironment()) {
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


        }
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
          imageObj.src = this.$replaceProtocol(this.wheelData[index].image);
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


          // setInterval(()=>{
          //   ctx.rotate(baseAngle*Math.PI/180);
          // }, 1000);

          // let pointer = new Image();
          // pointer.url = 'http://localhost/static/img/pointer_00000.png';
          // pointer.width = '100';
          // pointer.height = '100';


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
        Cookies.remove('wheel-accessToken')
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
        return Cookies.get('wheel-accessToken') === 'undefined' || Cookies.get('wheel-accessToken') === undefined;
      },
      loginToCheckMyPrize() {
        if (this.checkAuthorized()) {
          this.dialogFlag = true;
          this.loginToGetPrizeListFlag = true;

        } else {
          this.$router.push({
            name: 'myPrizeList',
            query: {
              loginId: Cookies.get('wheel-loginId'),
              pageNo: 0,
            }
          })
        }
      },


      getCacheData() {
        let regex = new RegExp(/(true)|(false)/);
        console.log(regex.test(sessionStorage.getItem('alreadyReleasedPrize')))

        if (regex.test(sessionStorage.getItem('alreadyReleasedPrize'))) {
          this.alreadyReleasedPrize = eval(sessionStorage.getItem('alreadyReleasedPrize'));
          this.rewardCode = sessionStorage.getItem('rewardCode');
          this.rewardStr = sessionStorage.getItem('rewardStr');
          this.prizeData = JSON.parse(sessionStorage.getItem('prizeData'))
        }
        if (regex.test(sessionStorage.getItem('alreadyReceivedPrize'))) {
          this.alreadyReceivedPrize = eval(sessionStorage.getItem('alreadyReceivedPrize'));
        }
        if (typeof Number(sessionStorage.getItem('dailyLimit')) === 'number') {
          this.dailyLimit = sessionStorage.getItem('dailyLimit');
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
          sessionStorage.removeItem('rewardStr')
          sessionStorage.removeItem('prizeData')
          sessionStorage.removeItem('actualRotate')
          sessionStorage.removeItem('dailyLimit')
          sessionStorage.removeItem('userInfo')
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
            // alert('error')
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
            let stateCode = `channel=${this.loginId}^activityId=${this.activityId}`
            wx.onMenuShareTimeline({
              title: '免费畅享全年NBA直播的机会在这里', // 分享标题
              link: this.$domainUrl + '/?routeto=shareredirect&state=' + stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
      checkEnvironment() {
        let environment;


        environment = this.environmentDictionary.filter(item => eval(item.checker) !== undefined)[0].name;
        switch (environment) {
          case 'ios':
            console.warn(environment)
            // alert('environment+' + environment)
            break;
          case 'android':
            console.warn(environment)
            // alert('environment+' + environment)
            break;
          case 'wechat':
            console.warn(environment)
            // alert('environment+' + environment)
            break;
        }


        //假设是ios 写死为ios,写死token到cookie里

        // environment = 'ios'
        // Cookies.set('wheel-accessToken', this.accessToken)
        this.environment = environment;
        return environment;
      },
      getAppToken() {
        // alert('window.android+' + window.android)
        // alert('window.android.getTokennnnbnnn+' + window.android.getToken)

        // alert(window.android.getToken())
      }
    }
  }


</script>

<style scoped lang="scss">
  /*.chance{*/
  /*font-size: 0;*/
  /*}*/
</style>
