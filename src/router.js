import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const r = new Router({
  // 自定义选中类名
  linkActiveClass: 'my-active-class',
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '/home',
      component: () => import('./views/Home.vue'),
      // 右侧页面
      children: [
        {
          path: '/welcome',
          component: () => import('./views/Welcome.vue')
        },
        {
          path: '/users',
          component: () => import('./views/User.vue')
        },
        {
          path: '/roles',
          component: () => import('./views/Roles.vue')
        },
        {
          path: '/rights',
          component: () => import('./views/Rights.vue')
        },
        {
          path: '/categories',
          component: () => import('./views/Categories.vue')
        },
        {
          path: '/goods',
          component: () => import('./views/Goods.vue')
        },
        {
          path: '/params',
          component: () => import('./views/Params.vue')
        },
        {
          path: '/orders',
          component: () => import('./views/Orders.vue')
        },
        {
          path: '/reports',
          component: () => import('./views/Reports.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue')
    }
  ]
})
// 为路由添加导航守卫 判断必须登录才能进后台
// to将要去的路由对象
// from 去之后的路由对象
// next 函数，必须要调用这个函数
// next() 允许通过
// next(路径) 重定向
// next(error) 触发错误
// next(false) 阻止跳转
r.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 取出令牌
  let token = sessionStorage.getItem('token')
  if (token) return next()
  else return next('login')
})
export default r
