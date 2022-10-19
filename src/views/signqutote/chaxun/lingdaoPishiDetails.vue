<template>
  <!-- 签报电子处理单  (非跨行) -->
  <div id="app" class="bank_dispach">
    <el-row>
      <el-col class="bank_dispack_side">
        <p class="bank_dispach_back">
          <i class="el-icon-arrow-left"></i>签报处理单
        </p>

        <div class="grid_comtent">
          <el-button size="small" plain class="bank_grid_comtent_active" @click="handelclose">关闭</el-button>
          <el-button size="small" plain @click="processSheet">打印处理单</el-button>
          <el-button size="small" plain @click="drafting">查看原文件</el-button>
          <el-button size="small" plain @click="instructions">操作指南</el-button>
        </div>
      </el-col>
    </el-row>

    <div class="nav"></div>
    <header class="bank_dispach_header">
      <h3 class="bank_dispach_tit">中国建设银行领导批示登记表</h3>
    </header>
    <div class="bank_dispach_content" id="bank_dispach_content">
      <div class="bank_dispach_file">
        <div class="bank_dispach_file_part">
          <el-form
            ref="fromdata"
            :model="fromdata"
            label-width="130px"
            class="demo_ruleForm"
          >
            <div style="padding-top: 30px;">
              <el-row>
                <el-col>
                  <el-form-item label="文件标题" >
                    <el-input v-model="fromdata.title" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文号">
                    <el-input v-model="fromdata.documentNo" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="文件类型" >
                    <el-input v-model="fromdata.qianBaoTypeName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主办部门" >
                    <el-input v-model="fromdata.draftDepartmentName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人">
                    <el-input v-model="fromdata.draftUserName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话" >
                    <el-input v-model="fromdata.phone" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="成文日期">
                    <el-input v-model="fromdata.draftTime" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col >
                  <el-form-item label="内容" prop="approvalOpinionList" ref="approvalOpinionList">
                    <div class="opinionTbody">
                      <div v-for="(item) in fromdata.approvalOpinionList" :key="item">
                      <div  class="d_flex">
                        <el-row class="d_b100">
                          <el-col
                            class="pos_r"
                          >
                            <div class="lineContent">
                              <span class="pad_lr10">{{item.userName}}
                                {{item.createTime.slice(0,4)}}年{{item.createTime.slice(5,7)}}月{{item.createTime.slice(8,10)}}日在{{item.departmentName}}呈报的{{fromdata.title}}上批示：{{item.content}}</span>   
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    </div>
                    
                  </el-form-item>
                </el-col>
                <el-col>
                <el-form-item label="备注" prop="beizhu" ref="beizhu">
                  <el-input
                    type="textarea"
                    maxlength="500"
                    resize="none"
                    autosize
                    v-model="fromdata.beizhu"
                    :disabled='true'
                  ></el-input>
                </el-form-item>
              </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      fromdata: {
        function: "selectById",
        title: "",
        documentNo: "",
        draftDepartmentName: "",
        // 文件类型
        userName: "",
        // 联系电话
        createTime: "",
        content: "",
        // 备注
        beizhu:[]
      },
      bank_dispach: {
          id: '',
          nodeCode:""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      content:""
    };
  },
  methods: {
    buttonClick(params) {
      switch (params) {
        // 打印处理单
        case "btn_dycld":
          this.processSheet();
          break;
        // 操作指南
        case "btn_czzn":
          this.instructions();
          break;
      }
    },
    
    //初始值 //input框内容
    selectById() {
      this.bank_dispach.id = this.$route.query.id;
      this.bank_dispach.moduleType = this.$route.query.moduleType;
      this.bank_dispach.nodeCode = this.$route.query.nodeCode;
      this.bank_dispach.function = "getLeaderPishiTableInfo";
      this.$post
        .postData(
          "getLeaderPishiTableInfo",
          JSON.stringify(this.bank_dispach),
          this.$businessCode.ggqbgl
        )
        .then(res => {
          // this.fromdata = res.data;
           this.fromdata = Object.assign(this.fromdata,res.data);
          
          // this.fromdata.approvalOpinionList= [{"content":"同验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题验证退号后出部门问题意","createTime":"2021-07-16 14:59:11","dataId":"5863531a-c4d4-45d7-891b-75cf93512f1f","departmentId":"10000000007","departmentName":"办公室  机要科","id":"8cc418c2-6040-47ea-8ae6-c35194ff1b9c","maxRows":0,"nodeCode":"800","start":0,"status":1,"type":"pishi_opinion","userId":"10000010","userName":"左元林"},
          // {"content":"同意","createTime":"2021-07-16 14:59:11","dataId":"5863531a-c4d4-45d7-891b-75cf93512f1f","departmentId":"10000000007","departmentName":"办公室  机要科","id":"8cc418c2-6040-47ea-8ae6-c35194ff1b9c","maxRows":0,"nodeCode":"800","start":0,"status":1,"type":"pishi_opinion","userId":"10000010","userName":"左元林"},{"content":"同意","createTime":"2021-07-16 14:59:11","dataId":"5863531a-c4d4-45d7-891b-75cf93512f1f","departmentId":"10000000007","departmentName":"办公室  机要科","id":"8cc418c2-6040-47ea-8ae6-c35194ff1b9c","maxRows":0,"nodeCode":"800","start":0,"status":1,"type":"pishi_opinion","userId":"10000010","userName":"左元林"}]
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
    // 关闭
    handelclose() {
        window.location.href = "about:blank";
        window.close();
        window.opener.location.reload();
    },
    // 查看源文件
    drafting(){
      // 当前环节是800跳办结
      // 待办  表单当前处理人与登陆处理人是否一样跳待办
      // 其余都是已办
      // 02电子非     09请示     014审批

      // 办结
      if(this.fromdata.curNodeCode == '800'){
        if(this.fromdata.multiTenancyId == "CN002"){
          this.handleOpenPage("/signquoteOverFkhDispatch",this.fromdata.id);
        }else if(this.fromdata.multiTenancyId == "CN009"){
          this.handleOpenPage("/signquoteOverKhQshDispatch",this.fromdata.id);
        }else if(this.fromdata.multiTenancyId == "CN014"){
          this.handleOpenPage("/signquoteOverKhSphDispatch",this.fromdata.id);
        }
      }else{
        // 待办
        if(this.fromdata.currentUserId == JSON.parse(localStorage.getItem('userInfo')).humanId){
          if(this.fromdata.multiTenancyId == "CN002"){
            this.handleOpenPage("/signquoteWaitFkhDispatch",this.fromdata.id);
          }else if(this.fromdata.multiTenancyId == "CN009"){
            this.handleOpenPage("/signquoteWaitKhQshDispatch",this.fromdata.id);
          }else if(this.fromdata.multiTenancyId == "CN014"){
            this.handleOpenPage("/signquoteWaitKhSphDispatch",this.fromdata.id);
          }
        }else{
        // 已办
          if(this.fromdata.multiTenancyId == "CN002"){
            this.handleOpenPage("/signquoteFinishFkhDispatch",this.fromdata.id);
          }else if(this.fromdata.multiTenancyId == "CN009"){
            this.handleOpenPage("/signquoteFinishKhQshDispatch",this.fromdata.id);
          }else if(this.fromdata.multiTenancyId == "CN014"){
            this.handleOpenPage("/signquoteFinishKhSphDispatch",this.fromdata.id);
          }
        }
      }
       
      
    },

    handleOpenPage(path, id) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          moduleType:"chaxun"
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 打印处理单
    processSheet() {
      const routeData = this.$router.resolve({
        path: "/ldpscld",
        query: {
          id: this.bank_dispach.id,
          nodeCode:this.$route.query.nodeCode,
          choseYear:this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    // instructions() {}
    // 操作指南
    instructions() {
      this.$post
        .postData(
          "getAttchment",
          JSON.stringify({
            function: "getAttchment",
            moduleCode: "QBGL"
          }),
          this.$businessCode.fwbz
        )
        .then(res => {
          if (res && res.success) {
            this.getInstFileInfo(this, res.data).then(resF => {
              if (resF.state) {
                let data = this.$router.resolve({
                  path: "/openAndSave_Word",
                  query: {
                    state: "viewFile",
                    id: this.fromdata.id,
                    zhengWenState: 0,
                    JYcode: this.$businessCode.fwbzfj,
                    multiTenancyId: this.fromdata.multiTenancyId,
                    relativePath: resF ? resF.filePath : "",
                    fileName: resF ? resF.fileName : "",
                    showBtns: false,
                    flowTranId: this.$businessCode.qbgl //流程交易线     chai
                  }
                });
                window.open(data.href, "_blank");
              }
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件不存在",
              duration: 1500
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件不存在",
            duration: 1500
          });
        });
    },
    //获取操作指南文件路径
    async getInstFileInfo(self, flagFile) {
      var successInfo = { state: false };
      self.bank_doDownloadFile.fileName = flagFile.fileName;
      self.bank_doDownloadFile.filePath = flagFile.filePath;
      await self.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(self.bank_doDownloadFile),
          self.$businessCode.fwbzfj
        )
        .then(res => {
          if (res && res.success) {
            successInfo.filePath = res.filePath;
            successInfo.fileName = res.fileName;
            successInfo.state = true;
          } else {
            self.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "文件获取失败，请重新上传",
              duration: 1500
            });
            successInfo.state = false;
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "文件获取失败，请联系管理员",
            duration: 1500
          });
          successInfo.state = false;
        });
      return successInfo;
    },
  },
  created() {
    this.selectById();
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
.el-scrollbar {
  height: 100%;
}
//退文
.tui_wen_content {
  width: 100%;
  height: 500px;
  display: flex;
  .tui_wen_left {
    width: 65%;
    height: 480px;
    padding: 10px 20px;
    .el-scrollbar {
      height: 480px;
      overflow: scroll;
      position: relative;
    }
  }
  .tui_wen_right {
    width: 35%;
    height: 480px;
    padding: 10px 20px;
  }
  .tui_wen_list {
    padding: 20px 10px;
    font-size: 16px;
  }
  /deep/ .el-radio__label {
    display: none;
  }
}

.nav {
  width: 100%;
  height: 110px;
}
.pad_10 {
  padding: 0 5px;
}
.bank_dispach_header {
  width: 100%;
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
// .dimi_btn {
//   background: #f5f7fa;
//   height: 40px;
//   margin-left: 20px;
//   padding: 10px 20px;
//   float: right;
// }

/deep/ .hqbm .el-textarea__inner {
  color: #f00 !important;
  min-height: 40px !important;
}
/deep/ .hqbm1 .el-textarea__inner {
  min-height: 40px !important;
}
.dimi_btn {
  background: #f5f7fa;
  height: 40px;
  margin-left: 20px;
  padding: 10px 20px;
  float: right;
}
.dimi_btn1 {
  background: #f5f7fa;
  height: 40px;
  padding: 8px 5px;
  float: right;
  margin-left: 5px;
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

// .opinionTd {
//   margin-bottom: 10px;
// }

.opinionTbody {
  background-color: #e4e7ed52 !important;
  color: #000;
  padding: 5px 15px 5px 5px !important;
  border: 1px solid #E4E7ED !important;
  border-radius: 4px !important;
  margin-top: 5px;
}

.lineContent {
  line-height: 24px;
  font-size: 14px;
  word-break: break-all;
  white-space: pre-line;
}

.adviceInfo {
  font-size: 14px !important;
  line-height: 20px;
}
.pad_lr10 {
  padding: 0 10px 0 0;
}

.pad_lr10 {
  padding: 0;
}

.isLeft {
  color: red;
}

.d_b100 {
  width: 100%;
}

.lineRight {
  text-align: left;
  margin-left: 10px;
}

.opinionTd {
  margin-bottom: 10px;
}
</style>


