<template>
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
          投票排名
        </div>
      </div>

      <div class="wolveskill_ranklist_container">
        <div class="myself" v-if="userInfoData.loginId!==null">
          <ul>
            <li class="wolveskill_rank_item">
              <span>{{userInfoData.ranking}}</span>
              <div class="content">
                <div class="avatar">
                  <img src="../image/wolveskill/exampleavatar.png"/>
                </div>
                <label class="name">{{userInfoData.userRealName}}</label>
                <label class="votes">{{userInfoData.votes}}</label>
              </div>
            </li>
          </ul>
        </div>
        <div class="ranklist">
          <ul>
            <li v-for="(item, index) in rankListData" class="wolveskill_rank_item" @click="checkPerson(item, index)">
              <span v-if="index===0" class="gold"></span>
              <span v-else-if="index===1" class="silver"></span>
              <span v-else-if="index===2" class="bronze"></span>
              <span v-else>{{index+1}}</span>
              <div class="content" :style="{borderBottom:'1px solid #ccc'}">
                <div class="avatar">
                  <img v-if="item.userImage!==''&&item.userImage!==null" :src="item.userImage"/>
                  <img v-else src="../image/wolveskill/exampleavatar.png"/>
                </div>
                <label class="name">{{item.userRealName}}</label>
                <label class="votes">{{item.votes}}</label>

              </div>
            </li>
          </ul>
        </div>
        <div class="ranklistrules">
          <h2>榜单说明：</h2>
          <p>
            榜单说明：趣谷西安高校线下狼人杀友谊赛人气选手榜单，榜单前8名将拥有参加高校联赛决赛的比赛资格，并获得由xxx提供的人气选手奖励一份
          </p>
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
        find_votes_rankingRequest: 'promotion-service/1.0.0/offline_activity/find_votes_ranking',
        getUserActivityInfoRequest: 'promotion-service/1.0.0/offline_activity/getUserActivityInfo',
        fnvalleySdkInstance: {},
        showAddress: false,
        activeTabIndex: 0,

        participateSuccessful: false,
        activityBeganFlag: false,
        confirmState: 'default',
        queryModel: {
          pageSize: 100
        },
        confirmFlag: false,
        rejectFlag: false,
        redirectingFlag: true,
        rankListData: [{
          title: '我本人更可爱'
        }],
        mySelfData: [{
          title: '我本人更可爱'
        }],
        userInfoData: {}
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
      tabBarWidth() {
        return this.tabList[this.activeTabIndex].title.length * 16 + 'px'
      },
    },
    watch: {
      // activityId(value) {
      //   sessionStorage.setItem('activityId', value)
      // }
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
          target: '.wolveskill_main_container'
        });
        console.log(window)
        this.$getAccessToken().then(response => {
          this.getUserActivityInfo();
        });
        this.getUserActivityInfo();

        this.getRankList();
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
      getRankList() {
        this.$http.get(this.$baseUrl + this.find_votes_rankingRequest + `/${this.$store.state.activityId}`, {
          pageSize: 100
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(response => {
          console.log(response)
          response = response.data;
          this.rankListData = response;
          this.$vux.loading.hide();
        }).catch(error => {
          console.log(error)
        })
      },


      goBack() {
        this.$router.push({
          name: 'homepage'
        })
      },


      checkPerson(data, index) {
        this.$router.push({
          name: 'canvass',
          query: {
            loginId: data.loginId,
            userActivityId: data.userActivityId
          }
        })
      },
    }
  }


</script>

<style scoped lang="scss"></style>
