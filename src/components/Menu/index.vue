<template>
  <div class="StartHere" :class="{hideSidebar:!sidebar.opened}">
    <!-- 折叠菜单 -->
    <Menu :default-active="active" unique-opened id="menu">
      <!-- logo -->
      <div class="imgBox">
        <img  :src="(logoImg)" alt="LOGO" @click="goHome" @error="logoImg=require('../../assets/images/xxbLogo.png')">
        <h3 v-if='sidebar.opened'>{{name}}</h3>
      </div>
      <!-- 用户信息 -->
      <div class="user_logo">
        <span><img  class="adminUserimg":src="userInfo.logo" @error="userInfo.logo=require('../../assets/images/xxbLogo.png')"/></span>
        <div class="user_content" v-if='sidebar.opened'>
          <span>{{userInfo.userName}}</span>
          <span><span class="user_online"></span>在线</span>
        </div>
      </div>
      <!-- 信息搜索框 -->
      <Input placeholder="搜索菜单" suffix-icon="el-icon-search" v-model="search" v-if='sidebar.opened'></Input>
      <!-- 菜单栏 -->
      <SidebarItem :index="idx+''" :item="item" v-for="(item,idx) in menusTressData" :key="idx" :datafilter="datafilter"/>
    </Menu>
  </div>
</template>

<script>
import StartHereRight from './StartHereRight'
import SidebarItem from './SidebarItem'
import Hamburger from './Hamburger'                                                       // 点击折叠面板组件
import {Menu,Submenu,MenuItem,MenuItemGroup,Input} from 'element-ui'
import { mapGetters, mapActions } from 'vuex'

export default {
  components:{
    StartHereRight,
    SidebarItem,
    Hamburger,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input
  },

  data(){
    return {
      name: '智学机构管理系统',
      logoImg: '../../assets/images/logo.png',
      search:null,
    }
  },

  computed: {
    // 控制开启关闭面板
    sidebar() { 
      return this.$store.state.menu.sidebar
    },
    // 选择的菜单
    active() {
      let path = this.$route.path
      return path
    },
    ...mapGetters('menu',[
      'sidebar',      // 侧边栏
      'permission_routers'
    ]),
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
    // 初始化时获取用户信息与菜单权限
    let UserInfo = JSON.parse(window.localStorage.getItem('UserInfo'))
    this.$store.dispatch('userInfo/changeUserInfo',UserInfo.users)
    this.$store.dispatch('userInfo/changeUserPerms',UserInfo.perms)

    this.changdeTreeDataAction()
  },

  mounted(){
    // this.menusTressData
  },
  methods: {
    ...mapActions('menu',[
      'changdeTreeDataAction',                   // 获取菜单树结构
    ]),
    // 根据code菜单过滤
    datafilter(data){
      data.filter((item)=>{
        return this.perms.indexOf(item.code) != -1
      })
    },
    // 回首页
    goHome(){
      // this.$router.push('/supplier/home/index')
    },
  }
}
</script>
<style lang="scss" scope>
/* afsd*/
.StartHere {
  
  height: 100vh;
  top: 0;
  bottom: 0;
    .logBox {
      display: flex;
      width: 100%;
      position: fixed;
      justify-content: flex-start;
      align-items: center;
      height: 70px;
      z-index: 99999;
      .content_data_title {
        margin-left: 20px;
        list-style: none;
        color: #fff;
        li {
          float: left;
          padding: 0 17px;
          color: #fff;
          cursor: pointer;
          &.ExportButton {
            float: right;
          }
        }
        .blue {
          color: #fff;
          background-color: #14a589;
          // border-bottom: 3px solid #51c5ff;
        }
      }
      h3{
        font-size: 18px;
        color: #dedede;
        font-weight: 700;
      }
    }
    .imgBox{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 20px;
      h3{
        margin-left: 10px;
        font-size: 16px;
        color: #1494d2;
        left: 50px;
        height: 35px;
        line-height: 35px;
      }
      
      img {
        width: 40px;
        
      }
    }
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
  
}

</style>
<style lang="less">

.StartHere.hideSidebar {
  #menu {
    ul {
      .el-menu-item {
        span {
          display: none;
        }
      }
    }
  }
  .user_logo {
    span {
      .adminUserimg {
        width: 50px !important;
        height: 50px !important;
      }
    }
  }
}

  .StartHere {
     width: 249px!important;
     z-index: 222;
     box-sizing: border-box;
    .el-menu {
      // width: 230px!important;
      // overflow: inherit;
      box-sizing: border-box;
      background-color: #232D33;
      border: none;
    }
  }
#menu{
  // transition: all .3s ease;
  top: 0;
  height: 100%;
  bottom: 0;
  left: 0;
  border-radius: 0;
  background-color: #232D33;
  .user_logo{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom:  20px;
    border-bottom: 2px solid #333;
    margin-bottom: 20px;
    span{
      color: #fff;
    }
    span:nth-of-type(1){
      >img{
        width: 80px;
        height: 80px;
        padding: 5px;
        border: 1px solid rgba(120, 130, 140, 0.13);
        border-radius: 100%;
      }
    }
  .user_content{
    span:nth-of-type(1){
      display: block;
      text-align: center;
      font-size: 15px; 
      padding: 5px;
      padding-top: 20px;
    }
    span:nth-of-type(2){
      display: block;
      font-size: 12px;
      text-align: center;
      padding: 5px;
      .user_online{
        background-color: #14a589;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        padding-left:0px;
        padding-top: 0px;
        float: left;
        margin-right: 3px;
      }
    }
  }
  }
  .el-input--suffix{
    padding: 15px 10px;
    .el-input__inner{
      background-color: #374750;
      border: 1px solid transparent;
      color: #fff;
    }
  }
  .el-input__icon{
    margin-right: 8px;
  }
}
#app {
  // 主体区域

  .sidebar-container {
    // transition: width 0.28s;
    width: 180px!important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    a {
      display: inline-block;
      width: 100%;
    }
    .svg-icon {
      margin-right: 16px;
    }
    .el-menu {
      border: none;
      width: 100%;
    }
  }

  .StartHere.hideSidebar {
      width: 62px!important;
     .el-menu {
      width: 62px!important;
      // overflow: inherit;
    }
    
    
  }
  
  
  .hideSidebar {
    .submenu-title-noDropdown {
      padding-left: 10px!important;
      position: relative;
      span {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        transition: opacity .3s cubic-bezier(.55, 0, .1, 1);
        opacity: 0;
        display: inline-block;
      }
      &:hover {
        span {
          display: block;
          border-radius: 3px;
          z-index: 1002;
          width: 140px;
          height: 56px;
          visibility: visible;
          position: absolute;
          right: -145px;
          text-align: left;
          text-indent: 20px;
          top: 0px;
          opacity: 1;
        }
      }
    }
    .el-submenu {
      &>.el-submenu__title {
        // padding-left: 10px!important;
        &>span {
          display: none;
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
      .nest-menu {
        .el-submenu__icon-arrow {
          display: block!important;
        }
        span {
          display: inline-block!important;
        }
      }
    }
  }
  .nest-menu .el-submenu>.el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: 180px!important;
    &:hover {
      color:#232D33;
    }
  }
  .el-menu--collapse .el-menu .el-submenu{
    min-width: 180px!important;
  }
  .hamburger-container {
    color: #fff;
  }
  // .el-menu-vertical-demo {
  //   li{
  //      &:hover{
  //     background-color: #999;
  //   }
  //   }
   
  // }
}

</style>