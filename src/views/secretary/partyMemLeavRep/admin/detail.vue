<template>
  <div>
    <el-header>
      <div class="headerClick">
        <el-button
          class="btnstyle"
          style="background: #0563c8!important;
           color: #fff!important;"
          @click="onClose()"
        >关闭</el-button>
        <el-button
          class="bank_grid_comtent_active"
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          :key="index"
          v-show="!item.show"
          plain
        >{{item.name}}</el-button>
      </div>
    </el-header>
    <div id="loadPdf">
      <div class="maintitle">{{dataForm.curBank}}党委成员离京报告表</div>
      <div class="container">
        <div class="content-header">
          <p>
            当前环节：
            <span style="color: #f60; color: red !important;">{{dataForm.currentNode}}</span>
          </p>
          <p>
            当前处理人：
            <span style="color: #f60; color: red !important;">{{dataForm.curUserName}}</span>
          </p>
        </div>
        <el-form
          label-position="right"
          v-model="dataForm"
          class="formData"
          label-width="80px"
          style="margin-top: 30px;"
          :rules="rules"
          ref="dataForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="报告人">
                <el-input v-model="dataForm.name" :disabled="isadbled" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="前往地点">
                <el-input v-model="dataForm.address" :disabled="isadbled"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="离京时间">
                    <el-date-picker
                      v-model="dataForm.ljTime"
                      style="width: 100%;"
                      :disabled="isadbled"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="dataForm.ljTimeDetail" :disabled="isadbled">
                    <el-option label="上午" value="上午"></el-option>
                    <el-option label="下午" value="下午"></el-option>
                    <el-option label="晚上" value="晚上"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="返京时间">
                    <el-date-picker
                      v-model="dataForm.fjTime"
                      style="width: 100%;"
                      :disabled="isadbled"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-select v-model="dataForm.fjTimeDetail" :disabled="isadbled">
                    <el-option label="上午" value="上午"></el-option>
                    <el-option label="下午" value="下午"></el-option>
                    <el-option label="晚上" value="晚上"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-form-item label="批示意见" prop="comments">
            <el-button
              type="primary"
              size="mini"
              @click="addSucc('comment')"
              :disabled="isadbled"
            >新增意见</el-button>
            <div class="suggStyle">
              <div
                v-bind:class="['d_flex',{'border_line':index!=(options.length-1)}]"
                v-for="(item,index) in options"
                :key="index"
              >
                <el-row class="d_b100">
                  <el-col :span="24">
                    <el-col :span="2">
                      <span>内容</span>
                    </el-col>
                    <el-col :span="19">
                      <el-input
                        :disabled="isadbled"
                        type="textarea"
                        v-model="item.content"
                        class="d_f1"
                      ></el-input>
                    </el-col>
                    <el-col :span="2" style="margin-left:12px">
                      <el-button
                        type="danger"
                        @click="deleSugg(item, index)"
                        :disabled="isadbled"
                      >删除</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row style="margin-top:12px" v-show="dataForm.currentNode !== '起草'">
                  <el-col :span="2">
                    <span>用户部门</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.deptName" :disabled="isadbled"></el-input>
                  </el-col>
                  <div style="margin-left:12px">
                    <el-col :span="2">
                      <span>用户名</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.leaderName" :disabled="isadbled"></el-input>
                    </el-col>
                  </div>
                  <el-col :span="2">
                    <span>提交时间</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.updateTime" :disabled="isadbled"></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>
            <!-- <template>
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData.signIdea"
                :disabled="true"
                v-if="!(signIdeaList && signIdeaList.length!=0)"
              ></el-input>
              <div v-for="item in signIdeaList" :key="item.id" style="margin-bottom: 3px">
                <div class="d_flex">
                  <el-row class="d_b100">
                    <el-col :span="23">
                      <el-input
                        type="textarea"
                        :autosize="{minRow:3,maxRow:15}"
                        class="d_f1"
                        :disabled="true"
                        :value="item.opinion"
                      ></el-input>
                      <div class="adviceInfo">
                        {{item.deptName}}
                        <span class="pad_lr10">{{item.userName}}</span>
                        {{item.DATE}}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </template>-->
          </el-form-item>
          <el-form-item label="出差事由">
            <el-input type="textarea" :disabled="isadbled" v-model="dataForm.outReason"></el-input>
          </el-form-item>
          <el-form-item label="总行部门陪同人员">
            <el-input type="textarea" :disabled="isadbled" v-model="dataForm.ptPersion"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-button
              type="primary"
              size="mini"
              @click="addSucc('remark')"
              :disabled="isadbled"
            >新增备注</el-button>
            <div class="suggStyle">
              <div
                v-for="(item,index) in remarks"
                :key="index"
                v-bind:class="['d_flex',{'border_line':index!==(remarks.length-1)}]"
              >
                <el-row class="d_b100">
                  <el-col :span="24">
                    <el-col :span="2">
                      <span>内容</span>
                    </el-col>
                    <el-col :span="19">
                      <el-input
                        :disabled="isadbled"
                        type="textarea"
                        v-model="item.content"
                        class="d_f1"
                      ></el-input>
                    </el-col>
                    <el-col :span="2" style="margin-left:12px">
                      <el-button
                        type="danger"
                        @click="deleRemark(item, index)"
                        :disabled="isadbled"
                      >删除</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row style="margin-top:12px" v-show="dataForm.currentNode !== '起草'">
                  <el-col :span="2">
                    <span>用户部门</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.deptName" :disabled="isadbled "></el-input>
                  </el-col>
                  <div style="margin-left:12px">
                    <el-col :span="2">
                      <span>用户名</span>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.leaderName" :disabled="isadbled"></el-input>
                    </el-col>
                  </div>
                  <el-col :span="2">
                    <span>提交时间</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.updateTime" :disabled="isadbled"></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div class="person">
          <p>
            <span>填报人:</span>
            <span>{{dataForm.authorCn}}</span>
          </p>
          <p>
            <span>填报时间：</span>
            <span>{{dataForm.draftTime}}</span>
          </p>
        </div>
      </div>
    </div>
    <select-person
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :checkOrg="checkOrg"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :seletOptionsData="seletOptionsData"
      :dialogTypeNow="dialogTypeNow"
      :fromdata="formdata"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    ></select-person>

    <!--查看流程-->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
  </div>
</template>

<script >
import uploadFileTs from "components/uploadFile/uploadFileTs";
import selectPerson from "components/tree/treeTansun";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import exportTable from "@/minixs/exportTable";
import viewDraft from "@/minixs/viewDraft";
export default {
  components: {
    selectPerson,
    shiwuFlow
  },
  mixins: [viewDraft],
  data() {
    return {
      options: [],
      remarks: [],
      flowChartList: [],
      showFlowChart: false,
      flowProcessList: [],
      showProcessFlowChart: false,
      isadbled: true,
      buttonList: [
        { name: "保存", type: "baocun", show: true },
        { name: "查看流程", type: "ckliucheng", show: false },
        { name: "打印处理单", type: "dayinchulidan", show: false },
        { name: "收藏", type: "shoucang", show: false },
        { name: "操作指南", type: "caozuozhinan", show: false },
        { name: "维护", type: "weihu", show: false },
        { name: "流程调度", type: "liuchengdiaodu", show: false }
      ],
      fileArr: [],
      identify: 0,
      dataForm: {
        draftTime: "",
        authorCn: "",
        name: "",
        address: "",
        ljTime: "",
        ljTimeDetail: "",
        fjTime: "",
        fjTimeDetail: "",
        comments: "",
        outReason: "",
        ptPersion: "",
        remark: ""
      },
      uploadConfig: {
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0
      },
      rules: {},
      type: null,
      treeData: [],
      loadingTree: false,
      canTab: false,
      dialogType: "dosend",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: true, // 单选true 多选为false
      hasRadio: false, //是否單選
      dialogTypeNow: "next",
      seletOptionsData: [], //下一环节下拉单
      dialogTit: "选择人员",
      offenUse: true,
      checkOrg: false,
      inputDisable: true,
      deptList: [],
      formdata: {
        // formatData(new Date().getTime(), "YYYY-MM-DD")
        hasDocumentNo: "false",
        currentNode: "制发",
        draftTime: "",
        currentUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        currentUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        currentNowName: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName +
            " " +
            JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        draftUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        draftUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        draftDepartment: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName
          : "",
        draftDepartmentId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).currUnitId
          : "",
        draftOrgan: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).unitName
          : "",
        draftOrganId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).unitId
          : "",
        draftDepartmentOne: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName ||
            JSON.parse(this.$route.query.deptDetail).draftDepartmentOne
          : "",
        draftDepartmentOneId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId
          : "",
        phone: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).telMobile.split(",")[1]
            ? JSON.parse(this.$route.query.deptDetail).telMobile.split(",")[1]
            : ""
          : "",
        documentNo: "",
        // feedbackMode: "0",
        showApp: "0",
        currentUserDept: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).currUnitName
          : "",
        currentUserDeptId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).currUnitId
          : ""
      }
    };
  },
  mounted() {
    // this.type = this.$route.query.type
    this.getDetail();
  },
  methods: {
    // 添加意见或者备注
    addSucc(range) {
      let AdepartmentName = JSON.parse(localStorage.getItem("userInfo"))
        .firstUnitName;
      let AcreateUser = JSON.parse(localStorage.getItem("userInfo")).humanName;
      // let AuserName = JSON.parse(localStorage.getItem('userInfo')).humanName
      let AcreateTime = formatData(new Date().getTime(), "YYYY-MM-DD hh:mm:ss");
      switch (range) {
        case (range = "comment"):
          this.options.push({
            content: "",
            deptName: AdepartmentName,
            leaderName: AcreateUser,
            updateTime: AcreateTime
          });
          break;
        case (range = "remark"):
          this.remarks.push({
            content: "",
            deptName: AdepartmentName,
            leaderName: AcreateUser,
            updateTime: AcreateTime
          });
          break;
      }
    },
    // 删除意见
    deleSugg(item, index) {
      const that = this;
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (item.id) {
            that.$api.secreatary.partyMemLeavRep
              .deltAdminRemark({
                id: item.id
              })
              .then(res => {
                if (res.code === "SUCCESS") {
                  that.$message({
                    type: "success",
                    message: "删除成功"
                  });
                  that.getDetail();
                }
              })
              .catch(() => {
                console.log("error");
              });
          } else {
            that.options.splice(index, 1);
          }
        })
        .catch(() => {});
    },
    // 删除备注
    deleRemark(item, index) {
      const that = this;
      this.$confirm("是否确定删除当前数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (item.id) {
            that.$api.secreatary.partyMemLeavRep
              .deltAdminRemark({
                id: item.id
              })
              .then(res => {
                if (res.code === "SUCCESS") {
                  that.$message({
                    type: "success",
                    message: "删除成功"
                  });
                  that.getDetail();
                }
              })
              .catch(() => {
                console.log("error");
              });
          } else {
            that.remarks.splice(index, 1);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getProcessDetailList() {
      let response = await this.$api.secreatary.partyMemLeavRep
        .getProcessDetail({
          id: this.$route.query.id
        })
        .then(res => {
          return res;
          // this.flowChartList = res.data
        });
      if (response.code === "SUCCESS") {
        this.flowChartList = response.data;
      } else {
        this.$message.error(response.message);
      }
    },
    buttonClick(params) {
      switch (params) {
        case "保存":
          // this.showNext()
          this.saveAdminReport();
          break;
        case "删除此文":
          this.deleteReport();
          break;
        case "收回":
          this.sendBack();
          break;
        case "办结":
          console.log("办结");
          this.overFinished();
          break;
        case "查看流程":
          this.getProcessDetailList().then(() => {
            this.showFlowChart = true;
            this.$nextTick(() => {
              this.$refs.dialogLine.openDialog();
            });
          });
          break;
        case "收藏":
          this.$confirm(
            "您所收藏文件属于建行内部信息，您有责任妥善保存，未经允许不得外传。",
            "提示",
            {
              distinguishCancelAndClose: true,
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning"
            }
          )
            .then(() => {
              this.$api.secreatary.partyMemLeavRep
                .shoucang({ id: this.dataForm.id })
                .then(res => {
                  console.log(res, "获取收藏返回值");
                  this.downFile(res);
                  // this.$message({
                  //   type: "success",
                  //   offset: "200",
                  //   message: "收藏完成"
                  // });
                });
            })
            .catch(action => {
              if (action == "close") {
              } else {
                // this.$intent.closeWindow(this);
              }
            });
          break;
        case "流程调度":
          console.log("流程调度");
          this.showNext();
          break;
        case "维护":
          this.isadbled = false;
          this.$set(this.buttonList, 0, {
            name: "保存",
            type: "baocun",
            show: false
          });
          // this.buttonList[0].show = true
          break;
        case "打印处理单":
          console.log("打印处理单");
          this.openNewWindow("/partyMemLeavRep", { id: this.dataForm.id });
          // this.$intent.goNewPage(this, { path: "/meetingPrint", query: { id: this.id } })
          break;
        case "操作指南":
          // console.log('操作指南')
          this.caozuozhinan();
          break;
      }
    },
    // 下载
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
      // bank_doDownloadFile.filePath = '/home/ap'+file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
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
                file.fileName
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
    },
    // 保存
    async saveAdminReport() {
      const params = {
        ...this.dataForm,
        exeList: this.options,
        remList: this.remarks
      };
      console.log(params);
      let response = await this.$api.secreatary.partyMemLeavRep
        .saveAdminInfo(params)
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        this.$message({
          type: "success",
          message: "保存成功"
        });
        this.getDetail();
      } else {
        this.$message.error(response.msg);
      }
    },
    // 办结
    async overFinished() {
      this.dataForm.handleButton = "办结";
      let response = await this.$api.secreatary.partyMemLeavRep
        .submitToSend(this.dataForm)
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        this.$message({
          type: "success",
          message: "成功"
        });
        window.location.href = "about:blank";
        window.opener.location.reload();
        window.close();
      } else {
        this.$message.error(response.msg);
      }
    },
    // 收回
    sendBack() {
      if (this.dataForm.isReadFlag === "1") {
        return this.$message.error("已读取，无法收回");
      }
      this.$api.secreatary.partyMemLeavRep
        .recyclingProcess({
          id: this.dataForm.id
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: "收回成功"
            });
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    //操作指南
    caozuozhinan() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "MSGZ"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          console.log("res", res);
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_WordTs",
                  query: {
                    state: "viewFile",
                    id: this.formData.id,
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
    showNext() {
      // 新增时候先保存后在展示下一环节
      if (this.type === "add") {
        this.saveReport().then(() => {
          this.getNodes();
          this.$nextTick(() => {
            this.dialogState = true;
          });
        });
      } else {
        // 其他情况直接展示下一环节
        this.getNodes();
        this.$nextTick(() => {
          this.dialogState = true;
        });
      }
    },
    // 获取节点及人员数
    async getNodes() {
      let response = await this.$api.secreatary.partyMemLeavRep
        .getAllNodeAndUsers({
          id: this.dataForm.id
        })
        .then(res => {
          return res;
        });
      if (response.code === "SUCCESS") {
        this.seletOptionsData = response.data;
        console.log(response);
      }
    },
    //选人成功后
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false;
      if (!status) {
        return;
      }
      switch (dtype) {
        case "next":
          // 保存并发送
          this.sendReport(data[0], params);
          break;
        case "cy":
          // this.cyCheckData = [];
          // var yyPleArray =!!this.formdata.yyIds? this.formdata.yyIds.split(" "):this.formdata.yyIds;
          // var wyPleArray =!!this.formdata.wyIds?this.formdata.wyIds.split(" "):this.formdata.wyIds;
          // this.cyCheckData = data;
          // var storData = [];
          // let count = 0;
          // for (let i = 0; i < data.length; i++) {
          //   if (!!yyPleArray&&
          //     yyPleArray.includes(data[i].idStr.toString()) ||
          //     !!wyPleArray&&wyPleArray.includes(data[i].idStr.toString())
          //   )  {
          //     count++;
          //   } else {
          //     storData.push(data[i]);
          //   }
          // }
          // if (count > 0) {
          //   this.$message({
          //     type: "info",
          //     message: "已经发送过传阅的人无法再次发送"
          //   });
          // }
          // this.cy(storData);
          break;
        case "main":
          // let name = [];
          // console.log('主送参数'+data);
          // data.forEach(item => {
          //
          //   if(!!item&&typeof item==='string'){
          //     name.push(item);
          //   }else if(item!=undefined){
          //     name.push(item.text);
          //   }
          //
          // });
          // this.zhuCheckData = [];
          // this.zhuCheckData = data;
          // this.$set(this.formdata, "main", name.join(","));
          break;
        case "copy":
          // let name1 = [];
          // data.forEach(item => {
          //   if(!!item&&typeof item==='string'){
          //     name1.push(item);
          //   }else if(item!=undefined){
          //     name.push(item.text);
          //   }
          // });
          // this.chaoCheckData = [];
          // this.chaoCheckData = data;
          // this.$set(this.formdata, "copy", name1.join(","));
          break;
        default:
          break;
      }
    },
    onPrint() {
      const routerData = this.$router.resolve({
        path: "/printdetail"
      });
      window.open(routerData.href, "_blank");
    },
    onClose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.saveAdminReport();
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          } else if (action === "cancel") {
            //点否
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
      // this.$confirm("是否保存并退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cencelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.saveAdminReport();
      //     window.location.href = "about:blank";
      //     window.opener.location.reload();
      //     window.close();
      //   })
      //   .catch(() => {
      //     window.location.href = "about:blank";
      //     window.opener.location.reload();
      //     window.close();
      //   });
    },
    editSaveReport() {
      this.$api.secreatary.partyMemLeavRep
        .editSaveMemLeavRep(this.dataForm)
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: "修改成功"
            });
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 保存
    async saveReport() {
      let res = await this.$api.secreatary.partyMemLeavRep
        .saveMemLeavRep(this.dataForm)
        .then(res => {
          return res;
        });
      if (res.code === "SUCCESS") {
        this.$message({
          type: "success",
          message: "保存成功"
        });
        this.$nextTick(() => {
          this.dataForm = Object.assign({}, res.data);
        });
      } else {
        this.$message.error(res.message);
      }
    },
    // 保存之后在保存并发送
    sendReport(person, params) {
      this.dataForm.currentNode = params.name;
      this.dataForm.currentNodeId = params.id;
      this.dataForm.curUserAccount = person.idStr.toString();
      this.dataForm.curUserName = person.name;
      this.dataForm.handleButton = "完成并发送";
      this.$api.secreatary.partyMemLeavRep
        .submitToSend(this.dataForm)
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$message({
              type: "success",
              message: "保存成功，并发送"
            });
            window.location.href = "about:blank";
            window.opener.location.reload();
            window.close();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    // 删除
    deleteReport() {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cencelButtonText: "取消"
      })
        .then(() => {
          this.$api.secreatary.partyMemLeavRep
            .delMemLeavRep({
              id: this.$route.query.id
            })
            .then(res => {
              if (res.code === "SUCCESS") {
                this.$message({
                  type: "success",
                  message: "已删除"
                });
                window.location.href = "about:blank";
                window.opener.location.reload();
                window.close();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(() => {
              console.log("error");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    onLoad() {
      exportTable.getPdf("xiazai", [], "loadPdf");
    },
    // 获取详情
    getDetail() {
      this.$api.secreatary.partyMemLeavRep
        .getAdminDetail({
          id: this.$route.query.id
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.$nextTick(() => {
              this.dataForm = res.data;
              this.options = res.exeList;
              this.remarks = res.remList;
              this.isadbled = true;
              // this.dataForm.draftTime = formatData(new Date(res.data.draftTime).getTime(), 'YYYY-MM-DD')
            });
          }
        })
        .catch(() => {
          console.log("error");
        });
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
    }
  }
};
</script>
<style lang="less">
.detailComments {
  position: relative;
  height: 150px;
  margin-bottom: 10px;
  .el-textarea {
    height: 100%;
    padding-bottom: 32px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    &:hover {
      border: 1px solid #8996af !important;
    }
    .el-textarea__inner {
      height: 100%;
      border: none !important;
      &:hover {
        border: none !important;
      }
    }
  }
  .finishedInfo {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    text-align: right;
    color: #606266;
    background: #e4e7ed52;
    span {
      padding-right: 10px;
    }
  }
}
</style>
<style scoped lang="less" rel="stylesheet/less">
.container {
  .content-header {
    display: flex;
    font-size: 14px;
    padding: 10px;
    // border: 1px solid #f9aa21;
    border: 1px solid #f60;
    background: #fef7e7;
    box-sizing: border-box;
    p {
      padding-right: 20px;
    }
  }
}
.suggStyle {
  width: 100%;
  min-height: 150px;
  border: 1px solid #aaa;
  padding: 10px;
  margin-top: 16px;
}
.border_line {
  padding-bottom: 16px;
  margin-bottom: 26px;
  border-bottom: 1px dashed #ccc;
}
.el-col ::v-deep {
  border: 1px solid transparent;
}
.el-header {
  background-color: #409eff;
  line-height: 60px;
}
.title {
  color: #ffffff;
}
.btn {
  float: right;
}
// .btnstyle {
//   color: rgb(14, 117, 214);
// }
// .btnstyle:hover {
//   background-color: rgb(14, 117, 214);
//   color: cornsilk;
// }
.maintitle {
  font-size: 30px;
  color: rgb(14, 117, 214);
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
}
.container {
  width: 1000px;
  padding-bottom: 20px;
  margin: 30px auto;
  border: 1px solid rgb(218, 215, 215);
  padding: 20px 20px;
  position: relative;
}
.c-header {
  background-color: #fef7e7;
  border: 1px solid #f9aa21;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
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
.person {
  text-align: right;
  color: #606266;
  p {
    line-height: 1.5;
    font-size: 14px;
  }
}
</style>
