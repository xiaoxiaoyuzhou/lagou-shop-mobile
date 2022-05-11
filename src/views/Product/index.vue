<template>
  <van-nav-bar
    left-arrow
    fixed
  />
  <van-tabs
   v-model:active="active"
   scrollspy
   sticky
   color="#FBC546"
  >
    <van-tab title="商品">商品</van-tab>
    <van-tab title="评价">评价</van-tab>
    <van-tab title="推荐">推荐</van-tab>
    <van-tab title="详情">详情</van-tab>
  </van-tabs>
</template>

<script setup>
import { getProductDetails } from '@/api/products'
import { ref } from '@vue/reactivity'
import router from '../../router';
const { productId } = defineProps({
  productId: {
    type: String,
    required: true
  }
})
// 加载商品数据
const productDetails = ref({})
const initProductDetails = async () => {
  const { data } = await getProductDetails({
    productId
  })
  if (data.status !== 200) {
    console.log(data.msg)
    router.push({
      name: 'home'
    })
    return
  }
  productDetails.value = data.data
  console.log(productDetails.value)
}
initProductDetails()
</script>

<style lang="scss" scoped>
// 为了避免问题添加 fixed 样式权重
.van-nav-bar {
  position: fixed !important;
}
// 顶部标题部分
:deep(.van-tabs__wrap) {
  width: 80%;
  position: fixed;
  top: 0;
  z-index: 999;
  left: 50%;
  transform: translateX(-50%);
}
// 底部主体内容容器
:deep(.van-tabs__content) {
  padding-top: 46px;
}
</style>