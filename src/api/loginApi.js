import ajax from './ajax'
import md5 from 'md5'
/*
* @Interface: 用户登录
* @Url: /role/getRoleDown
* @By: 郑鹤
* @Use: 方统建
* @Method: post
* @Params: userName、userPassword
*/

export const loginUserApi = ({
  userName,
  userPassword
}) => {
	ajax.post(`/users/login`,{userName,userPassword:md5(userPassword)})
}

/*
* @Interface: 用户登出
* @Url: /role/getRoleDown
* @By: 郑鹤
* @Use: 方统建
* @Method: post
* @Params: null
*/

export const logoutUserApi = () => ajax.post(`/users/logout`)