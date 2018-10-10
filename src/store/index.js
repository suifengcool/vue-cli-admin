import vue from "vue"
import vuex from "vuex"
import userInfo from "./modules/userInfo"
import menu from "./modules/menu"

vue.use(vuex)

const store = new vuex.Store({
  strict: true,                   
  modules: {
    userInfo,
    menu
  }
})

export default store