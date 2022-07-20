const state = {
  // 存储购物车数据
  cartList: []
}
const getters = {
  // 筛选选中的选项
  checkedItems: state => {
    return state.cartList.filter(item => item.checked === true)
  },
  // 基于选中项目计算价格,保留 2 位
  totalPrice (state, getters) {
    return getters.checkedItems.reduce((sum, item) => sum + item.price * item.num, 0).toFixed(2)
  },
  // 全选状态按钮
  checkedAll (state, getters) {
    return state.cartList.length === getters.checkedItems.length
  }
}
const mutations = {
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
  },
  // 全选
  changeAll (state, { status }) {
    console.log(status)
    state.cartList.forEach(item => item.checked = status)
  }
}
import { changeCartItemNum } from '@/api/cart'
const actions = {
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

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}