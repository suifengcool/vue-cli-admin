import * as types from './mutation-types'
import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"

const state = {
  userInfo: {
    logo: '../../assets/logo.png',
    userName: '梅西',
    type:1,
    id:null,
  },
  changePwdDialog:false,
  perms: null,
  roles: null
}



export default {
  //将模块隔离，使用辅助函数时，第一个参数需表明模块名称...mapGetters('userInfo',[ 'userInfo' ])
  namespaced: true,
  state,              //
  //someGetter (state, getters, rootState, rootGetters){}:隔离后的模块getters通过第三个参数访问全局数据
  getters,
  //someAction ({ dispatch, commit, getters, rootGetters,rootState }){}:隔离后的模块通过第四,5个参数访问全局数据
  //通过{root: true} 发放全局提交commit commit('someMutation', null, { root: true })
  //通过以下方式注册全局acthions ：全局触发dispatch('someAction')
  // someAction: {
  //   root: true,
  //   handler ({ dispatch, commit, getters, rootGetters }) { ... } // -> 'someAction'
  // }
  //模块化后通过dispatch('userInfo/changeUserInfo')；触发acthions
  actions,
  mutations
}



