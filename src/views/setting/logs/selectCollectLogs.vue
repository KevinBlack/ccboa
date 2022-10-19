/**
* create by zx on 2020-7-8 15:38
* 类注释：
* 备注：
*/
<template>
  <div class="selectCollectLogs">
    <div class="formHeader">
      <div class="title-text">用户收藏日志查询</div>
    </div>
    <search-form
      :formData="formData"
      @reset="reset"
      ref="searchForm"
      @submit="submit"
      @event="eventClick"
      :formCfg="formCfg"
    >
      <el-col :span="8">
        <el-form-item label="收藏文件标题">
          <el-input v-model="formData.dataTitle"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收藏时间">
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
    </search-form>
    <m-table
      @refresh="loadData()"
      size="medium"
      :isIndex="true"
      :isHandle="false"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
    <el-dialog title="收藏日志查询-收藏文件类型选择" :visible.sync="showDialog">
      <fd-form
        style="margin:0 5%"
        :config="{labelWidth: '100px'}"
        :data="dialogFormData"
        @event="dialogItemClick"
        :columns="dialogFormCfg"
      ></fd-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import FdForm from "vue-elementui-freedomen/components/form";
import searchForm from "components/form/searchForm";
import baseSearchForm from "components/form/baseSearchForm";

export default {
  name: "selectCollectLogs",
  components: {
    FdForm,
    mTable,
    searchForm,
    baseSearchForm,
  },
  props: {},
  data() {
    return {
      formCfg: [
        { type: "input", prop: "dataId", label: "收藏文件文号", span: 8 },
        { type: "input", prop: "userName", label: "收藏人", span: 8 },
        {
          type: "select",
          prop: "detailInfo",
          label: "收藏方式",
          span: 8,
          style: { width: "100%" },
          options: "本地,服务器",
        },
        { type: "input", prop: "logIp", label: "收藏客户端IP", span: 8 },
        // {type: 'select', prop: '5', label: '收藏文件UNID', span: 8, style: {width: '100%'}, options: ''},
        // {type: 'div', label: '', span: 8, style: {"width": "100%"}},
        {
          type: "input",
          prop: "selcetOpetionType",
          label: "收藏文件类型",
          span: 8,
          style: { width: "100%" },
          disabled: true,
        },
        {
          type: "button-primary",
          value: "选择",
          prop: "select",
          span: 3,
          style: { "margin-left": "-50px" },
        },
        [
          { type: "button-primary", value: "开始查询", prop: "$submit" },
          { type: "button-primary", value: "重写", prop: "$reset" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-120px" },
          },
        ],
      ],
      formData: {},
      showDialog: false,

      tableData: [],
      tableCols: [
        { label: "收藏时间", prop: "operationTime" },
        { label: "收藏人", prop: "userName" },
        { label: "收藏文件标题", prop: "dataTitle" },
        { label: "收藏文件文号", prop: "currentNode" },
        { label: "收藏方式", prop: "currentUser" },
        { label: "收藏文件类型", prop: "appType" },
        { label: "客户端IP", prop: "logIp" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      dialogFormData: {},
      dialogFormCfg: [
        [
          { type: "button-primary", value: "关闭", prop: "close" },
          { type: "button-primary", value: "确定", prop: "submit" },
          { type: "formitem", style: { "text-align": "right" } },
        ],
      ],
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
    eventClick(params) {
      switch (params.prop) {
        case "select":
          this.showDialog = true;
          break;
      }
    },
    loadData() {
      this.formData.logType = "3";
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
    getCollectTypeList() {
      this.$api.setting.logs
        .getCollectTypeList({ logType: "3" })
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.dialogFormCfg.unshift({
              type: "radios",
              prop: res.data[i].appType,
              label: res.data[i].appType,
              style: { "line-height": "30px" },
              span: 24,
              options: res.data[i].operationTypes.join(","),
            });
          }
        });
    },
    dialogItemClick(params) {
      switch (params.prop) {
        case "close":
          this.showDialog = false;
          break;
        case "submit":
          this.showDialog = false;
          let list = [];
          let names = [];
          for (let item in this.dialogFormData) {
            if (this.dialogFormData[item]) {
              let type = {
                appType: item,
                operationTypes: [this.dialogFormData[item]],
              };
              list.push(type);
              names.push(item + ":" + this.dialogFormData[item]);
            }
          }
          this.$refs.searchForm.setText("selcetOpetionType", names.join(","));
          this.formData.moduleAndTypes = list;
          break;
      }
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData();
    this.getCollectTypeList();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.selectCollectLogs {
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
}
</style>
