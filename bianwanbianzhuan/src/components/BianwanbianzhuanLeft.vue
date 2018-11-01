<template>
  <div class='main_container'>
    <ul class="segment">
      <li>
        <img class='image' src='../img/download/left_1_00000.jpg'/>
        <img class='image' src='../img/download/left_2_00000.jpg'/>
        <img class='image' src='../img/download/left_3_00000.jpg'/>
        <img class='image' src='../img/download/left_4_00000.jpg'/>
      </li>
    </ul>
  </div>


</template>

<script>
  import CommonLoading from './common/CommonLoading.vue'
  // import Swiper from 'swiper/dist/js/swiper.js';



  export default {
    name: "Promotion",
    components: {
      CommonLoading
    },
    data: function () {
      return {

      }
    },
    computed: {},
    watch: {},
    beforeMount() {


    },
    mounted() {
      console.log()

      // this.initRemResizing();

      // this.$autoHeight({
      //   target: '.main_container'
      // });

      this.$nextTick(()=>{
        setTimeout(()=>{
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


    }
  }
</script>

<style scoped lang="css">
  @import '../assets/js/swiper/css/swiper.min.css';

</style>
