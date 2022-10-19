<template>
  <div>
    <div class="headerClick">
      <el-button
        class="bank_grid_comtent_active"
        v-for="(item,index) in buttonList"
        @click="buttonClick(item.name)"
        v-show="buttonList[index].show"
        :key="index"
        size="mini"
        plain
      >{{item.name}}</el-button>
    </div>
    <div style="background: white;margin: 0 auto;height: 100vh;">
      <div class="shiwuTitle">中国建设银行行长办公会议议题报送单</div>
      <div
        class="process_content"
        id="bank_dispach_content"
        style="width:95%;margin:0 auto;padding: 20px 16px;border: 1px solid #ccc;
    background: white;"
      >
        <el-form :rules="rules" :model="formData" label-width="120px" ref="elForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="主汇报部门" prop="draftDepartment">
                <el-input v-model="formData.draftDepartment" :disabled="isQc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人" prop="curuserChinaName">
                <el-input v-model="formData.curuserChinaName" :disabled="isQc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="手机号"
                prop="tel"
                :rules="[
            {required:true,message:'联系电话不能为空',trigger:'blur'},
            {validator:checkTel,trigger:'blur'}
            ]"
              >
                <el-input :disabled="isOnly" v-model="formData.tel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上报时间" prop="sbSj">
                <el-input v-model="formData.sbSj" :disabled="isQc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="议题名称" prop="ytMc">
                <el-input autosize v-model="formData.ytMc" :disabled="isOnly"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="上会依据">
                <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
                <el-row v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                  <el-form-item>
                    <el-col :span="24">
                      <div
                        class="tree_w"
                        v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length"
                      >
                        <el-scrollbar>
                          <div
                            v-for="(item,index) in  formData.attchmentFileInfo"
                            :key="item.id"
                            class="comp_list"
                          >
                            <template>
                              <div class="command_file">
                                <span class="numName">{{index+1}}.</span>
                                <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                                <span class="name">{{item.createrName}}</span>
                                <span class="name">{{item.createTime}}</span>
                                <div class="btns">
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
                                </div>
                              </div>
                            </template>
                          </div>
                        </el-scrollbar>
                      </div>
                    </el-col>
                  </el-form-item>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input
                  type="textarea"
                  v-model="formData.remark"
                  :disabled="isOnly"
                  placeholder="填写意见不可多于500字"
                  maxlength="500"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import uploadFileTs from "components/uploadFile/uploadFileTs";
import shiwuLineWord from "../../../../minixs/shiwuLineWord";
import upfileList from "@/views/bianhan/components/showUploadFile"; //附件展示
import openOrDownLoadFile from "../../../../minixs/shiwuLineWord"; //查看流程
export default {
  name: "topicDetail",
  components: {
    uploadFileTs,
    upfileList
  },
  mixins: [shiwuLineWord, openOrDownLoadFile],
  data() {
    return {
      rules: {
        tel: [
          {
            // pattern: /^1[3456789]\d{9}$/,
            // type: "string",
            required: true,
            message: "请输入电话号码",
            trigger: "blur"
          }
        ],
        ytMc: [{ required: true, message: "请输入议题名称", trigger: "blur" }]
      },
      uploadConfig: {
        formId: "huiyi",
        filesHas: [],
        isSpecial: 0,
        id: ""
      },
      buttonList: [
        { name: "关闭", show: true },
        { name: "保存", show: true },
        { name: "删除此文", show: true },
        { name: "议题报送", show: true },
        // { name: "查看流程", show: true },

        { name: "操作指南", show: true }
      ],
      // buttonList: ['关闭', '保存', '议题报送', '删除此文', '操作指南'],
      isOnly: false,
      isQc: false,
      id: "",
      formData: {
        attchmentFileInfo: [] //浏览的所有文件数组
      },
      attTitleList: [], //附件名称所有字段
      attTitleID: [], //附件名称所有ID
      input: "",
      value1: ""
    };
  },
  computed: {},
  methods: {
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
        case "删除此文":
          this.delete_btn();
          break;
        case "操作指南":
          this.handBook("MSGZ");
          break;
      }
    },
    //联系电话校验
    checkTel(rule, value, callback) {
      if (value) {
        if (/[\u4e00-\u9fa5]/g.test(value)) {
          callback(new Error("联系电话不能输入汉字！"));
        } else {
          callback();
        }
      }
      callback();
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
      //起草保存生成ID调用保存接口
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          if (!this.id) {
            this.$api.secreatary.meetings
              .saveTopic({ ...this.formData })
              .then(res => {
                console.log(res.data);
                this.id = res.data.id;
                this.formData.id = res.data.id;
                this.createFile();
                this.$message({
                  type: "success ",
                  message: "保存成功!"
                });
              });
          } else {
            //有ID保存调用保存接口
            this.$api.secreatary.meetings
              .saveTopic({ ...this.formData, id: this.id })
              .then(res => {
                this.$message({
                  type: "success ",
                  message: "保存成功!"
                });
              });
          }
        }
      });
    },
    // 议题报送
    submit_btn() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$confirm("是否报送议题?", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$api.secreatary.meetings
              .saveTopic({ ...this.formData })
              .then(res => {
                this.id = res.data.id;
                this.createFile();
                this.$api.secreatary.meetings
                  .topicSubmit({
                    ...this.formData,
                    id: this.id
                  })
                  .then(res => {
                    this.$message({
                      type: "success ",
                      message: "报送成功!"
                    });
                    this.buttonList[1].show = false;
                    this.buttonList[2].show = false;
                    this.buttonList[3].show = false;
                    this.buttonList[4].show = false;
                    this.isQc = true;
                    this.isOnly = true;
                    this.$intent.closeWindow(this);
                  });
              });
          });
        }
      });
    },
    //  删除此文
    delete_btn() {
      this.$api.secreatary.meetings.topicDel({ id: this.id }).then(res => {
        if (res.code == "SUCCESS") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.$intent.closeWindow(this);
        }
      });
    },
    getDetail() {
      this.$api.secreatary.meetings
        .topDetailQuery({
          id: this.id
        })
        .then(res => {
          this.formData = res.data;
          this.formData.sbSj = res.data.sbSj
            ? formatData(res.data.sbSj, "YYYY-MM-DD HH:mm:ss")
            : "";
          this.isQc = true;
          this.getFileList();
        });
    },
    createFile() {
      this.$api.setSysConfig
        .saveFile({
          id: this.id + "123",
          fileId: this.formData.attachid,
          fileType: "0"
        })
        .then(res => {});
    },
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({ id: this.id + "123" })
        .then(res => {
          this.$nextTick(() => {
            this.$set(this.formData, "attchmentFileInfo", res.data);
            this.$set(this.uploadConfig, "filesHas", res.data);
          });
          console.log(this.uploadConfig.filesHas);
        });
    },
    //模板块
    fileList(files) {
      //files浏览本地文件时候能获取到文件名称
      if (
        this.formData.attchmentFileInfo &&
        this.formData.attchmentFileInfo.length
      ) {
        this.formData.attchmentFileInfo.push(...files);
      } else {
        this.formData.attchmentFileInfo = files;
      }
      files.forEach(item => {
        this.attTitleID.push(item.id);
      });
      this.formData.attachid = this.attTitleID.join(",");
      this.$forceUpdate();
    },
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
  activated() {},
  created() {
    // let type = this.$route.query.rowData.type;
    // if(!this.$route.query.type&&typeof(this.$route.query.type)==undefined){
    //   return;
    // }
    let type = this.$route.query.type;
    console.log(3333, type);
    // if(!(this.$route.query.detail).id){
    //    return;
    //  }

    switch (Number(type)) {
      case 0:
        // this.$api.secreatary.meetings.topicDraft({}).then((res) => {
        //   this.formData = res.data;
        // });
        // console.log('222222222222222',this.id);
        this.formData.curuserChinaName = this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanName
          : "";
        this.formData.curuserId = this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).humanId.toString()
          : "";
        this.formData.draftDepartment = this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitName
          : "";
        this.formData.draftDepartmentId = this.$route.query.deptDetail
          ? JSON.parse(this.$route.query.deptDetail).firstUnitId.toString()
          : "";
        this.isQc = true;
        this.isOnly = false;
        break;
      case 1:
        sessionStorage.setItem("id", this.$route.query.id);
        this.id = sessionStorage.getItem("id");
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
  // background: white;
  // margin: 0 auto;
  // height: 100vh;
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

  .process_content {
    width: 80%;
    min-height: 460px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #f9aa21;
    background: #fef7e7;

    .cur_box {
      width: 95%;
      margin-left: 5%;
      height: 30px;
      margin-bottom: 20px;
      line-height: 30px;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .cur_sess {
        padding-right: 40px;
        p {
          padding-right: 20px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 20px;
          float: left;
          span {
            color: #f9aa21;
          }
        }
      }
    }

    .bottom-span {
      span {
        display: block;
        margin-left: 10%;
        font-size: 14px;
        color: red;
        line-height: 20px;
      }
    }
  }
}

.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
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
// .bank_dispach_content {
//   width: 100%;
//   height: auto;

//   .bank_dispach_side_nav {
//     width: 45px;
//     height: auto;
//     position: fixed;
//     bottom: 8px;
//     left: 10%;
//     margin-left: -43px;
//     text-align: center;

//     a {
//       width: 45px;
//       height: 70px;
//       border: 2px solid #3b85ef;
//       font-size: 16px;
//       margin: 15px 0;
//       color: #3b85ef;
//       background: #fff;
//       border-radius: 10px 0 0 10px;
//       font-weight: 600;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//     }

//     .active {
//       background: #3b85ef;
//       color: #fff;
//     }
//   }
// }
</style>
