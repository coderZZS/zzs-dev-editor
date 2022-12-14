/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-07 10:22:19
 * @LastEditTime: 2022-11-07 15:54:17
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
    {
        path: '/test',
        name: 'test',
        component: () => import('./test/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./login/index.vue'),
    },
]
