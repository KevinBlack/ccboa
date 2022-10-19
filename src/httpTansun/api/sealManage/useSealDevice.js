/*
 * @Author: wy
 * @Date: 2020-09-04 17:22:02
 * @LastEditTime: 2021-06-24 09:13:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccbOA\src\httpTansun\api\sealManage\useSeal.js
 */
import Http from "../../http.js"
import { Pagination } from "element-ui"
export default {
    // 印章管理-用印机设备登记(根据印章设备型号查询印章名称和位置信息)
    serveiceNumber(data) {
      return Http.postNeedLoading('A08462041', data, 'A08463916')
    },
    // 印章管理-用印机设备登记(新增)
    addRegister(data) {
      return Http.postNeedLoading('A08462041', data, 'A08463601')
    },
    
    // 印章管理-用印机设备登记列表项详情(新增)
    registerDetail(data) {
      return Http.postNeedLoading('A08462041', data, 'A08463602')
    },
    // 印章管理-用印机设备登记列表项详情(更新)
    updateRegisterDetail(data) {
      return Http.postNeedLoading('A08462041', data, 'A08463603')
    },
    // 印章管理-用印机设备登记(删除)
    delRegister(data) {
      return Http.postNeedLoading('A08462041', data, 'A08463604')
    },
    // 用印机设备登记本级行
    getSamelevel(data, pagination) {
        return Http.postNeedPage('A08462041', data, 'A08463605', pagination)
    },// 用印机设备登记本级行
    getLowerlevel(data, pagination) {
        return Http.postNeedPage('A08462041', data, 'A08463606', pagination)
    },
  /**
   * 起草用印审批
   * @param data
   * @returns {*}
   */

  // 待办已办办结列表
//   getWorkList(data, pagination) {
//     return Http.postNeedPage('A08462041', data, 'A08463000', pagination)
//   },
//   // 完成并发送
//   sendDocument(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463001')
//   },
//   // 发送上级行
//   sendHigherBank(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463004')
//   },
//   // 完成并发送选人确定||办结
//   sureHander(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463002')
//   },
//   //获取用印类型
//   getUseSealType(data) {
//     return Http.postNeedLoading("A08462041", data, "A08463003")
//   },
//   //生成编号
//   getSealNum(data) {
//     return Http.postNeedLoading("A08462041", data, "A08463505")
//   },
//   //获取环节
//   getLink(data) {
//     return Http.postNeedLoading("A08462041", data, "A08463005")
//   },
//   //获取机构信息
//   getorgId(data) {
//     return Http.postNeedLoading("A08462041", data, "A08463007")
//   },

//   /**
//    * 起草公文用印登记
//    */

//   // 保存公文用印登记单
//   addDocument(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463101')
//   },
//   // 更新公文用印登记单
//   updateDocument(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463104')
//   },
//   // 公文用印详情
//   detailDocument(data) {
//     return Http.postNeedLoading("A08462041", data, "A08463102")
//   },
//   // 删除公文用印
//   delDocument(data) {
//     return Http.postNeedLoading("A08462041", data, "A08463103")
//   },
//   // 引入用印公文
//   importDoc(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08462023')
//   },

//   /**
//    * 介绍信
//    */

//   // 保存
//   addIntroduction(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463301')
//   },
//   // 详情
//   detailIntroduction(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463303')
//   },
//   // 更新
//   updateIntroduction(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463304')
//   },
//   // 删除
//   delIntroduction(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463302')
//   },

//   /**
//    * 部门
//    */

//   // 保存
//   addDepartment(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463201')
//   },
//   // 详情
//   detailDepartment(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463203')
//   },
//   // 更新
//   updateDepartment(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463204')
//   },
//   // 删除
//   delDepartment(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463202')
//   },
//   // 常规用印接口开始====================================>>>>>>>>>>
//   // 常规用印保存
//   ruleSave(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463401')
//   },
//   //详情
//   ruledetel(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463403')
//   },
//   //导入合同查询
//   drcx(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463008')
//   },
//    //导入合同保存
//    drsave(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463009')
//   },
//    //引入
//    yinrus(data) {
//     return Http.postNeedLoading('A08462041', data, 'A08463010')
//   },
}
