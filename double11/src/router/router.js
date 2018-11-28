import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
//   path: '/',
//   name: 'wheel',
//   component: () => import('../components/Double11.vue')
// }, {
//   path: '/double11/index.html',
  path: '/double12/index.html',
  alias: '/',
  name: 'double11',
  component: () => import('../components/Double11.vue')
}, {
  // path: '/testdouble11/index.html',
  path: '/testdouble12/index.html',
  alias: '/',
  name: 'double11',
  component: () => import('../components/Double11.vue')
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
