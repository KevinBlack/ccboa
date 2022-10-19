/**
 * create by zx on 2020-1-5 14:32
 * 类注释：编号年份
 * 备注：
 */
import http from '../http'

export default {
  getNumYearList(data = {}) {
    return http.postNeedLoading('A08462053', data, "AYEAR0001")
  },
}
