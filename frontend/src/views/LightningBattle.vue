<template>
    <ContentLayout>
        <ContentTitle>
            <template #title>
                <h3 class="flex items-center">
                    <span class="w-6 h-6 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-lightning-charge-fill"
                            viewBox="0 0 16 16">
                            <path
                                d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                        </svg>
                    </span>
                    閃電戰
                </h3>
            </template>
            <template #modalTitle>
                閃電戰
            </template>
            <template #modalContent>
                <h3 class="text-3xl mb-3">遊玩方式</h3>
                <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 mb-3">
                    <li>
                        遊玩人數為2
                    </li>
                    <li>
                        雙方先決定本次比賽的指定招式
                    </li>
                    <li>
                        雙方有相同的時間
                    </li>
                    <li>
                        比賽開始時會有一方的時間開始倒數計時，
                        倒數計時的那方要將指定招式做成功，
                        然後點擊螢幕上的區塊，
                        接下來換成對方時間開始倒數然後做招(依此類推)
                    </li>
                    <li>
                        最後有一方時間倒數為零的時候，那方就輸了(End)
                    </li>
                </ul>
                <h3 class="text-3xl">準備開始時，請將手機改為橫幅</h3>
            </template>
        </ContentTitle>

        <div class="w-full h-auto my-5">
            <h3 class="text-3xl mb-2">選擇時間</h3>
            <VueDatePicker v-model="date" time-picker :start-time="startTime" placeholder="請選擇時間" dark />
        </div>

        <div class="w-full h-auto flex justify-end">
            <button
                @click="readyStart" 
                type="button" 
                class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                準備開始
            </button>
        </div>

        <!-- 倒數畫面 -->
        <div ref="playGround" class="w-full h-full text-white fixed top-0 left-0 hidden bg-gradient-to-r from-red-700 to-blue-700 z-50">
            <!-- 退出按鈕 -->
            <div class="w-full h-auto flex justify-center">
                <div @click="gameOver" class="flex absolute top-4">
                    <span class="w-10 h-10 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
                            <path fill-rule="evenodd"
                                d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg>
                    </span>
                    <h3 class="text-4xl">退出</h3>
                </div>
            </div>
            <!-- 玩家1和玩家2時間字串 -->
            <div class="w-full h-full flex text-black">
                <div @click="play2Start" class="w-1/2 h-full text-8xl flex justify-center items-center">
                    <div class="text-center">
                        <p ref="play1Time">
                            {{ play1.min }}:{{ play1.sec }}
                        </p>
                    </div>
                </div>
                <div @click="play1Start" class="w-1/2 h-full text-8xl flex justify-center items-center">
                    <div class="text-center">
                        <p ref="play2Time">
                            {{ play2.min }}:{{ play2.sec }}
                        </p>
                    </div>
                </div>
            </div>
            <!-- 遊戲開始提示 -->
            <div v-if="gameStart == false" class="w-full h-auto flex justify-center">
                <div class="flex absolute bottom-7">
                    <h3 class="text-3xl animate-bounce">請幫起手的玩家點擊自己的時間開始遊戲</h3>
                </div>
            </div>
        </div>

        <!-- 結束畫面 -->
        <div @click="gameOver" ref="awards" class="w-full h-full fixed top-0 left-0 hidden text-white bg-gray-900 z-50">
            <div class="w-full h-full flex justify-center items-center text-9xl">
                <h1 v-if="play1Running" class="animate-neon-dark">BLUE WIN!</h1>
                <h1 v-if="play2Running" class="animate-neon-dark">RED WIN!</h1>
                <h5 class="text-gray-500 text-3xl absolute bottom-7 animate-bounce">點擊畫面任意處退出</h5>
            </div>
        </div>
    </ContentLayout>

</template>

<script setup>
import { defineComponent, ref, watch } from 'vue'
import ContentLayout from '@/components/ContentLayout.vue'
import ContentTitle from '@/components/ContentTitle.vue'

// dom
const play1Time = ref()
const play2Time = ref()
const playGround = ref()
const awards = ref()

// game start toggle
const gameStart = ref(false)
const gameEnd = ref(false)

// 倒數toggle
const play1Running = ref(false)
const play2Running = ref(false)

const date = ref()
const play1 = ref({ min: '0', sec: '0' })
const play2 = ref({ min: '0', sec: '0' })
const startTime = ref({ hours: 0, minutes: 0 })

const readyStart = () => {
    if (typeof date.value !== 'undefined') {
        let min = date.value.hours
        let sec = date.value.minutes

        if (min < 10) min = `0${min}`
        else min = min.toString()

        if (sec < 10) sec = `0${sec}`
        else sec = sec.toString()

        play1.value.min = min
        play1.value.sec = sec
        play2.value.min = min
        play2.value.sec = sec

        playGround.value.classList.remove('hidden')
    }
}

const play1Start = async () => {
    const reduceSec = async () => {
        let min = parseInt(play1.value.min )
        let sec = parseInt(play1.value.sec) 
        if (sec === 0 & min === 0) { // game end
            gameEnd.value = true
        } else if (sec > 0) { // sec - 1
            sec -= 1
        } else if (sec === 0 & min > 0) { // min - 1
            min -= 1
            sec = 59
        }

        if (min < 10) min = `0${min}`
        else min = min.toString()

        if (sec < 10) sec = `0${sec}`
        else sec = sec.toString()

        play1.value.min = min
        play1.value.sec = sec

        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (play1Running.value === false) {
        gameStart.value = true
        play2Running.value = false
        play1Running.value = true

        play1Time.value.classList.add('animate-bounce')
        play1Time.value.classList.add('text-white')
        play2Time.value.classList.remove('animate-bounce')
        play2Time.value.classList.remove('text-white')
    
        while (play1Running.value) {
            await reduceSec()
        }
    }

}

const play2Start = async () => {
    const reduceSec = async () => {
        let min = parseInt(play2.value.min )
        let sec = parseInt(play2.value.sec) 
        if (sec === 0 & min === 0) { // game end
            gameEnd.value = true
        } else if (sec > 0) { // sec - 1
            sec -= 1
        } else if (sec === 0 & min > 0) { // min - 1
            min -= 1
            sec = 59
        }

        if (min < 10) min = `0${min}`
        else min = min.toString()

        if (sec < 10) sec = `0${sec}`
        else sec = sec.toString()

        play2.value.min = min
        play2.value.sec = sec

        return new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    if (play2Running.value === false) {
        gameStart.value = true
        play1Running.value = false
        play2Running.value = true

        play2Time.value.classList.add('animate-bounce')
        play2Time.value.classList.add('text-white')
        play1Time.value.classList.remove('animate-bounce')
        play1Time.value.classList.remove('text-white')
    
        while (play2Running.value) {
            await reduceSec()
        }
    }

}

const gameOver = () => {
    gameStart.value = false
    gameEnd.value = false 
    play1Running.value = false 
    play2Running.value = false 
    play1Time.value.classList.remove('animate-bounce')
    play2Time.value.classList.remove('animate-bounce')
    play1Time.value.classList.remove('text-white')
    play2Time.value.classList.remove('text-white')
    playGround.value.classList.add('hidden')
    awards.value.classList.add('hidden')
}

watch(gameEnd, (newValue, oldValue) => {
    if (gameStart.value === true & newValue === true) {
        playGround.value.classList.add('hidden')
        awards.value.classList.remove('hidden')
    }
})

defineComponent({
    components: {
        ContentLayout,
        ContentTitle,
    }
})
</script>