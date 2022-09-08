/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-08 16:23:36
 * @LastEditTime: 2022-09-08 16:39:50
 */
import { TextDefaultProps } from './defaultProps'

export interface PorpToForm {
    component: string
    value?: string
}

export type PropsToForms = {
    [p in keyof TextDefaultProps]?: PorpToForm
}

export const mapPropsToForms: PropsToForms = {
    text: {
        component: 'a-input',
    },
}
