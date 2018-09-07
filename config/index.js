'use strict'

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 设置本地调试服务代理
    // changeOrigin:true, 则本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题
    proxyTable: {
      '/rest': {
        target: "http://11.63.9.84:8101/",
        changeOrigin: true,  
        pathRewrite: {
          '^/rest': ''
        }
      }
    },
    host: 'localhost',
    port: 8080, 
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, 
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}