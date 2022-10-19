/**
 * create by zx on 2020-6-28 09:10
 * 类注释：
 * 备注：
 */
const routers = [
  {
    path: '/bianhan',
    redirect: '/bianhan/index',
    name: 'bianhan',
    meta: {title: '便函管理',},
    component: resolve => require(['views/bianhan/layout/index.vue'], resolve),
    children: [
      {
        path: '/bianhan/index',
        name: 'bianhanIndex',
        meta: {
          title: "制发",
          keepAlive: true,
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
        path: '/bianhan/annsearchtable',
        name: 'annsearchtable',
        meta: {
          title: "查询",
          keepAlive: true,
          needLogin: false,
        },
        component: resolve => require(['views/bianhan/annsearch/annsearchtable.vue'], resolve)
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
        redirect: '/bianhan/serialnum',
        meta: {
          title: "参数维护",
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [
          {
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
            path: '/bianhan/serialdeal',
            name: 'serialdeal',
            meta: {
              title: "流水号维护",
              keepAlive: true,
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/serialnum/serialdeal.vue'], resolve)
          },
          {
            path: '/bianhan/setting/deal',
            name: 'bianhanSettingDeal',
            meta: {
              title: "便函系统配置详情",
              keepAlive: true,
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/setting/setting.vue'], resolve)
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
          {
            path: '/bianhan/superRemindList',
            name: 'bianhanSuperRemindList',
            meta: {
              title: "承办反馈时间提醒设置",
              keepAlive: true,
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/superRemind/superRemindList.vue'], resolve)
          },
          {
            path: '/bianhan/superRemind',
            name: 'bianhanSuperRemind',
            meta: {
              title: "便函超期待办提醒设置",
              keepAlive: true,
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/superRemind/superRemind.vue'], resolve)
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
        children: [
          {
            path: '/bianhan/admin/zf',
            name:'zf',
            meta: {
              title: "制发",
              keepAlive: true,
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/admin/zf.vue'], resolve),
          },
          {
            path: '/bianhan/admin/cb',
            name:'cb',
            meta: {
              title: "承办",
              keepAlive: true,
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/admin/cb.vue'], resolve),
          },
          {
            path: '/bianhan/admin/cy',
            name:'cy',
            meta: {
              title: "传阅",
              keepAlive: true,
              needLogin: false,
            },
            component: resolve => require(['views/bianhan/admin/cy.vue'], resolve),
          }
        ]
      },
      {
        path: '/bianhan/bianhancy',
        name: 'bianhancy',
        meta: {
          title: "文件查阅",
          keepAlive: true,
          needLogin: false,
        },
        component: resolve => require(['views/bianhan/annsearch/bianhancy.vue'], resolve)
      },
    ]
  },
  {
    path: '/addproceorder',
    name: 'addproceorderdeal',
    meta: {title: '制发单处理'},
    component: resolve => require(['views/bianhan/detail/proceorderdeal.vue'], resolve),
  },
  {
    path: '/proceHas',
    name: 'proceHas',
    meta: {title: '制发单处理'},
    component: resolve => require(['views/bianhan/detail/proceHas.vue'], resolve),
  },
  {
    path: '/circulate',
    name: 'circulate',
    meta: {title: '传阅单处理'},
    component: resolve => require(['views/bianhan/circulatetable/circulate.vue'], resolve),
  },
  {
    path: '/underdeal',
    name: 'underdeal',
    meta: {title: '承办单处理'},
    component: resolve => require(['views/bianhan/undertable/underdeal.vue'], resolve),
  },
  {
    path: '/underdealHas',
    name: 'underdealHas',
    meta: {title: '承办单处理'},
    component: resolve => require(['views/bianhan/undertable/underdealHas.vue'], resolve),
  },
  {
    path: '/adminsaddproceorder',
    name: 'adminaddproceorderdeal',
    meta: {title: '制发单处理'},
    component: resolve => require(['views/bianhan/detail/adminProceorderdeal.vue'], resolve),
  },
  {
    path: '/adminproceHas',
    name: 'adminproceHas',
    meta: {title: '制发单处理'},
    component: resolve => require(['views/bianhan/detail/adminProceHas.vue'], resolve),
  },
  {
    path: '/admincirculate',
    name: 'admincirculate',
    meta: {title: '传阅单处理'},
    component: resolve => require(['views/bianhan/circulatetable/adminCirculate.vue'], resolve),
  },
  {
    path: '/adminunderdeal',
    name: 'adminunderdeal',
    meta: {title: '承办单处理'},
    component: resolve => require(['views/bianhan/undertable/adminUnderdeal.vue'], resolve),
  },
  {
    path: '/adminunderdealHas',
    name: 'adminunderdealHas',
    meta: {title: '承办单处理'},
    component: resolve => require(['views/bianhan/undertable/adminUnderdealHas.vue'], resolve),
  }

];

export default routers;

