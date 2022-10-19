const routers = [
    {
        path: '/detailFw',
        name: 'DetailFw',
        meta: {
            title: '模板及范文上传单',
            keepAlive: true,
            needLogin: false
        },
        component: resolve => require(['views/fwManagement/modelFw/detailFw.vue'], resolve),
    },
    {
        path: '/opinionDetail',
        name: 'opinionDetail',
        meta: {
            title: '意见征集详情单',
            keepAlive: true,
            needLogin: false
        },
        component: resolve => require(['views/fwManagement/solicitOpinion/opinionDetail.vue'], resolve),
    },
    {
        path: '/updateDetail',
        name: 'updateDetail',
        meta: {
            title: '我的上传详情单',
            keepAlive: true,
            needLogin: false
        },
        component: resolve => require(['views/fwManagement/myUpdate/updateDetail.vue'], resolve),
    },
    {
        path: '/addMuban',
        name: 'AddMuban',
        meta: {
            title: '模板及范文上传单',
            keepAlive: true,
            needLogin: false
        },
        component: resolve => require(['views/fwManagement/modelFw/addMuban.vue'], resolve),
    },
    {
        path: '/adminFw',
        name: 'AdminFw',
        meta: {
            title: '模板及范文上传单',
            keepAlive: true,
            needLogin: false
        },
        component: resolve => require(['views/fwManagement/modelFw/adminFw.vue'], resolve),
    },
    {
        path: '/fwManagement', 
        name: 'FwManagement',
        meta: { 
            title: '范文管理',
            keepAlive: true,
            needLogin: false
        },
        component: resolve => require(['views/fwManagement/index.vue'], resolve), // 这里利用父页面来进行渲染
        redirect: '/modelFw', // 重定向注意层级关系
        children: [
            {
                path: '/modelFw',
                name: 'ModelFw',
                meta: {
                    title: '模板及范文',
                    keepAlive: true,
                    needLogin: false
                },
                component: resolve => require(['views/fwManagement/modelFw/index.vue'], resolve),
            },
            {
                path: '/solicitOpinion',
                name: 'SolicitOpinion',
                meta: {
                    title: '意见征集',
                    keepAlive: true,
                    needLogin: false
                },
                component: resolve => require(['views/fwManagement/solicitOpinion/index.vue'], resolve),
            },
            {
                path: '/myUpdate',
                name: 'MyUpdate',
                meta: {
                    title: '我的上传',
                    keepAlive: true,
                    needLogin: false
                },
                component: resolve => require(['views/fwManagement/myUpdate/index.vue'], resolve),
            },
            {
                path: '/myCollect',
                name: 'MyCollect',
                meta: {
                    title: '我的收藏',
                    keepAlive: true,
                    needLogin: false
                },
                component: resolve => require(['views/fwManagement/myCollect/index.vue'], resolve),
            },
            {
                path: '/fwSearch',
                name: 'FwSearch',
                meta: {
                    title: '查询',
                    keepAlive: true,
                    needLogin: false
                },
                component: resolve => require(['views/fwManagement/fwSearch/index.vue'], resolve),
            },
            {
                path: '/mfStatistics',
                name: 'MfStatistics',
                meta: {
                    title: '统计',
                    keepAlive: true,
                    needLogin: false
                },
                component: resolve => require(['views/fwManagement/mfStatistics/index.vue'], resolve),
                redirect: '/fwStatistics',
                children:[
                    {
                        path: '/fwStatistics',
                        name: 'FwStatistics',
                        meta: {
                            title: '模板/范文统计',
                            keepAlive: true,
                            needLogin: false
                        },
                        component: resolve => require(['views/fwManagement/mfStatistics/fwStatistics.vue'], resolve),
                    },
                    {
                        path: '/hotSearch',
                        name: 'hotSearch',
                        meta: {
                            title: '热搜统计',
                            keepAlive: true,
                            needLogin: false
                        },
                        component: resolve => require(['views/fwManagement/mfStatistics/hotSearch.vue'], resolve),
                    }
                ]
            },
            {
                path: '/paramerMaint',
                name: 'ParamerMaint',
                meta: {
                    title: '参数维护',
                    keepAlive: true,
                    needLogin: false
                },
                component: resolve => require(['views/fwManagement/paramerMaint/index.vue'], resolve),
            },
        ]
    },
    {
        path: '/groupDetail',
        name: 'groupDetail',
        meta: {
            title: '新增群组',
            keepAlive: true,
            needLogin: false
        },
        component: resolve => require(['views/fwManagement/paramerMaint/groupDetail.vue'], resolve)
    },
    {
        path: '/collectDetail',
        name: 'collectDetail',
        meta: {
            title: '新增群组',
            keepAlive: true,
            needLogin: false
        },
        component: resolve => require(['views/fwManagement/myCollect/detail.vue'], resolve)
    },
]
        

export default routers
