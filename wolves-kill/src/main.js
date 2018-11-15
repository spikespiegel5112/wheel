// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// import axios from 'axios'
// import moment from 'moment';
import {ConfirmPlugin, LoadingPlugin, Popup, Tab, TabItem, XInput, Group, Cell, CellBox, XAddress, Selector,Picker, PopupPicker, Toast } from 'vux'
// import Swiper from 'swiper';
import Cookies from 'js-cookie'

import App from './App'
import router from './router/router'
import service from './js/request'
import util from './js/util';
import store from './store/store'
// import CommonLoading from './components/common/CommonLoading.vue'

Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('x-address', XAddress)
Vue.component('popup-picker', PopupPicker)
Vue.component('picker', Picker)
Vue.component('toast', Toast)
Vue.component('selector', Selector)
Vue.component('cell', Cell)
Vue.component('cell-box', Cell)
Vue.use(ConfirmPlugin);
// Vue.use(WechatPlugin);
Vue.use(LoadingPlugin)
Vue.use(Popup)

Vue.use(Cookies)
Vue.use(VueRouter)
Vue.use(util);


// moment.locale("zh-cn");
FastClick.attach(document.body);

Vue.config.productionTip = false;
// Vue.prototype.$moment = moment;
Vue.prototype.$http = service;
// Vue.prototype.$baseUrl = 'http://gateway.fnvalley.com/';
Vue.prototype.$baseUrl = process.env.NODE_ENV === 'production' ? 'https://gateway.fnvalley.com/' : 'http://testgate.fnvalley.com/';
Vue.prototype.$domainUrl = process.env.NODE_ENV === 'production' ? 'http://activity.fnvalley.com/collegewheel/index.html' : 'http://activity.fnvalley.com/testcollegewheel/index.html';
Vue.prototype.$redirectBaseUrl = process.env.NODE_ENV === 'production' ? 'https://redirect.fnvalley.com/' : 'https://redirect.fnvalley.com/';

Vue.prototype.$prodEnv = process.env.NODE_ENV === 'production';

// Vue.component('CommonLoading', CommonLoading);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
