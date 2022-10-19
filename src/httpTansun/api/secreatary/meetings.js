import Http from "../../http.js"
export default {
  // 议题起草
  topicDraft(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21004')
  },
  //   议题列表
  getTopicList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21002', pagination)
  },
  // getTopicList(data, pagination) {
  //   return Http.postNeedPage('A08462043', data, 'ASEC21002', pagination)
  // },
  //议题详情查询
  topDetailQuery(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21001')
  },
  //议题保存更新
  saveTopic(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21003')
  },
  //议题报送
  topicSubmit(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21005')
  },
  //议题删除
  topicDel(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21040')
  },

  //议题退回
  topicBack(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21006')
  },
  // 起草主办单
  startMainList(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21010')
  },
  // 主办单列表
  mainList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21013', pagination)
  },
  // 主办单详情
  getMainDetail(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21012')
  },
  // 保存主办单
  saveMain(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21011')
  },
  // 查询出席信息
  queryleaderInfo(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21067')
  },
  //添加出席信息
  addAttendance(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21014')
  },
  // 删除出席信息
  removeAttendance(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21016')
  },
  //更新出席信息
  getAttendance(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21015')
  },
  // 出席列表
  AttendanceList(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21068')
  },
  // 缺席列表
  AbsenceList(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21069')
  },
  // 添加缺席信息
  addAbsence(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21017')
  },
  // 缺席列表
  // AttendanceList(data){
  //   return Http.postNeedLoading('A08462043',data,'ASEC21068')
  // },
  // 删除缺席信息
  removeAbsence(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21019')
  },
  // 删除主办单议题
  delYiti(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21045')
  },
  // 删除主办单议题
  del(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21047')
  },
  // 新增议题
  newYiti(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21020')
  },
  // 退回议题
  backYiti(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21049')
  },
  // 查看报名状态
  ckBmType(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21072', pagination)
  },
  //查看参会流程(报名通知)
  ckProcess(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21072')
  },
  //查看参会流程(预通知)
  ckViewProcess(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21071')
  },
  // 查看退回情况
  seeReturn(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21035')
  },
  // 议题-主汇报部门筛选
  mainDepartSelect(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21041')
  },
  //议题-年份筛选
  yearSelect(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21042')
  },
  // 主办单会议内容表格
  hyTable(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21039', pagination)
  },
  // 会议内容表格
  ytzhyTable(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21048', pagination)
  },
  // 报名信息表格
  getBmTable(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21077')
  },
  // 报名通知表格
  BmgetBmTable(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21046')
  },
  // 更新报名信息
  updateBm(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21030')
  },
  // 反馈报名信息
  retrunBm(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21036')
  },

  // 发送预通知
  sendPreNotice(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21025')
  },
  // 预通知完成并发送
  sendPreNotification(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21057')
  },
  // 预通知-发送至下一处理人 
  prenextHandler(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21064')
  },
  /**
   * 查看环节  会议管理获取控制域 ASEC21070
   * @returns {*}
   */
  getHuanJie(data) {
    return Http.postNeedLoading('A08462043', data, "ASEC21070")
  },
  // 收回预通知
  backPreNotice(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21026')
  },
  // 发送报名通知
  sendBmNotice(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21027')
  },
  // 收回报名通知
  backBmNotice(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21060')
  },
  // 发送正式通知
  sendZsNotice(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21034')
  },
  // 收回正式通知
  backZsNotice(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21056')
  },
  // 预通知列表
  getAdList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21023', pagination)
  },
  // 预通知详情
  getAdDetail(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21021')
  },
  // 预通知更新
  getAdUpdate(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21037')
  },

  // 收藏
  collecTion(data) {
    return Http.postNeedLoading('A08462043', data, 'A08465009')
  },
  // 批量预通知更新
  AllgetAdUpdate(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21038')
  },
  // 反馈预通知
  getAdback(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21024')
  },
  // 报名通知列表
  getBmList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21028', pagination)
  },
  // 报名通知完成并发送
  sendRegistrationNotice(data) {
    return Http.postNeedPage('A08462043', data, 'ASEC21058')
  },
  // 报名通知-发送至下一处理人
  registrationnextHandler(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21065')
  },
  // 报名通知详情
  getBmDetail(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21062')
  },
  // 此议题暂不上会
  noSubmit(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21055')
  },
  // 正式通知列表
  getZsList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21032', pagination)
  },
  // 正式通知详情
  getZsDetail(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21031')
  },
  // 查询
  queryForm(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21050', pagination)
  },
  // 统计
  statisForm(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21051', pagination)
  },
  statisForms(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21052', pagination)
  },

  // 会议管理列表
  // meetList(data){
  //   return Http.postNeedLoading('A08462043', data, 'ASEC21053')
  // },
  // 会议地点接口
  meetPlace(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21063')
  },
  // 保存议题序号
  saveorder(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21044')
  },
  // 获取部门列表
  getDeptList(data) {
    return Http.postNeedLoading('A08462043', data, 'A08471740')
  },
  //管理员查看(议题报送)
  getyTList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21073', pagination)
  },
  // ASEC21074：预通知
  getYtzList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21074', pagination)
  },
  // ASEC21075：报名通知
  getBmtzList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21075', pagination)
  },
  // ASEC21076：正式通知
  getZstzList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21076', pagination)
  },
  //模板列表
  templateList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'ASEC21054', pagination)
  },
  //删除模板
  delTemplateList(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21061')
  },
  //新增模板
  addTemplateList(data) {
    return Http.postNeedLoading('A08462043', data, 'ASEC21053')
  },
  // 会议通知起草权限
  ckMeet(data) {
    return Http.postNeedLoading('A08462043', data, 'A08465010')
  },
  // 管理员查看报名通知议题列表
  bMTableList(data) {
    return Http.postNeedLoading('A08462043', data, 'A08465011')
  },

}
