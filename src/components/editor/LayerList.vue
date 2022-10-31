<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-10-25 14:12:16
 * @LastEditTime: 2022-10-31 15:25:38
-->
<template>
    <div class="layer_list">
        <Draggable v-model="editorStore.components" item-key="id">
            <template #item="{ element: layer }">
                <li :key="layer.id" @click="editorStore.setActiveComponent(layer.id)">
                    <div class="layer_list__item" :class="{ 'active-item': editorStore.currentElement === layer.id }">
                        <div class="layer_list__item--handle" @click="handleChange({ id: layer.id, key: 'isHide', value: !layer.isHide })">
                            <eye-outlined v-if="!layer.isHide" />
                            <eye-invisible-outlined v-else />
                        </div>
                        <div class="layer_list__item--handle" @click="handleChange({ id: layer.id, key: 'isLocked', value: !layer.isLocked })">
                            <lock-outlined v-if="!layer.isLocked" />
                            <unlock-outlined v-else />
                        </div>InlineEdit
                        <div class="layer_list__item--handle text">
                            <InlineEdit :model-value="layer.layerName" :element-id="layer.id" @change-model-value="changeLineText"></InlineEdit>
                        </div>
                    </div>
                </li>
            </template>
        </Draggable>
    </div>
</template>

<script setup lang="ts">
export type ChangeEmitType = {
    id: string
    key: 'isHide' | 'isLocked'
    value: string | boolean
}
import Draggable from 'vuedraggable'
import InlineEdit from './InlineEdit.vue'
import { editorStore } from '@/store/modules'
import { EyeOutlined, EyeInvisibleOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons-vue'
// import { computed } from 'vue'

const emit = defineEmits(['handleChange'])

const handleChange = (e: ChangeEmitType) => {
    emit('handleChange', e)
}
const changeLineText = (e: ChangeEmitType) => {
    emit('handleChange', e)
    console.log(editorStore.components)
}
</script>

<style scoped lang="scss">
@include b(layer_list) {
    @include e(item) {
        border: 1px dashed #e5e5e5;
        @apply mb-0 pb-0 h-[60px];
        @apply flex items-center;
        @include m(handle) {
            @apply w-[40px] h-[60px] text-[20px] flex justify-center items-center;
        }
        @include b(text) {
            min-width: 60px;
        }
    }
    @include b(active-item) {
        border: 1px dashed skyblue;
    }
}
</style>
