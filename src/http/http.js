/**
 * create by zx on 2020-1-4 10:02
 * 类注释：http拦截
 * 备注：
 */
import {
  Message,
  Loading
} from 'element-ui'
import dateFormate from "@/util/filters.js";
// let BASE_URL = 'http://rap2.taobao.org:38080/app/mock/120238/officeToPDF/';
// let isP2Server = process.env.NODE_ENV == 'production'

var choseYear = ""
let isP2Server = process.env.NODE_ENV != 'development'
// const isP2Server = false
// let BASE_URL = isP2Server ? '' : 'http://128.192.222.115:9090/' //wxm
let BASE_URL = isP2Server ? '' : 'http://128.171.127.32:10900/oa/'

export default {
  /**
   * 当前环境标示
   * */
  getEnvState() {
    return isP2Server;
  },
  /**
   * 隐秘加载
   * @param url
   * @param data
   * @param fwTranId // 交易线id
   */
  postNoLoading(url, data, fwTranId) {
    return this.postData(url, data, fwTranId, '', false)
  },
  /**
   * 等待框加载
   * @param url
   * @param data
   * @param fwTranId
   */
  postNeedLoading(url, data, fwTranId) {
    return this.postData(url, data, fwTranId, '', true)
  },
  /**
   * 分页加载
   * @param url
   * @param data
   * @param fwTranId
   * @param pagination
   */
  postNeedPage(url, data, fwTranId, pagination) {
    return this.postData(url, data, fwTranId, pagination, true)
  },
  /**
   * post请求
   * @param url
   * @param data
   * @param fwTranId
   * @returns {Promise<any>}
   */
  postData(url, data, fwTranId, pagination, needLoading) {
    console.log(window.document.location.href.indexOf("choseYear"))
    if (window.document.location.href.indexOf("choseYear") > 0) {
      let transNum = window.document.location.href.slice(window.document.location.href.indexOf("choseYear") + 10, window.document.location.href.indexOf("choseYear") + 11)
      if (transNum != "" && transNum != "&") {
        choseYear = window.document.location.href.slice(window.document.location.href.indexOf("choseYear") + 10, window.document.location.href.indexOf("choseYear") + 14);
        console.log("0303HAHAHA")
      } else {
        choseYear = ""
      }
    } else {
      choseYear = ""
    }
    data = Object.assign(data, {
      'choseYear': choseYear
    });

    let loadingState;
    //下载交易线更改
    if (url == "doDownloadFile") {
      //增加文件名处理
      //去除文件名格式
      let filesNameArray = (data && JSON.parse(data) && JSON.parse(data).fileName.split(".")) || [];
      let filesName = '';
      if (filesNameArray.length > 1) {
        filesNameArray = filesNameArray.filter((n, i) => {
          return i < filesNameArray.length - 1;
        })
      }
      filesName = filesNameArray.join(".");
      localStorage.setItem('saveFileName', localStorage.getItem("saveSpecialFileName") ? localStorage.getItem("saveSpecialFileName") : filesName);
      fwTranId = 'A0846C071';
    }
    if (!needLoading) { //此处反向取值
      loadingState = Loading.service({
        fullscreen: true,
        lock: true
      })
    }
    setTimeout(() => {
      if (loadingState) {
        loadingState.close();
      }
    }, 10000)
    switch (fwTranId) {
      case "A0846C023": //公共
        BASE_URL = isP2Server ? '' : 'http://128.32.96.144:10900/'
        break;
      case "A0846C024": //公共  附件
        BASE_URL = isP2Server ? '' : 'http://128.32.96.144:10990/'
        break;
      case "A0846C025": //首页
        BASE_URL = isP2Server ? '' : 'http://128.192.202.152:10988/'
        break;
      case "A0846C027": //首页
        BASE_URL = isP2Server ? '' : 'http://128.192.202.152:10988/'
        break;
      case "A0846C029": //首页
        BASE_URL = isP2Server ? '' : 'http://128.192.202.152:10988/'
        break;
      case "A0846C055": //登录
        //BASE_URL = isP2Server ? '' : 'http://128.192.216.165:10990/xtdl/'
        BASE_URL = isP2Server ? '' : 'http://10.239.6.44:8088/xtdl/'
        //BASE_URL = isP2Server ? '' : 'http://20.239.6.45:8080/xtdl/'
        break;
      case "A0846C001": //发文-
        BASE_URL = isP2Server ? '' : 'http://128.192.202.22:10997/fwgl/'
        break;
      case "A0846C002": //发文
        BASE_URL = isP2Server ? '' : 'http://128.198.202.22:10997/fwgl/'
        break;
      case "A0846C003": //收文
        BASE_URL = isP2Server ? '' : 'http://128.198.121.30:10994/swgl/'
        break;
      case "A0846C004": //收文
        BASE_URL = isP2Server ? '' : 'http://128.198.121.30:10994/swgl/'
        break;
      case "A0846C012": //团队任务
        BASE_URL = isP2Server ? '' : 'http://128.198.121.62:9091/'
        break;
      case "A0846C007": //专项督办
        BASE_URL = isP2Server ? '' : 'http://128.192.202.152:10992/zxdb/'
        break;
      case "A0846C008": //专项督办
        BASE_URL = isP2Server ? '' : 'http://128.192.202.152:10992/zxdb/'
        break;
      case "A0846C021": //专项督办
        BASE_URL = isP2Server ? '' : 'http://128.192.202.152:10999/'
        break;
      case "A0846C022": //专项督办
        BASE_URL = isP2Server ? '' : 'http://128.192.202.152:10999/'
        break;
      case "A0846C017": //效能看板
        BASE_URL = isP2Server ? '' : 'http://128.198.122.226:10999/'
        break;
      case "A0846C005": //签报 
        BASE_URL = isP2Server ? '' : 'http://128.192.202.152:10993/'
        break;
      case "A0846C006": //签报  附件
        BASE_URL = isP2Server ? '' : 'http://128.192.202.152:10993/'
        break;
      case "A0846C010": //团队
        BASE_URL = isP2Server ? '' : 'http://128.198.121.62:9091/'
        break;
      case "A0846C011": //团队
        BASE_URL = isP2Server ? '' : 'http://128.198.121.62:9091/'
        break;
      case "A0846C019": // 服务保障 操作指南
        BASE_URL = isP2Server ? '' : 'http://128.196.221.51:10995/'
        break;
      case "A0846C020": //服务保障 操作指南 附件
        BASE_URL = isP2Server ? '' : 'http://128.196.221.51:10995/'
        break;
      case "A0846C013": //转授权
        BASE_URL = isP2Server ? '' : 'http://128.192.202.22:9090/'
        break;
      case "A0846C015": //模板 范文
        BASE_URL = isP2Server ? '' : 'http://128.198.120.48:9092/'
        break;
      case "A0846C016": //模板 范文 附件
        BASE_URL = isP2Server ? '' : 'http://128.198.120.48:9092/'
        break;
      case "A0846C088": //会议室
        BASE_URL = isP2Server ? '' : 'http://128.198.123.178:10999/'
        //BASE_URL = isP2Server ? '' : 'http://128.198.121.62:10999/'
        break;
    }
    if (url != 'checkUassLogin' && url != 'xiaominPCLogin') {
      data = JSON.parse(data)
      data.st = localStorage.getItem('st')
      data.st_token = localStorage.getItem('st_token')
      data.choseYear = choseYear
      data.ip = localStorage.getItem("ip") || '127.0.0.1'
      if (!data.st) {
        routers.push("/login")
        return
      }
      data = JSON.stringify(data)
    } else {
      // "http://128.32.96.144:10997/"
      //BASE_URL = isP2Server ? '' : 'http://128.192.216.165:10990/xtdl/'
      BASE_URL = isP2Server ? '' : 'http://10.239.6.44:8088/xtdl/'
      // BASE_URL = isP2Server ? '' : 'http://128.192.220.242:10900/oa/'
    }
    url = BASE_URL + url
    return new Promise((resolve, reject) => {
      if (isP2Server) {
        let condition = {
          OPER_CODE: '123456', // 人员code
          BRANCH_ID: localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) && JSON.parse(localStorage.getItem("userInfo")).areaCode || '123456789', // 分库机构号
          requestBody: {},
          _pagination: {}
        }
        condition.requestBody = JSON.stringify(JSON.parse(data))
        if (JSON.parse(data).page && JSON.parse(data).limit) {
          let page = {
            PAGE_JUMP: JSON.parse(data).page,
            REC_IN_PAGE: JSON.parse(data).limit
          };
          condition._pagination = page
        }
        PJF.communication.cpsJsonReq({
          url: 'ecpJson.action',
          fwServiceId: 'simpleTransaction',
          fwTranId: fwTranId,
          maskAll: false,
          jsonData: JSON.stringify(condition),
          success: function (res) {
            if (loadingState) {
              loadingState.close();
            }
            if (JSON.parse(res.Data_Cntnt).tokenFlag || url == 'checkUassLogin') {
              resolve(JSON.parse(res.Data_Cntnt))
            } else {
              localStorage.clear();
              Message({
                message: "当前登录已失效，请重新登录",
                type: "error",
                duration: 2000,
                offset: 100
              })
              Message.closeAll();
              var fromOtherSys = localStorage.getItem("fromOtherOrg");
              if (fromOtherSys) {
                localStorage.setItem("fromOtherOrg", "true");
              }
              routers.push("/login")
              return;
            }
          },
          failure: function (err) {
            if (loadingState) {
              loadingState.close();
            }
            reject(err)
          }
        })
      } else {
        let data_COM4 = ''
        let isTime = dateFormate.dataFormat(Date.parse(new Date()))
        let isToday = dateFormate.date(Date.parse(new Date()))
        isToday = isToday.replace(/-/g, "")
        isTime = isTime.replace(/-/g, "")
        isTime = isTime.replace(/:/g, "")
        isTime = isTime.replace(/\s/g, "") + "000"
        if (!JSON.parse(data).page || !JSON.parse(data).limit) {
          data_COM4 = ''
        } else {
          data_COM4 = '<COM4>' + '<REC_IN_PAGE>' + JSON.parse(data).limit + '</REC_IN_PAGE>' + '<PAGE_JUMP>' + JSON.parse(data).page + '</PAGE_JUMP>' + '</COM4>'
        }
        const queryStr = '<?xml version="1.0" encoding="UTF-8" ?>' +
          '<TX>' +
          '<TX_HEADER>' +
          '<SYS_HDR_LEN>100</SYS_HDR_LEN>' +
          '<SYS_PKG_VRSN>v1</SYS_PKG_VRSN>' +
          '<SYS_TTL_LEN>400</SYS_TTL_LEN>' +
          '<SYS_REQ_SEC_ID>123456</SYS_REQ_SEC_ID>' +
          '<SYS_SND_SEC_ID>987654</SYS_SND_SEC_ID>' +
          '<SYS_TX_CODE>' + fwTranId + '</SYS_TX_CODE>' +
          '<SYS_TX_VRSN>v0</SYS_TX_VRSN>' +
          '<SYS_TX_TYPE>00000</SYS_TX_TYPE>' +
          '<SYS_RESERVED>AA</SYS_RESERVED>' +
          '<SYS_EVT_TRACE_ID>1147319008</SYS_EVT_TRACE_ID>' +
          '<SYS_SND_SERIAL_NO>0000000000</SYS_SND_SERIAL_NO>' +
          '<SYS_PKG_TYPE>A</SYS_PKG_TYPE>' +
          '<SYS_MSG_LEN>100</SYS_MSG_LEN>' +
          '<SYS_IS_ENCRYPTED>N</SYS_IS_ENCRYPTED>' +
          '<SYS_ENCRYPT_TYPE>R</SYS_ENCRYPT_TYPE>' +
          '<SYS_COMPRESS_TYPE>T</SYS_COMPRESS_TYPE>' +
          '<SYS_EMB_MSG_LEN>200</SYS_EMB_MSG_LEN>' +
          '<SYS_REQ_TIME>' + isTime + '</SYS_REQ_TIME>' +
          '<SYS_TIME_LEFT>235555550</SYS_TIME_LEFT>' +
          '<SYS_PKG_STS_TYPE>00</SYS_PKG_STS_TYPE>' +
          '<SYS_SEC_CONTEXT_LEN>8</SYS_SEC_CONTEXT_LEN>' +
          '<SYS_SEC_CONTEXT>fengshijie</SYS_SEC_CONTEXT>' +
          '</TX_HEADER>' +
          '<TX_BODY>' +
          '<COMMON>' +
          '<COM1>' +
          '<TXN_INSID>999999999</TXN_INSID>' +
          '<TXN_ITT_CHNL_ID>001</TXN_ITT_CHNL_ID>' +
          '<TXN_ITT_CHNL_CGY_CODE>99999999</TXN_ITT_CHNL_CGY_CODE>' +
          '<TXN_DT>' + isToday + '</TXN_DT>' +
          '<TXN_TM>171510</TXN_TM>' +
          '<TXN_STFF_ID>99999999</TXN_STFF_ID>' +
          '<MULTI_TENANCY_ID>CN000</MULTI_TENANCY_ID>' +
          '<MULTI_TENANCY_NAME>中国建设银行</MULTI_TENANCY_NAME>' +
          '<LOC_CCY>CNY</LOC_CCY>' +
          '<COUN_CD>CHN</COUN_CD>' +
          '<LNG_ID>zh-cn</LNG_ID>' +
          '<BSN_MT_ENT_IDR>CN000</BSN_MT_ENT_IDR>' +
          '<TM_ZONE>UTC+8</TM_ZONE>' +
          '<TM_DIF>0</TM_DIF>' +
          '<TM_ORG>000000000</TM_ORG>' +
          '<BAL_ORG>000000000</BAL_ORG>' +
          '<ACC_ID>0</ACC_ID>' +
          '<CLIENT_TM>UTC+8</CLIENT_TM>' +
          '</COM1>' +
          '<COM2>' +
          '<BLNG_INST_NM>1</BLNG_INST_NM>' +
          '<LCT_INST_LVL>2</LCT_INST_LVL>' +
          '<EMPE_NM>3</EMPE_NM>' +
          '<PID>4</PID>' +
          '</COM2>' +
          data_COM4 +
          '<COM7>' +
          '<CALL_PRTY_LGC_SBM_ID>AP201</CALL_PRTY_LGC_SBM_ID>' +
          '<CALL_PRTY_SVC_ID>A08460424</CALL_PRTY_SVC_ID>' +
          '<CALL_PRTY_TXNSRLNO />' +
          '</COM7>' +
          '</COMMON>' +
          '<ENTITY>' +
          '<Data_Cntnt><![CDATA[' + data + ']]></Data_Cntnt>' +
          '</ENTITY>' +
          '</TX_BODY>' +
          '<TX_EMB />' +
          '</TX>'
        const xhr = new XMLHttpRequest()
        xhr.open('post', url, true)
        xhr.setRequestHeader('token', localStorage.getItem('st'))
        xhr.setRequestHeader('choseYear', choseYear)
        xhr.send(queryStr)
        xhr.onreadystatechange = function () {
          let resData = xhr.responseText.replace(/&quot;/g, '"')
          var start;
          var last;
          if (resData) {
            start = resData.indexOf('<Data_Cntnt>') + 20
            last = resData.indexOf(']></Data_Cntnt>');
            resData = resData.substring(start, last)
            resolve(resData && JSON.parse(resData)[0])
          }
          if (loadingState) {
            loadingState.close();
          }
        }
      }
    })
  }
}
