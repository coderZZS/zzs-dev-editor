<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-10-27 14:11:50
 * @LastEditTime: 2022-10-28 16:59:06
-->
<template>
    <a-collapse v-model:activeKey="currentKey">
        <a-collapse-panel v-for="item in editGroups" :key="item.text" :header="item.text">
            <props-table :props="item.props" :mutation-extra-data="{ isProps: true }"></props-table>
        </a-collapse-panel>
    </a-collapse>
</template>

<script setup lang="ts">
import { difference } from 'lodash'
import { PropType, ref, computed } from 'vue'
import PropsTable from './PropsTable.vue'
import { defaultEditGroups } from './data'
import { AllComponentPropsPartial } from '@/components/editor/PropsTable.vue'
export interface GroupProps {
    text: string
    items: string[]
}
const props = defineProps({
    props: {
        type: Object as PropType<AllComponentPropsPartial>,
        required: true,
    },
    groups: {
        type: Array as PropType<GroupProps[]>,
        // eslint-disable-next-line vue/valid-define-props
        default: defaultEditGroups,
    },
})
const currentKey = ref(props.groups.length ? props.groups[0].text : '')
const newGroups = computed(() => {
    const allNormalProps = defaultEditGroups.reduce((prev, current) => {
        return [...prev, ...current.items]
    }, [] as string[])
    // tag 不能编辑，把它过滤掉
    allNormalProps.push('tag')
    allNormalProps.push('right')
    allNormalProps.push('position')
    // 计算每一个组件的独特属性，也就是把通用属性都去掉以后的属性
    const speicalProps = difference(Object.keys(props.props), allNormalProps)
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    currentKey.value = '基本属性'
    return [
        {
            text: '基本属性',
            items: speicalProps,
        },
        ...props.groups,
    ]
})
const editGroups = computed(() => {
    return newGroups.value.map((group) => {
        const propsMap = {} as { [key: string]: any }
        group.items.forEach((item) => {
            propsMap[item] = (props.props as any)[item]
        })
        return {
            ...group,
            props: propsMap,
        }
    })
})
</script>

<style scoped></style>
