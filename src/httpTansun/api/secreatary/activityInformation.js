import Http from '../../http'

export default {
  //  领导活动资料管理  列表
  getActivityList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471514', pagination)
  },
  //管理员查看列表
  ViewListActivity(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471537', pagination)
  },
  // 领导活动资料管理-保存
  getaddFormdata(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471510')
  },
  //新建活动资料-详情
  getViewActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471511')
  },
  //新建活动资料-调取流程节点
  sendActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471534')
  },
  //新建活动资料-删除
  deletActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471513')
  },
  //新建活动资料-直接返回
  Recback(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471542')
  },
  //新建活动资料-维护/修改
  maintainActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471512')
  },
  //新建活动资料-办结
  FinishActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471512')
  },
  //新建活动资料-详情
  viewActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471511')
  },
  //新建活动资料-部门
  orgActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471535')
  },
  //新建活动资料-控制域
  ControlActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471536')
  },
  //新建活动资料-流程查看
  proessViewActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471538')
  },
  //新建活动资料-收回
  RecoverActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471539')
  },
  //新建活动资料-催办
  UrgingActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471540')
  },
  //新建活动资料-催办消息提醒
  UrgingMessageActivity(data) {
    return Http.postNeedLoading("A08462049", data, 'A08461813')
  },
  //新建活动资料-活动类型
  TypeActivity(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471541')
  },



  //参数维护列表
  parameterList(data, pagination) {
    return Http.postNeedPage('A08462043', data, 'A08471523', pagination)
  },
  //参数维护保存
  parameTerSave(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471519')
  },
  //参数维护修改
  parameTerEdit(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471521')
  },
  //参数维护查看
  parameTerView(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471520')
  },
  //参数维护删除
  parameTerDel(data) {
    return Http.postNeedLoading("A08462043", data, 'A08471522')
  },
  //收藏
  collecTion(data) {
    return Http.postNeedLoading('A08462043', data, 'A08465004')
  }
}
