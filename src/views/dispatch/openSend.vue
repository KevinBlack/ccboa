<template>
  <el-tabs v-model="activeName" @tab-click="handleTabsClick">
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-row>
      <el-col style="margin: 20px 0;">
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
        ></m-table>
      </el-col>
    </el-row>
  </el-tabs>
</template>

<script>
import mTable from "components/table/mTable.vue";

const finishData = [
  { label: "发文日期", prop: "completeTime", align: "center" },
  { label: "发文字号", prop: "documentNo", align: "center" },
  { label: "标题", prop: "title", align: "center" },
  { label: "发送单位", prop: "sendType", align: "center" }
]
const waitData = [
  { label: "申请日期", prop: "openTime", align: "center" },
  { label: "发文字号", prop: "documentNo", align: "center" },
  { label: "标题", prop: "title", align: "center" },
  { label: "当前环节", prop: "currentNode", align: "center" },
  { label: "操作人 ", prop: "currentUser", align: "center" }
]

export default {
  name: "OpenSend",
  components: {
    mTable
  },
  data() {
    return {
      bank_countersignature: {
        function: "openSendByPage",
        state:0
      },
      activeName: "tabs-wait",
      currentTab: '0',
      tableData: [],
      tableCols: waitData,
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 10 //每页条数
      }
    };
  },
  methods: {
    // 页面初始化加载数据
    handleLoadData(tabindex="0") {
      this.$post
        .postData(
          "openSendByPage",
          JSON.stringify(Object.assign(this.bank_countersignature, this.pagination)),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.tableData = res.data&&res.data.rows||[];
          this.pagination.total = res.data&&res.data.total||0;
        })
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange(events) {
    },
    //点击 全部0 待办1  已办2  办结3
    handleTabsClick(tab, event) {
      this.currentTab = tab.index
      this.tableData = [];
      this.bank_countersignature.state = tab.index;
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      if (tab.index == "1") {
        this.tableCols = waitData
      } else if (tab.index == "2") {
        this.tableCols = finishData
      }
      this.handleLoadData(tab.index);
      this.tableLoading = false;
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
    cellClick(row, column, cell, event) {
      if(this.currentTab === '0') {
        this.handleOpenPage('/bankDispachFinishBlue', row.id, 'db')
      } else if (this.currentTab === '1') {
        this.handleOpenPage('/bankDispachFinishBlue', row.id, 'yb')
      }
    },
    handleOpenPage (path, id, circle) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          circle: circle
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm(formName) {
      /*this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });*/
    },
    resetForm(formName) {
      //this.$refs[formName].resetFields();
    }
  },
  created() {
    this.handleLoadData();
  }
};
</script>

<style lang="less" scoped>
.btn-writeEnDspc {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.btn-writeEnDspc:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
.mt20 {
  padding: 20px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.mtdown {
  padding: 20px 0 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.arrowup{
  padding-left: 20px;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}

</style>
