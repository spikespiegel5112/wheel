<template>
  <div>
    <div class="share_redirect_container" v-if="redirectingFlag">
      <CommonLoading :loading="initializing"/>
    </div>
    <div class="common_main_container" v-else>
      <CommonLoading :loading="initializing"/>
      <div class="content" id="app" v-if="!initializing">
        <!--<div class="common_header_wrapper">-->
        <!--<div class="left_wrapper">-->
        <!--<a class="previous iconfont icon-backward2"></a>-->
        <!--</div>-->
        <!--<div class="middle_wrapper">-->
        <!--分享免费领取百视通-->
        <!--</div>-->
        <!--</div>-->
        <!--<div v-if="true">-->
        <div v-if="isWechat()">
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
            <div class="form" v-if="acceptPrizeFlag">
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
                      <button class="common_button_item" :class="{'active':receiveRewardFlag===true}"
                              @click="acceptPrize">
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
                  </div>
                  <div class="detail">
                    <label v-if="prizeData.data.rewardType==='coin'">{{prizeData.data.rewardValue}}趣豆！</label>
                    <label v-if="prizeData.data.rewardType==='point'">{{prizeData.data.rewardValue}}积分！</label>
                    <label v-if="prizeData.data.rewardType==='bes_tv'">百事通会员卡！</label>

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
        baseUrl: 'http://gateway.zan-qian.com/',
        domainUrl: process.env.NODE_ENV === 'production' ? 'https://activity.fnvalley.com' : 'http://testactivity.fnvalley.com',
        sendBindWxMsgRequest: 'message-service/1.0.0/sms/sendBindWxMsg',
        verificationCodeRequest: 'message-service/1.0.0/sms/verificationCode',
        acceptShareUserActivityRewardRequest: 'promotion-service/1.0.0/share_activity/acceptShareUserActivityReward',
        findUserActivityRewardTraceRequest: 'promotion-service/1.0.0/share_activity/findUserActivityRewardTrace',
        getAdvertiseRequest: 'advertising-service/1.0.0',

        acceptShareUserActivityRewardByWeChatCodeRequest: 'promotion-service/1.0.0/share_activity/acceptShareUserActivityRewardByWeChatCode',
        acceptShareUserActivityRewardByPhoneRequest: 'promotion-service/1.0.0/share_activity/acceptShareUserActivityRewardByPhone',

        getSignatureRequest: 'account-service/1.0.0/weChat/getSignature',

        weChatAuthorityURL: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$baseUrl + '&response_type=code&scope=snsapi_userinfo&state=' + this.stateCode + '&connect_redirect=1#wechat_redirect',

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
        receiveRewardParams: {
          openId: '',
          verificationCode: '',
        },
        windowHeight: 0,
        receiveRewardFlag: false,
        rewardTraceListData: [],
        acceptPrizeFlag: false,
        initializing: true,
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
        downloadUrl: ''
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
      }

    },
    watch: {
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
          location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$domainUrl + '&response_type=code&scope=snsapi_userinfo&state=' + this.stateCode + '#wechat_redirect')
        } else {
          this.redirectingFlag = false;
          this.getUserInfoAndReceivePrize();

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

      this.$autoHeight({
        target: '.share_realpage_container'
      });
      this.$remResizing({
        fontSize: 20,
      });
      this.getAdvertise();

      this.getRewardTraceList();

      this.getDownloadUrl();

      this.initJSSDK();
      console.log(Swiper)
      console.log(wx)
      // this.changeUrl();
    },
    methods: {
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
            // if (response.code === 10008) {

            location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$domainUrl + '&response_type=code&scope=snsapi_userinfo&state=' + this.stateCode + '#wechat_redirect')

            // this.$vux.confirm.show({
            //   showCancelButton: false,
            //   title: response.message,
            // })

          } else if (response.code === 10009) {
            this.acceptPrizeFlag = true;

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
              this.acceptPrizeFlag = false;
            } else {
              this.prizeData = response;
              this.acceptPrizeFlag = false;
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
            if (item.rewardUserImage !== null) {
              let result = Object.assign(this.rewardTraceListData[index], {
                availible: true,
                rewardUserImage: item.rewardUserImage.indexOf('resource') > 0 ? item.rewardUserImage + '-style_100x100' : item.rewardUserImage
              })
              this.$set(this.rewardTraceListData, index, result)
            }
          })
          console.log(555, this.rewardTraceListData)
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
              this.acceptPrizeFlag = false;
            } else {
              this.prizeData = response;
              this.acceptPrizeFlag = false;
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
            });
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
