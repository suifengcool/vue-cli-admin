<template>
  <div class="layout" :class="{hideSidebar:!sidebar.opened}">
    <!-- 侧边菜单 -->
    <Menu/>
    <div class="layout-right">
      <!-- 头部 -->
      <Header/>
      <!-- 面包屑 -->
      <Breadcrumb/>
      <div class="content-contain">
        <transition name="manage-data" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './Menu'                                 // 侧边栏菜单
import Breadcrumb from './Breadcrumb'                     // 面包屑
import Header from './Menu/header'                        // 头部
import { mapGetters, mapActions } from 'vuex'

export default{
  name: 'layout',
  data(){
    return {
      
    }
  },
  
  components:{ 
    Menu,
    Header,
    Breadcrumb 
    },
  computed:{
    ...mapGetters('menu',[
      'sidebar',      // 侧边栏
    ]),
  },
  created(){
    let userInfo = JSON.parse(window.localStorage.getItem('UserInfo'))
    this.$store.dispatch('userInfo/changeUserInfo',userInfo)
  }
}
</script>

<style lang="sass" scoped>
.layout
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  display: flex
  flex-direction: row
  .layout-right
    flex: 1
    display: flex
    flex-direction: column
  .content-contain 
    bottom: 0;
    left: 0px
    right: 0;
    overflow-y: auto 
    padding: 30px
    background-color: #edf1f5
    flex: 1
    // 页面切换效果
    .manage-data-enter-active, .manage-data-leave 
      opacity: 1
      transform: translateX(0)
    .manage-data-enter, .manage-data-leave-active
      opacity: 0
      transform: translateX(-50%)
    .manage-data-enter
      transform: translateX(50%)
    // 内容统一样式
    .content
      position: relative
</style>
