// 获取cookie
export const getCookie = (name) => {
  let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  let arr = document.cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}

// 设置cookie
export const setCookie = (c_name,value,expiredays) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires = " + exdate.toGMTString())
}

// 删除cookies
export const delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=this.getCookie(name);
  if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

