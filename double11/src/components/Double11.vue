<template>
  <div>
    <div class="common_main_container">
      <div class="double11_main_container">
        <div class="title">
          <img src="../image/double11/title.png"/>
        </div>
        <div class="duration">活动时间：2018年11月1日-11月11日</div>
        <div class="main">
          <div class="block_wrapper">
            <div class="bigblock bg_da1416">
              <h1>
                <p>限时特惠</p>
                <span class="prize">¥68</span>
                <p>原价<span class="originprize">¥158</span></p>
              </h1>
              <p class="describe">每天看视频5分钟，一年内68元<label class="emphasis">全部返回</label></p>
            </div>
          </div>
          <div class="block_wrapper">
            <div class="mediumblock bg_ff3c3c">
              <h1>
                <span class="prize">
                  <label>限时</label>
                  ¥18
                </span>
                <br/>原价<span class="originprize">¥45</span>
              </h1>
              <p class="describe">每天看5分钟视频 季度累计返现13.5元</p>
            </div>
            <div class="mediumblock bg_ff783c">
              <h1>
                <span class="prize">
                  <label>限时</label>
                  ¥6
                </span>
                <br/>原价<span class="originprize">¥6</span>
              </h1>
              <p class="describe">每天看5分钟视频 当月累计返现3元</p>
            </div>
          </div>
          <div class="operator">
            <a @click="jump">
              马上安排
            </a>
          </div>
        </div>
        <div class="rules">
          <div class='common_blocktitle_item'>
            <div>
              <!--<span></span>-->
              <i></i>
            </div>
            <p>活动规则</p>
            <div>
              <i></i>
              <!--<span></span>-->
            </div>
          </div>
          <ol>
            <li>购买视频会员年卡68元，每天观看视频5分钟， 每天返20积分，全年返现6800积分</li>
            <li>购买视频会员季卡18元，每天观看视频5分钟， 每天返15积分，季度返现1350积分</li>
            <li>购买视频会员月卡6元，每天观看视频5分钟， 每天返10积分，月返现300积分</li>
            <li>活动时间：2018年11月1日-2018年11月11日</li>
            <li>视频会员权益NBA赛事直播，英超赛事直播， 卫视直播，影视大片，娱乐综艺统统免费看</li>
          </ol>
          <div class="hint">积分可用于智能校园服务充值</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Cookies from 'js-cookie'
  import FnvalleyJsSdk from '../js/fnvalleyJsSdk_v2'
  // import FnvalleyJsSdk from '../js/fnvalleyJsSdk.min.js'


  // import fnvalleyJsSdk from 'fnvalleyJsSdk'
  // import wx from 'weixin-js-sdk'

  export default {
    name: "Double11",
    data() {
      return {
        getUserInfoByTokenRequest: 'uaa/user',
        fnvalleyJsSdkInstance: {}
      }
    },
    computed: {
      // activityId() {
      //   return this.$route.query.activityId || '';
      // },


    },
    watch: {

      activityId(value) {
        sessionStorage.setItem('activityId', value)
      }
    },
    beforeCreate() {
      // this.channel = this.$route.query.channel || '';
      this.activityId = this.$route.query.activityId || '';
      // alert(this.activityId)
    },
    beforeMount() {
      let fullPath = window.location.href;


      // if (window.location.href.indexOf('#/') === window.location.href.length - 2) {
      //   window.assign()
      // }

    },
    mounted() {
      console.log(FnvalleyJsSdk)
      this.fnvalleyJsSdkInstance = new FnvalleyJsSdk();
      console.log(this.fnvalleyJsSdkInstance)
      this.$remResizing({
        fontSize: 20,
      });


    },
    methods: {
      jump() {
        console.log(this.fnvalleyJsSdkInstance)
        this.fnvalleyJsSdkInstance.check()

        this.fnvalleyJsSdkInstance.openView({
          name: 'BTV'
        })

      }
    }
  }


</script>

<style scoped lang="scss"></style>
