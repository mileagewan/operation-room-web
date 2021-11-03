import { ServiceItem } from '@/types/interface-model';

const mobile: ServiceItem[] = [
  {
    path: '/op/list',
    key: 'getOperationRoom',
    method: 'post',
  },
  {
    path: '/api/sso/login/logout',
    key: 'toLogout',
    method: 'post',
  },
  {
    path: '/api/anonymous/web-init-params',
    key: 'getSso',
    method: 'get',
  },
];
export { mobile };
