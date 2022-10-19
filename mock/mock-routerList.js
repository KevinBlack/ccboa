const List = [{
  path: '/index',
  name: 'Index',
  meta: {
    title: '首页',
    keepAlive: true,
    needLogin: true,
    id: '01',
    parentId: '0'
  },
  component: resolve => require(['views/common/index'], resolve),
  redirect: '/Home',
  children: [{
    path: '/todolist',
    name: 'Todolist',
    meta: {
      title: '待办事宜',
      keepAlive: true,
      needLogin: true,
      id: '0101',
      parentId: '01'
    },
    component: resolve => require(['views/common/todolist'], resolve),
  },
  {
    path: '/fileRead',
    name: 'FileRead',
    meta: {
      title: '文件阅览',
      keepAlive: true,
      needLogin: true,
      id: '0102',
      parentId: '01'
    },
    component: resolve => require(['views/common/fileRead'], resolve),
  },
  {
    path: '/bigScreen',
    name: 'bigScreen',
    meta: {
      title: "效能看板",
      keepAlive: true,
      needLogin: true,
      id: '0103',
      parentId: '01',
      target: "_blank",
    },
    redirect: "/effective"
  },
    // {
    //   path: '/paramataint',
    //   name: 'Paramataint',
    //   meta: {
    //     title: '参数维护',
    //     keepAlive: true,
    //     needLogin: true
    //   },
    //   component: resolve => require(['views/common/paramataint'], resolve),
    // },
    // {
    //   path: '/personManage',
    //   name: 'PersonManage',
    //   meta: {
    //     title: '组织机构',
    //     keepAlive: true,
    //     needLogin: true
    //   }
    // },
    // {
    //   path: '/upload',
    //   name: 'upload',
    //   meta: {
    //     title: '上传',
    //     keepAlive: true,
    //     needLogin: false
    //   },
    //   component: resolve => require(['views/user/uploadImg/upload'], resolve)
    // }
  ]
},

{
  path: '/fwgl',
  name: 'Fwgl',
  meta: {
    title: '发文管理',
    keepAlive: true,
    needLogin: true,
    id: '02',
    parentId: '0'
  },
  children: [{
    path: '/dispatchFile',
    name: 'DispatchFile',
    meta: {
      title: '发文',
      keepAlive: true,
      needLogin: false,
      id: '02',
      parentId: '0'
    },
    component: resolve => require(['views/dispatch/dispatchFile'], resolve)
  },
  {
    path: '/countersignature',
    name: 'Countersignature',
    meta: {
      title: '会签',
      keepAlive: true,
      needLogin: true,
      id: '0202',
      parentId: '02'
    },
    component: resolve => require(['views/dispatch/countersignature'], resolve)
  },
  {
    path: '/rexamine',
    name: 'Rexamine',
    meta: {
      title: '重发审批',
      keepAlive: true,
      needLogin: true,
      id: '0203',
      parentId: '02'
    },
    component: resolve => require(['views/dispatch/rexamine.vue'], resolve)
  },
  {
    path: '/reCountersign',
    name: 'ReCountersign',
    meta: {
      title: '重发会签',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/reCountersign.vue'], resolve)
  },
  {
    path: '/tw',
    name: 'Tw',
    meta: {
      title: '退文',
      keepAlive: true,
      needLogin: true,
      id: '0205',
      parentId: '02'
    },
    component: resolve => require(['views/dispatch/tw'], resolve)
  },
  {
    path: '/checkRepeate',
    name: 'CheckRepeate',
    meta: {
      title: '发文查重',
      keepAlive: true,
      needLogin: true,
      id: '0214',
      parentId: '02'
    },
    component: resolve => require(['views/dispatch/checkRepeate'], resolve)
  },
  {
    path: '/qzhs',
    name: 'Qzhs',
    meta: {
      title: '强制收回',
      keepAlive: true,
      needLogin: true,
      id: '0206',
      parentId: '02'
    },
    component: resolve => require(['views/dispatch/qzhs'], resolve)
  },
  {
    path: '/fwgg',
    name: 'Fwgg',
    meta: {
      title: '发文公告',
      keepAlive: true,
      needLogin: true,
      id: '0207',
      parentId: '02'
    },
    component: resolve => require(['views/dispatch/fwgg'], resolve)
  },
  {
    path: '/dispatchQuery',
    name: 'DispatchQuery',
    meta: {
      title: '查询',
      keepAlive: true,
      needLogin: true,
      id: '0208',
      parentId: '02'
    },
    redirect: '/fwcx',
    component: resolve => require(['views/dispatch/dispatchQuery'], resolve),
    children: [{
      path: '/fwcx',
      name: '发文查询',
      meta: {
        title: '发文查询',
        keepAlive: true,
        needLogin: true,
        id: '020801',
        parentId: '0802'
      },
      component: resolve => require(['views/dispatch/dispatchQuery/fwcx'], resolve)
    },
    {
      path: '/fwsh',
      name: '发文收回查询',
      meta: {
        title: '发文收回查询',
        keepAlive: true,
        needLogin: true
      },
      component: resolve => require(['views/dispatch/dispatchQuery/fwsh'], resolve)
    },
    {
      path: '/fwth',
      name: '发文退回查询',
      meta: {
        title: '发文退回查询',
        keepAlive: true,
        needLogin: true
      },
      component: resolve => require(['views/dispatch/dispatchQuery/fwth'], resolve)
    },
    {
      path: '/fwggcx',
      name: '发文公告查询',
      meta: {
        title: '发文公告查询',
        keepAlive: true,
        needLogin: true
      },
      component: resolve => require(['views/dispatch/dispatchQuery/fwgg'], resolve)
    },
    {
      path: '/fwhqsj',
      name: '发文会签办理时间查询',
      meta: {
        title: '发文会签办理时间查询',
        keepAlive: true,
        needLogin: true
      },
      component: resolve => require(['views/dispatch/dispatchQuery/fwhqsj'], resolve)
    },
    {
      path: '/cfwsp',
      name: '重发文审批查询',
      meta: {
        title: '重发文审批查询',
        keepAlive: true,
        needLogin: true
      },
      component: resolve => require(['views/dispatch/dispatchQuery/cfwsp'], resolve)
    },
    {
      path: '/zffw',
      name: '直发发文查询',
      meta: {
        title: '直发发文查询',
        keepAlive: true,
        needLogin: true
      },
      component: resolve => require(['views/dispatch/dispatchQuery/zffw'], resolve)
    },
    {
      path: '/bjfwbl',
      name: '办结发文办理时间查询',
      meta: {
        title: '办结发文办理时间查询',
        keepAlive: true,
        needLogin: true
      },
      component: resolve => require(['views/dispatch/dispatchQuery/bjfwbl'], resolve)
    },
    {
      path: '/fwzscx',
      name: '发文字数超限文件查询',
      meta: {
        title: '发文字数超限文件查询',
        keepAlive: true,
        needLogin: true
      },
      component: resolve => require(['views/dispatch/dispatchQuery/fwzscx'], resolve)
    }
    ]
  },
  {
    path: '/statistics',
    name: 'Statistics',
    meta: {
      title: '统计',
      keepAlive: true,
      needLogin: true,
      active: false,
      id: '0209',
      parentId: '02'
    },
    component: resolve => require(['views/dispatch/statistics'], resolve),
    redirect: '/stcsByType',
    children: [{
      path: '/stcsByType',
      name: 'StcsByType',
      meta: {
        title: '按类型统计',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '020901',
        parentId: '0209'
      },
      component: resolve => require(['views/dispatch/statistics/stcsByType'], resolve)
    },
    {
      path: '/stcsByDpmt',
      name: 'StcsByDpmt',
      meta: {
        title: '按部门统计',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '020901',
        parentId: '0209'
      },
      component: resolve => require(['views/dispatch/statistics/stcsByDpmt'], resolve)
    },
    {
      path: '/stcsByDpmtAndType',
      name: 'StcsByDpmtAndType',
      meta: {
        title: '按部门/类型统计',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '020901',
        parentId: '0209'
      },
      component: resolve => require(['views/dispatch/statistics/stcsByDpmtAndType'], resolve)
    },
    {
      path: '/stcsByDpmtAndTxTp',
      name: 'StcsByDpmtAndTxTp',
      meta: {
        title: '按部门/文种统计',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '020901',
        parentId: '0209'
      },
      component: resolve => require(['views/dispatch/statistics/stcsByDpmtAndTxTp'], resolve)
    },
    // {
    //   path: '/stcsByHedAndDpmt',
    //   name: 'StcsByHedAndDpmt',
    //   meta: {
    //     title: '按代字/部门统计',
    //     keepAlive: true,
    //     needLogin: true,
    //     active: false,
    //     id: '020901',
    //     parentId: '0209'
    //   },
    //   component: resolve => require(['views/dispatch/statistics/stcsByHedAndDpmt'], resolve)
    // },
    {
      path: '/fileRetry',
      name: 'FileRetry',
      meta: {
        title: '公文重发统计',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '020901',
        parentId: '0209'
      },
      component: resolve => require(['views/dispatch/statistics/fileRetry'], resolve)
    },
    {
      path: '/signTime',
      name: 'SignTime',
      meta: {
        title: '发文会签时间统计',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '020901',
        parentId: '0209'
      },
      component: resolve => require(['views/dispatch/statistics/signTime'], resolve)
    },
    {
      path: '/stcsByDirectSend',
      name: 'StcsByDirectSend',
      meta: {
        title: '直发发文统计',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '020901',
        parentId: '0209'
      },
      component: resolve => require(['views/dispatch/statistics/stcsByDirectSend'], resolve)
    },
    // {
    //   path: '/stcsByentSend',
    //   name: 'StcsByentSend',
    //   meta: {
    //     title: '实物发文统计',
    //     keepAlive: true,
    //     needLogin: true,
    //     active: false,
    //     id: '020901',
    //     parentId: '0209'
    //   },
    //   component: resolve => require(['views/dispatch/statistics/stcsByentSend'], resolve)
    // },
    {
      path: '/stcsByBack',
      name: 'StcsByBack',
      meta: {
        title: '发文退回统计',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '020901',
        parentId: '0209'
      },
      component: resolve => require(['views/dispatch/statistics/stcsByBack'], resolve)
    },
    {
      path: '/stcsBySendTime',
      name: 'StcsBySendTime',
      meta: {
        title: '发文办理时间统计',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '020901',
        parentId: '0209'
      },
      component: resolve => require(['views/dispatch/statistics/stcsBySendTime'], resolve)
    },
    // {
    //   path: '/stcsByRcivTime',
    //   name: 'StcsByRcivTime',
    //   meta: {
    //     title: '下级行收文办理时间统计',
    //     keepAlive: true,
    //     needLogin: true,
    //     active: false,
    //     id: '020901',
    //     parentId: '0209'
    //   },
    //   component: resolve => require(['views/dispatch/statistics/stcsByRcivTime'], resolve)
    // },
    {
      path: '/stcsByOpinion',
      name: 'StcsByOpinion',
      meta: {
        title: '发文正文字数情况统计',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '020901',
        parentId: '0209'
      },
      component: resolve => require(['views/dispatch/statistics/stcsByOpinion'], resolve)
    },
    {
      path: '/stcsByLimit',
      name: 'StcsByLimit',
      meta: {
        title: '发文字数超限文件统计',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '020901',
        parentId: '0209'
      },
      component: resolve => require(['views/dispatch/statistics/stcsByLimit'], resolve)
    }
    ]
  },
  {
    path: '/fwpz',
    name: 'Fwpz',
    meta: {
      title: '参数维护',
      keepAlive: true,
      needLogin: true,
      active: false,
      id: '0212',
      parentId: '02'
    },
    component: resolve => require(['views/dispatch/fwpz'], resolve),
    redirect: '/fwcspz',
    children: [{
      path: '/fwcspz',
      name: 'Fwcspz',
      meta: {
        title: '发文参数配置',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021201',
        parentId: '0212'
      },
      component: resolve => require(['views/systemManage/dispatchSetting/fwcspz'], resolve)
    },
    {
      path: '/gwzlpz',
      name: 'Gwzlpz',
      meta: {
        title: '公文种类配置',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021202',
        parentId: '0212'
      },
      component: resolve => require(['views/systemManage/dispatchSetting/gwzlpz'], resolve)
    },
    {
      path: '/zcslpz',
      name: 'Zcslpz',
      meta: {
        title: '主抄送栏配置',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021203',
        parentId: '0212'
      },
      component: resolve => require(['views/systemManage/dispatchSetting/zcslpz'], resolve)
    },
    {
      path: '/bhfspz',
      name: 'Bhfspz',
      meta: {
        title: '本行发送配置',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021204',
        parentId: '0212'
      },
      component: resolve => require(['views/systemManage/dispatchSetting/bhfspz'], resolve)
    },
    {
      path: '/twyypz',
      name: 'Twyypz',
      meta: {
        title: '退文原因配置',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021205',
        parentId: '0212'
      },
      component: resolve => require(['views/systemManage/dispatchSetting/twyypz'], resolve)
    },
    {
      path: '/qxjdbpz',
      name: 'Qxjdbpz',
      meta: {
        title: '期限鉴定表配置',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021206',
        parentId: '0212'
      },
      component: resolve => require(['views/systemManage/dispatchSetting/qxjdbpz'], resolve)
    },
    {
      path: '/jgflpz',
      name: 'Jgflpz',
      meta: {
        title: '机构分类配置',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021207',
        parentId: '0212'
      },
      component: resolve => require(['views/systemManage/dispatchSetting/jgflpz'], resolve)
    },
    // {
    //   path: '/ggzpz',
    //   name: 'Ggzpz',
    //   meta: {
    //     title: '公告至配置',
    //     keepAlive: true,
    //     needLogin: true,
    //     active: false,
    //     id: '021208',
    //     parentId: '0212'
    //   },
    //   component: resolve => require(['views/systemManage/dispatchSetting/ggzpz'], resolve)
    // },
    {
      path: '/lshwh',
      name: 'Lshwh',
      meta: {
        title: '流水号维护',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021209',
        parentId: '0212'
      },
      component: resolve => require(['views/systemManage/dispatchSetting/lshwh'], resolve)
    },
    {
      path: '/fsdxpz',
      name: 'Fsdxpz',
      meta: {
        title: '发送对象配置',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021210',
        parentId: '0212'
      },
      component: resolve => require(['views/systemManage/dispatchSetting/fsdxpz'], resolve)
    }
    ]
  },
  {
    path: '/fwglywh',
    name: 'fwglywh',
    meta: {
      title: '管理员维护',
      keepAlive: true,
      needLogin: true,
      active: false,
      id: '0213',
      parentId: '02'
    },
    component: resolve => require(['views/dispatch/fwpz'], resolve),
    redirect: '/fwglfw',
    children: [{
      path: '/fwglfw',
      name: 'fwglfw',
      meta: {
        title: '发文',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021301',
        parentId: '0213'
      },
      component: resolve => require(['views/dispatch/adminManage/dispatchFile'], resolve)
    },
    {
      path: '/fwglhq',
      name: 'fwglhq',
      meta: {
        title: '会签',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021302',
        parentId: '0213'
      },
      component: resolve => require(['views/dispatch/adminManage/countersignature'], resolve)
    },
    {
      path: '/fwglcfsp',
      name: 'fwglcfsp',
      meta: {
        title: '重发审批',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021303',
        parentId: '0213'
      },
      component: resolve => require(['views/dispatch/adminManage/rexamine'], resolve)
    },
    {
      path: '/fwglcfhq',
      name: 'fwglcfhq',
      meta: {
        title: '重发会签',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021304',
        parentId: '0213'
      },
      component: resolve => require(['views/dispatch/adminManage/reCountersign'], resolve)
    },
    {
      path: '/fwgltw',
      name: 'fwgltw',
      meta: {
        title: '退文',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021305',
        parentId: '0213'
      },
      component: resolve => require(['views/dispatch/adminManage/tw'], resolve)
    },
    {
      path: '/fwglqzhs',
      name: 'fwglqzhs',
      meta: {
        title: '强制收回',
        keepAlive: true,
        needLogin: true,
        active: false,
        id: '021306',
        parentId: '0213'
      },
      component: resolve => require(['views/dispatch/adminManage/qzhs'], resolve)
    }
    ]
  },
    // {
    //   path: '/glyck',
    //   name: 'Glyck',
    //   meta: {
    //     title: '管理员查看',
    //     keepAlive: true,
    //     needLogin: true,
    //     id: '0211',
    //     parentId: '02'
    //   },
    //   component: resolve => require(['views/dispatch/glyck'], resolve),
    //   children: [{
    //       path: '/fw',
    //       name: '发文',
    //       meta: {
    //         title: '发文',
    //         keepAlive: true,
    //         needLogin: true
    //       },
    //       component: resolve => require(['views/dispatch/systemView/fw'], resolve)
    //     },
    //     {
    //       path: '/fwhq',
    //       name: '发文会签',
    //       meta: {
    //         title: '发文会签',
    //         keepAlive: true,
    //         needLogin: true
    //       },
    //       component: resolve => require(['views/dispatch/systemView/fwhq'], resolve)
    //     },
    //     {
    //       path: '/cfwsp',
    //       name: '重发文审批',
    //       meta: {
    //         title: '重发文审批',
    //         keepAlive: true,
    //         needLogin: true
    //       },
    //       component: resolve => require(['views/dispatch/systemView/cfwsp'], resolve)
    //     },
    //     {
    //       path: '/sysqzhs',
    //       name: '强制回收',
    //       meta: {
    //         title: '强制回收',
    //         keepAlive: true,
    //         needLogin: true
    //       },
    //       component: resolve => require(['views/dispatch/systemView/qzhs'], resolve)
    //     },
    //     {
    //       path: '/syscfhq',
    //       name: '重发会签',
    //       meta: {
    //         title: '重发会签',
    //         keepAlive: true,
    //         needLogin: true
    //       },
    //       component: resolve => require(['views/dispatch/systemView/cfhq'], resolve)
    //     },
    //     {
    //       path: '/systw',
    //       name: '退文',
    //       meta: {
    //         title: '退文',
    //         keepAlive: true,
    //         needLogin: true
    //       },
    //       component: resolve => require(['views/dispatch/systemView/systw'], resolve)
    //     },
    //     {
    //       path: '/sysfwgg',
    //       name: '发文公告',
    //       meta: {
    //         title: '发文公告',
    //         keepAlive: true,
    //         needLogin: true
    //       },
    //       component: resolve => require(['views/dispatch/systemView/fwgg'], resolve)
    //     }
    //   ]
    // }
  ]
},
{
  path: '/receive',
  name: 'Receive',
  meta: {
    title: '收文管理',
    keepAlive: true,
    needLogin: false
  },
  // component: resolve => require(['views/receive/index'], resolve),
  children: [{
    path: '/receiveFile',
    name: 'ReceiveFile',
    meta: {
      title: '收文',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/receive/receiveFile'], resolve)
  },
  {
    path: '/circularize',
    name: 'Circularize',
    meta: {
      title: '传阅',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/receive/circularize'], resolve)
  },
  {
    path: '/fileSupervise',
    name: 'FileSupervise',
    meta: {
      title: '公文督查办',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/receive/fileSupervise'], resolve)
  },
  {
    path: '/emailLetter',
    name: 'EmailLetter',
    meta: {
      title: '信电函件',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/receive/emailLetter'], resolve)
  },
  {
    path: '/receiveSponsor',
    name: 'ReceiveSponsor',
    meta: {
      title: '协办',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/receive/receiveSponsor'], resolve)
  },
  {
    path: '/shiwucb',
    name: 'shiwucb',
    meta: {
      title: '实物收文承办',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/receive/shiwucb'], resolve)
  },
  {
    path: '/receiveFileBack',
    name: 'ReceiveFileBack',
    meta: {
      title: '退文',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/receive/receiveFileBack'], resolve)
  },
  {
    path: '/receiveQuery',
    name: 'ReceiveQuery',
    meta: {
      title: '查询',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/receive/receiveQuery'], resolve),
    children: [{
      path: '/swcx',
      name: 'Swcx',
      meta: {
        title: '收文查询',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/receive/receiveQuery/swcx'], resolve)
    },
    {
      path: '/swthqkcx',
      name: 'Swthqkcx',
      meta: {
        title: '收文退回情况查询',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/receive/receiveQuery/swthqkcx'], resolve)
    },
    {
      path: '/gwdcbcx',
      name: 'Gwdcbcx',
      meta: {
        title: '公文督查办查询',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/receive/receiveQuery/gwdcbcx'], resolve)
    },
    {
      path: '/xdhjcx',
      name: 'Xdhjcx',
      meta: {
        title: '信电函件查询',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/receive/receiveQuery/xdhjcx'], resolve)
    },
    {
      path: '/zfswcx',
      name: 'Zfswcx',
      meta: {
        title: '直发收文查询',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveQuery/zfswcx'], resolve)
    },
    {
      path: '/xjhcfwcx',
      name: 'Xjhcfwcx',
      meta: {
        title: '下级行重发文查询',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/receive/receiveQuery/xjhcfwcx'], resolve)
    },
    {
      path: '/xjhswzscx',
      name: 'Xjhswzscx',
      meta: {
        title: '下级行收文字数查询',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/receive/receiveQuery/xjhswzscx'], resolve)
    },
    ]
  },
  {
    path: '/receiveStcs',
    name: 'ReceiveStcs',
    meta: {
      title: '统计',
      keepAlive: true,
      ccneedLogin: true
    },
    redirect: '/stcsByRetype',
    component: resolve => require(['views/receive/receiveStcs'], resolve),
    children: [{
      path: '/stcsRecordType',
      name: 'StcsRecordType',
      meta: {
        title: '按收文类型统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveStcs/stcsRecordType'], resolve)
    },
    {
      path: '/stcsHostSituation',
      name: 'StcsHostSituation',
      meta: {
        title: '协办情况统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveStcs/stcsHostSituation'], resolve)
    },
    {
      path: '/stcsLetterOfInstruction',
      name: 'StcsLetterOfInstruction',
      meta: {
        title: '信电函件统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveStcs/stcsLetterOfInstruction'], resolve)
    },
    {
      path: '/stcsNextInstitutionSendLetter',
      name: 'StcsNextInstitutionSendLetter',
      meta: {
        title: '下级机构来文情况统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveStcs/stcsNextInstitutionSendLetter'], resolve)
    },
    {
      path: '/stcsPhysicalReceipt',
      name: 'StcsPhysicalReceipt',
      meta: {
        title: '实物收文统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveStcs/stcsPhysicalReceipt'], resolve)
    },
    {
      path: '/stcsSentDirectly',
      name: 'StcsSentDirectly',
      meta: {
        title: '直发收文统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveStcs/stcsSentDirectly'], resolve)
    },
    {
      path: '/stcsResendBack',
      name: 'StcsResendBack',
      meta: {
        title: '下级机构重发，被退回文件合并统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveStcs/stcsResendBack'], resolve)
    },
    {
      path: '/stcsRepeatBack',
      name: 'StcsRepeatBack',
      meta: {
        title: '下级机构上报文件重复率，被退回率统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveStcs/stcsRepeatBack'], resolve)
    },
    {
      path: '/stcsIncomingDispatches',
      name: 'StcsIncomingDispatches',
      meta: {
        title: '收文未登记情况统计表',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveStcs/StcsIncomingDispatches'], resolve)
    }, {
      path: '/dbqssxtj',
      name: 'dbqssxtj',
      meta: {
        title: '督办公文办理情况统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveStcs/dbqssxtj'], resolve)
    }, {
      path: '/dbgwblqk',
      name: 'dbgwblqk',
      meta: {
        title: '督办请示事项情况统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/receiveStcs/dbgwblqk'], resolve)
    },
    ]
  },
  {
    path: '/receiveParam',
    name: 'ReceiveParam',
    meta: {
      title: '参数维护',
      keepAlive: true,
      ccneedLogin: true
    },
    redirect: '/swcx',
    component: resolve => require(['views/receive/receiveParam'], resolve),
    children: [{
      path: '/swcspz',
      name: 'Swcspz',
      meta: {
        title: '收文参数配置',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/systemManage/receiveSetting/swcspz'], resolve)
    },
    {
      path: '/xdhjcspz',
      name: 'Xdhjcspz',
      meta: {
        title: '信电函件参数配置',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/systemManage/receiveSetting/xdhjcspz'], resolve)
    },
    {
      path: '/gwdbbltspz',
      name: 'Gwdbbltspz',
      meta: {
        title: '公文督办办理天数配置',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/systemManage/receiveSetting/gwdbbltspz'], resolve)
    },
    {
      path: '/swthyypz',
      name: 'Swthyypz',
      meta: {
        title: '收文退回原因配置',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/systemManage/receiveSetting/swthyypz'], resolve)
    },
    {
      path: '/swswlxpz',
      name: 'Swswlxpz',
      meta: {
        title: '实物收文类型配置',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/systemManage/receiveSetting/swswlxpz'], resolve)
    },
    {
      path: '/lwdwpz',
      name: 'Lwdwpz',
      meta: {
        title: '来文单位配置',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/systemManage/receiveSetting/lwdwpz'], resolve)
    },
    {
      path: '/qxbwh',
      name: 'Qxbwh',
      meta: {
        title: '期限表维护',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/systemManage/receiveSetting/qxbwh'], resolve)
    }
    ]
  },
  // {
  //   path: '/receiveAdminCheck',
  //   name: 'ReceiveAdminCheck',
  //   meta: {
  //     title: '管理员查看',
  //     keepAlive: true,
  //     needLogin: false
  //   },
  //   redirect: 'swcx',
  //   component: resolve => require(['views/receive/receiveAdminCheck'], resolve),
  //   children: [{
  //     path: '/receiveMsg',
  //     name: 'receiveMsg',
  //     meta: {
  //       title: '收文',
  //       keepAlive: true,
  //       ccneedLogin: true
  //     },
  //     component: resolve => require(['views/receive/receiveAdmin/receiveMsg'], resolve)
  //   }, {
  //     path: '/assistMsg',
  //     name: 'assistMsg',
  //     meta: {
  //       title: '协办文',
  //       keepAlive: true,
  //       ccneedLogin: true
  //     },
  //     component: resolve => require(['views/receive/receiveAdmin/assistMsg'], resolve)
  //   }, {
  //     path: '/circulateMsg',
  //     name: 'circulateMsg',
  //     meta: {
  //       title: '传阅文',
  //       keepAlive: true,
  //       ccneedLogin: true
  //     },
  //     component: resolve => require(['views/receive/receiveAdmin/circulateMsg'], resolve)
  //   }, {
  //     path: '/lettterMsg',
  //     name: 'lettterMsg',
  //     meta: {
  //       title: '信电函件',
  //       keepAlive: true,
  //       ccneedLogin: true
  //     },
  //     component: resolve => require(['views/receive/receiveAdmin/lettterMsg'], resolve)
  //   }, {
  //     path: '/recedeMsg',
  //     name: 'recedeMsg',
  //     meta: {
  //       title: '退文',
  //       keepAlive: true,
  //       ccneedLogin: true
  //     },
  //     component: resolve => require(['views/receive/receiveAdmin/recedeMsg'], resolve)
  //   }, {
  //     path: '/superviseMsg',
  //     name: 'superviseMsg',
  //     meta: {
  //       title: '公文督办',
  //       keepAlive: true,
  //       ccneedLogin: true
  //     },
  //     component: resolve => require(['views/receive/receiveAdmin/superviseMsg'], resolve)
  //   }]
  // },
  {
    path: '/adminManage',
    name: 'adminManage',
    meta: {
      title: '管理员维护',
      keepAlive: true,
      needLogin: false
    },
    redirect: '/manageReceiveFile',
    component: resolve => require(['views/receive/receiveParam'], resolve),
    children: [{
      path: '/manageReceiveFile',
      name: 'receiveFileManage',
      meta: {
        title: '收文',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/adminManage/receiveFile'], resolve)
    }, {
      path: '/manageCircularize',
      name: 'circularizeManage',
      meta: {
        title: '传阅',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/adminManage/circularize'], resolve)
    }, {
      path: '/manageEmailLetter',
      name: 'emailLetterManage',
      meta: {
        title: '信电函件',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/adminManage/emailLetter'], resolve)
    },
    {
      path: '/manageReceiveSponsor',
      name: 'receiveSponsorManage',
      meta: {
        title: '协办',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/adminManage/receiveSponsor'], resolve)
    },
    {
      path: '/manageShiwucb',
      name: 'shiwucbManage',
      meta: {
        title: '实物收文承办',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/adminManage/shiwucb'], resolve)
    }, {
      path: '/manageReceiveFileBack',
      name: 'receiveFileBackManage',
      meta: {
        title: '退文',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/receive/adminManage/receiveFileBack'], resolve)
    }
    ]
  }
  ]
},
{
  path: '/qbgl',
  name: 'Qbgl',
  meta: {
    title: '签报管理',
    keepAlive: true,
    needLogin: true,
    id: '03',
    parentId: '0'
  },
  component: resolve => require(['views/signqutote/index'], resolve),
  redirect: '/signqutoteFile',
  children: [{
    path: '/signqutoteFile',
    name: 'SignqutoteFile',
    meta: {
      title: '签报',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/signqutoteFile'], resolve)
  },
  {
    path: '/huiqian',
    name: 'Huiqian',
    meta: {
      title: '会签',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/huiqian'], resolve)
  },
  {
    path: '/xieban',
    name: 'Xieban',
    meta: {
      title: '协办',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/xieban'], resolve)
  },

  {
    path: '/chuanyue',
    name: 'Chuanyue',
    meta: {
      title: '传阅',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/chuanyue'], resolve)
  },
  {
    path: '/tuiwen',
    name: 'Tuiwen',
    meta: {
      title: '退文',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/tuiwen'], resolve)
  },
  {
    path: '/chaxun',
    name: 'Chaxun',
    meta: {
      title: '查询',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/chaxun'], resolve),
    redirect: '/chaxunqbcspz',

    children: [{
      path: '/chaxunqbcspz',
      name: 'chaxunqbcspz',
      meta: {
        title: '签报查询',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/chaxun/cswhqbcspz'], resolve)
    },
    {
      path: '/chaxunqbzlwh',
      name: 'chaxunqbzlwh',
      meta: {
        title: '签报退回查询',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/chaxun/cswhqbzlwh'], resolve)
    },
    {
      path: '/chaxunlshwh',
      name: 'chaxunlshwh',
      meta: {
        title: '签报会签时间查询',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/chaxun/cswhlshwh'], resolve)
    },
    {
      path: '/chaxuntwyypz',
      name: 'chaxuntwyypz',
      meta: {
        title: '签报协办时间查询',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/chaxun/cswhtwyypz'], resolve)
    },
    {
      path: '/chaxunzwzscxpz',
      name: 'zwzscxpz',
      meta: {
        title: '领导批示查询',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/chaxun/cswhzwzscxpz'], resolve)
    },
    {
      path: '/chaxunbeyond',
      name: 'beyond',
      meta: {
        title: '签报字数超限文件查询',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/chaxun/cswhbeyond'], resolve)
    },
    ]
  },
  {
    path: '/tongji',
    name: 'Tongji',
    meta: {
      title: '统计',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/tongji'], resolve),
    redirect: '/huiqiansj',
    children: [{
      path: '/huiqiansj',
      name: 'huiqiansj',
      meta: {
        title: '签报会签办理时间统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/tongji/huiqiansj'], resolve)
    },
    {
      path: '/feikuahang',
      name: 'feikuahang',
      meta: {
        title: '非跨行签报按类型统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/tongji/feikuahang'], resolve)
    },
    {
      path: '/qianbaoLiuzhuan',
      name: 'qianbaoLiuzhuan',
      meta: {
        title: '签报流转退回情况统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/tongji/qianbaoLiuzhuan'], resolve)
    },
    {
      path: '/qianbaoZishu',
      name: 'qianbaoZishu',
      meta: {
        title: '签报字数情况统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/tongji/qianbaoZishu'], resolve)
    },
    {
      path: '/qianbaoZishuChaoxian',
      name: 'qianbaoZishuChaoxian',
      meta: {
        title: '签报字数超限文件统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/tongji/qianbaoZishuChaoxian'], resolve)
    },
    {
      path: '/hangqianbao',
      name: 'hangqianbao',
      meta: {
        title: '行签报字数统计',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/tongji/hangqianbao'], resolve)
    },
    {
      path: '/kuahangXieban',
      name: 'kuahangXieban',
      meta: {
        title: '跨行签报协办办理时间统计(分行)',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/tongji/kuahangXieban'], resolve)
    },
    {
      path: '/kuahangFankui',
      name: 'kuahangFankui',
      meta: {
        title: '跨行签报反馈情况统计(分行)',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/tongji/kuahangFankui'], resolve)
    },
    ]
  },
  {
    path: '/canshuweihu',
    name: 'Canshuweihu',
    meta: {
      title: '参数维护',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    redirect: '/cswhqbcspz',
    component: resolve => require(['views/signqutote/canshuweihu'], resolve),
    children: [{
      path: '/cswhqbcspz',
      name: 'cswhqbcspz',
      meta: {
        title: '签报参数配置',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/systemManage/signCanShuWeiHu/cswhqbcspz'], resolve)
    },
    {
      path: '/cswhqbzlwh',
      name: 'cswhqbzlwh',
      meta: {
        title: '签报种类维护',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/systemManage/signCanShuWeiHu/cswhqbzlwh'], resolve)
    },
    {
      path: '/cswhlshwh',
      name: 'cswhlshwh',
      meta: {
        title: '流水号维护',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/systemManage/signCanShuWeiHu/cswhlshwh'], resolve)
    },
    {
      path: '/cswhtwyypz',
      name: 'cswhtwyypz',
      meta: {
        title: '退文原因配置',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/systemManage/signCanShuWeiHu/cswhtwyypz'], resolve)
    },
      // {
      //   path: '/cswhzwzscxpz',
      //   name: 'zwzscxpz',
      //   meta: {
      //     title: '正文字数超限配置',
      //     keepAlive: true,
      //     ccneedLogin: true
      //   },
      //   component: resolve => require(['views/systemManage/signCanShuWeiHu/cswhzwzscxpz'], resolve)
      // },
    ]
  },
  {
    path: '/qianbaoweihu',
    name: 'qianbaoweihu',
    meta: {
      title: '管理员维护',
      keepAlive: true,
      needLogin: true,
      id: '04',
      parentId: '0'
    },
    redirect: '/qianbaoqianbao',
    component: resolve => require(['views/signqutote/canshuweihu'], resolve),
    children: [{
      path: '/qianbaoqianbao',
      name: 'qianbaoqianbao',
      meta: {
        title: '签报',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/adminManage/signqutoteFile'], resolve)
    },
    {
      path: '/qianbaohuiqian',
      name: 'qianbaohuiqian',
      meta: {
        title: '会签',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/adminManage/huiqian'], resolve)
    },
    {
      path: '/qianbaoxieban',
      name: 'qianbaoxieban',
      meta: {
        title: '协办',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/adminManage/xieban'], resolve)
    },
    {
      path: '/qianbaotuiwen',
      name: 'qianbaotuiwen',
      meta: {
        title: '退文',
        keepAlive: true,
        ccneedLogin: true
      },
      component: resolve => require(['views/signqutote/adminManage/tuiwen'], resolve)
    },
    ]
  },
    // {
    //   path: '/guanliyuanck',
    //   name: 'Guanliyuanck',
    //   meta: {
    //     title: '管理员查看',
    //     keepAlive: true,
    //     needLogin: true,
    //     id: '03',
    //     parentId: '0'
    //   },
    //   redirect: '/glyckqb',
    //   component: resolve => require(['views/signqutote/guanliyuanck'], resolve),
    //   children: [{
    //       path: '/glyckqb',
    //       name: 'Glyckqb',
    //       meta: {
    //         title: '签报',
    //         keepAlive: true,
    //         ccneedLogin: true
    //       },
    //       component: resolve => require(['views/signqutote/guanliyuanchakan/glyckqb'], resolve)
    //     },
    //     {
    //       path: '/glyckhq',
    //       name: 'Glyckhq',
    //       meta: {
    //         title: '会签',
    //         keepAlive: true,
    //         ccneedLogin: true
    //       },
    //       component: resolve => require(['views/signqutote/guanliyuanchakan/glyckhq'], resolve)
    //     },
    //     {
    //       path: '/glycktw',
    //       name: 'Glycktw',
    //       meta: {
    //         title: '退文',
    //         keepAlive: true,
    //         ccneedLogin: true
    //       },
    //       component: resolve => require(['views/signqutote/guanliyuanchakan/glycktw'], resolve)
    //     },
    //     {
    //       path: '/glyckxb',
    //       name: 'Glyckxb',
    //       meta: {
    //         title: '协办',
    //         keepAlive: true,
    //         ccneedLogin: true
    //       },
    //       component: resolve => require(['views/signqutote/guanliyuanchakan/glyckxb'], resolve)
    //     },
    //     {
    //       path: '/glyckcy',
    //       name: 'Glyckcy',
    //       meta: {
    //         title: '传阅',
    //         keepAlive: true,
    //         ccneedLogin: true
    //       },
    //       component: resolve => require(['views/signqutote/guanliyuanchakan/glyckcy'], resolve)
    //     },
    //   ]
    // }
  ]
},
{
  path: '/team',
  name: 'Team',
  meta: {
    title: '柔性团队',
    keepAlive: true,
    needLogin: true,
    id: '0401', // 这里应为字符串
    parentId: '04',
    icon: ''
  },
  children: [{
    path: '/teamManagement',
    name: 'TeamManagement',
    meta: {
      title: '团队管理',
      keepAlive: true,
      needLogin: false,
      id: 41,
      parentId: 0,
      icon: ''
    },
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
      //   // redirect:'/seeTask',
      //   children: [{
      //     path: '/seeTask',
      //     name: 'seeTask',
      //     meta: {
      //       title: '任务',
      //       keepAlive: true,
      //       needLogin: false
      //     },
      //     component: resolve => require(['views/team/taskManagement/adminSee/seeTask'], resolve)
      //   },
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
  path: '/fwManagement',
  name: 'FwManagement',
  meta: {
    title: '范文管理',
    keepAlive: true,
    needLogin: false,
    id: '06',
    parentId: '06',
  },
  //component: resolve => require(['views/fwManagement/index.vue'], resolve), // 这里利用父页面来进行渲染
  //redirect: '/modelFw', // 重定向注意层级关系
  children: [{
    path: '/modelFw',
    name: 'ModelFw',
    meta: {
      title: '模板及范文',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/fwManagement/modelFw/index.vue'], resolve),
  },
  {
    path: '/solicitOpinion',
    name: 'SolicitOpinion',
    meta: {
      title: '意见征集',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/fwManagement/solicitOpinion/index.vue'], resolve),
  },
  {
    path: '/myUpdate',
    name: 'MyUpdate',
    meta: {
      title: '我的上传',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/fwManagement/myUpdate/index.vue'], resolve),
  },
  {
    path: '/myCollect',
    name: 'MyCollect',
    meta: {
      title: '我的收藏',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/fwManagement/myCollect/index.vue'], resolve),
  },
  {
    path: '/fwSearch',
    name: 'FwSearch',
    meta: {
      title: '查询',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/fwManagement/fwSearch/index.vue'], resolve),
  },
  {
    path: '/mfStatistics',
    name: 'MfStatistics',
    meta: {
      title: '统计',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/fwManagement/mfStatistics/index.vue'], resolve),
    redirect: '/fwStatistics',
    children: [{
      path: '/fwStatistics',
      name: 'FwStatistics',
      meta: {
        title: '模板/范文统计',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/fwManagement/mfStatistics/fwStatistics.vue'], resolve),
    },
    {
      path: '/hotSearch',
      name: 'hotSearch',
      meta: {
        title: '热搜统计',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/fwManagement/mfStatistics/hotSearch.vue'], resolve),
    }
    ]
  },
  {
    path: '/paramerMaint',
    name: 'ParamerMaint',
    meta: {
      title: '参数维护',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/fwManagement/paramerMaint/index.vue'], resolve),
  },
  ]
},
{
  path: '/dashboard',
  redirect: '/dashboard/personalOffice/dailyWork/sublicense1',
  name: 'dashboard',
  meta: {
    title: '个人办公'
  },
  component: resolve => require(['views/dashboard/layout/index.vue'], resolve),
  children: [{
    /* path: '/dashboard/personalOffice',
name: 'personalOffice',
meta: {
title: '个人办公'
},
component: resolve => require(['components/layout/empty.vue'], resolve),
children: [{*/
    path: '/dashboard/personalOffice/dailyWork',
    name: 'dailyWork',
    meta: {
      title: '日常工作'
    },
    component: resolve => require(['views/dashboard/personal-office/daily-work/sublicense1/sublicense1.vue'], resolve),
    children: [{
      path: '/dashboard/personal-office/daily-work/sublicense1',
      name: 'Sublicense',
      redirect: '/subTemp',
      meta: {
        title: '转授权',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [{
        path: '/subTemp',
        name: 'SubTemp',
        meta: {
          title: '临时转授权',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/sublicense1/subTemp.vue'], resolve),
      }, {
        path: '/subLong',
        name: 'SubLong',
        meta: {
          title: '长期转授权',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/sublicense1/subLong.vue'], resolve),
      }]
    },
      //  {
      //     path:'/sublicense',
      //     name:'Sublicense',
      //     meta:{
      //         title:'转授权',
      //         keepAlive:true,
      //         needLogin:false
      //     },
      //     component:resolve => require(['views/personalOffice/sublicense/sublicense.vue'],resolve),
      //     redirect:'/subTemp',
      //     children:[
      //         {
      //             path:'/subTemp',
      //             name:'SubTemp',
      //             meta:{
      //                 title:'临时转授权',
      //                 keepAlive:true,
      //                 needLogin:false
      //             },
      //             component:resolve => require(['views/personalOffice/sublicense/subTemp.vue'],resolve),
      //         },{
      //                 path:'/subLong',
      //                 name:'SubLong',
      //                 meta:{
      //                     title:'长期转授权',
      //                     keepAlive:true,
      //                     needLogin:false
      //                 },
      //             component:resolve => require(['views/personalOffice/sublicense/subLong.vue'],resolve),
      //         }
      //     ]
      // },


      //请勿更改此块代码----------------------------------------------------------

      /*  {
          path: '/dashboard/personalOffice/dailyWork/sublicense',
          name: 'sublicense',
          meta: {
            title: '转授权'
          },
          component: resolve => require(['views/dashboard/personal-office/daily-work/sublicense/index.vue'], resolve),

        },
        //转授权>查看>查看详情
        {
          path: '/dashboard/personalOffice/dailyWork/sublicense/viewDetail',
          name: 'viewDetail',
          meta: {
            title: '查看详情'
          },
          component: resolve => require(['views/dashboard/personal-office/daily-work/sublicense/components/viewDetail.vue'], resolve),
        },
        //转授权>查看办结>查看办结详情
        {
          path: '/dashboard/personalOffice/dailyWork/sublicense/doneDetail',
          name: 'doneDetail',
          meta: {
            title: '查看详情'
          },
          component: resolve => require(['views/dashboard/personal-office/daily-work/sublicense/components/doneDetail.vue'], resolve),
        },*/
      // 我的收藏
      /* {
         path: '/dashboard/personalOffice/dailyWork/collection',
         name: 'collection',
         meta: {
           title: '我的收藏'
         },
         component: resolve => require(['views/dashboard/personal-office/daily-work/collection/index.vue'], resolve),

       },*/
      //工作交流
      /* {
         path: '/dashboard/personalOffice/dailyWork/workCommunicate',
         name: 'workCommunicate',
         meta: {
           title: '工作交流'
         },
         component: resolve => require(['views/dashboard/personal-office/daily-work/workCommunicate/index.vue'], resolve),
       },

       //工作日志
       {
         path: '/dashboard/personalOffice/dailyWork/workLog',
         name: 'workLog',
         meta: {
           title: '工作日志'
         },
         component: resolve => require(['views/dashboard/personal-office/daily-work/workLog/index.vue'], resolve),
       },
       //日程安排
       {
         path: '/dashboard/personalOffice/dailyWork/schedule',
         name: 'schedule',
         meta: {
           title: '日程安排'
         },
         component: resolve => require(['views/dashboard/personal-office/daily-work/schedule/index.vue'], resolve),
       },

       {
         path: '/dashboard/personalOffice/dailyWork/addressBook',
         name: 'addressBook',
         meta: {
           title: '个人通讯录'
         },
         component: resolve => require(['views/dashboard/personal-office/daily-work/addressBook/index.vue'], resolve),
       },*/

      /*  {
          path: '/dashboard/personalOffice/dailyWork/newApply',
          name: 'newApply',
          meta: {
            title: '新增申请'
          },
          component: resolve => require(['views/dashboard/personal-office/daily-work/newApply/index.vue'], resolve),
        },*/

      /* {
         path: '/dashboard/personalOffice/fileManagement',
         name: 'fileManagement',
         meta: {
           title: '档案管理'
         },
         component: resolve => require(['views/dashboard/personal-office/fileManage/simpleQuery/index.vue'], resolve),
       },*/
    ]
  },
  {
    path: '/dashboard/personalOffice/publishInfo',
    name: 'publishInfo',
    meta: {
      title: '信息发布'
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/dashboard/personalOffice/publishInfo/selfBankInfo',
      name: 'selfBankInfo',
      meta: {
        title: '本行信息'
      },
      component: resolve => require(['views/dashboard/personal-office/publishInfo/selfBankInfo/index.vue'], resolve),
    },
    {
      path: '/dashboard/personalOffice/publishInfo/setManageTable',
      name: 'setManageTable',
      meta: {
        title: '设置本行管理员'
      },
      component: resolve => require(['views/dashboard/personal-office/publishInfo/selfBankInfo/components/setManageTable.vue'], resolve),
    },
    {
      path: '/dashboard/personalOffice/publishInfo/inquire',
      name: 'selfBankInfoPub',
      meta: {
        title: '查询'
      },
      component: resolve => require(['views/dashboard/personal-office/publishInfo/selfBankInfo/components/inquire.vue'], resolve),
    }
    ]
  },
  {

    path: '/dashboard/personalOffice/sysConfig',
    name: 'sysConfig',
    meta: {
      title: '系统设置'
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [
      //   {
      //   path: '/dashboard/personalOffice/sysConfig/index',
      //   name: 'sysConfig_index',
      //   meta: {
      //     title: '收藏设置'
      //   },
      //   component: resolve => require(['views/dashboard/personal-office/sysConfig/favorites.vue'], resolve),
      // },
      //   {
      //     path: '/dashboard/personalOffice/sysConfig/remind',
      //     name: 'remind',
      //     meta: {
      //       title: '提醒设置'
      //     },
      //     component: resolve => require(['views/dashboard/personal-office/sysConfig/remind.vue'], resolve),
      //   },
      {
        path: '/dashboard/personalOffice/sysConfig/vierPerList',
        name: 'useObject',
        meta: {
          title: '常用发送对象'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/vierPerList.vue'], resolve),
        // children: [{
        //     path: '/dashboard/personalOffice/sysConfig/vierPer',
        //     name: 'vierPer',
        //     meta: {
        //       title: '新增 '
        //     },
        //     component: resolve => require(['views/dashboard/personal-office/sysConfig/vierPer.vue'], resolve),
        //   },
        //   {
        //     path: '/dashboard/personalOffice/sysConfig/vierPerList',
        //     name: 'vierPerList',
        //     meta: {
        //       title: '查看个人'
        //     },
        //     component: resolve => require(['views/dashboard/personal-office/sysConfig/vierPerList.vue'], resolve),
        //   },
        //   {
        //     path: '/dashboard/personalOffice/sysConfig/createGroup',
        //     name: 'createGroup',
        //     meta: {
        //       title: '新建本行群组'
        //     },
        //     component: resolve => require(['views/dashboard/personal-office/sysConfig/createGroup.vue'], resolve),
        //   },
        //   {
        //     path: '/dashboard/personalOffice/sysConfig/otherGroup',
        //     name: 'otherGroup',
        //     meta: {
        //       title: '选择本行群组'
        //     },
        //     component: resolve => require(['views/dashboard/personal-office/sysConfig/otherGroup.vue'], resolve),
        //   },
        //   {
        //     path: '/dashboard/personalOffice/sysConfig/headquarter',
        //     name: 'headquarter',
        //     meta: {
        //       title: '选择本部群组'
        //     },
        //     component: resolve => require(['views/dashboard/personal-office/sysConfig/headquarter.vue'], resolve),
        //   },
        //   {
        //     path: '/dashboard/personalOffice/sysConfig/viewGroup',
        //     name: 'viewGroup',
        //     meta: {
        //       title: '查看群组'
        //     },
        //     component: resolve => require(['views/dashboard/personal-office/sysConfig/viewGroup.vue'], resolve),
        //   },
        // ]
      },

      {
        path: '/dashboard/personalOffice/sysConfig/viewWords',
        name: 'viewWords',
        meta: {
          title: '个人常用批语'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/viewWords.vue'], resolve),
        children: [

        ]
      },

      // {
      //   path: '/dashboard/personalOffice/sysConfig/viewLinkConfig',
      //   name: 'viewLinkConfig',
      //   meta: {
      //     title: '链接设置'
      //   },
      //   component: resolve => require(['views/dashboard/personal-office/sysConfig/viewLinkConfig.vue'], resolve),
      //   children: [
      //     // {
      //     //   path: '/dashboard/personalOffice/sysConfig/createLink',
      //     //   name: 'createLink',
      //     //   meta: {
      //     //     title: '新建链接设置'
      //     //   },
      //     //   component: resolve => require(['views/dashboard/personal-office/sysConfig/createLink.vue'], resolve),
      //     // },
      //     // {
      //     //   path: '/dashboard/personalOffice/sysConfig/viewPerLink',
      //     //   name: 'viewPerLink',
      //     //   meta: {
      //     //     title: '查看个人链接'
      //     //   },
      //     //   component: resolve => require(['views/dashboard/personal-office/sysConfig/viewPerLink.vue'], resolve),
      //     // },
      //     // {
      //     //   path: '/dashboard/personalOffice/sysConfig/viewPublicLink',
      //     //   name: 'viewPublicLink',
      //     //   meta: {
      //     //     title: '查看公共链接'
      //     //   },
      //     //   component: resolve => require(['views/dashboard/personal-office/sysConfig/viewPublicLink.vue'], resolve),
      //     // },
      //   ]
      // },

      {
        path: '/dashboard/personalOffice/sysConfig/alterPer',
        name: 'alterPer',
        meta: {
          title: '修改个人信息'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/alterPer.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/alterPwd',
        name: 'alterPwd',
        meta: {
          title: '修改密码'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/alterPwd.vue'], resolve),
      },
    ]
  },
    // {
    //   path: '/dashboard/personalOffice/admin',
    //   name: 'admin',
    //   meta: {
    //     title: '管理员设置'
    //   },
    //   component: resolve => require(['components/layout/empty.vue'], resolve),
    //   children: [{
    //     path: '/dashboard/personalOffice/admin/coluIndex',
    //     name: 'columnIndex',
    //     meta: {
    //       title: '专栏设置'
    //     },
    //     component: resolve => require(['views/dashboard/personal-office/admin/coluIndex.vue'], resolve),
    //
    //     children: [{
    //       path: '/dashboard/personalOffice/admin/searchData',
    //       name: 'searchData',
    //       meta: {
    //         title: '查询'
    //       },
    //       component: resolve => require(['views/dashboard/personal-office/admin/searchData.vue'], resolve),
    //     }, ]
    //   },
    //     // {
    //     //   path: '/dashboard/personalOffice/admin/alterWin',
    //     //   name: 'alterWin',
    //     //   meta: {
    //     //     title: '弹出窗口信息设置'
    //     //   },
    //     //   component: resolve => require(['views/dashboard/personal-office/admin/index.vue'], resolve),
    //     // },
    //     /*  {
    //     path: '/dashboard/personalOffice/admin/sendPhone',
    //     name: 'sendPhone',
    //     meta: {
    //       title: '手工发送短信'
    //     },
    //     component: resolve => require(['views/dashboard/personal-office/admin/sendPhone.vue'], resolve),
    //   },*/
    //     {
    //       path: '/dashboard/personalOffice/admin/initWarrant',
    //       name: 'initWarrant',
    //       meta: {
    //         title: '同步转授权至商密OA'
    //       },
    //       component: resolve => require(['views/dashboard/personal-office/admin/initWarrant.vue'], resolve),
    //     },
    //   ]
    // },

  ]
},
{
  path: '/approval',
  name: 'approval',
  meta: {
    title: '事务审批',
  },
  component: resolve => require(['views/approval/layout/index.vue'], resolve),
  children: [{
    path: '/approval/checkLz',
    meta: {
      title: '流转',
    },
    name: 'checkLz',
    component: resolve => require(['views/approval/checkLz.vue'], resolve),
  },
  {
    path: '/approval/checkCy',
    meta: {
      title: '传阅',
    },
    name: 'checkCy',
    component: resolve => require(['views/approval/checkCy.vue'], resolve),
  },
  {
    path: '/approval/search',
    meta: {
      title: '查询',
    },
    name: 'search',
    component: resolve => require(['views/approval/search/search.vue'], resolve),
  },
  {
    path: '/approval/parameter',
    name: 'parameter',
    meta: {
      title: '参数维护',
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/approval/parameter/base',
      name: 'base',
      meta: {
        title: '基础配置',
      },
      component: resolve => require(['views/approval/parameter/base/check.vue'], resolve),
    },
    {
      path: '/approval/parameter/apply',
      name: 'apply',
      meta: {
        title: '申请项目维护',
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
    },
    {
      path: '/approval/parameter/serial',
      name: 'serial',
      meta: {
        title: '流水号维护',
      },
      component: resolve => require(['views/approval/parameter/serial/check.vue'], resolve),
    },
    ],
  },
  {
    path: '/approval/statistics',
    meta: {
      title: '统计',
    },
    name: 'Apstatistics',
    component: resolve => require(['views/approval/statistics.vue'], resolve),
  },
  {
    path: '/approval/admin',
    name: 'admin',
    redirect: '/approval/admin/checkLz',
    meta: {
      title: '管理员查看',
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/approval/admin/checkLz',
      meta: {
        title: '流转',
      },
      name: 'adminLz',
      component: resolve => require(['views/approval/admin/adminIndex.vue'], resolve),
    },
    {
      path: '/approval/admin/checkCy',
      meta: {
        title: '传阅',
      },
      name: 'adminCy',
      component: resolve => require(['views/approval/admin/adminCy.vue'], resolve),
    },
      // {
      //   path: '/approval/search',
      //   meta: {
      //     title: '查询',
      //   },
      //   name: 'search',
      //   component: resolve => require(['views/approval/search/search.vue'], resolve),
      // },
    ],
  },

  ],
},
{
  path: '/bianhan',
  redirect: '/bianhan/index',
  name: 'bianhan',
  meta: {
    title: '便函管理',
  },
  component: resolve => require(['views/bianhan/layout/index.vue'], resolve),
  children: [{
    path: '/bianhan/index',
    name: 'bianhanIndex',
    meta: {
      title: "制发",
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/index.vue'], resolve)
  },
  {
    path: '/bianhan/undertable',
    name: 'undertable',
    meta: {
      title: "承办",
      keepAlive: true,
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/undertable/undertable.vue'], resolve)
  },
  {
    path: '/bianhan/circulatetable',
    name: 'circulatetable',
    meta: {
      title: "传阅",
      keepAlive: true,
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/circulatetable/circulatetable.vue'], resolve)
  },
  {
    path: '/bianhan/annsearch',
    name: 'annsearch',
    meta: {
      title: "查询",
      keepAlive: true,
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/annsearch/annsearch.vue'], resolve)
  },
  {
    path: '/bianhan/statistics',
    name: 'bianhanStatistics',
    meta: {
      title: "统计",
      keepAlive: true,
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/statistics/statistics.vue'], resolve)
  },
  {
    path: '/bianhan/weihu',
    name: 'weihu',
    meta: {
      title: "参数维护",
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/bianhan/serialnum',
      name: 'serialnum',
      meta: {
        title: "流水号维护",
        keepAlive: true,
        needLogin: false,
      },
      component: resolve => require(['views/bianhan/serialnum/serialnum.vue'], resolve)
    },
    {
      path: '/bianhan/setting',
      name: 'bianhanSetting',
      meta: {
        title: "便函系统配置",
        keepAlive: true,
        needLogin: false,
      },
      component: resolve => require(['views/bianhan/setting/settingTable.vue'], resolve)
    },
    ]
  },
  {
    path: '/bianhan/admin',
    redirect: '/bianhan/admin/zf',
    meta: {
      title: "管理员查看",
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/bianhan/admin/zf',
      meta: {
        title: "制发",
      },
      component: resolve => require(['views/bianhan/admin/zf.vue'], resolve),
    },
    {
      path: '/bianhan/admin/cb',
      meta: {
        title: "承办",
      },
      component: resolve => require(['views/bianhan/admin/cb.vue'], resolve),
    },
    {
      path: '/bianhan/admin/cy',
      meta: {
        title: "传阅",
      },
      component: resolve => require(['views/bianhan/admin/cy.vue'], resolve),
    }
    ]
  }
  ]
},
// 行长办公会议
// {
//   path: '/presidentMeeting',
//   name: 'presidentMeeting',
//   redirect: '/presidentMeeting/topicSub',
//   meta: {
//     title: "行长办公会议",
//     needLogin: false,
//   },
//   component: resolve => require(['components/layout/empty.vue'], resolve),
//   children: [
//      {
//         path: '/presidentMeeting/topicSub',
//         name: 'topicSub',
//         meta: {
//           title: '议题报送',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/topicSub/index.vue'], resolve),
//       },
//       {
//         path: '/presidentMeeting/topicSub/topicDetail',
//         name: 'topicDetail',
//         meta: {
//           title: '报送详情',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/topicSub/topicDetail.vue'], resolve),
//       },
//       {
//         path: '/presidentMeeting/topicMange',
//         name: 'topicMange',
//         meta: {
//           title: '议题管理',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/topicMange/index.vue'], resolve),
//       },
//       {
//         path: '/presidentMeeting/topicMange/topicMangeDetail',
//         name: 'topicMangeDetail',
//         meta: {
//           title: '管理详情',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/topicMange/topicMangeDetail.vue'], resolve),
//       },
//       {
//         path: '/presidentMeeting/conferList',
//         name: 'conferList',
//         meta: {
//           title: '会议主办单',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/conferList/index.vue'], resolve),
//       },
//       {
//         path: '/presidentMeeting/conferList/conferDetail',
//         name: 'conferDetail',
//         meta: {
//           title: '主办单详情',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/conferList/conferDetail.vue'], resolve),
//       },
//       {
//         path: '/presidentMeeting/conferList/newYt',
//         name: 'newYt',
//         meta: {
//           title: '新增议题',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/conferList/newYt.vue'], resolve),
//       },
//       {
//         path: '/presidentMeeting/adNotice',
//         name: 'adNotice',
//         meta: {
//           title: '会议预通知',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/adNotice/index.vue'], resolve),
//       },
//       {
//         path: '/presidentMeeting/adNotice/adDetail',
//         name: 'adDetail',
//         meta: {
//           title: '预通知详情',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/adNotice/adDetail.vue'], resolve),
//       },

//       {
//         path: '/presidentMeeting/registerNotice',
//         name: 'formalNotice',
//         meta: {
//           title: '会议报名通知',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/registerNotice/index.vue'], resolve),
//       },
//       {
//         path: 'presidentMeeting/registerNotice/registerDetail',
//         name: 'registerDetail',
//         meta: {
//           title: '报名通知详情',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/registerNotice/registerDetail.vue'], resolve),
//       },
//       {
//         path: '/presidentMeeting/formalNotice',
//         name: 'formalNotice',
//         meta: {
//           title: '会议正式通知',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/formalNotice/index.vue'], resolve),
//       },
//       {
//         path: '/presidentMeeting/formalNotice/formalDetail',
//         name: 'formalDetail',
//         meta: {
//           title: '正式通知详情',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/formalNotice/formalDetail.vue'], resolve),
//       },
//     //   {
//     //     path: '/presidentMeeting/',
//     //     name: 'formalNotice',
//     //     meta: {
//     //       title: '会议正式通知',
//     //       needLogin: false,
//     //     },
//     //     component: resolve => require(['views/presidentMeeting/formalNotice/index.vue'], resolve),
//     //   },
//     //   {
//     //     path: '/presidentMeeting/formalNotice/formalDetail',
//     //     name: 'formalDetail',
//     //     meta: {
//     //       title: '正式通知详情',
//     //       needLogin: false,
//     //     },
//     //     component: resolve => require(['views/presidentMeeting/formalNotice/formalDetail.vue'], resolve),
//     //   },
//       {
//        path: '/presidentMeeting/meetQuery',
//        name: 'meetQuery',
//         meta: {
//           title: '查询',
//           needLogin: false,
//         },
//         component: resolve => require(['views/presidentMeeting/meetQuery.vue'], resolve),
//       },
//       {
//         path: '/presidentMeeting/meetStatis',
//         name: 'meetStatis',
//          meta: {
//            title: '统计',
//            needLogin: false,
//          },
//          component: resolve => require(['views/presidentMeeting/meetStatis.vue'], resolve),
//        },
// ]
// },
{
  path: '/secretary',
  name: 'secretary',
  meta: {
    title: '秘书工作'
  },
  component: resolve => require(['views/secretary/layout/index.vue'], resolve),
  redirect: '/secretary/presidentMeeting/topicSub',
  children: [

    // {
    //   path: '/presidentWork',
    //   name: 'PresidentWork',
    //   meta: {
    //     title: '行长办公会',
    //     keepAlive: true,
    //     needLogin: true,
    //     id: '0502',
    //     parentId: '05'
    //   },
    //   component: resolve => require(['views/superviseHandle/presidentWork.vue'], resolve)
    // },
    // {
    //   path: '/leaderActivity',
    //   name: 'LeaderActivity',
    //   meta: {
    //     title: '领导活动安排',
    //     keepAlive: true,
    //     needLogin: true,
    //     id: '0503',
    //     parentId: '05'
    //   },
    //   component: resolve => require(['views/superviseHandle/leaderActivity.vue'], resolve)
    // },
    // {
    //   path: '/dutyTrends',
    //   name: 'DutyTrends',
    //   meta: {
    //     title: '值班动态',
    //     keepAlive: true,
    //     needLogin: true,
    //     id: '0504',
    //     parentId: '05'
    //   },
    //   component: resolve => require(['views/superviseHandle/dutyTrends.vue'], resolve)
    // },
    {
      path: '/secretary/leaderActivity',
      name: 'leaderActivity',
      redirect: '/secretary/leaderActivity/partCommitteeActivity',
      meta: {
        title: "领导活动安排",
        needLogin: false,
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [{
        path: '/secretary/leaderActivity/partCommitteeActivity',
        name: 'partCommitteeActivity',
        meta: {
          title: "党委成员活动安排",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/leaderActivity/partyCommitteeActivity/partCommitteeActivity.vue'], resolve),
      },
      {
        path: '/secretary/leaderActivity/topManagerActivity',
        name: 'partCommitteeActivity',
        meta: {
          title: "高管成员活动安排",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/leaderActivity/topManagerActivity/topManagerActivity.vue'], resolve),
      },
      {
        path: '/secretary/leaderActivity/secretaryWorkArrange',
        name: 'secretaryWorkArrange',
        meta: {
          title: "秘书工作安排",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/leaderActivity/secretaryWorkArrange/secretaryWorkArrange.vue'], resolve),
      },
      {
        path: '/secretary/leaderActivity/settingMember',
        name: 'settingMember',
        meta: {
          title: "成员配置",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/leaderActivity/settingMember/settingMember.vue'], resolve),
      },
      // {
      //   path: '/secretary/leaderActivity/settingPermission',
      //   name: 'settingPermission',
      //   meta: {
      //     title: "权限配置",
      //     needLogin: false,
      //   },
      //   component: resolve => require(['views/secretary/leaderActivity/settingPermission/settingPermission.vue'], resolve),
      // },
      {
        path: '/secretary/leaderActivity/selectLeaderActivity',
        name: 'selectLeaderActivity',
        meta: {
          title: "领导活动安排查询",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/leaderActivity/selectLeaderActivity/selectLeaderActivity.vue'], resolve),
      },
      {
        path: '/secretary/leaderActivity/statisLeaderActivity',
        name: 'statisLeaderActivity',
        meta: {
          title: "领导活动安排统计",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/leaderActivity/statisLeaderActivity/statisLeaderActivity.vue'], resolve),
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
      //   {
      //     path:'/sublicense',
      //     name:'Sublicense',
      //     meta:{
      //         title:'转授权',
      //         keepAlive:true,
      //         needLogin:false
      //     },
      //     component:resolve => require(['views/personalOffice/sublicense/sublicense.vue'],resolve),
      //     redirect:'/subTemp',
      //     children:[
      //         {
      //             path:'/subTemp',
      //             name:'SubTemp',
      //             meta:{
      //                 title:'临时转授权',
      //                 keepAlive:true,
      //                 needLogin:false
      //             },
      //             component:resolve => require(['views/personalOffice/sublicense/subTemp.vue'],resolve),
      //         },{
      //                 path:'/subLong',
      //                 name:'SubLong',
      //                 meta:{
      //                     title:'长期转授权',
      //                     keepAlive:true,
      //                     needLogin:false
      //                 },
      //             component:resolve => require(['views/personalOffice/sublicense/subLong.vue'],resolve),
      //         }
      //     ]
      // },
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
      }, {
        path: '/singleSearch',
        name: 'SingleSearch',
        meta: {
          title: '查询',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/superviseHandle/search/singleSearch.vue'], resolve),
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
        redirect: '/zxdbdxdcb',
        component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/index.vue'], resolve),
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
        }
        ]
      },
        // {
        //   path: '/administratorCheck',
        //   name: 'AdministratorCheck',
        //   meta: {
        //     title: '管理员查看',
        //     keepAlive: true,
        //     needLogin: false
        //   },
        //   component: resolve => require(['views/superviseHandle/superviseHandleChildren/administratorCheck.vue'], resolve),
        //   children:[
        //       {
        //         path: '/single',
        //         name: 'Single',
        //         meta: {
        //           title: '单项督办查',
        //           keepAlive: true,
        //           needLogin: false
        //         },
        //         component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/single.vue'], resolve),
        //       },
        //       {
        //         path: '/batch',
        //         name: 'Batch',
        //         meta: {
        //           title: '批量督办查',
        //           keepAlive: true,
        //           needLogin: false
        //         },
        //         component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/batch.vue'], resolve),
        //       },
        //       {
        //         path: '/joinl',
        //         name: 'Joinl',
        //         meta: {
        //           title: '协办',
        //           keepAlive: true,
        //           needLogin: false
        //         },
        //         component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/joinl.vue'], resolve),
        //       },
        //       {
        //         path: '/handRound',
        //         name: 'HandRound',
        //         meta: {
        //           title: '传阅',
        //           keepAlive: true,
        //           needLogin: false
        //         },
        //         component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/handRound.vue'], resolve),
        //       },
        //     ]
        //   },

      ],
    },
    {
      path: 'partyMemLeavRep',
      name: 'partyMemLeavRep',
      redirect: '/newProj',
      meta: {
        title: "党委成员离京报告",
        needLogin: false,
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [{
        path: 'newProj',
        name: 'newProj',
        meta: {
          title: "新建",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/partyMemLeavRep/newProj/index.vue'], resolve),
      }]
    },

    // {
    //   path: '/secretary/partyMemLeavRep/newProj',
    //   name: 'partyMemLeavRep',
    //   redirect: '/secretary/partyMemLeavRep/newProj',
    //   meta: {
    //     title: "党委成员离京报告",
    //     needLogin: false,
    //   },
    //   component: resolve => require(['components/layout/empty.vue'], resolve),
    //   children: [{
    //     path: '/secretary/partyMemLeavRep/newProj',
    //     name: 'newProj',
    //     meta: {
    //       title: "新建",
    //       needLogin: false,
    //     },
    //     component: resolve => require(['views/secretary/partyMemLeavRep/newProj/index.vue'], resolve),
    //   }]
    // },
    //  行长办公会议
    {
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
        path: '/secretary/presidentMeeting/topicMange',
        name: 'topicMange',
        meta: {
          title: '议题管理',
          needLogin: false,
        },
        component: resolve => require(['views/secretary/presidentMeeting/topicMange/index.vue'], resolve),
      },
      {
        path: '/secretary/presidentMeeting/conferList',
        name: 'conferList',
        meta: {
          title: '会议主办单',
          needLogin: false,
        },
        component: resolve => require(['views/conferList/index.vue'], resolve),
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
        path: '/secretary/presidentMeeting/registerNotice',
        name: 'registerNotice',
        meta: {
          title: '会议报名通知',
          needLogin: false,
        },
        component: resolve => require(['views/registerNotice/index.vue'], resolve),
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
        path: '/secretary/leaderActivity/paramMatain',
        name: 'paramMatain',
        meta: {
          title: "参数维护",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/leaderWtitten/paramMatain.vue'], resolve),
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
      }
      ]
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
    {
      path: '/secretary/dutyRoster',
      name: 'dutyRoster',
      redirect: '/secretary/dutyRoster/dutyFormwork',
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
      path: '/secretary/adressBook/adressFormwork',
      name: 'adressBook',
      redirect: '/secretary/dutyRoster/dutyFormwork',
      meta: {
        title: "通讯录报送",
        needLogin: false,
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [{
        path: '/secretary/adressBook/adressFormwork',
        name: 'dutyFormwork',
        meta: {
          title: "通讯录报送",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/adressBook/adressFormwork.vue'], resolve),
      },
      {
        path: '/secretary/adressBook/adressTable',
        name: 'dutyTable',
        meta: {
          title: "通讯录报送查看",
          needLogin: false,
        },
        component: resolve => require(['views/secretary/adressBook/adressTable.vue'], resolve),
      },
      {
        path: '/secretary/adressBook/submission',
        name: 'adressSubmission',
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
      redirect: '/secretary/linkman/linkForm',
      meta: {
        title: "联系人报送",
        needLogin: false,
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [{
        path: '/secretary/linkman/linkForm',
        name: 'searchPhone',
        meta: {
          title: '新建',
          needLogin: false,
        },
        component: resolve => require(['views/secretary/linkman/linkForm.vue'], resolve),
      },
      {
        path: '/secretary/linkman/LookLinkMan',
        name: 'searchPhone',
        meta: {
          title: '查看',
          needLogin: false,
        },
        component: resolve => require(['views/secretary/linkman/LookLinkMan.vue'], resolve),
      },
      {
        path: '/secretary/linkman/queryLinkMan',
        name: 'searchPhone',
        meta: {
          title: '查询',
          needLogin: false,
        },
        component: resolve => require(['views/secretary/linkman/queryLinkMan.vue'], resolve),
      },
      ]
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
        path: '/bianhan/phoneForm/searchPhone',
        name: 'searchPhone',
        meta: {
          title: '查询',
          needLogin: false,
        },
        component: resolve => require(['views/bianhan/phoneForm/searchPhone.vue'], resolve),
      },
      {
        path: '/bianhan/phoneForm/statistics',
        name: 'statistics',
        meta: {
          title: '统计',
          needLogin: false,
        },
        component: resolve => require(['views/bianhan/phoneForm/statistics.vue'], resolve),
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
      redirect: '/secretary/searchFile',
      meta: {
        title: "文件处理单",
        needLogin: false,
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [{
        path: '/bianhan/docHandling/docHandlingList',
        name: 'docHandlingList',
        meta: {
          title: '文件办理单',
          needLogin: false,
        },
        component: resolve => require(['views/bianhan/docHandling/docHandlingList.vue'], resolve),
      },
      {
        path: '/bianhan/searchFile',
        name: 'searchFile',
        meta: {
          title: '文件处理单',
          needLogin: false,
        },
        component: resolve => require(['views/bianhan/searchFile.vue'], resolve),
      },

      {
        path: '/bianhan/checkFileNote',
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
        path: '/bianhan/paramsMatainianList',
        name: 'paramsMatainianList',
        meta: {
          title: '参数维护',
          needLogin: false,
        },
        component: resolve => require(['views/bianhan/paramsMatainianList.vue'], resolve),
      },
      {
        path: '/bianhan/searchFile',
        name: 'searchFile',
        meta: {
          title: '查询',
          needLogin: false,
        },
        component: resolve => require(['views/bianhan/searchFile.vue'], resolve),
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
        meta: {
          title: '信息报送',
          needLogin: false,
        },
        component: resolve => require(['views/secretary/dutyTrends/index.vue'], resolve),
      },
      {
        path: '/secretary/dutyTrends/infoEdit/infoEdit',
        meta: {
          title: '信息采编',
          needLogin: false,
        },
        // component: resolve => require(['views/secretary/dutyTrends/infoEdit/infoEdit.vue'], resolve),

        component: resolve => require(['components/layout/empty.vue'], resolve),

        children: [

          {
            path: '/secretary/dutyTrends/infoEdit/infoEdit',
            name: 'submitColumna',
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
          }
        ]
      },
      {
        path: '/secretary/dutyTrends/cqNotice/index',
        meta: {
          title: '错情通知',
          needLogin: false,
        },
        component: resolve => require(['views/secretary/dutyTrends/cqNotice/index.vue'], resolve),
      },
      //信息发布
      {
        path: '/secretary/dutyTrends/release',
        meta: {
          title: '信息发布',
          needLogin: false,
        },
        component: resolve => require(['views/secretary/dutyTrends/release/index.vue'], resolve),

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
          path: '/secretary/dutyTrends/params/activityType',
          name: 'activityType',
          meta: {
            title: '活动类别配置',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/dutyTrends/activityType/index.vue'], resolve),
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
          path: '/secretary/dutyTrends/params/submitDate',
          name: 'submitDate',
          meta: {
            title: '投稿时间配置',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/dutyTrends/submitDate/index.vue'], resolve),
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
          path: '/secretary/dutyTrends/params/model',
          name: 'model',
          meta: {
            title: '模板配置',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/dutyTrends/model/index.vue'], resolve),
        },
        {
          path: '/secretary/dutyTrends/params/publishLimit',
          name: 'publishLimit',
          meta: {
            title: '发布范围配置',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/dutyTrends/publishLimit/index.vue'], resolve),
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
          name: 'managerCheck',
          meta: {
            title: '信息报送',
            needLogin: false,
          },
          component: resolve => require(['components/layout/empty.vue'], resolve)
        },
        {
          path: '/secretary/dutyTrends/managerCheck/article',
          name: 'article',
          meta: {
            title: '成刊稿件',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/dutyTrends/managerCheck/article/index.vue'], resolve),
        },
        {
          path: '/secretary/dutyTrends/managerCheck/errorInfoNotice',
          name: 'errorInfoNotice',
          meta: {
            title: '错情通知',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/dutyTrends/managerCheck/errorInfoNotice/index.vue'], resolve),
        },
        {
          path: '/secretary/dutyTrends/managerCheck/publicInfo',
          name: 'publicInfo',
          meta: {
            title: '发布信息',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/dutyTrends/managerCheck/publicInfo/index.vue'], resolve),
        }
        ]
      },
        // {
        //   path: '/secretary/dutyTrends/statistics',
        //   name: 'statistics_activity',
        //   meta: {
        //     title: '统计',
        //     needLogin: false,
        //   },
        //   component: resolve => require(["components/layout/empty.vue"], resolve),
        //   children: [{
        //       path: '/secretary/dutyTrends/statistics/contribute',
        //       name: 'statistics_contribute',
        //       meta: {
        //         title: '按投稿栏目统计',
        //         needLogin: false,
        //         component: resolve => require(['views/secretary/dutyTrends/managerCheck/infoSend/index.vue'], resolve),
        //       }
        //     }, {
        //       path: '/secretary/dutyTrends/statistics/activity',
        //       name: 'statistics_activity',
        //       meta: {
        //         title: '按活动类型统计',
        //         needLogin: false,
        //       },
        //       component: resolve => require(['views/secretary/dutyTrends/statistics/activity.vue'], resolve),
        //     },
        //     {
        //       path: '/secretary/dutyTrends/statistics/emotion',
        //       name: 'statistics_emotion',
        //       meta: {
        //         title: '错情统计',
        //         needLogin: false,
        //       },
        //       component: resolve => require(['views/secretary/dutyTrends/statistics/emotion.vue'], resolve),
        //     }
        //   ]
        // }


        // {
        //   path: '/secretary/dutyTrends/publication/alternative',
        //   name: 'alternative',
        //   meta: {
        //     title: '按日期查看',
        //     needLogin: false,
        //   },
        //   component: resolve => require(['views/secretary/dutyTrends/publication/alternative.vue'], resolve),
        // },
        // {
        //   path: '/secretary/dutyTrends/publication/branchbank',
        //   name: 'branchbank',
        //   meta: {
        //     title: '按部门查看',
        //     needLogin: false,
        //   },
        //   component: resolve => require(['views/secretary/dutyTrends/publication/branchbank.vue'], resolve),
        // },
        // {
        //   path: '/secretary/dutyTrends/publication/column',
        //   name: 'magazinecolumn',
        //   meta: {
        //     title: '按栏目查看',
        //     needLogin: false,
        //   },
        //   component: resolve => require(['views/secretary/dutyTrends/publication/column.vue'], resolve),
        // },
        // {
        //   path: '/secretary/dutyTrends/publication/editorCon',
        //   name: 'editorCon',
        //   meta: {
        //     title: '稿件列表',
        //     needLogin: false,
        //   },
        //   component: resolve => require(['views/secretary/dutyTrends/editorContribution.vue'], resolve),
        // },
        // {
        //   path: '/secretary/dutyTrends/searchContri',
        //   name: 'searchContri',
        //   meta: {
        //     title: '查询',
        //     needLogin: false,
        //   },
        //   component: resolve => require(['views/secretary/dutyTrends/searchContri.vue'], resolve),
        // },
        // {
        //   path: '/secretary/dutyTrends/statistics/activity',
        //   name: 'statistics_activity',
        //   meta: {
        //     title: '按活动类型统计',
        //     needLogin: false,
        //   },
        //   component: resolve => require(['views/secretary/dutyTrends/statistics/activity.vue'], resolve),
        // },
        // {
        //   path: '/secretary/dutyTrends/statistics/contribute',
        //   name: 'statistics_contribute',
        //   meta: {
        //     title: '按投稿栏目统计',
        //     needLogin: false,
        //   },
        //   component: resolve => require(['views/secretary/dutyTrends/statistics/contribute.vue'], resolve),
        // },
        // {
        //   path: '/secretary/dutyTrends/statistics/emotion',
        //   name: 'statistics_emotion',
        //   meta: {
        //     title: '情绪统计',
        //     needLogin: false,
        //   },
        //   component: resolve => require(['views/secretary/dutyTrends/statistics/emotion.vue'], resolve),
        // },

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
        path: '/secretary/adminDuty/statistics/statisticsResult',
        name: 'statisticsResult',
        meta: {
          title: '值班统计',
          needLogin: false,
        },
        component: resolve => require(['views/secretary/adminDuty/statistics/statisticsResult.vue'], resolve)
      },

      {
        path: '/secretary/adminDuty/maintain',
        name: 'maintain',
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
      },
      {
        path: '/secretary/adminDuty/adminView',
        name: 'adminView',
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
        }]
      }
      ]
    },
    {
      path: '/secretary/superviseOffice',
      name: 'superviseEffic',
      // redirect: '/secretary/superviseEffic/requestItem/unloadNum/unloadDetail',
      redirect: '/secretary/superviseOffice/instructions/loadPage',
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
        component: resolve => require(['views/secretary/superviseOffice/instructions/loadPage.vue'], resolve),

        children: [
          {
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
        // path: '/secretary/superviseOffice/maintenance/information',
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
      path: '/secretary/superviseEffic',
      name: 'superviseEffic',
      redirect: '/secretary/superviseEffic/requestItem/unloadNum/unloadDetail',
      meta: {
        title: "督办公文办理效率",
        needLogin: false,
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [{
        path: '/secretary/superviseEffic/requestItem',
        name: 'requestItem',
        meta: {
          title: '请示事项',
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
          path: '/secretary/superviseEffic/requestItem/unloadNum',
          name: 'unloadNum',
          meta: {
            title: '卸数',
            needLogin: false,
          },
          component: resolve => require(['components/layout/empty.vue'], resolve),
          children: [{
            path: '/secretary/superviseEffic/requestItem/unloadNum/unloadDetail',
            name: 'unloadDetail',
            meta: {
              title: '明细卸载',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/superviseEffic/requestItem/unloadNum/unloadDetail.vue'], resolve)
          },
          {
            path: '/secretary/superviseEffic/requestItem/unloadNum/logInfo',
            name: 'logInfo',
            meta: {
              title: '日志信息',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/superviseEffic/requestItem/unloadNum/logInfo.vue'], resolve)
          }
          ]
        },
        {
          path: '/secretary/superviseEffic/requestItem/loading',
          name: 'loading',
          meta: {
            title: '加载',
            needLogin: false,
          },
          component: resolve => require(['components/layout/empty.vue'], resolve),
          children: [{
            path: '/secretary/superviseEffic/requestItem/loading/batchLoad',
            name: 'batchLoad',
            meta: {
              title: '批量加载',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/superviseEffic/requestItem/loading/batchLoad.vue'], resolve)
          }]
        },
        {
          path: '/secretary/superviseEffic/requestItem/statistics',
          name: 'statistics',
          meta: {
            title: '统计',
            needLogin: false,
          },
          component: resolve => require(['components/layout/empty.vue'], resolve),
          children: [{
            path: '/secretary/superviseEffic/requestItem/statistics/statisticsIndex',
            name: 'statisticsIndex',
            meta: {
              title: '统计',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/superviseEffic/requestItem/statistics/statisticsIndex.vue'], resolve)
          },
          {
            path: '/secretary/superviseEffic/requestItem/statistics/export',
            name: 'export',
            meta: {
              title: '导出',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/superviseEffic/requestItem/statistics/export.vue'], resolve)
          }
          ]
        },
        {
          path: '/secretary/superviseEffic/requestItem/host',
          name: 'host',
          meta: {
            title: '主办',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/superviseEffic/requestItem/host/index.vue'], resolve),
        },
        ]
      },
      {
        path: '/secretary/superviseEffic/signOff',
        name: 'signOff',
        meta: {
          title: '会签行签报',
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
          path: '/secretary/superviseEffic/signOff/sOffLoading',
          name: 'sOffLoading',
          meta: {
            title: '加载',
            needLogin: false,
          },
          component: resolve => require(['components/layout/empty.vue'], resolve),
          children: [{
            path: '/secretary/superviseEffic/signOff/sOffLoading/sOffBatchLoad',
            name: 'sOffBatchLoad',
            meta: {
              title: '批量加载',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/superviseEffic/signOff/sOffLoading/sOffBatchLoad.vue'], resolve)
          }]
        },
        {
          path: '/secretary/superviseEffic/signOff/sOffStatistics',
          name: 'sOffStatistics',
          meta: {
            title: '统计',
            needLogin: false,
          },
          component: resolve => require(['components/layout/empty.vue'], resolve),
          children: [{
            path: '/secretary/superviseEffic/signOff/sOffStatistics/sOffStatisticsIndex',
            name: 'sOffStatisticsIndex',
            meta: {
              title: '统计',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/superviseEffic/signOff/sOffStatistics/sOffStatisticsIndex.vue'], resolve)
          },
          {
            path: '/secretary/superviseEffic/signOff/sOffStatistics/sOffExport',
            name: 'sOffExport',
            meta: {
              title: '导出',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/superviseEffic/signOff/sOffStatistics/sOffExport.vue'], resolve)
          }
          ]
        },
        {
          path: '/secretary/superviseEffic/signOff/reportForm',
          name: 'reportForm',
          meta: {
            title: '报表',
            needLogin: false,
          },
          component: resolve => require(['components/layout/empty.vue'], resolve),
          children: [{
            path: '/secretary/superviseEffic/signOff/reportForm/draftDepart',
            name: 'draftDepart',
            meta: {
              title: '按拟稿部门',
              needLogin: false,
            },
            component: resolve => require(['views/secretary/superviseEffic/signOff/reportForm/draftDepart.vue'], resolve)
          }]
        }

        ]
      },
      {
        path: '/secretary/superviseEffic/param',
        name: 'param',
        meta: {
          title: '参数维护',
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
          path: '/secretary/superviseEffic/param/departInfo',
          name: 'departInfo',
          meta: {
            title: '部门信息配置',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/superviseEffic/param/departInfo.vue'], resolve)
        },
        {
          path: '/secretary/superviseEffic/param/workTime',
          name: 'workTime',
          meta: {
            title: '工作时段配置',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/superviseEffic/param/workTime.vue'], resolve)
        },
        {
          path: '/secretary/superviseEffic/param/holidayInfo',
          name: 'holidayInfo',
          meta: {
            title: '节假日信息',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/superviseEffic/param/holidayInfo.vue'], resolve)
        },
        {
          path: '/secretary/superviseEffic/param/template',
          name: 'template',
          meta: {
            title: '模板样式',
            needLogin: false,
          },
          component: resolve => require(['views/secretary/superviseEffic/param/template.vue'], resolve)
        },
        ]
      }
      ]
    },
    {
      path: '/secretary/approvalStatistics',
      name: 'approvalStatistics',
      meta: {
        title: "主要负责人请假备案信息",
        needLogin: false,
      },
      component: resolve => require(['views/secretary/approvalStatistics/record.vue'], resolve),
      children: [{
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
  path: '/publication',
  redirect: '/publication/tgMangement/manuscriptList',
  // redirect: '/publication/editJournal/browsing',
  name: 'publication',
  meta: {
    title: '信息刊物',
  },
  component: resolve => require(['views/publication/layout/index.vue'], resolve),
  children: [
    //投稿管理
    {
      path: '/publication/tgMangement',
      redirect: '/publication/tgMangement/manuscriptList',
      name: 'tgMangement',
      meta: {
        title: '投稿管理',
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [
        // 撰写稿件
        {
          path: '/publication/tgMangement/wriScript/repairScript',
          name: 'repairScript',
          meta: {
            title: "撰写稿件",
            needLogin: false,
          },
          component: resolve => require(['views/publication/tgMangement/wriScript/repairScript/index.vue'], resolve),
        },
        // 稿件列表
        {
          path: '/publication/tgMangement/manuscriptList',
          name: 'manuscriptList',
          meta: {
            title: "稿件列表",
            needLogin: false,
          },
          component: resolve => require(['views/publication/tgMangement/manuscriptList.vue'], resolve),
        },
        // 采用信息
        {
          path: '/publication/tgMangement/adoptInfo',
          name: 'adoptInfo',
          meta: {
            title: "采用信息",
            needLogin: false,
          },
          // src\views\publication\tgMangement\adoptInfo\index.vue
          component: resolve => require(['views/publication/tgMangement/adoptInfo/index.vue'], resolve),
          // children:[]
        },
        // 投稿查询
        {
          path: '/publication/tgMangement/tgInquiry',
          name: 'tgInquiry',
          meta: {
            title: "稿件列表",
            needLogin: false,
          },
          component: resolve => require(['views/publication/tgMangement/tgInquiry.vue'], resolve),
        },
      ],
    },
    // 刊物编辑
    {
      path: '/publication/editJournal',
      redirect: '/publication/editJournal/browsing/index',
      name: 'editJournal',
      meta: {
        title: '刊物编辑'
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [
        // 来稿浏览
        {
          path: '/publication/editJournal/browsing/index',

          name: 'browsing',
          meta: {
            title: "来稿浏览",
            needLogin: false,
          },
          component: resolve => require(['views/publication/editJournal/browsing/index.vue'], resolve),
        },
        // {
        //   path: '/publication/editJournal/browsing/laigao',
        //   name: 'laigao',
        //   meta: {
        //     title: "来稿"
        //   },
        //   component: resolve => require(['views/publication/editJournal/browsing/laigao.vue'], resolve)
        // },
        // 备选会商
        {
          path: '/publication/editJournal/altBusiness/index',
          name: 'altBusiness',
          meta: {
            title: "备选会商",
            needLogin: false,
          },
          component: resolve => require(['views/publication/editJournal/altBusiness/index.vue'], resolve)
        },

        {
          path: '/publication/editJournal/editRent',
          name: 'editRent',
          meta: {
            title: "采编租刊",
            needLogin: false,
          },
          component: resolve => require(['views/publication/editJournal/editRent/index.vue'], resolve)
        },
        // {
        //   path: '/publication/editJournal/editJournal/altBusiness/editRent',
        //   name: 'business',
        //   meta: {
        //     title: "详情"
        //   },
        //   component: resolve => require(['views/publication/editJournal/editRent/rent.vue'], resolve)
        // },
        {
          path: '/publication/editJournal/queryScript',
          name: 'queryScript',
          meta: {
            title: "用稿查询",
            needLogin: false,
          },
          component: resolve => require(['views/publication/editJournal/queryScript.vue'], resolve)
        },
      ]


    },
    // 稿件统计
    {
      path: '/publication/tjScript',
      redirect: '/publication/tjScript/detailScript',
      name: 'tjScript',
      meta: {
        title: '稿件统计',
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [{
        path: '/publication/tjScript/detailScript',
        name: 'detailScript',
        meta: {
          title: "用稿明细",
          needLogin: false,
        },
        component: resolve => require(['views/publication/tjScript/detailScript.vue'], resolve),
      },
      {
        path: '/publication/tjScript/rate',
        name: 'rate',
        meta: {
          title: "用稿率",
          needLogin: false,
        },
        component: resolve => require(['views/publication/tjScript/rate.vue'], resolve),
      },
      {
        path: '/publication/tjScript/scoring',
        name: 'scoring',
        meta: {
          title: "稿件评分",
          needLogin: false,
        },
        component: resolve => require(['views/publication/tjScript/scoring.vue'], resolve),
      },

      ]
    },
    // 已发布期刊
    {
      path: '/publication/parameter',
      redirect: '/publication/parameter/manage',
      name: 'publication',
      meta: {
        title: '已发布期刊',
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [{
        path: '/publication/pubJournal/wholeSkim',
        name: 'wholeSkim',
        meta: {
          title: "整刊浏览",
          needLogin: false,
        },
        component: resolve => require(['views/publication/pubJournal/wholeSkim.vue'], resolve),
      },
      {
        path: '/publication/pubJournal/byEntry',
        name: 'byEntry',
        meta: {
          title: "按条目浏览",
          needLogin: false,
        },
        component: resolve => require(['views/publication/pubJournal/byEntry/index.vue'], resolve),
      },
      {
        path: '/publication/pubJournal/entryQuery',
        name: 'entryQuery',
        meta: {
          title: "录用条目查询",
          needLogin: false,
        },
        component: resolve => require(['views/publication/pubJournal/entryQuery.vue'], resolve),
      },
        // {
        //   path: '/publication/pubJournal/byEntry/dailyNews',
        //   name: 'dailyNews',
        //   meta: {
        //     title: "每日动态",
        //     needLogin: false,
        //   },
        //   component: resolve => require(['views/publication/pubJournal/byEntry/dailyNews.vue'], resolve),
        // },
      ]
    },
    //参数配置
    {
      path: '/publication/parameter/manage/index',
      name: 'browsing',
      meta: {
        title: "参数配置",
        needLogin: false,
      },
      component: resolve => require(['views/publication/parameter/manage/index.vue'], resolve),
      children: [{
        path: '/publication/parameter/manage/index',
        name: 'browsing',
        meta: {
          title: "刊物管理",
          needLogin: false,
        },
        component: resolve => require(['views/publication/parameter/manage/index.vue'], resolve),
      },
      {
        path: '/publication/parameter/model/index',
        name: 'muban',
        meta: {
          title: "模板管理",
          needLogin: false,
        },
        component: resolve => require(['views/publication/parameter/model/index.vue'], resolve),
      },
      {
        path: '/publication/parameter/model/contribution',
        name: 'contribution',
        meta: {
          title: "直接投稿",
          needLogin: false,
        },
        component: resolve => require(['views/publication/parameter/model/contribution.vue'], resolve),
      },

      {
        path: '/publication/parameter/department/index',
        name: 'departantment',
        meta: {
          title: "统计合并部门",
          needLogin: false,
        },
        component: resolve => require(['views/publication/parameter/department/index.vue'], resolve),
      },
      {
        path: '/publication/parameter/department/common',
        name: 'departantment',
        meta: {
          title: "常用部门及发送配置",
          needLogin: false,
        },
        component: resolve => require(['views/publication/parameter/department/common.vue'], resolve),
      },
      {
        path: '/publication/parameter/review/index',
        name: 'review',
        meta: {
          title: "评审意见配置",
          needLogin: false,
        },
        component: resolve => require(['views/publication/parameter/review/index.vue'], resolve),
      },
      ]

    },
    //部门信息
    {
      path: '/publication/departInfo',
      redirect: '/publication/departInfo/index',
      name: 'publication',
      meta: {
        title: '部门信息',
        needLogin: false,
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [
        // 制发信息
        {
          path: '/publication/departInfo/index',
          name: 'browsing',
          meta: {
            title: "制发信息",
            needLogin: false,
          },
          component: resolve => require(['views/publication/departInfo/index.vue'], resolve),
        },
        //发布信息
        {
          path: '/publication/departInfo/release',
          name: 'browsings',
          meta: {
            title: "发布信息",
            needLogin: false,
          },
          component: resolve => require(['views/publication/departInfo/release.vue'], resolve),
        },
        //查询
        {
          path: '/publication/departInfo/query',
          name: 'query',
          meta: {
            title: "查询",
            needLogin: false,
          },
          component: resolve => require(['views/publication/departInfo/query.vue'], resolve),
        },
        //参数维护
        {
          path: '/publication/departInfo/maintain',
          name: 'query',
          meta: {
            title: "参数维护",
            needLogin: false,
          },
          component: resolve => require(['views/publication/departInfo/maintain.vue'], resolve),
          children: [
            //  参数维护
            {
              path: '/publication/departInfo/bigMaintain/csMaintain',
              name: 'csMaintain',
              meta: {
                title: "信息种类维护",
                needLogin: false,
              },
              component: resolve => require(['views/publication/departInfo/bigMaintain/csMaintain.vue'], resolve),
            },
            {
              path: '/publication/departInfo/bigMaintain/jbcsMaintain',
              name: 'jbcsMaintain',
              meta: {
                title: "信息编号维护",
                needLogin: false,
              },
              component: resolve => require(['views/publication/departInfo/bigMaintain/jbcsMaintain.vue'], resolve),
            },
          ]


        },
      ]
    }
  ],
},

{
  path: '/sealManage',
  redirect: '/sealManage/useSeal',
  name: 'sealManage',
  meta: {
    title: '印章管理'
  },
  component: resolve => require(['views/sealManage/layout/index.vue'], resolve),
  children: [{
    path: '/sealManage/useSeal',
    name: 'useSeal',
    meta: {
      title: "用印管理",
      needLogin: false,
    },
    component: resolve => require(['views/sealDrafttt/index.vue'], resolve)
  },
  // 印章刻制
  {
    path: '/sealManage/markMgr',
    name: 'markMgr',
    redirect: '/sealManage/markMgr/index',
    meta: {
      title: "印章刻制",
      needLogin: false,
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/sealManage/markMgr/drafting',
      name: 'drafting',
      meta: {
        title: "起草刻制审批",
        needLogin: false,
      },
      component: resolve => require(['views/sealManage/markMgr/drafting.vue'], resolve),
    }]
  },
  // 印章废止
  {
    path: '/sealManage/sealAbolished',
    name: 'sealAbolished',
    redirect: '/sealManage/sealAbolished/index',
    meta: {
      title: '印章废止',
      needLogin: false,
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/sealManage/sealAbolished/abolishedDraft',
      name: 'abolishedDraft',
      meta: {
        title: "起草废止审批",
        needLogin: false,
      },
      component: resolve => require(['views/sealManage/sealAbolished/abolishedDraft.vue'], resolve),
    }]
  },
  // 印章销毁
  {
    path: '/sealManage/sealDestroy',
    name: 'sealDestroy',
    redirect: '/sealManage/sealDestroy/index',
    meta: {
      title: '印章销毁',
      needLogin: false,
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/sealManage/sealDestroy/sealDestroyDraft',
      name: 'sealDestroyDraft',
      meta: {
        title: "起草印章销毁",
        needLogin: false,
      },
      component: resolve => require(['views/sealManage/sealDestroy/sealDestroyDraft.vue'], resolve),
    }]
  },
  // 印章保管人登记
  {
    path: '/sealManage/keeperRegister',
    name: 'keeperRegister',
    redirect: '/sealManage/keeperRegister/index',
    meta: {
      title: '印章保管人登记',
      needLogin: false,
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    // children: [{
    //   path: '/sealManage/keeperRegister/keeperRegisterForm',
    //   name: 'keeperRegisterForm',
    //   meta: {
    //     title: "印章保管人登记单",
    //     needLogin: false,
    //   },
    //   component: resolve => require(['views/sealManage/keeperRegister/registerForm.vue'], resolve),
    // }]
  },
  // 印章登记
  {
    path: '/sealManage/sealRegister',
    name: 'sealRegister',
    redirect: '/sealManage/sealRegister/index',
    meta: {
      title: '印章登记',
      needLogin: false,
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/sealManage/sealRegister/sealRegisterForm',
      name: 'sealRegisterForm',
      meta: {
        title: "印章登记单",
        needLogin: false,
      },
      component: resolve => require(['views/sealManage/sealRegister/sealRegister.vue'], resolve),
    }]
  },
  // 印章保管交接
  {
    path: '/sealManage/sealKeeperChange',
    name: 'sealKeeperChange',
    redirect: '/sealManage/sealKeeperChange/index',
    meta: {
      title: '印章保管交接',
      needLogin: false,
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/sealManage/sealKeeperChange/sealKeeperChangeForm',
      name: 'sealKeeperChangeForm',
      meta: {
        title: "起草印章保管交接单",
        needLogin: false,
      },
      component: resolve => require(['views/sealManage/sealKeeperChange/sealKeeperChange.vue'], resolve),
    }]
  },
  {
    path: '/sealManage/argumentPre',
    name: 'argumentPre',
    redirect: '/sealManage/argumentPre/streamPre',
    meta: {
      title: "参数维护",
      needLogin: false,
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/sealManage/argumentPre/streamPre',
      name: 'streamPre',
      meta: {
        title: "流水号维护",
        needLogin: false,
      },
      component: resolve => require(['views/sealManage/argumentPre/streamPre.vue'], resolve),
      // children:[
      //   {
      //     path: '/sealManage/argumentPre/streamPre/groove',
      //     name: 'streamPregroove',
      //     meta: {
      //       title: "常规用印审批",
      //       needLogin: false,
      //     },
      //     component: resolve => require(['views/sealManage/argumentPre/groove.vue'], resolve),
      //   },
      //   {
      //     path: '/sealManage/argumentPre/streamPre/introLetter',
      //     name: 'introLetter',
      //     meta: {
      //       title: "介绍信审批",
      //       needLogin: false,
      //     },
      //     component: resolve => require(['views/sealManage/argumentPre/introLetter.vue'], resolve),
      //   }
      // ]
    },
    {
      path: '/sealManage/argumentPre/userConfigTable',
      name: 'userConfigTable',
      meta: {
        title: "用印管理常用配置项",
        needLogin: false,
      },
      component: resolve => require(['views/sealManage/argumentPre/userConTable'], resolve)
    },
    ]
  },
  //用印机制设备管理
  {
    path: '/sealManage/facilityManage',
    name: 'facilityManage',
    redirect: '/sealManage/usePrintingMachineEquipment',
    meta: {
      title: "用印机制设备管理",
      needLogin: false,
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/sealManage/facilityManage/connectDetect',
      name: 'connectDetect',
      meta: {
        title: "用印记设驱动检测",
        needLogin: false,
      },
      component: resolve => require(['views/sealManage/facilityManage/connectDetect.vue'], resolve),
    },
    {
      path: '/sealManage/facilityManage/facilityList',
      name: 'facilityList',
      meta: {
        title: "用印机设备登记",
        needLogin: false,
      },
      component: resolve => require(['views/sealManage/facilityManage/facilityList.vue'], resolve),
    },
    {
      path: '/sealManage/facilityManage/equipmentMaintenanceList',
      name: 'equipmentMaintenanceList',
      meta: {
        title: "用印机设备维护审批",
        needLogin: false,
      },
      component: resolve => require(['views/sealManage/facilityManage/equipmentMaintenanceList.vue'], resolve),
    }, {
      path: '/sealManage/facilityManage/statistical',
      name: 'statistical',
      meta: {
        title: "统计",
        needLogin: false,
      },
      component: resolve => require(['views/sealManage/facilityManage/statistical.vue'], resolve),
    },
    ]
  },
    // {
    //   path: '/sealManage/adminLook',
    //   name: 'adminLook',
    //   meta: {
    //     title: "管理员查看",
    //     needLogin: false,
    //   },
    //   component: resolve => require(['components/layout/empty.vue'], resolve),
    //   children: [{
    //     path: '/sealManage/adminLook/equipmentLook',
    //     name: 'equipmentLook',
    //     meta: {
    //       title: "用印机设备查看",
    //       needLogin: false,
    //     },
    //     component: resolve => require(['views/sealManage/adminLook/equipmentLook/equipmentLook.vue'], resolve),
    //   }, ]
    // },

  ]
},
{
  path: '/meeting',
  redirect: '/meeting/zf',
  name: 'meeting',
  meta: {
    title: '会议管理'
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
    path: '/meeting/yd',
    name: 'yd',
    meta: {
      title: "会议室预定",
      needLogin: false,
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/meeting/yd/meetingYd',
      name: 'meetingYd',
      meta: {
        title: "会议室预定",
        needLogin: false,
      },
      component: resolve => require(['views/meeting/yd/meetingYd.vue'], resolve),
    },
    {
      path: '/meeting/yd/drafts',
      name: 'drafts',
      meta: {
        title: "草稿箱",
        needLogin: false,
      },
      component: resolve => require(['views/meeting/yd/drafts.vue'], resolve),
    },
    {
      path: '/meeting/yd/print',
      name: 'print',
      meta: {
        title: "打印维护单",
        needLogin: false,
      },
      component: resolve => require(['views/meeting/yd/print.vue'], resolve),
    },
    {
      path: '/meeting/yd/parameter',
      name: 'parameter',
      meta: {
        title: "参数维护",
        needLogin: false,
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      // children: [{
      //     path: '/meeting/yd/csweihu/parameterConfiguration',
      //     name: 'parameterConfiguration',
      //     meta: {
      //       title: "参数配置",
      //       needLogin: false,
      //     },
      //     component: resolve => require(['views/meeting/yd/csweihu/parameterConfiguration.vue'], resolve),
      //   },
      //   {
      //     path: '/meeting/yd/csweihu/remind',
      //     name: 'remind',
      //     meta: {
      //       title: "非工作时间预定提醒",
      //       needLogin: false,
      //     },
      //     component: resolve => require(['views/meeting/yd/csweihu/remind.vue'], resolve),
      //   },
      //   {
      //     path: '/meeting/yd/csweihu/validity',
      //     name: 'validity',
      //     meta: {
      //       title: "会议室预定有效期",
      //       needLogin: false,
      //     },
      //     component: resolve => require(['views/meeting/yd/csweihu/validity.vue'], resolve),
      //   },
      //   {
      //     path: '/meeting/yd/csweihu/caption',
      //     name: 'caption',
      //     meta: {
      //       title: "会议室预定说明",
      //       needLogin: false,
      //     },
      //     component: resolve => require(['views/meeting/yd/csweihu/caption.vue'], resolve),
      //   },
      // ]
    },
    {
      path: '/meeting/yd/query',
      name: 'query',
      meta: {
        title: "查询",
        needLogin: false,
      },
      component: resolve => require(['views/meeting/yd/query.vue'], resolve),
    },
    {
      path: '/meeting/yd/queryResult',
      name: 'queryResult',
      meta: {
        title: "查询",
        needLogin: false,
      },
      component: resolve => require(['views/meeting/yd/queryResult.vue'], resolve),
    },

    {
      path: '/meeting/yd/statistic',
      name: 'statistic',
      meta: {
        title: "统计",
        needLogin: false,
      },
      component: resolve => require(['views/meeting/yd/statistic.vue'], resolve),
    },

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
  ],
},
{
  path: '/setting',
  redirect: '/setting/orgDepartment/orgIndex/orgIndexView',
  name: 'setting',
  meta: {
    title: '系统管理'
  },
  component: resolve => require(['views/setting/layout/index.vue'], resolve),
  children: [{
    path: '/setting/orgDepartment',
    name: 'orgDepartment',
    meta: {
      title: '组织机构',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/setting/layout/empty.vue'], resolve),
    children: [
      /*{
                path: '/setting/orgDepartment/orgIndex',
                name: 'orgIndex',
                meta: {
                  title: '机构索引管理',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/layout/empty.vue'], resolve),
                children: [{
                    path: '/setting/orgDepartment/orgIndex/orgIndexConfig',
                    name: 'orgIndexConfig',
                    meta: {
                      title: '配置机构索引',
                      keepAlive: true,
                      needLogin: false
                    },
                    component: resolve => require(['views/setting/organization-department/organization-index/config/index.vue'], resolve)
                  },

                  {
                    path: '/setting/orgDepartment/orgIndex/orgIndexView',
                    name: 'orgIndexView',
                    meta: {
                      title: '查看机构索引',
                      keepAlive: true,
                      needLogin: false
                    },
                    component: resolve => require(['views/setting/organization-department/organization-index/view/index.vue'], resolve)
                  },
                ]
              },*/
      {
        path: '/setting/orgDepartment/orgManage',
        name: 'orgManage',
        meta: {
          title: '机构管理',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/layout/empty.vue'], resolve),
        children: [
          /*{
                        path: '/setting/orgDepartment/orgManage/orgManageView',
                        name: 'orgManageView',
                        meta: {
                          title: '查看机构',
                          keepAlive: true,
                          needLogin: false
                        },
                        component: resolve => require(['views/setting/organization-department/organization-manage/view/index.vue'], resolve)
                      },*/
          /* {
path: '/setting/orgDepartment/orgManage/orgManageViewDetail',
name: 'orgManageViewDetail',
meta: {
title: '查看机构详情',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/organization-department/organization-manage/view/organizationInfo.vue'], resolve)
},*/
          /* {
                        path: '/setting/orgDepartment/orgManage/orgManageConfig',
                        name: 'orgManageConfig',
                        meta: {
                          title: '配置机构',
                          keepAlive: true,
                          needLogin: false
                        },
                        component: resolve => require(['views/setting/organization-department/organization-manage/config/index.vue'], resolve)
                      }*/
        ]
      },
      {
        path: '/setting/orgDepartment/departManage',
        name: 'departManage',
        meta: {
          title: '部门管理',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/layout/empty.vue'], resolve),
        children: [
          /*{
                        path: '/setting/orgDepartment/departManage/depManageConfig',
                        name: 'depManageConfig',
                        meta: {
                          title: '配置部门',
                          keepAlive: true,
                          needLogin: false
                        },
                        component: resolve => require(['views/setting/organization-department/department-manage/config/index.vue'], resolve)
                      },*/
          /*{
path: '/setting/orgDepartment/departManage/depManageView',
name: 'depManageView',
meta: {
title: '查看部门',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/organization-department/department-manage/view/index.vue'], resolve)
},*/
          /* {
path: '/setting/orgDepartment/departManage/departDetail',
name: 'departDetail',
meta: {
title: '查看部门详情',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/organization-department/department-manage/components/departDetail.vue'], resolve)
},*/
          /*{
path: '/setting/orgDepartment/orgManage/depManageAltera',
name: 'depManageAltera',
meta: {
title: '部门变更',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/organization-department/department-manage/alteration/index.vue'], resolve)
}*/
        ]
      },
      {
        path: '/setting/orgDepartment/personManage',
        name: 'personManage',
        redirect: '/setting/orgDepartment/personManage/extract',
        meta: {
          title: '人员管理',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/layout/empty.vue'], resolve),
        children: [
          /* {
path: '/setting/orgDepartment/personManage/personList',
name: 'personList',
meta: {
title: '人员列表',
keepAlive: true
},
component: resolve => require(['views/setting/organization-department/personManage/look/personList.vue'], resolve)
},*/
          /* {
path: '/setting/orgDepartment/personManage/extract',
name: 'extract',
meta: {
title: '提取人员',
keepAlive: true
},
component: resolve => require(['views/setting/organization-department/personManage/extract/extract.vue'], resolve)
},*/

          /* {
path: '/setting/orgDepartment/personManage/detailPerson',
name: 'detailPerson',
meta: {
title: '人员详情',
keepAlive: true
},
component: resolve => require(['views/setting/organization-department/personManage/look/detailPerson.vue'], resolve)
},
{
path: '/setting/orgDepartment/personManage/editPerson',
name: 'editPerson',
meta: {
title: '编辑人员',
keepAlive: true
},
component: resolve => require(['views/setting/organization-department/personManage/look/editPerson.vue'], resolve)
},
{
path: '/setting/orgDepartment/personManage/importUass',
name: 'importUass',
meta: {
title: '导入uass账户',
keepAlive: true
},
component: resolve => require(['views/setting/organization-department/personManage/look/importUass.vue'], resolve)
},*/
          /* {
path: '/setting/orgDepartment/personManage/sleepList',
name: 'sleepList',
meta: {
title: '查看休眠',
keepAlive: true
},
component: resolve => require(['views/setting/organization-department/personManage/sleep/sleepList.vue'], resolve)
},*/
          /* {
path: '/setting/orgDepartment/personManage/filePersonList',
name: 'filePersonList',
meta: {
title: '查看文件',
keepAlive: true
},
component: resolve => require(['views/setting/organization-department/personManage/file/filePersonList.vue'], resolve)
},*/
          /*{
path: '/setting/orgDepartment/personManage/addFilePerson',
name: 'addFilePerson',
meta: {
title: '新增',
keepAlive: true
},
component: resolve => require(['views/setting/organization-department/personManage/file/add.vue'], resolve)
}*/
        ]
      },
      {
        path: '/setting/orgDepartment/alterRecord',
        name: 'alterRecord',
        redirect: '/setting/orgDepartment/alterRecord/orgalterRecord',
        meta: {
          title: '变更记录管理',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/layout/empty.vue'], resolve),
      },
      {
        path: '/setting/orgDepartment/teamManage',
        name: 'teamManage',
        redirect: '/setting/orgDepartment/teamManage/teamList',
        meta: {
          title: '群组管理',
          needLogin: false
        },
        component: resolve => require(['views/setting/layout/empty.vue'], resolve),
      },
      {
        path: '/setting/orgDepartment/belongingWork',
        name: 'teamManage',
        redirect: '/setting/orgDepartment/belongingWork/index',
        meta: {
          title: '合署办公',
          needLogin: false
        },
        component: resolve => require(['views/setting/layout/empty.vue'], resolve),
      }

    ]
  },
  {
    path: '/setting/processControl',
    name: 'processControl',
    redirect: '/setting/processControl/mainProcessControl',
    meta: {
      title: '流程控制',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/setting/layout/empty.vue'], resolve),
    children: [{
      path: '/setting/processControl/mainProcessControl',
      name: 'mainProcessControl',
      meta: {
        title: '主流程',
        needLogin: false
      },
      component: resolve => require(['views/setting/processControl/main/mainProcessControl.vue'], resolve),
    },
    {
      path: '/setting/processControl/childProcessControl',
      name: 'childProcessControl',
      meta: {
        title: '子流程',
        needLogin: false
      },
      component: resolve => require(['views/setting/processControl/main/mainProcessControl.vue'], resolve),
    },
    {
      path: '/setting/processControl/processTemp',
      name: 'processTemp',
      meta: {
        title: '流程模板',
        needLogin: false
      },
      component: resolve => require(['views/setting/layout/empty.vue'], resolve),
      children: [{
        path: '/setting/processControll/processTemp/mainProcessTemp',
        name: 'mainProcessTemp',
        meta: {
          title: '主流程',
          needLogin: false
        },
        component: resolve => require(['views/setting/processControl/main/mainProcessControl.vue'], resolve),
      },
      {
        path: '/setting/processControll/processTemp/childProcessTemp',
        name: 'childProcessTemp',
        meta: {
          title: '子流程',
          needLogin: false
        },
        component: resolve => require(['views/setting/processControl/main/mainProcessControl.vue'], resolve),
      }
      ]
    }
      /*{
path: '/setting/processControl/addOrEditProcess',
name: 'addOrEditProcess',
meta: {
title: '编辑',
needLogin: false
},
component: resolve => require(['views/setting/processControl/main/addOrEditProcess.vue'], resolve),
},
{
path: '/setting/processControl/linkSetting',
name: 'linkSetting',
meta: {
title: '环节定义',
needLogin: false
},
component: resolve => require(['views/setting/processControl/main/linkSetting.vue'], resolve),
}*/
    ],
  },
  {
    path: '/setting/designDictionary',
    name: 'designDictionary',
    meta: {
      title: '设计词典',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/setting/layout/empty.vue'], resolve),
    children: [{
      path: '/setting/sysConfig/dictionaryPre',
      name: 'dictionaryTable',
      meta: {
        title: '字典维护',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/sysConfig/dictionary/index.vue'], resolve)
    },
    {
      path: '/setting/designDictionary/businessClassify',
      name: 'businessClassify',
      meta: {
        title: "业务分类",
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/designDictionary/businessClassify/businessClassify.vue'], resolve),
    },

    /* {
path: '/setting/designDictionary/businessClassify/businessClassifySet',
name: 'businessClassifySet',
meta: {
title: '业务分类设置',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/designDictionary/businessClassify/businessClassifySet.vue'], resolve)
},*/
    /* {
path: '/setting/designDictionary/businessClassify/designElementGroup',
name: 'designElementGroup',
meta: {
title: '设计元素集合',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/designDictionary/businessClassify/designElementGroup.vue'], resolve)
},*/
    {
      path: '/setting/designDictionary/designElement',
      name: 'designElement',
      meta: {
        title: "设计元素",
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/designDictionary/designElement/designElementSettingg.vue'], resolve),
      children: []
    },
    /* {
path: '/setting/designDictionary/designElement/designElementSetting',
name: 'designElementSetting',
meta: {
title: '设计元素集合设置',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/designDictionary/designElement/designElementAdd.vue'], resolve)
},*/
    {
      path: '/setting/designDictionary/institutionConfig',
      name: 'institutionConfig',
      meta: {
        title: "机构配置",
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/designDictionary/institutionConfig.vue'], resolve),

    }, {
      path: '/setting/designDictionary/departmentConfig',
      name: 'departmentConfig',
      meta: {
        title: "部门配置",
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/designDictionary/departmentConfig.vue'], resolve),

    },

    {
      path: '/setting/designDictionary/moduleConfig/moduleConfigList',
      name: 'moduleConfigList',
      meta: {
        title: "模块配置",
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/designDictionary/moduleConfig/moduleConfigList.vue'], resolve),

    },
      /* {
path: '/setting/designDictionary/moduleConfig/moduleConfigAdd',
name: 'moduleConfigAdd',
meta: {
title: "模块配置添加",
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/designDictionary/moduleConfig/moduleConfigAdd.vue'], resolve),

},*/

      /* {
path: '/setting/designDictionary/operateConfig',
name: 'operateConfig',
meta: {
title: "操作配置",
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/designDictionary/operateConfig.vue'], resolve),

},*/
      /*{
path: '/setting/designDictionary/operateConfigDetail',
name: 'operateConfigDetail',
meta: {
title: "操作配置详情",
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/designDictionary/operateConfigDetail.vue'], resolve),

},*/

      /* {
path: '/setting/designDictionary/functionConfig',
name: 'functionConfig',
meta: {
title: "功能配置",
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/designDictionary/functionConfig.vue'], resolve),

},*/
      /* {
path: '/setting/designDictionary/functionConfigDetail',
name: 'functionConfigDetail',
meta: {
title: "功能配置详情",
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/designDictionary/functionConfigDetail.vue'], resolve),

},
*/


    ]

  },
  {
    path: '/setting/themeLexicon',
    name: 'themeLexicon',
    meta: {
      title: '主题词库',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/setting/layout/empty.vue'], resolve),
    children: [{
      path: '/setting/themeLexicon/themeLexiconSet',
      name: 'themeLexiconSet',
      meta: {
        title: '主题词库设置',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/themeLexicon/index.vue'], resolve),
    },
    {
      path: '/setting/sysConfig/keyword',
      name: 'keyword',
      meta: {
        title: '主题词部门设置',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/sysConfig/keyword/index.vue'], resolve),
    }
    ]
  },
  {
    path: '/setting/inquire',
    name: 'inquire',
    meta: {
      title: '查询',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/setting/inquire/index.vue'], resolve)
  },
  {
    path: '/setting/statistics',
    name: 'statistics',
    meta: {
      title: '统计',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/setting/layout/empty.vue'], resolve),
    children: [{
      path: '/setting/statistics/analysis',
      name: 'analysis',
      meta: {
        title: '公文统计分析汇总',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/layout/empty.vue'], resolve),
      children: [{
        path: '/setting/statistics/analysis/wholeBank',

        meta: {
          title: '按全行统计',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/statistics/analysis/wholeBank.vue'], resolve)
      },
      {
        path: '/setting/statistics/analysis/lowerOrg',

        meta: {
          title: '按下级机构统计',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/statistics/analysis/lowerOrg.vue'], resolve)
      }
      ]
    },
    {
      path: '/setting/statistics/clickRate',
      name: 'clickRate',
      meta: {
        title: '公文点击率统计',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/statistics/click-rate/index.vue'], resolve)
    }
    ]
  },
  {
    path: '/setting/sysConfig',
    name: 'sysConfig',
    meta: {
      title: '系统配置',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/setting/layout/empty.vue'], resolve),

    children: [
      /*{
          path: '/setting/sysConfig/server',
          name: 'systable',
          meta: {
            title: '服务器配置',
            keepAlive: true,
            needLogin: false
          },
          component: resolve => require(['views/setting/sysConfig/server/index.vue'], resolve)
        },*/
      // {
      //   path: '/setting/sysConfig/server/serverdeal',
      //   name: 'serverdeal1',
      //   meta: {
      //     title: '服务器详情',
      //     keepAlive: true,
      //     needLogin: false
      //   },
      //   component: resolve => require(['views/setting/sysConfig/server/serverdeal.vue'], resolve)
      // },
      // {
      //   path: '/setting/sysConfig/server/servereditor',
      //   name: 'servereditor',
      //   meta: {
      //     title: '服务器编辑',
      //     keepAlive: true,
      //     needLogin: false
      //   },
      //   component: resolve => require(['views/setting/sysConfig/server/servereditor.vue'], resolve)
      // },
      /* {
path: '/setting//sysConfig/database',
name: 'database',
meta: {
title: '数据库配置',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/sysConfig/database/index.vue'], resolve)
},
{
path: '/setting/sysConfig/restPwd',
name: 'restPwd',
meta: {
title: '恢复用户口令',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/sysConfig/restuserpwd/index.vue'], resolve)
},*/
      {
        path: '/setting/sysConfig/texttem',
        name: 'texttem',
        meta: {
          title: '正文模板维护',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/sysConfig/texttem/index.vue'], resolve)
      },
      {
        path: '/setting/menuPermissionConfig',
        name: 'menuPermissionConfig',
        meta: {
          title: '菜单权限配置',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/menuPermissionConfig/index.vue'], resolve)
      },
      {
        path: '/setting/sysConfig/gradprotect',
        name: 'gradprotect',
        meta: {
          title: '分级维护设置',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/sysConfig/gradprotect/index.vue'], resolve)
      },

      {
        path: '/setting/sysConfig/payfiflter',
        name: 'payfiflter',
        meta: {
          title: '落款部门过滤设置',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/sysConfig/payfiflter/index.vue'], resolve)
      },
      {
        path: '/setting/sysConfig/otherconfig',
        name: 'otherconfig',
        meta: {
          title: '其他配置',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/layout/empty.vue'], resolve),
        children: [{
          path: '/setting/sysConfig/otherconfig/remindWechat',
          name: 'remindWechat',
          meta: {
            title: '微信提醒',
            keepAlive: true,
            needLogin: false
          },
          component: resolve => require(['views/setting/sysConfig/otherconfig/remindWechat.vue'], resolve)
        },
        {
          path: '/setting/sysConfig/otherconfig/holiday',
          name: 'holiday',
          meta: {
            title: '节假日配置',
            keepAlive: true,
            needLogin: false
          },
          component: resolve => require(['views/setting/sysConfig/otherconfig/holiday/index.vue'], resolve)
        },
        {
          path: '/setting/workingHours',
          name: 'workingHours',
          meta: {
            title: '工作时长配置',
            keepAlive: true,
            needLogin: false
          },
          component: resolve => require(['views/setting/workingHours/index.vue'], resolve)
        },
        {
          path: '/setting/asetSecretBase',
          name: 'asetSecretBase',
          meta: {
            title: '定密依据配置',
            keepAlive: true,
            needLogin: false
          },
          component: resolve => require(['views/setting/asetSecretBase/index.vue'], resolve)
        },
        // {
        //   path: '/setting/sysConfig/otherconfig/holiday/deal',
        //   name: 'holidayDeal',
        //   meta: {
        //     title: '节假日配置详情',
        //     keepAlive: true,
        //     needLogin: false
        //   },
        //   component: resolve => require(['views/setting/sysConfig/otherconfig/holiday/holidaydeal.vue'], resolve)
        // },
        // {
        //   path: '/setting/sysConfig/otherconfig/holiday/editor',
        //   name: 'holidayEditor',
        //   meta: {
        //     title: '节假日配置编辑',
        //     keepAlive: true,
        //     needLogin: false
        //   },
        //   component: resolve => require(['views/setting/sysConfig/otherconfig/holiday/holidayeditor.vue'], resolve)
        // },
        /*  {
path: '/setting/sysConfig/otherconfig/categoryView',
name: 'categoryView',
meta: {
title: '视图分类配置',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/sysConfig/otherconfig/categoryView.vue'], resolve)
},*/
        /*  {
path: '/setting/sysConfig/otherconfig/dataWarning',
name: 'dataWarning',
meta: {
title: '数据库空间预警',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/sysConfig/otherconfig/dataWarning.vue'], resolve)
},*/
        /*{
path: '/setting/sysConfig/otherconfig/overduePer',
name: 'overduePer',
meta: {
title: '超期待办个人提醒',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/sysConfig/otherconfig/overduePer.vue'], resolve)
},*/
        {
          path: '/setting/sysConfig/otherconfig/overdueCom',
          name: 'overdueCom',
          meta: {
            title: '超期待办综合提醒',
            keepAlive: true,
            needLogin: false
          },
          component: resolve => require(['views/setting/sysConfig/otherconfig/overdueCom.vue'], resolve)
        },
        {
          path: '/setting/sysConfig/otherconfig/reMind',
          name: 'reMind',
          meta: {
            title: '反向提醒设置',
            keepAlive: true,
            needLogin: false
          },
          component: resolve => require(['views/setting/sysConfig/otherconfig/reMind.vue'], resolve)
        },
        {
          path: '/setting/sysConfig/otherconfig/thingsOrder',
          name: 'thingsOrder',
          meta: {
            title: '待办事宜排序',
            keepAlive: true,
            needLogin: false
          },
          component: resolve => require(['views/setting/sysConfig/otherconfig/thingsOrder.vue'], resolve)
        },
        /*{
path: '/setting/sysConfig/otherconfig/interSys',
name: 'interSys',
meta: {
title: '接口系统配置',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/sysConfig/otherconfig/interSys.vue'], resolve)
},*/
        /* {
     path: '/setting/sysConfig/otherconfig/textNum',
     name: 'textNum',
     meta: {
       title: '正文字数超限原因配置单',
       keepAlive: true,
       needLogin: false
     },
     component: resolve => require(['views/setting/sysConfig/otherconfig/textNum/index.vue'], resolve)
   },*/
        {
          path: '/setting/sysConfig/otherconfig/blackList',
          name: 'blackList',
          meta: {
            title: '附件上传大小及白名单配置',
            keepAlive: true,
            needLogin: false
          },
          component: resolve => require(['views/setting/sysConfig/otherconfig/blackList.vue'], resolve)
        },
          /* {
path: '/setting/sysConfig/otherconfig/opinionChar',
name: 'opinionChar',
meta: {
 title: '意见中不能包含的特殊字符',
 keepAlive: true,
 needLogin: false
},
component: resolve => require(['views/setting/sysConfig/otherconfig/opinionChar.vue'], resolve)
},*/
          // {
          //   path: '/setting/sysConfig/otherconfig/whiteList',
          //   name: 'whiteList',
          //   meta: {
          //     title: '正文延时白名单设置',
          //     keepAlive: true,
          //     needLogin: false
          //   },
          //   component: resolve => require(['views/setting/sysConfig/otherconfig/whiteList.vue'], resolve)
          // },
        ]
      },

    ]


  },

  {
    path: '/setting/logs',
    redirect: "/setting/logs/selectCollectLogs",
    name: 'logs',
    meta: {
      title: '日志管理',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => require(['views/setting/layout/empty.vue'], resolve),
    children: [{
      path: '/setting/logs/selectCollectLogs',
      name: 'selectCollectLogs',
      meta: {
        title: '用户收藏日志查询',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/logs/selectCollectLogs.vue'], resolve)
    },
    {
      path: '/setting/logs/selectLoginLogs',
      name: 'selectLoginLogs',
      meta: {
        title: '用户登录日志查询',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/logs/selectLoginLogs.vue'], resolve)
    },
    {
      path: '/setting/logs/selectPreserveLogs',
      name: 'selectPreserveLogs',
      meta: {
        title: '系统维护日志',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/logs/selectPreserveLogs.vue'], resolve)
    },
    /*  {
path: '/setting/logs/reviewLogs',
name: 'reviewLogs',
meta: {
title: '用户回顾',
keepAlive: true,
needLogin: false
},
component: resolve => require(['views/setting/logs/reviewLogs.vue'], resolve)
},*/
    {
      path: '/setting/logs/settingSafeLogs',
      name: 'settingSafeLogs',
      meta: {
        title: '日志安全设置',
        keepAlive: true,
        needLogin: false
      },
      component: resolve => require(['views/setting/logs/settingSafeLogs.vue'], resolve)
    }
    ]
  },


  ]
}, {
  path: '/fwbz',
  name: 'fwbz',
  meta: {
    title: '服务保障',
  },
  redirect: '/problem',
  component: resolve => require(['views/serveEnsure/feedback'], resolve),
  children: [
    // {
    //   path: '/feedback',
    //   name: 'feedback',
    //   meta: {
    //     title: "意见反馈",
    //     needLogin: false,
    //   },
    //   component: resolve => require(['views/serveEnsure/feedback'], resolve),
    // },
    {
      path: '/problem',
      name: 'problem',
      meta: {
        title: "常见问题",
        keepAlive: true,
        needLogin: false,
      },
      component: resolve => require(['views/serveEnsure/problem'], resolve),
    }, {
      path: '/handbook',
      name: 'handbook',
      meta: {
        title: "用户手册",
        keepAlive: true,
        needLogin: false,
      },
      component: resolve => require(['views/serveEnsure/handbook'], resolve),
    },

  ]
},

]

export default List
