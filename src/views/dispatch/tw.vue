<template>
<div>
  <el-row>
    <el-col>
      <el-select v-model="valueYear" placeholder="近两年" @change="getTablesData">
        <el-option value label="近两年"></el-option>
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
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

export default {
  name: "DispatchFile",
  components: {
    mTable
  },
  data() {
    return {
      dialogFormVisible:false,
      tableLoading:false,
      options: [],
      sortDate:[{ prot: 'date', order: 'descnding'}],
      bank_tw: {
        function: 'findAllBackOrder',
        backTime: ''
      },
      tableData: [],
      tableCols: [
        { label: "退文时间", prop: "backTime", align: "center", width: "150px" },
        { label: "发文字号", prop: "documentNo", align: "center", width: "220px" },
        { label: "标题", prop: "title", align: "center",minwidth:"40%" },
        { label: "退文环节", prop: "backNode", align: "center", width: "80px" },
        { label: "退文单位", prop: "backDepartment", align: "center", width: "120px" },
        { label: "退文人", prop: "backPeople", align: "center", width: "100px" },
        { label: "拟稿人", prop: "draftUser", align: "center", width: "100px" }
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
      this.$router.push({
        query: {
          choseYear: this.bank_tw.backTime
        }
      })
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      this.$post.postData("findAllBackOrder", JSON.stringify(Object.assign(this.bank_tw, this.pagination)), this.$businessCode.fawgl).then(res => {
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
      // let readType;
      // let idType;
      // if(this.bank_countersignature.state == 0){
      //   readType = row.readFlag ? row.readFlag : '';
      //   idType = row.id ? row.id : '';

      // }else{
      //   readType = row.READFLAG ? row.READFLAG : '';
      //   idType = row.ID ? row.ID : '';
      // }
      let isBackTypt = row.backTypt===1
      let routeData = this.$router.resolve({
        path: isBackTypt?'/twBank':'/twdfh',
        query: {
          id: row.id,
          choseYear: this.bank_tw.backTime
          // readFlag:readType
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
      if(this.valueYear=="全部") {
        this.bank_tw.backTime = ""
      } else {
        this.bank_tw.backTime = this.valueYear
      }
      this.handleLoadData()
    }
  },
  created() {
    this.$post
      .postData(
        "selTableYear",
        JSON.stringify({
          function: "selTableYear"
        }),
        this.$businessCode.fawgl
      )
      .then(res => {
        if (res && res.success) {
          this.options = res.data;
        }})
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
