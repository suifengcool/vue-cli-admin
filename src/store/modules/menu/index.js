import * as types from './mutation-types'
import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"
import Cookies from 'js-cookie'
import icons from "./icons";


const state = {
  sidebar: {
    opened: !+Cookies.get('sidebarStatus')
  },
  menus: [],
  menusTressData: [ //菜单树结构数据
    {
      name:'角色管理',icon:'icon-chanpin',url:'/role',tips:'角色管理',
      childrenMenu: [
        {name:'角色权限管理',icon:'icon-chanpin',url:'/authority',tips:'角色权限管理'},
        {name:'角色权限管理',icon:'icon-chanpin',url:'/authority',tips:'角色权限管理'},
      ]
    },
    {name:'角色权限管理',icon:'icon-chanpin',url:'/authority',tips:'角色权限管理'},
    {name:'菜单管理',icon:'icon-chanpin',url:'/menu',tips:'菜单管理'},
  ],
  icons: icons
}



export default {
  //将模块隔离，使用辅助函数时，第一个参数需表明模块名称...mapGetters('userInfo',[ 'userInfo' ])
  namespaced: true,
  state, //
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
