<!--
 * @Author: wy
 * @Date: 2020-07-21 16:55:43
 * @LastEditTime: 2020-07-21 17:02:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\newApply\components\viewDone.vue
--> 
<template>
  <div class="viewDone">
    <div class="noneRel">暂时没有相关文档</div>
  </div>
</template>

<script>

export default {
  name: 'viewDone',
  components: {
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  activated () {
  },
  mounted () {
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.viewDone {
  .noneRel {
    margin-top: 100px;
    font-size: 28px;
    line-height: 50px;
    font-weight: 600;
    text-align: center;
  }
}
</style>