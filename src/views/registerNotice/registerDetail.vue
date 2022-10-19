<template>
  <div style="background: white;margin: 0 auto;">
    <div class="headerClick">
      <!-- <div class="left" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>会议主办单</span>
      </div>-->
      <!-- <div class="right"> -->
      <el-button
        class="bank_grid_comtent_active"
        v-for="(item,index) in buttonList"
        @click="buttonClick(item.name)"
        v-show="buttonList[index].show"
        :key="index"
        size="mini"
        plain
      >{{item.name}}</el-button>
      <!-- </div> -->
    </div>
    <div style="padding: 8px 70px;">
      <div class="shiwuTitle">中国建设银行行长办公会议报名通知</div>
    </div>
    <div style="width: 80%;padding: 20px 16px;margin: 0 auto;border: 1px solid #ccc;">
      <div
        style="  width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #F60;
      background: #fef7e7;"
      >
        <div
          style=" padding-right: 50px;
        display: flex;
      justify-content: space-between ;"
        >
          <div>
            <p class="now">
              当前环节：
              <span style="color: #f60;
  color: red !important;">{{formData.currentNode}}</span>
            </p>
            <p class="now">
              当前处理人：
              <span style="color: #f60;
  color: red !important;">{{formData.currentUser}}</span>
            </p>
          </div>
          <p class="now">
            请于
            <span style="color: #f60;
  color: red !important;">{{formData.bmJzTime}}</span>
            前反馈
          </p>
        </div>
      </div>
      <el-form ref="elForm" :model="formData" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="拟稿人" prop="draftUser">
              <el-input v-model="formData.draftUser" :disabled="readFields.draftUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="formData.tel" :disabled="readFields.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拟稿日期" prop="draftDate">
              <el-input v-model="formData.draftDate" :disabled="readFields.draftDate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议名称" prop="tzName">
              <el-input v-model="formData.tzName" :disabled="readFields.tzName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会议时间" prop="hyTime">
              <el-input
                v-model="formData.hyTime"
                :style="{width:'100%'}"
                :disabled="readFields.hyTime"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议地点" prop="hyAdress">
              <el-input
                v-model="formData.hyAdress"
                :style="{width:'100%'}"
                :disabled="readFields.hyAdress"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议候场地点" prop="hyHcdd">
              <el-input
                v-model="formData.hyHcdd"
                :style="{width:'100%'}"
                :disabled="readFields.hyHcdd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="主持人" prop="zcName">
          <el-input v-model="formData.zcName" :disabled="readFields.zcName"></el-input>
        </el-form-item>
      </el-form>
      <!-- 下面的表单 -->
      <div style="position:relative;">
        <p class="title_two">报名信息</p>
      </div>
      <el-form ref="form" :rules="model.rules" :model="model">
        <el-table
          :data="model.tableData"
          border
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{prop:'date',order:'descending'}"
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column prop="ytOrderNum" label="议题序号" align="center" width="80"></el-table-column>
          <el-table-column
            prop="lxDeptName"
            label="列席部门"
            align="center"
            width="100"
            :disabled="isShow"
          ></el-table-column>
          <el-table-column prop="ytName" label="议题名称" align="center" width="120"></el-table-column>
          <el-table-column label="会议材料" align="center">
            <template slot-scope="scope">
              <div class="comp_list">
                <div
                  v-for="(item,index) in  scope.row.attchmentFileInfo"
                  :key="item.id"
                  class="comp_list"
                >
                  <div>
                    <span class="numName">{{index+1}}.</span>
                    <span
                      class="name down"
                      @click="viewFile(item,null,item.fileName)"
                    >{{item.fileName}}</span>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="参会人员姓名" align="center" width="100px">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableData.'+ scope.$index +'.chName'"
                :rules="model.rules.chName"
              >
                <el-input v-model="scope.row.chName" style="width: 80px;" :disabled="isShow"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="是否为部门主要负责人" align="center">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableData.'+ scope.$index +'.isPersonInCharge'"
                :rules="model.rules.isPersonInCharge"
              >
                <el-radio-group
                  v-model="scope.row.isPersonInCharge"
                  size="mini"
                  :disabled="isShow"
                  @change="changeValue(scope.$index)"
                >
                  <el-radio-button label="1">是</el-radio-button>
                  <el-radio-button label="2">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="部门主要负责人请假缘由" align="center" width="200">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableData.'+ scope.$index +'.leaveReason'"
                :rules="{pattern: /^[^*]+$/,required: false,message: '请修改请假缘由模板',trigger: 'change'}"
              >
                <el-input
                  type="textarea"
                  v-model="scope.row.leaveReason"
                  :disabled="isShow || isOnly[scope.$index].type"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="参会人员手机号码" align="center" width="200">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableData.'+ scope.$index +'.chCellPhone'"
                :rules="model.rules.chCellPhone"
              >
                <el-input v-model.number="scope.row.chCellPhone" :disabled="isShow"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <!-- 查看参会部门流程 -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <!-- 下一处理人 -->
    <select-person
      :treeData="treeData"
      :fromdata="formData"
      :loadingTree="true"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择"
      :checkIds="checkIds"
      v-dialogDrag
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
  </div>
</template>
<script>
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import mTable from "@/components/table/tTable";
import minixs from "@/minixs/index";
import shiwuLineWord from "../../minixs/shiwuLineWord";
import selectPerson from "components/tree/treeTansun";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import viewDraft from "@/minixs/viewDraft";
export default {
  name: "registerDetail",
  components: {
    shiwuFlow, //查看流程组件
    uploadFileTs,
    selectPerson
  },

  mixins: [minixs, shiwuLineWord,viewDraft],
  props: {},
  data() {
    return {
      // test: "** 部门总经理 ** 因 *** ，由副总经理 *** 代为列席会议第 * 议题",
      test: "**部***因**无法列席会议，由***代为列席会议",
      arr: [],
      id: "",
      isOnly: [],
      showOrgTree: false,
      selectDept: [],
      tzId: "",
      fileIdfier: [], //附件标示符数组
      fileIdStr: "",
      sendArry: [],
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      uploadConfig: {
        formId: "MSGZ",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      draftForm: {},
      attchmentFileInfo: [],
      isShow: false,
      treeData: [], //人员树
      dialogType: "next",
      checkIds: [], //选中id列表
      checkData: [], //选中数据
      dialogState: false, //显示隐藏
      singelCheckF: false, // 单选true 多选为false
      // hasRadio: false, //是否單選
      dialogTypeNow: "dosend",
      seletOptionsData: [],
      offenUse: false,
      // loadingTree: true,
      flowChartList: [],
      showFlowChart: false,
      flg: false,
      model: {
        tableData: [],
        dataIndex: null,
        rules: {
          chName: [
            { required: true, message: "请填写参会人员", trigger: "blur" }
          ],
          isPersonInCharge: [
            {
              required: true,
              message: "请选择是否为部门主要负责人",
              trigger: "change"
            }
          ],
          leaveReason: [
            {
              pattern: /^[^*]+$/,
              required: false,
              message: "请修改请假缘由模板",
              trigger: "change"
            }
          ],
          chCellPhone: [
            {
              pattern: /^1[3456789]\d{9}$/,
              required: true,
              message: "请填写正确手机号码",
              trigger: "blur"
            }
          ]
        }
      },
      rowData: {},
      formData: {
        currentUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        currentUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : ""
      },
      buttonList: [
        { name: "关闭", type: "guanbi", show: false },
        { name: "保存", type: "baocun", show: false },
        { name: "完成并发送", type: "wanchengbingfasong", show: false },
        { name: "反馈报名信息", type: "fankuibaomingxinxi", show: false },
        { name: "查看流程", type: "chakanliucheng", show: false },
        { name: "操作指南", type: "caozuozhinan", show: false },
        { name: "查看会议单", type: "ckhyd", show: false }
      ],
      readFields: {
        draftUser: false,
        draftDate: false,
        tzName: false,
        hyTime: false,
        hyAdress: false,
        hyHcdd: false,
        zcName: false,
        tel: false
      } //不可编辑控制域
    };
  },
  computed: {},
  watch: {
    // 判断是否是为部门主要负责人  否的时候请假缘由为必填
  },
  methods: {
    changeValue(index) {
      this.dataIndex = index;
      if (
        this.model.tableData[index].leaveReason == null ||
        this.model.tableData[index].leaveReason == ""
      ) {
        if (this.model.tableData[index].isPersonInCharge == "2") {
          this.model.tableData[index].leaveReason = this.test;
          this.model.rules.leaveReason[0].required = true;

          this.isOnly[index].type = false;
          console.log("1");
        } else {
          this.model.tableData[index].leaveReason = "";
          this.model.rules.leaveReason[0].required = false;
          this.isOnly[index].type = true;
          console.log("2");
        }
      } else {
        if (this.model.tableData[index].isPersonInCharge == "2") {
          this.model.tableData[index].leaveReason = this.model.tableData[
            index
          ].leaveReason;
          this.model.rules.leaveReason[0].required = true;
          this.isOnly[index].type = false;
          console.log("3");
        } else {
          this.model.tableData[index].leaveReason = "";
          this.isOnly[index].type = true;
          this.model.rules.leaveReason[0].required = false;
          console.log("4");

          console.log(
            this.model.rules.leaveReason[0].required,
            this.model.tableData[index],
            "this.model.tableData[index].leaveReason"
          );
        }
      }
    },
    changeInput(v) {
      if (this.model.tableData[this.dataIndex].isPersonInCharge == "2") {
        this.model.tableData[this.dataIndex].leaveReason = v;
      }
    },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close_btn();
          break;
        case "保存":
          this.save_btn();
          break;
        case "完成并发送":
          this.singelCheckF = true;
          this.dialogTypeNow = "next";
          this.dialogType = "dosend";
          this.offenUse = true;
          this.loadingTree = true;
          this.canTab = false;
          this.finishSend();
          break;
        case "反馈报名信息":
          this.back_btn();
          break;
        case "查看流程":
          this.flow();
          break;
        case "操作指南":
          this.handBook("MSGZ");
          break;
        case "查看会议单":
          this.ckMeet();
          break;
      }
    },
    changeNew() {
      this.model.tableData.some(item => {
        console.log("11111111111111", item);
        return item == "";
      });
      console.log("11111111111111", this.model.tableData);
      if (true) {
        this.$message({
          type: "warning",
          message: "请填写必填项!"
        });
      }
    },
    getHuanJie() {
      this.$api.secreatary.meetings
        .getHuanJie({ multiId: "HBHYTZCH" })
        .then(res => {
          this.huanJieMessage = res.data.Fields;
          this.setConfig();
        });
    },
    downFileDown(file) {
      console.log(file, "---------------生成会议单");
      let data = this.$router.resolve({
        path: "/openAndSave_WordHk",
        query: {
          tanSun: "schyd",
          state: "viewFile",
          id: this.id ? this.id : "1",
          zhengWenState: 1,
          JYcode: "A0846C002",
          relativePath: file ? file.filePath : "",
          fileName: file ? file.fileName : "测试.doc",
          tmpFilePath: file ? file.filePath : "",
          tmpFileName: file ? file.fileName : "测试.doc",
          cleanDraftFlag: false,
          multiTenancyId: "000076767qwq0",
          showBtns: true,
          depart: "scqjd",
          saveNameAndNumber: this.formData.title,
          EditType: 1,
          btnShow: "1"
        }
      });
      // console.log(fileInfo, "fileInfo");
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    //查看会议单
    ckMeet() {
      this.$api.secreatary.meetings.ckMeet({ tzId: this.tzId }).then(res => {
        // console.log(res.data.fileName);
        // this.downFile(res.data);
        if (res.data.fileName) {
          this.$post
            .postData(
              "doDownloadFile",
              JSON.stringify({
                function: "doDownloadFile",
                fileName: res.data.fileName,
                filePath: res.data.filePath
              }),
              "A0846C071"
            )
            .then(res => {
              if (res && res.success) {
                this.downFileDown(res);
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  offset: 400,
                  message: "下载失败",
                  duration: 500
                });
              }
            });
        } else {
          this.$message({
            type: "warning",
            message: "尚未生成会议单"
          });
        }
      });
    },
    downFile(file) {
      let bank_doDownloadFile = { function: "doDownloadFile" };
      bank_doDownloadFile.fileName = file.fileName;
      bank_doDownloadFile.filePath = file.filePath;
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
              // location.href =
              //     (this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
              //     res.filePath +
              //     "&fileName=" +
              //     res.fileName;
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
    setConfig() {
      // this.requiredFields = this.setRequiredFields(this.requiredFields, this.huanJieMessage.requiredFields)//必填控制域
      this.readFields = this.setReadFields(
        this.readFields,
        this.huanJieMessage.readFields
      ); //不可编辑控制域
      this.buttonList = this.showButton(
        this.buttonList,
        this.huanJieMessage.visibleButtons,
        this.huanJieMessage.visibleButtonsBycondition
      ); //按钮
    },
    // 完成并发送
    finishSend() {
      // this.$refs["form"].validate((valid, model) => {
      //   if (valid) {
      this.$api.secreatary.meetings
        .sendRegistrationNotice({ id: this.id })
        .then(res => {
          this.saveData();
          this.seletOptionsData = this.shoNextNode(
            this.seletOptionsData,
            this.huanJieMessage.acyNodeNextBount
          );
          this.loadingTree = true;
          this.dialogState = true;
          this.$nextTick(() => {
            this.seletOptionsData = res.data.list;
          });
        });
      //   }
      // });
    },
    //选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false; // 关闭选择人员树弹窗
      switch (dtype) {
        case "next":
          this.next(data[0], params);
          break;
      }
    },
    //选人之后完成发送
    next(person, params) {
      this.$api.secreatary.meetings
        .registrationnextHandler({
          id: this.id,
          nextUserId: person.idStr,
          nextUserCode: person.code,
          nextUserName: person.name,
          nextAvyName: params.name,
          nextAvyId: params.id + ""
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "完成并发送成功"
          });
          this.$intent.closeWindow(this);
        })
        .catch(err => {
          this.loadData();
        });
    },
    // 关闭
    close_btn() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        distinguishCancelAndClose: true,
        type: "warning",
        callback: action => {
          if (action === "confirm") {
            //点是
            this.save_btn();
            this.$intent.closeWindow(this);
          } else if (action === "cancel") {
            //点否
            this.$intent.closeWindow(this);
          } else if (action === "close") {
            //点右上角的x
          }
        }
      });
    },
    // 保存
    save_btn() {
      // this.saveData();
      this.$refs["form"].validate((valid, model) => {
        if (valid) {
          for (let i = 0; i < this.model.tableData.length; i++) {
            this.$api.secreatary.meetings
              .updateBm({
                ...this.model.tableData[i],
                chCellPhone: this.model.tableData[i].chCellPhone
                  ? this.model.tableData[i].chCellPhone
                  : undefined
              })
              .then(() => {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              });
          }
        }
      });
    },
    getFileList() {
      let arr = this.model.tableData;
      arr.forEach((item, index) => {
        this.$api.setSysConfig.getTextemList({ id: item.ytId }).then(res => {
          this.$nextTick(() => {
            // let dataIds = {};
            // this.attchmentFileInfo = res.data.filter(item => {
            //   if (dataIds.dataId) {
            //     dataIds.dataId += 1;
            //     item.fileIndex = dataIds.dataId;
            //   } else {
            //     dataIds.dataId = 1;
            //     item.fileIndex = dataIds.dataId;
            //   }
            //   console.log(item.fileIndex);
            //   return item;
            // });
            this.attchmentFileInfo = res.data;
            // this.filesHas = this.attchmentFileInfo;
            console.log(this.attchmentFileInfo, "filesHasfilesHasfilesHas");
            this.model.tableData.forEach((item, index) => {
              if (this.attchmentFileInfo.length > 0) {
                if (item.ytId == this.attchmentFileInfo[0].dataId) {
                  item.attchmentFileInfo = this.attchmentFileInfo;
                }
              }
              this.model.tableData.splice(index, 1, item);
            });
            this.$forceUpdate();
          });
        });
      });
    },
    // 引入会议依据
    fileList(files) {
      if (this.attchmentFileInfo && this.attchmentFileInfo.length) {
        this.attchmentFileInfo.push(...files);
      } else {
        this.attchmentFileInfo = files;
      }
      if (!this.formData.attachs) {
        this.formData.attachs = [];
      }
      files.forEach(item => {
        this.formData.attachs.push(item.id);
      });
      this.uploadConfig.filesHas = files;
      this.formData.attachid = this.formData.attachs.join(",");
      this.$forceUpdate();
    },
    saveData() {
      // this.$refs["form"].validate((valid, model) => {
      //   if (valid) {
      for (let i = 0; i < this.model.tableData.length; i++) {
        this.$api.secreatary.meetings
          .updateBm({
            ...this.model.tableData[i],
            chCellPhone: this.model.tableData[i].chCellPhone
              ? this.model.tableData[i].chCellPhone
              : undefined
          })
          .then(() => {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          });
      }
      //   }
      // });
    },
    // 反馈

    back_btn() {
      let dataArry = [];
      this.model.tableData.map(function(value, index) {
        dataArry.push(value.ytId);
      });
      this.sendArry = dataArry.join(",");
      console.log(this.sendArry, "this.sendArry");

      // let ytLength = this.$refs.multipleTable.selection.length;
      // if (ytLength == 0) {
      //   this.$message({
      //     type: "warning",
      //     message: "请勾选报名信息"
      //   });
      // } else {
      this.$refs["form"].validate((valid, model) => {
        if (valid) {
          const requritArr = this.model.tableData.map(item =>
            this.$api.secreatary.meetings.updateBm(item)
          );
          Promise.all(requritArr)
            .then(() => {
              this.$api.secreatary.meetings
                .retrunBm({
                  id: this.id,
                  ytIdList: this.sendArry
                })
                .then(res => {
                  this.$message({
                    message: "反馈成功",
                    type: "success"
                  });
                  this.$intent.closeWindow(this);
                });
            })
            .catch(error => {});
          // for (let i = 0; i < this.model.tableData.length; i++) {
          //   this.$api.secreatary.meetings
          //     .updateBm(this.model.tableData[i])
          //     .then(() => {

          //     });
          // }
        }
      });
      // }
    },
    // 获取议题选中数据ID
    // setChange(value) {
    //   let dataArry = [];
    //   value.map(function(value, index) {
    //     dataArry.push(value.ytId);
    //   });
    //   this.sendArry = dataArry.join(",");
    //   console.log(this.sendArry, "this.sendArry");
    // },
    //预通知状态
    // adDetailFlag() {
    //   this.$api.secreatary.meetings
    //     .adDetailFlag({ ytIdList: this.sendArry })
    //     .then(res => {});
    // },
    //查看流程
    flow() {
      if (this.formData.workflowId === "") {
        this.flowChartList = [
          {
            // DSC: this.userInfo.humanName,
            EXCNM: this.userInfo.humanName,
            HUMANCODE: this.userInfo.humanCode,
            NODE: "起草",
            TM: this.formData.draftDate
          }
        ];
        this.$refs.dialogLine.openDialog();
        return;
      }
      this.$api.pubInfo
        .Lookcx({
          curProcessInstId: this.formData.workflowId
        })
        .then(res => {
          this.flowChartList = res.data;
          this.$refs.dialogLine.openDialog();
        });
    },

    // 加载详情
    loadData() {
      this.$api.secreatary.meetings
        .getBmDetail({ id: this.id })
        .then(res => {
          this.formData = res.data;
          this.formData.workFlowId = res.data.workflowId;
          this.formData.hyTime = formatData(
            res.data.hyTime,
            "YYYY-MM-DD HH:mm:ss"
          );
          console.log(res.data.bmJzTime);
          this.formData.currentNode = "报名通知";
          console.log(this.formData);
          this.tzId = res.data.tzId;
        })
        .then(() => {
          // this.getFileList();
          this.getBmTable();
        });
    },
    getBmTable() {
      this.$api.secreatary.meetings
        .BmgetBmTable({
          tzId: this.tzId
        })
        .then(res => {
          this.model.tableData = res.data;
          this.model.tableData.forEach(item => {
            this.isOnly.push({
              type: item.isPersonInCharge == "1" ? true : false
            });
          });
          this.getFileList();
        });
    }
  },
  activated() {},
  mounted() {},
  updated() {},
  created() {
    let type = this.$route.query.type;
    console.log(type);
    // switch (Number(type)) {
    //   case 0:
    //     break;
    //   case 1:
    //     this.isShow = true;
    //     break;
    // }
    this.id = this.$route.query.id;
    this.loadData();
    this.getHuanJie();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.box {
  display: flex;
  border: 1px solid #dcdfe6;
  padding-bottom: 10px;
  border-radius: 4px;
  .right {
    padding: 10px 10px 0 0;
    flex: 1;
  }
}
.zfTwo {
  background: white;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;
    .left {
      margin-left: 20px;
      cursor: pointer;
    }
    .right {
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
    }
  }
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
    .numName {
      white-space: nowrap;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      text-overflow: ellipsis;
      width: 20px;
    }
    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
.now {
  font-size: 14px;
  color: #0f100e;
  margin-left: 20px;
  display: inline-block;
  span {
    color: #f9aa21;
  }
}
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
.clear-fix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  overflow: hidden;
}

/deep/.radio-form .el-radio {
  margin: 10px;
}
</style>
