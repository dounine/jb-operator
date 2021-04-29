import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'
import Operator from '../views/Operator.vue'
import Handler from '../views/handle/Handler.vue'
import Offset from '../views/handle/Offset.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/index.html',
        name: 'udp',
        component: Operator
    },
    {
        path: '/',
        redirect: '/dist/index.html'
    }
]

declare const window: any;
const router = createRouter({
    history: createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/udp' : '/'),
    routes
})

export default router
