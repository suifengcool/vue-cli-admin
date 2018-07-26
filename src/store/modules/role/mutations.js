import * as types from './mutation-types'
import {success} from '../../../utils/actions'
const  mutations = {

  // 改变搜索框的值 
  [types.CHANGE_INPUT_VALUE] (state,value){ 
    state.roleListOption.name = value
  },

  // 获取到角色列表
  [types.GET_ROLE_MANAGMENT_LIST] (state,option ={}){ 
    state.roleListOption = option
  },

  // 设置参数 
  [types.SET_OPTION] (state,{type,value}){ 
    if(type == 'page'){
      state.roleListOption.current = value  
    }else{
      state[type] = value 
      //console.log(state.checkList,value,"jojiojio") 
    }     
    
  },

  // 改变switch的值
  [types.SET_SWITCH] (state,{id,type,name}){ 
    state.roleListOption.records.forEach(item=>{
      if(item.id == id){
        item.status = !item.status 
        type==0?success( `"${name}"禁用成功`):success(`"${name}"启用成功`)    
      }
    })
  }

}
export default mutations
