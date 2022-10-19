/*
 * @Author: 马佳威
 * @Date: 2022-08-03
 * @LastEditTime: 2020-10-14 11:24:59
 * @LastEditors: Please set LastEditors
 * @Description: 离京审批接口
 * @FilePath: \oa\src\httpTansun\api\approval\checkLz.js
 */
import Http from "../../http"
export default {
//   /**
//    * 事务审批制发单列表（全部，待办，已办，办结）A08461131
//    * @param data
//    * @param pagination
//    * @returns {*}
//    */
//   checkLzAllTable(data, pagination) {
//     return Http.postNeedPage('A08462039', data, "A08461131", pagination)
//   },

  /**
   * 制发单（新增）A08463001
   */
  checkLzCreateV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463001")
  },
  /**
   * 制发单（删除）A08463002
   */
  checkLzDeleteV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463002")
  },
  /**
   * 制发单（修改）A08463003
   */
  checkLzAlterV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463003")
  },
  /**
   * 制发单（详情）A08463004
   */
  checkLzDealV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463004")
  },
  /**
   * 生成申请文号 or 审批文号 A08463005
   */
  createNumV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463005")
  },
  /**
   *生成申请文号后回调该接口更新流水号配置表  A08463006
   */
  createNumCodeV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463006")
  },
  /**
   * 点击完成并发送，返回下级行获取人员机构树 A08463007
   */
  ZFqueryPerTreeV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463007")
  },
  /**
   * 查询流程 A08463008 (没使用)
   */
  LCsearch(data) {
    return Http.postNeedLoading('A08462039', data, "A08463008")
  },
  /**
   * 流程收回 A08463009
   */
  LZretrieveV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463009")
  },

    /**
   * 退回上一处理人 A08463010
   */
  backDealPerV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463010")
  },
  /**
   * 发上级行返回人员机构树 A08463011
   */
  sendBankLevelV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463011")
  },
  /**
   * 填写退回原因 A08463012
   */
  reasonBackV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463012")
  },
  /**
   * 查看退回原因 A08463013
   */
  reasonBackC(data) {
    return Http.postNeedLoading('A08462039', data, "A08463013")
  },
  /**
   * 流程调度 A08463014
   */
  askProcess(data) {
    return Http.postNeedLoading('A08462039', data, "A08463014")
  },
  /**
   * 管理员数据维护 管理员查看 请假 保存 A08463015
   */
  addAskDetail(data) {
    return Http.postNeedLoading('A08462039', data, "A08463015")
  },
  
  /**
   * 管理员删除意见 管理员查看 请假 删除意见 A08463016
   */
  delAskMsg(data) {
    return Http.postNeedLoading('A08462039', data, "A08463016")
  },
  /**
   * 管理员恢复流转 A08463017 
   */
  afreFlow(data) {
    return Http.postNeedLoading('A08462039', data, 'A08463017')
  },
  /**
   * 获取控制域 A08463018
   */
  queryHJV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463018")
  },
  /**
   * 生成编号 A08463019
   */
  detailForNumV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463019")
  },
  // 点击生成编号
  detailForNumVv(data) {
    return Http.postNeedLoading('A08462039', data, "A08463020")
  },
  // 管理员查看 备注删除
  deleteRemark(data) {
    return Http.postNeedLoading('A08462039', data, "A08463021")
  },
  // 退号
  backNumV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463022")
  },
  // 收藏
  handleCollectionOfVacation(data) {
    return Http.postNeedLoading('A08462039', data, "A08463023")
  },
  /**
   * 选择漏号时查看有没有被使用 A08463020 (没使用)
   */
  handleNumV(data) {
    return Http.postNeedLoading('A08462039', data, "A08463020")
  },
    //管理员查看 请假 删除备注
    delAskDetail(data) {
      return Http.postNeedLoading('A08462039', data, "A08462027")
    },

}
