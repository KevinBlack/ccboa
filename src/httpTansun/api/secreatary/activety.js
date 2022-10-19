/*
 * @Author: your name
 * @Date: 2020-10-12 17:40:18
 * @LastEditTime: 2021-04-09 14:48:21
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
  //党委活动安排 获取周  月 数据接口
  PartyCommittee(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461399')
  },
  // 党委活动安排 详情列表
  Partylist(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461398')
  },
  // 高管活动安排 详情列表
  GPartylist(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461387')
  },
  // 秘书活动安排 详情列表
  Msartylist(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461376')
  },
  // 党委活动安排 表单行领导
  formbank(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461394')
  },
  // 高管活动安排 表单行领导
  topFormbank(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461383')
  },
  findLeader(data) {
    return Http.postNeedLoading("A08462043", data, 'ASECS5049')
  },
  Gaogmbank(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461383')
  },
  // 党委活动安排 加入领导资料库
  lingdao(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461397')
  },
  // 党委活动安排  加入值班动态
  zhiban(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461396')
  },
  // 党委活动安排  表单保存
  Save(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461395')
  },
  // 党委活动安排  详情
  Details(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461393')
  },
  // 秘书表单活动安排  详情
  Detailsms(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461374')
  },
  // 高管--------------------------开始
  // 高管活动周数据
  gaoguanlist(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461388')
  },
  // 高管活动表单保存
  gaoguanSave(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461384')
  },
  //高管详情
  gaoguanxq(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461382')
  },
  // 党委活动安排  详情
  MbanList(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461392')
  },
  //加入领导资料库高管
  gaoguanAdd(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461386')
  },
  //查看领导活动资料高管
  gaoguanAdd1(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461386')
  },
  //查看领导活动资料高管
  mobanList(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461356')
  },
  // 高管--------------------------结束

  // 秘书活动安排周数据
  mishudata(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461377')
  },

  // 领导活动安排查询,分页列表
  anpaidata(data, pagination) {
    return Http.postNeedPage("A08462043", data, 'A08461350', pagination)
  },
  // 领导活动统计列表
  tongjilist(data, pagination) {
    return Http.postNeedPage("A08462043", data, 'A08461352', pagination)
  },
  // 领导活动统计行领导
  statistical(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461351')
  },
  // 领导活动活动类型
  ActivityType(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471541')
  },
  // 删除领导活动安排
  deldata(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461353')
  },
  //秘书-------------------------------->>
  //秘书保存
  mishuSave(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461375')
  },
  //秘书--------------------------------end>>
  // 成员dw接口
  dwData(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461354')
  },
  // 成员dw接口
  msData(data) {
    return Http.postNeedLoading("A08462043", data, 'A08461355')
  },

  //主要负责人请假
  //今日请假人数
  todayLeave(data) {
    console.log(data)
    return Http.postNeedLoading("A08462043", data, 'A08466001')
  },
  // 明日请假人数
  tomorrowLeave(data) {
  return Http.postNeedLoading("A08462043", data, 'A08466002')
  },
  // 主要负责人请假详情
  leaveDetails(data) {
  return Http.postNeedLoading("A08462043", data, 'A08466003')
  },
  // 主要负责人请假合规详情
  reminderDetails(data) {
  return Http.postNeedPage("A08462043", data, 'A08466004')
  },
  // 主要负责人请假部门
  leaveUnit(data) {
  return Http.postNeedPage("A08462043", data, 'A08466005')
  }
}
