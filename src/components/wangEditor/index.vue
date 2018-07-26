<template>
  <div>
    <div id="editor">
    </div>
  </div>
</template>

<script>
//1.https://www.kancloud.cn/wangfupeng/wangeditor2
//npm install wangeditor
import   './dist/js/lib/jquery-1.10.2.min.js'
import   './dist/js/wangEditor.js'
import   "./dist/css/wangEditor.min.css";
import ajax from '../../api/ajax'
import moment from "moment";
import md5 from "md5";
import { error } from '../../actions/index.js';


export default {
  name: 'wangEditor',
  data(){
    return {
      editor: null,
      url: null,
      command: null,
    }
  },
  props: {
    editorDefault: {
      type: String,
      default: '<p><br/></p>'
    },
  },
  mounted() {
    this.editor = new wangEditor('editor');
    this.editor.config = {
      ...this.editor.config,     //
      pasteFilter: false,        //关闭样式过滤
      uploadImgUrl: '/rest/picture/multiUpload',
      uploadHeaders : {
        'name' : 'file'
      },
    }
 
    this.editor.config.uploadImgFns.onload =  (resultText, xhr) =>{
        // resultText 服务器端返回的text
        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        
        // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
        // var originalName = this.editor.uploadImgOriginalName || '';  
        
        // 如果 resultText 是图片的url地址，可以这样插入图片：
       
        const url = JSON.parse(resultText).data[0]
        // this.editor.command(null, 'insertHtml', '<img src="' + url + '" style="max-width:100%;"/>');
        // 如果不想要 img 的 max-width 样式，也可以这样插入：
        this.editor.command(null, 'InsertImage', url);
    };
    
    // 自定义timeout事件
    this.editor.config.uploadImgFns.ontimeout =  (formData)=> {
        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        // alert('上传超时');
        this.qiNiuUpload(formData)
    };
    // 自定义error事件
    this.editor.config.uploadImgFns.onerror = function (xhr) {
        alert('上传错误'+xhr);
        
    };
    this.editor.create()
    this.$emit('ready')
    this.editor.$txt.html(this.editorDefault)
  },
  created(){
  },
  methods: {
    setContent(val) {
      this.editor.$txt.html(val)
    },
    clearContent() {
      // this.editor.txt.clear()
      this.editor.$txt.html(this.editorDefault)
    },
    getContent() {
      var content = this.editor.$txt.html()
      if (content.replace("<p><br></p>","").trim() !="" ) {
        return this.editor.$txt.html()
      }else{
        return ""
      }
    },
    qiNiuUpload(formData) {
      ajax.get(`/base/qiniu`).then((token) => {
        formData.append('token', token.uptoken);
        const UPLOAD_URL = location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://up-z2.qiniu.com'
        ajax.post(UPLOAD_URL, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(data=>{
          if(data){
            this.url = token.path+"/"+data.key
            this.uploadSuccess()
          }
        },error=>{
          this.$message({
            message: `上传失败:${error.msg}`,
            type: 'error'
          });
        })
      },error=>{
        this.$message({
          message: `上传失败:${error.msg}`,
          type: 'error'
        });
      })
    },
    uploadSuccess(){
      this.$message({
        message: '你已成功上传图片。',
        type: 'success'
      });
      this.editor.command(null, 'InsertImage', this.url);
    }
  }
  
}
</script>

<style lang="less" >
  .wangEditor-txt {
    height: 400px;
      h1 {font-size: 2em; margin: .67em 0 }

      h2 {font-size: 1.5em; margin: .75em 0 }

      h3 {font-size: 1.17em; margin: .83em 0 }

      h4, p,blockquote, ul, fieldset, form, ol, dl, dir, menu { margin: 1.12em 0 }

      h5 {font-size: .83em; margin: 1.5em 0 }

      h6 {font-size: .75em; margin: 1.67em 0 }

      h1, h2,h3, h4, h5, h6, b,strong { font-weight: bolder }
      b {
        font-weight: 700;
      }
      i, cite,em,var, address { font-style: italic }
  }

  
</style>
<style lang="less" scoped>

</style>



