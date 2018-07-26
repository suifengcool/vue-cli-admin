import Axios from 'axios'
import router from '../router'
import {error} from '../utils/actions'

const getCookie = (name) =>{
  let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  let arr = document.cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}

// TODO:全局默认设置
Axios.defaults.baseURL = location.hostname == 'localhost' ? '/rest' : 'http://47.93.228.120:8085'
Axios.defaults.headers['Content-Type'] = 'application/json'
// TODO:请求拦截器,统一处理参数
Axios.interceptors.request.use((config) => {
  if(getCookie('token')){
    config.headers.common['Token'] = getCookie('token')
  }
  // TODO:添加debug模式
  if (process.env.NODE_ENV === 'development' && router.currentRoute.query.debug) {
    config.url += config.url.indexOf('?') !== -1 ? `&debug=${router.currentRoute.query.debug}` : `?debug=${router.currentRoute.query.debug}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

// TODO:返回拦截器
Axios.interceptors.response.use((response) => {
  if (response.status !== 200) {
    // error('网络异常，请稍后重试...')
    return Promise.reject(response)
  }

  if(response.config.responsetype === "arraybuffer"){
    let blob = new Blob([response.data],{type : 'application/vnd.ms-excel'});
    let objectUrl = URL.createObjectURL(blob)
    window.location.href = objectUrl
  }

  const {code, msg, data} = response.data
  if (!code) {
    return response.data
  }else if (code === 200) {
    
    return response.data
  }else if (code !== 200) {
    const data = {code: code || 500, msg: msg || '服务器异常！请稍后重试...'}
    error(data.msg)
    code === 600 && router.replace('/login')
    return Promise.reject(data)
  }
}, (error) => {
  return Promise.reject(error)
})
export default Axios
