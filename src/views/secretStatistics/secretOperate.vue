<template>
  <el-row  style="margin-top: -20px;">
    <el-col>
      <el-form
        :model="formData"
        ref="formData"
        label-width="100px"
        class="demo-formData mt20"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="记录日志时间">
              <div class="block">
                <el-date-picker
                  v-model="operationDate"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  style="max-width:300px;"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作类型">
              <el-select v-model="formData.operationType" placeholder="请选择">
                <el-option label="导出" value="导出"></el-option>
                <el-option label="打印" value="打印"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作人">
              <el-input v-model="formData.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" style="text-align:right;">
            <el-col>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button type="primary" @click="resetForm">重置</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
    <el-col style="margin: 5px 0;">
      <m-table
        size="medium"
        :isIndex="true"
        :isPagination="true"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isIndexPage="true"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        v-loading="tableLoading"
      ></m-table>
    </el-col>
  </el-row>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";

export default {
  name: "Swthqkcx",
  components: {
    mTable
  },
  data() {
    return {
      operationDate: [],
      formData: {
        function: "selectByPageOperationLog",
        operationType: "",
        operationTypeStart: "",
        operationTypeEnd: "",
        userName: "",
        page: 1, //当前页数
        limit: 20, //每页条数
        total:0
      },
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
      tableLoading: false,
      tableData: [],
      tableCols: [
        { label: "操作类型", prop: "operationType", align: "center" },
        { label: "记录日志时间", prop: "operationTime", align: "center" },
        { label: "操作人", prop: "userName", align: "center" },
      ],
      pagination: {
        page: 1, //当前页数
        limit: 20, //每页条数
        total:0
      },
    };
  },
  methods: {
    initData() {
      this.formData.operationTypeStart = this.operationDate.length != 0 ? dateFormate.date(Date.parse(this.operationDate[0])) : '';
      this.formData.operationTypeEnd = this.operationDate.length != 0 ? dateFormate.date(Date.parse(this.operationDate[1])) : '';
      this.$post
        .postData(
          "selectByPageOperationLog",
          JSON.stringify(this.formData),
          this.$businessCode.fawgl
        )
        .then(res => {
          console.log(777, res.data)
          this.tableData = res.data.rows;
          this.pagination.total = this.formData.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.formData.page = this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    // 点击切换页数按钮切换
    handleSizeChange(val) {
      this.formData.limit = this.pagination.limit = val;
      this.formData.page = this.pagination.page = 1;
      this.tableData = [];
      this.initData();
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.formData.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      this.formData.limit = val;
      this.pagination.limit = val;
      this.pagination.page = this.formData.page = 1;
      this.tableData = [];
      this.initData();
    },
    search() {
      this.formData.page = this.pagination.page = 1;
      this.tableData = [];
      this.initData();
    },
    resetForm(formName) {
      this.operationDate = [];
      this.formData = {
        function: "selectByPageOperationLog",
        operationType: "",
        operationTypeStart: "",
        operationTypeEnd: "",
        userName: "",
        page: 1, //当前页数
        limit: 20, //每页条数
        total:0
      }
      this.tableData = [];
      // this.initData();
    },
  },
  created() {
    this.pagination = {
      page: this.formData.page, //第几页
      total: this.formData.totalCount, //共有条数
      limit: this.formData.limit, //每页条数
    }
    this.initData();
  }
};
</script>

<style lang="less" scoped>

</style>
