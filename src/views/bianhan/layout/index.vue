/**
* create by zx on 2020-6-23 10:50
* 类注释：
* 备注：
*/
<template>
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
            index: "/bianhan/index",
            children: [],
          },
          {
            title: "承办",
            index: "/bianhan/undertable",
            children: [],
          },
          {
            title: "传阅",
            index: "/bianhan/circulatetable",
            children: [],
          },
          {
            title: "查询",
            index: "/bianhan/annsearch",
            children: [],
          },
          {
            title: "参数维护",
            index: "/bianhan/serialnum",
            children: [
              {
                title: "流水号维护",
                index: "/bianhan/serialnum",
                children: [],
              },
              {
                title: "便函系统配置",
                index: "/bianhan/setting",
                children: [],
              },
            ],
          },
        ],
      }
    },
  }
</script>

