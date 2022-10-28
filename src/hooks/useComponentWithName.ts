/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-08 14:14:58
 * @LastEditTime: 2022-10-26 17:35:45
 */
import { Component } from 'vue'
import ZText from '@/components/common/ZText.vue'
import ZImage from '@/components/common/ZImage.vue'
import ColorPicker from '@/components/common/ColorPicker'
import ImageProcesser from '@/components/common/ImageProcesser'
import Tooltip from '@/components/common/Tooltip'
import ShadowPicker from '@/components/common/ShadowPicker'

type ComponentNames = { [key: string]: Component }

export const CustomComponents: ComponentNames = {
    'color-picker': ColorPicker,
    'image-processer': ImageProcesser,
    'shadow-picker': ShadowPicker
}

const map: ComponentNames = {
    'z-text': ZText,
    'z-image': ZImage,
    tooltip: Tooltip,
    ...CustomComponents,
}

export type ComponentName = 'z-text'
// const useComponetWithName = computed(() => (name: ComponentName) => map[name] || name)
function useComponetWithName(name: string) {
    return map[name] || name
}

export default useComponetWithName
