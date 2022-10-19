<template>
  <!-- 参数维护接收跨行签报配置 -->
  <div  v-cloak>
    <div class="dispatchcswhqbzlwhpage">
      <el-row style="display: flex;justify-content:flex-start;">
        <!-- <el-col :span="4" style="margin-left: 20px;">
          <select-org-or-dept @select="selectOrg">
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择"
              v-model="unitName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col> -->
        <!-- <el-col :span="14" style="margin-left: 20px;">
          <el-button type="primary" size="small" @click="handleLoadData('str')">查询</el-button>
        </el-col> -->
        <el-col :span="2" style="text-align: left;">
          <el-button type="primary" size="small" @click="handleAddData">新建</el-button>
        </el-col>
        <el-col :span="2" style="text-align: left;">
          <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
        </el-col>
      </el-row>
      <el-col style="margin: 5px 0;">
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
      <el-dialog
        v-dialogDrag
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        title="接收跨行签报配置"
      >
        <div class="bank_dispach_annotation">
          <p class="bank_dispach_annotation_current">参数间以英文半角“;”进行分隔</p>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo_ruleForm"
        >
          <el-col>
            <el-form-item label="审批机构" prop="orgName" ref="orgName">
              <el-input v-model="ruleForm.orgName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="序号">
              <el-input v-model="ruleForm.sort"  oninput="value=value.replace(/[^\;\d\*\ ]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="跨行签报类别">
              <el-input v-model="ruleForm.qianbaoKhType"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <div
              :class="['el-form-item is-required el-form-item--small',{'is-error':!ruleForm.qingshiOrgName&& qingshiOrgNameCheck}]"
            >
              <label for="qingshiOrgName" class="el-form-item__label" style="width: 120px;">请示机构</label>
              <div class="el-form-item__content" style="margin-left: 120px;">
                <div
                  class="el-input el-input--small is-disabled el-input-group el-input-group--append"
                >
                  <input
                    type="text"
                    ref="qingshiOrgNameError"
                    v-model="ruleForm.qingshiOrgName"
                    disabled="disabled"
                    autocomplete="off"
                    class="el-input__inner"
                  />
                  <div class="el-input-group__append">
                    <button
                      type="button"
                      @click="getTreeData('qsjg')"
                      class="el-button el-button--default el-button--small"
                    >
                      <i class="el-icon-plus"></i>
                    </button>
                  </div>
                </div>
                <div
                  v-if="!ruleForm.qingshiOrgName && qingshiOrgNameCheck"
                  :class="{'el-form-item__error':!ruleForm.qingshiOrgName}"
                >请输入请示机构</div>
              </div>
            </div>
          </el-col>
          <el-col>
            <div
              :class="['el-form-item is-required el-form-item--small',{'is-error':!ruleForm.shenpiDeptName&& shenpiDeptNameCheck}]"
            >
              <label for="shenpiDeptName" class="el-form-item__label" style="width: 120px;">审批部门</label>
              <div class="el-form-item__content" style="margin-left: 120px;">
                <div
                  class="el-input el-input--small is-disabled el-input-group el-input-group--append"
                >
                  <input
                    type="text"
                    ref="shenpiDeptNameError"
                    v-model="ruleForm.shenpiDeptName"
                    disabled="disabled"
                    autocomplete="off"
                    class="el-input__inner"
                  />
                  <div class="el-input-group__append">
                    <button
                      type="button"
                      @click="getTreeData('spbm')"
                      class="el-button el-button--default el-button--small"
                    >
                      <i class="el-icon-plus"></i>
                    </button>
                  </div>
                </div>
                <div
                  v-if="!ruleForm.shenpiDeptName && shenpiDeptNameCheck"
                  :class="{'el-form-item__error':!ruleForm.shenpiDeptName}"
                >请输入审批部门</div>
              </div>
            </div>
          </el-col>
          <!-- <el-col>
              <el-form-item label="请示机构" prop="qingshiOrgName" ref="qingshiOrgName">
              <el-input v-model="ruleForm.qingshiOrgName" disabled>
                <el-button slot="append" @click="getTreeData('qsjg')" icon="el-icon-plus"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
              <el-form-item label="审批部门" prop="shenpiDeptName" ref="shenpiDeptName">
                <el-input v-model="ruleForm.shenpiDeptName" disabled>
                  <el-button slot="append" @click="getTreeData('spbm')" icon="el-icon-plus"></el-button>
                </el-input>  
              </el-form-item>
          </el-col> -->
          
          
          <el-col>
            <el-form-item label="备注">
              <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSave('save')">保存</el-button>
        </div>
      </el-dialog>
    </div>
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :checkOrg="checkOrg"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
    ></treeCofig>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import treeCofig from "@/components/tree/tree-fawen";
import uploadFiles from "@/components/uploadFile/uploadFile";
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const tableCols = [
  { label: "跨行签报类别", prop: "qianbaoKhType", align: "center" },
  { label: "请示机构", prop: "qingshiOrgName", align: "center" },
  { label: "审批部门", prop: "shenpiDeptName", align: "center" },
  { label: "备注", prop: "remark", align: "center" }
];
export default {
  name: "Qxjdbpz",
  components: {
    mTable,
    treeCofig,
    uploadFiles,
    searchForm,
    selectOrgOrDept
  },
  data() {
    return {
      unitName: "",
      unitId: "",
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
      qingshiOrgNameCheck: false,
      shenpiDeptNameCheck:false,
      // 上传
      uploadConfig: {
        id: "",
        url: "uploadFiles",
        code: "",
        filesHas: [],
        noattachTitleCheck: true
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
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      draftCheckData: [], //拟稿部门选中数据
      singelCheckF: true, // 树单选true 多选为false
      dialogState: false,
      treeData: [], //树数据
      seletOptionsData: [], //弹窗下拉框数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      dispatchcswhcspz: {
        function: "queryListTcReciveKhConfig",
        page: 1,
        limit: 20,
        // unitId: ""
      },
      //拟稿部门树
      bank_main: {
        function: "getCurrUnitTreeTree",
        // flag: true,
        // showMyDept: true
      },
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      tableCols: tableCols,
      tableLoading: false,
      dialogVisible: false,
      tableData: [],
      deleteIds: "",
      checkedArr: [],
      ruleForm: {
        orgName: "",
        id:"",
        qianbaoKhType: "",
        qingshiOrgName: "",
        qingshiOrgId:"",
        shenpiDeptId:"",
        shenpiDeptName: "",
        sort: "",
        remark: ""
      },
      shenpiDeptIdData:[],
      qingshiOrgData:[],
      doSaveOrUpdateTcReciveKhConfig: {
        function: "doSaveOrUpdateTcReciveKhConfig",
        id: ""
      },
      treeTradeCode: "", //完成并发送  树  拆
      //强制性要求
      rules: {
        orgName: [
          { required: true, message: "请输入审批机构", trigger: "blur" }
        ],
        qingshiOrgName: [
          { required: true, message: "请输入请示机构", trigger: "change" }
        ],
        shenpiDeptName: [
          { required: true, message: "请输入审批部门", trigger: "change" }
        ]
      },
      checkOrg: true, //全选
    };
  },
  methods: {
    // 选择机构
    // selectOrg(org) {
    //   this.unitName = org.unitName;
    //   this.unitId = org.id;
    //   console.log(org, this.unitName , this.unitId);
    // },
    // // 判断登陆人是否业务管理员或系统管理员
    // addDrafOrgNm() {
    //   let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
    //   this.draforgnmPeople = manger.filter(item => {
    //     return (
    //       item.codeType === "manager_type" && item.dicCode === "sys_manager"
    //     );
    //   });
    //   if (this.draforgnmPeople.length !== 0) {
    //     this.searchDataInfo = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).shortUnitName;
    //     this.searchDataInfoId = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).unitId;
    //     this.addDis = false;
    //     this.identity = true;
    //   } else {
    //     this.searchDataInfo = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).shortUnitName;
    //     this.searchDataInfoId = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).unitId;
    //     this.addDis = true;
    //     this.identity = false;
    //   }
    // },
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
          names = names.join(";");
          ids = ids.join(";");
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        switch (dtype) {
           case "qsjg":
          this.ruleForm.qingshiOrgId =ids;
          this.ruleForm.qingshiOrgName =names;
          this.qingshiOrgData = this.checkData;
          break;
          case "spbm":
          this.ruleForm.shenpiDeptId =ids;
          this.ruleForm.shenpiDeptName =names;
          this.shenpiDeptIdData = this.checkData;
          break;
          // case "draft":
          //   this.ruleForm.qingshiOrgName = names;
          //   this.ruleForm.qingshiOrgNameId = ids;
          //   this.draftCheckData = this.checkData;
          //   break;
          // case "zhu":
          //   this.ruleForm.ownDepartment = names;
          //   this.ruleForm.assistDeptId = ids;
          //   this.xieCheckData = this.checkData;
          //   break;
        }
      }

      this.dialogState = !this.dialogState;
      if (!this.dialogState && type == "dosend" && this.dialogTypeBack) {
        //关闭弹窗 并确认完成发送
        this.saveSending();
      }
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.ruleForm[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "qsjg") {
          this.ruleForm.qingshiOrgId = '';
          this.qingshiOrgData =[]
          // this.ruleForm.draftDeptId = "";
          // this.chenCheckData = [];
        }
        if (name === "spbm") {
           this.ruleForm.shenpiDeptId='';
           this.shenpiDeptIdData =[];
          // this.ruleForm.assistDeptId = '';
          // this.xieCheckData = [];
        }
        
      }
    },
    //弹窗回显数据
    backDialogData(type) {
      switch (type) {
        case "qsjg":
          this.checkIds = this.ruleForm.qingshiOrgId
            ? this.ruleForm.qingshiOrgId.split(";")
            : [];
          this.qingshiOrgData = this.ruleForm.qingshiOrgName
          ? this.qingshiOrgData
          : [];
          this.checkData = this.qingshiOrgData;
          break;
          case "spbm":
          this.checkIds = this.ruleForm.shenpiDeptId
            ? this.ruleForm.shenpiDeptId.split(";")
            : [];
          this.shenpiDeptIdData = this.ruleForm.shenpiDeptName
            ? this.shenpiDeptIdData
            : [];
          this.checkData = this.shenpiDeptIdData;
          break;
      }
    },
    //数据转换
    concatTreeData(id, name) {
      let ids = [];
      let names = [];
      let obj = [];
      ids = id.split(";");
      names = name.split(";");
      ids.map((item, n) => {
        obj.push({
          id: item,
          name: names[n]
        });
      });
      return obj;
    },
    //请求部门树数据
    getTreeData(n) {
      let name = "";
      let that = this;
      this.canTab = false;
      this.singelCheckF = false;
      this.dialogType = "hui";
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      // this.clearCheckData(n);

      if(n == 'qsjg'){
        this.dialogTit = "请示机构";
        this.bank_main.openSub = true;
        this.bank_main.openCurrFistDept = false;
      }else {
        this.dialogTit = "审批部门";
        this.bank_main.openSub = false;
        this.bank_main.openCurrFistDept = true;
      }
      this.showCompDialog();
      this.bank_main.wfeUnitId = this.unitId

      this.$post
        .postData(
          "getCurrUnitTreeTree",
          JSON.stringify(this.bank_main),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          this.treeData = (res && res.data) || [];
        });
    },
    // 初始化列表及分页
    handleLoadData(str) {
      sessionStorage.setItem('QBLIST',JSON.stringify(this.dispatchcswhcspz));
      // this.dispatchcswhcspz.unitName = this.unitName
      // this.dispatchcswhcspz.unitId = this.unitId
      if(str){
        this.dispatchcswhcspz.page = 1;
        this.pagination.page = 1;
      }
      this.$post
        .postData(
          "queryListTcReciveKhConfig",
          JSON.stringify(this.dispatchcswhcspz),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.dispatchcswhcspz.page = res.data.page;
          this.pagination.total = res.data.total;

          //已上传的文件
          // this.uploadConfig.filesHas = this.ruleForm.templateFileInfo;
          // this.ruleForm.attachSort = [];

          if(res.data.page>res.data.pages){
            this.dispatchcswhcspz.page = res.data.pages;
            this.pagination.page = res.data.pages;
            this.handleLoadData()
          }
        });
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
      this.$post
        .postData(
          "queryByIdTcReciveKhConfig",
          JSON.stringify({ function: "queryByIdTcReciveKhConfig", id: row.id }),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.ruleForm = Object.assign(this.ruleForm, res.data);
          // this.ruleForm = res.data
          this.ruleForm['function'] = 'doSaveOrUpdateTcReciveKhConfig'
          this.dialogVisible = true;
          // console.log(this.ruleForm.templateFileInfo.length);
          if (res.data.qingshiOrgId) {
            this.qingshiOrgData = this.concatTreeData(
              res.data.qingshiOrgId,
              res.data.qingshiOrgName,
              "qsjg"
            );
          } else {
            this.qingshiOrgData = [];
            this.checkIds = [];
          }

          if (res.data.shenpiDeptId) {
            this.shenpiDeptIdData = this.concatTreeData(
              res.data.shenpiDeptId,
              res.data.shenpiDeptName,
              "spbm"
            );
          } else {
            this.shenpiDeptIdData = [];
            this.checkIds = [];
          }
          //上传附件
          // this.uploadConfig.id = row.id;
        });
      // this.handleSave();
    },

    handleShowTitle(index, row) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "doSaveOrUpdateTcReciveKhConfig"
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
          "doDeleteByIdsTcReciveKhConfig",
          JSON.stringify({
            function: "doDeleteByIdsTcReciveKhConfig",
            id: this.deleteIds
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
        // orgName :this.unitName,
        // orgId :this.unitId,
        orgName:JSON.parse(localStorage.getItem('userInfo')).shortUnitName,
        orgId : JSON.parse(localStorage.getItem('userInfo')).unitId,
        qianbaoKhType :"",
        qingshiOrgName: "",
        qingshiOrgId:"",
        shenpiDeptId:"",
        shenpiDeptName: "",
        sort :"",
        remark :"",
        id :"",
      }
      this.checkIds =[];
      this.shenpiDeptIdData=[],
      this.qingshiOrgData=[],
      // this.qingshiOrgId =[];
      // this.qingshiOrgName =[];
      // this.shenpiDeptId =[];
      // this.shenpiDeptName =[];
      // this.uploadConfig.id ="";
      this.dialogVisible = true;
    },
    // 点击保存
    handleSave(type) {
      if (!this.scrollIntoForm()) {
        //表单校验不通过
        return;
      }
      if (this.ruleForm.id && !type) {
        this.cellClick({ id: this.ruleForm.id });
        return;
      }
      
      this.ruleForm.function = "doSaveOrUpdateTcReciveKhConfig";
      this.$post
        .postData(
          "doSaveOrUpdateTcReciveKhConfig",
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
            if (type) {
              this.handleLoadData();
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
          if (type && type != "uploadfile") {
            this.dialogVisible = false;
          }
          if (type) {
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
          if (type && type != "uploadfile") {
            this.dialogVisible = false;
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
      this.qingshiOrgNameCheck = true;
      this.shenpiDeptNameCheck = true;
      if (!(this.ruleForm.qingshiOrgName && this.ruleForm.shenpiDeptName)) {
        flag = false;
      }
      return flag;
    },
    //保存时校验
    saveCheck() {
      if (!this.scrollIntoForm()) {
        //表单校验不通过
        return;
      }
      if (
        !this.ruleForm.qingshiOrgName ||
        !this.ruleForm.shenpiDeptName ||
        !this.ruleForm.orgName
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
    if(sessionStorage.getItem('QBLIST')){
      this.dispatchcswhcspz = Object.assign(this.dispatchcswhcspz,JSON.parse(sessionStorage.getItem('QBLIST')))
    }
    this.pagination = {
      page: this.dispatchcswhcspz.page, //第几页
      total: this.dispatchcswhcspz.totalCount, //共有条数
      limit: this.dispatchcswhcspz.limit, //每页条数
    }
    this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
    this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId
    //初始化修改交易线 (传后台)
    this.uploadConfig.code = this.$businessCode.qbglfj;
    this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //流程交易线   chai
    this.handleLoadData();
    // this.$api.setting.organization
    // .getTree({
    //   unitClass:1,
    //   unitCode: "1",
    // })
    // .then((res) => {
    //   this.unitName = res.data[0].unitName||'';
    //   this.unitId = res.data[0].unitCode||'';
    //   this.uploadConfig.code = this.$businessCode.qbglfj;
    //   this.uploadConfig.flowTranId = this.treeTradeCode = this.$businessCode.qbgl; //流程交易线   chai
    //   this.handleLoadData();
    // })
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
      width: 300px;
      height: 42px;
      line-height: 42px;
      white-space: nowrap;
      text-align: right;
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
/deep/ .dispatchcswhqbzlwhpage{
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
    margin-top: 10px;
}
</style>