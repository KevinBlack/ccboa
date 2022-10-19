<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部" name="tabs-all">
        <optionalfield></optionalfield>
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
            class="demo-ruleForm mt20"
            :class="{mtdown:down}"
          >
            <el-row>
              <el-col :span="6">
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
              <el-col :md="12" :lg="8" :xl="4">
                <el-form-item label="收文日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange"
                      v-model="ruleForm.searchTime"
                      type="daterange"
                      align="left"
                      :clearable="false"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="bank_countersignature.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="收文字号" prop="documentCode">
                  <el-input v-model="bank_countersignature.documentCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12" :lg="8" :xl="4" style="padding-left:10px">
                <el-col v-if="!down" class="arrowup">
                  <el-button type="primary" @click="search">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                  <el-button type="info" size="small" @click="arrow()">
                    <i class="el-icon-arrow-down el-icon--left"></i> 展开
                  </el-button>
                </el-col>
              </el-col>
            </el-row>
            <div v-if="down" class="clearfix">
              <!-- <el-row>
                <el-col :span="11">
                  <el-form-item label="督办人" label-width="130px"  prop="hostDepartment">
                    <el-input v-model="ruleForm.hostDepartment" readonly="readonly"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary">选择</el-button>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col>
                  <el-form-item label="收文形式">
                    <el-radio-group v-model="searchParams.receive_type">
                      <el-radio label="全部"></el-radio>
                      <el-radio label="电子收文"></el-radio>
                      <el-radio label="实物收文"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="办理进度">
                  <el-radio-group v-model="searchParams.progress">
                    <el-radio label="全部"></el-radio>
                    <el-radio label="在办"></el-radio>
                    <el-radio label="超时未结"></el-radio>
                    <el-radio label="超时办结"></el-radio>
                    <el-radio label="按时办结"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col>
                  <el-row class="center">
                    <el-button type="primary" @click="initData">搜索</el-button>
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
        </el-col>
        <!-- <el-col class="mt20end">    v-if="isEnd" -->
        <el-col style="margin: 10px 0;" :class="{'is10':bank_countersignature.state > 0}">
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            :state="bank_countersignature.state"
            :pagination="pagination"
            @cellClick="cellClick"
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
import optionalfield from "components/optionalfield/optionalfield.vue";
import dateFormate from "@/util/filters.js";

const finshData = [
  {label: "收文日期", prop: "receiveTime", align: "center", width: '90',formatter:(row)=>{
      return row.receiveTime && row.receiveTime.substr(0,10) || ''
    } },
  {label: "收文字号", prop: "documentCode", align: "center", width: '200'},
  {label: "标题", prop: "title", align: "left", minwidth: '150'},
  {label: "督办日期", prop: "superviseDate", align: "center", width: '90',formatter:(row)=>{
      return row.superviseDate && row.superviseDate.substr(0,10) || ''
    } },
  {label: "督办人", prop: "superviserName", align: "center", width: '60'},
  {label: "办理进度", prop: "progress", align: "center", width: '80'},
  {label: "当前处理人", prop: "curUser", align: "center", width: '80'},
  {label: "当前环节", prop: "curNodeName", align: "center", width: '120'}
];
export default {
  name: "FileSupervise",
  components: {
    mTable,
    optionalfield
  },
  data() {
    return {
      yearList:[],//年份
      bank_countersignature: {
        choseYear:"",
        function: "selectByPageSupervise",
        title: '',
        documentCode: '〔〕',
        startTime: '',
        receive_type: '',
        endTime: '',
        state: 1,
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount: 0,
        progress: ''
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
      searchParams: {
        receive_type: '全部',
        progress: '全部'
      },
      ruleForm: {
        receive_type: '全部',
        documentCode: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        statrTime: "",
        endTime: "",
        // searchTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        desc: "",
        progress: "全部"
      },
      tableLoading: false,
      activeName: sessionStorage.getItem('tab_sw') || "tabs-wait",
      sortDate: [{prot: "date", order: "descnding"}],
      isEnd: false,
      tableData: [],
      tableCols: finshData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
      }
    };
  },
  methods: {
    selectYear(val) {
      this.bank_countersignature.choseYear = val;
      // this.$router.push({
      //   query: {
      //     choseYear: val
      //   }
      // }) 
    },
    yearDate(){//年份
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
      if (this.searchParams.progress === "全部") {
        this.bank_countersignature.progress = "";
      } else {
        this.bank_countersignature.progress = this.searchParams.progress;
      }
      this.$post
        .postData(
          "selectByPageSupervise",
          JSON.stringify(this.bank_countersignature), this.$businessCode.swgl
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
      if (this.down == false) {
        this.searchParams.receive_type = '全部';
        this.bank_countersignature.receive_type = '全部';
        this.searchParams.progress = '全部';
        this.bank_countersignature.progress = '全部';
      }
    },
    handleTabsClick(tab, event) {
      this.tableData = [];
      this.bank_countersignature.totalCount = 0;
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      this.bank_countersignature.state = tab.index;
      sessionStorage.setItem('tab_sw', tab.name);
      this.initData()
      if(tab.index != 0){
        this.bank_countersignature.choseYear = "";
        this.routeYear()
      }
    },
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      this.bank_countersignature.limit = this.pagination.limit = val;
      this.pagination.page = this.bank_countersignature.page = 1
      this.tableData = [];
      this.initData();
    },
    timeChange() {
      if (this.ruleForm.searchTime[0]) {
        this.bank_countersignature.startTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[0]));
        this.bank_countersignature.endTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
      }
    },
    cellClick(row, column, cell, event) {
      if (this.bank_countersignature.state == 2 || this.bank_countersignature.state == 3 || row.status == "已办" || row.status == "办结") {
        const routeData = this.$router.resolve({
          path: row.receiveType == '电子收文' ? "/receiveDzBjYb" : "/receiveBjYb",
          query: {
            id: row.id,
            receiveType: row.receiveType,
            readFlag: row.readFlag,
            choseYear: this.$route.query.choseYear
          }
        });
        window.open(routeData.href, "_blank");
      } else {
        const routeData = this.$router.resolve({
          path: row.receiveType == "电子收文" ? "/receiveElectronDispatch" : "/receiveDispatch",
          query: {
            id: row.id,
            receiveType: row.receiveType,
            readFlag: row.readFlag,
            choseYear: this.$route.query.choseYear
          }
        });
        let routeId = (localStorage.getItem('routeIdList') && JSON.parse(localStorage.getItem('routeIdList'))) || [];
        if (routeId.includes(row.id)) {
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
      this.ruleForm.searchTime='';
      this.bank_countersignature.choseYear = "",
      this.bank_countersignature.monthValue = "",
      this.$refs.ruleForm.resetFields();
      // this.ruleForm.searchTime = "";
      this.bank_countersignature.title = '';
      this.bank_countersignature.startTime = '';
      this.bank_countersignature.endTime = '';
      this.bank_countersignature.documentCode = '';
      this.searchParams.receive_type = '全部';
      this.bank_countersignature.receive_type = '全部';
      this.searchParams.progress = '全部';
      this.bank_countersignature.progress = '全部';
      this.routeYear();
      this.tableData = [];
    },
    routeYear(){
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
    },
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
      // if (this.bank_countersignature.startTime && this.bank_countersignature.endTime) {
      //   this.ruleForm.searchTime = [this.bank_countersignature.startTime, this.bank_countersignature.endTime]
      // }
      this.pagination = {
        page: this.bank_countersignature.page, //第几页
        total: this.bank_countersignature.totalCount, //共有条数
        limit: this.bank_countersignature.limit, //每页条数
      }
    }
    if (sessionStorage.getItem('tab_sw')) {
      this.activeName = sessionStorage.getItem('tab_sw');
    }
    this.initData();
    this.yearDate();
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
  bottom: 0;
  font-size: 12px;
  text-align: center;
}
.clearfix{
  clear: both;
  padding-bottom: 71px;
}
.mt20end {
  margin-top: 20px;
}
.mtJ20>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
</style>
