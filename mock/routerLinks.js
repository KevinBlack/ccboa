const Mock = require('mockjs')

const List = [
    {
        path: '/index',
        name: 'Index',
        meta: {
          title: '首页',
          keepAlive: true,
          needLogin: true,
          id: 1,
          parentId: 0,
          icon: ''
        },
        component: resolve => require(['views/common/Home.vue'], resolve)
    },
    {
        path: '/dispatch',
        name: 'Dispatch',
        meta: {
          title: '发文处理',
          keepAlive: true,
          needLogin: true,
          id: 1,
          parentId: 0,
          icon:''
        },
        children: [
            {
                path: '/dispatchFile',
                name: 'DispatchFile',
                meta: {
                    title: '发文',
                    keepAlive: true,
                    needLogin: true,
                    id: 1,
                    parentId: 1,
                    icon:'el-icon-document-checked'
                },
                component: resolve => require(['views/dispatch/dispatchFile.vue'], resolve)
            },
            {
                path: '/dispatchFile',
                name: 'DispatchFile',
                meta: {
                    title: '会签',
                    keepAlive: true,
                    needLogin: true,
                    id: 2,
                    parentId: 1,
                    icon:'el-icon-sort-up'
                },
                component: resolve => require(['views/dispatch/dispatchFile.vue'], resolve)
            }
        ]
    },
    {
        path: '/sysManage',
        name: 'SysManage',
        meta: {
          title: '系统管理',
          keepAlive: true,
          needLogin: true,
          id: 3,
          parentId: 0,
          icon:''
        },
        children: [
            {
                path: '/sysMaintain',
                name: 'SysMaintain',
                meta: {
                    title: '系统维护',
                    keepAlive: true,
                    needLogin: true,
                    id: 31,
                    parentId: 3,
                    icon:'el-icon-document-checked'
                },
                children: []
            },
            {
                path: '/dispatchManage',
                name: 'DispatchManage',
                meta: {
                    title: '发文配置',
                    keepAlive: true,
                    needLogin: true,
                    id: 32,
                    parentId: 3,
                    icon:'el-icon-sort-up'
                },
                children: [
                    {
                        path: '',
                        name: '',
                        meta: {
                            title: '发文参数配置',
                            keepAlive: true,
                            needLogin: true,
                            id: 321,
                            parentId: 32,
                            icon:'el-icon-document-checked'
                        },
                        component: resolve => require([''], resolve)
                    },
                    {
                        path: '',
                        name: '',
                        meta: {
                            title: '公文种类配置',
                            keepAlive: true,
                            needLogin: true,
                            id: 322,
                            parentId: 32,
                            icon:'el-icon-sort-up'
                        },
                        component: resolve => require([''], resolve)
                    }
                ]
            }
        ]
    }
]

module.exports = [
  {
    url: '/vue-element-admin/article/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        console.log(item)
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

