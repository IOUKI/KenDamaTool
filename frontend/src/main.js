import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index.js'

// vue date picker
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

app.use(router)

app.component('VueDatePicker', VueDatePicker)

app.mount('#app')

// 防止手機平板點擊兩下放大畫面
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
let lastTouchEnd = 0;
