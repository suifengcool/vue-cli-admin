import vue from "vue"
import vuex from "vuex"
import userInfo from "./modules/userInfo"

vue.use(vuex)

const store = new vuex.Store({
  strict: true,                   
  modules: {
    userInfo
  }
})

export default store