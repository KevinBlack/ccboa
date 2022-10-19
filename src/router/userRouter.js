/*
 * @Author: your name
 * @Date: 2020-08-13 11:15:19
 * @LastEditTime: 2021-05-14 11:30:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\router\userRouter.js
 */ 
/**
 * create by zx on 2020-1-5 10:26
 * 类注释：
 * 备注：
 */

const routers = [
  {
    path: '/openNewPage',
    name: 'openNewPage',
    meta: {
      title: '中间页',  
      needLogin: false
    },
    component: resolve => require(['views/common/openNewPage'], resolve),
  },
  {
    path: '/effective',
    name: 'Effective',
    meta: {
      title: '效能看板',  
      needLogin: true
    },
    hidden:true,
    component: resolve => require(['views/common/effective'], resolve),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      needLogin: false
    },
    component: resolve => require(['views/user/login'], resolve)
  },
  {
    path: '/loginPage',
    name: 'loginPage',
    meta: {
      title: '登录2',
      needLogin: false
    },
    component: resolve => require(['views/user/loginPage'], resolve)
  },
  {
    path: '/index',
    name: 'Index',
    meta: {
      title: '首页',
      keepAlive: true,
      needLogin: true
    },
    component: resolve => require(['views/common/index'], resolve),
    redirect: '/home',
    children: [
      {
        path: '/Home',
        name: 'Home',
        meta: {
          title: '',
          keepAlive: true,
          needLogin: true
        },
        component: resolve => require(['views/common/Home'], resolve),
      },
      {
        path: '/todolist',
        name: 'Todolist',
        meta: {
          title: '待办事宜',
          keepAlive: true,
          needLogin: true
        },
        component: resolve => require(['views/common/todolist'], resolve),
      },
      {
        path: '/fileRead',
        name: 'FileRead',
        meta: {
          title: '文件阅览',
          keepAlive: true,
          needLogin: true
        },
        component: resolve => require(['views/common/fileRead'], resolve),
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
        path: '/fwbz',
        name: 'fwbz',
        meta: {title: '服务保障',},
        component: resolve => require(['views/serveEnsure/index.vue'], resolve),
        redirect:'/problem',
        children: [
          {
            path: '/feedback',
            name: 'feedback',
            meta: {
              title: "意见反馈",
              needLogin: false,
            },
            component: resolve => require(['views/serveEnsure/feedback.vue'], resolve),
          },
          {
            path: '/problem',
            name: 'problem',
            meta: {
              title: "常见问题",
              needLogin: false,
            },
            component: resolve => require(['views/serveEnsure/problem.vue'], resolve),
          },{
            path: '/handbook',
            name: 'handbook',
            meta: {
              title: "用户手册",
              needLogin: false,
            },
            component: resolve => require(['views/serveEnsure/handbook.vue'], resolve),
          },
        ]
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
      {
        path: '/bigScreen',
        name: 'bigScreen',
        meta: {
          title:"效能看板",
          keepAlive: true,
          needLogin: true,
          target:"_blank",
        },
        redirect:"/effective"
      },
      {
        path: '/personManage',
        name: 'PersonManage',
        meta: {
          title: '人员管理',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/systemManage/personManage/personManage'], resolve)
      },
      {
        path: '/upload',
        name: 'upload',
        meta: {
          title: '上传',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/user/uploadImg/upload'], resolve)
      },
      {
        path: '/globalsearch',
        name: 'Globalsearch',
        meta: {
          title: '全局查询',
          needLogin: false
        },
        component: resolve => require(['views/common/globalsearch'], resolve)
      },
      {
        path: '/gwwydp',
        name: 'gwwydp',
        meta: {title: '公文问与答',},
        component: resolve => require(['views/myquestions/index.vue'], resolve),
        redirect:'/myquestions',
        children: [
          {
            path: '/myquestions',
            name: 'myquestions',
            meta: {
              title: "我的问题",
              needLogin: false,
            },
            component: resolve => require(['views/myquestions/questions.vue'], resolve),
          },
          {
            path: '/answers', 
            name: 'answers',
            meta: {
              title: "我的答复",
              needLogin: false,
            },
            component: resolve => require(['views/myquestions/answers.vue'], resolve),
          },
          {
            path: '/chaxun',
            name: 'chaxun',
            meta: {
              title: "查询",
              needLogin: false,
            },
            component: resolve => require(['views/myquestions/chaxun.vue'], resolve),
          },{
            path: '/TongJi',
            name: 'TongJi',
            meta: {
              title: "统计",
              needLogin: false,
            },
            component: resolve => require(['views/myquestions/TongJi.vue'], resolve),
          },
          {
            path: '/qryPageByBumen',
            name: 'qryPageByBumen',
            meta: {
              title: "部门明细表",
              needLogin: false,
            },
            component: resolve => require(['views/myquestions/qryPageByBumen.vue'], resolve),
          }
        ]
      },
      {
        path: '/zhDA',
        name: 'zhDA',
        meta: {
          title: '综合档案',
          keepAlive: true,
          needLogin: true
        },
      },
      {
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
      },
      {
        path: '/dashboard/personalOffice/sysConfig/viewLinkConfig',
        name: 'viewLinkConfig',
        meta: {
          title: '友情链接'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/viewLinkConfig.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/admin/coluFir',
        name: 'linkTable',
        meta: {
          title: '专栏'
        },
        component: resolve => require(['views/dashboard/personal-office/admin/coluFir.vue'], resolve),
      },



    ]
  },
  {
    path: '/smOA',
    name: 'smOA',
    meta: {
      title: '商密OA',
      keepAlive: true,
      needLogin: true
    },
  },
  {
    path: '/zhDa',
    name: 'zhDa',
    meta: {
      title: '综合档案',
      keepAlive: true,
      needLogin: true
    },
  },
  {
    path: '/nationSecretPrint',
    name: 'nationSecretPrint',
    meta: {
      title: '密文事项统计打印单',
      keepAlive: true,
      ccneedLogin: true
    },
    component: resolve => require(['views/secretStatistics/nationSecretPrint'], resolve)
  },
  /* 重定向 */
  {
    path: '*',
    redirect: { name: 'login' } // 重定向
  }
]

export default routers
