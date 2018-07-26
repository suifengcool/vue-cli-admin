<template>
	<div class="home-login">
    <div class="form-contain">
		    <div class="logo">
          <img src="../../../src/assets/images/logo.png"></img>
        </div>

		    <div class="welcome">CMS管理系统</div>
				<Form 
          :model="data" 
          :rules="rules" 
          status-icon 
          ref="loginForm" 
          labelWidth="0" 
          class="demo-ruleForm" 
          autocomplete="off"
        >
					<FormItem label="" prop="accountNum">
						<div class="el-input">
							<Input
              v-model.number ="data.accountNum"
              :maxlength="11"
              auto-complete="off"
              placeholder="账号"
              size="medium"
              prefix-icon="iconfont icon-zhanghao"
              />
						</div>
					</FormItem>

					<FormItem label="" prop="password">
						<div class="el-input">
							<Input
              type="password"
              v-model.trim="data.password"
              auto-complete="off"
              size="medium"
              prefix-icon="iconfont icon-mima"
              placeholder="密码"
              @keyup.enter.native="submit"
              />
						</div>
					</FormItem>

					<FormItem class="login-item">
						<Button type="primary" class="login-btn" :disabled="flag" @click="submit">登录</Button>
					</FormItem>
        </Form>
    </div>
	</div>
</template>

<script>
import { Button, Icon, CarouselItem, Form, FormItem, Input } from 'element-ui'
import { loginUserApi } from "../../api/loginApi.js";
import { mapActions } from "vuex";
import md5 from 'md5'

export default {
  name: 'home-login',
  components: {
    Button,
    CarouselItem,
    Icon,
    Form,
    FormItem,
    Input,
  },

  data() {
    return {
      data: {
        accountNum: '',                   // 账号
        password: ''                      // 密码
      },
      flag:false,                         // 防止重复点击
      rules: {
        accountNum: [{
          required: true, message: '请输入账号', trigger: 'blur' 
        }],
        password: [{ 
          required: true, message: '请输入密码', trigger: 'blur' 
        }]
      }
    }
  },

  created() {
    vm.config.title('登录')
  },

  methods: {
    // 登录
    submit() {
      if (this.data.password && this.data.accountNum) {
        this.$refs.loginForm.validate(val => {
          if (val) {
            this.flag = true
            let data = {
              "token":"f659185435c9b9099f87d277dae786df",
              "users":{
                "id":506,
                "img":"http://owkf8fxmh.bkt.clouddn.com/2018072316204828851b3c1baa12927593c15ee6550fcf7e2.jpg",
                "name":"xxb",
                "group":7,
                "post":8,
                "userName":"xxb",
                "userPassword":null,
                "salt":null,
                "telephone":"13296595000",
                "qqEmail":"1393863522@qq.com",
                "createTime":"2018-07-23T07:35:40.000+0000",
                "loginTime":"2018-07-26T05:20:38.219+0000",
                "status":1,
                "deleteFlag":1
              },
              "roles":[{
                "id":1,
                "num":1,
                "pid":0,
                "name":"超级管理员",
                "tips":"超级管理员",
                "createTime":null,
                "status":1,
                "deleteFlag":1
              }],
              "perms":["authority","role","menu"]
            }
            window.localStorage.setItem('UserInfo', JSON.stringify(data))
            vm.config.setCookie('token',data.token)

            this.$store.dispatch('userInfo/changeUserInfo',data.users)
            this.$store.dispatch('userInfo/changeUserPerms',data.perms)

            vm.$message({
              type: 'success',
              message: '登录成功',
              duration: 1000,
              onClose: () => {
                this.$router.push(`/${data.perms[0]}`)
              }
            })

            // loginUserApi({
            //   userPassword: this.data.password,
            //   userName: this.data.accountNum
            // }).then(data => {
            //   if(data && data.code === 200) {
            //     window.localStorage.setItem('UserInfo', JSON.stringify(data.data))
            //     vm.config.setCookie('token',data.data.token)

            //     let status = data.data.perms && data.data.perms.length
            //     vm.$message({
            //       type: status ? 'success' : 'info',
            //       message: status ? '登录成功' : '用户权限不足',
            //       duration: 1000,
            //       onClose: () => {
            //         if(status){
            //           this.$router.push(`/${data.data.perms[0]}`)
            //         }
            //       }
            //     })

            //     this.$store.dispatch('userInfo/changeUserInfo',data.data.users)
            //     this.$store.dispatch('userInfo/changeUserPerms',data.data.perms)
            //   }else{
            //     vm.$message({
            //       type: 'error',
            //       message: `${data.msg}`,
            //       duration: 500,
            //     })
            //     this.flag = false
            //   }
            // }).catch(err=>{
            //   this.flag = false
            // })
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home-login {
  width: 100%;
  height: 1080px;
  background: #3a324a;
  background-size: cover;
  display: flex;
  justify-content: center;
  padding-top: 12%;
  .login_footer {
    position: absolute;
    top: 1080px;
    left: 0;
    right: 0;
  }
  // 登录form
  .form-contain {
    width: 420px;
    height: 500px;
    background-color: hsla(0,0%,98%,.1);
    color: #666666;
    border-radius: 20px;
    box-shadow: 0 0 4px hsla(0,0%,40%,.2);
    .welcome {
      font-size: 30px;
      text-align: center;
      padding-top: 30px;
      line-height: 1;
      padding-bottom: 50px;
      text-align: center;
      color: #1494d2;
    }
    .logo {
      height:100px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      img {
        height: 50%;
      }
    }
    //表格样式
    .el-form {
      //验证码样式
      .codeNumber {
        width: 30%;
        height: 40px;
        display: inline-block;
        background: #45b9f4;
        vertical-align: top;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .yzmCode {
        width: 60%;
        margin-right: 21px;
      }
      //登录按钮
      .login-item {
        text-align: center;
        .login-btn {
          width: 300px;
          height: 50px;
          border-radius: 50px;
          background-color: #1494d2;
          border-color: #1494d2;
        }
      }
    }
    //底部
    .registfoot {
      display: flex;
      justify-content: space-between;
      padding-left: 20px;
      padding-right: 20px;
      span {
        padding: 10px 45px;
        cursor: pointer;
        color: #999999;
        font-size: 16px;
      }
    }
    .welcomeCut {
      height: 60px;
      line-height: 60px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-bottom: 40px;
      color: #1494d2;
      li {
        width: 33.3%;
        text-align: center;
        font-size: 20px;
        color: #999999;
        cursor: pointer;
        border-bottom: solid 1px #e5e5e5;
      }
      .grend {
        border-bottom: solid 6px #4db8fc;
        color: #1494d2;
      }
    }
  }
}
</style>
<style lang="less">
// 覆盖UI样式
.home-login {
  .el-input--prefix .el-input__inner {
    padding-left: 20px;
  }
  .el-form {
    .el-form-item {
      .el-input__prefix {
        left: 8px;
      }
      .el-form-item__content {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 30px;
        .el-form-item__error {
          left: 100px;
        }
        img {
          height: 30px;
          padding-right: 15px;
          vertical-align: bottom;
        }
        .check {
          padding-right: 10px;
        }
        .el-input {
          width: 309px;
          display: flex;
          justify-content: space-around;
          i {
            width: 30px;
            text-align: center;
            font-size: 20px;
            color: #1494d2;

          }
          input {
            border: none;
            outline: none;
            border-bottom: 1px solid #e5e5e5;
            border-radius: 0;
            background-color: #ffffff !important;
            padding-left: 40px;
            border-radius: 8px;
            height: 45px;
          }
        }
      }
      .yzm {
        width: 97px;
        height: 34px;
        background-color: #4db8fc;
        border-radius: 5px;
        position: absolute;
        right: 30px;
        top: 0;
        color: #999;
        cursor: pointer;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 34px;
      }
    }
    .tj {
      text-align: center;
      margin-top: 54px;
      button {
        width: 300px;
        height: 50px;
        background-color: #4db8fc;
        border-radius: 25px;
        font-size: 20px;
      }
    }
  }
}

//覆盖谷歌默认表单样式
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
</style>