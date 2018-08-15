<template>
  <div id="Trees">
    <!-- 菜单头 -->
    <div class="tree_content treeeheader">
      <span style="width:50px"></span>
      <span style="width:180px">菜单名称</span>
      <span style="width:288px;text-align:center">URL地址</span>
      <span style="width:200px;text-align:center">菜单权重</span>
      <span style="width:180px;text-align:center">菜单说明</span>
      <span style="flex:1;text-align:center">操作</span>
    </div>
    <!-- 树结构 -->
    <Tree :data="data" :props="options" node-key="id"  :disabled="disabled">
        <div class="tree_data" slot-scope="{ node, data }">
          <div class="tree_name" style="width:150"><i :class="'el-icon iconfont'+' '+(data.icon || (data.ismenu ? 'el-icon-menu' : 'el-icon-date'))"/>{{data.name}}</div>
          <div class="tree_content">
            <span class="text-overflow" style="width:288px;text-align:center">{{data.url}}</span>
            <span style="width:200px;text-align:center">{{data.num}}</span>
            <span style="width:200px;text-align:center">{{data.tips}}</span>
            <span  class="btn">
              <Button :plain="true" type="danger" size="mini" :disabled="disabled" @click.stop="toggle(data, $event)">{{['启用', '禁用'][data.status]}}</Button>
              <Button :plain="true" size="mini" :disabled="disabled" @click.stop="edit(data, $event)">修改</Button>
              <Button :plain="true"  size="mini" :disabled="disabled" @click.stop="create(data, $event)">创建</Button>
              <!-- <Button :plain="true" type="danger" size="mini" :disabled="disabled" @click.stop="del(data, $event)">删除</Button> -->
            </span>
          </div> 
        </div>
    </Tree>
  </div>
</template>

<script>

import { Tree,Button } from "element-ui";

export default {
  components: {
    Tree,
    Button
  },
  name:　'Trees',
  props: {
    data: {                           //  树结构数据
      type: Array,
      default: []
    },
    toggle: {                         // 启用切换按钮
      type: Function,
      default: ()=>{}
    },
    edit: {                           // 编辑
      type: Function,
      default: ()=>{}
    },
    create: {                         // 创建
      type: Function,
      default: ()=>{}
    },
    del: {                            // 删除
      type: Function,
      default: ()=>{}
    },
    options: {                        // 树结构配置
      type: Object,
      default: {}
    },
    disabled: {                       // 禁止点击
      type: Boolean,
      default: false
    },
  }
}
</script>


<style lang="sass" >
  #Trees
    .el-tree-node__content
      height: 60px
    .tree_data
      width: 100%
      display: flex
      padding: 15px
    .tree_name
      display: flex
      justify-content: flex_start
      align-items: center
      width: 180px
      i
        padding-right: 10px
    .tree_content
      display: flex
      align-items: center
      flex: 1
      .btn 
        display: flex
        align-items: center
        justify-content: center
        flex: 1
        
    .treeeheader
      height: 70px
      padding: 10px 0px
      border-bottom: 1px  solid #ccc
      margin-bottom: 10px
      
      span
        font-size: 20px
        font-weigth: 700

</style>


