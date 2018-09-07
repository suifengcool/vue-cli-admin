import 'babel-polyfill'

import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import {Message} from 'element-ui'

import './assets/css/reset.css'

Vue.config.productionTip = false

// 将 Message 直接挂在 Vue 实例上
Vue.prototype.$message = Message

// 创建和挂载根实例 通过 router 配置参数注入路由
window.ccb = new Vue({
  router,
  store,
  render: v => v(App),
  data: {
    // mapGetters,  // 全局引入 vuex mapGetters 函数
    // mapActions   // 全局引入 vuex mapActions 函数
  }
}).$mount('#app')