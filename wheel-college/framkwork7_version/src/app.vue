<template>
  <!-- App -->
  <f7-app :params="f7Prams">
    <f7-views>
      <f7-view>
        <f7-pages>
        </f7-pages>
      </f7-view>
      <!--<router-view></router-view>-->
    </f7-views>
  </f7-app>
</template>

<script>
  // Import Routes
  import routes from './f7routes.js'

  export default {
    data() {
      return {
        f7Prams: {
          theme: 'auto',
          name: 'My App',
          id: 'com.demoapp.test',
          routes,
        }
      }
    }
  }
</script>
<style lang="scss">
  @import 'sass/reset.scss';
  @import 'sass/common.scss';
  @import 'sass/wheel';


  body {
    background-color: #fbf9fe;
  }
</style>
