
<template>
  <div>
    <el-tabs @tab-click="handelTabsClick" v-model="activeName">
      <el-tab-pane label="全部">
        <el-form label-width="80px" :model="searchData" ref="searchData">
          <el-row>
            <el-col :span="8">
              <el-form-item label="开始时间" prop="ljStartTime">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="searchData.ljStartTime"
                  style="width: 100%;"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束时间" prop="ljEndTime">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="searchData.ljEndTime"
                  style="width: 100%;"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="searchData.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--<el-form-item label="地点">-->
          <!--<el-input></el-input>-->
          <!--</el-form-item>-->
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="onLoad">查询</el-button>
          <el-button type="primary" @click="onClear">重置</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          待办
          <el-badge v-if="needTodoNum != 0" :value="needTodoNum" class="badgeItem" type="primary"></el-badge>
        </span>
        <el-button type="primary" @click="add">起草</el-button>
      </el-tab-pane>
      <el-tab-pane label="已办"></el-tab-pane>
      <el-tab-pane label="办结"></el-tab-pane>
      <el-tab-pane label="已失效"></el-tab-pane>
    </el-tabs>
    <!--:searchData="searchData"-->
    <!--:isSelection="true"-->
    <mTable
      style="margin-top: 30px;"
      ref="PersonTable"
      :isIndex="true"
      @refresh="loadD"
      @select="selectRow"
      @cellClick="cellClick"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :tableRowClassNames="tableRowClassName"
    ></mTable>
    <!--起草弹框选择部门-->
    <el-dialog
      :visible.sync="showChooseDept"
      title="选择部门"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form v-model="bank_chosDept" ref="bank_chosDept">
        <el-form-item prop="deptName">
          <el-select
            v-model="bank_chosDept.deptId"
            placeholder="请选择"
            style="width:100%"
            @change="selectId"
          >
            <el-option
              v-for="item in deptArr"
              :key="item.firstUnitId"
              :label="item.unitNames"
              :value="item.firstUnitId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleChosDept()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mTable from "components/table/tTable";
import bianhanPublic from "@/minixs/bianhan";
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
        btnType: "0"
      },
      tableCols: [
        { label: "填报时间", prop: "draftTime" },
        { label: "离京日期", prop: "ljTime" },
        { label: "返京日期", prop: "fjTime" },
        { label: "姓名", prop: "name" },

        { label: "出差地点", prop: "address" },
        // { label: "事由", prop: "outReason" },
        { label: "陪同人员", prop: "ptPersion" },
        { label: "当前环节", prop: "currentNode" },
        { label: "操作人", prop: "curUserName" }
      ],
      tableData: [],
      showChooseDept: false,
      bank_chosDept: {
        deptId: ""
      },
      deptArr: [],
      needTodoNum: 0
    };
  },
  mixins: [bianhanPublic],
  methods: {
    handelTabsClick(tab) {
      switch (tab.index) {
        case "0":
          // 全部
          this.pagination = {
            pageNum: 1, //第几页
            total: 0, //共有条数
            pageSize: 20 //每页条数
          };
          this.searchData.btnType = "3";
          this.tableCols = [
            { label: "填报时间", prop: "draftTime" },
            { label: "离京日期", prop: "ljTime" },
            { label: "返京日期", prop: "fjTime" },
            { label: "姓名", prop: "name" },

            { label: "出差地点", prop: "address" },
            { label: "事由", prop: "outReason" },
            { label: "陪同人员", prop: "ptPersion" },
            { label: "当前环节", prop: "currentNode" },
            { label: "操作人", prop: "curUserName" }
          ];
          this.loadD();
          break;
        case "1":
          // 待办
          this.pagination = {
            pageNum: 1, //第几页
            total: 0, //共有条数
            pageSize: 20 //每页条数
          };
          this.searchData.btnType = "0";
          this.tableCols = [
            { label: "填报时间", prop: "draftTime" },
            { label: "离京日期", prop: "ljTime" },
            { label: "返京日期", prop: "fjTime" },
            { label: "姓名", prop: "name" },

            { label: "出差地点", prop: "address" },
            // { label: "事由", prop: "outReason" },
            { label: "陪同人员", prop: "ptPersion" },
            { label: "当前环节", prop: "currentNode" },
            { label: "操作人", prop: "curUserName" }
          ];
          this.loadD();
          break;
        case "2":
          // 已办
          this.pagination = {
            pageNum: 1, //第几页
            total: 0, //共有条数
            pageSize: 20 //每页条数
          };
          this.searchData.btnType = "1";
          this.tableCols = [
            { label: "填报时间", prop: "draftTime" },
            { label: "离京日期", prop: "ljTime" },
            { label: "返京日期", prop: "fjTime" },
            { label: "姓名", prop: "name" },

            { label: "出差地点", prop: "address" },
            // { label: "事由", prop: "outReason" },
            { label: "陪同人员", prop: "ptPersion" },
            { label: "当前环节", prop: "currentNode" },
            { label: "操作人", prop: "curUserName" }
          ];
          this.loadD();
          break;
        case "3":
          // 办结
          this.pagination = {
            pageNum: 1, //第几页
            total: 0, //共有条数
            pageSize: 20 //每页条数
          };
          this.searchData.btnType = "2";
          this.tableCols = [
            { label: "填报时间", prop: "draftTime" },
            { label: "离京日期", prop: "ljTime" },
            { label: "返京日期", prop: "fjTime" },
            { label: "姓名", prop: "name" },

            { label: "出差地点", prop: "address" },
            // { label: "事由", prop: "outReason" },
            { label: "陪同人员", prop: "ptPersion" }
          ];
          this.loadD();
          break;
        default:
          // 已失效
          this.searchData.btnType = "4";
          this.tableCols = [
            { label: "填报时间", prop: "draftTime" },
            { label: "离京日期", prop: "ljTime" },
            { label: "返京日期", prop: "fjTime" },
            { label: "姓名", prop: "name" },

            { label: "出差地点", prop: "address" },
            { label: "事由", prop: "outReason" },
            { label: "陪同人员", prop: "ptPersion" }
          ];
          this.loadD();
          break;
      }
    },
    add() {
      this.getDepartList();
      this.$nextTick(() => {
        this.showChooseDept = true;
      });
    },
    getDepartList() {
      this.$api.secreatary.partyMemLeavRep
        .getUserFromDepart()
        .then(res => {
          if (res.code === "SUCCESS") {
            this.deptArr = res.result;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    loadD() {
      this.$api.secreatary.partyMemLeavRep
        .getMemLeavRepList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          if (res.code === "SUCCESS") {
            this.tableData = res.data.map(x => {
              return {
                ...x
                // draftTime: formatData(new Date(x.draftTime).getTime(), 'YYYY-MM-DD')
              };
            });
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
      // row.btnType 0 代办 1 已办 2 办结 4 失效
      if (row.btnType === "1" || row.btnType === "2" || row.btnType === "4") {
        this.$intent.goNewPage(this, {
          path: "/secretary/partyMemLeavRep/finishedDetail",
          query: { type: "detail", id: row.id }
        });
        // this.openNewWindow("/secretary/partyMemLeavRep/finishedDetail", {
        //   type: "detail",
        //   id: row.id
        // });
      } else {
        // this.$intent.goNewPage(this, {
        //   path: "/secretary/partyMemLeavRep/detail",
        //   query: { type: "edit", id: row.id }
        // });
        this.hasOpened(row.id, {
          path: "/secretary/partyMemLeavRep/detail",
          query: { id: row.id,type: "edit" }
        });
        // this.openNewWindow("/secretary/partyMemLeavRep/detail", {
        //   type: "edit",
        //   id: row.id
        // });
      }
    },
    selectRow() {},
    onLoad() {
      this.pagination.pageNum = 1;
      this.loadD();
    },
    onClear() {
      this.$refs.searchData.resetFields();
      this.loadD();
    },
    // 选择部门
    selectId(id) {
      console.log(id);
    },

    // 确定选择部门
    handleChosDept() {
      if (!this.bank_chosDept.deptId) {
        return this.$message.error("请选择部门");
      }
      const params = this.deptArr.filter(x => {
        return x.firstUnitId === this.bank_chosDept.deptId;
      });
      console.log(params, "params");
      this.showChooseDept = false;
      this.$nextTick(() => {
        this.$intent.goNewPage(this, {
          path: "/secretary/partyMemLeavRep/detail",
          query: { type: "add", params: JSON.stringify(params[0]) }
        });
        // this.openNewWindow("/secretary/partyMemLeavRep/detail", {
        //   type: "add",
        //   params: JSON.stringify(params[0])
        // });
      });
    },
    tableRowClassName(row) {
      if (row.isReadFlag == "0" && row.btnType === "0") {
        return "warning-row";
      }
    },
    cancel() {
      this.$refs.bank_chosDept.resetFields();
      this.showChooseDept = false;
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
  mounted() {
    this.loadD();
  }
};
</script>

<style scoped>
.btn {
  margin-top: 10px;
  margin-left: 500px;
}
</style>
<style lang="less">
.badgeItem {
  .el-badge__content--primary {
    line-height: initial;
  }
}
</style>
