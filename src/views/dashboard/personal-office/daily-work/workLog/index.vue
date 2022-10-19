<template>
  <div class="workLog">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="新建个人日志" name="newPersonal">
        <v-newPersonal @activeNameClick="activeNameClick"></v-newPersonal>
      </el-tab-pane>
      <el-tab-pane label="查看个人日志" name="viewPersonal">
        <v-viewPersonal :tableData="tableData"></v-viewPersonal>
      </el-tab-pane>
      <el-tab-pane label="查看共享日志" name="viewShare">
        <v-viewShare></v-viewShare>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import vNewPersonal from "./components/newPersonal";
import vViewPersonal from "./components/viewPersonal";
import vViewShare from "./components/viewShare";

export default {
  name: "workLog",
  components: {
    vNewPersonal,
    vViewPersonal,
    vViewShare
  },
  data() {
    return {
      activeName: "newPersonal",
      isFir: true,
      isSec: false,
      isThr: false,
      tableData: [],
      searchData: { sort: "", sortKey: "" },
      pagination: {
        pageNum: 1,
        pageSize: 20
      }
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.activeName = this.$route.query.activeName
      ? this.$route.query.activeName
      : "viewPersonal";
  },
  methods: {
    activeNameClick(val) {
      this.activeName = val
      this.loadData();
    },
    handleClick(tab, event) {
      if (tab.name === "newPersonal") {
        this.isFir = true;
        this.isSec = false;
        this.isThr = false;
      } else if (tab.name === "viewPersonal") {
        this.isFir = false;
        this.isSec = true;
        this.isThr = false;
        this.loadData();
      } else if (tab.name === "viewShare") {
        this.isFir = false;
        this.isSec = false;
        this.isThr = true;
      } else {
        return;
      }
    },
    loadData() {
      this.$api.dailyWork
        .viewPersonalLog(
          {
            searchData: this.searchData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
          sessionStorage.setItem("workLogTotal", JSON.stringify(res.total));
        });
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
