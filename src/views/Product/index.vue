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
        @click="handlePopup"
      >
        <template #title>
          <span>已选择：{{ sku }}</span>
        </template>
      </van-cell>
      <!-- 弹出层 -->
      <van-popup
        v-model:show="specState.show"
        position="bottom"
      >
        <van-cell-group>
          <!-- 头部商品信息 -->
          <van-cell class="popup-header">
            <img :src="specDetail?.image" alt="">
            <div class="info">
              <p class="title" v-text="storeInfo?.store_name"></p>
              <p class="price">￥{{ specDetail?.price }}</p>
              <p class="stock">库存：{{ specDetail?.stock }}</p>
            </div>
          </van-cell>
          <!-- 规格区域 -->
          <van-cell 
            class="spec"
            v-for="(attr, specIndex) in productAttr"
            :key="attr.id"
          >
            <p v-text="attr.attr_name"></p>
            <span
              class="tag"
              v-for="tag in attr.attr_values"
              :key="tag"
              :class="{ active: specState.spec[specIndex] === tag}"
              v-text="tag"
              @click="handleTagChange(tag, specIndex)"
            ></span>
          </van-cell>
          <!-- 数量 -->
          <van-cell title="数量">
            <van-stepper v-model="specState.buyCount" :max="specDetail?.stock"></van-stepper>
          </van-cell>
        </van-cell-group>
      </van-popup>
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
        <comment-item 
          :reply="reply"
        />
      </van-cell-group>
    </van-tab>
    <van-tab title="推荐">
      <van-cell class="recommend">
        <p class="title">推荐商品</p>
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="item in goodsList"
            :key="item.id"
            :to="{
              name: 'product',
              params: {
                productId: item.id
              }
            }"
          >
            <van-image :src="item.image" />
            <p v-text="item.store_name"></p>
            <span>￥{{ item.price }}</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </van-tab>
    <van-tab title="详情">
      <div 
        class="description"
        v-html="storeInfo?.description"
      ></div>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { getProductDetails } from '@/api/products'
import { reactive, ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core';
import router from '../../router';

import CommentItem from '../../components/CommentItem.vue'
import { onBeforeRouteUpdate } from 'vue-router';

const value = ref(5)
const { productId } = defineProps({
  productId: {
    type: String,
    required: true
  }
})
// 加载商品数据
const productDetails = ref({})
const initProductDetails = async (productId) => {
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
  // 初始化规格数据
  initSpec(data.data.productAttr)
}
initProductDetails(productId)
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
// 3).好评信息
const reply = computed(() => productDetails.value.reply || {})
// 4.)推荐商品信息
const goodsList = computed(() => productDetails.value.good_list)
// 通过导航守卫监听路由变化，并请求对应的新商品数据
onBeforeRouteUpdate((to) => {
  // 清除旧数据
  productDetails.value = {}
  // 回到顶部
  document.body.scrollTo = 0
  document.documentElement.scrollTo = 0
  // 根据新 id 请求商品数据
  initProductDetails(to.params.productId)
})

// 规格弹出层处理
// 1).规格数据处理
const productAttr = computed(() => productDetails.value.productAttr)
const productValue = computed(() => productDetails.value?.productValue)
const specState = reactive({
  show: false,
  spec: [],
  buyCount: 0
})
// 2).sku 数据处理
const sku = computed(() => specState.spec.toString())
//  根据 sku 获取对应商品信息
const specDetail = computed(() => productValue.value?.[sku.value])

const handlePopup = () => {
  specState.show = !specState.show
}
// 初始化默认选中数据
const initSpec = (spec) => {
  specState.spec = spec.map(item => item.attr_values[0])
}
// 规格标签点击事件
const handleTagChange = (tag, specIndex) => {
  specState.spec[specIndex] = tag
}
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
  // 推荐商品区域
  .recommend {
    margin-bottom: 10px;
    .title {
      font-size: 16px;
      font-weight: 700;
      padding: 5px 0;
    }
    .van-grid-item {
      img {
        width: 107px;
        height: 107px;
      }
      p {
        padding: 0 3px;
        box-sizing: border-box;
        font-weight: 700;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
      }
      span {
        color: #f2270c;
        font-size: 12px;
        font-weight: 700;
        align-self: flex-start;
      }
    }
    .van-grid-item__content {
      padding: 0;
    }
  }
  // 商品描述区域
  .description {
    width: 100%;
    img {
      width: 100%;
    }
  }
  // 弹出层
  .van-popup {
    border-radius: 10px 10px 0 0;
    max-height: 70%;
    margin-bottom: 50px;
    .popup-header {
      .van-cell__value {
        display: flex;
        img {
          width: 75px;
          height: 75px;
          align-self: center;
        }
        .info {
          padding: 10px;
          .title {
            font-size: 16px;
            font-weight: 700;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 1;
          }
          .price {
            font-size: 16px;
            color: #f2270c;
          }
          .stock {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
    .spec {
      p {
        margin-bottom: 5px;
      }
      .tag {
        display: inline-block;
        min-width: 25px;
        padding: 0 12px;
        border: 1px solid #ccc;
        border-radius: 20px;
        margin-right: 10px;
        text-align: center;
        background: #f2f2f2;
      }
      .tag.active {
        border-color: #f2270c;
        color: #f2270c;
        background-color: #FCEDEB;
      }
    }
  }
}
</style>