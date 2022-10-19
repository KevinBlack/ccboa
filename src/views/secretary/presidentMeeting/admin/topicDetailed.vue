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
      <div class="shiwuTitle">
        中国建设银行行长办公会议议题报送单
      </div>
      <div class="process_content" id="bank_dispach_content" style="width:95%;margin:0 auto;padding: 20px 16px;border: 1px solid #ccc;
    background: white;">
      <el-form :rules="rules" :model="formData" label-width="120px" ref="elForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="主汇报部门" prop="deptName">
              <el-input v-model="formData.deptName" :disabled="isQc"></el-input>
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
            <el-form-item label="上会依据">
              <!-- <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts> -->
              <!-- <el-input :disabled="isOnly"> -->
              <el-row v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                <el-form-item>
                  <el-col :span="24">
                    <div class="tree_w" v-if="formData.attchmentFileInfo&&formData.attchmentFileInfo.length">
                      <el-scrollbar>
                        <div v-for="(item,index) in  formData.attchmentFileInfo" :key="item.id" class="comp_list">
                          <template>
                            <div class="command_file">
                              <span class="numName">{{index+1}}.</span>
                              <span class="name down" @click="viewFile(item)">{{item.fileName}}</span>
                              <span class="name">{{item.createrName}}</span>
                              <span class="name">{{item.createTime}}</span>
                              <div class="btns">
                                <!-- <el-button type="primary" size="mini" @click.native="upRow(index)"
                                  v-if="formData.attchmentFileInfo.length>1" :disabled="index==0" round>上移
                                </el-button>
                                <el-button type="primary" size="mini" @click.native="downRow(index)"
                                  v-if="formData.attchmentFileInfo.length>1"
                                  :disabled="index==formData.attchmentFileInfo.length-1" round>下移
                                </el-button> -->
                                <!-- <el-button type="warning" size="mini" @click.native="deleteRow(index,item.id)"
                                  :disabled="item.disabled" round>删除
                                </el-button> -->
                                <el-button type="primary" size="mini" @click.native="downFile(item)" round>下载
                                </el-button>
                              </div>
                            </div>
                          </template>
                        </div>
                      </el-scrollbar>
                    </div>
                  </el-col>
                </el-form-item>
              </el-row>
              <!-- </el-input> -->
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
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import uploadFileTs from "components/uploadFile/uploadFileTs";
// import shiwuLineWord from "../../../../minixs/shiwuLineWord"
import upfileList from "@/views/bianhan/components/showUploadFile"; //附件展示
import openOrDownLoadFile from "../../../../minixs/shiwuLineWord"//查看流程
export default {
  name: "topicDetail",
  components: {
    uploadFileTs,
    upfileList
  },
  mixins:[openOrDownLoadFile],
  data() {
    return {
      rules: {
        tel: [
          {
            type: "number",
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        ytMc: [{ required: true, message: "请输入议题名称", trigger: "blur" }],
      },
      // uploadConfig: {
      //   formId: "huiyi",
      //   filesHas: [],
      //   isSpecial: 0,
      //   id: ""
      // },
      buttonList: [
        { name: "关闭", show: true },
        // { name: "操作指南", show: true },
      ],
      // buttonList: ['关闭', '保存', '议题报送', '删除此文', '操作指南'],
      isOnly: false,
      isQc: false,
      id: "", 
      formData: {
        attchmentFileInfo: [],//浏览的所有文件数组
        attachid: "",//储存附件id
      },
      input: "",
      value1: "",
    };
  },

  computed: {},
  methods: {
    buttonClick(params) {
      switch (params) {
        case "关闭":
          this.close_btn();
          break;
        // case "保存":
        //   this.save_btn();
        //   break;
        // case "议题报送":
        //   this.submit_btn();
        //   break;
        // case "删除此文":
        //   this.delete_btn();
        //   break;
        case "操作指南":
          this.handBook('MSGZ')
          break;
      }
    },
    // 关闭
    close_btn() {
      // this.$confirm("是否退出当前页面?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
          this.$intent.closeWindow(this);
        // })
        // .catch(() => {

        // });
    },
    // 保存
    // save_btn() {
    //   this.$refs["elForm"].validate((valid) => {
    //     if (valid) {
    //       this.$api.secreatary.meetings
    //         .saveTopic({ ...this.formData })
    //         .then((res) => {
    //           // console.log(res);
    //            this.$message({
    //                 type: 'success ',
    //                 message: '保存成功!'
    //               });
    //           this.$router.go(-1);
    //         });
    //     }
    //   }); 
    // },
    // 提交
    // submit_btn() {
    //   this.$refs["elForm"].validate((valid) => {
    //     if (valid) {
    //       this.$api.secreatary.meetings
    //         .topicSubmit({ ...this.formData })
    //         .then((res) => {
    //           // console.log(res);
    //           this.$confirm("是否报送议题?", {
    //             confirmButtonText: "确定",
    //             cancelButtonText: "取消",
    //             type: "warning",
    //           })
    //             .then(() => {
    //               this.$message({
    //                 type: 'success ',
    //                 message: '报送成功!'
    //               });
    //               this.buttonList[1].show = false;
    //               this.buttonList[2].show = false;
    //               this.buttonList[3].show = false;
    //               this.buttonList[4].show = false;
    //               this.isQc = true;
    //               this.isOnly = true;
    //             }
    //             )
    //           setTimeout(() => {
    //             this.$router.back();
    //           }, 3000);
    //         });
    //     }
    //   });
    // },

    // //  删除此文
    // delete_btn() {
    //     this.$api.secreatary.meetings.topicDel(
    //         {id: this.id}
    //     ).then(res => {
    //         if (res.code == "SUCCESS") {
    //             this.$message({
    //                 message: '删除成功',
    //                 type: 'success'
    //             });
    //         }
    //         this.$router.go(-1)
    //     })
    // },
    getDetail() {
      this.$api.secreatary.meetings
        .topDetailQuery({
          id: this.id,
        })
        .then((res) => {
          this.formData = res.data;
          if(this.formData.sbSj) {
            this.formData.sbSj = formatData(
              res.data.sbSj,
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          this.isQc = true;
          this.isOnly = true;
          this.getFileList();
        });
    },
    getFileList() {
      this.$api.setSysConfig.getTextemList({ id: this.id+"123" }).then(res => {
        this.$nextTick(() => {
              this.$set(this.formData, 'attchmentFileInfo', res.data)
              console.log('this.formData.attchmentFileInfo',this.formData.attchmentFileInfo)
              // this.uploadConfig.filesHas = this.formData.attchmentFileInfo
        })
      }); 
    },
    // 引入会议依据
    // fileList (files) {
    //   if (this.formData.attchmentFileInfo && this.formData.attchmentFileInfo.length) {
    //     this.formData.attchmentFileInfo.push(...files)
    //   } else {
    //     this.formData.attchmentFileInfo = files
    //   }
    //   if (!this.formData.attachs) {
    //     this.formData.attachs = [];
    //   }
    //   files.forEach(item => {
    //     this.formData.attachs.push(item.id)
    //   })
    //   this.uploadConfig.filesHas = files
    //   this.formData.attachid = this.formData.attachs.join(',')
    //   this.$forceUpdate();
    // },
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
    // deleteRow (n, id) {
    //   this.$confirm("是否删除附件?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(res => {
    //     this.$post
    //       .postData(
    //         "deleteFileById",
    //         JSON.stringify({ id: id, function: "deleteFileById" }),
    //         this.$businessCode.fawglfj
    //       )
    //       .then(res => {
    //         if (res) {
    //           if (res && res.success) {
    //             this.$message({
    //               type: "success",
    //               showClose: true,
    //               message: "删除成功",

    //             });
    //             this.formData.attchmentFileInfo.splice(n, 1);
    //             this.$forceUpdate();
    //             this.uploadConfig.filesHas = this.formData.attchmentFileInfo;
    //           } else {
    //             this.$message({
    //               type: "error",
    //               showClose: true,
    //               message: "删除失败",
    //             });
    //           }
    //         }
    //       });
    //   })
    // },
    downFile (file) {
      let bank_doDownloadFile = { function: "doDownloadFile" }
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
              downLoadFileReName((this.$post.getEnvState() ? location.origin : "http://localhost:8080") + "/ecpweb/getLocalFile.action?relativePath=" +
                res.filePath +
                "&fileName=" +
                res.fileName, file.fileName);
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
  },
  activated() {},
  created() {
    // let type = this.$route.query.rowData.type;
    // if(!this.$route.query.type&&typeof(this.$route.query.type)==undefined){
    //   return;
    // }
    let type = this.$route.query.type;
    console.log(3333,type);
    // if(!(this.$route.query.detail).id){
    //    return;
    //  }
    
    switch (Number(type)) {
      case 0:
        // this.$api.secreatary.meetings.topicDraft({}).then((res) => {
        //   this.formData = res.data;
        // });
        // // console.log('222222222222222',this.id);
        // this.isQc = true;
        // this.isOnly = false;
        // break;
      case 1:
        sessionStorage.setItem("id", this.$route.query.id);
        this.id = sessionStorage.getItem("id");
        console.log(this.id);
        this.getDetail();
        break;
    }
  },
  mounted() {},
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
