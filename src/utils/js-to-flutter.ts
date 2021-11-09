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
        resolve('27a5e1d8f1b745cbb7382d9b945d6850.eyJleHAiOjE2MzcwNjExMjAsInVzZXIiOiJjbG91ZC1ob3NwaXRhbDphcHBVc2VyQDUxIn0._0ggGRZZeTrl2afz5CRLZ1Rek_Y5Vpxt_pVU8BvToKI')
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
