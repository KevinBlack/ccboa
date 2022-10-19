<!--
 * @Author: your name
 * @Date: 2020-06-28 17:17:21
 * @LastEditTime: 2020-08-07 16:57:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\layout\index.vue
-->
/**
* create by zx on 2020-6-23 10:50
* 类注释：
* 备注：
*/
<template>
  <nav-article>
    <router-view style="min-height:80vh"></router-view>
  </nav-article>
<!--  <layout :menuList="menuList" :router="true"></layout>-->
</template>

<script type="text/ecmascript-6">
    // import layout from "components/layout/index";

    export default {
        name: "index",
        components: {
            // layout,
        },
        data() {
            return {
                menuList: [
                    {
                        title: "组织机构",
                        index: "/setting/orgDepartment",
                        children: [
                            {
                                title: "机构索引管理",
                                index: "/setting/orgDepartment/orgIndex",
                                children: [
                                    {
                                        title: "配置机构索引",
                                        index: "/setting/orgDepartment/orgIndex/orgIndexConfig",
                                    },
                                    {
                                        title: "查看机构索引",
                                        index: "/setting/orgDepartment/orgIndex/orgIndexView",
                                    },
                                ],
                            },
                            {
                                title: "机构管理",
                                index: "/setting/orgDepartment/orgManage",
                                children: [
                                    {
                                        title: "配置机构",
                                        index: "/setting/orgDepartment/orgManage/orgManageConfig",
                                    },
                                    {
                                        title: "查看机构",
                                        index: "/setting/orgDepartment/orgManage/orgManageView",
                                    },
                                ],
                            },
                            {
                                title: "部门管理",
                                index: "/setting/orgDepartment/departManage",
                                children: [
                                    {
                                        title: "配置部门",
                                        index: "/setting/orgDepartment/departManage/depManageConfig",
                                    },
                                    {
                                        title: "查看部门",
                                        index: "/setting/orgDepartment/departManage/depManageView",
                                    },
                                    {
                                        title: "部门变更",
                                        index: "/setting/orgDepartment/orgManage/depManageAltera",
                                    },
                                ],
                            },
                            {
                                title: "人员管理",
                                index: "/setting/orgDepartment/personManage",
                                children: [
                                    {
                                        title: "提取人员",
                                        index: "/setting/orgDepartment/personManage/extract",
                                    },
                                    {
                                        title: "查看人员",
                                        index: "/setting/orgDepartment/personManage/personList",
                                    },
                                    {
                                        title: "查看休眠",
                                        index: "/setting/orgDepartment/personManage/sleepList",
                                    },
                                    {
                                        title: "查看文件",
                                        index: "/setting/orgDepartment/personManage/filePersonList",
                                    },
                                ],
                            },
                            {
                                title: "群组管理",
                                index: "/setting/orgDepartment/teamManage",
                                children: [
                                    {
                                        title: "查看群组",
                                        index: "/setting/orgDepartment/teamManage/teamList",
                                    },
                                    {
                                        title: "配置群组",
                                        index: "/setting/orgDepartment/teamManage/editTeam",
                                    },
                                ],
                            },
                            {
                                title: "变更记录管理",
                                index: "/setting/orgDepartment/alterRecord",
                                children: [
                                    {
                                        title: "新旧机构对应记录",
                                        index: "/setting/orgDepartment/alterRecord/orgalterRecord",
                                    },
                                    {
                                        title: "新旧部门对应记录",
                                        index: "/setting/orgDepartment/alterRecord/alterDeptRecord",
                                    },
                                    {
                                        title: "机构索引变更记录",
                                        index: "/setting/orgDepartment/alterRecord/deptIndexAlter",
                                    },
                                    {
                                        title: "机构变更记录",
                                        index: "/setting/orgDepartment/alterRecord/orgAlterations",
                                    },
                                    {
                                        title: "部门变更记录",
                                        index: "/setting/orgDepartment/alterRecord/deptAlterations",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        title: "流程控制",
                        index: "/setting/processControl",
                        children: [
                            {
                                title: "主流程",
                                index: "/setting/processControl/mainProcessControl",
                            },
                        ],
                    },
                    {
                        title: "主题词库",
                        index: "/setting/themeLexicon",
                        children: [
                            {
                                title: "配置类别词",
                                index: "/setting/themeLexicon/classifier",
                            },
                            {
                                title: "配置类属词",
                                index: "/setting/themeLexicon/genus",
                            },
                            {
                                title: "配置公共类属词",
                                index: "/setting/themeLexicon/publicGenus",
                            },
                            {
                                title: "配置文种词",
                                index: "/setting/themeLexicon/practice",
                            },
                        ],
                    },
                    {
                        title: "系统配置",
                        index: "/setting/sysConfig",
                        children: [
                            {
                                title: "服务器配置",
                                index: "/setting/sysConfig/server",
                            },
                            {
                                title: "数据库配置",
                                index: "/setting//sysConfig/database",
                            },
                            {
                                title: "正文模板配置",
                                index: "/setting/sysConfig/texttem",
                            },
                            {
                                title: "恢复用户口令",
                                index: "/setting/sysConfig/restPwd",
                            },
                            {
                                title: "分级维护设置",
                                index: "/setting/sysConfig/gradprotect",
                            },
                            {
                                title: '主题词部门设置',
                                index: '/setting/sysConfig/keyword',
                                children: [
                                    {
                                        title: '新建主题词部门',
                                        index: '/setting/sysConfig/createKeyword',
                                    },
                                    {
                                        title: '查看主题词部门',
                                        index: '/setting/sysConfig/keyword',
                                    }
                                ]
                            },
                            {
                                title: "落款部门过滤设置",
                                index: "/setting/sysConfig/payfiflter",
                            },
                            {
                                title: "其他配置",
                                index: "/setting/sysConfig/otherconfig",
                                children: [
                                    {
                                        title: "短信微信发送配置",
                                        index: "/setting/sysConfig/otherconfig",
                                    },
                                    {
                                        title: "节假日配置",
                                        index: "/setting/sysConfig/otherconfig/holiday",
                                    },
                                    {
                                        title: "视图分类配置",
                                        index: "/setting/sysConfig/otherconfig/categoryView",
                                    },
                                    {
                                        title: "数据库空间预警",
                                        index: "/setting/sysConfig/otherconfig/dataWarning",
                                    },
                                    {
                                        title: "超期待办个人提醒",
                                        index: "/setting/sysConfig/otherconfig/overduePer",
                                    },
                                    {
                                        title: "超期待办综合提醒",
                                        index: "/setting/sysConfig/otherconfig/overdueCom",
                                    },
                                    {
                                        title: "反向提醒设置",
                                        index: "/setting/sysConfig/otherconfig/reMind",
                                    },
                                    {
                                        title: "待办事宜排序",
                                        index: "/setting/sysConfig/otherconfig/thingsOrder",
                                    },
                                    {
                                        title: "接口系统配置",
                                        index: "/setting/sysConfig/otherconfig/interSys",
                                    },
                                    {
                                        title: "正文字数超限原因配置单",
                                        index: "/setting/sysConfig/otherconfig/textNum",
                                    },
                                    {
                                        title: "附件上传黑名单配置",
                                        index: "/setting/sysConfig/otherconfig/blackList",
                                    },
                                    {
                                        title: "意见中不能包含的特殊字符",
                                        index: "/setting/sysConfig/otherconfig/opinionChar",
                                    },
                                    {
                                        title: "正文延时白名单设置",
                                        index: "/setting/sysConfig/otherconfig/whiteList",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        title: "设计词典",
                        index: "/setting/designDictionary",
                        children: [
                            {
                                title: "业务分类",
                                index: "/setting/designDictionary/businessClassify",
                                // children: [
                                //   {
                                //     title: "业务分类设置",
                                //     index:"/setting/designDictionary/businessClassify/businessClassifySet",
                                //   },
                                // ],
                            },
                            {
                                title: "设计元素",
                                index: "/setting/designDictionary/designElement",
                                // children: [
                                //   {
                                //     title: "设计元素集合设置",
                                //     index:
                                //       "/setting/designDictionary/designElement/designElementSetting",
                                //   },
                                // ],
                            },
                            {
                                title: "机构配置",
                                index: "/setting/designDictionary/institutionConfig",
                            },
                            {
                                title: "部门配置",
                                index: "/setting/designDictionary/departmentConfig",
                                children: {
                                    title: "部门配置详情",
                                    index: "/setting/designDictionary/departmentConfigDetail",
                                },
                            },
                            {
                                title: "模块配置",
                                index: "/setting/designDictionary/moduleConfig",
                            },
                            {
                                title: "功能配置",
                                index: "/setting/designDictionary/functionConfig",
                            },
                            {
                                title: "操作配置",
                                index: "/setting/designDictionary/operateConfig",
                            },
                        ],
                    },
                    {
                        title: "日志管理",
                        index: "/setting/logs",
                        children: [
                            {
                                title: "用户收藏日志查询",
                                index: "/setting/logs/selectCollectLogs",
                            },
                            {
                                title: "用户登录日志查询",
                                index: "/setting/logs/selectLoginLogs",
                            },
                            {
                                title: "系统维护日志",
                                index: "/setting/logs/selectPreserveLogs",
                            },
                            {
                                title: "用户回顾",
                                index: "/setting/logs/reviewLogs",
                            },
                            {
                                title: "日志安全设置",
                                index: "/setting/logs/settingSafeLogs",
                            },
                        ],
                    },
                    {
                        title: "用户指南",
                        index: "/setting/6",
                        children: [],
                    },
                    {
                        title: "查询",
                        index: "/setting/inquire",
                        children: [],
                    },
                    {
                        title: "统计",
                        index: "/setting/statistics",
                        children: [
                            {
                                title: "公文统计分析汇总",
                                index: "/setting/statistics/analysis",
                                children: [
                                    {
                                        title: "按全行统计",
                                        index: "/setting/statistics/analysis/wholeBank",
                                    },
                                    {
                                        title: "按下级机构统计",
                                        index: "/setting/statistics/analysis/lowerOrg",
                                    },
                                ],
                            },
                            {
                                title: "公文点击率统计",
                                index: "/setting/statistics/clickRate",
                            },
                        ],
                    },
                ],
            };
        },
    };
</script>
