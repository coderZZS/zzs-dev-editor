<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-08 15:55:10
 * @LastEditTime: 2022-09-13 18:14:01
-->
<template>
    <div
        class="edit-warpper"
        :class="{
            'active-component': activeComponentId === props.id,
        }"
        @click="onItemClick(props.id)"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import { editorStore } from '@/store/modules'
const activeComponentId = computed(() => editorStore.currentElement)
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
})
const emit = defineEmits(['onItemClick'])

const onItemClick = (id: string) => {
    emit('onItemClick', id)
}
</script>

<style scoped lang="scss">
@include b(active-component) {
    border: 1px dashed #e5e5e5;
}
</style>
