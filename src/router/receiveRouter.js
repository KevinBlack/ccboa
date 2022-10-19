const routers = [
  {
    path: '/secretary/cooperateDetail',
    name: 'cooperateDetail',
    meta: {
      title: '电子收文处理单',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/secretary/cooperateDetail'], resolve)
  },
  {
    path: '/secretary/ywdyDetail',
    name: 'ywdyDetail',
    meta: {
      title: '电子收文处理单',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/secretary/ywdyDetail'], resolve)
  },

  {
    path: '/secretary/hostDetail',
    name: 'hostDetail',
    meta: {
      title: '电子收文处理单',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/secretary/hostDetail'], resolve)
  },
  {
    path: '/secretary/sponsor',
    name: 'sponsor',
    meta: {
      title: '电子收文处理单',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/secretary/sponsor'], resolve)
  },
  {
    path: '/receiveDispatch',
    name: 'ReceiveDispatch',
    meta: {
      title: '收文处理单',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/receive/receiveDispatch'], resolve)
  },
  {
    path: '/receiveElectronDispatch',
    name: 'ReceiveElectronDispatch',
    meta: {
      title: '电子收文处理单',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/receive/receiveElectronDispatch'], resolve)
  },

  {
    path: '/shiwucbDetailReadonly',
    name: 'ShiwucbDetailReadonly',
    meta: {
        title: '实物收文承办办结单',
        keepAlive: true,
        ccneedLogin: true
    },
    component: resolve => require(['views/receive/shiwucbDetailReadonly'], resolve)
  },
  {
    path: '/shiwucbDetail',
    name: 'shiwucbDetail',
    meta: {
        title: '实物收文承办单',
        keepAlive: true,
        ccneedLogin: true
    },
    component: resolve => require(['views/receive/shiwucbDetail'], resolve)
  },
  {
    path: '/reCircularizeDispatch',
    name: 'reCircularizeDispatch',
    meta: {
      title: '收文传阅单',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/receive/reCircularizeDispatch'], resolve)
  },
  {
    path: '/receiveFileBackDetail',
    name: 'ReceiveFileBackDetail',
    meta: {
      title: '退文处理单',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/receive/receiveFileBackDetail'], resolve)
  },
  {
    path: '/receive',
    name: 'Receive',
    meta: {
      title: '收文管理',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/receive/index'], resolve),
    redirect: '/receiveFile',
    children: [

      {
        path: '/receiveFile',
        name: 'ReceiveFile',
        meta: {
          title: '收文',
          keepAlive: true,
          ccneedLogin: true
        },
        component: resolve => require(['views/receive/receiveFile'], resolve)
      },
      {
        path: '/circularize',
        name: 'Circularize',
        meta: {
          title: '传阅',
          keepAlive: true,
          ccneedLogin: true
        },
        component: resolve => require(['views/receive/circularize'], resolve)
      },
      {
        path: '/fileSupervise',
        name: 'FileSupervise',
        meta: {
          title: '公文督查办',
          keepAlive: true,
          ccneedLogin: true
        },
        component: resolve => require(['views/receive/fileSupervise'], resolve)
      },
      {
        path: '/emailLetter',
        name: 'EmailLetter',
        meta: {
          title: '信电函件',
          keepAlive: true,
          ccneedLogin: true
        },
        component: resolve => require(['views/receive/emailLetter'], resolve)
      },
      {
        path: '/receiveSponsor',
        name: 'ReceiveSponsor',
        meta: {
          title: '协办',
          keepAlive: true,
          ccneedLogin: true
        },
        component: resolve => require(['views/receive/receiveSponsor'], resolve)
      },
      {
        path: '/shiwucb',
        name: 'shiwucb',
        meta: {
            title: '实物收文承办',
            keepAlive: true,
            ccneedLogin: true
        },
        component: resolve => require(['views/receive/shiwucb'], resolve)
      },
      {
        path: '/receiveFileBack',
        name: 'ReceiveFileBack',
        meta: {
          title: '退文',
          keepAlive: true,
          ccneedLogin: true
        },
        component: resolve => require(['views/receive/receiveFileBack'], resolve)
      },
      {
        path: '/receiveQuery',
        name: 'ReceiveQuery',
        meta: {
          title: '查询',
          keepAlive: true,
          ccneedLogin: true
        },
        redirect: '/swcx',
        component: resolve => require(['views/receive/receiveQuery'], resolve),
        children: [{
            path: '/swcx',
            name: 'Swcx',
            meta: {
              title: '收文查询',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/receive/receiveQuery/swcx'], resolve)
          },
          {
            path: '/swthqkcx',
            name: 'Swthqkcx',
            meta: {
              title: '收文退回情况查询',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/receive/receiveQuery/swthqkcx'], resolve)
          },
          {
            path: '/gwdcbcx',
            name: 'Gwdcbcx',
            meta: {
              title: '公文督查办查询',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/receive/receiveQuery/gwdcbcx'], resolve)
          },
          {
            path: '/xdhjcx',
            name: 'Xdhjcx',
            meta: {
              title: '信电函件查询',
              keepAlive: true,
              ccneedLogin: true
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
              ccneedLogin: true
            },
            component: resolve => require(['views/receive/receiveQuery/xjhcfwcx'], resolve)
          },
          {
            path: '/xjhswzscx',
            name: 'Xjhswzscx',
            meta: {
              title: '下级行收文字数查询',
              keepAlive: true,
              ccneedLogin: true
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
        redirect: '/stcsRecordType',
        component: resolve => require(['views/receive/receiveQuery'], resolve),
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
            title: '信电函统计',
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
          component: resolve => require(['views/receive/receiveStcs/stcsIncomingDispatches'], resolve)
        },
        {
          path: '/dbqssxtj',
          name: 'dbqssxtj',
          meta: {
            title: '督办公文办理情况统计',
            keepAlive: true,
            ccneedLogin: true
          },
          component: resolve => require(['views/receive/receiveStcs/dbqssxtj'], resolve)
        },{
          path: '/dbgwblqk',
          name: 'dbgwblqk',
          meta: {
            title: '督办请示事项情况统计',
            keepAlive: true,
            ccneedLogin: true
          },
          component: resolve => require(['views/receive/receiveStcs/dbgwblqk'], resolve)
        },
        // {
        //   path: '/stcsIncomingSupervisory',
        //   name: 'stcsIncomingSupervisory',
        //   meta: {
        //     title: '督办公文办理情况统计',
        //     keepAlive: true,
        //     ccneedLogin: true
        //   },
        //   component: resolve => require(['views/receive/receiveStcs/stcsIncomingSupervisory'], resolve)
        // },
        // {
        //   path: '/stcsIncomingStatistics',
        //   name: 'stcsIncomingStatistics',
        //   meta: {
        //     title: '督办请示事项办理情况统计',
        //     keepAlive: true,
        //     ccneedLogin: true
        //   },
        //   component: resolve => require(['views/receive/receiveStcs/stcsIncomingStatistics'], resolve)
        // },

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
        redirect: '/swcspz',
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
      //     ccneedLogin: true
      //   },
      //   redirect: '/receiveMsg',
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
        path: '/wjcyReceive',
        name: 'WjcyReceive',
        meta: {
          title: '文件查阅',
          keepAlive: true,
          ccneedLogin: true
        },
        component: resolve => require(['views/receive/wjcy'], resolve),
        redirect: '/receiveSwcy',
        children: [{
            path: '/receiveSwcy',
            name: 'ReceiveSwcy',
            meta: {
              title: '收文查阅',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/receive/receiveConsult/swcy'], resolve)
          },
          {
            path: '/receiveSwthqkcy',
            name: 'ReceiveSwthqkcy',
            meta: {
              title: '收文退回情况查阅',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/receive/receiveConsult/swthqkcy'], resolve)
          },
          {
            path: '/receiveGwdcbcy',
            name: 'ReceiveGwdcbcy',
            meta: {
              title: '公文督查办查阅',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/receive/receiveConsult/gwdcbcy'], resolve)
          },
        ]
      },
      {
        path: '/adminManage',
        name: 'adminManage',
        meta: {
          title: '管理员维护',
          keepAlive: true,
          needLogin: true
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
        }]
      }
    ]
  },
  {
    path: '/writeEmailLetter',
    name: 'writeEmailLetter',
    meta: {
      title: '起草信电函件',
      keepAlive: true,
    },
    component: resolve => require(['views/receive/writeEmailLetter'], resolve)
  },
  {
    path: '/dzswcld',
    name: 'dzswcld',
    meta: {
      title: '行外电子收文（总行）',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/dzswcld'], resolve)
  },
  {
    path: '/swswcld',
    name: 'swswcld',
    meta: {
      title: '行外电子收文（总行）',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/swswcld'], resolve)
  },
  {
    path: '/swxbd',
    name: 'swxbd',
    meta: {
      title: '收文协办单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/swxbd'], resolve)
  },{
    path: '/swcbd',
    name: 'swcbd',
    meta: {
      title: '收文承办单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/swcbd'], resolve)
  },{
    path: '/swcycld',
    name: 'swcycld',
    meta: {
      title: '传阅单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/swcycld'], resolve)
  },{
    path: '/xdhjdjd',
    name: 'xdhjdjd',
    meta: {
      title: '信电函件处理单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/xdhjdjd'], resolve)
  },{
    path: '/twdxjh',
    name: 'twdxjh',
    meta: {
      title: '退文处理单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/twdxjh'], resolve)
  },
  {
    path: '/hwdzswyj',
    name: 'hwdzswyj',
    meta: {
      title: '行外电子收文（一级行）',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/hwdzswyj'], resolve)
  },
  {
    path: '/zhxbd',
    name: 'zhxbd',
    meta: {
      title: '总行收文协办单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/zhdzswxbd'], resolve)
  },
  {
    path: '/ctswxbd',
    name: 'ctswxbd',
    meta: {
      title: '传统实物收文协办单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/ctswxbd'], resolve)
  },
  {
    path: '/dzcyd',
    name: 'dzcyd',
    meta: {
      title: '电子收文传阅单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/dzcyd'], resolve)
  }, {
    path: '/receiveBjYb',
    name: 'receiveBjYb',
    meta: {
      title: '收文办结/已办',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/receiveBjYb'], resolve)
  },{
    path: '/receiveDzBjYb',
    name: 'ReceiveDzBjYb',
    meta: {
      title: '收文电子办结/已办',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/receiveDzBjYb'], resolve)
  },

  {
    path: '/swcyd',
    name: 'swcyd',
    meta: {
      title: '实物收文传阅单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/swcyd'], resolve)
  }, {
    path: '/swcld',
    name: 'swcld',
    meta: {
      title: '传统实物收文处理单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/swcld'], resolve)
  },
  {
    path: '/dcbswcld',
    name: 'dcbswcld',
    meta: {
      title: '多承办部门实物收文处理单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/dcbswcld'], resolve)
  }, {
    path: '/swtwd',
    name: 'swtwd',
    meta: {
      title: '收文退文单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/print/twd'], resolve)
  }, {
    path: '/receiveSponsorDetail',
    name: 'ReceiveSponsorDetail',
    meta: {
      title: '协办单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/receiveSponsorDetail'], resolve)
  },
  {
    path: '/receiveSponsorReadonly',
    name: 'ReceiveSponsorReadonly',
      meta: {
      title: '协办办结/已办',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/receiveSponsorReadonly'], resolve)
  },{
    path: '/receiveFileBackDispach',
    name: 'receiveFileBackDispach',
      meta: {
      title: '收文退文单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/receiveFileBackDispach'], resolve)
  },
  //管理员维护
  {
    path: '/receiveDzBjYbDetail',
    name: 'ReceiveDzBjYbDetail',
    meta: {
      title: '收文电子办结/已办',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/manageDetail/receiveDzBjYb'], resolve)
  },{
    path: '/receiveBjYbDetail',
    name: 'ReceiveBjYbDetail',
    meta: {
      title: '收文办结/已办',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/manageDetail/receiveBjYb'], resolve)
  },
  {
    path: '/writeEmailLetterDetail',
    name: 'WriteEmailLetterDetail',
    meta: {
      title: '起草信电函件详情',
      keepAlive: true,
    },
    component: resolve => require(['views/receive/manageDetail/writeEmailLetter'], resolve)
  },
  {
    path: '/receiveFileBackDispachDetail',
    name: 'ReceiveFileBackDispachDetail',
      meta: {
      title: '收文退文单详情',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/manageDetail/receiveFileBackDispach'], resolve)
  },
  {
    path: '/sponsorDetail',
    name: 'SponsorDetail',
      meta: {
      title: '协办办结/已办详情',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/receive/manageDetail/receiveSponsorReadonly'], resolve)
  },
  {
    path: '/reCircularizeDetail',
    name: 'ReCircularizeDetail',
    meta: {
      title: '收文传阅单',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/receive/manageDetail/reCircularizeDispatch'], resolve)
  },
  {
    path: '/shiwucbDetailDetail',
    name: 'ShiwucbDetailDetail',
    meta: {
        title: '实物收文承办办结单详情',
        keepAlive: true,
        ccneedLogin: true
    },
    component: resolve => require(['views/receive/manageDetail/shiwucbDetailReadonly'], resolve)
  },
  {//维护详情
    path: '/maintainFiles',
    name: 'MaintainFiles',
    meta: {
      title:"维护",
      keepAlive: false,
      needLogin: false
    },
    // component: resolve => require(['views/common/maintainFiles'], resolve)
    component: resolve => require(['views/common/maintainFiles'], resolve)
  },
  {//维护详情
    path: '/maintainFilesSW',
    name: 'maintainFilesSW',
    meta: {
      title:"维护",
      keepAlive: false,
      needLogin: false
    },
    // component: resolve => require(['views/common/maintainFiles'], resolve)
    component: resolve => require(['views/common/maintainFilesSW'], resolve)
  },
  {//维护详情
    path: '/maintainFilesDB',
    name: 'maintainFilesDB',
    meta: {
      title:"维护",
      keepAlive: false,
      needLogin: false
    },
    // component: resolve => require(['views/common/maintainFiles'], resolve)maintainFilesSW
    component: resolve => require(['views/common/maintainFilesDB'], resolve)
  },
  {//维护详情
    path: '/urltest',
    name: 'urltest',
    meta: {
      title:"维护",
      keepAlive: false,
      needLogin: false
    },
    // component: resolve => require(['views/common/maintainFiles'], resolve)
    component: resolve => require(['views/superviseHandle/print/urltest'], resolve)
  },
  {//维护详情
    path: '/sqltest',
    name: 'sqltest',
    meta: {
      title:"维护",
      keepAlive: false,
      needLogin: false
    },
    // component: resolve => require(['views/common/maintainFiles'], resolve)
    component: resolve => require(['views/superviseHandle/print/sqltest'], resolve)
  }
]

export default routers
