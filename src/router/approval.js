/**
 * create by zx on 2020/8/3 10:52
 * 类注释：事务审批
 * 备注：
 */

const routers = [{
    path: '/approval',
    redirect: '/approval/checkLz',
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
        path: '/approval/Deal',
        meta: {
          title: '传阅表单',
        },
        name: 'checkCyDeal',
        component: resolve => require(['views/approval/detail.vue'], resolve),
      },
      // {
      //   path: '/approval/chooDepar',
      //   meta: {
      //     title: '选择部门机构',
      //   },
      //   name: 'chooDepar',
      //   component: resolve => require(['views/approval/chooDepar.vue'], resolve),
      // },
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
        redirect: '/approval/parameter/base',
        meta: {
          title: '参数维护',
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/approval/parameter/base',
            name: 'base',
            redirect: '/approval/parameter/base/check',
            meta: {
              title: '基础配置',
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            children: [{
                path: '/approval/parameter/base/checkDetail',
                name: 'baseAdd',
                meta: {
                  title: '新增'
                },
                component: resolve => require(['views/approval/parameter/base/checkDetail.vue'], resolve),
              },
              {
                path: '/approval/parameter/base/save',
                name: 'baseSave',
                meta: {
                  title: '保存'
                },
                component: resolve => require(['views/approval/parameter/base/save.vue'], resolve),
              },
              {
                path: '/approval/parameter/base/check',
                name: 'baseCheck',
                meta: {
                  title: '查看'
                },
                component: resolve => require(['views/approval/parameter/base/check.vue'], resolve),
              }
            ],
          },
          {
            path: '/approval/parameter/apply',
            name: 'apply',
            redirect: '/approval/parameter/apply/check',
            meta: {
              title: '申请项目维护',
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            children: [{
                path: '/approval/parameter/apply/add',
                name: 'applyAdd',
                meta: {
                  title: '新增'
                },
                component: resolve => require(['views/approval/parameter/apply/add.vue'], resolve),
              },
              {
                path: '/approval/parameter/apply/save',
                name: 'applySave',
                meta: {
                  title: '保存'
                },
                component: resolve => require(['views/approval/parameter/apply/save.vue'], resolve),
              },
              {
                path: '/approval/parameter/apply/check',
                name: 'applyCheck',
                meta: {
                  title: '查看'
                },
                component: resolve => require(['views/approval/parameter/apply/check.vue'], resolve),
              }
            ],
          },
          {
            path: '/approval/parameter/serial',
            name: 'serial',
            redirect: '/approval/parameter/serial/check',
            meta: {
              title: '流水号维护   ',
            },
            component: resolve => require(['components/layout/empty.vue'], resolve),
            children: [{
                path: '/approval/parameter/serial/add',
                name: 'serialAdd',
                meta: {
                  title: '新增'
                },
                component: resolve => require(['views/approval/parameter/serial/add.vue'], resolve),
              },
              {
                path: '/approval/parameter/serial/save',
                name: 'serialSave',
                meta: {
                  title: '保存'
                },
                component: resolve => require(['views/approval/parameter/serial/save.vue'], resolve),
              },
              {
                path: '/approval/parameter/serial/check',
                name: 'serialCheck',
                meta: {
                  title: '查看'
                },
                component: resolve => require(['views/approval/parameter/serial/check.vue'], resolve),
              }
            ],
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
          {
            path: '/approval/search',
            meta: {
              title: '查询',
            },
            name: 'search',
            component: resolve => require(['views/approval/search/search.vue'], resolve),
          },
        ],
      },
      {
        path: '/approval/searchcy',
        meta: {
          title: '文件查阅',
        },
        name: 'searchcy',
        component: resolve => require(['views/approval/search/searchcy.vue'], resolve),
      },
      // {
      //   path: '/approval/admin/adminTable',
      //   name: 'admin',
      //   meta: {title: '管理员查看',},
      //   component: resolve => require(['views/approval/admin/adminTable.vue'], resolve),
      //   children: [
      //     {
      //       path: '/approval/admin/lz',
      //       name: 'lz',
      //       meta: {title: '流转',},
      //       component: resolve => require(['views/approval/admin/lz/lz.vue'], resolve),
      //     },
      //     {
      //       path: '/approval/admin/bj',
      //       name: 'bj',
      //       meta: {title: '办结',},
      //       component: resolve => require(['views/approval/admin/bj/bj.vue'], resolve),
      //     },
      //     {
      //       path: '/approval/admin/cy',
      //       name: 'cy',
      //       meta: {title: '传阅',},
      //       component: resolve => require(['views/approval/admin/cy/cyBj.vue'], resolve),
      //     },
      //   ],
      // },
    ],
  },
  {
    path: '/approval/detail',
    meta: {
      title: '流转详情',
    },
    name: 'approvalDetail',
    component: resolve => require(['views/approval/detail.vue'], resolve),
  },
  {
    path: '/approval/detailv',
    meta: {
      title: '请假单流转详情',
    },
    name: 'approvalDetailv',
    component: resolve => require(['views/approval/detailofvacation.vue'], resolve),
  },
  {
    path: '/approval/detaillj',
    meta: {
      title: '在京机构（部门）负责人疫情期间离京申请',
    },
    name: 'approvalDetailLj',
    component: resolve => require(['views/approval/detailLj.vue'], resolve),
  },
  {
    path: '/approval/detailCY',
    meta: {
      title: '传阅详情',
    },
    name: 'approvalDetailCY',
    component: resolve => require(['views/approval/detailCY.vue'], resolve),
  },
  // {
  //   path: '/approval/detailCYv',
  //   meta: {
  //     title: '请假单传阅详情',
  //   },
  //   name: 'approvalDetailCY',
  //   component: resolve => require(['views/approval/detailCYofvacation.vue'], resolve),
  // },
  {
    path: '/approval/finDetailCY',
    meta: {
      title: '已办传阅详情',
    },
    name: 'finApprovalDetailCY',
    component: resolve => require(['views/approval/finDetailCY.vue'], resolve),
  },
  {
    path: '/approval/finDetail',
    meta: {
      title: '已办制发详情',
    },
    name: 'finapprovalDetail',
    component: resolve => require(['views/approval/finDetail.vue'], resolve),
  },
  {
    path: '/approval/searchDetail',
    meta: {
      title: '查询详情',
    },
    name: 'finapprovalDetail',
    component: resolve => require(['views/approval/searchDeal.vue'], resolve),
  },
  {
    path: '/approval/yrBianhan',
    meta: {
      title: '引入便函',
    },
    name: 'yrBianhan',
    component: resolve => require(['views/approval/yrBianhan.vue'], resolve),
  },
  {
    path: '/approval/yrQianbao',
    meta: {
      title: '引入签报',
    },
    name: 'yrQianbao',
    component: resolve => require(['views/approval/yrQianbao.vue'], resolve),
  },
  {
    path: '/approval/admin/LZDeail',
    meta: {
      title: '管理员流转详情',
    },
    name: 'adminLZDeail',
    component: resolve => require(['views/approval/admin/LZDeail.vue'], resolve),
  },
  {
    path: '/approval/admin/AskDetial',
    meta: {
      title: '管理员请假单流转详情',
    },
    name: 'AskDetial',
    component: resolve => require(['views/approval/admin/AskDetial.vue'], resolve),
  },
  {
    path: '/approval/admin/CYDeail',
    meta: {
      title: '管理员传阅详情',
    },
    name: 'adminCYDeail',
    component: resolve => require(['views/approval/admin/CYdeail.vue'], resolve),
  },
  {
    path: '/approval/admin/LjDetail',
    meta: {
      title: '管理员离京审批详情',
    },
    name: 'LjDetail',
    component: resolve => require(['views/approval/admin/LjDetail.vue'], resolve),
  }

]


export default routers
