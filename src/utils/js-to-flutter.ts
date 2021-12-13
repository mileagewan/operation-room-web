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

  // 退出登录
  static logout(): void {
    try {
      window.flutter_inappwebview.callHandler('jsCallFlutter', 'logout', false)
    } catch (e) {
      console.log(e)
    }
  }

  // 通知flutter更新红点
  static notifyFlutterRead(id:string):void {
    try {
      window.flutter_inappwebview.callHandler(
        'jsCallFlutter',
        'setMessageRead', id
      )
    } catch (e) {
      console.log(e)
    }
  }

  // 首次进去获取是否是扫码进入
  static getPatientIdByWorkspace(): Promise<string> {
    return new Promise(resolve => {
      window.flutter_inappwebview
        .callHandler('jsCallFlutter', 'getPatientId')
        .then((result:string) => {
          resolve(result)
        });
    })
  }
}
