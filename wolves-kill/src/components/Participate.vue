<template>
  <div>
    <div class="common_main_container">
      <div v-if="redirectingFlag" class="common_initializing_item"></div>
      <div v-else class="wolveskill_main_container">
        <div v-if="$checkEnvironment()==='wechat'" class="common_header_wrapper">
          <div class="left_wrapper">
            <div class="previous">
              <a @click="goBack">
                <x-icon type="ios-arrow-left" size="30"></x-icon>
              </a>
            </div>
          </div>
          <div class="middle_wrapper">
            填写信息
          </div>
        </div>


        <div class="wolveskill_partcipateform_wrapper">
          <div class="wolveskill_formitem_wrapper">
            <group>
              <x-input label-width="6rem" title="姓名" placeholder="请输入您的姓名"></x-input>
            </group>
          </div>
          <div class="wolveskill_formitem_wrapper">
            <group>
              <x-input label-width="6rem" title="电话" placeholder="请输入您的电话"></x-input>
            </group>
          </div>
          <div class="wolveskill_formitem_wrapper">
            <group>
              <x-address title="学校" placeholder="请选择您的院校" :list="list" :show.sync="showAddress"></x-address>
            </group>
          </div>
          <div class="wolveskill_formitem_wrapper">
            <group>
              <!--<x-input label-width="6rem" title="专业" :is-type="" placeholder="请输入您的专业"></x-input>-->
            </group>
          </div>
          <div class="wolveskill_formitem_wrapper">
            <group>
              <x-address title="入学年份" placeholder="请选择入学年份" :list="list" :show.sync="showAddress"></x-address>

              <!--<selector label-width="6rem" ref="defaultValueRef" title="省份" :options="list" v-model="defaultValue"  placeholder="请输入您的专业"></selector>-->
            </group>
          </div>
          <div class="wolveskill_formitem_wrapper">
            <group label-width="2.4rem">
              <cell-box title="排行头像">
                <a class="uploader" @click="uploadAvatar">
                  <x-icon type="ios-plus-empty" size="60"></x-icon>
                </a>
              </cell-box>
            </group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Cookies from 'js-cookie'
  import FnvalleySdk from '../js/FnvalleySdk'
  import Confirm from './Confirm.vue'


  // import wx from 'weixin-js-sdk'

  export default {
    name: "wolveskill",
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
        showAddress: false,
        activeTabIndex: 0,

        participateSuccessful: false,
        activityBeganFlag: false,
        confirmState: 'default',
        confirmContentDictionary: {
          default: {
            content: "<p></p>"
          },

        },
        list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
        buttonList: [{
          type: 'confirm',
          name: 'default',
          text: '确定',
          callback: function () {
            this.confirmFlag = false;
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
      },
      tabBarWidth() {
        return this.tabList[this.activeTabIndex].title.length * 16 + 'px'
      },
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
          name: 'wolveskillAdvertise'
        });
      } else {
        this.redirectingFlag = false;
      }

    },
    mounted() {
      // alert('mounted')
      console.log(new FnvalleySdk())
      this.fnvalleySdkInstance = new FnvalleySdk();
      console.log(this.isActivity)
      if (!this.redirectingFlag) {
        this.$remResizing({
          fontSize: 20,
        });
        this.$autoHeight({
          target: '.wolveskill_main_container'
        });
        console.log(window)
        this.getAccessToken();
        this.getDownloadUrl();
      }
    },
    methods: {
      getAccessToken() {
        // alert('getAccessToken')

        this.fnvalleySdkInstance.userAccessToken().then(data => {
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
            target: '.wolveskill_confirm_wrapper',
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
          target: '.wolveskill_confirm_wrapper',
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
      },
      handleTabClick(index) {
        console.log(index)
        this.activeTabIndex = index;
      },
      goBack() {
        this.$router.push({
          name: 'homepage'
        })
      },
      partcipate() {
        this.$router.push({
          name: 'participate'
        })
      },
      uploadAvatar() {
        console.log(this.fnvalleySdkInstance)
        this.fnvalleySdkInstance.uploadImage();
      }

    }
  }


</script>

<style scoped lang="scss"></style>
