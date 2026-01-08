import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 1. 引入Element Plus（全局）
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 2. 引入Axios（可选全局挂载）
import axios from 'axios'

const app = createApp(App)

// 全局挂载Axios（组件内可直接用this.$axios，setup中也可单独import）
app.config.globalProperties.$axios = axios
// 可选：配置Axios基础接口地址
axios.defaults.baseURL = '/api'

// 注册插件
app.use(router)
app.use(ElementPlus)

app.mount('#app')
