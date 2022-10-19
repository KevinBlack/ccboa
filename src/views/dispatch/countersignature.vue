<template>
  <el-tabs v-model="activeName" @tab-click="handleTabsClick" v-cloak>
    <el-tab-pane label="全部" name="tabs-all">
      <optionalfield></optionalfield>
    </el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
    <el-row>
      <el-col v-if="isAll">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
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
            <el-col :span="10">
              <el-form-item label="接收日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange"
                    v-model="draftTime"
                    value-format="yyyy-MM-dd"
                    style="width: 100% !important;"
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
            <el-col :span="6">
              <el-form-item label="发文字号" prop="documentNo">
                <el-input v-model="ruleForm.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-col v-if="!down" class="arrowup" style="text-align:center;margin-bottom:10px;">
                <el-button type="primary" @click="submitForm">搜索</el-button>
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
      <el-col style="margin:0;">
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          @cellClick="cellClick"
          :pagination="pagination"
          :state="bank_countersignature.state"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
  </el-tabs>
</template>

<script>
import mTable from "components/table/mTable.vue";
import optionalfield from "components/optionalfield/optionalfield.vue";
import dateFormate from "@/util/filters.js";

const finshData = [
  { label: "接收日期", prop: "CREATETIME", align: "center", width: "300px" },
  { label: "发文字号", prop: "DOCUMENTCODE", align: "left", width: "300px" },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"40%" }
];
const otherData = [
  { label: "接收日期", prop: "CREATETIME", align: "center", width: "150px" },
  { label: "发文字号", prop: "DOCUMENTCODE", align: "left", width: "220px" },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"40%" },
  { label: "当前环节", prop: "PCSAVYNM", align: "center", width: "120px" },
  { label: "操作人 ", prop: "AVYEXCTRNM", align: "center", width: "100px" }
];
const allData = [
  { label: "接收日期", prop: "createTime", align: "center", width: "150px" },
  { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
  { label: "标题", prop: "title", align: "left",minwidth:"40%" },
  { label: "当前环节", prop: "currentNode", align: "center", width: "120px" },
  { label: "操作人 ", prop: "currentUser", align: "center", width: "100px" }
];

export default {
  name: "Countersignature",
  components: {
    mTable,
    optionalfield
  },
  data() {
    return {
      bank_countersignature_all: {
        function: "selectSignByPage",
        state: 0,
        page: 1,
        total: 0,
        limit: 20
      },
      bank_countersignature: {
        function: "getWFTask",
        tplbsnid: "D_FWHQ",
        state: 1,
        page: 1,
        totalCount: 0,
        limit: 20
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
        // hostDepartment: "", //主办部门
        title: "", //标题
        createTimeStart: "",
        createTimeEnd: "",
        choseYear: "",
        // name: "",
        // region: "",
        // date1: "",
        // date2: "",
        // delivery: false,
        // type: "", //发文类型
        // resource: "",
        // resource1: "",
        // desc: ""
      },
      draftTime: [],
      yearList: [],
      isAll: false,
      tableLoading: false,
      activeName: sessionStorage.getItem('FWLISTtab')|| "tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      currentTab: "1",
      tableCols: otherData,
      pagination: {
        page: 1,
        total: 10,
        limit: 20
      },
      bank_chosDept: {
        function: '',
        deptName: ''
      },
      curhumanId: ''
    };
  },
  methods: {
    handleLoadData(tabindex="1") {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      switch (tabindex) {
        case "0":
          this.activeName = "tabs-all";
          break;
        case "1":
          this.activeName = "tabs-wait";
          break;
        case "2":
          this.activeName = "tabs-done";
          break;
        case "3":
          this.activeName = "tabs-end";
          break;
      }
      this.bank_countersignature.state = Number(tabindex)
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      if(tabindex==="0") {
      this.$post
        .postData(
          "selectSignByPage",
          JSON.stringify(Object.assign(this.bank_countersignature_all, this.ruleForm)),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.rows&&res.data.rows||[]
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        this.$post.postData("getWFTask", JSON.stringify(this.bank_countersignature), this.$businessCode.ggfawgl).then(res => {
          console.log(res);
          this.tableData = res.data&&res.data.rows||[];
          this.pagination.total = res.data.total;
          this.bank_countersignature.totalCount = res.data&&res.data.total||0;
        })
      }
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange() {
      if (!this.draftTime ||this.draftTime == "null" ||this.draftTime == "undefined") {
        this.ruleForm.createTimeStart = "";
        this.ruleForm.createTimeEnd = "";
        return false;
      }
      this.ruleForm.createTimeStart = this.draftTime[0];
      this.ruleForm.createTimeEnd = this.draftTime[1];
    },
    handleTabsClick(tab, event) {
      this.resetForm();
      sessionStorage.setItem('FWLISTtab',tab.name);
      this.currentTab = tab.index
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.total = 0;
      this.bank_countersignature.state = tab.index;
      this.bank_countersignature.page = 1;
      this.bank_countersignature.totalCount =0;
      if (tab.index == "0") {
        this.tableCols = allData;
        this.isEnd = true;
        this.isAll = true
      } else if (tab.index == "3") {
        this.tableCols = finshData;
        this.isEnd = true;
        this.isAll = false;
      } else {
        this.tableCols = otherData;
        this.isEnd = false;
        this.isAll = false;
      }
      this.handleLoadData(tab.index);
      this.tableLoading = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      if(this.currentTab === '0') {
        this.bank_countersignature_all.page = val
      } else {
        this.bank_countersignature.page = val
      }
      this.pagination.page = val
      this.tableData = []
      this.handleLoadData(this.currentTab)
    },

    handleSizeChange(val) {
      if(this.currentTab === '0') {
        this.bank_countersignature_all.limit = val
        this.pagination.page = this.bank_countersignature_all.page = 1
      } else {
        this.bank_countersignature.limit = val
        this.pagination.page = this.bank_countersignature.page = 1
      }
      this.pagination.limit = val
      this.tableData = []
      this.handleLoadData(this.currentTab)
    },
    cellClick(row, column, cell, event){
      let readType;
      let idType;
      let transPcsAvyId = "";
      if(this.bank_countersignature.state == 0){
        readType = row.readFlag ? row.readFlag : '';
        idType = row.id ? row.id : '';
        transPcsAvyId = row.pcsAvyId
      }else{
        readType = row.READFLAG ? row.READFLAG : '';
        idType = row.ID ? row.ID : '';
        transPcsAvyId = row.PCSAVYID
      }
      if(this.currentTab == '0' || this.currentTab == '1') {
        // this.$post
        // .postData(
        //   "initCurUserDeptInfo",
        //   JSON.stringify({
        //     function: "initCurUserDeptInfo",
        //     pcsAvyId: transPcsAvyId
        //   }),
        //   this.$businessCode.ggfawgl
        // )
        // .then(res => {
          if(this.currentTab == '0') {
            if (row.isFlowEnd == 1) {
              this.handleOpenPage('/countersignendDone', row.id, readType)
            } else if (row.isFlowEnd == 0) {
              this.handleOpenPage('/countersignend', row.id, readType, "bd")
            } else if (row.isFlowEnd == 2) {
              this.handleOpenPage('/countersignendFinishRed', row.id, readType)
            }
          } else if (this.currentTab == '1') {
            this.handleOpenPage('/countersignend', row.ID, readType, "bd")
          }
        // })
      } else if (this.currentTab == '2') {
        this.handleOpenPage('/countersignendDone', row.ID, readType)
      } else if (this.currentTab == '3') {
        this.handleOpenPage('/countersignendFinishRed', row.ID, readType)
      }
    },
    handleOpenPage (path, id, readType, flag) {
      if (flag=="bd") {
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

    submitForm(formName) {
      this.handleLoadData("0")
    },
    resetForm(formName) {
      this.draftTime = [];
			this.ruleForm = {
        createTimeStart: "",
        createTimeEnd: "",
        title: "",
        documentNo: "",
        choseYear: ""
      };
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.defaultYear();
      this.tableData = [];
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
    }
  },
  created() {
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
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||''
    this.curhumanId = userInfo.humanId
    this.handleLoadData();
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
  padding: 20px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
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
/deep/ .el-tabs__header {
  margin: 0 0 7px !important;
}
.mtJ20 {
  margin-top: -20px!important;
  .mt20end {
    margin-top: 20px;
    .sysTirp {
      margin-left: 20px;
      font-size: 12px;
      color: red;
    }
  }
}
</style>
