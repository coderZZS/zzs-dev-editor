<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-08 10:05:26
 * @LastEditTime: 2022-10-20 16:02:52
-->
<template>
    <img :style="(styleProps as CSSProperties)" :src="src" alt="" class="img-component" />
</template>

<script setup lang="ts">
import { CSSProperties, computed } from 'vue'
import { commonStore } from '@/store/modules'
import { transformToComponentProps, imageDefaultProps, imageDefaultPropsNames } from '@/defaultProps'
import useComponentCommon from '@/hooks/useComponentCommon'

const src = computed(() => {
    return props.src || commonStore.imgUrl
})

const props = defineProps({
    ...transformToComponentProps(imageDefaultProps),
})
const { styleProps } = useComponentCommon(props, imageDefaultPropsNames)
</script>

<style scoped lang="scss">
@include b(img-component) {
    @apply block w-[50px] h-[50px];
}
</style>
