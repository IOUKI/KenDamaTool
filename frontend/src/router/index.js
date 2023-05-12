import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: 'KenDamaTool'
        }
    },
    {
        path: '/counter',
        name: 'Counter',
        component: () => import('@/views/Counter.vue'),
        meta: {
            title: 'Counter'
        }
    },
    {
        path: '/lightningBattle',
        name: 'LightningBattle',
        component: () => import('@/views/LightningBattle.vue'),
        meta: {
            title: 'LightningBattle'
        }
    },
    {
        path: '/battle',
        name: 'Battle',
        component: () => import('@/views/Battle.vue'),
        meta: {
            title: 'Battle'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router