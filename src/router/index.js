import { createRouter, createWebHistory } from 'vue-router'

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
          path: '/category',
          component: () => import('@/views/category/index.vue')
        }
      ]
    },
    { path: '/login', component: () => import('@/views/login/index.vue') }
  ]
})

export default router
