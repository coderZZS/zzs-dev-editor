/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-07 10:22:19
 * @LastEditTime: 2022-09-07 16:01:10
 */
export default [
    {
        path: '/',
        name: 'home',
        component: () => import('./home/index.vue'),
    },
    {
        path: '/editor',
        name: 'editor',
        component: () => import('./editor/index.vue'),
    },
    {
        path: '/template-detail',
        name: 'template-detail',
        component: () => import('./template-detail/index.vue'),
    },
]
