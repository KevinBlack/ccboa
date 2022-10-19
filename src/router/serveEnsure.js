/**
 * created by wanglon 
 * 类注释：
 * 备注：
 */
const routers = [
    {
      path: '/fwbz',
      name: 'fwbz',
      meta: {title: '服务保障',},
      component: resolve => require(['views/serveEnsure/index.vue'], resolve),
      redirect:'/problem',
      children: [
        {
          path: '/feedback',
          name: 'feedback',
          meta: {
            title: "意见反馈",
            needLogin: false,
          },
          component: resolve => require(['views/serveEnsure/feedback.vue'], resolve),
        },
        {
          path: '/problem',
          name: 'problem',
          meta: {
            title: "常见问题",
            needLogin: false,
          },
          component: resolve => require(['views/serveEnsure/problem.vue'], resolve),
        },{
          path: '/handbook',
          name: 'handbook',
          meta: {
            title: "用户手册",
            needLogin: false,
          },
          component: resolve => require(['views/serveEnsure/handbook.vue'], resolve),
        },
      ]
    },
  
  ];
  
  export default routers;
  
  