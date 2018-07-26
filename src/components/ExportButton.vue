<template>
  <div class="ExportButton">
    <Button type="edit" @click="showDialog">{{text}}</Button>
    <Dialog :title="text" :visible.sync="dialog.show" :modalAppendToBody="false" width="600px">
      <Form :model="dialog" labelWidth="100px">
        <FormItem label="导出时间选择">
          <DatePicker :value="[dialog.start,dialog.end]" v-model="tiemValue"  type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" align="center" @change="selectTime" :clearable=false />
        </FormItem>
      </Form>
      <div class="text-center">
        <Button type="primary" @click="doMethod" :disabled="dialog.disabled">确定导出</Button>
        <Button type="warning" @click="dialog.show = false">取消导出</Button>
      </div>
    </Dialog>
    <Dialog :title="text" :visible.sync="download.show" :modalAppendToBody="false" width="450px">
      <span>{{download.content}}</span>
      <div class="download">
        <a :href="download.url" @click="download.show = false" v-if="!!download.url" class="downloadBtn">下载</a>
      </div>
    </Dialog>
  </div>
</template>
<script>
import {Dialog,Form,FormItem,Button,DatePicker} from 'element-ui'
  export default {
    name: 'ExportButton',
    components:{
      Dialog,
      Form,
      FormItem,
      Button,
      DatePicker
    },
    props: {
      text: {
        type: String,
        default: '导出EXCEL',
      },
      method: Function,
    },
    data() {
      return {
        dialog: {show: false, start: null, end: null, disabled: true},
        download: {show: false, content: '正在生成文件导出中...请耐心等待...', url: null},
        tiemValue: []
      }
    },
    computed: {
      pickerOptions() {
        return {disabledDate: (time) => time.getTime() > Date.now()}
      },
    },
    methods: {
      selectTime() {
        if (this.tiemValue && this.tiemValue.length>1) {
          this.dialog.start = this.tiemValue[0].getTime()
          this.dialog.end = this.tiemValue[1].getTime()
        }
        this.dialog.disabled = (this.dialog.start && this.dialog.end) ? false: true
        if (this.dialog.end - this.dialog.start > 3600000 * 24 * 6) {
          this.$message({type: 'warning', message: '导出7天以上的数据,有可能会导致服务器崩溃哦~~'});
        }
         console.log(this.dialog.start,this.dialog.end)
      },
      //确定导出
      doMethod() {
        this.dialog.show = false
        this.download.show = true
        this.method && this.method(this.dialog).then((url) => {
           console.log(url)
          this.download.content = '文件生成完成！请点击下载...'
          this.download.url = url
        })
      },
      showDialog() {
        this.tiemValue=[]
        this.dialog = {show: true, start: null, end: null,disabled:true}
      },
    },
  }
</script>
<style lang="less"  scoped>
  .ExportButton {
    .el-dialog__header {
        background-color: #2e3338;
        height: 80px;
        padding: 0px 20px 0px;
    }
    float: right;
    margin-right: 20px;
    .downloadBtn {
      width: 80px;
      height: 40px;
      border-radius: 20px;
      text-align: center;
      line-height: 40px;
      background: #51c5ff;
      display: inline-block;
      color: #fff;
    }
    .download {
      text-align: center;
      padding: 15px;
    }
  }
</style>
<style lang="less"  >
  .ExportButton {
    .el-dialog__header {
        background-color: #2e3338;
        height: 63px;
        padding: 0px 20px 0px;
        line-height:63px;
      .el-dialog__title {
        color: #fff;
        font-size: 18px;
      }
    }
  }
</style>
