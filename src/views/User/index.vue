<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <img :src="userAvatar" alt="">
      <div class="user-info">
        <div class="user-name" v-text="username"></div>
        <div class="user-id" v-text="userId"></div>
      </div>
      <van-icon size="20" name="setting-o"></van-icon>
    </div>
    <!-- 主体菜单区域 -->
    <div class="main">
      <van-cell-group inset class="user-detail">
        <van-grid :border="false">
          <van-grid-item icon="photo-o" :text="collectCount">
            <template #icon>收藏</template>
          </van-grid-item>
          <van-grid-item icon="photo-o" :text="integral">
            <template #icon>积分</template>
          </van-grid-item>
          <van-grid-item icon="photo-o" :text="couponCount">
            <template #icon>优惠券</template>
          </van-grid-item>
          <van-grid-item icon="photo-o" :text="now_money">
            <template #icon>余额</template>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="订单中心" value="查看全部" is-link to="/order"/>
        <van-grid :column-num="5" :border="false">
          <van-grid-item icon="bill-o" text="待付款" />
          <van-grid-item icon="tosend" text="待发货" />
          <van-grid-item icon="logistics" text="待收货" />
          <van-grid-item icon="comment-o" text="待评价" />
          <van-grid-item icon="sign" text="已完成" />
        </van-grid>
      </van-cell-group>
    </div>
    <!-- 公共底部 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script setup>
import LayoutFooter from '@/components/LayoutFooter.vue';
import { getUserInfo } from '@/api/user'
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';

// 数据存储
const userData = ref({})
// 用户头像 () => userData.value?.avatar || 
const userAvatar = 'https://tse3-mm.cn.bing.net/th/id/OIP-C.ocsTpQAkdFx6xxYEe2Fn6wAAAA?pid=ImgDet&rs=1'
// 用户昵称
const username = computed(() => userData.value?.nickname || '默认名称')
// 用户 id 
const userId = computed(() => 'ID: ' + (userData.value?.uid || ''))

// 用户详细信息
const collectCount = computed(() => userData.value?.collectCount?.toString() || '')
const integral = computed(() => userData.value?.integral?.toString() || '')
const couponCount = computed(() => userData.value?.couponCount?.toString() || '')
const now_money = computed(() => userData.value?.now_money?.toString() || '')


// 初始化用户数据
const initUserInfo = async () => {
  const { data } = await getUserInfo()
  if (data.status !== 200) {
    return
  }
  userData.value = data.data
}
initUserInfo()
</script>

<style lang="scss" scoped>
.container {
  height: 600px;
  padding: 15px 0;
  background: radial-gradient(circle at 50% -10%, #FBC546 72%, #F6F7F9 72%) #f6f7f9 0 -300px no-repeat;
  .header {
    padding: 0 15px 15px;
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .user-name {
        font-size: 14px;
        font-weight: 700;
        padding: 12px 0;
      }
      .user-id {
        font-size: 10px;
      }
    }
  }
  .main {
    .van-cell-group {
      // 给每个卡片底部设置间距
      margin-bottom: 10px;
    }
    // 用户账户信息卡片样式
    .user-detail {
      font-size: 14px;
      .van-cell {
        padding: 0;
        // 避免无内容塌陷
        min-height: 74px;
      }
    }
  }
}
</style>