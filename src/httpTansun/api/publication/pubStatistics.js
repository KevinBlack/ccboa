/*
 * @Author: your name
 * @Date: 2020-11-13 10:22:18
 * @LastEditTime: 2021-01-05 09:28:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa1\src\httpTansun\api\publication\pubStatistics.js
 */
import Http from "../../http"
export default {
  // 信息刊物/刊物编辑/来稿浏览/主列表
  //A08462945 A08462971
  pubBrowsingList(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462971', pagination)
  },
  // 信息刊物/刊物编辑/来稿浏览/主列表/详情
  pubBrowsingListDetails(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462968')
  },
  // 信息刊物/刊物编辑/来稿浏览/主列表/详情/入备选库按钮
  enterAlternativeDatabase(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462949')
  },
  // 信息刊物/刊物编辑/来稿浏览/主列表/详情/保存
  pubBrowsingListDetailsSave(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462969')
  },
  // 稿件统计主列表
  pubStatisticsList(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462945', pagination)
  },
  /**
   * 稿件统计/已发布期刊/整刊浏览
   */
  checkSearchParams(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462908')
  },
  // 稿件统计/已发布期刊/整刊浏览主列表
  getTableList(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462958', pagination)
  },
  /**
   * 稿件编辑/备选商会/删除
   */
  deleteAltBusiness(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462948')
  },
  /**
   * 稿件编辑/备选商会/详情-保存
   */
  deleteAltBusinessSave(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462970')
  },//A08462950
  /**
   * 稿件编辑/备选商会/详情-修改记录
   */
  deleteAltBusinessRecord(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462950', pagination)
  },
  /**
   * 稿件编辑/备选商会/修改状态
   */
  upDateAltBusinessStatus(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462961')
  },
  //信息刊物/刊物编辑/采稿组刊/主列表
  JointPublicationList(data, pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462958', pagination)
  },
  // 信息刊物/刊物编辑/采稿组刊/主列表删除
  JointPublicationListDel(data) {
    return Http.postNeedPage('A08462031', data, 'A08462983')
  },
  // 信息刊物/刊物编辑/采稿组刊/新建/初始化表格
  JointPublicationGetInt(data,pagination) {
    return Http.postNeedPage('A08462031', data, 'A08462971',pagination)
  },
  // 信息刊物/刊物编辑/采稿组刊/新建/保存
  JointPublicationSave(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462959')
  },
  // 信息刊物/刊物编辑/采稿组刊/新建/启动流程
  JointPublicationStart(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462951')
  },
  // 信息刊物/刊物编辑/采稿组刊/新建/下一流程
  JointPublicationProcess(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462952')
  },
  // 信息刊物/刊物编辑/采稿组刊/新建/发布 2956      2957  不分页查询
  JointPublicationRelease(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462954')
  },
  // 信息刊物/刊物编辑/采稿组刊/新增修改合刊备份
  JointPublicationText(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462956')
  },
   // 信息刊物/刊物编辑/采稿组刊/查询备份
   seachText(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462957')
  },
  // 信息刊物/刊物编辑/采稿组刊/刊物发布的部门和向下级发送的部门接口
  JointPublicationdepartment(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462984')
  },
  // 信息刊物/刊物编辑/采稿组刊/撤回
  JointPublicationwithdraw(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462955')
  },
  // 信息刊物/刊物编辑/采稿组刊/退回
  JointPublicationReturn(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462953')
  },
  // 信息刊物/刊物编辑/采稿组刊/审核意见
  JointPublicationOption(data) {
    return Http.postNeedLoading('A08462031', data, 'A08462967')
  },
}
