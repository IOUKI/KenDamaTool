<template>
    <ContentLayout>
        <!-- title -->
        <ContentTitle>
            <template #title>
                招式計數
            </template>
            <template #modalTitle>
                招式計數
            </template>
            <template #modalContent>
                單純計數做招次數用
            </template>
        </ContentTitle>
        <div class="w-full h-auto my-20 flex justify-center">
            <h5 class="text-7xl">{{ count }}</h5>
        </div>
        <button @click="countPlusPlus" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+</button>
    </ContentLayout>
</template>

<script setup>
import { defineComponent, ref } from 'vue'
import ContentLayout from '@/components/ContentLayout.vue'
import PageTitle from '@/components/PageTitle.vue'
import ContentTitle from '@/components/ContentTitle.vue'

const count = ref(0)

const countPlusPlus = () => {
    count.value += 1
}

defineComponent({
    components: {
        ContentLayout,
        PageTitle,
        ContentTitle,
    }
})
</script>