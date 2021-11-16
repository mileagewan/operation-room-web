
export abstract class RequestQuery {
  static BASE_URL: string;
  static xhr: Promise<any>;
}

export interface ServiceItem {
  path: string ;
  key: string;
  method: string;
  fileType?: string;
  type?: string;
}

export interface Sso {
  'sso.login-url': string;
  'session.head-name': string;
  'sso.system-code': string;
  'sso.user-center-url': string;
}
export interface ReturnData {
  code: number;
  data: any;
  msg: null | string |undefined;
  page?: any;
}

export interface ReturnContent {
  code: number;
  content: any;
  msg: null | string | undefined;
}

export interface RoleModuleItem {
  label: string;
  component: any;
}

export interface RoleModuleMap {
  role: string;
  roleName?: string;
  lists: RoleModuleItem[];
}

export interface Task {
  key: string;
  label: string;
  value: string;
  danger?:any;
  format?:(v:any) => any;
}
