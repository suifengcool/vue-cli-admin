<template>
  <div class="roleManagementList">
    <!-- 头部 -->
    <div class="content_data">
       <div class="header">
         <span>角色管理</span>
         <div class="addbtn">           
          <Button type="primary" round @click='addRole' id="btn" icon="el-icon-plus">新增角色</Button>
          <Button type="danger" round @click='del(checkList.join(","))' id="del_btn" :disabled='disable'>删除</Button> 
         </div>
        </div>
    </div> 
    <!-- 内容 -->  
    <div class="content_data content">
      <div class="headerCheck">
        <!-- 搜索 -->
        <Search 
          placeholder="请输入角色名称"
          width = '220'
          :search="search"
          :reset="reset"
          :blur="blur"
          :inputValue="roleListOption.name"
        >
        </Search>
      </div>
      <!-- table表 -->
        <Tab
          :roleListOption='roleListOption'
          :setStatus = 'setStatus'
          :del = 'del' 
          :edit = 'edit'
        ></Tab>  
    
      <!-- 分页-->
      <MyPagination :page="roleListOption.current" :pageSize="roleListOption.size" :pageSizes="[5]" :total="roleListOption.total" :method='getList' />
    </div>
    <!-- 弹框 -->
    <Diaogis
      :title='title' 
      :DialogVisible ='DialogVisible'
      :submit='submit'
      :cancel='cancel'
      :id='id'
      :formOption = 'isFormOption'
      :closeDialog = 'closeDialog'
    ></Diaogis>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MyPagination from "../../components/MyPagination.vue";
import Search from "../../components/Search.vue";
import Diaogis from "./Dialog.vue";
import Tab from "./Tab.vue";
import {confirm,error} from '../../utils/actions.js'

import {
  Table,
  TableColumn,
  RadioGroup,
  RadioButton,
  Button,
  Input,
  CheckboxGroup,
  Checkbox,
  Select,
  Option,
  Switch,
  Form,
  FormItem,
  InputNumber
} from "element-ui";
export default {
  data() {
    return {
      title: "新增",                                  // 弹框的标题
      formOption: {                                  // 表单角色名字    
        name: null
      }
    };
  },
  components: {
    MyPagination,
    Table,
    TableColumn,
    RadioGroup,
    RadioButton,
    Button,
    Input,
    Search,
    CheckboxGroup,
    Checkbox,
    Select,
    Option,
    Switch1: Switch,
    Form,
    FormItem,
    InputNumber,
    Diaogis,
    Tab
  },
  computed: {
    ...mapGetters("role", [
      "roleListOption",                              // 列表数据
      "isFormOption",                                // 表单数据
      "id",                                          // 编辑时候的ID
      'disable',                                     // 全选的删除按钮是否可以点击     
      'checkList',                                   // 被选中的ID集合
      'DialogVisible'                                // 弹框是否显示
      ])
  },
  created() {
    this.changeInputValue("");
    this.setOption([{type:'disable',value:true}])
    this.setOption([{type:'page',value:1}])
  },
  methods: {
    ...mapActions("role", [
      "getRoleManagementList",                       // 获取列表
      "changeInputValue",                            // 改变搜索框的数据
      "addEdit",                                     // 编辑
      "setOption",                                   // 设置参数
      'setSwitch',                                   // 改变switch
      'setStatusDel'                                 //修改状态删除
    ]),

    // 增加角色
    addRole() {  
      this.setOption([{type:'DialogVisible',value:true},{type:'isFormOption',value:{name:null}},{type:'id',value:null,}])
    },

    // 关闭弹框
    closeDialog(){  
      this.setOption([{type:'DialogVisible',value:false}])  
    },

    // 取消按钮
    cancel() {  
      this.setOption([{type:'DialogVisible',value:false}])
    },

    // 更改switch状态
    setStatus(status,id,name) { 
      if(status){ 
        this.setStatusDel({id,type:0,name})  //禁用
      }else{
        this.setStatusDel({id,type:1,name}) //启用
      } 
    },

    // 提交表单
    submit(id,name) { 
      this.setOption([{type:'DialogVisible',value:false}])
     // console.log(id,name,"aaa")
      this.addEdit({id,name})
    },

    // 编辑
    edit(id, name) { 
      this.setOption([{type:'DialogVisible',value:true}])
      this.title = "编辑";
      this.setOption([{type: "id", value: id },{type:'isFormOption',value:{name}}])
    },

    // 删除  
    del(id,name) {     
      confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log('checkList:',this.checkList)
          this.setStatusDel({id,type:2,name})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });  
    },

    // 失去焦点的时候给input赋值
    blur(e) { 
      this.changeInputValue(e.target.value);
    },

    // 获取列表
    getList({ ...page }) { 
      this.getRoleManagementList({
        ...page,
         pageSize: 5,
        name: this.roleListOption.name,
      });
    },

     // 搜索
    search() {
      if(this.roleListOption.name == null || this.roleListOption.name == ""){        
        error('请输入角色名称 !')  
      }else{
        this.getRoleManagementList({
          page: 1,
          pageSize: 5,
          name: this.roleListOption.name,
        }); 
      }

    },

    // 重置
    reset() { 
      this.changeInputValue(null);
      this.getRoleManagementList({
        page: 1,
        pageSize: 5,
        name: this.roleListOption.inputValue,
      });
    }
  },
};
</script>

<style lang='less' scoped>
.roleManagementList {
  .header{
    position: relative;
  }
  .addbtn{
    position: absolute;
    bottom:30px;
    right: 0px;
  }
  #btn,#del_btn {
    position: absolute;
    right: 150px;
  }
  #del_btn {
    right: 60px;
  }
  .pre_search {
    padding: 20px 0;
    position: relative;
  }
}
</style>
<style lang="less">

.roleDialog {
  .el-dialog__header {
    background: #2e3338;
    padding: 15px;
    text-align: center;
    .el-dialog__title {
      color: #fff;
      font-size: 18px;
    }
  }
}
.roleManagementList {
  .content{
    padding-top:0;
  }
  table {
    thead{
      tr{
        th{
          .cell{
            text-align:center;
          }
        }
      }  
    }
    tbody {
      tr {
        height: 50px;
        td{
          .cell{
            text-align:center;
          }
        }
        td:nth-child(1){
          .cell{
            width:26%;
            display:inline-block;
            text-align:left;
            position: relative;
            left:50%;
            transform: translateX(-44%);
            .checkbox{
              text-align:left;
            }
            .el-checkbox__label{
              padding-left:0;
            }
            .el-checkbox__input{
              width: 30px;
            }
          }
        }
      }
    }
  }
  .el-pagination{
    padding: 20px 0;
    text-align:center;
    background-color: #fff;
  }
  .pre_search {
    position: relative;
    .check {
      position: absolute;
      top: 10px;
      padding: 0 10px;
      left:0;
      margin-left:58px;
    }
  }
  .el-table__header-wrapper {
    .has-gutter {
      tr {
        background-color: #eff1f4;
        height: 60px;
        th {
          background-color: #eff1f4;
          text-align: center;
        }
      }
      .el-checkbox {
        display: none;
      }
    }
  }
}
</style>





