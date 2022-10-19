import Http from "../../http"
export default {
  /**
   * 事务审批流水号配置（新增）A08461111
   * @param data
   * @returns {*}
   */
  createStream(data) {
    return Http.postNeedLoading('A08462039', data, "A08461111")
  },
  /**
   * 事务审批流水号配置（列表）A08461114
   */
  streamTable(data,pagination){
    return Http.postNeedPage('A08462039', data, "A08461114",pagination)
  },
  /**
   * 事务审批流水号配置（修改）A08461113
   */
  alterStream(data) {
    return Http.postNeedLoading('A08462039', data, "A08461113")
  },
  /**
   * 事务审批流水号配置（删除）A08461112
   */
  deleteStream(data) {
    return Http.postNeedLoading('A08462039', data, "A08461112")
  },
  /**
   * 申请项目配置（列表）A08461109
   */
  applyItemTable(data,pagination){
    return Http.postNeedPage('A08462039', data, "A08461109",pagination)
  },
  /**
   * 申请项目配置（详情）A08461110
   */
  applyItemDeal(data) {
    return Http.postNeedLoading('A08462039', data, "A08461110")
  },
  /**
   * 申请项目配置（删除）A08461107
   */
  applyItemDelete(data) {
    return Http.postNeedLoading('A08462039', data, "A08461107")
  },
  /**
   * 申请项目配置（修改）A08461108
   */
  applyItemAlter(data) {
    return Http.postNeedLoading('A08462039', data, "A08461108")
  },
  /**
   * 申请项目配置（新增）A08461106
   */
  applyItemCreate(data) {
    return Http.postNeedLoading('A08462039', data, "A08461106")
  },


  /**
   * 事务审批基本配置（列表）A08461104
   */
  baseConfigTable(data,pagination){
    return Http.postNeedPage('A08462039', data, "A08461104",pagination)
  },
  /**
   * 事务审批基本配置（修改）A08461103
   */
  baseConfigAlter(data) {
    return Http.postNeedLoading('A08462039', data, "A08461103")
  },
  /**
   * 事务审批基本配置（删除）A08461102
   */
  baseConfigDelete(data) {
    return Http.postNeedLoading('A08462039', data, "A08461102")
  },
  /**
   * 事务审批基本配置（新增）A08461101
   */
  baseConfigCreate(data) {
    return Http.postNeedLoading('A08462039', data, "A08461101")
  },
  /**
   * 事务审批基本配置（详情）A08461105
   */
  baseConfigDeal(data) {
    return Http.postNeedLoading('A08462039', data, "A08461105")
  },
  /**
   * 流水号维护申请项目   A08461141
   */
  applyApprBank(data){
    return Http.postNeedLoading('A08462039', data, "A08461141")
  },
  /**
   * 申请项目维护部门  A08461142
   */
  applyApprDepar(data){
    return Http.postNeedLoading('A08462039', data, "A08461142")
  },
  /**
   * 适用于下级机构  A08461732
   */
  unitLevel(data){
    return Http.postNeedLoading('A08462053', data, "A08461732")
  },
  /**
   * 事务审批新增流程  A08461732
   */
  approvalProcess(data){
    return Http.postNeedLoading('A08462039', data, "A08461168")
  },
}
