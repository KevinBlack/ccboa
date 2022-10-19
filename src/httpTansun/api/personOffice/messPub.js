import Http from "../../http"
export default {
  /**
   * 本行行名  A08461327
   */
  adminCreateBank(data){
    return Http.postNeedLoading('A08462049',data,'A08461327')
  },
  /**
   * 本行信息管理员设置数据新增   A08461321
   */
  adminCreate(data){
    return Http.postNeedLoading('A08462049',data,'A08461321')
  },
  /**
   * 本行信息管理员设置数据删除    A08461322
   */
  adminDelete(data){
    return Http.postNeedLoading('A08462049',data,'A08461322')
  },
  /**
   * 本行信息管理员设置数据修改   A08461323
   */
  adminAlter(data){
    return Http.postNeedLoading('A08462049',data,'A08461323')
  },
  /**
   * 本行信息管理员设置数据列表   A08461324
   */
  adminTable(data,pagination){
    return Http.postNeedPage('A08462049',data,'A08461324',pagination)
  },
  /**
   * 本行信息管理员设置数据详情    A08461325
   */
  adminDeal(data){
    return Http.postNeedLoading('A08462049',data,'A08461325')
  },
  /**
   * 组织部门人员树接口    A08461326
   */
  adminTreePerson(data){
    return Http.postNeedLoading('A08462049',data,'A08461326')
  },


  /**
   *本行信息发布----查看    A08461304
   */
  // viewMessTable(data,pagination){
  //   return Http.postNeedPage('A08462049',data,'A08461304',pagination)
  // },
  /**
   * 待办信息查看    A08461315
   */
  // unfinMessTable(data,pagination){
  //   return Http.postNeedPage('A08462049',data,'A08461315',pagination)
  // },
  /**
   * 已办信息查看    A08461316
   */
  MessTable(data,pagination){
    return Http.postNeedPage('A08462049',data,'A08461332',pagination)
  },
  /**
   * 本行信息新增   A08461311
   */
  createBankMess(data){
    return Http.postNeedLoading('A08462049',data,'A08461311')
  },
  /**
   *本行信息拟稿人获取    A08461331
   */
  diaableBankMess(data){
    return Http.postNeedLoading('A08462049',data,'A08461331')
  },
  /**
   * 本行信息发布----删除    A08461305
   */
  BankMessDelete(data){
    return Http.postNeedLoading('A08462049',data,'A08461305')
  },
  /**
   * 本行信息发布----查看详情    A08461306
   */
  BankMessDeal(data){
    return Http.postNeedLoading('A08462049',data,'A08461306')
  },
  /**
   * 本行信息发布----按条件查询    A08461307
   */
  BankMessSear(data,pagination){
    return Http.postNeedPage('A08462049',data,'A08461307',pagination)
  },
  /**
   *  本行信息发布---已发布信息    A08461304
   */
  // sendMessSear(data,pagination){
  //   return Http.postNeedPage('A08462049',data,'A08461304',pagination)
  // },
  /**
   * 人员选择树按流转审批范围加载（完成并发送)  A08461312
   */
  BankMessTree(data){
    return Http.postNeedLoading('A08462049',data,'A08461312')
  },
  /**
   * 本行信息发布修改  A08461304
   */
    alterBankMess(data){
    return Http.postNeedLoading('A08462049',data,'A08461304')
  },

  /**
   * 本行信息新增----完成并发送    A08461312
   */
  // finChoosePer(data){
  //   return Http.postNeedLoading('A08462049',data,'A08461312')
  // },
  /**
   * 修改本行信息并发送到下一处理人    A08461313
   */
  alterFinChoosePer(data){
    return Http.postNeedLoading('A08462049',data,'A08461313')
  },
  /**
   * 查询功能机构,部门下拉框数据获取    A08461333
   */
  departOption(data){
    return Http.postNeedLoading('A08462049',data,'A08461333')
  },
  /**
   * 退回拟稿人    A08461317
   */
  backDraftUser(data){
    return Http.postNeedLoading('A08462049',data,'A08461317')
  },
  /**
   * 发布本行信息    A08461314
   */
  publishInfo(data){
    return Http.postNeedLoading('A08462049',data,'A08461314')
  },
  /**
   * 信息发布收回  A08461318
   */
  messBack(data){
    return Http.postNeedLoading('A08462049',data,'A08461318')
  }
}
