# 学训宝-智学(机构)管理系统

> 学训宝-智学(机构)管理系统
## 分支管理细则

``` bash
# 迭代式开发或者修复bug，需在master分支上拉取个人开发分支
git checkout -b xg_0724 origin/master
git push origin xg_0724

# 自测无误后，将个人开发分支合并至dev，并通知项目负责人打包
上测试环境，此时该开发分支不要进行任何操作，如需修复其余bug，
必须按照步骤1重新拉取新的开发分支；

# 测试确认没问题后，将之前的开发分支合并至release分支

# 项目上线时，由主管将release分支合并至线上master分支
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
