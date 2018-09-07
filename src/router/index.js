import Vue from 'vue'
import Router from 'vue-router'
import routes from "./routers";

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: routes,
})

router.afterEach(({ meta, params, query}) => {
  document.title = !meta || !meta.title ? '建行大学' : meta.title
})

export default router