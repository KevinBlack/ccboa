/*
 * @Author: wy
 * @Date: 2020-10-12 10:37:30
 * @LastEditTime: 2021-01-21 17:24:57
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
  //   查询联系人报送列表
  getQueryLinkManList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464006', pagination)
  },
  //联系人报送选择部门
  departMentLinkMan(data) {
    return Http.postNeedLoading("A08462043", data, 'A08464012')
  },
  //   新增/更新联系人报送
  addLinkMan(data) {
    return Http.postNeedLoading("A08462043", data, 'A08464001')
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
  //   提交-联系人报送
  submitLinkMan(data) {
    return Http.postNeedLoading("A08462043", data, 'A08464001')
  },
  //   详情更新提交-联系人报送
  updatesubmitLinkMan(data) {
    return Http.postNeedLoading("A08462043", data, 'A08464003')
  },
  
  /**
   * 保存值班信息
   * @param data
   * @returns {*}
   */
  saveDyty(data) {
    return Http.postNeedLoading("A08462043", data, "ASECS5024")
  },

  /**
   * 值班汇总
   * @param data
   * @returns {*}
   */
  getDyty(data){
    return Http.postNeedLoading("A08462043", data, "ASECS5006")
  }

}
