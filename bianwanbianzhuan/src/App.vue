<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">

body {
  background-color: #fbf9fe;
}
</style>

<style lang="scss">
  @import 'sass/reset.scss';
  @import 'sass/common.scss';
  @import 'sass/download.scss';


  body {
    background-color: #fbf9fe;
  }
</style>
