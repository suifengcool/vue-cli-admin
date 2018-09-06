const Mock = require('mockjs');
const apis = require('./api');           // 所有mock数据源
const fs = require('fs');                // 引入文件系统模块
const path = require('path');            // 引入path模块

// 读取指定json文件, 并解析返回
const getJsonFile = (filePath) => {
  var json = fs.readFileSync(path.resolve(__dirname,filePath), 'utf-8');
  return JSON.parse(json);
}

module.exports = function (app) {
  for (var key in apis) {
    (function (app, key, apis) {
      app.use('/' + key, function (req, res) {
        var json = getJsonFile(apis[key]);
        try {
          res.json(Mock.mock(json));
        } catch(e) {
          res.status(500)
          res.json(e)
        }
      })
    })(app, key, apis)
  }
}
