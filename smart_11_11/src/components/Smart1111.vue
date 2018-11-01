<template>
  <div>
    <div class="common_main_container">
      <div v-if="redirectingFlag" class="common_initializing_item"></div>
      <div v-else class="smart1111_main_container">
        <div class="bannerbg">
          <div class="slogen">
            <div class="left">
              使用智能设备
            </div>
            <div class="right">
              拿走实物奖励
            </div>
          </div>
          <div class="rules">
            <p>
              11月1日--11月16日期间<br/>
              只需使用一次智能校园设备<br/>
              即可免费领取实物奖励！！<br/>
              活动期间每位同学只可以领取一次哦! <br/>
            </p>
          </div>
        </div>
        <div class="prize">
          <div class="prizemask">
            <ul>
              <li class="one">
                <label>创意收纳袋</label>
              </li>
              <li class="two">
                <label>可爱热水袋</label>
              </li>
              <li class="three">
                <label>滴露健康沐浴露</label>
              </li>
              <li class="four">
                <label>鼠标加热垫</label>
              </li>
            </ul>
          </div>
          <div class="prizelist">
            <ul>
              <li class="one">
                <img src="../image/smart1111/prize1_00000.jpg"/>
              </li>
              <li class="two">
                <img src="../image/smart1111/prize2_00000.jpg"/>
              </li>
              <li class="three">
                <img src="../image/smart1111/prize3_00000.jpg"/>
              </li>
              <li class="four">
                <img src="../image/smart1111/prize4_00000.jpg"/>
              </li>
            </ul>
          </div>
        </div>
        <div class="receive">
          <a class="receivebutton" @click="handleReceivePrize"></a>
        </div>
        <div class="hint">
          注：图片仅供参考，奖品以实际为准
        </div>
      </div>
    </div>
    <Confirm
      v-show="successfulFlag"
      title="提示"
      :content="confirmContentDictionary[confirmState].content"
      :button="buttonList.filter(item=>item.name==='successful')"
      @confirm="successfulFlag=false"
    />
    <Confirm
      v-show="rejectFlag"
      title="提示"
      :content="confirmContentDictionary[confirmState].content"
      :button="buttonList.filter(item=>item.name==='notYet')"
      @confirm="rejectFlag=false"
    />
    <Confirm
      v-show="unauthorizedFlag"
      title="提示"
      :content="confirmContentDictionary[confirmState].content"
      :button="buttonList.filter(item=>item.name==='downloadApp')"
      @confirm="buttonList.filter(item=>item.name==='downloadApp')[0].callback(()=>{
        downloadApp();
      })"
    />

    <Confirm
      v-show="confirmFlag"
      title="提示"
      :content="confirmContentDictionary[confirmState].content"
      :button="buttonList.filter(item=>item.name==='receivePrize'||item.name==='cancel')"
      @confirm="buttonList.filter(item=>item.name==='receivePrize')[0].callback(()=>{
        confirmFlag=false;
        receivePrize();
      })"
      @cancel="confirmFlag=false"
    />
  </div>
</template>

<script>
  // import Cookies from 'js-cookie'
  import FnvalleySdk from '../js/FnvalleySdk'
  import Confirm from './Confirm.vue'


  // import FnvalleySdk from 'FnvalleySdk'
  // import wx from 'weixin-js-sdk'

  export default {
    name: "smart1111",
    components: {
      Confirm
    },
    data() {
      return {
        getUserInfoByTokenRequest: 'uaa/user',
        addUserSchoolRequest: 'profile-service/1.0.0/user_school/addUserSchool',
        check_join_activityRequest: 'promotion-service/1.0.0/offline_activity/check_join_activity',
        participate_activityRequest: 'promotion-service/1.0.0/offline_activity/participate_activity',
        fnvalleySdkInstance: {},

        activityBeganFlag: false,
        confirmState: 'default',
        confirmContentDictionary: {
          default: {
            content: "<p></p>"
          },
          notYet: {
            content: "<p>活动不在有效期内</br>请阅读活动时间和活动说明</p>"
          },
          notExist: {
            content: "<p>活动不存在</p>"
          },
          alreadyParticipated: {
            content: "<p>已参加活动</br>请阅读活动时间和活动说明</p>"
          },
          confirm: {
            content: "<p>确认领取奖励？</p>"
          },
          unauthorized: {
            content: "<p>请使用趣谷App扫码领奖</p>"
          },
          notConsumed: {
            content: "<p>你未达到活动要求，不能领取奖品，尽快去完成吧！</p>"
          },
          successful: {
            content: "<p>成功参加活动</p>"
          },
        },
        buttonList: [{
          type: 'confirm',
          name: 'default',
          text: '确定',
          callback: function () {
            this.confirmFlag = false;
          }
        }, {
          type: 'confirm',
          name: 'unauthorized',
          text: '确定',
          callback: function () {
            this.confirmFlag = false;
          }
        }, {
          type: 'confirm',
          name: 'notYet',
          text: '确定',
          callback: function () {
            this.confirmFlag = false;
          }
        }, {
          type: 'confirm',
          name: 'receivePrize',
          text: '确定',
          callback: function (callback) {
            console.log(this)
            return callback();
          }
        }, {
          type: 'cancel',
          name: 'cancel',
          text: '取消',
          callback: function () {
            this.confirmFlag = false;
          }
        }, {
          type: 'confirm',
          name: 'downloadApp',
          text: '下载',
          callback: function (callback) {
            return callback();
          }
        }, {
          type: 'confirm',
          name: 'successful',
          text: '确定',
          callback: function (callback) {
            console.log(this)
            return callback();
          }
        }],
        confirmFlag: false,
        rejectFlag: false,
        redirectingFlag: true,
        unauthorizedFlag: false,
        successfulFlag: false,
        downloadUrl: '',
        accessToken: ''
      }
    },
    computed: {
      // accessToken() {
      //   return this.$route.query.accessToken || '4b70ab01-f40e-41e9-b4b5-fa9020332c01';
      // },
      channel() {
        return this.$route.query.channel || '';
      },
      loginId() {
        return this.$route.query.loginId || '';
      },
      isActivity() {
        return new Date('July 21, 2018 00:00:00') >= new Date('July 21, 2018 00:00:00');
      },
      activityId() {
        return 5;
      }
    },
    watch: {
      // activityId(value) {
      //   sessionStorage.setItem('activityId', value)
      // }
    },
    beforeCreate() {

    },
    beforeMount() {
      console.log(this.$route)
      this.$vux.loading.show({
        text: 'Loading'
      });
      if (this.$route.query.routeto === 'advertise') {
        this.$vux.loading.hide();
        this.$router.push({
          name: 'smart1111Advertise'
        });
      } else {
        this.redirectingFlag = false;
      }

    },
    mounted() {
      // alert('mounted')
      // console.log(FnvalleySdk)
      console.log(this.isActivity)
      if(!this.redirectingFlag){
        this.$remResizing({
          fontSize: 20,
        });
        this.$autoHeight({
          target: '.smart1111_main_container'
        });
        console.log(window)
        this.getAccessToken();
        this.getDownloadUrl();
      }
    },
    methods: {
      getAccessToken() {
        // alert('getAccessToken')
        let fnvalleySdkInstance = new FnvalleySdk();
        fnvalleySdkInstance.userAccessToken().then(data => {
          console.log(data)
          // alert('this.accessToken+++' + data)
          console.log('this.getAccessToken++++', data)
          this.accessToken = data;
          this.recordChannel();
        }).catch(error => {
          // alert(error)
          console.log('this.getAccessToken error', error)
          this.unauthorizedFlag = true;
          this.confirmState = 'unauthorized';
          this.$vux.loading.hide();
          this.$autoHeight({
            target: '.smart1111_confirm_wrapper',
            force: true
          });
          this.$vux.loading.hide();
        });

      },
      recordChannel() {
        this.$http.post(this.$baseUrl + this.addUserSchoolRequest, {
          schoolCode: this.channel,
          access_token: this.accessToken
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
          }],
        }).then(response => {
          console.log(response)
          this.$vux.loading.hide();

        }).catch(error => {
          // alert(error)
        })
      },
      handleReceivePrize() {
        let that = this;
        this.$vux.loading.show({
          text: 'Loading'
        });
        this.$autoHeight({
          target: '.smart1111_confirm_wrapper',
          force: true
        });
        this.$http.get(this.$baseUrl + this.check_join_activityRequest + `/${this.activityId}`, {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        }).then(response => {
          console.log(response)
          // alert(response.code)
          this.$vux.loading.hide();
          switch (response.code) {
            case 10000:
              this.confirmFlag = true;
              this.confirmState = 'confirm';
              break;
            case 10001:
              this.rejectFlag = true;
              this.confirmState = 'alreadyParticipated';
              break;
            case 10006:
              this.rejectFlag = true;
              this.confirmState = 'notYet';
              break;
            case 10007:
              this.rejectFlag = true;
              this.confirmState = 'notExist';
              break;
            case 10029:
              this.rejectFlag = true;
              this.confirmState = 'notConsumed';
              break;
          }
        });
      },
      receivePrize() {
        this.$vux.loading.show({
          text: 'Loading'
        });
        let that = this;
        // this.fnvalleySdkInstance.check()
        this.$http.post(this.$baseUrl + this.participate_activityRequest + `/${this.activityId}`, {}, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.accessToken
          }
        }).then(response => {
          console.log(response)
          switch (response.code) {
            case 10000:
              this.successfulFlag = true;
              this.confirmState = 'successful';
              break;

          }
          this.$vux.loading.hide();
        }).catch(error => {
          // alert(error)
          this.$vux.loading.hide();

        })
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
      },
      downloadApp() {
        location.assign(this.downloadUrl)
      }
    }
  }


</script>

<style scoped lang="scss"></style>
