/*
 * @Author: your name
 * @Date: 2020-08-11 20:08:18
 * @LastEditTime: 2020-09-23 15:45:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\httpTansun\api\setting\setSysConfig.js
 */
import Http from "../../http.js"

export default {
  /**
   * 数据由下拉框获取，机构名称、对应部门接口暂无，主题词接口:A08461205
   */
  selectData(data) {
    return Http.postNeedPage("A08462053", data, 'A08461205')
  },
  /**
   *主题词部门设置数据新增A08461401
   */
  createKeyWord(data) {
    return Http.postNeedPage("A08462053", data, 'A08461401')
  },
  /**
   * 主题词部门设置数据删除 A08461402
   */
  deleteKeyWord(data) {
    return Http.postNeedPage("A08462053", data, 'A08461402')
  },
  /**
   * 主题词部门设置数据修改 A08461403
   */
  alterKeyWord(data) {
    return Http.postNeedPage("A08462053", data, 'A08461403')
  },
  /**
   * 主题词部门设置数据查看 A08461404
   */
  viewKeyWord(data, pagination) {
    return Http.postNeedPage("A08462053", data, 'A08461404', pagination)
  },
  /**
   * 主题词部门设置数据详情 A08461405
   */
  dealKeyWord(data) {
    return Http.postNeedPage("A08462053", data, 'A08461405')
  },
  /**
   * 根据机构查询列表数据   A08461407
   */
  KeyorgSearTable(data, pagination) {
    return Http.postNeedPage("A08462053", data, 'A08461407', pagination)
  },
  /**
   * 落款部门过滤设置数据新增 A08461311
   */
  createPayFiflter(data) {
    return Http.postNeedPage("A08462053", data, 'A08461311')
  },
  /**
   * 落款部门过滤设置数据删除 A08461312
   */
  deletePayFiflter(data) {
    return Http.postNeedPage("A08462053", data, 'A08461312')
  },
  /**
   *落款部门过滤设置数据修改 A08461313
   */
  alterPayFiflter(data) {
    return Http.postNeedPage("A08462053", data, 'A08461313')
  },
  /**
   * 落款部门过滤设置数据查看 A08461314
   */
  payFiflterTable(data, pagination) {
    return Http.postNeedPage("A08462053", data, 'A08461314', pagination)
  },
  /**
   * 落款部门过滤设置数据详情 A08461315
   */
  payFiflterDeal(data) {
    return Http.postNeedPage("A08462053", data, 'A08461315')
  },
  /**
   * 数据获取接口：；对应部门为下拉框，数据获取接口：A08461317。
   */
  /**
   *  根据机构查询列表   A08461316
   * @param data
   * @param pagination
   * @returns {*}
   */
  orgSearTable(data, pagination) {
    return Http.postNeedPage("A08462053", data, 'A08461316', pagination)
  },
  // selectPayL(data) {
  //   return Http.postNeedLoading("A08462053", data, 'A08461316')
  // },
  // selectPayR(data) {
  //   return Http.postNeedLoading("A08462053", data, 'A08461317')
  // },

  //获取节假日列表
  getHolidayList(data, pagination) {
    return Http.postNeedPage("A08462053", data, 'A08462103', pagination)
  },
  //设置节假日
  setHoliday(data) {
    return Http.postNeedLoading("A08462053", data, 'A08462102')
  },
  //删除
  deleteHoliday(data) {
    return Http.postNeedLoading("A08462053", data, 'A08462101')
  },

  /**
   * 正文字数超限原因配置单
   * @param data
   * @returns {*}
   */
  //查看
  getTextNumList(data, pagination) {
    return Http.postNeedPage("A08462053", data, "A08462302", pagination)
  },
  //新增
  addTextNum(data) {
    return Http.postNeedLoading("A08462053", data, 'A08462301')
  },
  //删除
  delTextNum(data) {
    return Http.postNeedLoading("A08462053", data, 'A08462315')
  },
  //修改
  updateTextNum(data) {
    return Http.postNeedLoading("A08462053", data, 'A08462304')
  },
  //获取微信提醒
  getRemindWechat(data) {
    return Http.postNeedLoading("A08462053", data, 'A08462402')
  },
  //设置微信提醒
  setRemindWechat(data) {
    return Http.postNeedLoading("A08462053", data, 'A08462401')
  },
  //获取人员自动注销及业务数据转移
  getUserLogMigrat(data) {
    return Http.postNeedLoading("A08462053", data, 'ABASE5110')
  },
  //设置人员自动注销及业务数据转移
  setUserLogMigrat(data) {
    return Http.postNeedLoading("A08462053", data, 'ABASE5111')
  },
  /**
   * 附件上传大小及白名单配置
   * @param data
   * @returns {*}
   */
  //查看
  getEnclosure(data) {
    return Http.postNeedLoading("A08462053", data, "A08462306")
  },
  //保存
  saveEnclosure(data) {
    return Http.postNeedLoading("A08462053", data, 'A08462305')
  },

  /**
   * 超期待办综合提醒参数配置
   * @param data
   * @returns {*}
   */
  //查询
  getOverdueCom(data) {
    return Http.postNeedLoading("A08462053", data, "A08462404")
  },
  //新增/修改
  updateOverdueCom(data) {
    return Http.postNeedLoading("A08462053", data, 'A08462403')
  },

  /**
   * 系统维护-设计词典(查看)   A08462026
   * 系统维护-设计词典-数据(查看)   A08462030
   */
  dictTable(portType, data, pagination) {
    return Http.postNeedPage("A08462053", data, portType, pagination)
  },
  /**
   * 系统维护部门管理部门层级  A08462030
   *
   */
  deparLevel(){
    return Http.postNeedLoading("A08462053", data, 'A08462030')
  },
  /**
   * 系统维护-设计词典(删除)   A08462027
   * 系统维护-设计词典(删除)   A08462031
   */
  dictDelete(portType, data) {
    return Http.postNeedLoading("A08462053", data, portType)
  },
  /**
   *  系统维护-设计词典(新增)   A08462025
   *
   */
  dictCreate(data) {
    return Http.postNeedLoading("A08462053", data, 'ADICS2025')
  },
  /**
   * 系统维护-设计词典-数据(新增)   A08462029
   */
  dictDataCreate(data) {
    return Http.postNeedLoading("A08462053", data, 'ADICS2029')
  },
  /**
   * 系统维护-设计词典(更新)   A08462028
   */
  dictAlter(data) {
    return Http.postNeedLoading("A08462053", data, 'ADICS2028')
  },
  /**
   *   系统维护-设计词典--数据(更新)   A08462032
   */
  dictDataAlter(data) {
    return Http.postNeedLoading("A08462053", data, 'ADICS2032')
  },
  /**
   *  系统维护-设计词典--机构级别  A08461732
   */
  queryLevelOrg(data) {
    return Http.postNeedLoading("A08462053", data, 'A08461732')
  },

  /**
   * 分级维护设置
   * @param data
   * @param pagination
   * @returns {*}
   */
  //获取列表
  getGradList(data, pagination) {
    return Http.postNeedPage("A08462053", data, 'ASYSS5202', pagination)
  },
  //新增
  addGrad(data) {
    return Http.postNeedLoading("A08462053", data, 'ASYSS5204')
  },
  //删除
  delGradList(data) {
    return Http.postNeedLoading("A08462053", data, 'ASYSS5205')
  },
  //修改
  updateGradList(data) {
    return Http.postNeedLoading("A08462053", data, 'ASYSS5203')
  },

  /**
   * 更新保存 修改 ASYSS5203  新增 ASYSS5204
   * @param data
   * @param id
   * @returns {*}
   */
  saveGradList(data, id) {
    return Http.postNeedLoading("A08462053", data, id)
  },

  /**
   * 删除
   * @param data
   * @returns {*}
   */
  deleteGrad(data) {
    return Http.postNeedLoading("A08462053", data, "ASYSS5205")
  },

  /**
   * 获取群组
   * @param data
   * @param pagination
   * @returns {*}
   */
  getTeamList(data, pagination) {
    return Http.postNeedPage("A08462053", data, 'ADICS2034', pagination)
  },
  getTeamMembers(data) {
    return Http.postNeedPage("A08462053", data, 'ADICS2044')
  },
getTeamMembers(data) {
    return Http.postNeedPage("A08462053", data, 'ADICS2044')
  },
  /**
   * (新增)   A08462033    (更新)   A08462036
   * @param data
   * @param id
   * @returns {*}
   */
  saveTeam(data, id) {
    return Http.postNeedLoading("A08462053", data, id)
  },

  getTeamId(data){
    return Http.postNeedLoading("A08462053", data, "ADICS2033")
  },

  /**
   * 删除群组
   * @param data
   * @returns {*}
   */
  deleteTeam(data) {
    return Http.postNeedLoading("A08462053", data, "ADICS2038")
  },

  /**
   * 代办事宜排序设置获取
   * @param data
   * @returns {*}
   */
  getToDoSet(data) {
    return Http.postNeedLoading("A08462053", data, "A08462308")
  },

  /**
   * 设置代办事宜排序
   * @param data
   * @returns {*}
   */
  setToDo(data) {
    return Http.postNeedLoading("A08462053", data, "A08462307")
  },

  /**
   * 添加正文模板
   * @param data
   * @returns {*}
   */
  addTextem(data) {
    return Http.postNeedLoading("A08462053", data, "ASYSS5104")
  },

  /**
   * 获取正文模板
   * @param data
   * @returns {*}
   */
  getTextemList(data){
    // return Http.postNeedLoading("A08462053", data, "ASYSS5102")
    return Http.postNeedLoading("A08462053", data, "ABASE5101")
  },
  // 排序
  sortFile(data){
    return Http.postNeedLoading("A08462053", data, "ABASE5102")
  },
  /**
   * 附件删除   ABASE5104
   */
  deleFile(data){
    return Http.postNeedLoading("A08462053", data, "ABASE5104")
  },
  /**
   * 附件上传保存   ABASE5105
   */
  saveFile(data){
    return Http.postNeedLoading("A08462053", data, "ABASE5105")
  },
  /**
   * 附件下载    ABASE5106
   */
  downloadFile(data){
    return Http.postNeedLoading("A0846C071", data, "ABASE5106")
  },
  /**
   *  系统配置正文模板详情  ASYSS5102
   */
  sysText(data){
    return Http.postNeedLoading("A08462053", data, "ASYSS5102")
  },
  /**
   * 系统配置新增模板  ASYSS5104
   */
  sysTextCrea(data){
    return Http.postNeedLoading("A08462053", data, "ASYSS5104")
  },
  /**
   * 系统配置更新模板  ASYSS5103
   */
  sysTextUpdate(data){
    return Http.postNeedLoading("A08462053", data, "ASYSS5103")
  },

  /**
   * 获取待办事宜
   * @param data
   * @param pagination
   * @returns {*}
   */
  getthingsOrderList(data, pagination) {
    return Http.postNeedPage("A08462053", data, "A08462308", pagination)
  },

  /**
   * 修改保存待办事宜
   * @param data
   * @param id
   * @returns {*}
   */
  addOrUpThingOrder(data,id){
    return Http.postNeedLoading("A08462053",data,id)
  },

  /**
   * 获取下拉列表
   * @param data
   * @returns {*}
   */
  getTypeList(data){
    return Http.postNeedLoading("A08462053",data,"A08462019")
  },

  /**
   * 删除待办事宜
   * @param data
   * @returns {*}
   */
  deletThingOrder(data){
    return Http.postNeedLoading("A08462053",data,"08462315")
  },

  /**
   * 菜单权限配置列表(未授权)
   * @param data
   * @returns {*}
   */
  menuConfigTreeList(data){
    return Http.postNeedLoading("A08462053",data,"A08462309")
  },
  /**
   * 菜单权限配置树(未授权)
   * @param data
   * @returns {*}
   */
  menuConfigTree(data){
    return Http.postNeedLoading("A08462053",data,"A08462310")
  },
  /**
   * 菜单权限配置授权(未授权)
   * @param data
   * @returns {*}
   */
  menuConfigAuthorization(data){
    return Http.postNeedLoading("A08462053",data,"A08462311")
  },

     /**
   * 菜单权限配置授权-已授权岗位(已授权)
   * @param data
   * @returns {*}
   */
  menuConfigAuthoriedPositions(data){
    return Http.postNeedLoading("A08462053",data,"A08462318")
  },
     /**
   * 菜单权限配置授权-更新授权(已授权)
   * @param data
   * @returns {*}
   */
  menuConfigAuthorizationUpdate(data){
    return Http.postNeedLoading("A08462053",data,"A08462319")
  },
  /**
   * 菜单权限配置树(已授权)
   * @param data
   * @returns {*}
   */
  menuConfigTreeHasAuthorized(data){
    return Http.postNeedLoading("A08462053",data,"A08462317")
  },
  /**
   *其他配置-工作时常配置-列表查询
   * @param data
   * @returns {*}
   */
  workingTimeConfigList(data){
    return Http.postNeedLoading("A08462053",data,"ADICS2050")
  },
  /**
   *其他配置-工作时常配置-详情查询
   * @param data
   * @returns {*}
   */
  workingTimeConfigDetail(data){
    return Http.postNeedLoading("A08462053",data,"ADICS2051")
  },
  /**
   *其他配置-工作时常配置-新增、修改保存
   * @param data
   * @returns {*}
   */
  workingTimeConfigSave(data){
    return Http.postNeedLoading("A08462053",data,"ADICS2052")
  },

  /**
   *其他配置-定密依据配置-列表查询
   * @param data
   * @returns {*}
   */
  setSecretBaseConfigList(data){
    return Http.postNeedLoading("A08462053",data,"ADICS2047")
  },


  /**
   *其他配置-定密依据配置-详情查询
   * @param data
   * @returns {*}
   */
  setSecretBaseConfigDetail(data){
    return Http.postNeedLoading("A08462053",data,"ADICS2048")
  },

  /**
   *其他配置-定密依据配置-新增、修改保存
   * @param data
   * @returns {*}
   */
  setSecretBaseConfigSave(data){
    return Http.postNeedLoading("A08462053",data,"ADICS2049")
  },

  /**
   *其他配置-定密依据配置-获取涉密类型
   * @param data
   * @returns {*}
   */
  setSecretTypeQuery (data){
    return Http.postNeedLoading("A08462053",data,"ADICS2030")
  },

  /**
   *修改机构紧急级别和紧急参数
   * @param data
   * @returns {*}
   */
  changeEmergencyLevel(data){
    return Http.postNeedLoading("A08462053",data,"A08462316")
  }
}
