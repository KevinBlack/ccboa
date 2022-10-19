/*
 * @Author: wy
 * @Date: 2020-09-04 17:22:02
 * @LastEditTime: 2021-06-19 14:36:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\httpTansun\api\sealManage\useSeal.js
 */
import Http from "../../http.js"
export default {
  /**
   * @description: 用印图片上传&下载
   * @param {*}
   * @return {*}
   */
  // 上传图片(新)
  uploadImg2(data) { 
    return Http.postNeedLoading('A08462041', data, 'A08463855')
  },
  // 上传图片
  uploadImg(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463851')
  },
  // 列表查询
  getImgList(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463852')
  },
  // 上传图片
  getImg(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463853')
  },
  // 获取印章保管人信息
  getsealPerson(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463917')
  },
  // 获取印章列表信息
  getsealList(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463918', pagination)
  },

  /**
   * 起草用印审批
   * @param data
   * @returns {*}
   */
  //获取用印设备信息列表
  getUseSealDeviceInfo() {
    return Http.postNeedLoading('A08462041', '', 'A08463624')
  },
  // 待办已办办结列表
  getWorkList(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463000', pagination)
  },
  // 完成并发送
  sendDocument(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463001')
  },
  // 发送上级行
  sendHigherBank(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463004')
  },
  // 完成并发送选人确定||办结
  sureHander(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463002')
  },
  //获取用印类型
  getUseSealType(data) {
    return Http.postNeedLoading("A08462041", data, "A08463003")
  },
  //意见域删除按钮
  delItem(data) {
    return Http.postNeedLoading("A08462041", data, "A08463014")
  },
  delItemKz(data) {
    return Http.postNeedLoading("A08462041", data, "A08465118")
  },
  //生成编号
  getSealNum(data) {
    return Http.postNeedLoading("A08462041", data, "A08463505")
  },
  //获取环节
  getLink(data) {
    return Http.postNeedLoading("A08462041", data, "A08463005")
  },
  //获取机构信息
  getorgId(data) {
    return Http.postNeedLoading("A08462041", data, "A08463007")
  },
  //查看流程
  viewLink(data) {
    return Http.postNeedLoading("A08462053", data, "APPWFE003")
  },
  //流程调度
  linkChange(data) {
    return Http.postNeedLoading("A08462053", data, "APPWFE002");
  },

  /**
   * 起草公文用印登记
   */

  // 保存公文用印登记单
  addDocument(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463101')
  },
  // 更新公文用印登记单
  updateDocument(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463104')
  },
  // 公文用印详情
  detailDocument(data) {
    return Http.postNeedLoading("A08462041", data, "A08463102")
  },
  // 删除公文用印
  delDocument(data) {
    return Http.postNeedLoading("A08462041", data, "A08463103")
  },
  // 引入用印公文
  importDoc(data) {
    return Http.postNeedLoading('A08462041', data, 'A08462023')
  },
  exportDoc(data) {
    return Http.postNeedLoading('A08462041', data, 'A08469998')
  },

  /**
   * 介绍信
   */

  // 保存
  addIntroduction(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463301')
  },
  // 详情
  detailIntroduction(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463303')
  },
  // 更新
  updateIntroduction(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463304')
  },
  // 删除
  delIntroduction(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463302')
  },

  /**
   * 部门
   */

  // 保存
  addDepartment(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463201')
  },
  // 详情
  detailDepartment(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463203')
  },
  // 更新
  updateDepartment(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463204')
  },
  // 删除
  delDepartment(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463202')
  },
  // 常规用印接口开始====================================>>>>>>>>>>
  // 常规用印保存
  ruleSave(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463401')
  },
  guiDang(data) {
    return Http.postNeedLoading('A08462041', data, 'A08469999')
  },
  // 常规区块链归档
  blockChainCg(data) {
    return Http.postNeedLoading('A08462041', data, 'A08465316')
  },
  // 公文区块链归档
  blockChainGw(data) {
    return Http.postNeedLoading('A08462041', data, 'A08465317')
  },
  // 介绍信块链归档
  blockChainJsx(data) {
    return Http.postNeedLoading('A08462041', data, 'A08465318')
  },
  // 部门块链归档
  blockChainBm(data) {
    return Http.postNeedLoading('A08462041', data, 'A08465315')
  },
  shoucang(data) {
    return Http.postNeedLoading('A08462041', data, 'A08469998')
  },
  //详情
  ruledetel(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463403')
  },
  //导入合同查询
  drcx(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463008')
  },
  //导入合同保存
  drsave(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463009')
  },
  //引入
  yinrus(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463010')
  },
  //收回常规
  shouhui(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463006')
  },
  //删除此文
  Sccw(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463402')
  },
  //发送下级行
  fsxjh(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463004')
  },

  Tuih(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463011')
  },
  // 流程调度
  flowControl(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463012')
  },
  // 催办
  CuiBan(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463013')
  },
  // 办结生成模板
  BanMban(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463902')
  },
  //消息通知
  Messageremind(data) {
    return Http.postNeedLoading('A08462049', data, 'A08461813')
  },
  //获取10位机构号
  OrgtenId(data) {
    return Http.postNeedLoading('A08462041', data, 'A08462500')
  },

  Looks(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463808')
  },
  /**
   * 常规用印审批查看
   */
  normalDetailList(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463821', pagination)
  },
  /**
   * 公文用印登记查看管理员
   */
  documentDetailList(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463822', pagination)
  },
  /**
   * 介绍信审批
   */
  introductionDetailList(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463823', pagination)
  },
  /**
   * 部门用印审批
   */
  departmentDetailList(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463824', pagination)
  },
  /**
   * 印章保管人员登记
   */
  preserverDetailList(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463825', pagination)
  },
  /**
   * 用印机设备登记
   */
  equipmentDetailList(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463826', pagination)
  },
  /**
   * 用印机设备维护审批
   */
  maintainDetailList(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463827', pagination)
  },
  //印章登记名称
  yzDj(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463829', pagination)
  },
  labelTian(data) {
    return Http.postNeedPage('A08462041', data, 'A08463015')
  },
  baoguanJiaojie(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463835', pagination)
  },
  // xiaoMi(data) {
  //   return Http.postNeedLoading('A0846C049', data, 'A08461814')
  // }
}
