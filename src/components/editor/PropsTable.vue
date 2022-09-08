<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-08 16:28:18
 * @LastEditTime: 2022-09-08 17:13:50
-->
<template>
    <div class="props-table">
        <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
            <component :is="value?.component" v-if="value?.value" :value="value?.value"></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, PropType, defineProps, watch } from 'vue'
import { reduce } from 'lodash-es'
import { PropsToForms, mapPropsToForms } from '@/propsMap'
import { TextDefaultProps } from '@/defaultProps'
type TextDefaultPropsPartial = Partial<TextDefaultProps>
const props = defineProps({
    props: {
        type: Object as PropType<TextDefaultPropsPartial>,
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
                ;(item.value as unknown) = val
                res[newKey] = item
            }
            return res
        },
        {} as PropsToForms
    )
})

watch(
    () => finalProps.value,
    (val) => {
        console.log('valvcal', val)
    }
)
</script>

<style scoped></style>
