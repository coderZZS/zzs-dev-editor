<template>
    <div class="my-table">
        <!-- 这里放需要固定的 -->
        <div v-for="(item, index) in fixedTable" :key="index" class="col fixed-container">
            <div class="col-title">{{ item.title }}</div>
            <div v-for="(data, key) in item.values" :key="key">
                <div class="col-data border-top">
                    {{ data }}
                </div>
            </div>
        </div>
        <div class="auto-container">
            <!-- 这里放不需要固定的 -->
            <div v-for="(item, index) in autoTable" :key="index" class="col">
                <div class="col-title">{{ item.title }}</div>
                <div v-for="(data, key) in item.values" :key="key">
                    <div class="col-data border-top">
                        {{ data }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
interface TableTitle {
    title: string
    key: string
    fixed?: boolean
    values: string[]
}
const values = [
    {
        title: '菜',
        age: '18',
        hobby: '唱',
        other: '...',
    },
    {
        title: '虚',
        age: '19',
        hobby: '跳',
        other: '...',
    },
    {
        title: '坤',
        age: '20',
        hobby: 'rap',
        other: '...',
    },
]
const tableValue = ref<TableTitle[]>([
    { title: '标题', key: 'title', values: [], fixed: true },
    { title: '年龄', key: 'age', values: [] },
    { title: '爱好', key: 'hobby', values: [] },
    { title: '其他', key: 'other', values: [] },
])
setTimeout(() => {
    tableValue.value = tableValue.value.map((v) => {
        values.forEach((item) => {
            v.values.push((item as any)[v.key])
        })
        return v
    })
}, 500)
const fixedTable = ref<TableTitle[]>([])
const autoTable = ref<TableTitle[]>([])
watch(
    () => tableValue,
    (list) => {
        fixedTable.value = list.value.filter((v) => v.fixed)
        autoTable.value = list.value.filter((v) => !v.fixed)
    },
    {
        deep: true,
    }
)
</script>

<style scoped lang="scss">
.my-table {
    width: 375px;
    display: flex;
    overflow: auto;

    .col {
        border: 1px solid #e5e5e5;
        width: 130px;
        .border-top {
            border-top: 1px solid #e5e5e5;
        }
    }
    .fixed-container {
        width: 100px;
    }
    .auto-container {
        width: 275px;
        overflow: auto;
        display: flex;
        .col {
            scrollbar-width:none;
            flex-shrink: 0;
            width: 120px;
            border: 1px red solid;
        }
    }
}
</style>
