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

];
export { nurse };
