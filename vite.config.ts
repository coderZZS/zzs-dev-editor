/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-06-21 10:55:34
 * @LastEditTime: 2022-09-16 16:38:51
 */
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    server: {
        port: 8888,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:7001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                ws: false,
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@/': resolve(__dirname, 'src/*'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
					@import "@/styles/settings/var.scss";
					@import "@/styles/tools/index.scss";
				`,
            },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        transformMode: {
            web: [/\.[jt]sx$/],
        },
    },
})
