/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-06-21 17:54:24
 * @LastEditTime: 2022-06-22 09:47:40
 */
import { defineStore } from 'pinia'
import piniaPersistConfig from '@/store/config/piniaPersistConfig'

const useStore = defineStore('common', {
    state: () => {
        return {
            count: 0
        }
    },
    getters: {
        getCount: state => state.count
    },
    actions: {
        setCount () {
            this.count++
        }
    },
    persist: piniaPersistConfig('common')
})

export default useStore()