
<template>
  <div>
    <el-tabs @tab-click="handelTabsClick" v-model="activeName">
      <el-tab-pane label="流转"></el-tab-pane>
      <el-tab-pane label="办结"></el-tab-pane>
      <el-tab-pane label="已失效"></el-tab-pane>
    </el-tabs>
    <el-form label-width="120px" label-position="right" :model="searchData" ref="searchData">
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始时间" prop="ljStartTime">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="searchData.ljStartTime"
              style="width: 100%;"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="ljEndTime">
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
      :pageSizeList="[20,30,50,100,200,500]"
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
              :label="item.firstUnitName"
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
      activeName: "0",
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      searchData: {
        ljStartTime: "",
        ljEndTime: "",
        name: "",
        btnType: "1",
        address: ""
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
      this.pagination = {
        pageNum: 1, //第几页
        pageSize: 20 //每页条数
      };
      switch (tab.index) {
        case "0":
          (this.searchData = {
            ljStartTime: "",
            ljEndTime: "",
            name: "",
            btnType: "1"
          }),
            (this.tableCols = [
              { label: "填报时间", prop: "draftTime" },
              { label: "离京日期", prop: "ljTime" },
              { label: "返京日期", prop: "fjTime" },
              { label: "姓名", prop: "name" },

              { label: "出差地点", prop: "address" },
              // { label: "事由", prop: "outReason" },
              { label: "陪同人员", prop: "ptPersion" },
              { label: "当前环节", prop: "currentNode" },
              { label: "操作人", prop: "curUserName" }
            ]);
          this.loadD();
          break;
        case "1":
          (this.searchData = {
            ljStartTime: "",
            ljEndTime: "",
            name: "",
            btnType: "2"
          }),
            (this.tableCols = [
              { label: "填报时间", prop: "draftTime" },
              { label: "离京日期", prop: "ljTime" },
              { label: "返京日期", prop: "fjTime" },
              { label: "姓名", prop: "name" },

              { label: "出差地点", prop: "address" },
              // { label: "事由", prop: "outReason" },
              { label: "陪同人员", prop: "ptPersion" }
            ]);
          this.loadD();
          break;
        case "2":
          (this.searchData = {
            ljStartTime: "",
            ljEndTime: "",
            name: "",
            btnType: "4"
          }),
            (this.tableCols = [
              { label: "填报时间", prop: "draftTime" },
              { label: "离京日期", prop: "ljTime" },
              { label: "返京日期", prop: "fjTime" },
              { label: "姓名", prop: "name" },

              { label: "出差地点", prop: "address" },
              // { label: "事由", prop: "outReason" },
              { label: "陪同人员", prop: "ptPersion" }
            ]);
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
        .getAdminMemLeavRepList(this.searchData, {
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
      if (this.searchData.btnType === "1") {
        // this.openNewWindow("/secretary/partyMemLeavRep/adminDetail", {
        //   type: "editDetail",
        //   id: row.id
        // });
        this.hasOpened(row.id, {
          path: "/secretary/partyMemLeavRep/adminDetail",
          query: { id: row.id, type: "editDetail",}
        });
      } else {
        this.openNewWindow("/secretary/partyMemLeavRep/finishedDetail", {
          id: row.id
        });
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
      this.showChooseDept = false;
      this.$nextTick(() => {
        this.openNewWindow("/secretary/partyMemLeavRep/detail", {
          type: "add",
          params: JSON.stringify(params[0])
        });
      });
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
  created() {
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
