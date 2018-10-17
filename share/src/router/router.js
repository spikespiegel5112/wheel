import Vue from 'vue'
import VueRouter from 'vue-router'
// import Share from '@/components/Share'

Vue.use(VueRouter)

const routes = [{
  path: '/share/index.html',
  alias: '/',
  name: 'index',
  component: () => import('../components/Share.vue')
}, {
  path: '/testshare/index.html',
  alias: '/',
  name: 'index',
  component: () => import('../components/Share.vue')
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
