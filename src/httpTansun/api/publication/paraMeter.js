/*
 * @Author: your name
 * @Date: 2020-10-14 10:12:47
 * @LastEditTime: 2021-09-13 16:45:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\httpTansun\api\publication\pubInfo.js
 */

import Http from "../../http"
export default {
  //登陆跳转中间页
  LoginAmongPage(data){
    return Http.postNeedLoading('A08462049', data, '/setting')
  },
  // 5	常用发送部门配置详情
  FadepartmentXq(data) {
    return Http.postNeedPage('A08462031', data, 'A08462924')
  },
  // 撰写稿件获取一级机构
  getDeptList(data) {
    return Http.postNeedLoading('A08462031', data, "A08462965")
  },
  //收回接口
  takeBack(data) {
    return Http.postNeedLoading('A08462031', data, "A08462944")
  },
  // 权限配置
  AccessConfiguration(data) {
    return Http.postNeedPage('A08462053', data, 'APPWFE001')
  },
  // 模板管理配置信息列表接口
  paraMeterList(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462932', pagination)
  },

  /**
   *    审核意见-另接口（查询）  A08461134
   */
  perWritingSe(data) {
    return Http.postNeedLoading('A08462049', data, "A08461134")
  },
  // 消息提醒（个人办公'A08462049'）
  messageLogging(data) {
    return Http.postNeedLoading('A08462049', data, "A08461813")
  },

  /**
   * 审核意见-新增 A08461133
   */
  perWritingCr(data) {
    return Http.postNeedLoading('A08462049', data, "A08461133")
  },
  /**
   * 审核意见-删除  A08461137
   */
  perWritingDe(data) {
    return Http.postNeedLoading('A08462049', data, "A08461137")
  },
  // 模板管理配置信息删除接口
  paraMeterDel(data) {
    return Http.postNeedPage('A08462031', data, 'A08462933',)
  },
  // 模板管理配置信息编辑接口
  paraMeterAdd(data) {
    return Http.postNeedPage('A08462031', data, 'A08462931')
  },
  // 模板管理配置信息详情借口
  paraMeterDetal(data) {
    return Http.postNeedPage('A08462031', data, 'A08462934')
  },
  // 	16	刊物管理编辑接口
  PublicationManagementIde(data) {
    return Http.postNeedPage('A08462031', data, 'A08462907')
  },
  // 	获取刊物管理列表接口
  PublicationManagementlist(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462908', pagination)
  },
  // 	获取刊物管理列表删除
  PublicationManagementDel(data) {
    return Http.postNeedPage('A08462031', data, 'A08462909',)
  },
  // 刊物定义列表详情
  PublicationListData(data) {
    return Http.postNeedPage('A08462031', data, 'A08462935')
  },
  // 常用及部门发送详情
  ReviewIdeaListData(data) {
    return Http.postNeedPage('A08462031', data, 'A08462962')
  },
  //直接投稿配置信息bianji接口
  ContributeDirectlylist(data) {
    return Http.postNeedPage('A08462031', data, 'A08462929',)
  },
  // 直接投稿配置信息获取接口huoqu
  ContributeDirectlyxz(data) {
    return Http.postNeedPage('A08462031', data, 'A08462930',)
  },
  // 统计合并部门
  MrgedDepartments(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462926', pagination)
  },
  // 评审意见
  pinshenyjlist(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462921', pagination)
  },
  // 删除评审意见
  pinshenyjDel(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462922')
  },
  // 评审意见编辑
  pinshenyjide(data) {
    return Http.postNeedPage('A08462031', data, 'A08462920')
  },
  // 4	常用发送部门配置编辑
  Fadepartment(data) {
    return Http.postNeedPage('A08462031', data, 'A08462923')
  },
  //	6	统计合并部门配置信息编辑
  TjhbBj(data) {
    return Http.postNeedPage('A08462031', data, 'A08462925')
  },
  //	6	统计合并部门配置信息编辑详情
  TjhbBjxq(data) {
    return Http.postNeedPage('A08462031', data, 'A08462936')
  },
  //	6	统计合并部门配置信息列表删除
  CategoryDelete(data) {
    return Http.postNeedPage('A08462031', data, 'A08462928')
  },
  //7	批量更新统计合并部门配置状态接口(禁用启用)
  EnableDisable(data) {
    return Http.postNeedPage('A08462031', data, 'A08462927')
  },
  // ---------------------------------------------------------------->>>>
  //流程获取
  processAcquisition(data) {
    return Http.postNeedPage('A08462031', data, 'A08462966')
  },
  //稿件列表
  // TODO  45 更换为63
  ManuscriptList(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462963', pagination)
  },
  // 投稿查询
  ManuscriptCx(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462964', pagination)
  },
  // 稿件列表删除
  ManuscriptListdel(data) {
    return Http.postNeedPage('A08462031', data, 'A08462948')
  },
  //稿件save
  ManuscriptSave(data) {
    return Http.postNeedPage('A08462031', data, 'A08462940')
  },
  //稿件save_正文
  ManuscriptSaveZw(data) {
    return Http.postNeedPage('A08462031', data, 'A08462972')
  },
  // 送审核1
  ManuscriptSend(data) {
    return Http.postNeedPage('A08462031', data, 'A08462941')
  },
  // 送审核1
  ManuscriptSendSecond(data) {
    return Http.postNeedPage('A08462031', data, 'A08462942')
  },
  // 退撰稿人1
  ManuscriptTuigr(data) {
    return Http.postNeedPage('A08462031', data, 'A08462994')
  },
  // 退撰稿人2
  ManuscriptTuigrSecond(data) {
    return Http.postNeedPage('A08462031', data, 'A08462944')
  },
  //稿件chehui
  Manuscriptche(data) {
    return Http.postNeedPage('A08462031', data, 'A08462944')
  },
  //稿件详情
  Manuscriptxq(data) {
    return Http.postNeedPage('A08462031', data, 'A08462946')
  },
  //稿件tougao
  Manuscripttougao(data) {
    return Http.postNeedPage('A08462031', data, 'A08462947')
  },
  //首页部门信息
  deptInfoList(data, pagination) {
    return Http.postNeedPage('A08462049', data, 'A08461330', pagination)
  },
  //每日动态稿件收藏
  ManuCollection(data){
    return Http.postNeedLoading('A08462031', data, 'A08462974')
  },
  // 采编组刊收藏
  periodicalCollection(data){
    return Http.postNeedLoading('A08462031', data, 'A08462975')
  },
  // 部门信息收藏
  depInformationCollection(data){
    return Http.postNeedLoading('A08462031', data, 'A08462976')
  },
  NumberAffirm(data){
    return Http.postNeedLoading('A08462031', data, 'A08462977')
  },
  AdminExmine(data){
    return Http.postNeedLoading('A08462031', data, 'A08462978')
  }
}
