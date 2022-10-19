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
        <el-button type="primary" size="small" v-if="haveData" style="float: right;margin-right: 20px;" @click="handleAddData">新增参数配置方案</el-button>
      </el-row>
    </el-form>
    <m-table
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isPagination="true"
      :isHandle="false"
      @current-change="handleCurrentChange"
      @handleSelectionChange="handleSelectionChange"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @cellClick="cellClick"
      v-loading="tableLoading"
      :default-sort="sortDate"
    ></m-table>

    <el-dialog
      :visible.sync="dialogVisible"
      v-dialogDrag
      :modal-append-to-body="false"
      title="收文参数配置"
      @closed="reset('ruleForm')"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo_ruleForm"
      >
        <div style="height:500px;">
          <el-scrollbar style="height:100%;">
            <el-row>
              <el-col>
                <h3 class="titleGroup">文件要素配置</h3>
              </el-col>
              <el-col>
                <el-form-item label="机构名称" prop="orgName">
                  <el-input v-model="ruleForm.orgName" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="紧急程度" prop="emergencyLevel">
                  <el-input v-model="ruleForm.emergencyLevel"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="保管期限" prop="keepLimit">
                  <el-input v-model="ruleForm.keepLimit"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="秘密类型" prop="secretType">
                  <el-input v-model="ruleForm.secretType"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="保密期限" prop="secretTimeType">
                  <el-input v-model="ruleForm.secretTimeType"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="是否立项督办" prop="hitFlag">
                  <el-radio v-model="ruleForm.hitFlag" :label="1" class="alternative">是</el-radio>
                  <el-radio v-model="ruleForm.hitFlag" :label="0" class="alternative">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="国家密级" prop="countrySecretFlagType">
                  <el-input v-model="ruleForm.countrySecretFlagType"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="商业密级" prop="businessSecretFlagType">
                  <el-input v-model="ruleForm.businessSecretFlagType"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="本行实物收文接收人员" prop="receiverPersonCn">
                  <!--字段里为"本行实物发文接收人员"?-->
                  <el-input v-model="ruleForm.receiverPersonCn"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col>
            <el-form-item label="协办部门" prop="countrySecretFlagType">
              <el-input v-model="ruleForm.countrySecretFlagType"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="自动办结期限" prop="countrySecretFlagType">
              <span>自收文日期</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              <span>个月后自动办结</span>
            </el-form-item>
              </el-col>-->
              <el-col>
                <el-form-item label="是否查看收文流程" prop="isRecFlow">
                  <el-radio v-model="ruleForm.isRecFlow" :label="1" class="alternative">是</el-radio>
                  <el-radio v-model="ruleForm.isRecFlow" :label="0" class="alternative">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col>
                <h3 class="titleGroup">发送要素配置</h3>
              </el-col>
              <el-col>
                <el-form-item label="直发范围" prop="directSendRange">
                  <el-input v-model="ruleForm.directSendRange"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="直发文件种类" prop="directSendType">
                  <el-input v-model="ruleForm.directSendType"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <h3 class="titleGroup">版本配置</h3>
              </el-col>
              <el-col>
                <el-form-item class="is-required" label="实物收文版本" prop="receiveVersion">
                  <el-radio
                    v-model="ruleForm.receiveVersion"
                    :label="1"
                    class="alternative"
                  >传统版本（承办部门顺序签批）</el-radio>
                  <el-radio
                    v-model="ruleForm.receiveVersion"
                    :label="2"
                    class="alternative"
                  >多承办同时签批版本</el-radio>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="是否有主题词" prop="isTopic">
                  <el-radio v-model="ruleForm.isTopic" :label="1" class="alternative">是</el-radio>
                  <el-radio v-model="ruleForm.isTopic" :label="0" class="alternative">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          </el-scrollbar>
        </div>
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
import selectOrgOrDept from "components/select/selectOrgOrDept";

const tableCol = [
  { label: "机构名称", prop: "orgName", align: "center" },
  { label: "国家密级", prop: "countrySecretFlagType", align: "center" },
  { label: "商业密级", prop: "businessSecretFlagType", align: "center" },
  { label: "紧急程度", prop: "emergencyLevel", align: "center" },
  { label: "保管期限", prop: "keepLimit", align: "center" },
  { label: "秘密类型", prop: "secretType", align: "center" },
  { label: "保密期限", prop: "secretTimeType", align: "center" },
  { label: "直发范围", prop: "directSendRange", align: "center" },
  { label: "直发文种类", prop: "directSendType", align: "center" }
];

export default {
  name: "Fwcspz",
  components: { mTable, selectOrgOrDept },

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
      sortDate: [{ prot: "date", order: "descnding" }],
      pagination: {
        pageNum: 1,
        totalCount: 10,
        limit: 10
      },
      referForm: {
        function: "selectDicByPage",
        page: 1, //当前页数
        limit: 10, //每页条数
        totalCount: 0,
        unitId: this.unitId,
        manager:'1',
      },
      rules: {
        secretType: [
          { required: true, message: "请输入秘密类型", trigger: "blur" }
        ],
        secretTimeType: [
          { required: true, message: "请输入保密期限", trigger: "blur" }
        ],
        countrySecretFlagType: [
          { required: true, message: "请输入国家密级", trigger: "blur" }
        ],
        businessSecretFlagType: [
          { required: true, message: "请输入商业密级", trigger: "blur" }
        ]
      },
      ruleForm: {
        function: "saveOrUpdateDic",
        orgName: "",
        emergencyLevel: "",
        hitFlag: "",
        countrySecretFlagType: "",
        receiverPersonCn: "",
        isRecFlow: "",
        directSendRange: "",
        directSendType: "",
        receiveVersion: "",
        id: "",
        keepLimit: "",
        secretType: "",
        secretTimeType: "",
        secretFlagType: "",
        businessSecretFlagType: "",
        unitId: this.unitId,
        manager:'1',
      },
      orgName: "",
      haveData: true
    };
  },
  methods: {
    // 选择机构
    selectOrg(org) {
      // debugger
      this.unitName = org.unitName;
      this.unitId = org.id;
      // this.orgName=org.orgName
      console.log(org, this.unitName, this.unitId);
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
        this.unitId = JSON.parse(localStorage.getItem("userInfo")).unitId;
        this.addDis = false;
        this.identity = true;
      } else {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(localStorage.getItem("userInfo")).unitId;
        this.addDis = true;
        this.identity = false;
      }
      console.log(this.unitName, this.unitId);
    },
    handleLoadData() {
      // debugger
      this.referForm.unitName = this.unitName;
      this.referForm.unitId = this.unitId;
      //  this.referForm.orgName=this.orgName
      this.$post
        .postData(
          "selectDicByPage",
          JSON.stringify(this.referForm),
          this.$businessCode.swgl
        )
        .then(res => {
          // res.data.rows[0].orgName = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
          this.tableData = res.data.rows || [];
          if (this.tableData.length >= 1) {
            this.haveData = false;
          } else {
            this.haveData = true;
          }
          this.pagination.total = res.data.total;
        });
    },
    handleOnSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
    },
    handleAddData() {
      this.ruleForm.orgName = this.unitName;
      this.ruleForm.unitId = this.unitId;
      this.dialogVisible = true;
      // this.ruleForm.orgName = JSON.parse(localStorage.getItem('userInfo')).shortUnitName;
    },
    handleSaveQX() {
      this.dialogVisible = false;
      this.handleLoadData();
    },
    reset(formName) {
      this.ruleForm.orgName = "";
      this.ruleForm.emergencyLevel = "";
      this.ruleForm.hitFlag = "";
      this.ruleForm.countrySecretFlagType = "";
      this.ruleForm.receiverPersonCn = "";
      this.ruleForm.isRecFlow = "";
      this.ruleForm.directSendRange = "";
      this.ruleForm.directSendType = "";
      this.ruleForm.receiveVersion = "";
      this.ruleForm.id = "";
      this.ruleForm.keepLimi = "";
      this.ruleForm.secretType = "";
      this.ruleForm.secretTimeType = "";
      this.ruleForm.secretFlagType = "";
      this.ruleForm.businessSecretFlagType = "";
      this.ruleForm.unitId = "";
      this.ruleForm.keepLimit = "";
      this.ruleForm.isTopic = "";
      this.$refs[formName].clearValidate();
      this.$refs[formName].resetFields();
    },
    handleSave() {
      if (this.ruleForm.secretType == "") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入秘密类型",
          duration: 1000
        });
        return;
      }
      if (this.ruleForm.secretTimeType == "") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入保密期限",
          duration: 1000
        });
        return;
      }
      if (this.ruleForm.countrySecretFlagType == "") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入国家密级",
          duration: 1000
        });
        return;
      }
      if (this.ruleForm.businessSecretFlagType == "") {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请输入商业密级",
          duration: 1000
        });
        return;
      }
      if (
        this.ruleForm.receiveVersion != "1" &&
        this.ruleForm.receiveVersion != "2"
      ) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择实物收文版本",
          duration: 1000
        });
        return;
      }
      this.ruleForm.unitId = this.unitId;
      let obj = Object.assign(this.ruleForm,{
        unitId: this.unitId,
        manager:'1',
      })
      this.$post
        .postData(
          "saveOrUpdateDic",
          JSON.stringify(obj),
          this.$businessCode.swgl
        )
        .then(res => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.dialogVisible = false;
          this.handleLoadData();
          //this.reset()
          // for (const key in this.ruleForm) {
          //   delete this.ruleForm[key]
          // }
        });
    },
    cellClick(row, column, cell, event) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "saveOrUpdateDic"
      });
    },
    handleSelectionChange(val) {
      let idsArr = [];
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id);
      }
      console.log(idsArr);
      this.deleteIds = idsArr.join(",");
      console.log(this.deleteIds);
    },
    handleBatchDelete() {
      this.$post
        .postData(
          "deleteDicById",
          JSON.stringify({ 
            function: "deleteDicById", 
            id: this.deleteIds
          }),
          this.$businessCode.swgl
        )
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.handleLoadData();
        });
    }
  },
  created() {
    this.$api.setting.organization
      .getTree({
        unitClass: 1,
        unitCode: "1"
      })
      .then(res => {
        this.unitName = res.data[0].unitName || "";
        this.unitId = res.data[0].unitCode || "";
        this.handleLoadData();
      });
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
