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
        // 转运工
        resolve('b801fdad3e194192a31a32f9a56f4132.eyJleHAiOjE2MzcwMzIzMjgsInVzZXIiOiJjbG91ZC1ob3NwaXRhbDphcHBVc2VyQDUyIn0.5Fzr8k-iJN4KdMluNQH6Pk2cS2G7XuauJ1_wNyDw9Kc')
        // 接送护士
        // resolve('7350b141285c4003b5b011472d98cb96.eyJleHAiOjE2MzcwMjc5MTYsInVzZXIiOiJjbG91ZC1ob3NwaXRhbDphcHBVc2VyQDM5In0.THrNj0PXhAYcgrdroDNS0I6sWifhHKBAX2uFPrruXIs')
        // resolve(process.env.VUE_APP_TOKEN as string)
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
