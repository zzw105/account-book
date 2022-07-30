import axios from 'axios'
let ConfigBaseURL = 'http://node.zzw105.com/' //默认路径，这里也可以使用env来判断环境
if (import.meta.env.DEV) ConfigBaseURL = 'http://172.0.0.1:1111/'

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
  return config
})
// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log('TCL: error', error)
    return Promise.reject(error)
  }
)

export default request
