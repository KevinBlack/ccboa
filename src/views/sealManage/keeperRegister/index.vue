<template>
  <!-- 这是印章保管人登记页面 -->
  <div class="markDraft">
    <el-row style="margin-bottom: 10px" :gutter="20">
      <el-col :span="6">
        <select-org-or-dept @select="selectOrg">
          <el-input
            type="text"
            readonly="readonly"
            placeholder="请选择机构"
            v-model="search.orgName"
            suffix-icon="el-icon-arrow-down"
          />
        </select-org-or-dept>
      </el-col>
      <el-form :inline="true" :model="orgLevel" class="demo-form-inline">
        <el-col :span="10">
          <el-form-item>
            <el-button
              v-for="item in btnList"
              :key="item"
              @click="buttonClick(item)"
              type="primary"
            >{{item}}</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- 操作按钮
    <el-form-item>
            <el-button
              :style="{marginLeft:'10px'}"
              type="primary"
              icon="el-icon-search"
              @click="getTableData(orgLevel.selectOrgLevel)"
            >搜索</el-button>
    </el-form-item>-->

    <el-tabs v-model="activeTabName">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="在职印章保管人" name="onTheJob">
        <el-form :inline="true" :model="orgLevel" class="demo-form-inline">
          <!-- <el-form-item> -->
          <!-- <el-select v-model="orgLevel.selectOrgLevel">
                <el-option
                  v-for="item in allOrgLevel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
          </el-select>-->
          <!-- </el-form-item> -->
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="非在职印章保管人" name="offTheJob">
        <!-- <el-form :inline="true" :model="orgLevel" class="demo-form-inline">
          <el-form-item>
            <el-button
              :style="{marginLeft:'10px'}"
              type="primary"
              icon="el-icon-search"
              @click="getTableData(orgLevel.selectOrgLevel)"
            >搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              v-for="item in btnList"
              :key="item"
              @click="buttonClick(item)"
              type="primary"
            >{{item}}</el-button>
          </el-form-item>
        </el-form>-->
      </el-tab-pane>
    </el-tabs>
    <!-- 表格 -->
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      :searchData="searchData"
      size="medium"
      :isSingelCheck="true"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
    ></m-table>
  </div>
</template>

<script>
// 导入通用表格
import mTable from "@/components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "keeperRegister",
  components: {
    mTable,
    selectOrgOrDept
  },
  props: {},
  data() {
    return {
      selectRows: [],
      activeTabName: "all",
      tableData: [],
      searchData: {},
      // TODO:以后有接口文档后修改填充数据的字段prop里的值
      onTheJobTableCols: [
        { label: "到岗日期", prop: "daogangDate", width: 150 },
        { label: "机构名称", prop: "draftOrgan" },
        { label: "部门名称", prop: "draftDepartment" },
        { label: "姓名", prop: "chineseNodeUser", width: 200 },
        { label: "联系方式", prop: "lianXiFsh", width: 200 }
      ],
      offTheJobTableCols: [
        { label: "到岗日期", prop: "daogangDate", width: 150 },
        { label: "离岗日期", prop: "ligangDate" },
        { label: "机构名称", prop: "draftOrgan" },
        { label: "部门名称", prop: "draftDepartment" },
        { label: "姓名", prop: "chineseNodeUser", width: 200 },
        { label: "联系方式", prop: "lianXiFsh", width: 200 }
      ],
      search: {
        type: "",
        unitId: ""
      },
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      btnList: ["新增", "删除"],
      orgLevel: {
        selectOrgLevel: "本行"
      },
      allOrgLevel: [
        {
          label: "本行",
          value: "本行"
        },
        {
          label: "下级行",
          value: "下级行"
        }
      ],
      formLabelWidth: "120px",
      deleteArry: []
    };
  },
  computed: {
    // 如果选择流转环节，则显示流转环节的table表和数据；如果选择办结环节，则显示办结的table表和数据
    tableCols: function() {
      if (this.activeTabName === "onTheJob") {
        return this.onTheJobTableCols;
      } else if (this.activeTabName === "offTheJob") {
        return this.offTheJobTableCols;
      } else {
        return this.offTheJobTableCols;
      }
    }
  },
  watch: {
    activeTabName(tabVal) {
      // // 如果选择完结，查询年份
      // if (tabVal === 'done') {
      // }
      this.pagination = { pageNum: 1, pageSize: 20 };

      this.loadData();
    }
  },
  methods: {
    selectOrg(org) {
      this.$set(this.search, "orgName", org.unitName);
      this.$set(this.search, "unitId", org.id);
      this.search.type = "";
      this.pagination = { pageNum: 1, pageSize: 20 };
      this.loadData();
      console.log("111111111111111111111111111111111", org);
    },
    select(rows) {
      console.log(rows);
      // this.selectRows = rows;
      // console.log(row, "删除");

      this.deleteArry = [];
      if (rows instanceof Array) {
        rows.map(item => {
          this.deleteArry.push({
            id: item.id,
            draftOrganId: item.draftOrganId
          });
        });
      } else {
        this.deleteArry.push({ id: rows.id, draftOrganId: rows.draftOrganId });
      }
      console.log(5555, this.deleteArry);
    },
    loadData() {
      console.log(this.activeTabName);
      if (this.activeTabName == "onTheJob") {
        this.search.type = "1";
      } else if (this.activeTabName == "offTheJob") {
        this.search.type = "2";
      }
      if (this.activeTabName == "all") {
        this.search.type = "";
      }
      this.$api.sealManage.personLogin
        .getList(
          { ...this.search },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    handleClick(tab, event) {
      console.log("jk_markDrft:", tab.label, event);
      // 如果初始化时查询完结的所有年份失败，则在选择完结，再次查询
      //   if (tab.name === "done") {
      //     // 获取完结的所有年份
      //     this.getDoneYears();
      //   },
    },
    // 点击流转中的按钮
    buttonClick(item) {
      if (item === "新增") {
        this.$router.push({
          path: "/sealManage/keeperRegister/keeperRegisterForm"
        });
      } else if (item === "删除") {
        this.delete();
      }
    },
    // 点击流转里的查询按钮
    getTableData(selectedOrgLevel) {
      console.log("流转阶段：", selectedOrgLevel);
    },
    // table表的方法
    // loadTableData(val) {
    //   console.log("loadTableData:", val);
    // },
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
      console.log("cellClick:", row);

      // this.$intent.goNewPage(this, {
      //   path: "/sealManage/keeperRegister/keeperRegisterForm",

      //   query: { id: row.id }
      // });
      // 不允许打开同一个页面
      this.handleOpenPage("/sealManage/keeperRegister/keeperRegisterForm", row.id);
    },
    // 删除
    delete() {
      if (this.deleteArry && this.deleteArry.length > 0) {
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.sealManage.personLogin
              .deleteRows(this.deleteArry)
              .then(res => {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.deleteArry = [];
                this.loadData();
              });
          })
          .catch(() => {});
        // let id = [];
        // this.selectRows.map((item) => {
        //   id.push(item.id);
        // });
      } else {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      }
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
    },
    // 获取完结的所有年份
    getDoneYears() {
      this.queryDoneYears()
        .then(years => {
          this.allDoneYears = years;
          this.selectedDoneYear = this.allDoneYears[0].value;
        })
        .catch(err => {
          console.log("getDoneYears:catch", err);
        });
    },
    // 打开起草印章刻制审批单
    toMarkDraft() {
      this.$router.push({
        path: "/sealManage/markMgr/markDraft/drafting"
      });
    }
  },
  // 生命周期created:组件实例创建完成，属性已绑定，但DOM还没生出。此时能取到data数据
  created: function() {
    console.log("生命周期created：", this.$route.query.orgName);
    let keeperRegisterQurry = this.$route.query;
    if (keeperRegisterQurry.orgName) {
      this.search.type = "";
      this.$set(this.search, "unitId", keeperRegisterQurry.id);

      this.$set(this.search, "orgName", keeperRegisterQurry.orgName);
      this.pagination = { pageNum: 1, pageSize: 20 };
      this.loadData();
      keeperRegisterQurry = null;
      console.log("111111111111111111111111111111111".keeperRegisterQurry);
    } else {
      this.$set(
        this.search,
        "orgName",
        JSON.parse(localStorage.getItem("userInfo")).unitName
      );
      this.$set(
        this.search,
        "unitId",
        JSON.parse(localStorage.getItem("userInfo")).unitId
      );
      this.loadData();
    }
    // 查询完结的所有年份
    // this.getDoneYears();
    // this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.markDraft {
  min-height: 100vh;
}
/deep/ .tree-div {
  z-index: 99;
}
</style>
