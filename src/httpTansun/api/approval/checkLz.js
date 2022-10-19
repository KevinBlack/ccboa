/*
 * @Author: your name
 * @Date: 2020-08-20 15:00:50
 * @LastEditTime: 2020-10-14 11:24:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\httpTansun\api\approval\checkLz.js
 */
import Http from "../../http"
export default {
  /**
   * 事务审批制发单列表（全部，待办，已办，办结）A08461131
   * @param data
   * @param pagination
   * @returns {*}
   */
  checkLzAllTable(data, pagination) {
    return Http.postNeedPage('A08462039', data, "A08461131", pagination)
  },
  /**
   * 事务审批制发单（删除）A08461117
   */
  checkLzDelete(data) {
    return Http.postNeedLoading('A08462039', data, "A08461117")
  },
  /**
   * 事务审批制发单（修改）A08461118
   */
  checkLzAlter(data) {
    return Http.postNeedLoading('A08462039', data, "A08461118")
  },
  /**
   * 事务审批制发单（修改）A08461144
   */
  checkLzAlterSec(data) {
    return Http.postNeedLoading('A08462039', data, "A08461144")
  },
  /**
   * 退回原因   A08461145
   */
  reasonBack(data) {
    return Http.postNeedLoading('A08462039', data, "A08461145")
  },
  /**
   * 事务审批制发单（详情）A08461120
   */
  checkLzDeal(data) {
    return Http.postNeedLoading('A08462039', data, "A08461120")
  },
  // 事务审批 普通单子 详情拆分新接口
  checkLzDealChai(data) {
    return Http.postNeedLoading('A08462039', data, "A08461166")
  },
  /**
   * 事务审批制发单（新增）A08461116
   */
  checkLzCreate(data) {
    return Http.postNeedLoading('A08462039', data, "A08461116")
  },


  /**
   *事务审批传阅单（列表）A08461126
   */
  checkCYAllTable(data, pagination) {
    return Http.postNeedPage('A08462039', data, "A08461126", pagination)
  },
  /**
   * 事务审批传阅单（新增）A08461123
   */
  checkCYCreate(data) {
    return Http.postNeedLoading('A08462039', data, "A08461123")
  },
  /**
   * 事务审批传阅单（删除）A08461124
   */
  checkCYDelete(data) {
    return Http.postNeedLoading('A08462039', data, "A08461124")
  },
  /**
   * 事务审批传阅单（修改）A08461125
   */
  checkCYAlter(data) {
    return Http.postNeedLoading('A08462039', data, "A08461125")
  },
  /**
   * 事务审批传阅单（详情）A08461127
   */
  checkCYDeal(data) {
    return Http.postNeedLoading('A08462039', data, "A08461127")
  },

  /**
   * 制发人员树 A08461130
   */
  ZFqueryPerTree(data) {
    return Http.postNeedLoading('A08462039', data, "A08461130")
  },
  /**
   * 传阅人员树  A08461132
   */
  CYqueryPerTree(data) {
    return Http.postNeedLoading('A08462039', data, "A08461132")
  },
  /**
   * 生成申请文号 or 审批文号 A08461121
   */
  createNum(data) {
    return Http.postNeedLoading('A08462039', data, "A08461121")
  },
  /**
   * 退号  A08461161
   */
  backNum(data) {
    return Http.postNeedLoading('A08462039', data, "A08461161")
  },
  /**详情--用于成编号前获取详情确认编号生成情况*/
  detailForNum(data) {
    return Http.postNeedLoading('A08462039', data, "A08461159")
  },
  /**
   *生成申请文号后回调该接口更新流水号配置表  A08461122
   */
  createNumCode(data) {
    return Http.postNeedLoading('A08462039', data, "A08461122")
  },
  /**
   * 传阅收回  A08461133
   *
   */
  CYretrieve(data) {
    // return Http.postNeedLoading('A08462039', data, "A08461133")
    return Http.postNeedLoading('A08462039', data, "A08461199")
  },
  /**
   * 流程详情  A08461134
   */
  flowDeal(data) {
    return Http.postNeedLoading('A08462039', data, "A08461134")
  },
  /**
   * 制发-------收回   A08461135
   */
  LZretrieve(data) {
    return Http.postNeedLoading('A08462039', data, "A08461135")
  },
  /**
   * 退回上一处理人    A08461136
   */
  backDealPer(data) {
    return Http.postNeedLoading('A08462039', data, "A08461136")
  },
  /**
   *  获取拟稿部门机构  A08461138
   */
  deparAndOrgan(data) {
    return Http.postNeedLoading('A08462039', data, "A08461138")
  },
  /**
   * 获取建信金科下拟稿部门机构
   * @param {*} data 
   */
  deparAndOrganForJK(data) {
    return Http.postNeedLoading('A0846C053', data, "A08462002")
  },
    /**
   * 获取建信金科下相关项目
   * @param {*} data 
   */
  getDepartmentForJK(data) {
    return Http.postNeedLoading('A08462039', data, "A08461165")
  },
  /**
   * 获取权限   A08461139
   */
  authority(data) {
    return Http.postNeedLoading('A08462039', data, "A08461138")
  },
  /**
   * 传阅收回人员   A08461137
   */
  regainCircul(data) {
    return Http.postNeedLoading('A08462039', data, "A08461137")
  },
  /**
   * 催办   A08461140
   */
  pressToDo(data) {
    return Http.postNeedLoading('A08462039', data, "A08461140")
  },
  /**
   * 获取环节权限    A08461139
   */
  queryHJ(data) {
    return Http.postNeedLoading('A08462039', data, "A08461139")
  },
  /**
   * 统计   A08461128
   */
  statisticsTable(data, pagination) {
    return Http.postNeedPage('A08462039', data, "A08461128", pagination)
  },
  /**
   * 查询   A08461142
   */
  APSearchTable(data, pagination) {
    return Http.postNeedPage('A08462039', data, "A08461142", pagination)
  },
  /**
   * 发上级行 A08461143
   */
  sendBankLevel(data) {
    return Http.postNeedLoading('A08462039', data, "A08461143")
  },
  /**
   * 申请项目Id  A08461144
   */
  applyProId(data) {
    return Http.postNeedLoading('A08462039', data, "A08461144")
  },
  /**
   * 发上级部门该部门是否有综合部门   A08462036
   */
  iFmultipleDepar(data) {
    return Http.postNeedLoading('A08462053', data, "A08462036")
  },
  /**
   * 查询上级部门详情（人）  A08462005
   */
  multipleDeparPer(data) {
    return Http.postNeedLoading('A08462053', data, "A08462005")
  },
  /**
   * 意见域落款部门过滤   A08461317
   */
  inscribeDepar(data) {
    return Http.postNeedLoading('A08462053', data, "A08461317")
  },
  /**
   * 引入依据   A08461363
   */
  importBas(data) {
    return Http.postNeedLoading('A08462035', data, "A08461363")
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
   * 依据删除    A08461129
   */
  accordDelete(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461129')
  },
  /**
   * 流程调度   A08461146
   */
  flowControl(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461146')
  },
  /**
   * 傳閱收回人員判斷   A08461147
   */
  CYbackPer(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461147')
  },
  /**
   * 管理员传阅列表    A08461148
   * @param data
   * @param pagination
   * @returns {*}
   */
  adminCYTable(data, pagination) {
    return Http.postNeedPage('A08462039', data, "A08461148", pagination)
  },
  /**
   * 管理员传阅列表    A08461150
   */
  adminLZtable(data, pagination) {
    return Http.postNeedPage('A08462039', data, "A08461150", pagination)
  },
  /**
   * 管理员流转保存   A08461149
   */
  adminLzSave(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461149')
  },
  /**
   * 管理员删除意见    A08461151
   */
  adminDeleSugg(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461151')
  },
  /**
   * 管理员删除备注   A08461152
   */
  adminDeleMark(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461152')
  },
  /**
   * 管理员维护重新流转 A08461155
   */
  afreFlow(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461155')
  },
  /**
   * 判断是否有审计机构     A08461156
   */
  auditOrg(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461156')
  },
  /**
   *  当前登录人为审计机构的起草项目  A08461157
   */
  createAuditApply(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461157')
  },
  /*管理员查看-根据申请单位获取申请项目条件*/
  getApplayPrByCompany(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461158')
  },
  /*手动归档
   data{id[string],表单id}
  */
  handlefile(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461160')
  },
  /*收藏
  data
  @param id[string],表单id
  @param dataType[number],传阅0，流转1
  @param docType[number] 1普通 2请假单
    */
  handleCollection(data) {
    return Http.postNeedLoading('A08462039', data, 'A08461162')
  },
    /*收藏
  data
  @param id[string],表单id
  @param dataType[number],传阅0，流转1
  @param docType[number] 1普通 2请假单
    */
   handleCollectionOfVacation(data) {
    return Http.postNeedLoading('A08462039', data, 'A08462036')
  },
  /***以下为请假/备案申请单 */
  /**
   * 制发单（新增）A08462001
   */
  checkLzCreateV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462001")
  },
  /**
   * 制发单（删除）A08462002
   */
  checkLzDeleteV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462002")
  },
  /**
   * 制发单（修改）A08462003
   */
  checkLzAlterV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462003")
  },
  /**
   * 制发单（详情）A08462004
   */
  checkLzDealV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462004")
  },
  /**
   * 生成申请文号 or 审批文号 A08462005
   */
  createNumV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462005")
  },
  /**
   *生成申请文号后回调该接口更新流水号配置表  A08462006
   */
  createNumCodeV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462006")
  },
  /**
   * 获取控制域 A08462012
   */
  ZFqueryPerTreeV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462012")
  },
  /**
   * 获取环节权限 A08462031
   */
  queryHJV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462031")
  },
  /**
   * 判断编号是否被占用 A08461163
   */
  handleNum(data) {
    return Http.postNeedLoading('A08462039', data, "A08461163")
  },
  /**
   * 请假单判断编号是否被占用 A08462035
   */
  handleNumV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462035")
  },
  /**
   * 请假单依据删除    A08462011
   */
  accordDeleteV(data) {
    return Http.postNeedLoading('A08462039', data, 'A08462011')
  },
  /**
   * 制发-------收回   A08462016
   */
  LZretrieveV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462016")
  },
  /**
   * 退回上一处理人    A08462017
   */
  backDealPerV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462017")
  },
  /**
   * 机构人员接口(传阅)  A08462013
   */
  CYqueryPerTreeV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462013")
  },
  /**
   * 传阅收回  A08462014
   *
   */
  CYretrieveV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462014")
  },
  /**
   * 收回传阅，弹出人员列 A08462018
   */
  regainCirculV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462018")
  },
  /**
   * 催办   A08462019
   */
  pressToDoV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462019")
  },
  /**
   * 发上级行 返回部门list and 节点list A08462020
   */
  sendBankLevelV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462020")
  },
  /**
   * 填写退回原因   A08462021
   */
  reasonBackV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462021")
  },
    /**
   * 填写退回原因   A08462021
   */
  reasonBackC(data) {
    return Http.postNeedLoading('A08462039', data, "A08462022")
  },
  /**
   * 退号  A08462033
   */
  backNumV(data) {
    return Http.postNeedLoading('A08462039', data, "A08462033")
  },
  //管理员查看 请假 保存
  addAskDetail(data) {
    return Http.postNeedLoading('A08462039', data, "A08462025")
  },
  //管理员查看 请假 详情
  queryAsk(data) {
    return Http.postNeedLoading('A08462039', data, "A08462004")
  },
  //管理员查看 请假 归档
  guiAskDetail(data) {
    return Http.postNeedLoading('A08462039', data, "A08462034")
  },
  //管理员查看 请假 删除备注
  delAskDetail(data) {
    return Http.postNeedLoading('A08462039', data, "A08462027")
  },
  //管理员查看 请假 删除意见
  delAskMsg(data) {
    return Http.postNeedLoading('A08462039', data, "A08462026")
  },
  //管理员查看 请假 流程调度
  askProcess(data) {
    return Http.postNeedLoading('A08462039', data, "A08462023")
  },
  //管理员查看 请假 流程调度选完节点和人员
  askProper(data) {
    return Http.postNeedLoading('A08462039', data, "A08462003")
  },
  //请假 获取姓名和单位
  getNameAndUnit(data) {
      return Http.postNeedLoading('A08462039', data, "A08461164")
  },
    /**详情--用于成编号前获取详情确认编号生成情况*/
  detailForNumV(data) {
      return Http.postNeedLoading('A08462039', data, "A08462032")
    },
    hasListPower(data) {
      return Http.postNeedLoading('A08462039', data, "ABASE5107")
    },
    hasDetailPower(data){
      return Http.postNeedLoading('A08462039', data, "ABASE5108")
    },
    hasSysPower(data){
      return Http.postNeedLoading('A08462039', data, "ABASE5109")
    },

    settingHasListPower(data) {
      return Http.postNoLoading('A08462053', data, "ABASE5107")
    },
    settingHasDetailPower(data){
        return Http.postNoLoading('A08462053', data, "ABASE5108")
    },
    settingHasSysPower(data){
        return Http.postNoLoading('A08462053', data, "ABASE5109")
    },
    /**
     * 文件查阅   
   */
    APSearchTablecy(data, pagination) {
    return Http.postNeedPage('A0846C100', data, "A08461166", pagination)
    },
    // 休假前置审批依据【人力】 因私出境审批依据【人力】
    yiyjData(data,pagination) {
      return Http.postNeedPage('A08462039', data, "A08462042",pagination)
    },
    // 根据姓名查询员工编号和单位
    humNameSearch(data) {
      return Http.postNeedPage('A08462039', data, "A08462041")
    },
    // 区块链归档功能接口
    blockChain(data) {
      return Http.postNeedPage('A08462039', data, "A08461167")
    },
}
