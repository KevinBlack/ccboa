<template>
  <div>
    <el-row>
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm transition_wrap"
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
              <el-form-item label="发文日期" prop="sendRangeTime">
                <el-date-picker
                  @change="sendRangeTimeChange()"
                  v-model="sendRangeTime"
                  value-format="yyyy-MM-dd"
                  style="width:100%"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发文字号" prop="documentNo">
                <el-input v-model="ruleForm.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收回日期" prop="recRangeTime">
                <el-date-picker
                  @change="recRangeTimeChange()"
                  value-format="yyyy-MM-dd"
                  v-model="recRangeTime"
                  style="width:100%"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="机构名称" prop="">
                <div class="dispatchcswhlshwh">
                  <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                    <el-input
                      type="text"
                      readonly="readonly"
                      placeholder="请选择"
                      v-model="unitName"
                      suffix-icon="el-icon-arrow-down"
                    />
                  </select-org-or-dept>
                </div>
              </el-form-item>
            </el-col> -->
            <el-col :span="24" style="text-align: center;margin-bottom: 10px;">
              <el-col class="arrowup">
                <el-button type="primary" @click="getTableList('1')" style="margin:0 10px">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="primary" v-if="false">导出</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col style="text-align:right;margin-top:10px;"><el-button size="small" @click="exportExc">导 出</el-button></el-col>
      <el-col style="margin: 10px 0;">
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
import optionalfield from "components/optionalfield/optionalfield.vue";
import treeCofig from "@/components/tree/tree-fawen";
// import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFileQuery from "@/minixs/dispatchFileQuery"

export default {
  name: "DispatchFile",
  mixins: [dispatchFileQuery],
  components: {
    mTable,
    // optionalfield,
    // treeCofig,
    // selectOrgOrDept
  },
  data() {
    return {
      isGly:false,
      bank_select: {
        function: "searchWithdrawOrder"
      },
      pagination: {
        pagNum: 1,
        total: 0,
        limit:20
      },
      recRangeTime: [],
      ruleForm: {
        recTimeStart: "",
        recTimeEnd: "",
        sendTimeStart: "",
        sendTimeEnd: "",
        title: "",
        documentNo: "",
        unitId: "",
        unitName: ""
      },
      tableCols: [
        { label: "收回时间", prop: "withdrawTime", align: "center", width: "150px" },
        { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
        { label: "标题", prop: "title", align: "left",minwidth:"40%" },
        { label: "收回单位", prop: "withdrawUnit", align: "center", width: "120px" },
        { label: "拟稿部门", prop: "draftDepartment", align: "center", width: "120px" },
        { label: "拟稿人 ", prop: "draftUser", align: "center", width: "100px" },
        { label: "被收回单位 ", prop: "recycledUnit", align: "center", width: "120px" }
      ]
    };
  },
  methods: {
    exportExc(){
      exportTable.exportExcel("发文收回查询表",".el-table");
    },
    /**
     * 列表查询
     */
    getTableList(val) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.unitId
      if(val=="1") {
        this.pagination.page = 1;
      }
      this.bank_select = Object.assign(this.bank_select, this.ruleForm);
      this.bank_select.st = localStorage.getItem("st");
      this.$post
        .postData(
          "searchWithdrawOrder",
          JSON.stringify(Object.assign({},this.bank_select, this.pagination)),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.tableData = (res.data && res.data.rows) || [];
          this.pagination.total = res.data.total;
          this.bank_select.totalCount = (res.data && res.data.total) || 0;
        });
    },
    recRangeTimeChange(times) {
      if (!this.recRangeTime ||this.recRangeTime == "null" ||this.recRangeTime == "undefined") {
        this.ruleForm.recTimeStart = "";
        this.ruleForm.recTimeEnd = "";
        return false;
      }
      this.ruleForm.recTimeStart = this.recRangeTime[0];
      this.ruleForm.recTimeEnd = this.recRangeTime[1];
    },
    cellClick(row, column, cell, event) {
      const routeData = this.$router.resolve({
        path: "/qzshBank",
        query: {
          id: row.id,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    resetForm() {
      // this.handleScaleMaintain();
      this.recRangeTime = "";
      this.sendRangeTime = "";
      this.ruleForm = {
        recTimeStart: "",
        recTimeEnd: "",
        sendTimeStart: "",
        sendTimeEnd: "",
        title: "",
        documentNo: "",
        unitId: "",
        unitName: ""
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
      
    }
  },
  created() {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.defaultYear();
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
.mtdown {
  padding: 20px 20px 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.down {
  position: absolute;
  bottom: -76px;
  font-size: 12px;
  text-align: center;
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
</style>
