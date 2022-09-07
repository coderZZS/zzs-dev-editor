/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-06-21 11:46:31
 * @LastEditTime: 2022-06-21 14:33:56
 */
const router = [
    {
        path: '/user/list',
        name: 'user-list',
        component: () => import('./list/index.vue')
    },
    {
        path: '/user/mine',
        name: 'user-mine',
        component: () => import('./mine/index.vue')
    }
]

export default router