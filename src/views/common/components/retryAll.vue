<template>
  <div class="AllWrapper wh100">
    <el-table
      :data="tableData"
      height="480"
      :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}"
    >
      <el-table-column width="50" :index="inedxMethod" type="index" align="center" label="序号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="draftTime" label="拟稿日期" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="documentNo" label="发文字号" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="title" label="标题" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="sendTime" label="重发文日期" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="wDay" label="处理时间" align="center"></el-table-column>
      <!-- <el-table-column show-overflow-tooltip prop="name" label="数据源" align="center"></el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="getWaterFall(scope.row)">查看环节</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]" 
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <waterFall :closeHandler="closeHandler" ref="waterFall" :processInstId="processInstIdRow"></waterFall>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import waterFall from 'views/common/components/waterFall'
export default {
  components:{
    waterFall
  },
  data() {
    return {
      closeHandler:false,
      processInstIdRow:"",
      tableData: [],
      page: 1, //当前页数
      limit: 10, //每页条数
      total: 0
    };
  },
  computed: {
    ...mapGetters("efficiency", ["baseParams"])
  },
  methods: {
    getWaterFall(row){
      this.processInstIdRow = row.processInstId;
      this.closeHandler = true;
      this.$nextTick(() => {
        this.$refs.waterFall.openDialog();
      });
    },
    inedxMethod(index){
      let curpage = this.page;
      let limitpage = this.limit;
      return (index+1) + (curpage-1)*limitpage
    },
    initData() {
      //请求列表数据：TODO
      // this.tableData = [
      //   {"processInstId":"1",
      //   "documentNo":"建皖函〔2021〕号",
      //   "rownum_":1,
      //   "draftTime":"2021-01-05 14:23:39",
      //   "id":"49b2704400284777ab83510d787b357b","title":"0105测试z02（查重）",
      //   "backTime":"2021-01-05 15:47:13","backDept":"办公室"},
      //   {"processInstId":"2","documentNo":"建皖函〔2021〕号","rownum_":2,
      //   "draftTime":"2021-01-06 17:09:46","id":"c523ff94dccf405b9aa986174f5d6bbd",
      //   "title":"0106测试z05","backTime":"2021-01-06 17:21:26","backDept":"办公室"},
      //   {"processInstId":"3","documentNo":"建皖函〔2021〕号","rownum_":3,"draftTime":"2021-01-07 13:46:20","id":"5a3a21a2d9184a61bcd91791698c10a3","title":"0107测试z01","backTime":"2021-01-07 14:37:00","backDept":"办公室"},{"documentNo":"建皖函〔2021〕号","rownum_":4,"draftTime":"2021-01-07 13:46:20","id":"51a5db24001345ccaf47bad2dcf30bbc","title":"0107测试z01","backTime":"2021-01-07 14:40:27","backDept":"办公室"},{"documentNo":"建皖函〔2021〕号","rownum_":5,"draftTime":"2021-01-08 10:07:15","id":"14cb153613c64c4ba4bbe8e9987abb4d","title":"0108测试z01","backTime":"2021-01-08 10:41:11","backDept":"办公室"},{"documentNo":"建皖函〔2021〕号","rownum_":6,"draftTime":"2021-01-09 10:46:16","id":"f2399970ec7b4cd18a5d1496dede6101","title":"0109测试z01（正文）","backTime":"2021-01-11 15:06:45","backDept":"办公室"},{"documentNo":"建皖函〔2021〕号","rownum_":7,"draftTime":"2021-01-12 14:11:21","id":"f928897ea1884c738cc954a3a79b4bbb","title":"0112测试z02","backTime":"2021-01-12 14:51:46","backDept":"办公室"},{"documentNo":"建皖函〔2021〕号","rownum_":8,"draftTime":"2021-01-13 20:13:40","id":"2d32a8ae2d80431b9b615b340420bd41","title":"0113测试z08（发文流程）","backTime":"2021-01-13 20:20:00","backDept":"办公室"},{"documentNo":"建皖函〔2021〕号","rownum_":9,"draftTime":"2021-01-13 20:13:40","id":"26fc613703944d59894ed512214d3811","title":"0113测试z08","backTime":"2021-01-13 20:49:22","backDept":"办公室"},{"documentNo":"建皖函〔2021〕号","rownum_":10,"draftTime":"2021-01-16 10:26:50","id":"ef4efc6a34a84a89be81a2d767168786","title":"0116测试z01","backTime":"2021-01-19 20:51:25","backDept":"办公室"}]
      // return
      let postObj = {
        function: "efflciencyAgainOrderDetails",
        deptIds: this.baseParams.deptIds,
        year: this.baseParams.year,
        // timeType:'',
        quarter: this.baseParams.quarter,
        month: this.baseParams.month,
        page: this.page, //当前页数
        limit: this.limit, //每页条数
        totalCount: this.totalCount
      };
      this.$post
        .postData(
          postObj.function,
          JSON.stringify(postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.tableData = res.data.rows;
            this.tableData.forEach((item)=>{
              item.wDay = item.wDay+'天'
            })
            this.total = res.data.total;
            this.limit = res.data.pageSize;
          } else {
            this.tableData = [];
          }
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.initData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.initData();
    }
  },
  created() {
    this.initData();
  }
};
</script>
<style lang="less" scoped>
.AllWrapper {
  background-color: #03417e;
}
.wh100 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
/deep/.el-table {
  background-color: transparent;
  th,
  tr {
    background-color: transparent;
    color: #fff;
    font-weight: 700;
  }
}
/deep/.el-table td,
/deep/.el-table th {
  padding: 5px 0;
}
/deep/.el-table tr:hover td {
  background-color: transparent !important;
}
/deep/.el-table__header .cell {
  font-weight: bold;
  font-size: 14px;
}
/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border-bottom: 0;
}
/deep/.el-table__body-wrapper {
  background-color: rgba(255, 255, 255, 0.1);
}
/deep/.el-table::before {
  height: 0;
}
/deep/.el-dialog__header {
  padding: 10px 20px 5px;
}
/deep/.el-dialog__body {
    padding-top: 1px;
}
</style>

