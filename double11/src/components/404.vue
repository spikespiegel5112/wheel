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
    <div class="mainbg_item"></div>
    <div class="common_404_wrapper">
      <h1>404</h1>
      <div class="main">
        <div class="withpicture">
          <div class="prizeimage">
            <img src="../image/double11/404.png"/>
          </div>
          <div class="detail">
            <span>您所访问的页面不存在</span>
          </div>
        </div>
      </div>
    </div>
    <CommonLoading :loading="loading"/>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import CommonLoading from './common/CommonLoading.vue'


  export default {
    name: "Promotion",
    components: {
      CommonLoading
    },
    data: function () {
      return {
        baseUrl: 'http://gateway.fnvalley.com/',
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
        receiveRewardFlag: false,
        rewardTraceListData: [],
        acceptPrizeFlag: false,
        loading: false,
        prizeData: {
          code: '',
          data: {
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
    watch: {
      verifyCode(value) {
        if (value.length >= 5) {
          this.receiveRewardFlag = true;
        }
        console.log(this.receiveRewardFlag)
      }
    },
    mounted() {
      this.$autoHeight({
        target: '.common_main_container',
      });
      this.$remResizing({
        fontSize: 20,
      });
      this.getAdvertise();
      this.getRewardTraceList();
      this.getUserInfoAndReceivePrize();
    },
    methods: {
      login() {
        console.log(this.$refs['loginFormData'])
        console.log(this.loginFormData)
        this.$refs['loginFormData'].validate(function (valid) {
          console.log(valid)
          if (valid) {

          }
        })
      },
      sendSmsCode() {
        if (this.smsCodeState === false) {
          this.loading = true;
          this.$http.get(this.$baseUrl + this.sendBindWxMsgRequest + '/' + this.loginId).then(response => {
              console.log(response)
              this.loading = false;
              if (response.alreadySent === true) {
                alert('短信已发出，请查收')
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
                alert(response.message)
              }
            }
          ).catch(error => {
            console.log(error)
            this.loading = false;

          })
        } else {
          alert('短信已发出，请稍后再试')
        }
      },
      checkVerifyCode(value) {
        console.log(this.verifyCode.length)

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
        let location = 'qu_welfare';
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
          }
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
        if (this.receiveRewardFlag) {
          this.loading = true;
          this.$http.post(this.$baseUrl + this.acceptShareUserActivityRewardByPhoneRequest + `/${this.userActivityId}/${this.loginId}`, {
            openId: '',
            accessToken: '',
            verificationCode: ''
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
            this.loading = false;
            this.prizeData = response;
            this.acceptPrizeFlag = true;
          }).catch(error => {
            this.loading = false;

            console.log(error)
          })
        } else {
          alert('验证码格式不正确')
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
          autoplay: true,
          loop: true
        })
      }
    }
  }
</script>

<style scoped lang="css">
  @import '../assets/js/swiper/css/swiper.min.css';

</style>
