/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-06-21 11:38:26
 * @LastEditTime: 2022-09-07 10:23:32
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import homeRouter from '../views'

const routes = [...homeRouter]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
