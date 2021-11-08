import { ServiceItem } from '@/types/interface-model';

const mobile: ServiceItem[] = [
  {
    path: '/beforeOp/op/list',
    key: 'getOperationRoom', // 手术室
    method: 'post',
  },
  {
    path: '/todayOp/oproom/list', // 手术间
    key: 'getOperatingRoom',
    method: 'post',
  },
  {
    path: '/todayOp/op/detail', // 手术详情
    key: 'getOperatDetail',
    method: 'post',
  },
  {
    path: '/todayOp/task/list', // 清洁任务
    key: 'getClearTask',
    method: 'post',
  },
  {
    path: '/todayOp/task/update', // 清洁任务完成
    key: 'getClearTaskUpdate',
    method: 'post',
  },
];
export { mobile };
