<template>
  <el-row>
    <el-form>
      <el-col :span="12">
        <el-form-item label="统计日期:">
          <el-date-picker
            @change="timeChange"
            v-model="rangeTime"
            format="yyyy-MM"
            value-format="yyyy-MM"
            style="width:calc(100% - 250px)"
            size="small"
            type="daterange"
            range-separator="至"
            start-placeholde="开始月份"
            end-placeholde="结束月份">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="12">
        <el-form-item label="制发行:">
          <el-select v-model="params.bankId" style="width:calc(100% - 220px)" clearable>
            <el-option v-for="item in bankOptions" :key="item.unitId" :value="item.unitId" :label="item.unitName"></el-option>
          </el-select>
        </el-form-item>
      </el-col> -->
      <el-col :span="12">
        <el-form-item label="收文单位:">
          <el-input size="small" style="width:calc(100% - 310px)" readonly type="text" v-model="departmentName"></el-input>
          <el-button type="primary" size="small" @click="selectDepartment">选择</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="txtRight">
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
            <td></td>
            <td class="txtRight">计量单位：份、%</td>
          </tr>
          <tr>
            <td colspan="2">
              统计日期：2019年7月-2019年9月<br />
              说明：<br />
              1.收文数量：下级行收到上级行制发的文件总量。<br />
              2.平均办结时间：统计时间段内该单位每份文件办结时间的算术平均值。以工作日为标准，每跨过一次1:00或13:00，即加0.5天，不到1次即完成的计0天。<br />
              3.超过10天未办结数量：统计时间段内该单位超过10天未办结的文件数量。<br />
              4.10天内办结率=统计时间段内该单位10天内办结的文件数量/收文数量*100%。<br />
              5.合计：平均办理时间合计=所有单位收到上级行制发文件的办理时间总数/收到上级行制发文件总数。<br />
              10天内办结率合计：所有单位收到上级行制发文件10天内办结的文件总数/收到上级行制发文件总数*100%。<br />
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="24">
        <el-table
          :data="tableData"
          show-summary
          :summary-method="summation"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column label="下级行收文办理时间统计表" align="center">
            <el-table-column :show-overflow-tooltip="true" type="index" width="50" label="序号" align="center"></el-table-column>
            <el-table-column prop="redHead" label="收文单位" align="center"></el-table-column>
            <el-table-column prop="fileWordHead" label="收文数量" align="center"></el-table-column>
            <el-table-column prop="ownDepartment" label="平均办结时间" align="center"></el-table-column>
            <el-table-column prop="createTime" label="超过10天未办结数量" align="center"></el-table-column>
            <el-table-column prop="createTime" label="10天内办结率" align="center"></el-table-column>
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
    <treeCofig
      :treeData="treeData"
      :canTab="false"
      :hasRadio="false"
      dialogTit="选择单位"
      :singelCheckF="true"
      :dialogState="dialogState"
      :offenUse="false"
      @showCompDialog="showCompDialog"
    ></treeCofig>
  </el-row>
</template>

<script>
import treeCofig from "components/tree/tree-fawen";
import exportTable from "../../../minixs/exportTable";
export default {
  name: 'StcsByType',
  components:{
    treeCofig
  },
  data () {
    return {
      department_params: {
        function: "selUnitTreeByHQ",
        flag: true
      },
      dialogState:false,
      treeData:[],
      tableData: [],
      rangeTime: '',
      params:{
        function:"statistHandleTime",
        startTime:"",
        endTime:"",
        bankId:"",
        departmentId:""
      },
      bankOptions:[],
      departmentName:"",
      pagination: {
        pagNum: 1,
        total: 0,
        limit:10
      },
    }
  },
  methods: {
    //收文单位查询
    selectDepartment() {
      this.treeData = [];
      this.showCompDialog();
      this.$post.postData(
        "selUnitTreeByHQ",
        JSON.stringify(this.department_params),
        this.$businessCode.fawgl
      ).then(res => {
        this.treeData = (res && res.data) || [];
      });
    },
    //收文单位选择
    showCompDialog(data, status, type, params) {
      let that = this;
      let id = "";
      let departmentName = "";
      if (status) {
        if (data.length) {
          id = data[0].id;
          departmentName = data[0].name;
        } else {
          id = "";
          departmentName = "";
        }
        that.departmentName = departmentName;
        this.params.departmentId  = id;
        this.$forceUpdate();
      }
      this.dialogState = !this.dialogState;
    },
    reset(){
      this.pagination = Object.assign({},{
        pagNum: 1,
        total: 0,
        limit:10
      });
      this.rangeTime = "";
      this.departmentName = "";
      this.params = Object.assign({},{
        startTime:"",
        endTime:"",
        bankId:"",
        departmentId:""
      })
    },
    handlerSearch () {
      return false;
      this.$post.postData('statistHandleTime', JSON.stringify(this.params),this.$businessCode.fawgl).then((res) => {
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
    summation(param){
      let {columns,data} = param;
      let sums =[];
      columns.forEach((column,index)=>{
        if(index==0){
          sums[index]='合计'
        }else if(index==1){
          sums[index]=''
        }else if(index<5){
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
      let decimals = sums[3]/sums[2];
      if(!isNaN(decimals)){
        sums[5]= (decimals*100).toFixed(2) +"%"
      }else{
        sums[5] ="0%"
      }
      return sums

    },
    timeChange(rangeTime) {
      if(!rangeTime||rangeTime=="null"||rangeTime=="undefined"){
        this.params.statrTime = "";
        this.params.endTime = "";
        return false;
      }
      this.params.statrTime = rangeTime[0]; 
      this.params.endTime = rangeTime[1];
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
      exportTable.exportExcel("下级行收文办理时间统计表",".el-table");

    }
  },
  created () {
    this.bankOptions = JSON.parse(localStorage.getItem("unitInfo"))||[];
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
