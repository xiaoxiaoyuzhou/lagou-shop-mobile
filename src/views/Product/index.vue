<template>
  <van-nav-bar
    left-arrow
    fixed
  />
  <van-tabs
   scrollspy
   sticky
   color="#FBC546"
  >
    <van-tab title="商品">
      <!-- 1.轮播图 -->
      <van-swipe class="my-swipe"
        :autoplay="3000"
        indicator-color="black"
        width="375"
        height="375"  
      >
        <van-swipe-item
          v-for="(item, index) in sliderImage"
          :key="index"
        >
          <img :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
      <!-- 2.商品头部 -->
      <van-cell
        class="productHeader"
        :border="false"
      >
        <template #title>
          <div class="price">
            <!-- 商品价格 -->
            <span>￥{{ storeInfo?.price }}</span>
            <!-- 分享按钮 -->
            <van-icon name="share-o" size="20" class="share"></van-icon>
          </div>
          <!-- 商品标题 -->
          <div class="title" v-text="storeInfo?.store_name"></div>
        </template>
        <!-- 其他信息 -->
        <template #label>
          <span>原价：￥{{ storeInfo?.ot_price }}</span>
          <span>库存：{{ storeInfo?.stock + storeInfo?.unit_name }}</span>
          <span>销量：{{ storeInfo?.fsales }}</span>
        </template>
      </van-cell>
      <!-- 3.商品规格选择区域 -->
      <van-cell
        class="sku_window"
        is-link
      >
        <template #title>
          <span>已选择：</span>
        </template>
      </van-cell>
    </van-tab>
    <van-tab title="评价" class="comment">
      <van-cell-group>
        <!-- 总体评价 -->
        <van-cell
          is-link
          title="用户评价"
          value="100%好评率"
          to="/"
        ></van-cell>
        <!-- 评价列表 -->
        <van-cell class="comment-item">
          <!-- 用户信息 -->
          <div class="user-info">
            <img src="@/assets/R-C.jpg" alt="">
            <span class="nickname">老杨同志</span>
            <!-- 星星 -->
            <van-rate v-model="value" readonly size="10px"/>
          </div>
          <!-- 商品信息与时间 -->
          <p class="time">1 小时前 6G,128G</p>
          <!-- 评价内容 -->
          <p class="comment-content">使用起来非常流畅</p>
          <!-- 图片列表 -->
          <ul class="picture">
            <li><img src="@/assets/rw-1.jpg" alt=""></li>
            <li><img src="@/assets/rw-1.jpg" alt=""></li>
            <li><img src="@/assets/rw-1.jpg" alt=""></li>
            <li><img src="@/assets/rw-1.jpg" alt=""></li>
            <li><img src="@/assets/rw-1.jpg" alt=""></li>
          </ul>
        </van-cell>
      </van-cell-group>
    </van-tab>
    <van-tab title="推荐">推荐</van-tab>
    <van-tab title="详情">详情</van-tab>
  </van-tabs>
</template>

<script setup>
import { getProductDetails } from '@/api/products'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core';
import router from '../../router';

const value = ref(5)
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
    router.push({
      name: 'home'
    })
    return
  }
  productDetails.value = data.data
}
initProductDetails()
// 存储商品数据
const storeInfo = computed(() => {
  return productDetails.value.storeInfo
})
// 轮播图数据
const sliderImage = computed(() => {
  return storeInfo.value?.slider_image
})
// 评价数据
// 1).好评数
const replyCount = computed(() => productDetails.value.replyCount || 0)
const replyInfo = computed(() => `用户评价(${ replyCount.value })`)
// 2).好评率
const replyChance = computed(() => productDetails.value.replyChance || 0)
const replyRate = computed(() => replyChance.value + '%好评率')
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
   .my-swipe .van-swipe-item {
    img {
      width: 375px;
    }
  }
  // 商品信息
  .productHeader {
    margin-bottom: 10px;
    // title 插槽部分
    .van-cell__title {
      .price {
        span {
          font-size: 24px;
          font-weight: 700;
        }
        .share {
          float: right;
        }
      }
      .title {
        font-size: 16px;
        font-weight: 700;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
        margin: 5px 0 10px;
      }
    }
    // label 插槽
    .van-cell__label {
      display: flex;
      justify-content: space-between;
    }
  }
  // 商品规格区域
  .sku_window {
    margin-bottom: 10px;
  }
  // 商品评价区域
  .comment {
    margin-bottom: 10px;
    .comment-item {
      padding: 0 15px 20px;
      .user-info {
        font-size: 13px;
        display: flex;
        align-items: center;
        padding: 8px 0;
        img {
          width: 28px;
          height: 28px;
        }
        .nickname {
          padding: 0 10px 0 6px;
        }
      }
      .time {
        font-size: 12px;
        color: #82848f;
        padding: 5px 0;
      }
      .comment-content {
        font-size: 13px;
        margin-bottom: 10px;
      }
      .picture {
        li {
          float: left;
          padding-right: 7px;
          img {
            width: 78px;
            height: 78px;
          }
        }
      }
    }
  }
}
</style>