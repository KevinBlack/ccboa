/**
* create by yhk on 2022-6-6 10:50
* 类注释：
* 备注：
*/

<template>
  <div>
    <el-row class="mtJ20">
      <el-col>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="报告期">
                <div class="block">
                  <el-date-picker
                   style="width:92%"
                   v-model="ruleForm.statsDate"
                   align="right"
                   type="date"
                   :placeholder="statsDate"
                   value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="float:right">
              <el-form-item label="部门/机构" prop="unitCode">
                <el-select v-model="ruleForm.unitCode" multiple   style="width:100%" clearable>
                  <el-option
                    v-for="item in dataState"
                    :key="item.label"
                    :value="item.unitCode"
                    :label="item.unitName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
           </el-row>
            <el-row>
             <el-col :span="8">
              <el-form-item label="请假/备案" prop="type">
                <el-select v-model="ruleForm.type" multiple style="width:92%" clearable>
                  <el-option
                    v-for="item in record"
                    :key="item.label"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
               <el-col :span="8" style="float:right">
              <el-form-item label="合规提示" prop="tipType">
                <el-select v-model="ruleForm.tipType" multiple  style="width:100%" clearable>
                  <el-option
                    v-for="item in compliance"
                    :key="item.label"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
              <el-col class="arrowup" style="text-align:center;margin-bottom:10px;">
                <el-button type="primary" @click="submitForm">开始统计</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button style="float:right" type="primary" @click="toExcel">导出</el-button>
             </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col style="margin: 10px 0;">
        <m-table
          :isBorder="true"
          size="medium"
          :isIndex="true"
          :isPagination="false"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          v-loading="tableLoading"
          height='600px'
        ></m-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import Dialog from "@/views/dispatch/departDialog.vue";
import dateFormate from "@/util/filters.js";
import dispatchIndex from "@/minixs/dispatchIndex";
import exportTable from "@/minixs/exportTable";

export default {
  name: "reminder",
  components: {
    mTable,
    Dialog
  },
  mixins: [dispatchIndex,exportTable],
  data() {
    return {
      bgdata: "",
      nowyear: new Date().getFullYear(),
      nowmonth: new Date().getMonth() + 1,
      nowdate: new Date().getDate(),
      statsDate: "",
      ruleForm: {
        unitCode: "",
        type:"",
        tipType: "",
        statsDate: "",
      },
      ruleForms: {
        unitCode: "",
        type:"",
        tipType: "",
        statsDate: "",
      },
      draftOptions:[],
      date: "",
      dataState: [],
      record:[
       {
          value: '1',
          label: '请假'
        },
        {
          value: '2',
          label: '备案'
        },
        {
          value: '3',
          label: '请假/备案'
        }
      ],
      compliance:[
         {
          value: '1',
          label: '未在规定时间内提交请假备案申请'
        },
        {
          value: '2',
          label: '审批意见日期晚于出发日期'
        },
        {
          value: '3',
          label: '未履行休假前置程序【人力系统】'
        },
        {
          value: '4',
          label: '未履行因私出境前置程序【人力系统】'
        },
         {
          value: '5',
          label: '实际行程与申请行程不一致【差旅系统】'
        }
      ],
      tableLoading: false,
      tableData: [],
      tableCols: [
        { label: "报告期", prop: "statsDate", align: "center", width: "180px" },
        { label: "部门/机构", prop: "unitName", align: "center", width: "220px"},
        { label: "姓名", prop: "humanName", align: "center", width: "180px" },
        { label: "请假/备案", prop: "types", align: "center", minwidth:"40%" },
        { label: "合规提示", prop: "tipTypes", align: "center",width: "400px" },
      ]
    };
  },
  mounted() {
  },
  methods: {
    defaultDate(){
    let date=new Date()
    let year=date.getFullYear().toString()
    let month=date.getMonth()+1<10?'0'+(date.getMonth()+1).toString():(date.getMonth()+1).toString()
    let da=date.getDate()<10?'0'+date.getDate().toString():date.getDate().toString()
    let beg=year+'-'+month+'-'+da
    this.ruleForm.statsDate = beg
    this.ruleForms.statsDate = beg
    this.statsDate = beg
   },
    timeChange() {
      this.ruleForm.startDate = dateFormate.date(Date.parse(this.date[0]));
      this.ruleForm.endDate = dateFormate.date(Date.parse(this.date[1]));
    },
    submitForm(formName) {
      this.handleLoadData("0")
    },
    resetForm(formName) {
      this.defaultDate()
			this.ruleForm.unitCode = ""
			this.ruleForm.type = ""
			this.ruleForm.tipType = ""
      this.ruleForms.unitCode = ""
			this.ruleForms.type = ""
			this.ruleForms.tipType = ""
      this.$refs.ruleForm.resetFields();
    },
    toExcel(){
      exportTable.exportExcel(`主要负责人请假备案流程衔接合规提示${this.bgdata}`)
    }, 
    // 页面初始化加载数据
    handleLoadData() {
      if(this.ruleForm.type || this.ruleForm.unitCode || this.ruleForm.leaveType){
      if(this.ruleForm.type){
        this.ruleForms.type = this.ruleForm.type.join(",")
      }else{
        this.ruleForms.type = ''
      }
     if(this.ruleForm.unitCode){
        this.ruleForms.unitCode = this.ruleForm.unitCode.join(",")
      }else{
        this.ruleForms.unitCode = ''
      }
      if(this.ruleForm.tipType){
        this.ruleForms.tipType = this.ruleForm.tipType.join(",")
      }else{
        this.ruleForms.tipType = ''
      }
      }
      this.ruleForms.statsDate = this.ruleForm.statsDate
      this.$api.secreatary.activety.reminderDetails(
        {...this.ruleForms})
         .then(res=>{
           this.tableData = res.data
           this.bgdata = this.tableData[0].statsDate
        })
        },
  },
  created() {
     this.$api.secreatary.activety.leaveUnit({}).then(res=>{
     console.log(res)
     this.dataState = res.data
     })
     this.defaultDate()
    //  this.handleLoadData();
  }
};
</script>

<style lang="less" scoped>
.btn-writeEnDspc {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.btn-writeEnDspc:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
.mt20 {
  padding: 20px 10px 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.mtdown {
  padding: 20px 0 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.arrowup{
  padding-left: 20px;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
/deep/ .el-tabs__header {
  margin: 0 0 7px !important;
}
.mtJ20 {
  margin-top: -20px!important;
  .mt20end {
    margin-top: 20px;
    .sysTirp {
      margin-left: 20px;
      font-size: 12px;
      color: red;
    }
  }
}

</style>
