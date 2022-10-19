<!--
 * @Author: your name
 * @Date: 2020-11-12 11:31:23
 * @LastEditTime: 2021-08-30 16:59:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oa\src\views\meeting\myMeetNotice\myMeetNotice.vue
-->
<template>
  <!-- 我的会议通知列表页 -->
  <div class="myMeetNotice">
    <m-table @refresh="loadData()" @cellClick="cellClick" size="medium" :isIndex="true" :isHandle="false"
      :searchData="searchData" :tableData="tableData" :tableCols="tableCols"
      :default-sort="{prop:'finishTime',order:'desc'}" :pagination="pagination" style="margin-top:8px"></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import mTable from "@/components/table/tTable";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  export default {
    name: "myMeetNotice",
    components: {
      mTable,
    },
    props: {},
    mixins: [bianhanPublic],
    data() {
      return {
        searchData: {
          sort: "desc",
          sortKey: "finishTime",
        },
        tableData: [],
        tableCols: [{
            label: "接收日期",
            prop: "finishTime"
          },
          {
            label: "会议名称",
            prop: "title"
          },
          {
            label: "通知类型",
            prop: "type",
            formatter(row) {
              return row.type == "培训会议通知" ? "培训通知" : row.type;
            },
          },
          {
            label: "主办部门",
            prop: "maindept"
          },
        ],
        pagination: {
          pageNum: 1,
          pageSize: 20,
          total: 10,
        },
      };
    },
    computed: {},
    methods: {
      cellClick(row) {
        // this.$intent.goNewPage(this, {
        //   path: "/meeting/chDoneDetial",
        //   query: { id: row.id },
        // });
        this.hasOpened(row.id, {
          'name': "chDoneDetial",
          'query': {
            'id': row.id
          }
        })
      },
      loadData() {
        this.$api.meeting
          .myNotice(this.searchData, {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: 10,
          })
          .then((res) => {
            this.tableData = res.list;
            this.pagination.total = res.total;
            this.result = res.list;
          });
      },
    },
    activated() {},
    mounted() {},
    created() {
      this.loadData();
      // if (this.$route.query.leixing == '本部会议通知') {
      //   this.hyConList1()
      // }
    },
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  .myMeetNotice {
    .memo_tab {
      width: 100%;
      display: flex;
      padding: 10px 0;
      margin-bottom: 15px;
      border-bottom: 1px solid #dcdcdc;

      .tab_selected {
        padding: 0 20px;
        margin-left: 30px;
        line-height: 40px;
        font-size: 24px;
        color: #4a4a4a;
        display: flex;
        cursor: pointer;

        .selectedbox {
          color: #4c8bfd;
        }

        span {
          display: block;
          width: 30px;
          height: 16px;
          font-size: 12px;
          color: #fff;
          background: #4c8bfd;
          border-radius: 6px;
          text-align: center;
          line-height: 16px;
          margin-top: 12px;
          margin-left: 12px;
        }
      }
    }
  }

</style>
