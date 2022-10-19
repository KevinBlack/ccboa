/**
 * 印章登记接口文件
 */
import Http from "../../http.js"

export default {
  // 保存接口
  doSave(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463910')
  },
  // 修改接口
  doUpdate(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463911')
  },
  // 查看详情
  doSelectByld(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463912')
  },
  // 查看是否为金科分公司
  isIFJXJK (data) {
    return Http.postNeedLoading('A08462041', data, 'A08463924')
  },
  // 删除
  doDeleteByld(data) {
    return Http.postNeedLoading('A08462041', data, 'A08463913')

  },
  // 列表查询
  doSelectAll(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463914', pagination)
  },
  // 统计接口
  doNoOrder(data, pagination) {
    return Http.postNeedPage('A08462041', data, 'A08463915', pagination)
  },
//   // 根据印章 设备型号查询印章名称和位置信息
//   searchDevice(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463916')

//   },
//   // 根据印章 id查询印章保管人
//   searchSealPerson(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463917')

//   },
//   // 根据使用机构查询印章信息
//   searchSealMesg(data) {
//     return Http.postNeedLoading('A08462041', data, 'A084639168')

//   },
}
