/**
 * create by zx on 2020-1-5 14:32
 * 类注释：用户信息http
 * 备注：
 */
import http from '../http'

export default {
  login(data) {
    return http.postNeedLoading('1234', data, "A08460404")
  },
}
