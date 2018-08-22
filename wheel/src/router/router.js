import Vue from 'vue'
import VueRouter from 'vue-router'
// import Share from '@/components/Share'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  // redirect: '/wheel',
  name: 'index',
  // component: Share,
  component: () => import('../components/Wheel.vue')

}, {
  path: '/wheel',
  name: 'wheel',
  component: () => import('../components/Wheel.vue')
}, {
  path: '/acceptPrize',
  name: 'acceptPrize',
  component: () => import('../components/AcceptPrize.vue')
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
