<!--  -->
<template>
  <div class='select'>
    <Select v-model="value" :placeholder="placeholder" :style="{width:width+'px'}">
      <Option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled">
      </Option>
    </Select>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui'
export default {
  name: 'selection',
  components: {
    Select, Option
  },
  created() {

    },
  data() {
    return {

    }
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择"
    },
    width: {
      type: Number,
      default: 150
    },
    options: {
     
    },
    value: {
      default: ''
    }
  },
  methods: {
  },

}
</script>
<style lang='less' scoped>
.select{
	display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  position: relative;
} 
</style>