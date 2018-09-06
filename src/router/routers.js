/* 
 * 异步组件
 * const Home = () => import('./pages/Home.vue')
 *
 * 定义路由(相对 ../view)
 * const routes = [{
 *   path: '/', component: () => import("../view/404.vue")
 * }]
 */


// 相关路由配置
let pre_config = [
  '/home/index',                                    // 首页
]

let config = [
  // 培训计划管理
  '/train_plan_manage/search/index',                      // 查询
  '/train_plan_manage/setting/index',                     // 维护
  '/train_plan_manage/confirm/index',                     // 审核
]

// 定义路由
const relativePath = '';
const routes = [
  ...parseRoutes(pre_config),
  {
    path: '/',
    component: resolve => require(
      ['../components/Layout.vue'],
      resolve
    ),
    children: parseRoutes(config)
  },
  {
    path: '*',
    component: () => import('../view/404.vue')
  }
]

// 工厂函数：解析路由配置，返回routes数组
function parseRoutes(config) {
  return [
    ...config.map((value, index) => {
      let array = value.split(',')
      const fileName = array[0].replace(/\/(\:|\?)[A-z]+$/g, '')
      return {
        path: relativePath + array[0].replace(/(\/index|home\/index)$/g, ''),
        component: () => import(`../view${fileName}.vue`)
      }
    })
  ]
}

export default routes