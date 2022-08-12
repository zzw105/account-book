import router from '@/router'
import axios from 'axios'
import { Notify } from 'vant'
let ConfigBaseURL = 'http://node.zzw105.com/'
if (import.meta.env.DEV) ConfigBaseURL = 'http://localhost:1111/'

//使用create方法创建axios实例
const request = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 添加请求拦截器
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers!.token = token || ''
  return config
})
// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    const resData = response.data

    if (resData.code !== 200) {
      switch (resData.code) {
        case 401:
          // token错误
          Notify({ type: 'warning', message: '登陆超时请重新登陆' })
          router.push({ name: 'login' })
          break
        default:
          // 统一弹出错误
          Notify({ type: 'warning', message: '系统错误' })
          break
      }
    }
    return response.data
  },
  (error) => {
    console.log('TCL: error', error)
    return Promise.reject(error)
  }
)

export default request
