/*
 * @Author: wy
 * @Date: 2020-07-27 14:49:14
 * @LastEditTime: 2020-09-04 17:22:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\http\api\setting\themeLexicon.js
 */
import Http from "../../http.js"
export default {
  /**
   * 配置类别词
   * @param data
   * @returns {*}
   */

  /**
   * 类别词查看A08461205
   */

  classifierDetail(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461205')
  },
  /**
   * 类别词编辑A08461204
   */

  classifierUpdate(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461204')
  },
  /**
   * 配置类属词
   * @param data
   * @returns {*}
   */

  /**
   * 类属词查看A08461209
   */

  genusView(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08461209', pagination)
  },
  /**
   * 类属词详情A08461210
   */

  genusDetail(data) {
    return Http.postNeedPage('A08462053', data, 'A08461210')
  },
  /**
   * 类属词修改A08461208
   */

  genusUpdate(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461208')
  },
  /**
   * 类属词增加A08461206
   */

  genusAdd(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461206')
  },
  /**
   * 类属词删除A08461207
   */

  genusDelete(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461207')
  },

  /**
   * 配置公共类属词
   * @param data
   * @returns {*}
   */

  /**
   * 公共类属词查看A08461213
   */

  publicGenusDetail(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461213')
  },
  /**
   * 公共类属词编辑A08461212A08461212
   */

  publicGenusUpdate(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461212')
  },
  /**
   * 配置文种词
   * @param data
   * @returns {*}
   */

  /**
   * 文种词查看A08461217
   */

  practiceDetail(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461217')
  },
  /**
   * 文种词编辑A08461216
   */

  practiceUpdate(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461216')
  }
}
