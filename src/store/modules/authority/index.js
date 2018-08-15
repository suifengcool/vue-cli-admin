import * as types from './mutation-types'
import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"
import { Checkbox } from 'element-ui';

const state = {
  options :[],                              // 下拉框
  data3: [],                                //  tree树,
  value2: 1,                                // 下拉框选中植
  selectArr:[],                             // 选中项id
  checkBoxArr:[]                            // 复选框选中值             
}




export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}