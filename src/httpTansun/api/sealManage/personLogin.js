/*
 * @Author:zj
 * @Date: 2020-11-17 16:13:13
 * @LastEditTime: 2020-11-19 10:56:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\httpTansun\api\sealManage\personLogin.js
 */
import Http from "../../http"
export default {
    // handleSave(data) {
    //     return Http.postNeedLoading('A08462043', data, 'A08471736')
    //   },

    getPersonList(data){
        // return Http.postNeedLoading('A08462053', data, 'A08462019')
        return Http.postNeedLoading('A08462053', data, 'ADICS2053')

    },
    getList(data, pagination) {
        return Http.postNeedPage('A08462041', data, 'A08463701', pagination)

    },
    //详情页 获取详情
    getDetail(data) {
        return Http.postNeedLoading('A08462041', data, 'A08463704')

    },
    //新增
    addForm(data) {
        return Http.postNoLoading('A08462041', data, 'A08463702')

    },
    //删除
    deleteRows(data) {
        return Http.postNoLoading('A08462041', data, 'A08463703')

    },
}
