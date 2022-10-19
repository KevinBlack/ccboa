<!--
 * @Author: your name
 * @Date: 2020-08-12 16:12:33
 * @LastEditTime: 2020-11-07 18:07:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\secretary\adressBook\submission.vue
--> 
  
<template>
  <div class="selectDept">
    <div class="formHeader">
      <div class="title-text">通讯录模板</div>
    </div>
    <!-- <fd-form style="margin:0 10%" :data="formData" :columns="formCfg" @submit="btnEvent"></fd-form> -->
    <!-- <div class="btn_list">
      <el-button type="primary" @click="savedata">上传</el-button>
      <el-button type="primary" @click="savedata">重置</el-button>
    </div>
    <div class="duty_tid">
      <p>上传提示</p>
      <p>
        请下载此模板填写，请点击
        <span @click="submission">下载模板</span>
      </p>
    </div>-->

    <div>
      <el-form style="width: 850px; display: inline-block; margin: 0 12%">
        <el-form-item label="通讯录模板">
          <el-col :span="20">
            <upload-file-ts
              :uploadConfig="uploadConfig"
              @fileList="fileList"
              style="margin-left: 10px"
            ></upload-file-ts>
            <div class="tree_w" v-if="formdata.length">
              <el-scrollbar>
                <div v-for="item in formdata" :key="item.id" class="comp_list">
                  <template>
                    <div class="command_file">
                      <span class="name down">{{ item.fileName }}</span>
                      <span class="name">{{ item.createrName }}</span>
                      <span class="name">{{ item.createTime }}</span>
                      <div class="btns">
                        <!-- <el-button
                     
                          type="warning"
                          size="mini"
                          @click.native="deleteRow(index)"
                          round
                        >删除</el-button>-->
                      </div>
                    </div>
                  </template>
                </div>
              </el-scrollbar>
            </div>
          </el-col>
        </el-form-item>
      </el-form>
      <div class="btn_list">
        <el-button type="primary" @click="savedata" :disabled="this.canShow">上传</el-button>
        <el-button type="primary" @click="resetBook">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import uploadFileTs from "components/uploadFile/uploadFileTs";
export default {
  name: "submission",
  components: {
    uploadFileTs,
  },
  data() {
    return {
      canShow: true,
      formdata: [],
      uploadConfig: {
        formId: "tongxunlu",
        filesHas: [],
        isSpecial: 0,
      },
      formCfg: [
        [
          {
            type: "input-area",
            prop: "12",
            config: { rows: 4 },
            style: { width: "85%" },
          },
          { type: "button-primary", prop: "$submit", value: "浏览" },
          { type: "formitem", label: "通讯录" },
        ],
      ],
      formData: {},
    };
  },
  methods: {
    //初始化请求
    loadData() {
      this.$api.duty.getModel({}).then((res) => {
        if (res.data.length === 0) {
          this.canShow = false;
        }
        res.data.map((item) => {
          let obj = {};
          obj.id = item.id;
          obj.fileName = item.attName;
          obj.file_path = item.attPath;
          res.data.length === 0 ? "" : this.formdata.push(obj);
        });
      });
      this.$forceUpdate();
    },
    fileList(files) {
      if (this.formdata.length !== 0) {
        this.$message({
          type: "warning",

          message: "只能上传一个模板",
        });
      } else {
        files.map((item) => {
          this.formdata.push(item);
        });
        this.$forceUpdate();
      }
    },
    //上传
    savedata() {
      if (this.formdata.length === 0) {
        this.$message({
          type: "warning",
          message: "请先选择数据",
        });
      } else if (this.formdata.length > 1) {
        this.$message({
          type: "warning",

          message: "一次只能上传一条数据",
        });
      } else {
        this.$api.duty
          .modelPost({
            attId: this.formdata[0].id,
            attName: this.formdata[0].fileName,
            attPath: this.formdata[0].filePath,
          })
          .then((res) => {
            this.$message({
              type: "success",

              message: "上传成功",
            });
            this.canShow = true;
          });
      }
    },
    // 删除
    resetBook() {
      this.$api.duty.delModel({}).then((res) => {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.formdata = [];
        this.canShow = false;
      });
    },
    // 删除
    /* deleteRow(index) {
      this.$confirm("是否要删除当前附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        this.formdata.splice(index, 1);
      });
    }, 
    //下载
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
        .then((res) => {
          if (res) {
            if (res && res.success) {
              downLoadFileReName(
                (this.$post.getEnvState() ? location.origin : "") +
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
                duration: 500,
              });
            }
          }
        });
    },
    submission() {
      if (this.formdata.length === 0) {
        this.$message({
          type: "warning",
          message: "请先上传模板",
        });
      } else {
        let box = {};
        box.fileName = this.formdata[0].fileName;
        box.filePath = this.formdata[0].file_path;

        this.downFile(box);
      }
    }, */
  },
  mounted() {},
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="less">
.tree_w {
  height: 100px;
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
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 45%;
}
.duty_tid {
  margin-left: 20%;
  font-size: 14px;
  span {
    color: red;
    cursor: pointer;
  }
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
