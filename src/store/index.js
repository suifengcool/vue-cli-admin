import vue from "vue"
import vueX from "vuex"

import userInfo from "./modules/userInfo";
import role from './modules/role'
import authority from './modules/authority'
import menu from './modules/menu'

vue.use(vueX)

const store = new vueX.Store({
  strict: true, //严格检测模式
  modules: {
    userInfo,
    role,
    authority,
    menu
  }
})

export default store
