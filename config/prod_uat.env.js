/** 测试环境配置 */
'use strict'
const {APIBASE} = require('../src/utils/apiBase')
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test_uat"',
  API_ROOT: '"//11.63.171.33:8080/Cu-TraBase/"',
  UPLOAD_URL: '"//11.63.171.33:8080/Cu-TraBase/' + APIBASE.TRABASE_V1 + 'fileService/"',
  IMG_URL: '"//11.63.171.33:8080/Cu-TraBase/' + APIBASE.TRABASE_V1 + 'fileService/file/"',
  DICT_URL: '"http://11.63.171.33:8080/Cu-User/cu/api/v1/common/"'
})
