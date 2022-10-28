<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-10-25 16:39:31
 * @LastEditTime: 2022-10-27 10:34:45
-->
<template>
    <div ref="wapper" class="inlone_edit" @click="showInput">
        <input v-if="isEditing" ref="inputRef" v-model="innerValue" type="text" placeholder="文本不能为空" class="inlone_edit__input" />
        <slot v-else :text="innerValue">
            <span>{{ innerValue }}</span>
        </slot>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useKeyPress from '@/hooks/useKeyPress'
import useClickOutside from '@/hooks/useClickOutside'
import { nextTick } from 'process'
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    elementId: {
        type: String,
        required: true,
    },
})
const innerValue = ref(props.modelValue)
watch(
    () => props.modelValue,
    (val) => {
        innerValue.value = val
    }
)
const isEditing = ref(false)
const emit = defineEmits(['changeModelValue'])
let defaultText = ''
watch(isEditing, (isEditing) => {
    if (isEditing) {
        defaultText = innerValue.value
    }
})

useKeyPress('Enter', () => {
    if (isEditing.value) {
        emit('changeModelValue', {
            id: props.elementId,
            key: 'layerName',
            value: innerValue.value,
        })
        isEditing.value = false
    }
})

useKeyPress('Escape', () => {
    if (isEditing.value) {
        innerValue.value = defaultText
        isEditing.value = false
    }
})

const inputRef = ref<null | HTMLInputElement>(null)
const showInput = async () => {
    isEditing.value = true
    await nextTick(() => null)
    inputRef.value?.focus()
}
const wapper = ref<null | HTMLElement>(null)
const isOutside = useClickOutside(wapper)
watch(isOutside, (flag) => {
    if (flag) {
        isEditing.value = false
        emit('changeModelValue', {
            id: props.elementId,
            key: 'layerName',
            value: innerValue.value,
        })
    }
})
</script>

<style scoped lang="scss">
@include b(inlone_edit) {
    @include e(input) {
        @apply w-[60px];
    }
}
</style>
