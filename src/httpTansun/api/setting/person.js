/*
 * @Author: zj
 * @Date: 2020-08-22 15:02:10
 * @LastEditTime: 2020-09-21 10:00:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\httpTansun\api\setting\person.js
 */

import Http from "../../http.js"
export default {

  //获取人员列表
  // getDepartMentList(data, pagination) {
  //     return Http.postNeedPage('A08462053', data, 'A08462004', pagination)
  // },
  getPeopleList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08462004', pagination)
  },


  //解冻人员
  relievePerson(data) {
    return Http.postNeedPage('A08462053', data, "A08462028")
  },

  //保存人员修改
  sendPerson(data) {
    return Http.postNeedPage('A08462053', data, 'A08462012')
  },

  //字典表查询 特殊权限，岗位分类
  getPersonInfo(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462007')
  },

  //获取休眠人员列表
  // getXiuList(data, pagination) {
  //     return Http.postNeedPage('A08462053', data, 'A08462004', pagination)
  // },
  /**
   * 删除人员
   * @param data
   * @returns {*}
   */
  deletePersons(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462032')
  }
}
