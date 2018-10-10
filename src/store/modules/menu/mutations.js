import * as types from './mutation-types'

const  mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {

    } else {

    }
    state.sidebar.opened = !state.sidebar.opened
  },

  [types.CHANGE_MENUS] (state,data) {
    // 
  },
  // 改变树结构数据
  [types.CHANGE_TREE_DATA] (state,data) {
    // 
    state.menusTressData = JSON.parse(JSON.stringify(data))
  },

  // 改变树结构数据
  [types.GET_TREE_MENU_DATA] (state,data) {
    // 
    state.menusTressData = JSON.parse(JSON.stringify(data))
  },
}
export default mutations