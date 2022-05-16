<template>
  <van-cell-group class="comment">
    <!-- 总体评价情况 -->
    <van-cell title="商品评价" :value="`好评率：${ state.replyChance }%`"></van-cell>
    <!-- 标签切换区域 -->
    <van-cell class="tags">
      <van-button
        size="small"
        :class="{ active: state.isSum }"
        @click="tagHandle('0')"
      >全部({{ state.sumCount }})</van-button>
      <van-button
        size="small"
        :class="{ active: state.isGood }"
        @click="tagHandle('1')"
      >好评({{ state.goodCount }})</van-button>
      <van-button
        size="small"
        :class="{ active: state.isIn }"
        @click="tagHandle('2')"
      >中评({{ state.inCount }})</van-button>
      <van-button
        size="small"
        :class="{ active: state.isPoor }"
        @click="tagHandle('3')"
      >差评({{ state.poorCount }})</van-button>
    </van-cell>
    <!-- 评价列表 -->
    <div v-if="state.hasComment">
      <comment-item
        v-for="item in state.commentList"
        :key="item.id"
        :reply="item"
      ></comment-item>
    </div>
    <!-- 没有评论时，进行展示提示页面 -->
    <van-empty
      v-else
      description="暂时没有评论奥~"
    ></van-empty>
  </van-cell-group>
</template>

<script setup>
import { getCommentCount, getCommentByTag } from '@/api/products'
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import CommentItem from '@/components/CommentItem.vue'

const { productId } = defineProps({
  productId: {
    type: Object,
    required: true
  }
})

// 存储评论的数据
const state = reactive({
  // 存储信息个数
  commentCounts: {},
  // 通过计算属性
  goodCount: computed(() => state.commentCounts?.good_count || 0),
  poorCount: computed(() => state.commentCounts?.poor_count || 0),
  inCount: computed(() => state.commentCounts?.in_count || 0),
  sumCount: computed(() => state.commentCounts?.sum_count || 0),
  replyChance: computed(() => state.commentCounts?.reply_chance || ''),
  // 存储评价信息
  commentList: [],
  // 控制显示的评价状态
  active: '0',
  // 通过计算属性，来进行不同类型状态的判断
  isSum: computed(() => state.active === '0'),
  isGood: computed(() => state.active === '1'),
  isIn: computed(() => state.active === '2'),
  isPoor: computed(() => state.active === '3'),
  // 判断是否存在评论
  hasComment: computed(() => state.commentList.length || 0)
})

//  请求商品信息
async function initReplyData () {
 const { data } = await getCommentCount(productId)
 if (data.status !== 200) {
   return
 }
 state.commentCounts = data.data
}
initReplyData()
// 请求指定类型的评价
async function initCommentByTag (type) {
  const { data } = await getCommentByTag(productId, { type })
  if (data.status !== 200) {
    return
  }
  state.commentList = data.data
  console.log(data)
}
// 0 - 全部，1 - 好评， 2 - 中评， 3 - 差评
initCommentByTag('0')

// 切换类别点击事件
function tagHandle(tarKey) {
  state.active = tarKey
  initCommentByTag(tarKey)
}
</script>

<style lang="scss" scoped>
.tags {
  .van-button {
    border-radius: 15px;
    margin-right: 10px;
  }
  .active {
    background-color: #fbc546;
  }
}
</style>