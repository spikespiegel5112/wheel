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
          <a :href="$store.state.appDownloadLocation.android" target="_blank">
            <span class="android"></span>
            <label>立即领取</label>
          </a>
        </li>
        <li>
          <a :href="$store.state.appDownloadLocation.ios" target="_blank">
            <span class="ios"></span>
            <label>立即领取</label>
          </a>
        </li>
      </ul>
      <div class="hint">
        用领取奖品手机号<span>{{loginId}}</span>登录即可领取
      </div>
    </div>
    <div class="prizedescribe">
      <h1 class="title">奖品描述</h1>
      <ul class="main">
        <li v-if="prizeData!=={}">
          <div class="prizetitle">
            <img class="icon" :src="prizeData.icon+'-style_100x100'"/>
            <div class="title">
              <label>恭喜你，抽中{{prizeData.name}}</label>
              <div class="prize">
                <span>￥{{prizeData.originalPrice}}</span>
                <!--<a>免费领取</a>-->
              </div>
            </div>
          </div>
          <div class="productfeature">
            <div class="title">
              <h1>产品特点</h1>
              <a class="wheel_product_button">立即领取</a>
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
    name: "Promotion",
    data: function () {
      return {
        getRewardProductRequest: 'promotion-service/1.0.0/reward_product/getRewardProduct',
        loading: false,
        prizeData: {}
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
