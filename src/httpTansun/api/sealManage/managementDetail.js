/*
 * @Author: your name
 * @Date: 2020-12-22 15:36:58
 * @LastEditTime: 2020-12-23 16:36:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA1\src\httpTansun\api\sealManage\managementDetail.js
 */
/*
 * @Author: your name
 * @Date: 2020-12-15 15:42:53
 * @LastEditTime: 2020-12-21 16:37:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA1\src\httpTansun\api\sealManage\sealStatistical.js
 */
/**
 * 印章保管交接接口文件
 */
import Http from "../../http"

export default {
  /**
   * 常规用印审批
   */
  normalDetailList(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463821', pagination)
  },
  /**
   * 公文用印登记
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
  }
}
