<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-14 10:37:03
 * @LastEditTime: 2022-09-15 10:54:01
-->
<template>
    <div class="file-upload">
        <button @click="triggerUpload">
            <span class="file-upload__text">{{ uploadStatusText[fileStatus] }}</span>
        </button>
        <input ref="uploadInput" type="file" class="upload-input" @change="handleFileChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type UploadStatusText = {
    [key in UploadStatus]: string
}

const props = defineProps({
    action: {
        type: String,
        required: true,
    },
})
const uploadInput = ref<null | HTMLInputElement>(null)
const fileStatus = ref<UploadStatus>('ready')
const uploadStatusText: UploadStatusText = {
    ready: '点击上传',
    loading: '正在上传',
    success: '上传成功',
    error: '上传失败',
}

const triggerUpload = () => {
    if (uploadInput.value) {
        uploadInput.value.click()
    }
}

const handleFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files?.length) {
        try {
            fileStatus.value = 'loading'
            const uploadFile = files[0]
            const formData = new FormData()
            formData.append(uploadFile.name, uploadFile)
            const res = await axios.post(props.action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(res)
            fileStatus.value = 'success'
        } catch (error) {
            fileStatus.value = 'error'
        }
    }
}
</script>
<style scoped lang="scss">
@include b(file-upload) {
    @include b(upload-input) {
        display: none;
    }
}
</style>
