<template>
  <div class="role-search">
    <Input 
      :placeholder="placeholder" 
      suffix-icon="el-icon-search" 
      :value="inputValue"
      :style="{width:width+'px'}"
       @blur="blur"  
    />
    <Button type="primary" round @click='search' icon="el-icon-search">搜索</Button>
    <Button round @click='reset' class="el-icon-refresh" >重置</Button> 
    <slot/>
  </div>
</template>

<script>
import {Input ,Button} from 'element-ui'
export default {
  name:'search' ,
  components:{
    Input ,Button  
  },
  props:{
      placeholder:{
         type: String,  
      },
      search: {
        type: Function,
        default: ()=>{},
      },
      reset: {
        type: Function,
        default: ()=>{},
      },
      blur: {
        type: Function,
        default: ()=>{},
      },
      width: {
        type: String,
        default: '120',
      },
      height: {
        type: String,
        default: '120',
      },
      inputValue: {
        default: null,
      }, 
  }
}
</script>

<style lang='less' scoped>
 .role-search{
    display: flex;
    justify-content: flex-start;
    position: relative;
    padding: 40px 20px 20px;
    background-color: #fff;
    .el-input {
      width: 200px;
      margin-right: 20px;
      border-radius: 20px;
    }
    .el-button--primary{
      margin: 0 10px 0 20px;
    }
    .el-input__inner{
      border-radius: 20px;
    }
} 
</style>
<style lang="less">
.role-search{
   .el-input {
      border-radius: 20px;
    }
    .el-input__inner{
      border-radius: 20px;
    } 
}
</style>

