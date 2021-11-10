import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/pda-views'
  },
  {
    path: '/pda-views',
    name: 'PdaViews',
    component: () => import(/* webpackChunkName: "PdaViews" */ '../views/PdaViews.vue')
  },
  {
    path: '/room-detail',
    name: 'RoomDetail',
    component: () => import(/* webpackChunkName: "RoomDetail" */ '../views/chief-coordination-nurse/RoomDetail.vue')
  },
  {
    path: '/surgical-detail',
    name: 'SurgicalDetail',
    component: () => import(/* webpackChunkName: "SurgicalDetails" */ '../views/itinerant-nurse/SurgicalDetails.vue')
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
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
