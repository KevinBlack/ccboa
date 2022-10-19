
<template>
  <div class="container">
    <div class="title">党委成员离京报告查询</div>
    <el-form label-width="80px" :model="searchData" ref="searchData">
      <el-row>
        <el-col :span="12">
          <el-form-item label="离京日期" prop="ljStartTime">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="searchData.ljStartTime"
              style="width: 100%;"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="返京日期" prop="ljEndTime">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="searchData.ljEndTime"
              style="width: 100%;"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="searchData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地点" prop="address">
            <el-input v-model="searchData.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="onLoad">查询</el-button>
      <el-button type="primary" @click="onClear">重置</el-button>
    </div>
    <div class="exportExcel">
      <el-button type="primary" @click="downLoad()">导出</el-button>
    </div>
    <mTable
      ref="PersonTable"
      id="table"
      :isIndex="true"
      @refresh="loadD"
      @cellClick="cellClick"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :searchData="searObj"
      :pageSizeList="[20, 30, 50, 100, 200, 500]"
    ></mTable>
  </div>
</template>
<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import exportTable from "@/minixs/exportTable";
export default {
  components: {
    mTable
  },
  data() {
    return {
      activeName: "1",
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      searchData: {
        ljStartTime: "",
        ljEndTime: "",
        name: "",
        address: ""
      },
      searObj: {},
      tableCols: [
        { label: "填报时间", prop: "draftTime" },
        { label: "离京日期", prop: "ljTime" },
        { label: "返京日期", prop: "fjTime" },
        { label: "姓名", prop: "name" },

        { label: "出差地点", prop: "address" },
        { label: "事由", prop: "outReason" },
        { label: "陪同人员", prop: "ptPersion" },
        { label: "当前环节", prop: "currentNode" },
        { label: "操作人", prop: "curUserName" }
      ],
      tableData: [],
      showChooseDept: false,
      bank_chosDept: {
        deptName: ""
      },
      deptArr: [],
      needTodoNum: 0
    };
  },
  methods: {
    downLoad() {
      exportTable.exportExcel("查询结果", "#table", true);
    },
    loadD() {
      this.$api.secreatary.partyMemLeavRep
        .getMemLeavRepListByQuery(
          { ...this.searObj, ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          if (res.code === "SUCCESS") {
            this.tableData = res.data;
            this.pagination.total = res.total;
            if (this.searchData.btnType === "0") {
              this.needTodoNum = res.total;
            }
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    cellClick(row) {
      this.$intent.goNewPage(this, {
        path: "/secretary/partyMemLeavRep/searchDetail",
        query: { id: row.id }
      });
      // this.openNewWindow("/secretary/partyMemLeavRep/searchDetail", {
      //   id: row.id
      // });
    },
    selectRow(row) {},
    onLoad() {
      this.pagination.pageNum = 1;
      this.loadD();
    },
    onClear() {
      this.$refs.searchData.resetFields();
      this.loadD();
    },
    openNewWindow(path, query) {
      if (query) {
        let { href } = this.$router.resolve({
          path: path, //"/secretary/partyMemLeavRep/detail",   // 这里写的是要跳转的路由地址
          query: query //{id:'1111'}  // 这里写的是页面参数
        });
        window.open(href, "_blank");
      } else {
        let { href } = this.$router.resolve({
          path: path //"/secretary/partyMemLeavRep/detail",   // 这里写的是要跳转的路由地址
        });
        window.open(href, "_blank");
      }
    }
  },
  created() {
    this.loadD();
  }
};
</script>

<style scoped lang="less">
.container {
  .title {
    width: 100%;
    height: 70px;
    color: #2b66e3;
    text-align: center;
    font-size: 36px;
  }
  .exportExcel {
    text-align: right;
    margin-bottom: 10px;
  }
  .btn {
    margin-top: 10px;
    margin-left: 500px;
  }
}
</style>
<style lang="less">
.badgeItem {
  .el-badge__content--primary {
    line-height: initial;
  }
}
</style>
