const routers = [{
    path: '/signquoteWaitFkhDispatch',
    name: 'signquoteWaitFkhDispatch',
    meta: {
      title: '签报电子处理单(非跨行)(待办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteWaitFkhDispatch'], resolve)
  }, {
    path: '/signquoteFinishFkhDispatch',
    name: 'signquoteFinishFkhDispatch',
    meta: {
      title: '签报电子处理单(非跨行)(已办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteFinishFkhDispatch'], resolve)
  }, {
    path: '/signquoteFinishFkhDispatchCopy',
    name: 'signquoteFinishFkhDispatchCopy',
    meta: {
      title: '签报电子处理单(非跨行)(已办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteFinishFkhDispatchCopy'], resolve)
  }, {
    path: '/signquoteOverFkhDispatch',
    name: 'signquoteOverFkhDispatch',
    meta: {
      title: '签报电子处理单(非跨行)(办结)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteOverFkhDispatch'], resolve)
  },
  {
    path: '/qbdzCldFkhPrint',
    name: 'qbdzCldFkhPrint',
    meta: {
      title: '签报电子处理单(非跨行)(打印处理单)',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/signqutote/printSign/qbdzCldFkhPrint'], resolve)
  },
  {
    path: '/signquoteWaitKhSphDispatch',
    name: 'signquoteWaitKhSphDispatch',
    meta: {
      title: '签报电子处理单（跨行审批行）(待办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteWaitKhSphDispatch'], resolve)
  },
  {
    path: '/signquoteFinishKhSphDispatch',
    name: 'signquoteFinishKhSphDispatch',
    meta: {
      title: '签报电子处理单（跨行审批行）(已办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteFinishKhSphDispatch'], resolve)
  },
  {
    path: '/signquoteFinishKhSphDispatchCopy',
    name: 'signquoteFinishKhSphDispatchCopy',
    meta: {
      title: '签报电子处理单（跨行审批行）(已办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteFinishKhSphDispatchCopy'], resolve)
  },
  {
    path: '/signquoteOverKhSphDispatch',
    name: 'signquoteOverKhSphDispatch',
    meta: {
      title: '签报电子处理单（跨行审批行）(办结)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteOverKhSphDispatch'], resolve)
  },
  {
    path: '/qbdzCldkhSphPrint',
    name: 'qbdzCldkhSphPrint',
    meta: {
      title: '中国建设银行电子签报承办单(打印处理单)',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/signqutote/printSign/qbdzCldkhSphPrint'], resolve)
  },
  {
    path: '/signquoteWaitKhQshDispatch',
    name: 'signquoteWaitKhQshDispatch',
    meta: {
      title: '签报电子处理单（跨行请示行）(待办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteWaitKhQshDispatch'], resolve)
  }, {
    path: '/signquoteFinishKhQshDispatch',
    name: 'signquoteFinishKhQshDispatch',
    meta: {
      title: '签报电子处理单（跨行请示行）(已办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteFinishKhQshDispatch'], resolve)
  },
  {
    path: '/signquoteFinishKhQshDispatchCopy',
    name: 'signquoteFinishKhQshDispatchCopy',
    meta: {
      title: '签报电子处理单（跨行请示行）(已办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteFinishKhQshDispatchCopy'], resolve)
  }, {
    path: '/signquoteOverKhQshDispatch',
    name: 'signquoteOverKhQshDispatch',
    meta: {
      title: '签报电子处理单（跨行请示行）(办结)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteOverKhQshDispatch'], resolve)
  },
  {
    path: '/qbdzCldkhQshPrint',
    name: 'qbdzCldkhQshPrint',
    meta: {
      title: '签报电子处理单(跨行 请示行)(打印处理单)',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/signqutote/printSign/qbdzCldkhQshPrint'], resolve)
  },
  {
    path: '/signquoteWaitEntityDispatch',
    name: 'signquoteWaitEntityDispatch',
    meta: {
      title: '签报实物处理单(待办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteWaitEntityDispatch'], resolve)
  },
  {
    path: '/signquoteFinishEntityDispatch',
    name: 'signquoteFinishEntityDispatch',
    meta: {
      title: '签报实物处理单(已办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteFinishEntityDispatch'], resolve)
  },
  {
    path: '/signquoteFinishEntityDispatchCopy',
    name: 'signquoteFinishEntityDispatchCopy',
    meta: {
      title: '签报实物处理单(已办)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteFinishEntityDispatchCopy'], resolve)
  },
  {
    path: '/signquoteOverEntityDispatch',
    name: 'signquoteOverEntityDispatch',
    meta: {
      title: '签报实物处理单(办结)',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/signqutote/qianBaoState/signquoteOverEntityDispatch'], resolve)
  },
  {
    path: '/qbSwcldPrint',
    name: 'qbSwcldPrint',
    meta: {
      title: '签报实物处理单(打印处理单)',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/signqutote/printSign/qbSwcldPrint'], resolve)
  },

  {
    path: '/huiQianFkhWaitDispatch',
    name: 'huiQianFkhWaitDispatch',
    meta: {
      title: '签报非跨行会签处理单(待办)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/huiQianState/huiQianFkhWaitDispatch'], resolve)
  }, {
    path: '/huiqianFkhFinishDispatch',
    name: 'huiqianFkhFinishDispatch',
    meta: {
      title: '签报非跨行会签处理单(已办)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/huiQianState/huiqianFkhFinishDispatch'], resolve)
  }, {
    path: '/huiqianFkhFinishDispatchCopy',
    name: 'huiqianFkhFinishDispatchCopy',
    meta: {
      title: '签报非跨行会签处理单(已办)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/huiQianState/huiqianFkhFinishDispatchCopy'], resolve)
  }, {
    path: '/huiqianFkhOverDispatch',
    name: 'huiqianFkhOverDispatch',
    meta: {
      title: '签报非跨行会签处理单(办结)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/huiQianState/huiqianFkhOverDispatch'], resolve)
  },
  {
    path: '/huiQianKhWaitDispatch',
    name: 'huiQianKhWaitDispatch',
    meta: {
      title: '签报跨行会签处理单(待办)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/huiQianState/huiQianKhWaitDispatch'], resolve)
  }, {
    path: '/huiqianKhFinishDispatch',
    name: 'huiqianKhFinishDispatch',
    meta: {
      title: '签报跨行会签处理单(已办)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/huiQianState/huiqianKhFinishDispatch'], resolve)
  }, {
    path: '/huiqianKhFinishDispatchCopy',
    name: 'huiqianKhFinishDispatchCopy',
    meta: {
      title: '签报跨行会签处理单(已办)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/huiQianState/huiqianKhFinishDispatchCopy'], resolve)
  }, {
    path: '/huiqianKhOverDispatch',
    name: 'huiqianKhOverDispatch',
    meta: {
      title: '签报跨行会签处理单(办结)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/huiQianState/huiqianKhOverDispatch'], resolve)
  },
  {
    path: '/qbdzHqCld',
    name: 'qbdzHqCld',
    meta: {
      title: '中国建设银行电子签报会签意见单（打印处理单）',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/signqutote/printSign/qbdzHqCld'], resolve)
  },
  {
    path: '/xiebanWaitQbDispatch',
    name: 'xiebanWaitQbDispatch',
    meta: {
      title: '签报协办处理单(待办)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/xieBanState/xiebanWaitQbDispatch'], resolve)
  }, {
    path: '/xiebanFinishQbDispatch',
    name: 'xiebanFinishQbDispatch',
    meta: {
      title: '签报协办处理单(已办)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/xieBanState/xiebanFinishQbDispatch'], resolve)
  }, {
    path: '/xiebanFinishQbDispatchCopy',
    name: 'xiebanFinishQbDispatchCopy',
    meta: {
      title: '签报协办处理单(已办)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/xieBanState/xiebanFinishQbDispatchCopy'], resolve)
  }, {
    path: '/xiebanOverQbDispatch',
    name: 'xiebanOverQbDispatch',
    meta: {
      title: '签报协办处理单(办结)',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/xieBanState/xiebanOverQbDispatch'], resolve)
  },
  {
    path: '/qbdzXbYjd',
    name: 'qbdzXbYjd',
    meta: {
      title: '中国建设银行电子签报协办意见单',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/signqutote/printSign/qbdzXbYjd'], resolve)
  },
  {
    path: '/cyfkhqshQbDispatch',
    name: 'cyfkhqshQbDispatch',
    meta: {
      title: '签报传阅非跨行或请示行传阅单',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/cyfkhqshQbDispatch'], resolve)
  },
  {
    path: '/cysphQbDispatch',
    name: 'cysphQbDispatch',
    meta: {
      title: '签报传阅审批行传阅单',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/cysphQbDispatch'], resolve)
  },
  {
    path: '/qbdzCyd',
    name: 'qbdzCyd',
    meta: {
      title: '电子签报传阅单(打印处理单 非跨行)',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/signqutote/printSign/qbdzCyd'], resolve)
  },
  {
    path: '/qbdzKhCyd',
    name: 'qbdzKhCyd',
    meta: {
      title: '电子签报传阅单(打印处理单 跨行)',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/signqutote/printSign/qbdzKhCyd'], resolve)
  },
  {
    path: '/qbdzSphCyd',
    name: 'qbdzSphCyd',
    meta: {
      title: '电子签报传阅单(打印处理单 审批行)',
      keepAlive: false,
      needLogin: false
    },
    component: resolve => require(['views/signqutote/printSign/qbdzSphCyd'], resolve)
  },
  {
    path: '/tuiwenkhDispatch',
    name: 'tuiwenkhDispatch',
    meta: {
      title: '签报退文单跨行',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/tuiwenkhDispatch'], resolve)
  },
  {
    path: '/qbdzTwKhPrint',
    name: 'qbdzTwKhPrint',
    meta: {
      title: '签报退文单跨行打印单',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/printSign/qbdzTwKhPrint'], resolve)
  },
  {
    path: '/tuiwenkhDispatchCopy',
    name: 'tuiwenkhDispatchCopy',
    meta: {
      title: '签报退文单跨行',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/tuiwenkhDispatchCopy'], resolve)
  },
  {
    path: '/tuiwenfeikhDispatch',
    name: 'tuiwenfeikhDispatch',
    meta: {
      title: '签报退文单非跨行',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/tuiwenfeikhDispatch'], resolve)
  },
  {
    path: '/qbdzTwFkhPrint',
    name: 'qbdzTwFkhPrint',
    meta: {
      title: '签报退文单非跨行打印单',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/printSign/qbdzTwFkhPrint'], resolve)
  },
  
  {
    path: '/tuiwenfeikhDispatchCopy',
    name: 'tuiwenfeikhDispatchCopy',
    meta: {
      title: '签报退文单非跨行',
      keepAlive: true,
      ccneedLogin: false
    },
    component: resolve => require(['views/signqutote/tuiwenfeikhDispatchCopy'], resolve)
  },
  {
    path: '/circularizeStateWaitFkh',
    name: 'CircularizeStateWaitFkh',
    meta: {
      title: '传阅(非跨行)',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/circularizeState/circularizeStateWaitFkh'], resolve)
  },
  {
    path: '/circularizeStateWaitFkhCopy',
    name: 'CircularizeStateWaitFkhCopy',
    meta: {
      title: '管理员传阅(非跨行)',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/circularizeState/circularizeStateWaitFkhCopy'], resolve)
  },
  {
    path: '/lingdaoPishiDetails',
    name: 'lingdaoPishiDetails',
    meta: {
      title: '领导批示协办单详情',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/chaxun/lingdaoPishiDetails'], resolve)
  },
  {
    path: '/ldpscld',
    name: 'ldpscld',
    meta: {
      title: '领导批示处理单',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/chaxun/ldpscld'], resolve)
  },
  
  {
    path: '/circularizeStateWaitQsh',
    name: 'CircularizeStateWaitQsh',
    meta: {
      title: '传阅(请示行)',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/circularizeState/circularizeStateWaitQsh'], resolve)
  },
  {
    path: '/circularizeStateWaitSph',
    name: 'CircularizeStateWaitSph',
    meta: {
      title: '传阅(审批行)',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/circularizeState/circularizeStateWaitSph'], resolve)
  },
  {
    path: '/circularizeStateWaitQshCopy',
    name: 'CircularizeStateWaitQshCopy',
    meta: {
      title: '管理员传阅(请示行)',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/circularizeState/circularizeStateWaitQshCopy'], resolve)
  },
  {
    path: '/circularizeStateWaitSphCopy',
    name: 'CircularizeStateWaitSphCopy',
    meta: {
      title: '管理员传阅(审批行)',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0'
    },
    component: resolve => require(['views/signqutote/circularizeState/circularizeStateWaitSphCopy'], resolve)
  },
  {
    path: '/qbgl',
    name: 'Qbgl',
    meta: {
      title: '签报管理',
      keepAlive: true,
      needLogin: true,
      id: '03',
      parentId: '0',
      needClear: true
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
          parentId: '0',
          needClear: true
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
          parentId: '0',
          needClear: true
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
          parentId: '0',
          needClear: true
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
          parentId: '0',
          needClear: true
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
          parentId: '0',
          needClear: true
        },
        component: resolve => require(['views/signqutote/tuiwen'], resolve)
      },
      {
        path: '/qbChaxun',
        name: 'qbChaxun',
        meta: {
          title: '查询',
          keepAlive: true,
          needLogin: true,
          id: '03',
          parentId: '0',
          needClear: true
        },
        component: resolve => require(['views/signqutote/qbChaxun'], resolve),
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
            name: 'zwzscxpz',
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
        path: '/qbTongji',
        name: 'qbTongji',
        meta: {
          title: '统计',
          keepAlive: true,
          needLogin: true,
          id: '03',
          parentId: '0',
          needClear: true
        },
        component: resolve => require(['views/signqutote/qbTongji'], resolve),
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
          parentId: '0',
          needClear: true
        },
        component: resolve => require(['views/signqutote/canshuweihu'], resolve),
        redirect: '/cswhqbcspz',
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
          {
            path: '/cswhzwzscxpz',
            name: 'zwzscxpz',
            meta: {
              title: '正文字数限制配置',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/systemManage/signCanShuWeiHu/cswhzwzscxpz'], resolve)
          },
          {
            path: '/cswhjskhqb',
            name: 'cswhjskhqb',
            meta: {
              title: '接收跨行签报配置',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/systemManage/signCanShuWeiHu/cswhjskhqb'], resolve)
          },
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
          parentId: '0',
          needClear: true
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
          {
            path: '/qianbaochuanyue',
            name: 'qianbaochuanyue',
            meta: {
              title: '传阅',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/signqutote/adminManage/chuanyue'], resolve)
          }
        ]
      },
      {
        path: '/wjcySignqutote',
        name: 'WjcySignqutote',
        meta: {
          title: '文件查阅',
          keepAlive: true,
          needLogin: true,
          active: false,
          id: '03',
          parentId: '0'
        },
        component: resolve => require(['views/signqutote/wjcy'], resolve),
        redirect: '/qbcy',
        children: [{
            path: '/qbcy',
            name: 'Qbcy',
            meta: {
              title: '签报查阅',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/signqutote/signquoteConsult/cswhqbcspz'], resolve)
          },
          {
            path: '/qbthcy',
            name: 'Qbthcy',
            meta: {
              title: '签报退回查阅',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/signqutote/signquoteConsult/cswhqbzlwh'], resolve)
          },
        ]
      },
      {
        path: '/guanliyuanck',
        name: 'Guanliyuanck',
        meta: {
          title: '管理员查看',
          keepAlive: true,
          needLogin: true,
          id: '03',
          parentId: '0',
          needClear: true
        },
        redirect: '/glyckqb',
        component: resolve => require(['views/signqutote/guanliyuanck'], resolve),
        children: [{
            path: '/glyckqb',
            name: 'glyckqb',
            meta: {
              title: '签报',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/signqutote/guanliyuanchakan/glyckqb'], resolve)
          },
          {
            path: '/glyckhq',
            name: 'glyckhq',
            meta: {
              title: '会签',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/signqutote/guanliyuanchakan/glyckhq'], resolve)
          },
          {
            path: '/glycktw',
            name: 'glycktw',
            meta: {
              title: '退文',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/signqutote/guanliyuanchakan/glycktw'], resolve)
          },
          {
            path: '/glyckxb',
            name: 'glyckxb',
            meta: {
              title: '协办',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/signqutote/guanliyuanchakan/glyckxb'], resolve)
          },
          {
            path: '/glyckcy',
            name: 'glyckcy',
            meta: {
              title: '传阅',
              keepAlive: true,
              ccneedLogin: true
            },
            component: resolve => require(['views/signqutote/guanliyuanchakan/glyckcy'], resolve)
          },
        ]
      }
    ]
  },
  {//维护详情
    path: '/maintainFilesQb',
    name: 'maintainFilesQb',
    meta: {
      title:"维护",
      keepAlive: false,
      needLogin: false
    },
    // component: resolve => require(['views/common/maintainFiles'], resolve)
    component: resolve => require(['views/common/maintainFilesQb'], resolve)
  },

]

export default routers
