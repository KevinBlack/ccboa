<template>
  <div>
    <div class="dispatchparameterspage">
      <el-row>
        <div style="margin: 15px 0">
          <el-button type="primary" style="margin-left:20px;" @click="create_btn">新建</el-button>
          <!-- <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button> -->

          <!-- <el-col :span="4" style="text-align: right;">
          <el-button type="primary" size="small" @click="handleAddData">新增参数配置方案</el-button>
          </el-col>-->
          <!-- <el-col> -->
            <el-button type="primary" size="small" @click="handleBatchDelete">删除</el-button>
          <!-- </el-col> -->

          <!-- <el-col :span="12" class="mgn-b-10">
        <el-button type="primary" size="small" v-if="haveData" @click="handleAddData">新增参数配置方案</el-button>
      </el-col>
      <el-col :span="12" class="txtRight mgn-b-10">
        <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
          </el-col>-->
        </div>
      </el-row>
      <m-table
        size="medium"
        :isSelection="true"
        :isIndex="true"
        :isPagination="true"
        :isHandle="false"
        @select="handleSelectionChange"
        @selection-change="handleSelectionChange"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        @cellClick="cellClick"
        v-loading="tableLoading"
      ></m-table>
      <el-dialog
        :visible.sync="dialogVisible"
        v-dialogDrag
        :modal-append-to-body="false"
        @close="handleSaveQX"
        title="部门配置"
      >

        <el-form ref="ruleForm" :model="ruleForm" label-width="120px">
          <el-row>
            <el-col>
              <el-form-item label="是否启用" prop="isStartUse">
                <el-radio-group v-model="ruleForm.isStartUse">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="序号" prop="sort">
                <!--字段里为"本行实物发文接收人员"?-->
                <el-input v-model="ruleForm.sort"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="部门名称" prop="deptName">
                <el-input v-model="ruleForm.deptName"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="部门等同名" prop="eqDeptName">
                <el-input v-model="ruleForm.eqDeptName" readonly="readonly" placeholder="请选择">
                  <el-button slot="append" @click="getTreeData('chen')" icon="el-icon-plus"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="部门类别" prop="deptClass">
                <el-radio-group v-model="ruleForm.deptClass">
                  <el-radio label="管理部门"></el-radio>
                  <el-radio label="经营部门"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleSaveQX">取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </el-dialog>
      <treeCofig
        :treeData="treeData"
        :useNewDialog="useNewDialog"
        :chenBanOnly= "chenBanOnly"
        :canTab="canTab"
        :loadingTree="loadingTree"
        :hasRadio="hasRadio"
        :dialogType="dialogType"
        :dialogTypeNow="dialogTypeNow"
        :dialogTit="dialogTit"
        :checkIds="checkIds"
        :checkData="checkData"
        :singelCheckF="singelCheckF"
        :dialogState="dialogState"
        :offenUse="offenUse"
        :fromdata="ruleForm"
        :seletOptionsData="seletOptionsData"
        @showCompDialog="showCompDialog"
        :treeTradeCode="treeTradeCode"
      ></treeCofig>
    </div>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import treeCofig from "@/components/tree/tree-fawen";

const tableCol = [
  { label: "部门名称", prop: "deptName", align: "center" },
  { label: "统计等同名", prop: "eqDeptName", align: "center" },
  { label: "部门类别", prop: "deptClass", align: "center" },
  { label: "启用", prop: "isStartUse", align: "center" }
];

export default {
  name: "Fwcspz",
  components: { mTable, treeCofig },
  data() {
    return {
      useNewDialog:false,
      chenBanOnly:false,
      treeTradeCode: "",
      treeData: [],
      singelCheckF: true,
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      shouCheckData: [], //承办选中数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      seletOptionsData: [], //弹窗下拉框数据
      dialogState: false,
      dialogTit: "", // 弹框标题
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      loadingTree: false,
      undertakeDeptIdData: { function: "unitTreeAll", openSubDept: true },
      tableLoading: false,
      ruleForm: {
        function: "doSaveOrUpdateByDeptInfo",
        isStartUse: "是",
        sort: "",
        deptName: "",
        eqDeptName: "",
        eqDeptId: "",
        deptClass: ""
      },
      dialogVisible: false,
      tableData: [],
      tableCols: tableCol,
      deleteIds: "",
      pagination: {
        pageNum: 1,
        total:0,
        limit: 20
      },
      referForm: {
        function: "selectByPageDeptInfo",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0
      },
      haveData: true
    };
  },
  methods: {
    create_btn() {
      this.dialogVisible = true;
    },
    handleLoadData() {
      this.ruleForm.unitName = this.unitName;
      this.ruleForm.unitId = this.unitId;
      this.$post
        .postData(
          "selectByPageDeptInfo",
          JSON.stringify(this.referForm),
          this.$businessCode.swgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          if (this.tableData.length >= 1) {
            this.haveData = false;
          } else {
            this.haveData = true;
          }

          this.pagination.total = res.data.total;
        });

    },
    handleSizeChange(val) {
     this.pagination.limit = val;
     this.referForm.limit = val;
      this.tableData = [];
      this.handleLoadData();
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.referForm.page = val;
      this.tableData = [];
      this.handleLoadData();
    },
    handleAddData() {
      this.dialogVisible = true;
      this.ruleForm.orgName = JSON.parse(
        localStorage.getItem("userInfo")
      ).shortUnitName;
    },
    handleSaveQX() {
      this.dialogVisible = false;
      //this.handleLoadData();
      this.resetFrom()
    },
    handleSave() {
      this.$post
        .postData(
          "doSaveOrUpdateByDeptInfo",
          JSON.stringify(this.ruleForm),
          this.$businessCode.swgl
        )
        .then(res => {
          if (res.code == "SUCCESS") {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          }
          this.handleLoadData();
          this.dialogVisible = false;
        });
         this.resetFrom()

    },
    cellClick(row, column, cell, event) {
      this.dialogVisible = true;
      this.ruleForm = Object.assign(this.ruleForm, row);
    },
    handleSelectionChange(val) {
      this.checkedArr = val;
      const idsArr = [];
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id);
      }
      this.deleteIds = idsArr.join(",");
    },
    handleBatchDelete() {
      if (this.deleteIds === "") {
        this.$message({
          type: "error",
          message: "请选择要删除的数据!"
        });
        return;
      }
      this.$post
        .postData(
          "doDeleteByIdDeptInfo",
          JSON.stringify({
            function: "doDeleteByIdDeptInfo",
            ids: this.deleteIds
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          if(res.success==true){
            this.$message({
            type: "success",
            message: "删除成功!"
          });

          }

          this.handleLoadData();
        });
    },
    // 单位选择
    getTreeData(n) {
      let obj = {};
      let name = "";
      this.offenUse = false;
      this.dialogTypeNow = n;
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.singelCheckF = false;
      this.treeData = [];
      this.chenBanOnly = false;
      this.useNewDialog = false;
      //手动清空时处理
      switch (n) {
        case "chen":
          //this.bank_main
          this.chenBanOnly = false;
          this.useNewDialog = false;
          name = "承办部门";
          obj = Object.assign(obj, this.undertakeDeptIdData);
          clearName = "eqDeptName";
          break;
        case "lai":
          //  this.useNewDialog = true;
          obj = Object.assign(obj, this.sendOrgIdData);
          name = "来文单位";
          clearName = "receiveOrgName";
          break;
      }
      this.clearCheckData(clearName);
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          "getForwordOrgDept",
          JSON.stringify(obj),
          this.$businessCode.swglgg
        )
        .then(res => {
          that.treeData = (res && res.data) || [];
        });
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.ruleForm[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeOrganName") {
          this.ruleForm.undertakeOrganId = "";
          this.chenCheckData = [];
        }
        if (name === "receiveOrgName") {
          this.ruleForm.sendOrgId = "";
          this.shouCheckData = [];
        }
      }
    },
    resetFrom() {
      this.ruleForm.isStartUse = "是";
      this.ruleForm.sort = "";
      this.ruleForm.deptName = "";
      this.ruleForm.eqDeptName = "";
      this.ruleForm.eqDeptId = "";
      this.ruleForm.deptClass = "";
      this.ruleForm.directSendRange="";
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
        }

        switch (dtype) {
          case "chen":
            // debugger;
            this.ruleForm.eqDeptName = names.join(",");
            this.ruleForm.eqDeptId = ids.join(",");
            this.chenCheckData = this.checkData;
            break;
          case "lai":
            this.ruleForm.receiveOrgName = names.join(",");
            this.ruleForm.receiveOrgId = ids.join(",");
            this.shouCheckData = this.checkData;
            break;
        }
      }

      this.dialogState = !this.dialogState;
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //弹窗回显数据
    backDialogData(type) {
      let newA = [];
      switch (type) {
        case "chen":
          this.checkIds = this.ruleForm.undertakeOrganId;
          break;
      }
    }
  },
  created() {
    this.treeTradeCode = this.$businessCode.swglgg;
    this.handleLoadData();
  }
};
</script>

<style lang="less" scoped>
.titleGroup {
  color: #409eff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
}
/deep/ .dispatchparameterspage {
  .tree-div {
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
</style>
