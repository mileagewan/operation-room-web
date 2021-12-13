import { ServiceItem } from '@/types/interface-model';

const nurse: ServiceItem[] = [
  /* {
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
    path: '/nurseOperate/notifyNextOperation',
    key: 'notifyNextOperation',
    method: 'post',
  },
  //    病区护士：  呼叫护工
  {
    path: '/nurseOperate/wardNurseCall',
    key: 'wardNurseCall',
    method: 'post',
  },
  //    病区护士：  接收手术患者回病房
  {
    path: '/nurseOperate/wardNurseReceive',
    key: 'wardNurseReceive',
    method: 'post',
  },
  //      接收任务
  {
    path: '/nurseOperate/recoveryTask',
    key: 'recoveryTask',
    method: 'post',
  },
  //      转运工确认交接（送手术室）
  {
    path: '/nurseOperate/wardNurseHandover',
    key: 'wardNurseHandover',
    method: 'post',
  },
  //      转运工确认交接（从手术室接回病区）
  {
    path: '/nurseOperate/pickupNurseHandoverToWard',
    key: 'pickupNurseHandoverToWard',
    method: 'post',
  },
  //      手术室前接送护士确认交接
  {
    path: '/nurseOperate/transferWorkHandover',
    key: 'transferWorkHandover',
    method: 'post',
  },
  //      手术室前接送护士确认交接(从手术室出来)
  {
    path: '/nurseOperate/circuitNurseHandoverToWard',
    key: 'circuitNurseHandoverToWard',
    method: 'post',
  },

  // 扫码交接/人工(接送 -> 巡回)
  {
    path: '/nurseOperate/pickupNurseHandoverToOp',
    key: 'pickupNurseHandover',
    method: 'post',
  },
  // 三方确认
  {
    path: '/nurseOperate/tripartiteConfirmation',
    key: 'tripartiteConfirmation',
    method: 'post',
  },
  // 手术开始
  {
    path: '/nurseOperate/opStart',
    key: 'opStart',
    method: 'post',
  },
  {
    path: '/nurseOperate/getWardList',
    key: 'getWardList',
    method: 'post'
  },
  // 手术结束
  {
    path: '/nurseOperate/opEnd',
    key: 'opEnd',
    method: 'post',
  },
  // 测试数据(传入opCode就从此台手术后加数据,不传重置默认数据)
  {
    path: '/nurseOperate/test',
    key: 'nurseOperateTest',
    method: 'post',
  },

  // 扫码/人工  巡回-> 复苏
  {
    path: '/nurseOperate/circuitNurseHandoverToRecovery',
    key: 'circuitNurseHandoverToRecovery',
    method: 'post',
  },
  // 呼叫运工
  {
    path: '/nurseOperate/recoveryRoomNurseCall',
    key: 'recoveryRoomNurseCall',
    method: 'post',
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
  }, */

  {
    path: '/opTask/queryCurrentOpTaskList',
    method: 'post',
    key: 'queryCurrentOpTaskList'
  },

  {
    path: '/opInfo/queryOpSummaryList',
    method: 'post',
    key: 'queryOpSummaryList'
  },

  {
    path: '/opTask/queryCurrentAbnormalOpTaskList',
    method: 'post',
    key: 'queryCurrentAbnormalOpTaskList'
  },

  {
    path: '/flowRever/normal/next',
    method: 'post',
    key: 'flowReverNormalNext'
  },
  {
    path: '/flowRever/input/next',
    method: 'post',
    key: 'flowReverInputNext'
  },
  {
    path: '/flowRever/scan/next',
    method: 'post',
    key: 'flowReverScanNext'
  },
];
export { nurse };
