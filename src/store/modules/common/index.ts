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
            count: 0,
            testImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbbs.leyuz.net%2Fuploads%2F202008%2F04%2F15965036454524.jpeg&refer=http%3A%2F%2Fbbs.leyuz.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666080077&t=286a473b6b1309a048a493ad858b9f1d'
        }
    },
    getters: {
        getCount: state => state.count,
        imgUrl: state => state.testImg
    },
    actions: {
        setCount () {
            this.count++
        }
    },
    persist: piniaPersistConfig('common')
})

export default useStore()