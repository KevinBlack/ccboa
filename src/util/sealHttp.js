/*
 * @Author: wy
 * @Date: 2021-05-18 16:27:08
 * @LastEditTime: 2021-12-21 10:40:46
 * @LastEditors: Please set LastEditors
 * @Description: 印控仪联调请求进程方法
 * @FilePath: \ccboaweb-dev-20210528fenku\src\util\sealHttp.js
 */
import { Loading, Message } from 'element-ui'
function sealHttp (driveName = '', reqObj = {}) {
  return new Promise((resolve, reject) => {
    let loading = Loading.service({
      lock: true,
      text: "loading"
    })
    let data = ''
    data += '<?xml version="1.0" encoding="UTF-8"?>'
    data += '<request>'
    for (const key in reqObj) {
      if (Object.hasOwnProperty.call(reqObj, key)) {
        const element = reqObj[key];
        data += '<item name="' + key + '" >' + element + '</item>'
      }
    }
    data += '</request>'
    let requestText = new DOMParser().parseFromString(data, 'text/xml')
    console.log(`🚀 %c请求:${reqObj.action}`, 'color:green', driveName, requestText)
    let xmlHttp = new XMLHttpRequest()
    driveName = driveName.toUpperCase()
    driveName = driveName === 'CCBSRVC' ? 'CcbSrvc' : 'CCBCTRL' ? 'CcbCtrl' : ''
    let serverUrl = 'http://localhost:8087/' + driveName
    xmlHttp.open('POST', serverUrl, true)
    xmlHttp.setRequestHeader("Content-Type", "text/xml;charset=utf-8")
    xmlHttp.send(data)
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        let responseText = xmlHttp.responseText
        /**
         * 解析返回报文
         */
        responseText = new DOMParser().parseFromString(responseText, 'text/xml')
        console.log(`🚀 %c响应：${reqObj.action}`, 'color:red', responseText)
        let responsestatus = responseText.getElementsByTagName('responsestatus')[0].innerHTML
        let responsetext = responseText.getElementsByTagName('responsetext')[0].innerHTML
        resolve({ responsestatus, responsetext })
        loading && loading.close()
      }
    }
    xmlHttp.onerror = function (error) {
      reject(error)
      Message({
        message: "请连接印控仪并安装及开启相应进程！",
        type: "error",
        duration: 2500
      })
      loading && loading.close()
    };
  })
}
export default sealHttp