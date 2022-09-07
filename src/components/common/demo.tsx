/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-06-22 14:02:59
 * @LastEditTime: 2022-08-10 10:26:17
 */
import { defineComponent } from 'vue'

export default defineComponent({
    setup(){
        const hello = () => {
            console.log('hello zzs-dev-editor')
        }
        return () => {
            return (
                <div onClick={hello}>hello demo</div>
            )
        }
    }
})