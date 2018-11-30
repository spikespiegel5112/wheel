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
              <img src="../image/wolveskill/activitybanner_00000.png"/>
            </div>

            <div class="wolveskill_block_wrapper" id="block1">
              <div class="main">
                <div class="activitydetail">
                  <p>
                    离开电子游戏的虚拟世界，回归现实的人际交往在游戏思维碰撞的过程中，进行相互的认识和交流。
                  </p>
                </div>
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
                    <span>2018 年 12 月 30 日 -2018 年 12 月 23 日</span>
                  </li>
                  <li>
                    <label>报名日期</label>
                    <span>2018 年 12 月 30 日 -2018 年 12 月 11 日</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="wolveskill_block_wrapper" id="block2">
              <h1 class="title"><span></span><label>活动详情</label></h1>
              <div class="activitydetail">
                <div class="banner">
                  <img src="../image/wolveskill/activitybanner_00000.png"/>
                </div>
                <p>
                  本届西安高校狼人杀友谊赛S1由趣谷主办，旨在鼓励大学生不在沉溺网络虚拟世界，回归现实人际交往。<br/>
                  &nbsp&nbsp&nbsp&nbsp本次大赛各阶段都设有丰厚奖励，具体如下：
                </p>
                <h1 id="h1"> 1、海选奖励 <span style="font-size: 12px ;"> (完成线下签到才能获得报名奖励哦~）</span></h1>
                <p>
                  活动报名不设门槛，只要你对狼人杀有兴趣，都可以来尝试（每所学校海选限额96人），参与线上报名并于规定时间到线下指定地点与工作人员进行确认到场，即可获得由趣谷官方提供的“智能校园”洗衣免单券一份。
                </p>
                <div class="contentcenter">
                  <div class="imgisis">
                    <img src="../image/wolveskill/activitydetaily001.png"/>
                  </div>
                </div>
                <h1>2、人气选手奖: </h1>
                <p>
                  本次活动我们开设了线上投票，给更多没能晋级的同学一个额外的展现机会。所有参与海选报名的选手即可参与竞选，邀请好友为你投票。人气排名前六的选手，更可直接获得晋级联赛的资格，同时还可获得联赛奖励。
                </p>
                <img src="../image/wolveskill/activitydetaily002.png"/>
                <div class="contentcenter">
                  <p style="color:#000000;">朵薇璐HI室友小鲜肉补水控油套装<br/>
                    <span style="color:#64B0F7;"> (男生奖励)</span>
                </p>

                  <div class="imgisis">
                    <img src="../image/wolveskill/detail_man.png"/>
                  </div>
                  <p style="color:#000000;">朵薇璐HI室友小仙女补水保湿神器<br/>
                    <span style="color:#FF50A6;">(女生奖励)</span>
                  </p>
                  <div class="imgisis">
                    <img src="../image/wolveskill/detail_woman.png"/>
                  </div>
                </div>
                <h1>3、晋级联赛奖励：</h1>
                <p>
                  晋级赛前三名即直接晋级6所学校的联校决赛，所有参与晋级联赛的选手可获得联赛奖励。
                </p>
                <img src="../image/wolveskill/activitydetaily003.png"/>
                <h1>4、决赛奖励：</h1>
                <p>
                  在决赛中没能获得前三名的同学不用灰心，我们给你准备了参与奖，感谢你一直以来对我们活动的支持和鼓励
                </p>
                <img src="../image/wolveskill/activitydetaily004.png"/>
                <h1>5.决赛冠亚季军奖励：</h1>
                <p>
                  最终的胜利者们，你们将会获得冠亚季军奖励，恭喜你，你就是最大的winner！
                </p>
                <img src="../image/wolveskill/activitydetaily005.png"/>
              </div>
            </div>
            <div class="wolveskill_block_wrapper" id="block4">
              <h1 class="title"><span></span><label>活动流程</label></h1>
              <div class="activitydetail">
                <p>
                  活动报名--加入活动群--线下签到--本校海选赛--高校晋级赛--总决赛--颁奖
                </p>
                <h1>1.活动报名</h1>
                <p>
                  2018.12.1开启报名，截止14日报名结束，在趣谷app上报名获取电子门票并加活动群（活动地点和日程由微信狼人杀活动群通知）
                </p>
                <h1 id="h2">2.线下签到 <span style="font-size: 12px ;"> (完成线下签到才能获得报名奖励哦~）</span></h1>

                <p>
                  海选线上报名的选手，请在比赛开始前持电子门票至各校园报名处进行确认到场签到（见校园海报）
                </p>
                <h1>3.本校海选赛</h1>
                <p>
                  每所学校12人组的比赛，每个学校前三名晋级；同时人气榜单排名前6的选手可直接进入决赛。
                </p>
                <h1>4.晋级联赛</h1>
                <p>
                  从海选晋级的18人与人气选手6人进行12人一组，共两组的学校联赛，每组前6名晋级总决赛。
                </p>
                <h1>5.联校总决赛</h1>
                <p>
                  总决赛时间2018年12月23日<br/>
                  （具体详情请查看比赛规则说明、群公告与奖励说明）
                </p>
              </div>
            </div>
            <div class="wolveskill_block_wrapper" id="block5">
              <h1 class="title"><span></span><label>趣谷西安高校线下狼人杀友谊赛规则说明</label></h1>
              <div class="activitydetail">
                <p>
                  2018.12.01-2018.12.23<br/>
                  所有比赛采取积分制，将按照积分的排序选出优胜者
                </p>
                <h1>本校海选赛</h1>
                <p>
                  海选赛时间2018年12月16日<br/>
                  每所学校海选报名人数限96人，12人为一组进行比赛，共8组。每个学校晋级3人进入晋级联赛。
                </p>
                <h1>晋级联赛</h1>
                <p>
                  晋级赛时间2018年12月22日<br/>
                  晋级联赛选手包括由通过海选晋级的18名选手与人气榜单前6名，分成两组进行比赛，每组前6晋级进入决赛。
                </p>
                <h1>联校总决赛</h1>
                <p>
                  总决赛时间2018年12月23日（决赛地点关注活动群通知）<br/>
                  总决赛由联赛晋级的12名选手进行角逐。<br/>
                  比赛的前三名产生冠、亚、季军。<br/>
                  比赛由趣谷主办，决赛合作斗鱼，进行全程直播
                </p>
                <p>
                </p>
                <div class="contentcenter">
                  <h1>特别鸣谢：POPOKING珠宝首饰特别赞助</h1>
                  <p>
                  </p>
                  <div class="imgisis">
                    <img src="../image/wolveskill/activitydetaily006.png"/>
                  </div>
                  <p>趣谷App保留法律允许范围内对本次活动的解释权</p>
                </div>
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
                  榜单说明：人气榜单前8名直接获得晋级资格+晋级联赛奖励（2000积分+飞利浦蓝牙音响）
                </p>
              </div>
            </div>
          </div>
          <div class="wolveskill_block_wrapper" id="block6">
            <h1 class="title">
              <span></span><label>精彩活动</label>
            </h1>
            <div class="activitydetail">
              <img src="../image/wolveskill/activitydetaily002.png"/>
              <img src="../image/wolveskill/activitydetaily003.png"/>
              <img src="../image/wolveskill/activitydetaily004.png"/>
              <img src="../image/wolveskill/activitydetaily005.png"/>
              <img src="../image/wolveskill/activitydetaily006.png"/>
              <img src="../image/wolveskill/activitydetaily002.png"/>
              <img src="../image/wolveskill/activitydetaily003.png"/>
              <img src="../image/wolveskill/activitydetaily004.png"/>
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
  let isClickTab = false;
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
            }).catch(error2 => {
              this.$vux.confirm.show({
                showCancelButton: false,
                title: '请在趣谷App中打开',
                // title: '$getUserLoginId' + '+++++error',
                onConfirm() {
                }
              });
            })
          }).catch(error1 => {
            this.$vux.confirm.show({
              showCancelButton: false,
              // title: '$getAccessToken' + '+++++error',
              title: '请在趣谷APP中打开',
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
        location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=' + this.$domainUrl + '/canvass' + '&response_type=code&scope=snsapi_userinfo&state=' + stateCode + '#wechat_redirect')
      },
      anchorEvent() {
        let blockHeight = document.getElementById('block2').scrollTop;


        let blockDictionary = [{
          name: 'block1',
          height: (() => {
            return document.getElementById('block1').offsetHeight
          })()
        }, {
          name: 'block2',
          height: (() => {
            return document.getElementById('block2').offsetTop - 50
          })()
        }, {
          name: 'block3',
          height: (() => {
            return document.getElementById('block3').offsetTop - 46
          })()
        }, {
          name: 'block6',
          height: (() => {
            return document.getElementById('block6').offsetTop - 46
          })()
        }];
        console.log('blockDictionary2', blockDictionary[2].height)
        console.log('blockDictionary3', blockDictionary[3].height)

        window.onscroll = e => {
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          console.log("scrollTop:" + scrollTop)
          let resultIndex = 0;
          if (scrollTop >= blockDictionary[1].height && scrollTop < blockDictionary[2].height) {
            resultIndex = 1;
          } else if (scrollTop >= blockDictionary[2].height && scrollTop < blockDictionary[3].height) {
            resultIndex = 2;
          } else if (scrollTop >= blockDictionary[3].height) {
            resultIndex = 3;
          } else {
            resultIndex = 0;
          }
          // this.anchorIndex = resultIndex;
          if (!isClickTab) {
            this.activeTabIndex = resultIndex;
            console.log(this.activeTabIndex)
          }
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
          console.log('getUserActivityInfo-----', this.userInfoData.userRealName);
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
        isClickTab = true;
        var t;
        clearTimeout(t);
        t = setTimeout(function () {
          isClickTab = false;
        }, 200);
        this.activeTabIndex = index;
        let blockDictionary = [{
          name: 'block1',
          height: (() => {
            return 0
          })()
        }, {
          name: 'block2',
          height: (() => {
            return document.getElementById('block2').offsetTop - 50
          })()
        }, {
          name: 'block3',
          height: (() => {
            return document.getElementById('block3').offsetTop - 46
          })()
        }, {
          name: 'block6',
          height: (() => {
            return document.getElementById('block6').offsetTop - 46
          })()
        }];
        document.documentElement.scrollTop = blockDictionary[index].height;
        document.body.scrollTop = blockDictionary[index].height;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        console.log("handleTabClickscrollTop:" + scrollTop)
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
