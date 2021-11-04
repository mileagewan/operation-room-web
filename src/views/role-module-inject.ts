import { RoleModuleMap } from '@/types/interface-model';
import { defineAsyncComponent } from 'vue';

export const RoleModuleInject: RoleModuleMap[] = [
  {
    role: '1',
    roleName: '病区护士',
    lists: [
      {
        label: '今日任务',
        component: 'WardNurCurrent'
      },
      {
        label: '手术汇总',
        component: 'ItinerantNurSummary'
      },
      {
        label: '已完成任务',
        component: 'WardNurDone'
      }
    ]
  },
  {
    role: '2',
    roleName: '转运护工',
    lists: [
      {
        label: '今日任务',
        component: 'TransferNurCurrent'
      },
      {
        label: '任务池',
        component: 'TransferNurSummary'
      },
      {
        label: '已完成任务',
        component: 'TransferNurDone'
      }
    ]
  },
  {
    role: '3',
    roleName: '手术室接送护士',
    lists: [
      {
        label: '当前任务',
        component: 'OpratorTransferNurCurrent'
      },
      {
        label: '已完成任务',
        component: 'OpratorTransferNurDone'
      }
    ]
  },
  {
    role: '4',
    roleName: '巡回护士',
    lists: [
      {
        label: '当前任务',
        component: 'ItinerantNurCurrent'
      },
      {
        label: '手术汇总',
        component: 'ItinerantNurSummary'
      },
      {
        label: '已完成任务',
        component: 'ItinerantNurDone'
      }
    ]
  },
  {
    role: '5',
    roleName: '复苏室护士',
    lists: [
      {
        label: '当前任务',
        component: 'ResuscitationNurCurrent'
      },
      {
        label: '已完成任务',
        component: 'ResuscitationNurDone'
      }
    ]
  },
  {
    role: '6',
    roleName: '总协调护士',
    lists: [
      {
        label: '当前任务',
        component: 'ChiefNurCurrent'
      },
      {
        label: '手术汇总',
        component: 'SurgicalSummary'
      },
    ]
  }
]

export const components = {
  // 病区护士
  WardNurCurrent: defineAsyncComponent(() => import(
    /* webpackChunkName: "WardNurCurrent" */ '@/views/ward-nurse/WardNurCurrent.vue'
  )),
  WardNurSummary: defineAsyncComponent(() => import(
    /* webpackChunkName: "WardNurSummary" */ '@/views/ward-nurse/WardNurSummary.vue'
  )),
  WardNurDone: defineAsyncComponent(() => import(
    /* webpackChunkName: "WardNurDone" */ '@/views/ward-nurse/WardNurDone.vue'
  )),

  // 转运护工
  TransferNurCurrent: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/transfer-nurse/TransferNurCurrent.vue'
  )),
  TransferNurSummary: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/transfer-nurse/TransferNurSummary.vue'
  )),
  TransferNurDone: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/transfer-nurse/TransferNurDone.vue'
  )),

  // 手术室接送护工
  OpratorTransferNurCurrent: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/operating-transfer-nurse/OpratorTransferNurCurrent.vue'
  )),
  OpratorTransferNurDone: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/operating-transfer-nurse/OpratorTransferNurDone.vue'
  )),

  // 巡回护士
  ItinerantNurCurrent: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/itinerant-nurse/ItinerantNurCurrent.vue'
  )),
  ItinerantNurSummary: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/itinerant-nurse/ItinerantNurSummary.vue'
  )),
  ItinerantNurDone: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/itinerant-nurse/ItinerantNurDone.vue'
  )),

  // 复苏室护士
  ResuscitationNurCurrent: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/resuscitation-nurse/ResuscitationNurCurrent.vue'
  )),
  ResuscitationNurDone: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/resuscitation-nurse/ResuscitationNurDone.vue'
  )),

  // 总协调护士
  ChiefNurCurrent: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/chief-coordination-nurse/ChiefNurCurrent.vue'
  )),
  SurgicalSummary: defineAsyncComponent(() => import(
    /* webpackChunkName: "TransferNurCurrent" */ '@/views/chief-coordination-nurse/SurgicalSummary.vue'
  )),

}
