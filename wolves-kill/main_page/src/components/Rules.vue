<template>
  <div class="common_main_container">
    <div class="wolveskill_rules_wrapper">
      <div class="main">
        <div class="wolveskill_block_wrapper">
          <h2>西安高校狼人杀友谊赛S1</h2>
          <h3 class="wolveskill_rulestitle_item">活动时间</h3>
          <p>
            2018年12月1日至2018年12月23日 <br/>
            1.报名时间：12月1日—12月14日<br/>
            2.人气选手投票时间：12月7日—12月20日<br/>
            3.海选时间：12月16日<br/>
            4.联赛时间：12月22日—12月23日<br/>
          </p>
          <h3 class="wolveskill_rulestitle_item">海选规则与奖品说明</h3>
          <p>
            1.规则说明：每所学校报名人数96人，12人为一组共8组进行比赛。通过积分赛最终选出每所学校的前3名晋级高校联合赛。<br/>
            2.奖品：所有参加海选赛事的同学都可获得价值4元洗衣免单券一张<br/>
            3.时间：12月16日（比赛地址见微信群内通知）<br/>
          </p>
          <h3 class="wolveskill_rulestitle_item">人气选手规则与奖品说明</h3>
          <p>
            1.规则：通过活动页面分享到微信群或朋友圈，邀请好友助力投票，人气榜单排名前6选手直接晋级高校联赛资格<br/>
            2.奖品：高校联赛奖品（每人2000积分+飞利浦蓝牙音响，见下方高校联赛说明）， 同时额外还可获得《Hi室友》同款朵薇璐“朵朵蓝”、“朵朵粉”精美男女护肤套装！<br/>
            3.时间：12月7日—12月20日<br/>
          </p>
          <h3 class="wolveskill_rulestitle_item">高校联赛规则与奖品说明</h3>
          <p>
            1.规则：晋级高校联赛人数共24人（18人通过海选晋级，6人是狼人杀人气榜单前6名选手），12人一组共2组进行比赛；<br/>
            通过积分赛最终于选出每组前6名晋级总决赛。<br/>
            2.奖品：所有参加高校联赛的同学都可获得每人2000积分+飞利浦蓝牙音响。<br/>
            3.时间：12月22日（比赛地址见微信群内通知）<br/>
          </p>
          <h3 class="wolveskill_rulestitle_item">总决赛规则与奖品说明</h3>
          <p>
            1.规则：晋级总决赛人数共12人，通过积分赛最终于选出每组前3名分别为冠军、亚军、季军。<br/>
            2.奖品：冠军奖品：popoking（京东售价￥2800）+30000积分；亚军奖品：popoking（京东售价￥1080）+20000积分；季军奖品：popoking（京东售价￥980） + 10000积分；其它人奖品：5000积分+飞利浦无线耳机。<br/>
            3.时间：12月23日（比赛地址见微信群内通知）<br/>
          </p>
          <p class="hint">
            比赛由趣谷主办，决赛合作斗鱼，进行全程直播
          </p>

        </div>
        <div class="wolveskill_block_wrapper">
          <h3 class="wolveskill_rulestitle_item">狼人杀游戏规则与技巧</h3>
          <ul class="links">
            <li>
              <a href="https://zhuanlan.zhihu.com/p/27306953">
              <label>狼人杀游戏术语图文详解</label>
              <span>
                <x-icon type="ios-arrow-right" size="10"></x-icon>
              </span>
              </a>
            </li>
            <li>
              <a href="https://zhuanlan.zhihu.com/p/25377067">
              <label>狼人杀攻略帮你在桌游聚会中重拾自信</label>
              <span>
                <x-icon type="ios-arrow-right" size="10"></x-icon>
              </span>
              </a>
            </li>
            <li>
              <a href="https://www.zhihu.com/question/51957919/answer/128437723">
              <label>新手在狼人杀游戏中如何发言？</label>
              <span>
                <x-icon type="ios-arrow-right" size="10"></x-icon>
              </span>
              </a>
            </li>
            <li>
              <a href="https://www.zhihu.com/question/51939366/answer/128294747">
              <label>玩狼人杀如何抿身份？</label>
              <span>
                <x-icon type="ios-arrow-right" size="10" ></x-icon>
              </span>
              </a>
            </li>
            <li>
              <a href="https://www.zhihu.com/question/39124335/answer/178293009">
              <label>狼人杀如何找狼？</label>
              <span>
                <x-icon type="ios-arrow-right" size="10"></x-icon>
              </span>
              </a>
            </li>
            <li>
              <a href="https://www.jianshu.com/p/5cb97eebee0d">
              <label>狼人杀心得</label>
              <span>
                <x-icon type="ios-arrow-right" size="10"></x-icon>
              </span>
              </a>
            </li>

          </ul>

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
        formData: {
          avatar: ''
        },
        confirmFlag: false,
        rejectFlag: false,
        redirectingFlag: true,
        unauthorizedFlag: false,
        successfulFlag: false,
        downloadUrl: '',
        accessToken: '',
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
        mySelfData:[{
          title:'我本人更可爱'
        }],
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
      console.log(this.redirectingFlag)
      if (!this.redirectingFlag) {
        this.$remResizing({
          fontSize: 20,
        });
        this.$autoHeight({
          target: '.wolveskill_canvassdetail_wrapper'
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
          this.$vux.loading.hide();

        }).catch(error => {
          // alert(error)
          console.log('this.getAccessToken error', error)
          this.unauthorizedFlag = true;
          this.confirmState = 'unauthorized';
          this.$vux.loading.hide();
        });

      },

      handleReceivePrize() {
        let that = this;
        this.$vux.loading.show({
          text: 'Loading'
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
        this.fnvalleySdkInstance.uploadImage().then(response => {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: 'success ' + response,
            onConfirm() {
            }
          });
          this.formData.avatar = response;
        }).catch(error => {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: 'error ' + error,
            onConfirm() {
            }
          });
        });
      },
      participate() {
        this.$http.post(this.$baseUrl + this.participate_activityRequest, this.formData).then(response => {
          console.log(response)
        }).catch(error => {

        })
      }
    }
  }


</script>

<style scoped lang="scss"></style>
