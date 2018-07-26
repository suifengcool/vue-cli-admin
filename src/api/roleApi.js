import ajax from './ajax'


//设置根目录
const ROOT = '/role'
/*
* @Interface: 角色管理列表
* @Url: /role/query/
* @By: 郑鹤
* @Use: 李乾乾
* @Method: post
* @Params:
* page: 当前页
* size: 条数
* name: 关键字
*/
export const getRoleListApi = ({page, pageSize ,name}) => ajax.post(`${ROOT}/query/`, {page, size:pageSize, name})

/*
* @Interface: 新增角色
* @Url: POST /role/insert
* @By: 郑鹤
* @Use: 李乾乾
* @Method: post
* @Params:
* name: 角色名称
*/
export const addRoleApi = (name) => ajax.post(`${ROOT}/insert`,name)

/*
* @Interface:编辑角色
* @Url: Put /role/up/{id}
* @By: 郑鹤
* @Use: 李乾乾
* @Method: put
* @Params:
* name: 角色名称
* id: 角色id
*/
export const editRoleApi = (id,name) => ajax.put(`${ROOT}/up/${id}`,name)


/*
* @Interface:删除修改状态
* @Url: /role/changeStatus/{operate}/{id}
* @By: 郑鹤
* @Use: 李乾乾
* @Method: put
* @Params:
* type: 类型  0禁用1启用2删除
* id: 角色id
*/
export const setStatusDelApi = ({id,type}) => ajax.put(`${ROOT}/changeStatus/${type}/${id}`)
/*
* @Interface: 获取角色下拉列表
* @Url: /role/getRoleDown
* @By:  郑鹤
* @Use: 严民
* @Method: get
* @Params:
* id: 角色id
* name: 名称
*/
export const getRoleDownApi = () => ajax.get(`${ROOT}/getRoleDown`)

