/*
 * @Descripttion: 配置pinia
 * @Author: BZR
 * @Date: 2022-06-21 16:55:26
 * @LastEditTime: 2022-09-07 17:40:28
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建实例
const pinia = createPinia()

// 持久化
pinia.use(piniaPluginPersistedstate)

export default pinia
