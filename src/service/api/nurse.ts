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
