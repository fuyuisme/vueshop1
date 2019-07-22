import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
// 引入全局样式
import './assets/global.css'
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

// 设置基地址（接口）的基地址
Vue.axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1'
// 设置请求时的拦截器
// config 发送ajax的配置
Vue.axios.interceptors.request.use(function (config) {
  // 为配置添加协议头 包含令牌
  // 取出令牌
  let t = sessionStorage.getItem('token')
  // 判断是否有令牌如果有就添加一个Authorization：令牌的的协议头
  if (t) config.headers = { Authorization: t }
  return config
}, function (error) {
  // 请求返回的错误
  return Promise.reject(error)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
