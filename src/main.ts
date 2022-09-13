/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-06-21 10:55:34
 * @LastEditTime: 2022-09-13 15:46:03
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import Antd from 'ant-design-vue'
import './index.css'
import 'ant-design-vue/dist/antd.css'
import ColorPicker from '@/components/common/ColorPicker'

const app = createApp(App)

app.component(ColorPicker.name, ColorPicker)
app.use(router)
app.use(pinia)
app.use(Antd)
app.mount('#app')
