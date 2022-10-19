<!--
 * @Author: your name
 * @Date: 2020-10-14 09:00:42
 * @LastEditTime: 2020-12-03 14:31:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\secretary\leaderWtitten\electronicRegistration.vue
--> 
<template>
  <div class="electronicRegistration">
    <el-tabs @tab-click="handleClick" v-model="activeName">
      <el-tab-pane label="发文" name="typeSec"></el-tab-pane>
      <el-tab-pane label="收文" name="typeFir"></el-tab-pane>
      <el-tab-pane label="签报" name="typeThr"></el-tab-pane>
      
    </el-tabs>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="文号年份">
            <el-select
              v-model="formData.choseYear"
              @change="selectYear"
              placeholder="近两年"
              style="width: 100%;"
            >
              <el-option
                v-for="yearItem in yearList"
                :key="yearItem"
                :label="yearItem"
                :value="yearItem"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成文日期">
            <el-date-picker
              @change="dataDateChange"
              v-model="formData.dataDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文件标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文号">
            <el-input v-model="formData.documentNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" style="margin-bottom:10px;margin-left:50px" @click="loadData">查询</el-button>
          <el-button type="primary" style="margin-bottom:10px" @click="resetClick">重置</el-button>
          <el-button type="danger" style="margin-bottom:10px;" @click="toDelete">删除</el-button>
        </el-col>
      </el-row>
    </el-form>
    <m-table
      @refresh="loadData"
      @cellClick="cellClick"
      @select="select"
      :searchData="searchData"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
    ></m-table>
  </div>
</template>

<script>
import mTable from "@/components/table/tTable";

export default {
  name: "electronicRegistration",
  components: {
    mTable
  },
  data() {
    return {
      yearList:[],
      formData: {
        choseYear: "近两年",
        numYear: "",
        documentNo: "",
        title: "",
        createBeginDate: "",
        createEndDate: "",
        dataDate:[]
      },
      activeName: "typeSec",
      documentType: "1",
      type: "2",
      selectRow: [],
      // 列表数据
      tableData: [],
      // 表头
      tableCols: [
        { label: "成文日期", prop: "createDate", width: 150 },
        { label: "文件标题", prop: "title" },
        { label: "文号", prop: "documentNo", width: 200 },
        { label: "文件类型", prop: "documentType", width: 100 },
        { label: "主办部门", prop: "zbDept", width: 100 },
        { label: "联系人", prop: "contact", width: 100 },
        { label: "联系电话", prop: "tel", width: 150 }
      ],
      // 分页
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 20
      },
      searchData: {
        numYear: "",
        documentNo: "",
        title: "",
        createBeginDate: "",
        createEndDate: "",
        dataDate:[]
      }
    };
  },
  methods: {
    dataDateChange(val) {
      console.log(val)
      if(val == null) {
        this.formData.dataDate = []
      } else {
        this.formData.dataDate = val
      }
    },
    // 重置
    resetClick() {
      this.formData = {
        choseYear: "近两年",
        numYear: "",
        documentNo: "",
        title: "",
        createBeginDate: "",
        createEndDate: "",
        dataDate:[]
      }
      this.loadData()
    },
    getNumYearList() {
      return new Promise((resolve, reject) => {
        this.$api.numYear.getNumYearList().then(res => {
          this.yearList = getNumYear(res.data);
          this.searchData.numYear = this.formData.numYear;
          resolve(res.data);
        });
      });
    },
    selectYear(val) {
      console.log(val);
      if (val == "近两年") {
        this.formData.numYear = "";
        this.formData.documentNo = "";
        // this.searchData.numYear = "";
      } else {
        this.formData.numYear = val;
        this.formData.documentNo = "〔" + val + "〕";
        // this.searchData.numYear = val;
        // this.formData.documentNo = "";
      }
    },
    toDelete() {
      console.log(this.selectRow);
      if (this.selectRow.length === 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else {
        let ids = [];
        this.selectRow.map(item => {
          ids.push(item.id);
        });
        this.$api.secreatary.leaderActivity
          .toDelete({ id: ids.join(",") })
          .then(res => {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.loadData();
          });
      }
    },
    // 获取表格数据方法
    loadData() {
      if (this.formData.dataDate && this.formData.dataDate.length !== 0) {
        this.formData.createBeginDate = this.formData.dataDate[0];
        this.formData.createEndDate = this.formData.dataDate[1];
      } else {
        this.formData.createBeginDate = ""
        this.formData.createEndDate = ""
      }
      this.searchData = this.formData
      this.$api.secreatary.leaderActivity
        .getElectronicsList(
          { documentType: this.documentType, ...this.searchData ,numYear:this.searchData.numYear},

          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
          this.tableData.map(item => {
            if (item.createDate) {
              item.createDate = item.createDate.substring(0, 10);
            }
          });
          this.tableData.map(item => {
            switch (item.documentType) {
              case "1":
                item.documentType = "发文";
                break;
              case "2":
                item.documentType = "收文";
                break;
              case "3":
                item.documentType = "签报";
                break;
              case "4":
                item.documentType = "其他";
                break;
            }
          });
        });
    },
    // 点中的当前行
    cellClick(row) {
      // let rowData = JSON.stringify(row);
      // this.$intent.goNewPage(this, {
      //   path: "/registerTable.vue",
      //   query: { data: rowData, type: "checkCy" },
      // });
      this.$intent.goNewPage(this, {
        path: "/electronicTable",
        query: {
          numYear: this.searchData.numYear,
          detail: JSON.stringify(row)
        }
      });
    },
    // 勾选的当前行
    select(row) {
      this.selectRow = row;
    },
    // tab切换
    handleClick(tab, event) {
      if (tab.name === "typeFir") {
        // 收文
        this.pagination = {
          pageNum: 1,
          pageSize: 20
        };
        this.documentType = "2";
        this.loadData();
      } else if (tab.name === "typeSec") {
        // 发文
        this.pagination = {
          pageNum: 1,
          pageSize: 20
        };
        this.documentType = "1";
        this.loadData();
      } else if (tab.name === "typeThr") {
        // 签报
        this.pagination = {
          pageNum: 1,
          pageSize: 20
        };
        this.documentType = "3";
        this.loadData();
      } else {
        return;
      }
    }
  },
  created() {
    this.getNumYearList().then(res => {
      this.loadData();
    });
  },
  mounted() {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.cformdata {
  margin-top: 24px;
}
</style>


