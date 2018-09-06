/**
 * state:       命名空间内的state
 * getters:     命名空间内的getters
 * rootState:   全局的state
 * rootGetters: 全局的getters
**/

const getters = {
  userInfo: (state, getters, rootState, rootGetters) => state.userInfo
}

export default getters