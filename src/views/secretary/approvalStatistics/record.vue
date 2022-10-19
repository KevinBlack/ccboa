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
          :model="ruleForms"
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
                <el-select v-model="ruleForm.unitCode" multiple style="width:100%" clearable>
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
                <el-select v-model="ruleForm.type" multiple  style="width:92%" clearable>
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
              <el-form-item label="请假备案事项" prop="leaveType">
                <el-select v-model="ruleForm.leaveType"  multiple style="width:100%" clearable>
                  <el-option
                    v-for="item in proceeding"
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
                <el-button style="float:right" type="primary"  v-preventClick @click="toExcel">导出</el-button>
             </el-col>
          </el-row>
        </el-form>
      </el-col>
          <div style="line-height: 1.4;font-size: 15px;padding: 14px 12px 0 8px;clear: both;">
          <div>统计说明:</div>
          <div>主要负责人请假备案信息统计:</div>
          <div style="margin-bottom:6px">
            {{nowyear}}年{{nowmonth}}月{{nowdate}}日,总行部门、一级分行等部门和机构主要负责人共请假备案{{leaveInfo.leaveCountTotal}}人,其中境内出差{{leaveInfo.inboundBusinessCount}}人,境外出差{{leaveInfo.outboundBusinessCount}}人,休假{{leaveInfo.leaveCount}}人,因私出境{{leaveInfo.privateOutboundCount}}人,随同行领导在境内外出差{{leaveInfo.accompanyBussinessCount}}人,公休假(节假日)期间离开工作驻地(辖区){{leaveInfo.holidayLeaveCount}}人,参加总行一类二类会议{{leaveInfo.attendMeetCount}}人。
          </div>
          <div>主要负责人请假备案预告:</div>
          <div>
            初步预计,明天总行部门、一级分行等部门和机构主要负责人将请假备案{{tomorrowInfo.leaveCountTotal}}人,其中境内出差{{tomorrowInfo.inboundBusinessCount}}人,境外出差{{tomorrowInfo.outboundBusinessCount}}人,休假{{tomorrowInfo.leaveCount}}人,因私出境{{tomorrowInfo.privateOutboundCount}}人,随同行领导在境内外出差{{tomorrowInfo.accompanyBussinessCount}}人,公休假(节假日)期间离开工作驻地(辖区){{tomorrowInfo.holidayLeaveCount}}人,参加总行一类二类会议{{tomorrowInfo.attendMeetCount}}人。
          </div>
      </div>
      <el-col style="margin: 10px 0;">
        <m-table
          :isBorder="true"
          size="medium"
          :isIndex="true"
          height='600px'
          :isPagination="false"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          v-loading="tableLoading"
        ></m-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import Dialog from "@/views/dispatch/departDialog.vue";
import dispatchIndex from "@/minixs/dispatchIndex";
import exportTable from "@/minixs/exportTable";

export default {
  name: "recode",
  components: {
    mTable,
    Dialog
  },
  mixins: [dispatchIndex,exportTable],
  data() {
    return {
      bgdata: "",
      statsDate: "",
      nowyear: new Date().getFullYear(),
      nowmonth: new Date().getMonth() + 1,
      nowdate: new Date().getDate(),
      leaveInfo:{
        leaveCountTotal:  "", // 请假备案总人数
        inboundBusinessCount: "", // 境内出差人数
        outboundBusinessCount: "", //境外出差人数
        leaveCount: "", // 请假人数
        privateOutboundCount: "", // 因私出境人数
        accompanyBussinessCount: "", // 随同领导人数
        holidayLeaveCount: "" // 公休日离开工作驻地
      },
      tomorrowInfo:{
        leaveCountTotal:  "", // 请假备案总人数
        inboundBusinessCount: "", // 境内出差人数
        outboundBusinessCount: "", //境外出差人数
        leaveCount: "", // 请假人数
        privateOutboundCount: "", // 因私出境人数
        accompanyBussinessCount: "", // 随同领导人数
        holidayLeaveCount: "" // 公休日离开工作驻地
      },
      ruleForm: {
        unitCode: "",
        type:"",
        leaveType: "",
        statsDate: "",
      },
      ruleForms: {
        unitCode: "",
        type:"",
        leaveType: "",
        statsDate: "",
      },
      draftOptions:[],
      date: "",
      dataState: [],
      record:[
        {
          value: '4',
          label: '正常'
        },
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
      proceeding:[ 
         {
          value: '1',
          label: '境内出差'
        },
        {
          value: '2',
          label: '境外出差'
        },
        {
          value: '3',
          label: '休假'
        },
        {
          value: '4',
          label: '因私出境'
        },
        {
          value: '5',
          label: '随同行领导在境内外出差'
        },
          {
          value: '6',
          label: '公休假（节假日）期间离开工作驻地（辖区）'
        },
        {
          value: '7',
          label: '参加总行一类二类会议'
        }
      ],
      tableLoading: false,
      tableData: [],
      tableCols: [
        { label: "报告期", prop: "statsDate", align: "center", width: "110px" },
        { label: "部门/机构", prop: "unitName", align: "center", width: "150px" },
        { label: "姓名", prop: "humanName", align: "center", width: "110px" },
        { label: "请假/备案", prop: "types", align: "center", width: "120px" },
        { label: "请假备案事项", prop: "leaveTypes", align: "center",minwidth:"40%"  },
        { label: "出发日期", prop: "departDate", align: "center", width: "110px" },
        { label: "返回日期", prop: "backDate", align: "center", width: "110px"},
        { label: "事由报告", prop: "leaveBase", align: "center", width: "200px" }
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
    submitForm(formName) {
      this.handleLoadData("0")
    },
    resetForm(formName) {
      this.defaultDate()
			this.ruleForm.unitCode = ""
			this.ruleForm.type = ""
			this.ruleForm.leaveType = ""
      this.ruleForms.unitCode = ""
			this.ruleForms.type = ""
			this.ruleForms.leaveType = ""
      this.$refs.ruleForm.resetFields();
    },
    toExcel(){
      exportTable.exportExcel(`主要负责人请假备案情况${this.bgdata}`)
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
      if(this.ruleForm.leaveType){
        this.ruleForms.leaveType = this.ruleForm.leaveType.join(",")
      }else{
        this.ruleForms.leaveType = ''
      }
      }
      this.ruleForms.statsDate = this.ruleForm.statsDate
      this.$api.secreatary.activety.leaveDetails(
        {...this.ruleForms })
         .then(res=>{
           this.tableData = res.data
           this.bgdata = this.tableData[0].statsDate
        })
        },
    },
  created() {
   this.$api.secreatary.activety.leaveUnit({}).then(res=>{
    this.dataState = res.data
    })
    this.defaultDate()
    this.$api.secreatary.activety.todayLeave({}).then(res=>{
      this.leaveInfo = res.data
    })
    this.$api.secreatary.activety.tomorrowLeave({}).then(res=>{
      this.tomorrowInfo = res.data
    })
    // this.handleLoadData();
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
