/** @description: 全局 当前日期时间 方法 混入 */
import { parseTime } from '@/util/date-parse-util.js'
import publishedMixin from './published-mixin'
import commonPaginationMixin from './common-pagination-mixin'
export default {
  name: 'currentDateTimeMixin',
  mixins: [publishedMixin, commonPaginationMixin],
  computed: {
    /** @description: 日期模式 */
    ONLY_DATE_MODE() {
      return 'onlyDate'
    },
    /** @description: 时间模式 */
    ONLY_TIME_MODE() {
      return 'onlyTime'
    },
    /** @description: 日期时间混合模式 */
    DATE_TIME_MODE() {
      return 'dateTime'
    },
    /** @description: 当前登录用户信息 */
    currentUserInfo() {
      return localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")) || {}
    }
  },
  methods: {
    /** @description: 获取当前日期时间 */
    getCurrentDateTime(mode = 'onlyDate', dateSeperator = '-') {
      const timePart = '{h}:{i}:{s}'
      const datePart = `{y}${dateSeperator}{m}${dateSeperator}{d}`
      switch (mode) {
        case this.ONLY_DATE_MODE:
          return parseTime(new Date().getTime(), datePart)
        case this.ONLY_TIME_MODE:
          return parseTime(new Date().getTime(), timePart)
        default:
          return parseTime(new Date().getTime(), `${datePart} ${timePart}`)
      }
    },
    /** @description: 获取指定日期时间 */
    getSpecifiedDateTime(dateTimeStr, mode = 'onlyDate', dateSeperator = '') {
      const timePart = '{h}:{i}:{s}'
      const datePart = `{y}${dateSeperator}{m}${dateSeperator}{d}`
      switch (mode) {
        case this.ONLY_DATE_MODE:
          return parseTime(new Date(dateTimeStr).getTime(), datePart)
        case this.ONLY_TIME_MODE:
          return parseTime(new Date(dateTimeStr).getTime(), timePart)
        default:
          return parseTime(new Date(dateTimeStr).getTime(), `${datePart} ${timePart}`)
      }
    }
  }
}
