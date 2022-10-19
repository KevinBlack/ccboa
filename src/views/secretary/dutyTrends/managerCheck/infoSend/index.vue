<!--
 * @Author: your name
 * @Date: 2020-10-24 09:51:23
 * @LastEditTime: 2021-01-26 15:53:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa1\src\views\secretary\dutyTrends\managerCheck\infoSend\index.vue
-->
<template>
  <div class="index">
    <el-tabs v-model="actionTabsName" @tab-click="handleTabsClick">
      <el-tab-pane label="流转" name="tabs_roam"></el-tab-pane>
      <el-tab-pane label="办结" name="tabs_done"></el-tab-pane>
    </el-tabs>
    <div class="mt20end">
      <div class="cformdata">
        <el-form ref="refForm" :model="searchData" label-width="160px">
          <el-col :span="12">
            <el-form-item label="来稿时间" prop="data">
              <common-date-range ref="commonDateRange" :startDate.sync="searchData.startDate"
                :endDate.sync="searchData.endDate" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投稿栏目" prop="submitColumn">
              <el-select v-model="searchData.submitColumn" placeholder="请选择">
                <el-option v-for="item in submitColumnData" :key="item.value" :label="item.columnCategory"
                  :value="item.columnCategory"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div style="float:left;width:600px">
              <el-form-item label="投稿单位">
                <select-org-or-dept :orgOrDeptId="'0'" @select="selectOrg">
                  <el-input type="text" readonly="readonly" placeholder="请选择机构" v-model="searchData.orgName"
                    suffix-icon="el-icon-arrow-down" />
                </select-org-or-dept>
              </el-form-item>
            </div>
          </el-col>

          <div style="width:100%;text-align:center">
            <el-button type="primary" @click="loadData">查询</el-button>
            <el-button type="danger" @click="handleDelete">删除</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div v-show="actionTabsName !== 'tabs_done'">
      <m-table ref="infoSendDataListTable" @refresh="loadData" @cellClick="cellClick" @select="select" size="medium"
        :isIndex="true" :isHandle="false" :searchData="searchData" :tableData="tableData" :tableCols="tableCols"
        :isSelection="true" :pageSizeList="[20, 30, 50, 100, 200, 500]"></m-table>
    </div>
    <div v-show="actionTabsName === 'tabs_done'">
      <m-table ref="infoSendDataListTable1" @refresh="loadData" @cellClick="cellClick" @select="select" size="medium"
        :isIndex="true" :isHandle="false" :searchData="searchData" :tableData="tableData" :tableCols="tableCols1"
        :isSelection="true" :pageSizeList="[20, 30, 50, 100, 200, 500]"></m-table>
    </div>
  </div>
</template>

<script>
  import mTable from "components/table/tTable";
  import selectOrgOrDept from "components/select/selectOrgOrDept";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  export default {
    name: "index",
    components: {
      mTable,
      selectOrgOrDept
    },
    mixins:[bianhanPublic],
    data() {
      const {
        activeName
      } = this.$route.query || {};
      return {
        searchData: {},
        /** @description: 表格数据 */
        tableData: [],
        submitColumnData: [],
        /** @description: 表头 */
        tableCols: [{
            label: "拟稿日期",
            prop: "createDate"
          },
          {
            label: "投稿栏目",
            prop: "submitColumn"
          },
          {
            label: "投稿单位",
            prop: "submitUnit"
          },

          {
            label: "当前环节",
            prop: "currentNode"
          },
          {
            label: "当前处理人",
            prop: "currentUser"
          }
        ],
        tableCols1: [{
            label: "报送时间",
            prop: "createDate"
          },
          {
            label: "投稿栏目",
            prop: "submitColumn"
          },
          {
            label: "投稿单位",
            prop: "submitUnit"
          }
        ],
        searchData: {
          orgName: "",
          orgId: ""
        },
        /** @description: 默认全部 */
        actionTabsName: activeName || "tabs_roam",
        deleteArry: "" /** @description: id拼接 */
      };
    },
    watch: {},
    methods: {
      /** @description: tab切换 点击处理 */
      handleTabsClick() {
        this.loadData();
      },
      selectOrg(org) {
        this.searchData.orgName = org.unitName;
        this.searchData.orgId = org.id;
      },
      /** @description: 获取投稿栏目数据源 */
      getSubmitColumn() {
        this.$api.duty
          .getSubmitColumnData({
            columnType: "1",
            type: "1"
          })
          .then(res => {
            this.submitColumnData = res.columnCategoryList;
          });
      },
      /** @description: 删除 */
      handleDelete() {
        if (this.deleteArry) {
          this.$confirm("是否确定删除当前选中数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$api.duty
              .deleteInfoSendData({
                ids: this.deleteArry
              })
              .then(res => {
                if (res.code == "SUCCESS") {
                  this.deleteArry = "";
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                }
                this.loadData();
              });
          });
        } else {
          this.$message({
            type: "warning",
            message: "请选择要删除的数据"
          });
        }
      },
      /** @description: 获取表格数据 */
      loadData(isRefresh, pagination) {
        let curtable = this.$refs.infoSendDataListTable;
        if (this.actionTabsName === "tabs_done") {
          curtable = this.$refs.infoSendDataListTable1;
        }
        this.commonLoadListData(
          curtable,
          pagination, {
            filterState: "4",
            /** @description: 办结传1，其他不传 */
            processState: this.actionTabsName === "tabs_done" ? "1" : "",
            ...(this.searchData || {})
          },
          null,
          this.$api.duty.informationTransList,
          res => {
            this.tableData = res.list;
          }
        );
      },
      /** @description: 换行点击事件 */
      cellClick(row) {
        let rowData = JSON.stringify(row);
        // this.$intent.goNewPage(this, {
        //   name: "dutyTrendsSendHandlDone",
        //   query: {
        //     /** @description: 来源路由名 据此中详情页中导航回来*/
        //     sourceRouteName: "managerCheckInfoSend",
        //     activeName: this.actionTabsName,
        //     data: rowData,
        //     id: row.id,
        //     type: "detail"
        //   }
        // });
        this.hasOpened(row.id, {
          name: "dutyTrendsSendHandlDone",
          'query': {
            sourceRouteName: "managerCheckInfoSend",
            activeName: this.actionTabsName,
            data: rowData,
            id: row.id,
            type: "detail"
          }
        })
      },
      /** @description: 勾选的行 */
      select(row) {
        this.deleteArry = row && row.map(item => item.id).join(",");
      }
    },
    created() {
      this.getSubmitColumn();
    },
    mounted() {
      this.loadData();
    }
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  .mt20end {
    margin: 20px 0;
  }

  .mt20 {
    padding: 20px 0 0 0;
    position: relative;
    /** @description: border: 1px solid #f0f0f0; */
  }

</style>
