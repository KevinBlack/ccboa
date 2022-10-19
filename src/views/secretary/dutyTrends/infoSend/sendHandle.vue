<template>
  <div class="selectDept">
    <div class="headerClick">
      <div class="left" @click="toClose">
        <i class="el-icon-arrow-left"></i>
        <span>信息报送处理单</span>
      </div>
      <div class="right">
        <el-button @click="toClose" class="bank_grid_comtent_active">关 闭</el-button>
        <!-- <el-button @click="delateForm" class="bank_grid_comtent_active">删除此文</el-button> -->
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="buttonList[index].show"
          size="mini"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>
    <div class="formHeader">
      <div class="title-text">{{submitTheUnit + "信息报送处理单"}}</div>
    </div>
    <div class="process_content">
      <div class="cur_box">
        <div class="cur_sess">
          <p>
            当前环节：
            <span>{{formData.currentNode}}</span>
          </p>
          <p>
            当前处理人：
            <span>{{formData.currentUser}}</span>
          </p>
        </div>
      </div>
      <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿刊物" prop="submitPublication">
              <el-input v-model="formData.submitPublication" :disabled="readFields.tgkw"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投稿栏目" prop="submitColumn">
              <el-select
                v-model="formData.submitColumn"
                placeholder="请选择"
                :disabled="readFields.tglm"
              >
                <el-option
                  v-for="item in submitColumnData"
                  :key="item.columnCategory"
                  :label="item.columnCategory"
                  :value="item.columnCategory"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿单位" prop="submitUnit">
              <el-input v-model="formData.submitUnit" :disabled="readFields.tgDept"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投稿部门" prop="submitDept">
              <el-input v-model="formData.submitDept" :disabled="readFields.WebFMbmname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿人" prop="submitPerson">
              <el-input v-model="formData.submitPerson" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="formData.tel" :disabled="readFields.tel" @blur="phoneChange()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="拟稿日期" prop="createDate">
              <el-date-picker
                v-model="formData.createDate"
                type="date"
                placeholder="投稿日期"
                :disabled="readFields.Cdate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报送日期" prop="submitDate">
              <el-date-picker
                v-model="formData.submitDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="报送日期"
                :disabled="readFields.bsDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动类别" prop="activityType">
              <el-checkbox-group
                v-model="formData.activityType"
                @change="handleChange"
                :disabled="readFields.Kwlb"
              >
                <el-checkbox
                  v-for="item in checkDataList"
                  :label="item.id"
                  :key="item.id"
                >{{item.activityCategory}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align:center">
            <el-button size="mini" type="primary" @click="exampleClick">参考示例</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="内容" prop="content">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="formData.content"
                :disabled="readFields.zwDocument"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审签意见" prop="auditIdeaIn">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入审签意见"
                v-model="formData.auditIdeaIn"
                v-if="formData.currentNode === '起草' || !editedIdeaFields.shyj || isDisabledAuditIdeaIn"
                :disabled="editedIdeaFields.shyj"
              ></el-input>
              <div
                v-for="(item, index) in formData.auditIdea"
                :key="index"
              >
                <div class="d_flex">
                  <el-row class="d_b100" v-if="item.content? true : false">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        :value="item.content"
                        :disabled="true"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
                      ></el-input>
                      <div class="adviceInfo">
                        <el-row>
                          {{item.deptName}}
                          <span class="pad_lr10">{{item.humanName}}</span>
                        </el-row>
                        <el-row>{{item.auditTime}}</el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                maxlength="200"
                :rows="4"
                placeholder="请输入备注"
                v-model="formData.remarkIn"
                :disabled="editedIdeaFields.Remark"
              ></el-input>
              <div v-for="item in formData.remark" :key="item.id">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="24">
                      <el-input
                        type="textarea"
                        :value="item.content"
                        :disabled="true"
                        :autosize="{minRow:5,maxRow:15}"
                        class="d_f1"
                      ></el-input>
                      <div class="adviceInfo">
                        <el-row>
                          {{item.deptName}}
                          <span class="pad_lr10">{{item.humanName}}</span>
                        </el-row>
                        <el-row>{{item.remarkTime}}</el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- @description: 选择人员树 -->
    <select-person
      :treeData="treeData"
      :loadingTree="true"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :checkIds="checkIds"
      :fromdata="formData"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <!-- @description: 查看流程弹框  -->
    <shiwuFlow :tableData="tableData" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>

    <!-- @description: 参考示例弹窗  -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <span>{{contentExample}}</span>
    </el-dialog>
  </div>
</template>

<script>
import selectPerson from "components/tree/treeTansun";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";

import minixs from "@/minixs/index";
import viewDraft from "@/minixs/viewDraft";

export default {
  name: "sendHandle",
  components: { selectPerson, shiwuFlow },
  mixins: [minixs,viewDraft],
  data() {
    /** @description: 验证手机号 */
    var checkMobile = (rule, value, callback) => {
      var reg = /([A-Za-z]|[\u4E00-\u9FA5])/;
      if (value) {
        if (reg.test(value)) {
          callback(new Error("手机号格式不正确!"));
        } else {
          callback();
        }
      }
      callback();
    };
    return {
      whetherToRepeat: true,
      otherBankId: [],
      otherBankName: [],
      nameArrays: [],
      auditIdeaInFlag: "",
      // 投稿单位
      submitTheUnit: "",
      touFlag: "0",
      id: "",
      /** @description: 可编辑意见域 */
      editedIdeaFields: {
        SHidea: true,
        Remark: true,
        shyj: true,
        tgkw: true,
        tglm: true,
        tgDept: true,
        WebFMbmname: true,
        ngName: true,
        tel: true,
        Cdate: true,
        bsDate: true,
        Title: true,
        zwDocument: true,
        Kwlb: true,
        DeptTableHeader: true
      },
      //必填意见域
      requiredIdeaFields: {
        SHidea: false,
        Remark: false,
        shyj: false
      },
      /** @description: 必填控制域 */
      requiredFields: {
        SHidea: false,
        Remark: false,
        shyj: false,
        tgkw: false,
        tglm: false,
        tgDept: false,
        WebFMbmname: false,
        ngName: false,
        tel: false,
        Cdate: false,
        bsDate: false,
        Title: false,
        zwDocument: false,
        Kwlb: false,
        DeptTableHeader: false
      },
      /** @description: 不可编辑控制域 */
      readFields: {
        SHidea: false,
        Remark: false,
        shyj: false,
        tgkw: false,
        tglm: false,
        tgDept: false,
        WebFMbmname: false,
        ngName: false,
        tel: false,
        Cdate: false,
        bsDate: false,
        Title: false,
        zwDocument: false,
        Kwlb: false,
        DeptTableHeader: false
      },
      submitDeptData: [] /** @description: 投稿部门数据源 */,
      submitDeptId:'',
      submitColumnData: [] /** @description: 投稿栏目数据源 */,
      checkItemId: {} /** @description: 活动类别选中多选的id */,
      contentExample: "" /** @description: 参考示例内容 */,
      isDisabled: false /** @description: 已办 禁用表单 */,
      curProcessInstId: "" /** @description: 流程id */,
      /** @description: 规则校验 */
      rules: {
        tel: [
          { required: true, message: "请输入222手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "change" }
          // {pattern: /^1[3|4|5|7|8][0-9]{9}$/,message:"请输入正确的手机号"}
        ]
      },
      /** @description: 按钮 */
      buttonList: [
        { name: "保存", type: "baocun", show: false },
        { name: "完成并发送", type: "wanchengbingfasong", show: false },
        { name: "删除此文", type: "shanchuciwen", show: false },
        { name: "投稿", type: "tougao", show: false },
        { name: "查看流程", type: "chakanliucheng", show: false },
        { name: "打印处理单", type: "dayinchulidan", show: false },
      ],
      /** @description: 表单的值 */
      formData: {
        activityType: [],
        auditIdea: []
      },
      checkDataList: [] /** @description: 活动类别数据源 */,
      fromType: "" /** @description: 路由传参的标识 */,
      submitId: "" /** @description: 保存后返回的id */,
      showFlowChart: false /** @description: 查看流程弹框默认不显示 */,
      tableData: [] /** @description: 流程数据 */,
      /**
       * 树状选择弹框
       */
      treeData: [] /** @description: 树数据 */,
      seletOptionsData: [] /** @description: 下一处理环节下拉数据 */,
      offenUse: true,
      dialogType: "dosend",
      checkIds: [] /** @description: 选中id列表 */,
      orgId: "",
      checkData: [] /** @description: 选中数据 */,
      dialogState: false /** @description: 显示隐藏 */,
      singelCheckF: true /** @description: 选人单选true 多选为false */,
      dialogTypeNow: "next",
      /** @description:  */
      dialogVisible: false /** @description: 默认参考示例弹窗不打开 */,
      workflowId: "" /** @description: 查看流程id */,
      resSubmitId: "" /** @description: 保存后返回的id */
    };
  },
  created() {

    // 获取url传参并且赋值
    const query = this.$route.query;
    this.id = query.id;
    this.activeName = query.activeName;


    this.getSubmitDept();
    this.orgId = this.currentUserInfo.unitId;
    /** @description: 获取通过路由传过来的参数 */
    if (query.type) {
      this.rules.submitDate = [];
      this.fromType = this.$route.query.type; /** @description: 路由传参的是否是拟稿的标识 */
      if (this.fromType === "add") {
        this.submitTheUnit =
          localStorage.getItem("userInfo") &&
          JSON.parse(localStorage.getItem("userInfo")).unitName;
        /** @description: 点击拟稿时赋值 */
        this.$api.duty.add().then(res => {
          this.formData = {
            ...res,
            activityType: [],
            submitUnit: this.currentUserInfo.unitName,
            submitPerson: res.currentUser,
            submitPublication: "值班动态",
            submitDept: this.$route.query.submitDept
          };
          /** @description: this.formData.submitColumn = res.defaultColuman; */
          this.$set(this.formData, "submitColumn", res.defaultColuman);
          this.formData.currUserDept = res.currentUser;
          this.$api.duty
            .getRight({
              route: "00001",
              multiTenancyId: "CN027"
              /** @description: multiTenancyId: "CN027", */
            })
            .then(res => {
              this.huanJieMessage = res.resultMap;
              this.setConfig();
              this.initRule();
            });
        });
      } else {
        /** @description: 当前行详情 */
       let params;
       switch(this.activeName){
          case 'tabs_doing':
            params={
              id:this.$route.query.id,filterState:2
            }
            break;
          case 'tabs_end':
             params={
              id:this.$route.query.id,filterState:3
            }
            break;
          case 'tabs_todo':
             params={
              id:this.$route.query.id,filterState:1
            }
            break;
          case 'tabs_all':
             params={
              id:this.$route.query.id,filterState:0
            }
            break;            
       }
        this.$api.duty
          .informationTransQuery(params)
          .then(res => {
            this.formData = res.order;
            this.formData.flag = res.flag;
            this.checkItemId = this.formData.activityType;
            /** @description: 活动类别赋值 */
            if (this.formData.activityType) {
              this.formData.activityType =
                typeof this.formData.activityType === "string"
                  ? this.formData.activityType.split(",")
                  : this.formData.activityType;
            }
            /** @description: ; */
            if (this.formData.auditIdea) {
              this.formData.auditIdea =
                (typeof this.formData.auditIdea === "string"
                  ? this.formData.auditIdea &&
                    JSON.parse(this.formData.auditIdea)
                  : this.formData.auditIdea) || [];
            }
            if (this.formData.remark) {
              this.formData.remark =
                (typeof this.formData.remark === "string"
                  ? this.formData.remark && JSON.parse(this.formData.remark)
                  : this.formData.remark) || [];
            }
            /** @description: 流程id */
            this.workflowId = this.formData.workflowId;
            console.log("formData", this.formData);
            this.submitTheUnit = res.order.submitUnit;
            /** @description: 流程获取按钮 */
            this.$api.duty
              .getRight({
                route: "00002",
                multiTenancyId: "CN027",
                id: this.formData.id
              })
              .then(res => {
                this.huanJieMessage = res.resultMap;
                this.setConfig();
                this.initRule();
              });
          });
      }
    } else {
      this.formData = this.dataFromQuery;
    }
    if (
      this.$route.query.tabsType === "2" ||
      this.$route.query.tabsType === "3"
    ) {
      /** @description: 已办 办结 */
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  },
  computed: {
    isDisabledAuditIdeaIn() {
      this.auditIdeaInFlag = true;
      for (const i in this.formData.auditIdea) {
        if (this.formData.auditIdea[i].content) {
          this.auditIdeaInFlag = false;
        }
      }
      return this.auditIdeaInFlag;
    }
  },
  mounted() {
    this.getSubmitColumn(); /** @description: 获取投稿栏目数据源 */
    this.getCheckboxList(); /** @description: 获取活动类别 */
  },
  methods: {
    load(Id) {
      let params;
       switch(this.activeName){
          case 'tabs_doing':
            params={
              id:this.$route.query.id || Id,filterState:2
            }
            break;
          case 'tabs_end':
             params={
              id:this.$route.query.id || Id,filterState:3
            }
            break;
          case 'tabs_todo':
             params={
              id:this.$route.query.id || Id,filterState:1
            }
            break;
          case 'tabs_all':
             params={
              id:this.$route.query.id || Id,filterState:0
            }
            break;            
       }
      this.$api.duty
        .informationTransQuery(params)
        .then(res => {
          this.formData = res.order;
          this.formData.flag = res.flag;
          this.checkItemId = this.formData.activityType;
          /** @description: 活动类别赋值 */
          this.formData.activityType =
            typeof this.formData.activityType === "string"
              ? this.formData.activityType.split(",")
              : this.formData.activityType;
          /** @description: ; */
          this.formData.auditIdea =
            (typeof this.formData.auditIdea === "string"
              ? this.formData.auditIdea && JSON.parse(this.formData.auditIdea)
              : this.formData.auditIdea) || [];
          this.formData.remark =
            (typeof this.formData.remark === "string"
              ? this.formData.remark && JSON.parse(this.formData.remark)
              : this.formData.remark) || [];

          /** @description: 流程id */
          this.workflowId = this.formData.workflowId;
          console.log("formData", this.formData);
          this.submitTheUnit = res.order.submitUnit;
          /** @description: 流程获取按钮 */
          this.$api.duty
            .getRight({
              route: "00002",
              multiTenancyId: "CN027",
              id: this.formData.id
            })
            .then(res => {
              this.huanJieMessage = res.resultMap;
              this.setConfig();
              this.initRule();
            });
        });
    },
    getSubmitDept() {
      this.$api.duty.getSubmitDeptData().then(res => {
        const submitDeptData = (res && res.departList) || [{}];
        this.submitDeptData = submitDeptData;
        console.log("获取投稿部门", res.departList, submitDeptData);
      });
    },
    /** @description: 处理收回 */
    handleGetBack() {
      this.$api.duty
        .infoSendGetBack({
          id: this.formData.id
        })
        .then(_ => {
          this.$message.success("收回成功");
        });
    },
    phoneChange(row) {
      let reg = /[^\-\,\d\*\ ]/g;
      // let reg = /^1[3|4|5|7|8][0-9]{9}$/;
      this.formData.tel = this.formData.tel.replace(reg, "");
      /** @description: console.log(reg.test(this.formData.tel)); */
      this.$forceUpdate();
    },

    initRule() {
      this.rules = {
        tel: [
          // {pattern: /^1[3|4|5|7|8][0-9]{9}$/,message:"请输入正确的手机号"},
          {
            required: this.requiredFields.tel,
            message: "请输入手机号",
            trigger: "blur"
          }
          /** @description: { validator: checkMobile, trigger: "change" }, */
        ],
        submitColumn: [
          {
            required: this.requiredFields.tglm,
            message: "请选择投稿栏目",
            trigger: "change"
          }
        ],
        submitDept: [
          {
            required: this.requiredFields.WebFMbmname,
            message: "请选择投稿部门",
            trigger: "change"
          }
        ],
        submitPerson: [
          {
            required: this.requiredFields.ngName,
            message: "请输入投稿人",
            trigger: "blur"
          }
        ],
        submitUnit: [
          {
            required: this.requiredFields.tgDept,
            message: "请输入投稿单位",
            trigger: "blur"
          }
        ],
        auditIdeaIn: [
          {
            required: this.requiredIdeaFields.shyj,
            message: "请输入审签意见",
            trigger: "blur"
          }
        ],
        createDate: [
          {
            required: this.requiredFields.Cdate,
            message: "请选择投稿日期",
            trigger: "change"
          }
        ],
        submitDate: [
          {
            required: this.requiredFields.bsDate,
            message: "请选择报送日期",
            trigger: "change"
          }
        ],
        activityType: [
          {
            type: "array",
            required: this.requiredFields.Kwlb,
            message: "请勾选活动类别",
            trigger: "change"
          }
        ],
        content: [
          {
            required: this.requiredFields.zwDocument,
            message: "请输入内容",
            trigger: "blur"
          }
        ]
      };
    },
    /** @description: 设置控制域 */
    setConfig() {
      this.buttonList = this.showButton(
        this.buttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      ); /** @description: 按钮 */

      this.requiredFields = this.setRequiredFields(
        this.requiredFields,
        this.huanJieMessage.requiredFields
      ); /** @description: 必填编辑 */
      this.readFields = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); /** @description: 不可编辑控制域 */
      this.editedIdeaFields = this.setEditedIdeaFields(
        this.editedIdeaFields,
        this.huanJieMessage.editedIdeaFields,
        this.huanJieMessage.editedIdeaFieldsBycondition
      ); /** @description: 可编辑意见域 */
      this.requiredIdeaFields = this.setRequiredIdeaFields(
        this.requiredIdeaFields,
        this.huanJieMessage.requiredIdeaFields
      ); //必填意见域
    },
    toClose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
        distinguishCancelAndClose: true,
        callback: action => {
          if (action === "confirm") {
            //点是
            /** @description: 如果是当前行进详情 */
            if (this.fromType === "detail") {
              console.log("detail");
              this.$refs.form.validate(valid => {
                if (valid) {
                  console.log(this.formData.activityType.toString(), "6666");
                  if (typeof this.formData.wfeWork === "string") {
                    this.formData.wfeWork = JSON.parse(this.formData.wfeWork);
                  }
                  this.$api.duty
                    .handleUpdateSave({
                      ...this.formData,
                      activityType: this.formData.activityType.toString()
                    })
                    .then(res => {
                      this.$message({
                        message: "保存成功",
                        type: "success"
                      });
                      this.$intent.closeWindow(this);
                    });
                }
              });
            } else if (this.fromType === "add") {
              console.log("add");
              /** @description: 拟稿保存 */
              this.$refs.form.validate(valid => {
                /** @description: 表单校验 */
                if (valid) {
                  for (const i in this.submitDeptData) {
                    if (
                      this.submitDeptData[i].firstUnitName ===
                      this.formData.submitDept
                    ) {
                      this.formData.curUserDeptId = this.submitDeptData[
                        i
                      ].firstUnitId;
                    }
                  }
                  this.$api.duty
                    .handleSave({
                      submitDeptId:
                        this.$route.query.submitDeptId ||
                        this.formData.submitDeptId,
                      ...this.formData,
                      route: "00001",
                      activityType: this.checkItemId
                    })
                    .then(res => {
                      console.log(res, "打印保存返回的数据");
                      this.submitId = res.id;
                      this.id = res.id;
                      this.$message({
                        message: "保存成功",
                        type: "success"
                      });
                      this.$intent.closeWindow(this);
                      this.formData.id = res.id;
                      this.workflowId = res.workflowId;
                      this.touFlag = "1";
                      this.fromType = "detail";
                    });
                } else {
                  this.$message({
                    type: "warning",
                    message: "请填写表单"
                  });
                }
              });
            }
            // this.save();
            // this.$intent.closeWindow(this);
            // this.saveClose()
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
    },
    /** @description: 参考示例按钮 */
    exampleClick() {
      if (this.formData.activityType && this.formData.activityType.length > 0) {
        this.dialogVisible = true; /** @description: 打开弹窗 */
        this.$api.duty.getExample({ ids: this.checkItemId }).then(res => {
          console.log(res, "打印参考示例按钮内容");
          /** @description: 获取参考示例内容 */
          this.contentExample = res.contentExample;
        });
      } else {
        this.$message({
          type: "warning",
          message: "请勾选活动类别"
        });
      }
    },
    /** @description: 关闭弹窗 */
    handleClose() {
      this.dialogVisible = false;
    },
    /** @description: 点击按钮 */
    buttonClick(item) {
      if (item === "保存") {
        /** @description: 调用保存方法 */
        this.save();
      } else if (item === "完成并发送") {
        if (this.formData.flag && this.formData.oldUserId) {
          if (typeof this.formData.wfeWork === "string") {
            this.formData.wfeWork = JSON.parse(this.formData.wfeWork);
          }
          this.$confirm("是否退回" + this.formData.oldUserName + "?", "提示", {
            confirmButtonText: "是",
            cancelButtonText: "否",
            type: "warning"
          })
            .then(() => {
              console.log(":{{{{{{{{{");

              this.$api.duty
                .handleSubmitBackOnOk({ ...this.formData })
                .then(res => {
                  this.$message({
                    message: "退回成功",
                    type: "success"
                  });
                  this.$intent.closeWindow(this);
                });

              // this.$api.duty.giveBack({ ...this.formData }).then(res => {
              //   this.$message({
              //     message: "退回成功",
              //     type: "success"
              //   });
              //   this.gotoPublishedPage(
              //     this.sourceRouteNameFromQuery,
              //     {},
              //     {},
              //     false
              //   );
              // });
            })
            .catch(() => {
              console.log("::}}}}}}}}}}}");
              this.submit();
            });
        } else {
          this.submit();
        }
      } else if (item === "投稿") {
        if (typeof this.formData.wfeWork === "string") {
          this.formData.wfeWork = JSON.parse(this.formData.wfeWork);
        }
        if (this.fromType === "add") {
          /** @description: 拟稿进来 */
          if (this.touFlag === "0") {
            /** @description: 没有保存 */

            /** @description: 执行保存 */
            this.$api.duty
              .handleSave({
                submitDeptId:
                  this.$route.query.submitDeptId || this.formData.submitDeptId,
                ...this.formData,
                route: "00001",
                activityType: this.checkItemId
              })
              .then(res => {
                this.submitId = res.id;
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.workflowId = res.workflowId;
                this.touFlag = "1";

                /** @description: 投稿 */
                console.log(this.formData);
                this.fromType = "sumitPage"; /** @description: 投稿标识 */
                this.$set(
                  this.formData,
                  "submitDate",
                  formatData(new Date().getTime(), "YYYY-MM-DD HH:mm:ss")
                );
                this.rules.submitDate = [
                  /** @description: 报送日期禁用 */
                  {
                    required: true,
                    message: "请选择报送日期",
                    trigger: "change"
                  }
                ];
                delete this.formData.auditIdea;
                delete this.formData.remark;
                /** @description: 调用投稿方法 */
                this.submitData();
              });
          } else if (this.touFlag === "1") {
            /** @description: 已经保存，直接投稿 */
            this.fromType = "sumitPage"; /** @description: 投稿标识 */
            this.$set(
              this.formData,
              "submitDate",
              formatData(new Date().getTime(), "YYYY-MM-DD HH:mm:ss")
            );
            this.rules.submitDate = [
              /** @description: 报送日期禁用 */
              {
                required: true,
                message: "请选择报送日期",
                trigger: "change"
              }
            ];
            delete this.formData.auditIdea;
            delete this.formData.remark;
            /** @description: 调用投稿方法 */
            this.submitData();
          }
        } else {
          /** @description: 详情进来 */
          console.log(this.formData);
          this.fromType = "sumitPage"; /** @description: 投稿标识 */
          this.$set(
            this.formData,
            "submitDate",
            formatData(new Date().getTime(), "YYYY-MM-DD HH:mm:ss")
          );
          this.rules.submitDate = [
            /** @description: 报送日期禁用 */
            {
              required: true,
              message: "请选择报送日期",
              trigger: "change"
            }
          ];
          delete this.formData.auditIdea;
          delete this.formData.remark;
          /** @description: 调用投稿方法 */
          this.submitData();
        }
      } else if (item === "打印处理单") {
        /** @description: 调用打印方法 */
        this.printForm();
      } else if (item === "删除此文") {
        /** @description: 调用打印方法 */
        this.delateForm();
      } else if (item === "查看流程") {
        this.showFlowChart = true;
        this.$api.duty
          .checkFlowData({
            /** @description: curProcessInstId: this.curProcessInstId || this.workflowId, */
            curProcessInstId: this.workflowId
          })
          .then(res => {
            this.tableData = res.data;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          });
      } else if (item === "收回") {
        this.handleGetBack();
      }
    },

    save() {
      /** @description: 如果是当前行进详情 */
      if (this.fromType === "detail") {
        console.log("detail");
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(this.formData.activityType.toString(), "6666");
            if (typeof this.formData.wfeWork === "string") {
              this.formData.wfeWork = JSON.parse(this.formData.wfeWork);
            }
            this.$api.duty
              .handleUpdateSave({
                ...this.formData,
                activityType: this.formData.activityType.toString()
              })
              .then(res => {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              });
          }
        });
      } else if (this.fromType === "add") {
        console.log("add");
         let self=this;
        /** @description: 拟稿保存 */
        this.$refs.form.validate(valid => {
          /** @description: 表单校验 */
          if (valid) {
            for (const i in this.submitDeptData) {
              if (
                this.submitDeptData[i].firstUnitName ===
                this.formData.submitDept
              ) {
                this.formData.curUserDeptId = this.submitDeptData[
                  i
                ].firstUnitId;
              }
            }
           
            this.submitDeptId=this.$route.query.submitDeptId || this.formData.submitDeptId;
            console.log('submitDeptId-----',this.$route.query.submitDeptId || this.formData.submitDeptId)
            this.$api.duty
              .handleSave({
                submitDeptId:
                  this.$route.query.submitDeptId || this.formData.submitDeptId,
                ...this.formData,
                route: "00001",
                activityType: this.checkItemId
              })
              .then(res => {
                console.log(res, "打印保存返回的数据");
                this.submitId = res.id;
                this.id = res.id;
                // this.$intent.replace(this, {
                //   name: "dutyTrendsSendHandle",
                //   query: { id: this.id }
                // });
                //this.load(res.id);
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.$intent.replace(this, {
                  name: "dutyTrendsSendHandle",
                  query: {
                    /** @description: 来源路由名 据此中详情页中导航回来*/
                    sourceRouteName: "dutyTrendInfoSend",
                    activeName: "tabs_todo",
                    id: this.id,
                    type: "detail",
                    tabsType: "1" //表示待办
                  }
                });
                location.reload();
                this.formData.submitDeptId=self.submitDeptId;
                this.formData.id = res.id;
                this.workflowId = res.workflowId;
                this.touFlag = "1";
                this.fromType = "detail";
              });
          } else {
            this.$message({
              type: "warning",
              message: "请填写表单"
            });
          }
        });
      }
    },
    /** @description: 完成并发送 */
    submit() {
      this.$refs.form.validate(valid => {
        /** @description: 表单校验 */
        if (valid) {
          console.log(this.fromType, "submitId");
          if (this.fromType === "add") {
            /** @description: 先走保存 */
            for (const i in this.submitDeptData) {
              if (
                this.submitDeptData[i].firstUnitName ===
                this.formData.submitDept
              ) {
                this.formData.curUserDeptId = this.submitDeptData[
                  i
                ].firstUnitId;
              }
            }
            this.$api.duty
              .handleSave({
                submitDeptId:
                  this.$route.query.submitDeptId || this.formData.submitDeptId,
                ...this.formData,
                route: "00001",
                activityType: this.checkItemId
              })
              .then(res => {
                /** @description: 删除返回数组数据 */
                delete this.formData.auditIdea;
                delete this.formData.remark;
                console.log("df", this.formData);
                // 走详情的接口
                this.id = res.id;
                this.wanchengxiang(res.id);
                // wanchengbingfasong
              });
          } else if (this.fromType === "detail") {
            this.dialogState = true; /** @description: 打开选人弹窗 */
            /** @description: 删除返回数组数据 */
            delete this.formData.auditIdea;
            delete this.formData.remark;
            console.log("df", this.formData);
            if (typeof this.formData.wfeWork === "string") {
              this.formData.wfeWork = JSON.parse(this.formData.wfeWork);
            }
            this.$api.duty
              .submit({
                ...this.formData,
                route: "00002",
                id: this.submitId || this.formData.id,
                activityType: this.formData.activityType.toString()
              })
              .then(res => {
                console.log(res, "打印完成并发送返回的id1111");
                this.resSubmitId = res.id;

                this.seletOptionsData =
                  (res && res.list) || []; /** @description: 下一处理环节赋值 */
                this.curProcessInstId = res.curProcessInstId;
              });
          }
        } else {
          this.$message({
            type: "warning",
            message: "请先填写表单"
          });
        }
      });
    },

    // xiangjie jiekou

    wanchengxiang(Id) {
       let params;
       switch(this.activeName){
          case 'tabs_doing':
            params={
              id:this.id,filterState:2
            }
            break;
          case 'tabs_end':
             params={
              id:this.id,filterState:3
            }
            break;
          case 'tabs_todo':
             params={
              id:this.id,filterState:1
            }
            break;
          case 'tabs_all':
             params={
              id:this.id,filterState:0
            }
            break;            
       }
      this.$api.duty.informationTransQuery(params).then(res => {
        if (res.code === "SUCCESS") {
          this.dialogState = true; /** @description: 打开选人弹窗 */
          this.formData = res.order;
          this.formData.flag = res.flag;
          this.checkItemId = this.formData.activityType;
          var activityTypeData = this.formData.activityType;
          /** @description: 流程id */
          this.workflowId = this.formData.workflowId;
          /** @description: 活动类别赋值 */
          if (this.formData.activityType) {
            this.formData.activityType =
              typeof this.formData.activityType === "string"
                ? this.formData.activityType.split(",")
                : this.formData.activityType;
          }
          this.formData.wfeWork = JSON.parse(this.formData.wfeWork);
          this.$api.duty
            .submit({
              ...this.formData,
              route: "00002",
              id: Id,
              activityType: activityTypeData.toString()
            })
            .then(res => {
              console.log(res, "打印完成并发送返回的id");
              this.resSubmitId = res.id;
              this.seletOptionsData =
                (res && res.list) || []; /** @description: 下一处理环节赋值 */
              this.curProcessInstId = res.curProcessInstId;
              this.fromType = "detail";
              this.formData.pcsAvyId = res.list[0].PCSAVYID;
              this.formData.curMultiTenancyId = res.list[0].MULTITENANCYID;
              this.formData.id = res.id;
              // this.workflowId = res.workflowId;
              /** @description: this.$router.go(-1); */
            });
        }
      });
    },

    /** @description: 投稿按钮 */
    submitData() {
      console.log(
        this.$route.query.submitDeptId,
        "this.$route.query.submitDeptId"
      );
      this.$refs.form.validate(valid => {
        /** @description: 表单校验 */
        if (valid) {
          this.$api.duty
            .submitFormData({
              submitDeptId:
                this.$route.query.submitDeptId || this.formData.submitDeptId,
              id: this.submitId || this.formData.id,
              route: "00003",
              ...this.formData,
              activityType: this.formData.activityType.toString()
            })
            .then(res => {
              this.$message({
                message: "投稿成功",
                type: "success"
              });
              this.gotoPublishedPage("dutyTrendInfoSend", {
                btnType: "submit"
              });
            });
        } else {
          this.$message({
            type: "warning",
            message: "请填写表单"
          });
        }
      });
    },
    /** @description: 获取投稿栏目数据源 */
    getSubmitColumn() {
      // 当前登录人 总行 1  一级分行 2  子公司 3
      this.$api.duty
        .getSubmitColumnData({ webColumnType: "1", type: "1" })
        .then(res => {
          this.submitColumnData = res.columnCategoryList;
          console.log("获取投稿栏目数据源", this.submitColumnData);
        });
    },
    /** @description: 获取活动类别 */
    getCheckboxList() {
      this.$api.duty
        .getSubmitColumnList({ draftOrganId: this.orgId })
        .then(res => {
          // debugger;
          console.log("77777777777", this.formData);
          this.checkDataList = (res && res.orderList) || [];
          this.otherBankId =
            this.formData.activityType && this.formData.activityType;
          this.otherBankName =
            this.formData.activeTypeName &&
            this.formData.activeTypeName.split(",");
          for (const i in this.otherBankId) {
            this.whetherToRepeat = true;
            for (const index in this.checkDataList) {
              if (this.otherBankId[i] === this.checkDataList[index].id) {
                this.whetherToRepeat = false;
              }
            }
            if (this.whetherToRepeat) {
              this.checkDataList.push({
                id: this.otherBankId[i],
                activityCategory: this.otherBankName[i]
              });
            }
          }
          this.$set(this.formData, "checkDataList", this.checkDataList);
          console.log(res, "打印获取活动类别返回的东西");
        });
    },
    /** @description: 当绑定值变化时触发的事件 */
    handleChange(val) {
      this.nameArrays = [];
      console.log(val);
      // debugger;
      for (const i in this.checkDataList) {
        for (const index in val) {
          if (val[index] === this.checkDataList[i].id) {
            this.flag = true;
          }
        }
        if (this.flag) {
          this.nameArrays.push(this.checkDataList[i].activityCategory);
          this.flag = false;
        }
      }
      this.checkItemId = this.getStrFromListAndSeparator(
        val
      ); /** @description: 数组转字符串 */
      this.formData.activeTypeName =
        this.nameArrays && this.nameArrays.join(",");
      console.log(val, this.formData.activeTypeName, "打印选中的活动类别");
    },
    /** @description: 打印处理单 deptTableHeader */
    printForm() {
      this.formData.title = this.formData.submitUnit + "信息报送处理单";
      let copyRow = JSON.stringify(
        this.formData
      ); /** @description: 当前行数据转换字符串 */
      // this.openNewWindow('/infoSendPrint', {data: copyRow})

      /** @description: 跳转页面 */
      this.gotoPublishedPage(
        "infoSendPrint",
        {
          /** @description: 来源路由名 据此中详情页中导航回来*/
          sourceRouteName: "dutyTrendsSendHandle",
          ...this.queryDataExcludeSourceRouteName,
          data: copyRow
        },
        { sourceRouteName: this.sourceRouteNameFromQuery },
        false
      );
    },

    // 删除此文
    delateForm() {
      console.log("sahnchuciwen");
      if (!this.formData.id) {
        this.$message({
          type: "warning",
          message: "请先保存此文！"
        });
      } else {
        if (typeof this.formData.wfeWork === "string") {
          this.formData.wfeWork = JSON.parse(this.formData.wfeWork);
        }
        this.$api.duty.deletaForm({ ...this.formData }).then(res => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.$intent.closeWindow(this);
        });
      }
    },
    openNewWindow(path, query) {
      if (query) {
        let { href } = this.$router.resolve({
          path: path, //"/secretary/partyMemLeavRep/detail",   // 这里写的是要跳转的路由地址
          query: query //{id:'1111'}  // 这里写的是页面参数
        });
        window.open(href, "_blank");
      } else {
        let { href } = this.$router.resolve({
          path: path //"/secretary/partyMemLeavRep/detail",   // 这里写的是要跳转的路由地址
        });
        window.open(href, "_blank");
      }
    },
    /** @description: 选人成功 */
    showCompDialog(data, status, type, params, dtype) {
      // debugger;
      console.log("-------->", data, status, type, "params", params, dtype);
      if (status) {
        delete this.formData.curUserDeptId;
        let param = {
          pcsavyId: params.idStr || params.id,
          id: this.submitId || this.resSubmitId,
          nextUserId: data[0].id,
          nextUserName: data[0].name,
          nextAvyId: params.idStr || params.id,
          nextAvyName: params.name,
          submitDeptmentNameByTree: data[0].deptName,
          curUserDeptId: data[0].deptId || data[0].id.split("#")[1]
        };
        /** @description:  */
        this.$api.duty
          .handleSubmitOnOk({ ...param, ...this.formData })
          .then(res => {
            this.dialogState = false; /** @description: 关闭选人弹窗 */
            this.$message({
              type: "success",
              message: "完成并发送成功"
            });

            this.$intent.closeWindow(this);
          });
      } else {
        this.dialogState = false; /** @description: 关闭选人弹窗 */
      }
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}
.pad_lr10 {
  margin: 0 0 15px 0;
}
.selectDept {
  background: white;
  margin: 0 auto;
  .headerClick {
    display: inline-block !important;
    background: #409eff;
    color: white;
    height: 60px;
    // position: static !important;
    line-height: 60px;
    .left {
      margin-left: 20px;
    }
    .right {
      margin-right: 20px;
      float: right;
    }
  }
  .formHeader {
    padding: 8px 70px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
          margin-top: 70px;
    }
  }
  .process_content {
    width: 80%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;
    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f60;
      background: #fef7e7;
      .cur_sess {
        p {
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;
          float: left;
          span {
            color: #f9aa21;
          }
        }
      }
    }
  }
}
/deep/.el-form-item__content{
    border: 1px solid rgba(228,231,237);
    border-radius: 4px;
}
/deep/.el-input.is-disabled .el-input__inner, /deep/.el-textarea.is-disabled .el-textarea__inner{
    border: none;
    border-radius: 0;
}
</style>
