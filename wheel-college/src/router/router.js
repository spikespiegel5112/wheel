import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
//   path: '/',
//   name: 'wheel',
//   component: () => import('../components/Wheel.vue')
// }, {
  path: '/collegewheel/index.html',
  alias: '/',
  name: 'wheel',
  component: () => import('../components/Wheel.vue')
}, {
  path: '/testcollegewheel/index.html',
  alias: '/',
  name: 'wheel',
  component: () => import('../components/Wheel.vue')
}, {
  path: '/collegewheel/acceptPrize',
  alias: '/acceptPrize',
  name: 'acceptPrize',
  component: () => import('../components/AcceptPrize.vue')
}, {
  path: '/testcollegewheel/acceptPrize',
  alias: '/acceptPrize',
  name: 'acceptPrize',
  component: () => import('../components/AcceptPrize.vue')
}, {
  path: '/collegewheel/myPrizeList',
  alias: '/myPrizeList',
  name: 'myPrizeList',
  component: () => import('../components/MyPrizeList.vue')
}, {
  path: '/testcollegewheel/myPrizeList',
  alias: '/myPrizeList',
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
  mode: 'history'
});


export default router;
