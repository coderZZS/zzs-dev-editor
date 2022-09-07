<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-07 17:20:28
 * @LastEditTime: 2022-09-07 17:51:07
-->
<template>
    <div>
        <a-button v-if="!userInfoStore.getUserInfo.isLogin" type="primary" shape="round" size="size" @click="userInfoStore.login">登录</a-button>
        <a-dropdown-button v-else>
            {{ userInfoStore.getUserInfo.userName }}
            <template #overlay>
                <a-menu>
                    <a-menu-item key="1">
                        <a-button type="primary" danger @click="userInfoStore.logout">登出</a-button>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown-button>
    </div>
</template>

<script setup lang="ts">
import { userInfoStore } from '@/store/modules'
</script>

<style scoped></style>
