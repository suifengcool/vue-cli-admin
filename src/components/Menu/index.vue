<template>
  <div class="StartHere">
    <div class="logo">
      <div class="logBox">
        <div class="imgBox">
          <img src="../../assets/images/logo.png" alt="LOGO" @click="goHome">
          <p>版本：0.0.1</p>
        </div>
        <h3>版本管理系统</h3>
      </div>
      <StartHereRight :data="userInfo" :quitHanlk="quitHanlk" :goUserInfo='goUserInfo' :editPassword ='editPassword' :submitEdit='submitEdit' :show='changePwdDialog' :cancel='cancel' :closeDialog='closeDialog'/>
    </div>
    <Menu :default-active="active" unique-opened id="menu">
      <SidebarItem :index="idx+''" :item="item" v-for="(item,idx) in datafilter(menusTressData)" :key="idx" :datafilter="datafilter"/>
    </Menu>
  </div>
</template>

<script>
import StartHereRight from './StartHereRight'
import SidebarItem from './SidebarItem'
import {Menu,Submenu,MenuItem,MenuItemGroup} from 'element-ui'
import { mapGetters, mapActions } from 'vuex'
import md5 from 'md5'
// import { logoutUserApi } from "../../../api/loginApi.js";

export default {
  components:{
    StartHereRight,
    SidebarItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup
  },

  data(){
    return {
      // menus: [],
      // data: {
      //   type: null,
      //   name:null,
      //   logo:null        // 用户类型， 0服务商， 1机构， 2教师
      // }
    }
  },

  computed: {
    active() {
      let path = this.$route.path
      return path
    },

    ...mapGetters('userInfo',[
      'userInfo',                                 // 用户信息 
      'changePwdDialog',                          // 修改密码的弹框显示隐藏
      'perms'
    ]),

    ...mapGetters('menu',[
      'menusTressData',
    ]),
  },

  created(){
    let UserInfo = JSON.parse(window.localStorage.getItem('UserInfo'))
    console.log('UserInfo:',UserInfo)
    this.$store.dispatch('userInfo/changeUserInfo',UserInfo.users)
    this.$store.dispatch('userInfo/changeUserPerms',UserInfo.perms)
    this.changdeTreeDataAction()

    console.log('menusTressData:',this.menusTressData)
  },

  mounted(){
    this.menusTressData
  },

  methods: {
    ...mapActions('userInfo',[
      'changePwd',                               // 修改密码
      'changePwdDialogShow'                      // 修改密码的弹框显示隐藏  
    ]),

    ...mapActions('menu',[
      'changdeTreeDataAction',                   // 获取菜单树结构
    ]),

    // 根据code菜单过滤
    datafilter(data){
      data.filter((item)=>{
        return this.perms.indexOf(item.code) != -1
      })
    },
    goHome(){
      // vm.$router.push('/supplier/home/index')
    },

    // 退出登录
    quitHanlk() {
      
      // logoutUserApi().then((data)=>{
      //   if (data.code===200) {
      //     vm.config.delCookie('token')
      //     window.localStorage.removeItem('UserInfo')
      //     vm.$message({
      //       type: 'success',
      //       message: '成功安全退出',
      //       duration: 1000,
      //       onClose: () => {
      //         this.$router.push('/login')
      //       }
      //     })
      //   }else{
      //     vm.$message({
      //       type: 'error',
      //       message: '退出失败',
      //       duration: 1000,
      //     })
      //   }
      // })
    },

    // 去到用户列表
    goUserInfo(){
      this.$router.push('/user')
    },
    
    // 点击修改密码
    editPassword(){
      this.changePwdDialogShow(true)   
    },

    //提交修改密码的表单
    submitEdit(userPassword,userNewPassword){
      this.changePwd({userPassword,userNewPassword,userName:this.userInfo.userName})

    },

    // 取消弹框的函数
    cancel(){
      this.changePwdDialogShow(false) 
    },

    // 关闭弹框之前的函数
    closeDialog(){
      this.changePwdDialogShow(false) 
    }
  }
}
</script>
<style lang="scss" scope>
/* afsd*/
.StartHere {
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 230px;
  background-color:#303246;
  .logo{
    position: fixed;
    top: 0;
    left: 10px;
    width: 100%;
    height: 70px;
    line-height: 70px;
    background-color:#303246;
    // display: flex;
    justify-content: space-between;
    .logBox {
      display: flex;
      width: 100%;
      position: fixed;
      justify-content: flex-start;
      align-items: center;
      height: 70px;
      z-index: 99999;
      h3{
        font-size: 24px;
        color: #dedede;
      }
    }
    .imgBox{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 220px;
      height: 70px;
      padding-left: 10px;
      p{
        font-size: 12px;
        color: #1494d2;
        bottom: -20px;
        left: 50px;
        height: 35px;
        margin-left: 5px;
      }
      
      img {
        width: 60px;
      }
    }
  }
}

</style>
<style lang="less">
#menu{
  transition: all .3s ease;
  position: absolute;
  top: 70px;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 0;
  background-color: #303246;
}
</style>