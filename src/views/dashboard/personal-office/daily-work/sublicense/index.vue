<!--
 * @Author: wy
 * @Date: 2020-07-13 15:27:51
 * @LastEditTime: 2020-07-17 10:00:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\sublicense\index.vue
--> 
<template>
  <div class="sublicense">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登记" name="register">
        <v-register></v-register>
      </el-tab-pane>
      <el-tab-pane label="查看" name="view">
        <v-view></v-view>
      </el-tab-pane>
      <el-tab-pane label="查看办结" name="done">
        <v-done></v-done>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import vRegister from './components/register'
import vView from './components/view'
import vDone from './components/done'
export default {
  name: 'sublicense',
  components: {
    vRegister,
    vView,
    vDone
  },
  data () {
    return {
      activeName: 'register'
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.sublicense {
}
</style>
