<template>
  <div>
    <div class="headerClick">
      <el-button
        type="primary"
        plain
        size="mini"
        class="bank_grid_comtent_active"
        @click="close_btn"
      >关闭</el-button>
      <el-button
        type="primary"
        plain
        size="mini"
        class="bank_grid_comtent_active"
        @click="back_btn"
        v-if="this.formData.isSubmit == '0'"
      >退回</el-button>
    </div>
    <div style="background: white;margin: 0 auto;height: 100vh;">
      <div class="shiwuTitle">中国建设银行行长办公会议议题报送单</div>
      <div
        class="process_content"
        id="bank_dispach_content"
        style="width:95%;margin:0 auto;padding: 20px 16px;border: 1px solid #ccc;
    background: white;"
      >
        <el-form :rules="rules" :model="formData" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="主汇报部门" prop="deptName">
                <el-input v-model="formData.deptName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人" prop="curuserChinaName">
                <el-input v-model="formData.curuserChinaName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号" prop="tel">
                <el-input v-model="formData.tel" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上报时间" prop="sbSj">
                <el-input v-model="formData.sbSj" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="议题名称" prop="ytMc">
                <el-input autosize v-model="formData.ytMc" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="上会依据" prop="attach">
                <!-- <el-input type="textarea" autosize v-model="formData.attach" disabled></el-input> -->
                <el-row v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                  <el-form-item>
                    <el-col :span="20">
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
                              </div>
                              <div class="btns">
                                <!-- <el-button type="primary" size="mini" @click.native="upRow(index)"
                                  v-if="formData.attchmentFileInfo.length>1" :disabled="index==0" round>上移
                                </el-button>
                                <el-button type="primary" size="mini" @click.native="downRow(index)"
                                  v-if="formData.attchmentFileInfo.length>1"
                                  :disabled="index==formData.attchmentFileInfo.length-1" round>下移
                                </el-button>-->
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
                <el-input type="textarea" v-model="formData.remark" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!--退回 -->
    <el-dialog title="退回原因" :visible.sync="dialogVisible">
      <el-form ref="elpreForm" :model="preForm" :rules="ruleForm">
        <el-form-item prop="yt_thyy">
          <el-input type="textarea" v-model="preForm.yt_thyy"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendPre">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import shiwuLineWord from "@/minixs/shiwuLineWord";
// import uploadFileTs from "components/uploadFile/uploadFileTs";
export default {
  name: "topicDetail",
  components: {},
  mixins: [shiwuLineWord],
  data() {
    return {
      id: "",
      // isOnly: true,
      formData: {
        attchmentFileInfo: [], //浏览的所有文件数组
        attachid: "" //储存附件id
      },
      input: "",
      dialogVisible: false,
      value1: "",
      preForm: {
        yt_thyy: ""
      },
      ruleForm: {
        yt_thyy: [
          { required: true, message: "请填写退回原因", trigger: "blur" }
        ]
      },
      rules: {
        tel: [
          {
            type: "number",
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          }
        ],
        ytMc: [{ required: true, message: "请输入议题名称", trigger: "blur" }],
        curuserChinaName: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ]
        // attach: [{ required: true, trigger: "blur" }]
      }
    };
  },
  computed: {},
  methods: {
    // 关闭
    close_btn() {
      // this.$confirm("是否退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(() => {
      this.$intent.closeWindow(this);
      // });
    },
    getDetail() {
      this.$api.secreatary.meetings
        .topDetailQuery({
          id: this.id
        })
        .then(res => {
          console.log(res);
          this.formData = res.data;
          this.formData.sbSj = formatData(res.data.sbSj, "YYYY-MM-DD HH:mm:ss");
          this.isOnly = true;
          this.getFileList();
        });
    },
    getFileList() {
      this.$api.setSysConfig
        .getTextemList({ id: this.id + "1" })//区分预通知环节上传的附件
        .then(res => {
          this.$nextTick(() => {
            this.$set(this.formData, "attchmentFileInfo", res.data);
            // this.upload = this.formData.attchmentFileInfo
          });
        });
    },
    // 附件上传下载排序
    // upRow (n) {
    //   let midObj;
    //   let attachSort = [];
    //   attachSort.push(
    //     {
    //       id: this.formData.attchmentFileInfo[n - 1].id,
    //       sort: this.formData.attchmentFileInfo[n].sort
    //     },
    //     {
    //       id: this.formData.attchmentFileInfo[n].id,
    //       sort: this.formData.attchmentFileInfo[n - 1].sort
    //     }
    //   );
    //   midObj = this.formData.attchmentFileInfo[n];
    //   this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[n - 1];
    //   this.formData.attchmentFileInfo[n - 1] = midObj;
    //   this.$forceUpdate();
    //   this.$api.setSysConfig.sortFile({ attachSort: PJF.util.json2str(attachSort) }).then(res => {
    //   })
    // },

    // downRow (n) {
    //   let midObj;
    //   let attachSort = [];
    //   attachSort.push(
    //     {
    //       id: this.formData.attchmentFileInfo[n + 1].id,
    //       sort: this.formData.attchmentFileInfo[n].sort
    //     },
    //     {
    //       id: this.formData.attchmentFileInfo[n].id,
    //       sort: this.formData.attchmentFileInfo[n + 1].sort
    //     }
    //   );
    //   midObj = this.formData.attchmentFileInfo[n];
    //   this.formData.attchmentFileInfo[n] = this.formData.attchmentFileInfo[
    //     n + 1
    //   ];
    //   this.formData.attchmentFileInfo[n + 1] = midObj;
    //   this.$forceUpdate();
    //   this.$api.setSysConfig.sortFile({ attachSort: PJF.util.json2str(attachSort) }).then(res => {

    //   })
    // },
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
    },
    back_btn() {
      // this.$confirm("是否退回?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(() => {
      // this.$api.secreatary.meetings
      //   .topicBack({
      //     id: this.id
      //   })
      //   .then(res => {
      //     this.$message({
      //       message: "退回成功",
      //       type: "success"
      //     });
      //     this.$intent.closeWindow(this);
      //   });
      this.dialogVisible = true;
      // });
    },
    sendPre() {
      this.$refs["elpreForm"].validate(valid => {
        if (valid) {
          this.$api.secreatary.meetings
            .topicBack({
              id: this.id,
              yt_thyy: this.preForm.yt_thyy
            })
            .then(res => {
              this.$message({
                message: "退回成功",
                type: "success"
              });
              this.$intent.closeWindow(this);
              this.dialogVisible = false;
            });
        }
      });
    }
  },
  activated() {},
  created() {
    sessionStorage.setItem("id", this.$route.query.id);
    this.id = sessionStorage.getItem("id");
    this.getDetail();
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

// .bank_grid_comtent_active {
//   border: 1px solid #fff;
//   background: #0563c8;
//   color: #fff;
// }

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

// .bank_dispach_file_tit {
//   width: 100%;
//   height: 50px;
//   line-height: 50px;
//   color: #3b85ef;
//   font-size: 16px;
//   padding: 10px;
// }

// .height_90 {
//   height: 200px;
//   margin-top: -200px;
// }
// .adviceInfo {
//   position: absolute;
//   width: 100%;
//   right: 20px;
//   bottom: 0;
//   text-align: right;
//   color: #606266;
// }
// .pad_lr10 {
//   margin: 0 16px;
// }
</style>

