<template>
  <div class="selectDept">
    <div class="formHeader">
      <div class="title-text">值班动态统计</div>
    </div>
    <div class="cformdata">
      <el-form ref="refForm" :model="searchData" label-width="70px" :inline='true' size='mini'>
        <el-row>
          <el-col :span="10">
          <el-form-item label="统计日期" prop="data">
            <el-date-picker
              v-model="searchData.data"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="投稿栏目" prop="submitColumn">
            <el-select v-model="searchData.submitColumn" placeholder="请选择">
              <el-option
                v-for="item in submitColumnData"
                :key="item.value"
                :label="item.columnCategory"
                :value="item.columnCategory"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="导出类型">
            <el-radio-group v-model="radioType">
              <el-radio label="excel">EXCEL</el-radio>
              <el-radio label="html">HTML</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        </el-row>
        <el-col :span="10">
            <el-form-item label="报送机构" class="org-default">
              <select-org-or-dept :orgOrDeptId="'0'" :defaultData="orgName" @select="selectOrg">
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择机构"
                  v-model="orgName"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </el-form-item>
        </el-col>
        <el-col :span='4'>
          <el-form-item>
            <el-button type="primary" size='mini' @click="submitForm">开始统计</el-button>
            <el-button type="primary" size='mini' @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <el-table :data="tableData" id="table" style="width:100%;min-height:300px;" show-summary >
      <el-table-column
        :prop="item.prop"
        align="center"
        :label="item.label"
        v-for="item in tableCol"
        :key="item.prop"
      >
        <el-table-column
          align="center"
          v-show="item.child && item.child.length"
          :prop="item1.prop"
          :label="item1.label"
          v-for="item1 in item.child"
          :key="item1.prop"
        ></el-table-column>
      </el-table-column>
    </el-table>

    <!-- @description: 分页  -->
    <!-- <div class="ces-pagination" v-if="isPagination">
      <div style="flex: 1;line-height: 30px"></div>
      <el-pagination
        background
        :layout="layout"
        @current-change="handleCurrentChange"
        :page-size="pagination.pageSize"
        @size-change="handleSizeChange"
        :current-page.sync="pagination.pageNum"
        :page-sizes="pageSizeList"
        :total="pagination.total"
      ></el-pagination>
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import selectOrgOrDept from "components/select/selectOrgOrDept1";
import exportTable from "../../../../minixs/exportTable";

export default {
  name: "contribute",
  components: { selectOrgOrDept },
  data() {
    return {
      arr1: [],
      arr2: [],
      tableColDep: {},
      tableColHang: {},
      tableColtol: {},
      tableColTop: {},
      radioType: "html",
      tableCol: [],
      tableData: [], /** @description: 表格数据 */
      submitColumnData: [], /** @description: 投稿栏目数据源 */
      searchData: {
        submitColumn: "全部",
      }, /** @description: 表单值 */
      /** @description: 分页数据 */
      isPagination: true,
      pagination: { pageSize: 10, pageNum: 1, total: 0 },
      pageSizeList: [10, 15, 20, 25, 30, 50, 100, 500],
      layout: "total,sizes,prev, pager, next,jumper",
      orgName: '全部'
    };
  },
  mounted() {
    this.getSubmitColumn(); /** @description: 获取投稿栏目数据源 */
  },

  methods: {
    /** @description: 开始统计 */
    submitForm() {
      if (this.searchData.data === undefined || this.searchData.data === "") {
        this.$message.warning("请先选择统计日期");
      } else {
        /** @description: 判断html、excel */
        if (this.radioType === "excel") {
          this.exportData();
        } else if (this.radioType === "html") {
          this.loadData(); /** @description: 调用表格数据方法 */
        }
      }
    },
    /** @description: 重置 */
    resetForm() {
      this.searchData = {
        submitColumn: "全部",
      }; /** @description: 清空表单的值 */
      
      this.orgName = '全部'
    },
    /** @description: 获取表格数据 */
    loadData() {
      this.$api.duty.columnTou({ ...this.searchData }).then(res => {
        this.arr1 = res.CCCFlist;
        /** @description: 处理表格表头 */
        this.getData();

        /** @description: 处理表格数据 */
        let numi = this.arr1.length;
        this.tableData = res.resultList;
        localStorage.setItem('aTableData', JSON.stringify(res.resultList))
        const a = JSON.parse(localStorage.getItem('aTableData'))
        this.tableData.map((item,index) => {
          for (let i = 2; i < numi + numi + 3; i++) {
            if(a[index][i] && a[index][i].indexOf(',') != -1){
              item[i*2-2] = a[index][i].split(',')[0];
              item[i*2-1] = a[index][i].split(',')[1];
              if(item[i].indexOf(',') != -1){
                item[i] = '0'
              }
            }else{
              if(!item[i]){
                item[i] = '0'
              }else if(item[i] && item[i] === '0'){
                item[i] = '0'
              }
            }
          }
        });

        this.tableData.map(item => {
          let totalL = 0;
          let totalC = 0;
          for (let i = 2; i < numi + numi + 3; i++) {
            i % 2 === 0
              ? (totalL += Number(item[i]))
              : (totalC += Number(item[i]));
          }
          item.totalL = totalL;
          item.totalC = totalC;
        });

        localStorage.removeItem('aTableData')
      });
    },
    /** @description: 获取投稿栏目数据源 */
    getSubmitColumn() {
      this.$api.duty.getSubmitColumnData({ columnType: "1",type:"1" }).then(res => {
        this.submitColumnData = res.columnCategoryList;
        this.submitColumnData.unshift({columnCategory: '全部'})
      });
    },
    /** @description: 选择机构 */
    selectOrg(org) {
      if(org.type == 2){
        this.orgName = org.unitName
      }
      this.searchData.orgName = org.unitName;

      this.$set(this.searchData, "orgName", org.unitName);
      this.$set(this.searchData, "orgCode", org.id);
      /** @description: this.searchData.orgCode = org.id; */
      /** @description: this.searchData.unitCode = org.id; */
      /** @description: this.searchData.unitSearchName = ""; */
      this.searchData.flagType = 1;
    },
    /** @description: 导出 */
    exportData() {
      exportTable.exportExcel("按投稿栏目统计统计表");
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.$emit("refresh", true);
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.$emit("refresh", true);
    },
    getData() {
      /** @description: 取值循环赋值 */
      this.tableCol = [
        { label: "报送单位", prop: "0" },
        { label: "报送部门", prop: "1" }
      ];

      for (let i = 0; i < this.arr1.length; i++) {
        let obj = {
          label: this.arr1[i],
          prop: i + "obj",
          child: [
            { label: "来稿量", prop: (i + (i + 1) + 1).toString() },
            { label: "采用量", prop: (Number(i) + (i + 2) + 1).toString() }
          ]
        };
        this.tableCol.push(obj);
      }
      let objTotal = {
        label: "总计",
        prop: "total",
        child: [
          { label: "来稿量", prop: "totalL" },
          { label: "采用量", prop: "totalC" }
        ]
      };
      this.tableCol.push(objTotal);
    },
    
  },
  created() {
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  margin-bottom: 8px;
  padding: 8px 70px;
  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
  .btn {
    text-align: center;
  }
}
.ces-pagination {
  margin-top: 5px;
  display: flex;
}
/deep/ .el-table__header {
  width: auto !important;
}
/deep/ .el-table__body {
  width: auto !important;
}
.mrg-b-20 {
  float: right;
  margin-right: 20px;
}
.org-default{
  width: 478px;
  
}
.selectOrgOrDept{
    width: 376px !important;
  }
/deep/ .el-table__footer-wrapper{
  /deep/ .el-table__footer{
    width: auto !important;
  }
}
</style>
