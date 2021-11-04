import { ServiceItem } from '@/types/interface-model';

const mobile: ServiceItem[] = [
  {
    path: '/beforeOp/op/list',
    key: 'getOperationRoom',
    method: 'post',
  },
  {
    path: '/todayOp/oproom/list',
    key: 'getOperatingRoom',
    method: 'post',
  },
  {
    path: '/todayOp/op/detail',
    key: 'getOperatDetail',
    method: 'get',
  },
];
export { mobile };
