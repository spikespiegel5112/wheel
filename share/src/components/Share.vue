<template>
  <div>
    <div class="share_redirect_container" v-if="redirectingFlag">
      <CommonLoading :loading="initializing"/>
    </div>
    <div class="common_main_container" v-else>
      <CommonLoading :loading="initializing"/>
      <div class="content" id="app" v-if="!initializing">
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
                    <span class="query">?</span>
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
        sendBindWxMsgRequest: 'message-service/1.0.0/sms/sendBindWxMsg',
        verificationCodeRequest: 'message-service/1.0.0/sms/verificationCode',
        acceptShareUserActivityRewardRequest: 'promotion-service/1.0.0/share_activity/acceptShareUserActivityReward',
        findUserActivityRewardTraceRequest: 'promotion-service/1.0.0/share_activity/findUserActivityRewardTrace',
        getAdvertiseRequest: 'advertising-service/1.0.0',

        acceptShareUserActivityRewardByWeChatCodeRequest: 'promotion-service/1.0.0/share_activity/acceptShareUserActivityRewardByWeChatCode',
        acceptShareUserActivityRewardByPhoneRequest: 'promotion-service/1.0.0/share_activity/acceptShareUserActivityRewardByPhone',

        getSignatureRequest: 'account-service/1.0.0/weChat/getSignature',

        weChatAuthorityURL: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$baseUrl + '&response_type=code&scope=snsapi_userinfo&state=7&connect_redirect=1#wechat_redirect',

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
        acceptPrizeFlag: true,
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
      },
      redirectInfo() {
        alert(this.$route.query.routeto)

        return this.$route.query.routeto || '';
      },

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
        alert('redirectingFlag', value)
        if (value === 'shareredirect') {
          location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=http://activity.fnvalley.com&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect')
        } else {
          this.redirectingFlag = false;
        }
      }
    },
    created() {
      this.getUserInfoAndReceivePrize();
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

      this.initJSSDK();
      console.log(Swiper)
      console.log(wx)
      // this.changeUrl();
    },
    methods: {
      initJSSDK() {
        console.log('777', location.href.split('#')[0])
        let tempURL = encodeURIComponent('http://activity.fnvalley.com?code=3D081hWek62tUgcL0op0l620Cnk62hWekW&state=2')
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
            debugger

            console.warn(error)
          })
          wx.ready((e) => {
            console.warn(e)
            wx.checkJsApi({
              jsApiList: ['closeWindow', 'chooseWXPay', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'hideMenuItems'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function (res) {
                alert('check')
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//		    	alert(JSON.stringify(res));
              }

            });

            wx.onMenuShareTimeline({
              title: '趣福利aaa', // 分享标题
              link: 'http://activity.fnvalley.com/?routeto=shareredirect', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              // link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=http://activity.fnvalley.com&response_type=code&scope=snsapi_base&state=2#wechat_redirect', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://activity.fnvalley.com' + '/static/img/404.b92dcc1.png', // 分享图标
              success: function () {
                alert('dsds')
              }
            })
          })

          // this.xujin();

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

            // location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=http://activity.fnvalley.com&response_type=code&scope=snsapi_info&state=2#wechat_redirect')

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
        console.log(ua)
        return this.$prodEnv ? ua.match(/MicroMessenger/i) == 'micromessenger' : true;
        // return this.$prodEnv;
      },
      onIframeLoaded() {
        alert('dsdsds')
      },
      changeUrl() {
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=http://activity.fnvalley.com&response_type=code&scope=snsapi_base&state=2#wechat_redirect';
        window.history.pushState({}, 0, url);
      },
      xujin() {
        let nowUrl = "http://www.alle-maison.com/allemasion/wap/index";
        wx.ready(function () {

//		alert("开始加载");
          wx.checkJsApi({
            jsApiList: ['closeWindow', 'chooseWXPay', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'hideMenuItems'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//		    	alert(JSON.stringify(res));
            }

          });

          //分享给朋友
          wx.onMenuShareAppMessage({
            title: 'ALLE MAISON', // 分享标题
            desc: '汇集奢侈精品艺术生活', // 分享描述
            link: 'http://www.alle-maison.com/allemasion/weixin/share?nowUrl=' + nowUrl, // 分享链接
            imgUrl: 'http://www.alle-maison.com/logo.jpg', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            trigger: function (res) {
              // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
//		        alert('用户点击发送给朋友');
            },
            success: function () {
              // 用户确认分享后执行的回调函数
//		    	alert("发送成功");
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              //alert("取消分享");
            }
          });
          //分享到朋友圈
          wx.onMenuShareTimeline({
            title: 'ALLE MAISON', // 分享标题
            link: 'http://www.alle-maison.com/allemasion/weixin/share?nowUrl=' + nowUrl, // 分享链接
            imgUrl: 'http://www.alle-maison.com/logo.jpg', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
//		    	alert("分享成功");
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数

            }
          });
          //批量隐藏功能按钮接口
          // wx.hideMenuItems({
          //   menuList: ['menuItem:share:qq','menuItem:share:QZone','menuItem:openWithSafari'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
          // });

          wx.error(function (res) {

            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            alert(res.errMsg);
          });
        });
      }
    }
  }
</script>

<style scoped lang="css">
  @import '../assets/js/swiper/css/swiper.min.css';

</style>
