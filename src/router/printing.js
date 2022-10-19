/*
 * @Author: zj
 * @Date: 2020-08-25 15:16:43
 * @LastEditTime: 2021-09-02 18:43:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\router\printing.js
 */
const routers = [{
    path: '/bianhanZf',
    name: 'printingBianH1',
    meta: {
      title: "便函"
    },
    component: resolve => require(['views/printing/bianhan.vue'], resolve),
  },
  {
    path: '/bianhanCb',
    name: 'printingBianH2',
    meta: {
      title: "便函"
    },
    component: resolve => require(['views/printing/bianhan2.vue'], resolve),
  },
  {
    path: '/bianhanCy',
    name: 'printingBianH3',
    meta: {
      title: "便函"
    },
    component: resolve => require(['views/printing/bianhan3.vue'], resolve),
  },
  {
    path: '/shiwuBenhang',
    name: 'shiwuBenhang',
    meta: {
      title: "事务审批"
    },
    component: resolve => require(['views/printing/shiwu.vue'], resolve),
  },
  {
    path: '/shiwuBenhangkh',
    name: 'shiwuBenhangkh',
    meta: {
      title: "事务审批跨行"
    },
    component: resolve => require(['views/printing/shiwukh.vue'], resolve),
  },
  {
    path: '/shiwuv',
    name: 'shiwuv',
    meta: {
      title: "事务审批请假单"
    },
    component: resolve => require(['views/printing/shiwuofvacation.vue'], resolve),
  },
  {
    path: '/shiwu',
    name: 'shiwu',
    meta: {
      title: "事务审批请假申请单"
    },
    component: resolve => require(['views/printing/shiwuapplay.vue'], resolve),
  },
  // 离京处理单
  {
    path: '/shiwucldlj',
    name: 'shiwucldlj',
    meta: {
      title: "在京机构（部门）负责人疫情期间离京申请审批处理单"
    },
    component: resolve => require(['views/printing/shiwuCldLj.vue'], resolve),
  },
  // 离京申请表
  {
    path: '/shiwusqblj',
    name: 'shiwusqblj',
    meta: {
      title: "在京机构（部门）负责人疫情期间离京报批表"
    },
    component: resolve => require(['views/printing/shiwuSqbLj.vue'], resolve),
  },
  //秘书工作／领导批示登记／实物／打印处理单
  {
    path: '/secretaryLeader',
    name: 'secretaryLeader',
    meta: {
      title: "领导批示登记"
    },
    component: resolve => require(['views/printing/secretaryLeader.vue'], resolve),
  },
  {
    path: '/leaderParting',
    name: 'leaderParting',
    meta: {
      title: "批示登记"
    },
    component: resolve => require(['views/printing/leaderParting.vue'], resolve),
  },
  // 领导活动资料
  {
    path: '/LeaderActivities',
    name: 'LeaderActivities',
    meta: {
      title: "领导活动资料"
    },
    component: resolve => require(['views/printing/LeaderActivities.vue'], resolve),
  },
  // 秘书工作/值班动态/信息报送打印
  {
    path: '/infoSendPrint',
    name: 'infoSendPrint',
    meta: {
      title: "信息报送"
    },
    component: resolve => require(['views/printing/infoSendPrint.vue'], resolve),
  },
  // 秘书工作/值班动态/信息报送打印
  {
    path: '/secretaryZb',
    name: 'secretaryZb',
    meta: {
      title: "信息报送"
    },
    component: resolve => require(['views/printing/secretaryZb.vue'], resolve),
  },
    // 秘书工作/值班动态/错情通知
    {
      path: '/secretaryCuo',
      name: 'secretaryCuo',
      meta: {
        title: "信息报送"
      },
      component: resolve => require(['views/printing/secretaryCuo.vue'], resolve),
    },
  // 秘书工作/行长办公会议/正式通知打印会议单
  {
    path: '/formalDetailDy',
    name: 'formalDetailDy',
    meta: {
      title: "打印会议单"
    },
    component: resolve => require(['views/printing/formalDetailDy.vue'], resolve),
  },
  // 秘书工作/行长办公会议/主办单打印会议单
  {
    path: '/conferDetailDy',
    name: 'conferDetailDy',
    meta: {
      title: "打印会议单"
    },
    component: resolve => require(['views/printing/conferDetailDy.vue'], resolve),
  },
  {
    path: '/meetingPrint',
    name: 'meetingPrint',
    meta: {
      title: "会议制发"
    },
    component: resolve => require(['views/printing/meeting.vue'], resolve),
  },
  {
    path: '/meetingCbPrint',
    name: 'meetingCbPrint',
    meta: {
      title: "会议承办"
    },
    component: resolve => require(['views/printing/meetingCb.vue'], resolve),
  },
  {
    path: '/meetingChPrint',
    name: 'meetingChPrint',
    meta: {
      title: "会议参会"
    },
    component: resolve => require(['views/printing/meetingCh.vue'], resolve),
  },
  {
    path: '/meetingCyPrint',
    name: 'meetingCyPrint',
    meta: {
      title: "会议传阅"
    },
    component: resolve => require(['views/printing/meetingCy.vue'], resolve),
  },
  {
    path: '/meetBmTablePrint',
    name: 'meetBmTablePrint',
    meta: {
      title: "会议报名表"
    },
    component: resolve => require(['views/printing/meetBmTable.vue'], resolve),
  },
  /**
   * 印章管理
   */
  {
    path: '/sealDocument',
    name: 'sealDocument',
    meta: {
      title: "公文用印处理单"
    },
    component: resolve => require(['views/printing/sealDocument.vue'], resolve),
  },
  {
    path: '/sealDepartment',
    name: 'sealDepartment',
    meta: {
      title: "部门用印处理单"
    },
    component: resolve => require(['views/printing/sealDepartment.vue'], resolve),
  },
  {
    path: '/sealIntroduction',
    name: 'sealIntroduction',
    meta: {
      title: "介绍信用印处理单"
    },
    component: resolve => require(['views/printing/sealIntroduction.vue'], resolve),
  },
  // 印章管理》印章刻制
  {
    path: '/sealMarkMgrDocument',
    name: 'sealMarkMgrDocument',
    meta: {
      title: "印章刻制处理单"
    },
    component: resolve => require(['views/printing/sealMarkMgrDocument.vue'], resolve),
  },
  // 印章管理》印章废止
  {
    path: '/sealAbolishedDocument',
    name: 'sealAbolishedDocument',
    meta: {
      title: "印章废止处理单"
    },
    component: resolve => require(['views/printing/sealAbolishedDocument.vue'], resolve),
  },
  // 印章管理》印章销毁
  {
    path: '/sealDestroyDocument',
    name: 'sealDestroyDocument',
    meta: {
      title: "印章销毁处理单"
    },
    component: resolve => require(['views/printing/sealDestroyDocument.vue'], resolve),
  },
  // 信息刊物
  {
    path: '/altBusiness',
    name: 'altBusiness',
    meta: {
      title: "《每日动态》备选稿件"
    },
    component: resolve => require(['views/printing/altBusiness.vue'], resolve),
  },
  // 党委成员离京报告单
  {
    path: '/partyMemLeavRep',
    name: 'partyMemLeavRep',
    meta: {
      title: "党委成员离京报告单"
    },
    component: resolve => require(['views/printing/partyMemLeavRep.vue'], resolve),
  },
  //值班动态查询稿件打印
  {
    path: '/dutyTrendsSearchPrint',
    name: 'dutyTrendsSearchPrint',
    meta: {
      title: "值班动态查询稿件打印"
    },
    component: resolve => require(['views/printing/dutyTrendsSearchPrint.vue'], resolve),
  },
]

export default routers
