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
    component: () => import(/* webpackChunkName: "test" */ '../views/test.vue')
  },
  {
    path: '/operatingRoom',
    name: 'OperatingRoom',
    component: () => import(/* webpackChunkName: "operatingRoom" */ '../views/mobile/OperatingRoom.vue')
  },
  {
    path: '/operatDetail',
    name: 'OperatDetail',
    component: () => import(/* webpackChunkName: "operatDetail" */ '../views/mobile/OperatDetail.vue')
  },
  {
    path: '/operationRoom',
    name: 'OperationRoom',
    component: () => import(/* webpackChunkName: "operationRoom" */ '../views/mobile/OperationRoom.vue')
  },
  {
    path: '/clearTask',
    name: 'ClearTask',
    component: () => import(/* webpackChunkName: "clearTask" */ '../views/mobile/ClearTask.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
