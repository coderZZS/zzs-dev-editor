/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-06-21 10:55:34
 * @LastEditTime: 2022-06-22 11:04:20
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './index.css'


const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
