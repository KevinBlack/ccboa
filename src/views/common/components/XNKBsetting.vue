<template>
  <div>
    <el-form label-width="120px" class="mt20">
      <el-row>
        <el-button type="primary" size="small" style="float: right;margin-right: 50px;" @click="handleBatchDelete">批量删除</el-button>
        <el-button type="primary" size="small" style="float: right;margin-right: 20px;" @click="handleAddData">新增热词</el-button>
      </el-row>
    </el-form>
    <m-table
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isPagination="true"
      :isHandle="false"
      @select="handleSelectionChange"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
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
      title="热点列表配置"
      @closed="reset('ruleForm')"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="160px"
        class="demo_ruleForm"
      >
        <el-row>
          <el-col>
            <h3 class="titleGroup">热点列表配置</h3>
          </el-col>
          <el-col >
            <el-form-item label="热词" class="is-required"  props="name" ref="name">
              <el-input
                v-model="ruleForm.name"
                placeholder="请输入"
                style="width:100%"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="排序" class="is-required" prop="sort">
              <el-input v-model="ruleForm.sort" @input="isNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSaveQX">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";

const tableCol = [
  { label: "热词", prop: "name", align: "center" },
  { label: "排序", prop: "sort", align: "center" }
];

export default {
  name: "XNKBsetting",
  components: { mTable },
  data() {
    return {
      dialogVisible: false,
      unitId:JSON.parse(localStorage.getItem("userInfo")).unitId,
      dspcPrmShow: false,
      tableData: [],
      tableCols: tableCol,
      deleteIds: "",
      tableLoading: false,
      sortDate: [{ prot: "date", order: "descnding" }],
      pagination: {
        pageNum: 1,
        totalCount:0,
        limit: 20
      },
      referForm: {
        function: "hotspotList",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0,
        orgId: JSON.parse(localStorage.getItem("userInfo")).unitId
      },
      ruleForm: {
        function: "saveHotspotInfo",
        id:"",
        name: "",
        sort: "",
        orgId: JSON.parse(localStorage.getItem("userInfo")).unitId
      },
    };
  },
  methods: {
    isNumber(){
      this.ruleForm.sort = this.ruleForm.sort.replace(/\D/g,'')
    },
    handleLoadData() {
      
      this.$post
        .postData(
          "hotspotList",
          JSON.stringify(this.referForm),
          this.$businessCode.xnkb
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.totalCount = res.data.total;
        });
    },
    handleOnSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
    },
    handleAddData() {
      this.ruleForm.unitId = this.unitId;
      this.dialogVisible = true;
      // this.ruleForm.orgName = JSON.parse(localStorage.getItem('userInfo')).shortUnitName;
    },
    handleSaveQX() {
      this.dialogVisible = false;
      this.handleLoadData();
    },
    handleSave() {
      if (this.ruleForm.name == "") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入热词",
          duration: 1000
        });
        return;
      }
      if (this.ruleForm.sort == "") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入排序",
          duration: 1000
        });
        return;
      }
      this.ruleForm.orgId = this.unitId;
      this.$post
        .postData(
          "saveHotspotInfo",
          JSON.stringify(this.ruleForm),
          this.$businessCode.xnkb
        )
        .then(res => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.dialogVisible = false;
          this.handleLoadData();
        });
    },
    cellClick(row, column, cell, event) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "saveHotspotInfo"
      });
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
          "delHotspotInfo",
          JSON.stringify({
            function: "delHotspotInfo",
            ids: this.deleteIds
          }),
          this.$businessCode.xnkb
        )
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.handleLoadData();
        });
    },
    reset(formName) {
      this.ruleForm = {
        function: "saveHotspotInfo",
        orgName: "",
        sendOrgName: "",
        remark: "",
        id: "",
        unitId: ""
      };
      this.$refs[formName].clearValidate();
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.referForm.orgId = this.ruleForm.orgId = this.unitId 
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
.mt20 {
  padding: 20px;
}
</style>
