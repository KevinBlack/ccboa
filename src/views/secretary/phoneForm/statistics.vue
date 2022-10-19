
<template>
  <div class="selectDept">
    <!-- <div class="formHeader">
      <div class="title-text">电话记录单统计</div>
    </div> -->
    <fd-form
    ref="formName"
      style="margin:0 10%"
      :data.sync="formData"
      :columns="formCfg"
      @event="btnEvent"
    >
    </fd-form>
    <div class="btn_list">
      <el-button type="primary" @click="loadD">开始查询</el-button>
      <el-button type="primary" @click="reset('formName')">重置</el-button>
    </div>
    <div class="phone_tid">
      <p>统计说明：</p>
      <p>
        1.本统计按自然月整月进行统计，例如:统计区间1月至6月，则统计1月1日至6月30日的数据。
      </p>
      <p>
        2.如需本月数据，统计结果中的办结数据为统计日前一天的数据，流转数据为实时数据，例如：统计区间为1月至本月，统计日为本月10日，则统计i月1日至本月9日的办结数据
      </p>
    </div>
    <div v-show="calType">
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 20px">
        <el-table-column
          prop="title"
          label="按通话单位统计"
          width="180">
        </el-table-column>
        <el-table-column
          prop="num"
          label="通话次数">
        </el-table-column>
      </el-table>
      <table id="callUnit" style="display: none;">
        <tr align="center"><td colspan="3" rowspan="1" style="text-align: center;">按通话单位统计</td></tr>
        <tr align="right"><td colspan="3" rowspan="1" style="text-align: right;">{{CUStatisticsDateString}}</td></tr>
        <tr><td>序号</td><td>按通话单位统计</td><td>通话次数</td></tr>
        <tr v-for="(item, index) in tableData" :key="index">
          <td>{{index + 1}}</td>
          <td>{{item.title}}</td>
          <td>{{item.num}}</td>
        </tr>
      </table>
    </div>
    <div v-show="!calType">
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 20px">
        <el-table-column
          prop="hqDept"
          label="按办理部门统计">
        </el-table-column>
        <el-table-column
          prop="num"
          label="办理次数">
        </el-table-column>
      </el-table>
      <table id="HandLingDepartment" style="display: none;">
        <tr align="center"><td colspan="3" rowspan="1" style="text-align: center;">按办理部门统计</td></tr>
        <tr align="right"><td colspan="3" rowspan="1" style="text-align: right;">{{HDStatisticsDateString}}</td></tr>
        <tr><td>序号</td><td>按办理部门统计</td><td>办理次数</td></tr>
        <tr v-for="(item, index) in tableData" :key="index">
          <td>{{index + 1}}</td>
          <td>{{item.hqDept}}</td>
          <td>{{item.num}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
    import mTable from "components/table/tTable"
    import FdForm from 'vue-elementui-freedomen/components/form'
    import exportTable from "@/minixs/exportTable"
    import apis from '@/httpTansun/api/secreatary/phonenote.js'
    export default {
        name: "statistics",
        components: {
            FdForm,
            mTable 
        },
        props: {},

        data() {
            return {
              CUStatisticsDateString: '计量单位：次', // 通话单位统计 日期
              HDStatisticsDateString: '计量单位：次', // 办理部门统计 日期
              arr:[],
              isExport: false,
              calType: true,
              formCfg: [
                    {type:'radios',label:'统计条件',prop:'censusType',options:{0:"通话单位",1:"办理部门"}},
                    {type:'input',label:'通话单位',prop:'title',span:20},
                    {type:'date',label:'统计日期',prop:'censusStartDate',span:10},
                    {type:'date',label:'截止时间',prop:'censusEndDate',span:10},
                    {type:'radios',label:'统计类型',prop:'staticType',options:{0:"HTML",1:"Excel"}, span:10}
                ],
                formData: {
                  censusType: '0',
                  // censusStartDate: '',
                  // censusEndDate: '',
                  // title: '',
                  // hqDept: '',
                  // staticType: ''
                },
                applyList: ['title','num','hqDept','hqDeptId'],
                pagination: {
                    pageNum: 1,
                    pageSize: 10,
               },
               tableData: []
            }
        },
        computed: {},
        methods: {
          init(){
            this.formCfg= [
                    {type:'radios',label:'统计条件',prop:'censusType',options:{0:"通话单位",1:"办理部门"}},
                    {type:'input',label:'通话单位',prop:'title',span:20},
                    {type:'date',label:'统计日期',prop:'censusStartDate',span:10},
                    {type:'date',label:'截止时间',prop:'censusEndDate',span:10},
                    {type:'radios',label:'统计类型',prop:'staticType',options:{0:"HTML",1:"Excel"}, span:10}
                ]
          },
          init1(){
            this.formCfg= [
                    {type:'radios',label:'统计条件',prop:'censusType',options:{0:"通话单位",1:"办理部门"}},
                    {type:'select',label:'办理部门',prop:'hqDeptId',span:20,options: this.arr},
                    {type:'date',label:'统计日期',prop:'censusStartDate',span:10},
                    {type:'date',label:'截止时间',prop:'censusEndDate',span:10},
                    {type:'radios',label:'统计类型',prop:'staticType',options:{0:"HTML",1:"Excel"}, span:10}
                ]
          },
          loadD(){
            const _this = this
            let censusStartDate = this.formData.censusStartDate
            let censusEndDate = this.formData.censusEndDate

            // 增加判断， 使 统计日期 和 截止时间 为 必填
            if (!Boolean(censusStartDate)) {
              this.$message({
                message: "请选择统计日期",
                type: "warning"
              })
              return;
            }
            if (!Boolean(censusEndDate)) {
              this.$message({
                message: "请选择截止时间",
                type: "warning"
              })
              return;
            }
            // 给 日期格式化为 YYYY-MM-DD 进行 补零
            this.formData.censusStartDate = censusStartDate?(typeof censusStartDate=='object'? censusStartDate.getFullYear() +"-"+ (this.zeroFill(censusStartDate.getMonth()+1)) +"-"+(this.zeroFill(censusStartDate.getDate())):censusStartDate): ''
            this.formData.censusEndDate = censusEndDate ?(typeof censusEndDate=='object'? censusEndDate.getFullYear() +"-"+ (this.zeroFill(censusEndDate.getMonth()+1)) +"-"+(this.zeroFill(censusEndDate.getDate())):censusEndDate): ''
            apis.phoneNoteStatistics(this.formData).then(res => {
              if (res.code==="SUCCESS") {
                this.pagination.total = res.total
                this.tableData = res.data
                let arr = []
                let len = _this.tableData.length
                for(let i=0; i< len; i++) {
                  arr.push(parseInt(_this.tableData[i].num))
                }
                let arrSum = this.sum(arr)
                if(_this.calType) {
                  _this.tableData.push({title: '总计', num: JSON.stringify(arrSum)})
                } else {
                  _this.tableData.push({hqDept: '总计', num: JSON.stringify(arrSum)})
                }

                // 判断 是否有起止时间，
                if (Boolean(censusStartDate) && Boolean(censusEndDate)) {
                  if (_this.formData.censusType == '0') {
                    this.CUStatisticsDateString = `统计日期：${this.formatDate(this.formData.censusStartDate)}-${this.formatDate(this.formData.censusEndDate)} 计量单位：次`;
                  } else if (_this.formData.censusType == '1') {
                    this.HDStatisticsDateString = `统计日期：${this.formatDate(this.formData.censusStartDate)}-${this.formatDate(this.formData.censusEndDate)} 计量单位：次`;
                  }
                }

                if(_this.formData.staticType==='1'){
                  _this.exportData()
                }
              }
            }).catch(err=> {
              this.$message({
                type: "error",
                offset: 400,
                showClose: true,
                message: "加载数据失败",
                duration: 1000
              })
            })
          },
          // 时间格式转化 转为 YYYY年MM月DD日
          formatDate(date) {
            const newDate = new Date(date);
            const YYYY = newDate.getFullYear();
            const MM = newDate.getMonth() + 1;
            const DD = newDate.getDate()
            return `${YYYY}年${MM}月${DD}日`
          },
          //导出
          exportData(){
            // 用时间来组成 导出时的文件名
            const time = new Date();
            const year = time.getFullYear();
            const month = time.getMonth() + 1;
            const date = time.getDate();
            const house = time.getHours();
            const minute = time.getMinutes();
            const dateStr = [year, month, date].map(item => this.zeroFill(item)).join('')
            const timeStr = [house, minute].map(item => this.zeroFill(item)).join('')
            // 判断当前为 通话单位 或者 办理部门
            // calType 为 true 通话单位， false 办理部门
            this.$nextTick(() => {
              if (this.calType) {
                exportTable.exportExcel(`按通话单位统计${dateStr}-${timeStr}`, "#callUnit", true);
              } else {
                exportTable.exportExcel(`按办理部门统计${dateStr}-${timeStr}`, "#HandLingDepartment", true);
              }
            })
            
          },
          // 将小于 10 的 数字 转为两位的字符串
          zeroFill (num) {
            return num.toString()[1] ? num.toString() : '0' + num
          },
          btnEvent(params){
            switch (params.prop) {
                  case "censusType":
                  this .tableData = []
                    if (this.formData.censusType==='0') {
                      this.formData={}
                      this.formData={
                        censusType: '0',
                      }
                      this.init()
                      this.calType = true
                    } else {
                      apis
        .getHandleDeps()
        .then(res => {
          console.log("----获取办理部门和日期---", res);
          if (res.code === "SUCCESS") {
            this.arr=[]
            res.hqDept.forEach(item=>{
              this.arr.push({label: item.hqDept, value: item.hqDeptId })
            })
            this.formData={}
                      this.formData={
                        censusType: '1',
                      }
            this.init1()
            this.calType = !this.calType
            console.log(this.formCfg)
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
                      
                    }
                  break;
                  case "staticType":
                  if (this.formData.staticType==='1') {
                    this.isExport = true
                  }else {
                    this.isExport = false
                  }
                    
              }
          },
          //重置按钮
          reset(formName){
            this.$refs[formName].reset()

            this.CUStatisticsDateString = "计量单位：次"
            this.HDStatisticsDateString = "计量单位：次"

            // 重置方法执行之后对 censusType 进行赋值，并且调用 form 表单组件的监听方法
            // 用来修改 点击重置按钮时，censusType 未修改，并且表单依据 censusType 值展示错误的问题
            this.$set(this.formData, 'censusType', '0')
            this.btnEvent({prop: 'censusType'})
          },
          sum(val) {
              var x = 0;
              for (var i = 0; i < val.length; ++i) {
                  x += val[i];
              }
              return x;
          },
        },
        mounted() {
        },
        created() {
          this.init()
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
    margin-top:30px;
    margin-bottom:30px;
    margin-left:45%;
  }
  .duty_tid{
    margin-left:20%;
    font-size:14px;
    span{
      color:red;
      cursor:pointer;
    }
  }
  .phone_tid{
    margin-left:40px;
    font-size:14px;
  }
</style>
