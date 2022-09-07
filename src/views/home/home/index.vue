<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-06-21 11:40:43
 * @LastEditTime: 2022-08-10 10:11:31
-->
<template>
    <Demo />
    <button @click="changeCount"></button>
    <router-link></router-link>
</template>

<script lang="ts" setup>
import useStore from '@/store/modules/common'
import store from '@/store/modules'
import Demo from '@/components/common/demo';
const changeCount = () => {
    console.log(useStore.count, store.commonStore.count)
}
</script>

<style lang="scss" scoped>
</style>
