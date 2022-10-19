const routers = [
  {
      path: '/teamdayLog',
      name: 'teamDayLog',
      meta: {
          title: '团队资料',
          keepAlive: true,
          needLogin: false
      },
      component: resolve => require(['views/team/teamManagement/dayLog'], resolve)
  },
  {
    path: '/teammonLog',
    name: 'teamMonLog',
    meta: {
      title: '团队资料',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/team/teamManagement/monLog'], resolve)
  },
  {
    path: '/teamweekLog',
    name: 'teamWeekLog',
    meta: {
      title: '团队资料',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/team/teamManagement/weekLog'], resolve)
  },
  {
    path: '/teammeetLog',
    name: 'teamMeetLog',
    meta: {
      title: '团队资料',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/team/teamManagement/meetLog'], resolve)
  },
  {
    path: '/team',
    name: 'Team',
    meta: {
      title: '柔性团队',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/team/index'], resolve), // 这里利用父页面来进行渲染
    redirect: '/teamManagement', // 重定向注意层级关系
    children: [{
        path: '/teamManagement',
        name: 'TeamManagement',
        meta: {
          title: '团队管理',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/team/teamManagement'], resolve),
        redirect: '/myTeam',
        children: [{
            path: '/myTeam',
            name: 'MyTeam',
            meta: {
              title: '我的团队',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/team/teamManagement/myTeam'], resolve)
          },
          // {
          //     path: '/teamNotice',
          //     name: 'TeamNotice',
          //     meta: {
          //         title: '团队公告',
          //         keepAlive: true,
          //         needLogin: false  
          //     },
          //     component: resolve => require(['views/team/teamManagement/teamNotice.vue'], resolve)
          // },
          {
            path: '/teamFile',
            name: 'TeamFile',
            meta: {
              title: '团队档案',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/team/teamManagement/teamFile'], resolve)
          },
          {
            path: '/adminManagement',
            name: 'AdminManagement',
            meta: {
              title: '管理员维护',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/team/teamManagement/adminManagement'], resolve)
          }
        ]
      },
      {
        path: '/taskManagement',
        name: 'TaskManagement',
        meta: {
          title: '任务管理',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/team/taskManagement'], resolve),
        redirect: '/myTask',
        children: [{
            path: '/myTask',
            name: 'myTask',
            meta: {
              title: '我的任务',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/team/taskManagement/myTask'], resolve)
          },
          {
            path: '/workRecord',
            name: 'workRecord',
            meta: {
              title: '工作记录',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/team/taskManagement/workRecord'], resolve)
          },
          {
            path: '/taskLog',
            name: 'taskLog',
            meta: {
              title: '日志',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/team/taskManagement/taskLog'], resolve)
          },
          {
            path: '/taskStatistics',
            name: 'taskStatistics',
            meta: {
              title: '统计',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/team/taskManagement/taskStatistics'], resolve)
          },
          // {
          //   path: '/adminSee',
          //   name: 'AdminSee',
          //   meta: {
          //     title: '管理员查看',
          //     keepAlive: true,
          //     needLogin: false
          //   },
          //   component: resolve => require(['views/team/taskManagement/adminSee'], resolve),
          //   redirect: '/seeTask',
          //   children: [{
          //       path: '/seeTask',
          //       name: 'seeTask',
          //       meta: {
          //         title: '任务',
          //         keepAlive: true,
          //         needLogin: false
          //       },
          //       component: resolve => require(['views/team/taskManagement/adminSee/seeTask'], resolve)
          //     },
          //     {
          //       path: '/seeRecord',
          //       name: 'seeRecord',
          //       meta: {
          //         title: '工作记录',
          //         keepAlive: true,
          //         needLogin: false
          //       },
          //       component: resolve => require(['views/team/taskManagement/adminSee/seeRecord'], resolve)
          //     },
          //     {
          //       path: '/taskStatistics',
          //       name: 'taskStatistics',
          //       meta: {
          //         title: '统计',
          //         keepAlive: true,
          //         needLogin: false
          //       },
          //       component: resolve => require(['views/team/taskManagement/taskStatistics'], resolve)
          //     },
          //     {
          //       path: '/seeLog',
          //       name: 'seeLog',
          //       meta: {
          //         title: '日志',
          //         keepAlive: true,
          //         needLogin: false
          //       },
          //       component: resolve => require(['views/team/taskManagement/adminSee/seeLog'], resolve)
          //     },
          //   ]
          // },
        ]
      }
    ]
  },
  {
    path: '/taskHandle',
    name: 'taskHandle',
    meta: {
      title: '任务办理',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/team/taskManagement/taskHandle'], resolve)
  },
  {
    path: '/addTask',
    name: 'addTask',
    meta: {
      title: '新增任务',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/team/taskManagement/addTask'], resolve)
  },
  {
      path: '/dayLog',
      name: 'dayLog',
      meta: {
          title: '日报',
          keepAlive: true,
          needLogin: false
      },
      component: resolve => require(['views/team/taskManagement/dayLog'], resolve)
  },
  {
    path: '/weekLog',
    name: 'weekLog',
    meta: {
      title: '周报',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/team/taskManagement/weekLog'], resolve)
  },
  {
    path: '/monthLog',
    name: 'monthLog',
    meta: {
      title: '月报',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/team/taskManagement/monthLog'], resolve)
  },
  {
    path: '/mettingLog',
    name: 'mettingLog',
    meta: {
      title: '会议纪要',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/team/taskManagement/mettingLog'], resolve)
  },
  {
    path: '/printLog',
    name: 'PrintLog',
    meta: {
      title: '导出单',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/team/printLog/printLog'], resolve)
  }
]

export default routers
