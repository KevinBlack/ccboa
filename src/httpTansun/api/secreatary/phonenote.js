import Http from "../../http"
export default {

  /**
   * 电话记录单 列表查询
   */
  phoneList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08463118', pagination)
  },
  /**
   * 电话记录单 按条件查询
   */
  conditionSearch(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08463119', pagination)
  },
    /**
   * 电话记录单 删除
   */
  conditionDelete(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08463149', pagination)
  },

  /**
   * 电话记录单 统计
   */
  phoneNoteStatistics(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08463120', pagination)
  },
  /**
   * 电话记录单 新增
   */
  addNew(data) {
    return Http.postNeedPage('A08462043', data, 'A08463113')
  },

  /**
   * 电话记录单 修改、维护
   */
  edit(data) {
    return Http.postNeedPage('A08462043', data, 'A08463112')
  },

  /**
   * 电话记录单 获取部门、时间  
   */
  getHandleDeps(data) {
    return Http.postNeedPage('A08462043', data, 'A08463122')
  },

  //归档
  binLog(data) {
    return Http.postNeedLoading('A08462043', data, 'A08465002')
  },
  //电话记录单区块链归档
  newBinLog(data) {
      return Http.postNeedLoading('A08462043', data, 'A08466006')
    },
  /**
   * 电话记录单 获取控制域 
   */
  getControlArea(data) {
    return Http.postNeedPage('A08462043', data, 'A08463127')
  },
  /**
   * 电话记录单 参数维护列表-查询
   */
  ParamsMaintainList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08463134', pagination)
  },

  /**
   * 电话记录单 参数维护列表-删除
   */
  paramsMaintainListDel(data) {
    return Http.postNeedPage('A08462043', data, 'A08463132')
  },

  /**
   * 电话记录单 参数维护-新增
   */
  paramsMaintainListAdd(data) {
    return Http.postNeedPage('A08462043', data, 'A08463131')
  },

  /**
   * 电话记录单 参数维护-修改
   */
  paramsMaintainListEdit(data) {
    return Http.postNeedPage('A08462043', data, 'A08463133')
  },
  /**
   * 电话记录单 列表删除
   */
  phoneListDel(data) {
    return Http.postNeedPage('A08462043', data, 'A08463111')
  },

  /**
   * 电话记录单 详情
   */
  phoneDetail(data) {
    return Http.postNeedPage('A08462043', data, 'A08463121')
  },

  /**
   * 电话记录单 完成并发送
   */
  phoneDoneAndSend(data) {
    return Http.postNeedPage('A08462043', data, 'A08463115')
  },

  /**
   * 电话记录单 获取人员树
   */
  getPersonTree(data) {
    return Http.postNeedPage('A08462043', data, 'A08463114')
  },

  /**
   * 电话记录单 流程调度
   */

  flowDispatchNote(data) {
    return Http.postNeedPage('A08462043', data, 'A08463125')
  },

  /**
   * 电话办理单 流程调度
   */

  flowDispatchHandle(data) {
    return Http.postNeedPage('A08462043', data, 'A08463110')
  },
  /**
   * 电话记录单 收回
   */

  tackBack(data) {
    return Http.postNeedPage('A08462043', data, 'A08463123')
  },

  /**
   * 电话记录单 生成编号
   */

  buildNo(data) {
    return Http.postNeedPage('A08462043', data, 'A08463135')
  },
  /**
   * 电话记录单-删除此文
   */
  deletefile(data) {
    return Http.postNeedPage('A08462043', data, 'A08463111')
  },

  /**
   * 电话记录单 发送办理部门
   */

  sendToHandleDep(data) {
    return Http.postNeedPage('A08462043', data, 'A08463103')
  },

  /**
   * 电话记录单 查看办理状态
   */

  checkState(data) {
    return Http.postNeedPage('A08462043', data, 'A08463117')
  },


  /**
   * 电话记录单 查看流程
   */

  checkFlow(data) {
    return Http.postNeedPage('A08462043', data, 'A08463116')
  },

  /**
   * 电话办理单 查看流程
   */
  checkFlowHandle(data) {
    return Http.postNeedPage('A08462043', data, 'A08463141')
  },
  /**
   * 电话办理单 列表查询
   */

  phoneHandleList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08463108', pagination)
  },

  /**
   * 电话办理单 详情查询
   */

  phoneHandleDetail(data) {
    return Http.postNeedPage('A08462043', data, 'A08463107')
  },


  /**
   * 电话办理单 保存
   */

  phoneHandleSave(data) {
    return Http.postNeedPage('A08462043', data, 'A08463102')
  },
  /**
   * 电话办理单 控制域查询
   */

  phoneHandleGetControl(data) {
    return Http.postNeedPage('A08462043', data, 'A08463109')
  },


  /**
   * 电话办理单 节点人员树-查询
   */

  phoneHandleGetPersonTree(data) {
    return Http.postNeedPage('A08462043', data, 'A08463104')
  },

  /**
   * 电话办理单 完成并发送、办结
   */

  phoneHandleDoneAndSend(data) {
    return Http.postNeedPage('A08462043', data, 'A08463105')
  },

  /**
   * 电话办理单 发送下一处理人-机构人员查询
   */
  getOrgAndPerson(data) {
    return Http.postNeedPage('A08462043', data, 'A08463104')
  },
  /**
   * 电话办理单 收回
   */
  phoneHandleTackBack(data) {
    return Http.postNeedPage('A08462043', data, 'A08463106')
  },
  /**
   * 电话办理单 发送下一处理人
   */
  // toNextPerson(data) {
  //   return Http.postNeedPage('A08462043', data, 'A08463105')
  // },
  /**
   *  管理员查看-电话记录单-列表查询
   */
  adminPhoneNoteList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08463128', pagination)
  },

  /**
   * 查询-办理部门和日期
   */
  // getHandleDeps(data) {
  //   return Http.postNeedPage('A08462043', data, 'A08464132')
  // },
  /**
   *  管理员查看-电话办理单-列表查询
   */
  adminPhoneHandleList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08463142', pagination)
  },
  /**
   *  管理员查看-电话记录单-维护保存
   */
  adminPhoneNoteSave(data) {
    return Http.postNeedPage('A08462043', data, 'A08463129')
  },

  /**
   *  管理员查看-电话办理单-维护保存
   */
  adminPhoneHandleSave(data) {
    return Http.postNeedPage('A08462043', data, 'A08463143')
  },
  /**
   * -管理员查看-文件处理单-维护删除意见
   */
  adminPhoneNoteDel(data) {
    return Http.postNeedPage('A08462043', data, 'A08464140')
  },
  //返回上一处理人(电话处理单)
  backPersondhcld(data) {
    return Http.postNeedPage('A08462043', data, 'A08463144')
  },
  //返回上一处理人(电话办理单)
  backPersondhbld(data) {
    return Http.postNeedPage('A08462043', data, 'A08463145')
  },
  //获取用户部门列表(电话记录单)
  getUserPersondh(data) {
    return Http.postNeedLoading('A08462043', data, 'A08463146')
  },
  //增发办理部门
  increase(data) {
    return Http.postNeedLoading('A08462043', data, 'A08463148')
  },
  //收回办理部门
  bake(data) {
    return Http.postNeedLoading('A08462043', data, 'A08463147')
  },
  //收藏
  collecTion(data) {
    return Http.postNeedLoading('A08462043', data, 'A08465005')
  }
}
