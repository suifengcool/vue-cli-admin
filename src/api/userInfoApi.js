import ajax from './ajax'


//设置根目录
const ROOT = '/users'
/*
* @Interface: 修改用户密码
* @Url: /users/changePassword
* @By: 郑鹤
* @Use: 李乾乾
* @Method: post
* @Params:
* userName (string): 用户名 ,
* userNewPassword (string): 新密码 ,
* userPassword (string): 密码，加密后的
*/
export const changeUserPwd = ({userName,userNewPassword,userPassword}) => ajax.post(`${ROOT}/changePassword`, {userName,userNewPassword,userPassword})