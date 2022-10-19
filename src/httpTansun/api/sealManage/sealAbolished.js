/**
 * 印章管理》印章废止的接口文件
 * @author jiangke
 */
// import smHttp from "./sealManageHttp"
// export default {
//      // OA印章废止申请-新增申请
//      addSealAbolisedApply(params, op){
//         return smHttp.cpsJsonReq('A0161M084', params, op);
//     },
//     // OA印章废止申请-变更申请
//     modifySealAbolishedApply(params, op){
//         return smHttp.cpsJsonReq('A0161M085', params, op);
//     },
//     // OA印章废止申请审批-审批
//     approveSealAbolishedApply(params, op){
//         return smHttp.cpsJsonReq('A0161M086', params, op);
//     }, 
//     // OA印章废止申请-查询申请列表
//     getSealAbolishedApplyList(params, op){
//         return smHttp.cpsJsonReq('A0161M571', params, op);
//     },
//     // OA印章废止申请-查询申请详细信息
//     getSealAbolishedApplyDetails(params, op){
//         return smHttp.cpsJsonReq('A0161M572', params, op);
//     }
// }
/**
 * 印章管理》印章废止的接口文件
 * @author jiangke
 */
import Http from "../../http"
import smHttp from "./sealManageHttp"
/* export default {
     // OA印章废止申请-新增申请
     addSealAbolisedApply(params, op){
        return smHttp.cpsJsonReq('A0161M084', params, op);
    },
    // OA印章废止申请-变更申请
    modifySealAbolishedApply(params, op){
        return smHttp.cpsJsonReq('A0161M085', params, op);
    },
    // OA印章废止申请审批-审批
    approveSealAbolishedApply(params, op){
        return smHttp.cpsJsonReq('A0161M086', params, op);
    }, 
    // OA印章废止申请-查询申请列表
    getSealAbolishedApplyList(params, op){
        return smHttp.cpsJsonReq('A0161M571', params, op);
    },
    // OA印章废止申请-查询申请详细信息
    getSealAbolishedApplyDetails(params, op){
        return smHttp.cpsJsonReq('A0161M572', params, op);
    }
} */
export default {
    //印章废止列表 type 代办： DB 已办： YB 办结： BJ 全部： ALL
    abolishedList(data, pagination) {
      return Http.postNeedPage("A08462041", data, "A08465202", pagination)
    },
    //印章废止新增
    destroyAdd(data) {
      return Http.postNeedLoading("A08462041", data, "A08465204")
    },
    //印章废止更新
    destroySave(data) {
      return Http.postNeedLoading("A08462041", data, "A08465204")
    },
    //印章废止详情
    destroyForm(data) {
      return Http.postNeedLoading("A08462041", data, "A08465206")
    },
    //印章废止删除
    destroyDel(data) {
      return Http.postNeedLoading("A08462041", data, "A08465205")
    },
    //印章废止完成并发送
    destroySend(data) {
      return Http.postNeedLoading("A08462041", data, "A08465200")
    },
    //印章废止完成并发送确定
    destroySendFor(data) {
      return Http.postNeedLoading("A08462041", data, "A08465201")
    },
    //印章废止控制域
    getdesLink(data) {
      return Http.postNeedLoading("A08462041", data, "A08465203")
    },
    //查询印章废止名称
    seachTitle(data) {
      return Http.postNeedLoading("A08462041", data, "A08465214")
    },
    //印章销毁催办
    cuiBan(data) {
      return Http.postNeedLoading("A08462041", data, "A08465311")
    },
    //印章销毁办结
    destend(data) {
      return Http.postNeedLoading("A08462041", data, "A08465302")
    },
  
    // A08465309 传id 
    //印章销毁收回
    destBack(data) {
      return Http.postNeedLoading("A08462041", data, "A08465309")
    },
  
    // *A08465310
    //   传id   、thIdea（退回原因） 、thType（退回类型 1 上一节点 ， 0 起草节点）
    //印章销毁退回
    destbeBack(data) {
      return Http.postNeedLoading("A08462041", data, "A08465310")
    },
  
    //  *A08465311
    //  传id
    //印章销毁催办
    destCuiBan(data) {
      return Http.postNeedLoading("A08462041", data, "A08465311")
    },
    //印章废止收回
    shouhuiBtn(data) {
      return Http.postNeedLoading("A08462041", data, "A08465211")
    },
    //印章废止引入依据保存 
    yinruSave(data) {
      return Http.postNeedLoading("A08462041", data, "A08465215")
    },
    // 印章废止引入依据删除
    yryjDelete(data) {
      return Http.postNeedLoading("A08462041", data, "A08465207")
    }
  }