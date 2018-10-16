// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import FastClick from 'fastclick'
// import axios from 'axios'

import App from './App'
import router from './router/router'
import service from './js/request'
import util from './js/util';
// import store from './store/store'

// FastClick.attach(document.body);

Vue.use(util);

Vue.config.productionTip = false;
// Vue.prototype.$baseUrl = 'http://gateway.zan-qian.com/';
Vue.prototype.$baseUrl = process.env.NODE_ENV === 'production' ? 'http://gateway.zan-qian.com/' : 'http://testgate.zan-qian.com/';
Vue.prototype.$http = service;
Vue.prototype.$prodEnv = process.env.NODE_ENV === 'production';
Vue.prototype.$redirectBaseUrl = process.env.NODE_ENV === 'production' ? 'https://redirect.fnvalley.com/' : 'https://redirect.fnvalley.com/';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: {App}
})
