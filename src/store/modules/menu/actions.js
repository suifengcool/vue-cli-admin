import * as types from './mutation-types'
import { getTreeMenuDataApi } from "../../../api/menuApi"

const actions = {
  //改变userInfo
  changeMenus ({dispatch,commit,state},data) {
    commit(types.CHANGE_MENUS,data)
  },
  
  // 切换侧边隐藏
  toggleSideBar({dispatch,commit,state}) {
    commit('TOGGLE_SIDEBAR')
  },

  // TreeData
  async getTreeMenuData ({dispatch,commit,state},data) {
    let ruslt = await getTreeMenuDataApi()  
    if (ruslt.code == 200) {
      commit(types.GET_TREE_MENU_DATA,ruslt.data)
    }
  }
}


export default actions