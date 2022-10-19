<!--
 * @Author: your name
 * @Date: 2020-07-30 16:36:10
 * @LastEditTime: 2020-08-11 17:29:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\meeting\layout\index.vue
-->
/**
* create by zx on 2020-6-23 10:50
* 类注释：
* 备注：
*/
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
                        title: "制发",
                        index: "/meeting/zf",
                        children: [
                            {
                                title: "起草",
                                index: "/meeting/zf/zfOne",
                                children: [],
                            },
                            {
                                title: "流转",
                                index: "/meeting/zf/zfList",
                                children: [],
                            },
                            {
                                title: "办结",
                                index: "/meeting/zf/bjList",
                                children: [],
                            }
                        ],
                    },
                    {
                        title: "承办",
                        index: "/meeting/cbList",
                        children: [],
                    },
                    {
                        title: "传阅",
                        index: "/meeting/cyList",
                        children: [],
                    },
                    {
                        title: "查询",
                        index: "/meeting/meetingSearch",
                        children: [],
                    },
                    {
                        title: "会议室预定",
                        index: "/meeting/yd",
                        children: [
                            {
                                title: "会议室预定",
                                index: "/meeting/yd/meetingYd",
                                children: [],
                            },
                            {
                                title: "草稿箱",
                                index: "/meeting/yd/drafts",
                                children: [],
                            },
                            {
                                title: "打印维护单",
                                index: "/meeting/yd/print",
                                children: [],
                            },
                            {
                                title: "参数维护",
                                index: "/meeting/yd/parameter",
                                children: [
                                    {
                                        title: "参数配置",
                                        index: "/meeting/yd/csweihu/parameterConfiguration",
                                        children: [],
                                    },
                                    {
                                        title: "非工作时间预定提醒",
                                        index: "/meeting/yd/csweihu/remind",
                                        children: [],
                                    },
                                    {
                                        title: "会议室预定有效期",
                                        index: "/meeting/yd/csweihu/validity",
                                        children: [],
                                    },
                                    {
                                        title: "会议室预定说明",
                                        index: "/meeting/yd/csweihu/caption",
                                        children: [],
                                    },
                                ],
                            },
                            {
                                title: "查询",
                                index: "/meeting/yd/query",
                                children: [],
                            },
                            {
                                title: "统计",
                                index: "/meeting/yd/statistic",
                                children: [],
                            }
                        ],
                    },
                    {
                        title: "参数维护",
                        index: "/meeting/cs",
                        children: [
                            {
                                title: "反馈信息设置",
                                index: "/meeting/cs/fk",
                                children: [],
                            },
                            {
                                title: "会议系统配置",
                                index: "/meeting/cs/hy",
                                children: [],
                            },
                        ],
                    },
                    {
                        title: "管理员查看",
                        index: "/meeting/admin",
                        children: [
                            {
                                title: "制发",
                                index: "/meeting/admin/adminZf",
                                // children: [
                                //     {
                                //         title: "流转",
                                //         index: "/meeting/admin/zfLz",
                                //         children: [],
                                //     },
                                //     {
                                //         title: "办结",
                                //         index: "/meeting/admin/zfBj",

                                //     },
                                // ],
                            },
                            {
                                title: "承办",
                                index: "/meeting/admin/adminCb",
                                children: [],
                            },
                            {
                                title: "传阅",
                                index: "/meeting/admin/adminCy",
                                children: [],
                            },
                        ],
                    },
                ]
            }
        },
    }
</script>

