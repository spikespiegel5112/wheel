import Vue from 'vue'
import VueRouter from 'vue-router'
// import Share from '@/components/Share'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  // redirect: '/share',
  name: 'index',
  // component: Share,
  component: () => import('../components/Share.vue')

}, {
  path: '/share',
  name: 'share',
  component: () => import('../components/Share.vue')
},{
  path: '/*',
  name: '404',
  component: () => import('../components/404.vue')
}];


const router = new VueRouter({
  routes,
  mode: 'history'
});


export default router;
