// ① 通过设置 namespaced: true, 将当前module设置成为带命名空间的模块
// ② 模块化后，
//    通过this.$store.dispatch('demo/changeUserInfo')，触发userInfo下的acthions
//    通过this.$store.getters['demo/changeUserInfo']，获取userInfo下的getters

import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"

const state = {
  userInfo: {}
}

export default {
  namespaced: true,
  state,          
  getters,
  actions,
  mutations
}