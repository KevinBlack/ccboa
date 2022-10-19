<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-row style="margin-bottom: 10px">
        <el-col :span="6">
          <select-org-or-dept
            @select="selectOrg"
            :orgOrDept="1"
            :orgOrDeptId="'1'"
            style="width:100%;"
          >
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择"
              v-model="formData.curbank"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>
        <el-col :span="6" style="margin-left: 10px">
          <el-select v-model="value" placeholder="请选择" @change="changeType">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-button type="primary" style="margin-left:20px;" @click="addBatch">新增</el-button>
        <el-button type="danger" style="margin-left:20px;" @click="batchDelete">删除</el-button>
      </el-row>
    </div>
    <m-table
      @refresh="loadData()"
      size="medium"
      :isIndex="true"
      :isHandle="false"
      :tableData="tableData"
      @cellClick="cellClick"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      @select="select"
      :searchData="searchData"
    ></m-table>
  </div>
</template>
<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
export default {
  name: "configurAtion",
  components: {
    mTable,
    selectOrgOrDept
  },
  props: {},
  data() {
    return {
      id: "",
      formData: {
        curbankId: "",
        curbank: ""
      },
      rowData: {},
      deptList: [],
      searchData: {},
      tableData: [],
      tableCols: [
        // { label: "序号", prop: "orderNum" },
        { label: "模板名称", prop: "attachTitle" }
      ],

      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      manageBankName: "",
      options: [
        {
          value: "TZ_MODEL",
          label: "会议单模板"
        },
        {
          value: "YT_MODEL",
          label: "议题模板"
        },
        {
          value: "LEAVING_MODEL",
          label: "请假单模板"
        },
        {
          value: "COMMUNCATION_MODEL",
          label: "联系单模板"
        }
      ],
      value: "TZ_MODEL",
      deleteArry: ""
    };
  },
  computed: {},
  methods: {
    selectOrg(org) {
      this.$set(this.formData, "curbank", org.unitName);
      this.formData.curbankId = org.id;
      console.log("主办部门：", this.formData.curbank);
      this.loadData();
    },
    handleTabsClick(tab) {
      this.tableCols = deepClone(this.tableCols);
      this.loadData();
    },
    //新增模板
    addBatch() {
      this.rowData.type = 0;
      this.$intent.goNewPage(this, {
        path: "/secretary/presidentMeeting/setUp/addConfigurAtion",
        query: this.rowData
      });
      console.log("跳转成功");
    },
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
      console.log(this.deleteArry);
    },
    //删除
    batchDelete() {
      let type = {};
      type = this.options.find(item => {
        return (item.processNode = this.value); //筛选出对应数据
      });
      if (this.deleteArry == []) {
        this.$message({
          type: "warning",
          message: "您还没有选择数据"
        });
      } else {
        this.$api.secreatary.meetings
          .delTemplateList({ ids: this.deleteArry, type: type.processNode })
          .then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
        this.loadData();
      }
    },
    cellClick(row) {
      this.rowData = {};
      this.rowData.type = 1;
      this.rowData.value = this.value;
      this.rowData.detail = JSON.stringify(row);
      console.log("this.rowData--------------------", this.rowData);
      this.$intent.goNewPage(this, {
        path: "/secretary/presidentMeeting/setUp/addConfigurAtion",
        query: this.rowData
      });
    },
    changeType() {
      let type = {};
      type = this.options.find(item => {
        return (item.processNode = this.value); //筛选出对应数据
      });
      console.log(type);
      this.$api.secreatary.meetings
        .templateList(
          { type: type.processNode, curBankId: this.formData.curbankId },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    loadData() {
      this.$api.secreatary.meetings
        .templateList({
          type: "TZ_MODEL",
          curBankId: this.formData.curbankId,
          ...this.searchData
        },
        {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          console.log(res, "loadData123------------------------------res");
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.$api.setting.organization
      .getTree({
        unitClass: 1,
        unitCode: "1"
      })
      .then(res => {
        let data = [];
        data = res.data;
        if (data && data.length > 0) {
          this.formData.curbank = data[0].unitName;
          this.formData.curbankId = data[0].unitCode;
          this.loadData();
        }
      });
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>





