/*
 * @Author: wy
 * @Date: 2020-10-12 10:37:30
 * @LastEditTime: 2020-10-15 11:22:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\httpTansun\api\secreatary\linkMan.js
 */
import Http from '../../http'

export default {
  /**
   *
   * @param data
   * @returns {*}
   */
  //   查看联系人报送列表
  getLinkManList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464004', pagination)
  },

  //   详情联系人报送
  detailLinkMan(data) {
    return Http.postNeedLoading("A08462043", data, 'A08464002')
  },
  //   详情更新联系人报送
  updateLinkMan(data) {
    return Http.postNeedLoading("A08462043", data, 'A08464003')
  },
  //   删除联系人报送
  delLinkMan(data) {
    return Http.postNeedLoading("A08462043", data, 'A08464005')
  },

  

  /**
   * 值班汇总
   * @param data
   * @returns {*}
   */
  getDuty(data){
    return Http.postNeedLoading("A08462043", data, "ASECS5006")
  },

  /**
   * 值班人员管理
   * @param data
   * @returns {*}
   */
  addDutyMan(data) {
    return Http.postNeedLoading("A08462043", data, 'ASECS5014')
  },
  updateDutyMan(data) {
    return Http.postNeedLoading("A08462043", data, 'ASECS5013')
  },
  listDutyMan(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASECS5012', pagination)
  },
  deleteDutyMan(data) {
    return Http.postNeedPage('A08462043', data, 'ASECS5015')
  },
  listDutyNotice(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASECS5002', pagination)
  },
  /**
   * 值班统计
   * @param data
   * @returns {*}
   */
  getDutyStatistic(data){
    return Http.postNeedLoading("A08462043", data, "ASECS5009")
  },
   // 行政值班－工作日
  // 行政值班－节假日
  getList(data) {
    return Http.postNeedLoading("A08462043", data, "ASECS5032")

  },
  //新增
  postNewContent(data) {
    return Http.postNeedLoading("A08462043", data, "ASECS5034")
  },
  //更新
  postOldContent(data) {
    return Http.postNeedLoading("A08462043", data, "ASECS5033")
  },
  //管理员查看下的：周期值班表
  manageList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASECS5022', pagination)

  },
  //管理员查看下的：值班通知单
  getDytyList(data,pagination) {
   
      // return Http.postNeedLoading("A08462043", data, "ASECS5010")
      return Http.postNeedPage('A08462043', data, 'ASECS5010', pagination)

  
  },
  getlistDutyNotice(data) {
    return Http.postNeedLoading('A08462043', data, 'ASECS5046')
  },
  //值班通知单 详情 确认
  toGetInfor(data){
    return Http.postNeedLoading('A08462043', data, 'ASECS5048')

  },
   //值班通知单 详情 确认
   toGetList(data){
    return Http.postNeedLoading('A08462043', data, 'ASECS5001')

  }
}
