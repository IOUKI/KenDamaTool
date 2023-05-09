<template>
    <ContentLayout>
        <div class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Info</span>
            <div v-if="encourageText !== null">
                <p>{{ encourageText }}</p>
            </div>
            <div v-else>
                <p>單純計數做招次數用的頁面</p>
            </div>
        </div>

        <!-- title -->
        <ContentTitle>
            <template #title>
                <h3 class="flex items-center">
                    <span class="w-6 h-6 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-hammer"
                            viewBox="0 0 16 16">
                            <path
                                d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z" />
                        </svg>
                    </span>
                    招式計數
                </h3>
            </template>
            <template #modalTitle>
                招式計數
            </template>
            <template #modalContent>
                單純計數做招次數用<br />
                <h3 class="text-5xl">
                    尻就對了
                </h3>
            </template>
        </ContentTitle>
        <div class="w-full h-auto my-20 flex justify-center">
            <h5 class="text-7xl animate-neon dark:animate-neon-dark">{{ count }}</h5>
        </div>
        <div class="w-full h-auto my-3 flex justify-center animate-neon">
            <button type="button" @click="countAdd"
                class="w-full lg:w-auto h-20 lg:h-auto flex justify-center items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                <span class="w-10 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg>
                </span>
            </button>
        </div>
        <div class="w-full h-auto my-3 flex justify-center">
            <button type="button" @click="countReset"
                class="w-1/2 lg:w-auto h-20 lg:h-auto flex justify-center items-center text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-2">
                <span class="w-10 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-clockwise"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                        <path
                            d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                    </svg>
                </span>
            </button>
            <button type="button" @click="countReduce"
                class="w-1/2 lg:w-auto h-20 lg:h-auto flex justify-center items-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                <span class="w-10 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                    </svg>
                </span>
            </button>
        </div>
    </ContentLayout>
</template>

<script setup>
import { defineComponent, onMounted, ref } from 'vue'
import ContentLayout from '@/components/ContentLayout.vue'
import PageTitle from '@/components/PageTitle.vue'
import ContentTitle from '@/components/ContentTitle.vue'

const encourageTexts = [
    '遇到困難時不要放棄，因為挫折是成功的催化劑。',
    '每一次的嘗試都是一種經驗，只要你不斷嘗試，你就會學到更多。',
    '每一個人都有自己的價值，不要輕易放棄自己。',
    '相信自己，你可以做到。',
    '有時候，成功並不是最終的目標，堅持下去才是最重要的。',
    '當你走在失落的路上，不要忘記你是可以改變方向的。',
    '每個人的路都不一樣，請相信自己的選擇。',
    '成功不是一個人的事，有時候需要團隊的努力。',
    '相信自己，就算路上艱難重重，你也能走過去。',
    '逆境中的你，就是成長中的你。',
    '別讓失敗的陰影籠罩你的心靈，因為你還有機會。',
    '即使你現在看不到未來，也不要放棄自己。',
    '失敗不是一個人的事，成功也不是一個人的事。',
    '每一次的嘗試都是一種收穫，你會在下一次做得更好。',
    '珍惜每一個機會，因為機會隻有一次。',
    '每一次的失敗都是一種經驗，請好好珍惜。',
    '即使現在看起來很困難，也不要放棄希望。',
    '每一步都是一個新的起點，請勇敢向前。',
    '別忘了，每個人都有自己的價值。',
    '即使是小小的進步，也是一個值得慶祝的里程碑。',
    '相信自己，你可以做到你想做的任何事。',
    '當你走在失落的路上，不要忘記你還有你自己。',
    '成功的路上充滿了挑戰，但是挑戰也是成長的機會。',
    '每一個人都有自己的長處，不要放棄自己。',
    '當你的夢想還沒有實現的時候，請不要放棄。',
]

const encourageText = ref(null)

const showEncourage = () => {
    const textsLen = encourageTexts.length
    const index = Math.floor(Math.random() * textsLen)
    encourageText.value = encourageTexts[index]
}

const count = ref(0)

const countAdd = () => {
    count.value += 1
    showEncourage()
}

const countReduce = () => {
    if (count.value > 0) {
        count.value -= 1
    }
}

const countReset = () => {
    count.value = 0
}

defineComponent({
    components: {
        ContentLayout,
        PageTitle,
        ContentTitle,
    }
})
</script>