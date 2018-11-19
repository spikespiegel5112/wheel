<template>
  <div class="common_main_container">
    <div class="wolveskill_rules_wrapper">
      <div class="main">
        <div class="wolveskill_block_wrapper">
          <h2>西安高校狼人杀友谊赛S1</h2>
          <h3 class="wolveskill_rulestitle_item">活动时间</h3>
          <p>
            2018.12.01-2018.12.23
          </p>
          <h3 class="wolveskill_rulestitle_item">本校晋级赛</h3>
          <p>
            每所学校海选报名人数限96人，12人为一组进行比 赛。通过两轮比赛最终角逐出两名优胜者进入决赛。 其中，只要进入本校晋级赛第二轮24人决赛组的选 手，两组选手每组的前三名都将获得一份由xxx提供 的xxx奖励.
          </p>
          <h3 class="wolveskill_rulestitle_item">联校总决赛</h3>
          <p>
            总决赛时间2018年12月23日,地点xxxxx 联校总决赛选手包括由8所西安高校通过高校赛晋 级的16名选手和趣谷人气榜单的前8名选手，共计 24人进行两组比赛最终决出前三名。比赛的前三名 将会获得由xxx提供的xxx优胜奖其余选手也都将获 得由xxx提供的xxx参与奖.
          </p>
          <p class="hint">
            比赛由趣谷主办，决赛合作斗鱼，进行全程直播
          </p>

        </div>
        <div class="wolveskill_block_wrapper">
          <h3 class="wolveskill_rulestitle_item">狼人杀游戏规则与技巧</h3>
          <ul class="links">
            <li>
              <label>狼人杀游戏术语图文详解</label>
              <span>
                <x-icon type="ios-arrow-right" size="30"></x-icon>
              </span>
            </li>
            <li>
              <label>狼人杀攻略帮你在桌游聚会中重拾自信</label>
              <span>
                <x-icon type="ios-arrow-right" size="30"></x-icon>
              </span>
            </li>
            <li>
              <label>新手在狼人杀游戏中如何发言？</label>
              <span>
                <x-icon type="ios-arrow-right" size="30"></x-icon>
              </span>
            </li>
            <li>
              <label>玩狼人杀如何抿身份？</label>
              <span>
                <x-icon type="ios-arrow-right" size="30"></x-icon>
              </span>
            </li>
            <li>
              <label>狼人杀如何找狼？</label>
              <span>
                <x-icon type="ios-arrow-right" size="30"></x-icon>
              </span>
            </li>
            <li>
              <label>狼人杀心得</label>
              <span>
                <x-icon type="ios-arrow-right" size="30"></x-icon>
              </span>
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
