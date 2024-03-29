import Vue from 'vue'
import VueRouter from 'vue-router'
// import Share from '@/components/Share'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'wheel',
  component: () => import('../components/Wheel.vue')
}, {
  path: '/acceptPrize',
  name: 'acceptPrize',
  component: () => import('../components/AcceptPrize.vue')
}, {
  path: '/myPrizeList',
  name: 'myPrizeList',
  component: () => import('../components/MyPrizeList.vue')
}, {
  path: '/activityRules',
  name: 'activityRules',
  component: () => import('../components/ActivityRules.vue')
}, {
  path: '/*',
  name: '404',
  component: () => import('../components/404.vue')
}];


const router = new VueRouter({
  routes,
  // mode: 'history'
});


export default router;
