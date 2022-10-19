
<template>
  <div>
    <el-form :model="form" class="statistical" ref="elForm" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="统计日期" prop="draftTime">
            <el-date-picker
              v-model="form.draftTime"
              type="daterange"
              range-separator
              valueFormat="yyyy-MM-dd"
              style="width:90%"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00','23:59:59']"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="统计机构" prop="draftOrgan">
            <el-input
              v-model="form.draftOrgan"
              :disabled="true"
              readonly="readonly"
              style="width: 90%"
              placeholder="请选择"
            >
              <el-button slot="append" type="primary" size="small" @click="selectOrg">选择</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否包含下级机构" prop="ifDown" label-width="130px">
            <el-radio-group v-model="form.ifDown">
              <el-radio label="0">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用印表单" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio label="1">常规用印</el-radio>
              <el-radio label="2">公文用印</el-radio>
              <el-radio label="3">介绍信用印</el-radio>
              <el-radio label="4">部门用印</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="用印类型" prop="yyType">
            <el-radio-group v-model="form.yyType ">
              <el-radio label="1">机器用印</el-radio>
              <el-radio label="2">手工用印</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="统计方式" prop="tjType">
            <el-radio-group v-model="form.tjType" @change="changetjType">
              <el-radio label="1">按印章类别</el-radio>
              <el-radio label="2">按印章名称</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="按印章类别统计时" prop="tjTypeName" label-width="140px">
            <el-radio-group v-model="form.tjTypeName">
              <el-radio label="行章" :disabled="isShow">行章</el-radio>
              <el-radio label="党委章" :disabled="isShow">党委章</el-radio>
              <el-radio label="领导人员名章" :disabled="isShow">领导人员名章</el-radio>
              <el-radio label="部门内设章" :disabled="isShow">部门内设章</el-radio>
              <el-radio label="合同专用章" :disabled="isShow">合同专用章</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14" class="txtRight">
          <el-button type="primary" size="small" @click="search">开始统计</el-button>
          <el-button type="primary" size="small" @click="reset">重 置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div style="width:100%;height:36px;"></div>
    <el-col :span="24" class="mrg-b-20">
      <table>
        <tr class="table-first">
          <td>
            <h3 style="font-weight: bold;">统计说明</h3>
          </td>
          <td class="txtRight">
            <el-button type="primary" size="small" @click="exportData">导 出</el-button>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="line-height:50px;">1.本统计为按自然月整月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。</td>
        </tr>
        <tr>
          <td
            style="line-height:40px;"
            colspan="2"
          >2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。</td>
        </tr>
      </table>
    </el-col>
    <m-table
      size="medium"
      :isIndex="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :isSelection="false"
      :isPagination="false"
    ></m-table>
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :seletSelf="seletSelf"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
    <org-tree
      v-model="showOrgDepartTree"
      :isSingle="isSingle"
      :orgOrDept="0"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getDepartList"
      :selectDept="selectDept"
    ></org-tree>
  </div>
</template>
<script>
import searchForm from "components/form/searchForm";
import mTable from "@/components/table/tTable";
import orgTree from "components/tree/orgTree";
import exportTable from "../../../minixs/exportTable";
export default {
  name: "normalStatistical",
  components: {
    searchForm,
    mTable,
    orgTree
  },
  data() {
    return {
      seletSelf: 1,
      bankName: "",
      tip: "",
      title: "选择机构",
      showOrgTree: false,
      showOrgDepartTree: false,
      isShow: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      selectDept: [],
      typeList: ["系统内", "系统外"],
      tempArr: [],
      rules: {
        draftTime: [
          { required: true, message: "请选择统计时间", trigger: "blur" }
        ]
      },
      form: {
        draftOrgan: JSON.parse(localStorage.getItem("userInfo")).unitName,
        draftOrganId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        useTimeStart: "",
        useTimeEnd: "",
        ifDown: "",
        type: "",
        yyType: "",
        tjType: "",
        tjTypeName: ""
      },
      // 是否展示按用印部门统计下拉框
      isNeedStatisticalDepartment: false,
      // 是否展示按印章类别统计下拉框
      inNeedStatisticalSealType: false,
      // 是否展示按用印性质统计下拉框
      inNeedStatisticalProperty: false,
      // 是否展示按用发往单位类型统计统计下拉框w
      isNeedStatisticalUnitsType: false,
      // 存放印章类型数据
      statisticalSealTypeOption: [],
      // 存放用印性质数据
      statisticalPropertyOption: [],
      // 机构ID
      unitCode: "",
      tableData: [],
      tableCols: [
        { label: "印章类别", prop: "name" },
        { label: "用印数量", prop: "num" }
      ]
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    changetjType() {
      if (this.form.tjType == "1") {
        this.isShow = false;
      } else {
        this.isShow = true;
        this.form.tjTypeName = "";
      }
      console.log(this.isShow);
    },
    search() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.loadData();
        }
      });
    },
    selectOrg() {
      this.title = "选择机构";
      this.isSingle = true;
      this.orgOrDept = 1;
      this.orgOrDeptId = "1";
      this.showOrgTree = true;
    },
    selectDepart() {
      this.isSingle = true;
      this.orgOrDeptId = this.form.draftOrganId;
      this.showOrgDepartTree = true;
    },
    //部门
    getDepartList(org) {
      this.$set(this.form, "draftDepartment", org.unitName);
      this.$set(this.form, "draftDepartmentId", org.id);
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        this.$set(this.form, "draftOrgan", org.unitName);
        this.$set(this.form, "draftOrganId", org.id);
      }
    },
    //导出
    exportData() {
      exportTable.exportExcel("印章类别统计");
    },
    // 重置按钮
    reset() {
      this.form.useTimeStart = "";
      this.form.useTimeEnd = "";
      this.form.ifDown = "";
      this.form.type = "";
      this.form.yyType = "";
      this.form.tjType = "";
      this.form.tjTypeName = "";
      this.form.draftTime = "";
      this.tableData = [];
      this.form.draftOrgan = JSON.parse(
        localStorage.getItem("userInfo")
      ).unitName;
      this.form.draftOrganId = JSON.parse(
        localStorage.getItem("userInfo")
      ).unitId;
    },
    loadData() {
      if (this.form.draftTime) {
        this.form.useTimeStart = this.form.draftTime[0];
        this.form.useTimeEnd = this.form.draftTime[1];
      }
      this.$api.sealManage.sealStatistical
        .statisType({ ...this.form })
        .then(res => {
          this.tableData = res.list;
          console.log(this.tableData);
        });
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
.annual_title {
  width: 100%;
  height: 70px;
  margin-top: 20px;
  color: #2b66e3;
  text-align: center;
  font-size: 22px;
}
// .statistical {
//   width: 80%;
//   margin: 0 auto;
// }
// .el-form-item__label {
//   width: 100px;
//   text-align: justify;
// }
</style>