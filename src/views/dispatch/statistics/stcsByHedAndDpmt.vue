<template>
  <el-row>
    <el-form>
      <el-col :span="18">
        <el-form-item label="统计日期:">
          <el-date-picker
            @change="timeChange"
            v-model="rangeTime"
            value-format="yyyy-MM-dd"
            style="width: 40%"
            size="small"
            type="daterange"
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
            <td>表头：办结发文数量统计表（按部门/代字统计）</td>
            <td class="txtRight">计量单位：份</td>
          </tr>
          <tr>
            <td colspan="2">
              统计日期：2019年7月-2019年9月<br />
              说明：<br />
              1.本统计为按自然月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。<br />
              2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="24">
        <el-scrollbar style="width:100%">
          <div class="tableWrap">
            <el-table :data="tableData" 
              show-summary
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
              <el-table-column label="办结发文数量统计表（按部门/代字统计）" align="center">
                <el-table-column v-for="item in titleList " :prop="item.name" :label="item.name" :key="item.id"
                align="center"></el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
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
      setWidthFlag:false, // false:尚未动态设置tableWrap宽度；true:已设置
      tableData: [],
      rangeTime: '',
      params:{
        function:"statistReadHeadDept",
        dateStart:"",
        dateEnd:"",
      },
      pagination: {
        pagNum: 1,
        total: 0,
        limit:10
      },
      titleList:[]
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
    handlerSearch () {
      this.$post.postData('statistReadHeadDept', JSON.stringify(this.params),this.$businessCode.fawgl).then((res) => {
        if(res.success){
          this.titleList = res.data.column;
          this.setTableWidth();
          this.$nextTick(()=>{
            this.tableData = res.data.data
          }) 
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
       exportTable.exportExcel("办结发文数量统计表（按部门/代字统计）",".el-table");
    },
    setTableWidth(){
      if(this.setWidthFlag){
        return ;
      }
      let table_width =  (this.titleList.length)*80 +100;
      let target = document.querySelector(".tableWrap");
      let wrap_width = target.offsetWidth;
      if(table_width>wrap_width){
        this.setWidthFlag = true;
        target.style.width = table_width+"px";
      }
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
      line-height: 60px;
      border-bottom: 1px solid #000000;
      padding-bottom: 10px;
    }
  }
  /deep/ thead tr:first-of-type{
    display: none !important;
  }
</style>
