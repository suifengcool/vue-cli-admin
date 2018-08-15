import * as types from './mutation-types'
import {getRoleListApi,addRoleApi,editRoleApi,setStatusDelApi} from '../../../api/roleApi'
import {success} from '../../../utils/actions'

const actions = {

  // 改变搜索框的值
  changeInputValue({dispatch,commit},value){
    commit(types.CHANGE_INPUT_VALUE,value)
  } ,

  // 设置参数
  setOption({dispatch,commit},option=[]){
    if(option.length>0){
      option.forEach(item=>{
        commit(types.SET_OPTION,{...item})
      })
    }
  },

  // 改变switch的值
  setSwitch({dispatch,commit},id){
    commit(types.SET_SWITCH,id)
  },

  // 获取到角色列表
  async getRoleManagementList ({dispatch,commit},option ={}){
    let data = await getRoleListApi(option) 
    if(data.data.records.length>0){
      // dispatch('setOption',[{type:'checkList',value:[]}]) 
      data.data.records.forEach(item=>{
        item.status = Boolean(item.status)
      }) 
    }
    commit(types.GET_ROLE_MANAGMENT_LIST, {...data.data,...option})  
  },


 // 编辑角色
  async addEdit({dispatch,commit},value={}){
     if(value.id===null){    
      let data = await addRoleApi(value.name)
      if(data && data.code == 200){
        success('新增成功')
        commit(types.SET_OPTION, {type:'DialogVisible',value:false})       
        dispatch('getRoleManagementList',{page:1,pageSize:5,name:null})  
       }
     } else{
       let data =await editRoleApi(value.id,value.name)
       if(data && data.code == 200){
        success('编辑成功')
        commit(types.SET_OPTION, {type:'DialogVisible',value:false})       
        dispatch('getRoleManagementList',{page:1,pageSize:5,name:null})  
       } 
     } 
  },

  // 删除修改状态
  async setStatusDel({dispatch,commit},{id,type,name}){
    // console.log(name)
     let data = await setStatusDelApi({id,type}) 
    //  console.log("setdata:",data) 
     if(data && data.code == 200){
        if(type == 0){
          dispatch('setSwitch',{id,type,name})   
        }else if(type == 1){
          dispatch('setSwitch',{id,type,name})
        }else {
          name?success(`"${name}"删除成功`):success(`"删除成功"`)      
          dispatch('getRoleManagementList',{page:1,pageSize:5,name:null})
        } 
     }else{
          error(data.msg)
     }

  }

}


export default actions
