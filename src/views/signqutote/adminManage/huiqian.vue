<template>
  <!-- 签报会签列表 -->
  <!-- <el-tabs v-model="activeName" @tab-click="handleTabsClick">
    <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
  <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>-->
  <el-row  v-cloak>
    <el-col>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm mt20"
        :class="{mtdown:down}"
      >
        <el-row>
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
            <el-form-item label="创建日期">
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
                  style="width:300px"
                ></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标题" prop="title">
              <el-input v-model="getHuiqianTableOrderAll.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签报字号" prop="documentNo">
              <el-input v-model="getHuiqianTableOrderAll.documentNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流程状态">
              <el-select v-model="getHuiqianTableOrderAll.curNodeCode">
                <el-option value="-1" label="流转中"></el-option>
                <el-option value="800" label="已办结"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构名称" prop="unitName">
              <div class="dispatchcswhlshwh">
                <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                  <el-input
                    type="text"
                    readonly="readonly"
                    placeholder="请选择"
                    v-model="unitName"
                    suffix-icon="el-icon-arrow-down"
                    width="100%"
                  />
                </select-org-or-dept>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: center;">
            <el-button type="primary" @click="initData('str')">搜索</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
            <el-button type="danger" style="float:right;" @click="sureDelete">删除</el-button>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col style="text-align: center;margin-bottom: 20px;" :span="24">
            <el-button type="primary" @click="initData('str')">搜索</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
          </el-col>
        </el-row> -->
      </el-form>
    </el-col>
    <!-- <el-col :span="24" style="text-align: right;margin-top: 8px;">
      <el-button type="primary" size="small" @click="sureDelete">批量删除</el-button>
    </el-col> -->
    <el-col style="margin: 8px 0;">
      <m-table
        size="medium"
        :isSelection="true"
        :isIndex="true"
        :isPagination="true"
        :isHandle="false"
        :state="bank_getToQianbaoHuiqianEntityByPage.state"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        @handleSelectionChange="handleSelectionChange"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isIndexPage="true"
        @cellClick="cellClick"
        v-loading="tableLoading"
        :default-sort="sortDate"
      ></m-table>
    </el-col>

    <el-dialog v-dialogDrag title="删除确认" :visible.sync="deleteFlag" width="60%">
      <p class="xuanzTh">是否确认删除?</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleBatchDelete">确 认</el-button>
        <el-button @click="deleteFlag = false">取 消</el-button>
      </span>
    </el-dialog>
    
  </el-row>
  <!-- </el-tabs> -->
</template>

<script>
import mTable from "components/table/mTable.vue";
// import optionalfield from "components/optionalfield/optionalfield.vue";
import dateFormate from "@/util/filters.js";
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const finshData = [
  { label: "创建日期", prop: "CREATETIME", align: "center" ,width:"250"},
  { label: "文号", prop: "DOCUMENTCODE", align: "center" },
  { label: "标题", prop: "TITLE", align: "center"}
];
const otherData = [
  { label: "创建日期", prop: "CREATETIME", align: "center" },
  { label: "文号", prop: "DOCUMENTCODE", align: "center" ,width:"250"},
  { label: "标题", prop: "TITLE", align: "center" ,width:"280"},
  { label: "当前环节", prop: "PCSAVYNM", align: "center" },
  { label: "当前处理人", prop: "AVYEXCTRNM", align: "center"  ,width:"90"},
  { label: "会签类型", prop: "QIANBAOTYPENAME", align: "center" },
  { label: "会签种类", prop: "ORDERTYPE", align: "center" }
];
const allData = [
  { label: "创建日期", prop: "draftTime", align: "center" },
  { label: "文号", prop: "documentNo", align: "center" ,width:"250"},
  { label: "标题", prop: "title", align: "center" ,width:"280"},
  { label: "当前环节", prop: "curNodeName", align: "center" },
  { label: "当前处理人", prop: "currentUser", align: "center"  ,width:"90"},
  { label: "会签类型", prop: "qianBaoTypeName", align: "center" },
  // { label: "办理状态", prop: "orderStatus", align: "center" },
  { label: "会签种类", prop: "orderType", align: "center" }
];
const year = new Date().getFullYear();
export default {
  name: "DispatchFile",
  components: {
    mTable,
    searchForm,
    selectOrgOrDept
    // optionalfield
  },
  data() {
    return {
      isGly:false,
      deleteFlag:false,
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "U130000",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份

      getHuiqianTableOrderAll: {
        function: "findAllHuiqianList",
        state: 0, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 20, //每页条数
        // tplbsnid: "QB_HQ"
        tplbsnid: "DZQB_HQ,KHQB_HQ",
        createTime: "",
        endTime: "",
        documentNo: "〔"+year+"〕",
        title: "",
        curNodeCode: ""
      },
      bank_getToQianbaoHuiqianEntityByPage: {
        function: "getWFTaskQB",
        state: 0, //全部0 待办1  已办2  办结3
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
        documentNo:  "", //发文字号
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
      activeName: "tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: allData,
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },

      //已读未读
      readType: false,
      idType: ""
    };
  },
  methods: {
     handleSelectionChange(val) {
      this.checkedArr = val;
      const idsArr = [];
      for (var i = 0; i < val.length; i++) {
        idsArr.push({
          'orderType': val[i].orderType,
          'id': val[i].id,
        })
      }
      this.deleteIds = idsArr;
      console.log( this.deleteIds ,idsArr)
    },
    sureDelete(){
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择一条数据进行删除！"
        });
        return;
      }
      this.deleteFlag = true;
    },
    // 批量删除
    handleBatchDelete() {
      
      this.$post
        .postData(
          "doSysDeleteTable",
          JSON.stringify({
            function: "doSysDeleteTable",
            deleteArr: this.deleteIds,
            unitId: this.unitId
          }),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (res && res.success) {
            this.$message({
              type: "success",
              showClose: true,
              offset: 400,
              message: "删除成功",
              duration: 1000
            });
          } else {
            this.$message({
              type: "error",
              offset: 400,
              showClose: true,
              message: "删除失败",
              duration: 1000
            });
          }
          this.initData();
        })
        .catch(erro => {
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "删除失败",
            duration: 1000
          });
        });
        this.deleteFlag = false;
    },
     // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
      console.log(org, this.unitName , this.unitId);
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
      if (this.ruleForm.endTime) {
        this.getHuiqianTableOrderAll.createTime = dateFormate.date(
          Date.parse(this.ruleForm.endTime[0])
        );
        this.getHuiqianTableOrderAll.endTime = dateFormate.date(
          Date.parse(this.ruleForm.endTime[1])
        );
      } else {
        this.getHuiqianTableOrderAll.createTime = "";
        this.getHuiqianTableOrderAll.endTime = "";
      }
    },
    // 页面初始化加载数据
    initData(str) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      sessionStorage.setItem('QBLIST',JSON.stringify(this.getHuiqianTableOrderAll));
      if (str) {
        this.getHuiqianTableOrderAll.state = 0; //全部0 待办1  已办2  办结3
        this.getHuiqianTableOrderAll.page = 1; //当前页数
        // this.getHuiqianTableOrderAll.limit = 10; //每页条数
        this.pagination.page = 1;
      }
      this.getHuiqianTableOrderAll.unitName = this.unitName
      this.getHuiqianTableOrderAll.unitId = this.unitId
      this.$post
        .postData(
          "findAllHuiqianList",
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
      // if (this.bank_getToQianbaoHuiqianEntityByPage.state == "0") {
      //   this.$post
      //     .postData(
      //       "findAllHuiqianList",
      //       JSON.stringify(this.getHuiqianTableOrderAll),
      //       this.$businessCode.qbgl
      //     )
      //     .then(res => {
      //       this.tableData = res.data.rows;

      //       this.pagination.total = res.data.total;
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // } else {
      //   this.$post
      //     .postData(
      //       "getWFTaskQB",
      //       JSON.stringify(this.bank_getToQianbaoHuiqianEntityByPage),
      //       this.$businessCode.qbgl
      //     )
      //     .then(res => {
      //       this.tableData = res.data.rows;
      //       this.pagination.total = res.data.total;
      //       this.bank_getToQianbaoHuiqianEntityByPage.totalCount =
      //         res.data.total;
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // }
    },
    arrow() {
      this.down = !this.down;
    },
    //点击 全部0 待办1  已办2  办结3
    handleTabsClick(tab, event) {
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.total = 0;
      this.getHuiqianTableOrderAll.state = 0;
      // this.bank_getToQianbaoHuiqianEntityByPage.state = tab.index;
      // this.bank_getToQianbaoHuiqianEntityByPage.page = 1;
      this.pagination.page = 1;
      // this.bank_getToQianbaoHuiqianEntityByPage.totalCount = 0;
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

      // this.bank_getToQianbaoHuiqianEntityByPage.state = tab.index;
      this.initData(tab.index);
      this.tableLoading = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      // if (this.bank_getToQianbaoHuiqianEntityByPage.state == "0") {
      //   this.getHuiqianTableOrderAll.page = val;
      // } else {
      //   this.bank_getToQianbaoHuiqianEntityByPage.page = val;
      // }
      this.getHuiqianTableOrderAll.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      // if (this.bank_getToQianbaoHuiqianEntityByPage.state == "0") {
      //   this.getHuiqianTableOrderAll.limit = val;
      //   this.pagination.limit = val;
      //   this.pagination.page = this.getHuiqianTableOrderAll.page = 1;
      // } else {
      //   this.bank_getToQianbaoHuiqianEntityByPage.limit = val;
      //   this.pagination.limit = val;
      //   this.pagination.page = this.bank_getToQianbaoHuiqianEntityByPage.page = 1;
      // }
      this.getHuiqianTableOrderAll.limit = val;
      this.pagination.limit = val;
      this.pagination.page = this.getHuiqianTableOrderAll.page = 1;
      this.tableData = [];
      this.initData();
    },

    handleOpenPage(path, id, readType,orderType) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          readFlag: readType,
          orderType:orderType,
          unitId: this.unitId,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },

    cellClick(row, column, cell, event) {
      // if(this.bank_getToQianbaoHuiqianEntityByPage.state == "0"){
      //   this.readType = row.readFlag ? row.readFlag : 0;
      //   this.idType = row.id ? row.id : "";

      // }else{
      //   this.readType = row.READFLAG ? row.READFLAG : 0;
      //   this.idType = row.ID ? row.ID : "";
      // }

      this.readType = row.readFlag ? row.readFlag : 0;
      this.idType = row.id ? row.id : "";

      if (row.orderType == "跨行单会签") {
        this.handleOpenPage(
          "/huiqianKhFinishDispatchCopy",
          this.idType,
          this.readType,
          row.orderType
        );
      } else if (row.orderType == "本行单会签") {
        this.handleOpenPage(
          "/huiqianFkhFinishDispatchCopy",
          this.idType,
          this.readType,
          row.orderType
        );
      }
      // if (!row.orderType || !row.orderStatus) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "跳转页面失败",
      //     duration: 1000
      //   });
      //   return;
      // }

      // if(this.bank_getToQianbaoHuiqianEntityByPage.state == "0"){
      //   // if(row.orderType == "跨行单会签" && row.orderStatus == "待办"){
      //   //     this.handleOpenPage("/huiQianKhWaitDispatch", this.idType ,this.readType);
      //   // }else if(row.orderType == "跨行单会签" && row.orderStatus == "已办"){
      //   //     this.handleOpenPage("/huiqianKhFinishDispatch", this.idType ,this.readType);
      //   // }else if(row.orderType == "跨行单会签" && row.orderStatus == "办结"){
      //   //     this.handleOpenPage("/huiqianKhOverDispatch", this.idType ,this.readType);
      //   // }else if(row.orderType == "本行单会签" && row.orderStatus == "待办"){
      //   //     this.handleOpenPage("/huiQianFkhWaitDispatch", this.idType ,this.readType);
      //   // }else if(row.orderType == "本行单会签" && row.orderStatus == "已办"){
      //   //     this.handleOpenPage("/huiqianFkhFinishDispatch", this.idType ,this.readType);
      //   // }else if(row.orderType == "本行单会签" && row.orderStatus == "办结"){
      //   //     this.handleOpenPage("/huiqianFkhOverDispatch", this.idType ,this.readType);
      //   // }
      //   if(row.orderType == "跨行单会签"){
      //       this.handleOpenPage("/huiqianKhFinishDispatchCopy", this.idType ,this.readType);
      //   }else if(row.orderType == "本行单会签"){
      //       this.handleOpenPage("/huiqianFkhFinishDispatchCopy", this.idType ,this.readType);
      //   }
      //   if (!row.orderType || !row.orderStatus) {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "跳转页面失败",
      //       duration: 1000
      //     });
      //     return;
      //   }
      // }
      // if (this.bank_getToQianbaoHuiqianEntityByPage.state == "1") {
      //   if(row.ORDERTYPE == "跨行单会签"){
      //      this.handleOpenPage("/huiQianKhWaitDispatch",  this.idType ,this.readType);
      //   }
      //   if(row.ORDERTYPE == "本行单会签"){
      //       this.handleOpenPage("/huiQianFkhWaitDispatch",  this.idType ,this.readType);
      //   }
      //   if (!row.ORDERTYP) {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "跳转页面失败",
      //       duration: 1000
      //     });
      //     return;
      //   }
      // }
      // if (this.bank_getToQianbaoHuiqianEntityByPage.state == "2") {
      //   if(row.ORDERTYPE == "跨行单会签"){
      //      this.handleOpenPage("/huiqianKhFinishDispatch",  this.idType ,this.readType);
      //   }
      //   if(row.ORDERTYPE == "本行单会签"){
      //       this.handleOpenPage("/huiqianFkhFinishDispatch",  this.idType ,this.readType);
      //   }
      //   if (!row.ORDERTYP) {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "跳转页面失败",
      //       duration: 1000
      //     });
      //     return;
      //   }
      // }
      // if (this.bank_getToQianbaoHuiqianEntityByPage.state == "3") {
      //   if(row.ORDERTYPE == "跨行单会签"){
      //      this.handleOpenPage("/huiqianKhOverDispatch",  this.idType ,this.readType);
      //   }
      //   if(row.ORDERTYPE == "本行单会签"){
      //       this.handleOpenPage("/huiqianFkhOverDispatch",  this.idType ,this.readType);
      //   }
      //   if (!row.ORDERTYP) {
      //     this.$message({
      //       type: "error",
      //       offset: 400,
      //       showClose: true,
      //       message: "跳转页面失败",
      //       duration: 1000
      //     });
      //     return;
      //   }
      // }
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
    // submitForm() {
    //   this.getHuiqianTableOrderAll.title = this.ruleForm.title;
    //   this.getHuiqianTableOrderAll.documentNo = this.ruleForm.documentNo;
    //   this.initData();
    // },
    resetForm() {
      
      this.ruleForm = {
        documentNo:  "", //发文字号
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
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      // this.ruleForm.documentNo = '';
      // this.ruleForm.title = '';
      this.ruleForm.endTime = "";
      this.getHuiqianTableOrderAll.title = "";
      this.getHuiqianTableOrderAll.documentNo =  "〔"+year+"〕";
      this.getHuiqianTableOrderAll.createTime = "";
      this.getHuiqianTableOrderAll.endTime = "";
      this.getHuiqianTableOrderAll.curNodeCode = "";
      this.$api.setting.organization
      .getTree({
        unitClass:1,
        unitCode: "1",
      })
      .then((res) => {
        this.unitName = res.data[0].unitName||'';
        this.unitId = res.data[0].unitCode||'';
        // this.initData();
      })
      this.defaultYear()
      this.tableData = [];
      // this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
      // this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId
      // this.initData();
    },
    selectYear(val) {
      this.ruleForm.choseYear = val;
      if (val=="") {
        this.defaultYear();
      } else {
        this.getHuiqianTableOrderAll.documentNo = '〔'+ val +'〕'
      }
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.getHuiqianTableOrderAll.documentNo = '〔'+ openTimeYear +'〕'
    }
  },
  created() {
    this.$router.push({
        query: {
          choseYear: ''
        }
      })
    if(sessionStorage.getItem('QBLIST')){
      this.getHuiqianTableOrderAll = Object.assign(this.getHuiqianTableOrderAll,JSON.parse(sessionStorage.getItem('QBLIST')))
    }
    this.pagination = {
      page: this.getHuiqianTableOrderAll.page, //第几页
      total: this.getHuiqianTableOrderAll.totalCount, //共有条数
      limit: this.getHuiqianTableOrderAll.limit, //每页条数
    }
    this.isGly = isGlyId();
    // this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
    // this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId
    // this.initData();
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
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf:"1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.initData();
    })
  }
};
</script>

<style lang="less" scoped>
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
  padding: 10px 20px 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.arrowup {
  padding-left: 20px;
}
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
/deep/ .el-row {
    box-sizing: border-box;
    display: flex;
    flex-flow: wrap;
}
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
.is10{
  margin: 20px 0 !important;
}
.mt20 {
    margin-top: 10px;
}
/deep/ .bank_dispach_content>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 10px !important;
}
</style>
