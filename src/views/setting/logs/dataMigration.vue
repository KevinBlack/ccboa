/**
* create by zyt on 2022-7-18 13:40
* 类注释：
* 备注：
*/
<template>
  <div class="selectCollectLogs">
    <div class="formHeader">
      <div class="title-text">数据迁移日志</div>
    </div>
    <el-row class="mtJ20">
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
        >
          <el-row :gutter="24">
            <el-col :span="8">
              <select-org-or-dept @select="selectOrg">
                <el-form-item label="机构名称">
                  <el-input
                    type="text"
                    readonly="readonly"
                    placeholder="请选择机构"
                    v-model="searchData.orgName"
                    suffix-icon="el-icon-arrow-down"
                    style="width: 95%"
                  />
                </el-form-item>
              </select-org-or-dept>
            </el-col>
            <el-col :span="8">
              <select-org-or-dept
                @select="selectDept"
                :orgOrDept="0"
                :orgOrDeptId="searchData.orgCode"
              >
                <el-form-item label="部门名称">
                  <el-input
                    readonly
                    type="text"
                    placeholder="请选择部门"
                    v-model="searchData.unitSearchName"
                    suffix-icon="el-icon-arrow-down"
                    style="width: 95%"
                  />
                </el-form-item>
              </select-org-or-dept>
            </el-col>
            <el-col :span="8">
              <el-form-item label="迁移时间">
                <div class="block">
                  <el-date-picker
                    @change="timeChange($event)"
                    v-model="transferTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    style="width: 100%"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="用户名">
                <el-input
                  v-model="ruleForm.originHumanName"
                  placeholder="请输入用户名"
                  style="width: 95%"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标题">
                <el-input
                  v-model="ruleForm.dataTitle"
                  placeholder="请输入"
                  style="width: 95%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="文号">
                <el-input
                  v-model="ruleForm.documentNo"
                  placeholder="请输入"
                  style="width: 95%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              class="arrowup"
              style="text-align: center; margin-bottom: 10px"
            >
              <el-button class="button" type="primary" @click="submitForm"
                >开始搜索</el-button
              >
              <el-button type="primary" @click="resetForm">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <m-table
      @refresh="loadData()"
      :isBorder="true"
      size="medium"
      :isIndex="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @cellClick="cellClick"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import baseSearchForm from "components/form/baseSearchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import dateFormate from "@/util/filters.js";
export default {
  name: "dataMigration",
  components: {
    mTable,
    baseSearchForm,
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      formData: {
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        orgCode: JSON.parse(localStorage.getItem("userInfo")).unitId,
        sortKey: "",
        sort: "",
      },
      searchData: {
        orgName: "",
        orgCode: "",
        unitClass: 0,
        // unitName: "",
        unitSearchName: "",
        seletSelf: 0,
        unitCode: "",
      },
      tableData: [],
      transferTime: [],
      tableCols: [
        {
          label: "文件类型",
          prop: "dataType",
          align: "center",
          width: "110px",
        },
        {
          label: "用户名",
          prop: "originHumanName",
          align: "center",
          width: "100px",
        },
        {
          label: "标题",
          prop: "dataTitle",
          align: "center",
          width: "190px",
        },
        {
          label: "文号编号",
          prop: "documentNo",
          align: "center",
          minwidth: "40%",
        },
        {
          label: "文件ID",
          prop: "dataId",
          align: "center",
          width: "160px",
        },
        {
          label: "迁移时间",
          prop: "transferTime",
          align: "center",
          width: "180px",
        },
        {
          label: "文件接收人",
          prop: "currentHumanName",
          align: "center",
          width: "130px",
        },
      ],
      ruleForm: {
        // humanName: "",
        startTime: "",
        endTime: "",
        originHumanName: "",
        dataTitle: "",
        documentNo: ""
      },
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    timeChange() {
      if (this.transferTime.length > 0) {
        this.transferTime[0] = dateFormate.date(
          Date.parse(this.transferTime[0]),
          "YYYY-MM-DD"
        );
        this.transferTime[1] = dateFormate.date(
          Date.parse(this.transferTime[1]),
          "YYYY-MM-DD"
        );
      }
    },
    selectDept(dept) {
      this.searchData.unitSearchName = dept.unitName;
      this.searchData.unitCode = dept.id;
      this.searchData.seletSelf = 1;
      //   this.loadData();
    },
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.orgCode = org.id;
      // this.searchData.unitCode = org.id;
      this.searchData.seletSelf = 0;
      this.searchData.unitSearchName = "";
      //   if (this.searchData.orgCode) this.loadData();
    },
    cellClick(row) {
      this.$router.push({
        name: "migrationDetail",
        query: { rowData: JSON.stringify(row) },
      });
    },
    resetForm() {
      this.ruleForm = {
        // humanName: "",
        startTime: "",
        endTime: "",
        dataTitle: "",
        documentNo: "",
        originHumanName: "",
      };
      this.transferTime = [];
      this.searchData.orgName = JSON.parse(
        localStorage.getItem("userInfo")
      ).unitName;
      this.ruleForm.unitCode = this.searchData.orgCode = JSON.parse(
        localStorage.getItem("userInfo")
      ).unitId;
      this.ruleForm.organId =
        this.searchData.unitSearchName =
        this.searchData.unitCode =
          "";
    },
    submitForm() {
      this.loadData();
    },
    loadData() {
      if (this.transferTime) {
        this.ruleForm.startTime = this.transferTime[0];
        this.ruleForm.endTime = this.transferTime[1];
      }else{
        this.ruleForm.startTime = ""
        this.ruleForm.endTime = ""
      }
      this.ruleForm.unitCode = this.searchData.orgCode;
      this.ruleForm.organId = this.searchData.unitCode;
      this.$api.setting.logs
        .getDataMigration(this.ruleForm, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.list;
          this.pagination.total = res.total; 
        });
    },
  },
  activated() {},
  mounted() {},
  created() {
    this.searchData.orgName = JSON.parse(
      localStorage.getItem("userInfo")
    ).unitName;
    this.searchData.orgCode = JSON.parse(
      localStorage.getItem("userInfo")
    ).unitId;
    this.loadData();
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
.arrowup {
  margin-top: 10px;
}
/deep/.el-table tr {
  cursor: pointer;
}
// .button{
//   margin-right: 50px;
// }
</style>
