<template>
  <div style="background: white;margin: 0 auto;" class="adDetailDone">
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
      <div class="shiwuTitle">中国建设银行行长办公会议预通知</div>
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
  color: red !important;">{{formData.jzTime}}</span>
            前反馈
          </p>
        </div>
      </div>
      <el-form :model="formData" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="拟稿人">
              <el-input v-model="formData.draftUser" :disabled="isShow"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input v-model="formData.tel" :disabled="isShow"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拟稿日期">
              <el-input v-model="formData.draftDate" :disabled="isShow"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会议名称">
              <el-input v-model="formData.title" :disabled="isShow"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="会议候场地点">
          <el-input v-model="formData.hyHcdd" :disabled="isOnly"></el-input>
        </el-form-item>-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="会议时间">
              <el-input v-model="formData.hyTime" :style="{width:'100%'}" :disabled="isShow"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议地点">
              <el-input v-model="formData.hyAdress" :style="{width:'100%'}" :disabled="isShow"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议候场地点">
              <el-input v-model="formData.hyHcdd" :style="{width:'100%'}" :disabled="isShow"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="会议材料要求" style="color:red">
          <p>请按如下要求上传会议材料</p>
          <p>1、请将会议议题正文嵌套模板，并以审议/研究XXXXXX的形式命名</p>
          <p>2、请将秘书处审议通过的议题文件转成PDF形式后打包上传</p>
        </el-form-item>-->
        <div style="position:relative;">
          <p class="title_two">会议内容</p>
        </div>
        <el-table
          :data="hYData"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange1"
          border
          ref="multipleTable"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="orderNum" label="议题序号" align="center" width="50"></el-table-column>
          <el-table-column prop="ytMc" label="议题名称" align="center"></el-table-column>
          <el-table-column prop="strZhbr" label="主汇报人" align="center" width="150">
            <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.strZhbr" :disabled="isShow" placeholder="主汇报人"></el-input>
            </template>-->
          </el-table-column>
          <el-table-column label="会议材料" align="center">
            <template slot-scope="scope">
              <!-- <el-button type="primary" @click="getFile(scope.row, scope.$index)">{{fileTitle}}</el-button> -->
              <div v-show="scope.row.attchmentFileInfo">
                <div
                  v-for="(item,index) in  scope.row.attchmentFileInfo"
                  :key="item.id"
                  class="comp_list"
                >
                  <!-- <template> -->
                  <div class="command_file">
                    <span class="numName">{{index+1}}.</span>
                    <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                  </div>
                  <!-- </template> -->
                </div>
              </div>
              <!-- <upload-file-ts
                :uploadConfig="{'formId':scope.row.id,'id':scope.row.id,isSpecial: 0,'fileId':scope.row.id}"
                @fileList="fileList"
              ></upload-file-ts>
              <div class="comp_list">
                <template>
                  <div class="command_file">
                    <el-col :span="24">
                      <div class="tree_w" v-if="attchmentFileInfo&&attchmentFileInfo.length">
                        <el-scrollbar>
                          <div
                            v-for="(item,index) in  attchmentFileInfo"
                            :key="item.id"
                            class="comp_list"
                          >
                            <template>
                              <div class="command_file" v-show="scope.row.id == item.dataId">
                                <span class="numName">{{index+1}}.</span>
                                <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                                <span class="name">{{item.createrName}}</span>
                                <span class="name">{{item.createTime}}</span>
                                <div class="btns">
                                  <el-button
                                    type="warning"
                                    size="mini"
                                    @click.native="deleteRow(index,item.id)"
                                    :disabled="item.disabled"
                                    round
                                  >删除</el-button>
                                </div>
                              </div>
                            </template>
                          </div>
                        </el-scrollbar>
                      </div>
                    </el-col>
                  </div>
                </template>
              </div>-->
            </template>
          </el-table-column>
          <el-table-column
            prop="isGzzd"
            label="是否是规章制度类议题"
            align="center"
            :formatter="formatIsGzzd"
          >
            <!-- <template slot-scope="scope">
              <el-radio-group v-model="scope.row.isGzzd" size="mini" :disabled="isShow">
                <el-radio-button label="1">是</el-radio-button>
                <el-radio-button label="0">否</el-radio-button>
              </el-radio-group>
            </template>-->
          </el-table-column>
          <el-table-column
            prop="isLegal"
            label="是否已通过合规性检查"
            align="center"
            :formatter="formatIsLegal"
          >
            <!-- <template slot-scope="scope">
              <el-radio-group v-model="scope.row.isLegal" size="mini" :disabled="isShow">
                <el-radio-button label="1">是</el-radio-button>
                <el-radio-button label="0">否</el-radio-button>
              </el-radio-group>
            </template>-->
          </el-table-column>
          <el-table-column prop="strLxName" label="列席部门" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                @click="choiceOrgTree(scope.row)"
                type="primary"
                style="margin-bottom:50px;"
              >选择</el-button>-->
              <!-- <el-input type="textarea" style="margin-top:-30px" v-model="scope.row.strLxName" disabled align="center"></el-input> -->
              <el-input
                size="medium"
                type="textarea"
                v-model="scope.row.strLxName"
                style="overflow:visible;"
                disabled
                align="center"
              ></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="shyj" label="审核意见" align="center">此议题暂无审核意见</el-table-column> -->
          <el-table-column prop="shyj" label="审核意见" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.shyj ? scope.row.shyj : text}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <!-- 查看参会部门流程 -->
    <shiwuFlow :tableData="flowChartList" ref="dialogLine"></shiwuFlow>
    <org-tree
      v-model="showOrgTree"
      :isSingle="false"
      :orgOrDept="0"
      @orgList="getOrgList"
      :selectDept="selectDept"
    ></org-tree>
    <!-- 下一处理人 -->
    <select-person
      :treeData="treeData"
      :fromdata="formData"
      :loadingTree="true"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择参与人员"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      v-dialogDrag
      @showCompDialog="showCompDialog"
    />
    <el-dialog title="上会材料" :visible.sync="dialogVisible" width="40%">
      <el-row>
        <el-form>
          <el-form-item label="会议材料要求" style="color:red">
            <p>请按如下要求上传会议材料</p>
            <p>1、请将会议议题正文嵌套模板，并以审议/研究XXXXXX的形式命名</p>
            <p>2、请将秘书处审议通过的议题文件转成PDF形式后打包上传</p>
          </el-form-item>
        </el-form>
      </el-row>
      <upload-file-ts
        :uploadConfig="{'formId':idfile,'id':idfile,isSpecial: 0,'fileId':idfile}"
        @fileList="fileList"
      ></upload-file-ts>
      <div class="comp_list">
        <template>
          <div class="command_file">
            <el-col>
              <div class="tree_w">
                <div v-for="(item, index) in  attchmentFileInfo" :key="item.id" class="comp_list">
                  <template>
                    <div class="command_file">
                      <span class="numName">{{index+1}}.</span>
                      <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                      <span class="name">{{item.createrName}}</span>
                      <span class="name">{{item.createTime}}</span>
                      <div class="btns">
                        <el-button
                          type="warning"
                          size="mini"
                          @click.native="deleteRow(index,item.id)"
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
              </div>
            </el-col>
          </div>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="backButton()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import selectPerson from "@/components/tree/treeTansun";
import mTable from "@/components/table/tTable";
import minixs from "@/minixs/index";
import shiwuFlow from "@/components/viewFlow/shiwuFlow";
import shiwuLineWord from "@/minixs/shiwuLineWord";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import orgTree from "components/tree/orgTree";
import upfileList from "@/views/bianhan/components/showUploadFile"; //附件展示
import openOrDownLoadFile from "@/minixs/shiwuLineWord";
export default {
  name: "adDetail",
  components: {
    shiwuFlow, //查看流程组件
    orgTree,
    uploadFileTs,
    selectPerson,
    upfileList
  },
  mixins: [minixs, shiwuLineWord, openOrDownLoadFile],
  props: {},
  data() {
    return {
      fileNameText: "上传会议材料",
      text: "此议题暂无审核意见",
      id: "",
      isOnly: true,
      showOrgTree: false,
      selectDept: [],
      tempArr: [],
      arrInfoNum: [],
      ytzId: "",
      strLxId: "",
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
      filesHas: [],
      draftForm: {},
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
      hYData: [],
      /**
       * 查看流程弹窗
       */
      flowChartList: [],
      // chooseSerData: [],
      showFlowChart: false,
      formData: {
        currentNode: "预通知",
        draftDate: formatData(new Date().getTime(), "YYYY-MM-DD HH:mm:ss"),
        currentUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        currentUserId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId
          : "",
        draftDepartment: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName
          : "",
        draftDepartmentId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId
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
        tel: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).telMobile
            ? JSON.parse(this.$route.query.deptDetail).telMobile.split(",")[0]
              ? JSON.parse(this.$route.query.deptDetail).telMobile.split(",")[0]
              : ""
            : ""
          : "",
        departName: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName
          : "",
        departId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId
          : "",
        type: ""
        // attchmentFileInfo:[]
      },
      attchmentFileInfo: [],
      rules: {},
      rowData: {},
      dialogVisible: false,
      jbNm: "",
      sendArry: [],
      addArry: [],
      status: "",
      isShow: false,
      attTitleID: [], //附件名称所有ID
      buttonList: [
        { name: "关闭", type: "guanbi", show: true },
        // { name: "保存", type: "baocun", show: false },
        // { name: "完成并发送", type: "wcbfs", show: false },
        // { name: "反馈", type: "fankui", show: false },
        // { name: "此议题暂不上会", type: "zanbushanghui", show: false },
        // { name: "查看流程", type: "chakanliucheng", show: true },
        // { name: "操作指南", type: "caozuozhinan", show: true }
      ],
      readFields: {
        draftUser: false,
        draftDate: false,
        hyTime: false,
        hyAdress: false,
        hyHcdd: false
      }, //不可编辑控制域
      requiredFields: {
        title: "",
        tel: ""
      }, //必填控制域
      fileIdfier: [], //附件标示符数组
      fileIdStr: "",
      identifier: "", // 标示符
      deptList: [],
      num1str: "",
      idfile: "",
      fileTitle: "上传会议材料",
      indexfile: 0
    };
  },
  methods: {
    // 数据转换
    formatIsGzzd(row) {
      return row.isGzzd === "0" ? "否" : row.isGzzd === "1" ? "是" : "";
    },
    formatIsLegal(row) {
      return row.isLegal === "0" ? "否" : row.isLegal === "1" ? "是" : "";
    },
    getFile(row, index) {
      if (row.attchmentFileInfo && row.attchmentFileInfo.length > 0) {
        this.fileTitle = "编辑会议材料";
      } else {
        this.fileTitle = "上传会议材料";
      }
      this.idfile = row.id;
      this.indexfile = index;
      this.getFileList(row.id, index);
      this.dialogVisible = true;
    },
    backButton() {
      this.dialogVisible = false;
      // console.log(this.isTicked);
    },
    UserChange(row) {
      console.log(row);
    },
    // getHuanJie() {
    //   this.$api.secreatary.meetings
    //     .getHuanJie({ multiId: "HBHY" })
    //     .then(res => {
    //       this.huanJieMessage = res.data.Fields;
    //       this.setConfig();
    //     });
    // },
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close_btn();
          break;
        case "保存":
          this.save_btn();
          break;
        case "反馈":
          this.back_btn();
          break;
        case "完成并发送":
          this.singelCheckF = true;
          this.dialogTypeNow = "next";
          this.dialogType = "dosend";
          this.offenUse = true;
          this.loadingTree = true;
          this.canTab = false;
          this.sub_btn();
          break;
        case "此议题暂不上会":
          this.nosub_btn();
          break;
        case "查看流程":
          this.adviseProcess();
          break;
        case "操作指南":
          this.handBook("MSGZ");
          break;
      }
    },
    tableRowClassName({ row, rowIndex }) {
      //    //把每一行的索引放进row
      //   row.index = rowIndex;
    },
    handleSelectionChange1(value) {
      let dataArry = [];
      value.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.sendArry = dataArry.join(",");
      console.log(this.sendArry);
    },
    btnEvent() {},
    //流程选人选人成功
    showCompDialog(data, status, type, params, dtype) {
      this.dialogState = false; // 关闭选择人员树弹窗
      switch (dtype) {
        case "next":
          this.next(data[0], params);
          break;
      }
    },
    //起草保存文件：将文件ID与业务ID 做绑定
    createFile() {
      for (let i = 0; i < this.hYData.length; i++) {
        this.$api.setSysConfig
          .saveFile({
            id: this.hYData[i].id,
            fileId: this.attachid,
            fileType: "0"
          })
          .then(res => {});
      }
    },
    getFileList(id, index) {
      this.$api.setSysConfig.getTextemList({ id: id }).then(res => {
        this.$nextTick(() => {
          this.attchmentFileInfo = res.data;
          this.hYData[index].attchmentFileInfo = res.data;
          if (index || index == 0) {
            this.$set(this.hYData[index], "attchmentFileInfo", res.data);
          }
          this.filesHas = this.attchmentFileInfo;
          console.log(this.filesHas, "filesHasfilesHasfilesHas");
          this.hYData.forEach((item, index) => {
            this.hYData.splice(index, 1, item);
          });
          this.$forceUpdate();
        });
      });
    },
    // 引入会议依据
    fileList(files) {
      // if (this.attchmentFileInfo && this.attchmentFileInfo.length) {
      //   this.attchmentFileInfo.push(...files);
      // } else {
      //   this.attchmentFileInfo = files;
      // }
      this.getFileList(this.idfile, this.indexfile);
      if (!this.attachs) {
        this.attachs = [];
      }
      files.forEach(item => {
        this.attTitleID.push(item.id);
      });
      this.attachid = this.attTitleID.join(",");
      this.$forceUpdate();
      // this.$router.go(0);
      this.dialogVisible = false;
    },
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.attchmentFileInfo[n - 1].id,
          sort: this.attchmentFileInfo[n].sort
        },
        {
          id: this.attchmentFileInfo[n].id,
          sort: this.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.attchmentFileInfo[n];
      this.attchmentFileInfo[n] = this.attchmentFileInfo[n - 1];
      this.attchmentFileInfo[n - 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    downRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.attchmentFileInfo[n + 1].id,
          sort: this.attchmentFileInfo[n].sort
        },
        {
          id: this.attchmentFileInfo[n].id,
          sort: this.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.attchmentFileInfo[n];
      this.attchmentFileInfo[n] = this.attchmentFileInfo[n + 1];
      this.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    deleteRow(n, id) {
      console.log(n, id);
      this.$confirm("是否删除附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$post
          .postData(
            "deleteFileById",
            JSON.stringify({ id: id, function: "deleteFileById" }),
            this.$businessCode.fawglfj
          )
          .then(res => {
            if (res) {
              if (res && res.success) {
                this.$message({
                  type: "success",
                  showClose: true,
                  message: "删除成功"
                });
                this.attchmentFileInfo.splice(n, 1);
                this.dialogVisible = true;
                this.$forceUpdate();
                // this.getFileList();
                this.filesHas = this.attchmentFileInfo;
                // this.hYData.forEach((item, index) => {
                //   if (item.id == this.idfile) {
                //     this.attchmentFileInfo = item.attchmentFileInfo;
                //   }
                //   this.hYData.splice(index, 1, item);
                // });
              } else {
                this.$message({
                  type: "error",
                  showClose: true,
                  message: "删除失败"
                });
              }
            }
          });
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
    getOrgList(org) {
      let names = [];
      let nameId = [];
      org.forEach(item => {
        names.push(item.unitName);
        nameId.push(item.id);
      });
      this.hYData.forEach(item => {
        if (item.id === this.identifier) {
          item.strLxName = names.join(",");
          item.strLxId = nameId.join(",");
        }
      });
    },
    // 关闭
    close_btn() {
      // this.$confirm("确认关闭？")
      //   .then(() => {
      this.$intent.closeWindow(this);
      // })
      // .catch(() => {});
    },
    // 保存
    save_btn() {
      // let rowInfo = this.$refs.multipleTable.selection;
      // let ytLength = this.$refs.multipleTable.selection.length;
      // console.log(rowInfo);
      //   if (ytLength == 0) {
      //   this.$message({
      //     type: "warning",
      //     message: "请勾选议题"
      //   });
      // } else {
      for (let i = 0; i < this.hYData.length; i++) {
        this.$api.secreatary.meetings
          .getAdUpdate(this.hYData[i])
          .then(res => {
            this.id = res.data.id;
            this.createFile();
            this.$message({
              message: "保存成功",
              type: "success"
            });
          })
          .catch(() => {});
      }
      // }
    },
    // 完成并发送
    sub_btn() {
      this.$api.secreatary.meetings
        .sendPreNotification({ id: this.id })
        .then(res => {
          for (let i = 0; i < this.hYData.length; i++) {
            this.$api.secreatary.meetings
              .getAdUpdate(this.hYData[i])
              .then(res => {})
              .catch(() => {});
          }
          this.seletOptionsData = this.shoNextNode(
            this.seletOptionsData,
            this.huanJieMessage.acyNodeNextBount
          );
          // this.treeData = res.data;
          this.loadingTree = true;
          this.dialogState = true;
          this.$nextTick(() => {
            this.seletOptionsData = res.data.list;
          });
        });
    },
    //选人之后完成发送
    next(person, params) {
      // nextUserId = person.idStr;
      // nextUserName = person.name;
      // nextAvyName = params.name
      // nextAvyId = params.id; //下一结点id
      // this.formData.currentDept=person.deptName//选择人部门
      this.$api.secreatary.meetings
        .prenextHandler({
          id: this.id,
          nextUserId: person.idStr,
          nextUserCode: person.code,
          nextUserName: person.name,
          nextAvyName: params.name,
          nextAvyId: params.id
        })
        .then(res => {
          this.$message({
            type: "success",
            message: "完成并发送成功"
          });
          this.$intent.closeWindow(this);
        });
    },
    // 反馈
    back_btn() {
      let rowInfo = this.$refs.multipleTable.selection;
      let ytLength = this.$refs.multipleTable.selection.length;
      if (ytLength == 0) {
        this.$message({
          type: "warning",
          message: "请勾选议题"
        });
      } else {
        this.$api.secreatary.meetings
          .AllgetAdUpdate({
            myData: rowInfo,
            hyMc: this.formData.title,
            ytzId: this.id
          })
          .then(res => {
            this.$api.secreatary.meetings
              .getAdback({
                ytzId: this.id,
                ytIds: this.sendArry
              })
              .then(res => {
                this.$message({
                  message: "反馈成功",
                  type: "success"
                });
                this.$intent.closeWindow(this);
              });
          });
      }
    },
    // 此议题暂不上会
    nosub_btn() {
      let rowInfoId = this.$refs.multipleTable.selection[0].id;
      // console.log(rowInfoId);
      this.$api.secreatary.meetings
        .noSubmit({
          id: rowInfoId,
          tzId: this.id
        })
        .then(res => {
          this.$api.secreatary.meetings
            .delYiti({ ytIds: rowInfoId, id: this.id })
            .then(res => {
              this.loadData();
              this.$message({
                message: "操作成功",
                type: "success"
              });
            });
        })
        .catch(() => {});
    },
    open1() {
      this.$message("请与总行办公室秘书处联系，联系电话：67588001");
    },
    //查看部门参会流程
    adviseProcess(row) {
      // let sendLength = this.$refs.multipleTable.selection.length;
      // if (sendLength == 0) {
      //   this.$message({
      //     type: "warning",
      //     message: "请至少选中一条数据"
      //   });
      // } else {
      //查看参会流程(预通知)
      // let sendLengId = [];
      // let sendId = [];
      // this.hYData.forEach(item => {
      //   sendLengId.push(item.id);
      // });
      // sendId = sendLengId.join(",");
      // this.$api.secreatary.meetings
      //   .ckViewProcess({
      //     ytIds: sendId,
      //     ytzId: this.id
      //   })
      //   .then(res => {
      //     this.formData.workFlowId = res.data[0];
      //     console.log(this.formData.workFlowId);
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
        console.log(this.flowChartList);
        this.$refs.dialogLine.openDialog();
        return;
      }
      this.$api.pubInfo
        .Lookcx({
          curProcessInstId: this.formData.workflowId
          // subProcessInstId: this.num1str
        })
        .then(res => {
          this.flowChartList = res.data;
          this.$refs.dialogLine.openDialog();
        });
      // this.$api.pubInfo
      //   .Lookcx({
      //     curProcessInstId: this.formData.workFlowId,
      //     subProcessInstId: this.num1str
      //   })
      //   .then(res => {
      //     // console.log(res.data);
      //     this.showFlowChart = true;
      //     this.chooseSerData = res.data;
      //     this.$nextTick(() => {
      //       this.$refs.dialogLine.openDialog();
      //     });
      //   });
      // });
      // }
    },
    // 获取会议内容
    getTable() {
      this.$api.secreatary.meetings
        .ytzhyTable(
          {
            isTicked: this.status,
            ytzId: this.id
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          res.data &&
            res.data.map(item => {
              item.type = true;
            });
          this.hYData = res.data;
          this.createFile();
          this.hYData.forEach((item, index) => {
            this.getFileList(item.id, index);
            if (item.id === this.identifier) {
              item.strLxName = names.join(",");
              item.strLxId = nameId.join(",");
            }
          });
        });
    },
    // saveOrder() {
    //   let arrInfo = this.hYData;
    //   let arrInfoId = {};
    //   for (let i = 0; i < arrInfo.length; i++) {
    //     this.arrInfoNum.push({
    //       id: arrInfo[i].id,
    //       orderNum: arrInfo[i].orderNumInt
    //     });
    //   }
    //   this.$api.secreatary.meetings
    //     .saveorder({ myData: this.arrInfoNum })
    //     .then(res => {
    //     });
    // },
    // 加载详情
    loadData() {
      this.$api.secreatary.meetings.getAdDetail({ id: this.id }).then(res => {
        this.id = res.data.id;
        this.formData = res.data;
        this.formData.currentNode = "预通知";
        this.formData.workFlowId = res.data.workflowId;
        console.log("this.formData.isMainReport", this.formData.isMainReport);
        // this.num1str = res.data.num1str;
        // console.log("-----------------------num1str", this.num1str);
        this.formData.jzTime = formatData(
          res.data.jzTime,
          "YYYY-MM-DD HH:mm:ss"
        );
        this.formData.hyTime = formatData(
          res.data.hyTime,
          "YYYY-MM-DD HH:mm:ss"
        );
        this.getTable();
        // this.getHuanJie();
      });
    },
    /**
     * 选择列席部门
     */
    choiceOrgTree(row) {
      // console.log(row);
      this.selectDept = [];
      this.tempArr = [];
      let idArr = [];
      let nameArr = [];
      if (row.strLxId) {
        idArr = row.strLxId.split(",");
        nameArr = row.strLxName.split(",");
      }
      if (idArr && idArr.length > 0) {
        idArr.forEach((item, index) => {
          let obj = {};
          obj.id = item;
          obj.unitName = nameArr[index];
          this.tempArr.push(obj);
        });
      }
      this.selectDept = this.tempArr;
      console.log(this.selectDept);
      this.identifier = row.id;
      this.showOrgTree = true;
    },
    // 删除
    del() {}
    //设置控制域
    // setConfig() {
    //   this.requiredFields = this.setRequiredFields(
    //     this.requiredFields,
    //     this.huanJieMessage.requiredFields
    //   ); //必填控制域
    //   this.readFields = this.setReadFields(
    //     this.readFields,
    //     this.huanJieMessage.readFields
    //   ); //不可编辑控制域
    //   this.buttonList = this.showButton(
    //     this.buttonList,
    //     this.huanJieMessage.visibleButtons,
    //     this.huanJieMessage.visibleButtonsBycondition
    //   ); //按钮
    //   this.rules = {
    //     title: [
    //       {
    //         required: this.requiredFields.title,
    //         message: "不能为空",
    //         trigger: "blur"
    //       }
    //     ],
    //     tel: [
    //       {
    //         required: this.requiredFields.tel,
    //         message: "不能为空",
    //         trigger: "blur"
    //       },
    //       {
    //         message: "输入正确手机号",
    //         validator: this.checkPhone,
    //         trigger: "blur"
    //       }
    //     ]
    //   };
    // }
  },
  activated() {},
  updated() {},
  created() {
    this.isShow = true;
    this.status = this.$route.query.status;
    console.log(this.status, this.$route.query.status);
    sessionStorage.setItem("id", this.$route.query.id);
    this.id = sessionStorage.getItem("id");
    this.loadData();
  },
  mounted() {
    this.open1();
  },
  watch: {}
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
  overflow-y: auto;
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
  margin-left: 16px;
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
