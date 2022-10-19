/**
* create by zx on 2020/7/24 14:18
* 类注释：成员配置
* 备注：
*/
<template>
  <div class="settingSecretaryMember">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="党委成员配置" name="first"></el-tab-pane>
      <el-tab-pane label="高管成员配置" name="second"></el-tab-pane>
      <el-tab-pane label="秘书成员配置" name="third">
        <!-- <el-button type="primary" style="margin-bottom:10px" @click="toThird">编辑</el-button>
        <el-button type="danger" style="margin-bottom:10px" @click="toThird">删除</el-button>-->
      </el-tab-pane>
      <el-tab-pane label="编辑权限配置" name="four">
        <!-- <el-button type="primary" style="margin-bottom:10px" @click="toFourth">编辑</el-button>
        <el-button type="danger" style="margin-bottom:10px" @click="toFourth">删除</el-button>-->
      </el-tab-pane>
    </el-tabs>

    <el-form>
      <!-- <el-form v-show="this.activeName==='first'||this.activeName==='second'"> -->
      <el-row style="margin-bottom: 10px">
        <el-col :span="8">
          <select-org-or-dept @select="selectOrg">
            <el-input
              type="text"
              readonly="readonly"
              placeholder="请选择机构"
              suffix-icon="el-icon-arrow-down"
              v-model="orgData.unitName"
            />
          </select-org-or-dept>
        </el-col>
        <el-col :span="8">
          <div style="margin-left:-150px">
            <el-button type="primary" @click="addDw">新增</el-button>
            <el-button
              v-show="this.activeName==='third'||this.activeName==='four'"
              type="primary"
              @click="toEdit"
            >编辑</el-button>
            <el-button type="danger" @click="deleteData">删除</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <m-table
      @refresh="loadData"
      @cellClick="cellClick"
      @select="select"
      size="medium"
      :searchData="searchData"
      :isIndex="true"
      :isHandle="false"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "settingMember",
  components: {
    // FdForm
    selectOrgOrDept,
    mTable
  },
  props: {},
  data() {
    return {
      // 分页
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      tableCols: [
        { label: "党委姓名", prop: "leaderCnName" },
        { label: "秘书姓名", prop: "secCnName" }
      ],
      tableCols1: [
        { label: "党委姓名", prop: "leaderCnName" },
        { label: "秘书姓名", prop: "secCnName" }
      ],
      tableCols2: [
        { label: "高管姓名", prop: "leaderCnName" },
        { label: "秘书姓名", prop: "secCnName" }
      ],
      tableCols3: [{ label: "秘书姓名", prop: "secCnName" }],
      tableCols4: [{ label: "编辑权限", prop: "editorCnName" }],

      tableData: [],
      searchData: {},
      orgData: {
        unitName: "",
        id: ""
      },
      rowData: [],
      activeName: "first",
      isSettingPermission: false,
      isSettingSecretaryMember: false,
      isSettingTopManageMember: true,
      settingMemberName: "党委"
    };
  },
  computed: {},
  // provide() {
  //   return {
  //     reload: this.reload,
  //   };
  // },
  // postList 343
  methods: {
    deleteData() {
      if (this.rowData.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择数据"
        });
      } else {
        let ids = [];
        this.rowData.map(item => {
          ids.push(item.id);
        });
        switch (this.activeName) {
          case "first":
            //党委成员配置

            this.$api.secreatary.leaderActivity
              .deleteDataDang({ id: ids.join(",") })
              .then(res => {
                this.$message({
                  type: "success",

                  message: "删除成功"
                });
                this.loadDataDang();
              });

            break;
          case "second":
            //高管成员配置
            this.$api.secreatary.leaderActivity
              .deleteDataGao({ id: ids.join(",") })
              .then(res => {
                this.$message({
                  type: "success",

                  message: "删除成功"
                });
                this.loadDataGao();
              });

            break;
          case "third":
            //秘书成员配置

            this.$api.secreatary.leaderActivity
              .deleteDataSec({ id: ids.join(",") })
              .then(res => {
                this.$message({
                  type: "success",

                  message: "删除成功"
                });
                this.loadData();
              });

            break;
          case "four":
            //编辑权限配置
            this.$api.secreatary.leaderActivity
              .deleteDataEdit({ id: ids.join(",") })
              .then(res => {
                this.$message({
                  type: "success",

                  message: "删除成功"
                });
                this.loadDataEdit();
              });
            break;
        }
      }
    },
    //编辑
    toEdit() {
      switch (this.activeName) {
        case "third":
          //秘书成员配置
          this.$router.push({
            path:
              "/secretary/leaderActivity/settingMember/settingSecretaryMember",
            query: {
              flag: "edit"
            }
          });
          break;
        case "four":
          //编辑权限配置
          this.$router.push({
            path:
              "/secretary/leaderActivity/settingMember/settingTopManageMember",
            query: {
              flag: "edit"
            }
          });
          break;
      }
    },
    //党委人员新增
    addDw() {
      switch (this.activeName) {
        case "first":
          //党委成员配置
          this.$intent.goNewPage(this, {
            path: "/secretary/leaderActivity/settingMember/addParty",
            query: {
              flag: "add"
            }
          });

          // this.$intent.goNewPage(this, {
          //   path: "/secretary/leaderActivity/settingMember/addParty",
          //   query: { flag: "add" },
          // });
          break;
        case "second":
          //高管成员配置
          // this.$router.push({
          //   path: "/secretary/leaderActivity/settingMember/addExecutive",
          //   query: {
          //     flag: "add",
          //   },
          // });
          this.$intent.goNewPage(this, {
            path: "/secretary/leaderActivity/settingMember/addExecutive",
            query: { flag: "add", type: "insert" }
          });
          break;
        case "third":
          //秘书成员配置
          // this.$router.push({
          //   path:
          //     "/secretary/leaderActivity/settingMember/settingSecretaryMember",
          //   query: {
          //     flag: "add",
          //   },
          // });
          this.$intent.goNewPage(this, {
            path:
              "/secretary/leaderActivity/settingMember/settingSecretaryMember",
            query: { flag: "add" }
          });
          break;
        case "four":
          //编辑权限配置
          // this.$router.push({
          //   path:
          //     "/secretary/leaderActivity/settingMember/settingTopManageMember",
          //   query: {
          //     flag: "add",
          //   },
          // });
          this.$intent.goNewPage(this, {
            path:
              "/secretary/leaderActivity/settingMember/settingTopManageMember",
            query: { flag: "add" }
          });
          break;
      }
    },

    selectOrg(org) {
      this.orgData = org;

      switch (this.activeName) {
        case "first":
          //党委成员配置

          this.loadDataDang();

          break;
        case "second":
          //高管成员配置

          break;
        case "third":
          //秘书成员配置

          this.loadData();
          break;
        case "four":
          //编辑权限配置
          this.loadDataEdit();
          break;
      }
    },

    select(row) {
      this.rowData = row;
    },
    cellClick(row) {
      let rowData = row;
      switch (this.activeName) {
        case "first":
          //党委成员配置
          this.$router.push({
            path: "/secretary/leaderActivity/settingMember/addParty",
            query: {
              detail: JSON.stringify(rowData),
              flag: "edit",
              type: "update"
            }
          });
          break;
        case "second":
          //高管成员配置
          this.$router.push({
            path: "/secretary/leaderActivity/settingMember/addExecutive",
            query: {
              detail: JSON.stringify(rowData),
              flag: "edit"
            }
          });
          break;
        case "third":
          //秘书成员配置
          this.$router.push({
            path:
              "/secretary/leaderActivity/settingMember/settingSecretaryMember",
            query: {
              detail: JSON.stringify(rowData),
              flag: "edit"
            }
          });
          break;
        case "four":
          //编辑权限配置
          this.$router.push({
            path:
              "/secretary/leaderActivity/settingMember/settingTopManageMember",
            query: {
              detail: JSON.stringify(rowData),
              flag: "edit"
            }
          });
          break;
      }
    },
    loadData() {
      this.$api.secreatary.leaderActivity
        .getList(
          {
            unitName: this.orgData.unitName,
            unitId: this.orgData.id
          },
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
    //党委成员配置
    loadDataDang() {
      this.$api.secreatary.leaderActivity
        .getListDang(
          { unitId: this.orgData.id },
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
    //高管成员配置
    loadDataGao() {
      this.$api.secreatary.leaderActivity
        .getListGao(
          { unitId: this.orgData.id, unitName: this.orgData.unitName },
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
    //编辑权限配置
    loadDataEdit() {
      this.$api.secreatary.leaderActivity
        .getListEdit(
          {
            unitName: this.orgData.unitName,
            unitId: this.orgData.id
          },
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
    // 点击切换栏方法
    handleClick(val) {
      switch (val.name) {
        case "first":
          this.pagination = {
            pageNum: 1, //第几页
            pageSize: 20 //每页条数
          };
          this.loadDataDang();
          this.rowData = [];
          this.tableCols = this.tableCols1;
          break;
        case "second":
          this.pagination = {
            pageNum: 1, //第几页
            pageSize: 20 //每页条数
          };
          this.loadDataGao();
          this.rowData = [];
          this.tableCols = this.tableCols2;
          break;
        case "third":
          this.pagination = {
            pageNum: 1, //第几页
            pageSize: 20 //每页条数
          };
          this.loadData();
          this.rowData = [];
          this.tableCols = this.tableCols3;
          break;
        case "four":
          this.pagination = {
            pageNum: 1, //第几页
            pageSize: 20 //每页条数
          };
          this.loadDataEdit();
          this.rowData = [];
          this.tableCols = this.tableCols4;
          break;
      }
    }
  },
  activated() {},
  mounted() {
    if (this.$route.query.activeName) {
      let activeNam = this.$route.query.activeName;
      this.activeName = activeNam;
      this.tabs[activeNam] = true;
    } else {
      this.isSettingTopManageMember = true;
    }
  },
  created() {
    this.loadDataDang();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.settingSecretaryMember {
  min-height: 500px;
}
/deep/ .el-input {
  width: 50%;
}
</style>
