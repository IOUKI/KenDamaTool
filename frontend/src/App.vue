<template>
    <div class="w-full h-auto">
        <Loading></Loading>
        <Sidebar></Sidebar>
        <SidebarToggle></SidebarToggle>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { onMounted, defineComponent, nextTick } from 'vue'
import { initFlowbite } from 'flowbite'
import Sidebar from './components/Sidebar.vue'
import SidebarToggle from '@/components/SidebarToggle.vue'
import Loading from './components/Loading.vue'

defineComponent({
    components: {
        Sidebar,
        SidebarToggle,
        Loading,
    }
})

onMounted(() => {
    nextTick(() => {
        initFlowbite();
    })
})
</script>