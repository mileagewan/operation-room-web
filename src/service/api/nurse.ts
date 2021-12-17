import { ServiceItem } from '@/types/interface-model';

const POST = 'post';

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

  // 查询当前 常规
  {
    path: '/opTask/queryCurrentOpTaskList',
    method: 'post',
    key: 'queryCurrentOpTaskList'
  },

  // 查询当前 清洁任务
  {
    path: '/opTask/queryCurrentOpCleanTaskList',
    method: POST,
    key: 'queryCurrentOpCleanTask'
  },

  // 查询汇总
  {
    path: '/opInfo/queryOpSummaryList',
    method: 'post',
    key: 'queryOpSummaryList'
  },

  // 已完成
  {
    path: '/opTask/queryCompletedOpTask',
    method: 'post',
    key: 'queryCompletedOpTask'
  },

  // 广播地址
  {
    path: '/pushMsg/opRoom/broadcast/data',
    method: 'post',
    key: 'broadcastData'
  },

  // todo广播
  {
    path: '/pushMsg/opRoom/broadcast',
    method: 'post',
    key: 'broadcastMsg',
  },

  // 复苏室地址
  {
    path: '/opInfo/getIcuWardList',
    method: 'post',
    key: 'getIcuWardList'
  },

  // todo 手术结束 -> 复苏室
  {
    path: '/flowRever/next/recover',
    method: 'post',
    key: 'flowReverNextRecover'
  },

  // 查询总协调
  {
    path: '/opTask/queryCurrentAbnormalOpTaskList',
    method: 'post',
    key: 'queryCurrentAbnormalOpTaskList'
  },

  // 总协调术间列表
  {
    path: '/opInfo/queryOpDepartmentSituation',
    method: 'post',
    key: 'queryOpDepartmentSituation'
  },

  // 总协调 -> 单个手术间
  {
    path: '/opInfo/queryOpRoomOpDetailsList',
    method: POST,
    key: 'queryOpRoomOpDetailsList'
  },

  // 总协调 -> 复苏室
  {
    path: '/opInfo/queryRecoveryRoomOpDetailsList',
    method: POST,
    key: 'queryRecoveryRoomOpDetailsList'
  },

  // todo 流程扭转
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

  // todo 通知下一台
  {
    path: '/flowRever/notify/nextOpInfo',
    method: 'post',
    key: 'nextOpInfo'
  },

  // todo 开始消毒
  {
    path: '/flowRever/next/disinfect',
    method: 'post',
    key: 'flowReverNextDisinfect'
  },

  // 更新已读的红点
  {
    path: '/appMsg/update/read',
    method: POST,
    key: 'updateRead'
  },

  {
    path: '/opInfo/data/sync',
    method: POST,
    key: 'dataSync'
  },

  // 查询下一台手术列表
  {
    path: '/opTask/queryOpRoomNextOpDetailsList',
    method: POST,
    key: 'queryOpRoomNextOpDetailsList'
  },

  // 查询家属
  {
    path: '/opTask/queryNotifyFamilyDetailsList',
    method: POST,
    key: 'queryNotifyFamilyDetailsList'
  }
];
export { nurse };
