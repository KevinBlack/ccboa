<template>
  <div>
    <el-row>
      <el-col>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm transition_wrap" :class="{mtdown:down}">
          <el-row>
            <el-col :span="6">
              <el-form-item label="文号年份" prop="choseYear">
                <el-select
                  v-model="ruleForm.choseYear"
                  @change="selectYear"
                  placeholder="近两年"
                  style="width: 100%;"
                >
                  <el-option value label="近两年"></el-option>
                  <el-option
                    v-for="yearItem in yearList"
                    :key="yearItem"
                    :label="yearItem"
                    :value="yearItem"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发文字号" prop="documentNo">
                <el-input v-model="ruleForm.documentNo" @focus="handleDNFocus"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="当前部门" prop="draftOrganId">
                  <el-select v-model="ruleForm.draftOrganId" style="width:100%" @change="handleChangeDept">
                    <el-option
                      v-for="item in draftOptions"
                      :key="item.firstUnitId"
                      :value="item.firstUnitId"
                      :label="item.firstUnitName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            <el-col style="text-align: center;margin-bottom: 10px;">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="handleLoadData('1')" style="margin:0 10px">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="info" size="small" @click="arrow()"> <i class="el-icon-arrow-down el-icon--left"></i> 展开</el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down" class="clearfix">
            <el-row>
              <el-col :span="8">
                <el-form-item label="主办部门" prop="mainOrganNames">
                  <el-input v-model="ruleForm.mainOrganNames">
                    <el-button
                      slot="append"
                      icon="el-icon-arrow-down"
                      size="mini"
                      style="height:32px;margin-left:10px"
                      @click="openDialog"
                    ></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发文类型" prop="sendTypeId">
                  <el-select v-model="ruleForm.sendTypeId" style="width:100%" clearable>
                    <el-option value label="请选择"></el-option>
                    <el-option
                      v-for="item in sendTypeOptions"
                      :key="item.label"
                      :value="item.label"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公告日期" prop="draftRangeTime">
                  <el-date-picker
                    type="daterange"
                    v-model="ruleForm.endTime"
                    @change="handleChangeMonth"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="文件类型" prop="orderType">
                  <el-radio-group v-model="ruleForm.orderType">
                    <el-radio label="0">全部</el-radio>
                    <el-radio label="1">本行直发文件</el-radio>
                    <el-radio label="2">转发文件</el-radio>
                    <el-radio label="3">转直发文件</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="handleLoadData('1')">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                  <el-button type="info" size="small"  @click="arrow()"> <i class="el-icon-arrow-up el-icon--left"></i> 收起</el-button>
                </el-row>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col class="down">
              </el-col>
            </el-row> -->
          </div>
        </el-form>
      </el-col>
      <el-col style="margin: 10px 0;">
        <m-table
          size="medium"
          :isIndex="true"
          :isPagination="true"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          :tableData="tableData"
          :isIndexPage="true"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
        ></m-table>
      </el-col>
    </el-row>
    <el-dialog
      v-dialogDrag
      :visible.sync="cellDialog"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      title="发文公告"
    >
      <el-form v-model="ggData" label-width="130px">
        <el-row>
          <el-col>
            <el-form-item label="正文标题:">
              <el-row>
                <el-col :span="20">
                  <el-button type="text" @click="drafting(0)" class="opendraft" style="text-align:left;padding-top:0px;line-height:25px;word-break: break-all;white-space: pre-line;">{{ ggData.title }}</el-button>
                </el-col>
                <el-col :span="4" style="text-align:right;">
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    @click="collect('notice', bank_dispach.id)">收藏</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字号:">{{ ggData.documentNo }}</el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="附件:">
              <el-scrollbar>
                <div
                  v-for="(item,index) in attchmentFileInfo"
                  :key="item.id"
                  class="comp_list"
                >
                  <template>
                    <div class="command_file">
                      <span
                        class="name down"
                        :title="item.fileName"
                        @click="viewDraftFile(item.fileName,item.filePath ,$businessCode.fawglfj)"
                      >{{index+1}}. {{item.fileName}}</span>
                      <div class="btns">
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
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <Dialog ref="dialog" @checkNode="checkNode" :treeData="treeData"></Dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue"
import Dialog from "@/views/dispatch/departDialog.vue";
import dateFormate from "@/util/filters.js";
import viewDraft from "@/minixs/viewDraft";
import dispatchIndex from "@/minixs/dispatchIndex";

export default {
  name: "Fwgg",
  components: {
    mTable,
    Dialog
  },
  mixins: [viewDraft,dispatchIndex],
  data() {
    return {
      bank_dispach:{
        id:''
      },
      // 下拉框列表
      bank_dispachfile: {
        function: "getSendOrderDicByParam",
        organizationId: ""
      },
      //下载文件
      bank_doDownloadFile: {
        function: "doDownloadFile",
        fileName: "",
        filePath: ""
      },
      //正文
      showDraft: false,
      draftFlag: "newFile", //正文类型 默认空白文档
      zhengWenState: "",
      bank_countersignature: {
        function: "getSendOrderNoticeList",
        state: 0
      },
      valueTime: '',
      down:false,
      valueDepartment: '',
      valueType: '',
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      fromdata:{
        fileName:'',
        filePath:''
      },
      tableCols: [
        { label: "公告日期", prop: "createTime", align: "center", width: "150px" },
        { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
        { label: "标题", prop: "title", align: "left",minwidth:"40%" },
        { label: "发文类型", prop: "type", align: "center", width: "80px" },
        { label: "拟稿部门", prop: "draftDepartment", align: "center", width:"120px" }
      ],
      sortDate: [{ prot: "createTime", order: "descnding" }],
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      ggData: {
        title: '',
        documentNo: '',
        adjunct: ''
      },
      attchmentFileInfo:[],
      cellDialog: false,
      draftOptions:[],
      mainOptions:[],
      sendTypeOptions:[],
      ruleForm: {
        draftOrganId: "",
        mainOrganNames: "",
        sendTypeId:"",
        orderType:"0",
        draftRangeTime: "",
        endTime: "",
        deptIds: "",
        documentNo: "",
        choseYear: "",
        title: ""
      },
      yearList: [],
      treeParams: {
        function: "unitTreeByFirst",
        flag: true,
        openSup: false,
        openSupDept: false,
        openCurr: true,
        openCurrFistDept: true,
        openEqual: false,
        openEqualDept: false,
        openSub: false,
        openSubDept: false,
        wfeUnitId: ''
      },
      treeData: [],
      changeDept: ''
    };
  },
  methods: {
    //搜索条件展开/折叠
    arrow(){
      this.down = !this.down;
    },
    handleChangeDept(val) {
      this.changeDept = val
    },
    handleChangeMonth(val) {
      if(this.ruleForm.endTime){
        this.bank_countersignature.startTime = this.ruleForm.startTime = dateFormate.date(Date.parse(this.ruleForm.endTime[0]))
        this.ruleForm.draftRangeTime = this.bank_countersignature.endTime = dateFormate.date(Date.parse(this.ruleForm.endTime[1]))
      } else {
        this.bank_countersignature.startTime = ''
        this.ruleForm.draftRangeTime = this.bank_countersignature.endTime = ''
      }
      // this.ruleForm.draftRangeTime = dateFormate.date(Date.parse(new Date(val)))
    },
    handleLoadData (val) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      if(val == '1') {
        this.ruleForm.draftOrganId = this.changeDept;
        this.pagination.page = 1;
      }
      let params = {}
      params = this.ruleForm;
      if(this.ruleForm.documentNo == '〔〕') {
        params.documentNo = "";
      }
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      this.$post.postData('getSendOrderNoticeList', JSON.stringify(Object.assign(this.bank_countersignature, this.pagination, params)), this.$businessCode.fawgl).then((res) => {
        this.tableData = res.data&&res.data.rows||[];
        this.pagination.total = res.data.total;
        if(val == '1') { this.ruleForm.draftOrganId = this.changeDept }
      })
    },
    //点击 全部0  待办1  已办2
    handleTabsClick(tab, event) {
      this.currentTab = tab.index
      this.tableData = [];
      this.pagination.total = 0;
      this.bank_countersignature.state = tab.index;
      this.pagination.page = 1;
      this.handleLoadData(tab.index);
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val
      this.tableData = []
      this.handleLoadData()
    },
    handleSizeChange(val) {
      this.pagination.limit = val
      this.pagination.page = 1
      this.tableData = []
      this.handleLoadData()
    },
    cellClick(row, column, cell, event) {
      // this.ggData = row
      this.cellDialog = true
      let readType = {
        function: 'getSendOrderNoticeById',
        id: row.id,
        choseYear: this.ruleForm.choseYear
      }
      this.bank_dispach.id = row.id;
      this.fromdata.fileName = row.fileName;
      this.fromdata.filePath =row.filePath;
      this.$post.postData('getSendOrderNoticeById', JSON.stringify(readType), this.$businessCode.fawgl).then((res) => {
        if(res&&res.success){
          this.ggData = res.data
          this.attchmentFileInfo = res.data.attchmentFileInfo||[];
        }else{
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "后端返回失败",
              duration: 1000
            });
          }
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "后端返回失败",
            duration: 500
          });
        });
    },
    //下载附件
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
    //请求文件路径
    async getFileInfo(self,thInfo) {
      var successInfo = {state:false};
      self.bank_doDownloadFile.fileName = thInfo?thInfo.templateUrl.fileName:self.ggData.title;
      self.bank_doDownloadFile.filePath = thInfo?thInfo.templateUrl.filePath:self.ggData.filePath;
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
      if(!this.bank_dispach.id){
         this.$message({
            type: "error",
            offset: 100,
            showClose: true,
            message: "当前发文公告有误",
            duation: 500
          });
        return;
      }else{
        this.getFileInfo(that).then((res)=>{
          if(res.state){
            this.doDraft(res)
          }
        })
      }

    },
    //正文跳转
    doDraft(fileInfo){
      let data = this.$router.resolve({
        path: "/openAndSave_Word",
        query: {
          state: 'viewFile',
          id:this.bank_dispach.id,
          zhengWenState:0,
          JYcode: this.$businessCode.fawglfj,
          flowTranId: this.$businessCode.fawglfj,
          relativePath:fileInfo?fileInfo.filePath:'',
          fileName:fileInfo?fileInfo.fileName:'',
          tmpFileName:fileInfo?fileInfo.fileNameTh:'',
          tmpFilePath:fileInfo?fileInfo.filePathTh:'',
          isHasRedHead:fileInfo&&fileInfo.fileNameTh?true:false,
          saveSpecialFileName:this.ggData.documentNo + this.ggData.title,
          pageFlag:'fawen'
        }
      });
      this.$forceUpdate();
      window.open(data.href, "_blank");
    },
    viewFile(file) {
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
    resetForm() {
      this.ruleForm.draftOrganId = ""
      this.ruleForm.mainOrganNames = ""
      this.ruleForm.sendTypeId = ""
      this.ruleForm.orderType = "0"
      this.ruleForm.draftRangeTime = ""
      this.ruleForm.deptIds = ""
      this.ruleForm.title = ""
      this.ruleForm.documentNo = ""
      this.ruleForm.endTime = ""
      this.ruleForm.startTime = ""
      this.ruleForm.choseYear = ""
      this.defaultYear();
      this.$forceUpdate();
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.tableData = [];
    },
    backRangeTimeChange(times){
      if(!this.backRangTime||this.backRangTime=="null"||this.backRangTime=="undefined"){
        this.ruleForm.backTimeStart = "";
        this.ruleForm.backTimeEnd = "";
        return false;
      }
      this.ruleForm.backTimeStart = this.backRangTime[0]; 
      this.ruleForm.backTimeEnd = this.backRangTime[1];
    },
    getSendOrderDicByParam() {
      this.$post
        .postData(
          "getSendOrderDicByParam",
          JSON.stringify(this.bank_dispachfile),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.sendTypeOptions = JSON.parse(res.data.sendType);
        })
    },
    openDialog() {
      this.$refs.dialog.openDialog();
      this.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify(this.treeParams),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res);
          this.treeData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkNode(result) {
      this.ruleForm.mainOrganNames = result.name;
      this.ruleForm.deptIds = result.id;
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.ruleForm.documentNo = '〔'+ openTimeYear +'〕'
    },
    selectYear(val) {
      this.ruleForm.choseYear = val;
      if (val=="") {
        this.defaultYear();
      } else {
        this.ruleForm.documentNo = '〔'+ val +'〕'
      }
    },
    handleDNFocus() {
      this.ruleForm.documentNo = '〔〕';
    }
  },
  created() {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.defaultYear();
    this.$post
      .postData(
        "selTableYear",
        JSON.stringify({
          function: "selTableYear"
        }),
        this.$businessCode.fawgl
      )
      .then(res => {
        if (res && res.success) {
          this.yearList = res.data;
        }})
    this.treeTradeCode = this.$businessCode.ggfawgl;
    let transArr = localStorage.getItem("unitInfo")&&JSON.parse(localStorage.getItem("unitInfo"))||[]
    let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||''
    if(transArr.length>=1) {
      transArr.forEach(element => {
        if (element.unitId == userInfo.unitId) {
          this.draftOptions.push(element)
        }
      });
      let curDept = JSON.parse(localStorage.getItem("userInfo")).humanId
      this.draftOptions.forEach(element => {
        if(element.humanId == curDept) {
          this.ruleForm.draftOrganId = element.firstUnitId
        }
      });
    }
    this.changeDept = this.ruleForm.draftOrganId
    this.treeParams.wfeUnitId = userInfo.unitId
    
    this.handleLoadData('2');
    this.getSendOrderDicByParam();
  }
}
</script>

<style lang="less" scoped>
.mt20 {
  padding: 20px 5px 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.btn-writeEnDspc {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #DCDFE6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin-right: 10px;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
}
.btn-writeEnDspc:hover {
    background: #66b1ff;
    border-color: #66b1ff;
}
.opendraft{
  color: #409EFF;
  cursor: pointer;
}

  .command_file {
    display: flex;
    justify-content: space-between;
    min-width: 300px;
    font-size: 14px;
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
      position: initial;
    }
    .down:hover {
      color: #3b85ef;
    }
  }
.mtdown{
  padding:20px 20px 80px 0;
}
.center{
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  display: block;
}
// .down{
//   position: absolute;
//   bottom:-76px;
//   font-size:12px;
//   text-align:center;
// }
/deep/ .dispatchcswhlshwh{
  .tree-div{
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
.transition_wrap {
  transition: all 0.3s ease-in-out;
}
</style>
