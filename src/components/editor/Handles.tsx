/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-09 15:29:09
 * @LastEditTime: 2022-09-09 15:56:03
 */
import { defineComponent, PropType } from 'vue'

type HandleTypes = 'delete' | 'issue' | 'preview'

export default defineComponent({
    props: {
        type: {
            type: String as PropType<HandleTypes>,
            default: 'delete',
        },
        text: {
            type: String,
            default: '按钮内容',
        },
    },
    emits: ['handleClick'],
    setup(props, { emit }) {
        interface HandleProp {
            type: 'primary' | 'dashed' | 'text' | 'link'
            danger: boolean
        }
        const componentProps: { [key: string]: HandleProp } = {
            delete: {
                type: 'primary',
                danger: true,
            },
            issue: {
                type: 'primary',
                danger: false,
            },
        }
        const onClick = () => {
            emit('handleClick')
        }
        return () => {
            return (
                <a-button {...componentProps[props.type]} onClick={onClick}>
                    {props.text}
                </a-button>
            )
        }
    },
})
