<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <!-- <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="未阅" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="已阅" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs-end"></el-tab-pane> -->
      <el-tab-pane label="全部" name="tabs-all">
      </el-tab-pane>
      <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
      <el-row class="mtJ20">
        <el-col v-if="bank_countersignature.state==0">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm mt20 transition_wrap"
            :class="{mtdown:down}"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="文号年份" prop="choseYear">
                  <el-select
                    v-model="bank_countersignature.choseYear"
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
                <el-form-item label="收文日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange"
                      v-model="ruleForm.searchTime"
                      type="daterange"
                      align="left"
                      unlink-panels
                      :clearable="false"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="bank_countersignature.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收文字号" prop="documentCode">
                  <el-input v-model="bank_countersignature.documentCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-col v-if="!down" class="arrowup">
                  <el-button type="primary" @click="search">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-col>
              </el-col>
            </el-row>
            <div v-if="down" class="clearfix">
              <el-row>
                <el-col>
                  <el-row class="center">
                    <el-button type="primary" @click="initData">搜索</el-button>
                    <el-button type="primary" @click="resetForm">重置</el-button>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="down">
                  <el-button type="info" size="small" @click="arrow()">
                    <i class="el-icon-arrow-up el-icon--left"></i> 收起
                  </el-button>
                </el-col>
              </el-row>

            </div>
          </el-form>
        </el-col>
        <!-- <el-col class="mt20end">     -->
        <el-col style="margin: 20px 0;">
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            :state="bank_countersignature.state"
            @cellClick="cellClick"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            v-loading="tableLoading"
            :default-sort="sortDate"

          ></m-table>
        </el-col>
      </el-row>
    </el-tabs>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";

const finshData = [
  {label: "收文日期", prop: "RECEIVETIME", align: "center", width: '145'},
  {label: "收文字号", prop: "DOCUMENTCODE", align: "center", width: '200'},
  {label: "是否督办", prop: "ISSUPERVISE", align: "center", width: '70'},
  {label: "标题", prop: "TITLE", align: "left", minwidth: '150'},
  {label: "当前环节", prop: "PCSAVYNM", align: "center", width: '120'},
  {label: "当前处理人", prop: "AVYEXCTRNM", align: "center", width: '80'}
];
const banjiehData = [
  {label: "收文日期", prop: "RECEIVETIME", align: "center", width: '150'},
  {label: "收文字号", prop: "DOCUMENTCODE", align: "center", width: '200'},
  {label: "是否督办", prop: "ISSUPERVISE", align: "center", width: '80'},
  {label: "标题", prop: "TITLE", align: "left", minwidth: '150'},
  /*{ label: "当前环节", prop: "CURNODENAME", align: "center" },*/
];
const firstData = [
  {label: "收文日期", prop: "receiveTime", align: "center", width: '145'},
  {label: "收文字号", prop: "documentCode", align: "center", width: '200'},
  {
    label: "是否督办", prop: "isSupervise", align: "center", width: '70',
    formatter(row) {
      return row.isSupervise = !row.isSupervise || row.isSupervise == 0 ? "否" : "是";
    }
  },
  {label: "标题", prop: "title", align: "left", minwidth: '150'},
  {label: "当前环节", prop: "curNodeName", align: "center", width: '120'},
  {label: "当前处理人", prop: "curUser", align: "center", width: '80'}
];
export default {
  name: "ReceiveFile",
  components: {
    mTable
  },
  data() {
    return {
      fwTranId: this.$businessCode.swgl,
      yearList:[],
      bank_countersignature: {
        choseYear:"",
        function: "selectByPageCB",
        tplbsnid: 'SWSW_CB',
        state: 1,
        title: '',
        documentCode: '〔〕',
        startTime: '',
        receive_type: '',
        endTime: '',
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0
      },
      searchParams: {
        receive_type: '全部'
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
        receive_type: '全部',
        documentCode: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        statrTime: "",
        endTime: "",
        searchTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        desc: ""
      },
      tableLoading: false,
      activeName: sessionStorage.getItem('tab_sw') || "tabs-wait",
      sortDate: [{prot: "date", order: "descnding"}],
      isEnd: true,
      tableData: [],
      tableCols: finshData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      }
    };
  },
  created() {
    this.$post
        .postData(
          "selTableYear",
          JSON.stringify({ function: "selTableYear" }),
          this.$businessCode.swgl
        ).then(res => {
          if(res){
            this.yearList = res.data
          }
      })
    if (sessionStorage.getItem('page_sw')) {
      this.bank_countersignature = Object.assign(this.bank_countersignature, JSON.parse(sessionStorage.getItem('page_sw')));
      if (this.bank_countersignature.startTime && this.bank_countersignature.endTime) {
        this.ruleForm.searchTime = [this.bank_countersignature.startTime, this.bank_countersignature.endTime]
      }
      this.pagination = {
        page: this.bank_countersignature.page, //第几页
        total: this.bank_countersignature.totalCount, //共有条数
        limit: this.bank_countersignature.limit, //每页条数
      }
    }
    ;
    if (sessionStorage.getItem('tab_sw')) {
      this.activeName = sessionStorage.getItem('tab_sw');
      if (this.activeName == "tabs-wait") {
        this.isEnd = true;
      } else {
        this.isEnd = false;
      }
      if (this.activeName == "tabs-all") {
        this.tableCols = firstData
      } else if (this.activeName == 'tabs-end') {
        this.tableCols = banjiehData
      } else {
        this.tableCols = finshData
      }
    }
    ;
    this.initData();
  },
  methods: {
    routeYear(){
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
    },
    selectYear(val) {
      this.bank_countersignature.choseYear = val;
      // this.$router.push({
      //   query: {
      //     choseYear: val
      //   }
      // }) 
    },
    search() {
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      this.initData();
    },
    initData() {
       this.$router.push({
        query: {
          choseYear: this.bank_countersignature.choseYear
        }
      })
      sessionStorage.setItem('page_sw', JSON.stringify(this.bank_countersignature));
      if (this.searchParams.receive_type === "全部") {
        this.bank_countersignature.receive_type = "";
      } else {
        this.bank_countersignature.receive_type = this.searchParams.receive_type;
      }

      if (this.bank_countersignature.state == "0") {
        Object.assign(this.bank_countersignature, {function: "selectByPageCB"})
        this.$post
          .postData(
            "selectByPageCB",
            JSON.stringify(this.bank_countersignature),
            this.$businessCode.swgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
            this.tableData.forEach(item => {
              item.isSupervise = !item.isSupervise || item.isSupervise == 0 ? "否" : "是";
              if (item.receiveTime) {
                item.receiveTime = dateFormate.date(Date.parse(item.receiveTime));
              }
            })

          })
          .catch(err => {
            console.log(err);
          });

      } else {
        Object.assign(this.bank_countersignature, {function: "getWFTask"})
        this.$post
          .postData(
            "getWFTask",
            JSON.stringify(this.bank_countersignature),
            this.$businessCode.swglgg
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
            this.tableData.forEach(item => {
              item.ISSUPERVISE = !item.ISSUPERVISE || item.ISSUPERVISE == 0 ? "否" : "是";
              if (item.RECEIVETIME) {
                item.RECEIVETIME = dateFormate.date(Date.parse(item.RECEIVETIME));
              }
            })

          })
          .catch(err => {
            console.log(err);
          });
      }

    },
    arrow() {
      this.down = !this.down;
    },
    timeChange() {
      if (this.ruleForm.searchTime[0]) {
        this.bank_countersignature.startTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[0]));
        this.bank_countersignature.endTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
      }

    },
    handleTabsClick(tab, event) {
      this.tableData = [];
      this.bank_countersignature.totalCount = 0;
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      if (tab.index == "1") {
        this.isEnd = true;
      } else {
        this.isEnd = false;
      }
      if (tab.index == "0") {
        this.tableCols = firstData
      } else if (tab.index == '3') {
        this.tableCols = banjiehData
      } else {
        this.tableCols = finshData
      }
      this.bank_countersignature.state = tab.index;
      sessionStorage.setItem('tab_sw', tab.name);
      this.initData();
      if(tab.index != 0){
        this.bank_countersignature.choseYear = "";
        this.routeYear()
      }
    },

    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      this.bank_countersignature.limit = this.pagination.limit = val;
      this.pagination.page = this.bank_countersignature.page = 1;
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      // console.log(row.id);
      // this.$router.push({
      //   path: "/receiveDispatch",
      //   query: {
      //     id: row.id
      //   }
      // });
      let readType;
      let idType;
      let pcsAvyId;
      if (this.bank_countersignature.state == 0) {
        readType = row.readFlag ? row.readFlag : '';
        idType = row.id ? row.id : '';
        pcsAvyId = row.pcsAvyId ? row.pcsAvyId : '';
      } else {
        readType = row.READFLAG ? row.READFLAG : '';
        idType = row.ID ? row.ID : '';
        pcsAvyId = row.PCSAVYID ? row.PCSAVYID : '';
      }

      this.$post
        .postData(
          "initCurUserDeptInfo",
          JSON.stringify({
            function: "initCurUserDeptInfo",
            pcsAvyId: pcsAvyId
          }),
          this.$businessCode.swglgg
        )
        .then(res => {
          if (this.bank_countersignature.state == 2 || this.bank_countersignature.state == 3) {
            const routeData = this.$router.resolve({
              path: "/shiwucbDetailReadonly",
              query: {
                id: idType,
                readFlag: readType,
                receiveType: row.receiveType,
                state:this.bank_countersignature.state,
                choseYear: this.$route.query.choseYear
              }
            });
            window.open(routeData.href, "_blank");
          } else if (this.bank_countersignature.state == 0 || this.bank_countersignature.state == 1) {
            if (this.bank_countersignature.state == 0) {
              if (row.status == '已办') {
                const routeData = this.$router.resolve({
                  path: "/shiwucbDetailReadonly",
                  query: {
                    receiveType: row.receiveType,
                    id: idType,
                    readFlag: readType,
                    choseYear: this.$route.query.choseYear
                  }
                });
                window.open(routeData.href, "_blank");

              } else {
                const routeData = this.$router.resolve({
                  path: "/shiwucbDetail",
                  query: {
                    receiveType: row.receiveType,
                    id: idType,
                    readFlag: readType,
                    choseYear: this.$route.query.choseYear
                  }
                });
                let routeId = (localStorage.getItem('routeIdList') && JSON.parse(localStorage.getItem('routeIdList'))) || [];
                if (routeId.includes(idType)) {
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "已经打开了该页面!",
                    duration: 1500,
                  })
                  return;
                }
                window.open(routeData.href, "_blank");
              }
            } else {
              const routeData = this.$router.resolve({
                path: "/shiwucbDetail",
                query: {
                  receiveType: row.receiveType,
                  id: idType,
                  readFlag: readType,
                  choseYear: this.$route.query.choseYear
                }
              });
              let routeId = (localStorage.getItem('routeIdList') && JSON.parse(localStorage.getItem('routeIdList'))) || [];
              if (routeId.includes(idType)) {
                this.$message({
                  type: "error",
                  offset: 400,
                  showClose: true,
                  message: "已经打开了该页面!",
                  duration: 1500,
                })
                return;
              }
              window.open(routeData.href, "_blank");
            }
          }
        })
    },
    submitForm(formName) {
      /*this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });*/
    },
    resetForm() {
      this.bank_countersignature.choseYear = "",
      this.$refs.ruleForm.resetFields();
      this.ruleForm.searchTime = "";
      this.bank_countersignature.startTime = "";
      this.bank_countersignature.endTime = "";
      this.bank_countersignature.title = '';
      this.bank_countersignature.documentCode = '';
      this.bank_countersignature.receive_type = '全部';
      this.routeYear();
      this.tableData = [];
    }
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

.arrowup {
  padding-left: 20px;
  margin-bottom: 20px;
}

.down {
  position: absolute;
  bottom: -76px;
  font-size: 12px;
  text-align: center;
}

.mt20end {
  margin-top: 20px;
}

.clearfix {
  clear: both;
}

.transition_wrap {
  transition: all 0.3s ease-in-out;
}
.mtJ20>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
</style>
