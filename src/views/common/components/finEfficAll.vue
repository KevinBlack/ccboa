<template>
  <div class="AllWrapper wh100">
    <el-table
      :data="tableData"
      height="480"
      :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}"
    >
      <el-table-column width="50" :index="inedxMethod" type="index" align="center" label="序号"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-if="this.efficeType!='3'"
        prop="undertake_start_time"
        label="承办日期"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-else 
        prop="create_time"
        label="协办日期"
        align="center"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="document_code" label="收文字号" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="title" label="标题" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="undertake_end_time" label="办结日期" align="center"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="undertake_dispose_duration"
        label="处理时间"
        align="center"
      ></el-table-column>
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
      postObj: {
        function: "selectSelfDept_all_bj_wbj",
        state: 1,
        page: 1, //当前页数
        limit: 10, //每页条数
        total: 0
      }
    };
  },
  computed: {
    ...mapGetters("efficiency", ["baseParams", "efficeType"])
  },
  methods: {
    getWaterFall(row){
      this.processInstIdRow = row.processInstId;
      this.closeHandler = true;
      this.$nextTick(() => {
        this.$refs.waterFall.openDialog();
      });
    },
    initData() {
      if (this.efficeType!='4') {
        this.init();
      }else{
        this.initMeet();
      }
    },
    inedxMethod(index){
      let curpage = this.postObj.page;
      let limitpage = this.postObj.limit;
      return (index+1) + (curpage-1)*limitpage
    },
    initMeet(){//会议纪要列表.
      let params = Object.assign(this.postObj,this.baseParams);
      params.state = '1';
      params.function = "efflciencyMeetingSummaryDetails";
      this.$post
        .postData(
          this.postObj.function,
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          if(res.success){
            res.data.rows.forEach(element => {
              element.undertake_dispose_duration +='天'
            })||[];
            this.tableData = res.data.rows;
            this.postObj.total = res.data.total;
            this.postObj.limit = res.data.pageSize;
          }
          
        });
    },
    init(){ //请求列表数据：TODO
      let params = Object.assign(this.postObj,this.baseParams);
          params = Object.assign(params,{curNodeCode:'800'});
      switch (this.efficeType) {
        case "1":
          params.function = "selectSelfDept_all_bj_wbj_all";
          break;
        case "2":
          params.function = "selectSelfDept_undertake_bj_wbj_all";
          break;
        case "3":
          params.function = "selectSelfDept_help_bj_wbj_all";
          break;
      }
      this.$post
        .postData(
          this.postObj.function,
          JSON.stringify(params),
          this.$businessCode.xnkb
        )
        .then(res => {
          console.log(res);
          if(res.success){
            res.data.rows.forEach(element => {
              element.undertake_dispose_duration +='天'
            })||[];
            this.tableData = res.data.rows;
            this.postObj.total = res.data.total;
            this.postObj.limit = res.data.pageSize;
          }
        });
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
  created() {},
  mounted() {
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

