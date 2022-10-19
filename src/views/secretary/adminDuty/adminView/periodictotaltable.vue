<!--
 * @Author: your name
 * @Date: 2020-08-06 09:48:20
 * @LastEditTime: 2021-01-15 10:40:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\secretary\adminDuty\dutySummary.vue周期值班表汇总
-->
<template>
    <div class="dutySummary">
      <el-row :gutter="10" style="margin-left: 10%">
        <el-col :span="8">
          <el-date-picker
            style="width:100%"
            v-model="data"
            type="daterange"
            range-separator="-"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" @click="loadData">查询</el-button>
          <!--<el-button type="primary" @click="prev()">返回</el-button>-->
          <!--<el-button type="primary">发送通知</el-button>-->
          <el-button type="primary" @click="exportT">导出excel</el-button>
        </el-col>
      </el-row>
      <div class="formHeader">
        <div class="title-text" v-if="data">{{data[0]}}到{{data[1]}}值班汇总表</div>
        <div class="title-text" v-else>周期值班汇总表</div>
      </div>
      <el-table id="table" :data="tableData" border style="width: 80%;margin:auto;">
        <el-table-column prop="week,date" label="日期" width="180" align="center">
          <template slot-scope="scope">
            {{getData(scope.row.dutyDate)}}
            <br />
            {{scope.row.weekDay}}
          </template>
        </el-table-column>
        <el-table-column label="白班" width="300" align="center">
          <template slot-scope="scope">
            <span
              style="margin-left: 10px"
              :class="[scope.row.feedBackFlag.split(',')[1]==='2'?'wrap1':'wrap']"
            >{{ scope.row.lightMan }}</span>
          </template>
        </el-table-column>
        <el-table-column label="夜班" width="300" align="center">
          <template slot-scope="scope">
            <span
              style="margin-left: 10px"
              :class="[scope.row.feedBackFlag.split(',')[0]==='2'?'wrap1':'wrap']"
            >{{ scope.row.nightMan }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      </el-table>
      <!-- <div class='endtable'>
        <span>排班时间：{{endData.date}}</span>
        <span>排班人：{{endData.name}}</span>
        <span>排班人电话：{{endData.tel}}</span>
      </div>-->
    </div>
  </template>
  
  <script>
  import exportTable from "@/minixs/exportTable";
  
  export default {
    name: "dutySummary",
    components: {},
    props: {},
    data() {
      return {
        data: "",
        tableData: [],
        endData: {
          date: "2020-6-25",
          name: "xx",
          tel: "01012341234",
        },
      };
    },
    computed: {},
    methods: {
      exportT() {
        if (this.tableData.length > 0)
          exportTable.exportExcel(
            this.data[0] + "到" + this.data[1] + "值班统计表"
          );
      },
      getData(date) {
        return formatData(date, "YYYY-MM-DD");
      },
      prev() {
        s;
        this.$router.back();
      },
      loadData() {
        let startDateStr = "";
        let endDateStr = "";
        console.log("d", this.data);
        if (this.data) {
          startDateStr = this.data[0];
          endDateStr = this.data[1];
        }
        this.$api.secreatary.dutyWork
          .getlistDutyNotice({
            startDateStr: startDateStr,
            endDateStr: endDateStr,
          })
          .then((res) => {
            this.tableData = res.data;
          });
      },
    },
    created() {
        this.loadData()
    },
  };
  </script>
  
  <style scoped lang="less" rel="stylesheet/less">
  .wrap {
    color: black;
  }
  .wrap1 {
    color: green;
  }
  .formHeader {
    .title-text {
      font-size: 30px;
      line-height: 75px;
      color: #409eff;
      font-weight: 600;
      text-align: center;
    }
  }
  
  .btn_list {
    text-align: left;
  }
  
  .el-table-column {
    color: #000;
  }
  
  .endtable {
    width: 80%;
    margin: auto;
    border: 1px solid #eee;
    border-top: none;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
  
    span {
      padding-right: 20px;
    }
  }
  </style>
  