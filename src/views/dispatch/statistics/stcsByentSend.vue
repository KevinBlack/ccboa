<template>
  <el-row>
    <el-form>
      <el-col :span="18">
        <el-form-item label="统计日期:">
          <el-date-picker
            @change="timeChange"
            v-model="rangeTime"
            format="yyyy-MM"
            value-format="yyyy-MM"
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
            <td>表头：实物发文统计表</td>
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
        <el-table
          :data="tableData"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column :show-overflow-tooltip="true" type="index" width="50" label="序号" align="center"></el-table-column>
          <el-table-column prop="redHead" label="制发单位名称" align="center"></el-table-column>
          <el-table-column prop="fileWordHead" label="加密发送数量" align="center"></el-table-column>
          <el-table-column prop="ownDepartment" label="非加密发送数量" align="center"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleOnSizeChange"
          @current-change="handleOnCurrentChange"
          :current-page="pagination.pageNum"
          :page-sizes="[10,15,20,25]"
          :page-size="pagination.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'StcsByType',
  data () {
    return {
      tableData: [],
      rangeTime: '',
      params:{
        function:"",
        startTime:"",
        endTime:"",
      },
      pagination: {
        pagNum: 1,
        total: 0,
        limit:10
      }
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
        startTime:"",
        endTime:"",
        type:"1"
      })
    },
    handlerSearch () {
      // 统计查询---- :TODO  
      // this.$post.postData('selectByPage', JSON.stringify(this.params),).then((res) => {
      //   this.tableData = res.data.rows
      // })
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
      //表格导出----:TODO

    }
  },
  created () {
    this.handlerSearch()
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
</style>
