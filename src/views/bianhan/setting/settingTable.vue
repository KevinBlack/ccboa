<template>
  <div style="height: calc(100vh - 165px);">
    <el-form label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构名称">
            <select-org-or-dept
              @select="selectOrg"
              :orgOrDept="1"
              :orgOrDeptId="'1'"
              style="width:100%;"
            >
              <el-input
                type="text"
                readonly="readonly"
                placeholder="请选择"
                v-model="currentSelectSearchdata"
                suffix-icon="el-icon-arrow-down"
              />
            </select-org-or-dept>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-form-item>
            <el-button type="primary" @click="submit()">查询</el-button>
             <el-button @click="reset()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

   <el-button type="danger" @click="deleteForms" style="float: right;margin-top: -54px; margin-right: 20px;
    position: relative;
    z-index: 2;display:none">删除</el-button>

    <m-table
      @refresh="loadData()"
      @cellClick="jumpdeal"
      :isSelection="true"
      @select="select"
      size="medium"
      :isPagination="true"
      :isHandle="false"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import beanList from "../../../util/beanList";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法

export default {
  name: "settingTable",
  components: {
    mTable,
    selectOrgOrDept
  },
  mixins: [bianhanPublic],
  data() {
    return {
      currentSelectSearchdata:JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
      searchData: {
        // unitName: JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
        unitId: JSON.parse(localStorage.getItem("userInfo")).unitId
      },
      tableData: [],
      tableCols: [
        { label: "机构名称", prop: "unitName" },
        {
          label: "生成编号控制",
          prop: "numberControl",
          formatter: row => {
            return beanList.bianhanNumberControl[row.numberControl];
          }
        },
        {
          label: "便函编号方式",
          prop: "numberType",
          formatter: row => {
            return beanList.bianhanNumberType[row.numberType];
          }
        }
      ],
      pagination: {
        pageNum: 1,
        total: 20
      },
      selectIds: [], //已选择的数据id
    };
  },
  methods: {
    deleteForms(){
      if (this.selectIds.length == 0) {
        this.$message({
          message: "请选择要删除的数据！",
          type: "error"
        });
        return;
      }
      this.$confirm(
        "将彻底删除该数据，且无法恢复，是否确认继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$api.bianhan
          .deleteSettingData({ ids: this.selectIds})
          .then(res => {
            if (res.code == "SUCCESS") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.selectIds=[];
              this.pagination.pageNum=1;
              this.loadData();
            }
          });
      });
    },
    //选择数据
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.selectIds = dataArry;
    },
    submit() {
      this.loadData();
    },
    reset() {
      this.searchData = {unitId: JSON.parse(localStorage.getItem("userInfo")).unitId};
      this.currentSelectSearchdata=JSON.parse(localStorage.getItem("userInfo")).shortUnitName;
    },
    selectOrg(org) {
     this.currentSelectSearchdata=org.unitName;
      this.searchData.unitId = org.id;
      this.loadData();
    },
    loadData() {
       //存储便函流水号维护参数
      localStorage.setItem(
        "bhsetting",
        JSON.stringify(
          Object.assign({}, this.searchData, {
            currentSelectSearchdata: this.currentSelectSearchdata
          })
        )
      );
      this.$api.bianhan
        .settingTable(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: 10
        })
        .then(res => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    jumpdeal(val) {
      var id = val.id;
      this.$router.push({
        name: "bianhanSettingDeal",
        query: {
          id: val.id
        }
      });
    }
  },
  created() {
    let self = this;
    this.getOrgTree().then(res => {
      let orgTree = res.data;
      //设置默认机构
      self.currentSelectSearchdata = orgTree[0].unitName;
      self.searchData.unitId = orgTree[0].unitCode;
      //加载数据
      if (!!localStorage.getItem("bhsetting")) {
        let bhserinalStore = JSON.parse(localStorage.getItem("bhsetting"));
        self.currentSelectSearchdata = bhserinalStore.currentSelectSearchdata;
        self.searchData = bhserinalStore;
      }
      this.loadData();
    });
  }
};
</script>
<style scoped lang="less">
</style>
