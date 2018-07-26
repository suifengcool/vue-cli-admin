import * as types from './mutation-types'


const  mutations = {
  [types.CHANGE_USER_INFO] (state,data) {
    // console.log(state.userInfo,data)
    // state.userInfo.type=data
    data ?  state.userInfo = {...state.userInfo,...data,logo:data.img}: {}

    let UserInfo = JSON.parse((window.localStorage.getItem('UserInfo')))
    window.localStorage.setItem('UserInfo', JSON.stringify({...UserInfo,users: {
      ...UserInfo.users,
      ...data
    }}))

  },
  [types.DIALOG_SHOW](state,value){
    state.changePwdDialog = value    
  },
  [types.CHANG_USER_PERMS](state,data){
    state.perms = [...data]    
  },

}
export default mutations
