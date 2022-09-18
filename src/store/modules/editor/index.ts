/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-06-21 17:54:24
 * @LastEditTime: 2022-09-13 18:16:33
 */
import { defineStore } from 'pinia'
// import piniaPersistConfig from '@/store/config/piniaPersistConfig'
import { v4 as uuidv4 } from 'uuid'
import { TextDefaultProps, ImageComponentProps } from '@/defaultProps'

export interface EditorProps {
    // 组件数据列表
    components: ComponentData[]
    // 当前编辑的元素  uuid
    currentElement: string | null
}

export type ComponentProps = TextDefaultProps | ImageComponentProps
export interface ComponentData {
    // 元素属性
    props: ComponentProps
    // uuid
    id: string
    // 组件名称
    name: string
}

export const testComponents: ComponentData[] = [
    { id: uuidv4(), name: 'z-text', props: { text: 'hello1', fontSize: '16px', position: 'relative', textAlign: 'center' } as TextDefaultProps},
    { id: uuidv4(), name: 'z-text', props: { text: 'hello2', fontSize: '32px', lineHeight: '1', position: 'relative', textAlign: 'left' } as TextDefaultProps },
    {
        id: uuidv4(),
        name: 'z-text',
        props: { text: 'hello3', fontSize: '64px', color: '#000000', position: 'relative', textAlign: 'left', fontFamily: '"SimHei","STHeiti"', opacity: 1, fontWeight: 'bold', fontStyle: 'oblique' } as TextDefaultProps ,
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
        updateComponent({ key, value }: { key: string; value: any }) {
            const component = this.currentElementData
            if (component) {
                (component.props[key as keyof ComponentProps] as any) = value
            }
        },
        deleteComponent() {
            this.components = this.components.filter((component) => component.id !== this.currentElement)
        },
    },
    persist: false,
})

export default useStore()
