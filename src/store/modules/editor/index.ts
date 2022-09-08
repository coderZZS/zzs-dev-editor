/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-06-21 17:54:24
 * @LastEditTime: 2022-09-08 17:09:53
 */
import { defineStore } from 'pinia'
import piniaPersistConfig from '@/store/config/piniaPersistConfig'
import { v4 as uuidv4 } from 'uuid'
import { TextDefaultProps } from '@/defaultProps'

export interface EditorProps {
    // 组件数据列表
    components: ComponentData[]
    // 当前编辑的元素  uuid
    currentElement: string | null
    currentElementData: ComponentData | null
}

type TextDefaultPropsPartial = Partial<TextDefaultProps>
export interface ComponentData {
    // 元素属性
    props: TextDefaultPropsPartial
    // uuid
    id: string
    // 组件名称
    name: string
}

export const testComponents: ComponentData[] = [
    { id: uuidv4(), name: 'z-text', props: { text: 'hello1', fontSize: '16px' } },
    { id: uuidv4(), name: 'z-text', props: { text: 'hello2', fontSize: '32px' } },
    { id: uuidv4(), name: 'z-text', props: { text: 'hello3', fontSize: '64px', color: 'red', actionType: 'url', url: 'https://www.baidu.com' } },
]

const useStore = defineStore('editor', {
    state: (): EditorProps => {
        return {
            components: testComponents,
            currentElement: '',
            currentElementData: null,
        }
    },
    getters: {},
    actions: {
        addComponent(props: TextDefaultPropsPartial) {
            const component: ComponentData = {
                id: uuidv4(),
                name: 'z-text',
                props,
            }
            this.components.push(component)
        },
        setActiveComponent(id: string) {
            this.currentElement = this.components.find((c) => c.id === id)?.id || null
            this.currentElementData = this.components.find((c) => c.id === id) || null
        },
    },
    persist: piniaPersistConfig('editor'),
})

export default useStore()
