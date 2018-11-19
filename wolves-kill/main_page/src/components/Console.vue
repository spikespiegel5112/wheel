<template>
  <div class="common_console_wrapper">
    <div class="handler">
      <a></a>
    </div>
    <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')">
      <div class="popup0">
        <group>
          <x-switch title="Another XSwitcher" v-model="show"></x-switch>
          <x-switch title="Show Toast" v-model="showToast"></x-switch>
        </group>
      </div>
    </popup>
  </div>
</template>

<script>
	export default {
		name: "console"
	}
</script>

<style scoped>

</style>
