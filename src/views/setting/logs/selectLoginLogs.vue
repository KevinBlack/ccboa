/**
* create by zx on 2020-7-8 17:11
* 类注释：
* 备注：
*/
<template>
  <div class="selectLoginLogs">
    <div class="formHeader">
      <div class="title-text">用户登录日志查询</div>
    </div>
    <el-form :model="formData" label-width="120px">
      <el-row style="margin: 0 0 20px 0">
        <el-col :span="8">
          <el-form-item label="用户账号">
            <el-input v-model="formData.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="时间">
            <el-date-picker
              v-model="formData.draftTime"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              style="width:100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6" style="margin-left: 20px">
          <el-button type="primary" @click="loadData1">开始搜索</el-button>
          <el-button type="primary" @click="formData={}">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <m-table
      @refresh="loadData"
      :isIndex="true"
      :isHandle="false"
      :isPagination="true"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import addToRight from "components/dialog/addToRight";
import mTable from "@/components/table/tTable";
import FdForm from "vue-elementui-freedomen/components/form";
import searchForm from "components/form/searchForm";

export default {
  name: "selectLoginLogs",
  components: {
    FdForm,
    searchForm,
    mTable,
    addToRight,
  },
  props: {},
  data() {
    return {
      formData: {},
      tableData: [],
      tableCols: [
        { label: "模块名", prop: "appType" },
        { label: "日志时间", prop: "operationTime" },
        { label: "客户端ip", prop: "logIp" },
        { label: "用户名称", prop: "userName" },
        { label: "日志类型", prop: "operationType" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
    };
  },
  computed: {},
  methods: {
    loadData1() {
      this.pagination.pageNum = 1;
      this.loadData();
    },
    loadData(type) {
      if (!type) {
        this.pagination.pageNum = 1;
      }
      this.formData.logType = "1";
      if (this.formData.draftTime) {
        this.formData.startTime = this.formData.draftTime[0];
        this.formData.endTime = this.formData.draftTime[1];
      }
      this.$api.setting.logs
        .getLoginLogList(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  padding: 8px 70px;

  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
</style>
