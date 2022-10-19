import Http from "../../http"
export default {

  /** @description: 值班动态/信息报送列表 */
  informationTransList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471737', pagination)
  },
  /** @description: 值班动态/成刊详情 */
  periodicalQuery(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471760')
  },
    /** @description: 值班动态/成刊详情 -收回*/
  chengKanRecycle(data) {
      return Http.postNeedLoading('A08462043', data, 'A08471791')
    },
  /** @description: 值班动态/查询流程节点 */
  queryFlowNode(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471794')
  },
  /** @description: 值班动态/查询流程节点 */
  queryFlowNodes(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471795')
  },
  /** @description: 值班动态/信息报送详情 */
  informationTransQuery(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471793')
  },
  /** @description: 值班动态/信息报送/稿件已办收回 */
  infoSendGetBack(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471790')
  },
  /** @description: 值班动态/信息报送详情/保存意见List*/
  informationTransSaveListData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471801')
  },
  /** @description: 值班动态/信息报送/成刊收回 */
  asAPublicationGetBack(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471799')
  },
     /** @description: 值班动态/信息报送/管理员删除意见 */
  deleteInfomation(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471802')
  },
  /** @description: 值班动态/信息发布/发布信息收回 */
  releaseInfoGetBack(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471792')
  },

  /** @description: 值班动态/信息发布/详情页 */
  getDetail(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471765')
  },

  /** @description: 值班动态/成刊稿/意见域删除 */
  delItem(data) {
    return Http.postNeedLoading('A08462043', data, 'A08461623')
  },

  /** @description: 值班动态/信息发布/详情页/已阅按钮 */
  redEd(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471797')
  },


  /** @description: 值班动态/信息报送处理单/拟稿保存 */
  handleSave(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471784')

    /** @description: return Http.postNeedLoading('A08462043', data, 'A08471736') */
  },

  /** @description: 值班动态/信息报送处理单/更新保存 */
  handleUpdateSave(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471739')
  },

  /** @description: 值班动态/信息报送处理单/投稿部门 */
  getSubmitDeptData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471740')
  },

  /** @description: 值班动态/信息报送处理单/投稿栏目 */
  getSubmitColumnData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471702')
  },
  getSubmitColumnList(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471710')
  },

  /** @description: 值班动态/信息报送/拟稿 */
  add(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471766')
  },

  /** @description: 值班动态/信息审批/审批详情*/
  getManuscriptApproveDetail(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471760')
  },

  /** @description: 值班动态/信息报送/完成并发送 */
  submit(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471785')

    /** @description: return Http.postNeedLoading('A08462043', data, 'A08471736') */
  },

  /** @description: 值班动态/信息报送/完成并发送/选人框确定事件 */
  handleSubmitOnOk(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471786')

    /** @description: return Http.postNeedLoading('A08462043', data, 'A08471768') */
  },

  /** @description: 完成并发送直接退回 */
  handleSubmitBackOnOk(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471796')

    /** @description: return Http.postNeedLoading('A08462043', data, 'A08471768') */
  },

  /** @description: 值班动态/信息报送/删除此文 */
  deletaForm(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471798')

    /** @description: return Http.postNeedLoading('A08462043', data, 'A08471768') */
  },

  /** @description: 值班动态/信息报送/活动类别列表 */
  checkboxData(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471707', pagination)
  },

  /** @description: 值班动态/错请通知/详情 */
  cqDatial(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471750', pagination)
  },

  /** @description: 值班动态/信息报送/参考示例 */
  getExample(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471776')
  },

  /** @description: 值班动态/信息报送/投稿 */
  submitFormData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471736')
  },

  /** @description: 值班动态/信息报送/查看流程 */
  checkFlowData(data) {
    return Http.postNeedLoading('A08462053', data, 'APPWFE003')
  },

  /** @description: 值班动态/参数维护/投稿栏目配置 */
  submitColumnList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471702', pagination)
  },

  /** @description: 值班动态/参数维护/投稿栏目配置(默认栏目配置) */
  submitColumnDefalutList(data,pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471767',pagination)
  },

  /** @description: 值班动态/参数维护/投稿栏目配置(默认栏目配置)/下拉框接口 */
  submitColumnDefalutForm(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471781')
  },

  /** @description: 值班动态/参数维护/投稿栏目配置/删除 */
  DeleteTableData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471703')
  },



  /** @description: 值班动态/管理员查看/信息报送/删除 */
  deleteInfoSendData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471738')
  },


  /** @description: 值班动态/管理员查看/成刊稿件/删除 */
  deletePublishedManuscriptData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471758')
  },

  /** @description: 值班动态/管理员查看/错情通知/删除 */
  deleteErrorSituationNoticeData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471748')
  },

  /** @description: 值班动态/管理员查看/发布信息/删除 */
  deletePublishedInfoData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471763')
  },

  /** @description: 值班动态/参数维护/默认栏目配置/新建保存 */
  saveDefaultFormData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471782')
  },

  /** @description: 值班动态/参数维护/投稿栏目配置/新建保存 */
  saveFormData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471701')
  },

  /** @description: 值班动态/参数维护/投稿栏目配置/修改保存 */
  saveFormUpdateData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471704')
  },
  /**-------------------------------------------------------------------------------------- */

  /** @description: 值班动态/参数维护/活动类别配置/主列表表格数据 */
  activityTypeList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471707', pagination)
  },

  /** @description: 值班动态/参数维护/活动类别配置/主列表删除 */
  deleteActivityTableData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471708')
  },

  /** @description: 值班动态/参数维护/活动类别配置/新建保存 */
  saveActivityTableData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471706')
  },

  /** @description: 值班动态/参数维护/活动类别配置/修改保存 */
  saveActivityEditTableData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471709')
  },
  /**---------------------------------------------------------------------------------------- */

  /** @description: 值班动态/参数维护/接收人员配置/主列表 */
  receivePersonList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471712', pagination)
  },

  /** @description: 值班动态/参数维护/接收人员配置/删除 */
  deleteData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471713')
  },

  /** @description: 值班动态/参数维护/接收人员配置/新建保存 */
  saveReceivePersonAddData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471711')
  },

  /** @description: 值班动态/参数维护/接收人员配置/更改保存 */
  saveReceivePersonEditData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471714')
  },
  /**--------------------------------------------------------------------------- */

  /** @description: 值班动态/参数维护/投稿时间配置/主列表 */
  getSubmitDateTableList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471717', pagination)
  },

  /** @description: 值班动态/参数维护/投稿时间配置/删除 */
  deleteSubmitDate(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471718')
  },

  /** @description: 值班动态/参数维护/接收人员配置/新建保存 */
  saveSubmitDateAddData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471716')
  },

  /** @description: 值班动态/参数维护/接收人员配置/更改保存 */
  saveSubmitDateEditData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471719')
  },
  /**-----------------------------------------------------------------------------------*/

  /** @description: 值班动态/参数维护/刊物编辑人员/主列表 */
  getReportEditTableList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471722', pagination)
  },

  /** @description: 值班动态/参数维护/刊物编辑人员/删除 */
  deleteReportEditData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471723')
  },

  /** @description: 值班动态/参数维护/刊物编辑人员/新建保存 */
  saveReportEditAddData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471721')
  },

  /** @description: 值班动态/参数维护/刊物编辑人员/更改保存 */
  saveReportEditData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471724')
  },

  /** @description: 值班动态/参数维护/模板配置表列表/主列表 */
  getModelTableList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471727', pagination)
  },


  /** @description: 值班动态/参数维护/模板配置表列表/删除 */
  deleteModelData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471728')
  },

  /** @description: 值班动态/参数维护/模板配置表列表/新建保存 */
  saveModelAddData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471726')
  },

  /** @description: 值班动态/参数维护/模板配置表列表/更改保存 */
  saveModelEditData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471729')
  },

  /** @description: 获取错情通知列表 */
  getcqList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471747', pagination)

  },


  /** @description: 获取发布范围配置主列表 */
  getPublishLimitList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471732', pagination)
  },

  /** @description: 值班动态/参数维护/发布范围配置/发布范围配置删除接口 */
  deletePublishLimitData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471733')
  },

  /** @description: 值班动态/参数维护/发布范围配置/发布范围机构接口 */
  getPublishLimitData(data) {
    return Http.postNeedLoading('A08462053', data, 'A08462040')
  },

  /** @description: 值班动态/参数维护/发布范围配置/保存接口 */
  savePublishLimitAddData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471731')
  },

  /** @description: 值班动态/参数维护/发布范围配置/修改保存接口 */
  savePublishLimitEditData(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471734')
  },

  /** @description: 信息采编列表 */
  getInfoEditList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471742', pagination)

  },


  /** @description: 加入编辑稿件 */
  joinEdit(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471770')
  },


  /** @description: 编辑稿件列表 */
  getEditList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471752', pagination)

  },

  /** @description: 获取采编单 列表 */
  getList(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471775')

  },

  /** @description: 编辑稿件 采编单 删除 */
  getDelete(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471753')
  },



  /** @description: 编辑稿件 采编单 加入错请通知 */
  addCuoQ(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471774')
  },



  /** @description: 编辑稿件 采编单 编辑内容 */
  editContent(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471744')

  },


  /** @description: 编辑列表删除 */
  deleteEditList(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471773')

  },


  /** @description: 编辑详情 更新数据 改变状态 */
  editStatus(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471745')

  },

  /** @description: 编辑详情 成刊 */
  toChengKan(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471779')

  },

  /** @description: 发布 */
  faBu(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471761')

  },




  /** @description: 成刊详情 保存 */
  saveChengKan(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471759')
  },

    /** @description: 成刊详情 管理员保存 */
    saveChengKanForManager(data) {
      return Http.postNeedLoading('A08462043', data, 'A08471800')
    },


  /** @description: 错请通知 待发送 详情 发送错请通知 */
  postCuoQ(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471749')

  },


  /** @description: 成刊 详情 完成并发送 */
  finishSubmit(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471777')

  },

  chengKanList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471780', pagination)
  },


  /** @description: 成刊 详情 完成并发送 确定 */
  finishSubmitTosure(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471778')

  },


  /** @description: 发布信息 查询列表 */
  getInfoList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471762', pagination)
  },


  /** @description: 编辑详情 更新内容 失去光标 */
  upDataBlur(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471744')

  },


  /** @description: 值班表报送查看-列表 */
  OnDutyList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC30002', pagination)
  },

  /** @description: 值班表查看  删除 */
  OnDutydelBook(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC30006')
  },

  /** @description: 值班数据查询 */
  dutyDataQuery(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC30012')
  },

  /** @description: 通讯录数据查询 */
  addressDataQuery(data) {
    return Http.postNeedLoading('A08462043', data, 'A08464014')
  },

  /** @description: 联系人数据查询 */
  linkmanDataQuery(data) {
    return Http.postNeedLoading('A08462043', data, 'A08464013')
  },

  /** @description: 值班表报送-上传 */
  OnDutypostBook(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC30004')
  },

  /** @description: 值班表报送-删除 */
  OnDutyDelBook(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC30005')

  },

  /** @description: 值班表报送-提交/重置 */
  OnDutypostTiBook(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC30003')

  },
  /** @description: 值班动态/错请通知/详情 */
  cqDatial(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471750', pagination)
  },

  /** @description: 值班表模板 获取 */
  OnDutygetModel(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC30008')
  },

  /** @description: 值班表模板 删除 */
  OnDutydelModel(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC30011')
  },

  /** @description: 值班表模板上传 */
  OnDutymodelPost(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC30010')
  },



  /** @description: 通讯录查看-列表 */
  getBookList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08464010', pagination)
  },

  /** @description: 通讯录查看  删除 */
  delBook(data) {
    return Http.postNeedLoading('A08462043', data, 'A08464011')
  },


  /** @description: 通讯录报送 上传 */
  postBook(data) {
    return Http.postNeedLoading('A08462043', data, 'A08464007')
  },

  /** @description: 通讯录报送 删除 */
  psotDelBook(data) {
    return Http.postNeedLoading('A08462043', data, 'A08464011')
  },

  /** @description: 通讯录报送 提交/重置 */
  postTiBook(data) {
    return Http.postNeedLoading('A08462043', data, 'A08464008')
  },


  /** @description: 通讯录模板 获取 */
  getModel(data) {
    return Http.postNeedLoading('A08462043', data, 'A08464016')
  },

  /** @description: 通讯录模板 删除 */
  delModel(data) {
    return Http.postNeedLoading('A08462043', data, 'A08464017')
  },

  /** @description: 通讯录模板上传 */
  modelPost(data) {
    return Http.postNeedLoading('A08462043', data, 'A08464015')
  },



  /** @description: 起草正文 获取模板地址 */
  getPath(data) {
    return Http.postNoLoading('A08462043', data, 'A08471727')
  },

  /** @description: 电话记录单 按条件查询 */
  phoneList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08463119', pagination)
  },

  /** @description: 控制域 */
  getRight(data) {
    return Http.postNoLoading('A08462043', data, 'A08471783')
  },


  /** @description: 值班动态 发布获取发布范围 */
  getFaRange(data) {
    return Http.postNoLoading('A08462043', data, 'A08471735')
  },

  /** @description: 值班动态 统计 */
  columnTou(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471787', pagination)
  },
  columnTouList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471788', pagination)
  },
  cuoList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471789', pagination)
  },
  // 值班动态查询列表
  dutyTrendsSearch(data, pagination) {
    return Http.postNeedPage("A08462043", data, 'A08464149', pagination)
  },
  // 值班动态按稿件查询详情
  dutyTrendsSearchDetail(data) {
    return Http.postNoLoading('A08462043', data, 'A08464150')
  },
  // 值班动态按发布查询详情
  dutyTrendsSearchDetail1(data) {
    return Http.postNoLoading('A08462043', data, 'A08464151')
  },
  // 值班动态按发布查询批量收藏
  dutyTrendsSearchCollect(data) {
    return Http.postNoLoading('A08462043', data, 'A08464154')
  },
  endFiles(data) {
    return Http.postNoLoading('A08462043', data, 'A08461624')
  },
  /**
   * 收藏
   * @param {object} data{id:} 
   */
  collection(data) {
    return Http.postNoLoading('A08462043', data, 'A08464152')
  },
    /**
   * 信息發佈收藏
   * @param {object} data{id:} 
   */
  collection1(data) {
    return Http.postNoLoading('A08462043', data, 'A08464153')
  },
    /** @description: 值班动态/参数维护/模版配置/删除 */
    deleteFileById(data) {
      return Http.postNeedLoading('A08462043', data, 'A08471728')
    },
}
