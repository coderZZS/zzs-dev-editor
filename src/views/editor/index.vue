<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-07 10:36:53
 * @LastEditTime: 2022-09-08 17:14:39
-->
<template>
    <div class="editor">
        <a-layout>
            <a-layout-header>
                <Header />
            </a-layout-header>
            <a-layout>
                <!-- 左侧组件列表 -->
                <a-layout-sider>
                    <div class="common">
                        <ComponentTemplateList :list="defaultTextTemplates" @onItemClick="onTemplateItemClick" />
                    </div>
                </a-layout-sider>
                <!-- 画布 -->
                <a-layout-content>
                    <div class="common">
                        <EditWrapper v-for="component in components" :id="component.id" :key="component.id" @onItemClick="onHandelItemClick">
                            <component :is="useComponentWidthName(component.name as ComponentName)" v-bind="component.props"></component>
                        </EditWrapper>
                        <!-- <z-text v-for="component in components" :key="component.id" v-bind="component.props" /> -->
                    </div>
                </a-layout-content>
                <!-- 右边组件属性 -->
                <a-layout-sider>
                    <div class="common">
                        <PropsTable v-if="currentElement" :props="currentElement.props" />
                        <pre>
                            {{ currentElement?.props }}
                        </pre>
                    </div>
                </a-layout-sider>
            </a-layout>
        </a-layout>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Header from '../../components/common/Header.vue'
import ComponentTemplateList from '@/components/editor/ComponentTemplateList.vue'
import { defaultTextTemplates } from '@/defaultTemplates'
import { editorStore } from '@/store/modules'
import useComponentWidthName, { ComponentName } from '@/hooks/useComponentWithName'
import { CommonDefaultProps } from '@/defaultProps'
import EditWrapper from '@/components/editor/EditWrapper.vue'
import PropsTable from '@/components/editor/PropsTable.vue'

const components = computed(() => editorStore.$state.components)

const currentElement = computed(() => editorStore.$state.currentElementData)
const onTemplateItemClick = (componentInfo: CommonDefaultProps) => {
    editorStore.addComponent(componentInfo)
}

const onHandelItemClick = (id: string) => {
    editorStore.setActiveComponent(id)
}
</script>

<style scoped lang="scss">
@include b(editor) {
    @apply h-[100%] flex flex-row;
    @include b(common) {
        @apply bg-slate-400 h-[100%] relative;
    }
}
</style>
