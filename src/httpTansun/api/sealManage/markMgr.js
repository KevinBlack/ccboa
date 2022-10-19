/*
 * @Author: your name
 * @Date: 2021-08-18 13:57:24
 * @LastEditTime: 2021-08-19 11:06:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0917fenku\src\httpTansun\api\sealManage\markMgr.js
 */ 
/**
 * 印章刻制的接口文件
 */
import http from "../../http.js"
import Http from "../../http.js"
export default {
    // /ccboa/appSeal/A08465101=A08465101  #印章刻制新增
    // /ccboa/appSeal/A08465102=A08465102  更新
    // /ccboa/appSeal/A08465103=A08465103   删除
    // /ccboa/appSeal/A08465104=A08465104   详情
    // /ccboa/appSeal/A08465105=A08465105   (完成并发送/办结)
    // /ccboa/appSeal/A08465106=A08465106 获取流程详情
    // /ccboa/appSeal/A08465107=A08465107 列表
    // /ccboa/appSeal/A08465108=A08465108  查询 暂时没用
    // /ccboa/appSeal/A08465109=A08465109  收回
    // /ccboa/appSeal/A08465110=A08465110  调用-控制域
    // /ccboa/appSeal/A08465111=A08465111  退回
    // /ccboa/appSeal/A08465112=A08465112  发送上级行
    // /ccboa/appSeal/A08465113=A08465113  发送下级行

    //印章刻制列表
    markList(data, pagination) {
        return Http.postNeedPage('A08462041', data, 'A08465107', pagination)
    },
    //起草选择拟稿部门
    deptList() {
        return Http.postNeedLoading('A08462041', '', 'A08465114')
    },
    //印章刻制新增
    addMark(data) {
        return Http.postNeedLoading('A08462041', data, 'A08465101')
    },
    //印章刻制修改
    updateMark(data) {
        return Http.postNeedLoading('A08462041', data, 'A08465102')
    },
    //印章表单权限
    getMarkRole(data) {
        return Http.postNeedLoading('A08462041', data, 'A08465110')
    },
    //印章类别配置项
    getMarkType(data) {
        return Http.postNeedLoading('A08462041', data, 'A08463003')
    },
    //印章刻制详情
    getMarkDetail(data) {
        return Http.postNeedLoading('A08462041', data, 'A08465104')
    },
    //印章环节详情
    getMarkProcess(data) {
        return Http.postNeedLoading('A08462041', data, 'A08465116')
    },
    //生成编号
    getSealNum (data) {
        return Http.postNeedLoading("A08462041", data, "A08463505")
    },
    //完成并发送
    doSendMark(data) {
        return Http.postNeedLoading('A08462041', data, 'A08465105')
    },
    //发上级行
    sendSuperior(data) {
        return Http.postNeedLoading('A08462041', data, 'A08465112')
    },
    //返回请示行
    returnSuperior(data) {
        return Http.postNeedLoading('A08462041', data, 'A08465113')
    },
    //获取用户起草权限
    getUserMarkRole() {
        return Http.postNeedLoading('A08462041', '', 'A08465117')
    },
    //印章刻制收回
    shouhui(data) {
        return Http.postNeedLoading('A08462041', data, 'A08465109')
    },
    //印章刻制退回&退回修改
    returnMark(data) {
        return Http.postNeedLoading('A08462041', data, 'A08465111')
    } 
}
     