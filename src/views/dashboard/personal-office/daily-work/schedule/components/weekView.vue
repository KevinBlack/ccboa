<!--
 * @Author: wy
 * @Date: 2020-07-21 10:48:03
 * @LastEditTime: 2020-07-21 11:17:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\weekView\components\weekView.vue
-->
<template>
  <div class="weekView">
    <div>
      <el-button type="primary">按日历显示</el-button>
      <el-button type="primary" @click="newProj()">新建</el-button>
    </div>
    <div></div>
  </div>
</template>
<script>
  export default {
    name: 'detail',
    components: {},
    data () {
      return {
      }
    },
    methods: {
      newProj () {
        this.$router.push(
          {
            // path: '/dashboard/personalOffice/dailyWork/weekView/newSchedule'
          }
        )
      }
    },
  }
</script>
<style lang="less" rel="stylesheet/less">
  .weekView {
  }
</style>

