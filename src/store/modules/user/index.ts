/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-06-21 17:54:24
 * @LastEditTime: 2022-09-08 09:48:27
 */
import { defineStore } from 'pinia'
import piniaPersistConfig from '@/store/config/piniaPersistConfig'
import { message } from 'ant-design-vue'

export interface UserStore {
    userInfo: UserInfo
}
interface UserInfo {
    isLogin: boolean
    userName: string
}

const useStore = defineStore('userInfo', {
    state: (): UserStore => {
        return {
            userInfo: {
                isLogin: false,
                userName: '',
            },
        }
    },
    getters: {
        getUserInfo: (state) => state.userInfo,
    },
    actions: {
        setUserInfo(data: UserInfo) {
            this.userInfo = data
        },
        login() {
            this.setUserInfo({ userName: '张三', isLogin: true })
            message.success('登录成功')
        },
        logout() {
            this.userInfo.isLogin = false
            message.success('退出登录成功')
        },
    },
    persist: piniaPersistConfig('userInfo'),
})

export default useStore()
