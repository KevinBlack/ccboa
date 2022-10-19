<template>
  <div class="save">
    <div class="saveHeader">
      <div class="title-text">事务审批种类维护</div>
    </div>
    <el-button v-if="!isSave" type="primary" style="margin-left:20px;" @click="save_btn">保存</el-button>
    <el-button v-else type="primary" style="margin-left:20px;" @click="edit_btn">编辑</el-button>
    <el-button type="primary" style="margin-left:20px;" @click="colose_btn()">关闭</el-button>
    <div class="elementForm">
      <el-form ref="elForm" :rules="rules" :model="mformData" label-width="180px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="审批行" prop="manageBank">
              <el-input v-model="mformData.manageBank" :disabled="true"></el-input>
              <span style="color:red">注：该配置一经保存后不可再修改</span>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:24px">
            <el-button type="primary" @click="selectOrg" :disabled="isNoUpdate">选择</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="是否跨行项目" prop="isKhFlag">
            <el-radio-group
              v-model="mformData.isKhFlag"
              :disabled="isSave"
              prop="isKhFlag"
              @change="changeisKhFlag"
            >
              <el-radio label="0">非跨行</el-radio>
              <el-radio label="1">跨行</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="主管部门" prop="manageDept">
              <el-input v-model="mformData.manageDept" :disabled="true"></el-input>
              <!-- <span style="color:red">注：该配置一经保存后不可再修改</span>-->
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:24px">
            <el-button type="primary" @click="selectDepar" :disabled="isSave">选择</el-button>
          </el-col>
        </el-row>
        <el-row v-if="isBankLevel">
          <el-col :span="16" v-if="!isLevel">
            <el-form-item label="适用于下级机构级别" prop="BankLevel">
              <el-select
                multiple
                v-model="mformData.BankLevel"
                :disabled="isSave"
                @change="bankLevel"
                style="width:100%"
              >
                <el-option v-for="item in orgListStr" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="16">
            <el-form-item label="适用于下级机构级别" prop="BankLevel">
              <el-input v-model="mformData.nextBank" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        审计机构级别-->
        <el-row v-if="isBankLevel">
          <el-col :span="16" v-if="isAudit&&isZH&&!isLevel">
            <el-form-item label="审计机构" prop="auditLevel">
              <el-select
                multiple
                v-model="mformData.auditLevel"
                :disabled="isSave"
                style="width:100%"
              >
                <el-option
                  v-for="item in auditList"
                  :key="item.unitCode"
                  :label="item.unitName"
                  :value="item.unitName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="16" v-if="shenjiStr&&isZH">
            <el-form-item label="审计机构" prop="BankLevel">
              <el-input v-model="shenjiStr" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="申请项目" prop="applyProject">
              <el-input v-model="mformData.applyProject" :disabled="isSave"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="申请项目简称" prop="projectShortName">
              <el-input v-model="mformData.projectShortName" :disabled="isSave"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="项目编码" prop="projectNo">
              <el-input v-model="mformData.projectNo" :disabled="isNoUpdate"></el-input>
              <span style="color:red">注：该配置一经保存后不可再修改</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="模板名称" prop="modelName">
              <el-input v-model="mformData.modelName" :disabled="isSave"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="编号" prop="editorNo">
              <el-input v-model="mformData.editorNo" :disabled="isSave"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="是否申请部门生成编号" prop="isBhControl">
            <el-radio-group v-model="mformData.isBhControl" :disabled="isSave">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="是否归档" prop="isGuidang">
            <el-radio-group v-model="mformData.isGuidang" :disabled="isSave">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="是否移动端展示" prop="publichouDate">
            <el-radio-group v-model="mformData.publichouDate" :disabled="isSave">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="项目状态" prop="isUse">
            <el-radio-group v-model="mformData.isUse" :disabled="isSave">
              <el-radio label="0">未启用</el-radio>
              <el-radio label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="审批行是否启用" prop="spbankIsUse">
            <el-radio-group v-model="mformData.spbankIsUse" :disabled="isSave">
              <el-radio label="0">未启用</el-radio>
              <el-radio label="1">启用</el-radio>
            </el-radio-group>
            <!--            <div style="color:red">注：该配置一经保存后不可再修改</div>-->
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="审批结论" prop="approveResult">
            <el-radio-group v-model="mformData.approveResult" :disabled="isSave">
              <el-radio label="空"></el-radio>
              <el-radio label="同意 不同意"></el-radio>
              <el-radio label="同意 部分同意 不同意"></el-radio>
            </el-radio-group>
            <div style="color:red">
              注：选择‘空’,表单上不显示审批结论;选择‘同意 不同意’,在审批意见栏显示‘同意 不同意’单选项;选择‘同意 部分同意 不同意’,在审批意见栏显示‘同意 部分同意
              不同意’单选项。
            </div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="是否使用默认流程" prop="useDefaultFlow">
            <el-radio-group @change="useDefaultFlowChange" v-model="mformData.useDefaultFlow" :disabled="isSave">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <!-- <div style="color:red">注：该配置一经保存后不可再修改</div> -->
          </el-form-item>
        </el-row>
        <el-row v-if="mformData.useDefaultFlow == '0'">
          <el-col :span="16">
            <el-form-item label="本行事务审批" prop="multiTenancyId1">
              <el-select clearable v-model="mformData.multiTenancyId1" style="width:100%" :disabled="isSave">
                <el-option
                  v-for="(item,index) in bankTrasaction"
                  :key="index"
                  :label="item.appCat"
                  :value="item.appCatShortName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="mformData.useDefaultFlow == '0'">
          <el-col :span="16">
            <el-form-item label="跨行事务审批（申请行）" prop="multiTenancyId2">
              <el-select clearable v-model="mformData.multiTenancyId2" style="width:100%" :disabled="isSave">
                <el-option
                  v-for="(item,index) in bankTrasaction"
                  :key="index"
                  :label="item.appCat"
                  :value="item.appCatShortName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="mformData.useDefaultFlow == '0'">
          <el-col :span="16">
            <el-form-item label="跨行事务审批（审批行）" prop="multiTenancyId3">
              <el-select clearable v-model="mformData.multiTenancyId3" style="width:100%" :disabled="isSave">
                <el-option
                  v-for="(item,index) in bankTrasaction"
                  :key="index"
                  :label="item.appCat"
                  :value="item.appCatShortName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item v-if="queryData.sourceType =='1'" label="是否启用销假情况" prop="useDefaultFlow">
            <el-radio-group v-model="mformData.backLeaveInfo" :disabled="isSave">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            v-if="queryData.sourceType =='1'"
            label="是否启用休假前置审批依据"
            prop="useDefaultFlow"
          >
            <el-radio-group v-model="mformData.beforeHoliday" :disabled="isSave">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            v-if="queryData.sourceType =='1'"
            label="是否启用因私出境审批依据"
            prop="useDefaultFlow"
          >
            <el-radio-group v-model="mformData.goAbroad" :disabled="isSave">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <!--        管理制度-->
        <el-row>
          管理制度
          <el-form-item>
            <el-col :span="23">
              <upload-file-ts v-show="!isSave" :uploadConfig="GLuploadConfig" @fileList="fileList"></upload-file-ts>
              <div
                class="tree_w"
                v-if="mformData.SysattchmentFileInfo&&mformData.SysattchmentFileInfo.length"
              >
                <el-scrollbar>
                  <div
                    v-for="(item,index) in  mformData.SysattchmentFileInfo"
                    :key="item.id"
                    class="comp_list"
                  >
                    <template>
                      <div class="command_file">
                        <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                        <span class="name">{{item.createrName}}</span>
                        <span class="name">{{item.createTime}}</span>
                        <div class="btns">
                          <el-button
                            type="warning"
                            size="mini"
                            v-if="!isSave"
                            @click.native="deleteRowSys(index,item.id)"
                            :disabled="item.disabled"
                            round
                          >删除</el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click.native="downFile(item)"
                            round
                          >下载</el-button>
                        </div>
                      </div>
                    </template>
                  </div>
                </el-scrollbar>
              </div>
            </el-col>
          </el-form-item>
        </el-row>
        <!--        正文模板-->
        <el-row style="margin-top:20px">
          正文模板
          <el-form-item>
            <el-col :span="23">
              <upload-file-ts v-show="!isSave" :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
              <div
                class="tree_w"
                v-if="mformData.attchmentFileInfo&&mformData.attchmentFileInfo.length"
              >
                <el-scrollbar>
                  <div
                    v-for="(item,index) in  mformData.attchmentFileInfo"
                    :key="item.id"
                    class="comp_list"
                  >
                    <template>
                      <div class="command_file">
                        <span
                          style="width:400px"
                          class="name down"
                          @click="viewFile(item)"
                        >{{item.fileName}}</span>
                        <span class="name">{{item.createrName}}</span>
                        <span class="name" style="width:280px">{{item.createTime}}</span>
                        <div class="btns">
                          <el-button
                            type="warning"
                            size="mini"
                            v-if="!isSave"
                            @click.native="deleteRowtext(index,item.id)"
                            :disabled="item.disabled"
                            round
                          >删除</el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click.native="downFile(item)"
                            round
                          >下载</el-button>
                        </div>
                      </div>
                    </template>
                  </div>
                </el-scrollbar>
              </div>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
    <!--    选择下级机构-->
    <el-dialog
      title="选择适用于下级机构"
      :visible.sync="isdialog"
      width="40%"
      height="200px"
      :before-close="handleClose"
    >
      <div style="margin-top:26px">
        <el-radio-group v-model="mformData.orgName" v-for="item in orgList" :key="item.id">
          <el-radio :label="item.name" style="margin-right:16px;">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="delecurrentCode">确定</el-button>
        <el-button>取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import orgTree from "components/tree/shiwuOrgTree";
import uploadFileTs from "@/components/uploadFile/shiwucopy";
import openOrDownLoadFile from "../../../../minixs/shiwuLineWord";

export default {
  name: "save",
  components: {
    // FdForm,
    orgTree,
    uploadFileTs
  },
  props: {},
  mixins: [openOrDownLoadFile],
  data() {
    return {
      bankTrasaction: [],
      crossBankApplyTrasaction: [],
      crossBankExTrasaction: [],
      shenjiStr: "", //存放详情中审计机构","分割
      rowData: {},
      isZH: false, //当前人员是否为总行
      auditList: [], //审计机构list
      isAudit: false, //是否展示审计机构级别
      //正文模板附件
      uploadConfig: {
        formId: "shiwuText",
        hiddenJson: "hiddenText",
        filesHas: [],
        textFileHas: [],
        isSpecial: 6
      },
      //管理制度
      GLuploadConfig: {
        formId: "shiwuSystem",
        hiddenJson: "hiddenSys",
        filesHas: [],
        sysFileHas: [],
        isSpecial: 5
      },
      isGuocheng: false,
      isBankLevel: true,
      orgListStr: [],
      isLevel: true,
      rules: {
        manageBank: [
          { required: true, message: "请选择审批行", trigger: "blur" }
        ],
        isKhFlag: [
          { required: true, message: "请选择是否跨行", trigger: "blur" }
        ],
        manageDept: [
          { required: true, message: "请选择主管部门", trigger: "blur" }
        ],
        applyProject: [
          { required: true, message: "请输入申请项目", trigger: "blur" }
        ],
        projectShortName: [
          { required: true, message: "请输入申请项目简称", trigger: "blur" }
        ],
        projectNo: [
          { required: true, message: "请输入项目编码", trigger: "blur" }
        ],
        editorNo: [
          { required: true, message: "请输入项目编号", trigger: "blur" }
        ],
        BankLevel: [
          { required: true, message: "请选择下级机构级别", trigger: "blur" }
        ],
        auditLevel: [
          { required: true, message: "请选择审计机构", trigger: "blur" }
        ]
      },
      mformData: {
        isKhFlag: "0",
        isEndOpinion: "0",
        attchmentFileInfo: [],
        SysattchmentFileInfo: [],
        auditLevel: [],
        backLeaveInfo: "0",
        beforeHoliday: "0",
        goAbroad: "0",
        multiTenancyId1:"",
        multiTenancyId2:"",
        multiTenancyId3:""
      },
      org_id: [],
      orgList: [],
      // orgListStr: [],
      isdialog: false,
      isSave: true,
      title: "选择部门",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      serverconfig: {
        labelWidth: "160px"
      },
      isEdit: Boolean,
      id: "",
      formCfg: [],
      levelOrg: [],
      isNoUpdate: true,
      sysId: "",
      textId: "",
      yuanshiList: "",
      textFlag: true,
      sysFlag: true,
      id: "",
      queryData: !!this.$route.query.rowData
        ? JSON.parse(this.$route.query.rowData)
        : ""
    };
  },
  computed: {},
  methods: {
    useDefaultFlowChange(val) {
      console.log('val',val)
      if(val == "1") {
        this.mformData.multiTenancyId1 = ""
        this.mformData.multiTenancyId2 = ""
        this.mformData.multiTenancyId3 = ""
      }
    },
    approvalProcess() {
      this.$api.argumentPre.approvalProcess({}).then(res => {
        console.log("流程", res);
        if (res.code == "SUCCESS") {
          this.bankTrasaction = res.data;
        }
      });
    },
    //选择适用于下级机构(审计机构)
    bankLevel() {
      console.log("请求审计机构", this.mformData.manageBankId);
      let that = this;
      if (
        this.mformData.BankLevel &&
        (this.mformData.BankLevel.indexOf("审计机构") > -1 || this.shenjiStr)
      ) {
        this.$api.setting.organization
          .getTree({
            unitClass: 1,
            unitCode: "0",
            unitType: "sjjg"
          })
          .then(res => {
            this.auditList = res.data;
          })
          .catch(err => {});
        this.isAudit = true;
      } else {
        this.isAudit = false;
      }
    },
    edit_btn() {
      this.isSave = false;
      this.isBankLevel = true;
      this.$nextTick(() => {
        if (this.mformData.isKhFlag === "1") {
          this.$set(
            this.mformData,
            "BankLevel",
            this.mformData.nextBank.split(",")
          );
          if (this.shenjiStr) {
            this.$set(this.mformData, "auditLevel", this.shenjiStr.split(","));
          }
        }
        this.isAudit = true;
        if (this.mformData.manageBankId == "U010000") {
          this.isZH = false;
        } else {
          this.isZH = true;
        }
        this.bankLevel();
        this.queryLevel();
      });
    },
    initData() {},
    initDataS() {},
    selectOrg() {
      this.title = "选择机构";
      this.isSingle = true;
      this.orgOrDept = 1;
      this.orgOrDeptId = "1";
      this.showOrgTree = true;
    },
    selectDepar() {
      if (!this.mformData.manageBankId) {
        this.$message({
          message: "请先选择机构",
          type: "success"
        });
        return;
      }
      this.title = "部门";
      this.isSingle = false;
      this.orgOrDept = 0;
      this.orgOrDeptId = this.mformData.manageBankId;
      this.showOrgTree = true;
    },
    //
    changeisKhFlag() {
      if (this.mformData.isKhFlag === "1") {
        if (!this.mformData.manageBank) {
          this.$message({
            type: "warning",
            message: "请选择审批行"
          });
          this.mformData.isKhFlag = "0";
        } else {
          this.isLevel = false;
          this.queryLevel();
        }
      } else if (this.mformData.isKhFlag === "0") {
        this.isLevel = true;
      }
    },
    btnevent(params) {
      switch (params.prop) {
        case "$selectOrg":
          this.title = "选择机构";
          this.isSingle = true;
          this.orgOrDept = 1;
          this.orgOrDeptId = "1";
          this.showOrgTree = true;
          break;
        case "$selectDepar":
          if (!this.mformData.manageBankId) {
            this.$message({
              message: "请先选择机构",
              type: "success"
            });
            return;
          }
          this.title = "部门";
          this.isSingle = false;
          this.orgOrDept = 0;
          this.orgOrDeptId = this.mformData.manageBankId;
          this.showOrgTree = true;
          break;
        case "$selectDoOrg":
          this.isdialog = true;
          break;
        case "isKhFlag":
          if (this.mformData.isKhFlag === "1") {
            this.queryLevel();
            this.initDataS();
          } else if (this.mformData.isKhFlag === "0") {
            this.initData();
          }
          break;
        case "isEndOpinion":
          if (this.mformData.isEndOpinion == "1") {
          } else if (this.mformData.isEndOpinion == "0") {
          } else {
          }
          break;
      }
    },
    //请求适用于下级机构的
    queryLevel() {
      this.$api.argumentPre
        .unitLevel({
          unitCode: this.mformData.manageBankId
        })
        .then(res => {
          this.orgListStr = [];
          this.orgList = res.data;
          // this.orgList = JSON.parse(JSON.stringify(res.data.types))
          this.orgList.map(item => {
            this.orgListStr.push(item.unitTypeName);
          });
        });
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        if (org.id == "U010000") {
          this.isZH = false;
        } else {
          this.isZH = true;
        }
        this.mformData.manageBankId = org.id;
        this.$set(this.mformData, "manageBank", org.unitName);
        this.$set(this.mformData, "manageBankId", org.id);
        console.log(this.mformData.manageBank);
        this.orgSelect();
        this.initData();
      } else {
        let deptId = [];
        let deptName = [];
        org.map(item => {
          deptId.push(item.id);
          deptName.push(item.unitName);
        });
        this.$set(this.mformData, "manageDept", deptName.join(","));
        this.$set(this.mformData, "manageDeptId", deptId.join(","));
      }
    },
    //请求详情
    queryDeal() {
      let that = this;
      this.$api.argumentPre
        .applyItemDeal({
          id: this.queryData.id
        })
        .then(res => {
          this.sysId = res.data.manageSystemId;
          this.textId = res.data.textMoudleId;
          this.mformData = res.data
          if(this.mformData.useDefaultFlowChange == "1") {
            this.$set(this.mformData,'multiTenancyId1','')
            this.$set(this.mformData,'multiTenancyId2','')
            this.$set(this.mformData,'multiTenancyId3','')
          } else {
            this.$set(this.mformData,'multiTenancyId1',res.data.multiTenancyId1)
            this.$set(this.mformData,'multiTenancyId2',res.data.multiTenancyId2)
            this.$set(this.mformData,'multiTenancyId3',res.data.multiTenancyId3)
          }
          this.$set(this.mformData,'backLeaveInfo',res.data.backLeaveInfo)
          this.$set(this.mformData,'beforeHoliday',res.data.beforeHoliday)
          this.$set(this.mformData,'goAbroad',res.data.goAbroad)
          this.$set(this.mformData,'nextBank',res.data.useBankLevel)
          this.textgetFileList();
          this.sysgetFileList();
          console.log(this.sysId, this.textId);
        });
    },
    colose_btn() {
      //this.$router.push('/approval/parameter/apply/check')
      this.$intent.closeWindow(this);
    },
    //起草保存文件
    createFile() {
      if (this.mformData.manageSystemId) {
        this.$api.setSysConfig
          .saveFile({
            id: this.id,
            fileId: this.mformData.manageSystemId,
            fileType: "5"
          })
          .then(res => {});
      }
      if (this.mformData.textMoudleId) {
        this.$api.setSysConfig
          .saveFile({
            id: this.id,
            fileId: this.mformData.textMoudleId,
            fileType: "6"
          })
          .then(res => {});
      }
    },
    handleData() {
      let unit_id = [];
      let that = this;
      if (this.isZH && this.mformData.isKhFlag === "1") {
        for (let i = 0; i < this.mformData.BankLevel.length; i++) {
          if (this.mformData.BankLevel[i] == "审计机构") {
            that.mformData.BankLevel.splice(i, 1);
            i--;
          }
        }
      }
      this.auditList &&
        this.auditList.map(itemName => {
          this.mformData.auditLevel &&
            this.mformData.auditLevel.map(item => {
              if (item == itemName.unitName) {
                unit_id.push(itemName.unitCode + "_" + itemName.unitName);
              }
            });
        });
      if (this.mformData.isKhFlag === "1") {
        this.mformData.bankLevel = unit_id.join(",");
        this.mformData.useBankLevel = this.mformData.BankLevel.join(",");
      }

      if (this.mformData.isKhFlag === "0") {
        this.mformData.bankLevel = [];
        this.mformData.useBankLevel = "";
      }
    },
    //保存数据
    save_btn() {
      let that = this;

      console.log("-------mformData------>", this.mformData);
      if (this.id) {
        this.$refs["elForm"].validate(valid => {
          this.handleData();
          if (valid) {
            this.createFile();
            // this.mformData.useBankLevel=this.yuanshiList
            this.mformData.id = this.id;

            if (this.sysFlag) {
              this.mformData.manageSystemName = "";
              this.mformData.manageSystemPath = "";
              this.mformData.manageSystemId = "";
            }
            // if (this.textFlag) {
            //     this.mformData.textMoudleName = ''
            //     this.mformData.textMoudlePath = ''
            //     this.mformData.textMoudleId = ''
            // }
            this.$api.argumentPre.applyItemAlter(this.mformData).then(res => {
              if (res.code == "SUCCESS") {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
              }
              this.$forceUpdate();
            });
          }
        });
      } else {
        this.$refs["elForm"].validate(valid => {
          this.handleData();
          if (valid) {
            this.$api.argumentPre.applyItemCreate(this.mformData).then(res => {
              if (res.code == "SUCCESS") {
                this.id = res.id;
                this.createFile();
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              }
              this.$forceUpdate();
            });
          }
        });
      }
    },
    handleClose() {
      this.isdialog = false;
    },
    delecurrentCode() {
      this.isdialog = false;
    },
    orgSelect() {
      // this.$api.argumentPre.unitLevel(
      //     {unitCode:this.formData.manageBankId}
      // ).then(res => {
      //     this.orgList.map(item=>{
      //         this.orgListStr.push(item.name)
      //         // this.org_id.push(item.name+'_'+item.id)
      //     })
      // })
    },
    //附件块
    fileList(files) {
      console.log("files", files);
      if (files[0].shuwuformId == "shiwuSystem") {
        this.sysFlag = false;
        this.mformData.SysattchmentFileInfo = [];
        this.mformData.manageSystemName = files[0].fileName;
        this.mformData.manageSystemPath = files[0].filePath;
        this.mformData.manageSystemId = files[0].id;
        this.mformData.SysattchmentFileInfo.push({
          fileName: files[0].fileName,
          filePath: files[0].filePath,
          id: files[0].id
        });
        this.GLuploadConfig.sysFileHas = this.mformData.SysattchmentFileInfo;
      } else if (files[0].shuwuformId == "shiwuText") {
        this.textFlag = false;
        this.mformData.attchmentFileInfo = [];
        this.mformData.textMoudleName = files[0].fileName;
        this.mformData.textMoudlePath = files[0].filePath;
        this.mformData.textMoudleId = files[0].id;
        this.mformData.attchmentFileInfo.push({
          fileName: files[0].fileName,
          filePath: files[0].filePath,
          id: files[0].id
        });
        this.uploadConfig.textFileHas = this.mformData.attchmentFileInfo;
      }
      if (!this.mformData.attachs) {
        this.mformData.attachs = [];
      }
      files.forEach(item => {
        this.mformData.attachs.push(item.id);
      });
      this.uploadConfig.filesHas = files;
      this.mformData.attachid = this.mformData.attachs.join(",");
      this.$forceUpdate();
    },
    //正文获取文件信息
    textgetFileList() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.queryData.id,
          fileType: "6"
        })
        .then(res => {
          this.$nextTick(() => {
            this.$set(this.mformData, "attchmentFileInfo", res.data);
            this.$set(this.uploadConfig, "textFileHas", res.data);
          });
        });
    },
    //制度获取文件信息
    sysgetFileList() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.queryData.id,
          fileType: "5"
        })
        .then(res => {
          this.$nextTick(() => {
            this.$set(this.GLuploadConfig, "sysFileHas", res.data);
            this.$set(this.mformData, "SysattchmentFileInfo", res.data);
          });
        });
    },
    deleteRowSys(n, id) {
      this.$confirm("是否确定删除此文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.setSysConfig
            .deleFile({
              id: id
            })
            .then(res => {
              if (res && res.code == "SUCCESS") {
                this.mformData.SysattchmentFileInfo &&
                  this.mformData.SysattchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.GLuploadConfig.filesHas = this.mformData.SysattchmentFileInfo;
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
              }
            });
        })
        .catch(() => {});
    },
    deleteRowtext(n, id) {
      this.$confirm("是否确定删除此文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.setSysConfig
            .deleFile({
              id: id
            })
            .then(res => {
              if (res && res.code == "SUCCESS") {
                this.mformData.textMoudleName = "";
                this.mformData.textMoudlePath = "";
                this.mformData.textMoudleId = "";
                this.mformData.attchmentFileInfo &&
                  this.mformData.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.uploadConfig.filesHas = this.mformData.attchmentFileInfo;
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
              }
            });
        })
        .catch(() => {});
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.approvalProcess()
    if (this.queryData && this.queryData.id) {
      this.id = this.queryData.id;
      let rowData = this.queryData;
      console.log("-------rowData------->", rowData);
      if (rowData.manageBankId == "U010000") {
        this.isZH = false;
      } else {
        this.isZH = true;
      }
      
      //是否显示过程意见
      if (rowData.isEndOpinion == "0") {
        this.isGuocheng = false;
      } else if (rowData.isEndOpinion == "1") {
        this.isGuocheng = true;
      }

      if (rowData.isUse === "启用") {
        rowData.isUse = "1";
      } else if (rowData.isUse === "未启用") {
        rowData.isUse = "0";
      }
      if (rowData.isKhFlag === "非跨行") {
        rowData.isKhFlag = "0";
      } else if (rowData.isKhFlag === "跨行") {
        rowData.isKhFlag = "1";
      }
      this.mformData = rowData;
      // nextBank
      this.queryDeal();
      // setTimeout(() => {
      // }, 0);
      console.log('this.mformData',this.mformData)
      this.isSave = true;
      if (this.mformData.isKhFlag === "0") {
        this.isBankLevel = true;
        this.isLevel = true;
      } else if (this.mformData.isKhFlag === "1") {
        this.isBankLevel = false;
        this.isLevel = false;
      } else {
      }
      //适用于下级机构级别
      if (rowData.useBankLevel) {
        console.log("rowData.useBankLevel", rowData.useBankLevel);
        this.yuanshiList = rowData.useBankLevel;
        let bankOrg = rowData.useBankLevel.split(",");
        let bankOrgList = [];
        bankOrg &&
          bankOrg.map(item => {
            bankOrgList.push(item.split("_")[0]);
          });
        this.$nextTick(() => {
          this.$set(this.mformData, "nextBank", bankOrgList.join(","));
          console.log("nextBank", this.mformData.nextBank);
        });
      }
      //审计机构级别
      if (this.mformData.bankLevel) {
        let bankLevelFir = [];
        let bankLevelSec = [];
        bankLevelFir = this.mformData.bankLevel.split(",");
        bankLevelFir &&
          bankLevelFir.map(item => {
            bankLevelSec.push(item.split("_")[1]);
          });
        this.shenjiStr = bankLevelSec.join(",");
        console.log("---------auditLevel------>", this.shenjiStr);
      }
      if (this.mformData.manageBank == "U010000") {
        this.isZH = false;
      } else {
        this.isZH = true;
      }
      this.isNoUpdate = true;
    } else {
      this.isSave = false;
      this.isNoUpdate = false;
    }

    // this.queryBank()
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.save {
  background: white;
  margin: 0 auto;

  .saveHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }

  .process_content {
    width: 80%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;

    .bottom-span {
      display: block;
      font-size: 14px;
      color: red;
      line-height: 20px;
    }
  }
}

.elementForm {
  width: 80%;
  margin: 0 auto;
  margin-top: 36px;
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
      width: 300px;
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
</style>

