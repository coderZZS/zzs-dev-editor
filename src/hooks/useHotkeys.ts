/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-11-04 11:17:29
 * @LastEditTime: 2022-11-04 11:19:57
 */
import hotkeys, { KeyHandler } from "hotkeys-js";
import { onMounted, onUnmounted } from "vue";
 
const useHotkeys = (key: string, callback: KeyHandler) => {
    onMounted(() => {
        hotkeys(key, callback)
    })
    onUnmounted(() => {
        hotkeys.unbind(key, callback)
    })
}

export default useHotkeys