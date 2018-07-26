<template>
  <div>
    <!-- table表 -->
    <CheckboxGroup  @change="handleSelectionChange" v-model="checkedList">
      <Table ref="" :data="roleListOption.records" tooltip-effect="dark" style="width: 100%">
        <TableColumn prop='id' label="ID" width='300'>
            <template slot-scope="scope">
              <Checkbox :label="scope.row.id">{{scope.row.id}}</Checkbox>
            </template>
          </TableColumn>
          <TableColumn prop="name" label="权限"/>
          <TableColumn label="状态" prop='status'>
            <template slot-scope="scope">
              <Switch1
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="true"
                :inactive-value="false"
                active-text="启用"
                inactive-text="禁用"
                :value='scope.row.status'
                @change='setStatus(scope.row.status,scope.row.id,scope.row.name)'
                >
              </Switch1>
            </template>
          </TableColumn>
          <TableColumn prop="createTime" label="创建时间" :formatter="dateTimeFilter"/>
          <TableColumn label="操作">
            <template slot-scope="scope">
              <Button type="edit" size="small" @click='edit(scope.row.id,scope.row.name)'>编辑</Button><Button type="edit" size="small" @click='del(scope.row.id,scope.row.name)'>删除</Button>
            </template>
          </TableColumn>
        </Table>
      </CheckboxGroup>
    <!-- 分页 -->
    <div class="pre_search">
        <!-- 全选 -->
      <div class="check" v-if='roleListOption.records && roleListOption.records.length>0'>
        <Checkbox
          v-model="checked"
          class="check"
          @change="changeCheckBox"
        >全选</Checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import MyPagination from '../../components/MyPagination.vue'
import { mapActions, mapGetters } from "vuex";
import {detailTimeFilter,dateTimeFilter} from '../../utils/fiflter.js'
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
  InputNumber,
} from "element-ui";
export default {
   data(){
     return{
      checkedList: [],     // 被选中项
      checked: false,      // 是否全选
     }
   },
   props:{
     roleListOption:{     //列表数据
       type:Object
     },
     setStatus:{          //启用禁用函数
       type:Function
     },
     del:{                //删除函数
       type:Function
     },
     edit:{               //编辑函数
       type:Function
     },

   },
   components: {
    MyPagination,
    Table,
    TableColumn,
    RadioGroup,
    RadioButton,
    Button,
    CheckboxGroup,
    Checkbox ,
    Select ,
    Option ,
    Switch1:Switch,
    Form,
    FormItem,
    InputNumber,
  },
  watch:{
    roleListOption:function(val,oldVal){   //切换分页的时候清空之前的选项
      this.checked = false
      this.checkedList = []
      this.setOption([{ type: "disable", value:true},{ type: "checkList", value:[]}])
    }
  },
  created(){

  },
  methods:{
    dateTimeFilter,
    detailTimeFilter,
    ...mapActions('role',[
      'setOption'
    ]),

    // 切换全选按钮
    changeCheckBox(val){
      let arr = []
      this.roleListOption.records.forEach(item=>{
        arr.push(item.id)
      })
      this.checkedList = val ? arr : []
      this.setOption([{ type: "disable", value:val?false:true},{ type: "checkList", value:val?arr:[]}])
    },

    // 监听checkbox-group选中项变化
    handleSelectionChange(value){
      let checkedCount = value.length;
      this.checked = checkedCount === this.roleListOption.records.length;
      this.setOption([{ type: "disable", value: value.length>0?false:true},{ type: "checkList", value}])
    },
  }
}
</script>

<style>

</style>
