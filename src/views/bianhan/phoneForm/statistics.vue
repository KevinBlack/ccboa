
<template>
  <div class="selectDept">
    <!-- <div class="formHeader">
      <div class="title-text">电话记录单统计</div>
    </div> -->
    <fd-form
      style="margin:0 10%"
      :data="formData"
      :columns="formCfg"
      @submit="btnEvent"
    >
    </fd-form>
    <div class="btn_list">
      <el-button type="primary" @click="loadD">开始查询</el-button>
      <el-button type="primary" @click="reset('staticForm')">重置</el-button>
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
        :summary-method="getSummaries"
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
    </div>
    <div v-show="!calType">
      <el-table
        :data="tableData"
        border
        :summary-method="getSummaries"
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
    </div>
  </div>
</template>

<script>
    import mTable from "components/table/tTable"
    import FdForm from 'vue-elementui-freedomen/components/form'
    import apis from '@/httpTansun/api/secreatary/phonenote.js'
    export default {
        name: "statistics",
        components: {
            FdForm
        },
        props: {},

        data() {
            return {
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
                  censusType: '',
                  censusStartDate: '',
                  censusEndDate: '',
                  title: '',
                  hqDept: '',
                  staticType: ''
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
          loadD(){
            let censusStartDate = this.formData.censusStartDate
            let censusEndDate = this.formData.censusEndDate
            this.formData.censusStartDate = censusStartDate? censusStartDate.getFullYear() +"-"+ (censusStartDate.getMonth()+1) +"-"+censusStartDate.getDate(): ''
            this.formData.censusEndDate = censusEndDate ? censusEndDate.getFullYear() +"-"+ (censusEndDate.getMonth()+1) +"-"+censusEndDate.getDate(): ''
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
           //导出
           exportData(){
                exportTable.exportExcel("文件处理单统计表");
            },
          btnEvent(params){
            switch (params.prop) {
                  case "censusType":
                  this .tableData = []
                    if (this.formData.censusType==='0') {
                      this.formCfg[1].label = '通话单位'
                      this.formCfg[1].prpo = 'title'
                      this.calType = true
                    } else {
                      this.formCfg[1].label = '办理部门'
                      this.formCfg[1].prpo = 'hqDept'
                      this.calType = !this.calType
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
            this.$refs[formName].resetFields()
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
