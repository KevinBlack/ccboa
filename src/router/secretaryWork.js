/**
 * create by 23327129.zh on 2020/7/16 16:13
 * 类注释：秘书工作
 * 备注：
 */

const routers = [
  //本周秘书工作安排表单------------------
  {
    path: '/secretary/leaderActivity/theForm',
    name: 'theForm',
    meta: {
      title: "本周秘书工作安排表单",
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/leaderActivity/secretaryWorkArrange/theForm.vue'], resolve),
  },
  //秘书打印处理单
  {
    path: '/secretary/leaderActivity/printProcessing',
    name: 'printProcessing',
    meta: {
      title: "本周秘书工作安排表单",
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/leaderActivity/secretaryWorkArrange/printProcessing.vue'], resolve),
  },
  //高管表单
  {
    path: '/secretary/leaderActivity/topTheform',
    name: 'topTheform',
    meta: {
      title: "高管成员活动安排表单",
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/leaderActivity/topManagerActivity/topTheform.vue'], resolve),
  },

  //高管表单打印处理单
  {
    path: '/secretary/leaderActivity/Printtheform',
    name: 'Printtheform',
    meta: {
      title: "高管成员活动安排表单打印处理单",
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/leaderActivity/topManagerActivity/Printtheform.vue'], resolve),
  },
  {
    path: '/phoneHandlePrintDetail',
    name: 'phoneHandlePrintDetail',
    meta: {
      title: '打印电话记录单',
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/phoneForm/phoneHandlePrintDetail.vue'], resolve),
  },
  {
    path: '/telPrintDetail',
    name: 'telPrintDetail',
    meta: {
      title: '打印电话办理单',
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/phoneForm/telPrintDetail.vue'], resolve),
  },
  {
    path: '/secretary/leaderActivity/Newactivity',
    name: 'Newactivity',
    meta: {
      title: "党委成员活动安排新建活动",
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/leaderActivity/partyCommitteeActivity/Newactivity.vue'], resolve),
  },
  {
    path: '/secretary/leaderActivity/detel',
    name: 'Detel',
    meta: {
      title: "党委成员活动安排新建活动",
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/leaderActivity/partyCommitteeActivity/detel.vue'], resolve),
  },

  // 领导活动结束-------------------------
  {
    path: '/bianhan/detail',
    name: 'detail',
    meta: {
      title: '主文档',
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/detail.vue'], resolve),
  },
  {
    path: '/bianhan/adminDetail',
    name: 'adminDetail',
    meta: {
      title: '文件处理单详情',
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/adminDetail.vue'], resolve),
  },

  {
    path: '/bianhan/docHandling/docDetail',
    name: 'docDetail',
    meta: {
      title: '文件办理单详情',
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/docHandling/docDetail.vue'], resolve),
  },
  {
    path: '/bianhan/fileAdminDetail',
    name: 'fileAdminDetail',
    meta: {
      title: '文件处理单详情(管理员查看)',
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/fileAdminDetail.vue'], resolve),
  },
  {
    path: '/bianhan/adminHandleDetail',
    name: 'fileAdminHandleDetail',
    meta: {
      title: '文件办理单详情(管理员查看)',
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/adminHandleDetail.vue'], resolve),
  },
  {
    path: '/bianhan/phoneForm/detail',
    name: 'detail',
    meta: {
      title: '电话记录单详情',
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/phoneForm/detail.vue'], resolve),
  },
  {
    path: '/bianhan/phoneForm/handleDetail',
    name: 'handleDetail',
    meta: {
      title: '电话办理单详情',
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/phoneForm/handleDetail.vue'], resolve),
  },
  {
    path: '/bianhan/phoneForm/adminDetail',
    name: 'adminDetail',
    meta: {
      title: '电话记录单详情(管理员查看)',
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/phoneForm/adminDetail.vue'], resolve),
  },
  {
    path: '/bianhan/phoneForm/adminHandleDetail',
    name: 'adminHandleDetail',
    meta: {
      title: '电话办理单详情(管理员查看)',
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/phoneForm/adminHandleDetail.vue'], resolve),
  },

  {
    path: '/secretary/partyMemLeavRep/detail',
    name: 'partyMemLeavRep',
    meta: {
      title: "离京报告单",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/partyMemLeavRep/newProj/leaderList.vue'], resolve),
  },
  {
    path: '/secretary/partyMemLeavRep/finishedDetail',
    name: 'partyMemLeavRepFinishedDetail',
    meta: {
      title: "离京报告单",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/partyMemLeavRep/newProj/finishedDetail.vue'], resolve),
  },
  {
    path: '/secretary/partyMemLeavRep/searchDetail',
    name: 'searchDetail',
    meta: {
      title: "离京报告单",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/partyMemLeavRep/search/detail.vue'], resolve),
  },
  {
    path: '/secretary/partyMemLeavRep/adminDetail',
    name: 'adminDetail',
    meta: {
      title: "离京报告单-管理员查看",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/partyMemLeavRep/admin/detail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/conferList/newYt',
    name: 'newYt',
    meta: {
      title: '新增议题',
      needLogin: false,
    },
    component: resolve => require(['views/conferList/newYt.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/topicSub/topicDetail',
    name: 'topicDetail',
    meta: {
      title: '报送详情',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/topicSub/topicDetail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/topicMange/topicMangeDetail',
    name: 'topicMangeDetail',
    meta: {
      title: '管理详情',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/topicMange/topicMangeDetail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/conferList/conferDetail',
    name: 'conferDetail',
    meta: {
      title: '会议通知详情',
      needLogin: false,
    },
    component: resolve => require(['views/conferList/conferDetail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/setUp/addConfigurAtion',
    name: 'addConfigurAtion',
    meta: {
      title: "新增模板",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/setUp/addConfigurAtion.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/topicSub/topicDetailed',
    name: 'topicDetailed',
    meta: {
      title: "议题报送-已报送",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/topicSub/topicDetailed.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/conferList/conferDetailed',
    name: 'conferDetailed',
    meta: {
      title: '会议通知办结详情',
      needLogin: false,
    },
    component: resolve => require(['views/conferList/conferDetailed.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/admin/topicMangeDetail',
    name: 'topicMangeDetail',
    meta: {
      title: "议题管理详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/admin/topicMangeDetail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/admin/topicDetail',
    name: 'topicDetail',
    meta: {
      title: "议题报送详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/admin/topicDetail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/admin/topicDetailed',
    name: 'topicDetailed',
    meta: {
      title: "议题报送详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/admin/topicDetailed.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/admin/conferDetail',
    name: 'conferDetail',
    meta: {
      title: "会议通知详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/admin/conferDetail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/admin/conferDetailed',
    name: 'conferDetailed',
    meta: {
      title: "会议通知办结详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/admin/conferDetailed.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/admin/adDetail',
    name: 'adDetail',
    meta: {
      title: "管理员查看预通知详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/admin/adDetail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/admin/adDetailDone',
    name: 'adDetailDone',
    meta: {
      title: "管理员查看预通知详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/admin/adDetailDone.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/admin/registerDetail',
    name: 'registerDetail',
    meta: {
      title: "报名通知详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/admin/registerDetail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/admin/formalDetail',
    name: 'formalDetail',
    meta: {
      title: "正式通知详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/admin/formalDetail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/meetQueryDetails',
    name: 'meetQueryDetails',
    meta: {
      title: '查询详情',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/presidentMeeting/meetQueryDetails.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/adNotice/adDetail',
    name: 'adDetail',
    meta: {
      title: '预通知详情',
      needLogin: false,
    },
    component: resolve => require(['views/adNotice/adDetail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/adNotice/adDetailDone',
    name: 'adDetailDone',
    meta: {
      title: '预通知详情',
      needLogin: false,
    },
    component: resolve => require(['views/adNotice/adDetailDone.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/registerNotice/registerDetail',
    name: 'registerDetail',
    meta: {
      title: '报名通知详情',
      needLogin: false,
    },
    component: resolve => require(['views/registerNotice/registerDetail.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/registerNotice/registerDetailDone',
    name: 'registerDetailDone',
    meta: {
      title: '报名通知详情',
      needLogin: false,
    },
    component: resolve => require(['views/registerNotice/registerDetailDone.vue'], resolve),
  },
  {
    path: '/secretary/presidentMeeting/formalNotice/formalDetail',
    name: 'formalDetail',
    meta: {
      title: '正式通知详情',
      needLogin: false,
    },
    component: resolve => require(['views/formalNotice/formalDetail.vue'], resolve),
  },
  {
    path: '/secretary/datumManage/activityManage',
    name: 'activityManage',
    meta: {
      title: "新建活动领导资料代办详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/datumManage/activityManage.vue'], resolve),
  },
  {
    path: '/secretary/datumManage/DownAndFinish',
    name: 'DoneAndFinish',
    meta: {
      title: "新建活动领导资料已办详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/datumManage/DownAndFinish.vue'], resolve),
  },
  {
    path: '/secretary/datumManage/viewCirculationDetail',
    name: 'DoneAndFinish',
    meta: {
      title: "管理员查看代办详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/datumManage/viewCirculationDetail.vue'], resolve),
  },
  {
    path: '/secretary/datumManage/viewFinishDetail',
    name: 'DoneAndFinish',
    meta: {
      title: "管理员查看已办详情",
      needLogin: false,
    },
    component: resolve => require(['views/secretary/datumManage/viewFinishDetail.vue'], resolve),
  },
  {
    path: '/secretary',
    name: 'secretary',
    meta: {
      title: '秘书工作'
    },
    component: resolve => require(['views/secretary/layout/index.vue'], resolve),
    redirect: '/singleSuperviseHandle',
    children: [
      // 行长办公会议
      {
        // path: '/secretary/presidentMeeting',
        // name: 'presidentMeeting',
        // redirect: '/secretary/presidentMeeting/notice/draftNotice',
        // meta: {
        //   title: "行长办公会议",
        //   needLogin: false,
        // },
        path: '/secretary/presidentMeeting',
        name: 'presidentMeeting',
        redirect: '/secretary/presidentMeeting/topicSub',
        meta: {
          title: "行长办公会议",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/secretary/presidentMeeting/topicSub',
            name: 'topicSub',
            meta: {
              title: '议题报送',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/presidentMeeting/topicSub/index.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/topicSub/topicDetail',
            name: 'topicDetail',
            meta: {
              title: '报送详情',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/presidentMeeting/topicSub/topicDetail.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/topicMange',
            name: 'topicMange',
            meta: {
              title: '议题管理',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/presidentMeeting/topicMange/index.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/topicMange/topicMangeDetail',
            name: 'topicMangeDetail',
            meta: {
              title: '管理详情',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/presidentMeeting/topicMange/topicMangeDetail.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/conferList',
            name: 'conferList',
            meta: {
              title: '会议通知',
              needLogin: false,
            },
            component: resolve => require(['views/conferList/index.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/conferList/conferDetail',
            name: 'conferDetail',
            meta: {
              title: '会议通知详情',
              needLogin: false,
            },
            component: resolve => require(['views/conferList/conferDetail.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/conferList/newYt',
            name: 'newYt',
            meta: {
              title: '新增议题',
              needLogin: false,
            },
            component: resolve => require(['views/conferList/newYt.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/adNotice',
            name: 'adNotice',
            meta: {
              title: '会议预通知',
              needLogin: false,
            },
            component: resolve => require(['views/adNotice/index.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/adNotice/adDetail',
            name: 'adDetail',
            meta: {
              title: '预通知详情',
              needLogin: false,
            },
            component: resolve => require(['views/adNotice/adDetail.vue'], resolve),
          },

          {
            path: '/secretary/presidentMeeting/registerNotice',
            name: 'registerNotice',
            meta: {
              title: '会议报名通知',
              needLogin: false,
            },
            component: resolve => require(['views/registerNotice/index.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/registerNotice/registerDetail',
            name: 'registerDetail',
            meta: {
              title: '报名通知详情',
              needLogin: false,
            },
            component: resolve => require(['views/registerNotice/registerDetail.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/formalNotice',
            name: 'formalNotice',
            meta: {
              title: '会议正式通知',
              needLogin: false,
            },
            component: resolve => require(['views/formalNotice/index.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/formalNotice/formalDetail',
            name: 'formalDetail',
            meta: {
              title: '正式通知详情',
              needLogin: false,
            },
            component: resolve => require(['views/formalNotice/formalDetail.vue'], resolve),
          },
          // {
          //   path: '/secretary/presidentMeeting/',
          //   name: 'formalNotice',
          //   meta: {
          //     title: '会议正式通知',
          //     needLogin: false,
          //   },
          //   component: resolve => require(['views/formalNotice/index.vue'], resolve),
          // },
          // {
          //   path: '/secretary/presidentMeeting/formalNotice/formalDetail',
          //   name: 'formalDetail',
          //   meta: {
          //     title: '正式通知详情',
          //     needLogin: false,
          //   },
          //   component: resolve => require(['views/formalNotice/formalDetail.vue'], resolve),
          // },
          {
            path: '/secretary/presidentMeeting/meetQuery',
            name: 'meetQuery',
            meta: {
              title: '查询',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/presidentMeeting/meetQuery.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/meetStatis',
            name: 'meetStatis',
            meta: {
              title: '统计',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/presidentMeeting/meetStatis.vue'], resolve),
          },
          {
            path: '/secretary/presidentMeeting/setUp/configurAtion',
            name: 'setUp',
            meta: {
              title: '设置',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/presidentMeeting/setUp/configurAtion.vue'], resolve),
            children: [{
              path: '/secretary/presidentMeeting/setUp/configurAtion',
              name: 'configurAtion',
              meta: {
                title: "模板配置",
                needLogin: false,
              },
              component: resolve => require(['views/secretary/presidentMeeting/setUp/configurAtion.vue'], resolve),
            }, ],
          },
          {
            path: '/secretary/presidentMeeting/admin/yt',
            name: 'yt',
            // redirect: '/secretary/presidentMeeting/admin/yt',
            meta: {
              title: "管理员查看",
              needLogin: false,
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            children: [{
                path: '/secretary/presidentMeeting/admin/yt',
                name: 'yt',
                meta: {
                  title: "议题报送",
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/presidentMeeting/admin/yt.vue'], resolve),
              },
              {
                path: '/secretary/presidentMeeting/admin/ytgl',
                name: 'ytgl',
                meta: {
                  title: "议题管理",
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/presidentMeeting/admin/ytgl.vue'], resolve),
              },
              {
                path: '/secretary/presidentMeeting/admin/hytz',
                name: 'hytz',
                meta: {
                  title: "会议通知",
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/presidentMeeting/admin/hytz.vue'], resolve),
              },
              {
                path: '/secretary/presidentMeeting/admin/ytz',
                name: 'ytz',
                meta: {
                  title: "预通知",
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/presidentMeeting/admin/ytz.vue'], resolve),
              },
              {
                path: '/secretary/presidentMeeting/admin/bmtz',
                name: 'bmtz',
                meta: {
                  title: "报名通知",
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/presidentMeeting/admin/bmtz.vue'], resolve),
              },
              {
                path: '/secretary/presidentMeeting/admin/zstz',
                name: 'zstz',
                meta: {
                  title: "正式通知",
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/presidentMeeting/admin/zstz.vue'], resolve),
              },
            ]
          }
        ]
      },
      {
        path: '/secretary/leaderActivity',
        name: 'leaderActivity',
        redirect: '/secretary/leaderActivity/partCommitteeActivity',
        meta: {
          title: "领导活动安排",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        // redirect: '/singleSuperviseHandle',
        children: [{
            path: '/secretary/leaderActivity/partCommitteeActivity',
            name: 'partCommitteeActivity',
            meta: {
              title: "党委成员活动安排",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/partyCommitteeActivity/partCommitteeActivity.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/myActivity',
            name: 'myActivity',
            meta: {
              title: '党委成员活动安排我的日程'
            },
            component: resolve => require(['views/bianhan/leaderActivity/partyCommitteeActivity/myActivity.vue'], resolve)
          },
          {
            path: '/secretary/leaderActivity/List',
            name: 'List',
            meta: {
              title: "党委成员活动列表",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/partyCommitteeActivity/list.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/Alldata',
            name: 'Alldata',
            meta: {
              title: '党委成员全部日程'
            },
            component: resolve => require(['views/bianhan/leaderActivity/partyCommitteeActivity/Alldata.vue'], resolve)
          },
          //高管开始-------------------------》
          {
            path: '/secretary/leaderActivity/topManagerActivity',
            name: 'topManagerActivity',
            meta: {
              title: "高管成员活动安排",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/topManagerActivity/topManagerActivity.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/topManagerActivity/list',
            name: 'partyCommitteeActivitylist',
            meta: {
              title: "高管成员活动详情列表",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/topManagerActivity/list.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/Galldata',
            name: 'Galldata',
            meta: {
              title: "高管成员活动全部日程",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/topManagerActivity/Alldata.vue'], resolve),
          },
          //高管我的日程
          {
            path: '/secretary/leaderActivity/topmyActivity',
            name: 'TopmyActivity',
            meta: {
              title: "高管成员活动安排我的日程",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/topManagerActivity/topmyActivity.vue'], resolve),
          },
          //高管结束-------------------------》  
          {
            path: '/secretary/leaderActivity/secretaryWorkArrange',
            name: 'secretaryWorkArrange',
            meta: {
              title: "秘书工作安排",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/secretaryWorkArrange/secretaryWorkArrange.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/Mishudata',
            name: 'Mishudata',
            meta: {
              title: "秘书工作安排全部日程",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/secretaryWorkArrange/Mishudata.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/secretaryWorkArrange/milist',
            name: 'mishulist',
            meta: {
              title: "秘书工作安排详情",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/secretaryWorkArrange/list.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/MishuActivity',
            name: 'MishuActivity',
            meta: {
              title: "秘书工作安排我的日程",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/secretaryWorkArrange/MishuActivity.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/settingMember',
            name: 'settingMember',
            meta: {
              title: "成员配置",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/settingMember/settingMember.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/settingMember/addParty',
            name: 'addParty',
            meta: {
              title: '党委人员新增',
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/settingMember/addParty.vue'], resolve)
          },
          {
            path: '/secretary/leaderActivity/settingMember/addExecutive',
            name: 'addExecutive',
            meta: {
              title: '高管人员新增',
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/settingMember/addExecutive.vue'], resolve)
          },
          {
            path: '/secretary/leaderActivity/settingMember/settingSecretaryMember',
            name: 'settingSecretaryMember',
            meta: {
              title: "秘书成员配置",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/settingMember/secretaryMembers.vue'], resolve),

          },
          {
            path: '/secretary/leaderActivity/settingMember/settingTopManageMember',
            name: 'settingTopManageMember',
            meta: {
              title: "编辑权限配置",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/settingTopManageMember/settingTopManageMember.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/selectLeaderActivity',
            name: 'selectLeaderActivity',
            meta: {
              title: "领导活动安排查询",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/selectLeaderActivity/selectLeaderActivity.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/statisLeaderActivity',
            name: 'statisLeaderActivity',
            meta: {
              title: "领导活动安排统计",
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/leaderActivity/statisLeaderActivity/statisLeaderActivity.vue'], resolve),
          },
        ]
      },

      {
        path: '/supervise',
        name: 'Supervise',
        meta: {
          title: '专项督查办',
          keepAlive: true,
          needLogin: false,
          id: '05',
          parentId: '0'
        },
        component: resolve => require(['views/superviseHandle/supervise.vue'], resolve),
        redirect: '/singleSuperviseHandle',
        children: [{
            path: '/singleSuperviseHandle',
            name: 'SingleSuperviseHandle',
            meta: {
              title: '单项督查办',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/superviseHandle/superviseHandleChildren/singleSuperviseHandle.vue'], resolve)
          },
          {
            path: '/batchSuperviseHandle',
            name: 'batchSuperviseHandle',
            meta: {
              title: '批量督查办',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/superviseHandle/superviseHandleChildren/batchSuperviseHandle.vue'], resolve)
          },
          {
            path: '/undertakeHandle',
            name: 'UndertakeHandle',
            meta: {
              title: '承办',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/superviseHandle/superviseHandleChildren/undertakeHandle.vue'], resolve)
          },
          {
            path: '/jointly',
            name: 'Jointly',
            meta: {
              title: '协办',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/superviseHandle/superviseHandleChildren/jointly.vue'], resolve)
          },

          {
            path: '/scircularize',
            name: ' SCircularize',
            meta: {
              title: '传阅',
              keepAlive: false,
              needLogin: false
            },
            component: resolve => require(['views/superviseHandle/superviseHandleChildren/circularize.vue'], resolve)
          },
          {
            path: '/singleSearch',
            name: 'SingleSearch',
            meta: {
              title: '查询',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/superviseHandle/supervise.vue'], resolve),
            // path: '/singleSearch',
            children: [{
                path: '/singleSearch',
                name: 'SingleSearch',
                meta: {
                  title: '单项督办查询',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/superviseHandle/search/singleSearch.vue'], resolve),
              },
              {
                path: '/bachSearch',
                name: 'BachSearch',
                meta: {
                  title: '批量督办查询',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/superviseHandle/search/bachSearch.vue'], resolve),
              }
            ]
          },
          {
            path: '/sstatistics',
            name: 'SStatistics',
            meta: {
              title: '统计',
              keepAlive: true,
              needLogin: false
            },
            redirect: '/managestatistics',
            component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/index.vue'], resolve),
            children: [{
              path: '/managestatistics',
              name: 'ManageStatistics',
              meta: {
                title: '按承办情况统计',
                keepAlive: true,
                needLogin: false
              },
              component: resolve => require(['views/superviseHandle/superviseHandleChildren/statistics.vue'], resolve),
            }, {
              path: '/sstatisticsXB',
              name: 'sstatisticsXB',
              meta: {
                title: '按协办情况统计',
                keepAlive: true,
                needLogin: false
              },
              component: resolve => require(['views/superviseHandle/superviseHandleChildren/sstatisticsXB.vue'], resolve),
            }]
          },
          {
            path: '/argumentsMaintain',
            name: 'ArgumentsMaintain',
            meta: {
              title: '参数维护',
              keepAlive: true,
              needLogin: false
            },
            redirect: '/allocation',
            component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/index.vue'], resolve),
            children: [{
                path: '/allocation',
                name: 'Allocation',
                meta: {
                  title: '配置信息',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/allocation.vue'], resolve),
              },
              // {
              //   path: '/dbkhjfpz',
              //   name: 'dbkhjfpz',
              //   meta: {
              //     title: '督办考核计分配置',
              //     keepAlive: true,
              //     needLogin: false
              //   },
              //   component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/dbkhjfpz.vue'], resolve),
              // },
              {
                path: '/stream',
                name: 'Stream',
                meta: {
                  title: '流水号维护',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/stream.vue'], resolve),
              },
              {
                path: '/workTime',
                name: 'workTime',
                meta: {
                  title: '工作时长',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/workTime.vue'], resolve),
              }
            ]
          },
          {
            path: '/zxdbAdminManage',
            name: 'zxdbAdminManage',
            meta: {
              title: '管理员维护',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/index.vue'], resolve),
            redirect: '/zxdbdxdcb',
            children: [{
                path: '/zxdbdxdcb',
                name: 'zxdbdxdcb',
                meta: {
                  title: '单项督查办',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/singleSuperviseHandle.vue'], resolve),
              },
              {
                path: '/zxdbpldcb',
                name: 'zxdbpldcb',
                meta: {
                  title: '批量督查办',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/batchSuperviseHandle.vue'], resolve),
              },
              {
                path: '/zxdbxb',
                name: 'zxdbxb',
                meta: {
                  title: '协办',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/jointly.vue'], resolve),
              },
              {
                path: '/zxdbcb',
                name: 'zxdbcb',
                meta: {
                  title: '承办',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/undertakeHandle.vue'], resolve),
              },
              {
                path: '/zxdbcy',
                name: 'zxdbcy',
                meta: {
                  title: '传阅',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/circularizeHandle.vue'], resolve),
              }
            ]
          },
        ],
      },
      {
        path: '/secretary/partyMemLeavRep',
        name: 'partyMemLeavRep',
        redirect: '/secretary/partyMemLeavRep/newProj',
        meta: {
          title: "党委成员离京报告",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/secretary/partyMemLeavRep/newProj',
            name: 'newProj',
            meta: {
              title: "查看",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/partyMemLeavRep/newProj/index.vue'], resolve),
          },
          {
            path: '/secretary/partyMemLeavRep/search',
            name: 'search',
            meta: {
              title: "查询",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/partyMemLeavRep/search/index.vue'], resolve),
          },
          {
            path: '/secretary/partyMemLeavRep/statistic',
            name: 'memLeavRepStatistic',
            meta: {
              title: '统计',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/partyMemLeavRep/statistic/index.vue'], resolve),
          },
          {
            path: '/secretary/partyMemLeavRep/memLeavRepAdminWork',
            name: 'memLeavRepAdminWork',
            meta: {
              title: '管理员查看',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/partyMemLeavRep/admin/index.vue'], resolve),
          }
        ]
      },
      {
        path: '/secretary/leaderWritten',
        name: 'leaderWtitten',
        redirect: '/secretary/leaderActivity/electronicRegistration',
        meta: {
          title: "领导批示登记",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/secretary/leaderActivity/electronicRegistration',
            name: 'electronicRegistration',
            meta: {
              title: "电子登记",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/leaderWtitten/electronicRegistration.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/materialRegistration',
            name: 'materialRegistration',
            meta: {
              title: "登记实物",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/leaderWtitten/materialRegistration.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/query',
            name: 'query',
            meta: {
              title: "查询",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/leaderWtitten/query.vue'], resolve),
          },
          {
            path: '/LcheckDetail',
            name: 'LcheckDetail',
            meta: {
              title: '参数'
            },
            component: resolve => require(['views/secretary/leaderWtitten/checkDetail.vue'], resolve),
          },
          {
            path: '/secretary/leaderActivity/paramMatain',
            name: 'paramMatain',
            meta: {
              title: "参数维护",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/leaderWtitten/paramMatain.vue'], resolve),
            children: [
              //   {
              //   path: '/approval/parameter/base/checkDetail',
              //   name: 'baseAdd',
              //   meta: {
              //     title: '新增'
              //   },
              //   component: resolve => require(['views/approval/parameter/base/checkDetail.vue'], resolve),
              // },
              // {
              //   path: '/approval/parameter/base/save',
              //   name: 'baseSave',
              //   meta: {
              //     title: '保存'
              //   },
              //   component: resolve => require(['views/approval/parameter/base/save.vue'], resolve),
              // },
              // {
              //   path: '/approval/parameter/base/check',
              //   name: 'baseCheck',
              //   meta: {
              //     title: '查看'
              //   },
              //   component: resolve => require(['views/approval/parameter/base/check.vue'], resolve),
              // },


            ]
          }
        ]
      },
      {
        path: '/secretary/datumManage',
        name: 'datumManage',
        redirect: '/secretary/datumManage/index',
        meta: {
          title: "领导活动资料管理",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/secretary/datumManage/index',
            name: 'datumManage_index',
            meta: {
              title: "领导活动资料管理",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/datumManage/index.vue'], resolve),
          },

          {
            path: '/secretary/datumManage/searchManage',
            name: 'searchManage',
            meta: {
              title: "查询",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/datumManage/searchManage.vue'], resolve),
          },
          {
            path: '/secretary/datumManage/viewManage',
            name: 'viewManage',
            meta: {
              title: "管理员查看",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/datumManage/viewManage.vue'], resolve),
          },
          {
            path: '/secretary/argument',
            name: 'argument',
            redirect: '/secretary/argument/activityType',
            meta: {
              title: "参数维护",
              needLogin: false,
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            children: [{
                path: '/secretary/argument/activityType',
                name: 'activityType',
                meta: {
                  title: "活动类型配置",
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/argument/activityType.vue'], resolve),
              },
              {
                path: '/secretary/argument/activityTypeDetail',
                name: 'activityTypeDetail',
                meta: {
                  title: "活动类型配置",
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/argument/activityTypeDetail.vue'], resolve),
              },
              {
                path: '/secretary/argument/FTPconfig',
                name: 'FTPconfig',
                meta: {
                  title: "FTP配置",
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/argument/FTPconfig.vue'], resolve),
              }
            ]
          },
        ]
      },
      {
        path: '/secretary/dutyRoster',
        name: 'dutyRoster',
        redirect: '/secretary/dutyRoster/dutyTable',
        meta: {
          title: "值班表报送",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/secretary/dutyRoster/dutyFormwork',
            name: 'dutyFormwork',
            meta: {
              title: "值班表报送",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/dutyRoster/dutyFormwork.vue'], resolve),
          },
          {
            path: '/secretary/dutyRoster/dutyFormworkDetail',
            name: 'dutyFormworkDetail',
            meta: {
              title: "值班表报送详情",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/dutyRoster/dutyFormworkDetail.vue'], resolve),
          },
          {
            path: '/secretary/dutyRoster/dutyTable',
            name: 'dutyTable',
            meta: {
              title: "值班表报送查看",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/dutyRoster/dutyTable.vue'], resolve),
          },
          {
            path: '/secretary/dutyRoster/submission',
            name: 'submission',
            meta: {
              title: '值班表单模板维护',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/dutyRoster/submission.vue'], resolve),
          },
        ]
      },
      {
        path: '/secretary/adressBook',
        name: 'adressBook',
        redirect: '/secretary/adressBook/adressTable',
        meta: {
          title: "通讯录报送",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/secretary/adressBook/adressFormwork',
            name: 'adressFormwork',
            meta: {
              title: "通讯录报送",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adressBook/adressFormwork.vue'], resolve),
          },
          {
            path: '/secretary/adressBook/adressFormworkDetail',
            name: 'adressFormworkDetail',
            meta: {
              title: "通讯录报送详情",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adressBook/adressFormworkDetail.vue'], resolve),
          },
          {
            path: '/secretary/adressBook/adressTable',
            name: 'adressTable',
            meta: {
              title: "通讯录报送查看",
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adressBook/adressTable.vue'], resolve),
          },
          {
            path: '/secretary/adressBook/submission',
            name: 'submission',
            meta: {
              title: '通讯录模板维护',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adressBook/submission.vue'], resolve),
          },
        ]
      },
      {
        path: '/secretary/linkman',
        name: 'linkman',
        redirect: '/secretary/linkman/LookLinkMan',
        meta: {
          title: "联系人报送",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/secretary/linkman/linkForm',
            name: 'linkForm',
            meta: {
              title: '新建',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/linkman/linkForm.vue'], resolve),
          },
          {
            path: '/secretary/linkman/LookLinkMan',
            name: 'LookLinkMan',
            meta: {
              title: '查看',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/linkman/LookLinkMan.vue'], resolve),
          },
          {
            path: '/secretary/linkman/queryLinkMan',
            name: 'queryLinkMan',
            meta: {
              title: '查询',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/linkman/queryLinkMan.vue'], resolve),
          },
        ]
      },
      {
        path: '/secretary/linkman/linkForm',
        name: 'linkForm',
        meta: {
          title: "联系人报送单",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/linkman/linkForm.vue'], resolve)
      },
      {
        path: '/bianhan/phoneForm',
        name: 'phoneForm',
        redirect: '/bianhan/phoneForm/phoneNoteList',
        meta: {
          title: "电话记录单",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/bianhan/phoneForm/phoneNoteList',
            name: 'phoneNoteList',
            meta: {
              title: '电话记录单',
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/phoneForm/phoneNoteList.vue'], resolve),
          },
          {
            path: '/bianhan/phoneForm/phoneHandleList',
            name: 'phoneHandleList',
            meta: {
              title: '电话办理单',
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/phoneForm/phoneHandleList.vue'], resolve),
          },
          {
            path: '/secretary/phoneForm/searchPhone',
            name: 'searchPhone',
            meta: {
              title: '查询',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/phoneForm/searchPhone.vue'], resolve),
          },
          {
            path: '/secretary/phoneForm/statistics',
            name: 'statistics',
            meta: {
              title: '统计',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/phoneForm/statistics.vue'], resolve),
          },
          {
            path: '/bianhan/phoneForm/searchParameter',
            name: 'searchParameter',
            meta: {
              title: '参数维护',
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/phoneForm/searchParameter.vue'], resolve),
          },
          {
            path: '/bianhan/phoneForm/paramsMaintainAdd',
            name: 'paramsMaintainAdd',
            meta: {
              title: '参数维护（新增/编辑）',
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/phoneForm/paramsMaintainAdd.vue'], resolve),
          },
          {
            path: '/bianhan/phoneForm/checkPhoneNote',
            name: 'checkPhoneNote',
            meta: {
              title: '管理员查看',
              needLogin: false,
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            children: [{
                path: '/bianhan/phoneForm/checkPhoneNote',
                name: 'checkPhoneNote',
                meta: {
                  title: '电话记录单',
                  needLogin: false,
                },
                component: resolve => require(['views/bianhan/phoneForm/checkPhoneNote.vue'], resolve),
              },
              {
                path: '/bianhan/phoneForm/checkPhoneHandle',
                name: 'checkPhoneHandle',
                meta: {
                  title: '电话办理单',
                  needLogin: false,
                },
                component: resolve => require(['views/bianhan/phoneForm/checkPhoneHandle.vue'], resolve),
              },
            ]

          },
        ]
      },

      {
        path: '/secretary/fileHabdle',
        name: 'fileHabdle',
        redirect: '/bianhan/searchFile',
        meta: {
          title: "文件处理单",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/bianhan/searchFile',
            name: 'searchFile',
            meta: {
              title: '文件处理单',
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/searchFile.vue'], resolve),
          },
          {
            path: '/bianhan/docHandling/docHandlingList',
            name: 'docHandlingList',
            meta: {
              title: '文件办理单',
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/docHandling/docHandlingList.vue'], resolve),
          },
          {
            path: '/bianhan/',
            name: 'checkFileNote',
            redirect: '/bianhan/checkFileNote',
            meta: {
              title: '管理员查看',
              needLogin: false,
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            children: [{
                path: '/bianhan/checkFileNote',
                name: 'checkFileNote',
                meta: {
                  title: '文件处理单',
                  needLogin: false,
                },
                component: resolve => require(['views/bianhan/checkFileNote.vue'], resolve),
              },
              {
                path: '/bianhan/checkFileHandle',
                name: 'checkFileHandle',
                meta: {
                  title: '文件办理单',
                  needLogin: false,
                },
                component: resolve => require(['views/bianhan/checkFileHandle.vue'], resolve),
              },
            ]

          },
          {
            path: '/bianhan/paramsMatainianAdd',
            name: 'paramsMatainianAdd',
            meta: {
              title: '参数维护新增/编辑',
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/paramsMatainianAdd.vue'], resolve),
          },
          {
            path: '/bianhan/paramsMatainianList',
            name: 'paramsMatainianList',
            meta: {
              title: '参数维护列表',
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/paramsMatainianList.vue'], resolve),
          },
          {
            path: '/bianhan/query',
            name: 'query',
            meta: {
              title: '查询',
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/query.vue'], resolve),
          },

          {
            path: '/secretary/fileHandle/statistics',
            name: 'fileStatistics',
            meta: {
              title: '统计',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/fileHandle/statistics.vue'], resolve),
          },
        ]
      },
      {
        path: '/secretary/dutyTrends',
        name: 'dutyTrends',
        redirect: '/secretary/dutyTrends/infoSend/index',
        meta: {
          title: "值班动态",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/secretary/dutyTrends/infoSend/index',
            name: 'dutyTrendInfoSend',
            meta: {
              title: '信息报送',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/dutyTrends/index.vue'], resolve),
          },
          //信息采编
          {
            path: '/secretary/dutyTrends/infoEdit',
            name: 'dutyTrendsInfoEdit',
            meta: {
              title: '信息采编',
              needLogin: false,
            },
            // component: resolve => require(['views/secretary/dutyTrends/infoEdit/infoEdit.vue'], resolve),
            component: resolve => require(['components/layout/empty.vue'], resolve),

            children: [

              {
                path: '/secretary/dutyTrends/infoEdit/infoEdit',
                name: 'dutyTrendsIternativeManuscript',
                meta: {
                  title: '备选稿件',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/infoEdit/infoEdit.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/infoEdit/Edit',
                name: 'submitColumnb',
                meta: {
                  title: '编辑稿件',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/infoEdit/Edit.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/infoEdit/chengKan',
                name: 'submitColumnc',
                meta: {
                  title: '成刊稿件',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/infoEdit/chengKan.vue'], resolve),
              },
            ]
          },
          //错情通知
          {
            path: '/secretary/dutyTrends/cqNotice/index',
            name: 'dutyTrendsErrorSituationIndex',
            meta: {
              title: '错情通知',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/dutyTrends/cqNotice/index.vue'], resolve),
          },

          //信息发布
          {
            path: '/secretary/dutyTrends/release',
            name: 'submitColumne',
            meta: {
              title: '信息发布',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/dutyTrends/release/index.vue'], resolve),
            children: [

              {
                path: '/secretary/dutyTrends/release/index',
                name: 'dutyTrendsReleaseIndex',
                meta: {
                  title: '信息发布',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/release/index.vue'], resolve),
              },



            ]
          },


          {
            path: '/secretary/dutyTrends/params',
            meta: {
              title: '参数维护',
              needLogin: false,
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            children: [{
                path: '/secretary/dutyTrends/params/submitColumn',
                name: 'submitColumn',
                meta: {
                  title: '投稿栏目配置',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/submitColumn/index.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/submitColumn/add',
                name: 'add',
                meta: {
                  title: '新增',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/submitColumn/add/add.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/model/add',
                name: 'add',
                meta: {
                  title: '新增',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/model/add/add.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/reportEdit/add',
                name: 'add',
                meta: {
                  title: '新增',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/reportEdit/add/add.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/submitColumn/addDefault',
                name: 'addDefault',
                meta: {
                  title: '新增',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/submitColumn/addDefault/addDefault.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/activityType',
                name: 'activityType',
                meta: {
                  title: '活动类别配置',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/activityType/index.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/activityType/add',
                name: 'add',
                meta: {
                  title: '新增',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/activityType/add/add.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/receivePerson',
                name: 'receivePerson',
                meta: {
                  title: '接收人员配置',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/receivePerson/index.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/receivePerson/add',
                name: 'add',
                meta: {
                  title: '新增',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/receivePerson/add/add.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/receivePerson/check',
                name: 'check',
                meta: {
                  title: '查看',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/receivePerson/add/add.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/submitDate',
                name: 'receivePerson',
                meta: {
                  title: '投稿相关配置',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/submitDate/index.vue'], resolve)
              },
              {
                path: '/secretary/dutyTrends/params/reportEdit',
                name: 'reportEdit',
                meta: {
                  title: '刊物编辑人配置',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/reportEdit/index.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/publishLimit',
                name: 'publishLimit',
                meta: {
                  title: '发布范围配置',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/publishLimit/index.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/publishLimit/add',
                name: 'add',
                meta: {
                  title: '新增',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/publishLimit/add/add.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/model',
                name: 'model',
                meta: {
                  title: '模板配置',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/model/index.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/submitDate/add',
                name: 'add',
                meta: {
                  title: '新增',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/submitDate/add/add.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/params/submitDate/check',
                name: 'check',
                meta: {
                  title: '查看',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/submitDate/add/add.vue'], resolve),
              }
            ]
          },
          {
            path: '/secretary/dutyTrends/managerCheck',
            meta: {
              title: '管理员查看',
              needLogin: false,
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            children: [{
                path: '/secretary/dutyTrends/managerCheck/infoSend',
                name: 'managerCheckInfoSend',
                meta: {
                  title: '信息报送',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/managerCheck/infoSend/index.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/managerCheck/article',
                name: 'managerCheckArticle',
                meta: {
                  title: '成刊稿件',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/managerCheck/article/index.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/managerCheck/errorInfoNotice',
                name: 'managerCheckErrorInfoNotice',
                meta: {
                  title: '错情通知',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/managerCheck/errorInfoNotice/index.vue'], resolve),
              },
              {
                path: '/secretary/dutyTrends/managerCheck/publicInfo',
                name: 'managerCheckPublicInfo',
                meta: {
                  title: '发布信息',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/dutyTrends/managerCheck/publicInfo/index.vue'], resolve),
              }
            ]
          },
          {
            path: '/secretary/dutyTrends/statistics/activity',
            name: 'statistics_activity',
            meta: {
              title: '按活动类型统计',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/dutyTrends/statistics/activity.vue'], resolve),
          },
          {
            path: '/secretary/dutyTrends/statistics/contribute',
            name: 'statistics_contribute',
            meta: {
              title: '按投稿栏目统计',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/dutyTrends/statistics/contribute.vue'], resolve),
          },
          {
            path: '/secretary/dutyTrends/statistics/emotion',
            name: 'statistics_emotion',
            meta: {
              title: '错情统计',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/dutyTrends/statistics/emotion.vue'], resolve),
          },
          {
            path: '/secretary/dutyTrends/search',
            name: 'dutyTrendsSearch',
            meta: {
              title: '查询',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/dutyTrends/search/search.vue'], resolve),
          },
        ]
      },

      {
        path: '/secretary/adminDuty',
        name: 'adminDuty',
        redirect: '/secretary/adminDuty/dutySchedule',
        meta: {
          title: "行政值班",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/secretary/adminDuty/dutySchedule',
            name: 'dutySchedule',
            meta: {
              title: '周期值班表',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adminDuty/dutySchedule.vue'], resolve),
          }, {
            path: '/secretary/adminDuty/dutySummary',
            name: 'dutySummary',
            meta: {
              title: '周期值班汇总表',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adminDuty/dutySummary.vue'], resolve),
          }, {
            path: '/secretary/adminDuty/dutyNotice/dutyNoticeform',
            name: 'dutyNoticeform',
            meta: {
              title: '值班通知单',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adminDuty/dutyNotice/dutyNoticeform.vue'], resolve)
          }, {
            path: '/secretary/adminDuty/dutyNotice/dutyNoticeDetail',
            name: 'dutyNoticeDetail',
            meta: {
              title: '值班通知单详情',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adminDuty/dutyNotice/dutyNoticeDetail.vue'], resolve)
          }, {
            path: '/secretary/adminDuty/dutyNotice/detailedList',
            name: 'detailedList',
            meta: {
              title: '详细单',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adminDuty/dutyNotice/detailedList.vue'], resolve)
          },
          {
            path: '/secretary/adminDuty/statistics/statisticsResult',
            name: 'statisticsResult',
            meta: {
              title: '值班统计',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adminDuty/statistics/statisticsResult.vue'], resolve)
          },




          {
            path: '/secretary/adminDuty/statistics/statisticsResultOne',
            name: 'statisticsResultOne',
            meta: {
              title: '值班统计结果',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adminDuty/statistics/statisticsResultOne.vue'], resolve)
          },
          {
            path: '/secretary/adminDuty/statistics/statisticsResultTwo',
            name: 'statisticsResultTwo',
            meta: {
              title: '值班统计结果2',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adminDuty/statistics/statisticsResultTwo.vue'], resolve)
          },
          {
            path: '/secretary/adminDuty/statistics/statisticsResultThree',
            name: 'statisticsResultThree',
            meta: {
              title: '值班统计结果3',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adminDuty/statistics/statisticsResultThree.vue'], resolve)
          },
          {
            path: '/secretary/adminDuty/statistics/statisticsResultFour',
            name: 'statisticsResultFour',
            meta: {
              title: '值班统计结果4',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/adminDuty/statistics/statisticsResultFour.vue'], resolve)
          }, {
            path: '/secretary/adminDuty/maintain',
            name: 'maintain',
            redirect: '/secretary/adminDuty/maintain/personnel',
            meta: {
              title: '参数维护',
              needLogin: false,
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            children: [{
                path: '/secretary/adminDuty/maintain/personnel',
                name: 'personnel',
                meta: {
                  title: '值班人员管理',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/adminDuty/maintain/personnel.vue'], resolve)
              },


              {
                path: '/secretary/dutyWork/addPersonnel',
                name: 'addPersonnel',
                meta: {
                  title: '值班人员新增',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/adminDuty/maintain/addPersonnel.vue'], resolve)
              },



              {
                path: '/secretary/adminDuty/maintain/weekdaysNotice',
                name: 'weekdaysNotice',
                meta: {
                  title: '工作日及周末值班须知',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/adminDuty/maintain/weekdaysNotice.vue'], resolve)
              },
              {
                path: '/secretary/adminDuty/maintain/holidayNotice',
                name: 'holidayNotice',
                meta: {
                  title: '节假日值班须知',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/adminDuty/maintain/holidayNotice.vue'], resolve)
              }
            ]
          }, {
            path: '/secretary/adminDuty/adminView',
            name: 'adminView',
            redirect: '/secretary/adminDuty/adminView/periodictable',
            meta: {
              title: '管理员查看',
              needLogin: false,
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            children: [{
              path: '/secretary/adminDuty/adminView/periodictable',
              name: 'periodictable',
              meta: {
                title: '周期值班表',
                needLogin: false,
              },
              component: resolve => require(['views/secretary/adminDuty/adminView/periodictable.vue'], resolve)
            }, {
              path: '/secretary/adminDuty/adminView/periodictotaltable',
              name: 'periodictotaltable',
              meta: {
                title: '周期值班汇总表',
                needLogin: false,
              },
              component: resolve => require(['views/secretary/adminDuty/adminView/periodictotaltable.vue'], resolve)
            }, {
              path: '/secretary/adminDuty/adminView/notice',
              name: 'periodictotaltableNotice',
              meta: {
                title: '值班通知单',
                needLogin: false,
              },
              component: resolve => require(['views/secretary/adminDuty/adminView/notice.vue'], resolve)
            }]
          }
        ]
      },
      {
        path: '/secretary/superviseOffice',
        name: 'superviseEffic',
        redirect: '/secretary/superviseOffice/instructions',
        meta: {
          title: "督办公文办理效率",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/superviseOffice/index.vue'], resolve),
        children: [{
            path: '/secretary/superviseOffice/instructions',
            name: 'requestItem',
            meta: {
              title: '请示事项',
              needLogin: false,
            },
            redirect: '/secretary/superviseOffice/instructions/loadPage',
            component: resolve => require(['views/secretary/superviseOffice/index.vue'], resolve),
            children: [{
                path: '/secretary/superviseOffice/instructions/loadPage',
                name: 'loadPage',
                meta: {
                  title: '加载',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/superviseOffice/instructions/loadPage.vue'], resolve)
              },
              {
                path: '/secretary/superviseOffice/instructions/viewPage',
                name: 'viewPage',
                meta: {
                  title: '查看',
                  needLogin: false,

                },
                component: resolve => require(['views/secretary/superviseOffice/instructions/viewPage.vue'], resolve)
              },
              {
                path: '/secretary/superviseOffice/instructions/statisticsPage',
                name: 'statisticsPage',
                meta: {
                  title: '统计',
                  needLogin: false,
                },
                component: resolve => require(['views/secretary/superviseOffice/instructions/statisticsPage.vue'], resolve)
              }
            ]
          },
          {

            path: '/secretary/superviseOffice/maintenance',
            name: 'maintenance',
            meta: {
              title: '参数维护',
              needLogin: false,

            },
            component: resolve => require(['views/secretary/superviseOffice/maintenance/information.vue'], resolve),
            children: [{
                path: '/secretary/superviseOffice/maintenance/information',
                name: 'information',
                meta: {
                  title: '部门信息配置',
                  needLogin: false,

                },
                component: resolve => require(['views/secretary/superviseOffice/maintenance/information.vue'], resolve)
              },

            ]
          }

        ]
      },
      {
        path: '/secretary/approvalStatistics',
        name: 'approvalStatistics',
        redirect: '/secretary/approvalStatistics/record',
        meta: {
          title: "主要负责人请假备案信息",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [
          {
            path: '/secretary/approvalStatistics/record',
            name: 'record',
            meta: {
              title: '备案情况',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/approvalStatistics/record.vue'], resolve),
          },
          {
            path: '/secretary/approvalStatistics/reminder',
            name: 'reminder',
            meta: {
              title: '流程衔接合规提示',
              needLogin: false,
        
            },
            component: resolve => require(['views/secretary/approvalStatistics/reminder.vue'], resolve),
          }
        ]
      },
    ]
  },
  {
    path: '/secretary/specialSuper/draftSingle',
    name: 'draftSingle',
    meta: {
      title: '专项督查办单',
      showTopMenu: true
    },
    component: resolve => require(['views/secretary/specialSuper/draftSingle/draftSingle.vue'], resolve)
  },
  {
    path: '/secretary/specialSuper/draftBatch',
    name: 'draftBatch',
    meta: {
      title: '专项督查办单',
      showTopMenu: true
    },
    component: resolve => require(['views/secretary/specialSuper/draftBatch/draftBatch.vue'], resolve)
  },
  {
    path: '/sendHandle',
    name: 'dutyTrendsSendHandle',
    meta: {
      title: '报送处理单',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/dutyTrends/infoSend/sendHandle.vue'], resolve),
  },
  {
    path: '/sendHandleDone',
    name: 'dutyTrendsSendHandlDone',
    meta: {
      title: '报送处理单',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/dutyTrends/infoSend/sendHandleDone.vue'], resolve),
  },
  {
    path: '/formNotice',
    name: 'dutyTrendsErrorSituationFormNotice',
    meta: {
      title: '信息报错单',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/dutyTrends/cqNotice/formNotice.vue'], resolve),
  },
  {
    path: '/secretary/dutyTrends/release/detail',
    name: 'dutyTrendsReleaseDetail',
    meta: {
      title: '信息发布-详情',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/dutyTrends/release/detail.vue'], resolve),
  },
  {
    path: '/dealForm',
    name: 'errorInfoDealForm',
    meta: {
      title: '处理单',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/dutyTrends/cqNotice/dealForm.vue'], resolve),
  },
  {
    path: '/infoEditDetail',
    name: 'mamuscriptInfoEditDetail',
    meta: {
      title: '处理单',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/dutyTrends/infoEdit/infoEditDetail.vue'], resolve),
  },
  {
    path: '/chengkanDetail',
    name: 'chengkanDetail',
    meta: {
      title: '处理单',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/dutyTrends/infoEdit/chengkanDetail.vue'], resolve),
  },
  {
    path: '/chengkanDetailDone',
    name: 'chengkanDetailDone',
    meta: {
      title: '已办处理单',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/dutyTrends/infoEdit/chengkanDetailDone.vue'], resolve),
  },
  {
    path: '/batchSuperviseAdd',
    name: 'BatchSuperviseAdd',
    meta: {
      title: '起草批量督察办',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/batchSuperviseAdd.vue'], resolve),
  },
  {
    path: '/batchSuperviseAddBJYB',
    name: 'batchSuperviseAddBJYB',
    meta: {
      title: '批量督察办只读',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/batchSuperviseAddBJYB.vue'], resolve),
  },
  {
    path: '/batchSuperviseAddBJYBCopy',
    name: 'batchSuperviseAddBJYBCopy',
    meta: {
      title: '批量督察办只读',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/batchSuperviseAddBJYBCopy.vue'], resolve),
  },
  {
    path: '/singleSuperviseHandleAdd',
    name: 'SingleSuperviseHandleAdd',
    meta: {
      title: '起草单项督察办',
      keepAlive: true,
      needLogin: false
    },
    //component: resolve => require(['views/receive/receiveDispatch'], resolve)
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/singleSuperviseHandleAdd.vue'], resolve),
  },
  {
    path: '/cyDetail',
    name: 'cyDetail',
    meta: {
      title: '管理员传阅查看',
      keepAlive: true,
      needLogin: false
    },
    //component: resolve => require(['views/receive/receiveDispatch'], resolve)
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/cyDetail.vue'], resolve),
  },
  {
    path: '/singleSuperviseHandleBJYB',
    name: 'singleSuperviseHandleBJYB',
    meta: {
      title: '单项督察办只读',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/singleSuperviseHandleBJYB.vue'], resolve),
  },
  {
    path: '/singleSuperviseHandleBJYBCopy',
    name: 'singleSuperviseHandleBJYBCopy',
    meta: {
      title: '单项督察办只读',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/singleSuperviseHandleBJYBCopy.vue'], resolve),
  },
  {
    path: '/jointlyDetail',
    name: 'JointlyDetail',
    meta: {
      title: '督办协办单',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/jointlyDetail.vue'], resolve),
  },
  {
    path: '/jointlyDetailCopy',
    name: 'jointlyDetailCopy',
    meta: {
      title: '督办协办单',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/jointlyDetailCopy.vue'], resolve),
  },
  {
    path: '/circularizeDetail',
    name: 'CircularizeDetail',
    meta: {
      title: '督办传阅单',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/circularizeDetail.vue'], resolve),
  },
  {
    path: '/undertakeDetail',
    name: 'UndertakeDetail',
    meta: {
      title: '督办承办单',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/undertakeDetail.vue'], resolve),
  },
  {
    path: '/undertakeDetailCopy',
    name: 'undertakeDetailCopy',
    meta: {
      title: '督办承办单',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/superviseHandleChildren/undertakeDetailCopy.vue'], resolve),
  },
  {
    path: '/singlecld',
    name: 'singlecld',
    meta: {
      title: '单项督察办打印单',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/print/singlecld.vue'], resolve),
  },
  {
    path: '/batchcld',
    name: 'batchcld',
    meta: {
      title: '批量督察办打印单',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/print/batchcld.vue'], resolve),
  },
  {
    path: '/undertakecld',
    name: 'undertakecld',
    meta: {
      title: '承办打印单',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/print/undertakecld.vue'], resolve),
  },
  {
    path: '/xiebancld',
    name: 'xiebancld',
    meta: {
      title: '协办打印单',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/print/xiebancld.vue'], resolve),
  }, {
    path: '/dbcycld',
    name: 'dbcycld',
    meta: {
      title: '传阅打印单',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/superviseHandle/print/dbcycld.vue'], resolve),
  },
  {
    path: '/detailss',
    name: 'detailss',
    component: resolve => require(['views/secretary/fileHandle/detail.vue'], resolve),
  },
  {
    path: '/printdetail',
    name: 'printdetail',
    component: resolve => require(['views/secretary/fileHandle/printdetail.vue'], resolve),
  },
  {
    path: '/printFormDetail',
    name: 'printFormDetail',
    component: resolve => require(['views/bianhan/phoneForm/printFormDetail.vue'], resolve),
  },
  {
    path: '/registerTable',
    name: 'registerTable',
    component: resolve => require(['views/secretary/leaderWtitten/registerTable.vue'], resolve),
  },
  // 电子登记详情
  {
    path: '/electronicTable',
    name: 'electronicTable',
    component: resolve => require(['views/secretary/leaderWtitten/electronicTable.vue'], resolve),
  },
  {
    path: '/registerTableDone',
    name: 'registerTable',
    component: resolve => require(['views/secretary/leaderWtitten/registerTableDone.vue'], resolve),
  },
  {
    path: '/activityManage',
    name: 'activityManage',
    component: resolve => require(['views/secretary/datumManage/activityManage.vue'], resolve),
  },
  {
    path: '/secretary/dutyTrends/search/searchDtail',
    name: 'dutyTrendsSearchDetail',
    meta: {
      title: '查询详情',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/dutyTrends/search/searchDtail.vue'], resolve),
  },
  {
    path: '/secretary/dutyTrends/search/searchDtail1',
    name: 'dutyTrendsSearchDetail1',
    meta: {
      title: '查询详情',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/dutyTrends/search/searchDtail1.vue'], resolve),
  },
  {
    path: '/secretary/approvalStatistics/record',
    name: 'record',
    meta: {
      title: '备案情况',
      needLogin: false,
    },
    component: resolve => require(['views/secretary/approvalStatistics/record.vue'], resolve),
  },
  {
    path: '/secretary/approvalStatistics/reminder',
    name: 'reminder',
    meta: {
      title: '流程衔接合规提示',
      needLogin: false,

    },
    component: resolve => require(['views/secretary/approvalStatistics/reminder.vue'], resolve),
  }
]

export default routers;
