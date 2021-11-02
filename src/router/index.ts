import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/pda-views'
  },
  {
    path: '/pda-views',
    name: 'PdaViews',
    component: () => import(/* webpackChunkName: "about" */ '../views/PdaViews.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "about" */ '../views/test.vue')
  },
  {
    path: '/operatRoom',
    name: 'OperatRoom',
    component: () => import(/* webpackChunkName: "about" */ '../views/mobile/OperatRoom.vue')
  },
  {
    path: '/operatDetail',
    name: 'OperatDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/mobile/OperatDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
