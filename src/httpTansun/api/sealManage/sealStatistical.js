/*
 * @Author: your name
 * @Date: 2020-12-15 15:42:53
 * @LastEditTime: 2020-12-23 16:37:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA1\src\httpTansun\api\sealManage\sealStatistical.js
 */
/**
 * 印章保管交接接口文件
 */
import Http from "../../http.js"

export default {
  /**
   * 按用印部门统计
   */
  statisticalDepartment(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463801')
  },
  /**
   * 按印章类别统计
   */
  statisticalSealType(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463802')
  },
  /**
   * 按用印性质统计
   */
  statisticalProperty(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463803')
  },
  /**
   * 按送往单位统计
   */
  statisticalUnitsType(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463804')
  },
  /**
   * 按介绍信统计（申请部门）
   */
  statisticalIntroduction(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463805')
  },
  /**
   * 按介绍信统计（发往单位）
   */
  statisIntroduction(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463806')
  },
  //印章登记-按印章状态统计
  statisDocStuas(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463807')
  },
  //印章登记-按印章保管方式统计
  statisKeeper(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463808')
  },
  //按印章类别统计
  statisType(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463809')
  },
  /**
   * 常规用印查询
   */
  searchIntroduction(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463840', pagination)
  },
  // * 部门用印查询
  searchDepart(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463850', pagination)
  },
  // * 介绍信用印查询
  searchInfo(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463830', pagination)
  },
  // * 公文用印查询
  searchDocument(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463820', pagination)
  },
  // * 印章保管人查询    A08463860
  searchKeeper(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463860', pagination)
  },
  // * 印章登记查询	A08463870
  searchRegister(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463870', pagination)
  },
  // * 印章保管交接查询	A08463880
  searchChange(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463880', pagination)
  },
  // * 用印机设备查询	A08463890
  searchFacility(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463890', pagination)
  },
  // * 用印机设备维护审批查询	A08463890
  searchApply(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463891', pagination)
  },
}
