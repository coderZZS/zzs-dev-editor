<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-08 10:05:26
 * @LastEditTime: 2022-09-08 15:45:46
-->
<template>
    <component :is="tag" :style="styleProps" class="z-text-component" @click="handelClick">{{ text }}</component>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { transformToComponentProps, textDefaultProps, textStylePropsNames } from '@/defaultProps'
import useComponentCommon from '@/hooks/useComponentCommon'

const props = defineProps({
    ...transformToComponentProps(textDefaultProps),
})

const { styleProps, handelClick } = useComponentCommon(props, textStylePropsNames)
</script>

<style scoped></style>
