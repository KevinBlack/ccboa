/*
 * @Author: your name
 * @Date: 2020-09-09 11:25:00
 * @LastEditTime: 2020-09-25 10:35:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\httpTansun\api\setting\logs.js
 */
import Http from '../../http';


export default {
  getLoginLogList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08462503', pagination)
  },

  //日志/安全设置----列表
  getJournalList(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461501')
  },
  //获取收藏文件类型
  getCollectTypeList(data) {
    return Http.postNoLoading('A08462053', data, 'A08462504')
  },

  //日志/安全设置----编辑
  saveJournalList(data) {
    return Http.postNoLoading('A08462053', data, 'A08461502')
  },

  //注销用户日志列表接口
  getUserLogOff(data,pagination){
    return Http.postNeedPage('A08462053', data, 'ABASE5112',pagination)
  },

  //数据迁移用户日志列表接口
  getDataMigration(data,pagination){
    return Http.postNeedPage('A08462053', data, 'ABASE5113',pagination)
  }

}
