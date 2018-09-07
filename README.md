# ccb_cli_2.x

> A Vue.js project

## 项目简介

基于 vue2.x 的SPA单页面应用， 使用技术栈包括： vue2.x 、 vuex 、 axios 、 elemnet-ui 、 webpack4 、sass 、 less 、 mockjs 等。

## 目录结构

    ├── README.md                       项目介绍
    ├── index.html                      入口页面
    ├── build                           构建脚本目录
    │   ├── build.js                        生产环境构建脚本
    │   ├── check-versions.js               npm、node 版本检查脚本
    │   ├── utils.js                        工具类
    │   ├── dev-server.js                   运行本地开发服务器
    │   ├── utils.js                        构建相关工具方法
    │   ├── vue-loader.conf.js              loader配置
    │   ├── webpack.base.conf.js            wabpack基础配置
    │   ├── webpack.dev.conf.js             wabpack开发环境配置
    │   ├── webpack.prod.conf.js            wabpack开发环境配置
    │   └── webpack.test.conf.js            wabpack测试环境配置
    ├── config                          环境配置
    │   ├── dev.env.js                      开发环境变量
    │   ├── index.js                        项目配置文件
    │   ├── prod.env.js                     生产环境变量
    │   ├── prod_dev.env.js                 测试 dev 环境变量
    │   ├── prod_sit.env.js                 测试 sit 环境变量
    │   ├── prod_uat.env.js                 测试 uat 环境变量
    │   └── test.env.js                     单元测试环境变量
    ├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
    ├── src                             源码目录    
    │   ├── main.js                         入口js文件
    │   ├── app.vue                         根组件
    │   ├── components                      公共组件目录
    │   │   └── title.vue
    │   ├── assets                          资源目录，这里的资源会被wabpack构建
    │   │   └── images
    │   │       └── logo.png
    │   ├── router                          前端路由
    │   │   ├── index.js
    │   │   └── routers.js
    │   ├── store                           状态管理
    │   │   ├── modules                      
    │   │   │     ├── userInfo                     
    │   │   │     │      ├─ actions.js                     
    │   │   │     │      ├─ getters.js                     
    │   │   │     │      ├─ index.js                   
    │   │   │     │      ├─ mutation-types.js                   
    │   │   │     │      └─ mutation.js                   
    │   │   │     └── ...                    
    │   │   └── index.js
    │   └── view                            页面目录
    │       ├── home
    │       │    ├─ index.vue
    │       │    ├─ component1.vue
    │       │    └─ component2.vue
    │       └── ...
    ├── static                          纯静态资源，不会被wabpack构建。
    └── test                            测试文件目录（unit&e2e）
        └── unit                            单元测试
            ├── index.js                        入口脚本
            ├── karma.conf.js                   karma配置文件
            └── specs                           单测case目录
                └── Hello.spec.js

## 环境安装

本项目依赖 node.js， 使用前先安装 node.js 和 cnpm（显著提升依赖包的下载速度）。
1. 自行下载并安装 node.js： [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2. 然后安装 cnpm 命令：

        npm install -g cnpm --registry=https://registry.npm.taobao.org


## 快速开始

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 接口 mock

前后端分离后，开发前需要和后端同学定义好接口信息（请求地址，参数，返回信息等），前端通过 mock 的方式，即可开始编码，无需等待后端接口 ready。
项目的本地开发服务器是基于 express 搭建的，通过 express 的中间件机制，我们已经在 dev-server 中添加了接口 mock 功能。
开发时，接口的 mock 数据统一放在 /src/mock 目录下，每个文件内如下：

    // 文件路径： /build/webpack.dev.conf.js
    devServer：{
    	before: require('../src/mock'),    // 引入mock/index.js
    }

    // 文件路径： /src/mock/api.js 
    module.exports = {
      'user/getUserInfo': './user/userInfo.json',
    }


    另外， 需要在 src/mock/user 下新建数据源文件 userInfo.json


## 组件化

整个应用通过 vue 组件的方式搭建起来，通过 vue-router 控制相应组件的展现。

其中按功能分将，组件分为 容器组件 和 UI组件，将每个 .vue 文件拆成一个文件夹， 其中index.vue 作为容器组件，其余如Table.vue和Search.vue等作为UI组件。

按可复用性分， 组件分为全局基础组件和页面级组件；将全局基础组件提取至 /src/components 内。


       src                          
        ├──components                     全局公共组件
        │   
        ├──view
        │   ├──home                       home 页面
        │      ├──index.vue               容器组件         
        │      ├──component1.vue          UI组件1
        │      ├──component2.vue          UI组件2
        └───page2.vue
               ├──index.vue               容器组件
               ├──component1.vue          UI组件1
               ├──component2.vue          UI组件2
            ……

## 联调方式

前后端分离后，由于服务端和前端的开发环境处于2台不同的机器上，前端的异步请求需要代理到后端机器中。
联调的时候，只需通过 config/index.js 设置dev环境下的proxyTable, 即可配置代理。 这样， 以'/rest'开头的接口请求都会走代理。changeOrigin:true,则本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题。

    # proxyTable: {
      '/rest': {
        target: "http://11.63.9.84:8101/",
        changeOrigin: true,                 
        pathRewrite: {
          '^/rest': ''
        }
      }
    }