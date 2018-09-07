<template>
  <div class="ExportButton">
    <Button type="edit" @click="exportHandle" :disabled="disabled">{{text}}</Button>

    <Dialog :title="text" :visible.sync="dialog.show" :modalAppendToBody="false" width="600px">
      <Form :model="dialog" labelWidth="0px">
        <FormItem label="">导出查询条件为空，可能会导致服务器崩溃哦~</FormItem>
      </Form>
      <div class="text-center">
        <Button type="primary" @click="doMethod">确定导出</Button>
        <Button type="warning" @click="dialog.show = false">取消导出</Button>
      </div>
    </Dialog>

    <Dialog :title="text" :visible.sync="download.show" :modalAppendToBody="false" width="450px">
      <span>{{download.content}}</span>
      <div class="download">
        <a :href="download.url" @click="download.show = false" v-if="!!download.url" :download="name+'.xls'"" class="downloadBtn">下载</a>
      </div>
    </Dialog>
  </div>
</template>
<script>
import {Dialog,Form,FormItem,Button} from 'element-ui'
import Axios from 'axios'
import {APIBASE} from '@/utils/apibase'
const trabaseUrl = ( process.env.NODE_ENV === 'development' ? '/rest' : process.env.API_ROOT ) + APIBASE.TRABASE_V1

  export default {
    name: 'ExportButton',
    components:{
      Dialog,
      Form,
      FormItem,
      Button
    },
    props: {
      text: {
        type: String,
        default: '导出EXCEL',
      },
      name: {
        type: String,
        default: '表格',
      },
      params: {
        type: Object,
        default: {},
      },
      url: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        disabled: false,
        dialog: {show: false},
        download: {show: false, content: '正在生成文件导出中...请耐心等待...', url: null},
      }
    },

    created(){
      const isSupportDownload = 'download' in document.createElement("a")

      console.log('isSupportDownload:',isSupportDownload)
    },
    
    methods: {
      // 确定导出
      doMethod() {
        this.dialog.show = false
        this.download.show = true
        Axios.post(trabaseUrl+this.url, this.params, {responseType: 'arraybuffer'}).then(data => {
          let blob = new Blob([data.data], {type: "application/vnd.ms-excel"});
　　　　　    let objectUrl = URL.createObjectURL(blob);
          this.download.url = objectUrl
          this.download.content = '文件生成完成！请点击下载...'
          this.disabled = false
        })
      },
      exportHandle() {
        let arr = Object.keys(this.params)

        if(!arr.length){
          this.dialog = {show: true}
        }else{
          this.disabled = true
          this.doMethod()
        }
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
    margin-right: 29px;
    .downloadBtn {
      width: 80px;
      height: 32px;
      border-radius: 20px;
      text-align: center;
      line-height: 32px;
      background: #3070b8;
      display: inline-block;
      color: #fff;
    }
    .download {
      text-align: center;
      padding: 15px 15px 0 15px;
    }
  }
</style>
<style lang="less"  >
  .ExportButton {
    .el-dialog__header {
        background-color: #3070b8;
        height: 63px;
        padding: 0px 20px 0px;
        line-height:63px;
      .el-dialog__title {
        color: #fff;
        font-size: 18px;
      }
    }
    .el-form-item__content{
      text-align: center;
    }
  }
</style>
