import ajax from './ajax'

/*
 * @Interface: 获取应用管理列表
 * @Url: /applications/getPackages/
 * @By: 
 * @Use: 许刚
 * @Method: get
 * @Params:
 */
export const getMenuTreeApi = () => ajax.get(`/user/getUserInfo`)