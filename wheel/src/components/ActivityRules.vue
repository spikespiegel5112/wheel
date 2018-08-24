<template>
  <div class="wheel_rules_wrapper">
    <div class="common_header_wrapper">
      <div class="left_wrapper">
        <div class="previous">
          <router-link :to="{path:'/'}">
            <x-icon type="ios-arrow-left" size="30"></x-icon>
          </router-link>
        </div>
      </div>
      <div class="middle_wrapper">
        活动规则
      </div>
    </div>
    <ol>
      <li v-for="item in 5">
        规则规则规则规则规则规则规则规则规则规则规则规则规则
      </li>
    </ol>
  </div>

</template>

<script>

  export default {
    name: "Promotion",
    data: function () {
      return {
        baseUrl: 'http://gateway.zan-qian.com/',
        sendBindWxMsgRequest: 'message-service/1.0.0/sms/sendBindWxMsg',
        rotatingFlag: false

      }
    },

    watch: {

    },
    beforeMount() {


    },
    mounted() {
      this.$remResizing({
        fontSize: 20,
      });
    },
    methods: {
      goBack(){
        this.$router.push({
          name:''
        })
      }
    }
  }


</script>

<style scoped lang="css">

</style>
