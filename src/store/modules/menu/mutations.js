import * as types from './mutation-types'
import Cookies from 'js-cookie'
const  mutations = {
  TOGGLE_SIDEBAR: state => {
    // console.log(state,'99999');
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
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
}
export default mutations