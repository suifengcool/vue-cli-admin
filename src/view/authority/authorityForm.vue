<!-- 权限树 -->
<template>
  <div class='authorityForm auth_admin content_data'>
    <Form :label-position="labelPosition"  label-width="100px" ref="Formrule">
        <FormItem label="角色名称:">
          <Select v-model="value2" @change ="SelectValue">
            <Option  v-for="(item,index) in options" :key="index" :label="item.name" :value="item.id">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="角色权限:">
          <Tree :data="data3" show-checkbox node-key="id" ref="tree" style="margin-right:26px;" :indent="30" @check=xuan :props="defaultProps" :default-expand-all="value" >      
          </Tree>
        </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form,FormItem,Tree,Select,Option} from 'element-ui'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'authorityForm',
  components:{ FormItem,Form,Tree,Select,Option },
  props:{
    options: {                       // 下拉框数据
      type: Array,
      default: [],
    },
    data3:{                          // 角色权限项数据
      type: Array,
      default: [],
    }
  },
  created () {
    this.getUserList()               // 初始化下拉框数据
    this.getTree()                   // 初始化树结构数据
  },
  mounted(){
    this.SelectValue()               // 初始加载页面下拉事件
    
  },
  data () {
    return {
      value2:1,                      // 默认选中的索引值
      value:true,                    // 默认全部展开子菜单
      labelPosition:'left',          // 表单对齐位置
      defaultProps:{                 // 改变节点的读取名称
        label: 'name',               // 菜单字段名
        children:'childrenMenu'      // 子菜单字段名
      },
    }
  },


  methods: {
    ...mapActions('authority',['getTree','changeSelect','getUserList','selectArr','checkArr']),
    
    //下拉框选中触发事件
    SelectValue(){
       this.changeSelect({value2:this.value2,tree:this.$refs.tree})
    },

    //复选框选中事件
    xuan(e,obj){
      this.checkArr({obj:obj.checkedKeys,tree:this.$refs.tree}) 
    }
  }
 

}
</script>
<style lang='less' scoped>
.auth {
  background-color: #ffffff;
  box-shadow: -1px 0px 7px 0px rgba(0, 0, 0, 0.28);
  padding: 29px 0 29px 0px;
  color: #333333;
  .header {
    border-left: 4px solid #5286e9;
    padding-left: 25px;
    font-size: 26px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .auth_admin {
    padding-left: 26px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: 20px;
    dl {
      dt {
        margin-top: 30px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
<style lang='less'>
 .auth {
  .el-button {
    margin-right: 25px;
  }
  // 树结构样式
  .el-tree {
    border: none;
    background-color: #f6f6f6;
    & > .el-tree-node {
      margin-bottom: 15px;
      background-color: #ffffff;
    }
    .el-tree-node__children {
      width: 100%;
    }
    .el-tree-node__content {
      border-bottom: 1px solid #d1dae5;
      height: auto;
      &:hover {
        background: #f6f7fb;
      }

      .tree_data {
        overflow: hidden;
        width: 100%;
        line-height: 38px;
        height: 38px;
        .tree_name {
          float: left;
          & > i {
            margin-right: 5px;
          }
        }
        .tree_content {
          overflow: hidden;
          span {
            display: inline-block;
            text-align: left;
            overflow: hidden;
          }
        }
      }
    }
    .el-tree-node:last-child .el-tree-node__content {
      border-bottom: none;
    }
  }
  .el-select{
    position: absolute;
    left: 0;
  }
}
</style>
