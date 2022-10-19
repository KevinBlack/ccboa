
<template>
  <div>
    <div>
      <el-form style="margin-bottom:5px" v-model="formData">
        <el-row>
            <el-col :span="8">
                  <select-org-or-dept
                    @select="selectOrg"
                    :orgOrDept="1"
                    :orgOrDeptId="'0'"
                    style="width:100%;"
                  >
                    <el-input
                      type="text"
                      readonly="readonly"
                      placeholder="请选择"
                      v-model="formData.unitName"
                      suffix-icon="el-icon-arrow-down"
                    />
                  </select-org-or-dept>
                <!-- <el-input v-model="searchData.unitName"></el-input> -->
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="creartAdd" style="margin-left:10px">新建</el-button>
              <el-button type="danger" @click="del">删除</el-button>
            </el-col>
        </el-row>
      </el-form>
      <m-table
      @select="selectRow"
      @refresh="loadData()"
      @cellClick="cellClick"
      :isSelection="true"
      :searchData="formData"
      size="medium"
      :sortable="true"
      :isPagination="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      ></m-table>
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";
export default {
  name: "activityType",
  components: {
    mTable,
    selectOrgOrDept
  },
  props: {},

  data() {
    return {
      formData:{
        unitName: '',//JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
        unitId: '',//JSON.parse(localStorage.getItem("userInfo")).unitId
      },
      listData:[],//勾选的数据
      tableData: [],
      tableCols: [{ label: "活动类别", prop: "activeType" }],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
    };
  },
  methods: {
    selectOrg(org) {
      this.formData.unitName = org.unitName;
      this.formData.unitId = org.id;
      this.loadData();
    },
    //新建
    creartAdd(){
      this.$router.push({
          path: "/secretary/argument/activityTypeDetail",
          query: {type: "activityTypeDetail" },
        });
    },
     //表格事件
    cellClick(row) {
      this.$router.push({
          path: "/secretary/argument/activityTypeDetail",
          query: {id:row.id,type: "activityTypeDetail" },
        });
      
    },
    // 删除
    del() {
      let arr = [];
      this.listData.map((item) => {
        arr.push(item.id);
      });
      if (this.listData.length >= 1) {
        this.$api.activityInformation.parameTerDel({ id: arr.join(",") }).then((res) => {
          this.loadData();
          this.$message({
            type: "success",
            message: "删除成功！",
          });
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择数据",
        });
      }
    },
    //复选框
    selectRow(rows) {
      this.listData = rows;
    },
    loadData() {
      this.$api.activityInformation
        .parameterList(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
  },
  mounted() {},
  created() {
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  padding: 8px 70px;
  margin-top:30px;
  .title-text{
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
.btnStyle {
  float:right;
}
.styleHeader {
  background:#409eff;
  color: white;
  width: 100%;
  height: 70px;
  line-height: 70px;
  top: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;

  .left {
    margin-left: 20px;
  }
}
</style>
