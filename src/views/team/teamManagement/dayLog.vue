<template>
  <div>
    <!-- 日报 -->
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left" @click="goBack"></i>
          日报列表
        </p>

        <div class="grid_comtent">
          <el-button
            plain
            class="bank_grid_comtent_active"
            @click="handlePrintDayLog"
          >导出</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">日报</h3>
    </header>
    <el-form
      :model="formData"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width:65%;margin:0 auto;border:1px solid #BFBFBF;;padding:30px;margin-bottom:80px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属团队" prop="teamname">
            <el-select v-model="formData.teamname" disabled placeholder="请选择团队" clearable style="width:350px">
              <el-option label="item.teamName" value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布日期">
            <el-input disabled v-model="formData.createTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="今日完成工作">
        <el-input
        disabled
          type="textarea"
          placeholder="请输入内容,最多600个文字"
          v-model="formData.finishWorkToday"
          maxlength="600"
        ></el-input>
      </el-form-item>
      <el-form-item label="未完成工作">
        <el-input
        disabled
          type="textarea"
          placeholder="请输入内容,最多600个文字"
          v-model="formData.unfinishedWorkToday"
          maxlength="600"
        ></el-input>
      </el-form-item>
      <el-form-item label="需协调工作">
        <el-input
        disabled
          type="textarea"
          placeholder="请输入内容,最多600个文字"
          v-model="formData.coordination"
          maxlength="600"
        ></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="createname">
        <el-col>
          <el-scrollbar>
            <div v-for="item in formData.pictureAttachment" :key="item.id" class="tree_w">
              <template>
                <div class="command_wrap">
                  <span class="name down" @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.rwglfj)">{{item.fileName}}</span>
                  <span class="name">{{item.createrName}}</span>
                  <span class="name">{{item.createTime}}</span>
                </div>
              </template>
            </div>
          </el-scrollbar>
        </el-col>
      </el-form-item>
      <el-form-item label="附件" prop="createname">
        <el-col>
          <el-scrollbar>
            <div v-for="item in formData.fileAttachment" :key="item.id" class="tree_w">
              <template>
                <div class="command_wrap">
                  <span class="name down"  @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.rwglfj)">{{item.fileName}}</span>
                  <span class="name">{{item.createrName}}</span>
                  <span class="name">{{item.createTime}}</span>
                </div>
              </template>
            </div>
          </el-scrollbar>
        </el-col>
      </el-form-item>
      <el-form-item label="发布范围" prop="createname">
        <el-switch
        disabled
          style="display: block"
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="全选"
          inactive-text="取消全选"
        ></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import viewDraft from "@/minixs/viewDraft";
export default {
  data() {
    return {
      title: "",
      formData: {},
      fileList: [],
      value:false,
      getDetails_parmas: {
        function: "getDetails",
        id: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
    };
  },
  created() {
    this.getDetails_parmas.id = this.$route.query.id ? this.$route.query.id : "";
    this.getInitData();
  },
  mixins: [viewDraft],
  methods: {
    // 导出
    handlePrintDayLog() {
      const routeData = this.$router.resolve({
        path: "/printLog",
        query: {
          id: this.$route.query.id,
          status: "dayLog",
          choseYear: this.$route.query.choseYear||""
        }
      });
      window.open(routeData.href, "_blank");
    },
    //初始化数据
      getInitData() {
      this.$post
        .postData(
          "getDetails",
          JSON.stringify(this.getDetails_parmas),
          this.$businessCode.rwgl
        )
        .then(res => {
          if(res && res.success){
            this.formData = res.data;
            console.log(res.data);
            
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "请求失败",
            duration: 1000
          });
        });
    },
    //返回上一级
    goBack() {
      window.location.href = "about:blank";
      window.opener.location.reload();
      window.close()
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.rwglfj
        )
        .then(res => {
          console.log(res);
          if (res) {
            if (res && res.success) {
              location.href =
                "http://localhost:8080/ecpweb/getLocalFile.action?relativePath=" +
                res.filePath +
                "&fileName=" +
                res.fileName;
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
    //正文跳转
    doDraft(fileInfo) {
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: "viewFile",
          id:this.$route.query.id,
          zhengWenState: 0,
          JYcode: this.$businessCode.rwglfj,
          relativePath: fileInfo ? fileInfo.filePath : "",
          fileName: fileInfo ? fileInfo.fileName : ""
        }
      });
      window.open(data.href, "_blank");
    }
  }
};
</script>

<style lang="less" scoped>
.bank_dispack_side {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3b85ef;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  .bank_dispach_back {
    width: 180px;
    font-size: 24px;
    color: #fff;
    .el-icon-arrow-left {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #fff;
      color: #3b85ef;
      border-radius: 50%;
      font-weight: 600;
      margin: 0 8px;
    }
  }
  .grid_comtent {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .bank_grid_comtent_active {
      border: 1px solid #fff;
      background: #0563c8;
      color: #fff;
    }
  }
}
.nav {
  width: 100%;
  height: 110px;
}
.bank_dispach_header {
  width: 100%;
  height: 90px;
  line-height: 90px;
}

.bank_dispach_tit {
  display: block;
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
/deep/.el-textarea {
  height: 140px;
  .el-textarea__inner {
    height: 100%;
  }
}
.update {
  display: flex;
  /deep/ .el-upload__tip {
    margin-top: 0;
  }
}
/deep/.el-upload-list {
  height: 100px;
  border: 1px solid #eee;
  background: #fff;
  margin-top: 10px;
  overflow-y: scroll;
}
/deep/.el-switch{
    line-height: 28px;
    .el-switch__core{
        margin-top: 8px;
    }
}
.tree_w {
  height: auto;
  padding: 20px;
  overflow: scroll;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-scrollbar {
  height: 100%;
}
.command_wrap {
  display: flex;
  justify-content: space-between;
  min-width: 300px;
  font-size:14px;
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
  .down{
    cursor: pointer;
  }
  .down:hover{
   color: #3b85ef
  }
}
</style>