
<template>
  <div class="statisticsPage">
    <nav-article>
      <div class="formHeader">
        <el-form :inline="true">
          <el-form-item>
            <el-form-item label="统计类型">
              <el-radio-group v-model="radioType">
                <el-radio label="0">主办</el-radio>
                <el-radio label="1">独立承办</el-radio>
                <el-radio label="2">配合协办</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="统计跨度" label-width="120px">
              <el-radio-group v-model="all">
                <el-radio label="0">月份</el-radio>
                <el-radio label="1">季度</el-radio>
                <el-radio label="2">年度</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="统计时期" label-width="400px">
              <el-date-picker v-model="value2" type="month" placeholder="选择月"></el-date-picker>
            </el-form-item>
            <!-- <el-form-item> -->
            <el-col :span="16">
              <el-form-item label="统计相比">
                <el-radio-group v-model="patch">
                  <el-radio label="0">与上年同期相比</el-radio>
                  <el-radio label="1">与上年全年相比</el-radio>
                  <el-radio label="2">与上季度相比</el-radio>
                  <el-radio label="3">与上月相比</el-radio>
                </el-radio-group>

                <!-- </el-form-item> -->
              </el-form-item>
            </el-col>
            <el-col :span="4" style="text-align: right">
              <el-button type="primary" @click="searchForm">开始统计</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <div>
          <H4 style="width: 20%;margin-top: 18px;font-size: 22px">统计结果</H4>
          <div class="item_Btn">
            <el-button @click="exportData">导出</el-button>
            <el-button @click="exportReport">导出报告</el-button>
          </div>
        </div>
      </div>
      <div class="supperMain">
        <p class="supper">表头:</p>
        <p class="supper">统计日期:</p>
      </div>
      <div style="margin-top: 30px">
        <el-table :data="tableData" style="width: 100%">
          <div v-if="radioType=='0'">
             <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部门名称" width="150"></el-table-column>
          <el-table-column prop="date" label="主办件数(件)" width="150"></el-table-column>
          <el-table-column prop="date" label="已办结件数(件)" width="150"></el-table-column>
          <el-table-column prop="date" label="未办结件数" width="150"></el-table-column>
          <el-table-column prop="date" label="办结率" width="150"></el-table-column>
          <el-table-column prop="date" label="处理工作日(天)" width="150"></el-table-column>
          <el-table-column label="需要其他部门协办事项">
            <el-table-column prop="name" label="牵头件数(件)" width="120"></el-table-column>
            <el-table-column prop="name" label="已办结件数(件)" width="120"></el-table-column>
            <el-table-column prop="name" label="协办件数(件)" width="120"></el-table-column>
            <el-table-column prop="name" label="处理工作日(天)" width="120"></el-table-column>
            <el-table-column prop="name" label="协办反馈用时(天)" width="130"></el-table-column>
            <el-table-column prop="name" label="主办部门处理用时(天)" width="150"></el-table-column>
            <el-table-column prop="name" label="主办部门用时占比(天)" width="150"></el-table-column>
          </el-table-column>

          </div>
         
          <div v-if="radioType=='1'">
            <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="部门名称" width="150"></el-table-column>
          <el-table-column prop="date" label="主办件数(件)" width="150"></el-table-column>
          <el-table-column prop="date" label="已办结件数(件)" width="150"></el-table-column>
          <el-table-column prop="date" label="未办结件数" width="150"></el-table-column>
          <el-table-column prop="date" label="办结率" width="150"></el-table-column>
    
          </div>
        </el-table>
      </div>
      <p style="margin-top: 12px">说明:</p>
    </nav-article>
  </div>
</template>

<script type="text/ecmascript-6">
// import selectOrgOrDept from "components/select/selectOrgOrDept"
// import FdForm from "vue-elementui-freedomen/components/form";
export default {
  name: "statisticsPage",
  props: {},
  data() {
    return {
      radioType: "0",
      all: "",
      value2: "",
      patch: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  computed: {},
  methods: {
    exportData(){
                exportTable.exportExcel("会议预通知单");
            },
    exportReport(){

            },
     reset(){
      this.pagination = Object.assign({},{
        pagNum: 1,
        total: 0,
        limit:10
      });
      this.rangeTime = "";
      this.params = Object.assign({},{
        dateStart:"",
        dateEnd:"",
      })
    },
    searchForm() {
      if(!this.params.dateStart){
        this.$message({
          message:"请先选择统计日期",
          type:"warning",
          duration:2*1000
        })
        return false;
      }
      this.excelTime = this.getExcelTime();
      this.$post.postData('statistDeptSendType', JSON.stringify(this.params),this.$businessCode.fawgl).then((res) => {
        if(res.success){
          this.tableData = res.data
        }else{
          this.$message.closeAll();
          this.$message({
            message:"请求出错了",
            duration:2000,
            type:"error"
          })
        }
      }).catch(err=>{
        this.$message.closeAll();
        this.$message({
          message:"请求出错了",
          duration:2000,
          type:"error"
        })
      })
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  padding: 8px 70px;
}
.item_Btn {
  margin-top: -24px;
  text-align: right;
}
.supperMain {
  border-top: 1px solid #ccc;
  margin-top: 15px;
  font-size: 16px;
}
.supper {
  margin-top: 10px;
}
</style>

   
  