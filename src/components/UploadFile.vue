<template>
  <div class="avatar_box" id="update">
    <Upload class="avatar-uploader" action="/" :show-file-list="false" :before-upload="beforeUpload" :http-request="upload" :on-change="handleChange" :file-list="fileList3" :list-type="type" drag :disabled='disabled'>
    </Upload>
  </div>
</template>
<script>
import { Upload, Button } from 'element-ui';
import ajax from '../api/ajax'

import md5 from 'md5'
import moment from 'moment'

export default {
  data() {
    return {
      url: '',
      head: '',
      showLoading: false,
      loadFalg: true,
      fileList3: [],
      fileSize: null
    }
  },
  props: {
    showIcon: {
      type: Boolean,
      default: true,
    },
    defaultPic: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      default: '',
    },
    method: {
      type: Function,
      default: () => { },
    },
    startUpload: {
      type: Function,
      default: () => { },
    },
    fileType: {
      type: String,
      default: 'xlsx',
    }
  },
  components: { Upload, Button },
  methods: {
    upload({ file }, onUploadProgress = () => { }) {
      // var formData = new FormData();
      // formData.append('file', file);
      // vm.fetch.post('/picture/multiUpload', formData, {headers: {'Content-Type': 'multipart/form-data'}, onUploadProgress}).then(data=>{
      //   if(data){
      //     this.url = data.data[0]
      //     this.loadFalg ?  this.$emit(this.method,{url:this.url,name:file.name} ) : this.url = ""
      //     this.showLoading = false
      //   }
      // }).
      this.startUpload()
      console.log(file, 'file');

      this.fileSize = file.size / 1024 / 1024
      ajax.get(`/base/qiniu`).then((token) => {
        var formData = new FormData();
        formData.append('key', moment().format('YYYYMMDDHHmmssSSS') + md5(file.name) + file.name.substring(file.name.lastIndexOf('.'), file.name.length))
        formData.append('token', token.uptoken);
        formData.append('file', file);

        const UPLOAD_URL = location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://up-z2.qiniup.com'
        ajax.post(UPLOAD_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' }, onUploadProgress }).then(data => {
          if (data) {
            this.url = token.path + "/" + data.key
            this.method({ url: this.url, name: file.name, size: this.fileSize })
            this.showLoading = false
          }
        })
      })
    },
    handleChange(file, fileList) {
      // console.log('fileList:',fileList)
      this.fileList3 = fileList;
    },

    beforeUpload(file) {
      //console.log(file)   
      var fileName = file.name
      const isType = fileName.substring(fileName.lastIndexOf(".") + 1) === this.fileType;
      //console.log(fileName.substring(fileName.lastIndexOf(".")+1),"file")
      if (!isType) {
        this.$message({
          message: `上传文件必须是${this.fileType}格式!`,
          type: 'error'
        });
        return false
      }
    },

    clearImg() {
      this.url = ""
    }

  }
}
</script>

<style lang='less' scoped>
.avatar_box {
    width: 240px;
    height: 40px;
    margin-bottom: 5px;
    position: absolute;
    top: 6px;
    left: 69px;
}
</style>
<style lang="less">
#update {
    .el-upload-dragger,
    .avatar_box,
    .avatar-uploader {
        width: 240px;
        height: 40px;
    }

    input,
    .el-upload--text {
        display: inline-block;
        position: absolute;
        left: 0;
        top: -3px;
        opacity: 0;
        hover: pointer;
        width: 240px;
        z-index: 1001;
        height: 40px;
    }
    .iconfont {
        position: absolute;
        bottom: 2px;
        right: 5px;
        index: 100000;
        color: #4db8fc;
        font-weight: 800;
        font-size: 22px;
    }
    .overspread {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        index: 1000001;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        display: flex;
        justify-content: center;
        flex-direction: column;
        img {
            width: 30px;
            height: 30px;
            display: block;
            margin: 0 auto;
        }
    }
}
</style>
