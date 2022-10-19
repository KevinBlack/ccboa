<template>
  <!-- 这是印章保管人交接 -->
  <div class="sealKeeperChange">
    <!-- 操作按钮 -->
    <template>
      <el-tabs v-model="activeTabName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="alls">
          <!-- 全部流转表格 -->
          <t-table
            size="medium"
            @refresh="loadTableData('ALL')"
            @cellClick="cellClick_alls"
            @select="selectTable_alls"
            :tableCols="flowTableCols"
            :pagination="pagination"
            :isSelection="true"
            :tableData="tableData"
            :searchData="A"
          ></t-table>
        </el-tab-pane>

        <el-tab-pane label="待办" name="flowDoing">
          <!-- 待办流转按钮 -->
          <el-form :inline="true" :model="flowFormInline" class="demo-form-inline">
            <el-form-item>
              <el-button
                v-for="(item, index) in flowingBtnList"
                :key="index"
                @click="clickFlowDoingBtns(item)"
                v-show="item.show"
                type="primary"
              >{{item.label}}</el-button>
            </el-form-item>
          </el-form>
          <!-- 待办流转表格 -->
          <t-table
            size="medium"
            @refresh="loadTableData('DB')"
            @cellClick="cellClick_flowDoing"
            :tableCols="flowTableCols"
            :pagination="pagination"
            :isSelection="true"
            :tableData="tableData"
            :searchData="A"
            :tableRowClassNames="tableRowClassName"
          ></t-table>
        </el-tab-pane>

        <el-tab-pane label="已办" name="flowDone">
          <!-- 已办流转表格 -->
          <t-table
            size="medium"
            @refresh="loadTableData('YB')"
            @cellClick="cellClick_flowDone"
            :tableCols="flowTableCols"
            :pagination="pagination"
            :isSelection="true"
            :tableData="tableData"
            :searchData="A"
          ></t-table>
        </el-tab-pane>
        <el-tab-pane label="办结" name="done">
          <div class="doneMain">
            <!-- 办结表格 -->
            <t-table
              size="medium"
              @refresh="loadTableData('BJ')"
              @cellClick="cellClick_done"
              :tableCols="doneTableCols"
              :pagination="pagination"
              :isSelection="true"
              :tableData="tableData"
              :searchData="A"
            ></t-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>

    <select-dept
      v-model="dialogVisible"
      :deptList="unitList"
      :selectDept="selectDept"
      @surefun="surefun"
    ></select-dept>
  </div>
</template>

<script>
// 导入通用表格
import tTable from "@/components/table/tTable";
import selectDept from "./selectDept"; //倒入选择机构下拉框
export default {
  name: "sealKeeperChange",
  components: {
    tTable,
    selectDept
  },
  props: {},
  data() {
    return {
      queryParams:{},
      A: {
        type: "ALL"
      },
      activeTabName: "flowDoing",
      // 全部表
      tableData: [], // 表的数据.对象数组
      tableSelects: [], // 表的勾选记录.对象数组
      unitList: [], //起草时机构列表
      dialogVisible: false,
      selectDept: {},
      //表格字段
      flowTableCols: [
        { label: "拟稿日期", prop: "cdate", width: 200 },
        // { label: "印章编号", prop: "Stmp_ECD" },
        { label: "印章名称", prop: "title" },
        { label: "编号", prop: "documentCode", width: 200 },
        { label: "移交人", prop: "creator", width: 150 },
        { label: "接收人", prop: "chineseNodeUser", width: 150 },
        { label: "当前环节", prop: "currentNode", width: 150 },
        { label: "操作人", prop: "currentUser", width: 100 }
      ],
      doneTableCols: [
        { label: "交出时间", prop: "finishTime", width: 200 },
        // { label: "印章编号", prop: "Stmp_ECD" },
        { label: "印章名称", prop: "title" },
        { label: "编号", prop: "documentCode" },
        { label: "移交人", prop: "creator", width: 200 },
        { label: "接收人", prop: "chineseNodeUser", width: 200 }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      flowingBtnList: [{ label: "起草", value: "02", show: true }],
      flowFormInline: {
        selectedFlowStatus: ""
      },
      allFlowStatus: [
        {
          label: "待办",
          value: "01"
        },
        {
          label: "已办",
          value: "02"
        }
      ]
    };
  },
  computed: {
    // 如果选择流转环节，则显示流转环节的table表和数据；如果选择办结环节，则显示办结的table表和数据
    tableCols: function() {
      if (this.activeTabName === "flow") {
        return this.flowTableCols;
      } else if (this.activeTabName === "done") {
        return this.doneTableCols;
      } else {
        return this.flowTableCols;
      }
    }
  },
  watch: {
    activeTab(tabVal) {
      this.loadTableData();
    }
  },
  mounted() {
    this.loadTableData("DB");
  },
  methods: {
    // 点击table表的记录
    cellClick_alls(row) {
      console.log("点击全部的记录:", row);

      // 根据 type 值来确认是否 调用方法，传值
      switch (row.type) {
        case "BJ": this.cellClick_done(row);break; // 办结
        case "DB": this.cellClick_flowDoing(row);break; // 待办
        case "YB": this.cellClick_flowDone(row);break; // 已办
      }
      // let c = row.currentNode === "24" ? "see" : "modify"; // 当前环节'A99'-办结
      // this.toSealKeeperChangePage(_flag, [row]);
    },
    cellClick_flowDoing(row) {
      console.log("点击待办的记录:", row);
      this.toSealKeeperChangePage("modify", [row]);
    },
    cellClick_flowDone(row) {
      console.log("点击已办的记录:", row);
      this.toSealKeeperChangePage("see", [row]);
    },
    cellClick_done(row) {
      console.log("点击办结的记录:", row);
      this.toSealKeeperChangePage("banjie", [row]);
    },
    // 保存待办flow表勾选的记录。rows:所有的勾选记录。对象数组
    selectTable_alls(rows) {
      this.tableSelects_alls = rows;
    },
    selectTable_flow_doing(rows) {
      this.tableSelects_flow_doing = rows;
    },
    selectTable_flow_done(rows) {
      this.tableSelects_flow_done = rows;
    },
    selectTable_done(rows) {
      this.tableSelects_done = rows;
    },
    tableRowClassName(row) {
      if (row.readFlag == "0") {
        return "warning-row";
      }
    },
    /**
     * 跳转到刻制文档页面。可修改，可查看
     * @param {String} type 文档类型。有 new, modify, see三种
     * @param {Array} [selects] 可选，勾选的记录。对象数组
     * @param {Object} [extraQuery] 可选，额外的query参数对象，其可枚举的属性会复制到跳转query对象里
     */
    handleOpenPage(path, id, readType, flag) {
      
      let routeId =
        (localStorage.getItem("routeIdList") &&
          JSON.parse(localStorage.getItem("routeIdList"))) ||
        [];
        console.log('routeId',routeId)
      if (routeId.includes(id)) {
        this.$message({
          type: "error",
          offset: 400,
          showClose: true,
          message: "已经打开了该页面!",
          duration: 1500
        });
        return;
      } 
      const routeData = this.$router.resolve({
        path: path,
        query: this.queryParams
      });
      window.open(routeData.href, "_blank");
      
    },
    toSealKeeperChangePage(type = "see", selects, extraQuery) {
      let query = {};
      this.queryParams.type = type;
      if (type !== "new") {
        if (!selects || selects.length === 0) {
          this.$message({ message: "请先勾选一条记录！", type: "warning" });
          return;
        }
        if (selects.length > 1) {
          this.$message({ message: "只能勾选一条记录！", type: "warning" });
          return;
        }
        this.queryParams.id = selects[0].id; // 申请业务编号
      }
      // 如果有额外的query参数对象，将其可枚举的属性复制到query对象里
      if (typeof extraQuery === "object") {
        Object.assign(this.queryParams, extraQuery);
      }
      // 跳转到印章保管交接页面。 query相当于带查询参数?a=jk&b=2
      // this.$intent.goNewPage(this, {
      //   path: "/sealManage/useSeal/draft/common/sealKeeperChangeForm",
      //   query: this.queryParams
      // });
      // 允许打开同一页面
      if (type !== "new") {
        this.handleOpenPage("/sealManage/useSeal/draft/common/sealKeeperChangeForm", selects[0].id);
      }else {
        this.handleOpenPage("/sealManage/useSeal/draft/common/sealKeeperChangeForm");
      }
      
    },
    resetPanigation() {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = 10;
    },
    handleClick(tab, event) {
      this.resetPanigation();
      switch (tab.name) {
        case "alls":
          //全部
          this.loadTableData("ALL");
          break;
        case "flowDoing":
          //待办
          this.loadTableData("DB");
          break;
        case "flowDone":
          //已办
          this.loadTableData("YB");
          break;
        case "done":
          //办结
          this.loadTableData("BJ");
          break;
      }
    },
    // 点击待办流转中的按钮
    clickFlowDoingBtns(btnInfo) {
      let name = btnInfo.value;
      if (name === "02" && this.unitList.length == 1) {
        //起草
        localStorage.setItem(
          "sealKeeperChangeList",
          JSON.stringify(this.unitList[0])
        );
        this.toSealKeeperChangePage("new");
      } else if (name === "02") {
        this.dialogVisible = true;
        this.selectDept = this.unitList[0].humanId;
      }
    },
    //点击起草选择机构后，确定按钮
    surefun(val) {
      console.log(val)
      localStorage.setItem("sealKeeperChangeList", JSON.stringify(val));
      this.toSealKeeperChangePage("new");
    },
    // table表的方法
    loadTableData(val) {
      this.A.type = val;
      this.$api.sealManage.sealCommon
        .tableList(this.A, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          console.log("测试列表接口", res);
          this.pagination.total = res.total;
          res.list.forEach(item => {
            if (item.authUserId) {
              item.currentUser =
                item.authUserName + "（由" + item.currentUser + "授权）";
            }
          });
          this.tableData = res.list.filter(item => {
            item.documentNo = item.documentCode || item.documentNo;
            return item;
          });
          this.unitList = res.unitList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询完结的所有年份,返回promise实例
    queryDoneYears() {
      // TODO: 以后补全查询年份的方法
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          let isSuccess = true;
          let years = [
            { label: "2009年", value: "2009年" },
            { label: "2010年", value: "2010年" },
            { label: "2011年", value: "2011年" },
            { label: "2012年", value: "2012年" }
          ];
          return isSuccess ? resolve(years) : reject(years);
        }, 200);
      });
    }
  },
  // 生命周期created:组件实例创建完成，属性已绑定，但DOM还没生出。此时能取到data数据
  created: function() {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.markDraft {
  min-height: 100vh;
}
</style>