<template>
  <div  id="menuManagement">
    <!-- <Breadcrumb/> -->
    <!-- 头部导航 -->
    <div class="content_data">
      <div class="header">
        <span>菜单管理</span>
        <Button round icon="el-icon-plus" type="primary" @click="create({addTop:0})">添加</Button>
      </div>
    </div>

    <!-- 菜单树结构 -->
    <div class="treesList content_data">
      <Trees :data="menusTressData" :disabled="disabled" :options="options" :toggle="toggle" :del="del" :edit="edit" :create="create"/>
    </div>

    <!-- 新建编辑弹框 -->
    <EditDialog :rules="rules" :icons="icons" :menusData="menusData" :fromData="menu" :save="save" ref='EditDialog'/>
  </div>
</template>

<script type="text/jsx">
  import {getAllMenuDataApi,updataMenuDataApi,inUseMenuDataApi,addMenuDataApi} from '../../api/menuApi.js'
  import { Dialog,Button,Form,FormItem ,Select,Option,Input,RadioGroup,Radio,InputNumber} from "element-ui";
  import { mapGetters, mapActions } from "vueX";
  import Trees from "./Trees.vue";
  import EditDialog from "./EditDialog.vue";

  export default {
    name: 'menuManagement',
    components: {
      Trees,
      Dialog,
      Button,
      Form,
      FormItem ,
      Select,
      Option,
      Input,
      RadioGroup,
      Radio,
      InputNumber,
      EditDialog
    },
    data() {
      return {
        disabled: false,                                                                              // 权限禁用
        options: {label: 'name', children: 'childrenMenu'},                                           // 树结构绑定配置
        loading: true,
        menu: {show: false, name: '', icon: '', tips: '', num: 0, code: '', url: '', pid: null},      // 表单输入数据
        rules: {                                                                                      // 表单验证
           name: [
              {required: true, message: '请输入菜单名称...', trigger: 'blur'},
              {min: 2, max: 10,message: '长度大于2个字符小于10...', trigger: 'blur'}
             ],
           icon: [
              {required: true, message: '请选择图标', trigger: 'change'},
             ],
           pid: [
              {required: true, message: '请选择父级菜单', trigger: 'blur'},
             ],
           url: [
              {required: true, message: '请输入url地址', trigger: 'blur'},
             ],
           code: [
              {required: true, message: '请输入权限Code', trigger: 'blur'},
             ],
           tips: [
              {required: true, message: '请输入菜单说明', trigger: 'blur'},
             ],
        }
      }
    },
    computed: {
      ...mapGetters('menu',[
        'menusTressData',         //菜单树结构数据
        'icons'                   //菜单图表全部数据
      ]),
      // 下拉选择父菜单顶级菜单
      menusData(){
        return [{id: 0, name: '顶级菜单'},...this.menusTressData]
      }
    },
    created() {
      this.changdeTreeData()
    },
    mounted(){
    },
    methods: {
      ...mapActions('menu',[
        'changdeTreeDataAction',         // 获取菜单树结构
       ]),
      // 修改
      edit(data) {
        this.menu = {...this.menu, ...data, title: `修改菜单“${data.name}”`, show: true}
      },
      // 保存
      save(data) {
        const fn = data.id ? updataMenuDataApi({...data}) : addMenuDataApi({...data})
        fn.then(() => {
          this.menu.show = false
          this.changdeTreeData()
        })
      },

      //更新菜单数据
      changdeTreeData(data) {
        this.loading = true
        this.changdeTreeDataAction()
      },
      // 创建
      create({pid,id,addTop}) {
        if (addTop===0) {
          this.menu = {name: '', icon: '', tips: '', num: 0, pid: 0, title: `创建菜单`, show: true}
          return
        }
        if (pid === 0) {
          this.menu = {name: '', icon: '', tips: '', num: 0, pid: (id)*1, title: `创建菜单`, show: true}
        }else {
          this.menu = {name: '', icon: '', tips: '', num: 0, pid: (pid)*1, title: `创建菜单`, show: true}
        }

      },
      // 删除
      del(data) {
        this.$confirm(`确认删除菜单"${data.name}"?`, '删除提示', '删除确认').then(() => delMenuApi(data.id).then(() => {
          // success(`删除菜单"${data.name}"成功！`)
          // store.remove(data)
        }).catch(({msg}) => error(msg || '操作失败！请稍后重试...')),error=>{
          // this.$message
          this.$message({
            message: '你已取消删除。',
            type: 'info'
          });
        })
      },
      // 禁用
      toggle(data) {
        this.$confirm(`确认${data.status ? '禁用' : '启用'}菜单"${data.name}"?`, '提示', '操作确认').then(() => inUseMenuDataApi({id:data.id,flag:data.status===0?1:0}).then((roult) => {
          console.log(data,'data');
          if (roult.code===200) {
            this.$message({
              message: `${data.status===1 ? '禁用' : '启用'}菜单"${data.name}"成功！`,
              type: 'success'
            });
            this.changdeTreeData()
          }else{
            this.$message({
              message: `${data.status ? '禁用' : '启用'}菜单"${data.name}"失败！${data.msg}`,
              type: 'error'
            });
          }

        }).catch(({msg}) => {
            console.log(msg,'msg');
        }))
      },
      // 关闭弹框
      closeDialog() {
        this.$refs.menu.resetFields()
      }
    },
    watch: {
    }
  }
</script>

<style lang="sass" >

.content_data
  background-color: #ffffff
  box-shadow: -1px 0px 7px 0px rgba(0, 0, 0, 0.28)
  padding: 29px 0 29px 0px
  color: #333333
  .header
    border-left: 4px solid #5286e9
    padding-left: 25px
    padding-right: 25px
    font-size: 26px
    height: 30px
    display: flex
    align-items: center
    justify-content: space-between
#menuManagement
  .el-input-number
    display: block
  .el-select
    display: block
    width: 180px
  .treesList
    padding-top: 0



</style>




