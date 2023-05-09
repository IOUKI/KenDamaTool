<template>
    <ContentLayout>
        <div class="w-full h-auto flex justify-start">
            這什麼地方？
        </div>
        <div class="w-full h-auto flex justify-end">
            選單點開來看就對了...
        </div>
    </ContentLayout>
</template>

<script setup>
import { defineComponent } from 'vue'
import ContentLayout from '@/components/ContentLayout.vue'

defineComponent({
    components: {
        ContentLayout,
    }
})
</script>