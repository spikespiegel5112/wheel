<template>
  <div class="wheel_accpetprize_wrapper">
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
        <li>
          <div class="prizetitle">
            <img class="icon" src="../image/wheel/0WVZG5OI3QSWS1H3YS)RSNR.png"/>
            <div class="title">
              <label>腾讯视频会员卡(年卡)</label>
              <div class="prize">
                <span>￥126.00</span>
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
    <div class="empty">
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
        getThirdLinkProductRequest: 'promotion-service/1.0.0/third_link/getThirdLinkProduct',
        rotatingFlag: false,
        accessToken: '',
        emptyPrizeFlag: true,
        prizeData:[]
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
      this.getMyprizeData();

    },
    methods: {
      getMyprizeData() {
        this.$http.get(this.$baseUrl + this.getThirdLinkProductRequest + `/${this.$route.query.loginId}`, {
          headers: {
            'Authorization': 'Bearer ' + Cookies.get('wheel-accessToken')
          }
        }).then(response => {
          console.log(response)
          response = response.data;
          this.emptyPrizeFlag = response === null
          this.prizeData=response;
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
