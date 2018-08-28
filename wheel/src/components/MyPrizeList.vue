<template>
  <div class="wheel_accpetprize_wrapper">
    <CommonLoading :loading="loading"/>
    <div class="common_header_wrapper">
      <div class="left_wrapper">
        <div class="previous">
          <router-link :to="{path:'/'}">
            <x-icon type="ios-arrow-left" size="30"></x-icon>
          </router-link>
        </div>
      </div>
      <div class="middle_wrapper">
        我的奖品
      </div>
    </div>
    <div v-if="!emptyPrizeFlag" class="prizedescribe">
      <ul class="main">
        <!--<h1 class="title">奖品描述</h1>-->
        <li v-for="item in prizeData">
          <div class="prizetitle">
            <img class="icon" :src="item.rewardImage+'-style_100x100'"/>
            <div class="title">
              <label>{{item.rewardName}}</label>
              <div class="prize">
                <span>￥{{item.rewardValue}}</span>
                <a>免费领取</a>
              </div>
            </div>
          </div>
          <div class="productfeature">
            <h1>产品特点</h1>
            <!--<a class="receive">立即领取</a>-->
            <div class="productbanner">
              <img src="../image/wheel/prizepreview_00000.jpg"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="!loading" class="empty">
      <div class="main">
        <h1>暂无奖品</h1>
        <img src="../image/wheel/emptyPrize_00000.png"/>
        <p>领取奖品手机号：{{$route.query.loginId}}</p>
      </div>
    </div>

  </div>

</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: "Promotion",
    data: function () {
      return {
        queryRewardTraceByLoginIdRequest: 'promotion-service/1.0.0/rotary_table_activity/queryRewardTraceByLoginId',
        rotatingFlag: false,
        accessToken: '',
        emptyPrizeFlag: true,
        prizeData: [],
        loading: false
      }
    },
    computed: {
      userActivityId() {
        return this.$route.query.state;
      },
      identityCode() {
        return this.$route.query.state;

      },
      wechatAuthCode() {
        return this.$route.query.code
      },
      stateCode() {
        return this.$route.query.state
      },
      token() {
        return this.$route.params.token;
      }
      // canvasWidth() {
      //   return this.remUnit * 13.5 + 'px';
      // },
      // canvasHeight() {
      //   return this.remUnit * 13.5 + 'px';
      // },
    },
    watch: {
      token() {
        this.accessToken = this.token;

      }
    },
    beforeMount() {

    },
    mounted() {
      this.$remResizing({
        fontSize: 20,
      });
      console.log(this.$route.query.token)
      this.getMyPrizeData();
    },
    methods: {
      getMyPrizeData() {
        this.loading = true;
        this.$http.get(this.$baseUrl + this.queryRewardTraceByLoginIdRequest, {
          params: {
            loginId: this.$route.query.loginId,
          },
          headers: {
            'Authorization': 'Bearer ' + Cookies.get('wheel-accessToken')
          }
        }).then(response => {
          console.log(response)
          this.loading = false;
          response = response.data;
          this.emptyPrizeFlag = response === null
          this.prizeData = response;
        }).catch(error => {
          this.loading = false;
          this.$vux.confirm.show({
            showCancelButton: false,
            title: error.message,
            onConfirm() {
            }
          })
        })
      }
    }
  }


</script>

<style scoped lang="css">

</style>
