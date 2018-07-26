import ajax from './ajax'


/*
* @Interface: 菜单所有查询
* @Url: /appMember/collageApply
* @By: 郑鹤
* @Use: 方统建
* @Method: GET
* @Params: 
childrenMenu (Array[菜单树形列表输出模型], optional): 
子菜单
 ,
code (string, optional): 
菜单编号
 ,
icon (string, optional): 
菜单图标
 ,
id (integer, optional): 
主键id
 ,
name (string, optional): 
菜单名称
 ,
num (integer, optional): 
菜单排序号
 ,
pid (integer, optional): 
父菜单id
 ,
status (integer, optional): 
菜单状态 : 1:启用 0:不启用
 ,
tips (string, optional): 
备注
 ,
url (string, optional): 
url地址
 
*/
// //获取活动管理首页列表
export const getAllMenuDataApi = () => ajax.get(`/menu/query`)





/*
* @Interface: 修改菜单
* @Url: /appMember/collageApply
* @By: 郑鹤
* @Use: 方统建
* @Method: GET
* @Params: 
code (string, optional): 
菜单编号
 ,
icon (string, optional): 
菜单图标
 ,
id (integer, optional): 
主键id，创建不填，修改必填
 ,
name (string, optional): 
菜单名称
 ,
num (integer, optional): 
菜单排序号
 ,
pid (integer, optional): 
父菜单id，没有父id传0
 ,
tips (string, optional): 
备注
 ,
url (string, optional): 
url地址
 
 
*/
// //修改菜单
export const updataMenuDataApi = ({
  code,
  icon,
  id,
  name,
  num,
  pid,
  tips,
  url
}) => ajax.put(`/menu/up`,{
  code,
  icon,
  id,
  name,
  num,
  pid,
  tips,
  url
})

/*
* @Interface: 新建菜单
* @Url: /appMember/collageApply
* @By: 郑鹤
* @Use: 方统建
* @Method: GET
* @Params: 
code (string, optional): 
菜单编号
 ,
icon (string, optional): 
菜单图标
 ,
id (integer, optional): 
主键id，创建不填，修改必填
 ,
name (string, optional): 
菜单名称
 ,
num (integer, optional): 
菜单排序号
 ,
pid (integer, optional): 
父菜单id，没有父id传0
 ,
tips (string, optional): 
备注
 ,
url (string, optional): 
url地址
 
 
*/
// //新建
export const addMenuDataApi = ({
  code,
  icon,
  name,
  num,
  pid,
  tips,
  url
}) => ajax.post(`/menu/insert`,{
  code,
  icon,
  name,
  num,
  pid,
  tips,
  url
})


// /menu/insert 
/*
* @Interface: 禁用
* @Url: /appMember/collageApply
* @By: 郑鹤
* @Use: 方统建
* @Method: GET
* @Params: 
code (string, optional): 
菜单编号
 ,
icon (string, optional): 
菜单图标
 ,
id (integer, optional): 
主键id，创建不填，修改必填
 ,
name (string, optional): 
菜单名称
 ,
num (integer, optional): 
菜单排序号
 ,
pid (integer, optional): 
父菜单id，没有父id传0
 ,
tips (string, optional): 
备注
 ,
url (string, optional): 
url地址
 
 
*/
// //启用禁用
export const inUseMenuDataApi = ({
  flag,
  id
}) => ajax.post(`/menu/inUse/${id}/${flag}`)

// /menu/insert 