import { createRouter, createWebHashHistory } from 'vue-router'

// 路由规则配置
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart/index.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/Category/index.vue')
  },
  {
    path: '/category-detail',
    name: 'category-detail',
    component: () => import('@/views/CategoryDetail/index.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order/index.vue')
  },
  {
    path: '/order-confirm',
    name: 'order-confirm',
    component: () => import('@/views/OrderConfirm/index.vue')
  },
  {
    path: '/order-detail',
    name: 'order-detail',
    component: () => import('@/views/OrderDetail/index.vue')
  },
  {
    path: '/Pay',
    name: 'Pay',
    component: () => import('@/views/Pay/index.vue')
  },
  {
    path: '/Product',
    name: 'Product',
    component: () => import('@/views/Product/index.vue')
  },
  {
    path: '/Recommend',
    name: 'Recommend',
    component: () => import('@/views/Recommend/index.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('@/views/Search/index.vue')
  },
  {
    path: '/User',
    name: 'User',
    component: () => import('@/views/User/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound/index.vue')
  }
]

// 创建 router 实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
