<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-08 16:28:18
 * @LastEditTime: 2022-10-31 15:18:30
-->
<template>
    <div class="props-table">
        <div v-for="(value, key) in finalProps" :key="key" class="props-table__item">
            <span class="props-table__title">{{ value?.text }}</span>
            <div class="props-table__component">
                <component :is="useComponentWithName(value?.component)" :[value.valueProp]="value.value" v-bind="value?.extraProps" v-on="value.events">
                    <template v-if="value.options && value.subComponent">
                        <component :is="useComponentWithName(value.subComponent)" v-for="(option, i) in value.options" :key="i" :value="option.value">
                            <render-vnode :v-node="option.text"></render-vnode>
                        </component>
                    </template>
                </component>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, PropType, VNode } from 'vue'
import { reduce } from 'lodash-es'
import { mapPropsToForms } from '@/propsMap'
import { TextDefaultProps, AllComponentProps } from '@/defaultProps'
import RenderVnode from '@/components/common/RenderVnode'
import useComponentWithName from '@/hooks/useComponentWithName'
import { PageData } from '@/store/modules/editor'

export type AllComponentPropsPartial = Partial<AllComponentProps & PageData>
interface FormProps {
    component: string
    subComponent?: string
    value: string
    extraProps?: { [key: string]: unknown }
    text: string
    options?: { text: string | VNode; value: unknown }[]
    valueProp: string
    eventName: string
    events: { [key: string]: (e: any) => void }
}

const emit = defineEmits(['change'])

const props = defineProps({
    props: {
        type: Object as PropType<AllComponentPropsPartial>,
        required: true,
    },
})

const finalProps = computed(() => {
    return reduce(
        props.props,
        (res, val, key) => {
            const newKey = key as keyof TextDefaultProps
            const item = mapPropsToForms[newKey]
            if (item) {
                const { valueProp = 'value', eventName = 'change', intialTransform, afterTransform } = item
                const newItem: FormProps = {
                    ...item,
                    valueProp,
                    eventName,
                    value: intialTransform ? intialTransform(val) : val,
                    events: {
                        [eventName]: (e: any) => {
                            emit('change', { key, value: afterTransform ? afterTransform(e) : e })
                        },
                    },
                }
                res[newKey] = newItem
            }
            return res
        },
        {} as { [key: string]: FormProps }
    )
})
</script>

<style scoped lang="scss">
@include b(props-table) {
    @include e(item) {
        @apply mb-5 w-[100%] overflow-hidden;
        @include b(ant-select) {
            ::v-deep {
                @apply text-pink-800 w-[100%];
            }
        }
    }
}
</style>
