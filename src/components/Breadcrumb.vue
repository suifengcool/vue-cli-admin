
<template>
  <Breadcrumb class="breadcrumb" separator="/">
    <BreadcrumbItem :to="{ path: '/' }"><i class="el-icon-share"/>首页</BreadcrumbItem>
    <BreadcrumbItem v-for="(item,i) in menu" :key="i" :to="{path:item.path}">
      <span @click="$router.push(item.path)">
        <i :class="item.meta.icon || 'el-icon-date'"/>{{item.meta.title}}
      </span>
    </BreadcrumbItem>
    <slot></slot>
  </Breadcrumb>
</template>
<script>

import { mapGetters } from "vueX";
import { Breadcrumb, BreadcrumbItem } from "element-ui";

export default {
  name: 'breadcrumb',
  components: {
    Breadcrumb,
    BreadcrumbItem
  },
  computed: {
    menu() {
      return this.findMenu(this.userInfo.menuData)
    },
    ...mapGetters('userInfo',['userInfo']),
  },
  methods: {
    findMenu(arr = []) {
      let res = []
      if (!arr || !arr.length) {
        return res
      }
      arr.forEach(({path, meta, children}) => {
        if (( this.$route.path).startsWith(path)) {
          res.push({path, meta, children})
        }
        if (children && children.length) {
          const subs = this.findMenu(children)
          if (subs && subs.length) {
            res = [{path, meta, children}, ...subs]
          }
        }
      })
      return res
    }
  }
}
</script>
<style lang="less">
.breadcrumb {
  padding-left: 35px;
  .el-breadcrumb__item {
    line-height: 74px;
    i {
      margin-right: 5px;
      font-size: 18px;
    }
  }
}
</style>
