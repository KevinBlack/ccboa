<template>
  <el-row>
    <el-form>
      <el-col :span="8">
        <el-form-item label="统计日期1:">
          <el-date-picker
            @change="timeChange1"
            v-model="rangeTime1"
            value-format="yyyy-MM"
            style="width:calc(100% - 100px)"
            size="small"
            type="monthrange"
            range-separator="至"
            start-placeholde="开始月份"
            end-placeholde="结束月份"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="统计日期2:">
          <el-date-picker
            @change="timeChange2"
            v-model="rangeTime2"
            value-format="yyyy-MM"
            style="width:calc(100% - 100px)"
            size="small"
            type="monthrange"
            range-separator="至"
            start-placeholde="开始月份"
            end-placeholde="结束月份"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="统计类型:">
          <el-radio-group v-model="params.statistType" @change="handleFormatTableColum">
            <el-radio label="0">按文种</el-radio>
            <el-radio label="1">按发文类型</el-radio>
            <el-radio label="2">按部门</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="txtRight" style="margin-bottom:5px;">
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
            <td>表头：发文正文字数情况统计表</td>
            <td class="txtRight">计量单位：份、%</td>
          </tr>
          <tr>
            <td colspan="2">
              统计日期1：{{excelTime1}}
              <br />统计日期2：{{excelTime2}}
              <br />说明：
              <br />1.本统计为按自然月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。
              <br />2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="24">
        <el-table 
          :data="tableData" 
          show-summary
          :summary-method="summation"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}">
          <el-table-column label="发文正文字数情况统计表" align="center">
            <el-table-column :show-overflow-tooltip="true" type="index" width="50" label="序号" align="center"></el-table-column>
            <el-table-column prop="tname" :label="tableColumFormat" align="center"></el-table-column>
            <el-table-column :label="'统计日期1（'+times1+'）'" align="center">
              <el-table-column label="文件数" prop="cou1" align="center"></el-table-column>
              <el-table-column label="平均字数" prop="avgsize1" align="center"></el-table-column>
            </el-table-column>
            <el-table-column prop="fileWordHead" :label="'统计日期2（'+times2+'）'" align="center">
              <el-table-column label="文件数" prop="cou2" align="center"></el-table-column>
              <el-table-column label="平均字数" prop="avgsize2" align="center"></el-table-column>
            </el-table-column>
            <el-table-column prop="zj" label="增减" align="center"></el-table-column>
            <el-table-column prop="fd" label="幅度" align="center"></el-table-column>
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
        </el-pagination>-->
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import exportTable from "../../../minixs/exportTable";
export default {
  name: "StcsByType",
  data() {
    return {
      tableData: [],
      rangeTime1: "",
      rangeTime2: "",
      params: {
        function: "statistSizeFact",
        dateStart: "",
        dateEnd: "",
        date2Start: "",
        date2End: "",
        statistType:"0",
      },
      pagination: {
        pagNum: 1,
        total: 0,
        limit: 20
      },
      times1: "",
      times2: "",
      excelTime1:"",
      excelTime2:"",

      tableColumFormat: "文种"
    };
  },
  methods: {
    handleFormatTableColum(e) {
      switch (e) {
        case "0":
          this.tableColumFormat = '文种'
          break;
        case "1":
          this.tableColumFormat = '发文类型'
          break;
        case "2":
          this.tableColumFormat = '部门'
          break;
      }
    },
    reset() {
      this.pagination = Object.assign(
        {},
        {
          pagNum: 1,
          total: 0,
          limit: 10
        }
      );
      this.rangeTime1 = this.rangeTime2 = "";
      this.params = Object.assign(
        {},
        {
          dateStart: "",
          dateEnd: "",
          date2Start: "",
          date2End: "",
          statistType:"0",
        }
      );
      this.times1 = this.times2 = "";
    },
    handlerSearch() {
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      if (!this.times1 || !this.times2) {
        this.$message({
          message: "请先选择统计日期1 和 统计日期2",
          type: "warning",
          duration: 3000
        });
        return false;
      }
      this.excelTime1 = this.times1;
      this.excelTime2 = this.times2;
      this.params.function = 'statistSizeFact';
      this.$post.postData('statistSizeFact', JSON.stringify(this.params),this.$businessCode.fawgl).then((res) => {
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
    timeChange1(rangeTime) {
      if (!rangeTime || rangeTime == "null" || rangeTime == "undefined") {
        this.params.dateStart = "";
        this.params.dateEnd = "";
        this.times1 = "";
        return false;
      }
      this.params.dateStart = rangeTime[0];
      this.params.dateEnd = rangeTime[1];
      this.times1 =
        rangeTime[0].replace("-", "年") +
        "月" +
        "-" +
        rangeTime[1].replace("-", "年") +
        "月";
    },
    timeChange2(rangeTime) {
      if (!rangeTime || rangeTime == "null" || rangeTime == "undefined") {
        this.params.date2Start = "";
        this.params.date2End = "";
        this.times2 = "";
        return false;
      }
      this.params.date2Start = rangeTime[0];
      this.params.date2End = rangeTime[1];
      this.times2 =
        rangeTime[0].replace("-", "年") +
        "月" +
        "-" +
        rangeTime[1].replace("-", "年") +
        "月";
    },
    summation(param){
      let {columns,data} = param;
      let sums =[];
      columns.forEach((column,index)=>{
        if(index==0){
          sums[index]='合计'
        }else if(index==1){
          sums[index]=''
        }else if(index<7){
          sums[index] = 0;
          const values = data.map(item=>{
            let num = Number(item[column.property]);
            if(!isNaN(num)){
              return num
            }else{
              return 0
            }
          });
          values.map(item=>{
            sums[index] += item;
          })
        }
      })
      let decimals = sums[6]/sums[3];
      if(!isNaN(decimals)){
        sums[7]= (decimals*100).toFixed(2) +"%"
      }else{
        sums[7] ="0%"
      }
      return sums
    },
    handleOnSizeChange(val) {
      this.pagination.pagNum = 1;
      this.pagination.limit = val;
      this.pagination.total = 0;
      this.handlerSearch();
    },
    handleOnCurrentChange(val) {
      this.pagination.pagNum = val;
      this.pagination.total = 0;
      this.handlerSearch();
    },
    exportExc() {
      exportTable.exportExcel("发文正文字数情况统计表",".el-table");
    },
  },
  created() {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
  },
  updated(){
    this.$nextTick(()=>{
      let elements = document.querySelectorAll(".el-table__footer-wrapper td");
      elements.forEach(item=>{
        item.setAttribute("rowspan","1");
      })
    })
  }
};
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
