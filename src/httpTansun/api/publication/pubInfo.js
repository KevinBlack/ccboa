/*
 * @Author: your name
 * @Date: 2020-10-14 10:12:47
 * @LastEditTime: 2021-09-03 16:33:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\httpTansun\api\publication\pubInfo.js
 */

import Http from "../../http"
export default {
  //部门信息发布增发部门领导单发
  departmentHeadOther(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462995')
  },
  //部门信息附件存储
  accessoryStorage(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462989')
  },
  // 部门信息列表
  getInfoList(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462901', pagination)
  },
  // 部门信息列表详情
  getInfoDetail(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462902')
  },
  // 新增
  editInfo(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462903')
  },
  // 更新
  updateInfo(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462905')
  },
  // 删除信息种类
  deleteInfo(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462906')
  },
  // 简报编号编辑
  editJb(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462919')
  },
  // 归档
  getWord(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462998')
  },
  //制发信息列表
  getJbList(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462914', pagination)
  },
  //制发信息列表
  getJbListCx(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462997', pagination)
  },

  getJbListxq(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462915', pagination)
  },
  //制发信息详情
  getJbDetail(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462910')
  },
  //收回发布表格接口
  deptInfoData(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462960', pagination)
  },
  // 删除简报编号
  deleteJb(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462918')
  },

  // 简报编号维护
  bhProtect(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462916', pagination)
  },
  // 获取简报编号详情
  getBhDetail(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462917')
  },
  // 删除简报编号
  deleteBh(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462918')
  },
  // 完成并发送
  OverOk(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462911')
  },
  // 启动流程
  qdlc(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462900')
  },

  // 部门信息刊物发布
  publick(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462939')
  },
  //处理环节
  clHj(data) {
    return Http.postNeedLoading('A08462053', data, 'APPWFE002')
  },
  //处理环节btn按钮权限配置详情
  clHjkzbtn(data) {
    return Http.postNeedLoading('A08462053', data, 'APPWFE001')
  },
  //处理环节btn按钮权限配置起草
  clHjkzbtn1(data) {
    return Http.postNeedLoading('A08462053', data, 'APPWFE001')
  },
  // 查看流程
  Lookcx(data) {
    return Http.postNeedLoading('A08462053', data, 'APPWFE003')
  },
  // 撤回
  Che(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462913')
  },
  // 退回
  Tui(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462912')
  },
  // 生成编号
  generateNumber(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462937')
  },
  // 退号
  retreatNumber(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462938')
  },
  // 返回签发意见 审核意见 备注
  backData(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462967')
  },
  // 确定发布
  sureIssue(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462939')
  },
  // 删除
  delete(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462981')
  },
  // 修改简报
  updataBulletin(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462980')
  },
  // 首页信息刊物对象
  updataObject(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462982')
  },
  // 催办
  press(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462985')
  },
  // 备份
  backups(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462956')
  },
  // 查询
  checkBackups(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462957')
  },
  //发布信息下的简报下拉框接口
  getinfoTypeNmList(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462990')
  },
  //发布信息详情接口
  getinfoMessage(data) {
    return Http.postNeedLoading('A0846C031', data, 'A08462979')
    },
  //发布信息下的拟稿部门下拉框接口
  getdrafDepNmList(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462988')
  },
  //是否是一级机构接口
  getisorunitName(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462005')
  },
  //信息刊物下的首页发布信息接口
  deptInfoRelease(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462960', pagination)
  },
  //信息刊物/部门信息/发布信息-管理员显示当前所有部门
  deptInfoadmin(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08462019', pagination)
  },
  //首页本行信息-更多跳转的行名接口
  getdrafOrgId(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462991')
  },
  //首页本行信息更多跳转的页面  上表格接口
  deptUpInfoData(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462992', pagination)
  },
  //流程调度
  getJbdispatch(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462986')
  },
  /**
   * 用印
   */
  //用印管理配置模板
  collocateTemplateTable(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463908', pagination)
  },
  //模板详情
  collocateTemplate(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463909')
  },
  //新增修改
  updateInfoTemplate(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463907')
  },
  //删除模板
  deleteMB(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463906')
  }
}
