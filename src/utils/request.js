import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'https://shop.fed.lagounews.com/api'
})

// 请求拦截器
request.interceptors.request.use(config => {
  // 获取 token
  const { user } = store.state
  // 设置请求头
  if (user) {
    config.headers.Authorization = 'Bearer ' + user
  }
  return config
})
export default request