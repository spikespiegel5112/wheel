<template>
  <div class="common_main_container">
    <div class="wolveskill_ticket_wrapper">
      <div v-if="$checkEnvironment()==='wechat'" class="common_header_wrapper">
        <div class="left_wrapper">
          <div class="previous">
            <a @click="goBack">
              <x-icon type="ios-arrow-left" size="30"></x-icon>
            </a>
          </div>
        </div>
        <div class="middle_wrapper">
          活动群二维码
        </div>
      </div>

      <div class="maincontainer">
        <div class="wolveskill_activityname_wrapper">活动名称：西安高校狼人杀友谊赛S1</div>

        <!--<div class="wolveskill_block_wrapper">-->
          <!--<div class="wolveskill_qrcode_wrapper">-->
            <!--<label>参加活动门票凭证</label>-->
            <!--&lt;!&ndash;<img src="../image/wolveskill/qrcode/ouya_group_00000.jpg"/>&ndash;&gt;-->
            <!--&lt;!&ndash;<img src="../image/wolveskill/qrcode/ouya_group_00000.jpg"/>&ndash;&gt;-->
            <!--&lt;!&ndash;<img :src='imageDictionary[0].url'/>&ndash;&gt;-->


            <!--<img v-if="userSchoolName==='ouya'" src="../image/wolveskill/qrcode/ouya_ticket_00000.jpg"/>-->
            <!--<img v-if="userSchoolName==='xiancaijin'" src="../image/wolveskill/qrcode/xiancaijin_ticket_00000.jpg"/>-->
            <!--<img v-if="userSchoolName==='xianmeishu'" src="../image/wolveskill/qrcode/xianmeishu_ticket_00000.jpg"/>-->
            <!--<img v-if="userSchoolName==='xianzhenfa'" src="../image/wolveskill/qrcode/xianzhenfa_ticket_00000.jpg"/>-->
            <!--<img v-if="userSchoolName==='xianzyy'" src="../image/wolveskill/qrcode/xianzyy_ticket_00000.jpg"/>-->
            <!--<img v-if="userSchoolName==='xianxiandai'" src="../image/wolveskill/qrcode/xianxiandai_ticket_00000.jpg"/>-->
            <!--<img v-if="userSchoolName==='xianzhiye'" src="../image/wolveskill/qrcode/xianzhiye_ticket_00000.jpg"/>-->
            <!--<img v-if="userSchoolName==='xianpeihua_new'" src="../image/wolveskill/qrcode/xianpeihua_new_ticket_00000.jpg"/>-->
            <!--<p class="hint">-->
              <!--用此凭证完成线下签到即可获得报名奖励-->
            <!--</p>-->
          <!--</div>-->
        <!--</div>-->
        <div class="wolveskill_block_wrapper">
          <div class="wolveskill_qrcode_wrapper">
            <label>活动群二维码</label>
            <img v-if="userSchoolName==='西安欧亚学院'" src="../image/wolveskill/qrcode/ouya_group.jpeg"/>
            <img v-if="userSchoolName==='西安培华学院'" src="../image/wolveskill/qrcode/pehua_group.jpeg"/>
            <img v-if="userSchoolName==='西北大学现代学院'" src="../image/wolveskill/qrcode/xibeida_group.jpeg"/>
            <img v-if="userSchoolName==='西北政法大学'" src="../image/wolveskill/qrcode/zhengfa_group.jpeg"/>
            <img v-if="userSchoolName==='西安西京学院'" src="../image/wolveskill/qrcode/xijing_group.jpeg"/>
            <img v-if="userSchoolName==='西安外事学院'" src="../image/wolveskill/qrcode/waishi_group.jpeg"/>
            <p class="hint">
              截屏当前页面用微信扫码，加入活动微信群
            </p>
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
        getUserActivityInfoRequest: 'promotion-service/1.0.0/offline_activity/getUserActivityInfo',
        voteRequest: 'promotion-service/1.0.0/offline_activity/vote',

        fnvalleySdkInstance: {},
        showAddress: false,
        activeTabIndex: 0,

        participateSuccessful: false,
        activityBeganFlag: false,
        confirmState: 'default',
        confirmFlag: false,
        rejectFlag: false,
        userInfoData: {}
        // imageDictionary:[{
        //   name:'ouya',
        //   url:require('../image/wolveskill/qrcode/ouya_ticket_00000.jpg')
        // }]
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
        return this.tabList[this.activeTabIndex].title.length * 16 + 'px';
      },
      userActivityId() {
        return this.$route.query.userActivityId;
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
          target: '.wolveskill_canvassdetail_wrapper'
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
      vote() {
        this.$http.post(this.$baseUrl + this.voteRequest + `/${this.userActivityId}`, {}, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.$store.state.accessToken
          }
        }).then(response => {
          console.log(response)
          switch (response.code) {
            case 10000:
              this.voteSuccessfulFlag = true;
              this.getUserActivityInfo();

          }
        })
      },
      share() {
        console.log(this.$checkEnvironment())
        if (this.$checkEnvironment() !== 'wechat') {
          this.fnvalleySdkInstance.openAPPShare({
            "title": "tttt",
            "describe": "dddd",
            "weburl": "http://www.baidu.com"
          })
        } else {
          this.initJSSDK();
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '请点击右上角按钮分享',
            onConfirm() {
            }
          });
        }

      },
      checkTicket() {
        this.$router.push({
          name: 'ticket',
          query: {
            userSchoolName: this.userInfoData.userSchoolName
          }
        })
      }
    }
  }


</script>

<style scoped lang="scss"></style>
