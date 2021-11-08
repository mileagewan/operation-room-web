export default class JsToFlutter {
  static startScanQRCode(): Promise<any> {
    return new Promise(resolve => {
      try {
        window.flutter_inappwebview
          .callHandler('jsCallFlutter', 'startScanQRCode')
          .then((ret: any) => {
            resolve(ret)
          });
      } catch (e) {
        console.log(e)
        resolve(false)
      }
    })
  }

  static goback(): void {
    try {
      window.flutter_inappwebview.callHandler('jsCallFlutter', 'goback');
    } catch (e) {
      console.log(e)
    }
  }

  static getToken(): Promise<any> {
    return new Promise(resolve => {
      try {
        window.flutter_inappwebview
          .callHandler('jsCallFlutter', 'getToken')
          .then((result:string) => {
            resolve(result)
          });
      } catch (e) {
        // resolve(process.env.VUE_APP_TOKEN as string)
        resolve('a5ffc9a4aee748d08bbdc7a0d24d7b8d.eyJleHAiOjE2MzY5ODI4NTYsInVzZXIiOiJjbG91ZC1ob3NwaXRhbDphcHBVc2VyQDQ3In0.VSuKKP8C_INN3aQhtzdH_r5l6KigB4rG_5uS1hFMQlk')
      }
    })
  }

  static logout(): void {
    try {
      window.flutter_inappwebview.callHandler('jsCallFlutter', 'logout', false)
    } catch (e) {
      console.log(e)
    }
  }
}
