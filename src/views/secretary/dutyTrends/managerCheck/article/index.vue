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
            <el-form-item label="编辑时间" prop="data">
              <common-date-range ref="commonDateRange" :startDate.sync="searchData.startDate"
                :endDate.sync="searchData.endDate" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件标题" prop="submitColumn">
              <el-input v-model="searchData.title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div style="float:left;width:600px">
              <el-form-item label="主办部门">
                <select-org-or-dept :orgOrDeptId="currentUserInfo.unitId" :orgOrDept="0" @select="selectOrg">
                  <el-input type="text" readonly="readonly" placeholder="请选择部门" v-model="searchData.departmentName"
                    suffix-icon="el-icon-arrow-down" />
                </select-org-or-dept>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="float:left;width:650px">
              <el-form-item label="机构">
                <select-org-or-dept :orgOrDeptId="'0'" @select="selectOrg1">
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

    <m-table ref="publicationDataListTable" @refresh="loadData" @cellClick="cellClick" @select="select" size="medium"
      :isIndex="true" :searchData="searchData" :isHandle="false" :tableData="tableData" :tableCols="tableCols"
      :isSelection="true" :pageSizeList="[20, 30, 50, 100, 200, 500]"></m-table>
  </div>
</template>

<script>
  import selectOrgOrDept from "components/select/selectOrgOrDept";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  import mTable from "components/table/tTable";
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
        searchData: {
          orgName: "",
          orgId: "",
          departmentName: "",
          departmentId: ""
        },
        /** @description: 表头 */
        tableCols: [{
            label: "编辑时间",
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
        ],
        /** @description: 默认全部 */
        actionTabsName: "tabs_roam",
        deleteArry: "" /** @description: id拼接 */
      };
    },
    watch: {},
    created() {
      this.actionTabsName =
        this.whichActiveNameFromChengKan || this.actionTabsName;
    },
    mounted() {
      this.loadData();
    },
    computed: {},
    methods: {
      /** @description: tab切换 点击处理 */
      handleTabsClick() {
        this.loadData();
      },
      selectOrg(org) {
        this.searchData.departmentName = org.unitName;
        this.searchData.departmentId = org.id;
      },
      selectOrg1(org) {
        console.log("打印这个数据看看", org);
        this.searchData.orgName = org.unitName;
        this.searchData.orgId = org.id;
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
              .deletePublishedManuscriptData({
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
        this.commonLoadListData(
          this.$refs.publicationDataListTable,
          pagination, {
            filterState: "4",
            /** @description: 办结传1，其他不传 */
            processState: this.actionTabsName === "tabs_done" ? "1" : "",
            ...(this.searchData || {})
          },
          null,
          this.$api.duty.chengKanList,
          res => {
            this.tableData = res.list;
          }
        );
      },
      /** @description: 换行点击事件 */
      cellClick(row) {
        let rowData = JSON.stringify(row);
        const routeName = "chengkanDetailDone";
        // this.$intent.goNewPage(this, {
        //   name: routeName,
        //   query: {
        //     activeName: this.actionTabsName,
        //     /** @description: 来源路由名 据此中详情页中导航回来*/
        //     sourceRouteName: "managerCheckArticle",
        //     detail: rowData,
        //     isType: JSON.stringify("chengkan")
        //   },
        //   params: {
        //     paramsData: this.deepCopy(this.searchData)
        //   }
        // });
        this.hasOpened(row.id, {
          name: routeName,
          'query': {
            activeName: this.actionTabsName,
            /** @description: 来源路由名 据此中详情页中导航回来*/
            sourceRouteName: "managerCheckArticle",
            detail: rowData,
            isType: JSON.stringify("chengkan"),
            id:row.id
          },
          params: {
            paramsData: this.deepCopy(this.searchData)
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
