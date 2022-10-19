<!--
 * @Author: wy
 * @Date: 2020-07-21 16:35:24
 * @LastEditTime: 2020-07-24 14:40:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\newApply\index.vue
--> 
<template>
  <div class="newApply">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="新增用户申请" name="newUserApply">
        <v-newUserApply></v-newUserApply>
      </el-tab-pane>
      <el-tab-pane label="查看待办" name="viewToDo">
        <v-viewToDo></v-viewToDo>
      </el-tab-pane>
      <el-tab-pane label="查看已办" name="viewDone">
        <v-viewDone></v-viewDone>
      </el-tab-pane>
      <el-tab-pane label="查看办结" name="viewFinish">
        <v-viewFinish></v-viewFinish>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import vNewUserApply from './components/newUserApply'
import vViewToDo from './components/viewToDo'
import vViewDone from './components/viewDone'
import vViewFinish from './components/viewFinish'
export default {
  name: 'newApply',
  components: {
    vNewUserApply,
    vViewToDo,
    vViewDone,
    vViewFinish
  },
  data () {
    return {
      activeName: 'newUserApply',
      isNeedDelBtn: ''
    };
  },

  watch: {
  },
  mounted () {

  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>