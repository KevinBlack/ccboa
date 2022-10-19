
 <template>
  <div class="fileHandleDetail">
    <div>
      <!-- <i class="el-icon-arrow-left">文件办理单</i> -->
      <div class="headerClick">
        <template>
          <el-button
            class="bank_grid_comtent_active"
            v-for="(item,index) in buttonList"
            v-show="buttonList[index].show"
            @click="buttonClick(item.name)"
            :key="index"
            size="mini"
            plain
          >{{item.name}}</el-button>
        </template>
      </div>
    </div>
    <div class="shiwuTitle">{{dataForm.draftOrgan}}文件办理单</div>
    <div class="container" id="loadPdf">
      <div class="c-header">
        <span style="margin-left: 16px;">当前环节:</span>
        <span style="color: #f60; color: red !important;">{{dataForm.currentNode}}</span>
        <span style="margin-left: 30px;">当前处理人:</span>
        <span
          style="color: #f60; color: red !important;"
        >({{dataForm.curDeptName}}){{dataForm.currentUser}}</span>
      </div>
      <el-form
        label-position="right"
        id="aaa"
        class="dataForm"
        label-width="80px"
        style="margin-top: 30px;"
        :rules="rules"
        ref="dataForm"
        :model="dataForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" prop="documentNo">
              <el-input v-model="dataForm.documentNo" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" prop="createDate">
              <el-input v-model="dataForm.createDate" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="来文单位" prop="fromDept">
              <el-input v-model="dataForm.fromDept" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文号" prop="fileCode">
              <el-input v-model="dataForm.fileCode" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文件标题" prop="title">
          <el-input v-model="dataForm.title" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="办理部门" prop="hqDept">
          <el-select
            v-model="dataForm.hqDept"
            placeholder="请选择"
            style="width:100%"
            :disabled="true"
            value-key="hqDeptId"
            @change="selectChange"
          >
            <el-option
              v-for="item in hqDepts"
              :key="item.hqDeptId"
              :label="item.hqDept"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--     领导批示     -->
        <admin-conp
          lableTitle="领导批示"
          prop="leaderIdea"
          :formadatalist="dataForm.leaderIdeaList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'2'"
          formID="LD"
          suggestionType="0"
        ></admin-conp>

        <!--     收文部门拟办意见     -->
        <admin-conp
          lableTitle="收文部门拟办意见"
          prop="receiveIdea"
          :formadatalist="dataForm.receiveIdeaList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'2'"
          formID="SW"
          suggestionType="1"
        ></admin-conp>
        <!--     过程意见     -->
        <admin-conp
          lableTitle="过程意见"
          prop="processIdea"
          :formadatalist="dataForm.processIdeaList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'4'"
          formID="GC"
          suggestionType="2"
        ></admin-conp>
        <!--     部门办理情况     -->
        <admin-conp
          lableTitle="最终意见"
          prop="deptIdea"
          :formadatalist="dataForm.deptIdeaList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'4'"
          formID="BM"
          suggestionType="5"
        ></admin-conp>
        <!--     备注区域     -->
        <!-- <admin-conp
          lableTitle="处理单备注"
          prop="leaderIdea"
          :formadatalist="dataForm.remarkList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          :tableType="'4'"
          formID="BZ"
          suggestionType="4"
        ></admin-conp>-->
        <admin-conp
          lableTitle="备注"
          prop="leaderIdea"
          :formadatalist="dataForm.remarkDealList"
          @delefunc="delItem"
          :isWeiHu="disabled"
          tableType="4"
          formID="BL"
          suggestionType="6"
        ></admin-conp>
        <el-form-item label="附件" prop="attachid">
          <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
          <upfileList :canmoveOrdown="!disabled" label :fileList="dataForm.attchmentFileInfo"></upfileList>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="办理状态" :visible.sync="handleStateDialog" center>
      <el-table :data="stateData">
        <el-table-column prop="TMS" label="发送时间" width="200"></el-table-column>
        <el-table-column prop="UNITNM" label="部门" width="200"></el-table-column>
        <el-table-column prop="STATUS" label="办理状态"></el-table-column>
        <el-table-column prop="AVYEXCTRNM" label="处理人" width="200"></el-table-column>
        <el-table-column prop="ENDTM" label="结束时间"></el-table-column>
      </el-table>
    </el-dialog>
    <checkFlowDialog :tableData="tableData" ref="dialogLine" v-if="showFlowChart" v-dialogDrag></checkFlowDialog>
    <!--    选择人员树-->
    <select-person
      v-model="dialogState"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
    />
  </div>
</template>

  <script >
import adminConp from "views/bianhan/components/suggisitionAreaConp";
import checkFlowDialog from "@/components/viewFlow/shiwuFlow";
import selectPerson from "components/viewFlow/dispatchTree";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import upfileList from "./components/showUploadFile";
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/fileHandle.js";
import minixs from "@/minixs/index";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "fileHandleDetail",
  components: {
    uploadFileTs,
    selectPerson,
    checkFlowDialog,
    adminConp,
    upfileList
  },
  mixins: [minixs, viewDraft],

  data() {
    return {
      numyear: this.$route.query.numyear ? this.$route.query.numyear : "",
      isDispatch: false,
      isMaintain: false,
      isSelf: false,
      isBuild: false,
      isEnd: false,
      handleStateDialog: false,
      showFlowChart: false,
      isSaved: false,
      loadingTree: false,
      hqDepts: {},
      stateData: [
        {
          TMS: "2020-10-20",
          UNITNM: "",
          STATUS: "",
          AVYEXCTRNM: "",
          ENDTM: ""
        }
      ],
      tableData: [],
      actionType: "1",
      disabled: false,
      id: "",
      fileArr: [],
      identify: 0,
      statusType: "",
      rules: {},
      //人员数相关配置
      canTab: false,
      dialogVisible: false,
      treeData: [{ name: "中国建设银行", id: "007" }],
      seletOptionsData: [],
      offenUse: true,
      dialogType: "dosend",
      dialogTypeNow: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      singelCheckF: true, // 单选true 多选为false
      dialogState: false, //显示隐藏
      dataForm: {
        draftOrganFullName: "",
        currentNode: "",
        currentNodeId: "",
        currentUser: "",
        documentNo: "",
        createDate: "",
        fromDept: "",
        fileCode: "",
        title: "",
        hqDept: "",
        leaderIdea: "",
        receiveIdea: "",
        processIdea: "",
        callContent: "",
        remark: "",
        attachId: "",
        isReadFlag: "",
        remarkList: [],
        receiveIdeaList: [],
        processIdeaList: [],
        leaderIdeaList: [],
        deptIdeaList: []
      },
      uploadConfig: {
        id: "",
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0
      },

      //流程环节信息
      flowLinkInfo: {},
      buttonList: [
        { name: "关闭", type: "close", show: true },
        { name: "保存", type: "save", show: false },
        { name: "查看办理状态", type: "checkHandleState", show: false },
        { name: "查看流程", type: "checkFlow", show: true },
        { name: "打印处理单", type: "printHandleNote", show: true },
        { name: "操作指南", type: "operatorGuide", show: true },
        { name: "维护", type: "maintain", show:!this.$route.query.numyear?true:false },
        { name: "流程调度", type: "flowDispatch", show: !this.$route.query.numyear?true:false }
      ]
    };
  },
  mounted() {
  },
  computed: {},
  created() {
    this.dataForm.draftOrgan = JSON.parse(
      localStorage.getItem("userInfo")
    ).unitName;
    this.disabled = true;
    this.actionType = this.$route.query.identify;
    if (this.actionType === "2") {
      this.buttonList[7].show = false;
    }
    this.id = this.$route.query.id;
    this.getDetailIfo();
  },
  methods: {
    delItem(val) {
      if (val.id) {
        apis
          .adminFileDealDel({ id: val.id })
          .then(res => {
            if ((res.code = "SUCCESS")) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getDetailIfo();
            }
          })
          .catch(err => {
            this.$message({
              type: "success",
              message: err.msg
            });
          });
      } else {
        val.arrayList.pop(1);
      }

      console.log(val);
    },
    //设置部门名称
    selectChange() {
      const hqDept = this.dataForm.hqDept;
      this.dataForm.hqDeptId = hqDept.hqDeptId;
      this.dataForm.hqDept = hqDept.hqDept;

      console.log("----设置部门名称------->", this.dataForm.hqDept);
    },
        //初始化校验规则
    initRules() {
      //定义默认校验规则
      const DEFAULT_VERIFICATION_RULE = {
        rule: [{ required: true, message: "不能为空", trigger: "change" }]
      };
      //赋值
      let {
        rule: fromDept,
        rule: fileCode,
        rule: hqDept,
        rule: documentNo,
        rule: createDate,
        rule: title,
        rule: attachid,
        rule: deptIdea,
        rule: leaderIdea,
        rule: receiveIdea,
        rule: processIdea,
        rule: remark
      } = DEFAULT_VERIFICATION_RULE;
      this.rules = {
        fromDept,
        fileCode,
        hqDept,
        documentNo,
        createDate,
        title,
        attachid, //附件ID
        deptIdea,
        leaderIdea,
        receiveIdea,
        processIdea,
        remark
      };
    },
    //按钮控制
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.onClose();
          break;
        case "保存":
          this.save();
          break;
        case "完成并发送":
          this.send("完成并发送");
          break;
        case "办结":
          this.send("办结");
          break;
        case "查看流程":
          this.checkFlow();
          break;
        case "生成编号":
          this.buildNo();
          break;
        case "查看办理状态":
          this.checkState();
          break;
        case "打印处理单":
          this.onPrint();
          break;
        case "操作指南":
          this.readMe();
          break;
        case "流程调度":
          this.send("流程调度");
          break;
        case "发送办理部门":
          this.toHandleDep();
          break;
        case "维护":
          const saveIndex = this.buttonList.findIndex(
            item => item.type === "save"
          );
          this.buttonList[saveIndex].show = true;
          this.disabled = false;
          this.statusType = "2";
          this.getHandleDeps();
          break;

        default:
          break;
      }
    },

    //获取文件处理单详情

    getDetailIfo() {
      const that = this;
      const data = {
        id: that.id,
        numYear: this.numyear
      };
      apis.docHandlingDetail(data).then(res => {
        if (res.code === "SUCCESS") {
          console.log(res.data);
          that.$nextTick(() => {
            this.uploadConfig.id = res.data.parentId;
            // res.data.remarkList = res.remark;
            res.data.remarkDealList = res.remarkDeal;
            res.data.receiveIdeaList = res.receiveIdea;
            res.data.processIdeaList = res.processIdea;
            res.data.deptIdeaList = res.deptIdea;
            res.data.leaderIdeaList = res.leaderIdea;
            that.dataForm = res.data;
            this.getFileList(res.data.parentId);
          });
        }
      });
    },
    //获取附件列表
    getFileList(id) {
      const data = {
        id: id,
        numYear: this.numyear
      };
      this.$api.setSysConfig.getTextemList(data).then(res => {
        //      console.log("44",res);
        // this.$Set(this.dataForm, "attchmentFileInfo", res.data);
        this.dataForm.attchmentFileInfo = res.data;
        this.uploadConfig.filesHas = this.dataForm.attchmentFileInfo;
        this.$forceUpdate();
      });
    },
    fileList(files) {
      console.log("11" + files);
      if (
        this.dataForm.attchmentFileInfo &&
        this.dataForm.attchmentFileInfo.length
      ) {
        this.dataForm.attchmentFileInfo.push(...files);
      } else {
        this.dataForm.attchmentFileInfo = files;
      }
      let fileid = [];
      files.forEach(item => {
        fileid.push(item.id);
      });
      this.dataForm.attach = fileid.join(",");
      console.log(this.dataForm.attach);
      this.$forceUpdate();
    },
    //打印处理单
    onPrint() {
      const routerData = this.$router.resolve({
        path: "/printFormDetail",
        query: {
          id: this.id,
          type: 2,
          title: "文件办理单",
          numYear: this.numyear
        }
      });
      window.open(routerData.href, "_blank");
    },
    //关闭按钮
    onClose() {
      if (this.statusType == "2") {
        this.$confirm("是否保存并退出当前页面?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          distinguishCancelAndClose: true,
          type: "warning",
          callback: action => {
            if (action === "confirm") {
              //点是
              this.save();
              this.$intent.closeWindow(this);
            } else if (action === "cancel") {
              //点否
              this.$intent.closeWindow(this);
            } else if (action === "close") {
              //点右上角的x
            }
          }
        });
      } else {
        this.$intent.closeWindow(this);
      }
      // if (this.actionType === "0" || this.actionType === "4") {
      //   this.$confirm("是否保存并退出当前页面?", "提示", {
      //     confirmButtonText: "确定",
      //     cencelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       this.save();
      //       this.$router.go(-1);
      //     })
      //     .catch(() => {});
      // } else {
      //   this.$confirm("是否确认退出当前页面?", "提示", {
      //     confirmButtonText: "确定",
      //     cencelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       this.$router.go(-1);
      //     })
      //     .catch(() => {});
      // }
    },
    //保存按钮
    save(val) {
      let _this = this;
      _this.dataForm.id = this.id;
      const opinionList = [
        ..._this.dataForm.leaderIdeaList,
        ..._this.dataForm.receiveIdeaList,
        ..._this.dataForm.processIdeaList,
        ..._this.dataForm.deptIdeaList,
        // ..._this.dataForm.remarkList,
        ..._this.dataForm.remarkDealList
      ];
      _this.$set(_this.dataForm, "opinionList", opinionList);
      this.$refs["dataForm"].validate(valid => {
        apis
          .adminFileDealSave(_this.dataForm)
          .then(res => {
            if (res.code === "SUCCESS") {
              _this.$message({
                type: "success",
                message: "保存成功！"
              });
              // 在直接修改数组中的元素时，获取改元素的下表，防止元素增减造成修改错元素
              const saveIndex = this.buttonList.findIndex(
                item => item.type === "save"
              );
              this.buttonList[saveIndex].show = false;
              this.disabled = true;
            }
          })
          .catch(err => {
            _this.isSaved = false;
            _this.$message({
              type: "error",
              message: err.message
            });
          });
      });
    },
    //选人成功-完成并发送/
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      console.log(
        "data",
        data,
        "status",
        status,
        "type",
        type,
        "params",
        params,
        "dtype",
        dtype
      );
      if (status) {
        let chooseDataName = [];
        let chooseDataId = [];
        let id_name = [];
        data &&
          data.map(item => {
            item.id = "" + item.id;
            console.log("item.id", item.id);
            if (item.id.indexOf("#") > -1) {
              // let itemId = item.id.split('#')[0]
              // id_name.push(itemId + '_' + item.name)
              chooseDataName.push(item.name);
              chooseDataId.push(item.id);
            } else if (item.id.indexOf("#") == -1) {
              // id_name.push(item.id + '_' + item.name)
              chooseDataName.push(item.name);
              let itemId = item.id + "#" + item.deptId;
              chooseDataId.push(itemId);
            }
          });
        console.log("------选人----", chooseDataName);
        this.dataForm.currentUser = chooseDataName.join(",");
        this.dataForm.currentUserId = chooseDataId.join(",");
        this.dataForm.currentNodeId = params.id;
        this.dataForm.currentNode = params.name;
        if (this.isDispatch) {
          this.flowDispatch();
        } else {
          apis
            .sendFile(this.dataForm)
            .then(res => {
              if (res.code === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: res.msg
                });
                this.$intent.closeWindow(this)
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err
              });
            });
        }
      }
    },
    //完成并发送按钮
    send(val) {
      const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (!_this.dataForm.id) {
            _this.save(val);
          } else {
            _this.selectOrgAndPerson(val);
          }
        } else {
          _this.$message({
            type: "error",
            message: "请填写必填项"
          });
        }
      });
    },
    //获取办理部门和日期
    getHandleDeps() {
      apis
        .getHandleDeps({ numYear: this.numyear })
        .then(res => {
          console.log("----获取办理部门和日期---", res);
          if (res.code === "SUCCESS") {
            this.hqDepts = res.data.hqDept;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.message
          });
        });
    },
    //选择机构人员-完成并发送
    selectOrgAndPerson(val) {
      const _this = this;
      if (val === "完成并发送") {
        //选环节
        apis
          .getPersonInfoAndPersonTree({
            id: _this.dataForm.id
          })
          .then(res => {
            _this.seletOptionsData = res.data.list;
            if (res.data.result.message == "Loading") {
              _this.loadingTree = true;
            } else {
              _this.loadingTree = false;
            }
            _this.dialogState = true;
          })
          .catch(err => {
            console.log(err);
          });
        _this.dataForm.handleButton = val;
      } else if (val === "流程调度") {
        apis
          .docHandlingGetOrgAndPerson({
            id: _this.dataForm.id
          })
          .then(res => {
            _this.seletOptionsData = res.data;
            _this.dialogState = true;
          })
          .catch(err => {
            console.log(err);
          });
        _this.dataForm.handleButton = "发送下一办理人";
        _this.isDispatch = true;
      } else {
        _this.dataForm.handleButton = val;
        apis
          .sendFile(this.dataForm)
          .then(res => {
            if (res.code === "SUCCESS") {
              _this.$router.go(-1);
              _this.$message({
                type: "success",
                message: "办结完成"
              });
            }
          })
          .catch(err => {
            _this.$message({
              type: "error",
              message: err
            });
          });
      }
    },
    //生成编号
    buildNo() {
      apis
        .buildNo(this.dataForm)
        .then(res => {
          console.log("---生成编号---", res);
          if (res.code === "SUCCESS") {
            this.dataForm.documentNo = res.docementNo;
            this.$message({
              type: "success",
              message: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    //收回
    tackBack() {
      apis
        .tackBack({ id: this.dataForm.id, numYear: this.numyear })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.$intent.closeWindow(this)
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    //发送至办理部门
    toHandleDep() {
      apis
        .docHandlinAdd({ id: this.dataForm.id, numYear: this.numyear })
        .then(res => {
          console.log("发送至办理部门---", res);
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.$intent.closeWindow(this)
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    //查看办理状态
    checkState() {
      apis
        .checkState({ id: this.dataForm.parentId, numYear: this.numyear })
        .then(res => {
          console.log("查看办理状态", res);
          if (res.code === "SUCCESS") {
            this.stateData = res.data;
            this.handleStateDialog = true;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },

    //查看流程
    checkFlow() {
      const _this = this;
      apis
        .docHandlingCheckFlow({ id: this.dataForm.id, numYear: this.numyear })
        .then(res => {
          if (res.code === "SUCCESS") {
            console.log("查看流程", res);
            _this.showFlowChart = true;
            _this.tableData = res.data;
            _this.$nextTick(() => {
              _this.$refs.dialogLine.openDialog();
            });
          }
        })
        .catch(err => {
          _this.$message({
            type: "error",
            message: err
          });
        });
    },

    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      console.log("-----flagFile--->", flagFile);
      var successInfo = { state: false };
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = flagFile.fileName;
      bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          self.$businessCode.fwbzfj
        )
        .then(res => {
          console.log("-----res", res);
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件获取失败，请重新上传",
              duration: 1500
            });
            successInfo.state = false;
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
    //操作指南
    readMe() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "BHGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          console.log("res", res);
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.dataForm.id,
                    zhengWenState: 0,
                    JYcode: "A08462002",
                    multiTenancyId: "000000iiii",
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false
                  }
                });
                window.open(data.href, "_blank");
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件不存在",
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 1500
          });
        });
    },
    //流程调度
    flowDispatch() {
      const _this = this;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          apis
            .toNextPerson({
              id: _this.dataForm.id,
              ...this.dataForm
            })
            .then(res => {
              this.$intent.closeWindow(this)
              this.$message({
                type: "success",
                message: res.msg
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          _this.$message({
            type: "error",
            message: "请填写必填项"
          });
        }
      });
    },
    //下载
    onLoad() {
      exportTable.getPdf("xiazai", [], "loadPdf");
    }
  }
};
</script>

  <style scoped lang="less" rel="stylesheet/less">
.fileHandleDetail {
  background-color: #ffffff !important;
}
.el-header {
  background-color: rgb(64, 158, 255);
  line-height: 60px;
}
.title {
  color: #ffffff;
}
.btn {
  float: right;
}
.btnstyle {
  color: rgb(14, 117, 214);
}
.btnstyle:hover {
  background-color: rgb(14, 117, 214);
  color: cornsilk;
}
.shiwuTitle {
  width: 100%;
  min-height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
.container {
  width: 80%;
  min-height: 920px;
  padding: 20px 16px;
  margin: 0 auto;
  border: 1px solid #ccc;
}
.c-header {
  width: 95%;
  margin-left: 5%;
  height: 40px !important;
  margin-bottom: 20px;
  line-height: 40px;
  // border: 1px solid #f9aa21;
  border: 1px solid #f60;
  background: #fef7e7;
}
.el-table .cell {
  white-space: pre-line;
}
.el-form-item ::v-deep {
  margin-bottom: 12px;
}
.form-word {
  width: 80px;
  float: left;
  line-height: 20px;
  font-size: 14px;
  color: #606266;
  text-align: center;
}
.d_flex {
  position: relative;
}
.adviceInfo {
  position: absolute;
  bottom: 5%;
  right: 10px;
}
</style>
