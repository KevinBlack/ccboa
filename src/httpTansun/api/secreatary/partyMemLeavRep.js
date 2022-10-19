/*
 * @Author: wy
 * @Date: 2020-08-06 11:01:27
 * @LastEditTime: 2020-08-14 14:20:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\http\api\secreatary\partyMemLeavRep.js
 */
import Http from "../../http.js"
export default {
  /*
   * 按条件查询党委成员离京报告 A08461608
   */
  getUserFromDepart(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461617')
  },
  /**
   * 党委成员离京报告(查看列表)A08461607
   * @param data
   * @returns {*}
   */
  getMemLeavRepList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08461607', pagination)
  },
  /**
   * 新增党委成员离京报告A08461603
   */
  saveMemLeavRep(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461603')
  },
  /**
   * 编辑保存党委成员离京报告A08461602
   */
  editSaveMemLeavRep(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461602')
  },
  /*
   * 获取节点信息及人员树
   **/
  getNodeAndUsers(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461604')
  },
  //收藏
  shoucang(data) {
    return Http.postNeedLoading('A08462043', data, 'A08465008')
  },
  /*
   * 获取所有节点
   **/
  getAllNodeAndUsers(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461611')
  },
  /**
   * 获取党委成员离京报告详情 A08461613
   */
  getMemLeavRepDetail(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461613')
  },
  /*
   * 更新（完成并发送/办结）A08461605
   */
  submitToSend(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461605')
  },
  /*
   * 删除党委成员离京报告 A08461605
   */
  delMemLeavRep(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461601')
  },
  /*
   * 按条件查询党委成员离京报告 A08461608
   */
  getMemLeavRepListByQuery(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08461608', pagination)
  },
  /*
   * 按条件查询党委成员离京报告 A08461608
   */
  getMemLeavRepListByStatistic(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08461609', pagination)
  },
  /*
   * 获取流程详情
   * */
  getProcessDetail(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461606')
  },
  // 党委离京报告-完成并发-直接返回
  goBack(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461622')
  },
  /*
   * 获取控制域
   * */
  getEditArear(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461616')
  },
  /*
   * 收回
   * */
  recyclingProcess(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461610')
  },
  //归档
  binLog(data) {
    return Http.postNeedLoading('A08462043', data, 'A08465001')
  },
  /*
   * 作废
   * */
  invalidProcess(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461614')
  },
  /*
   * 管理员查看
   * */
  getAdminMemLeavRepList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08461618', pagination)
  },
  /*
   * 管理员获取详情信息
   * */
  getAdminDetail(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461621')
  },
  /*
   * 获取起草人信息
   * */
  getAuthorInfo(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461615')
  },
  /*
   * 管理员保存更新
   * */
  saveAdminInfo(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461620')
  },
  /*
   * 管理员删除意见
   * */
  deltAdminRemark(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461619')
  }
}
