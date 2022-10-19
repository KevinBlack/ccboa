import Http from "../../http.js"
export default {
  /**
   * 查询常规用印审批流水号维护信息 A08463342
   * 查询介绍信信息流水号维护 A08463346
   * 查询用印审批流水号维护表  A08463350
   * 查询印章刻制流水号维护表  A08463355
   * 查询印章刻制流水号维护表   A08463360
   * 查询印章销毁流水号维护表   A08463365
   * 查询印章保管交接流水号维护表  A08463370
   */
  streamPreTable(portType,data,pagination) {
    return Http.postNeedPage('A08462041', data, portType,pagination)
  },

  /**
   * 常规用印审批流水号维护信息新增 A08463339
   * 新增介绍信信息流水号维护 A08463343
   * 新增部门用印审批流水号维护表 A08463348
   * 新增印章刻制流水号维护表 A08463353
   * 新增印章废止流水号维护表 A08463358
   * 新增印章销毁流水号维护表 A08463363
   * 新增印章保管交接流水号维护表 A08463368
   */
  createSteam(portType,data){
    return Http.postNeedLoading('A08462041',data,portType)
  },
  /**
   * 更新常规用印审批流水号维护信息 A08463341
   * 更新介绍信信息流水号维护 A08463344
   * 更新用印审批流水号维护表  A08463352
   * 更新印章刻制流水号维护表 A08463357
   * 更新印章废止流水号维护表 A08463362
   * 更新印章销毁流水号维护表 A08463367
   * 更新印章保管交接流水号维护表 A08463372
   */
  alterSteam(protType,data){
    return Http.postNeedLoading('A08462041',data,protType)
  },
  /**
   * 删除常规用印审批流水号维护信息 A084633XXX
   * 删除介绍信信息流水号维护 A08463347
   * 删除用印审批流水号维护表 A08463351
   * 删除印章刻制流水号维护表 A08463356
   * 删除印章废止流水号维护表 A08463361
   * 删除印章销毁流水号维护表 A08463366
   * 删除印章保管交接流水号维护表 A08463371
   */
  deleteSteam(protType,data){
    return Http.postNeedLoading('A08462041',data,protType)
  },
  /**
   * 参数维护列表   A08463501
   */
  argumentTable(data,pagination){
    return Http.postNeedPage('A08462041', data, 'A08463501',pagination)
  },
  /**
   * 参数维护新增  A08463502
   */
  argumentCrea(data){
    return Http.postNeedLoading('A08462041', data, 'A08463502')
  },
  /**
   * 参数维护删除  A08463504
   */
  argumentDele(data){
    return Http.postNeedLoading('A08462041', data, 'A08463504')
  },
  /**
   * 常用配置 A08463508
   */
  userConTable(data,pagination){
    return Http.postNeedPage('A08462041', data, 'A08463508',pagination)
  },
  /**
   * 常用配置删除 A08463509
   */
  userConDele(data){
    return Http.postNeedLoading('A08462041', data, 'A08463509')
  },
  /**
   * 常用配置详情  A08463507
   */
  userConDeal(data){
    return Http.postNeedLoading('A08462041', data, 'A08463507')
  },
  /**
   * 常用配置新建   A08463506
   */
  userConCreate(data){
    return Http.postNeedLoading('A08462041', data, 'A08463506')
  }
}
