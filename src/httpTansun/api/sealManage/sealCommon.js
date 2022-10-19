import Http from "../../http.js"
import smHttp from "./sealManageHttp"
export default {
    // 获取人员和机构的9位机构号(异步)
    getUnitSyncCode(data){
        return Http.postNeedLoading("A0846C041", data, "A08462500")
    },
    // 获取人员和机构的9位机构号(同步)
    getUnitSyncCodeSync(data, cb){
        return smHttp.postNeedLoading("A0846C041", data, "A08462500", false, cb)
    },
    // 生成编号
    getSealNum(data) {
        // return Http.postNeedLoading("A08462041", data, "A08463505");
        // A08462417是为印章专用开发的接口，里边的机构号传标准的9位机构号
        return Http.postNeedLoading("A0846C041", data, "A08462417");
    },
    // // 查看所有的流程
    // getLink_all(data) {
    //     return Http.postNeedLoading('A08462041', data, 'A08463012')
    // },
    // 查看（已做的）流程
    getLink_done(data) {
        return Http.postNeedLoading("A08462053", data, "APPWFE003")
    },
    // //查看流程
    // Lookcx(data) {
    //     return Http.postNeedLoading('A08462053', data, 'APPWFE003')
    // },
    // 获取某环节的配置信息
    getLink_oneConfig(data) {
        return Http.postNeedLoading('A08462053', data, 'APPWFE001');
    },
    // /**
    //  * 常用配置详情  A08463507
    //  */
    // userConDeal(data){
    //     return Http.postNeedLoading('A08462041', data, 'A08463507')
    // },
    // //处理环节btn按钮权限配置详情
    // clHjkzbtn(data) {
    //     return Http.postNeedLoading('A08462053', data, 'APPWFE001')
    // },
    // //处理环节
    // clHj(data) {
    //     return Http.postNeedLoading('A08462053', data, 'APPWFE002')
    // },
    // //获取机构信息
    // getorgId(data) {
    //     return Http.postNeedLoading("A08462041", data, "A08463007")
    // },
    // //流程调度
    // linkChange(data) {
    //     return Http.postNeedLoading("A08462053", data, "APPWFE002");
    // },
    //印章保管交接列表
    tableList(data, pagination) {
        return Http.postNeedPage("A0846C041", data, "A08464106", pagination)
    },
    //印章交接保管保存/修改
    saveForm(data) {
        return Http.postNeedLoading("A0846C041", data, "A08464102")
    },
    //印章交接保管删除
    deleteSealKeeperChange(data){
        return Http.postNeedLoading("A0846C041", data, "A08464103")
    },
     //印章交接保管
     shouHui(data){
        return Http.postNeedLoading("A0846C041", data, "A08464112")
    },
    //印章交接保管-获取编号
    getNumSealKeeperChange(data){
        return Http.postNeedLoading("A0846C041", data, "A08463505")
    },
    //印章交接保管-完成并发送流程
    wcbfsSealKeeperChange(data){
        return Http.postNeedLoading("A0846C041", data, "A08464100")
    },
    //印章交接保管-完成并发送确定
    wcbfssSealKeeperChange(data){
        return Http.postNeedLoading("A0846C041", data, "A08464101")
    },
    //印章交接保管-查询印章
    searchSealKeeperChange(data){
        return Http.postNeedLoading("A0846C041", data, "A08464104")
    },
    //印章交接保管-查询印章保管人
    searchKeeperSealKeeperChange(data){
        return Http.postNeedLoading("A0846C041", data, "A08464105")
    },
    //印章交接保管-详情
    getKeeperSealKeeperChangeDetail(data){
        return Http.postNeedLoading("A0846C041", data, "A08464108")
    },
    //印章交接保管-获取按钮权限
    getKeeperSealKeeperChangeLimits(data){
        return Http.postNeedLoading("A0846C041", data, "A08464107")
    },
    //印章保管交接流程调度
    processScheduling(data){
        return Http.postNeedLoading("A0846C041", data, "A08464136")
    },
}