<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-14 10:37:03
 * @LastEditTime: 2022-10-24 16:36:21
-->
<template>
    <div class="file-upload">
        <div class="file-upload">
            <div class="upload-area" :class="{ 'upload-dragover': props.drag && isDragOver }" v-on="events">
                <slot v-if="isLoading" name="loading">
                    <AButton type="primary" size="large" class="upload-button" :disabled="fileStatus === 'loading'">
                        <template #icon>
                            <folder-add-two-tone :style="{ fontSize: '20px', verticalAlign: 'top' }" />
                        </template>
                        <span class="file-upload__text">{{ uploadStatusText['loading'] }}</span>
                    </AButton>
                </slot>
                <slot v-else-if="lastFileData && lastFileData.loaded" name="uploaded" :uploaded-data="lastFileData.data">
                    <AButton type="primary" size="large" class="upload-button" :disabled="fileStatus === 'loading'">
                        <template #icon>
                            <folder-add-two-tone :style="{ fontSize: '20px', verticalAlign: 'top' }" />
                        </template>
                        <span class="file-upload__text">{{ uploadStatusText['ready'] }}</span>
                    </AButton>
                </slot>
                <slot v-else name="default">
                    <AButton type="primary" size="large" class="upload-button" :disabled="fileStatus === 'loading'">
                        <template #icon>
                            <folder-add-two-tone :style="{ fontSize: '20px', verticalAlign: 'top' }" />
                        </template>
                        <span class="file-upload__text">{{ uploadStatusText['ready'] }}</span>
                    </AButton>
                </slot>
                <input ref="uploadInput" type="file" class="upload-input" @change="handleFileChange" />
                <ul v-if="props.showFileList" class="uploaded-list">
                    <li v-for="file in uploadedFiles" :key="file.uid" :class="`uploaded-file upload-${file.status}`">
                        <div>
                            <span class="filename">{{ file.name }}</span>
                            <span class="progress">{{ file.progress }}</span>
                        </div>
                        <AButton class="delete-icon" type="dashed" danger size="small" @click="deleteFile(file.uid)">删除</AButton>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FolderAddTwoTone } from '@ant-design/icons-vue'
import { ref, reactive, computed, PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { last } from 'lodash'
import { uploadFile as uploader } from '@/utils'

interface UploadFile {
    uid: string
    size: number
    name: string
    status: UploadStatus
    raw: File
    resp?: any
    progress: string | number
}
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'

type UploadStatusText = {
    [key in UploadStatus]: string
}
type CheckUpload = (file?: File) => boolean | Promise<File>

const emit = defineEmits(['onProgress', 'onSuccess', 'onError', 'onChange'])

const props = defineProps({
    action: {
        type: String,
        required: true,
    },
    beforeUpload: {
        type: Function as PropType<CheckUpload>,
        default: () => () => true,
    },
    drag: {
        type: Boolean,
        default: false,
    },
    showFileList: {
        type: Boolean,
        default: false,
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
const uploadedFiles = ref<UploadFile[]>([])
const isLoading = computed(() => uploadedFiles.value.some((file) => file.status === 'loading'))

const lastFileData = computed(() => {
    const lastFile = last(uploadedFiles.value)
    if (lastFile) {
        return {
            loaded: lastFile.status === 'success',
            data: lastFile.resp,
        }
    }
    return false
})

const triggerUpload = () => {
    if (uploadInput.value) {
        uploadInput.value.click()
    }
}

const handleFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files?.length) {
        emit('onChange', files[0], files, e)
        const uploadFile = files[0]
        const res = props.beforeUpload(uploadFile)
        if (res && res instanceof Promise) {
            res.then((processedFile) => {
                if (processedFile instanceof File) {
                    postFile(processedFile)
                } else {
                    throw new Error('beforeUpload Promise should return File Object')
                }
            }).catch((e) => console.error(e))
        } else if (res) {
            postFile(uploadFile)
        }
    }
}

const postFile = async (uploadFile: File) => {
    fileStatus.value = 'loading'
    const formData = new FormData()
    formData.append(uploadFile.name, uploadFile)
    const fileObj = reactive<UploadFile>({
        uid: uuidv4(),
        size: uploadFile.size,
        name: uploadFile.name,
        status: 'loading',
        raw: uploadFile,
        progress: 0,
    })
    uploadedFiles.value.push(fileObj)

    try {
        const res = await uploader({
            file: uploadFile,
            updateProgress: (progress: number) => {
                const currentProgress = progress * 100
                console.log('上传中...', currentProgress + '%')
                if (currentProgress === 100) {
                    fileObj.progress = '完成'
                }
                emit('onProgress', progress)
            },
        })
        console.log('res', '--------------', res);
        
        fileObj.status = 'success'
        fileStatus.value = 'success'
        fileObj.resp = res
        emit('onSuccess', res)
        console.log('res', res)
    } catch (error) {
        fileObj.status = 'error'
        fileStatus.value = 'error'
        emit('onError', error)
    }
    if (uploadInput.value?.value) {
        uploadInput.value.value = ''
    }

    // axios
    //     .post(props.action, formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         onUploadProgress: (e) => {
    //             const progress = parseInt((e.loaded / e.total) * 100 + '')
    //             fileObj.progress = progress + '%'
    //             if (progress === 100) {
    //                 fileObj.progress = '完成'
    //             }
    //             emit('onProgress', progress)
    //         },
    //     })
    //     .then((res) => {
    //         console.log(res)
    //         fileObj.status = 'success'
    //         fileStatus.value = 'success'
    //         fileObj.resp = res.data
    //         emit('onSuccess', res)
    //     })
    //     .catch((e) => {
    //         fileObj.status = 'error'
    //         fileStatus.value = 'error'
    //         emit('onError', e)
    //     })
    //     .finally(() => {
    //         if (uploadInput.value?.value) {
    //             uploadInput.value.value = ''
    //         }
    //     })
}

const deleteFile = (uid: string) => {
    uploadedFiles.value = uploadedFiles.value.filter((file) => {
        return file.uid !== uid
    })
}

let events: { [key: string]: (e: any) => void } = {
    click: triggerUpload,
}
const isDragOver = ref(false)
const handleDrag = (e: DragEvent, over: boolean) => {
    e.preventDefault()
    isDragOver.value = over
}

const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    isDragOver.value = false
    if (e.dataTransfer) {
        postFile(e.dataTransfer.files[0])
    }
}
if (props.drag) {
    events = {
        ...events,
        dragover: (e: DragEvent) => {
            handleDrag(e, true)
        },
        dragleave: (e: DragEvent) => {
            handleDrag(e, false)
        },
        drop: handleDrop,
    }
}
</script>
<style scoped lang="scss">
@include b(file-upload) {
    @include b(upload-input) {
        display: none;
    }
    @include b(uploaded-list) {
        @apply mt-[10px];
        @include b(uploaded-file) {
            @include b(filename) {
                @apply mr-[10px];
            }
        }
        @include b(upload-success) {
            color: skyblue;
        }
        @include b(upload-error) {
            color: palevioletred;
        }
        @include b(upload-loading) {
            color: green;
        }
    }
}
</style>
