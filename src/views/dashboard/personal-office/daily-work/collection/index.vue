<!--
 * @Author: wy
 * @Date: 2020-07-17 10:00:26
 * @LastEditTime: 2020-07-24 16:09:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\collection\index.vue
-->
<template>
  <div class="collection">
    <el-tabs v-model="searchData.moduleId" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in tabList" :label="item.label" :name="item.name" :key="index">
      </el-tab-pane>
    </el-tabs>
    <el-button @click="deleteCollection" type="primary" style=" margin: 10px 0">删除</el-button>
    <m-table
      @refresh="loadData()"
      size="medium"
      @select="select"
      :isSelection="true"
      :searchData="searchData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>
<script>
    import mTable from "components/table/mTable";

    export default {
        name: 'collection',
        components: {
            mTable
        },
        data() {
            return {
                selectRows: [],
                tabList: [
                    {name: "Send", label: "发文"},
                    {name: "Receive", label: "收文"},
                    {name: "Sign", label: "签报"},
                    {name: "HYGL", label: "会议培训"},
                    {name: "BH", label: "便函"},
                    {name: "SWSP", label: "事务审批"},
                    {name: "ZXDB", label: "专项督查办"},
                    {name: "mark", label: "印章管理"},
                    {name: "TEL", label: "电话记录"},
                ],
                searchData: {
                    curUserId: '1',
                    moduleId: "Send"
                },
                tableData: [],
                tableCols: [
                    {label: '标题', prop: 'title'},
                    {label: '日期', prop: 'scDate'},
                ],
                pagination: {
                    pageNum: 1,
                    total: 10
                },
            };
        },
        methods: {
            handleClick(tab, event) {
                this.loadData()
            },
            //删除
            deleteCollection() {
                if (this.selectRows.length > 0) {
                    let ids = [];
                    this.selectRows.forEach(item => {
                        ids.push(item.id)
                    })
                    this.$api.dailyWork.deleteCollection({ids: ids}).then(res => {
                        this.loadData()
                    })
                }
            },
            //加载
            loadData() {
                this.$api.dailyWork.selectCollection({mineCollection: this.searchData}, {
                    PAGE_JUMP: this.pagination.pageNum,
                    REC_IN_PAGE: 10
                }).then(res => {
                    this.tableData = res.data
                    this.pagination.total=res.total
                })
            },
            select(rows) {
                this.selectRows = rows
            }
        },
        created() {
            this.loadData()
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .collection {
    .noneRel {
      margin-top: 100px;
      font-size: 28px;
      line-height: 50px;
      font-weight: 600;
      text-align: center;
    }
  }
</style>
