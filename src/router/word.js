/*
 * @Author: your name
 * @Date: 2020-11-12 23:20:58
 * @LastEditTime: 2021-05-21 16:38:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\router\word.js
 */ 
const routers = [
    {
        path: '/openAndSave_Word',
        name: 'word',
        meta: {
            title: '在线打开/保存Word文档',
            keepAlive: true,
            needLogin: false
        },
        component:resolve => getMachineType()?require(['views/iweboffice2015/word.vue'], resolve):require(['views/iweboffice2015/wps.vue'], resolve)
    },
  {
    path: '/openAndSave_WordTs',
    name: 'word',
    meta: {
      title: '在线打开/保存Word文档',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => getMachineType()?require(['views/iweboffice2015/wordTs.vue'], resolve):require(['views/iweboffice2015/wpsTansun.vue'], resolve)
  },
  {
    path: '/openAndSave_WordHk',
    name: 'word',
    meta: {
      title: '在线打开/保存Word文档',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => getMachineType()?require(['views/iweboffice2015/wordHk.vue'], resolve):require(['views/iweboffice2015/wpsTansun.vue'], resolve)
  },
  {
    path: '/openAndSave_WordMS',
    name: 'openAndSaveWordMS',
    meta: {
      title: '在线打开/保存Word文档',
      keepAlive: true,
      needLogin: false
    },
    component: resolve => getMachineType()?require(['views/iweboffice2015/wordMS.vue'], resolve):require(['views/iweboffice2015/wpsTansun.vue'], resolve)
  },
  {
    path: '/openAndSave_Wps',
    name: 'wps',
    meta: {
        title: '在线打开/保存Wps文档',
        keepAlive: true,
        needLogin: false
    },
    component: resolve => getMachineType()?require(['views/iweboffice2015/word.vue'], resolve):require(['views/iweboffice2015/wps.vue'], resolve)
  },
  {
    path: '/openAndSave_Wps_Tansun',
    name: 'wps',
    meta: {
        title: '在线打开/保存Wps文档',
        keepAlive: true,
        needLogin: false
    },
    component: resolve => require(['views/iweboffice2015/wpsTansun.vue'], resolve)
  }
]
//保存文件  doHandleMainWord id//表单id  multiTenancyId //表单获取
export default routers
