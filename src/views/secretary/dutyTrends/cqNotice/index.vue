<!--
 * @Author: zj
 * @Date: 2020-10-22 15:54:08
 * @LastEditTime: 2020-12-25 19:23:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\secretary\dutyTrends\cqNotice\index.vue
-->

<template>
  <div class="personList">
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="查看" name="tabs-look"></el-tab-pane>
      <el-tab-pane label="待发送" name="tabs-toSend"></el-tab-pane>
      <el-tab-pane label="已发送" name="tabs-sent"></el-tab-pane>
    </el-tabs>
    <!-- @description: 查看人员  -->
    <el-row style="margin-bottom: 10px" :gutter="20" v-if="activeName=='tabs-look'">
      <el-col :span="6">
      </el-col>
      <el-col :span="6">
      </el-col>
    </el-row>
    <!-- @description: 查看休眠人员  -->
    <el-row style="margin-bottom: 10px" :gutter="20" v-if="activeName=='tabs-toSend'">
      <el-col :span="6">
      </el-col>
      <el-col :span="6">
      </el-col>
    </el-row>

    <!-- @description: 查看文件交换人员配置  -->
    <el-row style="margin-bottom: 10px" :gutter="20" v-if="activeName=='tabs-sent'">
      <el-col :span="6">
      </el-col>
    </el-row>

    <!-- @description: 列表  -->
    <m-table ref="errorSituationDataTable" @refresh="loadData" :isIndex="true" :isSelection="true"
      @cellClick="cellClick" :searchData="searchData" :tableData="tableData" :tableCols="tableCols"
      :sortable="sortable"></m-table>
  </div>
</template>

<script>
  import mTable from "components/table/tTable";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  export default {
    name: "personList",
    components: {
      mTable
    },
    mixins: [bianhanPublic],
    props: {},
    data() {
      const {
        activeName
      } = this.$route.query || {}
      return {
        activeName: activeName || "tabs-look",
        searchData: {},
        formData: {},
        sortable: true,
        tableData: [],
        tableCols: [{
            label: "栏目名称",
            prop: "submitColumn"
          },
          {
            label: "来稿时间",
            prop: "createDate"
          },
          {
            label: "送报单位",
            prop: "submitUnit"
          },
        ],
        tableCols1: [{
            label: "栏目名称",
            prop: "submitColumn"
          },
          {
            label: "来稿时间",
            prop: "createDate"
          },
          {
            label: "送报单位",
            prop: "submitUnit"
          },
        ],

        /** @description: 休眠 */
        tableCols2: [{
            label: "栏目名称",
            prop: "submitColumn"
          },
          {
            label: "来稿时间",
            prop: "createDate"
          },
          {
            label: "送报单位",
            prop: "submitUnit"
          },
        ],

        /** @description: 文件交换柜人员管理 */
        tableCols3: [{
            label: "栏目名称",
            prop: "submitColumn"
          },
          {
            label: "来稿时间",
            prop: "createDate"
          },
          {
            label: "送报单位",
            prop: "humanName"
          },
        ]
      };
    },
    watch: {},
    computed: {
      /** @description: 查询条件数据 */
      queryConditionParams() {
        switch (this.activeName) {
          case 'tabs-toSend':
            return {
              isSendCq: "0", filterState: '0'
            }
            case 'tabs-sent':
              return {
                isSendCq: "1", filterState: '0'
              }
              case 'tabs-look':
              default:
                return {
                  filterState: '0'
                }
        }
      }
    },
    methods: {
      /** @description: 请求查看人员列表数据 */
      loadData(isRefresh, pagination) {
        this.commonLoadListData(this.$refs.errorSituationDataTable, pagination, this.queryConditionParams, null, this
          .$api.duty.getcqList, res => {
            this.tableData = res.list;
          })
      },
      /** @description: 点击列表条详情 */
      cellClick(row) {
        const tagFlag = ["tabs-sent", "tabs-look"].includes(this.activeName) ? '1' : '0'
        // this.$intent.goNewPage(this, {
        //   name: "dutyTrendsErrorSituationFormNotice",
        //   query: {          
        //     /** @description: 来源路由名 据此中详情页中导航回来*/
        //     sourceRouteName: 'dutyTrendsErrorSituationIndex',
        //     activeName: this.activeName,
        //     detail: JSON.stringify(row),
        //     typeCode: row.isSendCq,
        //     tagFlag:tagFlag
        //   },
        // });
        this.hasOpened(row.id, {
          'name': "dutyTrendsErrorSituationFormNotice",
          'query': {
            'id': row.id,
            sourceRouteName: 'dutyTrendsErrorSituationIndex',
            activeName: this.activeName,
            detail: JSON.stringify(row),
            typeCode: row.isSendCq,
            tagFlag: tagFlag
          }
        })
      },
      /** @description: 点击导航条切换 */
      handleTabsClick(tab) {
        this.loadData();
      },
    },
    activated() {},
    created() {},
    mounted() {
      this.loadData();
    },
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  .del {
    margin-left: 10px;
  }

</style>
