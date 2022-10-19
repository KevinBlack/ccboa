<!--
 * @Author: wy
 * @Date: 2020-06-28 17:17:21
 * @LastEditTime: 2020-07-24 16:04:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\layout\index.vue
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
        name: 'index',
        components: {
            // layout
        },
        data() {
            return {
                menuList: [
                    {
                        title: '个人办公',
                        index: '/dashboard/personalOffice',
                        children: [
                            {
                                title: '日常工作',
                                index: '/dashboard/personalOffice/dailyWork',
                                children: [
                                    {
                                        title: '转授权',
                                        index: '/dashboard/personalOffice/dailyWork/sublicense'
                                    },
                                    {
                                        title: '我的收藏',
                                        index: '/dashboard/personalOffice/dailyWork/collection'
                                    },
                                    {
                                        title: '工作交流',
                                        index: '/dashboard/personalOffice/dailyWork/workCommunicate'
                                    },
                                    {
                                        title: '工作日志',
                                        index: '/dashboard/personalOffice/dailyWork/workLog'
                                    },
                                    {
                                        title: '日程安排',
                                        index: '/dashboard/personalOffice/dailyWork/schedule'
                                    },
                                    {
                                        title: '个人通讯录',
                                        index: '/dashboard/personalOffice/dailyWork/addressBook'
                                    },
                                    {
                                        title: '新增申请',
                                        index: '/dashboard/personalOffice/dailyWork/newApply'
                                    },
                                    {
                                        title: '档案管理',
                                        index: '/dashboard/personalOffice/fileManagement',
                                        children: [
                                            {
                                                title: '简单查询',
                                                index: '/dashboard/personalOffice/fileManagement',
                                            },
                                            {
                                                title: '组合查询',
                                                index: '/dashboard/personalOffice/fileManagement/comQuery',
                                            },
                                            {
                                                title: '文件分类显示',
                                                index: '/dashboard/personalOffice/fileManagement/fileClass',
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                title: '信息发布',
                                index: '/dashboard/personalOffice/publishInfo',
                                children: [
                                    {
                                        title: '本行信息',
                                        index: '/dashboard/personalOffice/publishInfo/selfBankInfo',
                                    }
                                ]
                            },
                            {
                                title: '系统设置',
                                index: '/dashboard/personalOffice/sysConfig',
                                children: [
                                    {
                                        title: '收藏设置',
                                        index: '/dashboard/personalOffice/sysConfig/index',
                                    },
                                    {
                                        title: '提醒设置',
                                        index: '/dashboard/personalOffice/sysConfig/remind',
                                    },
                                    {
                                        title: '常用发送对象',
                                        index: '/dashboard/personalOffice/sysConfig/useObject',
                                        children: [
                                            {
                                                title: '新增',
                                                index: '/dashboard/personalOffice/sysConfig/vierPer',
                                            },
                                            {
                                                title: '查看个人',
                                                index: '/dashboard/personalOffice/sysConfig/vierPerList',
                                            },
                                            {
                                                title: '新建本行群组',
                                                index: '/dashboard/personalOffice/sysConfig/createGroup',
                                            },
                                            {
                                                title: '选择他行群组',
                                                index: '/dashboard/personalOffice/sysConfig/otherGroup',
                                            },
                                            {
                                                title: '新建本部群组',
                                                index: '/dashboard/personalOffice/sysConfig/headquarter',
                                            },
                                            {
                                                title: '查看群组',
                                                index: '/dashboard/personalOffice/sysConfig/viewGroup',
                                            },
                                        ]
                                    },
                                    {
                                        title: '个人常用批语',
                                        index: '/dashboard/personalOffice/sysConfig/comWords',
                                        children: [
                                            {
                                                title: '新建',
                                                index: '/dashboard/personalOffice/sysConfig/comWords',
                                            },
                                            {
                                                title: '查看',
                                                index: '/dashboard/personalOffice/sysConfig/viewWords',
                                            },
                                        ]
                                    },
                                    {
                                        title: '链接设置',
                                        index: '/dashboard/personalOffice/sysConfig/createLink',
                                        children: [
                                            {
                                                title: '新建',
                                                index: '/dashboard/personalOffice/sysConfig/createLink',
                                            },
                                            {
                                                title: '查看个人链接',
                                                index: '/dashboard/personalOffice/sysConfig/viewPerLink',
                                            },
                                            {
                                                title: '查看公共链接',
                                                index: '/dashboard/personalOffice/sysConfig/viewPublicLink',
                                            },
                                        ]
                                    },
                                    {
                                        title: '修改个人信息',
                                        index: '/dashboard/personalOffice/sysConfig/alterPer',
                                    },
                                    {
                                        title: '修改密码',
                                        index: '/dashboard/personalOffice/sysConfig/alterPwd',
                                    }
                                ]
                            },
                            {
                                title: '管理员设置',
                                index: '/dashboard/personalOffice/admin',
                                children: [
                                    {
                                        title: '专栏设置',
                                        index: '/dashboard/personalOffice/admin/createColumn',
                                        children: [
                                            {
                                                title: '新建专栏',
                                                index: '/dashboard/personalOffice/admin/createColumn',
                                            },
                                            {
                                                title: '',
                                                index: '/dashboard/personalOffice/admin/viewColumn',
                                            },
                                            {
                                                title: '栏目设置',
                                                index: '/dashboard/personalOffice/admin/columnConfig',
                                            },
                                            {
                                                title: '查看栏目设置',
                                                index: '/dashboard/personalOffice/admin/viewColumnConfig',
                                            },
                                            {
                                                title: '查询',
                                                index: '/dashboard/personalOffice/admin/searchData',
                                            },
                                        ]
                                    },
                                    {
                                        title: '弹出窗口设置',
                                        index: '/dashboard/personalOffice/admin/alterWin',
                                    },
                                    {
                                        title: '手工发送短信',
                                        index: '/dashboard/personalOffice/admin/sendPhone',
                                    },
                                    {
                                        title: '同步转授权至商密OA',
                                        index: '/dashboard/personalOffice/admin/initWarrant',
                                    }
                                ]
                            },

                        ]
                    },
                ]
            }
        }
    }

</script>
