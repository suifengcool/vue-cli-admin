<template>
  <Dialog :title="menuDigData.title" :modal="true" :modal-append-to-body="false" customClass="my-dialog" :visible.sync="menuDigData.show" top="100px" width="1000px" @close="closeDialog" >
      <Form :model="menuDigData" ref="menuDigData" labelWidth="120px" :rules="rules">
        <FormItem label="菜单名称：" prop="name">
          <Input v-model.trim="menuDigData.name"/>
        </FormItem>
        <FormItem label="菜单图标：" prop="icon">
          <RadioGroup v-model="menuDigData.icon">
            <Radio v-for="(icon,index) in icons" style="margin: 5px 5px 5px 0;width: 50px;line-height: 20px" :label="icon" :key="index"><i :class="icon+' iconfont'" style="font-size: 20px;vertical-align: middle"/></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="菜单顺序：" >
          <InputNumber v-model="menuDigData.num"/>
        </FormItem>
        <FormItem label="菜单说明：" prop="tips">
          <Input type="textarea" v-model="menuDigData.tips" :rows="3"/>
        </FormItem>
        <FormItem label="父级菜单：" prop="pid">
          <Select v-model="menuDigData.pid" filterable placeholder="请选择父级菜单...">
            <Option v-for="menuDigData in menusData" :key="menuDigData.id" :label="menuDigData.name" :value="menuDigData.id"/>
          </Select>
        </FormItem>
        <FormItem label="URL地址：" prop="url">
          <Input v-model.trim="menuDigData.url"/>
        </FormItem>
        <FormItem label="权限Code：" >
          <Input v-model.trim="code" :disabled="true"/>
        </FormItem>
      </Form>
      <div class="text-center">
        <Button @click="menuDigData.show = false">取 消</Button>
        <Button type="primary" @click="submit">确 定</Button>
      </div>
    </Dialog>
</template>

<script>
import { Dialog,Button,Form,FormItem ,Select,Option,Input,RadioGroup,Radio,InputNumber} from "element-ui";
export default {
  name: 'EditDialog',
  components: {
    Dialog,Button,Form,FormItem ,Select,Option,Input,RadioGroup,Radio,InputNumber
  },
  props: {
    rules: {                                    // 表单规则
      type:  Object,
      default: {}
    },
    icons: {                                    // icon集合
      type:  Array,
      default: []
    },
    menusData: {                                // 父菜单下拉数据              
      type:  Array,
      default: []
    },
    fromData: {                                 // 表单数据
      type:  Object,
      default: {}
    },
    save: {                                     // 保存
      type:  Function,
      default: ()=>{}
    },
  },
  data () {
    return {
      menuDigData: {show: false, name: '', icon: '', tips: '', num: 0, code: '', url: '', pid: null},      //表单输入数据
    }
  },
  computed: {
    code(){
     
      if (this.menuDigData.url && this.menuDigData.url.indexOf("/")!=-1) {
        return this.menuDigData.url.substring(1)
      }
      return this.menuDigData.url
    }
  }
  ,
  created() {
    this.menuDigData = {...this.fromData}
  },
  methods: {
    // 提交
    submit() {
      this.$refs.menuDigData.validate((valid) => {
        if (valid) {
          this.save({...this.menuDigData,code: this.code})
        } else {
          return false
        }
      })

    },
    // 关闭弹窗
    closeDialog() {
      this.$refs.menuDigData.resetFields()
    }
  }
  ,
  watch: {
    'fromData.show': {
      handler(val,oldval){
        this.menuDigData = {...this.fromData}
      },
      deep: true
    }
  }
}
</script>

