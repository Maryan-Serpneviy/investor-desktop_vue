import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Desktop',
    component: () => import(/* webpackChunkName: "desktop" */ '@/pages/Desktop.vue')
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import(/* webpackChunkName: "transactions" */ '@/pages/Transactions.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
