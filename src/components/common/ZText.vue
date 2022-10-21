<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-08 10:05:26
 * @LastEditTime: 2022-10-20 14:26:54
-->
<template>
    <component :is="tag" :style="styleProps" class="z-text-component" @click="handelClick">{{ props.text }}</component>
</template>

<script setup lang="ts">
import { transformToComponentProps, textDefaultProps, textStylePropsNames } from '@/defaultProps'
import useComponentCommon from '@/hooks/useComponentCommon'

const props = defineProps({
    ...transformToComponentProps(textDefaultProps),
})

const { styleProps, handelClick } = useComponentCommon(props, textStylePropsNames)
</script>

<style scoped></style>
