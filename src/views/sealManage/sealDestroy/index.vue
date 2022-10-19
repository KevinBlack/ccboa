<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="全部" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="待办" name="tabs-sleep">
          <el-button type="primary" style="margin-left:20px;" v-if="buttonType" @click="addData">起草</el-button>
        </el-tab-pane>
        <el-tab-pane label="已办" name="tabs-file"></el-tab-pane>
        <el-tab-pane label="办结" name="tabs-done"></el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="请选择拟稿部门" :visible.sync="dialogFormVisible">
      <el-form style="margin:0 10%" :data="formData">
        <el-form-item label="部门" v-if="this.deptList.length>=1">
          <el-select v-model="selectDept" style="width:50%" @change="change(selectDept)">
            <el-option
              v-for="item in deptList"
              :key="item.firstUnitId"
              :label="item.firstUnitName"
              :value="item.humanId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemClick('cancel')">取 消</el-button>
        <el-button type="primary" @click="itemClick('sure')">确 定</el-button>
      </div>
    </el-dialog>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :searchData="searchData"
      :tableRowClassNames="tableRowClassName"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
export default {
  name: "sealDestroy",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      formData: {},
      rowData: {},
      dialogFormVisible: false,
      deptList: [],
      activeName: "tabs-sleep",
      searchData: {
        sort: "desc",
        sortKey: "cdate"
      },
      buttonType: true,
      selectDept: [],
      tableData: [],
      Status: "DB",
      tableCols: [
        { label: "申请时间", prop: "cdate" },
        { label: "编号", prop: "documentNo" },
        { label: "申请单位", prop: "draftDepartment" },
        { label: "当前环节", prop: "currentNode" },
        { label: "操作人", prop: "currentUser" }
      ],
      tableCols0: [
        { label: "申请时间", prop: "cdate" },
        { label: "编号", prop: "documentNo" },
        { label: "申请单位", prop: "draftDepartment" },
        { label: "当前环节", prop: "currentNode" },
        { label: "操作人", prop: "currentUser" }
      ],
      tableCols1: [
        { label: "申请时间", prop: "cdate" },
        { label: "编号", prop: "documentNo" },
        { label: "申请单位", prop: "draftDepartment" },
        { label: "销毁日期", prop: "destoryDate" },
        { label: "销毁地点", prop: "destoryPlace" },
        { label: "销毁人", prop: "destoryPer" },
        { label: "监销人", prop: "jxrV" }
      ],

      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      options: [],
      value: "",
      value1: "",
      deleteArry: ""
    };
  },
  computed: {},
  methods: {
    itemClick(params) {
      switch (params) {
        case "sure":
          this.$intent.goNewPage(this, {
            path: "/sealManage/sealDestroy/sealDestroyDraft",
            query: this.formData
          });
          this.dialogFormVisible = false;
          break;
        case "cancel":
          this.dialogFormVisible = false;
          break;
      }
    },
    tableRowClassName(row) {
      if (row.readFlag == "0") {
        return "warning-row";
      }
    },
    //获取起草权限
    getUserMarkRole() {
      this.$api.sealManage.markMgr
        .getUserMarkRole()
        .then(res => {
          console.log("权限", res);
          this.buttonType = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    change(p) {
      console.log("pppp", p);
      let select = {};
      this.deptList.forEach(item => {
        if (item.humanId == p) {
          select = item;
        }
      });
      this.formData.deptDetail = JSON.stringify(select);
      this.$forceUpdate();
    },
    handleTabsClick(tab) {
      if (tab.index == 0) {
        this.tableCols = deepClone(this.tableCols0);
        this.Status = "ALL";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
      } else if (tab.index == 1) {
        this.tableCols = deepClone(this.tableCols0);
        this.Status = "DB";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
      } else if (tab.index == 2) {
        this.tableCols = deepClone(this.tableCols0);
        this.Status = "YB";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
      } else {
        this.tableCols = deepClone(this.tableCols1);
        this.Status = "BJ";
        this.pagination.pageNum = 1;
        this.pagination.pageSize = 20;
        this.loadData();
      }
    },
    select(row) {},
    loadData() {
      this.$api.sealManage.sealDestroy
        .destroyList(
          { type: this.Status, ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          console.log(res, "loadData123------------------------------res");
          this.pagination.total = res.total;
          this.tableData = res.list;
          this.deptList = res.userList;
        });
    },
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
        query: {id:id}
      });
      window.open(routeData.href, "_blank");
      
    },
    cellClick(row) {
      if (this.activeName === "tabs-sleep") {
        // this.$intent.goNewPage(this, {
        //   path: "/sealManage/sealDestroy/sealDestroyDraft",
        //   query: { id: row.id }
        // });
        // 不允许多次打开同一个页面
        this.handleOpenPage("/sealManage/sealDestroy/sealDestroyDraft", row.id);
      } else if (
        this.activeName === "tabs-file" ||
        this.activeName === "tabs-done"
      ) {
        // this.$intent.goNewPage(this, {
        //   path: "/sealManage/sealDestroy/sealDestroyDraftDone",
        //   query: { id: row.id }
        // });
        // 不允许多次打开同一个页面
        this.handleOpenPage("/sealManage/sealDestroy/sealDestroyDraftDone", row.id);
      } else if (this.activeName === "tabs-look" && row.status == "1") {
        // this.$intent.goNewPage(this, {
        //   path: "/sealManage/sealDestroy/sealDestroyDraft",
        //   query: { id: row.id }
        // });
        // 不允许多次打开同一个页面
        this.handleOpenPage("/sealManage/sealDestroy/sealDestroyDraft", row.id);
      } else if (
        this.activeName === "tabs-look" &&
        (row.status == "2" || row.status == "3")
      ) {
        // this.$intent.goNewPage(this, {
        //   path: "/sealManage/sealDestroy/sealDestroyDraftDone",
        //   query: { id: row.id }
        // });
        // 不允许多次打开同一个页面
      this.handleOpenPage("/sealManage/sealDestroy/sealDestroyDraftDone", row.id);
      }
    },
    addData() {
      this.formData = {};
      this.$api.sealManage.sealDestroy
        .destroyList(
          { type: this.Status },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.deptList = res.userList;
          if (this.deptList.length == 1) {
            console.log(this.deptList);
            
            // this.selectDept = JSON.stringify(this.deptList[0].currUnitName);
            this.selectDept = this.deptList[0].unitNames;
            this.formData.deptDetail = JSON.stringify(this.deptList[0]);
          } else {
            this.selectDept = this.deptList[0].humanId;
            let select1 = {};
            this.deptList.forEach(item => {
              if (item.humanId == this.selectDept) {
                select1 = item;
              }
            });
            this.formData.deptDetail = JSON.stringify(select1);
          }
        });
      this.dialogFormVisible = true;
    }
  },
  activated() {},
  mounted() {
    this.getUserMarkRole();
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>


