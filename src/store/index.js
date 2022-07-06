import { createStore } from 'vuex'
import { changeCartItemNum } from '@/api/cart'

export default createStore({
  state () {
    return {
      // 存储用户数据
      user: window.localStorage.getItem('USER_TOKEN'),
      // 存储购物车数据
      cartList: []
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      window.localStorage.setItem('USER_TOKEN', payload)
    },
    // 购物车功能
    addToCart (state, payload) {
      // payload 应该为包含 sku 相关信息的对象，具体信息参考 state.cartList 说明
      state.cartList.push(payload)
    },
    // 清除购物车数据
    clearCartList (state) {
      state.cartList = []
    },
    // 购物车勾选状态改变
    checkedChage (state, { id, checked }) {
      //const currentItem = state.cartList.find(item => item.id === id)
      const currentItem = state.cartList.find(item => item.id === id)
      currentItem.checked = checked
    },
    countChange (state, {id, count}) {
      state.cartList.find(item => item.id === id).count = count
    }
  },
  actions: {
    async countChange ({commit}, payload) {
      // 提交 mutation 数据
      commit('countChange', payload)
      // 发送请求
      const { data } = await changeCartItemNum({
        id: payload.id,
        number: payload.count
      })
      if (data.status !== 200) {
        return
      }
    }
  }
})