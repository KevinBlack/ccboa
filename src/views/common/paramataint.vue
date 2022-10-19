<template>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="超期待办排序" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="反向提醒配置" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="待办事宜排序" name="tabs-done"></el-tab-pane>
      <el-row>
        <el-col style="margin: 20px 0;">
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="false"
            :isPagination="true"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
            @selection-change="handleSelectionChange"
            :pagination="pagination"
            @cellClick="cellClick"
            v-loading="tableLoading"
            :default-sort="sortDate"
          ></m-table>
        </el-col>
      </el-row>
    </el-tabs>
</template>

<script>
import mTable from "components/table/mTable.vue";

const allData = [
  { label: "是否启用", prop: "title", align: "center" },
  { label: "未处理天数", prop: "createTime", align: "center" },
  { label: "记账次数", prop: "createTime", align: "center" },
  { label: "提醒周期", prop: "createTime", align: "center" },
  { label: "屏蔽岗位", prop: "title", align: "center" },
  { label: "屏蔽员工", prop: "documentNo", align: "center" }
]
const backData = [
  { label: "是否启用", prop: "title", align: "center" },
  { label: "启用模块", prop: "createTime", align: "center" },
  { label: "提醒信息接收人", prop: "createTime", align: "center" },
  { label: "计时环节", prop: "createTime", align: "center" },
  { label: "初始提醒时间（天）", prop: "title", align: "center" },
  { label: "重复提醒周期 （天）", prop: "documentNo", align: "center" },
  { label: "提示语", prop: "currentNode", align: "center" }
]
const waitData = [
  { label: "是否启用", prop: "title", align: "center" },
  { label: "优先排序", prop: "createTime", align: "center" },
  { label: "紧急程度排序", prop: "createTime", align: "center" },
  { label: "时间排序", prop: "createTime", align: "center" }
]

export default {
  name: "Paramataint",
  components: {
    mTable
  },
  data() {
    return {
      bank_countersignature: {
        function: "getSendOrderList",
        state: 1
      },
      down: false,
      btnCheckOut: true,
      btnAll: false,
      btnDelete: false,
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
      ruleForm: {
        documentNo: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        statrTime: "",
        endTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        desc: ""
      },
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
      tableData: [],
      multipleSelection: [],
      tableCols: allData,
      pagination: {
        pagNum: 1,
        total: 10
      }
    };
  },
  methods: {
    initData() {
      this.$post
        .postData(
          "getSendOrderList",
          JSON.stringify(this.bank_countersignature), 'A08461302'
        )
        .then(res => {
          this.tableData = res.data.rows;
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange(events) {
      console.log(this.ruleForm.endTime);
    },
    handleTabsClick(tab, event) {
      this.tableLoading = true;
      if (tab.index == "0") {
        this.tableCols = allData
      } else if (tab.index == "1") {
        this.tableCols = backData
      } else {
        this.tableCols = waitData
      }
      this.tableLoading = false
    },
    cellClick(row, column, cell, event) {
      // const routeData = this.$router.resolve({
      //   path:'/bankDispach',
      //   query:{
      //     id:row.id
      //   }
      // })
      // window.open(routeData.href, '_blank')
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
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    handleCharge () {
      console.log(this.multipleSelection.length)
      if (this.multipleSelection.length < 1) {
        this.$message({
          type: "error",
          message: "请至少选择一条数据!"
        });
      }
      return
    },
    // 导出
    exportExcel () {
      this.handleCharge()
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="less" scoped>
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
