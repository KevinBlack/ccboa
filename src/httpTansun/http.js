/**
 * create by zx on 2020-1-4 10:02
 * 类注释：http拦截
 * 备注：
 */

let isP2Server = process.env.NODE_ENV == 'production'
// let isP2Server = true

import {
  typeUrl,
  baseUrl
} from './severCode'
import routers from '../router'

import {
  Message,
  Loading
} from 'element-ui'

export default {
  /**
   * 隐秘加载
   * @param id
   * @param data  {a:fdsf,}
   * @param fwTranId
   * @returns {*|Promise<unknown>}
   */
  postNoLoading(id, data, fwTranId) {
    return this.postData(id, data, fwTranId, '', false)
  },
  /**
   * 等待框加载
   * @param id
   * @param data
   * @param fwTranId
   * @returns {*|Promise<unknown>}
   */
  postNeedLoading(id, data, fwTranId) {
    return this.postData(id, data, fwTranId, '', true)
  },
  /**
   * 分页加载
   * @param id
   * @param data {}
   * @param fwTranId
   * @param pagination {}
   * @returns {*|Promise<unknown>}
   */
  postNeedPage(id, data, fwTranId, pagination) {
    return this.postData(id, data, fwTranId, pagination, true)
  },
  /**
   *
   * post请求
   * @param id
   * @param data
   * @param fwTranId
   * @param pagination
   * @param needLoading
   * @returns {Promise<unknown>}
   */
  postData(id, data, fwTranId, pagination, needLoading) {
  	//匹配新的大模块交易号
  	
//	id = id.substr(0,5)+"C"+id.substr(6,id.split('').length)
  	
  	if(id == "A08462035"){
  		id = "A0846C035" //便函
  	}else if(id == "A08462036"){
  		id = "A0846C036" //便函附件
  	}else if(id == "A08462037"){
  		id = "A0846C037" //会议
  	}else if(id == "A08462038"){
  		id = "A0846C038" //会议附件
  	}else if(id == "A08462039"){
  		id = "A0846C039" //事物审批
  	}else if(id == "A08462040"){
  		id = "A0846C040" //事物审批附件
  	}else if(id == "A08462041"){
  		id = "A0846C041" //印章
  	}else if(id == "A08462042"){
  		id = "A0846C042" //印章管理附件
  	}else if(id == "A08462043"){
  		id = "A0846C043" //秘书工作
  	}else if(id == "A08462044"){
  		id = "A0846C044" //秘书工作附件
  	}else if(id == "A08462045"){
  		id = "A0846C045" //信息发布
  	}else if(id == "A08462046"){
  		id = "A0846C046" //信息发布附件
  	}else if(id == "A08462047"){
  		id = "A0846C047"
  	}else if(id == "A08462048"){
  		id = "A0846C048"
  	}else if(id == "A08462049"){
  		id = "A0846C049"
  	}else if(id == "A08462051"){
  		id = "A0846C051"
  	}else if(id == "A08462052"){
  		id = "A0846C052"
  	}else if(id == "A08462053"){
  		id = "A0846C053"
  	}else if(id == "A08462054"){
  		id = "A0846C054"
  	}else if(id == "A08462031"){
  		id = "A0846C031"
  	}else{
  		id = id
  	}
    let loading;
    if (needLoading) {
      loading = Loading.service({
        lock: true,
        text: "loading",
      })
    }
    if (!localStorage.getItem('st')) {
      routers.push("/login")
      return
    }
    return new Promise((resolve, reject) => {
      if (isP2Server) {
        // if (true) {
        let body = {
          data: data,
          url: typeUrl[id] + fwTranId,
          ip: localStorage.getItem("ip"),
          ccbToken: localStorage.getItem('st'),
        
        };
        console.log(`%c请求:${fwTranId}`, 'color:green', body, pagination, needLoading);
        let condition = {
          requestBody: JSON.stringify(body),
          OPER_CODE: '123456',
          BRANCH_ID: localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))&&JSON.parse(localStorage.getItem("userInfo")).areaCode||'123456789', // 分库机构号
        };
        if (pagination) {
          pagination.PAGE_JUMP=pagination.PAGE_JUMP+"";
          condition._pagination = pagination;
        }
        PJF.communication.cpsJsonReq({
          url: isP2Server ? 'ecpJson.action' : "/ecpweb/page/ccboa/ecpJson.action",
          // url: "/ecpweb/page/ccboa/ecpJson.action",
          fwServiceId: "simpleTransaction",
          fwTranId: id,
          jsonData: JSON.stringify(condition),
          success: function (res) {
            loading && loading.close()
            console.log(`%c响应:${fwTranId}`, 'color:red', JSON.parse(res.Data_Cntnt));
            if (res.BK_STATUS == "00" && res.BK_CODE == "000000000000") {
              try {
                if (res.Data_Cntnt && JSON.parse(res.Data_Cntnt).code == 'SUCCESS')
                  resolve(JSON.parse(res.Data_Cntnt))
                else {
                  if ("LOGINISNULL" == JSON.parse(res.Data_Cntnt).code) {
                    localStorage.clear()
                    routers.push("/login")
                  } else {
                    Message.closeAll();
                    Message({
                      message: JSON.parse(res.Data_Cntnt).msg,
                      type: 'error'
                    })
                    reject(JSON.parse(res.Data_Cntnt));
                  }
                }
              } catch (e) {
                console.log("后台数据有问题:", e)
              }
            } else {
              Message.closeAll();
              Message({
                message: '后台接口报错，请联系管理员',
                type: 'error'
              })
            }

          },
          failure: function (err) {
            loading && loading.close();
            Message.closeAll();
            Message({
              message: '后台接口报错，请联系管理员',
              type: 'error'
            })
            reject(err);
          }
        })
      } else {
        let body = {
          serviceCode: id,
          page: pagination ? pagination.PAGE_JUMP + "" : '',
          num: pagination ? pagination.REC_IN_PAGE + "" : '',
          manage: {
            data: data,
            url: typeUrl[id] + fwTranId,
            ip: localStorage.getItem("ip"),
            ccbToken: localStorage.getItem('st'),
            // ccbToken: 'st-1-JSzfUxIOmuydqcPXnCtCbn0qikcyDXUh01h',
          }
        };
        console.log(`%c请求:${fwTranId}`, 'color:green', body, pagination, needLoading);
        PJF.communication.ajax({
          url: baseUrl[id] + '/test/dispachService',
          data: {
            body: JSON.stringify({
              serviceCode: id,
              page: pagination ? pagination.PAGE_JUMP + "" : '',
              num: pagination ? pagination.REC_IN_PAGE + "" : '',
              manage: {
                data: data,
                ip: localStorage.getItem("ip"),
                url: typeUrl[id] + fwTranId,
                ccbToken: localStorage.getItem('st'),
                // ccbToken: 'st-1-JSzfUxIOmuydqcPXnCtCbn0qikcyDXUh01h',
              }
            })
          },
          maskAll: true,
          type: "post",
          success: function (res) {
            loading && loading.close()
            console.log(`%c响应:${fwTranId}`, 'color:red', JSON.parse(res['C-Response-Body']));
            // resolve(JSON.parse(res['C-Response-Body']))
            if (res['C-API-Status'] === "00" && JSON.parse(res['C-Response-Body']).code === "SUCCESS") {
              resolve(JSON.parse(res['C-Response-Body']))
            } else {
              if (JSON.parse(res['C-Response-Body']) && "LOGINISNULL" === JSON.parse(res['C-Response-Body']).code) {
                routers.push("/login")
              } else {
                Message.closeAll();
                Message({
                  message: res['C-Response-Body'] && JSON.parse(res['C-Response-Body']) && JSON.parse(res['C-Response-Body']).msg ? JSON.parse(res['C-Response-Body']).msg : "后台接口报错，请联系管理员",
                  type: 'error'
                })
                reject(JSON.parse(res['C-Response-Body']));
              }
            }
          },
          failure: function (err) {
            loading && loading.close()
            Message.closeAll();
            console.log("err:", err);
            Message({
              message: '后台接口报错，请联系管理员',
              type: 'error'
            })
            reject(err);
          }
        })
      }
    })
  },
}
