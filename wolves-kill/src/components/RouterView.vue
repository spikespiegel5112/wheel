<template>
  <!--<div>-->
    <!--<div v-if="redirectingFlag" class="common_initializing_item"></div>-->
    <!--<router-view></router-view>-->
    <!--<router-view/>-->
  <!--</div>-->
  <router-view/>


</template>

<script>
  import FnvalleySdk from '../js/FnvalleySdk'

  export default {
    name: "RouterView",
    data() {
      return {
        fnvalleySdkInstance: {},
        redirectingFlag: true
      }
    },
    beforeMount() {
      // console.log(this.$route)
      // this.$vux.loading.show({
      //   text: 'Loading'
      // });
      // if (this.$route.query.routeto === 'advertise') {
      //   this.$vux.loading.hide();
      //   this.$router.push({
      //     name: 'wolveskillAdvertise'
      //   });
      // } else {
      //   this.redirectingFlag = false;
      // }

    },
    mounted() {
      console.log('router-view')
      this.fnvalleySdkInstance = new FnvalleySdk();
      // this.getAccessToken();
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

          Cookies.set('wheel-loginId', data);
        }).catch(error => {
          // alert(error)
          console.log('this.getAccessToken error', error)
          this.unauthorizedFlag = true;
          this.confirmState = 'unauthorized';
          this.$vux.loading.hide();
        });

      },
    }
  }
</script>

<style scoped>

</style>
