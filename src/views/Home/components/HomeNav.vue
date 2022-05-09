<template>
  <div class="home-nav">
    <!-- logo 区域 -->
    <img src="@/assets/logo.png" alt="">
    <!-- 搜索区域 -->
    <div class="search">
      <van-icon name="search" size="0.5rem"></van-icon>
    </div>
    <!-- 分类跳转 -->
    <van-icon name="wap-nav"></van-icon>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.home-nav{
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-right: 10px;
  box-sizing: border-box;
  z-index: 100;
  img {
    width: 100px;
    padding: 0 10px;
  }
  .search {
    background-color: #f7f7f7;
    width: 100%;
    border-radius: 25px;
    padding-left: 12px;
    margin-right: 10px;
  }
}
</style>