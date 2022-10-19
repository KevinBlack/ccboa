/**
 * created by wh 
 * 类注释：
 * 备注：
 */
const routers = [
    {
      path: '/yqlj',
      name: 'yqlj',
      meta: {title: '友情链接',},
      component: resolve => require(['views/friendshipLink/list.vue'], resolve),
      redirect:'/friendshipLink/list',
      children: [
        {
          path: '/friendshipLink/list:id',
          name: 'list',
          meta: {
            title: "连接名称：id",
            needLogin: false,
          },
          component: resolve => require(['views/friendshipLink/list.vue'], resolve),
        },
      ]
    },
  
  ];
  
  export default routers;
  
  