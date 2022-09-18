/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-08 14:14:58
 * @LastEditTime: 2022-09-13 16:57:18
 */
import { Component } from 'vue'
import ZText from '@/components/common/ZText.vue'
import ZImage from '@/components/common/ZImage.vue'
import ColorPicker from '@/components/common/ColorPicker'
import Tooltip from '@/components/common/Tooltip'

const map: { [key: string]: Component } = {
    'z-text': ZText,
    'z-image': ZImage,
    'color-picker': ColorPicker,
    tooltip: Tooltip,
}
export type ComponentName = 'z-text'
// const useComponetWithName = computed(() => (name: ComponentName) => map[name] || name)
function useComponetWithName(name: string) {
    return map[name] || name
}

export default useComponetWithName
