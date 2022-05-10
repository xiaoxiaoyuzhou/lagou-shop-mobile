<template>
  <van-pull-refresh class="home-main" v-model="refreshing" @refresh="onRefresh">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(item, index) in swipeData"
        :key="index"
      >
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 菜单列表 -->
    <van-grid icon-size="40">
      <van-grid-item 
        v-for="(item, index) in menusData"
        :key="index"
        :icon="item.img"
        :text="item.info[0].value"
      />
    </van-grid>
    <!-- 通知栏 -->
    <van-notice-bar left-icon="volume-o" :scrollable="false">
    <span>热点咨询公告：</span>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item 
          v-for="(item, index) in newsData"
          :key="index"
          v-text="item.chiild[0].val"
        />
      </van-swipe>
    </van-notice-bar>
    <!-- 商品列表区域 -->
    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="initProductsData"
    >
      <product-list
        :products-data="productsData"
      ></product-list>
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
import ProductList from '@/components/ProductList.vue'

import { getDefaultData } from '@/api/home'
import { computed, reactive, ref } from 'vue';
import { getProductsData } from '@/api/products'

// 储存首页的所有响应式数据
const indexData = ref({})

// 下拉刷新的状态控制
const refreshing = ref(false)

// 封装首页获取数据方法
const initIndexData = async () => {
  const data = await getDefaultData()
  if (data.status !== 200) {
    return
  }
  indexData.value = data.data
  refreshing.value = false
}
initIndexData()

// 通过计算属性保存需要使用的数据
// 1.轮播图数据
const swipeData = computed(() => {
  return indexData.value.data?.swiperBg.default.imgList.list
})
// 2.菜单列表数据
const menusData = computed(() => {
  return indexData.value.data?.menus.default.imgList.list
})
// 3.公告区域数据
const newsData = computed(() => {
  return indexData.value.data?.news.default.newList.list
})

// 商品功能
const state = reactive({
  loading: false,
  finished: false
})
let page = 1  // 请求指定页商品数据
let limit = 4
// 存储商品的数据
const productsData = ref([])
const initProductsData = async () => {
  const { data } = await getProductsData({
    limit,
    page
  })
  if (data.status !== 200) {
    return
  }
  productsData.value.push(...data.data)
  // 将本次加载状态置为完成
  state.loading = false
  page++
  // 判断所有数据是否加载完毕
  if (data.data.length < limit) {
    state.finished = true
  }
}
// 下拉界面刷新功能
const onRefresh = () => {
  // 清空界面数据
  indexData.value = {}
  productsData.value = []
  // 页码还原
  page = 1
  // 触底加载状态还原
  state.finished = false
  state.loading = false
  // 重新请求数据
  initIndexData()
  initProductsData()
}
</script>

<style lang="scss" scoped>
.home-main{
  background-color: #f7f7f7;
  padding: 50px 0;
  // 公告区域
  .my-swipe .van-swipe-item {
    width: 100%;
    height: 170px;
    img {
      width: 100%;
    }
  }
  // 热点咨询区域
  :deep(.van-notice-bar__content) {
    display: flex;
    align-items: center;
    .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
  }
  
}
</style>