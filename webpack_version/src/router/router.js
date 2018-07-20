import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Share from '@/components/Share'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/share',
  name: 'index',
  component: Share,
  // component: () => import('../components/Share.vue')

}, {
  path: '/share',
  name: 'share',
  component: Share,
}];


const router = new VueRouter({
  routes,
  mode: 'history'
});


export default router;
