const routers = [
    // {
    //     path:'/personalOffice',
    //     name:'PersonalOffice',
    //     meta:{
    //         title:'个人办公',
    //         keepAlive:true,
    //         needLogin:false
    //     },
    //     component:resolve => require(['views/personalOffice/personalOffice.vue'],resolve),
    //     redirect:'/sublicense',
    //     children:[
    //         {
    //             path:'/sublicense',
    //             name:'Sublicense',
    //             meta:{
    //                 title:'转授权',
    //                 keepAlive:true,
    //                 needLogin:false
    //             },
    //             component:resolve => require(['views/personalOffice/sublicense/sublicense.vue'],resolve),
    //             redirect:'/subTemp',
    //             children:[
    //                 {
    //                     path:'/subTemp',
    //                     name:'SubTemp',
    //                     meta:{
    //                         title:'临时转授权',
    //                         keepAlive:true,
    //                         needLogin:false
    //                     },
    //                     component:resolve => require(['views/personalOffice/sublicense/subTemp.vue'],resolve),
    //                 },{
    //                         path:'/subLong',
    //                         name:'SubLong',
    //                         meta:{
    //                             title:'长期转授权',
    //                             keepAlive:true,
    //                             needLogin:false
    //                         },
    //                     component:resolve => require(['views/personalOffice/sublicense/subLong.vue'],resolve),
    //                 }    
    //             ]
    //         }
    //     ]
    // },
    // {
    //     path:'/subTempAdd',
    //     name:'SubTempAdd',
    //     meta:{
    //         title:'临时转授权登记',
    //         keepAlive:true,
    //         needLogin:false
    //     },
    //     component:resolve => require(['views/personalOffice/sublicense/subTempAdd.vue'],resolve),
    // },
    // {
    //     path:'/subLongAdd',
    //     name:'SubLongAdd',
    //     meta:{
    //         title:'长期转授权登记',
    //         keepAlive:true,
    //         needLogin:false
    //     },
    //     component:resolve => require(['views/personalOffice/sublicense/subLongAdd.vue'],resolve),
    // }
]

export default routers
