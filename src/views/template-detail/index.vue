<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-07 10:37:04
 * @LastEditTime: 2022-09-07 17:53:31
-->
<template>
    <div class="template_detail">
        <a-layout>
            <a-layout-header>
                <Header />
            </a-layout-header>
            <a-layout-content>
                <div class="template_detail__content">
                    <!-- 左边图片 -->
                    <section class="template_detail__content--cover">
                        <img :src="props.cover" alt="" />
                    </section>
                    <!-- 右边操作 -->
                    <section class="template_detail__content--handle">
                        <div class="title">{{ props.title }}</div>
                        <div class="product-name">{{ props.productName }}</div>
                        <div class="product-info">
                            <img :src="props.headImg" alt="" />
                            <span>该模板由</span>
                            <span class="font-bold">{{ props.username }}</span>
                            <span>创作</span>
                        </div>
                        <div class="qr-code">
                            <span>扫一扫，手机预览</span>
                            <img :src="props.qrCode" alt="" />
                        </div>
                        <div class="handle">
                            <router-link :to="{ name: 'editor' }">
                                <a-button type="primary" shape="round" size="size">使用模板</a-button>
                            </router-link>
                            <a-button shape="round" class="ml-[10px]" size="size">下载图片海报</a-button>
                        </div>
                    </section>
                </div>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script setup lang="ts">
import img from '@/assets/zhendong.png'
import Header from '../../components/common/Header.vue'
import { defineProps } from 'vue'
const props = defineProps({
    cover: {
        type: String,
        default: img,
    },
    title: {
        type: String,
        default: '作品标题',
    },
    productName: {
        type: String,
        default: '作品名称',
    },
    username: {
        type: String,
        default: '作者名称',
    },
    headImg: {
        type: String,
        default: img,
    },
    qrCode: {
        // 二维码
        type: String,
        default: img,
    },
})
</script>

<style scoped lang="scss">
@include b(template_detail) {
    @apply h-[100%];
    @include b(ant-layout) {
        @apply h-[100%];
    }
    @include e(content) {
        @include box-center(center, center);
        @apply flex w-[100%] h-[100%];
        @include m(cover) {
            @apply w-[420px] h-[592px];
            img {
                @apply w-[100%] h-[100%] block;
            }
        }
        @include m(handle) {
            @apply h-[592px] ml-[30px] flex flex-col justify-start;
            @include b(title) {
                @apply text-[32px] font-bold;
            }
            @include b(product-name) {
                @apply text-[16px] my-[10px];
            }
            @include b(product-info) {
                @apply text-[16px];
                img {
                    @apply rounded-full inline-block w-[32px] h-[32px] mr-[10px];
                }
            }
            @include b(qr-code) {
                @apply text-[16px] my-[10px];
                img {
                    @apply block w-[200px] h-[200px];
                }
            }
            @include b(handle) {
                @apply text-[16px] my-[10px];
            }
        }
    }
}
</style>
