/**
* create by zx on 2020-7-8 17:22
* 类注释：
* 备注：
*/
<template>
  <div class="selectPreserveLogs">
    <div class="formHeader">
      <div class="title-text">系统维护日志</div>
    </div>
    <search-form :formData="formData" @reset="reset" @submit="submit" :formCfg="formCfg">
      <el-col :span="8">
        <el-form-item label="日志内容">
          <el-input v-model="formData.userName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="操作日期">
          <el-date-picker
            v-model="formData.draftTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            style="width:100%"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-col>
    </search-form>

    <m-table
      @refresh="loadData()"
      size="medium"
      :isHandle="false"
      :isSelection="true"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import searchForm from "../../../components/form/searchForm";
import beanList from "../../../util/beanList";

export default {
  name: "selectPreserveLogs",
  components: { mTable, searchForm },
  props: {},
  data() {
    return {
      formCfg: [
        // {type: 'input', prop: '3', label: '操作类型', span: 8},
        {
          type: "input",
          prop: "userName",
          label: "用户名称",
          span: 8,
        },
        // {type: 'input', prop: 'detailInfo', label: '日志内容', span: 8},
        [
          { type: "button-primary", prop: "$submit", value: "开始查询" },
          { type: "button", prop: "$reset", value: "重置" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-120px" },
          },
        ],
      ],
      formData: {},
      tableData: [],
      tableCols: [
        { label: "模块", prop: "appType" },
        { label: "操作时间", prop: "operationTime" },
        { label: "客户端ip", prop: "logIp" },
        { label: "用户名称", prop: "userName" },
        {
          label: "日志类型",
          prop: "logType",
          formatter: (row) => {
            return beanList.logType[row.logType];
          },
        },
        { label: "机构名称", prop: "unitName" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    reset() {
      this.formData = {};
    },
    submit(params) {
      this.formData = params;
      this.loadData();
    },
    loadData() {
      this.formData.logType = "2";
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
