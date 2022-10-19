import Http from "../../http"
export default {

  /**
   * 文件处理单-列表查询
   */
  fileList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464128', pagination)
  },
    /**
   * 文件处理单-列表删除
   */
  fileListDelete(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464155', pagination)
  },
  /**
   * 文件处理单-详情查询
   */
  fileDetail(data) {
    return Http.postNeedPage('A08462043', data, 'A08464131')
  },

  /**
   * 文件处理单-按条件查询
   */
  fileConditionSearch(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464129', pagination)
  },

  /**
   * 文件处理单-统计
   */
  fileStatistic(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464130', pagination)
  },
  /**
   * 文件处理单-新增保存
   */
  saveFile(data) {
    return Http.postNeedPage('A08462043', data, 'A08464123')
  },


  /**
   * 文件处理单-获取控制域
   */
  getControlArea(data) {
    return Http.postNeedPage('A08462043', data, 'A08464137')
  },

  /**
   * 文件处理单-完成并发送、办结
   */
  sendFile(data) {
    return Http.postNeedPage('A08462043', data, 'A08464125')
  },


  /**
   * 文件处理单-办理部门和日期
   */
  getHandleDeps(data) {
    return Http.postNeedPage('A08462043', data, 'A08464132')
  },
  //归档
  binLog(data) {
    return Http.postNeedLoading('A08462043', data, 'A08465003')
  },
    //文件处理单区块链归档
    newBinLog(data) {
      return Http.postNeedLoading('A08462043', data, 'A08466007')
    },
  /**
   * 文件处理单-查看办理状态
   */
  checkState(data) {
    return Http.postNeedPage('A08462043', data, 'A08464127')
  },

  /**
   * 文件处理单-查看流程
   */
  checkFlow(data) {
    return Http.postNeedPage('A08462043', data, 'A08464126')
  },


  /**
   * 文件处理单-生成编号
   */
  buildNo(data) {
    return Http.postNeedPage('A08462043', data, 'A08464105')
  },
  /**
   * 文件处理单-删除此文
   */
  deletefile(data) {
    return Http.postNeedPage('A08462043', data, 'A08464121')
  },
  /**
   * 文件处理单-收回
   */
  tackBack(data) {
    return Http.postNeedPage('A08462043', data, 'A08464133')
  },

  /**
   * 文件处理单-编辑、维护
   */
  editOrMatainanFile(data) {
    return Http.postNeedPage('A08462043', data, 'A08464122')
  },


  /**
   * 文件处理单-流程调度-选环节
   */
  flowDispatchNote(data) {
    return Http.postNeedPage('A08462043', data, 'A08464135')
  },


  /**
   * 文件办理单-流程调度-选环节
   */
  docHandlingDispatch(data) {
    return Http.postNeedPage('A08462043', data, 'A08464120')
  },
  /**
   * 文件处理单 参数维护-列表
   */
  paramsMatainianList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464104', pagination)
  },

  /**
   * 文件处理单 参数维护-新增
   */
  paramsMatainianAdd(data) {
    return Http.postNeedPage('A08462043', data, 'A08464101')
  },
  /**
   * 文件处理单 参数维护-修改
   */
  paramsMatainianEdit(data) {
    return Http.postNeedPage('A08462043', data, 'A08464103')
  },

  /**
   * 文件处理单 参数维护-删除
   */
  paramsMatainianDel(data) {
    return Http.postNeedPage('A08462043', data, 'A08464102')
  },

  /**
   * 文件处理单 列表-删除
   */
  fileListDel(data) {
    return Http.postNeedPage('A08462043', data, 'A08464121')
  },
  /**
   * 文件处理单 获取节点信息及人员树-完成并发送
   */
  getPersonInfoAndPersonTree(data) {
    return Http.postNeedPage('A08462043', data, 'A08464124')
  },

  /**
   * 文件办理单 列表查询
   */
  docHandlingList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464118', pagination)
  },

  /**
   * 文件办理单 详情查询
   */
  docHandlingDetail(data) {
    return Http.postNeedPage('A08462043', data, 'A08464117')
  },

  /**
   * 文件办理单 修改/维护-保存
   */
  docHandlingDetailEdit(data) {
    return Http.postNeedPage('A08462043', data, 'A08464112')
  },

  /**
   * 文件办理单 机构人员查询
   */
  getOrgAndPerson(data) {
    return Http.postNeedPage('A08462043', data, 'A08464114')
  },
  /**
   * 文件办理单 发送下一处理人
   */
  toNextPerson(data) {
    return Http.postNeedPage('A08462043', data, 'A08464115')
  },
  /**
   * 文件办理单 控制域查询
   */
  docHandlingDetailControl(data) {
    return Http.postNeedPage('A08462043', data, 'A08464119')
  },


  /**
   * 文件处理单-查看流程
   */
  docHandlingCheckFlow(data) {
    return Http.postNeedPage('A08462043', data, 'A08464141')
  },
  /**
   * 文件办理单 收回
   */
  // docHandlingTackBack(data) {
  //   return Http.postNeedPage('A08462043', data, 'A08464111')
  // },

  /**
   * 文件办理单 办理单流程调度-选人
   */
  docHandlingGetOrgAndPerson(data) {
    return Http.postNeedPage('A08462043', data, 'A08464120')
  },

  /**
   * 文件办理单 办理单收回
   */
  docHandlingTackBack(data) {
    return Http.postNeedPage('A08462043', data, 'A08464116')
  },
  /**
   * 文件办理单 新增
   */
  docHandlinAdd(data) {
    return Http.postNeedPage('A08462043', data, 'A08464113')
  },
  /**
   * 文件处理单 -管理员查看-文件处理单列表
   */
  adminNoteHandle(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464138', pagination)
  },
  /**
   * 文件办理单 -管理员查看-文件办理单列表
   */
  adminFileHandle(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464142', pagination)
  },
  /**
   *  管理员查看-文件处理单-维护保存
   */
  adminFileHandleSave(data) {
    return Http.postNeedPage('A08462043', data, 'A08464139')
  },
  /**
   * -管理员查看-文件处理单-维护删除意见
   */
  adminFileHandleDel(data) {
    return Http.postNeedPage('A08462043', data, 'A08464140')
  },
  /**
   *  管理员查看-文件办理单-维护保存
   */
  adminFileDealSave(data) {
    return Http.postNeedPage('A08462043', data, 'A08464143')
  },
  /**
   * -管理员查看-文件办理单-维护删除意见
   */
  adminFileDealDel(data) {
    return Http.postNeedPage('A08462043', data, 'A08464140')
  },
  //获取用户部门列表(文件处理单)
  getUserPerson(data) {
    return Http.postNeedLoading('A08462043', data, 'A08464146')
  },
  //返回上一处理人(文件处理单)
  backPersonwjcld(data) {
    return Http.postNeedPage('A08462043', data, 'A08464144')
  },
  //返回上一处理人(文件办理单)
  backPersonwjbld(data) {
    return Http.postNeedPage('A08462043', data, 'A08464145')
  },
  //增发办理部门
  increase(data) {
    return Http.postNeedPage('A08462043', data, 'A08464148')
  },
  //收回办理部门
  bake(data) {
    return Http.postNeedPage('A08462043', data, 'A08464147')
  },
  //收藏
  collecTion(data) {
    return Http.postNeedLoading('A08462043', data, 'A08465006')
  }

}
