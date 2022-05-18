import request from '@/utils/request'

// 获取用户验证码，避免重复发送
export const getVerfiCode = () => request({
  method: 'GET',
  url: '/verify_code'
})

// 获取短信验证码
export const getVerify = data => request({
  method: 'POST',
  url: '/register/verify',
  data
})