<template>
  <el-row>
    <el-form>
      <el-col :span="18">
        <el-form-item label="统计日期:">
          <el-date-picker
            @change="timeChange"
            v-model="rangeTime"
            value-format="yyyy-MM"
            style="width: 40%"
            size="small"
            type="monthrange"
            range-separator="至"
            start-placeholde="开始月份"
            end-placeholde="结束月份">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6" class="txtRight">
        <el-button type="primary" size="small" @click="handlerSearch">开始统计</el-button>
        <el-button type="primary" size="small" @click="reset">重 置</el-button>
      </el-col>
    </el-form>
    <table>
      <tr class="table-first">
        <td><h3 style="font-weight: bold;">统计结果</h3></td>
        <td class="txtRight"><el-button size="small" @click="exportExc" class="mrg-b-20">导 出</el-button></td>
      </tr>
    </table>
    <el-row class="el-table">
      <el-col :span="24" class="mrg-b-20">
        <table>
          <tr>
            <td>表头：办结发文数量统计表（按部门统计）</td>
            <td class="txtRight">计量单位：份</td>
          </tr>
          <tr>
            <td colspan="2">
              统计日期：{{excelTime}}<br />
              说明：<br />
              1.本统计为按自然月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。<br />
              2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="tableData"
          show-summary
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column label="办结发文数量统计表（按部门统计）" align="center">
            <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
            <el-table-column prop="unitName" label="部门名称" align="center"></el-table-column>
            <el-table-column prop="dzCou" label="电子发文" align="center"></el-table-column>
            <el-table-column prop="swCou" label="实物发文" align="center"></el-table-column>
            <el-table-column prop="talCou" label="小计" align="center"></el-table-column>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          @size-change="handleOnSizeChange"
          @current-change="handleOnCurrentChange"
          :current-page="pagination.pageNum"
          :page-sizes="[10,15,20,25]"
          :page-size="pagination.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination> -->
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import exportTable from "../../../minixs/exportTable";
export default {
  name: 'StcsByType',
  data () {
    return {
      tableData: [],
      rangeTime: '',
      params:{
        function:"statistDeptSendType",
        dateStart:"",
        dateEnd:"",
      },
      pagination: {
        pagNum: 1,
        total: 0,
        limit:20
      },
      excelTime:""
    }
  },
  methods: {
    reset(){
      this.pagination = Object.assign({},{
        pagNum: 1,
        total: 0,
        limit:10
      });
      this.rangeTime = "";
      this.params = Object.assign({},{
        dateStart:"",
        dateEnd:"",
      })
    },
    getExcelTime(){
      let start = this.params.dateStart.replace("-","年")+"月";
      let end = this.params.dateEnd.replace("-","年")+"月";
      let excelTime = start+"-"+end;
      return excelTime;
    },
    handlerSearch () {
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      if(!this.params.dateStart){
        this.$message({
          message:"请先选择统计日期",
          type:"warning",
          duration:2*1000
        })
        return false;
      }
      this.excelTime = this.getExcelTime();
      this.params.function = 'statistDeptSendType';
      this.$post.postData('statistDeptSendType', JSON.stringify(this.params),this.$businessCode.fawgl).then((res) => {
        if(res.success){
          this.tableData = res.data
        }else{
          this.$message.closeAll();
          this.$message({
            message:"请求出错了",
            duration:2000,
            type:"error"
          })
        }
      }).catch(err=>{
        this.$message.closeAll();
        this.$message({
          message:"请求出错了",
          duration:2000,
          type:"error"
        })
      })
    },
    timeChange(rangeTime) {
      if(!rangeTime||rangeTime=="null"||rangeTime=="undefined"){
        this.params.dateStart = "";
        this.params.dateEnd = "";
        return false;
      }
      this.params.dateStart = rangeTime[0]; 
      this.params.dateEnd = rangeTime[1];
    },
    handleOnSizeChange (val) {
      this.pagination.pagNum = 1;
      this.pagination.limit = val;
      this.pagination.total = 0;
      this.handlerSearch();
    },
    handleOnCurrentChange (val) {
      this.pagination.pagNum = val;
      this.pagination.total = 0;
      this.handlerSearch();
    },
    exportExc(){
      exportTable.exportExcel("办结发文数量统计表（按部门统计）",".el-table");
    }
    
  },
  created() {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
  }
}
</script>

<style lang="less" scoped>
.txtRight {
  text-align: right;
}
  table {
    border-collapse: collapse;
    width: 100%;
    line-height: 30px;
    .table-first {
      border-bottom: 1px solid #000000;
      padding-bottom: 10px;
    }
  }
  /deep/ thead tr:first-of-type{
    display: none !important;
  }
</style>
