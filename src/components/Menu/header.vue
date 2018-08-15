<template>
  <div class="layout-header">
    <div class="logBox">
      <!-- 点击显示影藏的 -->
      <Hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></Hamburger>
      <!-- 头部点击切换 -->
      <ul class="content_data_title">
        <li v-for="(item, index) in listTab" :class="{blue: changebill == item.pid}" @click="changdeBill(item.pid)" :key="index">{{item.name}}</li>
      </ul>
    </div>
    <!-- 头部右侧 -->
    <StartHereRight :data="userInfo" :quitHanlk="quitHanlk" :goUserInfo='goUserInfo' :editPassword ='editPassword' :submitEdit='submitEdit' :show='changePwdDialog' :cancel='cancel' :closeDialog='closeDialog'/>
  </div>
</template>

<script>
import StartHereRight from './StartHereRight'
import SidebarItem from './SidebarItem'
import Hamburger from './Hamburger'
import {Menu,Submenu,MenuItem,MenuItemGroup,Input} from 'element-ui'
import { mapGetters, mapActions } from 'vuex'
import md5 from 'md5'

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
      changebill: 1,
      listTab: [{pid: 1, name: '机构管理'}, {pid:2, name: '文本标签'}, {pid: 3, name: '文本标签'}],
 
    }
  },

  computed: {
    sidebar() {
      return this.$store.state.menu.sidebar
    },
    ...mapGetters('menu',[
      'sidebar',      // 侧边栏
      'name',
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
   
  },

  mounted(){
  },

  methods: {
    ...mapActions('userInfo',[
      'changePwd',                               // 修改密码
      'changePwdDialogShow'                      // 修改密码的弹框显示隐藏  
    ]),
    // 点击切换
    changdeBill(index) {
        // this.data.keyWord = null
        this.changebill = index
        //  this.data.status = index
        // this.$router.replace({ query: { ...this.$route.query,page:1,tab:index} })
        // this.findList({page:1})
      },
    ...mapActions('menu',[
      'changdeTreeDataAction',                   // 获取菜单树结构
    ]),
   

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
    },

    // 点击收缩侧边栏
    toggleSideBar() {
      this.$store.dispatch('menu/toggleSideBar')
      // if(!sidebar.opened){}
    },

  }
}
</script>
<style lang="scss" scope>
.layout-header {
  height: 70px;
  display: flex;
  justify-content: space-between;
  background-color: #168ec8;
  width: 100%;
    .logBox {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 70px;
      z-index: 99999;
      .content_data_title {
        margin-left: 20px;
        list-style: none;
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
        }
      }
      h3{
        font-size: 18px;
        color: #dedede;
        font-weight: 700;
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


#app {
  // 主体区域
  
  .sidebar-container {
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

}

</style>