<template>
  <div class="layout">
    <Menu/>
    <div class="content-contain">
      <transition name="manage-data" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Menu from './Menu'      
export default{
  name: 'layout',
  components:{ Menu }
}
</script>

<style lang="sass" scoped>
.layout
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  .content-contain 
    transition: all .5s ease
    position: absolute
    top: 60px
    bottom: 0;
    left: 230px
    right: 0;
    overflow-y: auto 
    padding: 30px
    background-color: #edf1f5
    // 页面切换效果
    .manage-data-enter-active, .manage-data-leave 
        transition: all .5s ease
        opacity: 1
        transform: translateX(0)
    .manage-data-enter, .manage-data-leave-active
        transition: all .5s ease
        opacity: 0
        transform: translateX(-50%)
    .manage-data-enter
        transform: translateX(50%)
    // 内容统一样式
    .content
        position: relative
</style>
