// Import Vue
import Vue from 'vue';
import util from './js/util';
import service from './js/request'
import store from './store/store'
import router from './router/router'
import CommonLoading from './components/common/CommonLoading.vue'


// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import App Component
import App from './app';
Vue.use(util);
Vue.prototype.$http = service;
Vue.prototype.$baseUrl = process.env.NODE_ENV === 'production' ? 'https://gateway.fnvalley.com/' : 'http://testgate.zan-qian.com/';
Vue.prototype.$domainUrl = process.env.NODE_ENV === 'production' ? 'https://rotary.fnvalley.com' : 'http://testrotary.fnvalley.com';
Vue.prototype.$redirectBaseUrl = process.env.NODE_ENV === 'production' ? 'https://redirect.fnvalley.com/' : 'https://redirect.fnvalley.com/';
// Init F7 Vue Plugin
Framework7.use(Framework7Vue)
Vue.component('CommonLoading', CommonLoading);

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  store,
  // Register App Component
  components: {
    app: App
  }
});
