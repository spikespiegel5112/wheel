<template>
  <div class="common_main_container">

    <div class="wolveskill_participatesuccessful_wrapper">
      <div v-if="$checkEnvironment()==='wechat'" class="common_header_wrapper">
        <div class="left_wrapper">
          <div class="previous">
            <a @click="goBack">
              <x-icon type="ios-arrow-left" size="30"></x-icon>
            </a>
          </div>
        </div>
        <div class="middle_wrapper">
          报名成功
        </div>
      </div>
      <div class="title">
        报名成功！
      </div>
      <div class="hint">
        截屏下方二维码，马上加入活动群
      </div>
      <div class="qrcode">
        <img v-if="userSchoolName==='ouya'" src="../image/wolveskill/qrcode/ouya_group_00000.jpg"/>
        <img v-if="userSchoolName==='xiancaijin'" src="../image/wolveskill/qrcode/xiancaijin_group_00000.jpg"/>
        <img v-if="userSchoolName==='xianmeishu'" src="../image/wolveskill/qrcode/xianmeishu_group_00000.jpg"/>
        <img v-if="userSchoolName==='xianzhenfa'" src="../image/wolveskill/qrcode/xianzhenfa_group_00000.jpg"/>
        <img v-if="userSchoolName==='xianzyy'" src="../image/wolveskill/qrcode/xianzyy_group_00000.jpg"/>
        <img v-if="userSchoolName==='xianxiandai'" src="../image/wolveskill/qrcode/xianxiandai_group_00000.jpg"/>
        <img v-if="userSchoolName==='xianzhiye'" src="../image/wolveskill/qrcode/xianzhiye_group_00000.jpg"/>
        <img v-if="userSchoolName==='xianpeihua_new'" src="../image/wolveskill/qrcode/xianpeihua_new_group_00000.jpg"/>
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
    name: "Ticket",
    components: {
      Confirm
    },
    data() {
      return {
        getUserInfoByTokenRequest: 'uaa/user',
        addUserSchoolRequest: 'profile-service/1.0.0/user_school/addUserSchool',
        check_join_activityRequest: 'promotion-service/1.0.0/offline_activity/check_join_activity',
        participate_activityRequest: 'promotion-service/1.0.0/offline_activity/participate_activity',
        getUserActivityInfoRequest: 'promotion-service/1.0.0/offline_activity/getUserActivityInfo',
        fnvalleySdkInstance: {},
        showAddress: false,
        activeTabIndex: 0,

        participateSuccessful: false,
        activityBeganFlag: false,
        confirmState: 'default',
        confirmFlag: false,
        rejectFlag: false,
        userInfoData: {},
        qrCodeDictionary:[{
          link:'../image/wolveskill/canvass_default_00000.jpg'
        }]
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
      tabBarWidth() {
        return this.tabList[this.activeTabIndex].title.length * 16 + 'px'
      },
      userSchoolName(){
        return this.$route.query.userSchoolName;
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
      console.log(this.redirectingFlag)
      if (!this.redirectingFlag) {
        this.$remResizing({
          fontSize: 20,
        });
        this.$autoHeight({
          target: '.wolveskill_participatesuccessful_wrapper'
        });
        console.log(window)
        this.getUserActivityInfo();

      }
    },
    methods: {
      getUserActivityInfo() {
        this.$http.get(this.$baseUrl + this.getUserActivityInfoRequest + `/${this.$store.state.activityId}/${this.$store.state.loginId}`, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.accessToken
          }
        }).then(response => {
          console.log(response)
          response = response.data;
          this.userInfoData = response;
          this.$vux.loading.hide();
        }).catch(error => {
          console.log(error)
          this.$vux.confirm.show({
            showCancelButton: false,
            title: 'getUserActivityInfo_error' + error,
            onConfirm() {
            }
          });
        })
      },
      getAccessToken() {
        // alert('getAccessToken')

        this.fnvalleySdkInstance.userAccessToken().then(data => {
          console.log(data)
          // alert('this.accessToken+++' + data)
          console.log('this.getAccessToken++++', data)
          this.accessToken = data;
          this.$vux.loading.hide();

        }).catch(error => {
          // alert(error)
          console.log('this.getAccessToken error', error)
          this.unauthorizedFlag = true;
          this.confirmState = 'unauthorized';
          this.$vux.loading.hide();
        });

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
    }
  }


</script>

<style scoped lang="scss"></style>
