<template>
 
    <el-row>
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <!-- <el-col :span="4" style="margin-left: 20px;">
          <select-org-or-dept @select="selectOrg">
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择"
              v-model="unitName"
              suffix-icon="el-icon-arrow-down"
            />
          </select-org-or-dept>
        </el-col> -->
            <el-col :span="12">
              <el-form-item label="统计日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange()"
                    v-model="ruleForm.searchTime"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    size="small"
                    type="daterange"
                    range-separator="-"
                    start-placeholde="开始月份"
                    end-placeholde="结束月份"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-col>
                <el-button size="small" type="primary" @click="initData('1')">开始统计</el-button>
                <el-button size="small" type="primary" @click="resetForm">重置</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="24" style="padding:20px;">
        <table class="stcs_table">
          <tr class="table-first">
            <td>
              <h3 style="font-weight: bold;">统计结果</h3>
                </td>
            <td class="txtRight">
             <el-button style="text-align:right;" v-preventClick size="small" @click="exportExc" class="mrg-b-20">导 出</el-button>
            </td>
          </tr>
          <tr>
            <td>表头：按协办情况统计</td>
          </tr>
          <tr>
            <td>
              统计日期：{{start}}
              <span v-if="start">至</span>
              {{end}}
              <br/>
              <span style="font-weight: 700;">说明：</span>
              <br/>1.本统计为按自然月整月进行统计，例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至6月30日的数据。
              <br/>
                    2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月9日，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。
            </td>
          </tr>
        </table>
      </el-col>
      <!-- <el-col class="mt20end">
        <router-link
          tag="a"
          target="_blank"
          :size="small"
          :to="{name:'bankDispach'}"
          class="btn-writeEnDspc"
        >导出统计结果</router-link>
      </el-col> -->
      <el-col style="margin: 20px 0;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="unitShort" label="协办单位" align="center"></el-table-column>
          <el-table-column prop="countNum" label="协办件数" align="center"></el-table-column>
          <el-table-column prop="countSxnzb" label="时限内在办件数" align="center"></el-table-column>
          <el-table-column prop="countAsfk" label="按时反馈件数" align="center"></el-table-column>
          <el-table-column prop="countCsfk" label="超时反馈件数" align="center"></el-table-column>
          <el-table-column prop="countCszb" label="超时在办件数" align="center"></el-table-column>
          <el-table-column prop="countYfkAvgTime" label="已办结事项的平均办理天数" align="center"></el-table-column>
          <el-table-column prop="countQzbj" label="强制办结件数" align="center"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
</template>

<script>
import dateFormate from "@/util/filters.js";
import exportTable from "@/minixs/exportTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const otherData = [
  { label: "协办单位", prop: "unitShort", align: "center" },
  { label: "协办件数", prop: "countNum", align: "center" },
  { label: "时限内在办件数", prop: "countSxnzb", align: "center" },
  { label: "按时反馈件数", prop: "countAsfk", align: "center" },
  { label: "超时反馈件数", prop: "countCsfk", align: "center" },
  { label: "超时在办件数", prop: "countCszb", align: "center" },
  { label: "已办结事项的平均办理天数", prop: "countYfkAvgTime", align: "center" },
  { label: "强制办结件数", prop: "countQzbj", align: "center" },
];
export default {
  name: "DispatchFile",
  components: {
    //selectOrgOrDept
  },
  data() {
    return {
      // searchData: {},
      // searchDataInfo: "",
      // searchDataInfoId: "",
      // unitName: "",
      // unitId: "",
      // addDis: false, //是否可以选择机构
      // identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
      start:'',
      end:'',
      bank_countersignature: {
        function: "countDataByAssist",
        startRegistDate:'',
        endRegistDate:'',
        //unitId:'',
        //unitName:'',
      },
      iaAll:true,//全部才会显示流转状态
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
        searchTime:''
      },
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: otherData,
    };
  },
  created() {
    // this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
    // this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId
    this.tableData = []
  },
  methods: {
     // 选择机构
    // selectOrg(org) {
    //   this.unitName = org.unitName;
    //   this.unitId = org.id;
    //   console.log(org, this.unitName , this.unitId);
    // },
    // 判断登陆人是否业务管理员或系统管理员
    // addDrafOrgNm() {
    //   let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
    //   this.draforgnmPeople = manger.filter(item => {
    //     return (
    //       item.codeType === "manager_type" && item.dicCode === "sys_manager"
    //     );
    //   });
    //   if (this.draforgnmPeople.length !== 0) {
    //     this.unitName = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).shortUnitName;
    //     this.unitId = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).unitId;
    //     this.addDis = false;
    //     this.identity = true;
    //   } else {
    //     this.unitName = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).shortUnitName;
    //     this.unitId = JSON.parse(
    //       localStorage.getItem("userInfo")
    //     ).unitId;
    //     this.addDis = true;
    //     this.identity = false;
    //   }
    //   console.log(this.unitName,this.unitId)
    // },
    async exportExc(){
        await exportTable.exportExcel("专项督办按协办办理情况统计表",".el-table");
      },
    // 页面初始化加载数据
    initData(type) {
      // this.bank_countersignature.unitName = this.unitName
      // this.bank_countersignature.unitId = this.unitId
      if(this.ruleForm.searchTime == ''){
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "请选择统计时间",
          duration: 1000
        });
        return
      }
      if(type == '1'){
        this.bank_countersignature.page = 1;
      }
      this.$post
        .postData(
          "countDataByAssist",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.zxdb
        )
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange() {
      if(this.ruleForm.searchTime[0]){
        this.bank_countersignature.startRegistDate = this.start = dateFormate.date(Date.parse(this.ruleForm.searchTime[0]));
        //this.start = dateFormate.date(Date.parse(this.ruleForm.searchTime[0]),"YYYY-MM-DD");
        this.bank_countersignature.endRegistDate = this.end = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
        //this.end = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]),"YYYY-MM-DD")
        // this.bank_countersignature.endRegistDate = this.bank_countersignature.endRegistDate.split('-');
        // this.bank_countersignature.endRegistDate[2] = parseInt(this.bank_countersignature.endRegistDate[2])+30;
        // this.bank_countersignature.endRegistDate = this.bank_countersignature.endRegistDate.join('-');
      }
    },
    // 点击切换分页按钮切换页面
    // handleCurrentChange(val) {
    //   this.bank_countersignature.page = val;
    //   this.pagination.page = val;
    //   this.tableData = [];
    //   this.initData();
    // },

    // handleSizeChange(val) {
    //   this.bank_countersignature.limit = this.pagination.limit = val;
    //   this.pagination.page = this.bank_countersignature.page = 1;
    //   this.tableData = [];
    //   this.initData();
    // },
    cellClick(row, column, cell, event) {
      // this.$router.push({
      //   // path: "/countersignend",
      //   path: "/bankDispach",
      //   targ: '_blank',
      //   query: {
      //     id: row.id
      //   }
      // });
    },
    resetForm() {
      this.ruleForm.searchTime = '';
      this.bank_countersignature.endRegistDate = '';
      this.bank_countersignature.startRegistDate = '';
      // this.bank_countersignature.unitId = '';
      // this.bank_countersignature.unitName = '';
      // this.unitId = '';
      // this.unitName = '';
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
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}
.table-first {
  border-bottom: 2px solid #f0f0f0;
}
.stcs_table tr {
  height: 20px;
  line-height: 20px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
</style>
