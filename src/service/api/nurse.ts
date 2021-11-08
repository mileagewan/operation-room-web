import { ServiceItem } from '@/types/interface-model';

const nurse: ServiceItem[] = [
  {
    path: '/itinerantnurse/getcurrenttask',
    key: 'itinerGetcurrenttask',
    method: 'post',
  },

  {
    path: '/itinerantnurse/gettotaltask',
    key: 'itinerGettotaltask',
    method: 'post',
  },

  //    查询当前任务卡片列表
  {
    path: '/nurse/queryCurrentTaskList',
    key: 'queryCurrentTaskList',
    method: 'post',
  },
  //    查询手术汇总卡片列表
  {
    path: '/nurse/querySummaryTaskList',
    key: 'querySummaryTaskList',
    method: 'post',
  },
  //     查询已完成任务卡片列表
  {
    path: '/nurse/queryCompletedTaskList',
    key: 'queryCompletedTaskList',
    method: 'post',
  },
  //      查询任务池卡片列表
  {
    path: '/nurse/queryTaskPoolList',
    key: 'queryTaskPoolList',
    method: 'post',
  },
  //      触发下台手术任务
  {
    path: '/nurseOperate/createNextOpTask',
    key: 'createNextOpTask',
    method: 'post',
  },
  //      呼叫护工
  {
    path: '/nurseOperate/wardNurseCall',
    key: 'wardNurseCall',
    method: 'post',
  },
  //      接收任务
  {
    path: '/nurseOperate/recoveryTask',
    key: 'recoveryTask',
    method: 'post',
  },
  //      转运工确认交接
  {
    path: '/nurseOperate/wardNurseHandover',
    key: 'wardNurseHandover',
    method: 'post',
  },
  //      手术室前接送护士确认交接
  {
    path: 'nurseOperate/transferWorkHandover',
    key: 'transferWorkHandover',
    method: 'post',
  },

  // 扫码交接/人工(接送 -> 巡回)
  {
    path: '/nurseOperate/pickupNurseHandover',
    key: 'pickupNurseHandover',
    method: 'post'
  },
  // 三方确认
  {
    path: '/nurseOperate/tripartiteConfirmation',
    key: 'tripartiteConfirmation',
    method: 'post'
  },
  // 手术开始
  {
    path: '/nurseOperate/opStart',
    key: 'opStart',
    method: 'post'
  },
  // 手术结束
  {
    path: '/nurseOperate/opEnd',
    key: 'opEnd',
    method: 'post'
  },
  {
    path: '/nurseOperate/notifyNextOperation',
    key: 'notifyNextOperation',
    method: 'post'
  },

  // 扫码/人工  巡回-> 复苏
  {
    path: '/nurseOperate/circuitNurseHandoverToRecovery',
    key: 'circuitNurseHandoverToRecovery',
    method: 'post'
  },
  // 呼叫运工
  {
    path: '/nurseOperate/recoveryRoomNurseCall',
    key: 'recoveryRoomNurseCall',
    method: 'post'
  },
  // 总协调护士
  {
    path: '/operationroom/getcurrenttask',
    key: 'roomGettotaltask',
    method: 'post',
  },

  {
    path: '/operationroom/getoproomlist',
    key: 'itinerGetoproomlist',
    method: 'post',
  },
  {
    path: '/tOpSyncInfo/syncOpDatas',
    key: 'syncOpDatas',
    method: 'post',
  },
];
export { nurse };
