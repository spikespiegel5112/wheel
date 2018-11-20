import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let testPrefix = process.env.NODE_ENV === 'production' ? '' : 'test'
const routes = [{
  path: `/${testPrefix}wolves_kill/canvass/index.html`,
  alias: '/',
  name: 'canvass',
  component: () => import('../components/Canvass.vue')
}, {
  path: '/',
  name: 'canvass',
  component: () => import('../components/Canvass.vue')
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
