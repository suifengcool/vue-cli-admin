import * as types from './mutation-types'

const mutations = {
  [types.GET_USER_INFO] (state,data) {
    state.userInfo = {...state.userInfo,...data}
  }
}
export default mutations
