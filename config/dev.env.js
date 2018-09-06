// 本地开发环境配置
'use strict'
const {APIBASE} = require('../src/utils/apiBase')
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"/rest"',
  UPLOAD_URL: '"//11.63.9.84:8101' + APIBASE.TRABASE_V1 + 'fileService/"',
  IMG_URL: '"//11.63.9.84:8101' + APIBASE.TRABASE_V1 + 'fileService/file/"',
  DICT_URL: '"http://11.63.9.84:8102/cu/api/v1/common/"'
})
