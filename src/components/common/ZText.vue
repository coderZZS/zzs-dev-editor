<template>
    <component :is="tag" :style="styleProps" class="z-text-component" @click="handelClick">{{ props.text }}</component>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { transformToComponentProps, textDefaultProps, textStylePropsNames } from '@/defaultProps'
import useComponentCommon from '@/hooks/useComponentCommon'
import tag from 'ant-design-vue/lib/tag';

const props = defineProps({
    ...transformToComponentProps(textDefaultProps)
})

const { styleProps, handelClick } = useComponentCommon(props, textStylePropsNames)
</script>

<style scoped></style>