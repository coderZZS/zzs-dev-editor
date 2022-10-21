/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-08 16:23:36
 * @LastEditTime: 2022-10-20 17:25:24
 */
import { h, VNode } from 'vue'
import { TextDefaultProps, ImageComponentProps } from './defaultProps'
import { editorStore } from './store/modules'
import { computed } from 'vue'
export interface PorpToForm {
    component: string
    subComponent?: string
    extraProps?: { [key: string]: unknown }
    text: string
    options?: { text: string | VNode; value: string }[]
    initalTransform?: (v: any) => any
    afterTransform?: (v: any) => any
    valueProp?: string
    eventName?: string
}

export type PropsToForms = {
    [p in keyof (TextDefaultProps & ImageComponentProps)]?: PorpToForm
}

const fontFamilyOptions = [
    { text: '宋体', value: '"SimSun","STSong"' },
    { text: '黑体', value: '"SimHei","STHeiti"' },
    { text: '楷体', value: '"KaiTi","STKaiti"' },
    { text: '仿宋', value: '"FangSong","STFangsong"' },
].map((font) => {
    return {
        text: h('span', { style: { fontFamily: font.value } }, font.text) as VNode,
        value: font.value,
    }
})

export const mapPropsToForms: PropsToForms = {
    text: {
        text: '文本',
        component: 'a-input',
        afterTransform: (e: any) => e.target.value,
    },
    fontSize: {
        text: '字号',
        component: 'a-input-number',
        initalTransform: (v: string) => parseInt(v),
        afterTransform: (e: number) => (e ? `${e}px` : ''),
    },
    lineHeight: {
        text: '行高',
        component: 'a-slider',
        extraProps: { min: 0, max: 3, step: 0.1 },
        initalTransform: (v: string) => parseFloat(v),
        afterTransform: (e: number) => e.toString(),
    },
    textAlign: {
        component: 'a-radio-group',
        subComponent: 'a-radio-button',
        text: '对齐',
        options: [
            { value: 'left', text: '左' },
            { value: 'center', text: '中' },
            { value: 'right', text: '右' },
        ],
        afterTransform: (e: any) => e.target.value,
    },
    fontFamily: {
        component: 'a-select',
        subComponent: 'a-select-option',
        text: '字体',
        options: [{ text: '无', value: '' }, ...fontFamilyOptions],
    },
    opacity: {
        text: '透明度',
        component: 'a-slider',
        extraProps: { min: 0, max: 1, step: 0.01 },
        initalTransform: (v: string) => parseFloat(v),
        afterTransform: (e: number) => e.toString(),
    },
    color: {
        text: '字体颜色',
        component: 'color-picker',
    },
    fontWeight: {
        text: '字体加粗',
        component: 'tooltip',
        initalTransform: (v: string) => !!v.length,
    },
    fontStyle: {
        text: '字体倾斜',
        component: 'tooltip',
        extraProps: {
            text: 'I',
            tips: '倾斜',
            activeValue: 'oblique',
        },
        initalTransform: (v: string) => !!v.length,
    },
    width: {
        text: '宽度',
        component: 'a-slider',
        extraProps: { min: 0, max: 375, step: 0.1 },
        initalTransform: (v: string) => parseFloat(v),
        afterTransform: (e: number) => e + 'px',
    },
    src: {
        text: '图片',
        component: 'image-processer',
        extraProps: {
            src: computed(() => (editorStore.currentElementData?.props as ImageComponentProps)?.src).value,
        },
    },
}
