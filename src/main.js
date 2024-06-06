import '@/styles/common.scss'
import persist from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'

import { lazyPlugin } from './directive'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(createPinia().use(persist))
app.use(router)
app.use(lazyPlugin)

app.mount('#app')
// 定义全局指令
// app.directive('img-lazy', {
//   mounted(el, binding) {
//     const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
//       if (isIntersecting) {
//         el.src = binding.value
//         stop()
//       }
//     })
//     // console.log(el, binding)
//   }
// })
