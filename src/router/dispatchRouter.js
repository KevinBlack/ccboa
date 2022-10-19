const routers = [
  {
    path: '/fwgl',
    name: 'Fwgl',
    meta: {
      title: '发文管理',
      keepAlive: true,
      needLogin: false,
      id: '02',
      parentId: '0',
      needClear: true
    },
    component: resolve => require(['views/dispatch/fwgl'], resolve),
    redirect: '/dispatchFile',
    children: [
      {
        path: '/dispatchFile',
        name: 'DispatchFile',
        meta: {
          title: '发文',
          keepAlive: true,
          needLogin: false,
          id: '02',
          parentId: '0',
          needClear: true
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
          parentId: '02',
          needClear: true
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
          parentId: '02',
          needClear: true
        },
        component: resolve => require(['views/dispatch/rexamine.vue'], resolve)
      },
      {
        path: '/reCountersign',
        name: 'ReCountersign',
        meta: {
          title: '重发会签',
          keepAlive: true,
          needLogin: true,
          needClear: true
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
          parentId: '02',
          needClear: true
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
          parentId: '02',
          needClear: true
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
          parentId: '02',
          needClear: true
        },
        redirect: '/fwcx',
        component: resolve => require(['views/dispatch/dispatchQuery'], resolve),
        children: [
          {
            path: '/fwcx',
            name: 'Fwcx',
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
            name: 'Fwsh',
            meta: {
              title: '发文收回查询',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/dispatchQuery/fwsh'], resolve)
          },
          {
            path: '/fwth',
            name: 'Fwth',
            meta: {
              title: '发文退回查询',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/dispatchQuery/fwth'], resolve)
          },
          {
            path: '/fwggcx',
            name: 'Fwggcx',
            meta: {
              title: '发文公告查询',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/dispatchQuery/fwgg'], resolve)
          },
          {
            path: '/fwhqsj',
            name: 'Fwhqsj',
            meta: {
              title: '发文会签办理时间查询',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/dispatchQuery/fwhqsj'], resolve)
          },
          {
            path: '/cfwsp',
            name: 'Cfwsp',
            meta: {
              title: '重发文审批查询',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/dispatchQuery/cfwsp'], resolve)
          },
          {
            path: '/zffw',
            name: 'Zffw',
            meta: {
              title: '直发发文查询',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/dispatchQuery/zffw'], resolve)
          },
          {
            path: '/bjfwbl',
            name: 'Bjfwbl',
            meta: {
              title: '办结发文办理时间查询',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/dispatchQuery/bjfwbl'], resolve)
          },
          {
            path: '/fwzscx',
            name: 'Fwzscx',
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
          parentId: '02',
          needClear: true
        },
        component: resolve => require(['views/dispatch/statistics'], resolve),
        redirect: '/stcsByType',
        children: [
          {
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
          {
            path: '/stcsByRcivTime',
            name: 'StcsByRcivTime',
            meta: {
              title: '下级行收文办理时间统计',
              keepAlive: true,
              needLogin: true,
              active: false,
              id: '020901',
              parentId: '0209'
            },
            component: resolve => require(['views/dispatch/statistics/stcsByRcivTime'], resolve)
          },
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
          parentId: '02',
          needClear: true
        },
        component: resolve => require(['views/dispatch/fwpz'], resolve),
        redirect: '/fwcspz',
        children: [
          {
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
            path: '/zcsbhfslbpz',
            name: 'Zcsbhfslbpz',
            meta: {
              title: '主抄送本行发送类别配置',
              keepAlive: true,
              needLogin: true,
              active: false,
              id: '021203',
              parentId: '0212'
            },
            component: resolve => require(['views/systemManage/dispatchSetting/zcsbhfslbpz'], resolve)
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
          // {
          //   path: '/fsdxpz',
          //   name: 'Fsdxpz',
          //   meta: {
          //     title: '发送对象配置',
          //     keepAlive: true,
          //     needLogin: true,
          //     active: false,
          //     id: '021210',
          //     parentId: '0212'
          //   },
          //   component: resolve => require(['views/systemManage/dispatchSetting/fsdxpz'], resolve)
          // }
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
            path: '/fwglfwgg',
            name: 'fwglfwgg',
            meta: {
              title: '发文公告',
              keepAlive: true,
              needLogin: true,
              active: false,
              id: '021305',
              parentId: '0213'
            },
            component: resolve => require(['views/dispatch/adminManage/fwglfwgg'], resolve)
          },
          {
            path: '/fwgltw',
            name: 'fwgltw',
            meta: {
              title: '退文',
              keepAlive: true,
              needLogin: true,
              active: false,
              id: '021306',
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
              id: '021307',
              parentId: '0213'
            },
            component: resolve => require(['views/dispatch/adminManage/qzhs'], resolve)
          }
        ]
      },
      {
        path: '/wjcy',
        name: 'Wjcy',
        meta: {
          title: '文件查阅',
          keepAlive: true,
          needLogin: true,
          active: false,
          id: '0214',
          parentId: '02'
        },
        component: resolve => require(['views/dispatch/wjcy'], resolve),
        redirect: '/fwcy',
        children: [{
            path: '/fwcy',
            name: 'Fwcy',
            meta: {
              title: '发文查阅',
              keepAlive: true,
              needLogin: true,
              active: false,
              id: '021401',
              parentId: '0214'
            },
            component: resolve => require(['views/dispatch/dispatchConsult/fwcx'], resolve)
          },
          {
            path: '/shcy',
            name: 'Shcy',
            meta: {
              title: '发文收回查阅',
              keepAlive: true,
              needLogin: true,
              active: false,
              id: '021402',
              parentId: '0214'
            },
            component: resolve => require(['views/dispatch/dispatchConsult/fwsh'], resolve)
          },
          {
            path: '/thcy',
            name: 'Thcy',
            meta: {
              title: '发文退回查阅',
              keepAlive: true,
              needLogin: true,
              active: false,
              id: '021403',
              parentId: '0214'
            },
            component: resolve => require(['views/dispatch/dispatchConsult/fwth'], resolve)
          },
          {
            path: '/cfwspcy',
            name: 'Cfwspcy',
            meta: {
              title: '重发文审批查阅',
              keepAlive: true,
              needLogin: true,
              active: false,
              id: '021404',
              parentId: '0214'
            },
            component: resolve => require(['views/dispatch/dispatchConsult/cfwsp'], resolve)
          }
        ]
      },
      {
        path: '/glyck',
        name: 'Glyck',
        meta: {
          title: '管理员查看',
          keepAlive: true,
          needLogin: true,
          id: '0211',
          parentId: '02'
        },
        component: resolve => require(['views/dispatch/glyck'], resolve),
        children: [
          {
            path: '/fw',
            name: '发文',
            meta: {
              title: '发文',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/systemView/fw'], resolve)
          },
          {
            path: '/fwhq',
            name: '发文会签',
            meta: {
              title: '发文会签',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/systemView/fwhq'], resolve)
          },
          {
            path: '/cfwsp',
            name: '重发文审批',
            meta: {
              title: '重发文审批',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/systemView/cfwsp'], resolve)
          },
          {
            path: '/sysqzhs',
            name: '强制收回',
            meta: {
              title: '强制收回',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/systemView/qzhs'], resolve)
          },
          {
            path: '/syscfhq',
            name: '重发会签',
            meta: {
              title: '重发会签',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/systemView/cfhq'], resolve)
          },
          {
            path: '/systw',
            name: '退文',
            meta: {
              title: '退文',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/systemView/systw'], resolve)
          },
          {
            path: '/sysfwgg',
            name: '发文公告',
            meta: {
              title: '发文公告',
              keepAlive: true,
              needLogin: true
            },
            component: resolve => require(['views/dispatch/systemView/fwgg'], resolve)
          }
        ]
      },
      {
        path: '/twinfo',
        name: 'Twinfo',
        meta: {
          title: '退文单',
          keepAlive: true,
          needLogin: true,
          id: '0212',
          parentId: '02'
        },
        component: resolve => require(['views/systemManage/dispatchSetting/fwcspz'], resolve)
      },
      // {
      //   path: '/secretext',
      //   name: 'secretext',
      //   meta: {
      //     title: '密文统计',
      //     keepAlive: true,
      //     needLogin: true,
      //     id: '',
      //     parentId: '',
      //     needClear: true
      //   },
      //   redirect: '/fwcx',
      //   component: resolve => require(['views/secretStatistics/secretext'], resolve),
      //   children: [
      //     {
      //       path: '/nationSecret',
      //       name: 'nationSecret',
      //       meta: {
      //         title: '国家密文事项统计',
      //         keepAlive: true,
      //         needLogin: true,
      //         id: '',
      //         parentId: ''
      //       },
      //       component: resolve => require(['views/secretStatistics/nationSecret'], resolve)
      //     },
      //     {
      //       path: '/secretOperate',
      //       name: 'secretOperate',
      //       meta: {
      //         title: '操作日志',
      //         keepAlive: true,
      //         needLogin: true
      //       },
      //       component: resolve => require(['views/secretStatistics/secretOperate'], resolve)
      //     },
      //     {
      //       path: '/remindSecret',
      //       name: 'remindSecret',
      //       meta: {
      //         title: '密文解密预警提醒配置',
      //         keepAlive: true,
      //         needLogin: true
      //       },
      //       component: resolve => require(['views/secretStatistics/remindSecret'], resolve)
      //     },
      //   ]
      // },
    ]
  },
  // 详情页
    // 发文
  {
    path: '/bankDispachQueryRepeat',
    name: 'bankDispachQueryRepeat',
    meta: {
      title: '发文查重结果',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankDispachQueryRepeat'], resolve)
  },
  {
    path: '/bankDispach',
    name: 'BankDispach',
    meta: {
      title: '电子发文处理单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankDispach'], resolve)
  },
  {
    path: '/bankDispachAdd',
    name: 'BankDispachAdd',
    meta: {
      title: '电子发文增发处理单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankDispachAdd'], resolve)
  },
  {
    path: '/bankEntityDispatch',
    name: 'BankEntityDispatch',
    meta: {
      title: '实物发文处理单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankEntityDispatch'], resolve)
  },
  {
    path: '/bankDispachDone',
    name: 'BankDispachDone',
    meta: {
      title: '电子发文处理单已办',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankDispachDone'], resolve)
  },
  {
    path: '/bankDispachDoneCopy',
    name: 'BankDispachDoneCopy',
    meta: {
      title: '电子发文处理单已办',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankDispachDoneCopy'], resolve)
  },
  {
    path: '/bankEntityDispatchDone',
    name: 'BankEntityDispatchDone',
    meta: {
      title: '实物发文处理单已办',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankEntityDispatchDone'], resolve)
  },
  {
    path: '/bankEntityDispatchDoneCopy',
    name: 'bankEntityDispatchDoneCopy',
    meta: {
      title: '实物发文处理单已办',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankEntityDispatchDoneCopy'], resolve)
  },
  {
    path: '/bankDispachFinishRed',
    name: 'BankDispachFinishRed',
    meta: {
      title: '电子发文处理单办结红',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankDispachFinishRed'], resolve)
  },
  {
    path: '/bankEntityDispatchFinishRed',
    name: 'BankEntityDispatchFinishRed',
    meta: {
      title: '实物发文处理单办结红',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankEntityDispatchFinishRed'], resolve)
  },
  {
    path: '/bankDispachFinishBlue',
    name: 'BankDispachFinishBlue',
    meta: {
      title: '电子发文处理单办结蓝',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankDispachFinishBlue'], resolve)
  },
  {
    path: '/bankEntityDispatchFinishBlue',
    name: 'BankEntityDispatchFinishBlue',
    meta: {
      title: '实物发文处理单办结蓝',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchFile/bankEntityDispatchFinishBlue'], resolve)
  },
    // 会签
  {
    path: '/countersignend',
    name: 'Countersignend',
      meta: {
      title: '电子发文会签待办单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/countersignature/countersignend'], resolve)
  },
  {
    path: '/countersignendDone',
    name: 'countersignendDone',
      meta: {
      title: '电子发文会签已办单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/countersignature/countersignendDone'], resolve)
  },
  {
    path: '/countersignendDoneCopy',
    name: 'countersignendDoneCopy',
      meta: {
      title: '电子发文会签已办单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/countersignature/countersignendDoneCopy'], resolve)
  },
  {
    path: '/countersignendFinishRed',
    name: 'countersignendFinishRed',
      meta: {
      title: '电子发文会签办结单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/countersignature/countersignendFinishRed'], resolve)
  },

    // 重发审批
  {
    path: '/rexamineDispach',
    name: 'RexamineDispach',
    meta: {
      title: '电子重发审批单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/rexamine/rexamineDispach'], resolve)
  },
  {
    path: '/rexamineDone',
    name: 'RexamineDone',
    meta: {
      title: '电子重发审批已办单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/rexamine/rexamineDone'], resolve)
  },
  {
    path: '/rexamineDoneCopy',
    name: 'rexamineDoneCopy',
    meta: {
      title: '电子重发审批已办单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/rexamine/rexamineDoneCopy'], resolve)
  },
  {
    path: '/rexamineFinishRed',
    name: 'RexamineFinishRed',
    meta: {
      title: '电子重发审批办结单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/rexamine/rexamineFinishRed'], resolve)
  },
  {
    path: '/rexamineEntityDispach',
    name: 'RexamineEntityDispach',
    meta: {
      title: '实物重发审批单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/rexamine/rexamineEntityDispach'], resolve)
  },
  {
    path: '/rexamineEntityDone',
    name: 'RexamineEntityDone',
    meta: {
      title: '实物重发审批已办单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/rexamine/rexamineEntityDone'], resolve)
  },
  {
    path: '/rexamineEntityDoneCopy',
    name: 'rexamineEntityDoneCopy',
    meta: {
      title: '实物重发审批已办单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/rexamine/rexamineEntityDoneCopy'], resolve)
  },
  {
    path: '/rexamineEntityFinishRed',
    name: 'RexamineEntityFinishRed',
    meta: {
      title: '实物重发审批办结单',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/rexamine/rexamineEntityFinishRed'], resolve)
  },
    // 重发
  {
    path: '/rexamineBankDispach',
    name: 'RexamineBankDispach',
      meta: {
      title: '电子重发文处理单(商密)',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/rexamine/rexamineBankDispach'], resolve)
  },
  {
    path: '/rexamineBankEntityDispach',
    name: 'RexamineBankEntityDispach',
      meta: {
      title: '实物重发文处理单(商密)',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/rexamine/rexamineBankEntityDispach'], resolve)
  },
  {
    path: '/bankRecountersign',
    name: 'bankRecountersign',
      meta: {
      title: '重发电子会签处理单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/recountersign/bankRecountersign'], resolve)
  },
  {
    path: '/bankRecountersignDone',
    name: 'bankRecountersignDone',
      meta: {
      title: '重发电子会签处理已办单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/recountersign/bankRecountersignDone'], resolve)
  },
  {
    path: '/bankRecountersignDoneCopy',
    name: 'bankRecountersignDoneCopy',
      meta: {
      title: '重发电子会签处理已办单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/recountersign/bankRecountersignDoneCopy'], resolve)
  },
  {
    path: '/bankRecountersignFinishRed',
    name: 'bankRecountersignFinishRed',
      meta: {
      title: '重发电子会签处理办结单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/recountersign/bankRecountersignFinishRed'], resolve)
  },
  
  // 查询-详情页
  {
    path: '/fwcxQuery',
    name: 'fwcxQuery',
      meta: {
      title: '发文查询',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchQuery/fwcxquery'], resolve)
  },
  {
    path: '/fwshQuery',
    name: 'fwshQuery',
      meta: {
      title: '发文收回查询',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchQuery/fwshquery'], resolve)
  },
  {
    path: '/fwthQuery',
    name: 'fwthQuery',
      meta: {
      title: '发文退回查询',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchQuery/fwthquery'], resolve)
  },
  {
    path: '/fwhqsjQuery',
    name: 'fwhqsjQuery',
      meta: {
      title: '发文会签办理时间查询',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchQuery/fwhqsjquery'], resolve)
  },
  {
    path: '/cfwspQuery',
    name: 'cfwspQuery',
      meta: {
      title: '重发文审批查询',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchQuery/cfwspquery'], resolve)
  },
  {
    path: '/zffwQuery',
    name: 'zffwQuery',
      meta: {
      title: '直发发文查询',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchQuery/zffwquery'], resolve)
  },
  {
    path: '/bjfwblQuery',
    name: 'bjfwblQuery',
      meta: {
      title: '办结发文办理时间查询',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/dispatch/dispatchQuery/bjfwblquery'], resolve)
  },
  {
    path: '/fwzscxquery',
    name: 'fwzscxquery',
      meta: {
      title: '发文字数超限文件查询',
      keepAlive: true,
      needLogin: true
    },
    buttons:['1','2'],
    component: resolve => require(['views/dispatch/dispatchQuery/fwzscxquery'], resolve)
  },
  {
    path: '/dzfwcld',
    name: 'dzfwcld',
      meta: {
      title: '电子发文处理单打印',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/printFile/dzfwcld'], resolve)
  },
  {
    path: '/dzzfcld',
    name: 'dzzfcld',
      meta: {
      title: '电子增发文处理单打印',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/printFile/dzzfcld'], resolve)
  },
  {
    path: '/dzcfwcld',
    name: 'dzcfwcld',
      meta: {
      title: '电子重发文处理单打印',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/printFile/dzcfwcld'], resolve)
  },
  {
    path: '/swfwcld',
    name: 'swfwcld',
      meta: {
      title: '实物发文处理单打印',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/printFile/swfwcld'], resolve)
  },
  {
    path: '/swcfwcld',
    name: 'swcfwcld',
      meta: {
      title: '实物重发文处理单打印',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/printFile/swcfwcld'], resolve)
  },
  {
    path: '/dzfwhqd',
    name: 'dzfwhqd',
      meta: {
      title: '电子发文会签单打印',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/printFile/dzfwhqd'], resolve)
  },
  {
    path: '/dzfwcfhqd',
    name: 'dzfwcfhqd',
      meta: {
      title: '电子发文重发会签单打印',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/printFile/dzfwcfhqd'], resolve)
  },
  {
    path: '/printHsd',
    name: 'PrintHsd',
      meta: {
      title: '电子回收单打印',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/printFile/printHsd'], resolve)
  },
  {
    path: '/printTwd',
    name: 'PrintTwd',
      meta: {
      title: '电子行外退文单打印',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/printFile/printTwd'], resolve)
  },
  {
    path: '/printHnTwd',
    name: 'PrintHnTwd',
      meta: {
      title: '电子行内退文单打印',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/printFile/printHnTwd'], resolve)
  },
  {
    path: '/gwcccld',
    name: 'Gwcccld',
      meta: {
      title: '电子回收单打印',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/printFile/gwcccld'], resolve)
  },
  {
    path: '/swfwhqd',
    name: 'swfwhqd',
      meta: {
      title: '实物发文会签单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/dispatchFile/swfwcld'], resolve)
  },{
    path: '/cfspd',
    name: 'cfspd',
      meta: {
      title: '重发审批单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/dispatchFile/cfspd'], resolve)
  },{
    path: '/cfhqd',
    name: 'cfhqd',
      meta: {
      title: '重发会签单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/dispatchFile/cfhqd'], resolve)
  },{
    path: '/twd',
    name: 'twd',
      meta: {
      title: '转发文退文单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/dispatchFile/twd'], resolve)
  },{
    path: '/twdfh',
    name: 'twdfh',
      meta: {
      title: '分行发文退文单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/dispatchFile/twdfh'], resolve)
  },{
    path: '/twBank',
    name: 'TwBank',
      meta: {
      title: '电子发文退文单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/twBank'], resolve)
  },
  {
    path: '/twBankCopy',
    name: 'twBankCopy',
      meta: {
      title: '电子发文退文单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/twBankCopy'], resolve)
  },
  {
    path: '/ccBank',
    name: 'ccBank',
      meta: {
      title: '电子发文查重单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/ccBank'], resolve)
  },
  {
    path: '/qzshBank',
    name: 'QzshBank',
      meta: {
      title: '电子收回单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/qzshBank'], resolve)
  },
  {
    path: '/qzshBankCopy',
    name: 'qzshBankCopy',
      meta: {
      title: '电子收回单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/qzshBankCopy'], resolve)
  },
  {
    path: '/departDialog',
    name: 'DepartDialog',
      meta: {
      title: "发文公告主办部门弹窗",
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/dispatch/departDialog'], resolve)
  }
]

export default routers
