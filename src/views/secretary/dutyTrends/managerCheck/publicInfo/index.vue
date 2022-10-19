<template>
  <div class="index">
    <div class="mt20end">
      <div class="cformdata">
        <el-form ref="refForm" :model="searchData1" label-width="160px">
          <el-col :span="12">
            <el-form-item label="发布日期" prop="data">
              <common-date-range ref="commonDateRange" :startDate.sync="searchData1.startDate"
                :endDate.sync="searchData1.endDate" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件标题" prop="submitColumn">
              <el-input v-model="searchData1.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div style="float:left;width:600px">
              <el-form-item label="机构名称">
                <select-org-or-dept :orgOrDeptId="'0'" @select="selectOrg">
                  <el-input type="text" readonly="readonly" placeholder="请选择机构" v-model="searchData1.orgName"
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
    <m-table ref="publishedDataListTable" @refresh="loadData" @cellClick="cellClick" @select="select" size="medium"
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
    mixins:[bianhanPublic],
    data() {
      return {
        /** @description: 表格数据 */
        tableData: [],
        /** @description: 表头 */
        tableCols: [{
            label: "发布时间",
            prop: "publishDate"
          },
          {
            label: "文件标题",
            prop: "title"
          },
          {
            label: "主办部门",
            prop: "zbDept"
          }
        ],
        searchData: {},
        searchData1: {
          orgName: "",
          orgId: ""
        },
        deleteArry: "" /** @description: id拼接 */
      };
    },
    watch: {},
    mounted() {
      this.loadData();
    },
    methods: {
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
              .deletePublishedInfoData({
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
          this.$refs.publishedDataListTable,
          pagination, {
            filterState: "1",
            ...(this.searchData1 || {}),
            ...(this.searchData || {})
          },
          null,
          this.$api.duty.getInfoList,
          res => {
            this.tableData = res.list;
          }
        );
      },
      /** @description: 换行点击事件 */
      cellClick(row) {
        // this.$intent.goNewPage(this, {
        //   name: "dutyTrendsReleaseDetail",
        //   query: {
        //     /** @description: 来源路由名 据此中详情页中导航回来*/
        //     sourceRouteName: "managerCheckPublicInfo",
        //     detail: JSON.stringify(row)
        //   }
        // });
        this.hasOpened(row.id, {
          name: 'dutyTrendsReleaseDetail',
          'query': {
            sourceRouteName: "managerCheckPublicInfo",
            detail: JSON.stringify(row),
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
