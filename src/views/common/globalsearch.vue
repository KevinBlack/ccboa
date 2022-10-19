<template>
  <div class="content_search">
    <div style="margin-top: 15px;">
      <el-form :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-row>
                <el-col :span="21">
                  <el-form-item label="部门">
                    <el-input v-model="searchForm.mainOrganNames" readonly></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-button type="primary" @click="selectDepartment">选择</el-button>
                </el-col>
              </el-row>
          </el-col>
          <el-col :span="12">
            <el-form-item class="srarch_main">
              <el-input placeholder="请输入内容" v-model="searchForm.search" class="input-with-select">
                <el-select
                  v-model="searchForm.searchType"
                  slot="prepend"
                  placeholder="请选择"
                  style="width: 130px;"
                >
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="标题" value="1"></el-option>
                  <el-option label="文号" value="2"></el-option>
                </el-select>
                
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: center;">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="primary" @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" style="text-align: left;">
            <el-form-item>
              <el-tabs @tab-click="handlerTabChange">
                <el-tab-pane label="全部" name></el-tab-pane>
                <el-tab-pane label="发文" name="发文"></el-tab-pane>
                <el-tab-pane label="收文" name="收文"></el-tab-pane>
                <el-tab-pane label="签报" name="签报"></el-tab-pane>
                <el-tab-pane label="便函管理" name="便函"></el-tab-pane>
                <el-tab-pane label="专项督办" name="督办"></el-tab-pane>
                <el-tab-pane label="事务审批" name="事务审批"></el-tab-pane>
              </el-tabs>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="text-align: right;padding-top:3px;">
            <el-form-item>
              <el-date-picker
                v-model="dateValue"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col style="margin: 20px 0;">
          <div class="search_result">
            <p class="search_result_count" v-if="searchResult!=''">
              共为您找到
              <strong style="color: red;">{{ searchResult }}</strong>条数据
            </p>
            <m-table
              size="medium"
              :isPagination="true"
              :isIndex="true"
              :tableData="tableData"
              :tableCols="tableCols"
              :pagination="pagination"
              @cellClick="cellClick"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"
            ></m-table>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="部门" :visible.sync="dialogVisible" v-dialogDrag width="30%" :before-close="handleClose">
      <el-scrollbar style="height:400px">
        <el-tree 
          show-checkbox
          ref="departTree"
          :data="treeData"
          :props="defaultProps" 
          :check-on-click-node="true"
          :check-strictly="false"
          :default-expand-all="true"
          @check="handleNodeClick"
          node-key="id">
        </el-tree>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "@/components/table/mTable.vue";
import dateFormate from "@/util/filters";
import { skipPath } from "@/util/skipPath.js";

export default {
  name: "Globalsearch",
  components: {
    mTable
  },
  data() {
    // 交易号 A08462021
    return {
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "name"
      },
      checKList:{},
      searchForm: {
        function: "searchOrder",
        search: "",
        searchType: "",
        orderType: "",
        beginDate: "",
        endDate: "",
        mainOrganNames: "",
        draftDept: "",
        draftDeptId: ""
      },
      dateValue: [],
      searchResult: "",
      activeName: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableCols: [
        { label: "标题", prop: "title", align: "left" },
        { label: "文号", prop: "documentNo", align: "center" },
        { label: "种类", prop: "docType", align: "center" },
        { label: "创建时间", prop: "createTime", align: "center" },
        { label: "部门", prop: "draftDept", align: "center" }
      ],
      tableData: [],
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      treeParams: {
        function: "unitTreeByFirst",
        flag: true,
        openSup: false,
        openSupDept: false,
        openCurr: true,
        openCurrFistDept: true,
        openEqual: false,
        openEqualDept: false,
        openSub: false,
        openSubDept: false,
        wfeUnitId: '',
        unitCodes: ""
      },
      showBusinessTypeDialog: false,
      treeData: []
    };
  },
  methods: {
    //主办部门选择按钮
    selectDepartment() {
      let userInfo = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))||''
      this.treeParams.wfeUnitId = userInfo.unitId
      this.dialogVisible = true;
      this.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify(this.treeParams),
          this.$businessCode.xxjs
        )
        .then(res => {
          console.log(res);
          this.treeData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleNodeClick(data) {
      if(data.TYPE!="user"){
        this.$refs['departTree'].setCheckedKeys([]);
        return;
      }  
      // console.log(data);
      this.checKList = data;
      // console.log(this.checKList)
      this.$nextTick(()=>{
        this.$refs['departTree'].setCheckedKeys([data.id]);
      })
    },
    submit(){
      // this.$emit("checkNode", this.checKList);
      // this.handleClose();
      this.searchForm.mainOrganNames = this.searchForm.draftDept = this.checKList.name;
      this.searchForm.draftDeptId = this.checKList.id;
      this.handleClose();
    },
    //关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.getTableData();
    },

    handleSizeChange(val) {
      this.pagination.limit = val;
      this.getTableData();
    },
    handlerTabChange(tab, event) {
      this.pagination.page = 1;
      this.pagination.limit = 20;
      this.activeName = tab.name;
      this.getTableData();
    },
    handleSearch() {
      this.pagination.page = 1;
      this.pagination.limit = 20;
      this.getTableData();
    },
    handleReset() {
      this.searchForm = {
        function: "searchOrder",
        search: "",
        searchType: "",
        orderType: "",
        beginDate: "",
        endDate: "",
        mainOrganNames: "",
        draftDept: "",
        draftDeptId: ""
      }
      this.$refs['departTree'].setCheckedKeys([]);
      this.checKList = {};
    },
    getTableData() {
      if (this.searchForm.search == ""&&this.searchForm.mainOrganNames=="") {
        this.$message({
          type: "warning",
          showClose: true,
          offset: 400,
          message: "请填写搜索内容!",
          duration: 2000
        });
        return;
      }
      if (this.dateValue) {
        this.searchForm.endDate = dateFormate.date(
          Date.parse(this.dateValue[1])
        );
        this.searchForm.beginDate = dateFormate.date(
          Date.parse(this.dateValue[0])
        );
      } else {
        this.searchForm.endDate = "";
        this.searchForm.beginDate = "";
        this.dateValue = "";
      }
      this.searchForm.orderType = this.activeName;
      let obj = Object.assign(this.searchForm, this.pagination);

      this.$post
        .postData("searchOrder", JSON.stringify(obj), this.$businessCode.xxjs)
        .then(res => {
          this.searchResult = res.data.total;
          this.tableData = res.data.rows;
          this.pagination.total = (res.data && res.data.total) || 0;
        });
    },

    cellClick(row, column, cell, event) {
      //修改字段
      row.DATA_TYPE = row.dataType;
      row.ID = row.id;
      row.READFLAG = row.readFlag; //列表缺少字段
      //路由跳转
      let skipPathObj = skipPath(row);
      let todoPath;
      todoPath = skipPathObj.doneDetailRouter;
      todoPath.query=Object.assign(todoPath.query,{tiaoguo:"1"})
      let routeData = this.$router.resolve(todoPath);
      window.open(routeData.href, "_blank");
    }
  },
  created() {
    this.searchForm.searchType = "0";
    const now = new Date();
    now.setTime(now.getTime() - 3600 * 1000 * 24 * 30);
    let beginDate = dateFormate.date(Date.parse(now));
    let endDate = dateFormate.date(Date.parse(new Date()));
    this.dateValue.push(beginDate);
    this.dateValue.push(endDate);
  }
};
</script>

<style lang="less">
.content_search {
  width: 90%;
  height: 100%;
  margin: auto;
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff !important;
    width: 130px !important;
  }
  .el-date-editor .el-range-separator {
    width: 10% !important;
  }

  .search_result {
    .search_result_count {
      line-height: 30px;
      color: #606266;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .ces-table {
      border-radius: 0 !important;
      border: none !important;
    }
  }
}
</style>