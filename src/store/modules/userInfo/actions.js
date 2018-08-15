import * as types from './mutation-types'
import md5 from 'md5'
import {changeUserPwd} from '../../../api/userInfoApi'
import {success,error} from '../../../utils/actions'

const actions = {

  //改变userInfo
  changeUserInfo ({dispatch,commit,state},data) {
    commit(types.CHANGE_USER_INFO,data)
  },

  // 修改用户密码
  async changePwd({dispatch,commit},option={}){
    let data = await changeUserPwd({...option,userPassword:md5(option.userPassword),userNewPassword:md5(option.userNewPassword)})
    if(data.code == 200){
      success('密码修改成功')
      dispatch('changePwdDialogShow',false)
    }else{
      error(data.msg)
    }
  },

  // 修改密码的弹框显示隐藏
  changePwdDialogShow({dispatch,commit},value){
     commit(types.DIALOG_SHOW,value)
  },

  // 更改用户权限code perms
  changeUserPerms({dispatch,commit},data){
    commit(types.CHANG_USER_PERMS,data)
  }
}

export default actions