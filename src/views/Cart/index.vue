<template>
  <!-- 顶部导航 -->
  <van-nav-bar
    title="购物车"
    left-arrow
    @click-left="onClickLeft"
  />
  <!-- 购物车列表 -->
  <div class="cart-list" v-if="hasItem">
    <cart-item
      v-for="item in cartList"
      :key="item.id"
      :itemData="item"
    />
  </div>
  <van-empty v-else description="还没有加入购物车的商品哦~" />
  <!-- 总计区域 -->
  <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="checked">全选</van-checkbox>
  </van-submit-bar>
  <layout-footer></layout-footer>
</template>

<script setup>
import LayoutFooter from '@/components/LayoutFooter.vue';
import { getCartList } from '@/api/cart'
import CartItem from '@/views/Cart/components/CartItem.vue';
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed, nextTick } from '@vue/runtime-core';

const store = useStore()

// 初始化购物车数据
const initCartList = async () => {
  const { data } = await getCartList()
  if (data.status !== 200) {
    return
  }
  // 先清除 store 的购物车数据
  store.commit('clearCartList')

  await nextTick()
  data.data.valid.forEach(item => {
    store.commit('addToCart', {
      id: item.id,
      checked: true,
      image: item.productInfo.image,
      title: item.productInfo.store_name,
      price: item.truePrice,
      stock: item.trueStock,
      num: item.cart_num,
      productId: item.product_id
    })
  })
}
initCartList()

// 从 Vuex 获取购物车数据
const cartList = computed(() => store.state.cartList)

// 购物车是否有数据
const hasItem = computed(() => cartList.value.length)

const onClickLeft = () => {

}
const onSubmit = () => {

}
const checked = ref(true)
</script>

<style lang="scss" scoped>
// 导航区域
.van-nav-bar {
  position: fixed !important;
  width: 100%;
  top: 0;
}
// 列表区域
.cart-list {
  margin: 50px 0 100px;
}
// 总计区域
.van-submit-bar {
  bottom: 50px;
}
</style>