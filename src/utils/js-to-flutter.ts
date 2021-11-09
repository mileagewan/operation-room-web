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
        // 病区护士
        resolve('c75b5d7938c440149d97c2a4ac957a55.eyJleHAiOjE2MzcwNTQwNjksInVzZXIiOiJjbG91ZC1ob3NwaXRhbDphcHBVc2VyQDUxIn0.B9b4Lc4u7jlIL9-Vjx83N7yLlAqDsNJxfPBrU9b4hqs')
        // 转运工
        // resolve('8d2a622d73604147993061ae4a379237.eyJleHAiOjE2MzcwNDYxNDgsInVzZXIiOiJjbG91ZC1ob3NwaXRhbDphcHBVc2VyQDUyIn0.WG30GBGWNyeo_H5mCwnadI1xtcAdUGbrpPs_MIZptv8')
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
