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
@group-title-margin-top:0px;
</style>

<style lang="scss">
  @import 'sass/reset.scss';
  @import 'sass/common.scss';
  @import 'sass/wolveskill.scss';


  body {
    background-color: #fbf9fe;
  }
</style>
