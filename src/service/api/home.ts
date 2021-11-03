import { ServiceItem } from '@/types/interface-model';

const home: ServiceItem[] = [
  {
    path: '/api/sso/login',
    key: 'getToken',
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
export { home };
