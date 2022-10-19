<template>
  <div class="AllWrapper wh100">
    <el-table :data="tableData" height="480" 
      :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}">
      <el-table-column width="50" type="index" :index="inedxMethod" align="center" label="序号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="draftTime" label="拟稿日期" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="documentNo" label="发文字号" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="title" label="标题" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="backTime" label="退文日期" align="center"></el-table-column>
      <!-- <el-table-column show-overflow-tooltip prop="wDay" label="平均处理时间" align="center"></el-table-column> -->
      <!-- <el-table-column show-overflow-tooltip prop="name" label="数据源" align="center"></el-table-column> -->
      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="getWaterFall(scope.row)">查看环节</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <waterFall :closeHandler="closeHandler" ref="waterFall" :processInstId="processInstIdRow"></waterFall>
  </div>
</template>
<script> 
  import {mapGetters,mapActions} from "vuex";
import waterFall from 'views/common/components/waterFall'
  export default {
    components:{
      waterFall
    },
    data(){
      return{
        closeHandler:false,
        processInstIdRow:"",
        tableData:[],
        page: 1, //当前页数
        limit: 10, //每页条数
        total: 0,
      }
    },
    computed:{
      ...mapGetters("efficiency",["baseParams"]),
    },
    methods:{
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
      initData(){
        //请求列表数据：TODO
       let postObj={
            function:'efflciencyBackOrderDetails',
            deptIds:this.baseParams.deptIds,
            year:this.baseParams.year,
            // timeType:'',
            quarter:this.baseParams.quarter,
            month:this.baseParams.month,
            page: this.page, //当前页数
            limit: this.limit, //每页条数
            totalCount:this.totalCount
        }
         this.$post    
        .postData(
          postObj.function,
          JSON.stringify(postObj),
          this.$businessCode.xnkb
        ).then(res => {
          console.log(res)
          if (res.success) {
            this.total = res.data.total;
            this.tableData = res.data.rows;
            this.tableData.forEach((item)=>{
              item.wDay = item.wDay+'天'
            })
            this.limit = res.data.pageSize;
          }
        })
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
    created(){
      this.initData();
    }
  }
</script>
<style lang="less" scoped>
  .AllWrapper{
    background-color: #03417E;
  }
  .wh100{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  /deep/.el-table{
    background-color:transparent;
    th,tr{
      background-color: transparent;
      color: #fff;
      font-weight: 700;
    }
  }
  /deep/.el-table td, 
  /deep/.el-table th{
    padding: 5px 0;
  }
  /deep/.el-table tr:hover td{
    background-color: transparent !important;
  }
  /deep/.el-table__header .cell{
    font-weight: bold;
    font-size: 14px;
  }
  /deep/.el-table td, 
  /deep/.el-table th.is-leaf{
    border-bottom: 0;
  }
  /deep/.el-table__body-wrapper{
    background-color: rgba(255, 255, 255, 0.1);
  }
  /deep/.el-table::before{
    height: 0;
  }
  /deep/.el-dialog__header {
  padding: 10px 20px 5px;
}
/deep/.el-dialog__body {
    padding-top: 1px;
}
</style>

