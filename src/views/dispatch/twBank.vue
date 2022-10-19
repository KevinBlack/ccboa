<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>退文处理单
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="drafting(0)">查看正文</el-button>
          <!-- <el-button size="small" plain @click="selectBackInfoListBySendOrderId()">退文说明</el-button>
          <el-button size="small" plain @click="flowScheme()">查看流程</el-button> -->
          <el-button size="small" plain @click="processSheet()">打印退文单</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{ draftOrganTitle }}</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <div class="bank_dispach_file" style="padding: 50px 50px 20px 20px;">
          <el-form
            ref="fromdata"
            :rules="rules"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <div>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="发文字号" prop="documentNo" ref="documentNo">
                    <el-input v-model="fromdata.documentNo" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="秘密类型" :span="8" prop="secretType" ref="secretType">
                    <el-select
                      @change="secretTypechange"
                      v-model="fromdata.secretType"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option
                        v-for="secretTypeitem in SsecretType"
                        :key="secretTypeitem.label"
                        :label="secretTypeitem.label"
                        :value="secretTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 工作秘密 -->
                <el-col :span="8" v-if="secretTypeFlag && !flag && workSecurityFlag">
                  <el-form-item label="秘密标志" :span="8" prop="secretFlagType" ref="secretFlagType">
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.secretFlagType"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option
                        v-for="workSecurityitem in SworkSecretFlag"
                        :key="workSecurityitem.label"
                        :label="workSecurityitem.label"
                        :value="workSecurityitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 内部信息 -->
                <el-col :span="8" v-show="secretTypeFlag && !flag && !workSecurityFlag">
                  <el-form-item label="秘密标志" :span="8" prop="secretFlagType" ref="secretFlagType">
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.secretFlagType"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <!-- <el-option
                        v-for="secretFlagitem in secretOptionsFlag"
                        :key="secretFlagitem.label"
                        :label="secretFlagitem.label"
                        :value="secretFlagitem.label"
                      ></el-option>-->
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item
                    label="秘密期限类型"
                    :span="8"
                    v-if="flag"
                    prop="secretLimitType"
                    ref="secretLimitType"
                  >
                    <el-select
                      @change="workSecurityTab"
                      v-model="fromdata.secretLimitType"
                      placeholder="请选择"
                      style="width:100%"
                      disabled
                    >
                      <el-option
                        v-for="secretLimitTypeitem in SSsecretLimitType"
                        :key="secretLimitTypeitem.label"
                        :label="secretLimitTypeitem.label"
                        :value="secretLimitTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 选择保密期限 -->
                <el-col :span="8">
                  <el-form-item
                    label="密级和保密期限"
                    :span="8"
                    prop="secretFlagType"
                    ref="secretFlagType"
                    v-if="flag && secretFlagTypeFlag"
                  >
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.secretFlagType"
                      placeholder="请选择"
                      style="width:45%"
                      disabled
                    >
                      <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option>
                    </el-select>
                    <i class="el-icon-star-off pad_10"></i>
                    <el-input
                      style="width:25%"
                      @input="workSecurityTabTime"
                      v-model="fromdata.secretFlagContent"
                      prop="secretFlagContent"
                      ref="secretFlagContent"
                      disabled
                    ></el-input>

                    <el-select
                      name="secretTimeType"
                      v-model="fromdata.secretTimeType"
                      @change="workSecurityTabTime"
                      placeholder="请选择"
                      style="width:25%"
                      prop="secretTimeType"
                      ref="secretTimeType"
                      disabled
                    >
                      <el-option
                        v-for="secretTimeTypeitem in SsecretTimeType"
                        :key="secretTimeTypeitem.label"
                        :label="secretTimeTypeitem.label"
                        :value="secretTimeTypeitem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 选择解密时间 -->
                <el-col :span="8">
                  <el-form-item
                    label="密级和保密期限"
                    :span="8"
                    prop="secretFlagType"
                    ref="secretFlagType"
                    v-if="flag && businessSecretFlag"
                  >
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.secretFlagType"
                      placeholder="请选择"
                      style="width:45%"
                      disabled
                    >
                      <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                        disabled
                      ></el-option>
                    </el-select>
                    <i class="el-icon-star-off pad_10"></i>

                    <el-date-picker
                      type="date"
                      @blur="workSecurityTabTime"
                      placeholder="选择日期"
                      v-model="fromdata.secretFlagContent"
                      style="width: 49%;"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <!-- 选择解密条件 -->
                <el-col :span="8">
                  <el-form-item
                    label="密级和保密期限"
                    prop="secretFlagType"
                    ref="secretFlagType"
                    v-if="flag && secretFlagTypetiaojFlag"
                  >
                    <el-select
                      @change="workSecurityTabTime"
                      v-model="fromdata.secretFlagType"
                      placeholder="请选择"
                      style="width:46%"
                      disabled
                    >
                      <el-option
                        v-for="secretFlagTypeitem in SbusinessSecret"
                        :key="secretFlagTypeitem.label"
                        :label="secretFlagTypeitem.label"
                        :value="secretFlagTypeitem.label"
                      ></el-option>
                    </el-select>
                    <i class="el-icon-star-off pad_10"></i>

                    <el-select
                      name="secretTimeType"
                      @change="workSecurityTabTime"
                      v-model="fromdata.secretTimeType"
                      placeholder="请选择"
                      style="width:49%"
                      prop="secretTimeType"
                      ref="secretTimeType"
                      disabled
                    >
                      <el-option
                        v-for="secretLimititem in SsecretLimit"
                        :key="secretLimititem.label"
                        :label="secretLimititem.label"
                        :value="secretLimititem.label"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="成文日期" :disabled="true">
                    <el-date-picker
                      type="date"
                      v-model="fromdata.completeTime"
                      style="width: 100%;"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="发文日期" :disabled="true">
                    <el-date-picker
                      type="date"
                      v-model="fromdata.sendTime"
                      style="width: 100%;"
                      disabled
                    ></el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input v-model="fromdata.title" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题">
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.attachTitle" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="退文机构" prop="backOrganization" ref="backOrganization">
                    <el-input v-model="fromdata.backOrganization" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="退文人" prop="backPeople" ref="backPeople">
                    <el-input v-model="fromdata.backPeople" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="退文时间" prop="backTime" ref="backTime">
                    <el-input v-model="fromdata.backTime" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="退文原因">
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.backReason" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
      </div>
    </div>
    <!-- 退回说明 -->
    <el-dialog
      v-dialogDrag
      title="退回说明"
      :visible.sync="thShuoMingFlag"
      width="60%"
      class="xiugaicb"
    >
      <!-- <p class="xuanzTh">选择退回环节</p> -->
      <el-scrollbar>
        <m-table
          size="medium"
          :isSelection="false"
          :isPagination="false"
          :isHandle="false"
          :tableData="tableDataThShuoM"
          :tableCols="tableColsThShuoM"
          class="table_TH"
        ></m-table>
      </el-scrollbar>

      <span slot="footer" class="dialog-footer">
        <el-button @click="thShuoMingFlag = false">关 闭</el-button>
      </span>
    </el-dialog>
    <timeDialog :tableData="tableData" ref="dialogLine" v-if="timeShow"></timeDialog>
  </div>
</template>

<script>
import timeDialog from "@/components/timedialog/timedialog";

const ThShuoMfinshData = [
  { label: "执行环节", prop: "backNode", align: "center", width:"150px" },
  { label: "退回环节", prop: "beBackNode", align: "center", width:"150px" },
  { label: "退回原因", prop: "backReason", align: "center" },
  { label: "退回时间", prop: "backTime", align: "center", width:"180px" }
];

export default {
  name: "TwBank",
  components: {
    timeDialog
  },
  data() {
    return {
      thShuoMingFlag: false, // 退文说明
      tableDataThShuoM: [],
      tableColsThShuoM: ThShuoMfinshData,
      bank_selectBackInfoListBySendOrderId: {
        function: "selectBackInfoListBySendOrderId",
        id: ""
      },

      timeShow: false, //查看流程
      bank_cklc: {
        function: "getHistoryActInfo",
        // processInstId: "20200728122237000000000221"
        processInstId: ""
      },

      //秘密期限类型
      flag: false,
      // 秘密标志
      secretTypeFlag: false,
      // 工作秘密
      workSecurityFlag: false,
      // 密级和保密期限  保密期限  显示隐藏
      secretFlagTypeFlag: false,
      // 密级和保密期限  解密时间  显示隐藏
      businessSecretFlag: false,
      // 密级和保密期限  解密条件  显示隐藏
      secretFlagTypetiaojFlag: false,
      // 定密依弹窗
      secretDialog: true,
      // 初始化查询
      twBank: {
        function: "findByIdBackOrder",
        id: ""
        // id: "1"
      },
      fromdata: {
        function: "",
        documentNo: "",
        attachTitle: "",
        sendTime: "",
        title: "",
        backOrganization: "",
        backPeople: "",
        backTime: "",
        backReason: "",

        businessType: "",
        canNotShouHuiIds: "",
        comments: "",
        commentsList: "",
        
        currentDate: "",
        currentNode: "",
        currentNodeId: "",
        currentTime: "",
        currentUser: "",
        secretFlag: "",
        secretFlagContent: "",
        secretFlagType: "",
        secretGists: "",
        secretLimitType: "",
        secretTimeType: "",
        secretType: ""
      },
      SsendType: [],
      SredHead: [],
      SemergencyLevel: [],
      SbusinessType: [],
      StextType: [],
      SsecretType: [],
      SsecretFlagType: [],
      SsecretFlagContent: [],
      SdirectRange: [],
      SdirectType: [],
      SsignDepartment: [],
      Smain: [],
      Scopy: [],
      Sinline: [],
      SkeepLimit: [],
      SworkSecretFlag: [],
      SbusinessSecret: [],
      SsecretLimit: [],
      SsecretTimeType: [
        {
          label: "年"
        },
        {
          label: "月"
        },
        {
          label: "日"
        }
      ],
      copyRules: {
        qianBaoTypeName: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择签报类型"
          }
        ],
        submittedName: [
          {
            required: true,
            trigger: ["blur"],
            message: "请输入呈送"
          }
        ],
        qianbaoCode: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择签报字号"
          }
        ],
        handleType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择处理类型"
          }
        ],
        draftDepartmentName: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择拟稿部门"
          }
        ],
        draftUserName: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择联系人"
          }
        ],
        secretType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择秘密类型"
          }
        ],
        workSecretFlag: [
          { required: false, trigger: "change", message: "请选择秘密标志" }
        ],
        secretFlag: [
          { required: false, trigger: "change", message: "请选择秘密标志" }
        ],
        secretLimitType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择秘密期限类型"
          }
        ],
        security: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择密级和保密期限"
          }
        ],
        phone: [{ required: true, trigger: "blur", message: "请输入联系电话" }],
        title: [{ required: true, trigger: "blur", message: "请输入正文标题" }]
      },
      rules: {
        type: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择发文类型"
          }
        ],
        redHead: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择代字/红头"
          }
        ],
        businessType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择业务分类"
          }
        ],
        textType: [
          { required: true, trigger: ["blur", "change"], message: "请选择文种" }
        ],
        hostDepartment: [
          { required: true, trigger: "blur", message: "请输入主办部门" }
        ],
        userRange: [
          { required: true, trigger: "change", message: "请选择档案利用范围" }
        ],
        isStandardFile: [
          {
            required: true,
            trigger: "change",
            message: "请选择规章/规范性文件"
          }
        ],
        keepLimit: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请输入保管期限"
          }
        ],
        phone: [{ required: true, trigger: "blur", message: "请输入联系电话" }],
        isDirect: [
          { required: true, trigger: "change", message: "请选择直发文件" }
        ],
        title: [{ required: true, trigger: "blur", message: "请输入正文标题" }],
        main: [{ required: true, trigger: "blur", message: "请选择主送" }],
        name: [
          { required: true, message: "请输入标题名称", trigger: "blur" },
          { min: 3, max: 5, message: "3-5个字", trigger: "blur" }
        ],
        secretType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: " "
          }
        ],
        secretLimitType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: " "
          }
        ],
        workSecretFlag: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: " "
          }
        ],
        secretFlagType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: " "
          }
        ]
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //套红文件
      bank_findTemplete: {
        function: "findTemplete",
        sendType:'',
        redHead:''
      },
      //清稿/恢复操作
      bank_doRecoverFile: {
        function: "doRecoverFile",
        id:''
      },
      readFlag:"",
      draftOrganTitle: ""
    }
  },
  methods: {
    //初始值 //input框内容
    toEdit() {
      let that = this;
      this.twBank.choseYear = this.$route.query.choseYear||"";
      this.$post.postData("findByIdBackOrder", JSON.stringify(this.twBank), this.$businessCode.fawgl).then(res => {
        console.log(res);
        this.fromdata = res.data;
        if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
          that.draftOrganTitle = res.data && res.data.draftDepartment + "电子发文退文单";
        } else {
          that.draftOrganTitle = res.data && res.data.draftOrgan + "电子发文退文单";
        }

        // 更新为已读
        if (that.readFlag != 1) {
          that.getReadFlag();
        }
        if (res.data.secretType) {
          this.secretTypechange(res.data.secretType, true);
        }
        if (res.data.secretLimitType) {
          this.workSecurityTab(res.data.secretLimitType, true);
        }
        
      });
    },
    // 设置已读
    getReadFlag() {
      this.$post
        .postData(
          "doUpdateReadRecord",
          JSON.stringify({
            function: "doUpdateReadRecord",
            pcsAvyId: this.fromdata.pcsAvyId,
            processInstId: this.fromdata.processInstId,
            multiTenancyId: this.fromdata.multiTenancyId
          }),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          window.opener.location.reload();
        });
    },
    // 关闭
    handelclose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.preserve();
          window.location.href = "about:blank";
          window.close();
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消关闭",
            duation: 1000
          });
        });
    },
    // 商业秘密
    workSecurityTabTime(value) {
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    workSecurityTab(value, type) {
      if (value == "保密期限") {
        this.secretFlagTypeFlag = true;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.secretFlagTypetiaojFlag = false;
      } else if (value == "解密时间") {
        this.secretFlagTypeFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = true;
        // 密级和保密期限  解密条件  显示隐藏
        this.secretFlagTypetiaojFlag = false;
      } else if (value == "解密条件") {
        this.secretFlagTypeFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.secretFlagTypetiaojFlag = true;
      } else {
        this.secretFlagTypeFlag = false;
        // 密级和保密期限  解密时间  显示隐藏
        this.businessSecretFlag = false;
        // 密级和保密期限  解密条件  显示隐藏
        this.secretFlagTypetiaojFlag = false;
      }
      if (!type) {
        this.fromdata.secretFlagContent = "";
        this.fromdata.secretTimeType = "";
        this.fromdata.secretFlagContent = "";
      }
      if (type && this.fromdata.secretFlagType === "商业秘密") {
        this.fromdata.secretFlagType = "";
      }

      this.$forceUpdate();
      this.rules = this.copyRules;
      this.$nextTick(() => {
        this.$refs.fromdata.clearValidate();
      });
    },
    secretTypechange(value, type) {
      //type 回显处理
      if (value == "商业秘密") {
        this.flag = true;
        this.secretTypeFlag = false;
        this.SSsecretLimitType = [
          {
            label: "保密期限",
            value: 1
          },
          {
            label: "解密时间",
            value: 2
          },
          {
            label: "解密条件",
            value: 3
          }
        ];
        //this.copyRules.secretLimitType[0].required = true;
        //this.copyRules.secretFlagType[0].required = true;
      } else if (value == "内部信息") {
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = false;
        this.copyRules.secretFlag[0].required = true;
        this.secretOptionsFlag = [].concat(this.SsecretFlag);
      } else if (value == "工作秘密") {
        this.flag = false;
        this.secretTypeFlag = true;
        this.workSecurityFlag = true;
        this.secretOptionsFlag = [].concat(this.SworkSecretFlag);
      } else {
        this.flag = false;
        this.secretTypeFlag = false;
        this.workSecurityFlag = false;
      }
      if (!type) {
        this.fromdata.secretFlagType = "";
        this.fromdata.secretFlag = "";
        this.fromdata.secretLimitType = "";
        this.fromdata.secretFlagType = "";
      }
      this.$refs.fromdata.clearValidate();
    },
     //请求文件路径
    async getFileInfo(self,thInfo) {
      var successInfo = {state:false};
      self.bank_doDownloadFile.fileName = thInfo?thInfo.templateUrl.fileName:self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = thInfo?thInfo.templateUrl.filePath:self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fawglfj
        )
        .then(res => {
          if (res && res.success) {
            if(thInfo){
              successInfo.filePath = thInfo.filePath;
              successInfo.fileName = thInfo.fileName;
              successInfo.filePathTh = res.filePath;
              successInfo.fileNameTh = res.fileName;
            }else{
              successInfo.filePath = res.filePath;
              successInfo.fileName = res.fileName;
            }

            successInfo.state = true;
          }else{
             self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端获取失败",
              duration: 500
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "获取失败",
            duration: 500
          });
         successInfo.state = false
        });
        return successInfo
    },
    // 起草正文
    drafting(state) {
      let that = this;

      this.zhengWenState = state;
      if(!this.fromdata.filePath&&!this.fromdata.fileName&&state!=1){
         this.$message({
            type: "error",
            offset: 100,
            showClose: true,
            message: "请先起草正文",
            duation: 500
          });
        return;
      }
      
      this.getFileInfo(that).then((res)=>{
        if(res.state){
          this.doDraft(res)
        }
      })

    },
    //正文跳转
    doDraft(fileInfo){
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: this.zhengWenState!=1?'viewFile':this.draftFlag,
          id:getFormId(this.$route.query.id,"bankDispachId"),
          zhengWenState:this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          multiTenancyId:this.fromdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          pageFlag:'fawen',
          showBtns:false
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    // 退回说明
    selectBackInfoListBySendOrderId() {
      this.thShuoMingFlag = true;
      this.bank_selectBackInfoListBySendOrderId.id = this.fromdata.id;
      this.$post
        .postData(
          "selectBackInfoListBySendOrderId",
          JSON.stringify(this.bank_selectBackInfoListBySendOrderId),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.tableDataThShuoM = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查看流程
    flowScheme() {
      this.timeShow = true;
      this.bank_cklc.processInstId = this.fromdata.processInstId;
      this.$post
        .postData(
          "getHistoryActInfo",
          JSON.stringify(this.bank_cklc),
          this.$businessCode.ggfawgl
        )
        .then(res => {
          if (res) {
            this.tableData = res.data;
            if (this.fromdata.signState == "0") {
              let num = this.tableData.length - 1;
              this.tableData[num].nodeName = "正在会签";
            }
            // this.tableData.
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          }
        });
    },
    // 打印处理单
    processSheet() {
      const routeData = this.$router.resolve({
        path: "/printTwd",
        query: {
          id: this.$route.query.id
        }
      });
      window.open(routeData.href, "_blank");
    }
  },
  created() {
    //初始化加载数据
    this.twBank.id = this.$route.query.id
      ? this.$route.query.id
      : "";
    this.toEdit();
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.nav {
  width: 100%;
  height: 110px;
}
.bank_dispach_header {
  width: 100%;
}
.bank_dispach_tit {
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
.bank_dispack_side {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bank_dispach_back {
    visibility: hidden;
    width: 180px;
    font-size: 24px;
    color: #fff;
    .el-icon-arrow-left {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #fff;
      color: #3b85ef;
      border-radius: 50%;
      font-weight: 600;
      margin: 0 8px;
    }
  }
  .grid_comtent {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .bank_grid_comtent_active {
      border: 1px solid #fff;
      background: #0563c8;
      color: #fff;
    }
  }
}

.bank_dispach_content {
  width: 100%;
  height: auto;
  .bank_dispach_side_nav {
    width: 45px;
    height: auto;
    position: fixed;
    bottom: 8px;
    left: 10%;
    margin-left: -43px;
    text-align: center;
    a {
      width: 45px;
      height: 70px;
      border: 2px solid #3b85ef;
      font-size: 16px;
      margin: 15px 0;
      color: #3b85ef;
      background: #fff;
      border-radius: 10px 0 0 10px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .active {
      background: #3b85ef;
      color: #fff;
    }
  }

  .bank_dispach_file {
    width: 80%;
    height: auto;
    margin: 0 auto 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding-bottom: 100px;
    .bank_dispach_file_part {
      width: 80%;
      height: auto;
      margin: 0 auto;
      .bank_dispach_annotation {
        width: 100%;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        display: flex;
        font-size: 12px;
        margin: 40px 0 0;
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
    }
    .bank_dispach_file_tit {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #3b85ef;
      font-size: 16px;
      padding: 10px;
    }

    el-form-item {
      margin: 10px 0;
    }
  }

  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.opinionCheck_w {
  width: 100%;
  height: 84px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  color: #606266;
  .opinionCheck {
    text-align: left;
    margin-left: 20px;
  }
  .opinionCheckpeo {
    text-align: right;
    margin-right: 20px;
  }
}
.d_flex {
  display: flex;
  padding-bottom: 20px;
  .d_b100 {
    width: 100%;
  }
  .d_f1 {
    flex: 1;
  }
}
.pos_r {
  position: relative;
}
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #c0c4cc;
}
.table_TH {
  /deep/ .el-table__body-wrapper{
    .cell.el-tooltip{
      white-space: normal;
    }
  }
}
</style>
