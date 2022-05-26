<template>
  <div class="cart-item">
    <!-- 状态选框 -->
    <van-checkbox v-model="checked" checked-color="#ee0a24"></van-checkbox>
    <!-- 右侧点击跳转 -->
    <div class="link">
      <img src="https://shop.fed.lagounews.com/uploads/attach/2021/07/20210719/51f1a4bb83d1d95dff976b0928287d81.jpg" alt="">
      <div class="info">
        <p class="title">华为HUAWEI MatePad Pro 10.8英寸2021款</p>
        <p class="detail">
          <span class="price">￥1240</span>
          <van-stepper
            max="10"
            button-size="26px"
            v-model="num"
          />
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