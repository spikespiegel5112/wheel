<template>
  <div>
    <div class="common_main_container">
      <div class="smart1111_main_container">
        <div class="advertise">
          <div class="explain">
            <label>(11月1日-11月16日期间）{{accessToken}}</label>
            <p>
              只需使用一次智能校园设备<br/>
              即可免费领取实物奖励！
            </p>
          </div>
          <div class="time">
            <label>11月2日、8日、9日、15日、16日</label>
          </div>
          <div class="location">
            <p>
              西安欧亚学院 餐饮大厦门口<br/>
              西安美术学院 中心湖北<br/>
              西安培华学院长安校区<br/>综合服务楼门口<br/>
              西北大学现代学院 6号公寓楼门口<br/>
              西北政法大学 8号楼丁字路口
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  // import Cookies from 'js-cookie'
  import FnvalleySdk from '../js/FnvalleySdk'
  // import FnvalleySdk from '../js/FnvalleySdk.min.js'


  // import FnvalleySdk from 'FnvalleySdk'
  // import wx from 'weixin-js-sdk'

  export default {
    name: "smart1111",
    data() {
      return {
        getUserInfoByTokenRequest: 'uaa/user',
        FnvalleySdkInstance: {},
        accessToken: ''
      }
    },
    computed: {

    },
    watch: {
      activityId(value) {}
    },
    beforeMount() {
      let fullPath = window.location.href;

      // if (window.location.href.indexOf('#/') === window.location.href.length - 2) {
      //   window.assign()
      // }
    },
    mounted() {
      console.log(this.FnvalleySdkInstance)
      this.$remResizing({
        fontSize: 20,
      });
      this.$autoHeight({
        target: '.smart1111_main_container'
      });

      // this.getAccessToken()
      // window.history.go(-2)
    },
    methods: {
      // jump() {
      //   console.log(this.FnvalleySdkInstance)
      //   this.FnvalleySdkInstance.openView({
      //     name: 'BTV'
      //   })
      // },
      getAccessToken() {
        this.$vux.loading.show({
          text: 'Loading'
        });
        this.fnvalleyJsSdkInstance = new FnvalleySdk();
        this.fnvalleyJsSdkInstance.userAccessToken().then(data => {
          this.accessToken = data;
          console.log(data)
          this.$vux.loading.hide();
          // alert(this.accessToken)

        }).catch(error=>{
          alert('error'+error)
        })

      }
    }
  }


</script>

<style scoped lang="scss"></style>
