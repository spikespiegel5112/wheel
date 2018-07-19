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
    <div class="share_main_wrapper">
      <div class="carousel swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="item in advertiseList">
            <img :src="item.image+`-style_640x380`"/>
          </li>
        </ul>
        <div class="swiper-pagination"></div>
      </div>
      <div class="form">
        <div class="title">
          <h1>好礼即将到账</h1>
          <h2>验证手机号码领取</h2>
        </div>
        <div class="main">
          <ul>
            <li>
              <div class="common_form_item">
                <input class="common_input_item" type="text" placeholder="请输入手机号码" v-model="loginId"/>
                <button class="common_button_item" type="text" @click="sendSmsCode">获取验证码</button>
              </div>
            </li>
            <li>
              <div class="common_form_item">
                <input class="common_input_item" type="text" placeholder="请输入验证码" v-model="verifyCode"
                       @input="checkVerifyCode"/>
              </div>
            </li>
            <li>
              <div class="common_form_item">
                <button class="common_button_item" :class="{'active':receiveRewardFlag===true}" @click="acceptPrize">领奖
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="prizeData.code!==''" class="prize_wrapper">
        <h1>{{prizeData.description}}</h1>
        <div class="main">
          <div v-if="prizeData.code===10000" class="withpicture">
            <div class="prizeimage">
              <img/>
            </div>
            <div class="detail">
              <label>{{prizeData.rewardType}}</label>
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
          <li v-for="item in rewardTraceListData">
            <div class="avatar">
              <img :src="item.rewardUserImage+'-style_100x100'"/>
              <span class="query">?</span>
            </div>
            <div class="detail">
              <div class="name">
                <label>{{item.rewardUserNickName}}</label>
                <span>{{$moment(item.createDate).format('MM.DD')}}</span>
                <span>{{$moment(item.createDate).format('hh:mm')}}</span>
              </div>
              <div class="comment">
                {{item.description}}
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
        <ul>
          <li>1.每个人每天最多抢五个红包</li>
          <li>1.每个人每天最多抢五个红包</li>
          <li>1.每个人每天最多抢五个红包</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css';

  export default {
    name: "Promotion",
    data: function () {
      return {
        baseUrl: 'http://gateway.zan-qian.com/',
        sendBindWxMsgRequest: 'message-service/1.0.0/sms/sendBindWxMsg',
        verificationCodeRequest: 'message-service/1.0.0/sms/verificationCode',
        acceptShareUserActivityRewardRequest: 'promotion-service/1.0.0/share_activity/acceptShareUserActivityReward',
        findUserActivityRewardTraceRequest: 'promotion-service/1.0.0/share_activity/findUserActivityRewardTrace',
        getAdvertiseRequest: 'advertising-service/1.0.0',

        swiperInstance: {},
        loginId: null,
        verifyCode: '',
        smsTemplate: 3,
        advertiseList: [],
        activityId: '',
        prizeStatus: '',
        receiveRewardFlag: false,
        rewardTraceListData: [],
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
        return this.$route.query.id || '2';
      },
      identityCode() {
        return this.$route.query.id || '2';

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
    },
    methods: {
      login: function () {
        console.log(this.$refs['loginFormData'])
        console.log(this.loginFormData)
        this.$refs['loginFormData'].validate(function (valid) {
          console.log(valid)
          if (valid) {

          }
        })
      },
      sendSmsCode: function () {
        this.$http.get(this.$baseUrl + this.sendBindWxMsgRequest + '/' + this.loginId).then(response => {
          console.log(response)
          if (response.alreadySent === true) {
            alert('短信已发出，请查收')
          }
          if (response.alreadySent === false) {
            alert(response.message)
          }
        }).catch(errpr => {
          alert(error)
        })
      },
      checkVerifyCode(value) {
        console.log(this.verifyCode.length)

      },
      getRewardTraceList() {
        this.$http.get(this.$baseUrl + this.findUserActivityRewardTraceRequest + `/${this.userActivityId}`, {
          headers: {
            // Authorization: 'Bearer b95a6b75-4767-431a-ba4f-b7db8abcbe5e'
          }
        }).then(response => {
          console.log(response)
          this.rewardTraceListData = response.data;
        }).catch(error => {
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

        this.$http.get(this.$baseUrl + this.getAdvertiseRequest + `/${deviceType}/${location}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // Authorization: 'Bearer b95a6b75-4767-431a-ba4f-b7db8abcbe5e'
          }
        }).then(response => {
          console.log(response)

          this.advertiseList = response;
          this.$nextTick(() => {
            this.swiperInstance = new Swiper('.swiper-container', {
              autoplay: true,
              loop: true
            })
          })
        }).catch(error => {
          console.log(error)
        })
      },
      acceptPrize() {
        if (this.receiveRewardFlag) {
          this.$http.post(this.$baseUrl + this.acceptShareUserActivityRewardRequest + `/${this.userActivityId}/${this.loginId}`, {}, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(response => {
            console.log(response)
            this.prizeData = response;
          }).catch(error => {
            console.log(error)
          })
        } else {
          alert('验证码格式不正确')
        }

      }
    }
  }
</script>

<style scoped>

</style>
