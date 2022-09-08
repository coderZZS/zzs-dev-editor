/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-08 14:14:58
 * @LastEditTime: 2022-09-08 14:20:36
 */
import { computed } from 'vue'
import ZText from '@/components/common/ZText.vue'

const map = {
    'z-text': ZText,
}
export type ComponentName = 'z-text'
const useComponetWithName = computed(() => (name: ComponentName) => map[name] || name)

export default useComponetWithName
