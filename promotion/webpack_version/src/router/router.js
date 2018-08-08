import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  // redirect: '/promotion',
  name: 'index',
  // component: Promotion,
  component: () => import('../components/Promotion.vue')

}, {
  path: '/promotion',
  name: 'promotion',
  component: () => import('../components/Promotion.vue')
}];


const router = new VueRouter({
  routes,
  mode: 'history'
});


export default router;
