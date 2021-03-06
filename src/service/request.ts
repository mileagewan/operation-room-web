import Axios, { AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';
import { ListServiceMap, TargetServiceMap } from '@/service/cfg';
import { RequestQuery, ServiceItem } from '@/types/interface-model';
import { SsoLogin } from '@/service/sso-login';
import qs from 'qs';
import JsToFlutter from '@/utils/js-to-flutter';

Axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token: string | null = await JsToFlutter.getToken() as string;
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

  static BASE_URL = process.env.VUE_APP_API;

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
    if (paramsQuery) {
      const paramsQueryTmp = paramsQuery;
      const paramsQueryArray = paramsQueryTmp.split('&');
      if (paramsQueryArray.length === 1) {
        const [keys, values] = paramsQueryArray[0].split('=');
        if (!Reflect.has(data, keys)) {
          (data as any)[keys] = values
        }
      }
    }
    queryParams = Object.assign(
      {
        url: `${this.BASE_URL}${cfgService.path}${path || ''
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
    // ?????????????????????blob
    const blob = new Blob([response.data], {
      type: 'application/zip',
    });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // ??????IE???window.navigator.msSaveBlob??????????????????????????????
      window.navigator.msSaveBlob(blob, decodeURI(fileName));
    } else {
      // ????????????URL?????????File????????????Blob???????????????
      const blobURL = window.URL.createObjectURL(blob);
      // ??????a????????????????????????????????????
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', decodeURI(fileName));
      // ?????????????????????????????????HTML5???download??????
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      // ??????a??????
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      // ??????blob URL??????
      window.URL.revokeObjectURL(blobURL);
    }
  }

  static excel(response: any): void {
    const fileName =
      response.headers['content-disposition'].match(/filename=(.*)/)[1];
    // ?????????????????????blob
    const blob = new Blob([response.data], {
      type: 'application/octet-stream',
    });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // ??????IE???window.navigator.msSaveBlob??????????????????????????????
      window.navigator.msSaveBlob(blob, decodeURI(fileName));
    } else {
      // ????????????URL?????????File????????????Blob???????????????
      const blobURL = window.URL.createObjectURL(blob);
      // ??????a????????????????????????????????????
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', decodeURI(fileName));
      // ?????????????????????????????????HTML5???download??????
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      // ??????a??????
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      // ??????blob URL??????
      window.URL.revokeObjectURL(blobURL);
    }
  }

  static setToken(): void {
    this.axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
      const token: string | null = await JsToFlutter.getToken() as string;
      const configs = config;
      configs.headers = {};
      configs.headers.token = token;
      configs.headers['X-Auth-Token'] = token;
      return configs;
    });
  }
}

export default Request;
