<template>
  <div>
    <div class="common_main_container">
      <div v-if="redirectingFlag" class="common_initializing_item"></div>
      <div v-else class="wolveskill_main_container">
        <div class="wolveskill_tab_container">
          <tab :line-width="2" :custom-bar-width="tabBarWidth" default-color="#000" active-color="#F9535D">
            <tab-item v-for="(item, index) in tabList" :key="index" :selected="activeTabIndex===index"
                      @on-item-click="handleTabClick">
              {{item.title}}
            </tab-item>
          </tab>
        </div>

        <div class="wolveskill_tabcontent_container">
          <div class="activitydescribe">
            <div class="wolveskill_block_wrapper">
              <img src="../image/wolveskill/activitybanner_00000.jpg"/>
            </div>
            <div class="wolveskill_block_wrapper" id="block1">
              <div class="main">
                <ul>
                  <li>
                    <label>主办方</label>
                    <span>趣谷官方</span>
                  </li>
                  <li>
                    <label>活动地址</label>
                    <span>西安市</span>
                  </li>
                  <li>
                    <label>活动日期</label>
                    <span>2018年12月30日-2018年12月23日</span>
                  </li>
                  <li>
                    <label>报名日期</label>
                    <span>2018年12月30日-2018年12月11日</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="wolveskill_block_wrapper" id="block2">
              <h1 class="title"><span></span><label>活动详情</label></h1>
              <div class="activitydetail">
                <div class="banner">
                  <img src="../image/wolveskill/activitydescribebanner_00000.jpg"/>
                </div>
                <p>
                  离开电子游戏的虚拟世界，回归现实的人际交往在游戏思维碰撞的过程中，进行相互的认识和交流。离开电子游戏的虚拟世界，回归现实的人际交往在游戏思维碰撞的过程中，进行相互的认识和交流。离开电子游戏的虚拟世界，回归现实的人际交往在游戏思维碰撞的过程中，进行相互的认识和交流。
                </p>
              </div>
            </div>
            <div class="wolveskill_block_wrapper" id="block3">
              <h1 class="title">
                <span></span><label>投票排名</label>
                <a class="more" @click="getMore">更多</a>
              </h1>
              <div class="ranklist">
                <ul>
                  <li v-for="(item, index) in rankListData" class="wolveskill_rank_item"
                      :style="{borderBottom:'1px solid #ccc'}" @click="checkPerson(item, index)">
                    <span v-if="index===0" class="gold"></span>
                    <span v-else-if="index===1" class="silver"></span>
                    <span v-else-if="index===2" class="bronze"></span>
                    <span v-else>{{index+1}}</span>
                    <div class="content">
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
      </div>
      <div class="wolveskill_participatebutton_wrapper">
        <div v-if="!alreadyParticipatedFlag" class="unsuccessful">
          <a class="participatebutton" @click="participate">我要参加</a>
        </div>
        <div v-else class="successful">
          <label>您已报名成功</label>
          <a class="participatebutton" @click="checkResult">报名结果</a>
        </div>
      </div>
    </div>
    <!--<Confirm-->
    <!--v-show="successfulFlag"-->
    <!--title="提示"-->
    <!--:content="confirmContentDictionary[confirmState].content"-->
    <!--:button="buttonList.filter(item=>item.name==='successful')"-->
    <!--@confirm="successfulFlag=false"-->
    <!--/>-->

  </div>
</template>

<script>
  // import Cookies from 'js-cookie'
  import FnvalleySdk from '../js/FnvalleySdk'
  import Confirm from './Confirm.vue'


  // import FnvalleySdk from 'FnvalleySdk'
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

        find_votes_rankingRequest: 'promotion-service/1.0.0/offline_activity/find_votes_ranking',
        fnvalleySdkInstance: {},
        tabList: [{
          title: '活动',
          name: 'activity'
        }, {
          title: '详情',
          name: 'detail'
        }, {
          title: '投票排名',
          name: 'rank'
        }, {
          title: '精彩现场',
          name: 'scene'
        }],
        rankListData: [{
          title: '我本人更可爱'
        }],
        activeTabIndex: 0,

        alreadyParticipatedFlag: false,
        activityBeganFlag: false,
        confirmState: 'default',

        confirmFlag: false,
        rejectFlag: false,
        redirectingFlag: true,
        unauthorizedFlag: false,
        successfulFlag: false,
        downloadUrl: '',
        remUnit: 0

      }
    },
    computed: {
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
        return this.tabList[this.activeTabIndex].title.length * 16 + 'px';
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
      this.redirectingFlag = false;


    },
    mounted() {
      // alert('mounted')
      // console.log(FnvalleySdk)
      console.log(this.redirectingFlag)
      if (!this.redirectingFlag) {
        this.$remResizing({
          fontSize: 20,
        });
        this.$autoHeight({
          target: '.wolveskill_main_container'
        });
        console.log(window)
        if (this.$store.state.accessToken === '') {
          this.$getAccessToken().then(response1 => {
            // this.$vux.confirm.show({
            //   showCancelButton: false,
            //   title: '$getAccessToken' + response1,
            //   onConfirm() {
            //   }
            // });
            this.$getUserLoginId().then(response2 => {
              // this.$vux.confirm.show({
              //   showCancelButton: false,
              //   title: '$getUserLoginId' + response2,
              //   onConfirm() {
              //   }
              // });
              this.getRankList();
              this.getUserActivityInfo();
              this.anchorEvent();
              this.$nextTick(() => {
                this.remUnit = Number(document.getElementsByTagName('html')[0].style.fontSize.replace('px', ''))
              })
            }).catch(error2=>{
              this.$vux.confirm.show({
                showCancelButton: false,
                title: '$getUserLoginId' + '+++++error',
                onConfirm() {
                }
              });
            })
          }).catch(error1=>{
            this.$vux.confirm.show({
              showCancelButton: false,
              title: '$getAccessToken' + '+++++error',
              onConfirm() {
              }
            });
          })
        } else {
          this.getRankList();
          this.getUserActivityInfo();
          this.anchorEvent();
          this.$nextTick(() => {
            this.remUnit = Number(document.getElementsByTagName('html')[0].style.fontSize.replace('px', ''))
          })
        }


      }
      console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    },
    methods: {
      reInitializePage() {
        let stateCode = `channel=${this.channel}$activityId=${this.activityId}`;
        // alert('reInitializePage.stateCode', stateCode)
        location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$domainUrl+'/canvass' + '&response_type=code&scope=snsapi_userinfo&state=' + stateCode + '#wechat_redirect')
      },
      anchorEvent() {
        let blockHeight = document.getElementById('block2').scrollTop;


        let blockDictionary = [{
          name: 'block1',
          height: (() => {
            return document.getElementById('block1').scrollTop
          })()
        }, {
          name: 'block2',
          height: (() => {
            return document.getElementById('block2').scrollTop
          })()
        }, {
          name: 'block3',
          height: (() => {
            return document.getElementById('block3').scrollTop
          })()
        }];
        console.log('blockDictionary', blockDictionary[2].height)

        window.onscroll = e => {
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

          let resultIndex = 0;
          let block1ScrollTop = document.getElementById('block1').scrollTop;
          let block2ScrollTop = document.getElementById('block2').scrollTop;
          let block3ScrollTop = document.getElementById('block3').scrollTop;
          blockDictionary.forEach((item, index) => {
            if (scrollTop > item.height) {
              resultIndex = index;
            }
          });
          this.anchorIndex = resultIndex;
          console.log(this.anchorIndex)
          console.log(blockHeight)
        }
      },
      getUserActivityInfo() {
        // alert(this.$store.state.accessToken)
        this.$http.get(this.$baseUrl + this.getUserActivityInfoRequest + `/${this.$store.state.activityId}/${this.$store.state.loginId}`, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.accessToken
          }
        }).then(response => {
          console.log('getUserActivityInfo', response)
          response = response.data;
          if (response.userActivityId !== 0) {
            this.alreadyParticipatedFlag = true;
          }
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
      getRankList() {
        this.$http.get(this.$baseUrl + this.find_votes_rankingRequest + `/${this.$store.state.activityId}`, {
          pageSize: 8
        }).then(response => {
          console.log(response)
          response = response.data;
          this.rankListData = response;
          this.$vux.loading.hide();
        }).catch(error => {
          console.log(errpr)
        })
      },


      handleTabClick(index) {
        console.log(index)
        this.activeTabIndex = index;
      },
      getMore() {
        this.$router.push({
          name: 'rankList'
        })
      },
      participate() {
        this.$router.push({
          name: 'participate'
        })
      },
      checkPerson(data, index) {
        this.$router.push({
          name: 'canvass',
          query: {
            state: `loginId=${data.loginId}$userActivityId=${data.userActivityId}`
          }
        })
      },
      checkResult() {
        this.$router.push({
          name: 'registrationResult',
          query: {
            userActivityId: this.userInfoData.userActivityId
          }
        })
      },
    }
  }


</script>

<style scoped lang="scss"></style>
