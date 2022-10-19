import Http from "../../http"

export default {
  /**
   * 日程安排查询-按日历
   * @param data
   * @returns {*}
   */
  newSchedule(data) {
    return Http.postNeedLoading('A08462049', data, "A08461462")
  },
  /**
   * 日程安排查询-按条目
   * @param data
   * @returns {*}
   */
  newScheduleList(data, pagination) {
    return Http.postNeedPage('A08462049', data, "A08461464", pagination)
  },
  /**
   * 日程新增
   * @param data
   * @returns {*}
   */
  addSchedule(data) {
    return Http.postNeedLoading('A08462049', data, "A08461461")
  },
  /**
   * 日程删除
   * @param data
   * @returns {*}
   */
  delSchedule(data) {
    return Http.postNeedLoading('A08462049', data, "A08461466")
  },
  /**
   * 日程编辑
   * @param data
   * @returns {*}
   */
  editSchedule(data) {
    return Http.postNeedLoading('A08462049', data, "A08461465")
  },
  /**
   * 我的收藏
   * @param data
   * @returns {*}
   */
  selectCollection(data, pagination) {
    return Http.postNeedPage('A08462049', data, "A08461460", pagination)
  },

  /**
   * 删除我的收藏
   * @param data
   * @returns {*}
   */
  deleteCollection(data) {
    return Http.postNeedLoading('A08462049', data, "A08461463")
  },

  /**
   * 添加通讯录
   * @param data
   */
  addAddressBook(id, data) {
    return Http.postNeedLoading("A08462049", data, id)
  },


  /**
   * 通讯录列表
   * @param data
   * @param pagination
   * @returns {*}
   */
  addressList(data, pagination) {
    return Http.postNeedPage("A08462049", data, 'A08461472', pagination)
  },
  /**
   * 删除通讯录
   * @param data
   * @param pagination
   * @returns {*}
   */
  deleteList(data) {
    return Http.postNeedLoading('A08462049', data, "A08461474")
  },
  /**
   * 设置我的收藏
   * @param data
   */
  setFavorAddress(id, data) {
    return Http.postNeedLoading("A08462049", data, id)
  },

  /**
   * 获取我的收藏
   * @param data
   */
  getFavorAddress(data) {
    return Http.postNeedLoading("A08462049", data, "A08461522")
  },

  /**
   * 获取个人常用联系对象列表
   * @param data
   * @param pagination
   * @returns {*}
   */
  getVierPerList(data, pagination) {
    return Http.postNeedPage("A08462049", data, "A08461532", pagination)
  },

  /**
   * 获取传阅人员常用发送对象
   * @param {*} data 
   */
  getCyPersonNomal(data) {
    return Http.postNeedLoading('A08462049', data, "A08461545")
  },
  
  /**
   * 删除个人常用对象
   * @param data
   * @returns {*}
   */
  deleteVierPer(data) {
    return Http.postNeedLoading('A08462049', data, 'A08461533')
  },


  /**
   * 工作日志
   * @param data
   * @returns {*}
   */

  //新建个人日志
  newPersonalLog(data) {
    return Http.postNeedLoading('A08462049', data, 'A08461150')
  },
  //新建个人日志->选择共享用户
  selectShare(data) {
    return Http.postNeedLoading('A08462049', data, 'A08461913')
  },
  /**
   * 工作日志-查看-个人  A08461151
   * @param data
   * @param pagination
   * @returns {*}
   */
  viewPersonalLog(data, pagination) {
    return Http.postNeedPage("A08462049", data, "A08461151", pagination)
  },
  /**
   *    工作日志-删除  A08461153
   */
  deletePersonalLog(data, pagination) {
    return Http.postNeedLoading("A08462049", data, "A08461153", pagination)
  },
  /**
   *      工作日志-更新  A08461154
   */
  alterPersonalLog(data, pagination) {
    return Http.postNeedLoading("A08462049", data, "A08461154", pagination)
  },
  /**
   *  工作日志-查看-共享  A08461152
   */
  viewPublicLog(data, pagination) {
    return Http.postNeedPage("A08462049", data, "A08461152", pagination)
  },
  /**
   * 共享用户（另接口文档-A084611915）
   */
  shareUser(data, pagination) {
    return Http.postNeedLoading("A08462049", data, "A08461155", pagination)
  },

  // 工作交流模块
  //获取拟稿部门
  getWorkDepart(data) {
    return Http.postNeedLoading("A08462049", data, "A08461435")
  },
  //保存/发送
  saveWorkNewPer(data) {
    return Http.postNoLoading("A08462049", data, "A08461430")
  },
  // 工作交流列表 
  viewWorkList(data, pagination) {
    return Http.postNeedPage("A08462049", data, "A08461431", pagination)
  },
  // 查看详情isSave=1
  viewWorkDetail(data) {
    return Http.postNoLoading("A08462049", data, "A08461437")
  },
  //查看详情isSave=0
  viewWorkDetail0(data) {
    return Http.postNoLoading("A08462049", data, "A08461432")
  },
  //回复确定
  replyWorkSure(data) {
    return Http.postNoLoading("A08462049", data, "A08461433")
  },
  //编辑/发送
  saveWorkEditPer(data) {
    return Http.postNoLoading("A08462049", data, "A08461438")
  },
  // 作废
  deleteWorkPer(data) {
    return Http.postNeedLoading('A08462049', data, 'A08461434')
  },
  // 管理员删除
  deleteWorkManage(data) {
    return Http.postNeedLoading('A08462049', data, 'A08461441')
  },
  // 查询
  inquireWorkList(data, pagination) {
    return Http.postNeedPage("A08462049", data, "A08461439", pagination)
  },
  // 发送消息提醒
  getRemindPer(data) {
    return Http.postNoLoading("A08462049", data, "A08461813")
  },

  // 提醒设置模块
  //新增
  saveRemindPer(data) {
    return Http.postNoLoading("A08462049", data, "A08461811")
  },
  
  //查询
  viewRemindPer(data) {
    return Http.postNoLoading("A08462049", data, "A08461812")
  },
  //提醒
  RemindPer(data) {
    return Http.postNoLoading("A08462049", data, "A08461813")
  },
  //查询
  viewRemindPer(data) {
    return Http.postNoLoading("A08462049", data, "A08461812")
  },
  //提醒
  RemindPer(data) {
    return Http.postNoLoading("A08462049", data, "A08461813")
  },

  // 常用发送对象 新增
  //获取所属部门
  getDepart(data) {
    return Http.postNeedLoading("A08462053", data, "A08462033")
  },
  //保存
  saveNewPer(data) {
    return Http.postNoLoading("A08462049", data, "A08461531")

  },
  // 排序后保存
  saveSort(data) {
    return Http.postNoLoading("A08462049", data, "A08461534")

  },

  //新建本行群组
  //  获取所属部门
  getdep(data) {
    return Http.postNeedLoading("A08462049", data, "A08461544")
  },
  saveNew(data) {
    return Http.postNoLoading("A08462049", data, "A08461540")

  },
  //查看群组
  getVierList(data, pagination) {
    return Http.postNeedPage("A08462049", data, "A08461541", pagination)
  },
  // getVierPerList(data, pagination) {
  //   return Http.postNeedPage("A08462049", data, "A08461532", pagination)
  // },
  // 删除群组
  deleteGroup(data) {
    return Http.postNeedLoading('A08462049', data, 'A08461542')

  },

  //选择本部群组
  // 获取
  getInfor(data) {
    return Http.postNeedLoading("A08462053", data, "A08462002")
  },
  //验证
  getVerify(data) {
    return Http.postNeedLoading("A08462053", data, "A08462036")

  },
//获取上级
getDpet(data){
  return Http.postNoLoading("A08462053", data, "ADICS2044")

},
  //新建他行群组
  creatOtherGroup(data) {
    return Http.postNeedLoading("A08462053", data, "ADICS2040")

  },
  //他行群组
  createOtherGroup(data) {
    return Http.postNeedLoading("A08462049", data, "A08461543")

  },

  //查询 超期待办提醒设置
  suprRemidLis(data) {
    return Http.postNeedLoading("A08462049", data, "A08462001")

  },

  //保存 超期待办提醒设置
  saveLis(data) {
    return Http.postNeedLoading("A08462049", data, "A08462002")

  },
  //提醒事项类型列表 超期待办提醒设置
  remindLis(data) {
    return Http.postNeedLoading("A08462049", data, "A08462003")

  }
  
}
