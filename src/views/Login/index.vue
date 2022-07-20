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
        v-if="state.isPassword"
        v-model="state.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        autocomplete
      />
      <van-field
        v-else
        v-model="state.captcha"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="sendCaptcha"
            :disabled="state.isSend"
          >{{ state.currentText }}</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        @click="submitHandle"
      >
        登录
      </van-button>
      <span
        class="change-button"
        @click="changeMode"
        v-text="state.changeText"
      ></span>
    </div>
  </van-form>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
import { 
  getVerfiCode,
  getVerify,
  loginByPassword,
  loginByCaptcha
  } from '@/api/user'
import { Toast } from 'vant'
import { useCountDown } from '@vant/use'

const store = useStore()
const router = useRouter()
const route = useRoute()
const state = reactive({
  username: '',
  password: '',
  captcha: '',
  // 登录模式
  loginMode: 'password',
  isPassword: computed(() => state.loginMode === 'password'),
  // 切换文本
  changeText: computed(() => state.isPassword ? '快速登录' : '密码登录'),
  // 存储发送状态，用于控制显示效果
  isSend: false,
  // 倒计时实例
  countDown: null,
  // 根据状态设置要显示的内容
  currentText: computed(() => state.isSend ? state.countDown.seconds : '发送验证码')
})
// 切换登录模式
function changeMode () {
  state.loginMode = state.isPassword ? 'captcha' : 'password'
  state.password = ''
  state.captcha = ''
}

// 验证码处理 
// 1.发送请求
const sendCaptcha = async() => {
  // 手机号校验
  if(!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(state.username)) {
    return Toast.fail('请检查用户名')
  }
  // 发送校验请求
  const { data: v1 } = await getVerfiCode()
  if (v1.status !== 200) {
    return Toast.fail('校验请求失败')
  }

  // 发送验证码请求
  const { data: v2 } = await getVerify({
    type: 'login',
    phone: state.username,
    key: v1.data.key
  })
  if (v2.status !== 200) {
    return Toast.fail('发送验证码请求失败')
  }

  // 改变发送按钮的状态
  const countDown = useCountDown({
    time: 60 * 1000,
    onFinish ()  {
      state.isSend = false
    }
  })

  // 开始倒计时
  countDown.start();
  state.countDown = countDown.current
  // 更改发送状态
  state.isSend = true
}

// 登录处理
const submitHandle = async () => {
  // 用户名检测
  const username = state.username.trim()
  if (username === '') {
    return Toast.fail('请检查用户名')
  }
  // 统一存储结果
  let data = ''
  if (state.isPassword) {
    // 密码模式
    const password = state.password.trim()
    if (password === '') {
      return Toast.fail('请检查密码')
    }
    ({ data } = await loginByPassword({
      account: username,
      password
    }))

  } else {
    // 验证码模式
    const captcha = state.captcha.trim()
    if (captcha === '') {
      return Toast.fail('请检查手机号')
    }
    ({ data } = await loginByCaptcha({
      phone: username,
      captcha
    }))
  }
  // 接收响应数据
  if (data.status !== 200) {
    return Toast.fail(data.msg)
  }
  // 成功时，通过 store 的 mutation 方法存储数据
  store.commit('user/setUser', data.data.token)
  // 跳转页面
  router.push(route.query.redirect ?? '/user')
}
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