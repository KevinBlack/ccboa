/*
 * @Author: wy
 * @Date: 2020-09-04 17:22:02
 * @LastEditTime: 2021-10-16 15:23:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\httpTansun\api\sealManage\useSeal.js
 */
import Http from "../../http.js"
export default {
  // 印章管理-用印机设备维护审批(起草)
  drafUseSealMaintain(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463612')
  },
  // 印章管理-用印机设备维护审批(起草)
  updateUseSealMaintain(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463611')
  },
  // 印章管理-用印机设备维护审批编号
  getDocumentNo(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463505')
  },
  // 印章管理-用印机设备维护审批编号
  getDocumentNoTitle(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463623')
  },
  // 印章管理-用印机设备维护(列表)
  listUseSealMaintain(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463616', pagination)
  },
  //查看流程
  viewLink(data) {
    return Http.postNeedLoading("A08462053", data, "APPWFE003")
  },
  // 印章管理-用印机设备维护审批详情
  UseSealMaintainDetail(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463608')
  },
  // 印章管理-用印机设备维护删除此文
  delSealMaintain(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463609')
  },
  // 印章管理-获取印章信息
  selectItems(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463610')
  },


  //印章管理-用印机设备维护(获取下一节点信息及人员树)
  clickDoneAndSend(data) {
    return Http.postNeedLoading("A08462041", data, 'A08463613')
  },

  doneAndSend(data) {
    return Http.postNeedLoading("A08462041", data, 'A08463614')
  },
  //印章管理-用印机设备维护(获取流程详情)
  processDetail(data) {
    return Http.postNeedLoading("A08462041", data, 'A08463615')
  },
  //印章管理-用印机设备维护(获取流程详情)
  fillFormRight(data) {
    return Http.postNeedLoading("A08462041", data, 'A08463625')
  },
  //印章管理-用印机设备维护(收回)
  sendBack(data) {
    return Http.postNeedLoading("A08462041", data, 'A08463619')
  },
  //印章管理-用印机设备维护(退回)
  returnBack(data) {
    return Http.postNeedLoading("A08462041", data, 'A08463626')
  },
  //印章管理-用印机设备维护(流程调度)
  linkChange(data) {
    return Http.postNeedLoading("A08462041", data, 'A08463620')
  },
  //印章管理-用印机设备维护(起草前选部门)
  getDepBeforeDraft(data) {
    return Http.postNeedLoading("A08462041", data, 'A08463622')
  },
  //印章管理-用印机设备维护(发送上级行)
  sendupSenior(data) {
    return Http.postNeedLoading("A08462041", data, 'A08463629')
  },
  //印章管理-用印机设备维护( 发送下级行)
  sendlowerSenior(data) {
    return Http.postNeedLoading("A08462041", data, 'A08463630')
  },
}
