let isP2Server = process.env.NODE_ENV === 'production';

import {typeUrl, baseUrl} from '../../severCode'
import routers from '../../../router'
import {Message, Loading} from 'element-ui'

export default {
    // 当前页面，this指的是当前页面这个对象，不是vue实例对象，所以没有this.$api, this.$sealUtil等东西
    /**
     * 接口公共方法(默认异步)
     * @author jiangke
     * @param {String} fwTranId 服务ID
     * @param {Object} jsonData 参数对象，如果是对象，在提交时会自动添加上com2域信息
     * @param {Object} op 额外的参数对象。可选。eg: {_extraParams:{遍历添加到jsonData中的参数}, url:xxx, ...}
     * 注意：目前暂不支持客户端调试
     */
    cpsJsonReq(fwTranId, jsonData, op){
        op = (typeof op !== 'object') ? {} : op;
        console.log('是否是P2环境：', isP2Server, this, typeof this === 'object' ? this.$api : '没有this.$api');
        isP2Server = op.hasOwnProperty(isP2Server) ? op.isP2Server : isP2Server;
        let loading;
        // 如果未登录，则跳转到登陆界面
        if ( !localStorage.getItem('st') ) {
            routers.push("/login");
            return;
        }
        // 如果有设置，显示遮罩
        if (op.maskAll) {
            loading = Loading.service({lock: true, text: "loading"});
        }
        // 给jsonData添加com2域的参数（只需要把字段添加到jsonData里，会自动把它添加到xml配置的指定报文位置）
        if (localStorage.userInfo && localStorage.tcHumanRole && typeof jsonData === 'object') {
            // let tokenId  = localStorage.st || '';                   // tokenId
            let userInfo = JSON.parse(localStorage.userInfo);       // 当前登录人的用户信息
            let tcHumanRole = JSON.parse(localStorage.tcHumanRole); // 当前登录人的角色

            jsonData.Token_Inf_ID = localStorage.st;                // tokenId
            // jsonData.Unit_Dept_EmpID = userInfo.humanId;            // 员工Id
            // jsonData.OPER_CODE  = userInfo.humanCode + '';          // 员工编号（8位数字）
            jsonData.OPER_CODE  = userInfo.syncHumanCode + '';      // 员工编号（8位数字）
            jsonData.OPER_NAME  = userInfo.humanName;               // 员工姓名
            jsonData.RL_IDS     = tcHumanRole.reduce(function(prev, cur){   // 角色列表
                if (cur && cur.dicId) { prev.push({pstRlId: cur.dicId}); }
                return prev;
            }, []);
            // jsonData.ORG_SHORT_CNAME = userInfo.shortCurrUnitName;  // 机构名称缩写。机构名称是currUnitName
            jsonData.ORG_SHORT_CNAME = userInfo.unitName;   // 机构名称。机构名称是unitName
            
            if (userInfo._unitSyncCode) {
                jsonData.BRANCH_ID = userInfo._unitSyncCode || '';  // 机构编号（9位）

            // localStorage.userInfo中没有存当前登录人的9位机构编号，则查询并设置
            } else {
                console.log('开始查询并设置当前登录人的9位机构编号');
                // userInfo.currUnitId是部门的id; userInfo.unitId是机构的id; userInfo.firstUnitId是一级部门的id
                let unitId = userInfo.unitId;   // 当前登录人的机构号
                let syncUnitId = '';            // 当前登录人的机构号（9位）
                let err = null;                 // 失败响应
                this.postData('A0846C041', {unitCode: unitId}, 'A08462500', '', true, false, (data) => {
                    let flag = data[0];     // 接口调用是否成功标志 '0'-成功，其他值为失败
                    let res = data[1];     // 接口的响应值（无论成功、失败）
                    if (flag === '0' && res && res.code === 'SUCCESS') {    // 成功
                        syncUnitId = res.data && res.data.unitSyncCode || '';
                        userInfo['_unitSyncCode'] = syncUnitId;
                        localStorage.setItem( 'userInfo', JSON.stringify(userInfo) );
                    } else {    // 接口失败或数据错误
                        let _msg = '通过OA机构号[' + unitId + ']获取9位机构号失败，无法继续！' + 
                                    (res.code ? '[code:' + res.code + ']' : '') + (res.msg ? res.msg : '');
                        Message({message: _msg, type: 'error'});
                        err = res;
                    }
                }); // 同步查询
                console.log('结束查询并设置当前登录人的9位机构编号', syncUnitId);
                // 获取标准机构号失败，不继续提交
                if (syncUnitId === '') {
                    loading && loading.close();
                    return Promise.reject(err); 
                }
                // 获取标准机构号成功
                jsonData.BRANCH_ID = syncUnitId;      // 机构编号（9位）
            }
        }
        // 给jsonData添加额外的参数
        if (typeof op._extraParams === 'object' && typeof jsonData === 'object') {
            for (let key in op._extraParams) {
                if ( op._extraParams.hasOwnProperty(key) ) {
                    jsonData[key] = op._extraParams[key];
                }
            }
        }
        // 生产环境
        if (isP2Server) {
            return new Promise((resolve, reject) => {
                PJF.communication.cpsJsonReq({
                    // cpsJsonReq的url原生默认为ecpJsonDispatch.action
                    url: op.url || 'ecpJson.action',    // 请求的action url地址，默认为'ecpJson.action'
                    fwServiceId: op.fwServiceId || "simpleTransaction",
                    fwTranId: fwTranId,
                    jsonData: JSON.stringify(jsonData),
                    // maskAll: op.maskAll,        // 请求时是否遮罩整个页面。true-遮罩, false-不遮罩。默认为false
                    async: op.async,            // 是否是异步提交。true-异步， false-同步。默认为true. Promise都是异步的，所以这儿不生效，以后有需要同步时再修改
                    success: function (res) {
                        console.log(`%c成功响应:${fwTranId}`, 'color:green', res, jsonData, op);
                        loading && loading.close();
                        resolve(res);
                    },
                    failure: function (err) {
                        console.log(`%c失败响应:${fwTranId}`, 'color:red', err, jsonData, op);
                        loading && loading.close();
                        // 自动处理错误
                        if (op.warningLevel || op.warningTitle || op.warningMsg) {
                            let _warningLevel = op.warningLevel || '1';     // 错误提示级别 1-详细模式
                            let _msg = op.warningMsg || '';                 // 错误提示信息
                            if (_warningLevel == '1') {
                                if (err.BK_DESC) { _msg += '[详情: ' + err.BK_DESC + '] '; }
                                if (err._COMMON) { _msg += '[跟踪号: ' + (err._COMMON.SYS_EVT_TRACE_ID || '') + '] '; }
                            }
                            Message({type: 'error', title: op.warningTitle, message: _msg});
                        }
                        reject(err);
                    }
                })
            });

        // 测试环境(需要后端支持，前端有空再改；Access-Control-Allow-Origin)
        } else {
            console.log('测试环境参数:', jsonData);
            var baseUrl = 'http://128.32.96.143:8080/ecpweb/page/ccboa/ecpJsonDispatch.action';
            return new Promise((resolve, reject) => {
                PJF.communication.ajax({
                    url: baseUrl,
                    data: jsonData,
                    safe: true,
                    type: "post",
                    maskAll: false,
                    async: true,
                    success: function (res) {
                        console.log(`%c成功响应:${fwTranId}`, 'color:green', res, jsonData, op);
                        loading && loading.close();
                        resolve(res);
                    },
                    failure: function (err) {
                        console.log(`%c失败响应:${fwTranId}`, 'color:red', err, jsonData, op);
                        loading && loading.close();
                        reject(err);
                    }
                });
            });
        }
    },
    /**
     * post请求
     * @param id
     * @param data
     * @param fwTranId
     * @param pagination
     * @param needLoading
     * @param {Boolean}  [async]    // 是否是异步提交,可选，默认为true。 true-异步 false-同步
     * @param {Function} [cb]       // 回调函数
     * @returns {undefined|Promise<unknown>} 异步提交返回promise实例对象; 同步提交使用回调函数，返回undefined
     */
    postData(id, data, fwTranId, pagination, needLoading, async, cb) {
        async = typeof async === 'boolean' ? async : true;  // 默认为true，异步
        cb = typeof cb === 'function' ? cb : function(){};
        //匹配新的大模块交易号
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
        // 生产环境
        if (isP2Server) {
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
            // 同步
            if (async === false) {
                PJF.communication.cpsJsonReq({
                    url: isP2Server ? 'ecpJson.action' : "/ecpweb/page/ccboa/ecpJson.action",
                    // url: "/ecpweb/page/ccboa/ecpJson.action",
                    fwServiceId: "simpleTransaction",
                    fwTranId: id,
                    jsonData: JSON.stringify(condition),
                    async: async,   // 是否异步 true-异步 false-同步
                    success: function (res) {
                        loading && loading.close()
                        console.log( `%c响应:${fwTranId}`, 'color:red',
                                    (typeof res.Data_Cntnt === 'string' ? JSON.parse(res.Data_Cntnt) : res) );
                        if (res.BK_STATUS == "00" && res.BK_CODE == "000000000000") {
                            try {
                                if (res.Data_Cntnt && JSON.parse(res.Data_Cntnt).code == 'SUCCESS'){
                                    cb(['0', JSON.parse(res.Data_Cntnt)]);  // 成功，回调的标志为'0'
                                } else {
                                    if ("LOGINISNULL" == JSON.parse(res.Data_Cntnt).code) {
                                        localStorage.clear()
                                        routers.push("/login")
                                    } else {
                                        Message.closeAll();
                                        Message({
                                            message: JSON.parse(res.Data_Cntnt).msg,
                                            type: 'error'
                                        })
                                        cb(['1', JSON.parse(res.Data_Cntnt)]);  // 失败，回调的标志为'1'
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
                        console.log('接口failure:', err);
                        loading && loading.close();
                        Message.closeAll();
                        Message({
                            message: '后台接口报错，请联系管理员',
                            type: 'error'
                        })
                        cb(['2', err]);     // failure，回调的标志为'2'
                    }
                })

            // 异步
            } else {
                return new Promise((resolve, reject) => {
                    PJF.communication.cpsJsonReq({
                        url: isP2Server ? 'ecpJson.action' : "/ecpweb/page/ccboa/ecpJson.action",
                        // url: "/ecpweb/page/ccboa/ecpJson.action",
                        fwServiceId: "simpleTransaction",
                        fwTranId: id,
                        jsonData: JSON.stringify(condition),
                        async: async,   // 是否异步 true-异步 false-同步
                        success: function (res) {
                            loading && loading.close()
                            console.log(`%c响应:${fwTranId}`, 'color:red', 
                                        (typeof res.Data_Cntnt === 'string' ? JSON.parse(res.Data_Cntnt) : res));
                            if (res.BK_STATUS == "00" && res.BK_CODE == "000000000000") {
                                try {
                                    if (res.Data_Cntnt && JSON.parse(res.Data_Cntnt).code == 'SUCCESS')
                                        resolve(JSON.parse(res.Data_Cntnt));
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
                            console.log('接口failure:', err);
                            loading && loading.close();
                            Message.closeAll();
                            Message({
                                message: '后台接口报错，请联系管理员',
                                type: 'error'
                            })
                            reject(err);
                        }
                    })
                });
            }

        // 本地测试环境
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
                }
            };
            console.log(`%c请求:${fwTranId}`, 'color:green', body, pagination, needLoading);
            // 同步
            if (async === false) {
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
                            cb(['0', JSON.parse(res['C-Response-Body'])]);
                        } else {
                            if (JSON.parse(res['C-Response-Body']) && "LOGINISNULL" === JSON.parse(res['C-Response-Body']).code) {
                                routers.push("/login")
                            } else {
                                Message.closeAll();
                                Message({
                                    message: res['C-Response-Body'] && JSON.parse(res['C-Response-Body']) && JSON.parse(res['C-Response-Body']).msg ? JSON.parse(res['C-Response-Body']).msg : "后台接口报错，请联系管理员",
                                    type: 'error'
                                })
                                cb(['1', JSON.parse(res['C-Response-Body'])]);
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
                        cb(['2', err]);
                    }
                })

            // 异步
            } else {
                return new Promise((resolve, reject) => {
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
                                resolve(JSON.parse(res['C-Response-Body']));
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
                });
            }
        }
    },
    /**
     * 隐秘加载
     * @param id
     * @param data  {a:fdsf,}
     * @param fwTranId
     * @param async 是否同步
     * @param cb    回调函数
     * @returns {*|Promise<unknown>}
     */
    postNoLoading(id, data, fwTranId, async, cb) {
        return this.postData(id, data, fwTranId, '', false, async, cb)
    },
    /**
     * 等待框加载
     * @param id
     * @param data
     * @param fwTranId
     * @param async 是否同步
     * @param cb    回调函数
     * @returns {*|Promise<unknown>}
     */
    postNeedLoading(id, data, fwTranId, async, cb) {
        return this.postData(id, data, fwTranId, '', true, async, cb)
    },
    /**
     * 分页加载
     * @param id
     * @param data {}
     * @param fwTranId
     * @param pagination {}
     * @param async 是否同步
     * @param cb    回调函数
     * @returns {*|Promise<unknown>}
     */
    postNeedPage(id, data, fwTranId, pagination, async, cb) {
        return this.postData(id, data, fwTranId, pagination, true, async, cb)
    },
}

// var jsonData = {
//     Mnplt_TpCd: '01',   		    // 操作类型 待办-'01', 已办-'02', 办结-'03'
//     Unit_Dept_EmpID: JSON.parse(localStorage.userInfo).humanId + '', // 员工ID
//     _pagination: {                  // 分页
//         PAGE_JUMP: '1',
//         REC_IN_PAGE: '10'
//     }
// };
// function cps(fwTranId, jsonData, op){
//     op = typeof op !== 'object' ? {} : op;
    // if (localStorage.userInfo && localStorage.tcHumanRole && typeof jsonData === 'object') {
    //     // let tokenId  = localStorage.st || '';                   // tokenId
    //     let userInfo = JSON.parse(localStorage.userInfo);       // 当前登录人的用户信息
    //     let tcHumanRole = JSON.parse(localStorage.tcHumanRole); // 当前登录人的角色

    //     // jsonData.Token_Inf_ID = tokenId;                        // tokenId
    //     // jsonData.Unit_Dept_EmpID = userInfo.humanId;            // 员工Id
    //     jsonData.ORG_SHORT_CNAME = userInfo.shortCurrUnitName;  // 机构名称缩写。机构名称是currUnitName
    //     jsonData.BRANCH_ID  = userInfo.currUnitId + '';         // 机构编号
    //     jsonData.OPER_CODE  = userInfo.humanCode + '';          // 员工编号（8位数字）
    //     jsonData.OPER_NAME  = userInfo.humanName;               // 员工姓名
    //     jsonData.RL_IDS     = tcHumanRole.map(function(item){   // 角色列表
    //         return {pstRlId: item.dicId}
    //     });
    // }
//     PJF.communication.cpsJsonReq({
//         // url: "/ecpweb/page/ccboa/ecpJson.action"
//         url: op.url,                // 请求的action url地址，不设置则使用默认的action(选填)
//         fwServiceId: op.fwServiceId || "simpleTransaction",
//         fwTranId: fwTranId,
//         jsonData: JSON.stringify(jsonData),
//         maskAll: op.maskAll,        // 请求时是否遮罩整个页面。true-遮罩, false-不遮罩。默认为false
//         async: op.async,            // 是否是异步提交。true-异步， false-同步。默认为true
//         success: function (res) {
//             console.log(`%c成功响应:${fwTranId}`, 'color:green', res, jsonData, op);
//             // resolve(res);
//         },
//         failure: function (err) {
//             console.log(`%c失败响应:${fwTranId}`, 'color:red', err, jsonData, op);
//             // reject(err);
//         }
//     })
// }
// cps('A0161M569', jsonData, {url: 'ecpJson.action'});