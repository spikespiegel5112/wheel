<template>
  <div class="common_main_container">
    <div class="wolveskill_registrationresult_wrapper">
      <div v-if="$checkEnvironment()==='wechat'" class="common_header_wrapper">
        <div class="left_wrapper">
          <div class="previous">
            <a @click="goBack">
              <x-icon type="ios-arrow-left" size="30"></x-icon>
            </a>
          </div>
        </div>
        <div class="middle_wrapper">
          报名结果
        </div>
      </div>

      <div class="maincontainer">
        <div class="wolveskill_activityname_wrapper">报名成功：西安高校狼人杀友谊赛S1</div>
        <div class="wolveskill_block_wrapper">
            <!--<router-link class="link" :to="{name:'ticket',query:{userSchoolName: userInfoData.userSchoolName}}">-->
<!---->
            <!--</router-link>-->
          <h2 class="resulttitle" @click="checkTicket">
            <label>活动门票凭证</label>
            <a class="link">
              <span class="triangle"></span>
            </a>
          </h2>
            <!--<a @click="checkTicket">-->
            <!--</a>-->

        </div>
        <div class="wolveskill_block_wrapper">
          <h2 class="resulttitle">
            <label>人气选手排名投票</label>
            <a class="link">
              修改信息
            </a>
          </h2>
          <div class="main">
            <div class="userinfo_wrapper">
              <div class="userimage">
                <img v-if="userInfoData.userImage!==''&&userInfoData.userImage!==null" :src="userInfoData.userImage"/>
                <img v-else src="../image/wolveskill/canvass_default_00000.jpg"/>
              </div>
              <div class="desc">
                <div class="name">
                  <label>{{userInfoData.userRealName}}</label>
                  <span>{{userSchoolName}}&nbsp&nbsp&nbsp{{userInfoData.userMajor}}</span>
                </div>
                <div class="statistic">
                  <ul>
                    <li>
                      <label>{{userInfoData.ranking}}</label>
                      <span>排名</span>
                    </li>
                    <li>
                      <label>{{userInfoData.votes}}</label>
                      <span>票数</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ul class="wolveskill_button_wrapper">
            <li>
              <a @click="vote">投票</a>
            </li>
            <li>
              <a @click="share">分享拉票</a>
            </li>
          </ul>
          <div class="hint">
            <p>
              榜单说明：趣谷先高校线下狼人杀友谊赛人气选 手榜单，榜单前8名将拥有参加高校联赛的比赛 资格，并获得由XXX提供的人气选手奖励一份
            </p>
          </div>
        </div>
      </div>
    </div>
    <toast v-model="voteSuccessfulFlag" type="text" :time="2000" is-show-mask text="投票成功"></toast>
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
        userInfoData: {},
        userSchoolName:'',
        voteSuccessfulFlag: false,

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
      }
    },
    watch: {
      userInfoData(value) {
        if(this.$store.state.schoolList[0].filter(item => item.value === this.userInfoData.userSchoolName).length > 0){
          this.userSchoolName=this.$store.state.schoolList[0].filter(item => item.value === this.userInfoData.userSchoolName)[0].name;
        }
      }
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
        alert('this.userInfoData.userSchoolName   '+this.userInfoData.userSchoolName)
        let that=this;
        that.$router.push({
          name: 'ticket',
          query: {
            userSchoolName: that.userInfoData.userSchoolName
          }
        })
        // this.$vux.confirm.show({
        //   showCancelButton: false,
        //   title: '请点击右上角按钮分享',
        //   onConfirm() {
        //
        //   }
        // });

      }
    }
  }


</script>

<style scoped lang="scss"></style>
