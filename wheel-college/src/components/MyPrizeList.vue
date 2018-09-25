<template>
  <div class="wheel_acceptprize_wrapper">
    <CommonLoading :loading="loading"/>
    <!--<div class="common_header_wrapper">-->
      <!--<div class="left_wrapper">-->
        <!--<div class="previous">-->
          <!--<router-link :to="{path:'/'}">-->
            <!--<x-icon type="ios-arrow-left" size="30"></x-icon>-->
          <!--</router-link>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="middle_wrapper">-->
        <!--我的奖品-->
      <!--</div>-->
    <!--</div>-->
    <div v-if="!emptyPrizeFlag" class="prizedescribe">
      <ul class="main" v-if="prizeData.length>0">
        <!--<h1 class="title">奖品描述</h1>-->
        <li v-for="item in prizeData">
          <div class="prizetitle">
            <img class="icon" :src="$replaceProtocol(item.product.icon)+'-style_100x100'"/>
            <div class="title">
              <label>{{item.rewardName}}</label>
              <div class="prize">
                <span>￥{{item.product.originalPrice}}</span>
              </div>
            </div>
          </div>
          <div class="productfeature">
            <div class="title">
              <h1>产品特点</h1>
              <router-link class="wheel_product_button" :to="{name:'acceptPrize',query:{rewardStr:item.rewardStr}}">
                立即领取
              </router-link>
            </div>


            <div class="productbanner">
              <img class="icon" :src="$replaceProtocol(item.product.image)+'-style_600x300'"/>
              <!--<img src="../image/wheel/prizepreview_00000.jpg"/>-->
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="!loading&&emptyPrizeFlag" class="empty">
      <div class="main">
        <h1>暂无奖品</h1>
        <img src="../image/wheel/emptyprize_00000.png"/>
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
        let that = this;
        this.loading = true;
        this.$http.get(this.$baseUrl + this.queryRewardTraceByLoginIdRequest, {
          params: {
            loginId: this.$route.query.loginId,
            productDetail: 'all'
          },
          headers: {
            'Authorization': 'Bearer ' + Cookies.get('wheel-accessToken')
          }
        }).then(response => {
          console.log(response)
          this.loading = false;
          response = response.data;
          this.emptyPrizeFlag = response.length === 0;
          this.prizeData = response;
        }).catch(error => {
          this.loading = false;
          console.log(error)
          if (error.status === 401) {
            this.$vux.confirm.show({
              showCancelButton: false,
              title: '当前手机号失效，请重新登录',
              onConfirm() {
                that.$router.push({
                  name: 'wheel'
                });
                Cookies.remove('wheel-accessToken');
                Cookies.remove('wheel-loginId');
              }
            })
          }

        })
      }
    }
  }


</script>

<style scoped lang="css">

</style>
