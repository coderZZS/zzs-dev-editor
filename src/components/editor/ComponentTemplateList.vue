<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-08 14:12:58
 * @LastEditTime: 2022-09-08 15:43:48
-->
<template>
    <div class="create-component-list">
        <div v-for="(item, index) in props.list" :key="index" class="component-item" @click="onItemClick(item)">
            <ZText v-bind="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue'
import ZText from '@/components/common/ZText.vue'
import { TextDefaultProps } from '@/defaultProps'
type TextDefaultPropsPartial = Partial<TextDefaultProps>
const props = defineProps({
    list: {
        type: Array as PropType<TextDefaultPropsPartial[]>,
        required: true,
    },
})

const emit = defineEmits(['onItemClick'])

const onItemClick = (data: TextDefaultPropsPartial) => {
    emit('onItemClick', data)
}
</script>

<style scoped></style>
