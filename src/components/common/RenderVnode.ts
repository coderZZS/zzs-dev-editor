/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-09 15:05:11
 * @LastEditTime: 2022-09-09 15:06:18
 */
import { defineComponent } from 'vue'

const RenderVnode = defineComponent({
    props: {
        vNode: {
            type: [Object, String],
            required: true,
        },
    },
    render() {
        return this.vNode
    },
})

export default RenderVnode
