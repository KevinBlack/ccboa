# 前端文档
## 首先确认npm设定了正确的依赖库
```
npm config ls
```
如果不是```registry = "http://128.196.0.125:9000/repository/npm_group_public/"```

应进行如下操作：

```
npm config set registry http://128.196.0.125:9000/repository/npm_group_public/
```

## 项目依赖安装命令
```
#首次安装
npm i

#首次安装成功后，之后可以
npm ci
```
如安装报错可尝试删除node_modules目录及package-lock.json再进行安装


##
## 项目启动命令
```
npm run serve
```

## 项目打包命令
```
npm run build
```
## 路径自定义(ccboa)
> vue.config.js
```
// line 15&17
// 基本路径
publicPath: '/ecpweb/page/ccboa/',
//  构建时的输出目录
outputDir: 'ccboa'
```
> public/static/script/jsloader.js
```
// line 57
//生产环境
CONTEXT_PATH = '/ecpweb/page/ccboa/static/';
```
## 路由表结构
```
[
    {
        path: '路径名称',
        name: '页面名称',
        meta: {
          title: '菜单名称',
          keepAlive: true, // 是否被缓存
          needLogin: true, // 是否需要登录
          id: 1, // 菜单标识
          parentId: 0, // 父级标识
          icon: '' // 图标(一级无图标)
        },
        component: resolve => require(['views/common/Home.vue'], resolve) // 页面具体位置
    },
    {
        path: '',
        name: '',
        meta: {
          title: '',
          keepAlive: true,
          needLogin: true,
          id: 1,
          parentId: 0,
          icon:''
        },
        children: [ // 二级菜单
            {
                path: '',
                name: '',
                meta: {
                    title: '',
                    keepAlive: true,
                    needLogin: true,
                    id: 11,
                    parentId: 1,
                    icon:'el-icon-document-checked'
                },
                component: resolve => require([''], resolve)
            },
            {
                path: '',
                name: '',
                meta: {
                    title: '',
                    keepAlive: true,
                    needLogin: true,
                    id: 12,
                    parentId: 1,
                    icon:''
                },
                children: [ // 三级菜单
                    {
                        path: '',
                        name: '',
                        meta: {
                            title: '',
                            keepAlive: true,
                            needLogin: true,
                            id: 121,
                            parentId: 12,
                            icon:''
                        },
                        component: resolve => require([''], resolve)
                    },
                    {
                        path: '',
                        name: '',
                        meta: {
                            title: '',
                            keepAlive: true,
                            needLogin: true,
                            id: 122,
                            parentId: 12,
                            icon:''
                        },
                        component: resolve => require([''], resolve)
                ]
            },
            ...
        ]
    },
   ...
]
```
