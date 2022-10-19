const routers = [
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
  // 备选会商详情
  {
    path: '/publication/editJournal/altBusiness/business1',
    name: 'business1',
    meta: {
      title: "备选会商详情",
      needLogin: false,
    },
    component: resolve => require(['views/publication/editJournal/altBusiness/business.vue'], resolve)
  },
  // 撰写稿件打印处理单
  {
    path: '/xxgjcld',
    name: 'xxgjcld',
    meta: {
      title: "信息稿件处理单",
      needLogin: false,
    },
    component: resolve => require(['views/publication/tgMangement/xxgjcld.vue'], resolve),
  },
  // 每日动态稿件处理单
  {
    path: '/laigaoPrint',
    name: 'laigaoPrint',
    meta: {
      title: "每日动态稿件处理单",
      needLogin: false,
    },
    component: resolve => require(['views/publication/editJournal/browsing/laigaoPrint.vue'], resolve),
  },
  // 部门信息处理单
  {
    path: '/departPrint',
    name: 'departPrint',
    meta: {
      title: "每日动态稿件处理单",
      needLogin: false,
    },
    component: resolve => require(['views/publication/departInfo/departPrint.vue'], resolve),
  },

  // {
  //   path: '/publication/editJournal/editJournal/editRent/testDemo',
  //   name: 'editingGroup',
  //   meta: {
  //     title: "测试"
  //   },
  //   component: resolve => require(['views/publication/editJournal/editRent/testDemo.vue'], resolve)
  // },
  {
    path: '/publication/editJournal/editJournal/editRent/editingGroup',
    name: 'editRenteditingGroup',
    meta: {
      title: "采编组刊"
    },
    component: resolve => require(['views/publication/editJournal/editRent/editingGroup.vue'], resolve)
  },

  {
    path: '/publication/editJournal/browsing/laigao',
    name: 'laigao',
    meta: {
      title: "来稿"
    },
    component: resolve => require(['views/publication/editJournal/browsing/laigao.vue'], resolve)
  },
  // 采用信息
  {
    path: '/publication/tgMangement/adoptInfo',
    name: 'adoptInfo',
    meta: {
      title: "采用信息",
      needLogin: false,
    },
    component: resolve => require(['views/publication/tgMangement/adoptInfo/index.vue'], resolve),
  },
  {
    path: '/publication/departInfo/depart',
    name: 'departInfodepart',
    meta: {
      title: "部门信息发布单",
      needLogin: false,
    },
    component: resolve => require(['views/publication/departInfo/depart.vue'], resolve),
  },
  {
    path: '/publication/departInfo/departfinish',
    name: 'departInfodepartfinish',
    meta: {
      title: "部门信息已办办结",
      needLogin: false,
    },
    component: resolve => require(['views/publication/departInfo/departfinish.vue'], resolve),
  },
  // 信息刊物
  {
    path: '/publication',
    redirect: '/publication/tgMangement/manuscriptList',
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
          // 撰写稿件
          // {
          //   path: '/publication/tgMangement/wriScript/repairScript',
          //   name: 'repairScript',
          //   meta: {
          //     title: "撰写稿件",
          //     needLogin: false,
          //   },
          //   component: resolve => require(['views/publication/tgMangement/wriScript/repairScript/index.vue'], resolve),
          // },
          // 采用信息
          {
            path: '/publication/tgMangement/adoptInfo/caiYliet',
            name: 'caiYliet',
            meta: {
              title: "采用信息首页",
              needLogin: false,
            },
            component: resolve => require(['views/publication/tgMangement/adoptInfo/caiYliet.vue'], resolve),
          },
          // 投稿查询
          {
            path: '/publication/tgMangement/tgInquiry',
            name: 'tgInquiry',
            meta: {
              title: "投稿查询",
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

          // 采编组刊
          {
            path: '/publication/editJournal/editRent',
            name: 'editRentindex',
            meta: {
              title: "采编组刊",
              needLogin: false,
            },
            component: resolve => require(['views/publication/editJournal/editRent/index.vue'], resolve)
          },
          {
            path: '/publication/editJournal/editRentFirst',
            name: 'editRentFirst',
            meta: {
              title: "采编组刊首页",
              needLogin: false,
            },
            component: resolve => require(['views/publication/editJournal/editRent/editRentFirst.vue'], resolve)
          },
          {
            path: '/publication/editJournal/editJournal/altBusiness/editRentDetial',
            name: 'editRentDetial',
            meta: {
              title: "详情"
            },
            component: resolve => require(['views/publication/editJournal/editRent/rent.vue'], resolve)
          },
          {
            path: '/publication/editJournal/queryScript',
            name: ' ',
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
        path: '/publication/pubJournal',
        redirect: '/publication/pubJournal/wholeSkim',
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
          path: '/publication/pubJournal/entryQuery',
          name: 'entryQuery',
          meta: {
            title: "录用条目查询",
            needLogin: false,
          },
          component: resolve => require(['views/publication/pubJournal/entryQuery.vue'], resolve),
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
          path: '/publication/pubJournal/byEntry/dailyNews',
          name: 'dailyNews',
          meta: {
            title: "每日动态",
            needLogin: false,
          },
          component: resolve => require(['views/publication/pubJournal/byEntry/dailyNews.vue'], resolve),
        }
        ]
      },
      //参数配置
      {
        path: '/publication/parameter',
        redirect: '/publication/parameter/manage/index',
        name: 'browsing',
        meta: {
          title: "参数配置",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
          path: '/publication/parameter/manage/index',
          name: 'index',
          meta: {
            title: "刊物管理",
            needLogin: false,
          },
          component: resolve => require(['views/publication/parameter/manage/index.vue'], resolve),
        },
        {
          path: '/publication/parameter/manage',
          name: 'kanwu',
          meta: {
            title: "刊物定义",
            needLogin: false,
          },
          component: resolve => require(['views/publication/parameter/manage.vue'], resolve),
        },
        //模板管理
        {
          path: '/publication/parameter/model/index',
          name: 'muban',
          meta: {
            title: "模板管理",
            needLogin: false,
          },
          component: resolve => require(['views/publication/parameter/model/index.vue'], resolve),
        },
        // 模板管理详情
        {
          path: '/publication/parameter/model/modelManage',
          name: 'mubanDetail',
          meta: {
            title: "模板管理详情",
            needLogin: false,
          },
          component: resolve => require(['views/publication/parameter/model/modelManage.vue'], resolve),
        },
        // 直接投稿
        {
          path: '/publication/parameter/model/contribution',
          name: 'contribution',
          meta: {
            title: "直接投稿",
            needLogin: false,
          },
          component: resolve => require(['views/publication/parameter/model/contribution.vue'], resolve),
        },
        //统计合并部门
        {
          path: '/publication/parameter/department/index',
          // name: 'departantment',
          meta: {
            title: "统计合并部门",
            needLogin: false,
          },
          component: resolve => require(['views/publication/parameter/department/index.vue'], resolve),
        },
        //部门类别配置
        {
          path: '/publication/parameter/department/departmentManage',
          // name: 'departantment',
          meta: {
            title: "部门类别配置",
            needLogin: false,
          },
          component: resolve => require(['views/publication/parameter/department/departmentManage.vue'], resolve),
        },
        //常用及部门发送配置
        {
          path: '/publication/parameter/department/common',
          name: 'common',
          meta: {
            title: "常用及部门发送配置",
            needLogin: false,
          },
          component: resolve => require(['views/publication/parameter/department/common.vue'], resolve),
        },
        //评审意见配置
        {
          path: '/publication/parameter/review/index',
          // name: 'departantment',
          meta: {
            title: "评审意见配置",
            needLogin: false,
          },
          component: resolve => require(['views/publication/parameter/review/index.vue'], resolve),
        },
        //审批意见
        {
          path: '/publication/parameter/review/reviewIdea',
          // name: 'departantment',
          meta: {
            title: "审批意见",
            needLogin: false,
          },
          component: resolve => require(['views/publication/parameter/review/reviewIdea.vue'], resolve),
        },
        ]

      },
      //部门信息
      {
        path: '/publication/departInfo',
        redirect: '/publication/departInfo/index',
        name: 'departInfoindex',
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
          // 选择部门
          {
            path: '/publication/departInfo/choseDepart',
            name: 'departInfochoseDepart',
            meta: {
              title: "选择部门",
              needLogin: false,
            },
            component: resolve => require(['views/publication/departInfo/choseDepart.vue'], resolve),
          },
          //发布信息
          {
            path: '/publication/departInfo/release',
            name: 'departInforelease',
            meta: {
              title: "发布信息",
              needLogin: false,
            },
            component: resolve => require(['views/publication/departInfo/release.vue'], resolve),
          },
          //首页本行信息
          {
            path: '/publication/departInfo/homeBankInformation',
            name: 'departInfohomeBankInformation',
            meta: {
              title: "本行信息",
              needLogin: false,
            },
            component: resolve => require(['views/publication/departInfo/homeBankInformation.vue'], resolve),
          },
          //查询
          {
            path: '/publication/departInfo/query',
            name: 'departInfoquery',
            meta: {
              title: "查询",
              needLogin: false,
            },
            component: resolve => require(['views/publication/departInfo/query.vue'], resolve),
          },
          //  参数维护
          {
            path: '/publication/departInfo/maintain',
            redirect: '/publication/departInfo/bigMaintain/csMaintain',
            name: 'csMaintain',
            meta: {
              title: "参数维护",
              needLogin: false,
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
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
              //参数维护详情
              {
                path: '/publication/departInfo/bigMaintain/maintain',
                name: 'maintain',
                meta: {
                  title: "信息种类维护详情",
                  needLogin: false,
                },
                component: resolve => require(['views/publication/departInfo/bigMaintain/maintain.vue'], resolve),
              },
              //  参数维护
              {
                path: '/publication/departInfo/bigMaintain/jbcsMaintain',
                name: 'jbcsMaintain',
                meta: {
                  title: "信息编号维护",
                  needLogin: false,
                },
                component: resolve => require(['views/publication/departInfo/bigMaintain/jbcsMaintain.vue'], resolve),
              },
              //参数维护详情
              {
                path: '/publication/departInfo/bigMaintain/jbMaintain',
                name: 'jbmaintain',
                meta: {
                  title: "信息编号维护详情",
                  needLogin: false,
                },
                component: resolve => require(['views/publication/departInfo/bigMaintain/jbMaintain.vue'], resolve),
              }
            ]
          }
        ]
      },
      //管理员查看
      {
        path: '/publication/departInfo',
        redirect: '/publication/departInfo/manageQuery',
        name: 'departInfo',
        meta: {
          title: '管理员查看',
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [
          // 管理员查看
          {
            path: '/publication/departInfo/manageQuery.vue',
            name: 'manageQuery',
            meta: {
              title: "管理员查看",
              needLogin: false,
            },
            component: resolve => require(['views/publication/departInfo/manageQuery.vue'], resolve),
          }
        ]
      }
    ],
  },

]

export default routers
