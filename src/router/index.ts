/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-06-21 11:38:26
 * @LastEditTime: 2022-06-21 14:32:39
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import homeRouter from '../views/home/router'
import userRouter from '../views/user/router'

const routes = [
    ...homeRouter,
    ...userRouter,
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router