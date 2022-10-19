/**
* create by zx on 2020-6-23 10:50
* 类注释：
* 备注：
*/
<template>
  <div>
    <el-row>
      <el-form :model="formData">
        <el-row style="padding: 12px 12px 0 20px;">
          <el-col :span="8">
            <el-form-item label="统计日期:">
              <el-date-picker
                v-model="formData.draftTime1"
                format="yyyy-MM"
                value-format="yyyy-MM"
                style="width:calc(100% - 100px)"
                size="small"
                type="monthrange"
                range-separator='-'
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
          <el-col :span="4" class="txtRight">
            <el-button type="primary" size="small" @click="loadData">开始统计</el-button>
            <el-button type="primary" size="small" @click="reset">重 置</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="txtRight" style="padding-right:12px">       
            <el-button size="small" @click="exportTables">导 出</el-button>
          </el-col>
        </el-row>
         <hr style="margin:20px 10px"/>
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

    <template>
      <div class="ces-table">
        <!------展示table------->
        <el-table
          :searchData="formData"
          :data="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :size="size"
          :border="isBorder"
          :header-cell-style="isHeaderStyle?isHeaderStyle:{background:'#eef1f6',color:'#3B85F0'}"
          id="table"
        >
          <el-table-column
            v-for="item in tableCols"
            :key="item.id"
            :prop="item.prop"
            :fixed="item.fixed"
            show-overflow-tooltip
            :label="item.label"
            :width="item.width"
            align="center"
          >
            <el-table-column
              v-for="c in item.child"
              :key="c.id"
              :prop="c.prop"
              :fixed="c.fixed"
              show-overflow-tooltip
              :label="c.label"
              :width="c.width"
              align="center"
            ></el-table-column>
          </el-table-column>
        </el-table>
        
          <!------打印table------->
        <el-table
          :searchData="formData"
          :data="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :size="size"
          :border="isBorder"
          v-show="false"
          id="tableforPrint"
        >
          <el-table-column align="center" :label="bankName">
            <el-table-column :label="tip" align="right">
              <el-table-column
                v-for="item in tableCols"
                :key="item.id"
                :prop="item.prop"
                :fixed="item.fixed"
                show-overflow-tooltip
                :label="item.label"
                :width="item.width"
                align="center"
              >
                <el-table-column
                  v-for="c in item.child"
                  :key="c.id"
                  :prop="c.prop"
                  :fixed="c.fixed"
                  show-overflow-tooltip
                  :label="c.label"
                  :width="c.width"
                  align="center"
                ></el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <!--    选择树-->
    <org-tree
      v-model="showOrgTree"
      :title="title"
      :seletSelf="seletSelf"
      :isSingle="isSingle"
      :orgOrDept="orgOrDept"
      :orgOrDeptId="orgOrDeptId"
      @orgList="getOrgList"
    ></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
//import mTable from "components/table/tTable";
import exportTable from "../../../minixs/exportTable";
import orgTree from "components/tree/shiwuOrgTree";

export default {
  name: "bianhanStatistics",
  components: {
    orgTree
  },
  data() {
    return {
      seletSelf:1,
      bankName: "",
      tip: "",
      title: "选择机构",
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: "1",
      formData: {
        curBank: '',
        draftOrganId:'' 
      },
      tableData: [],
      // 表头样式
      isHeaderStyle: false,
      size: "medium",
      isBorder: false,
      tableCols: [
        { label: "序号", prop: "index", child: [] },
        { label: "部门名称", prop: "draftDepartment", child: [] },
        { label: "制发单", prop: "zfNum", child: [] },
        {
          label: "承办单",
          child: [
            { label: "上级制发", prop: "szfNum" },
            { label: "本级制发", prop: "bzfNum" }
          ]
        },
        { label: "承办总数", prop: "ssum", child: [] }
      ],
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 20
      }
    };
  },
  mounted() {
    let month = "";
    let day = "";
    if (new Date().getMonth() + 1 < 10) {
      month = "0" + new Date().getMonth() + 1;
    }
    if (new Date().getDay() < 10) {
      day = "0" + new Date().getDay();
    }
    this.$set(this.formData, "curBank", JSON.parse(localStorage.getItem('userInfo')).shortUnitName);
    this.$set(this.formData, "draftOrganId", JSON.parse(localStorage.getItem('userInfo')).unitId);
    this.bankName = "便函統計情況表" + new Date().getFullYear() + month + day;
  },
  methods: {

    reset(){
       this.formData={};
       this.$set(this.formData, "curBank", JSON.parse(localStorage.getItem('userInfo')).shortUnitName);
      this.$set(this.formData, "draftOrganId", JSON.parse(localStorage.getItem('userInfo')).unitId);
    },
    //选择机构
    selectOrg() {
      this.title = "选择机构";
      this.isSingle = true;
      this.orgOrDept = 1;
      this.orgOrDeptId ='1';
      this.showOrgTree = true;
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == "1") {
        this.$set(this.formData, "curBank", org.unitName);
        this.$set(this.formData, "draftOrganId", org.id);
      }
    },
    loadData() {
      if (this.formData.draftTime1) {
        this.formData.draftBeginTime = this.formData.draftTime1[0] + "-01";
        let year = new Date(this.formData.draftTime1[1]).getFullYear();
        let month = new Date(this.formData.draftTime1[1]).getMonth() + 1;

        this.formData.draftEndTime =
          this.formData.draftTime1[1] +
          "-" +
          new Date(year, month, 0).getDate();

        this.tip =
          "统计日期：" +
          this.formData.draftBeginTime +
          "至" +
          this.formData.draftEndTime +
          "计量单位：份";
      } else {
        this.$message({
          message: "请先选择统计日期",
          type: "warning"
        });
        return false;
      }

      if(this.formData.draftOrganId==''){
        this.$message({
          message: "请先选择统计机构",
          type: "warning"
        });
        return false;
      }
      this.$api.bianhan
        .statistics(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          res.list[res.list.length - 1].draftDepartment = "合计";
          try{
            this.tableData = res.list.filter((item,index)=>{
              item.index=index+1;
              return item;
            });
          }catch(e){
            this.tableData = [];
          }
          
          console.log(this.tableData);
        });
    },
    exportTables() {
      if (this.tableData.length == 0) {
        return;
      }

      exportTable.exportExcel(this.bankName, "#tableforPrint", true);
    }
  },
  created() {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.el-card__body{
  padding: 15px;
}
.ces-table {
  border-radius: 5px;
  border: 1px solid #eee;
}
.el-input {
  width: 80%;
  margin-right: -50% !important;
}
</style>
