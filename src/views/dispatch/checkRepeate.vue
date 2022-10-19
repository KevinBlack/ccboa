<template>
<div>
  <el-row>
    <el-col>
      <el-row>
        <el-form
          ref="fromdata"
          :model="fromdata"
          label-width="130px"
          class="demo_ruleForm"
        >
          <el-col :span="8">
            <el-form-item label="报告日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="fromdata.meetingEndTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-input v-model="fromdata.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="提交人">
              <el-input v-model="fromdata.creator"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: center;">
            <el-button type="primary" @click="handleQuery">查 询</el-button>
            <el-button type="primary" @click="handleReset">重 置</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-col>
    <el-col style="margin: 10px 0;">
      <mTable
        :isIndex="true"
        :isPagination="true"
        :tableData="tableData"
        :tableCols="tableCols"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        :pagination="pagination"
        @cellClick="cellClick"
      ></mTable>
    </el-col>
  </el-row>
</div>
</template>

<script>
import mTable from "components/table/mTable.vue"
import dateFormate from "@/util/filters.js";

export default {
  name: "CheckRepeate",
  components: {
    mTable
  },
  data() {
    return {
      fromdata: {
        meetingEndTime: '',
        title: '',
        creator: ''
      },
      dialogFormVisible:false,
      tableLoading:false,
      bank_cc: {
        function: 'getCnkis',
        start_time: '',
        end_time: '',
        cnki_creator: '',
        document_title: '',
        documen_id: ''
      },
      tableData: [],
      tableCols: [
        { label: "标题", prop: "documentTitle", align: "left",minwidth:"40%" },
        { label: "拟稿部门", prop: "cnkiUnitName", align: "center", width: "100px" },
        { label: "查重结果", prop: "cnkiResultNumber", align: "center", width: "100px" },
        { label: "报告时间", prop: "cnkiStartTime", align: "center", width: "200px" },
        { label: "提交人", prop: "cnkiCreator", align: "center", width: "100px" }
      ],
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      valueYear: ''
    };
  },
  methods: {
    // 页面初始化加载数据
    handleLoadData() {
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      this.$post.postData("getCnkis", JSON.stringify(Object.assign(this.bank_cc, this.pagination)), this.$businessCode.fawgl).then(res => {
        console.log(res.data)
        this.tableData = res.data.rows
        this.pagination.total = res.data.total;
      })
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val
      this.tableData = []
      this.handleLoadData()
    },

    handleSizeChange(val) {
      this.pagination.limit = val
      this.pagination.page = 1
      this.tableData = []
      this.handleLoadData()
    },
    cellClick(row, column, cell, event){
      console.log(row);
      const routeData = this.$router.resolve({
        path: '/bankDispachQueryRepeat',
        query: {
          id: row.id,
          draftDepartment: row.cnkiUnitName, //拟稿部门
          draftTime: row.cnkiStartTime, //拟稿日期
          draftUser: row.cnkiCreator, //拟稿人
          phone: row.phone //联系电话
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getTablesData(){
      this.bank_cc.backTime = this.valueYear
      this.handleLoadData()
    },
    handleQuery(){
      let transobj = {
        function: 'getCnkis',
        startTime: dateFormate.date(Date.parse(new Date(this.fromdata.meetingEndTime))),
        cnkiCreator: this.fromdata.creator,
        documentTitle: this.fromdata.title
      }
      if(transobj.startTime == '1970-01-01' || transobj.startTime == 'Invalid Date') {
        transobj.startTime = ''
      }
      this.$post.postData("getCnkis", JSON.stringify(Object.assign(transobj, this.pagination)), this.$businessCode.fawgl).then(res => {
        console.log(res.data.rows)
        this.tableData = res.data.rows
        this.pagination.total = res.data.total;
      })
    },
    handleReset(){
      this.fromdata.meetingEndTime = ''
      this.fromdata.title = ''
      this.fromdata.creator = ''
    }
  },
  created() {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.handleLoadData();
  }
}
</script>

<style lang="less" scoped>
.btn-writeEnDspc {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #DCDFE6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin-right: 10px;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
}
.btn-writeEnDspc:hover {
    background: #66b1ff;
    border-color: #66b1ff;
}
.mt20{
  padding: 20px 0 0 0;
  position: relative;
  border:1px solid #f0f0f0;
}
.mtdown{
  padding:20px 0 80px 0;
}
.center{
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  display: block;
}
.down{
  position: absolute;
  bottom:0px;
  font-size:12px;
  text-align:center;
}
.el-dialog__body{
   border: 0.1px solid #fff;
}
.d-body{
  padding: 40px;
  height: 300px;
  width: 800px;
  margin-top: 20px;
  margin-left: 60px;
  border: 1px solid #ccc;
}
.d-body el-form-item{
  margin: 0;
}
.f-box{
  margin-top: 10px;
  margin-left: 65px;
  min-height: 100px;
  padding-left:12px;
  width: 600px;
  border:1px #ccc solid;
}
</style>
