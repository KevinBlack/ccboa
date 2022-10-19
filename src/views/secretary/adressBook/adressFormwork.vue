<template>
  <div class="selectDept">
    <div class="formHeader">
      <div class="title-text">通讯录报送</div>
    </div>
    <div>
      <el-form style="width: 850px; display: inline-block; margin: 0 12%">
        <el-form-item label="通讯录模板">
          <el-col :span="20">
            <upload-file-ts
              :uploadConfig="uploadConfig"
              @fileList="fileList"
              v-if="uploadIS"
              style="margin-left: 10px"
            ></upload-file-ts>
            <div class="tree_w" v-if="formdata.length">
              <el-scrollbar>
                <div v-for="(item, index) in formdata" :key="item.id" class="comp_list">
                  <template>
                    <div class="command_file">
                      <span class="name down" @click="downFile(item)">{{item.fileName}}</span>
                      <span class="name">{{ item.createrName }}</span>
                      <span class="name">{{ item.createTime }}</span>
                      <div class="btns">
                        <el-button
                          type="warning"
                          size="mini"
                          @click.native="deleteRow(index)"
                          round
                        >删除</el-button>
                      </div>
                    </div>
                  </template>
                </div>
              </el-scrollbar>
            </div>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="duty_tid1">
        <p>上传提示</p>
        <p>
          请下载此模板填写，请点击
          <span @click="submission">下载模板</span>
        </p>
      </div>
      <div class="btn_list">
        <el-button type="primary" @click="savedata" :disabled="savedisabled">上传</el-button>
        <el-button type="primary" @click="resetBook" :disabled="resetdisabled">重置</el-button>
        <el-button type="primary" @click="submitBook" :disabled="submitdisabled" v-if="submitBtn">提交</el-button>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
import uploadFileTs from "components/uploadFile/uploadFileTs";
import openOrDownLoadFile from "../../../minixs/shiwuLineWord";
export default {
  name: "adressFormwork",
  components: {
    uploadFileTs,
    openOrDownLoadFile
  },
  mixins: [openOrDownLoadFile],
  data() {
    return {
      submitBtn: true, //岗位隐藏提交按钮
      isSave: "", //上传后的ID
      uploadIS: true, //浏览框显隐
      savedisabled: false, //上传按钮是否可用
      resetdisabled: true, //重置按钮是否可用
      submitdisabled: true, //提交按钮是否可用
      sendStateFlag: "", //状态标识
      formdata: [],
      uploadConfig: {
        formId: "bianhan",
        filesHas: [],
        isSpecial: 0
      },
      formCfg: [
        [
          {
            type: "input-area",
            prop: "12",
            config: { rows: 4 },
            style: { width: "85%" }
          },
          { type: "button-primary", prop: "$submit", value: "浏览" },
          { type: "formitem", label: "通讯录模板" }
        ]
      ],
      formData: []
    };
  },
  methods: {
    // 浏览
    fileList(files) {
      this.formdata = files;
      this.$forceUpdate();
    },
    // 点击下载模板
    submission() {
      if (this.formData.length === 0) {
        this.$message({
          type: "warning",
          message: "请先上传模板"
        });
      } else {
        let box = {};
        box.fileName = this.formData[0].fileName;
        box.filePath = this.formData[0].filePath;
        box.id = this.formData[0].id;
        this.downFile(box);
      }
    },
    // 删除
    deleteRow(index) {
      this.$confirm("是否要删除当前附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          this.formdata = [];
          this.uploadIS = true;
          this.$api.duty.psotDelBook({ id: this.isSave }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功"
            });
          });
        })
        .catch(() => {});
    },
    //提交
    submitBook() {
      if (this.formdata.length == 1) {
        this.$api.duty
          .postTiBook({
            id: this.isSave,
            attId: this.formdata[0].id,
            attPath: this.formdata[0].filePath,
            attName: this.formdata[0].fileName,
            sendState: "2" //区分提交 2 已报送   上传 1 草稿
          })
          .then(res => {
            this.uploadIS = false;
            this.$message({
              type: "success",
              message: "提交成功"
            });
            this.formdata = [];
            this.$router.push({ path: "/secretary/adressBook/adressTable" });
          });
      } else {
        this.$message({
          type: "warning",
          message: "请先上传数据"
        });
      }
    },
    //重置
    resetBook() {
      this.$api.duty
        .postTiBook({
          id: this.isSave,
          attId: "",
          attName: "",
          attPath: ""
        })
        .then(res => {
          this.uploadIS = true;
          this.formdata = [];
          this.$message({
            type: "success",
            message: "重置成功"
          });
          this.savedisabled = false;
          this.resetdisabled = true;
        });
    },
    //点击上传
    savedata() {
      if (this.formdata.length == 1) {
        if (this.isSave == "") {
          this.$api.duty
            .postBook({
              attId: this.formdata[0].id,
              attName: this.formdata[0].fileName,
              attPath: this.formdata[0].filePath,
              sendState: "1" //区分提交 2 已报送   上传 1 草稿
            })
            .then(res => {
              this.isSave = res.data.id;
              this.$message({
                type: "success",
                message: "上传成功"
              });
              this.uploadIS = false;
              this.savedisabled = true;
              this.resetdisabled = false;
              this.submitdisabled = false;
            });
        } else {
          this.$api.duty
            .postTiBook({
              id: this.isSave,
              attId: this.formdata[0].id,
              attName: this.formdata[0].fileName,
              attPath: this.formdata[0].filePath,
              sendState: "1" //区分提交 2 已报送   上传 1 草稿
            })
            .then(res => {
              this.uploadIS = false;
              this.$message({
                type: "success",
                message: "上传成功"
              });
              this.savedisabled = true;
              this.resetdisabled = false;
              this.submitdisabled = false;
            });
        }
      } else if (this.formdata.length == 0) {
        this.$message({
          type: "warning",
          message: "请先浏览一条数据"
        });
      }
    },
    // 准备下载模板
    loadData() {
      this.$api.duty.getModel({}).then(res => {
        if (res.data.length === 0) {
          this.canShow = false;
        }
        res.data.map(item => {
          let obj = {};
          obj.id = item.id;
          obj.fileName = item.attName;
          obj.filePath = item.attPath;
          res.data.length === 0 ? "" : this.formData.push(obj);
        });
      });
      this.$forceUpdate();
    },
    // 封装下载
    downFile(file) {
      console.log(file);

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
  created() {
    this.loadData();
    //行领导秘书岗且是总行的隐藏提交按钮
    let stepJudge = JSON.parse(localStorage.getItem("tcHumanRole"));
    stepJudge.map(node => {
      if (
        node.dicId == "343" &&
        JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000"
      ) {
        this.submitBtn = false;
      }
    });
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.tree_w {
  height: 200px;
  padding: 20px;
  overflow: scroll;
  margin: 20px 0 0 10px;
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
      text-align: right;
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
    .down {
      cursor: pointer;
    }
    .down:hover {
      color: #3b85ef;
    }
  }
}
.btns {
  width: 300px;
  height: 42px;
  line-height: 42px;
  white-space: nowrap;
  text-align: right;
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
.btn_list {
  margin-bottom: 20px;
  margin-left: 45%;
}
.duty_tid1 {
  margin-left: 20%;
  font-size: 14px;
  span {
    color: red;
    cursor: pointer;
  }
}
</style>
