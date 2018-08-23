<template>
  <div>
    <div class="wheel_redirect_container" v-if="redirectingFlag">
      <CommonLoading :loading="initializing"/>
    </div>
    <div class="common_main_container" v-else>
      <CommonLoading :loading="initializing"/>
      <div class="content" id="app">
        <div class="wheel_realpage_container">
          <img id="pointer" src='../image/wheel/pointer_00000.png' style="display: none"/>
          <div class="title"></div>
          <div class="wheel_wrapper">
            <div class="wheel">
              <canvas id="wheelcanvas" :width="remUnit*13.5" :height="remUnit*13.5">抱歉！浏览器不支持。</canvas>
              <a class="start" @click="drawPrize"></a>
            </div>
            <div class="prizechance">
              <h1>获得1次抽奖机会</h1>
              <label>活动时间：2018.8.14~2018.8.15</label>
            </div>

          </div>
          <div class="operator">
            <ul>
              <li>
                <a class="a">
                  <label>活动规则</label>
                  <span>活动规则</span>
                </a>
              </li>
              <li>
                <a class="a">
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
            <p>文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案</p>
          </div>
          <div class='common_blocktitle_item'>
            <span><i></i></span>
            <p>中奖名单</p>
            <span><i></i></span>
          </div>
          <div class="winninglist">
            <ul>
              <li>
                <label>dasdasdasdas</label>
                <span>抽中大神大撒大撒大所多撒抽中大神大撒大撒大所多撒抽中大神大撒大撒大所多撒抽中大神大撒大撒大所多撒</span>
              </li>
              <li>
                <label>dasdasdasdas</label>
                <span>ddasdsadsada</span>
              </li>
              <li>
                <label>dasdasdasdas</label>
                <span>ddasdsadsada</span>
              </li>
            </ul>
          </div>
        </div>
        <CommonLoading :loading="loading"/>
      </div>
    </div>
    <div v-show="winningPrizeFlag" class="wheel_winningdialog_wrapper">
      <div class="content">
        <p class="hint">
          输入手机号立即领取
        </p>
        <div class="form">
          <div class="inputitem">
            <input class="phone" placeholder="请输入手机号" v-model="loginId"/>
          </div>
          <div class="inputitem">
            <input class="smscode" placeholder=""/>
            <a class="button smscodebutton" @click="sendSmsCode">获取</a>
          </div>
          <a class="button" @click="acceptPrize">立即领取</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import CommonLoading from './common/CommonLoading.vue'
  import wx from 'weixin-js-sdk'
  import $ from 'jquery';

  export default {
    name: "Promotion",
    components: {
      CommonLoading
    },
    data: function () {
      return {
        baseUrl: 'http://gateway.zan-qian.com/',

        getActivityInfoRequest: 'promotion-service/1.0.0/rotary_table_activity/getActivityInfo',
        participate_activityRequest: 'promotion-service/1.0.0/rotary_table_activity/participate_activity',
        sendBindWxMsgRequest: 'message-service/1.0.0/sms/sendBindWxMsg',
        redirectingFlag: false,
        initializing: false,
        loading: false,
        smsCodeState: false,
        winningPrizeFlag: false,

        redirectInfo: '',
        downloadUrl: '',
        colorDictionary: ['#feebcd', '#ffb54c'],
        textColorDictionary: ['#f06949', '#feebcd'],
        dotsColorDictionary: ['#ffd800', '#fe9166'],
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
        wheelCanvas: {},
        remUnit: 0,
        canvasWidth: '400px',
        canvasHeight: '400px',
        canvasReadyFlag: false,
        rotatingFlag: false,
        loginId: ''

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
        // alert('dsds')
        this.$nextTick(() => {
          this.canvasWidth = value * 13.5 + 'px';
          this.canvasHeight = value * 13.5 + 'px';
          // this.canvasReadyFlag=true;
          console.log(111, this.canvasWidth)
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
        })
      });
      this.$remResizing({
        fontSize: 20,
      });
      this.$nextTick(() => {
        this.remUnit = Number(document.getElementsByTagName('html')[0].style.fontSize.replace('px', ''))
      });
    },
    methods: {
      getPrizeList() {
        this.$http.get(this.$baseUrl + this.getActivityInfoRequest).then(response => {
          console.log(response)
          response = response.data;
          this.wheelData = [];

          // response.rewardList.forEach((item, index) => {
          //   this.wheelData.push({
          //     name: item.rewardName,
          //     // image:item.rewardImage!==null?item.rewardImage:'',
          //     image: 'https://pic5.40017.cn/01/000/79/0a/rBLkBVpVuxmAUQqmAAARnUFXcFc487.png',
          //     value: item.activityRewardMappingId
          //   })
          // });

          for (let i = 0; i < 8; i++) {
            this.wheelData.push({
              name: response.rewardList[i].rewardName,
              // image:item.rewardImage!==null?item.rewardImage:'',
              image: 'https://pic5.40017.cn/01/000/79/0a/rBLkBVpVuxmAUQqmAAARnUFXcFc487.png',
              value: response.rewardList[i].activityRewardMappingId
            })
          }

          this.drawCanvas();

        }).catch(error => {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: error.message,
            onConfirm() {
            }
          })
        })
      },
      drawPrize() {
        this.$http.post(this.$baseUrl + this.participate_activityRequest, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          console.log(response)
          response = response.data;
          this.wheelData.forEach((item1, index1) => {
            if (item1.value === response.activityRewardMappingId) {
              // if (item1.value === 10) {
              alert(index1)
              this.rotateWheel(index1)
            }

          });
        })
        // .catch(error => {
        //
        // });
      },
      rotateWheel(offset) {
        console.log(111, offset)
        offset = this.wheelData.length - offset; //因为canvas绘图顺序为顺时针，旋转顺序也为顺时针的话，旋转过后的个数会从最大值往最小值数，所以索性对偏移的个数进行取反
        // let actualRotate = Math.PI * 2 / this.wheelData.length;
        let initRotateAngle = 3600;
        let unitAngle = 360 / this.wheelData.length;
        console.log(222, initRotateAngle + unitAngle * offset)
        let actualRotate = initRotateAngle + unitAngle * offset;
        if (!this.rotatingFlag) {
          this.rotatingFlag = true;
          this.wheelCanvas.style.transition = 'all 5s ease';
          this.wheelCanvas.style.transform = 'rotate(' + actualRotate + 'deg)';
          // this.wheelCanvas.style.transform = 'rotate(3600deg)';
          setTimeout(() => {
            this.rotatingFlag = false;
            this.wheelCanvas.style.transition = 'all 0s ease';
            // this.wheelCanvas.style.transform = 'rotate(0deg)';
          }, 5000)
        }

      },
      drawCanvas() {
        console.log(this.remUnit)
        console.log(this.canvasWidth)
        console.log(this.wheelData)
        this.wheelCanvas = document.getElementById('wheelcanvas');
        let ctx = this.wheelCanvas.getContext('2d');
        let ctx2 = this.wheelCanvas.getContext('2d');

        let baseAngle = Math.PI * 2 / this.wheelData.length;
        // document.querySelector('.wheel_wrapper .wheel').style.width = this.remUnit * 13.5;
        // document.querySelector('.wheel_wrapper .wheel').style.height = this.remUnit * 13.5;
        console.log(document.querySelector('.wheel_wrapper .wheel').style)

        let canvasWidth = this.remUnit * 13.5;
        let canvasHeight = this.remUnit * 13.5;
        console.log(canvasWidth)
        console.log(canvasHeight)


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
          imageObj.width = '100';
          imageObj.height = '100';
          imageObj.src = this.wheelData[index].image;
          imageObj.transparency = 0.2;
          imageSequence.push(imageObj);
        });
        let imageSequenceReady = false;


        let count = 0;
        let finishSequence = [];

        let checkImageReady = () => {
          setTimeout(() => {
            if (imageSequenceReady === false) {
              alert(imageSequence[index].onload)

              imageSequence.forEach((item, index) => {
                imageSequence[index].onload = function () {
                  count++;
                }
              });
            }
            if (count === imageSequence.length) {
              imageSequenceReady = true;
            } else {
              checkImageReady();
            }
          }, 200)
        };

        // checkImageReady();

        imageSequenceReady = true;


        this.wheelData.forEach((item, index) => {
          let angle = baseAngle * index;
          // debugger
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
            finishSequence.push(true);
            let translateX, translateY;
            // console.warn(this.wheelData.length)
            // console.warn(this.checkLowestCommonDivisorWith2(this.wheelData.length))

            if (this.checkLowestCommonDivisorWith2(this.wheelData.length)) {
              translateX = canvasWidth * 0.5 + Math.cos(angle + baseAngle / 2 - Math.PI / 2 - Math.PI / this.wheelData.length) * this.remUnit * 5;
              translateY = canvasHeight * 0.5 + Math.sin(angle + baseAngle / 2 - Math.PI / 2 - Math.PI / this.wheelData.length) * this.remUnit * 5;
            } else {
              translateX = canvasWidth * 0.5 + Math.cos(angle + baseAngle / 2) * this.remUnit * 5;
              translateY = canvasHeight * 0.5 + Math.sin(angle + baseAngle / 2) * this.remUnit * 5;
            }

            ctx.font = this.remUnit * 0.7 + "px Georgia";
            ctx.fillStyle = this.textColorDictionary[index % 2];
            ctx.translate(translateX, translateY);
            // ctx.rotate(angle + Math.PI / 2);
            if (this.checkLowestCommonDivisorWith2(this.wheelData.length)) {
              //
              ctx.rotate(angle + Math.PI / 2 - Math.PI / 2);
            } else {
              ctx.rotate(angle + baseAngle / 2 + Math.PI / 2 - Math.PI / 2);
            }
            ctx.fillText(this.wheelData[index].name, -ctx.measureText(this.wheelData[index].name).width / 2, 22);
            // let currentImageUrlData=this.wheelCanvas.getContext('2d').toDataURL('image/png', 1);
            // console.log(currentImageUrlData)
            ctx.drawImage(imageSequence[index], 0, 0, imageSequence[index].width, imageSequence[index].height, -this.remUnit * 0.5, this.remUnit * 1.5, this.remUnit, this.remUnit);
            ctx.shadowColor = '#0f0'; // green for demo purposes
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // ctx.drawImage(currentImageUrlData, 0, 0, currentImageUrlData.width, currentImageUrlData.height, -this.remUnit, this.remUnit * 1.2, this.remUnit * 2, this.remUnit * 2)

            ctx.restore();
            ctx.save();

            // if(finishSequence.length===imageSequence.length){
            //   console.log(finishSequence)
            //   console.log(imageSequence)
            //   let pointer = document.getElementById('pointer')
            //   console.log(pointer.src)
            //   console.log(pointer.width)
            //   pointer.onload = () => {
            //     ctx.drawImage(pointer,this.remUnit*5.2,this.remUnit*5.2,  this.remUnit*3, this.remUnit*3)
            //     ctx.restore();
            //   };
            // }


          };
          // ctx.save();
          // ctx.restore();

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
      acceptPrize() {
        this.$router.push({
          name: 'acceptPrize'
        })
      },
      // checkLowestCommonDivisorWith2(source) {
      //   let result = source / 2;
      //   if (result % 2 === 0) {
      //
      //     if (result > 2) {
      //       this.checkLowestCommonDivisorWith2(result)
      //     } else {
      //       debugger
      //
      //       return result
      //     }
      //   } else {
      //     return result;
      //   }
      // },
      checkLowestCommonDivisorWith2(source) {
        let flag = true;
        for (let i = 2; i < source; i++) {
          source = source / 2;
          if (source !== 2) {
            flag = source % 2 === 0
          }
        }
        return flag;
      }

    }
  }


</script>

<style scoped lang="css">

</style>
