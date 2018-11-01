<template>
  <div class="wheel_acceptprize_wrapper">
    <div v-if="$checkEnvironment()==='wechat'" class="common_header_wrapper">
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
    <div class="acceptprize">
      <h1>下载趣谷APP,领取奖品</h1>

      <div class="acceptprizewithoutbutton">
        <div class="logo">
          <img src="../image/wheel/qugulogo.png" />
        </div>
        <div class="desc">
          <p class="main">
            前往应用市场搜索“<span>趣谷</span>”下载领取
          </p>
          <label>应用市场包含苹果AppStore、应用宝、手机自带应用市场等</label>
        </div>
      </div>
      <!--<ul>-->
        <!--<CommonLoading :loading="loading"/>-->
        <!--<li>-->
          <!--<a :href="statisticDownloadLink.ios" target="_blank">-->
            <!--<span class="ios"></span>-->
            <!--<label>立即领取</label>-->
          <!--</a>-->
        <!--</li>-->
        <!--<li>-->
          <!--<a :href="statisticDownloadLink.android" target="_blank">-->
            <!--<span class="android"></span>-->
            <!--<label>立即领取</label>-->
          <!--</a>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<div class="hint">-->
        <!--已有超过{{1234+parseInt(1234*Math.random())}}人下载趣谷APP，领取了奖品-->
      <!--</div>-->
    </div>

    <div class="prizedescribe">
      <h1 class="title">恭喜你，抽中{{prizeData.name}}</h1>
      <ul class="main">
        <li v-if="Object.keys(prizeData).length>0">
          <div class="prizetitle">
            <img class="icon" :src="$replaceProtocol(prizeData.icon)+'-style_100x100'"/>
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
              <img :src="$replaceProtocol(prizeData.image)+'-style_600x300'"/>
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
          android: `${this.$redirectBaseUrl}redirect/androiddownload?source=tongcheng&webId=${Cookies.get('Wheel-pageFingerPrint')}`,
          ios: `${this.$redirectBaseUrl}redirect/iosdownload?source=tongcheng&webId=${Cookies.get('Wheel-pageFingerPrint')}`
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
      },

    }
  }


</script>

<style scoped lang="css">

</style>
