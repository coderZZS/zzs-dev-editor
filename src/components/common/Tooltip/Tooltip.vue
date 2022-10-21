<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-13 16:41:58
 * @LastEditTime: 2022-10-20 14:27:06
-->
<template>
    <div class="tooltip_container">
        <div class="tooltip">
            <p class="tooltip__tips">
                {{ props.tips }}
            </p>
            <div class="tooltip__content" :class="{ active: isActive }" @click="onClick">
                {{ props.text }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
    value: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String,
        default: 'B',
    },
    tips: {
        type: String,
        default: '加粗',
    },
    activeValue: {
        type: String,
        default: 'bold',
    },
})
const isActive = ref(props.value)
const emit = defineEmits(['change'])
const onClick = () => {
    isActive.value = !isActive.value
    emit('change', isActive.value ? props.activeValue : '')
}
</script>

<style scoped lang="scss">
@include b(tooltip_container) {
    @apply h-[60px] w-[30px];
    @include b(tooltip) {
        @apply cursor-pointer relative box-border;
        &:hover {
            @include b(tooltip__tips) {
                @apply top-[100%] opacity-100;
            }
        }
        @include e(content) {
            @apply w-[30px] h-[30px] z-10 flex justify-center items-center bg-slate-300 rounded-full transition-all;
        }
        @include e(tips) {
            @apply h-[30px] top-0 left-0 absolute opacity-0 rounded-full
            text-white bg-slate-300 text-[10px] transition-all flex items-center justify-center px-[8px];
            width: v-bind('props.tips.length > 2 ? props.tips.length * 14 + "px" : "42px"');
        }
        @include b(active) {
            @apply bg-cyan-500 text-white font-bold;
        }
    }
}
</style>
