import Vue from 'vue'
import VueRouter from 'vue-router'
import Ticket from '../components/Ticket.vue'

Vue.use(VueRouter)

let testPrefix = process.env.NODE_ENV === 'production' ? '' : 'test'
const routes = [{
  path: `/${testPrefix}wolves_kill/index.html`,
  alias: '/',
  name: 'homepage',
  component: () => import('../components/HomePage.vue')
  // name: 'rules',
  // component: () => import('../components/Rules.vue')
}, {
  path: '/',
  name: 'homepage',
  component: () => import('../components/HomePage.vue')
}, {
//   path: `/${testPrefix}wolves_kill/index.html/participate`,
//   alias: '/participate',
//   name: 'participate',
//   component: () => import('../components/Participate.vue')
// }, {
  path: '/participate',
  name: 'participate',
  component: () => import('../components/Participate.vue')
}, {
  //   path: `/${testPrefix}wolves_kill/index.html/ranklist`,
//   alias: '/ranklist',
//   name: 'ranklist',
//   component: () => import('../components/RankList.vue')
// }, {
  path: '/ranklist',
  name: 'rankList',
  component: () => import('../components/RankList.vue')
}, {
  path: `/${testPrefix}wolves_kill/index.html/canvass`,
  alias: '/canvass',
  name: 'canvass',
  component: () => import('../components/Canvass.vue')
}, {
  path: '/canvass',
  name: 'canvass',
  component: () => import('../components/Canvass.vue')
}, {
  //   path: `/${testPrefix}wolves_kill/index.html/canvass`,
//   alias: '/canvass',
//   name: 'c',
//   component: () => import('../components/Canvass.vue')
// }, {
  path: '/registrationresult',
  name: 'registrationResult',
  component: () => import('../components/RegistrationResult.vue')
}, {
  path: '/participatesuccessful',
  name: 'participateSuccessful',
  component: () => import('../components/ParticipateSuccessful.vue')
}, {
  path: `/${testPrefix}wolves_kill/index.html/ticket`,
  alias: '/ticket',
  name: 'ticket',
  component: Ticket
}, {
  path: '/ticket',
  name: 'ticket',
  component: Ticket
}, {
  path: '/rules',
  name: 'rules',
  component: () => import('../components/Rules.vue')
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
