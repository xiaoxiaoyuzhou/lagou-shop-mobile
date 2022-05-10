<template>
  <div>Product 页面</div>
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

<style>

</style>