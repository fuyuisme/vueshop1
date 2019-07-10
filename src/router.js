import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  // 自定义选中类名
  linkActiveClass: 'my-active-class',
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue')
    }
  ]
})
