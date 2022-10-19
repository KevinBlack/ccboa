<template>
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>退文处理单
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="drafting('0')">查看正文</el-button>
          <el-button size="small" plain @click="processSheet">打印收回单</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">{{ draftOrganTitle }}</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <div class="bank_dispach_file" style="padding: 50px 50px 20px 20px;">
          <el-form
            ref="fromdata"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="发文字号" prop="documentNo" ref="documentNo">
                    <el-input v-model="fromdata.documentNo" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟稿部门" prop="draftDepartment" ref="draftDepartment">
                    <el-input v-model="fromdata.draftDepartment" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟稿人" prop="draftUser" ref="draftUser">
                    <el-input v-model="fromdata.draftUser" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="正文标题" prop="title" ref="title">
                    <el-input v-model="fromdata.title" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="附件标题">
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.attachTitle" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收回单位" prop="withdrawUnit" ref="withdrawUnit">
                    <el-input v-model="fromdata.withdrawUnit" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收回人" prop="withdrawUser" ref="withdrawUser">
                    <el-input v-model="fromdata.withdrawUser" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="收回时间" prop="withdrawTime" ref="withdrawTime">
                    <el-input v-model="fromdata.withdrawTime" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="收回原因">
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.withdrawReason" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="被收回单位">
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.recycledUnit" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="被收回部门">
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.recycledDept" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="被收回公告部门">
                    <el-input type="textarea" resize="none" autosize v-model="fromdata.tackbackedGgsend" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "qzhs_bank",
  data() {
    return {
      // 初始化查询
      qzhs_bank: {
        function: "selectWithdrawById",
        id: ""
        // id: "1"
      },
      fromdata: {
        function: "",
        documentNo: "",
        draftDepartment: "",
        draftUser: "",
        title: "",
        attachTitle: "",
        backDepartment: "",
        beBackUser: "",
        backTime: "",
        backReason: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //正文
      showDraft:false,
      draftFlag:'newFile',//正文类型 默认空白文档
      zhengWenState:'',
      draftOrganTitle: ""
    }
  },
  methods: {
    //初始值 //input框内容
    toEdit() {
      let that = this;
      this.qzhs_bank.choseYear = this.$route.query.choseYear||"";
      this.$post.postData("selectWithdrawById", JSON.stringify(this.qzhs_bank), this.$businessCode.fawgl).then(res => {
        console.log(res);
        this.fromdata = res.data;
        if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
          that.draftOrganTitle = res.data && res.data.draftDepartment + res.data.sendType + "收回单";
        } else {
          that.draftOrganTitle = res.data && res.data.draftOrgan + res.data.sendType + "收回单";
        }
      });
    },
    // 关闭
    handelclose() {
      this.$confirm("是否保存并退出当前页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.preserve();
          window.location.href = "about:blank";
          window.close();
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 100,
            showClose: true,
            message: "已取消关闭",
            duation: 1000
          });
        });
    },
    //请求文件路径
    async getFileInfo(self,thInfo) {
      var successInfo = {state:false};
      self.bank_doDownloadFile.fileName = thInfo?thInfo.templateUrl.fileName:self.fromdata.fileName;
      self.bank_doDownloadFile.filePath = thInfo?thInfo.templateUrl.filePath:self.fromdata.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fawglfj
        )
        .then(res => {
          if (res && res.success) {
            if(thInfo){
              successInfo.filePath = thInfo.filePath;
              successInfo.fileName = thInfo.fileName;
              successInfo.filePathTh = res.filePath;
              successInfo.fileNameTh = res.fileName;
            }else{
              successInfo.filePath = res.filePath;
              successInfo.fileName = res.fileName;
            }

            successInfo.state = true;
          }else{
             self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端获取失败",
              duration: 500
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "获取失败",
            duration: 500
          });
         successInfo.state = false
        });
        return successInfo
    },
    // 起草正文
    drafting(state) {
      let that = this;
      this.zhengWenState = state;
      if(!this.fromdata.filePath&&!this.fromdata.fileName&&state!=1){
         this.$message({
            type: "error",
            offset: 100,
            showClose: true,
            message: "请先起草正文",
            duation: 500
          });
        return;
      }
      this.getFileInfo(that).then((res)=>{
        if(res.state){
          this.doDraft(res)
        }
      })
    },
    //正文跳转
    doDraft(fileInfo){
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: this.zhengWenState!=1?'viewFile':this.draftFlag,
          id:getFormId(this.$route.query.id,"bankDispachId"),
          zhengWenState:this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          multiTenancyId:this.fromdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          pageFlag:'fawen',
          showBtns:this.zhengWenState==0?false:true,
          processInstId:this.fromdata.processInstId
        }
      });
      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    // 打印处理单
    processSheet() {
      const routeData = this.$router.resolve({
        path: "/printHsd",
        query: {
          id: this.qzhs_bank.id,
          choseYear: this.qzhs_bank.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
  },
  created() {
    //初始化加载数据
    this.qzhs_bank.id = this.$route.query.id ? this.$route.query.id : "";
    this.toEdit();
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #096dd9;
  font-size: 44px;
  font-weight: 500;
}
.bank_dispack_side {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .bank_dispach_back {
    visibility: hidden;
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

.bank_dispach_content {
  width: 100%;
  height: auto;
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
    .active {
      background: #3b85ef;
      color: #fff;
    }
  }

  .bank_dispach_file {
    width: 80%;
    height: auto;
    margin: 0 auto 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding-bottom: 100px;
    .bank_dispach_file_part {
      width: 80%;
      height: auto;
      margin: 0 auto;
      .bank_dispach_annotation {
        width: 100%;
        line-height: 40px;
        background: #fef7e7;
        border: 1px solid #ff6600;
        display: flex;
        font-size: 12px;
        margin: 40px 0 0;
        position: relative;
        .bank_dispach_annotation_current {
          padding: 0 30px 0 10px;
          span {
            color: #ff6600;
          }
        }
        .bank_article_illustrates {
          position: absolute;
          top: 3px;
          right: 10px;
        }
      }
    }
    .bank_dispach_file_tit {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #3b85ef;
      font-size: 16px;
      padding: 10px;
    }

    el-form-item {
      margin: 10px 0;
    }
  }

  .bank_dispach_accessory {
    font-size: 14px;
    margin-left: 10px;
    margin: 15px 10px;
  }
}
.height_90 {
  height: 200px;
  margin-top: -200px;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.opinionCheck_w {
  width: 100%;
  height: 84px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  color: #606266;
  .opinionCheck {
    text-align: left;
    margin-left: 20px;
  }
  .opinionCheckpeo {
    text-align: right;
    margin-right: 20px;
  }
}
.d_flex {
  display: flex;
  padding-bottom: 20px;
  .d_b100 {
    width: 100%;
  }
  .d_f1 {
    flex: 1;
  }
}
.pos_r {
  position: relative;
}
.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #c0c4cc;
}
</style>
