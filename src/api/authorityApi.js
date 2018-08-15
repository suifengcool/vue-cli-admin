import ajax from './ajax'

/*
* @Interface: 获取角色名称列表
* @Url: /role/getRoleDown
* @By: 郑鹤
* @Use: 陈双林
* @Method: get
* @Params: 
*/
export const getUserNameApi = () => ajax.get(`/role/getRoleDown`)

/*
* @Interface: 获取菜单
* @Url: /role/getRoleDown
* @By: 郑鹤
* @Use: 陈双林
* @Method: get
* @Params: 
*/
export const getUserListApi = () => ajax.get(`/menu/query`)

/*
* @Interface: 根据角色id获取权限id
* @Url: /role/getRoleDown
* @By: 郑鹤
* @Use: 陈双林
* @Method: get
* @Params: 
  id    角色id
*/
export const getRoleMenuApi = (id) => ajax.post(`/roleMenu/getMenuByRid/${id}`)

/*
* @Interface: 修改角色菜单关系 
* @Url: /roleMenu/up/{rid}
* @By: 郑鹤
* @Use: 陈双林
* @Method: put
* @Params: 
  id    角色id
  mids  选中的菜单ids
*/
export const updataRoleMenuApi = (param) => ajax.put(`/roleMenu/up`,param)