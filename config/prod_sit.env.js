/** 测试环境配置 */
'use strict'
const {APIBASE} = require('../src/utils/apiBase')
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test_sit"',
  API_ROOT: '"//sit1.cu.edu.devops.box/"',
  UPLOAD_URL: '"//sit1.cu.edu.devops.box/' + APIBASE.TRABASE_V1 + 'fileService/"',
  IMG_URL: '"//sit1.cu.edu.devops.box/' + APIBASE.TRABASE_V1 + 'fileService/file/"',
  DICT_URL: '"//sit1.cu.edu.devops.box/cu/api/v1/common/"'
})
