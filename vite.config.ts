/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-06-21 10:55:34
 * @LastEditTime: 2022-11-07 17:50:25
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
            '/tpi': {
                target: 'http://127.0.0.1:3000/',
                // target: 'http://43.138.46.80:8081/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/tpi/, ''),
                ws: true,
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
