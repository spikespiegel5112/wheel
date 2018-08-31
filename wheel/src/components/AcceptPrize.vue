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
        我要领奖
      </div>
    </div>
    <div class="banner">
      <img src="../image/wheel/accept_prize_banner_00000.png"/>
    </div>
    <div class="accpetprize">
      <h1>下载趣谷APP,领取奖品</h1>
      <ul>
        <CommonLoading :loading="loading"/>
        <li>
          <a :href="statisticDownloadLink.ios" target="_blank">
            <span class="ios"></span>
            <label>立即领取</label>
          </a>
        </li>
        <li>
          <a :href="statisticDownloadLink.android" target="_blank">
            <span class="android"></span>
            <label>立即领取</label>
          </a>
        </li>
      </ul>
      <div class="hint">
        已有超过{{1234+parseInt(1234*Math.random())}}人下载趣谷APP，领取了奖品
      </div>
    </div>
    <div class="prizedescribe">
      <h1 class="title">恭喜你，抽中{{prizeData.name}}</h1>
      <ul class="main">
        <li v-if="prizeData!=={}">
          <div class="prizetitle">
            <img class="icon" :src="prizeData.icon+'-style_100x100'"/>
            <div class="title">
              <label>{{prizeData.desc}}</label>
              <div class="prize">
                <span>￥{{prizeData.originalPrice}}</span>
                <a>免费领取</a>
              </div>
            </div>
          </div>
          <div class="productfeature">
            <div class="title">
              <h1>产品特点</h1>
              <!--<a class="wheel_product_button">立即领取</a>-->
            </div>
            <div class="productbanner">
              <img :src="prizeData.image+'-style_600x300'"/>
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>

</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: "AcceptPrize",
    data: function () {
      return {
        getRewardProductRequest: 'promotion-service/1.0.0/reward_product/getRewardProduct',
        loading: false,
        prizeData: {},
        statisticDownloadLink: {
          android: `http://redirect.zan-qian.com/redirect?target=http%3A%2F%2Fa.app.qq.com%2Fo%2Fsimple.jsp%3Fpkgname%3Dio.cityzone.android&loginId=&eventId=tongchengRewardAndroid&webId=${Cookies.get('Wheel-pageFingerPrint')}`,
          ios: `http://redirect.zan-qian.com/redirect?target=https%3a%2f%2fitunes.apple.com%2fcn%2fapp%2f%e8%b6%a3%e8%b0%b7-%e4%b8%80%e4%b8%aa%e6%87%82%e4%bd%a0%e7%9a%84app%2fid1397292579%3fmt%3d8&loginId=&eventId=tongchengRewardIos&webId=${Cookies.get('Wheel-pageFingerPrint')}`
        }
      }
    },
    computed: {
      loginId() {
        return Cookies('wheel-loginId')
      }
    },
    watch: {},
    mounted() {
      console.log(this.$store)
      this.initializing = false;
      this.$remResizing({
        fontSize: 20,
      });
      this.getRewardProduct();
    },
    methods: {
      getRewardProduct() {
        this.$http.get(this.$baseUrl + this.getRewardProductRequest + `/${this.$route.query.rewardStr}`, {}).then(response => {
          console.log(response)
          this.prizeData = response.data;
        })
      }
    }
  }


</script>

<style scoped lang="css">

</style>
