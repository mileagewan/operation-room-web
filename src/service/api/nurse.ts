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

  {
    path: '/test',
    key: 'manualOk',
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
