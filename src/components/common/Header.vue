<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-07 10:44:14
 * @LastEditTime: 2022-10-20 14:26:25
-->
<template>
    <div class="header">
        <span>logo</span>
        <div class="flex items-center w-2/4">
            <slot>
                <a-input-search v-model:value="search" placeholder="input search text" enter-button @search="onSearch" />
            </slot>
        </div>
        <LoginCheck />
    </div>
</template>

<script setup lang="ts">
import LoginCheck from '@/components/handle/LoginCheck.vue'
import { ref } from 'vue'
const search = ref('')
defineProps({
    showSearch: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['onSearch'])
const onSearch = (search: string | number) => {
    emit('onSearch', search)
}
</script>

<style scoped lang="scss">
@include b(header) {
    color: #fff;
    @include grid($justify-content: space-between, $align-items: center);
}
</style>
