/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-08 16:23:36
 * @LastEditTime: 2022-10-28 16:52:45
 */
import { h, VNode } from 'vue'
import { TextDefaultProps, ImageComponentProps, CommonDefaultProps } from './defaultProps'
import { editorStore } from './store/modules'
import { computed } from 'vue'
export interface PorpToForm {
    component: string
    subComponent?: string
    extraProps?: { [key: string]: unknown }
    text: string
    options?: { text: string | VNode; value: string }[]
    intialTransform?: (v: any) => any
    afterTransform?: (v: any) => any
    valueProp?: string
    eventName?: string
    parent?: string;
    // 可能还要向外传递更多事件
    extraEvent?: string;
}

export type PropsToForms = {
    [p in keyof (TextDefaultProps & ImageComponentProps & CommonDefaultProps)]?: PorpToForm
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

const defaultMap = {
    component: 'a-input',
    eventName: 'change',
    valueProp: 'value',
    intialTransform: (v: any) => v,
    afterTransform: (e: any) => e,
}

const numberToPxHandle = {
    ...defaultMap,
    component: 'a-input-number',
    intialTransform: (v: string) => (v ? parseInt(v) : 0),
    afterTransform: (e: number) => (e ? `${e}px` : '0'),
}

export const mapPropsToForms: PropsToForms = {
    text: {
        text: '文本',
        component: 'a-input',
        afterTransform: (e: any) => e.target.value,
    },
    fontSize: {
        text: '字号',
        component: 'a-input-number',
        intialTransform: (v: string) => parseInt(v),
        afterTransform: (e: number) => (e ? `${e}px` : ''),
    },
    lineHeight: {
        text: '行高',
        component: 'a-slider',
        extraProps: { min: 0, max: 3, step: 0.1 },
        intialTransform: (v: string) => parseFloat(v),
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
    color: {
        text: '字体颜色',
        component: 'color-picker',
    },
    fontWeight: {
        text: '字体加粗',
        component: 'tooltip',
        intialTransform: (v: string) => !!v.length,
    },
    fontStyle: {
        text: '字体倾斜',
        component: 'tooltip',
        extraProps: {
            text: 'I',
            tips: '倾斜',
            activeValue: 'oblique',
        },
        intialTransform: (v: string) => !!v.length,
    },
    width: {
        text: '宽度',
        component: 'a-slider',
        extraProps: { min: 0, max: 375, step: 0.1 },
        intialTransform: (v: string) => parseFloat(v),
        afterTransform: (e: number) => e + 'px',
    },
    src: {
        text: '图片',
        component: 'image-processer',
        extraProps: {
            src: computed(() => (editorStore.currentElementData?.props as ImageComponentProps)?.src).value,
        },
    },
    backgroundColor: {
        ...defaultMap,
        component: 'color-picker',
        text: '背景颜色',
    },
    // actions
    actionType: {
        ...defaultMap,
        component: 'a-select',
        subComponent: 'a-select-option',
        text: '点击',
        options: [
            { value: '', text: '无' },
            { value: 'to', text: '跳转到 URL' },
        ],
    },
    url: {
        ...defaultMap,
        afterTransform: (e: any) => e.target.value,
        text: '链接',
        parent: 'actionType',
    },
    // sizes
    height: {
        ...defaultMap,
        component: 'a-input-number',
        // intialTransform: (v: string) => v,
        intialTransform: (v: string) => v ? parseInt(v) : '',
        afterTransform: (e: number) => (e ? `${e}px` : ''),
        text: '高度',
    },
    paddingLeft: {
        ...numberToPxHandle,
        text: '左边距',
    },
    paddingRight: {
        ...numberToPxHandle,
        text: '右边距',
    },
    paddingTop: {
        ...numberToPxHandle,
        text: '上边距',
    },
    paddingBottom: {
        ...numberToPxHandle,
        text: '下边距',
    },
    // border types
    borderStyle: {
        ...defaultMap,
        component: 'a-select',
        subComponent: 'a-select-option',
        text: '边框类型',
        options: [
            { value: 'none', text: '无' },
            { value: 'solid', text: '实线' },
            { value: 'dashed', text: '破折线' },
            { value: 'dotted', text: '点状线' },
        ],
    },
    borderColor: {
        ...defaultMap,
        component: 'color-picker',
        text: '边框颜色',
    },
    borderWidth: {
        ...defaultMap,
        component: 'a-slider',
        intialTransform: (v: string) => v ? parseInt(v) : v,
        afterTransform: (e: number) => e + 'px',
        text: '边框宽度',
        extraProps: { min: 0, max: 20 },
    },
    borderRadius: {
        ...defaultMap,
        component: 'a-slider',
        intialTransform: (v: string) => parseInt(v),
        afterTransform: (e: number) => e + 'px',
        text: '边框圆角',
        extraProps: { min: 0, max: 200 },
    },
    // shadow and opactiy
    opacity: {
        ...defaultMap,
        text: '透明度',
        component: 'a-slider',
        extraProps: { min: 0, max: 1, step: 0.01 },
        intialTransform: (v: string) => parseFloat(v),
        afterTransform: (e: number) => e.toString(),
    },
    boxShadow: {
        ...defaultMap,
        text: '阴影',
        component: 'shadow-picker',
    },
    position: {
        ...defaultMap,
        component: 'a-select',
        subComponent: 'a-select-option',
        text: '定位',
        options: [
            { value: '', text: '默认' },
            { value: 'absolute', text: '绝对定位' },
        ],
    },
    left: {
        ...numberToPxHandle,
        text: 'X轴坐标',
    },
    top: {
        ...numberToPxHandle,
        text: 'Y轴坐标',
    },
}
