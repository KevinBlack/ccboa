<template>
  <div class="index">
    <el-tabs v-model="actionTabsName" @tab-click="handleTabsClick">
      <el-tab-pane label="待发送" name="tabs_todo"></el-tab-pane>
      <el-tab-pane label="已发送" name="tabs_done"></el-tab-pane>
    </el-tabs>
    <div class="mt20end">
      <div class="cformdata">
        <el-form ref="refForm" :model="searchData1" label-width="160px">
          <el-col :span="12">
            <el-form-item label="拟稿日期" prop="data">
              <common-date-range ref="commonDateRange" :startDate.sync="searchData1.startDate"
                :endDate.sync="searchData1.endDate" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <div style="float:left;width:600px">
              <el-form-item label="报送单位">
                <select-org-or-dept :orgOrDeptId="'0'" @select="selectOrg">
                  <el-input type="text" readonly="readonly" placeholder="请选择机构" v-model="searchData1.orgName"
                    suffix-icon="el-icon-arrow-down" />
                </select-org-or-dept>
              </el-form-item>
            </div>
          </el-col>

          <div style="width:100%;text-align:center;display:inline-block">
            <el-button type="primary" @click="loadData">查询</el-button>
            <el-button type="danger" @click="handleDelete">删除</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <m-table ref="errorSituationDataListTable" @refresh="loadData" @cellClick="cellClick" @select="select" size="medium"
      :isIndex="true" :isHandle="false" :searchData="searchData" :tableData="tableData" :tableCols="tableCols"
      :isSelection="true" :pageSizeList="[20, 30, 50, 100, 200, 500]"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import mTable from "components/table/tTable";
  import selectOrgOrDept from "components/select/selectOrgOrDept";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  export default {
    name: "index",
    components: {
      mTable,
      selectOrgOrDept
    },
    mixins: [bianhanPublic],
    data() {
      return {
        /** @description: 表格数据 */
        tableData: [],
        /** @description: 表头 */
        tableCols: [{
            label: "拟稿日期",
            prop: "createDate"
          },
          {
            label: "栏目名称",
            prop: "submitPublication"
          },
          {
            label: "来稿时间",
            prop: "submitColumn"
          },
          {
            label: "报送单位",
            prop: "submitUnit"
          }
        ],
        searchData: {},
        searchData1: {
          orgName: "",
          orgId: ""
        },
        /** @description: 默认全部 */
        actionTabsName: "tabs_todo",
        deleteArry: "" /** @description: id拼接 */
      };
    },
    created() {
      this.actionTabsName =
        this.whichActiveNameFromChengKan || this.actionTabsName;
    },
    watch: {},
    mounted() {
      this.loadData();
    },
    methods: {
      /** @description: tab切换 点击处理 */
      handleTabsClick() {
        this.loadData();
      },
      selectOrg(org) {
        this.searchData1.orgName = org.unitName;
        this.searchData1.orgId = org.id;
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
              .deleteErrorSituationNoticeData({
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
        const isSendCq = this.actionTabsName === "tabs_done" ? "1" : "0";
        this.commonLoadListData(
          this.$refs.errorSituationDataListTable,
          pagination, {
            filterState: "1",
            isSendCq,
            ...(this.searchData1 || {}),
            ...(this.searchData || {})
          },
          null,
          this.$api.duty.getcqList,
          res => {
            this.tableData = res.list;
          }
        );
      },
      /** @description: 换行点击事件 */
      cellClick(row) {
        // this.$intent.goNewPage(this, {
        //   name: "dutyTrendsErrorSituationFormNotice",
        //   query: {
        //     /** @description: 来源路由名 据此中详情页中导航回来*/
        //     sourceRouteName: "managerCheckErrorInfoNotice",
        //     activeName: this.actionTabsName,
        //     detail: JSON.stringify(row),
        //     type: "detail"
        //   }
        // });
        this.hasOpened(row.id, {
          name: 'dutyTrendsErrorSituationFormNotice',
          'query': {
            sourceRouteName: "managerCheckErrorInfoNotice",
            activeName: this.actionTabsName,
            detail: JSON.stringify(row),
            type: "detail",
            id: row.id
          }
        })
      },
      /** @description: 勾选的行 */
      select(row) {
        this.deleteArry = row && row.map(item => item.id).join(",");
      }
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
    border: 1px solid #f0f0f0;
  }

</style>
