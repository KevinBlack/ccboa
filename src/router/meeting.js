/**
 * create by zx on 2020/7/29 10:13
 * 类注释：会议
 * 备注：
 */
const routers = [{
    path: '/meeting',
    redirect: '/meeting/zf',
    name: '',
    meta: {
      title: '会议'
    },
    component: resolve => require(['views/meeting/layout/index.vue'], resolve),
    children: [{
        path: '/meeting/zf',
        name: 'zf',
        meta: {
          title: "制发",
          needLogin: false,
        },
        component: resolve => require(['views/meeting/zf/index.vue'], resolve),
      },
      {
        path: '/meeting/zf/zfOne',
        name: 'zfOne',
        meta: {
          title: "起草",
          needLogin: false,
        },
        component: resolve => require(['views/meeting/zf/zfOne.vue'], resolve),
      },
      {
        path: '/meeting/cbList',
        name: 'cbList',
        meta: {
          title: "承办",
          needLogin: false,
        },
        component: resolve => require(['views/meeting/cb/cbList.vue'], resolve)
      },

      {
        path: '/meeting/cyList',
        name: 'cyList',
        meta: {
          title: "传阅",
          needLogin: false,
        },
        component: resolve => require(['views/meeting/cy/cyList.vue'], resolve)
      },
      {
        path: '/meeting/meetingSearch',
        name: 'meetingSearch',
        meta: {
          title: "查询",
          needLogin: false,
        },
        component: resolve => require(['views/meeting/search/search.vue'], resolve)
      },
      {
        path: '/meeting/statistics',
        name: 'meetingStatistics',
        meta: {
          title: "统计",
          keepAlive: true,
          needLogin: false,
        },
        component: resolve => require(['views/meeting/statistics/statistics.vue'], resolve)
      },
      {
        path: '/meeting/myMeetNotice',
        name: 'myMeetNotice',
        meta: {
          title: "我的会议通知",
          keepAlive: true,
          needLogin: false,
        },
        component: resolve => require(['views/meeting/myMeetNotice/myMeetNotice.vue'], resolve)
      },
      {
        path: '/meeting/myMeetNoticeDetial',
        name: 'myMeetNoticeDetial',
        meta: {
          title: "我的会议通知详情",
          keepAlive: true,
          needLogin: false,
        },
        component: resolve => require(['views/meeting/myMeetNotice/myMeetNoticeDetial.vue'], resolve)
      },
      {
        path: '/meeting/searchResult',
        name: 'searchResult',
        meta: {
          title: "查询结果",
          needLogin: false,
        },
        component: resolve => require(['views/meeting/search/searchResult.vue'], resolve)
      },
      {
        path: '/meeting/yd',
        name: 'yd',
        meta: {
          title: "会议室预订",
          needLogin: false,
        },
        redirect: '/meeting/yd/meetingYd',
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/meeting/yd/meetingYd',
            name: 'meetingYd',
            meta: {
              title: "预订申请",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/yd/meetingYd.vue'], resolve),
          },
          {
            path: '/meeting/yd/myBook',
            name: 'myBook',
            meta: {
              title: "我的预订",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/yd/myBook.vue'], resolve),
          },
          {
            path: '/meeting/yd/historyYd',
            name: 'print',
            meta: {
              title: "历史预订",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/yd/historyYd.vue'], resolve),
          },
          {
            path: '/meeting/yd/query',
            name: 'query',
            meta: {
              title: "预订查询",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/yd/query.vue'], resolve),
          },
          {
            path: '/meeting/yd/approve',
            name: 'approve',
            meta: {
              title: "预订审批",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/yd/approve.vue'], resolve),
          },
          {
            path: '/meeting/yd/meetingPrepare',
            name: 'meetingPrepare',
            meta: {
              title: "会议保障",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/yd/meetingPrepare.vue'], resolve),
          },
          {
            path: '/meeting/yd/statistic',
            name: 'statistic',
            meta: {
              title: "预订统计",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/yd/statistic.vue'], resolve),
          },
          {
            path: '/meeting/yd/meetingManage',
            name: 'meetingManage',
            meta: {
              title: "会议室管理",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/yd/meetingManage.vue'], resolve),
          },
          {
            path: '/meeting/yd/parameter/',
            name: 'parameter',
            meta: {
              title: "参数维护",
              needLogin: false,
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            redirect:'/meeting/yd/parameter/meetingType',
            children: [{
                path: '/meeting/yd/parameter/meetingType',
                name: 'meetingType',
                meta: {
                  title: "会议类型配置",
                  needLogin: false,
                },
                component: resolve => require(['views/meeting/yd/parameter/meetingType.vue'], resolve),
              },
              {
                path: '/meeting/yd/parameter/services',
                name: 'services',
                meta: {
                  title: "服务项目配置",
                  needLogin: false,
                },
                component: resolve => require(['views/meeting/yd/parameter/services.vue'], resolve),
              },
              {
                path: '/meeting/yd/parameter/space',
                name: 'space',
                meta: {
                  title: "空间管理",
                  needLogin: false,
                },
                component: resolve => require(['views/meeting/yd/parameter/space.vue'], resolve),
              }
            ]
          },
          {
            path: '/meeting/yd/managerQuery',
            name: 'managerQuery',
            meta: {
              title: "管理员维护",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/yd/manageYDDetail/managerQuery.vue'], resolve),
          }
        ]
      },
      {
        path: '/meeting/cs',
        name: 'cs',
        meta: {
          title: "参数维护",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/meeting/cs/fk',
            name: 'fk',
            meta: {
              title: "反馈信息设置",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/cs/fk.vue'], resolve),
          },
          // {
          //   path: '/meeting/cs/hy',
          //   name: 'hy',
          //   meta: {
          //     title: "会议系统配置",
          //     needLogin: false,
          //   },
          //   component: resolve => require(['views/meeting/cs/hy.vue'], resolve),
          // },
        ]
      },
      {
        path: '/meeting/admin',
        redirect: '/meeting/admin/adminZf',
        name: 'admin',
        meta: {
          title: "管理员查看",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/meeting/admin/adminZf',
            name: 'adminZf',
            meta: {
              title: "制发",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/admin/adminZf/adminZf.vue'], resolve),
            // children: [{
            //     path: '/meeting/admin/zfLz',
            //     name: 'zfLz',
            //     meta: {
            //       title: "流转",
            //       needLogin: false,
            //     },
            //     component: resolve => require(['views/meeting/admin/adminZf/zfLz.vue'], resolve),
            //   },
            //   {
            //     path: '/meeting/admin/zfBj',
            //     name: 'zfBj',
            //     meta: {
            //       title: "办结",
            //       needLogin: false,
            //     },
            //     component: resolve => require(['views/meeting/admin/adminZf/zfBj.vue'], resolve),

            //   },
            // ]
          },
          {
            path: '/meeting/admin/adminCb',
            name: 'adminCb',
            meta: {
              title: "承办",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/admin/adminCb.vue'], resolve),
          },
          {
            path: '/meeting/admin/adminCy',
            name: 'adminCy',
            meta: {
              title: "传阅",
              needLogin: false,
            },
            component: resolve => require(['views/meeting/admin/adminCy.vue'], resolve),
          },
        ]
      },
    ],
  },
  {
    path: '/meeting/admin/adminZfDetail',
    name: 'adminZfDetail',
    meta: {
      title: "管理员查看制发详情",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/admin/adminZfDetail.vue'], resolve),
  },
  {
    path: '/meeting/admin/adminCyDetail',
    name: 'adminCyDetail',
    meta: {
      title: "管理员查看传阅详情",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/admin/adminCyDetail.vue'], resolve),
  },
  {
    path: '/meeting/admin/adminCbDetail',
    name: 'adminCbDetail',
    meta: {
      title: "管理员查看承办详情",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/admin/adminCbDetail.vue'], resolve),
  },
  {
    path: '/meeting/admin/adminChDetail',
    name: 'adminChDetail',
    meta: {
      title: "管理员查看参会详情",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/admin/adminChDetail.vue'], resolve),
  },
  {
    path: '/meeting/cyDetial',
    name: 'cyDetial',
    meta: {
      title: "传阅详情",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/cy/cyDetial.vue'], resolve)
  },
  {
    path: '/meeting/zf/zfTwo',
    name: 'zfTwo',
    meta: {
      title: "起草详细信息",
      needLogin: false,
      showTopMenu: true
    },
    component: resolve => require(['views/meeting/zf/zfTwo.vue'], resolve),
  },
  {
    path: '/meeting/zf/zfDoneDetail',
    name: 'zfDoneDetail',
    meta: {
      title: "起草已办办结详情",
      needLogin: false,
      showTopMenu: true
    },
    component: resolve => require(['views/meeting/zf/zfDoneDetail.vue'], resolve),
  },

  {
    path: '/meeting/cbDetial',
    name: 'cbDetial',
    meta: {
      title: "承办详情",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/cb/cbDetial.vue'], resolve)
  },

  {
    path: '/meeting/cbDoneDetial',
    name: 'cbDoneDetial',
    meta: {
      title: "承办已办办结详情",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/cb/cbDoneDetial.vue'], resolve)
  },
  {
    path: '/meeting/clookBaoMing',
    name: 'clookBaoMing',
    meta: {
      title: "参会查看报名表",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/cb/clookBaoMing.vue'], resolve)
  },
  {
    path: '/meeting/chDetial',
    name: 'chDetial',
    meta: {
      title: "参会详情",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/cb/chDetial.vue'], resolve)
  },
  {
    path: '/meeting/chDoneDetial',
    name: 'chDoneDetial',
    meta: {
      title: "参会已办办结详情",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/cb/chDoneDetial.vue'], resolve)
  },
  {
    path: '/meeting/searchDetail',
    name: 'searchDetail',
    meta: {
      title: "查询详情",
      needLogin: false,
      showTopMenu: true
    },
    component: resolve => require(['views/meeting/search/searchDetail.vue'], resolve)
  },
  {
    path: '/meeting/yd/blueDetail',
    name: 'blueDetail',
    meta: {
      title: "会议室预订",
      needLogin: false,
      showTopMenu: true,
    },
    component: resolve =>{
      require(['views/meeting/yd/blueDetail.vue'], resolve)
    }
  },
  {
    path: '/meeting/yd/blueDetail1',
    name: 'blueDetail1',
    meta: {
      title: "会议室预订",
      needLogin: false,
      showTopMenu: true,
    },
    component: resolve =>{
      require(['views/meeting/yd/blueDetail1.vue'], resolve)
    }
  },
  {
    path: '/meeting/yd/meetingRoomYDPrint',
    name: 'meetingRoomYDPrint',
    meta: {
      title: "会议室预订打印",
      needLogin: false,
      showTopMenu: true
    },
    component: resolve => require(['views/meeting/yd/print/meetingRoomYDPrint.vue'], resolve)
  },
  {
    path: '/meeting/yd/meetingPrepareDetail',
    name: 'meetingPrepareDetail',
    meta: {
      title: "会议室保障单",
      needLogin: false,
      showTopMenu: true
    },
    component: resolve => require(['views/meeting/yd/meetingPrepareDetail.vue'], resolve)
  },
  {
    path: '/meeting/yd/meetingRoomPrint',
    name: 'meetingRoomPrint',
    meta: {
      title: "会议室保障单打印",
      needLogin: false,
      showTopMenu: true
    },
    component: resolve => require(['views/meeting/yd/print/meetingRoomPrint.vue'], resolve)
  },
  {
    path: '/meeting/yd/meetingRoom',
    name: 'meetingRoom',
    meta: {
      title: "会议室管理",
      needLogin: false,
      showTopMenu: true
    },
    component: resolve => require(['views/meeting/yd/meetingRoom.vue'], resolve)
  },
  {
    path: '/meeting/yd/managerPrint',
    name: 'managerPrint',
    meta: {
      title: "管理员维护打印页面",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/yd/print/managerPrint.vue'], resolve),
  },
  {
    path: '/meeting/yd/managerBlueDetail',
    name: 'managerBlueDetail',
    meta: {
      title: "管理员查看页面",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/yd/manageYDDetail/managerBlueDetail.vue'], resolve),
  },
  {
    path: '/meeting/yd/maintenance',
    name: 'maintenance',
    meta: {
      title: "管理员维护页面",
      needLogin: false,
    },
    component: resolve => require(['views/meeting/yd/manageYDDetail/maintenance.vue'], resolve),
  },
  // 新建
  {
    path: '/meeting/cs/fkAdd',
    name: 'fkAdd',
    meta: {
      title: "反馈信息设置新建",
      needLogin: false,
      showTopMenu: true
    },
    component: resolve => require(['views/meeting/cs/fkAdd.vue'], resolve)
  },
  {
    path: '/meeting/cs/fkDetail',
    name: 'fkDetail',
    meta: {
      title: "反馈信息设置",
      needLogin: false,
      showTopMenu: true
    },
    component: resolve => require(['views/meeting/cs/fkDetail.vue'], resolve)
  },
  // {
  //   path: '/meeting/cs/hyDetail',
  //   name: 'hyDetail',
  //   meta: {
  //     title: "会议系统配置",
  //     needLogin: false,
  //     showTopMenu: true
  //   },
  //   component: resolve => require(['views/meeting/cs/hyDetail.vue'], resolve)
  // },
  // {
  //   path: '/meeting/cs/hyAdd',
  //   name: 'hyAdd',
  //   meta: {
  //     title: "会议系统配置新建",
  //     needLogin: false,
  //     showTopMenu: true
  //   },
  //   component: resolve => require(['views/meeting/cs/hyAdd.vue'], resolve)
  // },
  // {
  //   path: '/meeting/admin/adminZf/lzDetail',
  //   name: 'lzDetail',
  //   meta: {
  //     title: "流转详情",
  //     needLogin: false,
  //     showTopMenu: true
  //   },
  //   component: resolve => require(['views/meeting/admin/adminZf/lzDetail.vue'], resolve)
  // },
  // {
  //   path: '/meeting/admin/adminZf/bjDetail',
  //   name: 'bjDetail',
  //   meta: {
  //     title: "办结详情",
  //     needLogin: false,
  //     showTopMenu: true
  //   },
  //   component: resolve => require(['views/meeting/admin/adminZf/bjDetail.vue'], resolve)
  // },
  // {
  //   path: '/meeting/cs/hyEdit',
  //   name: 'hyEdit',
  //   meta: {
  //     title: "会议系统配置",
  //     needLogin: false,
  //     showTopMenu: true
  //   },
  //   component: resolve => require(['views/meeting/cs/hyEdit.vue'], resolve)
  // },
  // {
  //   path: '/meeting/cs/fkEdit',
  //   name: 'fkEdit',
  //   meta: {
  //     title: "会议系统配置",
  //     needLogin: false,
  //     showTopMenu: true
  //   },
  //   component: resolve => require(['views/meeting/cs/fkEdit.vue'], resolve)
  // },

]


export default routers
