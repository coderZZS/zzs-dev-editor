<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-13 14:24:59
 * @LastEditTime: 2022-10-20 15:50:48
-->
<template>
    <div class="zzs-color-picker">
        <div class="native-color-container">
            <input type="color" :value="props.value" @input="onChange(($event.target as HTMLInputElement).value)" />
        </div>
        <ul class="picked-color-list">
            <li v-for="(item, key) in props.colors" :key="key" :class="`item-${key}`" @click="onChange(item)">
                <div v-if="item.startsWith('#')" :style="{ background: item }" class="picked-color-list__color-item"></div>
                <div v-else class="picked-color-list__color-item transparent-back"></div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
// const defaultColors = ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', '']
const emit = defineEmits(['change'])
const props = defineProps({
    value: {
        type: String,
        default: '',
    },
    colors: {
        type: Array as PropType<string[]>,
        default: () => ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', ''],
    },
})

const onChange = (color: string) => {
    emit('change', color)
}
</script>

<script lang="ts">
export default {
    name: 'ColorPicker',
}
</script>

<style scoped lang="scss">
@include b(zzs-color-picker) {
    @apply flex items-center;
    @include b(picked-color-list) {
        @apply flex mb-0;
        @include e(color-item) {
            @apply w-[20px] h-[20px] bg-white ml-[10px];
            border: 1px dashed #000;
        }
        @include b(transparent-back) {
            border: 1px dashed #e5e5e5;
        }
    }
}
</style>
