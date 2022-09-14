<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-07 10:36:53
 * @LastEditTime: 2022-09-14 09:14:57
-->
<template>
    <div class="editor">
        <a-layout>
            <a-layout-header>
                <Header />
            </a-layout-header>
            <a-layout>
                <!-- 左侧组件列表 -->
                <a-layout-sider width="25vw">
                    <div class="common editor__left" style="background: white">
                        <ComponentTemplateList :list="defaultTextTemplates" @onItemClick="onTemplateItemClick" />
                    </div>
                </a-layout-sider>
                <!-- 画布 -->
                <a-layout-content width="50vw">
                    <div>画布区域</div>
                    <div class="common editor__center">
                        <EditWrapper v-for="component in components" :id="component.id" :key="component.id" @onItemClick="onHandelItemClick">
                            <component :is="useComponentWidthName(component.name as ComponentName)" v-bind="component.props"></component>
                        </EditWrapper>
                        <!-- <z-text v-for="component in components" :key="component.id" v-bind="component.props" /> -->
                    </div>
                </a-layout-content>
                <!-- 右边组件属性 -->
                <a-layout-sider width="25vw" style="background: white">
                    <div class="common editor__right">
                        <template v-if="currentElement">
                            <PropsTable :props="currentElement.props" @change="onChange" />
                            <pre>
                                {{ currentElement?.props }}
                            </pre>
                            <Handles type="delete" text="删除" @handleClick="handleClickDelete" />
                        </template>
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
import Handles from '@/components/editor/Handles'

const components = computed(() => editorStore.$state.components)

const currentElement = computed(() => editorStore.currentElementData)
const onTemplateItemClick = (componentInfo: CommonDefaultProps) => {
    editorStore.addComponent(componentInfo)
}

const onHandelItemClick = (id: string) => {
    editorStore.setActiveComponent(id)
}

const onChange = (e: any) => {
    editorStore.updateComponent(e)
}

const handleClickDelete = () => {
    editorStore.deleteComponent()
}
</script>

<style scoped lang="scss">
@include b(editor) {
    @apply w-[100%] h-[100%] flex flex-row;
    @include b(common) {
        @apply h-[100%] relative;
    }
    @include e(left) {
        @apply bg-white;
    }
    @include e(center) {
        margin: 0 auto;
        @apply w-[60%] bg-white top-[10%];
        height: 60% !important;
    }
    @include e(right) {
        @apply px-5 py-5 w-[100%] h-[100%] overflow-auto;
    }
}
</style>
