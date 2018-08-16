<template>
  <div>
    <CommonLoading :loading="loading"/>
  </div>
</template>

<script>
  import CommonLoading from "./common/CommonLoading";

  export default {
    name: "shareRedirect",
    components: {CommonLoading},
    component: {
      CommonLoading
    },
    data() {
      return {
        loading: true
      }
    },
    mounted() {
      location.assign('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri=http://activity.fnvalley.com&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect')
    }
  }
</script>

<style scoped>

</style>
