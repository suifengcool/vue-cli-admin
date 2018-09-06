import Vue from 'vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import App from './App.vue'
import store from './store'

import './assets/css/reset.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

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