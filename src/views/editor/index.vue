<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-07 10:36:53
 * @LastEditTime: 2022-09-07 15:51:33
-->
<template>
    <div class="editor">
        <a-layout>
            <a-layout-header>
                <Header />
            </a-layout-header>
            <a-layout>
                <a-layout-sider>
                    <div class="common">列表组件</div>
                </a-layout-sider>
                <a-layout-content>
                    <div class="common">画布区域</div>
                </a-layout-content>
                <a-layout-sider>
                    <div class="common">组件属性</div>
                </a-layout-sider>
            </a-layout>
        </a-layout>
    </div>
</template>

<script setup lang="ts">
import Header from '../../components/common/Header.vue'
</script>

<style scoped lang="scss">
@include b(editor) {
    @apply h-[100%] flex flex-row;
    @include b(common) {
        @apply bg-slate-400 h-[100%];
    }
}
</style>
