<!--
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-09-07 10:36:53
 * @LastEditTime: 2022-11-04 11:25:03
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
                        <div class="body-container" :style="page.props">
                            <EditWrapper v-for="component in components" :id="component.id" :key="component.id" :props="component.props" @onItemClick="onHandelItemClick">
                                <component :is="useComponentWidthName(component.name as ComponentName)" v-bind="component.props" style="position: 'sticky'"></component>
                            </EditWrapper>
                        </div>
                        <!-- <z-text v-for="component in components" :key="component.id" v-bind="component.props" /> -->
                    </div>
                </a-layout-content>
                <!-- 右边组件属性 -->
                <a-layout-sider width="25vw" style="background: white">
                    <div class="common editor__right">
                        <a-tabs v-model:activeKey="activeKey">
                            <a-tab-pane key="1" tab="属性">
                                <template v-if="currentElement">
                                    <template v-if="!currentElement.isLocked">
                                        <EditorGroup :props="currentElement.props" @change="onChange"></EditorGroup>
                                        <!-- <PropsTable :props="currentElement.props" @change="onChange" /> -->
                                        <pre>
                                            {{ currentElement?.props }}
                                        </pre>
                                        <Handles type="delete" text="删除" @handleClick="handleClickDelete" />
                                    </template>
                                    <template v-else>
                                        <div>图层已锁定</div>
                                    </template>
                                </template>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="图层" force-render>
                                <LayerList @handle-change="changeLayer" />
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="页面设置" force-render>
                                <PropsTable :props="page.props" @change="changePageData" />
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </a-layout-sider>
            </a-layout>
        </a-layout>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import initHotKeys from '@/plugins/hotKeys'
import Header from '../../components/common/Header.vue'
import ComponentTemplateList from '@/components/editor/ComponentTemplateList.vue'
import { defaultTextTemplates } from '@/defaultTemplates'
import { editorStore } from '@/store/modules'
import useComponentWidthName, { ComponentName } from '@/hooks/useComponentWithName'
import EditWrapper from '@/components/editor/EditWrapper.vue'
import PropsTable from '@/components/editor/PropsTable.vue'
import EditorGroup from '@/components/editor/EditorGroup.vue'
import LayerList from '@/components/editor/LayerList.vue'
import Handles from '@/components/editor/Handles'
import { ComponentData } from '@/store/modules/editor'
import { ChangeEmitType } from '@/components/editor/LayerList.vue'
import mitt from '@/utils/mitt'

initHotKeys()

type UpdateCompnentType = {
    key: any
    value: any
}
mitt.on('updateComponent', (data) => {
    editorStore.updateComponent(data as UpdateCompnentType)
})

const components = computed(() => editorStore.$state.components)

const currentElement = computed(() => editorStore.currentElementData)
watch(currentElement, (val) => {
    console.log('val', val)
})
const onTemplateItemClick = (componentInfo: ComponentData) => {
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

const changeLayer = (data: ChangeEmitType) => {
    editorStore.updateComponent(data)
}

const activeKey = ref('1')

const page = computed(() => editorStore.page)

const changePageData = (e: any) => {
    editorStore.setPageData(e)
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
        @apply max-w-[375px] min-h-[200px] overflow-y-auto overflow-x-hidden fixed mt-[50px] max-h-[80vh] bg-white;
        @include b(body-container) {
        }
    }
    @include e(right) {
        @apply px-5 py-5 w-[100%] h-[100%] overflow-auto;
    }
}
</style>
