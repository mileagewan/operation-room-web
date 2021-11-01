import { VNode } from 'vue';

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

export interface StateUser {
  user: any;
  sso: Sso;
}

export interface Column {
  width?: string | number;
  label?: string;
  title: string;
  dataIndex?: string;
  fixed?: string;
  type?: string;
  trueWidth?: string;
  minWidth?: string;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  total?: number;
  type?: string;
}

export interface SelectOption {
  label?: string;
  value?: string | number;
  orgName?: string;
  orgId?: string;
  standardClassifyId?: string;
  standardName?: string;
  dicManagementId?: string;
  dicName?: string;
}


export interface rule {
  required?: boolean;
  pattern?: string | RegExp;
  message?: string | Function;
  validator?: Function;
  trigger: string;
  min?: number;
  max?: number;
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

export interface PaMessageOptions {
  title: string;
  message: VNode|string;
  closable?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  customClass?: any;
}

