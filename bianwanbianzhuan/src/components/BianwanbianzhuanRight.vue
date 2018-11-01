<template>
  <div class='main_container swiper-container'>
    <ul class="segment">
      <li>
        <img class='image' src='../img/download/right_1_00000.jpg'/>
        <img class='image' src='../img/download/right_2_00000.jpg'/>
        <img class='image' src='../img/download/right_3_00000.jpg'/>
        <img class='image' src='../img/download/right_4_00000.jpg'/>
      </li>
    </ul>
  </div>


</template>

<script>
  import CommonLoading from './common/CommonLoading.vue'
  // import Swiper from 'swiper/dist/js/swiper.js';
  import wx from 'weixin-js-sdk'


  export default {
    name: "Promotion",
    components: {
      CommonLoading
    },
    data: function () {
      return {
        getSignatureRequest: 'account-service/1.0.0/weChat/getSignature',

        optionalEnvironmentParamsDictionary: ['source'],
        optionalEnvironmentParams: {},
        optionalEnvironmentParamsString: '',
        statisticDownloadLink: {
          android: `${this.$redirectBaseUrl}redirect/androiddownload?source=tongcheng&webId=${this.$generateUUID()}`,
          ios: `${this.$redirectBaseUrl}redirect/iosdownload?source=tongcheng&webId=${this.$generateUUID()}`
        },
        stateCode: Math.round(new Date() / 1000),
      }
    },
    watch: {},
    beforeMount() {


    },
    mounted() {
      console.log()

      // this.initRemResizing();

      // this.$autoHeight({
      //   target: '.main_container'
      // });
      this.getOptionalEnvironmentParams();

      this.$nextTick(() => {
        setTimeout(() => {
          // this.initSwiper();
        }, 500)
      });
    },
    methods: {
      initRemResizing() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        this.$remResizing({
          fontSize: 20,
          threshold: 640,
        });
      },
      initSwiper() {
        const swiperInstance = new Swiper('.swiper-container', {
          // loop: true
          direction: 'vertical',
          freeMode: true,
          // slidesPerView: 'auto',
          // lazy: true,
          // observer: true,

          // slidesPerView: 1,
        })
      },

      getOptionalEnvironmentParams() {
        let resultObj = {};
        let resultStr = '';
        this.optionalEnvironmentParamsDictionary.forEach(item1 => {
          Object.keys(this.$route.query).forEach((item2, index2) => {
            if (item1 === item2) {
              resultObj[item1] = this.$route.query[item2]
            }
          })
        });
        Object.keys(resultObj).forEach((item, index) => {
          resultStr += `&${item}=${resultObj[item]}`
        });
        this.optionalEnvironmentParamsString = resultStr;
      }
    }
  }
</script>

<style scoped lang="css">
  @import '../assets/js/swiper/css/swiper.min.css';

</style>
