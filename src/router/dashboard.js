const routers = [{
  path: '/dashboard',
  redirect: '/dashboard/personalOffice/dailyWork/sublicense1',
  name: 'dashboard',
  meta: {

  },
  component: resolve => require(['views/dashboard/layout/index.vue'], resolve),
  children: [{
    path: '/dashboard/personalOffice',
    name: 'personalOffice',
    meta: {
      title: '个人办公'
    },
    component: resolve => require(['components/layout/empty.vue'], resolve),
    children: [{
      path: '/dashboard/personalOffice/dailyWork',
      name: 'dailyWork',
      meta: {
        title: '日常工作'
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [{
        path: '/dashboard/personalOffice/dailyWork/sublicense1',
        name: 'Sublicense',
        redirect: '/subTemp',
        meta: {
          title: '转授权'
        },
        component: resolve =>  require(['components/layout/empty.vue'], resolve),
        children: [
          {
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
          }
          //转授权
          ,
     
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
          },
          //我的收藏
          {
            path: '/dashboard/personalOffice/dailyWork/collection',
            name: 'collection',
            meta: {
              title: '我的收藏'
            },
            component: resolve => require(['views/dashboard/personal-office/daily-work/collection/index.vue'], resolve),

          },
        ]
      },
      //工作交流
      {
        path: '/dashboard/personalOffice/dailyWork/workCommunicate',
        name: 'workCommunicate',
        meta: {
          title: '工作交流'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/workCommunicate/index.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/dailyWork/workCommunicate/workCommForm',
        name: 'workCommForm',
        meta: {
          title: '工作交流单'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/workCommunicate/components/workCommForm.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/dailyWork/workCommunicate/workCommviewDetail',
        name: 'workCommviewDetail',
        meta: {
          title: '工作交流单详情'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/workCommunicate/components/workCommviewDetail.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/dailyWork/workCommunicate/vDWorkCommForm',
        name: 'vDWorkCommForm',
        meta: {
          title: '工作交流单详情编辑'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/workCommunicate/components/vDWorkCommForm.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/dailyWork/workCommunicate/vDWorkCommFormSave',
        name: 'vDWorkCommFormSave',
        meta: {
          title: '工作交流单详情保存'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/workCommunicate/components/vDWorkCommFormSave.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/dailyWork/workCommunicate/vDWorkCommFormLastSave',
        name: 'vDWorkCommFormLastSave',
        meta: {
          title: '工作交流单最终保存'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/workCommunicate/components/vDWorkCommFormLastSave.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/dailyWork/workCommunicate/inquireResult',
        name: 'inquireResult',
        meta: {
          title: '工作交流单查询结果'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/workCommunicate/components/inquireResult.vue'], resolve),
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
      {
        path: '/dashboard/personalOffice/dailyWork/workDeal',
        name: 'viewworkDeal',
        meta: {
          title: '查看个人日志详情'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/workLog/workDeal.vue'], resolve),
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
        path: '/dashboard/personalOffice/dailyWork/schedule/newSchedule',
        name: 'newSchedule',
        meta: {
          title: '新建日程'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/schedule/components/newSchedule.vue'], resolve),
      },
      // {
      //   path: '/dashboard/personalOffice/dailyWork/scheduleList',
      //   name: 'scheduleList',
      //   meta: {
      //     title: '日程安排表'
      //   },
      //   component: resolve => require(['views/dashboard/personal-office/daily-work/schedule/components/list.vue'], resolve),
      // },
      // {
      // 	path: '/dashboard/personalOffice/dailyWork/schedule/scheduleDetail',
      //   name: 'scheduleDetail',
      //   meta: {
      //     title: '日程内容'
      //           },
      //   component: resolve => require(['views/dashboard/personal-office/daily-work/schedule/components/detail.vue'], resolve),
      // },
      {
        path: '/dashboard/personalOffice/dailyWork/scheduleList',
        name: 'scheduleList',
        meta: {
          title: '日程安排表'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/schedule/components/list.vue'], resolve),
      },
      {
      	path: '/dashboard/personalOffice/dailyWork/schedule/scheduleDetail',
        name: 'scheduleDetail',
        meta: {
          title: '日程内容'
                },
        component: resolve => require(['views/dashboard/personal-office/daily-work/schedule/components/detail.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/dailyWork/schedule/weekView',
        name: 'weekView',
        meta: {
          title: '一周视图'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/schedule/components/weekView.vue'], resolve),
      },
      // 个人通讯录
              {
                path: '/dashboard/personalOffice/dailyWork/addressBook',
                name: 'addressBook',
                meta: {
                  title: '个人通讯录'
                },
                component: resolve => require(['views/dashboard/personal-office/daily-work/addressBook/index.vue'], resolve),
              },
              {
                path: '/dashboard/personalOffice/dailyWork/addressBook/addreBookview',
                name: 'addreBookview',
                meta: {
                  title: '添加个人通讯录'
                },
                component: resolve => require(['views/dashboard/personal-office/daily-work/addressBook/components/newProj.vue'], resolve),
              },
              {
                path: '/dashboard/personalOffice/dailyWork/addressBook/addreBookviewDetail',
                name: 'addreBookviewDetail',
                meta: {
                  title: '查看个人通讯录详情'
                },
                component: resolve => require(['views/dashboard/personal-office/daily-work/addressBook/components/addreBookviewDetail.vue'], resolve),
              },
      {
        path: '/dashboard/personalOffice/dailyWork/addressBook',
        name: 'addressBook',
        meta: {
          title: '个人通讯录'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/addressBook/index.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/dailyWork/addressBook/addreBookview',
        name: 'addreBookview',
        meta: {
          title: '添加个人通讯录'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/addressBook/components/newProj.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/dailyWork/addressBook/addreBookviewDetail',
        name: 'addreBookviewDetail',
        meta: {
          title: '查看个人通讯录详情'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/addressBook/components/addreBookviewDetail.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/dailyWork/newApply',
        name: 'newApply',
        meta: {
          title: '新增申请'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/newApply/index.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/dailyWork/newApply/newUserApply',
        name: 'newUserApply',
        meta: {
          title: '新增申请查看待办详情'
        },
        component: resolve => require(['views/dashboard/personal-office/daily-work/newApply/components/newUserApply.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/fileManagement',
        name: 'fileManagement',
        meta: {
          title: '档案管理'
        },
        component: resolve => require(['views/dashboard/personal-office/fileManage/simpleQuery/index.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/fileManagement/borrow',
        name: 'borrow',
        meta: {
          title: '电子借阅单'
        },
        component: resolve => require(['views/dashboard/personal-office/fileManage/simpleQuery/borrow.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/fileManagement/viewFile',
        name: 'viewFile',
        meta: {
          title: '文件著录表单'
        },
        component: resolve => require(['views/dashboard/personal-office/fileManage/simpleQuery/viewFile.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/fileManagement/viewHander',
        name: 'viewHander',
        meta: {
          title: '电子发文处理单'
        },
        component: resolve => require(['views/dashboard/personal-office/fileManage/simpleQuery/viewHander.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/fileManagement/comQuery',
        name: 'comQuery',
        meta: {
          title: '组合查询'
        },
        component: resolve => require(['views/dashboard/personal-office/fileManage/comQuery/index.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/fileManagement/queryTable',
        name: 'queryTable',
        meta: {
          title: '档案查询结果'
        },
        component: resolve => require(['views/dashboard/personal-office/fileManage/comQuery/queryTable.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/fileManagement/fileClass',
        name: 'fileClass',
        meta: {
          title: '文件分类显示'
        },
        component: resolve => require(['views/dashboard/personal-office/fileManage/fileClass/index.vue'], resolve),
      },
      ]
    },
    {
      path: '/dashboard/personalOffice/sysConfig',
      name: 'sysConfig',
      meta: {
        title: '系统设置'
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [{
        path: '/dashboard/personalOffice/sysConfig/index',
        name: 'sysConfig_index',
        meta: {
          title: '收藏设置'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/favorites.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/remind',
        name: 'remind',
        meta: {
          title: '提醒设置'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/remind.vue'], resolve),
      },

      {
        path: '/dashboard/personalOffice/sysConfig/superRemind/index',
        // redirect: '/dashboard/personalOffice/sysConfig/superRemind',
        name: 'superRemind',
        meta: {
          title: '超期待办提醒设置'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/superRemind/index.vue'], resolve),
        // children:[{
        //   path:'/dashboard/personalOffice/sysConfig/superRemind/index',
        //   meta:{
        //     title:'超期待办提醒设置'
        //   },
        //   name:'superRemind_index',
        //   component: resolve => require(['views/dashboard/personal-office/sysConfig/superRemind/index.vue'], resolve),
        // }

        // ]
      },     
      
      {
        path: '/dashboard/personalOffice/sysConfig/useObject',
        name: 'useObject',
        meta: {
          title: '常用发送对象登记'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/useObject.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/vierPer',
        name: 'vierPer',
        meta: {
          title: '新增 '
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/vierPer.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/vierPerList',
        name: 'vierPerList',
        meta: {
          title: '查看个人'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/vierPerList.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/createGroup',
        name: 'createGroup',
        meta: {
          title: '新建本行群组'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/createGroup.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/otherGroup',
        name: 'otherGroup',
        meta: {
          title: '选择他行群组'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/otherGroup.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/headquarter',
        name: 'headquarter',
        meta: {
          title: '新建本部群组'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/headquarter.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/headquarterGroup',
        name: 'headquarter',
        meta: {
          title: '查看他行群组'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/headquarterGroup.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/viewGroup',
        name: 'viewGroup',
        meta: {
          title: '查看群组'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/viewGroup.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/comWords',
        name: 'comWords',
        meta: {
          title: '个人常用批语'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/comWords.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/viewWords',
        name: 'viewWords',
        meta: {
          title: '查看个人常用批语'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/viewWords.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/viewLinkConfig',
        name: 'viewLinkConfig',
        meta: {
          title: '链接设置'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/viewLinkConfig.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/sysConfig/linkDeal',
        name: 'linkDeal',
        meta: {
          title: '链接设置详情'
        },
        component: resolve => require(['views/dashboard/personal-office/sysConfig/linkDeal.vue'], resolve),
      },
      // {
      //   path: '/dashboard/personalOffice/sysConfig/viewPerLink',
      //   name: 'viewPerLink',
      //   meta: {
      //     title: '查看个人链接'
      //   },
      //   component: resolve => require(['views/dashboard/personal-office/sysConfig/viewPerLink.vue'], resolve),
      // },
      // {
      //   path: '/dashboard/personalOffice/sysConfig/viewPublicLink',
      //   name: 'viewPublicLink',
      //   meta: {
      //     title: '查看公共链接'
      //   },
      //   component: resolve => require(['views/dashboard/personal-office/sysConfig/viewPublicLink.vue'], resolve),
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
    {
      path: '/dashboard/personalOffice/admin',
      name: 'admin',
      meta: {
        title: '管理员设置'
      },
      component: resolve => require(['components/layout/empty.vue'], resolve),
      children: [
        {
          path: '/dashboard/personalOffice/admin/coluIndex',
          name: 'columnIndex',
          meta: {
            title: '专栏设置'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/coluIndex.vue'], resolve),
        },
        {
          path: '/dashboard/personalOffice/admin/coluFir',
          name: 'linkTable',
          meta: {
            title: '专栏设置'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/coluFir.vue'], resolve),
        },
        {
          path: '/dashboard/personalOffice/admin/newcreateColumn',
          name: 'newcreateColumn',
          meta: {
            title: '新建专栏'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/newcreateColumn.vue'], resolve),
        },
        {
          path: '/dashboard/personalOffice/admin/createColumn',
          name: 'createColumn',
          meta: {
            title: '查看专栏'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/createColumn.vue'], resolve),
        },
        {
          path: '/dashboard/personalOffice/admin/viewColumn',
          name: 'viewColumn',
          meta: {
            title: '查看专栏'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/viewColumn.vue'], resolve),
        },
        {
          path: '/dashboard/personalOffice/admin/columnConfig',
          name: 'columnConfig',
          meta: {
            title: '栏目设置'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/columnConfig.vue'], resolve),
        },
        {
          path: '/dashboard/personalOffice/admin/viewColumnConfig',
          name: 'viewColumnConfig',
          meta: {
            title: '查看栏目设置'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/viewColumnConfig.vue'], resolve),
        },
        {
          path: '/dashboard/personalOffice/admin/searchData',
          name: 'searchData',
          meta: {
            title: '查询'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/searchData.vue'], resolve),
        },
        {
          path: '/dashboard/personalOffice/admin/columnTable',
          name: 'columnTable',
          meta: {
            title: '查询列表'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/searchTable.vue'], resolve),
        },
        {
          path: '/dashboard/personalOffice/admin/alterWin',
          name: 'alterWin',
          meta: {
            title: '弹出窗口信息设置'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/index.vue'], resolve),
        },
        {
          path: '/dashboard/personalOffice/admin/sendPhone',
          name: 'sendPhone',
          meta: {
            title: '手工发送短信'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/sendPhone.vue'], resolve),
        },
        {
          path: '/dashboard/personalOffice/admin/initWarrant',
          name: 'initWarrant',
          meta: {
            title: '同步转授权至商密OA'
          },
          component: resolve => require(['views/dashboard/personal-office/admin/initWarrant.vue'], resolve),
        },
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
        path: '/dashboard/personalOffice/publishInfo/selfBankInfoPub',
        name: 'selfBankInfoPub',
        meta: {
          title: '本行信息发布表'
        },
        component: resolve => require(['views/dashboard/personal-office/publishInfo/selfBankInfo/components/selfBankInfoPub.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/publishInfo/finselfBankInfoPub',
        name: 'finselfBankInfoPub',
        meta: {
          title: '已办本行信息发布表'
        },
        component: resolve => require(['views/dashboard/personal-office/publishInfo/selfBankInfo/components/finInfo.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/publishInfo/setInfoManager',
        name: 'setInfoManager',
        meta: {
          title: '新建本行管理员'
        },
        component: resolve => require(['views/dashboard/personal-office/publishInfo/selfBankInfo/components/setInfoManager.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/publishInfo/inquire',
        name: 'selfinquire',
        meta: {
          title: '查询'
        },
        component: resolve => require(['views/dashboard/personal-office/publishInfo/selfBankInfo/components/inquire.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/publishInfo/inquireDeal',
        name: 'selfinquireDeal',
        meta: {
          title: '查询详情'
        },
        component: resolve => require(['views/dashboard/personal-office/publishInfo/selfBankInfo/components/inquDeal.vue'], resolve),
      },
      {
        path: '/dashboard/personalOffice/publishInfo/setManageTable',
        name: 'setManageTable',
        meta: {
          title: '设置本行管理员'
        },
        component: resolve => require(['views/dashboard/personal-office/publishInfo/selfBankInfo/components/setManageTable.vue'], resolve),
      }
      ]
    }
    ]
  }]
},
{
  path: '/subTempAdd',
  name: 'SubTempAdd',
  meta: {
    title: '临时转授权登记',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/dashboard/personal-office/daily-work/sublicense1/subTempAdd.vue'], resolve),
},
{
  path: '/zhuanshouqPrint',
  name: 'zhuanshouqPrint',
  meta: {
    title: '临时转授权登记',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/dashboard/personal-office/daily-work/printDashboard/zhuanshouqPrint.vue'], resolve),
},
{
  path: '/subLongAdd',
  name: 'SubLongAdd',
  meta: {
    title: '长期转授权登记',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/dashboard/personal-office/daily-work/sublicense1/subLongAdd.vue'], resolve),
},
{
  path: '/subLongDone',
  name: 'SubLongDone',
  meta: {
    title: '长期转授权登记',
    keepAlive: true,
    needLogin: false
  },
  component: resolve => require(['views/dashboard/personal-office/daily-work/sublicense1/subLongDone.vue'], resolve),
},
]


export default routers
