/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-06-21 17:54:24
 * @LastEditTime: 2022-10-28 17:27:25
 */
import { defineStore } from 'pinia'
// import piniaPersistConfig from '@/store/config/piniaPersistConfig'
import { v4 as uuidv4 } from 'uuid'
import { TextDefaultProps, ImageComponentProps } from '@/defaultProps'
import { commonDefaultProps } from '@/defaultProps'
export interface EditorProps {
    // 组件数据列表
    components: ComponentData[]
    // 当前编辑的元素  uuid
    currentElement: string | null,
    page: PageData
}

export interface PageDataProps {
    backgroundImage?: string
    height: string
    backgroundColor: string
}

export interface PageData {
    props: PageDataProps
    title: string
}

export type ComponentProps = TextDefaultProps | ImageComponentProps
export interface ComponentData {
    // 元素属性
    props: ComponentProps
    // uuid
    id: string
    // 组件名称
    name: string
    // 图层是否隐藏
    isHide?: boolean
    // 图层是否锁定
    isLocked?: boolean
    // 图层名称
    layerName?: string
}

export const testComponents: ComponentData[] = [
    { id: uuidv4(), name: 'z-text', props: { ...commonDefaultProps, text: 'hello1', fontSize: '16px', position: 'relative', textAlign: 'center' } as TextDefaultProps, layerName: '图层1' },
    {
        id: uuidv4(),
        name: 'z-text',
        props: { ...commonDefaultProps, text: 'hello2', fontSize: '32px', lineHeight: '1', position: 'relative', textAlign: 'left' } as TextDefaultProps,
        layerName: '图层2',
    },
    {
        id: uuidv4(),
        name: 'z-text',
        props: {
            ...commonDefaultProps,
            text: 'hello3',
            fontSize: '64px',
            color: '#000000',
            position: 'relative',
            textAlign: 'left',
            fontFamily: '"SimHei","STHeiti"',
            opacity: 1,
            fontWeight: 'bold',
            fontStyle: 'oblique',
        } as TextDefaultProps,
        layerName: '图层3',
    },
    // {
    //     id: uuidv4(),
    //     name: 'z-image',
    //     props: { src: '', width: '50px', height: '50px', position: 'relative' } as ImageComponentProps
    // }
]

const useStore = defineStore('editor', {
    state: (): EditorProps => {
        return {
            components: testComponents,
            currentElement: '',
            page: {
                props: {
                    height: '560px',
                    backgroundColor: '#fff'
                },
                title: '页面标题'
            }
        }
    },
    getters: {
        currentElementData: (state) => state.components.find((c) => c.id === state.currentElement) || null,
    },
    actions: {
        addComponent(component: ComponentData) {
            this.components.push(component)
        },
        setActiveComponent(id: string) {
            this.currentElement = this.components.find((c) => c.id === id)?.id || null
        },
        updateComponent({ key, value, id }: { key: string; value: any; id?: string }) {
            if (id) {
                this.setActiveComponent(id)
            }
            const component = this.currentElementData
            if (component) {
                if (id) {
                    ;(component as any)[key] = value
                } else {
                    ;(component.props[key as keyof ComponentProps] as any) = value
                }
            }
        },
        deleteComponent() {
            this.components = this.components.filter((component) => component.id !== this.currentElement)
        },
        setPageData({key, value}: {key: string; value: any}) {
            this.page.props[key as keyof PageDataProps] = value
        }
    },
    persist: false,
})

export default useStore()
