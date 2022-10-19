<!--
 * @Author: your name
 * @Date: 2020-08-04 16:08:50
 * @LastEditTime: 2020-12-31 17:04:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\approval\layout\index.vue
-->
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
  name: 'index',
  components: {
    // layout
  },
  data() {
    return {
      menuList: [
        {
          title: '投稿管理',
          index: '/publication/tgMangement',
          children: [
            {
              title: '撰写稿件',
              index: '/publication/tgMangement/wriScript/repairScript',
            },
          ],
        },
      ],
    }
  },
}
</script>

