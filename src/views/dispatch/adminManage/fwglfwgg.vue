<template>
  <div>
    <el-row>
      <el-col>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm mt20">
          <el-row>
            <!-- <el-col :span="8">
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
                  <el-option
                    v-for="item in sendTypeOptions"
                    :key="item.label"
                    :value="item.label"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="机构名称">
                <div class="dispatchcswhlshwh">
                  <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                    <el-input
                      type="text"
                      readonly="readonly"
                      placeholder="请选择"
                      v-model="unitName"
                      suffix-icon="el-icon-arrow-down"
                    />
                  </select-org-or-dept>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
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
            <el-col :span="8">
              <el-form-item label="公告日期" prop="draftRangeTime">
                <div class="block">
                  <el-date-picker
                    @change="timeChange()"
                    v-model="ruleForm.endTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发文字号" prop="documentNo">
                <el-input placeholder="〔〕" v-model="ruleForm.documentNo" @focus="handleDNFocus"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="16">
              <el-form-item label="文件类型" prop="orderType">
                <el-radio-group v-model="ruleForm.orderType">
                  <el-radio label="0">全部</el-radio>
                  <el-radio label="1">本行直发文件</el-radio>
                  <el-radio label="2">转发文件</el-radio>
                  <el-radio label="3">转直发文件</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col> -->
            <el-col style="text-align: center;margin-bottom: 10px;">
              <el-button type="primary" @click="handleLoadData('1')" style="margin:0 10px">搜索</el-button>
              <el-button type="primary" @click="resetForm">重置</el-button>
              <el-button type="danger" style="float:right" @click="handleBatchDelete">删除</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col style="margin: 10px 0;">
        <m-table
          size="medium"
          :isIndex="true"
          :isPagination="true"
          :isSelection="true"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :isIndexPage="true"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @handleSelectionChange="handleSelectionChange"
          @selectAll="handleSelectionChange"
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
                    @click="collect('notice', bank_dispach.id, unitId)">收藏</el-button>
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
import selectOrgOrDept from "components/select/selectOrgOrDept";
import viewDraft from "@/minixs/viewDraft";
import dispatchIndex from "@/minixs/dispatchIndex";

export default {
  name: "fwglfwgg",
  components: {
    mTable,
    Dialog,
    selectOrgOrDept
  },
  mixins: [viewDraft,dispatchIndex],
  data() {
    return {
      isGly:false,
      deleteIds: '',
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份

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
        function: "selectToSendOrderNoticePageByParam",
        state: 0,
        startTime: "",
        endTime: "",
        curNodeCode: '',
        unitId: "",
        unitName: ""
      },
      valueTime: '',
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
        { label: "发文类型", prop: "type", align: "center", width: "80px" },
        { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
        { label: "标题", prop: "title", align: "left",minwidth:"40%" },
        { label: "拟稿部门", prop: "draftDepartment", align: "center", width: "120px" }
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
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      ruleForm: {
        draftOrganId: "",
        mainOrganNames: "",
        endTime: "",
        sendTypeId:"",
        orderType:"0",
        draftRangeTime: "",
        deptIds: "",
        documentNo: "",
        title: ""
      },
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
      changeDept: '',
      yearList:[]
    };
  },
  methods: {
    // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
      this.draforgnmPeople = manger.filter(item => {
        return (
          item.codeType === "manager_type" && item.dicCode === "sys_manager"
        );
      });
      if (this.draforgnmPeople.length !== 0) {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = false;
        this.identity = true;
      } else {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = true;
        this.identity = false;
      }
      console.log(this.unitName,this.unitId)
    },

    timeChange() {
      if(this.ruleForm.endTime){
        this.bank_countersignature.startTime = dateFormate.date(Date.parse(this.ruleForm.endTime[0]))
        this.bank_countersignature.endTime = dateFormate.date(Date.parse(this.ruleForm.endTime[1]))
      } else {
        this.bank_countersignature.startTime = ''
        this.bank_countersignature.endTime = ''
      }
    },
    handleChangeDept(val) {
      this.changeDept = val
    },
    handleChangeMonth(val) {
      this.ruleForm.draftRangeTime = dateFormate.month(Date.parse(new Date(val)))
    },
    handleLoadData (val) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      this.bank_countersignature.unitName = this.unitName
      this.bank_countersignature.unitId = this.unitId;
      if(val == '1') {
        this.ruleForm.draftOrganId = this.changeDept;
        this.pagination.page = 1;
      }
      let params = Object.assign({}, this.ruleForm);
      if(this.ruleForm.documentNo == '〔〕') {
        params.documentNo = "";
      }
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      this.$post.postData('selectToSendOrderNoticePageByParam', JSON.stringify(Object.assign(params, this.bank_countersignature, this.pagination)), this.$businessCode.fawgl).then((res) => {
        this.tableData = res.data&&res.data.rows||[];
        this.pagination.total = res.data.total;
        if(val == '1') {
           this.ruleForm.draftOrganId = this.changeDept
            }
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
        unitId:row.unitId
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
    doDraft(fileInfo,saveName){
      let str = "";
      if(!saveName){
        str = this.ggData.documentNo + this.ggData.title;
      }else{
        str = saveName;
      }
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
          saveSpecialFileName:str,
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
      this.$api.setting.organization
      .getTree({
        unitClass:1,
        unitCode: "1",
      })
      .then((res) => {
        this.unitName = res.data[0].unitName||'';
        this.unitId = res.data[0].unitCode||'';
      })
      this.bank_countersignature = {
        function: "selectToSendOrderNoticePageByParam",
        state: 0,
        startTime: "",
        endTime: "",
        curNodeCode: ''
      }
      this.ruleForm = {
        draftOrganId: "",
        mainOrganNames: "",
        endTime: "",
        sendTypeId:"",
        orderType:"0",
        draftRangeTime: "",
        deptIds: "",
        documentNo: "",
        title: "",
        choseYear: ""
      }
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.defaultYear();
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
      
      // this.ruleForm.documentNo = '〔'+ openTimeYear +'〕'
    },
    handleDNFocus() {
      this.ruleForm.documentNo = '〔〕';
    },
    handleSelectionChange (val) {
      this.checkedArr = val
      const idsArr = []
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id)
      }
      this.deleteIds = idsArr.join(';')
    },
    handleBatchDelete () {
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择要删除的字段！"
        });
        return;
      } else {
        this.$confirm("是否确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post.postData('doDeleteToSendOrderNoticeRecycle', JSON.stringify({ function: 'doDeleteToSendOrderNoticeRecycle', ids: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleLoadData('a')
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              offset: 100,
              showClose: true,
              message: "已取消删除",
              duation: 1000
            });
          });
      }
    },
    selectYear(val) {
      this.ruleForm.choseYear = val;
      if (val=="") {
        this.defaultYear();
      } else {
        this.ruleForm.documentNo = '〔'+ val +'〕'
      }
    }
  },
  created() {
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
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.defaultYear();
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
    
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf: "1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.handleLoadData('2');
      this.getSendOrderDicByParam();
    })
  }
}
</script>

<style lang="less" scoped>
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
    }
    .down:hover {
      color: #3b85ef;
    }
  }
.mt20 {
  padding: 10px 20px 0 0 !important;
  position: relative;
  border: 1px solid #f0f0f0;
  margin: 0 !important;
}
</style>
