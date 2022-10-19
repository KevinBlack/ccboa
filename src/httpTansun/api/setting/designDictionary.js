/*
 * @Author: nwl
 * @Date: 2020-08-10 14:28:37
 * @LastEditTime: 2020-09-29 14:47:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\http\api\setting\designDictionary.js
 */
import Http from "../../http.js"

export default {
  // 设计元素新增
  upopinionFldData(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461711')
  },
  //设计元素列表
  designElementList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08461712', pagination)
  },
  designElementList11(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461712')
  },
  //设计元素新增页面通过id查询设计元素
  designElementFind(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461713')
  },
  //设计元素页面更新
  designElementUpdate(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461714')
  },
  //设计元素列表页批量删除
  designElementDelete(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461715')
  },
  //模块设置新增
  moduleSettingAdd(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461721')
  },
  //模块设置列表获取1
  moduleSettingList1(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08461722', pagination)
  },
  //模块设置列表获取2
  moduleSettingList2(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461722')
  },
  //模块设置查询
  moduleSettingFind(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461723')
  },
  //模块列表页面批量删除
  moduleSettingDelete(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461724')
  },
  //模块列表更新
  moduleListUpdate(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461725')
  },
  //新增业务分类
  businessClassifyAdd(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461803')
  },
  //获取业务分类列表
  businessClassifyList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08461802', pagination)
  },
  //业务分类列表页批量删除
  businessClassifyListDelete(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461804')
  },
  //根据模块关键字获取业务分类配置信息
  businessClassifyDetail(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461801')
  },

//获取部门列表
  getDeptList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08461727', pagination)
  },
//更新部门列表
  updateDeptList(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461737')
  },
  //删除部门
  deleteDeptList(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461729')
  },

  //获取机构列表
  getOrgList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08461732', pagination)
  },
  //删除机构
  deleteDepList(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461729')
  },
  //删除机构
  deleteOrgList(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461734')
  },
  //更新机构
  updateOrgList(data) {
    return Http.postNeedLoading('A08462053', data, 'A08461738')
  },
  //设置反向提醒
  seReMind(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462105')
  },
  //获取反响提醒
  getReMind(data){
    return Http.postNeedLoading('A08462053', data, 'A08462106')
  },

}
