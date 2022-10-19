const routers = [{
    path: '/secretext',
    name: 'Secretext',
    meta: {
      title: '密文统计',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0',
      needClear: true
    },
    redirect: '/nationSecret',
    component: resolve => require(['views/secretStatistics/secretext'], resolve),
    children: [{
        path: '/nationSecret',
        name: 'NationSecret',
        meta: {
          title: '国家密文事项统计',
          keepAlive: true,
          ccneedLogin: true
        },
        component: resolve => require(['views/secretStatistics/nationSecret'], resolve)
      },
      {
        path: '/secretOperate',
        name: 'SecretOperate',
        meta: {
          title: '操作日志',
          keepAlive: true,
          ccneedLogin: true
        },
        component: resolve => require(['views/secretStatistics/secretOperate'], resolve)
      },
      {
        path: '/remind',
        name: 'Remind',
        meta: {
          title: '密文解密预警提醒配置',
          keepAlive: true,
          ccneedLogin: true
        },
        redirect: '/remindSecret',
        component: resolve => require(['views/secretStatistics/remindSecret'], resolve),
        children: [
          {
            path: '/remindSecret',
            name: 'RemindSecret',
            meta: {
              title: '密文解密预警提醒配置',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/secretStatistics/remindSecret'], resolve)
          }
        ]
      }
    ]
  }
]

export default routers
