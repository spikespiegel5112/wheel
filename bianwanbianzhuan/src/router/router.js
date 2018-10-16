import Vue from 'vue'
import VueRouter from 'vue-router'
// import Share from '@/components/Share'

Vue.use(VueRouter)

const routes = [{
  path: '/testbianwanbianzhuan/index.html',
  alias: '/',
  redirect: '/left',
  name: 'index',
  component: () => import('../components/BianwanbianzhuanIndex.vue'),
  children: [{
    path: '/left',
    name: 'left',
    // component: Share,
    component: () => import('../components/BianwanbianzhuanLeft.vue')

  }, {
    path: '/right',
    name: 'right',
    // component: Share,
    component: () => import('../components/BianwanbianzhuanRight.vue')

  }]
}];


const router = new VueRouter({
  routes,
  // mode: 'history'
});


export default router;
