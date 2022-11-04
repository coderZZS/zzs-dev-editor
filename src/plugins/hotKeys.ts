/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-11-04 11:20:31
 * @LastEditTime: 2022-11-04 11:46:48
 */
import useHotkeys from "@/hooks/useHotkeys";
import { editorStore } from "@/store/modules";

export default function initHotKeys () {
    useHotkeys('ctrl+c, command+c', () => {
        editorStore.setCopiedComponent()
    })
    useHotkeys('ctrl+v, command+v', () => {
        editorStore.copyComponent()
    })
    useHotkeys('del', () => {
        editorStore.deleteComponent()
    })
    useHotkeys('esc', () => {
        editorStore.cancelSelectComponent()
    })
}