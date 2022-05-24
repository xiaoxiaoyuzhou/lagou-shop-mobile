import axios from 'axios'
import store from '@/store'
import router from '@/router'

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

// 在响应拦截器中处理
request.interceptors.response.use(config => {
  // 当响应码为 410000 时，需要登录
  if (config.data.status === 410000) {
    router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }
  return config
})
export default request