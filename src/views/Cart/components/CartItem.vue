<template>
  <div class="cart-item">
    <!-- 状态选框 -->
    <van-checkbox v-model="itemChecked" checked-color="#ee0a24"></van-checkbox>
    <!-- 右侧点击跳转 -->
    <div class="link" @click="handleRouter">
      <img :src="itemData.image" alt="">
      <div class="info">
        <p class="title" v-text="itemData.title"></p>
        <p class="detail">
          <span class="price">￥{{ itemData.price }}</span>
          <view>
            <van-stepper
              max="10"
              button-size="26px"
              v-model="itemCount"
              @change="stepperChange"
            />
          </view>
        </p>
        <p>
          <span class="del">删除</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter()
const store = useStore()

const { itemData } = defineProps({
  itemData: {
    type: Object,
    required: true
  }
})

// 点击商品跳转
const handleRouter = () => {
  router.push({
    name: 'product',
    params: {
      productId: itemData.productId
    }
  })
}

// 商品勾选
const itemChecked = computed({
  get: () => itemData.checked,
  set: newChecked => {
    //console.log(newChecked)
    store.commit('checkedChage', { checked: newChecked, id: itemData.id })
    store.getters.checkedItems
  }
})
const stepperChange = () => {
  event.stopPropagation()
  console.log('阻止冒泡')
}

// 个数变化处理
const itemCount = computed({
  get: () => parseInt(itemData.num),
  set (newCount) {
    console.log(newCount)
    // 通过 store 中 action 处理
    store.dispatch('countChange', { count: newCount, id: itemData.id})
  }
})

const checked = ref(true)
const num = ref(1)
</script>

<style lang="scss" scoped>
.cart-item {
  height: 90px;
  padding: 10px 20px;
  display: flex;
  background-color: #fff;
  margin-bottom: 1px;
  .link {
    width: 100%;
    display: flex;
    img {
      width: 88px;
      height: 88px;
      align-self: center;
    }
    .info {
      font-size: 14px;
      .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 1;
        margin: 5px 0 15px;
      }
      .detail {
        margin-bottom: 10px;
        .price {
          font-size: 16px;
          color: #f2270c;
        }
        .van-stepper {
          float: right;
        }
      }
      .del {
        float: right;
      }
    }
  }
  
}
</style>