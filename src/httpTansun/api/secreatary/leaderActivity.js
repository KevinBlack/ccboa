/*
 * @Author: your name
 * @Date: 2020-10-12 17:40:18
 * @LastEditTime: 2021-01-28 19:20:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\httpTansun\api\secreatary\leaderActivity.js
 */
import Http from '../../http'

export default {
  /**
   *
   * @param data
   * @returns {*}
   */
  getLeaderActivityList(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461339')
  },
  //  领导批示安排 电子
  getElectronicsList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08461444', pagination)

  },
  // 领导批示安排 参数维护
  getParamsList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08461434', pagination)

  },
  // 领导批示安排 参数维护 文件类型 下拉框
  getLeaderSelect(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461437')
  },
  //领导姓名 下拉框
  getLeaderName(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461435')
  },
  //秘书姓名 下拉框
  getSecreatary(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461436')
  },
  // 参数维护详情 新增
  addParams(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461431')

  },
  // 参数维护详情 编辑
  addEdit(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461433')

  },
  // 登记实物 列表
  loginList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08461416', pagination)

  },
  //列表删除 电子
  toDelete(data) {
    return Http.postNeedPage('A08462043', data, 'A08461442')

  },
  // 登记实物 新增列表
  getdeptList(data) {
    return Http.postNeedPage('A08462043', data, 'A08461438')

  },

  //领导批示登记 查询模块
  leaderLook(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08461419', pagination)

  },

  // 领导批示安排 参数维护 列表 删除
  delLeader(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461432')
  },
  // 领导批示安排 实物 列表 删除
  delLeaderList(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461411')
  },
  //领导批示登记 新增 获取部门及日期

  // 领导批示登记 查询
  deleteLook(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461411')

  },
  //领导批示登记 事物  新增
  postAdd(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461413')

  },
  //领导批示登记 事物 点击保存
  postChange(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461412')

  },
  //领导批示登记 详情页 id请求数据
  detailId(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461417')

  },
  //领导批示登记 返回给上一级人
  goBack(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461425')

  },
  //领导批示登记电子 详情页 id请求数据
  eleEtailId(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461445')

  },
  //查看流程
  seeProcedure(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461418')

  },
  //领导批示登记 新增 获取时间部门
  getDepart(data) {
    return Http.postNoLoading("A08462043", data, 'A08461420')

  },
  //领导批示登记  完成并发送
  toSend(data) {
    return Http.postNoLoading("A08462043", data, 'A08461414')

  },
  //领导批示登记 完成并发送/办结 点击确定
  toSure(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461415')

  },
  //收回
  toShou(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461422')

  },
  //收藏
  shoucang(data) {
    return Http.postNeedLoading("A08462043", data, 'A08465007')

  },
  //获取控制域
  getKong(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461423')

  },
  //领导批示登记 查询 获取行名
  getHang(data) {
    return Http.postNoLoading("A08462043", data, 'A08461424')

  },
  //领导活动安排

  //根据ID查询数据
  getDataId(data) {
    return Http.postNoLoading("A08462043", data, 'A08461344')

  },
  //点击选择按钮删除
  deleteAll(data) {
    return Http.postNoLoading("A08462043", data, 'A08461348')

  },
  // 成员配置 查询
  getList(data, pagination) {
    return Http.postNeedPage("A08462043", data, 'A08461333', pagination)

  },
  //成员配置 秘书新增保存
  saveSectary(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461342')

  },
  //删除
  deleteDataSec(data) {
    return Http.postNoLoading("A08462043", data, 'A08461345')

  },
  //成员配置 党委成员配置 查询
  getListDang(data, pagination) {
    return Http.postNeedPage("A08462043", data, 'A08461326', pagination)

  },
  //新增
  addDataDang(data) {
    return Http.postNoLoading("A08462043", data, 'A08461323')

  },
  //更新
  upDataDang(data) {
    return Http.postNoLoading("A08462043", data, 'A08461324')

  },
  //删除
  deleteDataDang(data) {
    return Http.postNoLoading("A08462043", data, 'A08461337')

  },

  //高管成员 查询
  getListGao(data, pagination) {
    return Http.postNeedPage("A08462043", data, 'ASECS1301', pagination)

  },
  //新增
  addDataGao(data) {
    return Http.postNoLoading("A08462043", data, 'A08461327')

  },
  //更新
  upDataGao(data) {
    return Http.postNoLoading("A08462043", data, 'A08461328')

  },
  //删除
  deleteDataGao(data) {
    return Http.postNoLoading("A08462043", data, 'A08461349')

  },

  //编辑权限
  getListEdit(data, pagination) {
    return Http.postNeedPage("A08462043", data, 'A08461335', pagination)

  },
  //新增
  saveEdit(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461334')

  },
  //删除
  deleteDataEdit(data) {
    return Http.postNoLoading("A08462043", data, 'A08461347')

  },
  //点击选择按钮删除
  deleteAllEdit(data) {
    return Http.postNoLoading("A08462043", data, 'A08461347')

  },
  //根据ID查询数据
  getDataIdEdit(data) {
    return Http.postNoLoading("A08462043", data, 'A08461346')

  },
}
