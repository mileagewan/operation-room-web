import Axios, { AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';
import { ListServiceMap, TargetServiceMap } from '@/service/cfg';
import { RequestQuery, ServiceItem } from '@/types/interface-model';
import { SsoLogin } from '@/service/sso-login';
import qs from 'qs';

Axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token: string | null =
    localStorage.getItem('token') ||
    '70350ce036e843cd986b96d7c12e14da.eyJleHAiOjE2MzY3ODI4MTEsInVzZXIiOiJjbG91ZC1ob3NwaXRhbDphcHBVc2VyQDQ5In0.9E_XfvxLKiUUqzFw7FfVOxKStO1K52ztz6CRP6-9ung';
  const configs = config;
  configs.headers = {};
  configs.headers['Content-Type'] = 'application/json;charset=UTF-8';
  configs.headers['Cache-Control'] = 'no-cache';
  configs.headers.Pragma = 'no-cache';
  configs.headers.token = token;
  configs.headers['X-Auth-Token'] = token;
  if (config.method === 'get') {
    configs.paramsSerializer = function (params: any) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    };
  }
  return configs;
});

Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (
      response.headers['content-type'] ===
      'application/octet-stream;charset=UTF-8'
    ) {
      return response;
    }
    if (
      response.headers['content-type'].includes('excel') ||
      response.headers['content-type'].includes('zip')
    ) {
      return response;
    }
    let result: any;
    const { code } = response.data;
    switch (code) {
      case 0:
      case 200:
        result = response.data;
        break;
      case 401:
      case 403:
        SsoLogin();
        break;
      default:
        result = response.data;
        break;
    }
    return result;
  },
  (error: Error) => {
    console.error(error);
  }
);

class Request implements RequestQuery {
  static axios: AxiosStatic = Axios;

  static BASE_URL = process.env.BASE_URL;

  static xhr(
    key: string,
    data = {},
    paramsQuery?: string,
    path?: string,
    cfgTarget?: string
  ): any {
    let serviceList: Map<string, ServiceItem> = ListServiceMap;

    if (cfgTarget) {
      serviceList = TargetServiceMap.get(cfgTarget) as Map<string, ServiceItem>;
    }
    const cfgService: ServiceItem = serviceList.get(key) as ServiceItem;
    if (!cfgService) {
      return;
    }
    let queryParams: AxiosRequestConfig = {};
    switch (cfgService.method.toLocaleString()) {
      case 'post':
      case 'delete':
        queryParams.data = data;
        break;
      default:
        queryParams.params = data;
        break;
    }
    queryParams = Object.assign(
      {
        url: `${this.BASE_URL}${process.env.VUE_APP_SERVICE}${cfgService.path}${
          path || ''
        }${paramsQuery ? `?${paramsQuery}` : ''}`,
        method: cfgService.method,
      },
      queryParams
    );
    if (cfgService.type === 'blob') {
      let contentType = '';
      switch (cfgService.fileType) {
        case 'excel':
          contentType = 'application/vnd.ms-excel;charset=utf-8';
          break;
        case 'zip':
          contentType = 'application/x-zip-compressed';
          break;
        default:
          contentType = 'application/json';
          break;
      }
      queryParams = Object.assign(
        {
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': contentType,
            Accept: '*/*',
            withCredentials: true,
          },
          responseType: 'blob',
        },
        queryParams
      );
    }
    return this.axios(queryParams);
  }

  static zip(response: any): void {
    const fileName =
      response.headers['content-disposition'].match(/filename=(.*)/)[1];
    // 将二进制流转为blob
    const blob = new Blob([response.data], {
      type: 'application/zip',
    });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
      window.navigator.msSaveBlob(blob, decodeURI(fileName));
    } else {
      // 创建新的URL并指向File对象或者Blob对象的地址
      const blobURL = window.URL.createObjectURL(blob);
      // 创建a标签，用于跳转至下载链接
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', decodeURI(fileName));
      // 兼容：某些浏览器不支持HTML5的download属性
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      // 挂载a标签
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      // 释放blob URL地址
      window.URL.revokeObjectURL(blobURL);
    }
  }

  static excel(response: any): void {
    const fileName =
      response.headers['content-disposition'].match(/filename=(.*)/)[1];
    // 将二进制流转为blob
    const blob = new Blob([response.data], {
      type: 'application/octet-stream',
    });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
      window.navigator.msSaveBlob(blob, decodeURI(fileName));
    } else {
      // 创建新的URL并指向File对象或者Blob对象的地址
      const blobURL = window.URL.createObjectURL(blob);
      // 创建a标签，用于跳转至下载链接
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', decodeURI(fileName));
      // 兼容：某些浏览器不支持HTML5的download属性
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      // 挂载a标签
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      // 释放blob URL地址
      window.URL.revokeObjectURL(blobURL);
    }
  }

  static setToken(): void {
    this.axios.interceptors.request.use((config: AxiosRequestConfig) => {
      const token: string | null = localStorage.getItem('token') || '';
      const configs = config;
      configs.headers = {};
      configs.headers.token = token;
      configs.headers['X-Auth-Token'] = token;
      return configs;
    });
  }
}

export default Request;
