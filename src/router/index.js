import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/login'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/views/home/index.vue') },
        {
          path: '/category/:id',
          component: () => import('@/views/category/index.vue')
        },
        {
          path: '/product/:id',
          component: () => import('@/views/product/index.vue')
        },
        {
          path: '/subcategory/:id',
          component: () => import('@/views/SubCategory/index.vue')
        },
        {
          path: '/cart',
          component: () => import('@/views/cart/index.vue')
        },
        {
          path: '/order',
          component: () => import('@/views/order/index.vue')
        },
        {
          path: '/pay',
          component: () => import('@/views/pay/index.vue')
        },
        {
          path: '/user',
          component: () => import('@/views/user/index.vue')
        }
      ]
    },
    { path: '/login', component: () => import('@/views/login/index.vue') },
    { path: '/paycallback', component: () => import('@/views/pay/payBack.vue') }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

// 路由守卫
router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if (to.path === '/paycallback' && from.path !== '/order') return '/'
  if (to.path === '/home') return true
  if (
    // 检查用户是否已登录
    !userStore.userInfo.token &&
    // 避免无限重定向
    to.path !== '/login'
  ) {
    // 将用户重定向到登录页面
    ElMessage.warning('请先登录')
    return '/login'
  }
})

export default router
