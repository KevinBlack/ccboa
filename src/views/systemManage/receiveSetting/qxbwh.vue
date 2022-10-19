<template>
  <div class="dispatchparameterspage" style="min-height:500px;">
    <el-form label-width="120px" class="mt20">
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构名称">
            <select-org-or-dept @select="selectOrg">
              <el-input
                type="text"
                readonly="readonly"
                placeholder="请选择"
                v-model="unitName"
                suffix-icon="el-icon-arrow-down"
              />
            </select-org-or-dept>
          </el-form-item>
        </el-col>
        <el-button type="primary" size="small" style="margin-left: 50px;" @click="handleLoadData()">查询</el-button>
        <el-button type="primary" size="small" style="float: right;margin-right: 50px;" @click="handleBatchDelete">批量删除</el-button>
        <el-button type="primary" size="small" style="float: right;margin-right: 20px;" @click="handleAddData">新增参数配置方案</el-button>
      </el-row>
    </el-form>
    <m-table
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isPagination="true"
      :isHandle="false"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      @handleSelectionChange="handleSelectionChange"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @cellClick="cellClick"
      v-loading="tableLoading"
      :page-sizes="[10,15,20,25,30]"
    ></m-table>

    <el-dialog :visible.sync="dialogVisible" v-dialogDrag :modal-append-to-body="false" title="期限表维护" @closed="reset('ruleForm')">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo_ruleForm"
      >
        <el-row>
          <el-col>
            <h3 class="titleGroup">类别配置</h3>
          </el-col>
          <el-col>
            <el-form-item label="机构名称" prop="orgName">
              <el-input v-model="ruleForm.orgName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <h3 class="titleGroup">期限表配置</h3>
          </el-col>
          <el-col>
            <el-form-item label="适用部门" prop="ownerDeptName">
              <el-input v-model="ruleForm.ownerDeptName">
                <el-button slot="append" icon="el-icon-plus" @click="bankmain('hui')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="保管期限" prop="limitDate">
              <el-select v-model="ruleForm.limitDate" placeholder="请选择" style="width:100%" :required="true">
                <el-option
                  v-for="keep_limititem in keep_limit"
                  :key="keep_limititem.value"
                  :label="keep_limititem.value"
                  :value="keep_limititem.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="条目描述" prop="mark">
              <el-input v-model="ruleForm.mark"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="ruleForm.sort" type="number"></el-input>
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
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :treeTradeCode="treeTradeCode"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    ></treeCofig>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import treeCofig from "components/tree/tree-fawen";
import selectOrgOrDept from "components/select/selectOrgOrDept";

const tableCol = [
  { label: "机构名称", prop: "orgName", align: "center" },
  { label: "适用部门", prop: "ownerDeptName", align: "center" },
  { label: "保管期限", prop: "limitDate", align: "center" },
  { label: "排序", prop: "sort", align: "center" }
];

export default {
  name: "Fwcspz",
  components: { mTable, treeCofig,selectOrgOrDept },
  data() {
    return {
        searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      tableCols: tableCol,
      deleteIds: "",
      tableLoading: false,
      pagination: {
        pageNum: 1,
        totalCount: 10,
        limit: 20
      },
      referForm: {
        function: "selectQXHDBPage",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount:0,
        unitName: "",
        unitId: "",
      },
      unitForm: {
        function: "getOrgInfo"
      },
      getJDBDropDownDataSource: {
        function: "getJDBDropDownDataSource",
        unitName: "",
        unitId: "",
      },
      ruleForm: {
        function: "saveOrUpdateQXHDB",
        orgName: "",
        mark: "",
        ownerDeptName: "",
        limitDate: "",
        id: "",
        sort: "",
        ownerDeptId: "",
        unitId: "",
      },
      keep_limit: "",
      // 强制性要求
      rules: {
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        ownerDeptName: [
          { required: true, message: "请输入适用部门", trigger: ["blur","change"] }
        ],
        limitDate: [
          { required: true, message: "请选择办理期限", trigger: ["blur","change"] }
        ]
      },
      bank_mainXiao: {
        function: "unitTreeByFirst",
        unitCode:"",
        flag: true
      },
      optionDepartInitial: "",
      checkedArr: [],
      dialogTit: "选择下一处理环节和处理人", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据
      zhuCheckData: [], //主抄送选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      treeTradeCode:'',//人员树交易线
      loadingTree:false,
    };
  },
  methods: {
         // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
      this.ruleForm.unitName = org.unitName;
      this.ruleForm.unitId = org.id;
      this.referForm.unitName = org.unitName;
      this.referForm.unitId = org.id;
      this.getJDBDropDownDataSource.unitName = org.unitName;
      this.getJDBDropDownDataSource.unitId = org.id;
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
      this.draforgnmPeople = manger.filter(item => {
        return (
          item.codeType === "manager_type" && item.dicCode === "sys_manager"
        );
      });
      if (this.draforgnmPeople.length !== 0) {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = false;
        this.identity = true;
      } else {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = true;
        this.identity = false;
      }
      console.log(this.unitName,this.unitId)
    },
    // 初始化列表及分页
    handleLoadData() {
      this.$post
        .postData(
          "selectQXHDBPage",
          JSON.stringify(this.referForm),
          this.$businessCode.swgl
        )
        .then(res => {
          if(res.success){
            if(res.data){
              this.tableData = res.data.rows;
              this.referForm.page = res.data.page;
              this.pagination.total = res.data.total;
            }
          }else{
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 2000
            });
          }
        });
      this.$post
        .postData(
          "getJDBDropDownDataSource",
          JSON.stringify(this.getJDBDropDownDataSource),
          this.$businessCode.swgl
        )
        .then(res => {
          if(res.success){
            this.keep_limit = res.data && res.data.keep_limit;
          }else{
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: res.message,
              duration: 2000
            });
          }
        });
    },
    handleSizeChange(val) {
      this.referForm.limit = val;
      this.pagination.pageSize = val;
      this.tableData = [];
      this.handleLoadData();
    },
    handleCurrentChange(val) {
      this.referForm.page = val;
      this.pagination.pageNum = val;
      this.tableData = [];
      this.handleLoadData();
    },
    handleAddData() {
      this.dialogVisible = true;
      this.reset( 'ruleForm');
    },
    handleSaveQX(){
      this.dialogVisible = false;
      this.handleLoadData();
    },
    handleSave() {
      if(this.ruleForm.ownerDeptName == ''){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入适用部门",
          duration: 1000
        });
        return
      }
      if(this.ruleForm.limitDate == ''){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择办理期限",
          duration: 1000
        });
        return
      }
      // if(this.ruleForm.orgName == ''){
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "请输入机构名称",
      //     duration: 1000
      //   });
      //   return
      // }
      this.$post
        .postData(
          "saveOrUpdateQXHDB",
          JSON.stringify(this.ruleForm),
          this.$businessCode.swgl
        )
        .then(res => {
          if(res && res.success){
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.dialogVisible = false;
            this.handleLoadData();
          }else{
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
    },
    cellClick(row, column, cell, event) {
      this.$post
        .postData(
          "selectQXHDBById",
          JSON.stringify({ function: "selectQXHDBById", id: row.id, unitName:this.unitName,unitId:this.unitId}),
          this.$businessCode.swgl
        )
        .then(res => {
          this.ruleForm = Object.assign({}, res.data, {
            function: "saveOrUpdateQXHDB",
            unitId:this.unitId
          });
          this.dialogVisible = true;
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
      console.log(this.deleteIds)
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择要删除的字段！"
        });
        return;
      }
      this.$post
        .postData(
          "deleteQXHDBById",
          JSON.stringify({ function: "deleteQXHDBById", ids: this.deleteIds,unitName:this.unitName,unitId:this.unitId }),
          this.$businessCode.swgl
        )
        .then(res => {
          if(res && res.success){
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.handleLoadData();
          }else{
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
    },
    //树弹框
    bankmain() {
      this.dialogTit = "选择部门";
      this.treeData = [];
      this.dialogType = "hui";
      this.hasRadio = true;
      this.canTab = false;
      this.singelCheckF = true;
      this.showCompDialog();
      this.bank_mainXiao.unitCode=this.ruleForm.unitId || this.ruleForm.orgId;
      this.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify(this.bank_mainXiao),
          this.$businessCode.swglgg
        )
        .then(res => {
          if (res.message == "Loading") {
            this.loadingTree = true;
          } else {
            this.loadingTree = false;
          }
          this.treeData = (res && res.data) || [];
        });
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params) {
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
          names = names.join(";");
          ids = ids.join(";");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        this.ruleForm.ownerDeptName = names;
        this.ruleForm.ownerDeptId = ids;
        this.zhuCheckData = this.checkData;
        this.$forceUpdate();
      }

      this.dialogState = !this.dialogState;
      if (this.dialogState) {
        this.backDialogData();
      }
    },
    //弹窗回显数据
    backDialogData() {
      this.checkIds = this.ruleForm.ownerDeptId
        ? this.ruleForm.ownerDeptId.split(";")
        : [];
      this.checkData = this.zhuCheckData;
    },
    reset(formName){
      this.ruleForm={
        function: "saveOrUpdateQXHDB",
        orgName: this.unitName,
        mark: "",
        ownerDeptName: "",
        limitDate: "",
        id: "",
        sort: "",
        ownerDeptId: "",
        unitId: this.unitId,
      };
      this.$refs[formName].clearValidate();
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.treeTradeCode=this.$businessCode.swglgg;
     this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.ruleForm.unitName = this.unitName;
      this.ruleForm.unitId = this.unitId;
      this.referForm.unitName = this.unitName;
      this.referForm.unitId = this.unitId;
      this.getJDBDropDownDataSource.unitName = this.unitName;
      this.getJDBDropDownDataSource.unitId = this.unitId;
       this.handleLoadData();
    })
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
