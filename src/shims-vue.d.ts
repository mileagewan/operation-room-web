/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'lodash/upperFirst' {
  const upperFirst: any;
  export default upperFirst;
}

declare module 'lodash/camelCase' {
  const camelCase: any;
  export default camelCase;
}
declare module 'lodash/cloneDeep'{
  const cloneDeep: any;
  export default cloneDeep;
}
declare module 'lodash'
declare module 'tiny-emitter'



declare const VConsole: Function<T>;
declare interface Window {
  flutter_inappwebview:any;
}
