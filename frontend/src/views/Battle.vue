<template>
    <ContentLayout>
        <ContentTitle>
            <template #title>
                <h3 class="flex items-center">
                    <span class="w-6 h-6 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16">
                            <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
                        </svg>
                    </span>
                    BATTLE
                </h3>
            </template>
            <template #modalTitle>
                BATTLE
            </template>
            <template #modalContent>
                <h3 class="text-xl">
                    遊戲規則玩家互相自訂<br />
                    這個只是單純的記分板
                </h3>
            </template>
        </ContentTitle>

        <div class="w-full h-auto my-4">
            <div class="w-full h-auto flex">
                <div class="relative z-0 w-full mb-6 group">
                    <input v-model="newUserName" type="text" id="playName" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="playName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">玩家名稱</label>
                </div>
            </div>
            <div class="w-full h-auto flex">
                <button @click="addUser" type="button" class="w-full lg:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    新增玩家
                </button>
            </div>
            <div class="w-full h-auto flex">
                <button @click="resetScore" type="button" class="w-full lg:w-auto focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                    重置分數
                </button>
            </div>
        </div>
        <div v-for="(user, index) in users" :key="user" class="w-full h-auto mb-2">
            <div class="p-3 border-2 border-gray-200 rounded-lg dark:border-gray-700">
                <div class="w-full flex text-xl lg:text-3xl">
                    <div class="w-1/2">
                        <h3>名稱：{{ user.userName }}</h3>
                    </div>
                    <div class="w-1/2">
                        <h3>分數：{{ user.score }}</h3>
                    </div>
                </div>
                <div class="flex justify-around">
                    <button @click="addScore(index)" type="button" class="lg:w-full lg:mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        加分
                    </button>
                    <button @click="reduceScore(index)" type="button" class="lg:w-full lg:mx-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        減分
                    </button>
                    <button @click="removeUser(index)" type="button" class="lg:w-full lg:mx-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        移除
                    </button>
                </div>
            </div>
        </div>
    </ContentLayout>    
</template>

<script setup>
import { defineComponent, ref } from 'vue'
import ContentLayout from '@/components/ContentLayout.vue'
import ContentTitle from '@/components/ContentTitle.vue'

const newUserName = ref('')
const users = ref([])

const addUser = () => {
    users.value.push({
        userName: newUserName.value,
        score: 0
    })
}

// delete user
const removeUser = (index) => {
    let newUsers = []
    for (let i = 0; i < users.value.length; i++) {
        if (i !== index) {
            newUsers.push(users.value[i])
        }
    }
    users.value = newUsers
}

const addScore = (index) => {
    for (let i = 0; i < users.value.length; i++) {
        if (i === index) {
            users.value[i].score += 1
        }
    }
}

const reduceScore = (index) => {
    for (let i = 0; i < users.value.length; i++) {
        if (i === index) {
            users.value[i].score -= 1
        }
    }
}

// reset all users score => 0
const resetScore = () => {
    users.value.forEach(user => {
        user.score = 0
    })
}

defineComponent({
    components: {
        ContentLayout,
        ContentTitle,
    }
})
</script>