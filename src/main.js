import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import Config from "./utils/config"

import 'element-ui/lib/theme-chalk/index.css'
import { Message, MessageBox } from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false

// 创建和挂载根实例
window.vm = new Vue({
  router,
  store,
  render: v => v(App),
  data: {
  	config: Config,         // 全局注入配置
  }
}).$mount('#app')
