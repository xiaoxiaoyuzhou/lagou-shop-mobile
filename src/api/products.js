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

// 商品评价数量接口
export const getCommentCount = productId => request({
  method: 'GET',
  url: `/reply/config/${ productId }`
})

// 请求不同类型的评论数据
export const getCommentByTag = (productId, params) => request({
  method: 'GET',
  url: `/reply/list/${ productId }`,
  params
})