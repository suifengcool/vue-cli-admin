/** 测试环境配置    */
'use strict'
const {APIBASE} = require('../src/utils/apiBase')
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test_dev"', 
  API_ROOT: '"//dev.cu.edu.devops.box/"',
  UPLOAD_URL: '"//dev.cu.edu.devops.box/' + APIBASE.TRABASE_V1 + 'fileService/"',
  IMG_URL: '"//dev.cu.edu.devops.box/' + APIBASE.TRABASE_V1 + 'fileService/file/"',
  DICT_URL: '"//dev.cu.edu.devops.box/cu/api/v1/common/"'
})