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
      <li v-for="item in rulesArticle">{{item.content}}</li>
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
        rotatingFlag: false,
        rulesArticle: [{
          content: '本次活动由同程旅游网和趣谷APP联合举办，所有奖品由趣谷APP提供。',
        }, {
          content: '本次活动对象仅限同程旅游网的用户，参与抽奖即可免费获得转盘奖品',
        }, {
          content: '凡参与本次活动，则视为同意活动规则及免费声明条款。',
        }, {
          content: '对于恶意刷奖，趣谷APP有权取消获奖者获奖资格，并保留相关法律权利。',
        }, {
          content: '本活动的最终解释权归上海骏盈信息技术有限公司。',
        }]
      }
    },

    watch: {},
    mounted() {
      this.$remResizing({
        fontSize: 20,
      });
    },
    methods: {
      goBack() {
        this.$router.push({
          name: ''
        })
      }
    }
  }


</script>

<style scoped lang="css">

</style>
