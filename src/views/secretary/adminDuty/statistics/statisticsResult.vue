<!--
&lt;!&ndash;
 * @Author: your name
 * @Date: 2020-08-06 10:04:31
 * @LastEditTime: 2020-11-12 22:30:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\secretary\adminDuty\statistics\statisticsResult.vue
&ndash;&gt;
<template>
  <div class="statisticsResult">
    <div class="formHeader">
      <div class="title-text">值班统计</div>
    </div>
    <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="统计类型">
    <el-checkbox-group v-model="form.type" >
      <el-checkbox label="按排班类型" name="type"></el-checkbox>
      <el-checkbox label="按值班类型" name="type"></el-checkbox>
      <el-checkbox label="按值班人" name="type"></el-checkbox>
    </el-checkbox-group>
    </el-form-item>
    <el-form-item label="排班周期">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">至</el-col>
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-form-item size="medium" class='bottombtn'>
    <el-button type="primary" @click="jumpResult()">开始统计</el-button>
    <el-button type="primary" @click="clearForm()">重写</el-button>
  </el-form-item>
  </el-form-item>

</el-form>
  </div>
</template>

<script type="text/ecmascript-6">


    export default {
        name: "statisticsResult",
        components: {
        },
        props: {},

        data() {
             return {
        form: {
          type: [],
          date1: '',
          date2: '',
        }
      }
        },
        computed: {},
        methods: {
          jumpResult(){
            let arr = this.form.type;
            let d1 = new Date(this.form.date1),
                d2 = new Date(this.form.date2);
            let date1 = d1.getFullYear() + '-' + ((d1.getMonth()+1)>10?(d1.getMonth()+1):'0'+(d1.getMonth()+1)) + '-' + (d1.getDate()>10?d1.getDate():'0'+d1.getDate()),
                date2 = d2.getFullYear() + '-' + ((d2.getMonth()+1)>10?(d2.getMonth()+1):'0'+(d2.getMonth()+1)) + '-' + (d2.getDate()>10?d2.getDate():'0'+d2.getDate());
            if(this.form.date1!==''&&this.form.date2!==''){
              if(arr.length==1 && arr[0]=='按排班类型'){
                this.$router.push({name:'statisticsResultOne',query:{date1:date1,date2:date2}});
              }else if(arr.length==1 && arr[0]=='按值班类型'){
                this.$router.push({name:'statisticsResultThree',query:{date1:date1,date2:date2}});
              }else if(arr.length==2 && arr[0]!=='按值班人' && arr[1]!=='按值班人'){
                this.$router.push({name:'statisticsResultTwo',query:{date1:date1,date2:date2}});
              }else if(arr.length==2 && arr[0]!=='按排班类型' && arr[1]!=='按排班类型'){
                this.$router.push({name:'statisticsResultFour',query:{date1:date1,date2:date2}});
              }else{}
            }
          },
          prev(){
            this.$router.back();
          },
          clearForm(){
            this.form={
              type: [],
              date1: '',
              date2: '',
            }
          }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
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
.el-form{
    border:1px solid #ccc;
    width:80%;
    margin:auto;
    padding: 2%;
}
.line{
    text-align: center;
}
.bottombtn{
    margin-top:35%;
    margin-left:30%
}
</style>

-->
<!--
 * @Author: your name
 * @Date: 2020-08-06 09:48:20
 * @LastEditTime: 2020-08-10 10:09:48
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
          end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" @click="loadData">查询</el-button>
        <!--<el-button type="primary" @click="prev()">返回</el-button>-->
        <!--<el-button type="primary">发送通知</el-button>-->
        <el-button type="primary" @click="exportT">导出excel</el-button>
      </el-col>
    </el-row>
    <div class="formHeader">
      <div class="title-text" v-if="data">{{data[0]}}到{{data[1]}}值班统计表</div>
      <div class="title-text" v-else>值班统计表</div>
    </div>
    <el-table
      id="table"
      :data="tableData"
      border
      style="width: 80%;margin:auto;">
      <el-table-column
        prop="ondutyHumanName"
        label="值班人员"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dutyWork"
        label="工作日值班次数"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dutyWeekend"
        label="周末值班次数"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dutyHoliday"
        label="节假日值班次数"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dutySpring"
        label="春节值班次数"
        width="300"
        align="center">
      </el-table-column>
    </el-table>
    <!-- <div class='endtable'>
       <span>排班时间：{{endData.date}}</span>
       <span>排班人：{{endData.name}}</span>
       <span>排班人电话：{{endData.tel}}</span>
     </div>-->
  </div>
</template>

<script type="text/ecmascript-6">

    // import exportTable from "../../../minixs/exportTable";

    export default {
        name: "dutySummary",
        components: {},
        props: {},
        data() {
            return {
                data: "",
                tableData: [],
                endData: {
                    date: '2020-6-25',
                    name: 'xx',
                    tel: '01012341234'
                }
            }

        },
        computed: {},
        methods: {
            exportT() {
                if (this.tableData.length > 0)
                    exportTable.exportExcel(this.data[0] + '到' + this.data[1] + "值班统计表")
            },
            getData(date) {
                return formatData(date, "YYYY-MM-DD")
            },
            prev() {
                this.$router.back();
            },
            loadData() {
                this.$api.secreatary.dutyWork.getDutyStatistic({
                    startDateStr: this.data[0],
                    endDateStr: this.data[1]
                }).then(res => {
                    this.tableData = res.data
                })
            }
        },
        created() {

        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
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
