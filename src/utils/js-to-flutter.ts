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
        resolve(sessionStorage.getItem('login'))
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
