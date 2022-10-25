/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-10-25 17:14:35
 * @LastEditTime: 2022-10-25 17:21:59
 */
import { onMounted, onUnmounted, ref, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
    const isClickOutside = ref(false)
    const handler = (e: MouseEvent) => {
        if (elementRef.value && e.target) {
            if (elementRef.value.contains(e.target as HTMLElement)) {
                isClickOutside.value = false
            } else {
                isClickOutside.value = true
            }
        }
    }
    onMounted(() => {
        document.addEventListener('mousedown', handler)
    })
    onUnmounted(() => {
        document.removeEventListener('mousedown', handler)
    })
    return isClickOutside
}

export default useClickOutside
