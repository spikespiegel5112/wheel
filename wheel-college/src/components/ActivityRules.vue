<template>
  <div class="wheel_rules_wrapper">
    <div class="wheel_rulesbg_item"></div>

    <div v-if="$checkEnvironment()==='wechat'" class="common_header_wrapper">
      <div class="left_wrapper">
        <div class="previous">
          <a @click="goBack">
            <x-icon type="ios-arrow-left" size="30" class="icon-white"></x-icon>
          </a>
        </div>
      </div>
      <div class="middle_wrapper">
        活动规则
      </div>
    </div>
    <div class="rules">
      <ol>
        <li v-for="item in rulesArticle">{{item.content}}</li>
      </ol>
    </div>

  </div>

</template>

<script>

  export default {
    name: "Promotion",
    data: function () {
      return {
        baseUrl: 'http://gateway.fnvalley.com/',
        sendBindWxMsgRequest: 'message-service/1.0.0/sms/sendBindWxMsg',
        rotatingFlag: false,
        rulesArticle: [{
          content: '本次活动由趣谷APP提供。',
        }, {
          content: '用户参与抽奖即可免费获得转盘 奖品。',
        }, {
          content: '凡参与本次活动，则视为同意活 动规则及免费声明条款。',
        }, {
          content: '对于恶意刷奖，趣谷APP有权取 消获奖者获奖资格，并保留相关 法律权利。',
        }, {
          content: '本活动的最终解释权归上海骏盈 信息技术有限公司。',
        }]
      }
    },

    watch: {},
    mounted() {
      this.$nextTick(() => {
        // this.$autoHeight({
        //   target: '.wheel_realpage_container'
        // });
        this.$autoHeight({
          target: '.wheel_rules_wrapper'
        });
        this.$remResizing({
          fontSize: 20,
        });
      });
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      }
    }
  }


</script>

<style scoped lang="css">

</style>
