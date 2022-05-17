<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <img class="logo" src="https://tse3-mm.cn.bing.net/th/id/OIP-C.ocsTpQAkdFx6xxYEe2Fn6wAAAA?pid=ImgDet&rs=1" alt="">
      <van-field
        v-model="state.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-model="state.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        autocomplete
      />
      <van-field
        v-model="state.captcha"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
      <span class="change-button">快速登录</span>
    </div>
  </van-form>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity"

const onSubmit = (values) => {
  console.log('submit', values)
}
const state = reactive({
  username: '',
  password: '',
  captcha: ''
})
</script>

<style lang="scss" scoped>
.van-form {
  display: flex;
  flex-direction: column;
  .logo {
    width: 150px;
    height: 150px;
    align-self: center;
    margin: 20px 100px 10px;
  }
  .change-button {
    display: block;
    text-align: center;
    font-size: 14px;
    color: #999;
    margin-top: 10px;
  }
}

</style>