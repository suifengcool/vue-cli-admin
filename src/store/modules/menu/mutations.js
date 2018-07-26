import * as types from './mutation-types'

const  mutations = {
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