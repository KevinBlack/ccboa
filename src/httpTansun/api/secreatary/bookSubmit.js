/*
 * @Author: zj
 * @Date: 2020-10-12 10:37:30
 * @LastEditTime: 2020-11-04 15:26:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\httpTansun\api\secreatary\linkMan.js
 */
import Http from '../../http'

export default {

  //  通讯录查看列表
  bookListss(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464010', pagination)
  },

 



}
