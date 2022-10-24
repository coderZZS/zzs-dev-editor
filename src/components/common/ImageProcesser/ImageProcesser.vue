<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-10-20 15:17:26
 * @LastEditTime: 2022-10-24 17:32:33
-->
<template>
    <div class="image-processer">
        <img ref="" class="preview-img" :src="src" alt="" />
        <div class="handles">
            <Uploader action="/api/upload" @on-success="changeComponentFile" />
            <a-button @click="visible = true">点击裁剪</a-button>
        </div>
        <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
            <div class="propper-container">
                <img ref="propperImg" class="propper-container--img" :src="src" alt="" />
            </div>
        </a-modal>
    </div>
</template>
<script lang="ts">
export default {
    name: 'ImageProcesser',
}
</script>
<script setup lang="ts">
import 'cropperjs/dist/cropper.css'
import { computed, ref, watch } from 'vue'
import Uploader from '@/components/common/Uploader'
import mitt from '@/utils/mitt'
import { editorStore } from '@/store/modules'
import { ImageComponentProps } from '@/defaultProps'
import Cropper from 'cropperjs'
import { nextTick } from 'process'

const changeComponentFile = (data: any) => {
    mitt.emit('updateComponent', { key: 'src', value: data })
}

const src = computed(() => (editorStore.currentElementData?.props as ImageComponentProps)?.src || '')

const visible = ref(false)
const propperImg = ref<null | HTMLImageElement>(null)
let cropper: Cropper
const handleOk = () => {
    visible.value = false
}
watch(
    () => visible.value,
    async (val) => {
        if (val) {
            await nextTick(() => null)
            if (!propperImg.value) return
            cropper = new Cropper(propperImg.value, {
                crop(event: any) {
                    console.log(event, '---------')
                },
            })
        } else {
            cropper.destroy()
        }
    }
)
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
    @include b(propper-container) {
        @include m(img) {
            @apply max-w-full block;
        }
    }
}
</style>
