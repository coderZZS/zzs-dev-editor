/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-06-21 10:55:34
 * @LastEditTime: 2022-10-24 14:10:01
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import Antd from 'ant-design-vue'
import './index.css'
import 'ant-design-vue/dist/antd.css'
// import ColorPicker from '@/components/common/ColorPicker'
// import ImageProcesser from '@/components/common/ImageProcesser'

const app = createApp(App)

// app.component(ColorPicker.name, ColorPicker)
// app.component(ImageProcesser.name, ImageProcesser)
console.log('环境', import.meta.env, import.meta);

app.use(pinia)
app.use(router)
app.use(Antd)

app.mount('#app')
