<template>
  <div class="common_main_container" id="app">
    <div class="common_header_wrapper">
      <div class="left_wrapper">
        <a class="previous iconfont icon-backward2"></a>
      </div>
      <div class="middle_wrapper">
        趣福利
      </div>
    </div>
    <!--<div v-if="true">-->
    <div v-if="isWechat()">

      <div class="share_main_wrapper">
        <div class="carousel swiper-container">
          <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="item in advertiseList">
              <img :src="item.image+`-style_640x380`"/>
            </li>
          </ul>
          <div class="swiper-pagination"></div>
        </div>
        <div class="form" v-if="acceptPrizeFlag===false">
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
                         v-model="receiveRewardParams.verificationCode"
                         @input="checkVerifyCode"/>
                </div>
              </li>
              <li>
                <div class="common_form_item">
                  <button class="common_button_item" :class="{'active':receiveRewardFlag===true}" @click="acceptPrize">
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
            <div v-if="prizeData.code===10000" class="withpicture">
              <div class="prizeimage">
                <img v-if="prizeData.data.rewardType==='coin'" src="../image/share/coin.png"/>
                <img v-if="prizeData.data.rewardType==='point'" src="../image/share/coin.png"/>
                <img v-if="prizeData.data.rewardType==='bes_tv'" src="../image/share/bestv.png"/>
              </div>
              <div class="detail">
                <label v-if="prizeData.data.rewardType==='coin'">{{prizeData.data.rewardValue}}趣豆！</label>
                <label v-if="prizeData.data.rewardType==='point'">{{prizeData.data.rewardValue}}积分！</label>
                <label v-if="prizeData.data.rewardType==='bes_tv'">百事通会员卡！</label>
                <span>奖品已放入您的账户</span>
                <button>打开趣谷APP</button>
              </div>
            </div>
            <div v-else class="withoutpicture">
              <div class="detail">
                <label>{{activityStatusDictionary.filter(item=>item.code===prizeData.code)[0].text}}</label>
                <span>告诉你个小秘密，可以自己发起活动哦~</span>
                <button>我要发起</button>
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
                  <img :src="item.rewardUserImage+'-style_100x100'"/>
                </div>
                <span class="query">?
                  <!--{{item.availible===true}}-->
              </span>
              </div>
              <div class="detail">
                <div class="name">
                  <label>{{item.rewardUserNickName}}</label>
                  <span>{{$moment(item.createDate).format('MM.DD')}}</span>
                  <span>{{$moment(item.createDate).format('hh:mm')}}</span>
                </div>
                <div class="comment">
                  {{item.rewardPrompt}}
                </div>
              </div>
              <div class="prizename">
                {{prizeTypeDictionary.filter(item2=>item.rewardType===item2.code)[0].name}}
              </div>
            </li>

          </ul>
          <p class="hint">
            只差一点点，大红包就是你的啦~
          </p>
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
</template>

<script>
  import CommonLoading from './common/CommonLoading.vue'


  export default {
    name: "Promotion",
    components: {
      CommonLoading
    },
    data: function () {
      return {
        baseUrl: 'http://gateway.zan-qian.com/',
        sendBindWxMsgRequest: 'message-service/1.0.0/sms/sendBindWxMsg',
        verificationCodeRequest: 'message-service/1.0.0/sms/verificationCode',
        acceptShareUserActivityRewardRequest: 'promotion-service/1.0.0/share_activity/acceptShareUserActivityReward',
        findUserActivityRewardTraceRequest: 'promotion-service/1.0.0/share_activity/findUserActivityRewardTrace',
        getAdvertiseRequest: 'advertising-service/1.0.0',

        acceptShareUserActivityRewardByWeChatCodeRequest: 'promotion-service/1.0.0/share_activity/acceptShareUserActivityRewardByWeChatCode',
        acceptShareUserActivityRewardByPhoneRequest: 'promotion-service/1.0.0/share_activity/acceptShareUserActivityRewardByPhone',

        swiperInstance: {},
        smsCodeState: false,
        smsCodeCountDown: 60,
        loginId: null,
        verifyCode: '',
        smsTemplate: 3,
        advertiseList: [],
        activityId: '',
        prizeStatus: '',
        receiveRewardParams: {
          openId: '',
          verificationCode: '',
        },

        receiveRewardFlag: false,
        rewardTraceListData: [],
        acceptPrizeFlag: false,
        loading: false,
        prizeData: {
          code: '',
          data: {
            rewardPrompt: '',
            description: '',
            loginId: '',
            rewardStr: '',
            rewardType: '',
            rewardValue: ''
          },
          message: ''
        },
        access_token: '',
        prizeTypeDictionary: [{
          name: '趣豆',
          code: 'coin'
        }, {
          name: '积分',
          code: 'point'
        }, {
          name: '百视通',
          code: 'bes_tv'
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
        }]
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
      }
    },
    created() {

    },

    mounted() {
      this.$autoHeight({
        target: '.common_main_container',
      });
      this.$remResizing({
        fontSize: 20,
      });
      this.getAdvertise();
      this.getUserInfoAndReceivePrize();
    },
    methods: {
      sendSmsCode() {
        if (this.smsCodeState === false) {
          this.loading = true;
          this.$http.get(this.$baseUrl + this.sendBindWxMsgRequest + '/' + this.loginId).then(response => {
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
      checkVerifyCode() {
        console.log(this.receiveRewardParams.verificationCode.toString().length)
        if (this.receiveRewardParams.verificationCode.toString().length >= 5) {
          this.receiveRewardFlag = true;
        }
        console.log(this.receiveRewardFlag)
      },
      getUserInfoAndReceivePrize() {
        console.log(this.wechatAuthCode)
        this.$http.post(this.$baseUrl + this.acceptShareUserActivityRewardByWeChatCodeRequest + `/${this.identityCode}`, {
          weChatCode: this.wechatAuthCode
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
          if (response.code === 10008 && this.isWechat()) {
            this.$vux.confirm.show({
              showCancelButton: false,
              title: response.message,
            })
          } else if (response.code === 10009) {
            this.receiveRewardParams = Object.assign(this.receiveRewardParams, {
              openId: response.data.openId,
              verificationCode: response.data.verificationCode,
              accessToken: response.data.accessToken
            })
          } else {
            if (response.code === 10010) {
              this.$vux.confirm.show({
                showCancelButton: false,
                title: response.message,
              })
            } else if (response.data === null) {
              this.prizeData = Object.assign(this.prizeData, {
                code: response.code,
                message: response.message
              });
              this.acceptPrizeFlag = true;
            } else {
              this.prizeData = response;
              this.acceptPrizeFlag = true;
            }

            this.loading = false;
          }

          this.getRewardTraceList();

        })
      },
      getRewardTraceList() {
        this.loading = true;

        this.$http.get(this.$baseUrl + this.findUserActivityRewardTraceRequest + `/${this.userActivityId}`).then(response => {
          console.log(response)
          this.loading = false;

          this.rewardTraceListData = response.data;
          this.rewardTraceListData.forEach((item, index) => {
            this.$set(this.rewardTraceListData, index, Object.assign(this.rewardTraceListData[index], {
              availible: true
            }))
            // this.rewardTraceListData[index].availible = true;
          })
        }).catch(error => {
          this.loading = false;
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
        this.loading = true;

        this.$http.get(this.$baseUrl + this.getAdvertiseRequest + `/${deviceType}/${location}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // Authorization: 'Bearer b95a6b75-4767-431a-ba4f-b7db8abcbe5e'
          },
        }).then(response => {
          console.log(response)
          this.loading = false;

          this.advertiseList = response;
          this.$nextTick(() => {
            this.initSwiper();
          })
        }).catch(error => {
          this.loading = false;

          console.log(error)
        })
      },
      acceptPrize() {
        console.log(this.receiveRewardParams)
        if (this.receiveRewardFlag) {
          this.loading = true;
          this.$http.post(this.$baseUrl + this.acceptShareUserActivityRewardByPhoneRequest + `/${this.userActivityId}/${this.loginId}`, {
            openId: this.receiveRewardParams.openId,
            verificationCode: this.receiveRewardParams.verificationCode,
            accessToken: this.receiveRewardParams.accessToken,
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
            if (response.code === 10010) {
              this.$vux.confirm.show({
                showCancelButton: false,
                title: response.message,
                onConfirm() {
                }
              })
            } else if (response.data === null) {
              this.prizeData = Object.assign(this.prizeData, {
                code: response.code,
                message: response.message
              });
              this.acceptPrizeFlag = true;
            } else {
              this.prizeData = response;
              this.acceptPrizeFlag = true;
            }

            this.loading = false;

            this.getRewardTraceList();

          }).catch(error => {
            this.loading = false;
            this.$vux.confirm.show({
              showCancelButton: false,
              title: '验证码不正确',
              onConfirm() {
              }
            })
            console.log(error.message)
          })
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
        return this.$prodEnv ? ua.match(/MicroMessenger/i) == 'micromessenger' : true;
        // return this.$prodEnv;
      }
    }
  }
</script>

<style scoped lang="css">
  @import '../assets/js/swiper/css/swiper.min.css';

</style>
