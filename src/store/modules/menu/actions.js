import * as types from './mutation-types'
import { getAllMenuDataApi } from "../../../api/menuApi"

const actions = {
  //改变userInfo
  changeMenus ({dispatch,commit,state},data) {
    commit(types.CHANGE_MENUS,data)
  },

  //改变TreeData
  async changdeTreeDataAction ({dispatch,commit,state},data) {
    let ruslt = await getAllMenuDataApi()  
    if (ruslt.code == 200) {
      commit(types.CHANGE_TREE_DATA,ruslt.data)
    }
  }
}


export default actions