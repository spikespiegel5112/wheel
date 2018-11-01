import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let testPrefix=process.env.NODE_ENV === 'production'?'':'test'
const routes = [{
  path: `/${testPrefix}smart_11_11/index.html`,
  alias: '/',
  name: 'smart1111',
  component: () => import('../components/Smart1111.vue')
// }, {
//   path: '/testsmart_11_11/index.html',
//   alias: '/',
//   name: 'smart1111',
//   component: () => import('../components/Smart1111.vue')
}, {
  path: `/${testPrefix}smart_11_11/index.html/advertise`,
  alias: '/advertise',
  name: 'smart1111Advertise',
  component: () => import('../components/Smart1111Advertise.vue')
// }, {
//   path: '/testsmart_11_11/index.html/advertise',
//   alias: '/advertise',
//   name: 'smart1111Advertise',
//   component: () => import('../components/Smart1111Advertise.vue')
}, {
  path: '/*',
  name: '404',
  component: () => import('../components/404.vue')
}];


const router = new VueRouter({
  routes,
  mode: 'history'
});


export default router;
