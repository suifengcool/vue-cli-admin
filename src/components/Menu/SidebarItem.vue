
<template>
  <div class="sidebar-item">
    <MenuItem 
      v-if="!item.children || !item.children.length" 
      :index="item.path" 
      @click="select"
    >
      <i :class="item.meta.icon || 'el-icon-menu'"></i>
      <span>{{item.meta.title}}</span>
    </MenuItem>

    <Submenu :index="index" v-if="item.children && item.children.length >0">
      <template slot="title">
        <i :class="item.meta.icon || 'el-icon-menu'"></i>
        <span>{{item.meta.title}}</span>
      </template>
      <SidebarItem 
        v-for="(i,idx) in item.children" 
        :key="index+'-'+idx" 
        :index="index+'-'+idx" 
        :item="i"
      />
    </Submenu>
  </div>
</template>

<script>
import { Submenu, MenuItem } from "element-ui";
export default {
  name: "SidebarItem",
  props: {
    index: String,
    item: Object,
    datafilter: {
      type: Function,
      default: ()=>{}
    }
  },
  components: { Submenu, MenuItem },
  
  methods: {
    select({ index }) {
      if (index.startsWith("http://") || index.startsWith("https://")) {
        location.href = index;
      } else {
        this.$router.push({ path: index });
      }
    }
  }
};
</script>

<style lang="less">
.el-menu{
  background-color: transparent;
  .sidebar-item {
    text-align: left;
    overflow: hidden;
    i {
      vertical-align: middle;
      margin-right: 5px;
      font-size: 18px;
      color: #fff;
    }
    .el-menu-item, .el-submenu__title {
      padding: 0;
      color: #fff;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      &:hover {
        background-color: #409EFF;
      }
      &.is-active {
        background-color: #409EFF;
      }
    }
    .el-submenu{
      .el-submenu__title:hover{
        background-color: #487fb7;
      }
    }
  }
}
</style>
