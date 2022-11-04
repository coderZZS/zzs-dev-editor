<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-08 15:55:5
 * @LastEditTime: 2022-11-04 10:58:43
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
        <div class="resizers">
            <div class="resizers-item resizers--top-left" @mousedown.stop="startResize('top-left')"></div>
            <div class="resizers-item resizers--top-right" @mousedown.stop="startResize('top-right')"></div>
            <div class="resizers-item resizers--bottom-left" @mousedown.stop="startResize('bottom-left')"></div>
            <div class="resizers-item resizers--bottom-right" @mousedown.stop="startResize('bottom-right')"></div>
        </div>
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
    const top = e.clientY - gap.y - container.offsetTop + container.scrollTop
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

type ResizeDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type Positions = {
    left: number
    right: number
    top: number
    bottom: number
}

type Shape = {
    width: number
    height: number
    left?: number
    top?: number
}
const caculateSize = (direction: ResizeDirection, e: MouseEvent, positions: Positions): Shape => {
    const { clientX, clientY } = e
    const { top, bottom, left, right } = positions
    const container = document.querySelector('.editor__center') as HTMLElement
    const rightWidth = clientX - left
    const leftWidth = right - clientX
    const bottomHeight = clientY - top
    const topHeight = bottom - clientY
    const topOffset = clientY - container.offsetTop + container.scrollTop
    const leftOffset = clientX - container.offsetLeft
    switch (direction) {
        case 'top-left':
            return {
                width: leftWidth,
                height: topHeight,
                left: leftOffset,
                top: topOffset,
            }
        case 'top-right':
            return {
                width: rightWidth,
                height: topHeight,
                top: topOffset,
            }
        case 'bottom-left':
            return {
                width: leftWidth,
                height: bottomHeight,
                left: leftOffset,
            }
        case 'bottom-right':
            return {
                width: rightWidth,
                height: bottomHeight,
            }
    }
}

const startResize = (direction: ResizeDirection) => {
    const currentElement = moveEle.value
    if (!currentElement) return
    const { left, top, right, bottom } = currentElement.getBoundingClientRect()
    const handleMove = (e: MouseEvent) => {
        const size = caculateSize(direction, e, { left, right, top, bottom })
        if (!size) return
        const { width: sw, height: sh, left: sl, top: st } = size
        const { style } = currentElement
        type UpdateData = {
            width: string
            height: string
            left?: string
            top?: string
        }
        const updateData: UpdateData = {
            width: sw + 'px',
            height: sh + 'px',
        }
        style.width = sw + 'px'
        style.height = sh + 'px'
        if (sl) {
            style.left = sl + 'px'
            updateData.left = sl + 'px'
        }
        if (st) {
            style.top = st + 'px'
            updateData.top = st + 'px'
        }
        editorStore.updateComponentProps(updateData, props.id)
    }
    const handleMouseup = () => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleMouseup)
    }
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleMouseup)
}
</script>

<style scoped lang="scss">
@include b(edit-warpper) {
    @include b(resizers) {
        @apply hidden;
    }
}
@include b(active-component) {
    @include b(resizers) {
        border: 2px solid #bed;
        @apply w-[100%] h-[100%] absolute left-0 top-0 block;
        @include b(resizers-item) {
            @apply absolute w-[5px] h-[5px] rounded-[5px] bg-[#bed];
        }
        @include m(top-left) {
            @apply left-[-5px] top-[-5px];
        }
        @include m(top-right) {
            @apply right-[-5px] top-[-5px];
        }
        @include m(bottom-left) {
            @apply left-[-5px] bottom-[-5px];
        }
        @include m(bottom-right) {
            @apply right-[-5px] bottom-[-5px];
        }
    }
}
</style>
