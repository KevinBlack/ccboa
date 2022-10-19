<template>
  <div>
      <el-row class="mtJ20">
        <el-col>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm mt20"
            :class="{mtdown:down}"
          >
            <el-row>
              <!-- <el-col :span="4">
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
              </el-col> -->
              <el-col :span="6">
                <el-form-item label="收文日期">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange()"
                      v-model="ruleForm.searchTime"
                      type="daterange"
                      align="right"
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
                <el-form-item label="收件编号" prop="fileCode">
                  <el-input v-model="bank_countersignature.fileCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-col class="arrowup">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-col>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col class="mt20end" v-if="isAddShow">
        <router-link
          tag="a"
          target="_blank"
          :to="{name:'writeEmailLetter'}"
          class="btn-writeEnDspc"
        >新增</router-link>
      </el-col>
        <!-- <el-col class="mt20end">    v-if="isEnd" -->
        <el-col style="margin:10px 0;">
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
            :pagination="pagination"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            @cellClick="cellClick"
            v-loading="tableLoading"
            :default-sort="sortDate"
          ></m-table>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";

// recorder  登记人
// fileTypeForXd  收件类型
// security  密级
// emergencyId  紧急程度
// sendDeptId 来文单位
const finshData = [
  { label: "收文日期", prop: "createTime", align: "center" },
  { label: "收件类型", prop: "fileTypeForXd", align: "center" },
  { label: "密级", prop: "security", align: "center" },
  { label: "来文单位", prop: "sendOrgName", align: "center",
    // formatter(row){
    //   if(row.sendDeptId){
    //     return row.sendDeptId.replace(/\"/g,"").replace(/\[/g,"").replace(/\]/g,"")
    //   }else{
    //     return row.sendOrgName
    //   }
    // }

  },
  { label: "登记人", prop: "recorder", align: "center" }
];
export default {
  name: "EmailLetter",
  components: {
    mTable
  },
  data() {
    return {
      // yearList:[],
      bank_countersignature: {
        // choseYear:"",
        function: "selectXDHJInfoPage",
        state: 1,
        startTime: "",
        endTime: "",
        fileCode:"",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount:0,
      },
      isAddShow:true,
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
        searchTime:"",
      },
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
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
    // selectYear(val) {
    //   this.bank_countersignature.choseYear = val;
    //   this.$router.push({
    //     query: {
    //       choseYear: val
    //     }
    //   }) 
    // },
    initData() {
      sessionStorage.setItem('page_sw',JSON.stringify(this.bank_countersignature));
      this.$post
        .postData(
          "selectXDHJInfoPage",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.swgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;

        })
        .catch(err => {
          console.log(err);
        });
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
      this.pagination.page = this.bank_countersignature.page = 1
      this.tableData = [];
      this.initData();
    },
    isHasAdd(){
        this.$post
        .postData(
          "getDraftAuth",
          JSON.stringify({function:"getDraftAuth"}),
          this.$businessCode.swgl
        )
        .then(res => {
          if(res.success==false)this.isAddShow=false
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange() {
      this.bank_countersignature.startTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[0]));
      this.bank_countersignature.endTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
    },
    cellClick(row, column, cell, event) {
      const routeData = this.$router.resolve({
        path: "/writeEmailLetter",
        query: {
          id: row.id,
          // choseYear: this.bank_countersignature.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm(formName) {
      this.initData();
    },
    resetForm(formName) {
      // this.bank_countersignature.choseYear = "",
      this.ruleForm.searchTime='';
      this.bank_countersignature.startTime='';
      this.bank_countersignature.endTime='';
      this.bank_countersignature.fileCode='';
      this.routeYear();
    },
    // routeYear(){
    //   this.$router.push({
    //     query: {
    //       choseYear: ''
    //     }
    //   })
    // },
  },
  created() {
    // this.routeYear();
    // this.$post
    //     .postData(
    //       "selTableYear",
    //       JSON.stringify({ function: "selTableYear" }),
    //       this.$businessCode.swgl
    //     ).then(res => {
    //       if(res){
    //         this.yearList = res.data
    //       }
    //   })
    if(sessionStorage.getItem('page_sw')){
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('page_sw')));
      this.pagination={
        page: this.bank_countersignature.page, //第几页
        total: this.bank_countersignature.totalCount, //共有条数
        limit: this.bank_countersignature.limit, //每页条数
      }
    }
    this.initData();
    this.isHasAdd();
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
.mt20end {
  margin-top: 10px;
}
.mtJ20>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
</style>
