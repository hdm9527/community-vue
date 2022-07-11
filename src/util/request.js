import axios from 'axios'
import errorCode from '@/util/errorCode'
import { removeToken } from '@/util/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// 是否登录
export let isLogin = false

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      if (isLogin) {
        isLogin = false
        location.href = '/'
      }
      removeToken()
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      return Promise.reject('error')
    } else {
      return Promise.resolve(res.data)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
