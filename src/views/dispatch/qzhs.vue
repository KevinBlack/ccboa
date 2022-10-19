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
            :tableData="tableData"
            :tableCols="tableCols"
            @cellClick="cellClick"
            :isPagination="true"
            :pagination="pagination"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            v-loading="tableLoading"
          ></mTable>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";

export default {
  name: "DispatchFile",
  components: {
    mTable
  },
  data() {
    return {
      options: [],
      valueYear: '',
      down:false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
     ruleForm: {
        statrTime:'',
        endTime:'',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: "",
        resource: '',
        resource1: '',
        desc: ''
      },
      tableLoading:false,
      activeName: "tabs-all",
      sortDate:[{ prot: 'date', order: 'descnding'}],
      isEnd:false,
      tableData: [],
      bank_qzsh: {
        function: 'selectByPageWithdraw',
        withdrawTime: ''
      },
      tableCols: [
        { label: "收回时间", prop: "withdrawTime", align: "center", width: "150px" },
        { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
        { label: "标题", prop: "title", align: "left",minwidth:"40%" },
        { label: "收回单位", prop: "withdrawUnit", align: "center", width: "120px" },
        { label: "拟稿部门", prop: "draftDepartment", align: "center", width: "120px" },
        { label: "拟稿人 ", prop: "draftUser", align: "center", width: "100px" },
        { label: "被收回单位 ", prop: "recycledUnit", align: "center", width: "120px" }
      ],
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
    };
  },
  methods: {
    // 页面初始化加载数据
    handleLoadData() {
      this.$router.push({
        query: {
          choseYear: this.bank_qzsh.withdrawTime
        }
      })
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      this.$post.postData("selectByPageWithdraw", JSON.stringify(Object.assign(this.bank_qzsh, this.pagination)), this.$businessCode.fawgl).then(res => {
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
      const routeData = this.$router.resolve({
        path: '/qzshBank',
        query: {
          id: row.id
        }
      });
      window.open(routeData.href, "_blank");
    },
    getTablesData(){
      if(this.valueYear=="全部") {
        this.bank_qzsh.withdrawTime = ""
      } else {
        this.bank_qzsh.withdrawTime = this.valueYear
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
</style>
