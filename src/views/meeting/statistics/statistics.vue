<!--
 * @Author: your name
 * @Date: 2020-10-13 18:19:10
 * @LastEditTime: 2021-07-12 10:54:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\meeting\statistics\statistics.vue
--> 
/**
* create by zx on 2020-6-23 10:50
* 类注释：
* 备注：
*/
<template>
  <div>
    <el-row>
      <el-form :model="formData" :rules="rules" ref="elForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="统计日期:">
              <el-date-picker
                v-model="formData.draftTime1"
                style="width: 40%"
                valueFormat="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholde="开始月份"
                end-placeholde="结束月份"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="统计内容:" prop="strFlag">
              <el-radio-group v-model="formData.strFlag">
                <el-radio label="1">主办</el-radio>
                <el-radio label="2">参会</el-radio>
                <!-- <el-radio label="2"></el-radio> -->
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="统计机构" prop="curBank">
              <el-input v-model="formData.curBank" :disabled="true" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="small" @click="selectOrg">选 择</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="txtRight">
            <el-button type="primary" size="small" @click="loadData">开始统计</el-button>
            <el-button type="primary" size="small" @click="reset">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-col :span="24" class="mrg-b-20">
        <table>
          <tr class="table-first">
            <td>
              <h3 style="font-weight: bold;">统计说明</h3>
            </td>
            <td class="txtRight">
              <el-button size="small" class="mrg-b-20" @click="exportTables">导 出</el-button>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              1.本统计为按自然月整月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。
              2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <!-- <m-table
      @refresh="loadData()"
      :isHandle="false"
      :sortable="false"
      :searchData="formData"
      :isPagination="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>-->
    <div>
      <el-table
        :searchData="formData"
        :data="tableData"
        :tableCols="tableCols"
        stripe
        id="table"
        style="width: 100%;color:black"
        align="center"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#eef1f6',color:'#3B85F0',textAlign:'center'}"
      >
        <el-table-column class="qwe" style="color:black;width: 100%" :label="bankName">
          <el-table-column :label="tip">
            <el-table-column
              v-for="item in tableCols"
              :key="item.id"
              :prop="item.prop"
              :fixed="item.fixed"
              show-overflow-tooltip
              :label="item.label"
              :width="item.width"
              align="center"
            ></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :isSingle="isSingle"
      :seletSelf="1"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import exportTable from "../../../minixs/exportTable";
import orgTree from "components/tree/shiwuOrgTree";

export default {
  name: "meetingStatistics",
  components: {
    mTable,
    orgTree,
  },
  data() {
    return {
      bankName: "会议管理统计表",
      tip: "",
      title: "选择机构",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      rules: {
        strFlag: [
          { required: true, message: "请选择统计内容", trigger: "blur" },
        ],
        curBank: [{ required: true, message: "请选择机构", trigger: "blur" }],
      },
      formData: {
        curBank: "",
        curBankId: "",
      },
      // 表头样式
      isHeaderStyle: false,
      size: "medium",
      isBorder: false,
      tableData: [],
      tableCols: [
        { label: "主办部门", prop: "maindept", child: [] },
        { label: "本部会议", prop: "bbNum", child: [] },
        { label: "系统会议", prop: "xtNum", child: [] },
        { label: "部门会议", prop: "bmfNum", child: [] },
        { label: "培训", prop: "pxfNum", child: [] },
        { label: "合计", prop: "sum", child: [] },
      ],
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 20,
      },
      obj: {},
    };
  },
  methods: {
    reset() {
      (this.formData = {}), (this.formData.curBankId = "");
    },
    //选择机构
    selectOrg() {
      this.title = "选择机构";
      this.isSingle = true;
      this.orgOrDept = 1;
      this.orgOrDeptId = 1;
      this.showOrgTree = true;
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        this.$set(this.formData, "curBank", org.unitName);
        this.$set(this.formData, "curBankId", org.id);
      }
    },
    loadData() {
      if (this.formData.draftTime1) {
        // this.formData.draftBeginDate = new Date(this.formData.draftTime1[0]).getTime()
        // this.formData.draftEndDate = new Date(this.formData.draftTime1[1]).getTime()
        this.formData.draftBeginDate = this.formData.draftTime1[0];
        this.formData.draftEndDate = this.formData.draftTime1[1];
        this.tip =
          "统计日期：" +
          this.formData.draftBeginDate +
          "至" +
          this.formData.draftEndDate +
          "计量单位：份";
      } else {
        this.formData.draftBeginDate = "";
        this.formData.draftEndDate = "";
        this.$message({
          message: "请先选择统计日期",
          type: "warning",
        });
        return false;
      }
      this.$refs["elForm"].validate((valid) => {
        if (valid) {
          this.$api.meeting
            .statistics(this.formData, {
              PAGE_JUMP: this.pagination.pageNum,
              REC_IN_PAGE: this.pagination.pageSize,
            })
            .then((res) => {
              this.bankName = this.formData.curBank + "会议管理统计表";
              if (this.formData.strFlag == "1") {
                this.tableCols = [
                  { label: "主办部门", prop: "maindept", child: [] },
                  { label: "本部会议", prop: "bbNum", child: [] },
                  { label: "系统会议", prop: "xtNum", child: [] },
                  { label: "部门会议", prop: "bmfNum", child: [] },
                  { label: "培训", prop: "pxfNum", child: [] },
                  { label: "合计", prop: "sum", child: [] },
                ];
              } else {
                this.tableCols = [
                  { label: "参会部门", prop: "joinmeetDept", child: [] },
                  { label: "本部会议", prop: "bbNum", child: [] },
                  { label: "系统会议", prop: "xtNum", child: [] },
                  { label: "部门会议", prop: "bmfNum", child: [] },
                  { label: "培训", prop: "pxfNum", child: [] },
                  { label: "合计", prop: "sum", child: [] },
                ];
              }
              if (res.list && res.list.length > 0) {
                let obj = {};
                obj["bbNum"] = res.meetOrderTJ.bbsum;
                obj["xtNum"] = res.meetOrderTJ.xtsum;
                obj["bmfNum"] = res.meetOrderTJ.bmsum;
                obj["pxfNum"] = res.meetOrderTJ.pxsum;
                obj["sum"] =
                  res.meetOrderTJ.bbsum +
                  res.meetOrderTJ.xtsum +
                  res.meetOrderTJ.bmsum +
                  res.meetOrderTJ.pxsum;
                res.list.push(obj);
                if (this.formData.strFlag == "1") {
                  res.list[res.list.length - 1].maindept = "合计";
                  // console.log('this.strFlagz', this.formData.strFlag, this.tableCols)
                } else {
                  res.list[res.list.length - 1].joinmeetDept = "合计";
                  // console.log('this.strFlagc', this.formData.strFlag, this.tableCols)
                }
                // res.list[res.list.length - 1].maindept = "合计"
                // res.list[res.list.length - 1].bbNum = res.meetOrderTJ.bbsum
                // res.list[res.list.length - 1].xtNum = res.meetOrderTJ.xtsum
                // res.list[res.list.length - 1].bmfNum = res.meetOrderTJ.bmsum
                // res.list[res.list.length - 1].pxfNum = res.meetOrderTJ.pxsum
                // res.list[res.list.length - 1].sum = res.meetOrderTJ.bbsum + res.meetOrderTJ.xtsum + res.meetOrderTJ.bmsum + res.meetOrderTJ.pxsum
                this.tableData = res.list;
              } else {
                this.this.tableData = [];
              }
            });
        }
      });
    },
    exportTables() {
      if (this.tableData.length == 0) {
        return;
      }
      exportTable.exportExcel(this.formData.curBank + "会议管理统计");
    },
  },
  created() {},
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.el-row {
  margin-bottom: 20px;
  margin-left: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.col-weizhi {
  text-align: center;
  line-height: 36px;
}

.qwe {
  color: #ccc !important;
}

.el-table_1_column_1 {
  text-align: center !important;
}

.el-table td,
.el-table th {
  text-align: center !important;
}
.el-input {
  width: 80%;
  margin-right: -50% !important;
}
</style>


