/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-06-21 11:42:30
 * @LastEditTime: 2022-08-10 10:14:08
 */
const router = [
    {
        path: '/',
        name: 'home',
        component: () => import('./home/index.vue')
    },
    {
        path: '/home/file',
        name: 'home-file',
        component: () => import('./file/index.vue')
    },
]

export default router