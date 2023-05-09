import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/counter',
        name: 'Counter',
        component: () => import('@/views/Counter.vue')
    },
    {
        path: '/lightningBattle',
        name: 'LightningBattle',
        component: () => import('@/views/LightningBattle.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router