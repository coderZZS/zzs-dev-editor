<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-13 09:50:16
 * @LastEditTime: 2022-09-13 10:36:37
-->
<template>
    <div>{{ props.msg }}</div>
    <div class="form">
        <input v-model="message" type="text" />
        <li v-for="item in flag" :key="item"></li>
        <button @click="changeFlag"></button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
const props = defineProps({
    msg: {
        type: String,
        default: '',
    },
})

const message = ref('')
const flag = ref(0)
const changeFlag = () => {
    flag.value += 1
}
</script>

<style scoped></style>
