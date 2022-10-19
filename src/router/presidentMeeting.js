// const routers = [
   
//       {
//       path: '/presidentMeeting/topicSub/topicDetail',
//       name: 'topicDetail',
//       meta: {
//         title: '报送详情',
//         needLogin: false,
//       },
//       component: resolve => require(['views/presidentMeeting/topicSub/topicDetail.vue'], resolve),
//     },
//       {
//       path: '/presidentMeeting/topicMange/topicMangeDetail',
//       name: 'topicMangeDetail',
//       meta: {
//         title: '管理详情',
//         needLogin: false,
//       },
//       component: resolve => require(['views/presidentMeetingtopicMange/topicMangeDetail.vue'], resolve),
//     }, 
//       {
//       path: '/presidentMeeting/conferList/conferDetail',
//       name: 'conferDetail',
//       meta: {
//         title: '主办单详情',
//         needLogin: false,
//       },
//       component: resolve => require(['views/presidentMeeting/conferList/conferDetail.vue'], resolve),
//     }, 
//       {
//       path: '/presidentMeeting/adNotice/adDetail',
//       name: 'adDetail',
//       meta: {
//         title: '预通知详情',
//         needLogin: false,
//       },
//       component: resolve => require(['views/presidentMeeting/adNotice/adDetail.vue'], resolve),
//     },
//     {
//       path: '/presidentMeeting/registerNotice/registerDetail',
//       name: 'registerDetail',
//       meta: {
//         title: '报名通知详情',
//         needLogin: false,
//       },
//       component: resolve => require(['views/presidentMeeting/registerNotice/registerDetail.vue'], resolve),
//     },
//       {
//       path: '/presidentMeeting/formalNotice/formalDetail',
//       name: 'formalDetail',
//       meta: {
//         title: '正式通知详情',
//         needLogin: false,
//       },
//       component: resolve => require(['views/presidentMeeting/formalNotice/formalDetail.vue'], resolve),
//     },
//     // {
//     // path: '/secretary',
//     // redirect: '/secretary/leaderActivity',
//     // name: 'secretary',
//     // meta: {
//     //   title: '秘书工作'
//     // },
//     // component: resolve => require(['views/secretary/layout/index.vue'], resolve),
//     // children: [
//      // 行长办公会议
//      {
//       path: '/presidentMeeting',
//       name: 'presidentMeeting',
//       redirect: '/presidentMeeting/topicSub',
//       meta: {
//         title: "行长办公会议",
//         needLogin: false,
//       },
//       component: resolve => require(['components/layout/empty.vue'], resolve),
//       children: [
//          {
//             path: '/presidentMeeting/topicSub',
//             name: 'topicSub',
//             meta: {
//               title: '议题报送',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/topicSub/index.vue'], resolve),
//           },
//           {
//             path: '/presidentMeeting/topicSub/topicDetail',
//             name: 'topicDetail',
//             meta: {
//               title: '报送详情',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/topicSub/topicDetail.vue'], resolve),
//           },
//           {
//             path: '/presidentMeeting/topicMange',
//             name: 'topicMange',
//             meta: {
//               title: '议题管理',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/topicMange/index.vue'], resolve),
//           },
//           {
//             path: '/presidentMeeting/topicMange/topicMangeDetail',
//             name: 'topicMangeDetail',
//             meta: {
//               title: '管理详情',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/topicMange/topicMangeDetail.vue'], resolve),
//           }, 
//           {
//             path: '/presidentMeeting/conferList',
//             name: 'conferList',
//             meta: {
//               title: '会议主办单',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/conferList/index.vue'], resolve),
//           },
//           {
//             path: '/presidentMeeting/conferList/conferDetail',
//             name: 'conferDetail',
//             meta: {
//               title: '主办单详情',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/conferList/conferDetail.vue'], resolve),
//           }, 
//           {
//             path: '/presidentMeeting/conferList/newYt',
//             name: 'newYt',
//             meta: {
//               title: '新增议题',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/conferList/newYt.vue'], resolve),
//           }, 
//           {
//             path: '/presidentMeeting/adNotice',
//             name: 'adNotice',
//             meta: {
//               title: '会议预通知',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/adNotice/index.vue'], resolve),
//           },
//           {
//             path: '/presidentMeeting/adNotice/adDetail',
//             name: 'adDetail',
//             meta: {
//               title: '预通知详情',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/adNotice/adDetail.vue'], resolve),
//           },
          
//           {
//             path: '/presidentMeeting/registerNotice',
//             name: 'formalNotice',
//             meta: {
//               title: '会议报名通知',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/registerNotice/index.vue'], resolve),
//           },
//           {
//             path: 'presidentMeeting/registerNotice/registerDetail',
//             name: 'registerDetail',
//             meta: {
//               title: '报名通知详情',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/registerNotice/registerDetail.vue'], resolve),
//           },
//           {
//             path: '/presidentMeeting/formalNotice',
//             name: 'formalNotice',
//             meta: {
//               title: '会议正式通知',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/formalNotice/index.vue'], resolve),
//           },
//           {
//             path: '/presidentMeeting/formalNotice/formalDetail',
//             name: 'formalDetail',
//             meta: {
//               title: '正式通知详情',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/formalNotice/formalDetail.vue'], resolve),
//           },
//         //   {
//         //     path: '/presidentMeeting/',
//         //     name: 'formalNotice',
//         //     meta: {
//         //       title: '会议正式通知',
//         //       needLogin: false,
//         //     },
//         //     component: resolve => require(['views/presidentMeeting/formalNotice/index.vue'], resolve),
//         //   },
//         //   {
//         //     path: '/presidentMeeting/formalNotice/formalDetail',
//         //     name: 'formalDetail',
//         //     meta: {
//         //       title: '正式通知详情',
//         //       needLogin: false,
//         //     },
//         //     component: resolve => require(['views/presidentMeeting/formalNotice/formalDetail.vue'], resolve),
//         //   },
//           {
//            path: '/presidentMeeting/meetQuery',
//            name: 'meetQuery',          
//             meta: {
//               title: '查询',
//               needLogin: false,
//             },
//             component: resolve => require(['views/presidentMeeting/meetQuery.vue'], resolve),
//           },
//           {
//             path: '/presidentMeeting/meetStatis',
//             name: 'meetStatis',          
//              meta: {
//                title: '统计',
//                needLogin: false,
//              },
//              component: resolve => require(['views/presidentMeeting/meetStatis.vue'], resolve),
//            },
//     ]
//     }]
// // }
// // ]
// export default routers;