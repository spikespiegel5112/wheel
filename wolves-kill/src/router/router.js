import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let testPrefix = process.env.NODE_ENV === 'production' ? '' : 'test'
const routes = [{
  path: `/${testPrefix}wolves_kill/index.html`,
  alias: '/',
  name: 'homepage',
  component: () => import('../components/HomePage.vue')
// }, {
//   path: '/testsmart_11_11/index.html',
//   alias: '/',
//   name: 'wolveskill',
//   component: () => import('../components/HomePage.vue')
}, {
  path: `/${testPrefix}wolves_kill/index.html/participate`,
  alias: '/participate',
  name: 'participate',
  component: () => import('../components/Participate.vue')
// }, {
//   path: '/testsmart_11_11/index.html/advertise',
//   alias: '/advertise',
//   name: 'wolveskillAdvertise',
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
