const routers = [
  {
    path: '/superviseHandle',
    name: 'SuperviseHandle',
    meta: {
      title: '秘书工作',
      keepAlive: true,
      needLogin: true,
      id: '05',
      parentId: '0'
    },
    component: resolve => require(['views/superviseHandle/superviseHandle.vue'], resolve),
    redirect: '/supervise',
    children: [
      {
        path: '/supervise',
        name: 'Supervise',
        meta: {
          title: '专项督办查',
          keepAlive: true,
          needLogin: false,
          id: '05',
          parentId: '0'
        },
        component: resolve => require(['views/superviseHandle/supervise.vue'], resolve),
        redirect: '/singleSuperviseHandle',
        children: [
          {
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
            path: '/undertakeHandle',
            name: 'UndertakeHandle',
            meta: {
              title: '承办',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/superviseHandle/superviseHandleChildren/undertakeHandle.vue'], resolve)
          },
          // {
          //   path: '/scircularize',
          //   name: ' SCircularize',
          //   meta: {
          //     title: '传阅',
          //     keepAlive: false,
          //     needLogin: false
          //   },
          //   component: resolve => require(['views/superviseHandle/superviseHandleChildren/circularize.vue'], resolve)
          // },
          // {
          //   path: '/sstatistics',
          //   name: 'SStatistics',
          //   meta: {
          //     title: '统计',
          //     keepAlive: true,
          //     needLogin: false
          //   },
          //   component: resolve => require(['views/superviseHandle/superviseHandleChildren/statistics.vue'], resolve),
          //   children:[
          //     {
          //       path: '/managestatistics',
          //       name: 'ManageStatistics',
          //       meta: {
          //         title: '按办理情况统计',
          //         keepAlive: true,
          //         needLogin: false
          //       },
          //       component: resolve => require(['views/superviseHandle/superviseHandleChildren/components/managestatistics.vue'], resolve),
          //     }
          //   ]
          // },
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
            children:[
              {
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
            children: [
              {
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
      ],
    },
    ]
},
{
  path: '/batchSuperviseAdd',
  name: 'BatchSuperviseAdd',
  meta: {
    title: '起草批量督察办',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/superviseHandleChildren/batchSuperviseAdd.vue'], resolve),
},
{
  path: '/batchSuperviseAddBJYB',
  name: 'batchSuperviseAddBJYB',
  meta: {
    title: '批量督察办只读',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/superviseHandleChildren/batchSuperviseAddBJYB.vue'], resolve),
},
{
  path: '/batchSuperviseAddBJYBCopy',
  name: 'batchSuperviseAddBJYBCopy',
  meta: {
    title: '批量督察办只读',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/superviseHandleChildren/batchSuperviseAddBJYBCopy.vue'], resolve),
},
{
  path: '/singleSuperviseHandleAdd',
  name: 'SingleSuperviseHandleAdd',
  meta: {
    title: '起草单项督察办',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/superviseHandleChildren/singleSuperviseHandleAdd.vue'], resolve),
},
{
  path: '/singleSuperviseHandleBJYB',
  name: 'singleSuperviseHandleBJYB',
  meta: {
    title: '单项督察办只读',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/superviseHandleChildren/singleSuperviseHandleBJYB.vue'], resolve),
},
{
  path: '/singleSuperviseHandleBJYBCopy',
  name: 'singleSuperviseHandleBJYBCopy',
  meta: {
    title: '单项督察办只读',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/superviseHandleChildren/singleSuperviseHandleBJYBCopy.vue'], resolve),
},
{
  path: '/jointlyDetail',
  name: 'JointlyDetail',
  meta: {
    title: '督办协办单',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/superviseHandleChildren/jointlyDetail.vue'], resolve),
},
{
  path: '/jointlyDetailCopy',
  name: 'jointlyDetailCopy',
  meta: {
    title: '督办协办单',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/superviseHandleChildren/jointlyDetailCopy.vue'], resolve),
},
{
  path: '/circularizeDetail',
  name: 'CircularizeDetail',
  meta: {
    title: '督办传阅单',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/superviseHandleChildren/circularizeDetail.vue'], resolve),
},
{
  path: '/undertakeDetail',
  name: 'UndertakeDetail',
  meta: {
    title: '督办承办单',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/superviseHandleChildren/undertakeDetail.vue'], resolve),
},
{
  path: '/undertakeDetailCopy',
  name: 'undertakeDetailCopy',
  meta: {
    title: '督办承办单',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/superviseHandleChildren/undertakeDetailCopy.vue'], resolve),
},
{
  path: '/singlecld',
  name: 'singlecld',
  meta: {
    title: '单项督察办打印单',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/print/singlecld.vue'], resolve),
},
{
  path: '/batchcld',
  name: 'batchcld',
  meta: {
    title: '批量督察办打印单',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/print/batchcld.vue'], resolve),
},
{
  path: '/undertakecld',
  name: 'undertakecld',
  meta: {
    title: '承办打印单',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/print/undertakecld.vue'], resolve),
},
{
  path: '/xiebancld',
  name: 'xiebancld',
  meta: {
    title: '协办打印单',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/superviseHandle/print/xiebancld.vue'], resolve),
},

]

export default routers
