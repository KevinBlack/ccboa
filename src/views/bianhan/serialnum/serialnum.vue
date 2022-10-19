<template>
  <div>
    <search-form class="mt20" @reset="reset" @submit="submit"
      :formData="searchData" :hasShow="hasShow" :formCfg="formCfg" :openshow="openshow">
      
      <el-col :span="8">
        <el-form-item label="机构">
          <el-col>
            <select-org-or-dept style="width:100%;"
              :orgOrDept="1" :orgOrDeptId="'1'" @select="selectOrg">
              <el-input suffix-icon="el-icon-arrow-down" type="text" readonly="readonly" placeholder="请选择" 
                v-model="currentSelectSearchdata"/>
            </select-org-or-dept>
          </el-col>
        </el-form-item>
      </el-col>

      <el-col :span="8">
         <el-form-item label="年度"><el-input type="text" v-model="searchData.yearNo"/></el-form-item>
      </el-col>

      <el-col :span="8">
         <el-form-item label="代字"><el-input type="text" v-model="searchData.firstDeptName"/></el-form-item>
      </el-col>
    </search-form>

    <el-button type="danger" @click="deleteForms" style="float: right;margin-top: -54px; margin-right: 20px;
    position: relative;
    z-index: 2;">删除</el-button>

    <m-table @refresh="loadData()" @cellClick="jumpdeal"
      :isSelection="true"
      @select="select"
      :isPagination="true" :isHandle="false"
      :searchData="searchData" :tableData="tableData" 
      :tableCols="tableCols" :pagination="pagination">
    </m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法

export default {
  name: "serialnum",
  components: {
    mTable,
    searchForm,
    selectOrgOrDept
  },
  mixins: [bianhanPublic],
  data() {
    return {
      hasShow:false,//查询条件不展示收起按钮
       openshow:true,
      /**查询默认机构名 */
      currentSelectSearchdata:JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
      yearNo:'',//查询条件年度
      firstDeptName:'',//查询条件代字
      searchData: {
        yearNo:'',
        firstDeptName:'',
      //unitName: JSON.parse(localStorage.getItem("userInfo")).shortUnitName,
        unitId: JSON.parse(localStorage.getItem("userInfo")).unitId
      },
      /**查询组件按钮 */
      formCfg: [
        [
          { type: "button-primary", prop: "$submit", value: "查询" },
          { type: "button", prop: "$reset", value: "重置" },
          {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-120px" }
          }
        ]
      ],
      /**表格数据 */
      tableData: [],
      /**表格表头 */
      tableCols: [
        { label: "机构", prop: "unitName" },
        { label: "代字", prop: "firstDeptName" },
        { label: "年度", prop: "yearNo" },
        { label: "流水号", prop: "fileNo" }
      ],
      /**表格分页信息 */
      pagination: {
        pageNum: 1,
        pageSize: 20
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
          .deleteSerialnum({ ids: this.selectIds})
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
    submit(params) {
      this.searchData = params;
      this.loadData();
    },
    reset() {
      this.searchData = {
        unitId: JSON.parse(localStorage.getItem("userInfo")).unitId,     
        yearNo:'',
        firstDeptName:''};
      this.currentSelectSearchdata=JSON.parse(localStorage.getItem("userInfo")).shortUnitName;
    },
    /**选择机构 */
    selectOrg(org) {
      this.currentSelectSearchdata=org.unitName;
      this.searchData.unitId = org.id;
      this.loadData();
    },
    loadData() {
      this.$api.bianhan
        .serialTable(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    jumpdeal(val) {
      var id = val.id;
      this.$router.push({
        name: "serialdeal",
        query: {
          id: val.id,
          humanUnit:val.humanUnit
        }
      });
    }
  },
  created() {
       let self=this;
       this.getOrgTree()
         .then(res => {
              let  orgTree=res.data;   
              //设置默认机构
              self.currentSelectSearchdata=orgTree[0].unitName;
              self.searchData.unitId = orgTree[0].unitCode;  
              //加载数据
              this.loadData();       
       });
  }
};
</script>
<style scoped lang="less"></style>
