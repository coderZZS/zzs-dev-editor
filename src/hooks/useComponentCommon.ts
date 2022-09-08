/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-08 11:41:41
 * @LastEditTime: 2022-09-08 15:22:56
 */
import { pick } from 'lodash-es'
import { computed } from 'vue'
import { TextDefaultProps } from '@/defaultProps'

const useComponentCommon = (props: Readonly<Partial<TextDefaultProps>>, picks: string[]) => {
    const styleProps = computed(() => pick(props, picks))
    const handelClick = () => {
        if (props.actionType === 'url' && props.url) {
            window.location.href = props.url
        }
    }
    return {
        styleProps,
        handelClick,
    }
}

export default useComponentCommon
