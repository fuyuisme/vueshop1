import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/global.css'
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

// 设置基地址（接口）的基地址
Vue.axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
