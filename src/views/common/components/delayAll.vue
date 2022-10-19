<template>
  <div class="AllWrapper wh100">
    <el-table :data="tableData" height="100%" 
      :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}">
      <el-table-column width="50" type="index" align="center" label="序号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="拟稿日期" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="发文字号" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="标题" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="发文日期" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="平均处理时间" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="数据源" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">查看环节</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script> 
  import {mapGetters,mapActions} from "vuex";
  export default {
    data(){
      return{
        tableData:[
          {name:"哈哈1"},
          {name:"哈哈1"},
          {name:"哈哈1"},
          {name:"哈哈1"},
          {name:"哈哈1"},
          {name:"哈哈1"}, 
          {name:"哈哈1"},
          {name:"哈哈1"},
        ],
      }
    },
    computed:{
      ...mapGetters("efficiency",["baseParams"]),
    },
    methods:{
      initData(){
        //请求列表数据：TODO
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

