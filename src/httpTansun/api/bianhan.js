/*
 * @Author: your name
 * @Date: 2020-08-17 17:54:01
 * @LastEditTime: 2021-11-01 15:13:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\httpTansun\api\bianhan.js
 */
import Http from "../http"

export default {
  /**
   * 制发单列表查询A08461311
   * @param data
   * @returns {*}
   */
  tableSearch(data, pagination) {
    return Http.postNeedPage("A08462035", data, "A08461347", pagination)
  },
  /**
   * 删除便函A08461312
   * @param data
   * @returns {*}
   */
  deleteBianHan(data) {
    return Http.postNeedLoading("A08462035", data, "A08461312")
  },
  /**
   * 新增制发单A08461310
   */
  createAddData(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461310')
  },
  /**
   * 便函制发数据更新 A08461313
   */
  alertAddData(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461313')
  },
  /**
   * 制发详情A08461318
   */
  distriDeal(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461318')
  },
  /**
   * 制发详情意见A08461370
   */
  getFormOpions(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461370')
  },
  /**
   * 承办列表A08461342
   */
  ubderTable(data, pagination) {
    return Http.postNeedPage("A08462035", data, 'A08461342', pagination)
  },
  /**
   * 承办详情A08461344
   */
  underDeal(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461344')
  },
  /**
   * 传阅详情
   * @param data
   * @returns {*}
   */
  chuanyueDetail(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461339')
  },
  /**
   * 便函传阅
   * @param data
   * @returns {*}
   */
  sendChuanYue(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461340')
  },
  /**
   * 承办数据新增 A08461341
   */
  underAddData(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461341')
  },
  /**
   * 承办数据更新 A08461343
   */
  underAlertData(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461343')
  },

  /**
   * 获取文号
   * @param data
   * @returns {*} //原接口A08461372
   */
  setBianhao(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461372')
  },
  /**
   * 保存文号
   * @param unitId
   * @param dataType{1:当前文号2：空缺文号}
   * @param waterNo 流水号
   * @param bHMainOrderDo 主表单id
   * @returns {*} //
   */
  saveBianhao(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461373')
  },
  /**
   * 退号
   * @param id 主表单id
   * @returns {*} //
   */
  backianhao(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461374')
  },
  /**
   * 传阅列表查询
   * @param data
   * @param pagination
   * @returns {*}
   */
  chuanyueList(data, pagination) {
    return Http.postNeedPage("A08462035", data, "A08461338", pagination)
  },

  /**
   * 便函年度查询
   * @param data
   * @param pagination
   * @returns {*}
   */
  searchByYear(data, pagination) {
    return Http.postNeedPage("A08462035", data, "A08461335", pagination)
  },
  /**
   * 便函流水维护表列表 A08461306
   */
  serialTable(data, pagination) {
    return Http.postNeedPage("A08462035", data, 'A08461306', pagination)
  },
  /**
   * 便函流水维护表详情 A08461307
   */
  serialDeal(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461307')
  },
  /**
   * 便函流水维护表修改 A08461305
   */
  alertSerial(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461305')
  },
  /**
   * 便函基础配置表列表 A08461321
   */
  settingTable(data, pagination) {
    return Http.postNeedPage("A08462035", data, 'A08461321', pagination)
  },
  /**
   * 便函基础配置表修改 A08461320
   */
  alertSetting(data) {
    return Http.postNeedLoading("A08462035", data, 'A08461320')
  },
  /**
   * 便函基础配置表详情 A08461322
   */
  settingDeal(data) {
    return Http.postNoLoading("A08462035", data, 'A08461322')
  },

  /**
   * 获取承办人员列表
   * @param data
   * @returns {*}
   */
  getCbPerson(data) {
    return Http.postNeedLoading('A08462035', data, "A08461354")
  },
  /**
   * 发送承办
   * @param data
   * @returns {*}
   */
  sendCB(data) {
    return Http.postNeedLoading('A08462035', data, "A08461341")
  },

  /**
   * 便函完成并发送获取人员
   * @param data
   * @returns {*}
   */
  getPerson(data) {
    return Http.postNeedLoading('A08462035', data, "A08461352")
  },

  /**
   * 传阅获取人员
   * @param data
   * @returns {*}
   */
  getCyPerson(data) {
    return Http.postNeedLoading('A08462035', data, "A08461353")
  },

  /**
   * 传阅回收
   * @param data
   * @returns {*}
   */
  cheHuiCy(data) {
    return Http.postNeedLoading('A08462035', data, "A08461349")
  },

  /**
   * 统计
   * @param data
   * @returns {*}
   */
  statistics(data, pagination) {
    return Http.postNeedLoading('A08462035', data, "A08461319", pagination)
  },
  /**
   * 承办撤回
   * @param data
   * @returns {*}
   */
  cbBack(data) {
    return Http.postNeedLoading('A08462035', data, "A08461356")
  },
  /**
   * 查看流程
   * @returns {*}
   */
  getLiuCheng(data) {
    return Http.postNeedLoading('A08462035', data, "A08461350")
  },

  /**
   * 查看环节
   * @returns {*}
   */
  getHuanJie(data) {
    return Http.postNeedLoading('A08462035', data, "A08461351")
  },

  /**
   *制发单收回
   * @returns {*}
   */
  zfBack(data) {
    return Http.postNeedLoading('A08462035', data, "A08461348")
  },

  //传阅更新
  updataCy(data) {
    return Http.postNeedLoading('A08462035', data, "A08461337")
  },

  //催办
  cuiban(data) {
    return Http.postNeedLoading('A08462035', data, "A08461359")
  },

  /**
   * 获取传阅未阅人员
   * @param data parentDocId
   * @returns {*}
   */
  getNoCyList(data) {
    return Http.postNeedLoading('A08462035', data, "A08461360")
  },

  /**
   * 承办撤回获取单位
   * @param data
   * @returns {*}
   */
  getCbDeptList(data) {
    return Http.postNeedLoading('A08462035', data, "A08461361")
  },

  /**
   * 承办撤回获取单位
   * @param data
   * @returns {*}
   */
  getDeptList(data) {
    return Http.postNeedLoading('A08462035', data, "A08461364")
  },

  /**
   * 收藏
   * @param data
   * @returns {*}
   */
  shouCang(data) {
    return Http.postNeedLoading('A08462035', data, "A08461377")
  },


  /**
   * 删除过程意见
   * @param data
   * @returns {*}
   */
  delProcessList(data) {
    return Http.postNeedLoading('A08462035', data, "A08461362")
  },

  /**
   * 管理员查看-增加/修改传阅意见
   */
  handleProcessList(data) {
    return Http.postNeedLoading('A08462035', data, 'A08461314')
  },
  /**
   * 管理员查看-重新流转  
   * param data[object]当前表单所有数据*
   */
  refloat(data) {
    return Http.postNeedLoading('A08462035', data, 'A08461369')
  },

  /**
   * 管理员查看-删除表单（制发）
   * param ids[array]表单id*
   */
  deleteFormOfzh(ids) {
    return Http.postNeedLoading('A08462035', ids, 'A08461371')
  },
  /*手动归档
    data{id[string],表单id}
   */
  handlefile(data) {
    return Http.postNeedLoading('A08462035', data, 'A08461375')
  },
  /**
   * 区块链归档
   * @param {*} data [string],表单id
   */
  newhandlefile(data) {
    return Http.postNeedLoading('A08462035', data, 'A08461389')
  },
  /**
   * 判断编号是否被占用 A08461376
   */
  handleNum(data) {
    return Http.postNeedLoading('A08462035', data, "A08461376")
  },
  /**
   * 收藏
   * @param id[string]
   * @param dataType
   */
  collectionFun(data) {
    return Http.postNeedLoading('A08462035', data, "A08461377")
  },
  /**
   * 删除流水号数据
   *  param ids[array] 数据id*
   */
  deleteSerialnum(ids) {
    return Http.postNeedLoading('A08462035', ids, 'A08461304')
  },
  /**
   * 删除系统配置数据
   *  param ids[array] 数据id*
   */
  deleteSettingData(ids) {
    return Http.postNeedLoading('A08462035', ids, 'A08461309')
  },
  /**
   * 超期待办提醒接口--详情
   *  param ids[array] 数据id*
   */
  backlogParticulars(ids) {
    return Http.postNeedLoading('A08462035', ids, 'A08461378')
  },
  /**
   * 超期待办提醒接口--查询
   *  param ids[array] 数据id*
   */
  backlogInquire(ids) {
    return Http.postNeedLoading('A08462035', ids, 'A08461380')
  },
  /**
   * 超期待办提醒接口--新增
   *  param ids[array] 数据id*
   */
  backlogAdd(ids) {
    return Http.postNeedLoading('A08462035', ids, 'A08461379')
  },
    /**
   * 查阅接口
   * @param data
   * @param pagination
   * @returns {*}//A0846C099
   */
  bianhanCyLB(data, pagination) {
    return Http.postNeedPage("A08462035", data, "A08461381", pagination)
  },
  /**
   * 查阅页面批量下载
   * @param {*} data 
   */
  bianhanCyfetchDown(data,pagination){
    return Http.postNeedPage("A08462035", data, "A08461382",pagination)
  },
    /**
   * 查阅页面批量下载检测压缩是否完成
   * @param {*} downloadurl 
   */
  bianhanCyCheckDown(downloadurl){
    return Http.postNeedLoading("A08462035", {filePath:downloadurl}, "A08461383")
  },
      /**
   * 检查该环节是否为多人模式
   * @param {*}  
   */
  checkMulti(data){
    return Http.postNeedLoading("A08462035", data, "A08461390")
  },
  /**
   * 多人模式下反馈意见
   */
  feedBackIssue(data){
    return Http.postNeedLoading("A08462035", data, "A08461391")
  },
    /**
   * 多人模式下获取收回/催办人员列表
   */
  getPersonList(data){
    return Http.postNeedLoading("A08462035", data, "A08461426")
  },
      /**
   * 多人模式下承办收回
   */
  getPersonListBcak(data){
    return Http.postNeedLoading("A08462035", data, "A08461427")
  },
  /**
   * 多人模式下承办催办
   */
  // urgePerson(data){
  //   return Http.postNeedLoading("A08462035", data, "A08461428")
  // },
    /**
   * 多人模式下增发记录， 0未增发,1已经增发,2增发记录
   */
  getIsAddFlag(data){
    return Http.postNeedLoading("A08462035", data, "A08461428")
  },
}
