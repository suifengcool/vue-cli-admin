import * as types from './mutation-types'
import { getMenuTreeApi } from '../../../api/userInfoApi'
/**
 * rootState  全局state
 * dispatch, commit, state 都是命名空间内的局部属性
 * dispatch 和 commit 方法可以接受 `root` 属性以访问根 dispatch 或 commit
 * dispatch('changeUserInfo')                          // -> 'demo/changeUserInfo' 局部
 * dispatch('changeUserInfo', null, { root: true })    // -> 'changeUserInfo'      全局
 * 
 * 如果要在模块内(局部)注册全局的action, 可添加 root: true，并将这个 action 的定义放在函数 handler
**/

const actions = {
  // 局部action
  getUserInfo ({ dispatch,commit,state,rootState}) {
		getMenuTreeApi().then(data =>{
			commit(types.GET_USER_INFO,data['C-Response-Body'])
		})
  },

  // 全局action
  globalAction: {
    root: true,
    handler (namespacedContext, payload) { }   // -> 'someAction'
  }
}

export default actions