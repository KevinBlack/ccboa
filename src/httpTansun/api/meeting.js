/*
 * @Author: your name
 * @Date: 2020-08-19 15:21:37
 * @LastEditTime: 2021-09-10 15:07:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\httpTansun\api\meeting.js
 */
import Http from "../http"
export default {
  /**
   * 会议管理反馈信息配置新增A08461601
   * @param data
   * @returns {*}
   */
  createAddData(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461601')
  },
  /**
   *会议管理反馈信息配置列表A08461602
   * @param data
   * @returns {*}
   */
  meetingTable(data, pagination) {
    return Http.postNeedPage("A08462037", data, 'A08461602', pagination)
  },
  /**
   * 会议管理反馈信息配置详情 A08461605
   */
  settingDetail(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461605')
  },
  /**
   * 会议管理反馈信息机构名称select A08461652   已不用
   */
  // jigou(data) {
  //   return Http.postNeedLoading("A08462037", data, 'A08461652')
  // },
  /**
   * 会议管理反馈信息配置（删除）A08461603
   */
  settingDelete(data) {
    return Http.postNeedLoading('A08462037', data, "A08461603")
  },
  /**
   * 会议管理反馈信息配置（更新）A08461604
   */
  infoUpdate(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461604')
  },
  /**
   *会议系统配置列表A08461607
   * @param data
   * @returns {*}
   */
  mSetTable(data, pagination) {
    return Http.postNeedPage("A08462037", data, 'A08461607', pagination)
  },
  /**
   * 会议系统配置详情 A08461610
   */
  settingDetail1(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461610')
  },

  /**
   * 会议系统配置（更新）A08461609
   */
  setUpdate(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461609')
  },
  /**
   * 会议系统配置（删除）A08461608
   */
  setDelete(data) {
    return Http.postNeedLoading('A08462037', data, "A08461608")
  },
  /**
   *会议系统配置新增A08461606
   * @param data
   * @returns {*}
   */
  setAddData(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461606')
  },
  /**
   *会议系统配置新增获取岗位A08461606
   * @param data
   * @returns {*}
   */
  setAddDataG(data) {
    return Http.postNeedLoading("A08462053", data, 'A08461914')
  },
  /**
   *会议管理传阅列表------ A08461657
   * @param data
   * @returns {*}
   */
  circulationTable(data, pagination) {
    return Http.postNeedPage("A08462037", data, 'A08461657', pagination)
  },
  /**
   * 会议管理传阅详情 A08461655
   */
  circulationDetail1(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461655')
  },
  //传阅更新   A08461658
  updataCy(data) {
    return Http.postNeedLoading('A08462037', data, "A08461658")
  },
  /**
   *获取未阅人员  A08461699
   * @param data
   * @returns {*}
   */
  noCyList(data) {
    return Http.postNeedLoading('A08462037', data, "A08461699")
  },
  /**
   * 传阅回收   A08461683
   * @param data
   * @returns {*}
   */
  cheHuiCy(data) {
    return Http.postNeedLoading('A08462037', data, "A08461683")
  },
  /**
   *制发列表------A08461671
   * @param data
   * @returns {*}
   */
  zfTable(data, pagination) {
    return Http.postNeedPage("A08462037", data, 'A08461671', pagination)
  },
  /**
   * 会议管理制发详情 A08461672
   */
  zfDetail1(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461672')
  },

  /**
   * 查看环节  会议管理获取控制域 A08461680
   * @returns {*}
   */
  getHuanJie(data) {
    return Http.postNeedLoading('A08462037', data, "A08461680")
  },
  /**
   * 会议管理制发新增 A08461670
   * @param data
   * @returns {*}
   */
  zfAddData(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461670')
  },
  /**
   * 会议管理制发（更新）A08461674
   */
  zfUpdateData(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461674')
  },
  /**
   * 会议管理删除制发单-----还未删除意见opinion A08461673
   */
  zfDelData(data) {
    return Http.postNeedLoading('A08462037', data, "A08461673")
  },
  /**
   *制发单收回  A08461675
   * @returns {*}
   */
  zfBack(data) {
    return Http.postNeedLoading('A08462037', data, "A08461675")
  },
  //催办   A08461693
  cuiban(data) {
    return Http.postNeedLoading('A08462037', data, "A08461693")
  },
  /**
   * 会议管理制发查看流程详情 A08461676
   * @returns {*}
   */
  getProcess(data) {
    return Http.postNeedLoading('A08462037', data, "A08461676")
  },
  /**
   * 承办查看流程详情 A08461715
   * @returns {*}
   */
  cbgetProcess(data) {
    return Http.postNeedLoading('A08462037', data, "A08461715")
  },
  /**
   * 承办撤回获取单位 A08461716
   * @param data
   * @returns {*}
   */
  getCbDeptList(data) {
    return Http.postNeedLoading('A08462037', data, "A08461716")
  },
  /**
   * 会议管理制发人员选择树按流转审批范围加载（完成并发送） A08461677
   * @returns {*}
   */
  getPerson(data) {
    return Http.postNeedLoading('A08462037', data, "A08461677")
  },
  /**
   * 机构人员接口(传阅) A08461679
   * @returns {*}
   */
  getCyPerson(data) {
    return Http.postNeedLoading('A08462037', data, "A08461679")
  },
  /**
   * 会议传阅新增  A08461653
   * @param data
   * @returns {*}
   */
  sendChuanYue(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461653')
  },
  /**
   * 会议管理cb人员选择树按流转审批范围加载（完成并发送） A08461691
   * @returns {*}
   */
  cbgetPerson(data) {
    return Http.postNeedLoading('A08462037', data, "A08461691")
  },
  /**
   * 发送承办(新增承办子流程)  A08461684
   * @param data
   * @returns {*}
   */
  sendCB(data) {
    return Http.postNeedLoading('A08462037', data, "A08461684")
  },
  /**
   *承办列表------A08461685
   * @param data
   * @returns {*}
   */
  cbTable(data, pagination) {
    return Http.postNeedPage("A08462037", data, 'A08461685', pagination)
  },
  /**
   * 承办详情 A08461687
   */
  cbDetial1(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461687')
  },
  /**
   * 承办（更新）A08461689
   */
  cbUpdateData(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461689')
  },
  /**
   * 承办参会撤回  A08461694
   * @param data
   * @returns {*}
   */
  cbChBack(data) {
    return Http.postNeedLoading('A08462037', data, "A08461694")
  },
  /**
   * 承办参会单上上一级撤回  A08461695  (已不用)
   * @param data
   * @returns {*}
   */
  cbChOldBack(data) {
    return Http.postNeedLoading('A08462037', data, "A08461695")
  },
  /**
   * 会议内容保存 A08461701
   * @param data
   * @returns {*}
   */
  hyConSave(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461701')
  },
  /**
   * 会议内容列表查询 A08461702
   * @param data
   * @returns {*}
   */
  hyConList(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461702')
  },
  /**
   * 会议内容（删除）A08461706
   */
  hyConDel(data) {
    return Http.postNeedLoading('A08462037', data, "A08461706")
  },
  /**
   * 会议内容（更新）A08461704
   */
  hyConUpdate(data) {
    return Http.postNeedLoading('A08462037', data, "A08461704")
  },

  /**
   * 会议内容（删除）A08461703
   */
  hyConEmpty(data) {
    return Http.postNeedLoading('A08462037', data, "A08461703")
  },
  /**
   * 历史年度本年度查询   A08461690
   */

  hySearch(data, pagination) {
    return Http.postNeedPage("A08462037", data, 'A08461690', pagination)
  },
  /**
   * 会议意见列表查询 A08461708
   * @param data
   * @returns {*}
   */
  hyIdeaList(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461708')
  },
  /**
   * 会议管理删除意见----- A08461673
   */
  hyIdeaDel(data) {
    return Http.postNeedLoading('A08462037', data, "A08461712")
  },

  /**
   * 管理员查看制发 A08461713
   * @param data
   * @returns {*}
   */
  adminZfTable(data, pagination) {
    return Http.postNeedPage("A08462037", data, 'A08461713', pagination)
  },
  /**
   * 管理员制发（更新） A08461719
   */
  adminZfUpdate(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461719')
  },
  // adminZfTable(data) {
  //   return Http.postNeedLoading("A08462037", data, 'A08461713')
  // },
  /**
   * 管理员查看承办 A08461714
   * @param data
   * @returns {*}
   */
  adminCbTable(data, pagination) {
    return Http.postNeedPage("A08462037", data, 'A08461714', pagination)
  },
  /**
   * 管理员承办（更新） A08461720
   */
  adminCbUpdate(data) {
    return Http.postNeedLoading("A08462037", data, 'A08461720')
  },
  /**
   * 管理员查看传阅 A08461654
   * @param data
   * @returns {*}
   */
  adminCYTable(data, pagination) {
    return Http.postNeedPage("A08462037", data, 'A08461654', pagination)
  },
  /**
   * 制发单查看报名表 A08461681
   * @returns {*}
   */
  zflookBmb(data) {
    return Http.postNeedLoading('A08462037', data, "A08461681")
  },
  /**
   * 承办查看报名表 A08461686
   * @returns {*}
   */
  cblookBmb(data) {
    return Http.postNeedLoading('A08462037', data, "A08461686")
  },
  // /**
  //  * 获取委托承办单位 A08461681
  //  * @returns {*}
  //  */
  // getEntrustUnit(data) {
  //   return Http.postNeedLoading('A08462053', data, "A08462019")
  // },

  /**
   *   判断是否有子流程   A08461697
   * @returns {*}
   */
  isHaveSon(data) {
    return Http.postNeedLoading('A08462037', data, "A08461697")
  },

  /**
   *   会议统计   A08461698
   * @returns {*}
   */
  statistics(data) {
    return Http.postNeedLoading('A08462037', data, "A08461698")
  },
  /**
   *   获取人员信息   A08461698
   * @returns {*}
   */
  info(data) {
    return Http.postNeedLoading('A08462053', data, "A08462011")
  },
  /**
   * 获取当前用户部门列表  A08461700
   * @param data
   * @returns {*}
   */
  getDeptList(data) {
    return Http.postNeedLoading('A08462037', data, "A08461700")
  },
  /**
   *我的通知列表------A08461717
   * @param data
   * @returns {*}
   */
  myNotice(data, pagination) {
    return Http.postNeedPage("A08462037", data, 'A08461717', pagination)
  },
  /**
   * 流程调度  A08461718
   * @param data
   * @returns {*}
   */
  diaodu(data) {
    return Http.postNeedLoading('A08462037', data, "A08461718")
  },
  /**
   *    个人常用批语-另接口（查询）  A08461134
   */
  perWritingSe(data) {
    return Http.postNeedLoading('A08462049', data, "A08461134")
  },
  /**
   * 个人常用批语-新增 A08461133
   */
  perWritingCr(data) {
    return Http.postNeedLoading('A08462049', data, "A08461133")
  },
  /**
   * 个人常用批语-删除  A08461137
   */
  perWritingDe(data) {
    return Http.postNeedLoading('A08462049', data, "A08461137")
  },
  /**
   * 个人办公-专栏  A08461254
   */
  perOfficeCol(data) {
    return Http.postNeedLoading('A08462049', data, "A08461254")
  },
  /**
   * 个人办公-链接设置  A08461156
   */
  perOfficeLink(data) {
    return Http.postNeedLoading('A08462049', data, "A08461156")
  },
  /**
   * 个人办公-弹出窗口设置  A08461253
   */
  perOfficeDialog(data) {
    return Http.postNeedLoading('A08462049', data, "A08461253")
  },
  //制发单承办催办获取部门列表   A08461722
  cbCuibanList(data) {
    return Http.postNeedLoading('A08462037', data, "A08461722")
  },
  //消息提醒   A08461813
  infoRemind(data) {
    return Http.postNeedLoading('A08462049', data, "A08461813")
  },
  //部门会议发子流程   A08461727
  sendCh(data) {
    return Http.postNeedLoading('A08462037', data, "A08461727")
  },
  // //管理员制发批量删除   A08461728
  // adminZfDelete(data) {
  //   return Http.postNeedLoading('A08462037', data, "A08461728")
  // },
  // //管理员承办批量删除   A08461729
  // adminCbDelete(data) {
  //   return Http.postNeedLoading('A08462037', data, "A08461729")
  // },
  // //管理员传阅批量删除   A08461730
  // adminCyDelete(data) {
  //   return Http.postNeedLoading('A08462037', data, "A08461730")
  // },
  //管理员批量删除   A08461728
  adminDelete(data) {
    return Http.postNeedLoading('A08462037', data, "A08461728")
  },
  // 手动归档
  fileResponse(data) {
    return Http.postNeedLoading('A08462037', data, "A08461731")
  },
  // 区块链归档
  newfileResponse(data) {
      return Http.postNeedLoading('A08462037', data, "A08461736")
  },
  // 制发单收藏
  zfCollect(data) {
    return Http.postNeedLoading('A08462037', data, "A08461732")
  },
  // 承办、参会单收藏
  cbCollect(data) {
    return Http.postNeedLoading('A08462037', data, "A08461733")
  },
  // 传阅单收藏
  cyCollect(data) {
    return Http.postNeedLoading('A08462037', data, "A08461734")
  },
}
