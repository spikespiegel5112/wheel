<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
/*@import '~vux/src/styles/reset.less';*/

body {
  background-color: #fbf9fe;
}
</style>

<style lang="sass">
  @import 'sass/reset.scss';
  @import 'sass/common.scss';
  @import 'sass/wheel.scss';


  body {
    background-color: #fbf9fe;
  }
</style>
