import * as types from './mutation-types'
import { getUserNameApi,getUserListApi,getRoleMenuApi,updataRoleMenuApi } from '../../../api/authorityApi'
import { Message, MessageBox } from 'element-ui'

const actions = {

  //下拉框选中触发
  changeSelect({dispatch,commit,state},data) {
    getRoleMenuApi(data.value2).then(item=>{
      commit(types.CHANGE_USER_NAME,{item,...data})
    })
  },

  // 获取权限树
  getTree({dispatch,commit,state},data){
    getUserListApi().then(data=>{
      dispatch('isOpen',data.data)
      commit(types.CHANGE_USER_TREE,data)
    })
  },

  // 获取角色名称列表
  getUserList({dispatch,commit,state},data){
    getUserNameApi().then(data=>{
      commit(types.CHANGE_USER_NAME_LIST,data)
    })
  },

  //复选框选中值
  checkArr({dispatch,commit,state},data){
    // console.log(data,111)
    commit(types.CHANGE_USER_NAME_CHECK,data)
  },

  // 保存按钮
  preservation({dispatch,commit,state},data){
    let obj={
      "id":state.value2,
      "ids":new Set(state.checkBoxArr)
    }
    updataRoleMenuApi(obj).then(data=>{
      Message.success('保存成功')
    })
  },
  
  //权限树禁用启用状态
  isOpen ({dispatch,commit,state},arr) {
    arr.forEach(ele=>{
      if (ele.childrenMenu.length!==0) {
        dispatch('isOpen',ele.childrenMenu)
      }
        if (ele.status===1) {
          ele.disabled=false
        }else{
          ele.disabled=true
        } 
    })
  }
}

export default actions
 