<template>
  <!-- 签报会签列表 -->
  <el-tabs v-model="activeName" @tab-click="handleTabsClick" v-cloak>
    <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
    <el-row style="margin-top: -20px;">
      <el-col v-if="getHuiqianTableOrderAll.state == 0">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
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
              <el-form-item label="创建日期">
                <div class="block">
                  <el-date-picker
                     @change="timeChange"
                    v-model="ruleForm.searchTime"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标题" prop="title">
                <el-input v-model="getHuiqianTableOrderAll.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="签报字号" prop="qianbaoCode">
                <el-input v-model="getHuiqianTableOrderAll.qianbaoCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col style="text-align:center;margin-bottom:10px;">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="initData('str')">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <!-- <el-button type="info" size="small" @click="arrow()">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button> -->
              </el-col>
            </el-col>
          </el-row>
          <!-- <div v-if="down">
            <el-row>
              <el-col :span="6">
                <el-form-item label="拟稿日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange(events)"
                      v-model="ruleForm.endTime"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="主办部门" prop="hostDepartment">
                  <el-input v-model="ruleForm.hostDepartment" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button type="primary">选择</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="公文状态">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="流转"></el-radio>
                  <el-radio label="办结"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="发文形式">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="电子"></el-radio>
                  <el-radio label="实物"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="发文类型">
                <el-radio-group v-model="ruleForm.type">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="行发文"></el-radio>
                  <el-radio label="部门发文"></el-radio>
                  <el-radio label="党务发文"></el-radio>
                  <el-radio label="会议纪要"></el-radio>
                  <el-radio label="工作简报"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </div>

          <el-col class="down" v-if="down">
            <el-button type="info" size="small" @click="arrow()">
              <i class="el-icon-arrow-up el-icon--left"></i> 收起
            </el-button>
          </el-col> -->
        </el-form>
      </el-col>
      <el-col  style="margin: 10px 0;" :class="{'is10':(bank_getToQianbaoHuiqianEntityByPage.state == 1)||bank_getToQianbaoHuiqianEntityByPage.state>1}">
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :state="bank_getToQianbaoHuiqianEntityByPage.state"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
  </el-tabs>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import viewDraft from "@/minixs/viewDraft";
// import optionalfield from "components/optionalfield/optionalfield.vue";
const finshData = [
  { label: "创建日期", prop: "CREATETIME", align: "center",width:"180" },
  { label: "文号", prop: "DOCUMENTCODE", align: "left",width:"210" },
  { label: "标题", prop: "TITLE", align: "left"}
];
const otherData = [
  { label: "创建日期", prop: "CREATETIME", align: "center",width:"180" },
  { label: "文号", prop: "DOCUMENTCODE", align: "left" ,width:"210"},
  { label: "标题", prop: "TITLE", align: "left" },
  { label: "当前环节", prop: "PCSAVYNM", align: "center" ,width:"120"},
  { label: "当前处理人", prop: "AVYEXCTRNM", align: "center"   ,width:"150"},
  { label: "会签类型", prop: "QIANBAOTYPENAME", align: "center",width:"80" },
  { label: "会签种类", prop: "ORDERTYPE", align: "center" ,width:"100"},
];
const allData = [
  { label: "创建日期", prop: "createTime", align: "center",width:"180" },
  { label: "文号", prop: "documentNo", align: "left" ,width:"210"},
  { label: "标题", prop: "title", align: "left" },
  { label: "当前环节", prop: "curNodeName", align: "center" ,width:"120"},
  { label: "当前处理人", prop: "currentUser", align: "center"   ,width:"150"},
  { label: "会签类型", prop: "qianBaoTypeName", align: "center" ,width:"80"},
  { label: "办理状态", prop: "orderStatus", align: "center",width:"80" },
  { label: "会签种类", prop: "orderType", align: "center" ,width:"100"},
];

export default {
  name: "DispatchFile",
  components: {
    mTable,
    // optionalfield
  },
  mixins: [viewDraft],
  data() {
    return {
      getHuiqianTableOrderAll: {
        function: "getHuiqianTableOrderAll",
        state: 0, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 20, //每页条数
        // tplbsnid: "QB_HQ"
        tplbsnid: "DZQB_HQ,KHQB_HQ",
        startTime:"",
        endTime:"",
        title:"",
        qianbaoCode:""
      },
      bank_getToQianbaoHuiqianEntityByPage: {
        function: "getWFTaskQB",
        state: 1, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 20, //每页条数
        // tplbsnid: "QB_HQ",
        // QB_DZQB  电子签报,QB_SWQB  实物签报 ,QB_KHQBQS 跨行签报请示,KHQB_SP  跨行签报审批 ,QB_HQ  会签 ,QB_XB 协办
        tplbsnid: "DZQB_HQ,KHQB_HQ",
        // DZQB电子签报,DZQB_HQ电子签报会签, SWQB 实物签报,KHQBQS 跨行签报请示,KHQB_SP 跨行签报审批,KHQB_XB 跨行签报协办,KHQB_HQ 跨行签报会签
        totalCount: 0
      },
      down: false,
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
        documentNo: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        statrTime: "",
        endTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        choseYear: "",
        desc: ""
      },
      yearList: [],
      tableLoading: false,
      activeName: sessionStorage.getItem('QBLISTtab') || "tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },


      //已读未读
      readType:false,
      idType:"",
      pcsAvyId: "",
    };
  },
  methods: {
    timeChange() {  //时间获取
      if(this.ruleForm.searchTime && this.ruleForm.searchTime[0]){
        this.getHuiqianTableOrderAll.startTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[0]));
        this.getHuiqianTableOrderAll.endTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
      }else{
        this.getHuiqianTableOrderAll.startTime = ""
        this.getHuiqianTableOrderAll.endTime = ""
      }
    },
    resetForm() {   //重置
       
       this.ruleForm = {
        documentNo: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        statrTime: "",
        endTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        choseYear: "",
        desc: ""
      }
       this.ruleForm.searchTime = "";
       this.getHuiqianTableOrderAll.title = '';
       this.getHuiqianTableOrderAll.qianbaoCode = '';
      //  this.getHuiqianTableOrderAll.receive_type = '全部';
       this.getHuiqianTableOrderAll.startTime = '';
       this.getHuiqianTableOrderAll.endTime = '';
      //  this.getHuiqianTableOrderAll.receive_type = '全部';
      //  this.searchParams.receive_type = '全部';
      // this.initData()
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.tableData = [];
    },
    // 页面初始化加载数据
    initData(str) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      this.bank_getToQianbaoHuiqianEntityByPage.state = this.getHuiqianTableOrderAll.state = witchState(this.activeName)
      if (this.getHuiqianTableOrderAll.state == "0") {
        sessionStorage.setItem('QBLIST',JSON.stringify(this.getHuiqianTableOrderAll));
        if(str){
          this.getHuiqianTableOrderAll.state = 0 //全部0 待办1  已办2  办结3
          this.getHuiqianTableOrderAll.page = 1 //当前页数
          // this.getHuiqianTableOrderAll.limit = 10 //每页条数
          this.pagination.page = 1;
        }
        this.$post
          .postData(
            "getHuiqianTableOrderAll",
            JSON.stringify(this.getHuiqianTableOrderAll),
            this.$businessCode.qbgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        sessionStorage.setItem('QBLIST',JSON.stringify(this.bank_getToQianbaoHuiqianEntityByPage));
        this.$post
          .postData(
            "getWFTaskQB",
            JSON.stringify(this.bank_getToQianbaoHuiqianEntityByPage),
            this.$businessCode.qbgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
            this.bank_getToQianbaoHuiqianEntityByPage.totalCount =
              res.data.total;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    arrow() {
      this.down = !this.down;
    },
    //点击 全部0 待办1  已办2  办结3
    handleTabsClick(tab, event) {
      this.resetForm();
      sessionStorage.setItem('QBLISTtab',tab.name);
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.total = 0;
      this.bank_getToQianbaoHuiqianEntityByPage.state = tab.index;
      this.bank_getToQianbaoHuiqianEntityByPage.page = 1;
      this.pagination.page = 1;
      this.bank_getToQianbaoHuiqianEntityByPage.totalCount = 0;
      if (tab.index == "0") {
        this.tableCols = allData;
        this.isEnd = false;
      } else if (tab.index == "1") {
        this.isEnd = true;
        this.tableCols = otherData;
      } else if (tab.index == "3") {
        this.tableCols = finshData;
        this.isEnd = false;
      } else {
        this.tableCols = otherData;
        this.isEnd = false;
      }
      this.bank_getToQianbaoHuiqianEntityByPage.state = tab.index;
      this.initData();
      this.tableLoading = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      if (this.bank_getToQianbaoHuiqianEntityByPage.state == "0") {
        this.getHuiqianTableOrderAll.page = val;
      } else {
        this.bank_getToQianbaoHuiqianEntityByPage.page = val;
      }

      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      if (this.bank_getToQianbaoHuiqianEntityByPage.state == "0") {
        this.getHuiqianTableOrderAll.limit = val;
        this.pagination.limit = val;
        this.pagination.page = this.getHuiqianTableOrderAll.page = 1;
      } else {
        this.bank_getToQianbaoHuiqianEntityByPage.limit = val;
        this.pagination.limit = val;
        this.pagination.page = this.bank_getToQianbaoHuiqianEntityByPage.page = 1;
      }

      this.tableData = [];
      this.initData();
    },


     handleOpenPage(path, id ,readType ,orderStatus) {
      if (this.bank_getToQianbaoHuiqianEntityByPage.state == "1" || (this.getHuiqianTableOrderAll.state == "0" && orderStatus == "待办")) {
        let routeId = (localStorage.getItem('routeIdList')&&JSON.parse(localStorage.getItem('routeIdList')))||[];
        if(routeId.includes(id)){
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "已经打开了该页面!",
            duration: 1500,
          })
          return;
        } 
      }
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          readFlag:readType,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },

    cellClick(row, column, cell, event) {

      
      if(this.bank_getToQianbaoHuiqianEntityByPage.state == "0"){
        this.readType = row.readFlag ? row.readFlag : 0;
        this.idType = row.id ? row.id : "";
        this.pcsAvyId = row.pcsAvyId ? row.pcsAvyId : "";
      }else{
        this.readType = row.READFLAG ? row.READFLAG : 0;
        this.idType = row.ID ? row.ID : "";
        this.pcsAvyId = row.pcsAvyId ? row.pcsAvyId : "";
      }
      
      if (
        this.bank_getToQianbaoHuiqianEntityByPage.state == "0" ||
        this.bank_getToQianbaoHuiqianEntityByPage.state == "1"
      ) {

        if(this.bank_getToQianbaoHuiqianEntityByPage.state == "0"){
              if(row.orderType == "跨行单会签" && row.orderStatus == "待办"){
                  this.handleOpenPage("/huiQianKhWaitDispatch", this.idType ,this.readType,row.orderStatus);
              }else if(row.orderType == "跨行单会签" && row.orderStatus == "已办"){
                  this.handleOpenPage("/huiqianKhFinishDispatch", this.idType ,this.readType);
              }else if(row.orderType == "跨行单会签" && row.orderStatus == "办结"){
                  this.handleOpenPage("/huiqianKhOverDispatch", this.idType ,this.readType);
              }else if(row.orderType == "本行单会签" && row.orderStatus == "待办"){
                  this.handleOpenPage("/huiQianFkhWaitDispatch", this.idType ,this.readType,row.orderStatus);
              }else if(row.orderType == "本行单会签" && row.orderStatus == "已办"){
                  this.handleOpenPage("/huiqianFkhFinishDispatch", this.idType ,this.readType);
              }else if(row.orderType == "本行单会签" && row.orderStatus == "办结"){
                  this.handleOpenPage("/huiqianFkhOverDispatch", this.idType ,this.readType);
              }
              
            }
            if (this.bank_getToQianbaoHuiqianEntityByPage.state == "1") {
              if(row.ORDERTYPE == "跨行单会签"){
                this.handleOpenPage("/huiQianKhWaitDispatch",  this.idType ,this.readType);
              }
              if(row.ORDERTYPE == "本行单会签"){
                  this.handleOpenPage("/huiQianFkhWaitDispatch",  this.idType ,this.readType);
              }
              
            }
        
        // this.$post
        //   .postData(
        //     "initCurUserDeptInfo",
        //     JSON.stringify({
        //       function: "initCurUserDeptInfo",
        //       pcsAvyId: this.pcsAvyId
        //     }),
        //     this.$businessCode.ggqbgl
        //   )
        //   .then(res => {
        //     if(this.bank_getToQianbaoHuiqianEntityByPage.state == "0"){
        //       if(row.orderType == "跨行单会签" && row.orderStatus == "待办"){
        //           this.handleOpenPage("/huiQianKhWaitDispatch", this.idType ,this.readType);
        //       }else if(row.orderType == "跨行单会签" && row.orderStatus == "已办"){
        //           this.handleOpenPage("/huiqianKhFinishDispatch", this.idType ,this.readType);
        //       }else if(row.orderType == "跨行单会签" && row.orderStatus == "办结"){
        //           this.handleOpenPage("/huiqianKhOverDispatch", this.idType ,this.readType);
        //       }else if(row.orderType == "本行单会签" && row.orderStatus == "待办"){
        //           this.handleOpenPage("/huiQianFkhWaitDispatch", this.idType ,this.readType);
        //       }else if(row.orderType == "本行单会签" && row.orderStatus == "已办"){
        //           this.handleOpenPage("/huiqianFkhFinishDispatch", this.idType ,this.readType);
        //       }else if(row.orderType == "本行单会签" && row.orderStatus == "办结"){
        //           this.handleOpenPage("/huiqianFkhOverDispatch", this.idType ,this.readType);
        //       }
              
        //     }
        //     if (this.bank_getToQianbaoHuiqianEntityByPage.state == "1") {
        //       if(row.ORDERTYPE == "跨行单会签"){
        //         this.handleOpenPage("/huiQianKhWaitDispatch",  this.idType ,this.readType);
        //       }
        //       if(row.ORDERTYPE == "本行单会签"){
        //           this.handleOpenPage("/huiQianFkhWaitDispatch",  this.idType ,this.readType);
        //       }
              
        //     }
        //   })
      }
      
      
      if (this.bank_getToQianbaoHuiqianEntityByPage.state == "2") {
        if(row.ORDERTYPE == "跨行单会签"){
           this.handleOpenPage("/huiqianKhFinishDispatch",  this.idType ,this.readType);
        }
        if(row.ORDERTYPE == "本行单会签"){
            this.handleOpenPage("/huiqianFkhFinishDispatch",  this.idType ,this.readType);
        }
        // if (!row.ORDERTYP) {
        //   this.$message({
        //     type: "error",
        //     offset: 400,
        //     showClose: true,
        //     message: "跳转页面失败",
        //     duration: 1000
        //   });
        //   return;
        // }
      }
      if (this.bank_getToQianbaoHuiqianEntityByPage.state == "3") {
        if(row.ORDERTYPE == "跨行单会签"){
           this.handleOpenPage("/huiqianKhOverDispatch",  this.idType ,this.readType);
        }
        if(row.ORDERTYPE == "本行单会签"){
            this.handleOpenPage("/huiqianFkhOverDispatch",  this.idType ,this.readType);
        }
        // if (!row.ORDERTYP) {
        //   this.$message({
        //     type: "error",
        //     offset: 400,
        //     showClose: true,
        //     message: "跳转页面失败",
        //     duration: 1000
        //   });
        //   return;
        // }
      }
      
    },
    // handleOpenPage(path, id) {
    //   const routeData = this.$router.resolve({
    //     path: path,
    //     query: {
    //       id: id
    //     }
    //   });
    //   window.open(routeData.href, "_blank");
    // },
    submitForm(formName) {},
    selectYear(val) {
      this.ruleForm.choseYear = val;
    }
  },
  created() {
    this.$router.push({
      query: {
        choseYear: ''
      }
    })
    if(sessionStorage.getItem('QBLIST')){
      if(JSON.parse(sessionStorage.getItem('QBLIST')).state == 0){
        this.tableCols = allData;
        this.isEnd = false;
        this.getHuiqianTableOrderAll = Object.assign(this.getHuiqianTableOrderAll,JSON.parse(sessionStorage.getItem('QBLIST')))
        this.pagination = {
          page: this.getHuiqianTableOrderAll.page, //第几页
          total: this.getHuiqianTableOrderAll.totalCount, //共有条数
          limit: this.getHuiqianTableOrderAll.limit, //每页条数
        }
      }else{
        this.bank_getToQianbaoHuiqianEntityByPage = Object.assign(this.bank_getToQianbaoHuiqianEntityByPage,JSON.parse(sessionStorage.getItem('QBLIST')))
        this.pagination = {
          page: this.bank_getToQianbaoHuiqianEntityByPage.page, //第几页
          total: this.bank_getToQianbaoHuiqianEntityByPage.totalCount, //共有条数
          limit: this.bank_getToQianbaoHuiqianEntityByPage.limit, //每页条数
        }
      }
    }
    this.$post
      .postData(
        "selTableYear",
        JSON.stringify({
          function: "selTableYear"
        }),
        this.$businessCode.qbgl
      )
      .then(res => {
        if (res && res.success) {
          this.yearList = res.data;
        }})
    this.initData();
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
.is10{
  margin: 20px 0 !important;
}
.btn-writeEnDspc {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.btn-writeEnDspc:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
.mt20 {
  padding: 10px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
// .arrowup {
//   padding-left: 20px;
//   margin-bottom: 20px;
// }
.mtdown {
  padding: 20px 0 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}
</style>
