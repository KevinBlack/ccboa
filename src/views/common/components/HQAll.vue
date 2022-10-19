<template>
  <div class="AllWrapper wh100" style="min-height:600px">
    <el-col :span="24" class="deptTabs">
      <el-tabs v-model="typeFW" @tab-click="tabsClickDEPT_FW" style="height:30px">
        <el-tab-pane label="未办结" name="todoFW"></el-tab-pane>
        <el-tab-pane label="已办结" name="doneFW"></el-tab-pane>
        <el-row>
          <el-table
            :data="tableData"
            height="480"
            :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}"
          >
            <el-table-column width="50" type="index" :index="inedxMethod" align="center" label="序号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="draftTime" label="拟稿日期" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="documentNo" label="发文字号" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="title" label="标题" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip :prop="typeFW=='doneFW'?'finishTime':'draftTime'" :label="typeFW=='doneFW'?'办结日期':'会签日期'" align="center"></el-table-column>
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
            :page-size="postObj.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="postObj.total"
          ></el-pagination>
              <waterFall :closeHandler="closeHandler" ref="waterFall" :processInstId="processInstIdRow"></waterFall>
        </el-row>
      </el-tabs>
    </el-col>
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
      typeFW: "doneFW",
      postObj: {
        total: 0,
        state: sessionStorage.getItem('XNKBTABHQ')||1,
        page: 1, //当前页数
        limit: 10, //每页条数
      }
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
      let curpage = this.postObj.page;
      let limitpage = this.postObj.limit;
      return (index+1) + (curpage-1)*limitpage
    },
    initData() {
      let params = Object.assign(this.postObj,this.baseParams);
      params.function= "efflciencySignOrderDetails";
      params.state == '0'?this.typeFW = 'todoFW':this.typeFW='doneFW'
      //请求列表数据：TODO
      this.$post
        .postData(
          this.postObj.function,
          JSON.stringify(this.postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.tableData = res.data.rows;
            this.tableData.forEach((item)=>{
              item.wDay = item.wDay+'天'
            })
            this.postObj.total = res.data.total;
            this.postObj.limit = res.data.pageSize;
          }
        });
    },
    tabsClickDEPT_FW(tab) {
      this.postObj.page = 1;
      //本部门-发文处理时间列表查询:TODO
      console.log("fTAB", tab);
      this.postObj.state = tab.index;
      this.initData();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.postObj.limit = val;
      this.initData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.postObj.page = val;
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
/deep/.el-tabs__item {
  color: aliceblue;
}
/deep/ .el-tabs__item.is-active{
  color: #409EFF;
  font-weight: 600;
}
/deep/.el-dialog__header {
  padding: 10px 20px 5px !important;
}
/deep/.el-dialog__body {
    padding-top: 1px !important;
}
</style>

