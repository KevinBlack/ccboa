<template>
  <div class="qcDetail">
    <div class="headerClick">
      <div class="left" style="margin-left:50px" @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
        <span>议题报送单</span>
      </div>
      <div class="right" style="margin-right:20px">
        <el-button
          v-for="(item,index) in buttonList"
          @click="buttonClick(item.name)"
          v-show="buttonList[index].show"
          :key="index"
          size="mini"
          plain
        >{{item.name}}</el-button>
      </div>
    </div>
    <div class="qcHeader">
      <div class="title-text">中国建设银行行长办公会议议题报送单</div>
      <el-form :rules="rules" :model="formData" label-width="120px" ref="elForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="主汇报部门" prop="draftDepartment">
              <el-input v-model="formData.draftDepartment" :disabled="isQc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="currentUser">
              <el-input v-model="formData.currentUser" :disabled="isQc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号" prop="tel">
              <el-input v-model.number="formData.tel" :disabled="isOnly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上报时间" prop="sbSj">
              <el-input v-model="formData.sbSj" :disabled="isQc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="议题名称" prop="ytMc">
              <el-input autosize v-model="formData.ytMc" :disabled="isOnly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="同时添加至">
              <el-col :span="23">
                <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
                <div
                  class="tree_w"
                  v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length"
                >
                  <el-scrollbar>
                    <div
                      v-for="(item) in  formData.attchmentFileInfo"
                      :key="item.id"
                      class="comp_list"
                    >
                      <template>
                        <div class="command_file">
                          <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                          <span class="name">{{item.createrName}}</span>
                          <span class="name">{{item.createTime}}</span>
                          <!-- <div class="btns">
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="upRow(index)"
                          v-if="formData.attchmentFileInfo.length>1"
                          :disabled="index==0"
                          round
                        >上移</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click.native="downRow(index)"
                          v-if="formData.attchmentFileInfo.length>1"
                          :disabled="index==formData.attchmentFileInfo.length-1"
                          round
                        >下移</el-button>
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
                          </div>-->
                        </div>
                      </template>
                    </div>
                  </el-scrollbar>
                </div>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="formData.remark" :disabled="isOnly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <shiwuFlow :tableData="flowChartList" ref="dialogLine" v-if="showFlowChart"></shiwuFlow>
  </div>
</template>
<script type="text/ecmascript-6">
import uploadFileTs from "components/uploadFile/uploadFileTs";
export default {
  name: "topicDetail",
  components: {
    uploadFileTs
  },
  data() {
    return {
      formData: {
        currentNode: "起草",
        draftDate: formatData(new Date().getTime(), "YYYY-MM-DD HH:mm:ss"),
        currentUser: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "",
        // currentUserId: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).humanId : "",
        // currentNowName: this.$route.query.deptDetail ? (JSON.parse(this.$route.query.deptDetail).currUnitName + " " + JSON.parse(this.$route.query.deptDetail).humanName) : "",
        // draftUser: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).humanName : "",
        // draftUserId: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).humanId : "",
        // maindept: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).firstUnitName : "",
        // maindptId: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).firstUnitId : "",
        // authorCn: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).humanName : "",
        // creator: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).humanId : "",
        draftDepartment: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).shortFirstUnitName
          : "",
        draftDepartmentId: this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId
          : "",
        // draftOrgan: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).unitName : "",
        // curbank: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).unitName : "",
        // curbankId: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).unitId : "",
        // tel: this.$route.query.deptDetail ? (JSON.parse(this.$route.query.deptDetail).telMobile.split(",")[1] ? JSON.parse(this.$route.query.deptDetail).telMobile.split(",")[1] : "") : "",
        // departName: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).firstUnitName : "",
        // departId: this.$route.query.deptDetail ? JSON.parse(this.$route.query.deptDetail).firstUnitId : "",
        type: ""
      },
      ytStatus: "",
      showFlowChart: false,
      flowChartList: [], //流程列表
      uploadConfig: {
        formId: "presidentMeeting",
        filesHas: [],
        isSpecial: 0
      },
      rules: {
        tel: [
          {
            type: "number",
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          }
        ],
        ytMc: [{ required: true, message: "请输入议题名称", trigger: "blur" }]
      },
      buttonList: [
        { name: "关闭", show: true },
        { name: "保存", show: true },
        { name: "议题报送", show: true },
        { name: "查看流程", show: true },
        { name: "删除此文", show: true },
        { name: "操作指南", show: true }
      ],
      // buttonList: ['关闭', '保存', '议题报送', '删除此文', '操作指南'],
      isOnly: false,
      isQc: false,
      id: "",
      // formData: {
      //   // tel:'',
      //   // ytMc:''
      // },
      input: "",
      value1: ""
    };
  },

  computed: {},
  methods: {
    // 附件上传下载排序
    upRow(n) {
      let midObj;
      let attachSort = [];
      attachSort.push(
        {
          id: this.formData.attchmentFileInfo[n - 1].id,
          sort: this.formData.attchmentFileInfo[n].sort
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: this.formData.attchmentFileInfo[n - 1].sort
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n - 1
      ];
      this.formData.attchmentFileInfo[n - 1] = midObj;
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
          id: this.formData.attchmentFileInfo[n + 1].id,
          sort: this.formData.attchmentFileInfo[n].sort
        },
        {
          id: this.formData.attchmentFileInfo[n].id,
          sort: this.formData.attchmentFileInfo[n + 1].sort
        }
      );
      midObj = this.formData.attchmentFileInfo[n];
      this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
        n + 1
      ];
      this.formData.attchmentFileInfo[n + 1] = midObj;
      this.$forceUpdate();
      this.$api.setSysConfig
        .sortFile({ attachSort: PJF.util.json2str(attachSort) })
        .then(res => {});
    },
    deleteRow(n, id) {
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
                this.formData.attchmentFileInfo.splice(n, 1);
                this.$forceUpdate();
                this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
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
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close_btn();
          break;
        case "保存":
          this.save_btn();
          break;
        case "议题报送":
          this.submit_btn();
          break;
        case "查看流程":
          //
          //  this.$api.meeting.getProcess({ id: this.id }).then(res => {
          //     this.showFlowChart = true;
          //     this.flowChartList = res.list
          //     this.$nextTick(() => {
          //       this.$refs.dialogLine.openDialog();
          //     });
          //   })
          break;
          break;
        case "删除此文":
          this.delete_btn();
          break;
      }
    },
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({
          id: this.id
        })
        .then(res => {
          this.$nextTick(() => {
            this.$set(this.formData, "attchmentFileInfo", res.data);
            this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
          });
        });
    },
    fileList(files) {
      console.log("-----files----->", files);
      if (
        this.formData.attchmentFileInfo &&
        this.formData.attchmentFileInfo.length
      ) {
        this.formData.attchmentFileInfo.push(...files);
      } else {
        this.formData.attchmentFileInfo = files;
      }
      if (!this.formData.attachs) {
        this.formData.attachs = [];
      }
      files.forEach(item => {
        this.formData.attachs.push(item.id);
      });
      this.uploadConfig.filesHas = files;
      this.formData.attach = this.formData.attachs.join(",");
      this.$forceUpdate();
    },
    // 选中 打开
    // fileList(files) {
    //   files.map((item) => {
    //     this.formdata.push(item);
    //   });
    //   // console.log("2", this.formdata);
    //   this.$forceUpdate();
    // },
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
      // this.$confirm("是否退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$intent.closeWindow(this);
      //   })
      //   .catch(() => {});
    },
    // 保存
    save_btn() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$api.secreatary.meeting
            .saveTopic({ ...this.formData })
            .then(res => {
              this.$message({
                type: "success ",
                message: "保存成功!"
              });
            });
        }
      });
    },
    // 提交
    submit_btn() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$api.secreatary.meeting
            .topicSubmit({ ...this.formData })
            .then(res => {
              console.log(res);
              this.$confirm("是否报送议题?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  this.$message({
                    type: "success ",
                    message: "报送成功!"
                  });
                  this.buttonList[1].show = false;
                  this.buttonList[2].show = false;
                  this.buttonList[3].show = false;
                  this.isQc = true;
                  this.isOnly = true;
                })
                .catch(() => {});
              setTimeout(() => {
                // this.$router.back();
              }, 3000);
            });
        } else {
          this.$message({
            message: "请先填写数据!"
          });
        }
      });
    },
    delete() {
      this.$api.secreatary.meeting.topicDel({ id: this.id }).then(res => {
        if (res.code == "SUCCESS") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }
        this.$router.go(-1);
        this.loadData();
      });
    },
    //  删除此文
    delete_btn() {
      this.$confirm("是否删除此文?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delete();
        })
        .catch(() => {});
    },
    //         delete_btn() {
    //   if (this.deleteArry) {
    //     this.$confirm('是否确定删除当前选中数据?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning',
    //     }).then(() => {
    //      this.$api.secreatary.meeting.topicDel(
    //                 {id: this.id}
    //             ).then((res) => {
    //         if (res.code == 'SUCCESS') {
    //           this.deleteArry = ''
    //           this.$message({
    //             message: '删除成功',
    //             type: 'success',
    //           })
    //         }
    //         this.loadData()
    //       })
    //     })
    //   } else {
    //     this.$message({
    //       type: 'warning',
    //       message: '请选择要删除的数据',
    //     })
    //   }
    // },
    getDetail() {
      this.$api.secreatary.meeting
        .topDetailQuery({
          id: this.id
        })
        .then(res => {
          console.log(
            "res---------------------------------------getDetail",
            res.data
          );

          // res.data.sbSj = formatData(item.sbSj, "YYYY-MM-DD");
          // res.data.backTime = formatData(item.backTime, "YYYY-MM-DD");

          this.formData = res.data;

          this.formData.sbSj = this.formData.sbSj
            ? formatData(this.formData.sbSj, "YYYY-MM-DD")
            : "";
          this.formData.backTime = this.formData.backTime
            ? formatData(this.formData.backTime.getTime(), "YYYY-MM-DD")
            : "";
          this.ytStatus = this.formData.ytStatus;
          if (this.ytStatus == "1") {
            this.isQc = true;
            this.isOnly = true;
          } else {
            this.isQc = true;
            this.isOnly = false;
          }
        });
    }
  },
  activated() {},
  created() {
    console.log(
      "this.$route.query.type------------------",
      this.$route.query.type
    );
    console.log(
      "this.$route.query.deptDetail----------------",
      this.$route.query.deptDetail
    );
    console.log("this.$route.query.detail", this.$route.query.detail);

    //
    // let rowData = this.$route.query.rowData;

    let type = this.$route.query.type;
    switch (type) {
      case 0:
        // this.$api.secreatary.meeting.topicDraft({}).then((res) => {
        //   this.formData = res.data;
        // });
        // console.log(rowData);
        this.isQc = true;
        break;
      case 1:
        this.id = JSON.parse(this.$route.query.detail).id;
        // this.getFileList()
        console.log("this.id-----------------------------", this.id);
        this.isQc = true;
        this.getDetail();
        break;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.el-button--primary.is-plain.is-disabled {
  color: #409eff;
  // color: #3b85ef;

  background-color: #fff;
  border-color: #d9ecff;
}
.qcDetail {
  background: white;
  margin: 0 auto;
  height: 100vh;
  .headerClick {
    background: #409eff;
    color: white;
    height: 50px;
    line-height: 50px;

    .right {
      margin-right: 130px;
      float: right;
    }
  }

  .qcHeader {
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
</style>
