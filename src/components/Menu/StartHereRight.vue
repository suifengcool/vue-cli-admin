<template>
  <div class="StartHereRight">
    <div class="header-img">
      <span>
        <DropdownItem class="clearfix" >
        <!-- <i class="el-icon-message"></i>
        <Badge class="mark" :value="UnreadLength" /> -->
      </DropdownItem>
      </span>
      <span><img :src="herdData.logo" @error="herdData.logo=require('../../assets/images/xxbLogo.png')"/></span>
      <span>{{herdData.userName}}</span>
      <span>
        <!-- <Tooltip class="item" effect="dark" content="退出登录" placement="bottom-start">
          <i class="iconfont icon-tuichu" @click="quitHanlk"></i>
        </Tooltip> -->
        <Dropdown @command="handleCommand" trigger="hover" class="menu-dropdown">
          <i class="iconfont icon-tuichu el-dropdown-link open-menu"></i>
          <DropdownMenu slot="dropdown">
            <DropdownItem command='goInfo'><i class="el-icon-tickets" />我的资料</DropdownItem>
            <DropdownItem command='editPassword'><i class="el-icon-edit"/>修改密码</DropdownItem>
            <DropdownItem command='quitHanlk'><i class="iconfont icon-tuichu"/>退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </span>
    </div>

    <Dialog 
      class="StartHereRightDialog"
      :title="dialog.title" 
      :visible.sync="show" 
      width="450px"
      :append-to-body = 'true'
      top='30vh'
      @close='close'
      :before-close="closeDialog"

    >
      <Form :model="dialog.form" :rules="rule" ref="form" labelWidth="95px">
        <FormItem label="用户名：" >
          <Input v-model='userInfo.userName' disabled/>
        </FormItem>
        <FormItem label="原密码：" prop="userPassword">
          <Input type="password" v-model="dialog.form.userPassword"/>
        </FormItem>
        <FormItem label="新密码：" prop="userNewPassword">
          <Input type="password" v-model="dialog.form.userNewPassword"/>
        </FormItem>
        <FormItem label="确认密码：" prop="surePwd">
          <Input type="password" v-model="dialog.form.surePwd"/>
        </FormItem>
      </Form>
      <div class="text-center">
        <Button @click="cancel">取 消</Button>
        <Button type="primary" @click='submit'>确 定</Button>
      </div>
    </Dialog>
  </div>
</template>
<script>
import {Badge,DropdownItem,Icon,Tooltip,Dropdown,DropdownMenu,Dialog,Button,Form,FormItem,Input} from 'element-ui'
import { mapGetters } from "vuex";
export default {
  name:'StartHereRight',
  components:{Badge,DropdownItem,Icon,Tooltip,Dropdown,DropdownMenu,Dialog,Button,Form,FormItem,Input},
  data(){
    return {
      UnreadLength: "3",
      herdData: {
      },
      dialog:{
        title:'修改密码',
        form:{
          userPassword:null,
          userNewPassword:null,
          surePwd:null,
        }
      },
      rule:{
          userPassword: [{type: 'string', required: true, message: '请输入原密码！', trigger: 'blur'}, {type: 'string', min: 6, message: '密码长度不少于6位！', trigger: 'blur'}],
          userNewPassword: [{
            type: 'string',
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入新密码！'))
              } else if (value.length < 6) {
                callback(new Error('密码长度不能少于6位！'))
              } else {
                if (this.dialog.form.surePwd) {
                  this.$refs.form.validateField('surePwd')
                }
                callback()
              }
            },
            trigger: 'blur',
          }],
          surePwd: [{
            type: 'string',
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请再次输入密码！'))
              } else if (value !== this.dialog.form.userNewPassword) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          }], 
      }
    };
  },
  props:{
    show:{                          
     type:Boolean,
     default:false   
    },
    data: {
      type: Object,
      default: {},
    },
    quitHanlk: {               //退出       
      type:　Function,
      default: ()=>{}
    },
    goUserInfo: {              //去用户列表
      type:　Function,
      default: ()=>{}
    },
    editPassword:{             //编辑用户密码
      type:　Function,
      default: ()=>{}  
    },
    submitEdit: {             //提交表单 
      type:　Function,
      default: ()=>{}  
    },
    cancel:{                  //取消函数
      type:　Function,
      default: ()=>{}   
    },
    closeDialog:{             //关闭弹框之前的函数      
      type:　Function,
      default: ()=>{}   
    }
  },
  computed:{
    ...mapGetters('userInfo',[
       'userInfo' 
    ])  
  },
  created(){
    //  console.log(this.userInfo) 
  },
  mounted() {
    this.herdData = {...this.data}
  },
  methods:{

    // 关闭弹框  
    close(){
      this.$refs.form.resetFields()   
    },

    //提交表单确定的函数
    submit(){
      this.$refs.form.validate(valid=>{
        if(valid){
          this.submitEdit(this.dialog.form.userPassword,this.dialog.form.userNewPassword)  
        }
      })   
    },

    //点击下拉菜单的函数
    handleCommand(command){
      command == 'quitHanlk'?this.quitHanlk():command == 'goInfo'?this.goUserInfo():this.editPassword()     
    }
  },
  watch: {
    data (){
      this.herdData = {...this.data}
    }
  }
}
</script>
<style lang="less" scope>
  .StartHereRight{
    position: fixed;
    top: 0;
    left: 470px;
    right: 0;
    height: 70px;
    line-height: 70px;
    background-color: #303246;
    font-size: 22px;
    z-index: 9999999999999;
  }
</style>
<style lang="less">
   .el-dropdown-menu{
    .el-dropdown-menu__item{
      i{
        margin-right:10px;
      }
    }
   } 
  .StartHereRightDialog {
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

.StartHereRight {
  .header-img {
    float: right;
    height: 100%;
    margin-right:20px;
    .el-dropdown-menu__item:focus,
    .el-dropdown-menu__item:not(.is-disabled):hover {
      background: none;
      color: #b2b2b2;
    }
    .open-menu{
      color:#fff;
    }


    span {
      display: inline-block;
      height: 70px;
      position: relative;
      float: left;
      margin-right: 17px;
      color: #fff;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        margin: auto;
        border-radius: 50%;
      }
    }
    span:nth-child(1) {
      margin-right: 0;
      .el-dropdown-menu__item {
        padding: 0;
        .el-icon-message {
          font-size: 24px;
          cursor: pointer;
        }
        .el-badge {
          top: -10px;
          left: -14px;
          .el-badge__content{
            cursor: pointer;
          }
        }
      }
     .el-dropdown-menu__item:focus{
      outline:none;
      }
    }
    span:nth-child(2) {
      width: 44px;
      height: 44px;
      margin-top: 13px;
      position: relative;
      img{
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
    span:nth-child(3) {
      font-size: 16px;
    }
    span:nth-child(4) {
      .iconfont{
        padding: 0 10px 0 10px;
        border-left: 1px solid #b2b2b2;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
