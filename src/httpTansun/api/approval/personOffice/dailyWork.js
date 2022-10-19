import Http from "../../http"

export default {
  /**
   * 日程安排查询
   * @param data
   * @returns {*}
   */
  newSchedule(data) {
    return Http.postNeedLoading('A08462049', data, "A08461462")
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
    return Http.postNeedLoading("A08462053", data, "A08462034")
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

  //新建他行群组
  creatOtherGroup(data) {
    return Http.postNeedLoading("A08462053", data, "ADICS2040")

  },
  //他行群组
  createOtherGroup(data) {
    return Http.postNeedLoading("A08462049", data, "A08461543")

  }
}
