import request from '@/utils/request'

// 请求商品明细数据
export const getProductsData = params => request({
  method: 'GET',
  url: '/products',
  params
})