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
          <el-form-item label="活动类别" prop="submitColumn">
            <el-select v-model="searchData.activityType1" placeholder="请选择" @change="handleChange">
              <el-option
                v-for="item in submitColumnData"
                :key="item.id"
                :label="item.activityCategory"
                :value="item.id"
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
         <el-col :span="4">
            <el-button type="primary" @click="submitForm">开始统计</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
        </el-col>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%;min-height:300px;" id="table" show-summary>
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
          >
            <el-table-column
              align="center"
              v-show="item1.child && item1.child.length"
              :prop="item2.prop"
              :label="item2.label"
              v-for="item2 in item1.child"
              :key="item2.prop"
            ></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
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
      ></el-pagination> -->
    </div>
  </div>
</template>

<script >
import selectOrgOrDept from "components/select/selectOrgOrDept1";
import exportTable from "../../../../minixs/exportTable";

export default {
  name: "contribute",
  components: { selectOrgOrDept },
  data() {
    return {
      arr1: [],
      radioType: "html",
      tableData: [], /** @description: 表格数据 */
      /** @description: 分页数据 */
      isPagination: true,
      pagination: { pageSize: 10, pageNum: 1, total: 0 },
      pageSizeList: [10, 15, 20, 25, 30, 50, 100, 500],
      layout: "total,sizes,prev, pager, next,jumper",
      submitColumnData: [], /** @description: 投稿栏目数据源 */
      orgId: '',
      activityType1Id:undefined,
      searchData: {
        activityType: '全部',
         activityType1: '全部',
      }, /** @description: 表单值 */
      tableCol: [],
      orgName: '全部'
    };
  },
  computed:{
    submitColumnDataIds:function(){
      let ids=[];
      this.submitColumnData.filter(item=>{
        if(!!item.id&&item.id!='全部'){
          ids.push(item.id+'_'+item.activityCategory)
        }
      })
      console.log(ids,'submitColumnDataIds')
      return ids;
    }
  },
  mounted() {
    this.getSubmitColumn(); /** @description: 获取投稿栏目数据源 */
  },
  created() {
    // this.orgId =  this.currentUserInfo.unitId
  },
  methods: {
    /** @description: 开始统计 */
    submitForm() {
      if (!this.searchData.data) {
        this.$message.warning("请选择统计日期");
      } else if(!this.searchData.orgName) {
        this.$message.warning("请先选择报送机构");
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
        activityType: '全部',
        activityType1: '全部',
      }; /** @description: 清空表单的值 */
      this.orgName = '全部'
    },
    /** @description: 导出 */
    exportData() {
      exportTable.exportExcel("按活动类别统计表");
    },
    /** @description: 活动类别 */
    handleChange(current) {
      console.log(current,current=='全部','this.activityType1',this.activityType1,this.activityType1Id,'当前筛选项')
      if(current===undefined&&this.activityType1Id===undefined){
        current='全部'
      }else if(current===undefined){
        current=this.activityType1Id;
      }
      if(current=='全部'){
         this.searchData.activityType=this.submitColumnDataIds.toString();
         console.log(this.submitColumnDataIds,this.searchData.activityType)
      }else{
        this.activityType1Id=current;
        this.submitColumnData.filter(item=>{
        if(item.id==current){
          this.searchData.activityType=current+'_'+item.activityCategory;
        }
      })
      }
      console.log(current,this.searchData.activityType,'筛选')
    },
    /** @description: 获取投稿栏目数据源 */
    getSubmitColumn() {
      var org = this.searchData.orgCode?this.searchData.orgCode:""
      this.$api.duty
        .getSubmitColumnList({ draftOrganId: org })
        .then(res => {
          this.submitColumnData = res.orderList;
          this.submitColumnData.unshift({id: '全部', activityCategory: '全部'})
          //this.handleChange("全部")
          this.handleChange()
        });
      /** @description: this.$api.duty.getSubmitColumnData({ columnType: "1" }).then((res) => { */
      /** @description: this.submitColumnData = res.columnCategoryList; */
      /** @description: }); */
    },
    /** @description: 获取表格数据 */
    loadData() {
      this.$api.duty.columnTouList({ ...this.searchData }).then(res => {
        this.arr1 = res.acclist;

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
    /** @description: 选择机构 */
    selectOrg(org) {
      if(org.type == 2){
        this.orgName = org.unitName
      }
      /** @description: this.searchData.orgName = org.unitName; */
      this.$set(this.searchData, "orgName", org.unitName);
      this.$set(this.searchData, "orgCode", org.id);
      /** @description: this.searchData.orgCode = org.id; */
      this.searchData.unitCode = org.id;
      this.searchData.unitSearchName = "";
      this.searchData.flagType = 1;
      this.getSubmitColumn()
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
    }
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
}
.btn_list {
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 45%;
}
.duty_tid {
  margin-left: 20%;
  font-size: 14px;
  span {
    color: red;
    cursor: pointer;
  }
}
.phone_tid {
  margin-left: 40px;
  font-size: 14px;
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
