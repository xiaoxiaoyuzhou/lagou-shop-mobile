<template>
  <!-- 顶部导航 -->
  <van-nav-bar
    title="购物车"
    left-arrow
    @click-left="onClickLeft"
  />
  <!-- 购物车列表 -->
  <div class="cart-list">
    <cart-item></cart-item>
    <cart-item></cart-item>
  </div>
  <!-- 总计区域 -->
  <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="checked">全选</van-checkbox>
  </van-submit-bar>
  <layout-footer></layout-footer>
</template>

<script setup>
import LayoutFooter from '@/components/LayoutFooter.vue';
import { getCartList } from '@/api/cart'
import CartItem from './components/CartItem.vue'
import { ref } from '@vue/reactivity';

// 初始化购物车数据
const initCartList = async () => {
  const { data } = await getCartList()
  if (data.status !== 200) {
    return
  }
}
initCartList()

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