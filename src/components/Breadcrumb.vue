
<template>
  <Breadcrumb class="breadcrumb" separator="/">
    <BreadcrumbItem :to="{ path: '/' }"><i class="el-icon-my-homefill"/>首页</BreadcrumbItem>
    <BreadcrumbItem v-for="(m,i) in menu" :key="m.id" :to="{path:m.url || $route.fullPath}"><span @click="clickFn(m.url || $route.fullPath,i)"><i :class="m.icon || 'el-icon-date'"/>{{m.name}}</span></BreadcrumbItem>
    <slot></slot>
  </Breadcrumb>
</template>
<script>


  import { mapGetters } from "vueX";
  import { Breadcrumb,BreadcrumbItem } from "element-ui";


  export default {
    name: 'breadcrumb',
    components: {
      Breadcrumb,
      BreadcrumbItem
    },
    data() {
      return {
      }
    },
    computed: {
      menu() {
        return this.findMenu(this.menusTressData)
      },
      ...mapGetters('menu',[
        'menusTressData',
      ]),
    },
    methods: {
      findMenu(menusTressData = []) {
        let res = []
        if (!menusTressData || menusTressData.length < 1) {
          return res
        }
        menusTressData.forEach(({url, name, id, code, icon, children}) => {
          if (( this.$route.path).startsWith(url)) {
            res.push({url, name, id, code, icon})
          }
          if (children && children.length > 0) {
            const subs = this.findMenu(children)
            if (subs && subs.length > 0) {
              res = [{url, name, id, code, icon}, ...subs]
            }
          }
        })
        return res
      },
      clickFn(url, i) {
        if (url === this.$route.fullPath && this.menu.length !== i + 1) {
          this.$router.go(0)
        }
      },
    },
    created() {
      // if (coocki.get(ACCESS_TOKEN).startsWith('XUEXUNBAO_')) {
      //   this.menusTressData = TEACHER_MENU
      // } else {
      //   menuApi().then((data) => {
      //     this.menusTressData = data
      //   })
      // }
    },
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
