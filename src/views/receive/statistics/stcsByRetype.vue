<template>
  <el-row>
    <el-col>
      <el-row class="search_stcs">
        <el-form>
          <el-col :span="18">
            <el-form-item label="统计日期:">
              <el-date-picker
                v-model="stcsData"
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
            <el-button type="primary" size="small">开始统计</el-button>
            <el-button type="primary" size="small">重 置</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-col>
    <el-col :span="24" class="mrg-b-20">
      <table>
        <tr class="table-first">
          <td><h3 style="font-weight: bold;">统计结果</h3></td>
          <td class="txtRight"><el-button size="small" class="mrg-b-20">导 出</el-button></td>
        </tr>
        <tr>
          <td>表头：按收文类型统计</td>
        </tr>
        <tr>
          <td>
            统计日期：2019年7月-2019年9月<br />
            说明：<br />
            1.本统计为按自然月进行统计，例如：统计区间为1月至6月，则统计1月1日至6月30日的数据。<br />
            2.如需要本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据。例如：统计区间为1月至本月，统计日为本月10日，则统计1月1日至本月9日的办结数据和1月1日至本月10日的流转数据。<br />
            3.境内：包括境内下级分行，境内子公司<br />
            4.境外：包括海外机构（海外分行+境外子公司+代表处）
          </td>
        </tr>
      </table>
    </el-col>
    <el-col :span="24" v-if="HQ">
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        style="width: 100%;"
      >
        <el-table-column label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="redHead" label="承办部门" align="center"></el-table-column>
        <el-table-column prop="fileWordHead" label="按收文类型统计" align="center">
          <el-table-column label="行外收文" align="center">
            <el-table-column label="审计机构来文（件）" align="center"></el-table-column>
            <el-table-column label="下级机构来文" align="center">
              <el-table-column label="境内（件）" align="center"></el-table-column>
              <el-table-column label="境外（件）" align="center"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="行内收文（件）" align="center"></el-table-column>
          <el-table-column label="合计（件）" align="center"></el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleOnSizeChange"
        @current-change="handleOnCurrentChange"
        :current-page="pageNum"
        layout="total, prev, pager, next"
        :total="totalNum">
      </el-pagination>
    </el-col>
    <el-col :span="24" v-if="HQ">
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        style="width: 100%;"
      >
        <el-table-column prop="redHead" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="redHead" label="承办部门" align="center"></el-table-column>
        <el-table-column prop="fileWordHead" label="按收文类型统计" align="center">
          <el-table-column label="行外收文" align="center">
            <el-table-column label="审计机构来文（件）" align="center"></el-table-column>
            <el-table-column label="下级机构来文" align="center">
              <el-table-column label="境内（件）" align="center"></el-table-column>
              <el-table-column label="境外（件）" align="center"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="行内收文（件）" align="center"></el-table-column>
          <el-table-column label="合计（件）" align="center"></el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleOnSizeChange"
        @current-change="handleOnCurrentChange"
        :current-page="pageNum"
        layout="total, prev, pager, next"
        :total="totalNum">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
export default {
    // 按收文类型统计
  name: 'StcsRecordType',
  data () {
    return {
      pageNum: 1,
      pageSize: 15,
      totalNum: 100,
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      stcsData: '',
      HQ: true,
      BR: false
      
    }
  },
  methods: {
    handleLoadData () {
      // this.$post.postData('selectByPage', JSON.stringify(this.referForm)).then((res) => {
      //   this.tableData = res.data.rows
      // })
    },
    handleOnSizeChange (val) {
      this.pageSize = val
    },
    handleOnCurrentChange (val) {
      this.pageNum = val
    }
  },
  created () {
    this.handleLoadData()
  }
}
</script>

<style lang="less" scoped>
.search_stcs {
  border: 1px solid #EBEEF5;
  padding: 20px 20px 0 20px;
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
</style>
