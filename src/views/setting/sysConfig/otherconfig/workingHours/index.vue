<!--
 * @Author: liyaling
 * @Date: 2020-11-07 14:15:19
 * @LastEditTime: 
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\sysConfig\otherconfig\workingHours\index.vue
-->
<template>
  <div class="workingHours">
    <div style="marginBottom:12px">
      <el-row>
        <el-col :span="5">
          <select-org-or-dept @select="selectOrg">
            <el-input
              type="text"
              readonly
              placeholder="机构名称"
              v-model="searchData.orgName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col>
      </el-row>
    </div>

    <div style="marginBottom:6px">
      <el-button @click="add" type="primary" v-if="addButton">新增</el-button>
      <el-button @click="delItem" type="danger">删除</el-button>
    </div>
    <t-table
      @cellClick="cellClick"
      @refresh="loadData"
      @select="select"
      size="medium"
      :sortable="false"
      :isSelection="true"
      :isPagination="true"
      :isHandle="false"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></t-table>
    <org-tree
      v-model="showOrgTree"
      title="请选择机构"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script>
import tTable from "components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import orgTree from "components/tree/orgTree";
import configsApis from "@/httpTansun/api/setting/setSysConfig.js";
export default {
  name: "workingHours",
  components: {
    tTable,
    orgTree,
    selectOrgOrDept,
  },
  props: {},
  data() {
    return {
      //主、子流程参数
      wfFcnId: "",
      //是否是主流程模板
      mainProcessTemp: false,
      // 是否有新增按钮
      addButton: true,
      searchData: {
        groupId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        orgName: JSON.parse(localStorage.getItem("userInfo")).unitName,
        multiTenancyId: "",
      },
      //机构下拉框
      searchOrgOptions: [],
      //业务分类下拉框
      searchClassiOpt: [],
      tableData: [],
      tableCols: [
        { label: "上午上班时间", prop: "amTimeOn" },
        { label: "上午下班时间", prop: "amTimeOff" },
        { label: "下午上班时间", prop: "pmTimeOn" },
        { label: "下午下班时间", prop: "pmTimeOff" },
        { label: "是否启用", prop: "ifActivate" },
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20,
      },
      //删除传的参数
      selectedRow: [],
      /**
       * 从模板更新流程弹框
       */
      flowTempVisable: false,
      flowTempForm: {
        templateOrgGrade: "",
        pTplNo: "",
        pcTplNo: "",
        txnIttChnlCgyCode: "",
      },
      //选择机构弹出框
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      /**
       * 模板发送
       */
      sendTempVisible: false,
      sendTempForm: {
        tplNOList: [],
        txnIttChnlCgyCodeArr: [],
        tplNoListName: "",
        txnIttChnlCgyCodeArrName: "",
      },
      sendTempFormRules: {
        tplNoListName: { required: true, message: "请选择模板名称" },
        txnIttChnlCgyCodeArrName: { required: true, message: "请选择发送机构" },
      },
      //选择模板名称
      tempNameVisible: false,
      //模板机构级别
      tempNameForm: { tempOrgGrade: "" },
      //待选数据
      tempNameData: [],
      //已选数据
      tempNameSelectedData: [],
      //主子流程与流程模板传参变化
      tplVldStcd: "07",
    };
  },
  computed: {},
  watch: {},
  methods: {
    tempOrgGradeChange(org) {
      this.$set(this.tempNameForm, "tempOrgGrade", org.unitName);
      this.$set(this.tempNameForm, "tempOrgGradeId", org.id);
      let params = {
        tplVldStcd: "01",
        wfFcnId: "01",
        groupId: this.tempNameForm.tempOrgGradeId,
      };
      this.$api.setting.workFlow.getTipList(params).then((res) => {
        this.tempNameData = res.data;
      });
    },
    //模板机构级别select事件
    tempOrgChange(org) {
      this.$set(this.flowTempForm, "txnIttChnlCgyCode1", org.id);
      this.$set(this.flowTempForm, "templateOrgGrade", org.unitName);
      if (this.flowTempForm.pTplNo) {
      }
    },
    //模板业务分类change事件
    tempClassifyChange() {
      if (this.flowTempForm.txnIttChnlCgyCode1) {
      }
    },
    //选择机构弹出框
    selOrg(stype) {
      this.showOrgTree = true;
      this.sendTempForm.stype = stype;
      if (stype === 0) {
        this.isSingle = false;
      } else {
        this.isSingle = true;
      }
    },
    delOrg() {
      this.$set(this.flowTempForm, "txnIttChnlCgyCode", "");
      this.$set(this.flowTempForm, "id", "");
    },
    getOrgList(org) {
      console.log("org", org);
      if (this.sendTempForm.stype === 0) {
        let nameArr = [];
        org.map((item) => {
          nameArr.push(item.unitName);
          this.sendTempForm.txnIttChnlCgyCodeArr.push(item.id);
        });
        this.sendTempForm.txnIttChnlCgyCodeArrName = nameArr.join(",");
      } else {
        this.$set(this.flowTempForm, "txnIttChnlCgyCode", org.unitName);
        this.flowTempForm.id = org.id;
      }
    },
    //请求机构下拉框
    selectOrg(org) {
      this.searchData.orgName = org.unitName;
      this.searchData.groupId = org.id;
      this.searchData.multiTenancyId = "";
      this.$api.setting.workFlow
        .getBusiness({
          groupId: this.searchData.groupId,
          tplVldStcd: this.tplVldStcd,
        })
        .then((res) => {
          this.searchClassiOpt = res.data;
        });
    },
    //工作时长表格查询
    loadData() {
      const data = {
        code: "",
      };
      configsApis.workingTimeConfigList(data).then((res) => {
        console.log(res);
        this.pagination.total = res.total;
        this.tableData = JSON.parse(JSON.stringify(res.data));
      });
    },
    add() {
      this.$router.push({ name: "configDetail", query: { type: "0" } });
    },
    //删除
    delItem() {
      if (Object.keys(this.selectedRow).length === 0) {
        this.$message({
          type: "warning",
          message: "请选择至少一条数据",
        });
        return;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?")
        .then(() => {
          this.$api.setting.workFlow
            .delTipList({
              tplIds: this.selectedRow,
              multiTenancyId: this.searchData.multiTenancyId,
            })
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功！",
              });
              this.loadData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    cellClick(row) {
      this.$router.push({
        name: "configDetail",
        query: { type: "1", row: row },
      });
    },
    select(row) {
      this.selectedRow = [];
      row.map((item) => {
        this.selectedRow.push(item.pTplNo);
      });
    },
  },
  activated() {},
  mounted() {},
  created() {
    //加载机构下拉框
    this.loadData();
  },
};
</script>

<style lang="less" rel="stylesheet/less">
.mainProcessControl {
  min-height: 90vh;
  .flexSetting .el-form-item__content {
    display: flex;
  }
  .el-transfer {
    width: 100%;
  }
  .el-transfer .el-transfer-panel {
    width: 37% !important;
  }
}
</style>
