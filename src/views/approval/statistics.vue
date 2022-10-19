<template>
  <div>
    <el-row>
      <el-form :model="formData" ref="elForm" :rules="rules">
        <el-row style="padding: 12px 12px 0 0px;">
          <el-col :span="8">
            <el-form-item label="统计日期:">
              <el-date-picker
                v-model="formData.draftTime1"
                style="width:calc(100% - 100px)!important"
                size="small"
                valueFormat="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholde="开始月份"
                end-placeholde="结束月份"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="统计机构">
              <el-input v-model="formData.curBank" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="small" @click="selectOrg">选 择</el-button>
          </el-col>
        </el-row>
        <el-row style="padding: 0 12px 0 0px;">
          <el-col :span="12">
            <el-form-item label="跨行类型:" prop="khType">
              <el-radio-group v-model="formData.khType" @change="changekhType">
                <el-radio label="0">非跨行</el-radio>
                <el-radio label="1">跨行（本级行上报）</el-radio>
                <el-radio label="2">跨行（下级行上报）</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="txtRight">
            <el-button type="primary" size="small" @click="goSearch">开始统计</el-button>
            <el-button type="primary" size="small" @click="reset">重 置</el-button>
          </el-col>
        </el-row>
        <el-row style="padding: 0 12px 0 20px;">
          <el-col :span="24" class="txtRight">
            <el-button size="small" @click="exportData">导 出</el-button>
          </el-col>
        </el-row>
        <hr style="margin:20px 10px" />
      </el-form>

      <el-col :span="24" class="mrg-b-20" style="padding: 0 18px 0;">      
        <table>
          <tr class="table-first">
            <td>
              <h3 style="font-weight: bold;">说明</h3>
            </td>
          </tr>
          <tr>
            <td
              colspan="2"
              style="line-height:35px;"
            >1.本统计为按自然月整月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。</td>
          </tr>
          <tr>
            <td
              style="line-height:35px;"
              colspan="2"
            >2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。</td>
          </tr>
        </table>
      </el-col> 
    </el-row>
    <!--    <div style="background:#eef1f6;font-size:20px;text-align:center;height:36px;line-height:36px;">{{bankName}}事务审批统计表</div>-->
    <div>
      <el-table
        id="table"
        :data="tableData"
        stripe
        style="width: 100%;color:black"
        align="center"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#eef1f6',color:'#3B85F0',textAlign:'center'}"
      >
        <el-table-column class="qwe" style="color:black;width: 100%" :label="bankName">
          <el-table-column :label="tip">
            <el-table-column
              v-for="(item,index) in applyList"
              :key="index"
              :label="item"
              :prop="(index).toString()"
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
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import exportTable from "../../minixs/exportTable";
import orgTree from "components/tree/shiwuOrgTree";

export default {
  name: "statistics",
  components: {
    orgTree
  },
  data() {
    return {
      title: "选择机构",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "0",
      rules: {
        khType: [{ required: true, message: "请选择是否跨行", trigger: "blur" }]
      },
      bankName: "本级行" + "事务审批统计表",
      // applyList: ['机构1', '机构2', '机构3'],
      formData: {
        curBank: JSON.parse(localStorage.getItem("userInfo")).unitName,
        curBankId: JSON.parse(localStorage.getItem("userInfo")).unitId
      },
      applyList: [],
      tableData: [],
      pagination: {
        pageNum: 1, //第几页
        total: 10, //共有条数
        pageSize: 20 //每页条数
      },
      tip: ""
    };
  },
  methods: {
    reset() {
      this.formData = {
        curBank: JSON.parse(localStorage.getItem("userInfo")).unitName,
        curBankId: JSON.parse(localStorage.getItem("userInfo")).unitId,
        khType: "0"
      };
    },
    //选择机构
    selectOrg() {
      this.title = "选择机构";
      this.isSingle = true;
      this.orgOrDept = 1;
      this.orgOrDeptId = "1";
      this.showOrgTree = true;
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        this.$set(this.formData, "curBank", org.unitName);
        this.$set(this.formData, "curBankId", org.id);
      }
    },
    //开始查询
    goSearch() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.loadData();
        }
      });
    },
    changekhType() {
      if (this.formData.khType == "0") {
        this.bankName = "本级行" + "事务审批统计表";
      } else if (this.formData.khType == "1") {
        this.bankName = "本级行上报跨行" + "事务审批统计表";
      } else if (this.formData.khType == "2") {
        this.bankName = "下级行上报跨行" + "事务审批统计表";
      }
    },
    //导出
    exportData() {
      exportTable.exportExcel(this.bankName + "事务审批统计");
    },
    loadData() {
      if (this.formData.draftTime1) {
        this.formData.approveTimeStart = this.formData.draftTime1[0];
        this.formData.approveTimeEnd = this.formData.draftTime1[1];
        this.tip =
          "统计日期：" +
          this.formData.approveTimeStart +
          "至" +
          this.formData.approveTimeEnd +
          "计量单位：份";
      }
      this.$api.checkLz
        .statisticsTable(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.applyList = res.applyList;
          this.tableData = res.dataList;
          this.count();
        });
    },
    //    合计计算
    count() {
      console.log("开始统计");
      this.applyList.unshift("申请单位");
      this.applyList.unshift("序号");
      this.applyList.push("合计");
      let applyLength = this.applyList.length;
      let count = 0;
      this.tableData.map(itemData => {
        let itemList = deepClone(itemData);
        delete itemList["1"];
        let arrList = [];
        let heji = 0;
        for (let num = 2; num < applyLength - 1; num++) {
          if (!itemList[num.toString()]) {
            itemData[num.toString()] = 0;
            itemList[num.toString()] = 0;
          }
        }
        for (let item in itemList) {
          arrList.push(itemList[item]);
          heji += itemData[item];
        }
        itemData[(arrList.length + 2).toString()] = heji;
        itemData["0"] = ++count;
      });
      let arrheji = [];
      for (let num = 2; num <= this.applyList.length; num++) {
        let lastHeji = 0;
        this.tableData.map(item => {
          lastHeji += item[num.toString()];
        });
        arrheji.push(lastHeji);
      }
      let hejiList = {};
      for (let num = 0; num < arrheji.length; num++) {
        hejiList[(num + 2).toString()] = arrheji[num];
      }
      hejiList["0"] = "合计";
      this.tableData.push(hejiList);
    }
  },
  created() {
    this.$set(this.formData, "khType", "0");
    this.loadData();
    this.count();
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
.el-row {
  margin-left: 12px;
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
