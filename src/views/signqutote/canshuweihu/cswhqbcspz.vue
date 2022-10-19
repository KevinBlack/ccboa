<template>
  <!-- 参数维护签报参数配置 -->
  <div>
    <div class="dispatchcswhqbcspz">
      <el-row>
        <el-col :span="12" style="margin-bottom: 10px;">
          <el-button type="primary" size="small" @click="handleAddData" v-if="addcswhqbcspz">新建</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;margin-bottom: 10px;">
          <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
        </el-col>
      </el-row>
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

      <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" title="签报参数配置">
        <div class="bank_dispach_annotation">
          <p class="bank_dispach_annotation_current">参数间以英文半角“;”进行分隔</p>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="210px"
          class="demo_ruleForm"
        >
          <el-col>
            <el-form-item label="机构名称" prop="orgName" ref="orgName">
              <el-input v-model="ruleForm.orgName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="签报类型" prop="qianbaoType" ref="qianbaoType">
              <el-input v-model="ruleForm.qianbaoType"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="紧急程度">
              <el-input v-model="ruleForm.emergencyLevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="秘密类型" prop="secretType" ref="secretType">
              <el-input v-model="ruleForm.secretType"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="商业秘密" prop="businessSecret" ref="businessSecret">
              <el-input v-model="ruleForm.businessSecret"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="解密条件" prop="secretLimit" ref="secretLimit">
              <el-input v-model="ruleForm.secretLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="秘密标志" prop="secretFlag" ref="secretFlag">
              <el-input v-model="ruleForm.secretFlag"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="工作秘密标志" prop="workSecurity" ref="workSecurity">
              <el-input v-model="ruleForm.workSecurity"></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="启用二维码" prop="twoDimensionalCode" ref="twoDimensionalCode">
              <el-radio v-model="ruleForm.twoDimensionalCode" label="1">启用</el-radio>
              <el-radio v-model="ruleForm.twoDimensionalCode" label="0">不启用</el-radio>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="跨行签报办理期限（天）" prop="qianbaoLimit" ref="qianbaoLimit" >
              <el-input v-model="ruleForm.qianbaoLimit" type="number"></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="自动办结期限（月）" prop="autoClose" ref="autoClose" >
              <el-input v-model="ruleForm.autoClose"  type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字数超限原因最少字数限制" prop="reasonLimit" ref="reasonLimit">
              <el-input v-model="ruleForm.reasonLimit"  type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字数超限原因不能包含关键字" prop="reasonLimitWord" ref="reasonLimitWord">
              <el-input v-model="ruleForm.reasonLimitWord"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="会签意见字数限制（字）" prop="signOptionLimit" ref="signOptionLimit">
              <el-input v-model="ruleForm.signOptionLimit"  type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="默认正文模版" prop="template" ref="template">
              <el-input v-model="ruleForm.template"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" >取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";

const tableCols = [
  { label: "签报类型", prop: "qianbaoType", align: "center" },
  { label: "紧急程度", prop: "emergencyLevel", align: "center" },
  { label: "秘密类型", prop: "secretType", align: "center" },
  { label: "密级", prop: "businessSecret", align: "center" },
  { label: "保密期限", prop: "secretLimit", align: "center" }
];

export default {
  name: "Qxjdbpz",
  components: {
    mTable
  },
  data() {
    return {
      dispatchcswhcspz: {
        function: "getTcQbsignParamDicByPage",
        page: 1,
        limit: 10
      },
      pagination: {
        pageNum: 1, //第几页
        total: 10, //共有条数
        pageSize: 10 //每页条数
      },
      tableCols: tableCols,
      tableLoading: false,
      dialogVisible: false,
      // dspcPrmShow: false,
      addcswhqbcspz: true,
      tableData: [],
      deleteIds: "",
      checkedArr: [],
      unitForm: {
        function: "getOrgInfo"
      },
      ruleForm: {
        function: "addTcDeptTypeDic",
        orgName: "",
        qianbaoType: "",
        emergencyLevel: "",
        secretFlag: "",
        secretType: "",
        businessSecret: "",
        twoDimensionalCode: "",
        qianbaoLimit: "",
        autoClose: "",
        workSecurity: "",
        reasonLimit: "",
        reasonLimitWord: "",
        signOptionLimit: "",
        template: "",
        secretLimit:""
      },
      //强制性要求
       rules: {
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        qianbaoType: [
          { required: true, message: "请输入签报类型", trigger: "blur" }
        ],
      secretType: [
          { required: true, message: "请输入秘密类型", trigger: "blur" }
        ],
      businessSecret: [
          { required: true, message: "请输入商业秘密", trigger: "blur" }
        ],
      secretLimit: [
          { required: true, message: "请输入解密条件", trigger: "blur" }
        ],
      secretFlag: [
          { required: true, message: "请输入秘密标志", trigger: "blur" }
        ],
      workSecurity: [
          { required: true, message: "请输入工作秘密标志", trigger: "blur" }
        ],
      twoDimensionalCode: [
          { required: true, message: "请输入启用二维码", trigger: "blur" }
        ],
      qianbaoLimit: [
          { required: true, message: "请输入跨行签报办理期限（天）", trigger: "blur"}
        ],
      autoClose: [
          { required: true, message: "请输入自动办结期限", trigger: "blur" }
        ],
      reasonLimit: [
          { required: true, message: "请输入字数超限原因最少字数限制", trigger: "blur" }
        ],
      reasonLimitWord: [
          { required: true, message: "请输入字数超限原因不能包含关键字", trigger: "blur" }
        ],
      signOptionLimit: [
          { required: true, message: "请输入会签意见字数限制", trigger: "blur" }
        ],
      template: [
          { required: true, message: "请输入默认正文模版", trigger: "blur" }
        ],
       },
      // haveData: true,
      baowenzd: "A08461305"
    };
  },
  methods: {
    // 初始化列表及分页
    handleLoadData() {
      this.$post
        .postData(
          "getTcQbsignParamDicByPage",
          JSON.stringify(this.dispatchcswhcspz),
          this.baowenzd
        )
        .then(res => {
          this.tableData = res.data.rows;
          if (this.tableData.length>=1) {
            this.addcswhqbcspz = false;
          }else{
            this.addcswhqbcspz = true;
          }
          this.dispatchcswhcspz.page = res.data.page;
          this.pagination.total = res.data.total;
        });
      this.$post
        .postData("getOrgInfo", JSON.stringify(this.unitForm), this.baowenzd)
        .then(res => {
          this.ruleForm.orgName = res.data.unitName;
          this.ruleForm.orgId = res.data.unitId;
        });
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.dispatchcswhcspz.page = val;
      this.pagination.pageNum = val;
      this.tableData = [];
      this.handleLoadData();
    },
    //每页条数
    handleSizeChange(val) {
      this.dispatchcswhcspz.limit = val;
      this.pagination.pageSize = val;
      this.tableData = [];
      this.handleLoadData();
    },
    //点击每行数据弹窗弹出
    cellClick(row, column, cell, event) {
      this.$post
        .postData(
          "getTcQbsignParamDicById",
          JSON.stringify({ function: "getTcQbsignParamDicById", id: row.id }),
          this.baowenzd
        )
        .then(res => {
          this.ruleForm = Object.assign({}, res.data, {
            function: "saveOrUpdateTcQbsignParamDic"
          });
          if (this.ruleForm.twoDimensionalCode) {
            this.ruleForm.twoDimensionalCode = "1";
          } else {
            this.ruleForm.twoDimensionalCode = "0";
          }
          this.dialogVisible = true;
        });
    },

    handleShowTitle(index, row) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "saveOrUpdateTcQbsignParamDic"
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
    // 批量删除
    handleBatchDelete() {
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择要删除的字段！"
        });
        return;
      }
      this.$post
        .postData(
          "deleteTcQbsignParamDicEntityListById",
          JSON.stringify({
            function: "deleteTcQbsignParamDicEntityListById",
            id: this.deleteIds
          }),
          this.baowenzd
        )
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.handleLoadData();
        });
    },
    handleSelect() {},
    handleAddData() {
      this.ruleForm.qianbaoType = "";
      this.ruleForm.emergencyLevel = "";
      this.ruleForm.secretType = "";
      this.ruleForm.businessSecret = "";
      this.ruleForm.secretLimit = "";
      this.ruleForm.secretFlag = "";
      this.ruleForm.workSecurity = "";
      this.ruleForm.twoDimensionalCode = "";
      this.ruleForm.qianbaoLimit = "";
      this.ruleForm.autoClose = "";
      this.ruleForm.reasonLimit = "";
      this.ruleForm.reasonLimitWord = "";
      this.ruleForm.signOptionLimit = "";
      this.ruleForm.template = "";
      this.dialogVisible = true;
    },
    // 点击保存
    handleSave() {
       if(!this.scrollIntoForm()){
        //表单校验不通过
        return;
      };
      this.ruleForm.function = "saveOrUpdateTcQbsignParamDic";
      this.$post
        .postData(
          "saveOrUpdateTcQbsignParamDic",
          JSON.stringify(this.ruleForm),
          this.baowenzd
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
    //表单校验滚动
    scrollIntoForm() {
      let that = this;
      let flag = true;
      this.$refs.ruleForm.validate((valid, object) => {
        if (!valid) {
          let split = "";
          for (let i in object) {
            let dom = that.$refs[i];
            dom.$el.scrollIntoView({
              block: "center",
              behavior: "smooth"
            });
            flag = false;
            break;
          }
          
        }
      });
      return flag;
    },
    //保存时校验
    saveCheck() {
      if(!this.scrollIntoForm()){
        //表单校验不通过
        return;
      };
      if (
        !this.ruleForm.orgName ||
        !this.ruleForm.qianbaoType ||
        !this.ruleForm.secretType ||
        !this.ruleForm.businessSecret ||
        !this.ruleForm.secretLimit ||
        !this.ruleForm.secretFlag ||
        !this.ruleForm.workSecurity ||
        !this.ruleForm.twoDimensionalCode ||
        !this.ruleForm.qianbaoLimit ||
        !this.ruleForm.autoClose ||
        !this.ruleForm.reasonLimit ||
        !this.ruleForm.reasonLimitWord ||
        !this.ruleForm.signOptionLimit ||
        !this.ruleForm.template
      ) {
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: tips,
          duration: 1000
        });
        return false;
      }
    },
  },
  created() {
    this.handleLoadData();
  }
};
</script>

<style  lang="less" rel="stylesheet/less" scoped>
.bank_dispach_annotation {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #fef7e7;
  border: 1px solid #ff6600;
  display: flex;
  font-size: 12px;
  margin: 40px 0;
  position: relative;
  .bank_dispach_annotation_current {
    padding: 0 30px 0 10px;
    span {
      color: #ff6600;
    }
  }
  .bank_article_illustrates {
    position: absolute;
    top: 3px;
    right: 10px;
  }
}
</style>