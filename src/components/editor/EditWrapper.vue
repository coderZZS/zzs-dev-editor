<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-08 15:55:10
 * @LastEditTime: 2022-10-31 15:49:06
-->
<template>
    <div
        ref="moveEle"
        class="edit-warpper"
        :class="{
            'active-component': activeComponentId === props.id,
        }"
        :style="styles"
        @mousedown="startMove"
        @click="onItemClick(props.id)"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { editorStore } from '@/store/modules'
import { pick } from 'lodash-es'
const activeComponentId = computed(() => editorStore.currentElement)
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    props: {
        type: Object,
        required: true,
    },
})
const emit = defineEmits(['onItemClick'])

const styles = computed(() => pick(props.props, ['position', 'top', 'left', 'width', 'height']))

const onItemClick = (id: string) => {
    emit('onItemClick', id)
}

const moveEle = ref<null | HTMLElement>(null)
const gap = {
    x: 0,
    y: 0,
}

const caculateMovePosition = (e: MouseEvent) => {
    const container = document.querySelector('.editor__center') as HTMLElement
    const left = e.clientX - gap.x - container.offsetLeft
    const top = e.clientY - gap.y - container.offsetTop
    return {
        left,
        top,
    }
}
const startMove = (e: MouseEvent) => {
    const element = moveEle.value
    if (!element) return
    const { left, top } = element.getBoundingClientRect()
    gap.x = e.clientX - left
    gap.y = e.clientY - top
    const handleMove = (e: MouseEvent) => {
        const { left, top } = caculateMovePosition(e)
        element.style.left = left + 'px'
        element.style.top = top + 'px'
    }
    const handleMoveEnd = (e: MouseEvent) => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleMoveEnd)
        const { left, top } = caculateMovePosition(e)
        editorStore.updateComponentProps({ left: left + 'px', top: top + 'px' }, props.id)
    }
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleMoveEnd)
}
</script>

<style scoped lang="scss">
@include b(active-component) {
    border: 1px dashed #e5e5e5;
}
</style>
