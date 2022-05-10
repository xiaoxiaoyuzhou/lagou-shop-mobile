import request from '@/utils/request'

// 请求商品明细数据
export const getProductsData = params => request({
  method: 'GET',
  url: '/products',
  params
})

// 获取指定商品的明细数据
export const getProductDetails = params => request({
  method: 'GET',
  url: `/product/detail/${params.productId}`
})