import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(createPinia())
app.use(router)

app.mount('#app')
