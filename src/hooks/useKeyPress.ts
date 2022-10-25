/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-10-25 16:47:21
 * @LastEditTime: 2022-10-25 16:50:49
 */
import { onMounted, onUnmounted } from 'vue'

const useKeyPress = (key: string, cb: () => any) => {
    const trigger = (event: KeyboardEvent) => {
        if (event.key === key) {
            cb()
        }
    }
    onMounted(() => {
        document.addEventListener('keydown', trigger)
    })
    onUnmounted(() => {
        document.removeEventListener('keydown', trigger)
    })
}

export default useKeyPress
