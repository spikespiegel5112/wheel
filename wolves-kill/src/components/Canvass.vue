<template>
  <div class="common_main_container">
    <div class="wolveskill_canvassdetail_wrapper">
      <div v-if="$checkEnvironment()==='wechat'" class="common_header_wrapper">
        <div class="left_wrapper">
          <div class="previous">
            <a @click="goBack">
              <x-icon type="ios-arrow-left" size="30"></x-icon>
            </a>
          </div>
        </div>
        <div class="middle_wrapper">
          西安高校狼人杀友谊赛S1
        </div>
      </div>
      <div class="header">
        <div class="avatar">
          <img v-if="userInfoData.userImage===null||userInfoData.userImage===''" src=""/>
          <img v-else :src="userInfoData.userImage"/>
        </div>
        <div class="desc">
          <h2>
            <p>{{userInfoData.userRealName}}</p>
            <span>最具人气选手投票</span>
          </h2>
          <label>{{userInfoData.userSchoolName}}，{{userInfoData.userMajor}}</label>
        </div>
      </div>
      <div class="maincontent">
        <div class="statistic">
          <ul>
            <li>
              <span>{{userInfoData.votes}}</span>
              <label>票数</label>
            </li>
            <li>
              <span>{{userInfoData.ranking!=='-1'?userInfoData.ranking:'100+'}}</span>
              <label>排名</label>
            </li>
          </ul>
        </div>
        <div class="canvasspicture">
          <img v-if="userInfoData.userImage===null||userInfoData.userImage===''"
               src="../image/wolveskill/canvass_default_00000.jpg"/>
          <img v-else :src="userInfoData.userImage"/>

        </div>
        <ul class="wolveskill_button_wrapper">
          <li>
            <a @click="vote">投票</a>
          </li>
          <li>
            <a @click="share">分享</a>
          </li>
        </ul>
        <div class="advertise">

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
        getSignatureRequest: 'account-service/1.0.0/weChat/getSignature',

        fnvalleySdkInstance: {},
        showAddress: false,
        activeTabIndex: 0,

        participateSuccessful: false,
        activityBeganFlag: false,
        confirmState: 'default',
        confirmFlag: false,
        rejectFlag: false,
        userInfoData: {},
        voteSuccessfulFlag: false
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
      userActivityId() {
        return this.$route.query.userActivityId
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
        // this.$autoHeight({
        //   target: '.wolveskill_canvassdetail_wrapper'
        // });
        console.log(window)
        this.$getUserLoginId();
        this.getUserActivityInfo();
      }
    },
    methods: {
      getUserActivityInfo() {
        this.$http.get(this.$baseUrl + this.getUserActivityInfoRequest + `/${this.$store.state.activityId}/${this.loginId}`, {
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
      initJSSDK() {

        console.log('777', location.href.split('#')[0])
        let wx = this.$wechat;

        this.$http.post(this.$baseUrl + this.getSignatureRequest, {
          // url: window.location.host,
          url: location.href.split('#')[0],
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
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

          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx67c26ff8068af257', // 必填，公众号的唯一标识
            timestamp: response.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
            signature: response.data.signature,// 必填，签名
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
          });
          wx.error(error => {
            console.log(error)
            alert('wechat error')
          });
          wx.ready((e) => {
            console.log(e)
            // alert('dsds')
            wx.checkJsApi({
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function (res) {
                // alert('check')
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                // alert(JSON.stringify(res));
              }

            });
            let stateCode = `channel=${this.channel}$activityId=${this.activityId}`;

            wx.onMenuShareTimeline({
              title: '吃不到鸡没关系，最swag的福利送给你', // 分享标题
              link: this.$domainUrl + '?routeto=shareredirect&state=' + stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

              // link: wechatRedirectLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg', // 分享图标

              success: function () {

              }
            });

            wx.onMenuShareAppMessage({
              title: '吃不到鸡没关系，最swag的福利送给你', // 分享标题
              desc: '不做LYB，好友携手拿好礼。更有海淘精品等你免费来领取！', // 分享描述
              // link: this.$domainUrl + '?routeto=shareredirect&state=' + stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              link: this.$domainUrl + '?routeto=shareredirect&state=' + stateCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg', // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                // alert('ddd')
// 用户点击了分享后执行的回调函数
              }
            });
          })

        });

      },
    }
  }


</script>

<style scoped lang="scss"></style>
