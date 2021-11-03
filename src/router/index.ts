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
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '../views/test.vue')
  },
  {
    path: '/operatRoom',
    name: 'OperatRoom',
    component: () => import(/* webpackChunkName: "OperatRoom" */ '../views/mobile/OperatRoom.vue')
  },
  {
    path: '/operatDetail',
    name: 'OperatDetail',
    component: () => import(/* webpackChunkName: "OperatDetail" */ '../views/mobile/OperatDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
