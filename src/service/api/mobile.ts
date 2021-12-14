import { ServiceItem } from '@/types/interface-model';

const mobile: ServiceItem[] = [
  {
    path: '/opInfo/queryTodayOpList',
    key: 'queryTodayOpList', // 今日手术
    method: 'post',
  },
  {
    path: '/opInfo/queryTomorrowOpList',
    key: 'queryTomorrowOpList', // 明日手术
    method: 'post',
  },
  {
    path: '/opInfo/queryOpRoomOpArrangeList', // 手术间
    key: 'getOperatingRoom',
    method: 'post',
  },
  {
    path: '/opInfo/queryStartedOpDetails', // 手术详情
    key: 'getOperatDetail',
    method: 'post',
  },
  {
    path: '/opTask/queryCurrentCleanTaskList', // 清洁任务
    key: 'queryCurrentCleanTaskList',
    method: 'post',
  },
  {
    path: '/flowRever/next/cleanFinish', // 清洁任务触发完成
    key: 'getClearTaskUpdate',
    method: 'post',
  },
  {
    path: '/opTask/queryCompletedCleanTask', // 清洁任务完成
    key: 'queryCompletedCleanTask',
    method: 'post',
  },
];
export { mobile };
