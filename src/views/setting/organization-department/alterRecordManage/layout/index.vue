/**
* create by zx on 2020/9/8 14:24
* 类注释：
* 备注：
*/
<template>
  <div class="index">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="新旧机构对应记录" name="/setting/orgDepartment/alterRecord/orgAlterRecord"></el-tab-pane>
      <el-tab-pane label="新旧部门对应记录" name="/setting/orgDepartment/alterRecord/alterDeptRecord"></el-tab-pane>
      <!--      <el-tab-pane label="机构索引变更记录" name="/setting/orgDepartment/alterRecord/deptIndexAlter"></el-tab-pane>-->
      <el-tab-pane label="机构变更记录" name="/setting/orgDepartment/alterRecord/orgAlterations"></el-tab-pane>
      <el-tab-pane label="部门变更记录" name="/setting/orgDepartment/alterRecord/deptAlterations"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "index",
  components: {},
  props: {},
  data() {
    return {
      activeName: "/setting/orgDepartment/alterRecord/orgAlterRecord",
    };
  },
  computed: {},
  methods: {
    handleClick() {
      this.$intent.go(this, { path: this.activeName });
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.handleClick();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
