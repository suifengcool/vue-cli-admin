<template>
  <div class="isRoleDialog">
    <!-- 弹框-->
      <Dialog 
      class='roleDialog'
      :append-to-body = 'true'
      width='25%'
      top='30vh'
      :title="title"
      :visible.sync="DialogVisible"
      :before-close="closeDialog"
      @close='close'
      :id='id'
      @open='open'
      >
        <Form label-width="80px" :rules="rules" ref='form' :model='form'>
          <FormItem label="角色名称" prop="name">
            <Input auto-complete="off" v-model.trim="form.name" /> 
          </FormItem>
        </Form> 
        <div slot="footer" class="dialog-footer">
          <Button @click="cancel">取消</Button>
          <Button type="primary" @click="Sub">确定</Button>
        </div> 
      </Dialog> 
  </div>
</template>

<script>
import {Dialog,Form,FormItem,Input,Button} from 'element-ui'
export default {
  data(){
    return{
      form:{roleName:null},
      rules:{
        name:[
          { required: true, message: '请填写角色名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' },
          {
          pattern:/^[\u4E00-\u9FA5A-Za-z\.]+$/, message: '请输入正确角色名', trigger: 'blur'
          }
        ]
      },  
    }
  },
  components:{
    Dialog,Form,FormItem,Input,Button
  },
  props:{
    id:{                      //编辑的时候id
      type:Number,
      default:null,
    },
    formOption:{              //form表单数据
      type:Object,  
    },
    title:{                  //弹框title
      type:String,
    },
    DialogVisible:{          //弹框显示隐藏
      type:Boolean,
      default:false
    },
    submit:{                 //提交的函数  
      type:Function
    }, 
    cancel:{                 //取消按钮函数
      type:Function
    },
    closeDialog:{            //关闭弹框函数    
      type:Function
    } 
  },
  created(){    
    this.form = JSON.parse(JSON.stringify(this.formOption))
  },
  methods:{

    // 打开弹框
    open(){ 
      this.form = JSON.parse(JSON.stringify(this.formOption))
       
    },  

    // 确定提交的按钮
    Sub(){ 
      this.$refs.form.validate(valid=>{
        if(valid){
          this.submit(this.id,this.form.name)  
        }
      })      
    },
    
    // 关闭弹框
    close(){ 
      this.$refs.form.clearValidate() 
    },
  }
}
</script>

<style>

</style>
