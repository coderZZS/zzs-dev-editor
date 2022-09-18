<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-08 14:12:58
 * @LastEditTime: 2022-09-08 15:43:48
-->
<template>
    <div class="create-component-list">
        <div v-for="(item, index) in props.list" :key="index" class="component-item" @click="onItemClick(item)">
            <ZText v-bind="item" />
        </div>
        <Uploader action="/api/upload" @on-success="onUploadScuuess" />
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { TextDefaultProps, imageDefaultProps } from '@/defaultProps'
import ZText from '@/components/common/ZText.vue'
import Uploader from '@/components/common/Uploader'
import { ComponentData } from '@/store/modules'
import { ComponentProps } from '@/store/modules/editor'
import { getImgDimensions } from '@/utils/helper'
import { commonStore } from '@/store/modules'
type TextDefaultPropsPartial = Partial<TextDefaultProps>
const props = defineProps({
    list: {
        type: Array as PropType<TextDefaultPropsPartial[]>,
        required: true,
    },
})

const emit = defineEmits(['onItemClick'])

const onItemClick = (data: TextDefaultPropsPartial) => {
    console.log(data, 'datadata');
    const component: ComponentData = {
        name: 'z-text',
        id: uuidv4(),
        props: data as ComponentProps
    }
    emit('onItemClick', component)
}

const onUploadScuuess = (res: any) => {
    const component: ComponentData = {
        name: 'z-image',
        id: uuidv4(),
        props: {
            ...imageDefaultProps,
            src: res.data.url
        }
    }
    getImgDimensions(commonStore.imgUrl).then(({width, height}) => {
        console.log(width, height)
        const scale = width / height
        const maxWidth = 318
        const imgWidth = width > maxWidth ? maxWidth : width
        component.props.width = imgWidth + 'px'
        component.props.height = imgWidth / scale + 'px'
        console.log(component.props.width, component.props.height);
        emit('onItemClick', component)
    })
    
}
</script>

<style scoped>
</style>
