<template>
  <div class="process_order">
    <div class="headerClick">
      <div class="right">
        <el-button @click="handelclose" plain class="bank_grid_comtent_active">关闭</el-button>
        <el-button @click="processSheet" plain>打印处理单</el-button>
      </div>
    </div>

    <header class="bank_dispach_header p_h_100">
      <h3 class="bank_dispach_tit">{{ draftOrganTitle }}</h3>
    </header>

    <div class="bank_dispach_content" id="bank_dispach_content">
      <!-- 侧边栏导航 -->
      <div class="bank_dispach_side_nav">
        <a
          href="javascript:void(0);"
          :class="active == '#wjys' ? 'active' : ''"
          @click="toTarget('#wjys')"
        >文件要素</a>
        <a
          href="javascript:void(0);"
          :class="active == '#qpyj' ? 'active' : ''"
          @click="toTarget('#qpyj')"
        >查重结果</a>
      </div>
      <div class="bank_dispach_file">
        <div class="process_content">
          <el-form label-width="120px" :model="formdata">
            <h6 class="bank_dispach_file_tit">文件要素</h6>
            <div id="wjys" class="height_90"></div>
            <div>
              <el-form
                :model="formdata"
                ref="refFormdata"
                label-width="150px"
                class="demo-ruleForm mt20"
              >
                <!-- <el-row>
                  <el-form-item label="标题关键字" prop="documentTitle" ref="documentTitle">
                    <el-input v-model="formdata.documentTitle" disabled></el-input>
                  </el-form-item>
                </el-row> -->

                <el-row>
                  <el-form-item label="规章或规范性文件" prop="isNormative" ref="isNormative">
                    <el-radio-group v-model="formdata.isNormative" disabled>
                      <el-radio label="是">是</el-radio>
                      <el-radio label="否">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="拟稿部门" prop="draftDepartment" ref="draftDepartment">
                      <el-input v-model="formdata.draftDepartment" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="拟稿日期" prop="draftTime" ref="draftTime">
                      <el-input v-model="formdata.draftTime" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="拟稿人" prop="draftUser" ref="draftUser">
                      <el-input v-model="formdata.draftUser" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系电话" prop="phone" ref="phone">
                      <el-input v-model="formdata.phone" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="业务分类" prop="serviceType" ref="serviceType">
                      <el-input v-model="formdata.serviceType" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="文种" prop="contentType" ref="contentType">
                      <el-input v-model="formdata.contentType" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>

            <h6 class="bank_dispach_file_tit">查重结果</h6>
            <div id="qpyj" class="height_90"></div>
            <div class="bank_dispach_ccjg">
              <p v-if="unResult" class="bank_dispach_ccjg_unResult">"（ 未匹配到查重结果 ）"</p>
              <el-row v-else v-for="(item,index) in ccjgData" :key="index">
                <el-col style="line-height: 30px;">
                  <el-form-item :label="(index+1)+' 标题：'" class="row_span">
                    <el-button type="text" @click="getFileData(item[index].file_id)" :id="item[index].file_id">{{item[index].title}}</el-button>
                  </el-form-item>
                </el-col>
                <el-col style="line-height: 30px;">
                  <el-form-item label="文号：" class="row_span">
                    <span>{{item[index].docNum}}</span>
                  </el-form-item>
                </el-col>
                <el-col style="line-height: 30px;">
                  <el-form-item label="相似度：" class="row_span">
                    <span><el-button size="small" type="primary" plain @click="handleCheck(item[index].file_id)">查看</el-button></span>
                    <!-- <span>{{Math.ceil((item[index].segment)*100)}}%</span> -->
                    <!-- <el-button type="text" @click="drafting('0')" :id="item.result[0].file_id"> <span style="margin-left:15px">[查看正文详情]</span></el-button> -->
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="提交人" prop="cnkiCreator" ref="cnkiCreator">
                    <el-input v-model="formdata.cnkiCreator" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="报告时间" prop="cnkiEndTime" ref="cnkiEndTime">
                    <el-input v-model="formdata.cnkiEndTime" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog v-dialogDrag title="查看相似程度" :visible.sync="showCheckResult" width="80%">
      <el-card class="dialog_regain">
        <m-table
          size="medium"
          :isIndex="true"
          :isSingelCheck="false"
          :isHandle="false"
          :isPagination="true"
          :highlightcurrentrow="true"
          :tableData="tableData1"
          :tableCols="tableCols"
          :pagination="pagination"
          :pageSize = 10
          @handleCurrentChange="handleCurrentChange"
        ></m-table>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCheckResult = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import dateFormate from "@/util/filters.js";
import mTable from "@/components/table/mTable.vue";
import minixs from "@/minixs/index";

export default {
  name: "circulate",
  components: {
    mTable
  },
  mixins: [minixs],
  data() {
    return {
      id: "",
      active: "#wjys",
      draftOrganTitle: "",
      formdata: {
        draftDepartment: "", //拟稿部门
        draftTime: "", //拟稿日期
        draftUser: "", //拟稿人
        phone: "", //联系电话

        documentTitle: "", //标题关键字
        isNormative: "", //规章或规范性文件

        serviceType: "", //业务分类
        contentType: "", //文种
        cnkiCreator: "", //提交人
        cnkiEndTime: "" //报告时间
      },
      ccjgData: [], //查重数据

      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      unResult: false,
      showCheckResult: false,
      tableData: [],
      tableData1: [],
      pagination: {
        limit: 10, 
        page: 1, 
        total: 10
      },
      tableCols: [
        { label: "相似句", prop: "com_paragraph", align: "center" },
        { label: "相似度", prop: "segment", align: "center", formatter(row) {
          return (Math.ceil((row.segment)*100)+'%');
        } }
      ]
    };
  },
  mounted() {},
  methods: {
    handleCurrentChange(val) {
      let nowData = [].concat(this.tableData);
      this.pagination.page = val;
      this.tableData1 = [];
      this.tableData1 = nowData.slice(10*(val-1),val*this.pagination.limit)
    },
    handleCheck(val) {
      this.ccjgData.forEach(element => {
        if(element.file_id = val) {
          this.tableData = [].concat(element);
          this.tableData1 = element.slice(1*this.pagination.page-1,this.pagination.page*this.pagination.limit)
        }
      });
      this.pagination.total = this.tableData.length||"";
      this.showCheckResult = true
    },
    // 关闭
    handelclose() {
      window.location.href = "about:blank";
      window.close();
    },
    // 打印处理单
    processSheet() {
      const routeData = this.$router.resolve({
        path: '/gwcccld',
        query: {
          id:this.$route.query.id,
          title: this.draftOrganTitle,
          draftDepartment: this.$route.query.draftDepartment, //拟稿部门
          draftTime: this.$route.query.draftTime, //拟稿日期
          draftUser: this.$route.query.draftUser, //拟稿人
          phone: this.$route.query.phone //联系电话
        }
      });
      window.open(routeData.href, "_blank");
    },
    toTarget(target) {
      const toElement = document.querySelector(target);
      toElement.scrollIntoView(this.scrollIntoViewOptions);
    },
    // 查重点击确认
    submitQueryRepeat(id) {
      let that = this
      this.$post
        .postData(
          "getCnki",
          JSON.stringify({ function: "getCnki", id: id, choseYear: this.$route.query.choseYear||"" }),
          this.$businessCode.fawgl
        )
        .then(res => {
          if (res.success) {
            let aa = res.data.cnkiResult && JSON.parse(res.data.cnkiResult)||[];
            let bb = [];
            let cc = [];
            let ccInfoArray = [];//与id 序号对应的数据            
            for (let i = 0; i < aa.length; i++) {
              bb.push(aa[i].result[0])
            }
            for (let i = 0; i < bb.length; i++) {
              if(cc.indexOf(bb[i].file_id) >-1){
                ccInfoArray[cc.indexOf(bb[i].file_id)].push(bb[i]);
              }else{
                cc.push(bb[i].file_id)
                ccInfoArray[cc.length-1] = [];
                ccInfoArray[cc.length-1].push(bb[i]);
              }
            }
            console.log(ccInfoArray);
            this.ccjgData = ccInfoArray
            // bb.filter((item,))
            if (this.ccjgData.length<=0) {
              this.unResult = true
            } else {
              this.unResult = false
            }
            this.formdata = res.data
            this.formdata.draftDepartment = this.$route.query.draftDepartment; //拟稿部门
            this.formdata.draftTime = this.$route.query.draftTime; //拟稿日期
            this.formdata.draftUser = this.$route.query.draftUser; //拟稿人
            this.formdata.phone = this.$route.query.phone; //联系电话
            
            if(res.data.isSpecialHead && res.data.isSpecialHead == '1') {
              this.draftOrganTitle = this.$route.query.draftDepartment+'电子发文查重处理单'
            } else {
              this.draftOrganTitle = JSON.parse(localStorage.getItem("userInfo")).unitName+'电子发文查重处理单'
            }
          } else {
            this.$message({
              type: "error",
              showClose: true,
              offset: 400,
              message: "请求出错",
              duration: 500
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //请求文件路径
    async getFileInfo(self,thInfo) {
      var successInfo = {state:false};
      self.bank_doDownloadFile.fileName = thInfo?thInfo.templateUrl.fileName:self.formdata.fileName;
      self.bank_doDownloadFile.filePath = thInfo?thInfo.templateUrl.filePath:self.formdata.filePath;
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
              message: "后端获取文件失败",
              duration: 2000
            });
          }
        })
        .catch(erro => {
          self.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "后端获取文件失败",
            duration: 2000
          });
         successInfo.state = false
        });
        return successInfo
    },
    // 起草正文
    drafting(state,judge) {
      let that = this;
      let tipLimit = false;
      this.zhengWenState = state;
      
      if(!this.formdata.filePath&&!this.formdata.fileName&&state!=1){
         this.$message({
            type: "error",
            offset: 100,
            showClose: true,
            message: "请先起草正文",
            duation: 2000
          });
        return;
      }
      if(state==1) {
        if(!this.formdata.type||this.formdata.type=="") {
          this.$message({
            type: "error",
            offset: 100,
            showClose: true,
            message: "请选择发文类型",
            duation: 2000
          });
          return;
        } else if(!this.formdata.redHead||this.formdata.redHead =="") {
          this.$message({
            type: "error",
            offset: 100,
            showClose: true,
            message: "请选择代字/红头",
            duation: 2000
          });
          return;
        }
        // else if(!this.formdata.textType||this.formdata.textType=="") {
        //   this.$message({
        //     type: "error",
        //     offset: 100,
        //     showClose: true,
        //     message: "请选择文种",
        //     duation: 2000
        //   });
        //   return;
        // }
      }
      if(state == 1){
        tipLimit = this.judgeDraf(state,judge);
        if(tipLimit){
          return;
        }
      }
      if(!getFormId(this.$route.query.id,"bankDispachId")){
        this.preserve().then((res)=>{
          if(res){
            if(state == 1){
               this.showDraft = true;
             }else{
               let fileInfo = {
                  filePath:this.formdata.filePath,
                  fileName:this.formdata.fileName,
               }
               this.doDraft(fileInfo)
             }
          }
        });
      }else{
        if(state == 1){
            this.showDraft = true;
          }else{
            this.getFileInfo(that).then((res)=>{
              if(res.state){
                this.preserve().then((save)=>{
                  if(save){
                    if(state!='taoHong'){
                      this.doDraft(res)
                    }else{
                      this.findTemplete(res);
                    }
                  }
                })
              }
            })
          }
      }
    },
    //正文跳转
    doDraft(fileInfo){
      let openPath = getMachineType()?"/openAndSave_Word":'openAndSave_Wps';
      let data = this.$router.resolve({
        path: openPath,
        query: {
          state: this.zhengWenState!=1?'viewFile':this.draftFlag,
          id:getFormId(this.$route.query.id,"bankDispachId"),
          zhengWenState:this.zhengWenState,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          multiTenancyId:this.formdata.multiTenancyId,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          pageFlag:'fawen',
          showBtns:this.zhengWenState==0?false:true,
          processInstId:this.formdata.processInstId,
          stepsNowName:this.formdata.currentNode,
          flowTranId:this.$businessCode.fawgl,//流程交易线    chai
        }
      });
      if(this.zhengWenState == 2){
       localStorage.setItem("bankDispachpage",'true')
      }

      this.showDraft = false;
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    viewFile(file, tache) {
      let fileType = [".doc", ".docx", ".wps", ".xls", ".xlsx", "ppt"];
      let openPlugin = false;
      let that = this;
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
          this.$businessCode.fawglfj
        )
        .then(res => {
          if (res) {
            if (res && res.success) {
              fileType.map(item => {
                if (res.fileName.toLocaleLowerCase().indexOf(item) > -1) {
                  openPlugin = true;
                }
              });
              if (openPlugin) {
                this.zhengWenState = 0;
                this.doDraft(res);
              } else {
                downLoadFileReName(
                  (this.$post.getEnvState()
                    ? location.origin
                    : "http://localhost:8080") +
                    "/ecpweb/getLocalFile.action?relativePath=" +
                    res.filePath +
                    "&fileName=" +
                    res.fileName +
                    "&openFile=true",
                  res.fileName
                );
              }
            } else {
              this.$message({
                type: "error",
                showClose: true,
                offset: 400,
                message: "后端获取文件失败",
                duration: 500
              });
            }
          }
        });
    },
    downFile(file) {
      this.bank_doDownloadFile.fileName = file.fileName;
      this.bank_doDownloadFile.filePath = file.filePath;
      this.$post
        .postData(
          "doDownloadFile",
          JSON.stringify(this.bank_doDownloadFile),
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
    checkFuFileChange(data) {
      this.uploadConfig.hasFuCheck = data == 0 ? true : false;
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
          self.$businessCode.fawglfj
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
    getFileData(fileId) {
      this.$post.postData(
        "getFileData",
        JSON.stringify({ function: "getFileData", fileId: fileId }),
        this.$businessCode.fawgl
      ).then(res => {
        let fileInfo = {
          filePath: res.data.filePath,
          fileName: res.data.fileName
        };
        console.log(fileInfo)
        let that = this;
        this.getInstFileInfo(that,fileInfo).then((back)=>{
          if(back.state){
            this.doDraft(back)
          }
        })
      })
    }
  },
  created() {
    this.submitQueryRepeat(this.$route.query.id);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
};
</script>
<style scoped lang="less">
.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}
.p_h_100 {
  padding-top: 100px;
}
.height_90 {
  height: 200px;
  margin-top: -200px;
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
}

.bank_dispach_file_tit {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #3b85ef;
  font-size: 16px;
  padding: 10px;
}

.adviceInfo {
  position: absolute;
  width: 100%;
  right: 20px;
  bottom: 0;
  text-align: right;
  color: #606266;
}

.bank_grid_comtent_active {
  border: 1px solid #fff;
  background: #0563c8;
  color: #fff;
}

.process_order {
  background: white;
  min-height: 1000px;
  margin: 0 auto;

  .headerClick {
    background: #409eff;
    color: white;
    height: 70px;
    line-height: 70px;
    background: #409eff;
    color: white;
    height: 70px;
    line-height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    .left {
      margin-left: 20px;
    }

    .right {
      margin-right: 20px;
      float: right;
    }
  }

  .formHeader {
    padding: 8px 70px;

    .title-text {
      margin-bottom: 5px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }

  .process_content {
    width: 80%;
    min-height: 920px;
    padding: 20px 16px;
    margin: 0 auto;
    border: 1px solid #ccc;

    .cur_box {
      width: 97%;
      margin-left: 3%;
      height: 30px;
      border: 1px solid #f9aa21;
      background: #fef7e7;

      .el-radio-group {
        margin-top: 9px !important;
        margin-right: 12px !important;
      }

      .el-radio {
        margin-right: 0 !important;
        margin-left: 16px !important;
      }

      .cur_sess {
        float: left;
        display: flex;
        margin-top: 12px;

        p {
          // height: 30px;
          line-height: 6px;
          font-size: 14px;
          color: #0f100e;
          margin-left: 16px;

          span {
            color: #f9aa21;
          }
        }
      }

      .feed_back {
        float: right;
        display: flex;
        font-size: 14px;
        height: 30px;
        line-height: 6px;
        color: #0f100e;

        .label_title {
          margin-top: 12px;
        }
      }
    }

    .form_taxt {
      width: 90%;
      height: 100%;
      margin: 0 auto;

      .el-form-item__label {
        text-align: left !important;
      }

      .annex_btn_list {
        width: 86%;
        margin: 0 auto;
        margin-top: 16px;
        display: flex;

        div {
          width: 60px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: #0562c7;
          color: #fff;
          border-radius: 5px;
          margin-left: 16px;
          cursor: pointer;
        }

        div:nth-child(4) {
          width: 120px;
          height: 30px;
          color: #0562c7;
          background: #fff;
          border: 1px solid #0562c7;
        }

        div:nth-child(5) {
          width: 120px;
          height: 30px;
          color: #0562c7;
          background: #fff;
          border: 1px solid #0562c7;
        }
      }
    }

    .editor_box {
      height: 450px;
      margin: 0 auto;
      display: flex;

      label {
        text-align: right;
        padding-right: 10px;
        width: 130px;
        color: #606266;
        font-size: 14px;
      }
    }
  }
}
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

    .down {
      cursor: pointer;
    }

    .down:hover {
      color: #3b85ef;
    }
  }
}
.bank_dispach_ccjg {
  .bank_dispach_ccjg_unResult {
    text-align: center;
    margin: 100px auto;
    color: #606266;
  }
  .row {
    margin-bottom: 20px;
    .el-col-24{
      height: 23px;
    }
    .row_span {
      margin-bottom: 0px;
      a {
        color: #3b85ef;
        // font-weight: 700;
      }
    }
  }
}
</style>
