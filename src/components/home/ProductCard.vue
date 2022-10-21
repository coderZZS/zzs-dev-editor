<!--
 * @Descripttion: 卡片小组件
 * @Author: BZR
 * @Date: 2022-09-07 11:39:31
 * @LastEditTime: 2022-10-20 14:27:36
-->
<template>
    <div class="product_card">
        <div class="product_card__cover">
            <img :src="props.cover" alt="" />
            <div class="product_card__cover--mask">
                <a-button type="primary">使用该模板</a-button>
            </div>
        </div>
        <div class="product_card__info">
            <div class="product_card__info--title">{{ props.title }}</div>
            <div class="product_card__info--detail">
                <div class="left">
                    <span>作者：</span>
                    <span>{{ props.username }}</span>
                </div>
                <div class="right">{{ props.readCount }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import img from '@/assets/zhendong.png'
const props = defineProps({
    cover: {
        type: String,
        default: img,
    },
    title: {
        type: String,
        default: '作品标题',
    },
    username: {
        type: String,
        default: '匿名作者',
    },
    readCount: {
        type: [String, Number],
        default: 0,
    },
})
</script>

<style scoped lang="scss">
@include b(product_card) {
    border: 1px solid #e5e5e5;
    @apply mb-[30px] rounded overflow-hidden h-[420px] flex flex-col;
    @include e(cover) {
        @apply h-[334px] w-[100%] relative;
        &:hover {
            .product_card__cover--mask {
                top: 0;
            }
        }
        img {
            @apply block  h-[100%] w-[100%];
        }
        @include m(mask) {
            @apply bg-slate-900/[0.5] absolute left-0 top-[-420px] flex items-center justify-center transition-all duration-300 w-[100%] h-[100%];
        }
    }
    @include e(info) {
        @apply px-[10px] flex flex-col justify-center flex-1;
        @include m(title) {
            border-bottom: 1px solid #e5e5e550;
            @apply font-bold text-xl py-2;
        }
        @include m(detail) {
            @apply flex-1 flex justify-between items-center;
        }
    }
}
</style>
