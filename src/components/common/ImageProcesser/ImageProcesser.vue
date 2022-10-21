<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-10-20 15:17:26
 * @LastEditTime: 2022-10-20 17:28:04
-->
<template>
    <div class="image-processer">
        <img class="preview-img" :src="src" alt="" />
        <div class="handles">
            <Uploader action="/api/upload" @on-success="changeComponentFile" />
            <a-button>点击裁剪</a-button>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'ImageProcesser',
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import Uploader from '@/components/common/Uploader'
import mitt from '@/utils/mitt'
import { editorStore } from '@/store/modules'
import { ImageComponentProps } from '@/defaultProps'

const changeComponentFile = (data: any) => {
    const { url } = data.data
    mitt.emit('updateComponent', { key: 'src', value: url })
}

const src = computed(() => (editorStore.currentElementData?.props as ImageComponentProps)?.src || '')
</script>

<style scoped lang="scss">
@include b(image-processer) {
    @apply flex;
    @include b(preview-img) {
        @apply block w-[100px] h-[100px] mr-[5px];
    }
    @include b(handles) {
        @apply flex-1 flex flex-col justify-between;
    }
}
</style>
