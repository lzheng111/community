import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 封装的axios
import http from './http'

Vue.config.productionTip = false

Vue.prototype.$http = http

Vue.use(Elementui)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
