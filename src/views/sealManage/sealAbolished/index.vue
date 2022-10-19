<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="全部" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="待办" name="tabs-sleep">
          <el-button type="primary" style="margin-left:20px;" @click="addData">起草</el-button>
        </el-tab-pane>
        <el-tab-pane label="已办" name="tabs-file"></el-tab-pane>
        <el-tab-pane label="办结" name="tabs-done"></el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="选择拟稿部门" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="150px">
        <!-- <el-form-item label="联系单位类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="0">系统内</el-radio>
            <el-radio label="1">系统外</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="是否跨行" prop="iseve">
          <el-radio-group :disabled="isKhFlag" v-model="form.iseve">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <label slot="label">
            <span class="red">*</span>部门
          </label>
          <el-select
            v-model="form.regionNm"
            value-key="unitCodes"
            @change="change"
            style="width: 100%;"
          >
            <el-option
              v-for="(item,index) in deptList"
              :key="index"
              :label="item.unitNames"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否跨行" :label-width="formLabelWidth" v-if="isShow">
          <label slot="label">
            <span class="red">*</span>是否跨行
          </label>
          <el-radio-group v-model="form.findexBak">
            <el-radio :label="'1'">是</el-radio>
            <el-radio :label="'0'">否</el-radio>
          </el-radio-group>
        </el-form-item>-->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toMarkDraft">确 定</el-button>
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
  name: "sealAbolished",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      isKhFlag:false,
      isShow: false, //跨行
      form: {
        findexBak: "", // 是否跨行 '0'-否 '1'-是
        regionId: "", // 申请单位(部门)编号
        regionNm: "", // 申请单位(部门)名称
        type: "0",
        iseve: "1"
      },
      formData: {},
      rowData: {},
      formLabelWidth: "150px",
      dialogFormVisible: false,
      deptList: [],
      activeName: "tabs-sleep",
      searchData: {
        sort: "desc",
        sortKey: "cdate"
      },
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
        { label: "废止日期", prop: "webFzDate" },
        { label: "废止地点", prop: "markAddres" },
        { label: "交印人", prop: "markUsers" },
        { label: "接收人", prop: "chineseNodeUser" }
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
    toMarkDraft() {
      // switch (params) {
      //   case "sure":
      //     this.$intent.goNewPage(this, {
      //       path: "/sealManage/sealAbolished/abolishedDraft",
      //       query: this.formData
      //     });
      //     this.dialogFormVisible = false;
      //     break;
      //   case "cancel":
      //     this.dialogFormVisible = false;
      //     break;
      // }
      let findexBak = this.form.findexBak, // 跨行标志 '0'-行内 '1'-跨行
        regionId = this.form.regionId, // 申请单位(机构)编号
        regionNm = this.form.regionNm; // 申请单位(机构)名称
      if (regionId === "") {
        this.$message({ message: "请先选择申请单位！", type: "warning" });
        return;
      }
      // if (this.isShow && findexBak === "") {
      //   this.$message({ message: "请先选择是否跨行！", type: "warning" });
      //   return;
      // }
      let _extraQuery = {
        findexBak: findexBak == "" ? "0" : findexBak.toString(), // 跨行标志 '0'-行内 '1'-跨行
        regionId: regionId, // 申请单位(部门)编号
        regionNm: regionNm, // 申请单位(部门)名称
        regionList: JSON.stringify(this.deptList),
        type: this.form.type, // 联系单位类型
        iseve: this.form.iseve // 是否跨行
      };
      this.formData.type = this.form.type
      this.formData.iseve = this.form.iseve
      this.dialogFormVisible = false;
      this.$intent.goNewPage(this, {
        path: "/sealManage/sealAbolished/abolishedDraft",
        query: this.formData
      }); // 跳转到废止页面
    },
    change() {
      var data = this.form.regionNm;
      this.form.regionId = data.firstUnitId; // 申请单位(机构)编号
      this.form.regionNm = data.firstUnitName; // 申请单位(机构)名称
      let deptDetail = this.deptList.find(item => item.firstUnitId === data.firstUnitId)
      this.formData.deptDetail = deptDetail ? JSON.stringify(deptDetail) : '{}'
    },
    tableRowClassName(row) {
      if (row.readFlag == "0" && (row.type != "BJ"&&row.type != "YB")) {
        return "warning-row";
      } else {
        return ""
      }
    },
    // change(p) {
    //   console.log("pppp", p);
    //   let select = {};
    //   this.deptList.forEach(item => {
    //     if (item.humanId == p) {
    //       select = item;
    //     }
    //   });
    //   this.formData.deptDetail = JSON.stringify(select);
    //   this.$forceUpdate();
    // },
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
      console.log('handleTabsClick',this.tableCols)
    },
    select(row) {},
    loadData() {
      this.$api.sealManage.sealAbolished
        .abolishedList(
          { type: this.Status, ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.list;
          this.deptList = res.unitList;
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
      console.log(this.activeName);
      console.log(row);

      if (this.activeName === "tabs-sleep") {
        // this.$intent.goNewPage(this, {
        //   path: "/sealManage/sealAbolished/abolishedDraft",
        //   query: { id: row.id }
        // });
        // // 不允许多次打开同一个页面
        this.handleOpenPage("/sealManage/sealAbolished/abolishedDraft", row.id);
      } else if (
        this.activeName === "tabs-file" ||
        this.activeName === "tabs-done"
      ) {
        // this.$intent.goNewPage(this, {
        //   path: "/sealManage/sealAbolished/abolishedDraftDone",
        //   query: { id: row.id }
        // });
        // 不允许多次打开同一个页面
        this.handleOpenPage("/sealManage/sealAbolished/abolishedDraftDone", row.id);
      } else if (this.activeName === "tabs-look" && row.type == "DB") {
        // this.$intent.goNewPage(this, {
        //   path: "/sealManage/sealAbolished/abolishedDraft",
        //   query: { id: row.id }
        // });
        // 不允许多次打开同一个页面
        this.handleOpenPage("/sealManage/sealAbolished/abolishedDraft", row.id);
      } else if (
        this.activeName === "tabs-look" &&
        (row.type == "YB" || row.type == "BJ")
      ) {
        // this.$intent.goNewPage(this, {
        //   path: "/sealManage/sealAbolished/abolishedDraftDone",
        //   query: { id: row.id }
        // });
        // 不允许多次打开同一个页面
        this.handleOpenPage("/sealManage/sealAbolished/abolishedDraftDone", row.id);
      }
    },
    addData() {
      this.formData = {};
      this.$api.sealManage.sealAbolished
        .abolishedList(
          { type: this.Status },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.deptList = res.unitList;
          if (this.deptList.length == 1) {
            console.log(this.deptList);
            // this.selectDept = this.deptList[0].unitNames;
            this.selectDept = JSON.stringify(this.deptList[0]);
            // this.formData.deptDetail = JSON.stringify(this.deptList[0]);
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
  mounted: function() {
    this.isShow =
      JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000"
        ? false
        : true;
  },
  activated() {},
  created() {
    if(JSON.parse(localStorage.getItem("userInfo")).unitId == "U010000") {
      this.isKhFlag = true
    } else {
      this.isKhFlag = false
    }
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>


