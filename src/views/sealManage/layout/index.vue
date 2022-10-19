<!--
 * @Author: wy
 * @Date: 2020-07-31 16:48:16
 * @LastEditTime: 2020-08-14 16:55:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\sealManage\layout\index.vue
-->
<template>
<!--  <layout :menuList="menuList" :router="true"></layout>-->
  <nav-article>
    <router-view></router-view>
  </nav-article>
</template>

<script type="text/ecmascript-6">
    // import layout from 'components/layout/index'

    export default {
        name: "index",
        components: {
            // layout
        },
        data() {
            return {
                menuList: [
                    {
                        title: "用印管理",
                        index: "/sealManage/useSeal",
                        children: [
                            {
                                title: "起草用印审批",
                                index: "/sealManage/useSeal/draft"
                            }
                        ],
                    },
                    {
                        title: "印章刻制",
                        index: "/sealManage/markMgr",
                        children: [
                            {
                                title: "起草印章刻制审批单",
                                index: "/sealManage/markMgr/markDraft"
                            }
                        ],
                    },
                    {
                        title: "参数维护",
                        index: "/sealManage/argumentPre",
                        children: [
                            {
                                title: '印章配置维护',
                                index: '/sealManage/argumentPre/sealConfig'
                            },
                            {
                                title: '退回原因配置',
                                index: '/sealManage/argumentPre/backReason'
                            },
                            {
                                title: '用印管理配置模板',
                                index: '/sealManage/argumentPre/sealTemplate',
                                children: [
                                    {
                                        title: '介绍信红头模板',
                                        index: '/sealManage/argumentPre/letterTemplate'
                                    },
                                    {
                                        title: '介绍信正文模板',
                                        index: '/sealManage/argumentPre/textTemplate'
                                    }
                                ]
                            },
                            {
                                title: '流水号维护',
                                index: '/sealManage/argumentPre/streamPre'
                            }
                        ]
                    },
                    {
                        title: "用印机制设备管理",
                        index: "/sealManage/facilityManage",
                        children: [
                            {
                                title: '用印机设驱动检测',
                                index: '/sealManage/facilityManage/connectDetect'
                            },
                            {
                                title: '用印机设备登记',
                                index: '/sealManage/facilityManage/selectDepart'
                            },
                        ]
                    },
                    // {
                    //     title: "管理员查看",
                    //     index: "/sealManage/adminLook",
                    //     children: [
                    //         {
                    //             title: '用印机设备查看',
                    //             index: '/sealManage/adminLook/equipmentLook'
                    //         }
                    //     ]
                    // },
                ]
            }
        },
    }
</script>
