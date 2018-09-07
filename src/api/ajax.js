import Axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

const msg = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

const getCookie = (name) =>{
  let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  let arr = document.cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}

// 全局默认设置
// Axios.defaults.baseURL = process.env.API_ROOT
Axios.defaults.headers['Content-Type'] = 'application/json'

// 请求拦截器,统一处理参数
Axios.interceptors.request.use((config) => {
  if(getCookie('jwtToken')){
    config.headers.Authorization = 'Bearer ' + getCookie('jwtToken')
  }

  if(getCookie('ELEARNING_00024')){
    config.headers.Token = getCookie('ELEARNING_00024')
  }

  let rndNum = ''
  for (let i = 0; i < 6; i++) {
    rndNum = rndNum + Math.round(Math.random() * 10).toString()[0]
  }
  config.headers['c-business-id'] = new Date().getTime() + rndNum

  return config
}, (error) => {
  return Promise.reject(error)
})

// 返回拦截器
Axios.interceptors.response.use((response) => {
  if (response.status !== 200) {
    Message.error({message: msg[ response.status ] || '网络异常，请稍后重试...'})
    return Promise.reject(response)
  }

  let status = response.data['C-API-Status']
  
  if (!status) {
    return response.data
  }else if (status === '00') {
    return response.data
  }else if (status !== '00') {
    let message = response.data[ 'C-Response-Desc' ] || '服务器异常！请稍后重试...'
    Message.error({message: message})

    // token失效，跳转至登录页
    status === 600 && router.replace('/')
    return Promise.reject(response)
  }
}, (error) => {
  return Promise.reject(error)
})

export default Axios