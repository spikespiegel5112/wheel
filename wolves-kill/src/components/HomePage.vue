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
            <div class="wolveskill_block_wrapper">
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
            <div class="wolveskill_block_wrapper">
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
            <div class="wolveskill_block_wrapper">
              <h1 class="title">
                <span></span><label>投票排名</label>
                <a @click="getMore">更多</a>
              </h1>
              <div class="ranklist">
                <ul>
                  <li v-for="(item, index) in rankListData">
                    <span v-if="index===0" :style="{backgroundImage:'url(../../src/image/wolveskill/medal_gold.png)'}"></span>
                    <span v-else-if="index===1" :style="{backgroundImage:'url(../../src/image/wolveskill/medal_silver.png)'}"></span>
                    <span v-else-if="index===2" :style="{backgroundImage:'url(../../src/image/wolveskill/medal_bronze.png)'}"></span>
                    <span v-else>{{index+1}}</span>
                    <img src="../image/wolveskill/exampleavatar.png"/>
                    <label>{{item.title}}</label>
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
        <div v-if="!participateSuccessful" class="unsuccessful">
          <a class="participatebutton" @click="participate">我要参加</a>
        </div>
        <div v-else class="successful">
          <label>您已报名成功</label>
          <a class="participatebutton">报名结果</a>
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
        fnvalleySdkInstance: {},
        tabList: [{
          title: '活动',
          name:'activity'
        }, {
          title: '详情',
          name:'detail'
        }, {
          title: '投票排名',
          name:'rank'
        }, {
          title: '精彩现场',
          name:'scene'
        }],
        rankListData:[{
          title:'我本人更可爱'
        },{
          title:'我本人更可爱'
        },{
          title:'我本人更可爱'
        },{
          title:'我本人更可爱'
        },{
          title:'我本人更可爱'
        },{
          title:'我本人更可爱'
        },{
          title:'我本人更可爱'
        },{
          title:'我本人更可爱'
        }],
        activeTabIndex: 0,

        participateSuccessful:false,
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
      // console.log(FnvalleySdk)
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
      getMore(){

      },
      participate(){
        this.$router.push({
          name:'participate'
        })
      }
    }
  }


</script>

<style scoped lang="scss"></style>
