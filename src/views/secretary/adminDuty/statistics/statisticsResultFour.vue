<!--
 * @Author: your name
 * @Date: 2020-08-07 10:47:44
 * @LastEditTime: 2020-08-07 10:49:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\secretary\adminDuty\statistics\statisticsResultFour.vue
--> 
<template>
  <div class="statisticsResultFour">
    <div class="btn_list">
      <el-button type="primary" @click="prev()">返回</el-button>
    </div>
    <div class="formHeader">
      <div class="title-text">按值班类型、值班人统计值班结果</div>
    </div>
    <div class='starttable'>
      <span>统计日期：{{$route.query.date1}} — {{$route.query.date2}}</span>
      <span>计量单位：/天</span>
    </div>
    <el-table
    :data="tableData"
    border
    style="width: 80%;margin:auto;">
    <el-table-column
      prop="num"
      label="序号"
      width="80px"
      align="center">
    </el-table-column>
    <el-table-column
      prop="scheduling"
      label="排班类型"
      align="center">
    </el-table-column>
    <el-table-column
      prop="dayshift"
      label="白班"
      align="center">
    </el-table-column>
    <el-table-column
      prop="nightshift"
      label="夜班"
      align="center">
    </el-table-column>
  </el-table>
  </div>
</template>

<script type="text/ecmascript-6">

    export default {
        name: "statisticsResultFour",
        components: {
            
        },
        props: {},
        data() {
            return {
                tableData: [
                    {num: "1", scheduling:"工作日期班",dayshift:"6",nightshift:"6"},
                    {num: "2", scheduling:"周末值班",dayshift:"4",nightshift:"4"},
                    {num: "3", scheduling:"节假日值班",dayshift:"3",nightshift:"3"},
                    {num: "4", scheduling:"工作日期班",dayshift:"4",nightshift:"4"},
                    {num: "5", scheduling:"工作日期班",dayshift:"1",nightshift:"1"}
                ],
            }
        },
        computed: {},
        methods: {
            loadData(){},
            prev(){
              this.$router.back();
            }
        },
        activated() {
        },
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
    padding: 8px 70px;
    .title-text {
      margin-bottom: 15px;
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
}
.btn_list{
    text-align: left;
  }
.starttable{
    width:80%;
    margin:auto;
    border:1px solid #eee;
    border-bottom:none;
    font-size: 14px;
    line-height: 50px;
    padding-left:20px;
    background:#10aafa;
    color:#fff;
    span{
        padding-right:20px;
    }
}
</style>