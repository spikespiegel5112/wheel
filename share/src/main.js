// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import FastClick from 'fastclick'
// import axios from 'axios'
import moment from 'moment';
import {ConfirmPlugin, WechatPlugin, LoadingPlugin} from 'vux'
import Swiper from 'swiper';

import App from './App'
import router from './router/router'
import service from './js/request'
import util from './js/util';
// import store from './store/store'


// Vue.use(WechatPlugin);
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin);
Vue.use(util);

// moment.locale("zh-cn");
// FastClick.attach(document.body);

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$http = service;
// Vue.prototype.$baseUrl = 'http://gateway.zan-qian.com/';
Vue.prototype.$baseUrl = process.env.NODE_ENV === 'production' ? 'https://gateway.fnvalley.com/' : 'http://testgate.fnvalley.com/';
Vue.prototype.$domainUrl = process.env.NODE_ENV === 'production' ? 'http://activity.fnvalley.com/share/index.html' : 'http://activity.fnvalley.com/testshare/index.html';
Vue.prototype.$prodEnv = process.env.NODE_ENV === 'production';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: {App}
})
