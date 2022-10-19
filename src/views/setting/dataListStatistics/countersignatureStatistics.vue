<template>
  <div>
    <el-row class="mtJ20">
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="会签办结时间">
                <div class="block">
                  <el-date-picker
                    @change="timeChange"
                    v-model="draftTime"
                    value-format="yyyy-MM-dd"
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
            <el-col :span="6">
              <el-form-item label="会签部门" prop="mainOrganNames">
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
            <!-- <el-col :span="5">
              <el-form-item label="数据来源" prop="sendTypeId">
                <el-select v-model="ruleForm.sendTypeId" style="width:100%" clearable>
                  <el-option
                    v-for="item in dataSource"
                    :key="item.label"
                    :value="item.label"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="5">
              <el-form-item label="办结状态" prop="state">
                <el-select v-model="ruleForm.state" style="width:100%" clearable>
                  <el-option
                    v-for="item in dataState"
                    :key="item.label"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-col class="arrowup" style="text-align:center;margin-bottom:10px;">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="20">
        <h3 style="padding-top:20px;">统计结果</h3>
      </el-col>
      <el-col :span="4" style="margin: 5px 0 0 0 ;text-align: right;">
        <el-button  @click="toExcel">导出</el-button>
      </el-col>
      <el-col style="margin: 10px 0;" :class="{'is10':bank_countersignature.state > 1}">
        <m-table
          size="medium"
          :isSelection="true"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :state="bank_countersignature.state"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          v-loading="tableLoading"
        ></m-table>
      </el-col>
    </el-row>
    <Dialog ref="dialog" @checkNode="checkNode" :treeData="treeData"></Dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import Dialog from "@/views/dispatch/departDialog.vue";
import dateFormate from "@/util/filters.js";
import dispatchIndex from "@/minixs/dispatchIndex";
import exportTable from "@/minixs/exportTable";

export default {
  name: "countersignatureStatistics",
  components: {
    mTable,
    Dialog
  },
  mixins: [dispatchIndex,exportTable],
  data() {
    return {
      bank_countersignature: {
        function: "detailsSignOrder",
      },
      tableCols: [
        { label: "会签时间", prop: "draftTime", align: "center", width: "150px"},
        { label: "标题", prop: "title", align: "left", minwidth:"40%" },
        { label: "文号", prop: "documentNo", align: "left", width: "220px" },
        { label: "会签时常（天）", prop: "rownum_", align: "center", width: "220px" },
        { label: "会签部门", prop: "signDept", align: "center", width: "220px" },
        { label: "办结时间", prop: "tms", align: "center", width: "80px" },
        { label: "状态", prop: "state", align: "center", width: "220px",
          formatter(row) {
            return (row.state=="0"?"已办结":"未办结");
          }
        },
        // { label: "数据来源", prop: "DOCUMENTCODE", align: "center", width: "220px" }
      ],
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
        state: "",
        draftOrganId: "",
        mainOrganNames: "",
        deptIds: "",
        dateStart: "",
        dataEnd: ""
      },
      draftOptions:[],
      draftTime: [],
      dataSource: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: 'OA1',
          label: 'OA1'
        },
        {
          value: 'OA2',
          label: 'OA2'
        }
      ],
      dataState: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '办结',
          label: '办结'
        },
        {
          value: '未办结',
          label: '未办结'
        }
      ],
      tableLoading: false,
      tableData: [],
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20 //每页条数
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
      treeData: []
    };
  },
  mounted() {
  },
  methods: {
    // 页面初始化加载数据
    handleLoadData() {
      this.$post.postData('detailsSignOrder', JSON.stringify(Object.assign(this.bank_countersignature, this.ruleForm, this.pagination)), this.$businessCode.xnkb).then((res) => {
        this.tableData = res.data&&res.data.rows||[];
        this.pagination.total = res.data.total;
      })
    },
    timeChange() {
      this.ruleForm.dateStart = dateFormate.date(Date.parse(this.draftTime[0]));
      this.ruleForm.dataEnd = dateFormate.date(Date.parse(this.draftTime[1]));
    },
    submitForm(formName) {
      this.handleLoadData("0")
    },
    resetForm(formName) {
      this.draftTime = [];
			this.ruleForm = {
        state: "",
        draftOrganId: "",
        mainOrganNames: "",
        deptIds: "",
        dateStart: "",
        dataEnd: ""
      };
      this.$refs.ruleForm.resetFields();
    },
    checkNode(result) {
      this.ruleForm.mainOrganNames = result.name;
      this.ruleForm.deptIds = result.id;
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
    toExcel(){
      this.$post
        .postData(
          "doSaveOperationLog",
          JSON.stringify({
            function: "doSaveOperationLog",
            operationType: "导出"
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        });
      this.isSelection=false;
      setTimeout(()=>{
        exportTable.exportExcel("发文明细统计");
        this.isSelection=true;
      },10)
    }
  },
  created() {
    let transArr = localStorage.getItem("unitInfo")&&JSON.parse(localStorage.getItem("unitInfo"))||[]
    let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||''
    let curDept = JSON.parse(localStorage.getItem("userInfo")).humanId
    let humanRole = localStorage.getItem("tcHumanRole")&&JSON.parse(localStorage.getItem("tcHumanRole"))||[];
    if(transArr.length>1) {
      transArr.forEach(element => {
        if (element.unitId == userInfo.unitId) {
          this.draftOptions.push(element)
        }
      });
      this.draftOptions.forEach(element => {
        if(element.humanId == curDept) {
          this.ruleForm.draftOrganId = element.firstUnitId
        }
      });
    }
    this.treeParams.wfeUnitId = userInfo.unitId;
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
.arrowup{
  padding-left: 20px;
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
