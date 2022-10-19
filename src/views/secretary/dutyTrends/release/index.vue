<!--
 * @Author:zj
 * @Date: 2020-06-19 15:58:18
 * @LastEditTime: 2020-12-24 11:45:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\system-manage\index.vue
-->
<template>
  <div class="organizationView">
    <el-form>
      <el-row style="margin-bottom: 10px" :gutter="20">
        <el-col :span="8">
          <el-form-item label="日期">
            <el-date-picker v-model="searchConditionData.publishDate" style="margin-let:20px" value-format="yyyy-MM-dd"
              type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="标题">
            <el-input type="text" v-model="searchConditionData.title" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="loadData">查询</el-button>
        </el-col>
      </el-row>
    </el-form>

    <div class="list">
      <m-table ref="releaseDataListTable" @refresh="loadData" :isSelection="true" :searchData="searchData"
        :tableData="tableData" :tableCols="tableCols" @cellClick="cellClick"></m-table>
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
      mTable,
    },
    mixins: [bianhanPublic],
    props: {},
    data() {
      return {
        searchConditionData: {
          filterState: '0',
          title: "",
          publishDate: "",
        },
        searchData: {},
        tableData: [],
        tableCols: [{
            label: "发布日期",
            prop: "publishDate"
          },
          {
            label: "文件标题",
            prop: "title"
          },
          {
            label: "主办部门",
            prop: "zbDept"
          },
        ]
      };
    },
    filters: {},
    computed: {},
    methods: {
      loadData(isRefresh, pagination) {
        this.commonLoadListData(this.$refs.releaseDataListTable, pagination, {
          ...(this.searchConditionData || {}),
          filterState: '0'
        }, null, this.$api.duty.getInfoList, res => {
          this.tableData = res.list;
        })
      },
      cellClick(row) {
        // this.$intent.goNewPage(this, {
        //   name: "dutyTrendsReleaseDetail",
        //   query: {
        //     /** @description: 来源路由名 据此中详情页中导航回来*/
        //     sourceRouteName: 'dutyTrendsReleaseIndex',
        //     detail: JSON.stringify(row),
        //   },
        // });
        this.hasOpened(row.id, {
          'name': "dutyTrendsReleaseDetail",
          'query': {
            'id': row.id,
            sourceRouteName: 'dutyTrendsReleaseIndex',
            detail: JSON.stringify(row),
          }
        })
      },
    },
    created() {
      this.searchConditionData.publishDate = this.getCurrentDateTime()
    },
    mounted() {
      this.loadData();
    },
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  /deep/ .el-form-item__content {
    display: inline-block;
  }

  /*.list {
    margin: 25px 0px 50px;
    float: right;
    width: 80%;
  }

  .leftTree {
    float: left;
    width: 20%;
    margin-top: 25px;
  }*/

</style>
