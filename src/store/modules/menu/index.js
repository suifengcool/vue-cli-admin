import * as types from './mutation-types'
import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"
import icons from "./icons";


const state = {
  sidebar: {
    opened: false
  },
  menus: [],
  menusTressData: [],
  icons: icons
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
