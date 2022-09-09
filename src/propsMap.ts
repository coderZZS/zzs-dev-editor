/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-08 16:23:36
 * @LastEditTime: 2022-09-09 16:01:27
 */
import { h, VNode } from 'vue'
import { TextDefaultProps } from './defaultProps'

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
    [p in keyof TextDefaultProps]?: PorpToForm
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
}
