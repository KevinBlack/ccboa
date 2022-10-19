<template>
  <!-- 参数维护签报参数配置 -->
  <div v-cloak>
    <div class="dispatchcswhqbcspz">
      <el-form label-width="120px" class="mt20">
        <el-row style="margin-bottom: 5px;">
          <el-col :span="8" style="margin-left: 20px;">
            <el-form-item label="机构名称">
              <select-org-or-dept @select="selectOrg" :disabled="!isGly">
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
          <el-col :span="10" style="margin-left: 20px;">
            <el-button type="primary" size="small" @click="handleLoadData('str')">查询</el-button>
          </el-col>
          <el-col :span="4" style="text-align: right;">
            <el-button type="primary" size="small" @click="handleAddData" v-if="addcswhqbcspz">新建</el-button>
            <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-col style="margin: 10px 0;">
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
        :default-sort="sortDate"
      ></m-table>
      </el-col>
      <el-dialog v-dialogDrag  :visible.sync="dialogVisible" :modal-append-to-body="false" title="签报参数配置">
        <div style="height:600px;overflow:scroll;">
          <el-scrollbar style="padding: 0px 15px 0 0;">
            <div class="bank_dispach_annotation">
              <p class="bank_dispach_annotation_current">参数间以英文半角“;”进行分隔</p>
            </div>
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="200px"
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
                <el-form-item label="跨行签报类型" prop="qianbaoTypeKH" ref="qianbaoTypeKH">
                  <el-input v-model="ruleForm.qianbaoTypeKH"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="紧急程度">
                  <el-input v-model="ruleForm.emergencyLevel"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="电子签报秘密类型" prop="secretType" ref="secretType">
                  <el-input v-model="ruleForm.secretType"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="实物签报秘密类型" prop="qianbaoTypeSW" ref="qianbaoTypeSW">
                  <el-input v-model="ruleForm.qianbaoTypeSW"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="商业秘级" prop="businessSecret" ref="businessSecret">
                  <el-input v-model="ruleForm.businessSecret"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="国家秘级" prop="countriesCecret" ref="countriesCecret">
                  <el-input v-model="ruleForm.countriesCecret"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="解密条件" prop="secretLimit" ref="secretLimit">
                  <el-input v-model="ruleForm.secretLimit"></el-input>
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
                <el-form-item label="出部门生成文号控制" prop="isOutDeptCheck" ref="isOutDeptCheck">
                  <el-radio v-model="ruleForm.isOutDeptCheck" label="1">校验</el-radio>
                  <el-radio v-model="ruleForm.isOutDeptCheck" label="0">不校验</el-radio>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="跨行签报办理期限（天）" prop="qianbaoLimit" ref="qianbaoLimit">
                  <el-input v-model="ruleForm.qianbaoLimit" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"></el-input>
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="自动办结期限（月）" prop="autoClose" ref="autoClose">
                  <el-input v-model="ruleForm.autoClose" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="字数超限原因最少字数限制" prop="reasonLimit" ref="reasonLimit">
                  <el-input v-model="ruleForm.reasonLimit" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="字数超限原因不能包含关键字" prop="reasonLimitWord" ref="reasonLimitWord">
                  <el-input v-model="ruleForm.reasonLimitWord"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="会签意见字数限制（字）" prop="signOptionLimit" ref="signOptionLimit">
                  <el-input v-model="ruleForm.signOptionLimit" oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            
          </el-scrollbar>
          
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: right;">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import uploadFiles from "@/components/uploadFile/uploadFile";

import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";

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
    mTable,
    uploadFiles,
    searchForm,
    selectOrgOrDept
  },
  data() {
    return {
      isGly:false,
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: []
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },

      sortDate: [{ prot: "date", order: "descnding" }],
      dispatchcswhcspz: {
        function: "getTcQbsignParamDicByPage",
        page: 1,
        limit: 20
      },
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
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
        function: "",
        orgName: "",
        qianbaoType: "",
        emergencyLevel: "",
        // secretFlag: "",
        secretType: "",
        businessSecret: "",
        countriesCecret:"",
        qianbaoTypeSW:"",
        twoDimensionalCode: "",
        isOutDeptCheck:'1',
        qianbaoLimit: "",
        autoClose: "",
        workSecurity: "",
        reasonLimit: "",
        reasonLimitWord: "",
        signOptionLimit: "",
        secretLimit: "",
        qianbaoTypeKH: "",
        attachSort: [],
        // templateFileInfo: [],
        filePath: "",
        fileName: "",
      },
      //强制性要求
      rules: {
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        qianbaoType: [
          { required: true, message: "请输入签报类型", trigger: "blur" }
        ],
        qianbaoTypeKH: [
          { required: true, message: "请输入跨行签报类型", trigger: "blur" }
        ],
        secretType: [
          { required: true, message: "请输入秘密类型", trigger: "blur" }
        ],
        businessSecret: [
          { required: true, message: "请输入商业秘级", trigger: "blur" }
        ],
        secretLimit: [
          { required: true, message: "请输入解密条件", trigger: "blur" }
        ],
        workSecurity: [
          { required: true, message: "请输入工作秘密标志", trigger: "blur" }
        ],
        twoDimensionalCode: [
          { required: true, message: "请输入启用二维码", trigger: "blur" }
        ],
        isOutDeptCheck: [
          { required: true, message: "请选择出部门生成文号控制", trigger: "blur" }
        ],
        qianbaoLimit: [
          {
            required: true,
            message: "请输入跨行签报办理期限（天）",
            trigger: "blur"
          }
        ],
        autoClose: [
          { required: true, message: "请输入自动办结期限", trigger: "blur" }
        ],
        signOptionLimit: [
          { required: true, message: "请输入会签意见字数限制", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
      this.handleLoadData();
      console.log(org, this.unitName , this.unitId);
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
    handleLoadData(str) {
      sessionStorage.setItem('QBLIST',JSON.stringify(this.dispatchcswhcspz));
      this.dispatchcswhcspz.unitName = this.unitName
      this.dispatchcswhcspz.unitId = this.unitId
      // console.log("****", this.dispatchcswhcspz);
      if(str){
        this.dispatchcswhcspz.page = 1;
        this.pagination.page = 1;
      }
      this.$post
        .postData(
          "getTcQbsignParamDicByPage",
          JSON.stringify(this.dispatchcswhcspz),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          if (this.tableData.length >= 1) {
            this.addcswhqbcspz = false;
          } else {
            this.addcswhqbcspz = true;
          }

          
          //已上传的文件
          // this.uploadConfig.filesHas = this.ruleForm.templateFileInfo;
          this.ruleForm.attachSort = [];

          this.dispatchcswhcspz.page = res.data.page;
          this.pagination.total = res.data.total;

          if(res.data.page>res.data.pages){
            this.dispatchcswhcspz.page = res.data.pages;
            this.pagination.page = res.data.pages;
            this.handleLoadData()
          }
        });
      // this.$post
      //   .postData(
      //     "getOrgInfo",
      //     JSON.stringify(this.unitForm),
      //     this.$businessCode.qbgl
      //   )
      //   .then(res => {
      //     this.ruleForm.orgName = res.data.unitName;
      //     this.ruleForm.orgId = res.data.unitId;
      //   });
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.dispatchcswhcspz.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.handleLoadData();
    },
    //每页条数
    handleSizeChange(val) {
      this.dispatchcswhcspz.limit = val;
      this.pagination.limit = val;
      this.dispatchcswhcspz.page = this.pagination.page = 1;
      this.tableData = [];
      this.handleLoadData();
    },
    //点击每行数据弹窗弹出
    cellClick(row, column, cell, event) {
      // this.$post
      //   .postData(
      //     "getOrgInfo",
      //     JSON.stringify(this.unitForm),
      //     this.$businessCode.qbgl
      //   )
      //   .then(res => {
      //     this.ruleForm.orgName = res.data.unitName;
      //     this.ruleForm.orgId = res.data.unitId;
      //   });
        
      this.$post
        .postData(
          "getTcQbsignParamDicById",
          JSON.stringify({ function: "getTcQbsignParamDicById", id: row.id ,unitName:this.unitName,unitId:this.unitId}),
          this.$businessCode.qbgl
        )
        .then(res => {
          // this.ruleForm = Object.assign({}, res.data, {
          //   function: "saveOrUpdateTcQbsignParamDic"
          // });
          this.ruleForm = res.data
          this.ruleForm['function'] = 'saveOrUpdateTcQbsignParamDic'
          if (this.ruleForm.twoDimensionalCode) {
            this.ruleForm.twoDimensionalCode = "1";
          } else {
            this.ruleForm.twoDimensionalCode = "0";
          }
          if (this.ruleForm.isOutDeptCheck) {
            this.ruleForm.isOutDeptCheck = "1";
          } else {
            this.ruleForm.isOutDeptCheck = "0";
          }
          
          this.dialogVisible = true;
         //上传附件
         this.uploadConfig.id = row.id;
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
          message: "请选择一条数据进行删除！"
        });
        return;
      }
      this.$post
        .postData(
          "deleteTcQbsignParamDicEntityListById",
          JSON.stringify({
            function: "deleteTcQbsignParamDicEntityListById",
            id: this.deleteIds,
            unitName :this.unitName,
            unitId :this.unitId,
          }),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 1000
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "删除失败",
              duration: 1000
            });
          }
          this.handleLoadData();
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "删除失败",
            duration: 1000
          });
        });
    },
    handleSelect() {},
    handleAddData() {
      this.ruleForm = {
        orgName : this.unitName,
        orgId :this.unitId,
        qianbaoType :"",
        emergencyLevel :"",
        qianbaoTypeKH :"",
        secretType :"",
        businessSecret :"",
        countriesCecret :"",
        qianbaoTypeSW :"",
        secretLimit :"",
        // secretFlag :"",
        workSecurity :"",
        twoDimensionalCode :"",
        isOutDeptCheck:"",
        qianbaoLimit :"",
        autoClose :"",
        reasonLimit :"",
        reasonLimitWord :"",
        signOptionLimit :"",
        // templateFileInfo :"",
      }
      
      // orgName :th,s.unitName
      // this.ruleForm.orgId = this.unitId
      // this.ruleForm.qianbaoType = "";
      // this.ruleForm.emergencyLevel = "";
      // this.ruleForm.qianbaoTypeKH = "";
      // this.ruleForm.secretType = "";
      // this.ruleForm.businessSecret = "";
      // this.ruleForm.countriesCecret = "";
      // this.ruleForm.qianbaoTypeSW = "";
      // this.ruleForm.secretLimit = "";
      // this.ruleForm.secretFlag = "";
      // this.ruleForm.workSecurity = "";
      // this.ruleForm.twoDimensionalCode = "";
      // this.ruleForm.qianbaoLimit = "";
      // this.ruleForm.autoClose = "";
      // this.ruleForm.reasonLimit = "";
      // this.ruleForm.reasonLimitWord = "";
      // this.ruleForm.signOptionLimit = "";
      // this.ruleForm.templateFileInfo = "";
      this.dialogVisible = true;
    },
    // 点击保存
    handleSave(type) {
      if (!this.scrollIntoForm()) {
        //表单校验不通过
        return;
      }
      if(this.ruleForm.id&&type === "uploadfile"){
        this.cellClick({id:this.ruleForm.id});
      }
      // if (this.ruleForm.id&&(!this.ruleForm.templateFileInfo.length || !this.ruleForm.templateFileInfo[0].filePath || !this.ruleForm.templateFileInfo[0].fileName )) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "请上传模板",
      //     duation: 1000
      //   });
      //   return;
      // }

      this.ruleForm.function = "saveOrUpdateTcQbsignParamDic";
      this.ruleForm.unitName = this.ruleForm.orgName;
      this.ruleForm.unitId = this.ruleForm.orgId;
      this.$post
        .postData(
          "saveOrUpdateTcQbsignParamDic",
          JSON.stringify(this.ruleForm),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            
            if (type && type != "uploadfile") {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "保存成功",
                duration: 1000
              });
            }
            // this.$message({
            //   type: "success",
            //   showClose: true,
            //   offset: 400,
            //   message: "保存成功",
            //   duration: 1000
            // });
            //附件
            if (type === "uploadfile") {
              this.uploadConfig.id = res.data.id;
              this.$refs.uploadComponent.uploadFileNow();
            }
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "保存失败",
              duration: 1000
            });
          }

          if(type){
            this.dialogVisible = false;
            this.handleLoadData();
          }
          
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "保存失败",
            duration: 1000
          });
          if(type){
            this.dialogVisible = false;
            this.handleLoadData();
          }
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
      if (!this.scrollIntoForm()) {
        //表单校验不通过
        return;
      }
      if (
        !this.ruleForm.orgName ||
        !this.ruleForm.qianbaoType ||
        !this.ruleForm.qianbaoTypeKH ||
        !this.ruleForm.secretType ||
        !this.ruleForm.businessSecret ||
        !this.ruleForm.secretLimit ||
        // !this.ruleForm.secretFlag ||
        !this.ruleForm.workSecurity ||
        !this.ruleForm.twoDimensionalCode ||
        !this.ruleForm.isOutDeptCheck ||
        !this.ruleForm.qianbaoLimit ||
        !this.ruleForm.autoClose ||
        // !this.ruleForm.reasonLimit ||
        // !this.ruleForm.reasonLimitWord ||
        !this.ruleForm.signOptionLimit 
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
     // 附件上传下载排序
    upRow(n) {
      let midObj;
      this.ruleForm.attachSort.push(
        {
          id: this.ruleForm.templateFileInfo[n - 1].id,
          sort: this.ruleForm.templateFileInfo[n].sort
        },
        {
          id: this.ruleForm.templateFileInfo[n].id,
          sort: this.ruleForm.templateFileInfo[n - 1].sort
        }
      );
      midObj = this.ruleForm.templateFileInfo[n];
      this.ruleForm.templateFileInfo[n] = this.ruleForm.templateFileInfo[
        n - 1
      ];
      this.ruleForm.templateFileInfo[n - 1] = midObj;
      this.$forceUpdate();
    },
    downRow(n) {
      let midObj;
      this.ruleForm.attachSort.push(
        {
          id: this.ruleForm.templateFileInfo[n + 1].id,
          sort: this.ruleForm.templateFileInfo[n].sort
        },
        {
          id: this.ruleForm.templateFileInfo[n].id,
          sort: this.ruleForm.templateFileInfo[n + 1].sort
        }
      );
      midObj = this.ruleForm.templateFileInfo[n];
      this.ruleForm.templateFileInfo[n] = this.ruleForm.templateFileInfo[
        n + 1
      ];
      this.ruleForm.templateFileInfo[n + 1] = midObj;
      this.$forceUpdate();
    },
    deleteRow(n, id) {
      this.bank_deleteFileById.id = id;
      this.$post
        .postData(
          "deleteFileById",
          JSON.stringify(this.bank_deleteFileById),
          this.$businessCode.qbglfj
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              this.$message({
                type: "success",
                showClose: true,
                offset: 400,
                message: "删除成功",
                duration: 500
              });
              this.ruleForm.templateFileInfo.splice(n, 1);
              this.uploadConfig.filesHas = this.ruleForm.templateFileInfo;
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "删除失败",
                duration: 500
              });
            }
          }
        });
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.qbglfj
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
               downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                                    res.filePath +
                                    "&fileName=" +
                                    res.fileName, file.fileName);
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "下载失败",
                duration: 500
              });
            }
          }
        });
    },

  },
  created() {
    
    if(sessionStorage.getItem('QBLIST')){
      this.dispatchcswhcspz = Object.assign(this.dispatchcswhcspz,JSON.parse(sessionStorage.getItem('QBLIST')))
    }
    this.pagination = {
      page: this.dispatchcswhcspz.page, //第几页
      total: this.dispatchcswhcspz.totalCount, //共有条数
      limit: this.dispatchcswhcspz.limit, //每页条数
    }
    this.isGly = isGlyId();
    // this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
    // this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId
    // // //初始化修改交易线 (传后台)
    // this.uploadConfig.code = this.$businessCode.qbglfj;
    // this.handleLoadData();
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf:"1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.uploadConfig.code = this.$businessCode.qbglfj;
      this.handleLoadData();
    })
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
.el-scrollbar {
  height: 100%;
}
//上传附件
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size: 14px;
    .one_btn {
      width: 80px;
      height: 42px;
      line-height: 42px;
    }
    .btns {
      width: 200px;
      height: 42px;
      line-height: 42px;
      white-space: nowrap;
    }
    .name {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }
    .down {
      cursor: pointer;
    }
    .down:hover {
      color: #3b85ef;
    }
  }
}
.file_wp {
  margin-left: 0 !important;
}
/deep/ .dispatchcswhqbcspz{
  .tree-div{
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
.mt20 {
    margin-top: 7px;
}
</style>