<!-- 主页 -->
<template>
  <div class='auth'>
    
    <div class="content_data">
      <div class="header">
        <span>权限设置</span>
        <Button type="primary" @click="change" round>{{value}}</Button>
      </div>
    </div>

   <!-- 角色权限 -->
    <authorityForm :options="options" :data3="data3" />
   
  </div>
</template>

<script>
import authorityForm from "./authorityForm";
import { mapState, mapGetters, mapActions } from "vuex";
import {
  Button,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Form,
  FormItem,
  Tree,
  Select,
  Option
} from "element-ui";
export default {
  name: "auth",
  components: {
    Button,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Form,
    FormItem,
    Tree,
    Select,
    Option,
    authorityForm
  },
  data() {
    return {
      value: "保存"                   // 保存按钮文字
    };
  },
  created() {
    //设置页面标题
    vm.config.title("权限管理");       
  },

  methods: {
    ...mapActions("authority", ["preservation"]),

    //保存按钮
    change() {
      this.preservation();
    }
  },
  computed: {
    ...mapGetters("authority", ["options", "data3"])
  }
};
</script>
<style lang='less' scoped>
.auth {
  // box-shadow: -1px 0px 7px 0px rgba(0, 0, 0, 0.28);
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
    dl {
      dt {
        margin-top: 30px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
<style lang="less">
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
}
</style>

