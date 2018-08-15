import * as types from './mutation-types'

const  mutations = {
  // 下拉框数据
  [types.CHANGE_USER_NAME] (state,data) {
    state.value2=data.value2
    state.selectArr=[]
    state.checkBoxArr=[]
    data.item.data.forEach(ele => {
      state.selectArr.push(ele.mid)
      state.checkBoxArr.push(ele.mid)
    });
     state.data3.forEach(item=>{
      if (item.childrenMenu.length>0) {
        state.selectArr.splice(state.selectArr.indexOf(item.id),1)
        state.checkBoxArr.push(item.id)
      }
     })
    // 根据角色名称渲染tree树
    // console.log( state.data3,22)
    data.tree.setCheckedKeys(state.selectArr) 
    
  },

  //树结构列表数据
  [types.CHANGE_USER_TREE] (state,data) {
    state.data3=data.data
    state.data3.forEach(item=>{
      if (item.childrenMenu.length>0) {
        state.selectArr.splice(state.selectArr.indexOf(item.id),1)
      }
     })
  },

  //角色名称数据
  [types.CHANGE_USER_NAME_LIST] (state,data) {
    state.options=data.data
  },

  //修改选中的数组
  [types.CHANGE_USER_NAME_CHECK] (state,data){
    state.checkBoxArr=data.obj
    data.tree.getHalfCheckedNodes(true).forEach(val=>{
      state.checkBoxArr.push(val.id)
    })

     console.log(state.checkBoxArr,666)
  }

  
}
export default mutations