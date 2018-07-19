import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


const routes = [{
  path: '/',
  component: () => import('../components/promotion.vue').then(m => m.default),

}];

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  // mode:'history'
});


export default router;
