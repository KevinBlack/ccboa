/*
 * @Author: wy
 * @Date: 2020-07-31 16:23:50
 * @LastEditTime: 2021-12-17 14:24:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\router\sealManage.js
 */
const routers = [{
    path: '/sealManage/facilityManage/approval',
    name: 'approval',
    meta: {
      title: "用印机设备维护审批详情",
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/approval.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/common/photo',
    name: 'commonphoto',
    meta: {
      title: '印章盖章图片',
      needLogin: false
    },
    component: resolve => require(['views/sealDrafttt/components/photo.vue'], resolve),
  },
  {
    path: '/sealManage/facilityManage/approval/await',
    name: 'approvalAwait',
    meta: {
      title: "用印机设备维护审批待办详情",
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/approvalAwait.vue'], resolve),
  },
  {
    path: '/sealManage/facilityManage/approval/approvalPrint',
    name: 'approvalPrint',
    meta: {
      title: "用印机设备维护审批详情打印单",
      needLogin: false,
    },
    component: resolve => require(['views/bianhan/approvalPrint.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/useSealForm',
    name: 'useSealForm',
    meta: {
      title: "用印审批单",
      needLogin: false,
    },
    component: resolve => require(['views/sealDrafttt/components/useSealForm.vue'], resolve),
  },
  {
    path: '/sealManage',
    redirect: '/sealManage/useSeal',
    name: 'sealManage',
    meta: {
      title: '印章管理'
    },
    component: resolve => require(['views/sealManage/layout/index.vue'], resolve),
    children: [{
        path: '/sealManage/useSeal',
        redirect: '/sealManage/useSeal/draft/common/list',
        name: 'useSeal',
        meta: {
          title: "用印管理",
          needLogin: false,
        },
        component: resolve => require(['views/commoncg/index.vue'], resolve),

      },
      {
        path: '/sealManage/useSeal/draft/common/list',
        name: 'commonlist',
        meta: {
          title: '印章管理',
          needLogin: false
        },
        component: resolve => require(['views/commoncg/index.vue'], resolve),
      },

      {
        path: '/sealManage/useSeal/draft/common/DeptList',
        name: 'deptList',
        meta: {
          title: '起草部门用印审批列表',
          needLogin: false
        },
        component: resolve => require(['views/commoncg/DeptList.vue'], resolve),
      },
      {
        path: '/sealManage/useSeal/draft/common/Letterintroduction',
        name: 'Letterintroduction',
        meta: {
          title: '起草介绍信用印审批列表',
          needLogin: false
        },
        component: resolve => require(['views/commoncg/Letterintroduction.vue'], resolve),
      },
      {
        path: '/sealManage/useSeal/draft/common/document',
        name: 'document',
        meta: {
          title: '起草公文用印审批列表',
          needLogin: false
        },
        component: resolve => require(['views/commoncg/document.vue'], resolve),
      },
      {
        path: '/sealManage/useSeal/draft/common/sealRegister',
        name: 'sealRegister',
        meta: {
          title: '印章登记',
          needLogin: false
        },
        component: resolve => require(['views/commoncg/sealRegister.vue'], resolve),
      },
      {
        path: '/sealManage/useSeal/draft/common/sealKeeperChangeList',
        name: 'sealKeeperChangeList',
        meta: {
          title: '印章保管交接列表',
          needLogin: false
        },
        component: resolve => require(['views/commoncg/sealKeeperChangeList.vue'], resolve),
      },

      // 印章刻制
      {
        path: '/sealManage/markMgr',
        name: 'markMgr',
        redirect: '/sealManage/markMgr/index',
        meta: {
          title: "印章刻制",
          needLogin: false,
        },
        // 异步组件。这个特殊的require语法告诉webpack自动将编译后的代码分割成不同的块，这些块将通过 Ajax 请求自动下载
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
          path: '/sealManage/markMgr/index',
          name: 'markDraftIndex',
          meta: {
            title: '印章刻制首页',
            needLogin: true,
          },
          component: resolve => require(['views/bianhan/markMgr/index.vue'], resolve),
        }]
      },
      // 印章废止
      {
        path: '/sealManage/sealAbolished',
        name: 'sealAbolished',
        redirect: '/sealManage/sealAbolished/index',
        meta: {
          title: "印章废止",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
          path: '/sealManage/sealAbolished/index',
          name: 'sealAbolishedIndex',
          meta: {
            title: '印章废止首页',
            needLogin: true,
          },
          component: resolve => require(['views/sealManage/sealAbolished/index.vue'], resolve),
        }]
      },
      // 印章销毁
      {
        path: '/sealManage/sealDestroy',
        name: 'sealDestroy',
        redirect: '/sealManage/sealDestroy/index',
        meta: {
          title: '印章销毁',
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
          path: '/sealManage/sealDestroy/index',
          name: 'sealDestroyIndex',
          meta: {
            title: "印章销毁首页",
            needLogin: false,
          },
          component: resolve => require(['views/sealManage/sealDestroy/index.vue'], resolve),
        }]
      },
      // 印章保管人登记
      {
        path: '/sealManage/keeperRegister',
        name: 'keeperRegister',
        redirect: '/sealManage/keeperRegister/index',
        meta: {
          title: '印章保管人登记',
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/sealManage/keeperRegister/index',
            name: 'keeperRegisterIndex',
            meta: {
              title: "印章保管人登记首页",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/keeperRegister/index.vue'], resolve),
          },
          {
            path: '/sealManage/keeperRegister/keeperRegisterForm',
            name: 'keeperRegisterForm',
            meta: {
              title: "印章保管人登记单",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/keeperRegister/registerForm.vue'], resolve),
          }
        ]
      },
      // 印章登记
      {
        path: '/sealManage/sealRegister',
        name: 'sealRegister',
        redirect: '/sealManage/sealRegister/index',
        meta: {
          title: '印章登记',
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
          path: '/sealManage/sealRegister/index',
          name: 'sealRegisterIndex',
          meta: {
            title: "印章登记首页",
            needLogin: false,
          },
          component: resolve => require(['views/sealManage/sealRegister/index.vue'], resolve),
        }]
      },
      // 印章保管交接
      {
        path: '/sealManage/sealKeeperChange',
        name: 'sealKeeperChange',
        redirect: '/sealManage/sealKeeperChange/index',
        meta: {
          title: '印章保管交接',
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
          path: '/sealManage/sealKeeperChange/index',
          name: 'sealKeeperChangeIndex',
          meta: {
            title: "印章保管交接首页",
            needLogin: false,
          },
          component: resolve => require(['views/sealManage/sealKeeperChange/index.vue'], resolve),
        }]
      },
      {
        path: '/sealManage/argumentPre',
        redirect: '/sealManage/argumentPre/streamPre',
        name: 'argumentPre',
        meta: {
          title: "参数维护",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/sealManage/argumentPre/streamPre',
            name: 'streamPre',
            meta: {
              title: "流水号维护",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/argumentPre/streamPre'], resolve)
          },
          {
            path: '/sealManage/argumentPre/groove',
            name: 'groove',
            meta: {
              title: "流水号配置",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/argumentPre/groove'], resolve)
          },
          {
            path: '/sealManage/argumentPre/userConfigTable',
            name: 'userConfigTable',
            meta: {
              title: "用印管理常用配置项",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/argumentPre/userConTable'], resolve)
          },
          {
            path: '/sealManage/argumentPre/collocateTemplateTable',
            name: 'userConfigTable',
            meta: {
              title: "用印管理配置模板",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/argumentPre/collocateTemplateTable'], resolve)
          },
          {
            path: '/sealManage/argumentPre/userConfig',
            name: 'userConfig',
            meta: {
              title: "用印管理常用配置详情",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/argumentPre/userConfig'], resolve)
          },
          {
            path: '/sealManage/argumentPre/collocateTemplate',
            name: 'userConfigTable',
            meta: {
              title: "用印管理配置模板详情",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/argumentPre/collocateTemplate'], resolve)
          },

          // {
          //   path: '/sealManage/commonEquipment/list',
          //   name: 'list',
          //   meta: {
          //     title: "用印管理常用配置项",
          //     needLogin: false,
          //   },
          //   component: resolve => require(['views/sealManage/commonEquipment/list.vue'], resolve)
          // },
          // {
          //   path: '/sealManage/commonEquipment/systemConfiguration',
          //   name: 'systemConfiguration',
          //   meta: {
          //     title: "印章系统配置",
          //     needLogin: false,
          //   },
          //   component: resolve => require(['views/sealManage/commonEquipment/systemConfiguration.vue'], resolve)
          // },
        ]
      },
      {
        path: '/sealManage/facilityManage',
        name: 'facilityManage',
        redirect: '/sealManage/usePrintingMachineEquipment',
        meta: {
          title: "用印机制设备管理",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/sealManage/usePrintingMachineEquipment',
            name: 'connectDetect',
            meta: {
              title: "用印机制设备",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/usePrintingMachineEquipment/bankList.vue'], resolve),
          }, {
            path: '/sealManage/facilityManage/connectDetect',
            name: 'connectDetect',
            meta: {
              title: "用印记设驱动检测",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/facilityManage/connectDetect.vue'], resolve),
          },
          {
            path: '/sealManage/facilityManage/facilityList',
            name: 'facilityList',
            meta: {
              title: "用印机设备登记",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/facilityManage/facilityList.vue'], resolve),
          },
          {
            path: '/sealManage/facilityManage/facilityListDetail',
            name: 'facilityListDetail',
            meta: {
              title: "用印机设备登记详情",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/facilityManage/facilityListDetail.vue'], resolve),
          },
          {
            path: '/sealManage/facilityManage/register',
            name: 'facilityList',
            meta: {
              title: "用印机设备登记详情",
              needLogin: false,
            },
            component: resolve => require(['views/sealFacilityManage/register.vue'], resolve),
          },
          {
            path: '/sealManage/facilityManage/equipmentMaintenanceList',
            name: 'equipmentMaintenanceList',
            meta: {
              title: "用印机设备维护审批",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/facilityManage/equipmentMaintenanceList.vue'], resolve),
          },

          // {
          //   path: '/sealManage/facilityManage/statistical',
          //   name: 'statistical',
          //   meta: {
          //     title: "统计",
          //     needLogin: false,
          //   },
          //   component: resolve => require(['views/sealManage/facilityManage/statistical.vue'], resolve),
          //   children: [{
          //     path: '/sealManage/statistical/normalStatistical',
          //     name: 'normalStatistical',
          //     meta: {
          //       title: "常规用印审批",
          //       needLogin: false,
          //     },
          //     component: resolve => require(['views/sealManage/statistical/normalStatistical.vue'], resolve),
          //     children: [{
          //       path: '/sealManage/statistical/normalStatistical',
          //       name: 'normalStatistical',
          //       meta: {
          //         title: "按用印部门统计",
          //         needLogin: false,
          //       },
          //       component: resolve => require(['views/sealManage/statistical/normalStatistical.vue'], resolve),

          //     }, {
          //       path: '/sealManage/statistical/normalStatistical',
          //       name: 'normalStatistical',
          //       meta: {
          //         title: "按印章类别统计",
          //         needLogin: false,
          //       },
          //       component: resolve => require(['views/sealManage/statistical/normalStatistical.vue'], resolve),

          //     }, {
          //       path: '/sealManage/statistical/normalStatistical',
          //       name: 'normalStatistical',
          //       meta: {
          //         title: "按用印性质统计",
          //         needLogin: false,
          //       },
          //       component: resolve => require(['views/sealManage/statistical/normalStatistical.vue'], resolve),

          //     }, {
          //       path: '/sealManage/statistical/normalStatistical',
          //       name: 'normalStatistical',
          //       meta: {
          //         title: "按发往单位类型统计",
          //         needLogin: false,
          //       },
          //       component: resolve => require(['views/sealManage/statistical/normalStatistical.vue'], resolve),

          //     },]
          //   }, {
          //     path: '/sealManage/statistical/introductionStatistical',
          //     name: 'introductionStatistical',
          //     meta: {
          //       title: "介绍信审批",
          //       needLogin: false,
          //     },
          //     component: resolve => require(['views/sealManage/statistical/introductionStatistical.vue'], resolve),
          //     children: [{
          //       path: '/sealManage/statistical/introductionStatistical',
          //       name: 'introductionStatistical',
          //       meta: {
          //         title: "按申请部门统计",
          //         needLogin: false,
          //       },
          //       component: resolve => require(['views/sealManage/statistical/introductionStatistical.vue'], resolve),

          //     }, {
          //       path: '/sealManage/statistical/introductionStatistical',
          //       name: 'introductionStatistical',
          //       meta: {
          //         title: "按部门/联系单位类型统计",
          //         needLogin: false,
          //       },
          //       component: resolve => require(['views/sealManage/statistical/introductionStatistical.vue'], resolve),

          //     },]
          //   }, {
          //     path: '/sealManage/admin/document',
          //     name: 'document',
          //     meta: {
          //       title: "印章登记",
          //       needLogin: false,
          //     },
          //     component: resolve => require(['views/commoncg/admin/document.vue'], resolve),
          //     children: [{
          //       path: '/sealManage/admin/document',
          //       name: 'document',
          //       meta: {
          //         title: "按印章状态统计",
          //         needLogin: false,
          //       },
          //       component: resolve => require(['views/commoncg/admin/document.vue'], resolve),

          //     }, {
          //       path: '/sealManage/admin/document',
          //       name: 'document',
          //       meta: {
          //         title: "按印章保管方式统计",
          //         needLogin: false,
          //       },
          //       component: resolve => require(['views/commoncg/admin/document.vue'], resolve),

          //     },]
          //   }, {
          //     path: '/sealManage/admin/document',
          //     name: 'document',
          //     meta: {
          //       title: "按印章类别统计",
          //       needLogin: false,
          //     },
          //     component: resolve => require(['views/commoncg/admin/document.vue'], resolve),

          //   },]
          // },
        ]
      },
      {
        path: '/sealManage/searchSeal',
        name: 'sealMnagesearchSeal',
        redirect: '/sealManage/searchSeal/searchCommon',
        meta: {
          title: "查询",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/sealManage/searchSeal/searchCommon',
            name: 'sealMnagesearchSealsearchCommon',
            meta: {
              title: "常规用印查询",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/searchSeal/searchCommon.vue'], resolve),
          },
          {
            path: '/sealManage/searchSeal/searchDepart',
            name: 'sealMnagesearchSealsearchDepart',
            meta: {
              title: "部门用印查询",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/searchSeal/searchDepart.vue'], resolve),
          },
          {
            path: '/sealManage/searchSeal/searchIntro',
            name: 'sealMnagesearchSealsearchIntro',
            meta: {
              title: "介绍信用印查询",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/searchSeal/searchIntro.vue'], resolve),
          },
          {
            path: '/sealManage/searchSeal/searchDocument',
            name: 'sealMnagesearchSealsearchDocument',
            meta: {
              title: "公文用印查询",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/searchSeal/searchDocument.vue'], resolve),
          },
          {
            path: '/sealManage/searchSeal/searchKeeper',
            name: 'searchKeeper',
            meta: {
              title: "印章保管人员查询",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/searchSeal/searchKeeper.vue'], resolve),
          },
          {
            path: '/sealManage/searchSeal/searchRegister',
            name: 'searchRegister',
            meta: {
              title: "印章登记查询",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/searchSeal/searchRegister.vue'], resolve),
          },
          {
            path: '/sealManage/searchSeal/searchChange',
            name: 'searchChange',
            meta: {
              title: "印章保管交接查询",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/searchSeal/searchChange.vue'], resolve),
          },
          {
            path: '/sealManage/searchSeal/searchFacility',
            name: 'searchFacility',
            meta: {
              title: "用印机设备查询",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/searchSeal/searchFacility.vue'], resolve),
          },
          {
            path: '/sealManage/searchSeal/searchApply',
            name: 'searchApply',
            meta: {
              title: "用印机设备维护审批查询",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/searchSeal/searchApply.vue'], resolve),
          },
        ]
      },
      {
        path: '/sealManage/statistical',
        name: 'statistical',
        redirect: '/sealManage/statistical/commonOrg',
        meta: {
          title: "统计",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
          path: '/sealManage/statistical/commonOrg',
          name: 'statisticalcommonOrg',
          redirect: '/sealManage/statistical/commonOrg',
          meta: {
            title: "常规用印审批",
            needLogin: false,
          },
          component: resolve => require(['components/layout/empty.vue'], resolve),
          children: [{
            path: '/sealManage/statistical/commonOrg',
            name: 'commonOrg',
            meta: {
              title: "按用印部门统计",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/statisticalForm/commonOrg.vue'], resolve),

          }, {
            path: '/sealManage/statistical/commonType',
            name: 'commonType',
            meta: {
              title: "按印章类别统计",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/statisticalForm/commonType.vue'], resolve),

          }, {
            path: '/sealManage/statistical/commonYyxz',
            name: 'commonYyxz',
            meta: {
              title: "按用印性质统计",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/statisticalForm/commonYyxz.vue'], resolve),

          }, {
            path: '/sealManage/statistical/commonDepart',
            name: 'commonDepart',
            meta: {
              title: "按发往单位类型统计",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/statisticalForm/commonDepart.vue'], resolve),

          }, ]
        }, {
          path: '/sealManage/statistical/introductionStatistical',
          name: 'commonIntroduction',
          redirect: '/sealManage/statistical/introductionStatistical',
          meta: {
            title: "介绍信审批",
            needLogin: false,
          },
          component: resolve => require(['components/layout/empty.vue'], resolve),
          children: [{
            path: '/sealManage/statistical/introductionStatistical',
            name: 'commonIntroduction',
            meta: {
              title: "按申请部门统计",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/statisticalForm/commonIntroduction.vue'], resolve),

          }, {
            path: '/sealManage/statistical/introductionDepart',
            name: 'introductionDepart',
            meta: {
              title: "按部门/联系单位类型统计",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/statisticalForm/introductionDepart.vue'], resolve),

          }, ]
        }, {
          path: '/sealManage/statistical/documentStatistical',
          name: 'documentStatistical',
          redirect: '/sealManage/statistical/documentStatistical',
          meta: {
            title: "印章登记",
            needLogin: false,
          },
          component: resolve => require(['components/layout/empty.vue'], resolve),
          children: [{
            path: '/sealManage/statistical/documentStatistical',
            name: 'documentStatistical',
            meta: {
              title: "按印章状态统计",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/statisticalForm/documentStatistical.vue'], resolve),

          }, {
            path: '/sealManage/statistical/keeperStatistical',
            name: 'keeperStatistical',
            meta: {
              title: "按印章保管方式统计",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/statisticalForm/keeperStatistical.vue'], resolve),

          }, ]
        }, {
          path: '/sealManage/statistical/commTypeStatistical',
          name: 'commTypeStatistical',
          meta: {
            title: "按印章类别统计",
            needLogin: false,
          },
          component: resolve => require(['views/commoncg/statisticalForm/commTypeStatistical.vue'], resolve),

        }, ]
      },
      {
        path: '/sealManage/admin',
        name: 'admin',
        redirect: '/sealManage/managementDetail/normalDetail',
        meta: {
          title: "管理员查看",
          needLogin: false,
        },
        component: resolve => require(['components/layout/empty.vue'], resolve),
        children: [{
            path: '/sealManage/managementDetail/normalDetail',
            name: 'normalDetail',
            meta: {
              title: "常规用印审批",
              needLogin: false,

            },
            component: resolve => require(['views/commoncg/administratorsLook/normalDetail.vue'], resolve),
          },
          {
            path: '/sealManage/managementDetail/documentDetail',
            name: 'sealManagemanagementDetaildocumentDetail',
            meta: {
              title: "公文用印登记",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/administratorsLook/documentDetail.vue'], resolve),
          },
          {
            path: '/sealManage/managementDetail/introductionDetail',
            name: 'introductionDetail',
            meta: {
              title: "介绍信审批",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/administratorsLook/introductionDetail.vue'], resolve),
          }, {
            path: '/sealManage/managementDetail/departmentDetail',
            name: 'departmentDetail',
            meta: {
              title: "部门用印审批",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/administratorsLook/departmentDetail.vue'], resolve),
          },
          {
            path: '/sealManage/managementDetail/yinzhangDj',
            name: 'yzdj',
            meta: {
              title: "印章登记",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/administratorsLook/yinzhangDj.vue'], resolve),
          },
          //等杨立鹏回来确认
          {
            path: '/sealManage/managementDetail/yinzhangBgj',
            name: 'yzbj',
            meta: {
              title: "用印保管交接",
              needLogin: false,
            },
            component: resolve => require(['views/commoncg/administratorsLook/yinzhangJj.vue'], resolve),
          },
          {
            path: '/sealManage/managementDetail/preserverDetail',
            name: 'preserverDetail',
            meta: {
              title: "印章保管人员登记",
              needLogin: false,
            },
            component: resolve => require(['views/sealManage/managementDetail/preserverDetail.vue'], resolve),
          }
        ]
      },


    ]
  },
  {
    path: '/LookCg',
    name: 'Cg',
    meta: {
      title: "管理员查看常规",
      needLogin: false,
    },
    component: resolve => require(['views/commoncg/LookDetail/changGui.vue'], resolve),
  },
  {
    path: '/LookGw',
    name: 'Gw',
    meta: {
      title: "管理员查看公文",
      needLogin: false,
    },
    component: resolve => require(['views/commoncg/LookDetail/gongWen.vue'], resolve),
  },
  {
    path: '/LookJsx',
    name: 'Jsx',
    meta: {
      title: "管理员查看介绍信",
      needLogin: false,
    },
    component: resolve => require(['views/commoncg/LookDetail/jieShao.vue'], resolve),
  },
  {
    path: '/LookBm',
    name: 'Bm',
    meta: {
      title: "管理员查看部门",
      needLogin: false,
    },
    component: resolve => require(['views/commoncg/LookDetail/buMen.vue'], resolve),
  },
  {
    path: '/LookDj',
    name: 'Dj',
    meta: {
      title: "印章登记",
      needLogin: false,
    },
    component: resolve => require(['views/commoncg/LookDetail/yzDj.vue'], resolve),
  },
  {
    path: '/LookBgjj',
    name: 'bgjj',
    meta: {
      title: "印章保管交接",
      needLogin: false,
    },
    component: resolve => require(['views/commoncg/LookDetail/yzBgjj.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/common/sealKeeperChangeForm',
    name: 'sealKeeperChangeForm',
    meta: {
      title: '印章保管交接详情',
      needLogin: false
    },
    component: resolve => require(['views/commoncg/sealKeeperChangeForm.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/common',
    name: 'common',
    meta: {
      title: '起草常规用印审批',
      needLogin: false
    },
    component: resolve => require(['views/commoncg/common.vue'], resolve),
  },
  {
    path: '/sealManage/admin/doneDocument',
    name: 'doneDocument',
    meta: {
      title: "公文用印登记详情",
      needLogin: false,
    },
    component: resolve => require(['views/commoncg/admin/doneDocument.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/common/yr',
    name: 'yinru',
    meta: {
      title: '引入',
    },
    component: resolve => require(['views/commoncg/yinru.vue'], resolve),
  },
  {
    path: '/sealManage/sealAbolished/printPreview',
    name: 'printPreview',
    meta: {
      title: '印章销毁废止处理单',
    },
    component: resolve => require(['views/sealManage/sealAbolished/printPreview'], resolve),
  },
  {
    path: '/sealManage/sealDestroy/printDesc',
    name: 'printDesc',
    meta: {
      title: '印章销毁打印处理单',
    },
    component: resolve => require(['views/sealManage/sealDestroy/printDesc.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/common/BG',
    name: 'BG',
    meta: {
      title: '保管人交接处理单',
    },
    component: resolve => require(['views/commoncg/bgjJdemo.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/common/dis',
    name: 'dis',
    meta: {
      title: '常规编辑',
    },
    component: resolve => require(['views/commoncg/commondis.vue'], resolve),
  },
  {
    path: '/sealManage/common/Fl',
    name: 'Fl',
    meta: {
      title: '法律性文件处理单',
    },
    component: resolve => require(['views/commoncg/Flxwj.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/document',
    name: 'document',
    meta: {
      title: '起草公文用印登记',
      needLogin: false
    },
    component: resolve => require(['views/sealDrafttt/document/document.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/doneDocument',
    name: 'doneDocument',
    meta: {
      title: '公文用印详情页',
    },
    component: resolve => require(['views/sealDrafttt/document/doneDocument.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/sealRegister',
    name: 'sealRegister',
    meta: {
      title: '印章登记起草',
      needLogin: false
    },
    component: resolve => require(['views/commoncg/sealRegisterForm.vue'], resolve),
  },
  // {
  //   path: '/sealManage/sealRegisterForm/sealRegisterForm',
  //   name: 'sealRegisterForm',
  //   meta: {
  //     title: '印章登记详情',
  //     needLogin: false
  //   },
  //   component: resolve => require(['views/commoncg/sealRegisterForm.vue'], resolve),
  // },
  {
    path: '/sealManage/useSeal/draft/introduction',
    name: 'introduction',
    meta: {
      title: '起草介绍信审批',
      needLogin: false
    },
    component: resolve => require(['views/sealDrafttt/introduction/introduction.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/doneIntroduction',
    name: 'doneIntroduction',
    meta: {
      title: '介绍信详情页',
    },
    component: resolve => require(['views/sealDrafttt/introduction/doneIntroduction.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/department',
    name: 'department',
    meta: {
      title: '起草部门用印审批',
      needLogin: false
    },
    component: resolve => require(['views/sealDrafttt/department/department.vue'], resolve),
  },
  {
    path: '/sealManage/useSeal/draft/doneDepartment',
    name: 'doneDepartment',
    meta: {
      title: '部门用印详情页',
    },
    component: resolve => require(['views/sealDrafttt/department/doneDepartment.vue'], resolve),
  },
  {
    path: '/sealManage/markMgr/drafting',
    name: 'drafting',
    meta: {
      title: '起草印章刻制审批单',
      needLogin: false
    },
    component: resolve => require(['views/bianhan/markMgr/drafting.vue'], resolve),
  },
  {
    path: '/sealManage/sealAbolished/abolishedDraft',
    name: 'abolishedDraft',
    meta: {
      title: '起草废止审批',
      needLogin: false,
    },
    component: resolve => require(['views/sealManage/sealAbolished/abolishedDraft.vue'], resolve),
  },
  {
    path: '/sealManage/sealAbolished/abolishedDraftDone',
    name: 'abolishedDraftDone',
    meta: {
      title: "印章废止办结详情",
      needLogin: false,
    },
    component: resolve => require(['views/sealManage/sealAbolished/abolishedDraftDone.vue'], resolve),
  },
  {
    path: '/sealManage/sealDestroy/sealDestroyDraft',
    name: 'sealDestroyDraft',
    meta: {
      title: "起草印章销毁",
      needLogin: false,
    },
    component: resolve => require(['views/sealManage/sealDestroy/sealDestroyDraft.vue'], resolve),
  },
  {
    path: '/sealManage/sealDestroy/sealDestroyDraftDone',
    name: 'sealDestroyDraftDone',
    meta: {
      title: "印章销毁办结详情",
      needLogin: false,
    },
    component: resolve => require(['views/sealManage/sealDestroy/sealDestroyDraftDone.vue'], resolve),
  },
  {
    path: '/sealManage/sealRegister/sealRegisterForm',
    name: 'sealRegisterForm',
    meta: {
      title: "印章登记单",
      needLogin: false,
    },
    component: resolve => require(['views/sealManage/sealRegister/sealRegister.vue'], resolve),
  },
  {
    path: '/sealManage/sealKeeperChange/sealKeeperChangeForm',
    name: 'sealKeeperChangeForm',
    meta: {
      title: "印章保管交接单",
      needLogin: false,
    },
    component: resolve => require(['views/sealManage/sealKeeperChange/sealKeeperChange.vue'], resolve),
  },
  {
    path: '/sealManage/admin/doneDocument',
    name: 'doneDocument',
    meta: {
      title: "公文用印登记详情",
      needLogin: false,
    },
    component: resolve => require(['views/commoncg/admin/doneDocument.vue'], resolve),
  },
]

export default routers;
