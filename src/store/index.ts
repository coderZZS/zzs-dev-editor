/*
 * @Descripttion: 配置pinia
 * @Author: BZR
 * @Date: 2022-06-21 16:55:26
 * @LastEditTime: 2022-09-08 09:45:08
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { UserStore } from './modules/user'
import type { EditorProps } from './modules/editor'

// 创建实例
const pinia = createPinia()

// 持久化
pinia.use(piniaPluginPersistedstate)

export interface TemplateProps {
    id: number
    title: string
    coverImg: string
    author: string
    copiedCount: number
}
export interface GlobalDataProps {
    user: UserStore
    templatesProps: TemplateProps[]
    editor: EditorProps
}

export default pinia
