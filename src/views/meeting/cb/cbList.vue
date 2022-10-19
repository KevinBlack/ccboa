/**
* create by zx on 2020/7/29 16:40
* 类注释：
* 备注：
*/
<template>
  <div class="cbList">
    <el-tabs v-model="sonselect" @tab-click="handleClick">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          待办
          <el-badge :value="needTodoNum" class="item" type="primary"></el-badge>
        </span>
      </el-tab-pane>
      <!-- <el-tab-pane label="已办" name="A08461348"></el-tab-pane> -->
      <el-tab-pane label="已办"></el-tab-pane>
      <!-- <el-tab-pane label="办结" name="A08461349"></el-tab-pane> -->
      <el-tab-pane label="办结"></el-tab-pane>
      <el-col class="mt20end"></el-col>
    </el-tabs>
    <!-- <el-select v-model="value" placeholder="会议类型">
      <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label"></el-option>
    </el-select>-->
    <m-table @refresh="loadData" @cellClick="cellClick" size="medium" :isHandle="false" :searchData="searchData"
      :tableData="tableData" :tableCols="tableCols" :pagination="pagination"
      :default-sort="{prop:'receiveDate',order:'desc'}" style="margin-top:8px" :tableRowClassNames="tableRowClassName">
    </m-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import mTable from "@/components/table/tTable";
  import searchForm from "@/components/form/searchForm";
  import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  import {
    mapActions
  } from "vuex";
  export default {
    name: "cbList",
    components: {
      mTable,
    },
    props: {},
    mixins: [bianhanPublic],
    data() {
      return {
        needTodoNum: 0,
        sonselect: "1",
        selectIndex: 0,
        searchData: {
          sort: "desc",
          sortKey: "receiveDate",
        },
        tableData: [],
        tableCols: [{
            label: "接收日期",
            prop: "receiveDate",
            width: 200
          },
          {
            label: "名称",
            prop: "title",
            minwidth: 338
          },
          {
            label: "类型",
            prop: "type",
            formatter(row) {
              return row.type == "培训会议通知" ? "培训通知" : row.type;
            },
            width: 200,
          },
          {
            label: "主办部门",
            prop: "maindept",
            width: 200
          },
          {
            label: "当前处理人",
            prop: "undertakeHandlePerson",
            width: 200,
          },
        ],
        tableCols1: [{
            label: "接收日期",
            prop: "receiveDate",
            width: 200
          },
          {
            label: "名称",
            prop: "title",
            minwidth: 338
          },
          {
            label: "类型",
            prop: "type",
            formatter(row) {
              return row.type == "培训会议通知" ? "培训通知" : row.type;
            },
            width: 200,
          },
          {
            label: "主办部门",
            prop: "maindept",
            width: 200
          },
          {
            label: "当前处理人",
            prop: "undertakeHandlePerson",
            width: 200,
          },
        ],
        tableCols2: [{
            label: "接收日期",
            prop: "receiveDate",
            width: 260
          },
          {
            label: "名称",
            prop: "title",
            minwidth: 338
          },
          {
            label: "类型",
            prop: "type",
            formatter(row) {
              return row.type == "培训会议通知" ? "培训通知" : row.type;
            },
            width: 260,
          },
          {
            label: "主办部门",
            prop: "maindept",
            width: 260
          },
        ],
        pagination: {
          pageNum: 1,
          pageSize: 20,
        },
      };
    },
    computed: {},
    methods: {
      // ...mapActions([
      //   'setTodoItem'
      // ]),
      // setSelect (index) {
      //   if (this.selectIndex == index)
      //     return
      //   this.selectIndex = index;
      // },
      tableRowClassName(row) {
        if (
          row.isReadflag == "0" &&
          (this.sonselect == "1" || row.typeFlag == "0")
        ) {
          return "warning-row";
        }
      },
      cellClick(val) {
        // this.setTodoItem(val)
        if (this.sonselect == 0) {
          // if (val.typeFlag == '0') {//1已办      0  代办     2办结
          if (val.typeFlag == "0") {
            //      1  代办
            if (val.isCanOrCb == "0") {
              //参会
              // this.$intent.goNewPage(this, {
              //   path: "/meeting/chDetial",
              //   query: { id: val.id },
              // });
              this.hasOpened(val.id, {
                'name': "chDetial",
                'query': {
                  'id': val.id
                }
              })
            } else {
              // this.$intent.goNewPage(this, {
              //   path: "/meeting/cbDetial",
              //   query: { id: val.id },
              // });
              this.hasOpened(val.id, {
                'name': "cbDetial",
                'query': {
                  'id': val.id
                }
              })
            }
          } else {
            if (val.isCanOrCb == "0") {
              this.$intent.goNewPage(this, {
                path: "/meeting/chDoneDetial",
                query: {
                  id: val.id,
                  type1: val.typeFlag
                },
              });
            } else {
              this.$intent.goNewPage(this, {
                path: "/meeting/cbDoneDetial",
                query: {
                  id: val.id,
                  type1: val.typeFlag
                },
              });
            }
          }
        } else if (this.sonselect == 1) {
          if (val.isCanOrCb == "0") {
            // this.$intent.goNewPage(this, {
            //   path: "/meeting/chDetial",
            //   query: {
            //     id: val.id
            //   },
            // });
             this.hasOpened(val.id, {
                'name': "chDetial",
                'query': {
                  'id': val.id
                }
              })
          } else {
            // this.$intent.goNewPage(this, {
            //   path: "/meeting/cbDetial",
            //   query: {
            //     id: val.id
            //   },
            // });
             this.hasOpened(val.id, {
                'name': "cbDetial",
                'query': {
                  'id': val.id
                }
              })
          }
        } else {
          if (val.isCanOrCb == "0") {
            // console.log(333, val.id)
            // debugger
            this.$intent.goNewPage(this, {
              path: "/meeting/chDoneDetial",
              query: {
                id: val.id,
                type1: this.sonselect
              },
            });
          } else {
            this.$intent.goNewPage(this, {
              path: "/meeting/cbDoneDetial",
              query: {
                id: val.id,
                type1: this.sonselect
              },
            });
          }
        }
      },
      loadData(type) {
        if (!type) {
          this.pagination.pageNum = 1;
        }
        this.searchData.typeFlag = this.sonselect;
        this.$api.meeting
          .cbTable(this.searchData, {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          })
          .then((res) => {
            this.tableData = res.list;
            this.pagination.total = res.total;
            this.result = res.list;
            if (this.sonselect == "1") {
              this.needTodoNum = res.total;
            }
          });
      },
      handleClick() {
        if (this.sonselect == "3") {
          this.tableCols = this.tableCols2;
        } else {
          this.tableCols = this.tableCols1;
        }
        this.formData = {};
        this.pagination.pageNum = 1;
        this.loadData();
      },
    },
    activated() {},
    mounted() {},
    created() {
      this.loadData();
    },
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  .cbList {
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
