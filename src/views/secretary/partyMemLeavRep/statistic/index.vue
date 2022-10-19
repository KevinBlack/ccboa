
<template>
  <div class="container">
    <div class="title">
      党委成员离京报告统计
    </div>
    <el-form label-width="80px" :model="searchData" ref="searchData">
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始时间" prop="ljStartTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="searchData.ljStartTime" style="width: 100%;" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="ljEndTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="searchData.ljEndTime" style="width: 100%;" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="searchData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地点" prop="address">
            <el-input v-model="searchData.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="onLoad">开始统计</el-button>
      <el-button type="primary" @click="onClear">重置</el-button>
    </div>
    <div class="exportExcel">
      <el-button type="primary" @click="downLoad()">导出</el-button>
    </div>
    <mTable
      ref="PersonTable"
      id="table"
      :isIndex="true"
      @refresh="loadD"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></mTable>
  </div>
</template>
<script type="text/ecmascript-6">
  import mTable from "components/table/tTable";
  import exportTable from "@/minixs/exportTable";
  export default {
    components: {
      mTable
    },
    data(){
      return{
        searchData: {
          ljStartTime: '',
          ljEndTime: '',
          name: '',
          address: ''
        },
        pagination: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        tableCols: [
          { label: "姓名", prop: "name" },
          { label: "出差地点", prop: "address" },
          { label: "次数", prop: "num" }
        ],
        tableData: []
      }
    },
    methods:{
      downLoad() {
        // console.log(this.tableData)
        // if (!this.tableData.length) {
        //   return;
        // }
        exportTable.exportExcel("统计结果",'#table',true);
      },
      loadD() {
        this.$api.secreatary.partyMemLeavRep.getMemLeavRepListByStatistic(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        }).then(res => {
          if (res.code === 'SUCCESS') {
            this.tableData = res.data
            this.pagination.total = res.total ?　res.total : 0
          }
        }).catch(() => {
          console.log('error')
        })},
      onLoad(){
        this.pagination.pageNum = 1
        this.loadD()
      },
      onClear(){
        this.$refs.searchData.resetFields()
      },
      openNewWindow(path, query) {
        if (query) {
          let { href }= this.$router.resolve({
            path: path, //"/secretary/partyMemLeavRep/detail",   // 这里写的是要跳转的路由地址
            query: query //{id:'1111'}  // 这里写的是页面参数
          });
          window.open(href, '_blank');
        } else {
          let { href }= this.$router.resolve({
            path: path, //"/secretary/partyMemLeavRep/detail",   // 这里写的是要跳转的路由地址
          });
          window.open(href, '_blank');
        }
      }
    },
    created() {
      this.loadD()
    }
  }
</script>

<style scoped lang="less">
  .container{
    .title{
      width: 100%;
      height: 70px;
      color: #2b66e3;
      text-align: center;
      font-size: 36px;
    }
    .btn{
      margin-top: 10px;
      margin-left: 500px;
    }
  }

</style>
<style lang="less">
  .exportExcel{
    text-align: right;
    margin-bottom: 10px;
  }
  .badgeItem{
    .el-badge__content--primary{
      line-height: initial;
    }
  }
</style>
