<template>
    <div class="home">
        <a-layout justify="space-around">
            <a-layout-header>
                <Header />
            </a-layout-header>
            <a-layout-content class="bg-white">
                <div class="p-10">
                    <a-row type="flex" :gutter="32">
                        <a-col v-for="(item, i) in 6" :key="i" :span="6">
                            <router-link :to="{ name: 'editor' }">
                                <ProductCard />
                            </router-link>
                        </a-col>
                    </a-row>
                </div>
            </a-layout-content>
            <a-layout-footer>Footer</a-layout-footer>
        </a-layout>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/common/Header.vue'
import ProductCard from '@/components/home/ProductCard.vue'
</script>

<style scoped lang="scss">
@include b(home) {
    height: 100%;
}
</style>
