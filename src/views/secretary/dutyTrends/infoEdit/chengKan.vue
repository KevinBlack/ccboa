<!--
 * @Author:zj
 * @Date: 2020-06-19 15:58:18
 * @LastEditTime: 2021-02-04 16:26:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\system-manage\index.vue
-->
<template>
  <div class="organizationView">
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部" name="tabs-all"></el-tab-pane>
      <el-tab-pane label="待办" name="tabs-todo"></el-tab-pane>
      <el-tab-pane label="已办" name="tabs-doing"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs-end"></el-tab-pane>
    </el-tabs>

    <!-- @description: 按照日期查看  -->
    <el-form>
      <el-row style="margin-bottom: 10px" :gutter="20" v-if="activeName==='tabs-all'">
        <el-col :span="8">
          <el-form-item label="日期">
            <el-date-picker
              v-model="searchD.createDate"
              style="margin-let:20px"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="标题">
            <el-input type="text" v-model="searchD.title" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="loadData">查询</el-button>
        </el-col>
      </el-row>
    </el-form>

    <div class="list">
      <m-table
        ref="asAPublicationDataTable"
        @refresh="loadData"
        :isSelection="true"
        :searchData="searchData"
        :tableData="tableData"
        :tableCols="tableCols"
        @cellClick="cellClick"
        :tableRowClassNames="tableRowClassName"
      ></m-table>
    </div>
  </div>
</template>

<script>
import mTable from "components/table/tTable";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
export default {
  /** @description: 系统一规范 */
  name: "orgManageView",
  components: {
    mTable
  },
  props: {},
  mixins: [bianhanPublic],
  data() {
    const { activeName } = this.$route.query || {};
    return {
      searchD: {
        filterState: "0",
        createDate: "",
        title: ""
      },
      activeName: activeName || "tabs-todo",
      searchData: {
        sort: "desc",
        sortKey: "createDate"
      },
      tableData: [],
      tableCols: [
        {
          label: "拟稿日期",
          prop: "createDate"
        },
        {
          label: "文件标题",
          prop: "title"
        },
        {
          label: "主办部门",
          prop: "zbDept"
        },
        {
          label: "当前环节",
          prop: "currentNode"
        },
        {
          label: "当前处理人",
          prop: "currentUser"
        }
      ]
    };
  },
  filters: {},
  computed: {
    /** @description: 默认显示待办 */
    type() {
      switch (this.activeName) {
        case "tabs-todo":
          return "1";
        case "tabs-doing":
          return "2";
        case "tabs-end":
          return "3";
        default:
          return "0";
      }
    }
  },
  methods: {
    handleTabsClick(tab) {
      console.log(tab.index, "tab.index");
      if (tab.index === "3") {
        this.tableCols = [
          {
            label: "拟稿日期",
            prop: "createDate"
          },
          {
            label: "文件标题",
            prop: "title"
          },
          {
            label: "主办部门",
            prop: "zbDept"
          }
        ];
      } else {
        this.tableCols = [
          {
            label: "拟稿日期",
            prop: "createDate"
          },
          {
            label: "文件标题",
            prop: "title"
          },
          {
            label: "主办部门",
            prop: "zbDept"
          },
          {
            label: "当前环节",
            prop: "currentNode"
          },
          {
            label: "当前处理人",
            prop: "currentUser"
          }
        ];
      }
      console.log(tab);
      this.loadData();
    },
    loadData(isRefresh, pagination) {
      this.commonLoadListData(
        this.$refs.asAPublicationDataTable,
        pagination,
        {
          filterState: this.type,
          createDate: this.searchD.createDate || "",
          ...this.searchData
        },
        null,
        this.$api.duty.chengKanList,
        res => {
          this.tableData = res.list;
        }
      );
    },
    cellClick(row) {
      console.log(this.activeName);
      if (this.activeName === "tabs-todo") {
        // this.$intent.goNewPage(this, {
        //   path: "/chengkanDetail",
        //   query: {
        //     /** @description: 来源路由名 据此从详情页中导航回来*/
        //     sourceRouteName: "submitColumnc",
        //     filterState: "1",
        //     activeName: this.activeName,
        //     id: row.id,
        //     isType: JSON.stringify("chengkan")
        //   }
        // });
        this.hasOpened(row.id, {
          path: "/chengkanDetail",
          query: {
            sourceRouteName: "submitColumnc",
            filterState: "1",
            activeName: this.activeName,
            id: row.id,
            isType: JSON.stringify("chengkan")
          }
        });
      } else if (this.activeName === "tabs-doing") {
        // this.$intent.goNewPage(this, {
        //   path: "/chengkanDetailDone",
        //   query: {
        //     /** @description: 来源路由名 据此从详情页中导航回来*/
        //     sourceRouteName: "submitColumnc",
        //     activeName: this.activeName,
        //     filterState: "2",
        //     detail: JSON.stringify(row),
        //     isType: JSON.stringify("chengkan"),
        //     isflg: "fei"
        //   }
        // });
        let data = this.$router.resolve({
          path: "/chengkanDetailDone",
          query: {
            /** @description: 来源路由名 据此从详情页中导航回来*/
            sourceRouteName: "submitColumnc",
            activeName: this.activeName,
            filterState: "2",
            detail: JSON.stringify(row),
            isType: JSON.stringify("chengkan"),
            isflg: "fei"
          }
        });
        window.open(data.href, "_blank");
        // this.hasOpened(row.id, {
        //   path: "/chengkanDetailDone",
        //   'query': {
        //     sourceRouteName: "submitColumnc",
        //     activeName: this.activeName,
        //     filterState: "2",
        //     detail: JSON.stringify(row),
        //     isType: JSON.stringify("chengkan"),
        //     isflg: "fei"
        //   }
        // })
      } else if (this.activeName === "tabs-end") {
        // this.$intent.goNewPage(this, {
        //   path: "/chengkanDetailDone",
        //   query: {
        //     /** @description: 来源路由名 据此从详情页中导航回来*/
        //     sourceRouteName: "submitColumnc",
        //     activeName: this.activeName,
        //     filterState: "3",
        //     detail: JSON.stringify(row),
        //     isType: JSON.stringify("chengkan"),
        //     isflg: "fei"
        //   }
        // });
        let data = this.$router.resolve({
          path: "/chengkanDetailDone",
          query: {
            /** @description: 来源路由名 据此从详情页中导航回来*/
            sourceRouteName: "submitColumnc",
            activeName: this.activeName,
            filterState: "3",
            detail: JSON.stringify(row),
            isType: JSON.stringify("chengkan"),
            isflg: "fei"
          }
        });
        window.open(data.href, "_blank");
        // this.hasOpened(row.id, {
        //   path: "/chengkanDetailDone",
        //   'query': {
        //     sourceRouteName: "submitColumnc",
        //     activeName: this.activeName,
        //     filterState: "2",
        //     detail: JSON.stringify(row),
        //     isType: JSON.stringify("chengkan"),
        //     isflg: "fei"
        //   }
        // })
      } else if (this.activeName === "tabs-all") {
        /** @description: 全部 代办 */
        if (row.currentUserStatus === "1") {
          // this.$intent.goNewPage(this, {
          //   path: "/chengkanDetail",
          //   query: {
          //     /** @description: 来源路由名 据此从详情页中导航回来*/
          //     sourceRouteName: "submitColumnc",
          //     activeName: this.activeName,
          //     filterState: "0",
          //     id: row.id,
          //     isType: JSON.stringify("chengkan")
          //   }
          // });
          this.hasOpened(row.id, {
            path: "/chengkanDetail",
            query: {
              sourceRouteName: "submitColumnc",
              activeName: this.activeName,
              filterState: "0",
              id: row.id,
              isType: JSON.stringify("chengkan")
            }
          });
        } else if (["2", "3"].includes(row.currentUserStatus)) {
          /** @description: 全部 已办办结 */
          // this.$intent.goNewPage(this, {
          //   path: "/chengkanDetailDone",
          //   query: {
          //     /** @description: 来源路由名 据此从详情页中导航回来*/
          //     sourceRouteName: "submitColumnc",
          //     activeName: this.activeName,
          //     detail: JSON.stringify(row),
          //     isType: JSON.stringify("chengkan")
          //   }

          // });
          let data = this.$router.resolve({
            path: "/chengkanDetailDone",
            query: {
              /** @description: 来源路由名 据此从详情页中导航回来*/
              sourceRouteName: "submitColumnc",
              activeName: this.activeName,
              detail: JSON.stringify(row),
              isType: JSON.stringify("chengkan")
            }
          });
          window.open(data.href, "_blank");
          // this.hasOpened(row.id, {
          //   path: "/chengkanDetailDone",
          //   'query': {
          //     sourceRouteName: "submitColumnc",
          //     activeName: this.activeName,
          //     detail: JSON.stringify(row),
          //     isType: JSON.stringify("chengkan")
          //   }
          // })
        }
      }
    },
    tableRowClassName(row) {
      if (row.isRead == "0" && this.activeName == "tabs-todo") {
        return "warning-row";
      }
    }
  },
  created() {},
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
/deep/ .el-form-item__content {
  display: inline-block;
}
</style>
