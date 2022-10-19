<template>
  <!-- 期限鉴定表配置 -->
  <div>
    <div class="dispatchjgflpzpage">
      <el-row>
        <el-form
          label-width="120px"
        >
          <el-col :span="8">
            <el-form-item label="机构名称">
              <div class="dispatchcswhlshwh">
                <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                  <el-input
                    type="text"
                    readonly="readonly"
                    placeholder="请选择"
                    v-model="unitName"
                    suffix-icon="el-icon-arrow-down"
                  />
                </select-org-or-dept>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="部门" prop="draftDepartmentId">
              <el-input v-model="ruleForm.mainOrganNames" readonly="readonly">
                <el-button
                  slot="append"
                  icon="el-icon-arrow-down"
                  size="mini"
                  style="height:32px;margin-left:10px"
                  @click="selectDepartment"
                ></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="2">
            <el-button type="primary" @click="selectDepartment">选择</el-button>
          </el-col> -->
          <el-col :span="2" style="margin-left: 20px;">
            <el-button type="primary" size="small" @click="handleLoadData('1')">查询</el-button>
            <el-button type="primary" size="small" @click="handleCancel">重置</el-button>
          </el-col>
          <el-col :span="6" style="text-align: right;margin-bottom: 10px;">
            <el-button type="primary" size="small" @click="handleImport">导入</el-button>
            <el-button type="primary" size="small" @click="handleAddData">新增期限表条目</el-button>
            <el-button type="primary" size="small" @click="handleBatchDelete">批量删除</el-button>
          </el-col>
        </el-form>
      </el-row>
      <!-- <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          type="index"
          width="50"
          label="序号"
          align="center"
        ></el-table-column>
        <el-table-column prop="mark" label="条目描述" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="smart"
              @click="handleShowTitle(scope.$index, scope.row)"
            >{{ scope.row.mark }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="limitDate" label="保管期限" align="center"></el-table-column>
      </el-table>-->
      <m-table
        size="medium"
        :isSelection="true"
        :isIndex="false"
        :isPagination="true"
        :isHandle="false"
        @handleSelectionChange="handleSelectionChange"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        @cellClick="cellClick"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        v-loading="tableLoading"
        :page-sizes="[10,15,20,25,30]"
      ></m-table>

      <el-dialog :visible.sync="dialogVisible" v-dialogDrag :modal-append-to-body="false" :before-close="handleCancel" title="期限鉴定表配置">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo_ruleForm"
        >
          <el-col>
            <el-form-item label="机构名称">
              <el-input v-model="ruleForm.orgName" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="部门" prop="deptName">
              <el-input v-model="ruleForm.deptName" disabled>
                <el-button slot="append" icon="el-icon-plus" @click="bankmain('hui')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="保管期限">
              <!-- <el-radio-group
                v-model="ruleForm.limitDate"
                @change="handleLimitChange"
              >
                <el-radio
                  v-for="(item,index) in eleSecretTimeTypeList"
                  :key="index"
                  :label="item.label"
                >{{item.label}}</el-radio>
              </el-radio-group> -->
              <el-select
                v-model="ruleForm.limitDate"
                placeholder="请选择"
                style="width:100%"
                @change="handleLimitChange"
              >
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="(item,index) in eleSecretTimeTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.label"
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
            <el-form-item label="编号" prop="numberNo">
              <el-input v-model="ruleForm.numberNo"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel('1')">取 消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </el-dialog>
      <!--导入-->
      <el-dialog :visible.sync="importVisible" v-dialogDrag :modal-append-to-body="false" :before-close="handleImportCancel" title="导入保管期限表">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo_ruleForm"
        >
          <el-col>
            <el-form-item label="机构名称">
              <el-input v-model="ruleForm.orgName" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="部门" prop="deptName">
              <el-input v-model="ruleForm.deptName" disabled>
                <el-button slot="append" icon="el-icon-plus" @click="bankmain('hui')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="temp">
              <span slot="label"><b style="color: red;margin-right:3px;">*</b>导入excel文件</span>
              <uploadFiles
                ref="uploadComponent"
                v-if="ruleForm.attchmentFileInfo.length==0"
                @initsearch="initTabledata"
                :uploadConfig="uploadConfig"
              ></uploadFiles>
              <el-row>
                <el-col v-if="ruleForm.attchmentFileInfo.length!==0">
                  <el-scrollbar>
                    <div
                      v-for="(item,index) in ruleForm.attchmentFileInfo"
                      :key="item.id"
                      class="comp_list"
                    >
                      <template>
                        <el-row class="command_file">
                          <el-col
                            :span="18"
                            class="name down"
                            :title="item.file_name"
                            @click="viewFile(item)"
                          >{{item.file_name}}
                          </el-col>
                          <el-col :span="6" style="text-align:right;">
                            <el-button
                              type="warning"
                              size="mini"
                              @click.native="deleteRow(index,item.id)"
                              :disabled="item.disabled"
                              round
                            >删除</el-button>
                            <el-button type="primary" size="mini" @click.native="downFile(item)" round>下载</el-button>
                          </el-col>
                        </el-row>
                      </template>
                    </div>
                  </el-scrollbar>
                </el-col>
                <el-col>
                  <el-button type="text" class="colorRed" @click='downPiLiang'>点击此处下载模板</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="文件模板说明">
              <template>
                <span style="color: red;">注：<br>
                  1.请勿修改模板格式，请根据模板中提供的信息格式添加数据。<br>
                  2.导入数据前，请先选择部门。<br>
                  3.每次上传不得超过五百条。<br>
                  4.导入数据不可包含以下特殊符号：空格 \ / , " : ; * ? < > | . % • —
                </span>
              </template>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleImportCancel('1')">取 消</el-button>
          <el-button type="primary" @click="handleImportSave">确 定</el-button>
        </div>
      </el-dialog>
      <treeCofig
        :treeData="treeData"
        :canTab="canTab"
        :hasRadio="hasRadio"
        :dialogType="dialogType"
        :dialogTit="dialogTit"
        :checkIds="checkIds"
        :checkData="checkData"
        :singelCheckF="singelCheckF"
        :dialogState="dialogState"
        :offenUse="offenUse"
        :seletOptionsData="seletOptionsData"
        @showCompDialog="showCompDialog"
      ></treeCofig>
    </div>
    <Dialog ref="dialog" @checkNode="checkNode" :treeData="treeData" :orgId="orgId"></Dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import scrollIntoForm from '@/util/scrollValid'
import treeCofig from "components/tree/tree-fawen"
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
// import dispatchFJWH from "@/minixs/dispatchFJWH";
import Dialog from "@/views/dispatch/departDialog.vue";
import uploadFiles from "@/components/uploadFile/uploadSingelFile";

const tableCols = [
  { label: "编号", prop: "numberNo", align: "left", width: "100px" },
  { label: "条目描述", prop: "mark", align: "center" },
  { label: "保管期限", prop: "limitDate", align: "center", width: "120px" }
];

export default {
  name: "Qxjdbpz",
  components: {
    mTable,
    treeCofig,
    uploadFiles,
    // searchForm,
    Dialog,
    selectOrgOrDept
  },
  // mixins: [dispatchFJWH],
  data() {
    return {
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //删除附件
      bank_deleteFileById: {
        function: "deleteFileById",
        id: ""
      },
      // 上传
      uploadConfig: {
        id: "qxjdb",
        url: "uploadFiles",
        code: "",
        checkChange: false,
        noattachTitleCheck:true,
        width:'auto',
        attachTitle: ""
      },

      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份

      isGly:false,
      dispatchqxjdbpz: { 
        function: "getTcDictionaryLimit"
      },
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      tableCols: tableCols,
      tableLoading: false,
      dialogVisible: false,
      importVisible: false,
      dspcPrmShow: false,
      tableData: [],
      deleteIds: "",
      checkedArr: [],
      //xiaoM  主抄送false
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: true,
        wfeUnitId: '',
        showMyDept: true,
        unitCode:''
      },
      unitForm: {
        function: "getOrgInfo"
      },
      ruleForm: {
        function: "addTcDeptTypeDic",
        attchmentFileInfo: [],
        unitName: "",
        unitId: "",
        createTime: "",
        dept: "",
        deptName: "",
        deptIds: "",
        draftDepartmentId: "",
        applyDeptId: "",
        id: "",
        limitDate: "",
        mainOrganNames: "",
        mark: "",
        maxRows: "",
        organizationId: "",
        orgName: "",
        numberNo: "",
        start: ""
      },
      deptList: [],
      //强制性要求
      rules: {
        deptName: [
          {
            required: true,
            trigger: "blur",
            message: "请选择部门"
          }
        ],
        mark: [
          {
            required: true,
            trigger: "blur",
            message: "请填写条目描述"
          }
        ],
        numberNo: [
          {
            required: true,
            trigger: "blur",
            message: "请填写编号"
          }
        ],
      },
      haveData: true,
      dialogTit: "", // 弹框标题
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

      treeParams: {
        function: "unitTreeByFirst",
        flag: true,
        openSup: false,
        openSupDept: false,
        openCurr: true,
        openCurrFistDept: true,
        openEqual: false,
        openEqualDept: false,
        openSub: false,
        openSubDept: false,
        wfeUnitId: '',
        unitCode: ''
      },
      orgId: [],
      eleSecretTimeTypeList: []
    };
  },
  methods: {
    // 上传
    initTabledata(val) {
      this.ruleForm.attchmentFileInfo = (val&&JSON.parse(val).data)||[];
      this.ruleForm.filePath = this.ruleForm.attchmentFileInfo[0].file_path;
    },
    // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
      console.log(org, this.unitName , this.unitId);
      this.ruleForm.mainOrganNames = "";
      this.ruleForm.deptIds = "";
      this.ruleForm.draftDepartmentId = "";
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
    handleLoadData(val) {
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.bank_mainXiao.wfeUnitId = this.unitId
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      if(val=="1") {
        this.pagination.page = 1;
      }
      this.ruleForm.function = "getTcDictionaryLimit"
      this.$post
        .postData(
          "getTcDictionaryLimit",
          JSON.stringify(Object.assign({},this.ruleForm, this.pagination)),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.page = res.data.page;
          this.pagination.total = res.data.total;
        })
      // this.$post
      //   .postData("getOrgInfo", JSON.stringify(this.unitForm), this.$businessCode.fawgl)
      //   .then(res => {
      //     this.ruleForm.orgName = res.data.unitName;
      //     this.ruleForm.organizationId = res.data.unitId;
      //   });
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val
      this.tableData = []
      this.handleLoadData()
    },

    handleSizeChange(val) {
      this.pagination.limit = val
      this.pagination.page = 1
      this.tableData = []
      this.handleLoadData()
    },
    cellClick(row, column, cell, event) {
      this.$post
        .postData(
          "getTcDictionaryLimitById",
          JSON.stringify({ function: "getTcDictionaryLimitById", id: row.id, unitId: this.unitId }),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res.data)
          this.eleSecretTimeTypeList = res.data.eleSecretTimeType&&JSON.parse(res.data.eleSecretTimeType)
          let transStr = this.ruleForm.mainOrganNames, deptIds = this.ruleForm.deptIds, draftDepartmentId = this.ruleForm.draftDepartmentId;;
          this.ruleForm = Object.assign({}, res.data, {
            function: "addTcDictionaryLimit"
          });
          this.ruleForm.attchmentFileInfo = res.data.attchmentFileInfo&&JSON.parse(res.data.attchmentFileInfo)||[];
          this.ruleForm.mainOrganNames = transStr;
          this.ruleForm.unitName = this.ruleForm.orgName = this.unitName;
          this.ruleForm.unitId = this.ruleForm.organizationId = this.unitId;
          this.ruleForm.deptIds = deptIds;
          this.ruleForm.draftDepartmentId = draftDepartmentId;
          if (res.data.applyDeptId) {
          this.zhuCheckData = this.concatTreeData(
            res.data.applyDeptId,
            res.data.deptName,
            "dosend"
          );
        }
          this.dialogVisible = true;
        });
    },
    handleLimitChange(val) {
      console.log(val)
    },
    handleShowTitle(index, row) {
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm = Object.assign(this.ruleForm, {
        function: "addTcDictionaryLimit"
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
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择要删除的字段！"
        });
        return;
      } else {
        this.$confirm("是否确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post.postData("deleteTcDictionaryLimit", JSON.stringify({function: "deleteTcDictionaryLimit", id: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.handleLoadData("1");
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              offset: 100,
              showClose: true,
              message: "已取消删除",
              duation: 1000
            });
          });
      }      
    },
    handleAddData() {
      this.$post.postData(
        "getEleSecretTimeType",
        JSON.stringify({function: "getEleSecretTimeType", unitId: this.unitId}),
        this.$businessCode.fawgl
      )
      .then(res => {
        this.eleSecretTimeTypeList = res.data.eleSecretTimeType&&JSON.parse(res.data.eleSecretTimeType)
        this.handleCancel('1');
        this.dialogVisible = true;
        this.ruleForm.function = "addTcDeptTypeDic";
        this.checkData = []
        this.checkIds = []
        this.zhuCheckData = []
        this.ruleForm.orgName = this.ruleForm.unitName = this.unitName
        this.ruleForm.organizationId = this.ruleForm.unitId = this.unitId
      })
      
    },
    handleSave() {
      let that = this;
      if (!scrollIntoForm) {
        return
      }
      if (this.ruleForm.deptName=="") {
        that.$message({
          type: "error",
          message: "请选择部门!"
        });
        return;
      }
      if (this.ruleForm.mark=="") {
        that.$message({
          type: "error",
          message: "请填写条目描述!"
        });
        return;
      }
      if (this.ruleForm.numberNo=="") {
        that.$message({
          type: "error",
          message: "请填写编号!"
        });
        return;
      }
      this.ruleForm.function = 'addTcDictionaryLimit'
        this.$post.postData(
          "addTcDictionaryLimit",
          JSON.stringify(this.ruleForm),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.$message({
            type: "success",
            message: "保存成功!"
          })
          this.dialogVisible = false;
          let transStr = this.ruleForm.mainOrganNames;
          this.ruleForm = {
            function: "",
            attchmentFileInfo: [],
            unitName: "",
            unitId: "",
            createTime: "",
            deptName: "",
            deptIds: "",
            draftDepartmentId: "",
            applyDeptId: "",
            id: "",
            limitDate: "",
            mainOrganNames: "",
            mark: "",
            maxRows: "",
            organizationId: "",
            orgName: "",
            numberNo: "",
            start: ""
          }
          this.ruleForm.mainOrganNames = transStr;
          this.handleLoadData();
        });
    },
    handleCancel (e) {
      this.dialogVisible = false;
      if(e=="1") {
        let mainOrganNames = this.ruleForm.mainOrganNames, deptIds = this.ruleForm.deptIds, draftDepartmentId = this.ruleForm.draftDepartmentId;
        this.ruleForm = {
          function: "",
          attchmentFileInfo: [],
          unitName: "",
          unitId: "",
          createTime: "",
          deptName: "",
          deptIds: "",
          draftDepartmentId: "",
          applyDeptId: "",
          id: "",
          limitDate: "",
          mainOrganNames: "",
          mark: "",
          maxRows: "",
          organizationId: "",
          orgName: "",
          numberNo: "",
          start: ""
        }
        this.ruleForm.mainOrganNames = mainOrganNames;
        this.ruleForm.deptIds = deptIds;
        this.ruleForm.draftDepartmentId = draftDepartmentId;
      } else {
        this.ruleForm = {
          function: "",
          attchmentFileInfo: [],
          unitName: "",
          unitId: "",
          createTime: "",
          deptName: "",
          deptIds: "",
          draftDepartmentId: "",
          applyDeptId: "",
          id: "",
          limitDate: "",
          mainOrganNames: "",
          mark: "",
          maxRows: "",
          organizationId: "",
          orgName: "",
          numberNo: "",
          start: ""
        }
      }
      this.checkData = []
      this.checkIds = []
      this.zhuCheckData = []
      this.orgId = []
    },

     //主抄送弹框
    bankmain() {
      this.dialogTit = '选择部门';
      this.treeData = [];
      this.dialogType = 'hui';
      this.hasRadio = true;
      this.canTab = false;
      this.showCompDialog();
      this.$post.postData(
        "selUnitTreeByHQ",
        JSON.stringify(this.bank_mainXiao),
        this.$businessCode.fawgl
      ).then(res => {
        console.log(JSON.stringify(res.data));
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
          names = names.join(';');
          ids = ids.join(';');
        } else {
          names = "";
          ids = "";
          that.checkIds = [];
        }

        this.ruleForm.deptName = names;
        this.ruleForm.applyDeptId = ids;
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
      this.checkIds = this.ruleForm.applyDeptId
        ? this.ruleForm.applyDeptId.split(';')
        : [];
      this.checkData = this.zhuCheckData;
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
    //主办部门选择按钮
    selectDepartment() {
      let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||'';
      this.treeParams.wfeUnitId = userInfo.unitId;
      this.treeParams.unitCode = this.unitId;
      this.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify(this.treeParams),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res);
          this.treeData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.$refs.dialog.openDialog();
    },
    checkNode(result) {
      this.ruleForm.mainOrganNames = result.name;
      this.ruleForm.deptIds = this.ruleForm.draftDepartmentId = result.id;
      this.orgId.push(result.id)
    },
    handleImport() {
      this.$post.postData(
        "getEleSecretTimeType",
        JSON.stringify({function: "getEleSecretTimeType", unitId: this.unitId}),
        this.$businessCode.fawgl
      )
      .then(res => {
        this.eleSecretTimeTypeList = res.data.eleSecretTimeType&&JSON.parse(res.data.eleSecretTimeType)
        this.handleCancel();
        this.ruleForm.function = "doImportDictionaryLimit";
        this.checkData = []
        this.checkIds = []
        this.zhuCheckData = []
        this.ruleForm.orgName = this.ruleForm.unitName = this.unitName
        this.ruleForm.organizationId = this.ruleForm.unitId = this.unitId
      })
      this.importVisible = true;
    },
    handleImportCancel() {
      this.importVisible = false;
    },
    handleImportSave() {
      let that = this;
      if (!scrollIntoForm) {
        return
      }
      if (this.ruleForm.deptName=="") {
        that.$message({
          type: "error",
          message: "请选择部门!"
        });
        return;
      }
      if (this.ruleForm.attchmentFileInfo.length==0) {
        that.$message({
          type: "error",
          message: "请先上传附件!"
        });
        return;
      }
      this.$post.postData(
        "doImportDictionaryLimit",
        JSON.stringify(this.ruleForm),
        this.$businessCode.fawgl
      ).then(res => {
        if (res&&res.success) {
          this.$message({
            type: "success",
            message: "导入成功!"
          })
          this.handleCancel();
          this.importVisible = false;
          this.handleLoadData();
        } else {
          this.$message({
            type: "error",
            showClose: true,
            offset: 400,
            message: res.message,
            duration: 500
          });
        }
      })
    },
    downPiLiang(){
      downLoadFileReName("/ecpweb/page/ccboa/static/file/qxjdbdrmb.xls","期限鉴定表导入模板.xls")
    },
    //请求文件路径
    async getFileInfo(self, flagFile) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = flagFile
        ? flagFile.fileName
        : self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = flagFile
        ? flagFile.filePath
        : self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fawglfj
        )
        .then(res => {
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件获取失败，请联系管理员",
            duration: 1500
          });
          successInfo.state = false;
        });
      return successInfo;
    },
    //正文跳转
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          zhengWenState: 0,
          id: this.fromData.muBanVo.id,
          JYcode: this.$businessCode.fawglfj,
          fileName: fileInfo ? fileInfo.fileName : "",
          relativePath: fileInfo ? fileInfo.filePath : "",
          pageFlag: "fawen"
        }
      });
      window.open(data.href, "_blank");
    },
    viewFile(file) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              fileType.map(item => {
                if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                  openPlugin = true;
                }
              });
              if (openPlugin) {
                this.zhengWenState = 0;
                this.doDraft(res);
              } else {
                window.open(
                  (this.$post.getEnvState()
                    ? location.origin
                    : "http://localhost:8080") +
                    "/ecpweb/getLocalFile.action?relativePath=" +
                    res.filePath +
                    "&fileName=" +
                    res.fileName,
                  file.fileName
                );
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "后端获取文件失败",
                duration: 1500
              });
            }
          }
        });
    },
    deleteRow(n, id) {
      let that = this;
      this.bank_deleteFileById.id = id;
      console.log(this.bank_deleteFileById);
      this.$post
        .postData(
          "deleteFileById",
          JSON.stringify(this.bank_deleteFileById),
          this.$businessCode.fawglfj
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
              this.ruleForm.attchmentFileInfo = [];
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
      this.bank_doDownloadFile.fileName = file.file_name;
      this.bank_doDownloadFile.filePath = file.file_path;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState()
                  ? location.origin
                  : "http://localhost:8080") +
                  "/ecpweb/getLocalFile.action?relativePath=" +
                  res.filePath +
                  "&fileName=" +
                  res.fileName,
                file.file_name
              );
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
    }
  },
  created() {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf: "1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.uploadConfig.code = this.$businessCode.fawglfj;
      this.handleLoadData();
    })
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
/deep/ .dispatchcswhlshwh{
  .tree-div{
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
</style>