/*
 * @Author: your name
 * @Date: 2020-08-20 14:37:25
 * @LastEditTime: 2021-05-24 15:47:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\httpTansun\api\setting\organization.js
 */
import Http from '../../http';


export default {
  getDepartMentList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08462004', pagination)
  },

  //保存部门信息表
  sendDeparentConfig(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462006')
  },
  //获取部门详细信息
  getOrgdetail(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462002')
  },

  //保存机构信息表
  sendOrgManage(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462003')
  },
  /**
   * 获取机构列表
   * @param {h}} data
   * @param {*} page
   */
  getOrgList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08462001', pagination)
  },

  sortOrg(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462030')
  },

  /**
   * 人员排序
   * @param data
   * @returns {*}
   */
  sortPerson(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462031')
  },

  //机构部门组织树
  getTree(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462019')
  },
  //获取全部
  getAllOrgOrDept(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462026')
  },

  //获取机构详情
  getOrgDetail(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462002')
  },

  //获取部门详情
  getDepDetail(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462005')
  },

  //获取人员列表
  getPeopleList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'A08462010', pagination)
  },

  //获取文件交换柜人员管理列表
  getFileExchangeList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'ADICS2041', pagination)
  },
  //修改或新增文件交换柜人员
  updateFileExchange(data) {
    return Http.postNeedPage('A08462053', data, 'ADICS2043')
  },
  //详情查询文件交换柜人员
  detailFileExchange(data) {
    return Http.postNeedPage('A08462053', data, 'ADICS2042')
  },


  //部门变更
  //合并
  getMerge(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462008')
  },
  //迁移
  getMove(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462009')
  },
  /**
   * 合署办公列表
   * @param data
   * @param pagination
   * @returns {*}
   */
  getBelongWorkList(data, pagination) {
    return Http.postNeedPage('A08462053', data, 'ADICS2023', pagination)
  },

  /**
   * 合署办公新增
   * @param data
   * @returns {*}
   */
  belongWorkAdd(data, id) {
    return Http.postNeedLoading('A08462053', data, id)
  },

  /**
   * 合署办公删除
   * @param data
   * @returns {*}
   */
  belongWorkDelete(data) {
    return Http.postNeedLoading('A08462053', data, "ADICS2024")
  },

  /**
   * 获取人员详情
   * @param data
   * @returns {*}
   */
  getPersonDetail(data) {
    return Http.postNeedLoading('A08462053', data, "A08462011")
  },

  /**
   * 获取机构人员树   ADICS2053
   */
  getOrgPerson(data) {
    return Http.postNeedLoading('A08462053', data, "ADICS2053")
  },

  /**
   * 组织机构人员数据同步     A0SYN2021 
   */
  synchro(data) {
    return Http.postNeedLoading('A08462053', data, "A0SYN2021")
  }
}
