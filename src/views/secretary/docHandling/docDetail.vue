
 <template>
  <div>
    <el-header>
      <i class="el-icon-arrow-left"></i>
      <span class="title">会议主办单</span>
      <div class="btn">
        <el-button size="mini" class="btnstyle" @click="onClose()">关闭</el-button>
        <el-button size="mini" class="btnstyle" @click="save">保存</el-button>
        <el-button size="mini" class="btnstyle" @click="send('完成并发送')">完成并发送</el-button>
        <el-button size="mini" class="btnstyle" @click="buildNo">生成编号</el-button>
        <el-button size="mini" class="btnstyle" @click="toHandleDep">发送办理部门</el-button>
        <el-button size="mini" class="btnstyle" @click="send('办结')">办结</el-button>
        <el-button size="mini" class="btnstyle" @click="checkState">查看办理状态</el-button>
        <el-button size="mini" class="btnstyle" @click="checkFlow">查看流程</el-button>
        <el-button size="mini" class="btnstyle" @click="onPrint()">打印处理单</el-button>
        <el-button size="mini" class="btnstyle" @click="readMe">操作指南</el-button>
        <el-button size="mini" class="btnstyle" @click="maintenan">维护</el-button>
        <el-button size="mini" class="btnstyle" @click="flowDispatch">流程调度</el-button>
      </div>
    </el-header>
    <!--    选择人员树-->
    <select-person
      :treeData="treeData"
      :loadingTree="true"
      :seletOptionsData="seletOptionsData"
      :offenUse="offenUse"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      dialogTit="选择共享用户"
      :checkIds="checkIds"
      :fromdata="dataForm"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      @showCompDialog="showCompDialog"
    />
    <div class="maintitle">{{dataForm.draftOrganFullName}}文件处理单</div>
    <div class="container" id="loadPdf">
      <div class="c-header">
        <span>当前环节:</span>
        <span style="color:#f9aa21 ;margin-left: 5px;">{{dataForm.currentNode}}</span>
        <span style="margin-left: 30px;">当前处理人:</span>
        <span style="color:#f9aa21 ;margin-left: 5px;">{{dataForm.currentUser}}</span>
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
              <el-input :disabled="false" v-model="dataForm.documentNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日程" prop="createDate">
              <el-input :disabled="disabled" v-model="dataForm.createDate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="来文单位">
              <el-input :disabled="disabled" v-model="dataForm.fromDept"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文号" prop="fileCode">
              <el-input :disabled="disabled" v-model="dataForm.fileCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文件标题" prop="title">
          <el-input v-model="dataForm.title" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="办理部门" prop="hqDept">
          <el-input v-model="dataForm.hqDept" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="领导批示">
          <el-input v-model="dataForm.leaderIdea" :disabled="disabled"></el-input>
        </el-form-item>
        <div>
          <span class="form-word">收文部门拟办意见</span>
          <el-form-item>
            <el-input
              type="textarea"
              v-model="dataForm.receiveIdea"
              style="width: 678px;margin-bottom: 10px;"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="部门办理情况">
          <el-input type="textarea" v-model="dataForm.callContent" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="dataForm.remark" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <upload-file-ts :uploadConfig="uploadConfig" @fileList="fileList"></upload-file-ts>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
  <script >
import selectPerson from "components/tree/tree-fawen";
import uploadFileTs from "components/uploadFile/uploadFileTs";
import exportTable from "@/minixs/exportTable";
import apis from "@/httpTansun/api/secreatary/fileHandle.js";
export default {
  name: "docDetail",
  components: {
    uploadFileTs,
    selectPerson
  },
  mounted() {
    this.dataForm = this.$route.query.data;
    this.identify = this.$route.query.identify;
    console.log(this.identify);
  },
  data() {
    return {
      actionType: 1,
      disabled: false,
      id: "",
      fileArr: [],
      identify: 0,
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
        attachId: ""
      },
      uploadConfig: {
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0
      },
      rules: {
        documentNo: [
          { required: true, message: "请输入编号", trigger: "blur" }
        ],
        createDate: [
          { required: true, message: "请输入办理部门", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入文件标题", trigger: "blur" }],
        hqDept: [
          { required: true, message: "请输入办理部门", trigger: "blur" }
        ],
        fileCode: [{ required: true, message: "请输入文号", trigger: "blur" }]
      }
    };
  },
  created() {
    const rowData = this.$route.query.data;
    this.actionType = this.$route.query.identify;
    if (this.actionType === 2) {
      this.disabled = true;
      this.id = rowData.id;
      this.getDetailIfo();
    }
  },
  methods: {
    //获取文件处理单详情
    getDetailIfo() {
      const data = {
        id: this.id
      };
      apis.docHandlingDetail(data).then(res => {
        if (res.code === "SUCCESS") {
          console.log(res.data);
          this.$nextTick(() => {
            this.$set(this.dataForm, "documentNo", res.data.documentNo);
            this.dataForm = res.data;
          });
          // this.dataForm = res.data
        }
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
    onPrint() {
      const routerData = this.$router.resolve({
        path: "/printdetail"
      });
      window.open(routerData.href, "_blank");
    },
    //关闭按钮
    onClose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cencelButtonText: "取消"
      })
        .then(() => {
          this.$router.go(-1);
        })
        .catch(() => {
          this.$router.go(-1);
        });
    },
    //保存按钮
    save() {
      apis
        .saveFile(this.dataForm)
        .then(res => {
          if (res.code === "success") {
            this.dataForm.id = res.data.id;
            this.$message({
              type: "success",
              message: res.msg
            });
            this.actionType = 2;
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    //选人成功
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
              let itemId = item.id.split("#")[0];
              id_name.push(itemId + "_" + item.name);
              chooseDataName.push(item.name);
              chooseDataId.push(itemId);
            } else if (item.id.indexOf("#") == -1) {
              id_name.push(item.id + "_" + item.name);
              chooseDataName.push(item.name);
              chooseDataId.push(item.id);
            }
          });
        this.dataForm.currentUser = chooseDataName.join(",");
        this.dataForm.currentUserId = chooseDataId.join(",");

        apis
          .sendFile(this.dataForm)
          .then(res => {
            if (res.code === "success") {
              this.$message({
                type: "success",
                message: "完成并发送成功"
              });
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: err
            });
          });
      }
    },
    //获取节点信息
    getNodeInfo() {},
    //完成并发送按钮
    send(val) {
      if (!this.dataForm.id) {
        this.$message({
          message: "请先保存！",
          type: "error"
        });
        return;
      }
      if (val === "完成并发送") {
        // if (process.env.NODE_ENV == 'production' && !this.$refs.ue.getUEContent()) {
        //     this.$message({ type: "error", message: "正文内容为空，请输入正文内容" })
        //     return
        // }

        this.$refs["dataForm"].validate(valid => {
          if (valid) {
            this.dataForm.content =
              process.env.NODE_ENV == "production"
                ? this.$refs.ue.getUEContent()
                : "";

            apis
              .getPersonInfoAndPersonTree({
                id: this.dataForm.id
              })
              .then(res => {
                if (res.data.result.message == "Loading") {
                  this.loadingTree = true;
                } else {
                  this.loadingTree = false;
                }
                //带约束条件判断环节
                  //过滤重复环节
                  //this.seletOptionsData = res.list;
                  let PCSAVYIDs = [];
                  this.seletOptionsData = res.list.filter(item => {
                    if (!PCSAVYIDs.includes(item.PCSAVYID)) {
                      PCSAVYIDs.push(item.PCSAVYID);
                      return item;
                    }
                  });
                  this.seletOptionsData = this.shoNextNode(
                    this.seletOptionsData,
                    this.huanJieMessage.acyNodeNextBount
                  );
                  this.dialogState = true;
              });
            this.dataForm.handleButton = val;
          } else {
            this.$message({
              type: "error",
              message: "请填写必填项"
            });
          }
        });
      } else {
        this.dataForm.handleButton = val;
        apis
          .sendFile(this.dataForm)
          .then(res => {
            if (res.code === "success") {
              this.$message({
                type: "success",
                message: "办结完成"
              });
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: err
            });
          });
      }
    },

    //生成编号
    buildNo() {
      apis
        .saveFile(this.dataForm)
        .then(res => {
          if (res.code === "success") {
            this.$message({
              type: "success",
              text: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            text: err
          });
        });
    },

    //发送至办理部门
    toHandleDep() {
      apis
        .saveFile(this.dataForm)
        .then(res => {
          if (res.code === "success") {
            this.$message({
              type: "success",
              text: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            text: err
          });
        });
    },

    //查看办理状态
    checkState() {
      apis
        .saveFile(this.dataForm)
        .then(res => {
          if (res.code === "success") {
            this.$message({
              type: "success",
              text: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            text: err
          });
        });
    },

    //查看那流程
    checkFlow() {
      apis
        .saveFile(this.dataForm)
        .then(res => {
          if (res.code === "success") {
            this.$message({
              type: "success",
              text: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            text: err
          });
        });
    },

    //操作说明
    readMe() {
      apis
        .saveFile(this.dataForm)
        .then(res => {
          if (res.code === "success") {
            this.$message({
              type: "success",
              text: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            text: err
          });
        });
    },

    //维护
    maintenan() {
      apis
        .saveFile(this.dataForm)
        .then(res => {
          if (res.code === "success") {
            this.$message({
              type: "success",
              text: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            text: err
          });
        });
    },
    //流程调度
    flowDispatch() {
      apis
        .saveFile(this.dataForm)
        .then(res => {
          if (res.code === "success") {
            this.$message({
              type: "success",
              text: res.msg
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            text: err
          });
        });
    },
    onLoad() {
      exportTable.getPdf("xiazai", [], "loadPdf");
    }
  }
};
</script>
  
  <style scoped lang="less" rel="stylesheet/less">
.el-header {
  background-color: rgb(96, 186, 221);
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
.maintitle {
  font-size: 30px;
  color: rgb(14, 117, 214);
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
}
.container {
  width: 800px;
  padding-bottom: 20px;
  margin: 30px auto;
  border: 1px solid rgb(218, 215, 215);
  padding: 20px 20px;
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
</style>
  