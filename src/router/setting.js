/**
 * create by zx on 2020-6-23 10:48
 * 类注释：
 * 备注：
 */
const routers = [{
    path: '/setting',
    redirect: "/setting/orgDepartment/orgManage/orgManageView",
    name: 'setting',
    meta: {
      title: '系统管理'
    },
    component: resolve => require(['views/setting/layout/index.vue'], resolve),
    children: [{
        path: '/setting/orgDepartment',
        redirect: "/setting/orgDepartment/orgManage/orgManageView",
        name: 'orgDepartment',
        meta: {
          title: '组织机构',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/layout/empty.vue'], resolve),
        children: [{
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
                path: '/setting/orgDepartment/orgIndex/orgIndexInfo',
                name: 'orgIndexInfo',
                meta: {
                  title: '保存配置机构索引',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/organization-index/config/orgIndexInfo.vue'], resolve)
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
              {
                path: '/setting/orgDepartment/orgIndex/editOrgIndex',
                name: 'editOrgIndex',
                meta: {
                  title: '编辑机构索引',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/organization-index/view/editOrgIndex.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/orgIndex/reorderOrg',
                name: 'reorderOrg',
                meta: {
                  title: '调整下级结构顺序',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/organization-index/components/reorderOrg.vue'], resolve)
              }
            ]
          },
          {
            path: '/setting/orgDepartment/orgManage',
            redirect: "/setting/orgDepartment/orgManage/orgManageView",
            name: 'orgManage',
            meta: {
              title: '机构管理',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/layout/empty.vue'], resolve),
            children: [{
                path: '/setting/orgDepartment/orgManage/orgManageView',
                name: 'orgManageView',
                meta: {
                  title: '查看机构',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/organization-manage/view/index.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/orgManage/sortOrg',
                name: 'sortOrg',
                meta: {
                  title: '机构排序',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/organization-manage/view/sortOrg.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/orgManage/orgManageViewDetail',
                name: 'orgManageViewDetail',
                meta: {
                  title: '查看机构详情',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/organization-manage/view/organizationInfo.vue'], resolve)
              }, {
                path: '/setting/orgDepartment/orgManage/orgManageConfig',
                name: 'orgManageConfig',
                meta: {
                  title: '配置机构',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setOrgDep/organizationManage/index.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/orgManage/creOrgManageConfig',
                name: 'creOrgManageConfig',
                meta: {
                  title: '新建配置机构',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setOrgDep/organizationManage/createIndex.vue'], resolve)
              }
            ]
          },
          {
            path: '/setting/orgDepartment/departManage',
            name: 'departManage',
            redirect: "/setting/orgDepartment/departManage/depManageView",
            meta: {
              title: '部门管理',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/layout/empty.vue'], resolve),
            children: [{
                path: '/setting/orgDepartment/departManage/depManageConfig',
                name: 'depManageConfig',
                meta: {
                  title: '配置部门',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/department-manage/config/index.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/departManage/creDepManageConfig',
                name: 'creDepManageConfig',
                meta: {
                  title: '新建配置部门',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/department-manage/config/createIndex.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/orgManage/sortDept',
                name: 'sortDept',
                meta: {
                  title: '部门排序',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/department-manage/view/sortDept.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/departManage/depManageView',
                name: 'depManageView',
                meta: {
                  title: '查看部门',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/department-manage/view/index.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/departManage/departDetail',
                name: 'departDetail',
                meta: {
                  title: '查看部门详情',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/department-manage/components/departDetail.vue'], resolve)
              }, {
                path: '/setting/orgDepartment/orgManage/depManageAltera',
                name: 'depManageAltera',
                meta: {
                  title: '部门变更',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/department-manage/alteration/index.vue'], resolve)
              }
            ]
          },
          {
            path: '/setting/orgDepartment/personManage',
            name: 'personManage',
            redirect: '/setting/orgDepartment/personManage/personList',
            meta: {
              title: '人员管理',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/layout/empty.vue'], resolve),
            children: [{
                path: '/setting/orgDepartment/personManage/extract',
                name: 'extract',
                meta: {
                  title: '提取人员',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/personManage/extract/extract.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/personManage/personList',
                name: 'personList',
                meta: {
                  title: '人员列表',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/personManage/look/personList.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/personManage/sortPerson',
                name: 'sortPerson',
                meta: {
                  title: '人员排序',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/personManage/look/sortPerson.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/personManage/detailPerson',
                name: 'detailPerson',
                meta: {
                  title: '人员详情',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/personManage/look/detailPerson.vue'], resolve)
              },
              //文件交换
              {
                path: '/setting/orgDepartment/personManage/fileChange',
                name: 'fileChange',
                meta: {
                  title: '文件交换人员配置',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/personManage/look/fileChange.vue'], resolve)
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
              //人员新增
              {
                path: '/setting/orgDepartment/personManage/addPerson',
                name: 'addPerson',
                meta: {
                  title: '新增人员',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/personManage/look/addPerson.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/personManage/importUass',
                name: 'importUass',
                meta: {
                  title: '导入uass账户',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/personManage/look/importUass.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/personManage/sleepList',
                name: 'sleepList',
                meta: {
                  title: '查看休眠',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/personManage/sleep/sleepList.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/personManage/filePersonList',
                name: 'filePersonList',
                meta: {
                  title: '查看文件',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/personManage/file/filePersonList.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/personManage/addFilePerson',
                name: 'addFilePerson',
                meta: {
                  title: '新增',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/personManage/file/add.vue'], resolve)
              }
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
            component: resolve => require(['views/setting/organization-department/alterRecordManage/layout/index.vue'], resolve),
            children: [{
                path: '/setting/orgDepartment/alterRecord/orgAlterRecord',
                name: 'orgAlterRecord',
                meta: {
                  title: '新旧机构对应记录',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/alterRecordManage/orgAlterRecord/index.vue'], resolve),
                children: []
              },
              {
                path: '/setting/orgDepartment/alterRecord/alterDeptRecord',
                name: 'alterDeptRecord',
                meta: {
                  title: '新旧部门对应记录',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/alterRecordManage/deptAlterRecord/index.vue'], resolve),
                children: []
              },
              {
                path: '/setting/orgDepartment/alterRecord/alterDeptRecord/list/edit',
                name: 'alterDeptEdit',
                meta: {
                  title: '新旧部门对应表',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/alterRecordManage/deptAlterRecord/edit.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/alterRecord/deptIndexAlter',
                name: 'deptIdxAlterTable',
                meta: {
                  title: '机构索引变更记录',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/alterRecordManage/deptIdxAlterRecord/index'], resolve)
              },
              {
                path: '/setting/orgDepartment/alterRecord/orgAlterations',
                name: 'orgAlterations',
                meta: {
                  title: '机构变更记录',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/alterRecordManage/orgAlterations/index'], resolve)
              },
              {
                path: '/setting/orgDepartment/alterRecord/deptAlterations',
                name: 'deptAlterations',
                meta: {
                  title: '部门变更记录',
                  keepAlive: true
                },
                component: resolve => require(['views/setting/organization-department/alterRecordManage/deptAlterations/index'], resolve)
              },
            ]
          },
          //变更记录管理详情
          {
            path: '/setting/orgDepartment/alterRecord/orgAlterRecord/list/edit',
            name: 'orgAlterEdit',
            meta: {
              title: '编辑新旧机构',
              keepAlive: true
            },
            component: resolve => require(['views/setting/organization-department/alterRecordManage/orgAlterRecord/edit.vue'], resolve)
          },
          {
            path: '/setting/orgDepartment/alterRecord/deptAlterations/info',
            name: 'deptAlterationsInfo',
            meta: {
              title: '部门详情',
              keepAlive: true
            },
            component: resolve => require(['views/setting/organization-department/alterRecordManage/deptAlterations/deptAlterationsInfo'], resolve)
          },
          {
            path: '/setting/orgDepartment/alterRecord/orgAlterations/info',
            name: 'orgAlterationsInfo',
            meta: {
              title: '机构详情',
              keepAlive: true
            },
            component: resolve => require(['views/setting/organization-department/alterRecordManage/orgAlterations/orgAlterationsInfo'], resolve)
          },
          {
            path: '/setting/orgDepartment/alterRecord/deptIndexAlter/info',
            name: 'deptIdxAlterList',
            meta: {
              title: '机构索引变更详情',
              keepAlive: true
            },
            component: resolve => require(['views/setting/organization-department/alterRecordManage/deptIdxAlterRecord/deptIdxAlterInfo'], resolve)
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
            children: [{
                path: '/setting/orgDepartment/teamManage/teamList',
                name: 'teamList',
                meta: {
                  title: '查看群组',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/teamManage/teamList.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/teamManage/editTeam',
                name: 'teamListEditTeam',
                meta: {
                  title: '配置群组',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/teamManage/editTeam.vue'], resolve)
              }
            ]
          },
          {
            path: '/setting/orgDepartment/belongingWork',
            redirect: '/setting/orgDepartment/belongingWork/index',
            meta: {
              needLogin: false
            },
            component: resolve => require(['views/setting/layout/empty.vue'], resolve),
            children: [{
                path: '/setting/orgDepartment/belongingWork/index',
                meta: {
                  title: '合署办公',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/belongingWork/index.vue'], resolve)
              },
              {
                path: '/setting/orgDepartment/belongingWork/detail',
                meta: {
                  title: '合署办公',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/setting/organization-department/belongingWork/detail.vue'], resolve)
              }
            ]
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
                  title: '主流程模板',
                  needLogin: false
                },
                component: resolve => require(['views/setting/processControl/main/mainProcessControl.vue'], resolve),
              },
              {
                path: '/setting/processControll/processTemp/childProcessTemp',
                name: 'childProcessTemp',
                meta: {
                  title: '子流程模板',
                  needLogin: false
                },
                component: resolve => require(['views/setting/processControl/main/mainProcessControl.vue'], resolve),
              }
            ]
          }
        ],
      },
      {
        path: '/setting/themeLexicon',
        name: 'themeLexiconSet',
        redirect: '/setting/themeLexicon/themeLexiconSet',
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
        path: '/setting/themeLexicon/genusConfig',
        name: 'genusConfig',
        meta: {
          title: '编辑类属词',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/themeLexicon/genus/genusConfig.vue'], resolve)
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
            component: resolve => require(['views/setting/statistics/analysis/wholeBank.vue'], resolve),
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
        redirect: '/setting/sysConfig/gradprotect',
        name: 'sysConfig',
        meta: {
          title: '系统配置',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/layout/empty.vue'], resolve),

        children: [{
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
            // component: resolve => require(['views/setting/menuPermissionConfig/index.vue'], resolve)
            component: resolve => require(['views/bianhan/indexTest.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/server',
            name: 'systable',
            meta: {
              title: '服务器配置',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/server/index.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/server/serverdeal',
            name: 'serverdeal1',
            meta: {
              title: '服务器详情',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/server/serverdeal.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/server/servereditor',
            name: 'servereditor',
            meta: {
              title: '服务器编辑',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/server/servereditor.vue'], resolve)
          },
          {
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
            path: '/setting/sysConfig/database/databaseEditor',
            name: 'databaseEditor',
            meta: {
              title: '数据库编辑',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/database/databaseeditor.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/database/databaseDeal',
            name: 'databaseDeal',
            meta: {
              title: '数据库详情',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/database/databasedeal.vue'], resolve)
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
            path: '/setting/sysConfig/gradprotect/graddeal',
            name: 'graddeal',
            meta: {
              title: '分级维护详情',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/gradprotect/graddeal.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/gradprotect/gradeditor',
            name: 'gradeditor',
            meta: {
              title: '分级维护编辑',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/gradprotect/gradeditor.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/gradprotect/createdgrad',
            name: 'createdgrad',
            meta: {
              title: '新建分级维护',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/gradprotect/createdgrad.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/keyword',
            name: 'keyword',
            meta: {
              title: '主题词部门设置',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/keyword/index.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/createKeyword',
            name: 'createKeyword',
            meta: {
              title: '新建主题词部门',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/keyword/createKey.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/keyword/keyworddeal',
            name: 'keyworddeal',
            meta: {
              title: '主题词部门设置详情',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/keyword/keyworddeal.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/keyword/keywordeditor',
            name: 'keywordeditor',
            meta: {
              title: '主题词部门设置编辑',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/keyword/keywordeditor.vue'], resolve)
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
            path: '/setting/sysConfig/payfiflter/deal',
            name: 'payfiflterDeal',
            meta: {
              title: '落款部门过滤设置详情',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/payfiflter/payfiflterdeal.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/payfiflter/editor',
            name: 'payfiflterEditor',
            meta: {
              title: '落款部门过滤设置编辑',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/payfiflter/payfifltereditor.vue'], resolve)
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
            children: [

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
                path: '/bianhan/workingHoursDetail',
                name: 'workingHoursDetail',
                meta: {
                  title: '工作时长详情',
                  keepAlive: true,
                  needLogin: false
                },
                component: resolve => require(['views/bianhan/workingHoursDetail.vue'], resolve)
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
            {
              path: '/bianhan/asas',
              name: 'asas',
              meta: {
                title: '定密依据配置详情',
                keepAlive: true,
                needLogin: false
              },
              component: resolve => require(['views//bianhan/asas.vue'], resolve)
            }
              // {
              //   path: '/setting/asetSecretBase/setSecretBaseDetail',
              //   name: 'setSecretBaseDetail',
              //   meta: {
              //     title: '定密依据配置详情',
              //     keepAlive: true,
              //     needLogin: false
              //   },
              //   component: resolve => require(['views/setting/asetSecretBase/setSecretBaseDetail.vue'], resolve)
              // }

              // {
              // path: '/setting/workingHours',
              // name: 'workingHours',
              // meta: {
              //   title: '工作时长配置',
              //   keepAlive: true,
              //   needLogin: false
              // },
              // component: resolve => require(['views/setting/workingHours/index.vue'], resolve)
              // },
              // {
              //   path: '/setting/workingHours/configDetail/configDetail',
              //   name: 'configDetail',
              //   meta: {
              //     title: '工作时长详情',
              //     keepAlive: true,
              //     needLogin: false
              //   },
              //   component: resolve => require(['views/setting/workingHours/configDetail/configDetail.vue'], resolve)
              //   },
            // {
            //   path: '/setting/setSecretBase',
            //   name: 'setSecretBase',
            //   meta: {
            //     title: '定密依据配置',
            //     keepAlive: true,
            //     needLogin: false
            //   },
            //   component: resolve => require(['views/setting/setSecretBase/index.vue'], resolve)
            // },
            // {
            //   path: '/setting/setSecretBase/setSecretBaseDetail',
            //   name: 'setSecretBaseDetail',
            //   meta: {
            //     title: '定密依据配置详情',
            //     keepAlive: true,
            //     needLogin: false
            //   },
            //   component: resolve => require(['views/setting/setSecretBase/setSecretBaseDetail.vue'], resolve)
            // }

          ]
          },
          {
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
            path: '/setting/sysConfig/otherconfig/holiday/deal',
            name: 'holidayDeal',
            meta: {
              title: '节假日配置详情',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/otherconfig/holiday/holidaydeal.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/otherconfig/holiday/editor',
            name: 'holidayEditor',
            meta: {
              title: '节假日配置编辑',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/otherconfig/holiday/holidayeditor.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/otherconfig/categoryView',
            name: 'categoryView',
            meta: {
              title: '视图分类配置',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/otherconfig/categoryView.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/otherconfig/dataWarning',
            name: 'dataWarning',
            meta: {
              title: '数据库空间预警',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/otherconfig/dataWarning.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/otherconfig/overduePer',
            name: 'overduePer',
            meta: {
              title: '超期待办个人提醒',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/otherconfig/overduePer.vue'], resolve)
          },
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
          {
            path: '/setting/sysConfig/otherconfig/thingsOrderDetail',
            name: 'thingsOrderDetail',
            meta: {
              title: '待办事宜排序',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/otherconfig/thingsOrderDetail.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/otherconfig/interSys',
            name: 'interSys',
            meta: {
              title: '接口系统配置',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/otherconfig/interSys.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/otherconfig/textNum',
            name: 'textNum',
            meta: {
              title: '正文字数超限原因配置单',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/otherconfig/textNum/index.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/otherconfig/editTextNum',
            name: 'editTextNum',
            meta: {
              title: '编辑正文字数超限原因配置单',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/otherconfig/textNum/editTextNum.vue'], resolve)
          },
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
          {
            path: '/setting/sysConfig/otherconfig/opinionChar',
            name: 'opinionChar',
            meta: {
              title: '意见中不能包含的特殊字符',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/otherconfig/opinionChar.vue'], resolve)
          },
          {
            path: '/XNKBrcpz',
            name: 'XNKBrcpz',
            meta: {
              title: '热词配置',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/common/components/XNKBsetting.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/otherconfig/userLogMigration',
            name: 'userLogMigration',
            meta: {
              title: '用户注销和数据迁移配置',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/otherconfig/userLogMigration.vue'], resolve)
          },
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
      {
        path: '/setting/designDictionary',
        name: 'designDictionary',
        meta: {
          title: '设计词典',
          keepAlive: true,
          needLogin: false
        },
        redirect: '/setting/designDictionary/businessClassify',
        component: resolve => require(['views/setting/layout/empty.vue'], resolve),
        children: [{
            path: '/setting/sysConfig/dictionaryPre',
            name: 'dictionaryTable',
            meta: {
              title: '字典维护列表',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/dictionary/index.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/dictionaryPre/dictionary',
            name: 'dictionaryPre',
            meta: {
              title: '字典维护',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/dictionary/dictionary.vue'], resolve)
          },
          {
            path: '/setting/sysConfig/dictionaryPre/dataPre',
            name: 'dictionaryDataPre',
            meta: {
              title: '数据维护',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/sysConfig/dictionary/dataPre.vue'], resolve)
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
          {
            path: '/setting/designDictionary/businessClassify/businessClassifySet',
            name: 'businessClassifySet',
            meta: {
              title: '业务分类设置',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/designDictionary/businessClassify/businessClassifySet.vue'], resolve)
          },
          {
            path: '/setting/designDictionary/businessClassify/designElementGroup',
            name: 'designElementGroup',
            meta: {
              title: '设计元素集合',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/designDictionary/businessClassify/designElementGroup.vue'], resolve)
          },
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
          {
            path: '/setting/designDictionary/designElement/designElementSetting',
            name: 'designElementSetting',
            meta: {
              title: '设计元素集合设置',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/designDictionary/designElement/designElementAdd.vue'], resolve)
          },
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
          {
            path: '/setting/designDictionary/moduleConfig/moduleConfigAdd',
            name: 'moduleConfigAdd',
            meta: {
              title: "模块配置添加",
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/designDictionary/moduleConfig/moduleConfigAdd.vue'], resolve),

          },

          {
            path: '/setting/designDictionary/operateConfig',
            name: 'operateConfig',
            meta: {
              title: "操作配置",
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/designDictionary/operateConfig.vue'], resolve),

          },
          {
            path: '/setting/designDictionary/operateConfigDetail',
            name: 'operateConfigDetail',
            meta: {
              title: "操作配置详情",
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/designDictionary/operateConfigDetail.vue'], resolve),

          },

          {
            path: '/setting/designDictionary/functionConfig',
            name: 'functionConfig',
            meta: {
              title: "功能配置",
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/designDictionary/functionConfig.vue'], resolve),

          },
          {
            path: '/setting/designDictionary/functionConfigDetail',
            name: 'functionConfigDetail',
            meta: {
              title: "功能配置详情",
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/designDictionary/functionConfigDetail.vue'], resolve),

          },



        ]

      },
      {
        path: '/setting/dataListStatistics',
        name: 'dataListStatistics',
        redirect: '/setting/dataListStatistics/dispatchFileStatistics',
        meta: {
          title: '效能看板数据统计明细',
          keepAlive: true,
          needLogin: false
        },
        component: resolve => require(['views/setting/layout/empty.vue'], resolve),
        children: [
          {
            path: '/setting/dataListStatistics/dispatchFileStatistics',
            name: 'dispatchFileStatistics',
            meta: {
              title: '发文明细',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/dataListStatistics/dispatchFileStatistics.vue'], resolve)
          },
          {
            path: '/setting/dataListStatistics/countersignatureStatistics',
            name: 'countersignatureStatistics',
            meta: {
              title: '发文签报明细',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/dataListStatistics/countersignatureStatistics.vue'], resolve)
          },
          {
            path: '/setting/dataListStatistics/dispatchFileBackStatistics',
            name: 'dispatchFileBackStatistics',
            meta: {
              title: '发文退回明细',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/dataListStatistics/dispatchFileBackStatistics.vue'], resolve)
          },
          {
            path: '/setting/dataListStatistics/rexamineStatistics',
            name: 'rexamineStatistics',
            meta: {
              title: '发文重发明细',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/dataListStatistics/rexamineStatistics.vue'], resolve)
          },
          {
            path: '/setting/dataListStatistics/receiveCBStatistics',
            name: 'receiveCBStatistics',
            meta: {
              title: '请示类收文承办明细',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/dataListStatistics/receiveCBStatistics.vue'], resolve)
          },
          {
            path: '/setting/dataListStatistics/receiveXBStatistics',
            name: 'receiveXBStatistics',
            meta: {
              title: '请示类收文协办明细',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/dataListStatistics/receiveXBStatistics.vue'], resolve)
          }
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
          {
            path: '/setting/logs/reviewLogs',
            name: 'reviewLogs',
            meta: {
              title: '用户回顾',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/logs/reviewLogs.vue'], resolve)
          },
          {
            path: '/setting/logs/settingSafeLogs',
            name: 'settingSafeLogs',
            meta: {
              title: '日志安全设置',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/logs/settingSafeLogs.vue'], resolve)
          },
          {
            path: '/setting/logs/userLogOff',
            name: 'userLogOff',
            meta: {
              title: '注销用户日志',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/logs/userLogOff.vue'], resolve)
          },
          {
            path: '/setting/logs/dataMigration',
            name: 'dataMigration',
            meta: {
              title: '数据迁移日志',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/logs/dataMigration.vue'], resolve)
          },
          {
            path: '/setting/logs/userLogDetail',
            name: 'userLogDetail',
            meta: {
              title: '注销用户日志',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/logs/userLogDetail.vue'], resolve)
          },
          {
            path: '/setting/logs/migrationDetail',
            name: 'migrationDetail',
            meta: {
              title: '数据迁移日志',
              keepAlive: true,
              needLogin: false
            },
            component: resolve => require(['views/setting/logs/migrationDetail.vue'], resolve)
          },
        ]
      }
    ]
  }

]

export default routers
