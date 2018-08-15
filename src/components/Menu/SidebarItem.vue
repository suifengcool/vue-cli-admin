<template>
  <Menu  class="el-menu-vertical-demo" :collapse="isCollapse" :unique-opened=true background-color='#232D33' text-color="#fff" active-text-color="#409eff" hide-timeout="0" show-timeout="0">
  <!-- 有嵌套的 -->
  <Submenu index="1" :index="item.url || (item.code||index)" v-if="item.childrenMenu && item.childrenMenu.length >0" @click="select">
    <template slot="title">
      <i class="icon-font iconfont" :class="item.icon||'el-icon-date'" aria-hidden="true"></i>
      <span slot="title">{{item.name}}</span>
    </template>
    <MenuItemGroup>
      <MenuItem index="1-1" v-for="(item,index) in item.childrenMenu" :key="index">
        <i class="icon-font iconfont" :class="item.icon||'el-icon-date'" aria-hidden="true"></i>
        <span slot="title">{{item.name}}</span>
      </MenuItem>
    </MenuItemGroup>
    
  </Submenu>
  <!-- 没有嵌套的 -->
    <MenuItem :index="item.url || (item.code||index)" v-if="!item.childrenMenu || item.childrenMenu.length == 0" @click="select">
      <i class="icon-font iconfont" :class="item.icon||'el-icon-date'" aria-hidden="true"></i>
      <span slot="title">{{item.name}}</span>
    </MenuItem>
  
 
</Menu>

</template>

<script>
const delta = 15;
import { Menu, Submenu, MenuItem, MenuItemGroup } from "element-ui";
import { generateTitle } from "@/utils/i18n";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SidebarItem",
  props: {
    index: String,
    item: Object,
    datafilter: {
      type: Function,
      default: () => {}
    },
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  components: { Menu, Submenu, MenuItem, MenuItemGroup},
  data() {
    return {
      top: 0
    };
  },
  computed: {
    ...mapGetters("menu", [
      "sidebar" // 侧边栏
    ]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  mounted() {
    // console.log("this.item:", this.item);
    // console.log(this.datafilter);
  },
  methods: {
    generateTitle,
    select({ index }) {
      if (index.startsWith("http://") || index.startsWith("https://")) {
        location.href = index;
      } else {
        this.$router.push({ path: index });
      }
    },
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3;
      const $container = this.$refs.scrollContainer;
      const $containerHeight = $container.offsetHeight;
      const $wrapper = this.$refs.scrollWrapper;
      const $wrapperHeight = $wrapper.offsetHeight;
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta);
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top;
          } else {
            this.top = Math.max(
              this.top + eventDelta,
              $containerHeight - $wrapperHeight - delta
            );
          }
        } else {
          this.top = 0;
        }
      }
    },
  }
};
</script>

<style lang="less">
// .Menu {
//   .sidebar-item {
//     text-align: left;
//     overflow: hidden;
//     .icon-font {
//       vertical-align: middle;
//       margin-right: 10px;
//       position: relative;
//       font-size: 20px;
//     }
//     .MenuItem,
//     .Submenu__title {
//       padding: 0;
//       background-color: #303246;
//       color: #8ea0b1;
//       height: 60px;
//       line-height: 60px;
//       font-size: 16px;
//       &:hover {
//         i {
//           color: #fff;
//         }
//         color: #fff;
//         background-color: #51c5ff;
//       }
//       &.is-active {
//         background-color: #035e8c;
//       }
//     }
//     .Submenu.is-active > .Submenu__title {
//       i {
//         color: #ffffff;
//         background-color: #51c5ff;
//       }
//       background-color: #51c5ff;
//       color: #ffffff;
//     }
//   }
// }
// .scroll-container {
//   position: relative;
//   width: 100%;
//   height: 100%;
//   background-color: #304156;
//   .scroll-wrapper {
//     position: absolute;
//     width: 100% !important;
//   }
// }

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 249px;
    // min-height: 400px; 
    // border-right: 1px solid #232D33;
    border: none;
    box-sizing: border-box;
  }
 
</style>
