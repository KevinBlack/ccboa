<template>
  <!-- 签报协办列表 -->
  <el-tabs v-model="activeName" @tab-click="handleTabsClick" v-cloak>
    <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
    <el-tab-pane label="未阅" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已阅" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
    <el-row>
      <!-- <el-col v-if="bank_countersignature.state == 0">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
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
                    style="width:300px"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发文字号" prop="documentNo">
                <el-input v-model="ruleForm.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="info" size="small" @click="arrow()">
                  <i class="el-icon-arrow-down el-icon--left"></i> 展开
                </el-button>
              </el-col>
            </el-col>
          </el-row>
          <div v-if="down">
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
          </el-col>
        </el-form>
      </el-col>-->

      <el-col>
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :state="(parseInt(bank_countersignature.state)+1)"
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
import viewDraft from "@/minixs/viewDraft";
// import optionalfield from "components/optionalfield/optionalfield.vue";
// const finshData = [
//   { label: "创建日期", prop: "TMS", align: "center" },
//   { label: "文号", prop: "DOCUMENTCODE", align: "center" },
//   { label: "标题", prop: "TITLE", align: "center" }
// ];
const otherData = [
  { label: "传阅日期", prop: "createTime", align: "center", width:"180"},
  {
    label: "文号",
    prop: "qianbaoCode",
    align: "left",
    width:"210",
    formatter: (row, column) => {
      return row.qianbaoCode + row.documentNo;
    }
  },
  { label: "标题", prop: "title", align: "left" },
  { label: "主办部门", prop: "draftDepartmentName", align: "center"  ,width:"180"},
  { label: "传阅类型", prop: "orderType", align: "center"  ,width:"100" }

  // { label: "发送人", prop: "AVYEXCTRNM", align: "center" }
];
// const allData = [
//   { label: "传阅日期", prop: "TMS", align: "center" },
//   { label: "文号", prop: "DOCUMENTCODE", align: "center" },
//   { label: "标题", prop: "TITLE", align: "center" },
//   { label: "主办部门", prop: "PCSAVYNM", align: "center" },
//   { label: "发送人", prop: "AVYEXCTRNM", align: "center" }
// ];
export default {
  name: "DispatchFile",
  components: {
    mTable
    // optionalfield
  },
  mixins: [viewDraft],
  data() {
    return {
      // getXiebanTableOrderAll: {
      //   function: "getXiebanTableOrderAll",
      //   state: 0, //全部0 待办1  已办2  办结3
      //   page: 1, //当前页数
      //   limit: 10 //每页条数
      //   // tplbsnid: "QB_XB"
      //   // tplbsnid: "KHQB_XB",
      // },
      bank_countersignature: {
        function: "getCirculateAll",
        state: 0, //state    1  已阅   0 是未阅     2办结   3 全部
        page: 1, //当前页数
        limit: 20 //每页条数
        // tplbsnid: "QB_XB",
        // QB_DZQB  电子签报,QB_SWQB  实物签报 ,QB_KHQBQS 跨行签报请示,KHQB_SP  跨行签报审批 ,QB_HQ  会签 ,QB_XB 协办
        // tplbsnid: "KHQB_XB",
        // DZQB电子签报,DZQB_HQ电子签报会签, SWQB 实物签报,KHQBQS 跨行签报请示,KHQB_SP 跨行签报审批,KHQB_XB 跨行签报协办,KHQB_HQ 跨行签报会签
        // totalCount: 0
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
      ruleForm: {},
      tableLoading: false,
      activeName:sessionStorage.getItem('QBLISTtab')|| "tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],

      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      //已读未读
      readType: false,
      idType: "",
      readFlag: false,
      initCYCurUserDeptInfo: {
        function: "initCYCurUserDeptInfo",
        currentUserId: ""
      }
    };
  },
  methods: {
    // 页面初始化加载数据
    initData(tabindex) {
      sessionStorage.setItem('QBLIST',JSON.stringify(this.bank_countersignature));
      this.$post
        .postData(
          "getCirculateAll",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.qbgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange(events) {
      console.log(this.ruleForm.endTime);
    },
    //点击    1  已阅   0 是未阅     2办结   3 全部
    handleTabsClick(tab, event) {
      sessionStorage.setItem('QBLISTtab',tab.name);
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.total = 0;
      // this.bank_countersignature.state = tab.index;
      if(tab.index == '0'){  //全部
        this.bank_countersignature.state = '3'
      }else if(tab.index == '1'){  //未阅
        this.bank_countersignature.state = '0'
      }else if(tab.index == '2'){  //已阅 
        this.bank_countersignature.state = '1'
      }else if(tab.index == '3'){   //办结
        this.bank_countersignature.state = '2'
      } 
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      // this.bank_countersignature.totalCount = 0;
      // if (tab.index == "0") {
      //   this.tableCols = allData;
      // } else if (tab.index == "1") {
      //   this.tableCols = otherData;
      // } else if (tab.index == "3") {
      //   this.tableCols = finshData;
      // } else {
      //   this.tableCols = otherData;
      // }

      this.tableCols = otherData;
      this.initData();
      this.tableLoading = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      // if (this.bank_countersignature.state == "0") {
      //   this.getXiebanTableOrderAll.page = val;
      // } else {
      //   this.bank_countersignature.page = val;
      // }
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      // if (this.bank_countersignature.state == "0") {
      //   this.getXiebanTableOrderAll.limit = val;
      //   this.pagination.limit = val;
      //   this.pagination.page = this.getXiebanTableOrderAll.page = 1;
      // } else {
      //   this.bank_countersignature.limit = val;
      //   this.pagination.limit = val;
      //   this.pagination.page = this.bank_countersignature.page = 1;
      // }

      this.bank_countersignature.limit = val;
      this.pagination.limit = val;
      this.pagination.page = this.bank_countersignature.page = 1;

      this.tableData = [];
      this.initData();
    },

    handleOpenPage(path, id, mainDocId, multiTenancyId, readFlag,orderStatus) {
      if(this.bank_countersignature.state == 0 || this.bank_countersignature.state == '3'){
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
          mainDocId: mainDocId,
          multiTenancyId: multiTenancyId,
          state: this.bank_countersignature.state,
          readFlag: readFlag
        }
      });
      window.open(routeData.href, "_blank");
    },

    cellClick(row, column, cell, event) {
      this.initCYCurUserDeptInfo.currentUserId = row.currentUserId;
      this.$post
        .postData(
          "initCYCurUserDeptInfo",
          JSON.stringify(this.initCYCurUserDeptInfo),
          this.$businessCode.qbgl
        )
        .then(res => {
          if (row.orderType == "非跨行") {
            this.handleOpenPage(
              "/circularizeStateWaitFkh",
              row.id,
              row.mainDocId,
              row.multiTenancyId,
              this.bank_countersignature.state,
              row.readFlag
            );
          } else if (row.orderType == "跨行请示") {
            this.handleOpenPage(
              "/circularizeStateWaitQsh",
              row.id,
              row.mainDocId,
              row.multiTenancyId,
              this.bank_countersignature.state,
              row.readFlag
            );
          } else if (row.orderType == "跨行审批") {
            this.handleOpenPage(
              "/circularizeStateWaitSph",
              row.id,
              row.mainDocId,
              row.multiTenancyId,
              this.bank_countersignature.state,
              row.readFlag
            );
          }
          //  else {
          //   this.$message({
          //     type: "error",
          //     offset: 400,
          //     showClose: true,
          //     message: "跳转页面失败",
          //     duration: 1000
          //   });
          //   return;
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(formName) {},
    resetForm(formName) {}
  },
  created() {
    if(sessionStorage.getItem('QBLIST')){
      // if(sessionStorage.getItem('QBLIST').state == 0){
      //   this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('QBLIST')))
      // }
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('QBLIST')))
      this.pagination = {
        page: this.bank_countersignature.page, //第几页
        total: this.bank_countersignature.totalCount, //共有条数
        limit: this.bank_countersignature.limit, //每页条数
      }
    }
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
