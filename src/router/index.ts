import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Operator from '../views/Operator.vue'
import Handler from '../views/handle/Handler.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:platform',
    name: 'Operator',
    component: Operator,
    children: [
      {
        path: ':symbol/:contractType/:direction/:offset',
        name: 'Handler',
        component: Handler
      }
    ]
  },
  { path: '', redirect: "/virtual" }
]

const router = createRouter({
  history: createWebHistory('/operator'),
  routes
})

export default router
