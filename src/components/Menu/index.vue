<template>
  <div class="StartHere">
    <div class="logo">
      <div class="logBox">
        <div class="imgBox">
          <img src="../../assets/image/menu/ccb-logo.png" alt="LOGO" @click="goHome">
          <p>老曾投资后台管理系统</p>
        </div>
      </div>
      <!-- <StartHereRight 
        :data="userInfo" 
        :quitHanlk="quitHanlk" 
        :goUserInfo='goUserInfo' 
        :editPassword ='editPassword' 
        :submitEdit='submitEdit' 
        :show='changePwdDialog' 
        :cancel='cancel' 
        :closeDialog='closeDialog'
      /> -->
    </div>
    <Menu :default-active="active" unique-opened id="menu">
      <SidebarItem 
        :index="idx+''" 
        :item="item" 
        v-for="(item,idx) in userInfo.menuData" 
        :key="idx" 
      />
    </Menu>
  </div>
</template>

<script>
// import StartHereRight from './StartHereRight'
import SidebarItem from './SidebarItem'
import { Menu } from 'element-ui'
import { mapGetters, mapActions } from 'vuex'
import md5 from 'md5'

export default {
  components:{
    // StartHereRight,
    SidebarItem,
    Menu
  },

  data(){
    return {
      
    }
  },

  computed: {
    active() {
      let path = this.$route.path
      return path
    },
    ...mapGetters('userInfo',['userInfo']),
  },

  created(){
    this.getUserInfo()
  },

  methods: {
    ...mapActions('userInfo',['getUserInfo']),

    goHome(){

    },

    // 退出登录
    quitHanlk() {
      
    },

    // 去到用户列表
    goUserInfo(){

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
.StartHere {
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 230px;
  .logo{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: linear-gradient(to bottom, rgba(52,113,182,1) 1%,rgba(46,106,174,1) 100%);
    .logBox {
      display: flex;
      width: 100%;
      position: fixed;
      justify-content: flex-start;
      align-items: center;
      height: 60px;
      z-index: 99999;
      background-image: url(../../assets/image/menu/header-bg.png);
      background-size: 5px auto;
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
      height: 60px;
      padding-left: 10px;
      p{
        font-size: 18px;
        color: #fff;
        margin-left: 5px;
      }
      img {
        width: 28px;
        height: 28px;
        vertical-align: middle;
      }
    }
  }
}
</style>
<style lang="less">
#menu{
  transition: all .3s ease;
  width: 100%;
  border-radius: 0;
  background-image: url(../../assets/image/menu/sidebar-bg.jpg);
  height: 100%;
  overflow-y: auto;
  margin-top: 60px;
  padding-bottom: 60px;
}
</style>