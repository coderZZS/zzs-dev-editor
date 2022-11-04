import { without } from 'lodash-es'

/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-08 11:03:38
 * @LastEditTime: 2022-11-01 14:36:04
 */
export interface CommonDefaultProps {
    tag: string
    actionType: string
    url: string
    height: string
    width: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    paddingBottom: string
    borderStyle: string
    borderColor: string
    borderWidth: string
    borderRadius: string
    boxShadow: string
    opacity: number
    position: string
    left: string
    top: string
    right: string,
    backgroundImage?: string,
    backgroundSize?: string
    backgroundRepeat?: string
}

export const commonDefaultProps: CommonDefaultProps = {
    tag: 'div',
    // actions
    actionType: '',
    url: '',
    // size
    height: '',
    width: '200px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    // border type
    borderStyle: 'none',
    borderColor: '#000',
    borderWidth: '0',
    borderRadius: '0',
    // shadow and opacity
    boxShadow: '0 0 0 #000000',
    opacity: 1,
    // position and x y
    position: 'absolute',
    left: '0',
    top: '0',
    right: '0',
}

export interface TextDefaultProps extends CommonDefaultProps {
    text: string
    fontSize: string
    fontFamily: string
    fontWeight: string
    fontStyle: string
    textDecoration: string
    lineHeight: string
    textAlign: string
    color: string
    backgroundColor: string
}

export const textDefaultProps: TextDefaultProps = {
    // basic props - font styles
    text: '正文内容',
    fontSize: '14px',
    fontFamily: '',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    lineHeight: '1',
    textAlign: 'left',
    color: '#000000',
    backgroundColor: '',
    ...commonDefaultProps,
}

export interface ImageComponentProps extends CommonDefaultProps {
    src?: string
}
export const imageDefaultProps: ImageComponentProps = {
    src: 'test.url',
    ...commonDefaultProps,
}

export type PropsTypes = TextDefaultProps & ImageComponentProps

export const textStylePropsNames = without(Object.keys(textDefaultProps), 'actionType', 'text', 'url', 'tag')
export const imageDefaultPropsNames = without(Object.keys(imageDefaultProps))

export const transformToComponentProps = <T = object>(props: T) => {
    type ReturnType = { [key in keyof T]: any }
    const obj: ReturnType = {} as ReturnType

    Object.keys(props).forEach((key: string) => {
        const value = props[key as keyof T] as any
        obj[key as keyof T] = {
            type: value.constructor,
            default: value,
        }
    })
    return obj
    // return mapValues(props, (item: any) => ({ type: item.constructor, default: item }))
}

export type AllComponentProps = CommonDefaultProps & ImageComponentProps & TextDefaultProps
