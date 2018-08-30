<template>
  <div>
    <div class="common_main_container">
      <div class="content" id="app">
        <div class="wheel_realpage_container">
          <!--<img id="pointer" src='../image/wheel/pointer_00000.png' style="display: none"/>-->
          <div class="title"></div>
          <div class="wheel_wrapper">
            <div class="wheel">
              <canvas id="wheelcanvas" :width="remUnit*13.5" :height="remUnit*13.5">抱歉！浏览器不支持。</canvas>
              <a v-if="!alreadyReleasedPrize" class="begin" @click="drawPrize">
                <!--<span>开始抽奖</span>-->
              </a>
              <a v-else class="continue" @click="receivePrize">
                <!--<span>领取奖品</span>-->
              </a>
            </div>
            <div class="prizechance">
              <h1 v-if="dailyLimit!=='-1'">{{Number(dailyLimit)!==0?`获得1次抽奖机会`:'领奖次数已达上限'}}</h1>
              <label>活动时间：{{$moment(activityInfo.startDate).format('YYYY.MM.DD')}}~{{$moment(activityInfo.endDate).format('YYYY.MM.DD')}}</label>
            </div>
          </div>
          <div class="operator">
            <ul>
              <li>
                <router-link class="a" :to="{name:'activityRules'}">
                  <label>活动规则</label>
                  <span>活动规则</span>
                </router-link>
              </li>
              <li>
                <a class="a" @click="loginToCheckMyPrize">
                  <label>我的奖品</label>
                  <span>我的奖品</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="sponsor">
            <ul>
              <li>
                  <span>
                    <img src="../image/wheel/tongchenglvyou_00000.png"/>
                  </span>
              </li>
              <li>
                  <span>
                    <img src="../image/wheel/qugu_00000.png"/>
                  </span>
              </li>
            </ul>
            <p>同程相遇，趣谷有你</p>
          </div>
          <div class='common_blocktitle_item'>
            <span><i></i></span>
            <p>中奖名单</p>
            <span><i></i></span>
          </div>
          <div class="winninglist">
            <ul>
              <li v-for="item in rewardRecordList">
                <label>{{item.loginId.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</label>
                <span>获得{{item.rewardName}}</span>
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
              恭喜{{phoneNumber}}已抽中{{prizeData.rewardName}}
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
            <p class="hint">恭喜{{phoneNumber}} 免费获得“{{prizeData.rewardName}}”一份奖品</p>
            <div class="banner">
              <img src="../image/wheel/prize.png"/>
            </div>
            <a class="button" @click="receivePrizeByToken">免费领取</a>
            <div class="userinfo">
              <span>{{jsCookieInstance.get('wheel-loginId')}}</span>
              <a @click="changeUser"><label>立即修改</label>></a>
            </div>
          </div>
        </div>
        <div v-if="loginToGetPrizeListFlag" class="">
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
              <a class="button" @click="loginAndGetMyPrize">确定</a>
            </div>
          </div>
        </div>
        <div class="close">
          <a @click="close"></a>
        </div>
      </div>
    </div>
    <img v-show="false"
         :src="statisticImageUrl"
         width="0" height="0"/>
  </div>

</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: "Wheel",
    data() {
      return {
        baseUrl: 'http://gateway.zan-qian.com/',

        getActivityInfoRequest: 'promotion-service/1.0.0/rotary_table_activity/getActivityInfo',
        participate_activityRequest: 'promotion-service/1.0.0/rotary_table_activity/participate_activity',
        verificationCodeRequest: 'message-service/1.0.0/sms/verificationCode',

        accept_rewardRequest: 'promotion-service/1.0.0/rotary_table_activity/accept_reward',


        queryRewardTraceRequest: 'promotion-service/1.0.0/rotary_table_activity/queryRewardTrace',
        queryRewardTraceByLoginIdRequest: 'promotion-service/1.0.0/rotary_table_activity/queryRewardTraceByLoginIdRequest',


        loginToGetRewardRecordListRequest: 'uaa/oauth/token',

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
        rotateDuration: 1000,
        dialogFlag: false,
        phoneNumber: '',
        phoneNumberReceiveFlag: false,
        tokenReceiveFlag: false,
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
        pageFingerPrint: ''

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
        // alert(value)
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
        sessionStorage.setItem('prizeData', JSON.stringify(value))
      },
      dailyLimit(value) {
        // alert(value)
        sessionStorage.setItem('dailyLimit', value)
      }
    },
    created() {
      this.redirectInfo = this.$route.query.routeto;
    },
    beforeMount() {


    },
    mounted() {
      this.initializing = false;

      this.$nextTick(() => {
        this.$autoHeight({
          target: '.wheel_realpage_container'
        });
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

      this.checkUUID();
      this.getRewardRecordList();
      this.getStatisticImageUrl();
      this.getCacheData();
    },
    methods: {
      getPrizeList() {
        this.loading = true;
        this.$http.get(this.$baseUrl + this.getActivityInfoRequest).then(response => {
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
              value: item.activityRewardMappingId,
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
                if (item1.value === response.activityRewardMappingId) {
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
        if (Cookies.get('wheel-accessToken') === undefined || Cookies.get('wheel-loginId') === undefined) {
          this.dialogFlag = true;
          this.phoneNumberReceiveFlag = true;
          this.tokenReceiveFlag = false;
        } else {
          this.dialogFlag = true;
          this.phoneNumberReceiveFlag = false;
          this.tokenReceiveFlag = true;
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
      receivePrizeByForm() {
        let that = this;
        this.phoneNumber = this.phoneNumber.replace(/(^\s*)|(\s*$)/g, '');
        this.verificationCode = this.verificationCode.replace(/(^\s*)|(\s*$)/g, '');
        if (this.phoneNumber === '') {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '手机号未填写',
            onConfirm() {
            }
          });
          return
        }
        if (this.verificationCode === '') {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '验证码未填写',
            onConfirm() {
            }
          });
          return
        }

        this.$http.post(this.$baseUrl + this.accept_rewardRequest + `/${this.phoneNumber}`, {
          verificationCode: this.verificationCode,
          rewardCode: this.rewardCode
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
          }]
        }).then(response => {
          console.log(response)
          this.recordStatisticEvent();

          switch (response.code) {
            case 10000:
              Cookies.set('wheel-accessToken', response.data.accessToken);
              Cookies.set('wheel-loginId', this.phoneNumber);
              this.alreadyReleasedPrize = true;
              this.alreadyReceivedPrize = true;
              this.activityInfo.dailyLimit = Number(this.activityInfo.dailyLimit - 1) === 0 ? Number(this.activityInfo.dailyLimit - 1) : Number(this.activityInfo.dailyLimit);

              this.rewardStr = response.data.rewardStr;

              this.$nextTick(() => {
                this.$router.push({
                  name: 'acceptPrize',
                  query: {
                    rewardStr: this.rewardStr
                  }
                });
              });

              break;
            case 10002:
              Cookies.set('wheel-accessToken', response.data.accessToken);
              Cookies.set('wheel-loginId', this.phoneNumber);
              this.$vux.confirm.show({
                showCancelButton: false,
                title: response.message,
                onConfirm() {
                }
              });
              break;
            case 10004:
              Cookies.set('wheel-accessToken', response.data.accessToken);
              Cookies.set('wheel-loginId', this.phoneNumber);

              this.alreadyReceivedPrize = false;
              this.alreadyReleasedPrize = true;

              this.$vux.confirm.show({
                showCancelButton: false,
                title: response.message,
                onConfirm() {
                }
              });
              break;
            case 10010:
              this.$vux.confirm.show({
                showCancelButton: false,
                title: response.message,
                onConfirm() {
                }
              });
              break;
            case 10011:
              Cookies.set('wheel-accessToken', response.data.accessToken);
              Cookies.set('wheel-loginId', this.phoneNumber);
              this.$vux.confirm.show({
                showCancelButton: false,
                title: response.message,
                onConfirm() {
                }
              });
              break;
            case 10012:
              Cookies.set('wheel-accessToken', response.data.accessToken);
              Cookies.set('wheel-loginId', this.phoneNumber);
              this.$vux.confirm.show({
                showCancelButton: false,
                title: response.message,
                onConfirm() {
                }
              });
              break;
            case 10013:
              Cookies.set('wheel-accessToken', response.data.accessToken);
              Cookies.set('wheel-loginId', this.phoneNumber);
              this.$vux.confirm.show({
                showCancelButton: false,
                title: response.message,
                onConfirm() {
                  that.cleanCache();

                }
              });
              break;
            case 10014:
              this.$vux.confirm.show({
                showCancelButton: false,
                title: response.message,
                onConfirm() {
                }
              });
              break;
            default:
              this.$vux.confirm.show({
                showCancelButton: false,
                title: response.message,
                onConfirm() {
                }
              });
              break;
          }
        }).catch(error => {
          console.log(error)
          this.$vux.confirm.show({
            showCancelButton: false,
            title: error.data.message,
            onConfirm() {
            }
          })
        });
      },
      async receivePrizeByToken() {
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
          this.$http.post(this.$baseUrl + this.accept_rewardRequest + '?access_token=' + Cookies.get('wheel-accessToken'), {
            rewardCode: this.rewardCode
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            transformRequest: [function (data) {
              let ret = '';
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }]
          }).then(response => {
            console.log('receivePrizeByToken', response)
            let that = this;

            this.recordStatisticEvent();

            switch (response.code) {
              case 10000:
                this.alreadyReleasedPrize = true;
                this.alreadyReceivedPrize = true;
                this.rewardStr = response.data.rewardStr;

                setTimeout(() => {
                  this.$router.push({
                    name: 'acceptPrize',
                    query: {
                      rewardStr: this.rewardStr
                    }
                  });
                }, 500);
                break;
              case 10002:
                //因为cookie已经存有token所以不需要获取也不需要重新存储token
                // Cookies.set('wheel-accessToken', response.data.accessToken);
                // Cookies.set('wheel-loginId', this.phoneNumber);
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: response.message,
                  onConfirm() {
                  }
                });
                break;
              case 10004:

                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: response.message,
                  // title: '账号已变更，请重新领取',
                  onConfirm() {
                    that.cleanCache();
                  }
                });

                break;
              case 10010:
                if (response.data !== null) {
                  Cookies.set('wheel-accessToken', response.data.accessToken);
                  Cookies.set('wheel-loginId', this.phoneNumber);
                }

                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: response.message,
                  onConfirm() {
                  }
                });
                break;
              case 10011:
                if (response.data !== null) {
                  Cookies.set('wheel-accessToken', response.data.accessToken);
                  Cookies.set('wheel-loginId', this.phoneNumber);
                }
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: response.message,
                  onConfirm() {
                  }
                });
                break;
              case 10012:
                if (response.data !== null) {
                  Cookies.set('wheel-accessToken', response.data.accessToken);
                  Cookies.set('wheel-loginId', this.phoneNumber);
                }
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: response.message,
                  onConfirm() {
                  }
                });
                break;
              case 10013:
                if (response.data !== null) {
                  Cookies.set('wheel-accessToken', response.data.accessToken);
                  Cookies.set('wheel-loginId', this.phoneNumber);
                }
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: response.message,
                  onConfirm() {
                    that.cleanCache();
                  }
                });
                break;
              case 10014:
                if (response.data !== null) {
                  Cookies.set('wheel-accessToken', response.data.accessToken);
                  Cookies.set('wheel-loginId', this.phoneNumber);
                }
                this.$vux.confirm.show({
                  showCancelButton: false,
                  title: response.message,
                  onConfirm() {
                  }
                });
                break;
              default:
                break;
            }
            this.phoneNumberReceiveFlag = false;
          }).catch(error => {
            console.log(error)
            if (error.status === 401) {
              this.$vux.confirm.show({
                showCancelButton: false,
                title: '当前登录信息已失效',
                onConfirm() {
                  that.tokenReceiveFlag = false;
                  that.phoneNumberReceiveFlag = true;
                }
              })
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
        this.phoneNumberReceiveFlag = true;
        this.tokenReceiveFlag = false;
        Cookies.remove('')
      },
      getRewardRecordList() {
        this.$http.get(this.$baseUrl + this.queryRewardTraceRequest, {
          params: {
            activityId: ''
          }
        }).then(response => {
          console.log('getRewardRecordList', response)
          response = response.data;
          this.rewardRecordList = response;
        })
      },
      close() {
        this.dialogFlag = false;
        this.phoneNumberReceiveFlag = false;
        this.tokenReceiveFlag = false;
        this.loginToGetPrizeListFlag = false;
      },
      loginToCheckMyPrize() {
        if (Cookies.get('wheel-accessToken') === 'undefined' || Cookies.get('wheel-loginId') === 'undefined' || Cookies.get('wheel-accessToken') === undefined || Cookies.get('wheel-loginId') === undefined) {
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
      loginAndGetMyPrize() {
        this.$http.post(this.$baseUrl + this.loginToGetRewardRecordListRequest, {
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
            title: error.data.message,
            onConfirm() {
            }
          })
        })
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
        }, 500)

      },
      getStatisticImageUrl() {
        this.statisticImageUrl = this.$baseUrl + 'message-service/1.0.0/statistics.jpg?source=tongcheng&timeStamp=' + Date.parse(new Date())
      },
      recordStatisticEvent() {
        let imageTag = document.createElement("img");
        imageTag.className = 'statistic';
        imageTag.src = `${this.$baseUrl}message-service/1.0.0/statistics.jpg?source=tongcheng&timeStamp=${Date.parse(new Date())}&webId=${this.pageFingerPrint}`;
        imageTag.width = 0;
        imageTag.height = 0;
        document.body.appendChild(imageTag);
      },
      checkUUID() {
        if (!Cookies.get('Wheel-pageFingerPrint')) {
          this.pageFingerPrint = this.$generateUUID();
          Cookies.set('Wheel-pageFingerPrint', this.pageFingerPrint)
        } else {
          this.pageFingerPrint = Cookies.get('Wheel-pageFingerPrint');
        }
      },
    }
  }


</script>

<style scoped lang="css">

</style>
