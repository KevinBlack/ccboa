<!--
 * @Author: your name
 * @Date: 2020-10-24 09:51:23
 * @LastEditTime: 2020-11-16 10:49:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \oa1\src\views\secretary\dutyTrends\managerCheck\infoSend\index.vue
-->
<template>
  <div>
    <!-- <nav-article> -->
    <div class="index">
      <el-tabs v-model="actionTabsName" @tab-click="handleTabsChange">
        <el-tab-pane label="业务库" name="todo" tabs="0"></el-tab-pane>
        <el-tab-pane label="统计库" name="done" tabs="1"></el-tab-pane>
        <el-form :data="formData" :inline="true" class="demo-ruleForm mt20">
          <!-- <el-col :span="5">
              <el-form-item label="文号年份" prop="choseYear">
                <el-select
                  v-model="choseYear"
                  @change="selectYear"
                  placeholder="近两年"
                  style="width: 100%;"
                >
                  <el-option value label="近两年"></el-option>
                  <el-option
                    v-for="yearItem in yearList"
                    :key="yearItem"
                    :label="yearItem"
                    :value="yearItem"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
          <el-col :span="8">
            <!-- v-model="formData.superviseDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              style="width:100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期" -->
            <el-form-item label="督办时间：" prop="superviseDate">
              <el-date-picker
                @change="timeChange"
                v-model="times"
                unlink-panels
                value-format="yyyy-MM-dd"
                size="small"
                type="daterange"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="标题：" prop="title">
              <el-input v-model="formData.title" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="文号：" prop="documentCode">
              <el-input v-model="formData.documentCode" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-form-item>
              <el-button size="small" type="primary" @click="initData">搜索</el-button>
              <el-button size="small" type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
          <div class="item_space">
            <el-form-item v-if="tabs==0">
              <el-button
                size="small"
                type="primary"
                @click="downLode"
                style="position:relative"
              >加载数据</el-button>
              <!-- <el-button size="small" type="primary" @click="lookData">查看加载日志</el-button> -->
              <el-button size="small" type="primary" @click="exportData">导出</el-button>
            </el-form-item>
          </div>

          <div class="item_space1">
            <el-form-item v-if="tabs==1">
              <el-button size="small" type="primary" @click="deleted">删除</el-button>
              <el-button size="small" type="primary" @click="exportData">导出</el-button>
            </el-form-item>
          </div>
        </el-form>

        <!-- </search-form> -->
        <!-- <el-col class="mt20end">
        <el-button type="primary" @click="handleDelete">删除</el-button>
        </el-col>-->
      </el-tabs>

      <m-table
        @refresh="initData"
        @cellClick="cellClick"
        @select="select"
        size="medium"
        :pageSizeList = "[100,200,500]"
        :isIndex="true"
        :isHandle="false"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isSelection="true"
        v-loading="tableLoading"
        :tableRowClassNames="tableRowClassName"
      ></m-table>
    </div>
    <!-- <div v-if="isDownLode" class="down_item"> -->
    <!-- <el-col :span="24">
      <el-button @click="NotFound">未选定记录时</el-button>
    </el-col>
    <el-col :span="6">
      <el-button @click="NotFound">已选定记录时</el-button>
    </el-col> -->
    <!-- </div> -->
    <!-- </nav-article> -->
    <div class="el-dialog">
      <el-dialog :visible.sync="dialogVisible" :show-close="false">
        <h4 style="text-align:center">{{text}}</h4>
        <el-progress :percentage="100" status="success" v-if="progress">正在加载数据</el-progress>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="isDialogVisible">确 定</el-button>
          <el-button @click="close">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="el-dialog">
      <el-dialog :visible.sync="isShow" :show-close="true">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="name" label="开始时间" width="120"></el-table-column>
          <el-table-column prop="address" label="结束时间"></el-table-column>
          <el-table-column prop="address" label="倒入用时"></el-table-column>
          <el-table-column prop="address" label="倒入总计"></el-table-column>
          <el-table-column prop="address" label="处理失败"></el-table-column>
          <el-table-column prop="address" label="处理成功"></el-table-column>
          <el-table-column prop="address" label="创建成功"></el-table-column>
          <el-table-column prop="address" label="更新成功"></el-table-column>
          <el-table-column prop="address" label="倒入速度(秒/条)" width="150"></el-table-column>
          <el-table-column prop="address" label="操作人"></el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
// import itemTable from "@/itemTable";
import exportTable from "@/minixs/exportTable";
import dateFormate from "@/util/filters.js";
// import searchForm from '@/components/form/searchForm'
const businessData = [
  // { label: '序号', prop: 'createDate' },
  { label: "督办时间", prop: "superviseDate" },
  { label: "文号", prop: "documentCode" },
  { label: "标题", prop: "title" },
  { label: "承办部门", prop: "undertakeDeptName" },
  { label: "协办标志", prop: "helpFlag" },
  { label: "办结时间", prop: "undertakeEndTime" },
  { label: "办结情况", prop: "handleTerminateOpinion" }
];

export default {
  name: "index",

  components: {
    mTable
    // itemTable
    // searchForm
  },
  data() {
    return {
      // choseYear:"",
      yearList:[],
      checkedArr: [],
      deleteIds: "",
      times:"",
      isShow: false,
      progress: false,
      dialogVisible: false,
      isDownLode: false,
      itemIndex: 1,
      tabs: 0,//tab标签索引
      type: 1,//tab标签页,todo为1
      tabName:'todo',
      stat: 1,
      isbusiness: false,
      formData: {
        superviseDate: "", //   督办日期
        documentCode: "", //  文号
        title: "", //  标题
        undertakeDeptName: "", //  承办部门
        helpFlag: "", //  协办:""//标志
        undertakeEndTime: "", //  办结时间
        handleTerminateOpinion: "", //   办结情况
        page: 1, //当前页数
        limit: 100, //每页条数
        totalCount: 0,
        startTime:"",
        endTime:"",
      },
      limit: 100, //每页条数
      total: 0,
      tableLoading: false,
      // openshow:false,
      // isCreateDia:false,
      // tabs类型
      text: "",
      tableData: [],
      tableCols: businessData,
      // 分页
      pagination: {
        pageNum: 1,
        pageSize: 100,
        total: 0
      },
      // 默认全部
      actionTabsName: "todo",
      paneTab: "typeSec",
      deleteArry: "" // id拼接
    };
  },
  mounted() {
    if(sessionStorage.getItem('tab_sw')){
      this.tabName=this.actionTabsName=sessionStorage.getItem('tab_sw');
      if (this.actionTabsName == "todo") {
        this.tabs = '0';
        this.type= 1;
      }
      if (this.actionTabsName == "done") {
        this.tabs = '1';
        this.type= 2;
      }
    }
    if(sessionStorage.getItem('page_sw')){
      this.formData = Object.assign(this.formData,JSON.parse(sessionStorage.getItem('page_sw')));
      if(this.formData.startTime&&this.formData.endTime){
        this.times=[this.formData.startTime,this.formData.endTime]
      }
      this.pagination={
        pageNum: this.formData.page, //第几页
        pageSize: this.formData.limit, //每页条数
        total: 0
      }
    }
    this.initData();
  },
  methods: {
    // selectYear(val) {
    //   this.choseYear = val;      
    //   this.$router.push({
    //     query: {
    //       choseYear: val
    //     }
    //   })
    // },
    handleCurrentChange(val) {
      this.formData.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },
    handleSizeChange(val) {
      this.formData.limit = this.pagination.limit = val;
      this.pagination.page = this.formData.page = 1;
      this.tableData = [];
      this.initData();
    },
    tableRowClassName(row) {
      if (
        row.isRed == "0" &&
        (this.paneTab == "typeSec" || row.isReadflag == "0")
      ) {
        return "warning-row";
      }
    },
    // lookData() {
    //   this.isShow = true;
    // },
    isDialogVisible() {
      if (this.text == "请选定要加载的数据") {
        console.log("1111======+++");
      } else {
        if (this.deleteArry !== "") {
          this.$post
            .postData(
              "ywSynchroTj",
              JSON.stringify({ function: "ywSynchroTj", ids: this.deleteArry }),
              this.$businessCode.swgl
            )
            .then(res => {
              this.initData();
              // this.tableData = res.data.rows;
              // this.pagination.total = res.data.total;
            });
        } else {
          this.$message({
            type: "error",
            message: "请选择要加载的数据!"
          });
          return;
        }
        this.progress = true;
      }
      this.dialogVisible = false;
      this.isDownLode = false;
    },
    //  handleSelectionChange(val) {
    //    debugger
    //     let dataArry = [];
    //           // row.map(function(value, index)
    //     for(let i=0;i<val.length;i++){
    //     dataArry.push(value.id);
    //   };
    //   this.deleteArry = dataArry.join(",");

    //   // this.checkedArr = val;
    //   // let idsArr = [];
    //   // for (var i = 0; i < val.length; i++) {
    //   //   idsArr.push(val[i].id);
    //   // }
    //   // this.deleteIds = idsArr.join(",");
    // },
    timeChange(rangeTime) {
      if (!rangeTime || rangeTime == "null" || rangeTime == "undefined") {
        this.formData.startTime = "";
        this.formData.endTime = "";
        return false;
      }
      this.formData.startTime = rangeTime[0];
      this.formData.endTime = rangeTime[1];
    },
    close(e) {
      this.dialogVisible = false;
    },
    downLode() {
      if (this.deleteArry !== "") {
        this.$post
          .postData(
            "ywSynchroTj",
            JSON.stringify({ function: "ywSynchroTj", ids: this.deleteArry }),
            this.$businessCode.swgl
          )
          .then(res => {
            this.deleteArry=''
            if(res.success==true){
              this.$message({
                type: "success",
                message: "加载成功"

              })
            }
            this.initData();
            // this.tableData = res.data.rows;
            // this.pagination.total = res.data.total;
          });
      } else {
        this.$message({
          type: "error",
          message: "请选择要加载的数据!"
        });
        return;
      }
      this.search(this.actionTabsName);
    },
    reset(formName) {
      // this.choseYear = "";
      this.formData.superviseDate = "";
      this.formData.documentCode = "";
      this.formData.title = "";
      this.formData.undertakeDeptName = "";
      this.formData.helpFlag = "";
      this.formData.undertakeEndTime = "";
      this.formData.handleTerminateOpinion = "";
      this.formData.startTime = ""
      this.formData.endTime = ""
      this.times=""
      // this.$refs[formName].resetFields();
      // this.routeYear();
    },
    search(formName) {
      if (this.actionTabsName == "todo") {
        this.formData = Object.assign(this.formData, {
          function: "selectSuperviseRateYw"
        });
        this.$post
          .postData(
            "selectSuperviseRateYw",
            JSON.stringify(this.formData),
            this.$businessCode.swgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          });
      } else if (this.actionTabsName == "done") {
        this.formData = Object.assign(this.formData, {
          function: "selectSuperviseRateTj"
        });
        this.$post
          .postData(
            "selectSuperviseRateTj",
            JSON.stringify(this.formData),
            this.$businessCode.swgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          });
      }
    },
    initData() {
      this.tableData =[];
      let pagination={
        page: this.pagination.pageNum,
        limit: this.pagination.pageSize,
      };
      sessionStorage.setItem('page_sw',JSON.stringify(Object.assign(this.formData, pagination)));
      if (this.tabName == "todo") {
        this.formData = Object.assign(this.formData, {
          function: "selectSuperviseRateYw"
        },pagination);
        this.$post
          .postData(
            "selectSuperviseRateYw",
            JSON.stringify(this.formData),
            this.$businessCode.swgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          });
      } else if (this.tabName == "done") {
        this.formData = Object.assign(this.formData, {
          function: "selectSuperviseRateTj"
        },pagination);
        this.$post
          .postData(
            "selectSuperviseRateTj",
            JSON.stringify(this.formData),
            this.$businessCode.swgl
          )
          .then(res => {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.total;
          });
      }

      // selectSuperviseRateYw   业务库列表查询
    },
    exportData() {
      if (this.tabs == "0") {
        exportTable.exportExcel("导出业务库");
      } else {
        exportTable.exportExcel("导出统计库");
      }
    },
    handleTabsChange(tab, e) {
      this.reset();
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.page = 1;
      this.pagination.total = 0;
      this.tabs = tab.index;
      this.type= tab.index-0+1;
      this.tabName =tab.name;
      sessionStorage.setItem('tab_sw',tab.name);
      this.initData(tab.name);
      this.tableLoading = false;
    },
    // 删除
    deleted() {


      if (this.deleteArry) {
        this.$confirm("是否确定删除当前选中数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$post
            .postData(
              "doDeleteTj",
              JSON.stringify({ function: "doDeleteTj", ids: this.deleteArry }),
              this.$businessCode.swgl
            )
            .then(res => {
              console.log(res.CDATA,'0000-=-------');

              if (res.success==true) {
                this.deleteArry = "";
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              }


              this.initDataWeb();

            });
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择要删除的数据"
        });
      }
    },
    initDataWeb(){
      this.formData = Object.assign(this.formData, {
        function: "selectSuperviseRateTj"
      });
      this.$post
        .postData(
          "selectSuperviseRateTj",
          JSON.stringify(this.formData),
          this.$businessCode.swgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        });
    },
    cellClick(row, column, cell, event) {
      if(this.type=="1"){
        const routeData = this.$router.resolve({
          path: "/secretary/cooperateDetail",
          query: {
            id: row.id,
            tab:this.type,
            // choseYear: this.choseYear
          }
        });
        window.open(routeData.href, "_blank");

      }else if(this.type=='2'){
        const routeData = this.$router.resolve({
          path: "/secretary/hostDetail",
          query: {
            id: row.id,
            tab:this.type,
            // choseYear: this.choseYear
          }
        });
        window.open(routeData.href, "_blank");

      }
    },
    // 勾选的行
    select(row) {

      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
    },
    // routeYear(){
    //   this.$router.push({
    //     query: {
    //       choseYear: ''
    //     }
    //   })
    // },
  },
  created(){
    // this.routeYear();
    this.$post
        .postData(
          "selTableYear",
          JSON.stringify({ function: "selTableYear" }),
          this.$businessCode.swgl
        ).then(res => {
          if(res){
            this.yearList = res.data
          }
      })
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.mt20end {
  margin: 20px 0;
}
.mt20 {
  padding: 20px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.item_space {
  margin-left: 73.5%;
}
.item_space1 {
  margin-left: 75%;
}
.down_item {
  width: 123px;
  height: 79px;
  border: 1px solid #ccc;
  position: absolute;
  padding: 5px;
  top: 311px;
  right: 483px;
}
.el-dialog /deep/ .el-dialog__header {
  background-color: #ffffff;
}
.el-dialog /deep/ .el-dialog__close {
  background: #ccc;
}
</style>

