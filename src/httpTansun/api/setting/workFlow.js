/*
 * @Author: wy
 * @Date: 2020-08-13 15:08:46
 * @LastEditTime: 2021-04-25 18:08:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\httpTansun\api\setting\workFlow.js
 */

import Http from '../../http';

export default {


  /**
   * 主流程首页
   * @param data
   * @param pagination
   * @returns {*}
   */

  //获取机构分类
  getOrganization (data) {
    return Http.postNeedLoading("A08462053", data, "A08461916");
  },
  //获取业务分类
  getBusiness (data) {
    return Http.postNeedLoading("A08462053", data, "A08461806");
  },
  //获取流程列表
  getTipList (data, pagination) {
    return Http.postNeedPage("A08462053", data, "A08461902", pagination)
  },
  //删除流程
  delTipList (data) {
    return Http.postNeedLoading("A08462053", data, "A08461909")
  },

  /**
   * 流程定义
   * @param data
   * @returns {*}
   */

  //获取流程定义表单数据
  getFlowDefine (data) {
    return Http.postNeedLoading("A08462053", data, "A08461908");
  },
  //业务名称
  getBusinessInfo (data) {
    return Http.postNeedLoading("A08462053", data, "A08461801");
  },
  //业务分类
  getBusinessClassify (data) {
    return Http.postNeedLoading("A08462053", data, "A08461802");
  },
  //新增流程定义
  addFlowDefine (data) {
    return Http.postNeedLoading("A08462053", data, "A08461906");
  },
  //编辑流程定义
  editFlowDefine (data) {
    return Http.postNeedLoading("A08462053", data, "A08461920");
  },

  /**
   * 环节定义
   * @param data
   * @returns {*}
   */
  //新增环节定义
  addLinkDefine (data) {
    return Http.postNeedLoading("A08462053", data, "A08461907");
  },
  //删除环节
  delLinkList (data) {
    return Http.postNeedLoading("A08462053", data, "A08461918");
  },
  //查看环节
  viewLinkDefine (data) {
    return Http.postNeedLoading("A08462053", data, "A08461910");
  },
  //调整环节环节顺序
  reorderLink (data) {
    return Http.postNeedLoading("A08462053", data, "A08461912");
  },
  // 获取部门类型
  getDeptList (data) {
    return Http.postNeedPage('A08462053', data, 'A08461727')
  },

  /**
   * 获取设计元素
   * @param data
   * @returns {*}
   */
  //获取岗位
  getPostList (data) {
    return Http.postNeedLoading("A08462053", data, "A08461914");
  },
  //获取当前所属机构部门人员树
  getMemberList (data) {
    return Http.postNeedLoading("A08462053", data, "A08461915");
  },
  //获取当前所属机构部门树
  getDepartmentList (data) {
    return Http.postNeedLoading("A08462053", data, "A08461913");
  },
  //后续环节
  getAfterNodes (data) {
    return Http.postNeedLoading("A08462053", data, "A08461905");
  },
  //子流程
  getChildrenNodes (data) {
    return Http.postNeedLoading("A08462053", data, "A08461917");
  },
  //其余设计元素
  getDesignList (data) {
    return Http.postNeedLoading("A08462053", data, "A08461736");
  },

  /**
   * 流程模板
   * @param data
   * @returns {*}
   */
  //转普通通模板,从流程模板中更新,新建流程,模板发送
  updateTemplate (data) {
    return Http.postNeedLoading("A08462053", data, "A08461921");
  },

}
