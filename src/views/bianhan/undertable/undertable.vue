<template>
  <div id="bh_cb">
    <el-tabs v-model="sonselect" @tab-click="handleClick">
      <el-tab-pane label="全部" name="3"></el-tab-pane>
      <el-tab-pane name="0">
        <span slot="label">
          待办
          <el-badge :value="needTodoNum" class="item" type="primary"></el-badge>
        </span>
      </el-tab-pane>
      <el-tab-pane label="已办" name="1"></el-tab-pane>
      <el-tab-pane label="办结" name="2"></el-tab-pane>
    </el-tabs>
    <m-table
      @refresh="loadData"
      @cellClick="jumpdeal"
      :isHandle="false"
      :isIndex="true"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :tableRowClassNames="tableRowClassName"
      :pagination="pagination"
       :default-sort="{prop:'draftTime',order:'desc'}"
    ></m-table>
  </div>
</template>
<style lang="css">
  #bh_cb .el-table .caret-wrapper{
    opacity:0 !important;
  }
</style>
<script type="text/ecmascript-6">
import mTable from "components/table/tTable";
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
  
export default {
  name: "undertable",
  components: {
    mTable
  },
  mixins: [bianhanPublic],
  data() {
    return {
      needTodoNum: 0,
      sonselect: "0",
      tableData: [],
      formData: {
        sort: "desc",
        sortKey: "draftTime"
      },
      finshCols: [
        { label: "接收日期", prop: "draftTime" ,width:86},
        { label: "编号", prop: "documentNo",minwidth:220},
        { label: "标题", prop: "title",minwidth:438},
        { label: "拟稿人", prop: "draftUser" }
      ],
      allCols: [
        { label: "接收日期", prop: "draftTime" ,width:86},
        { label: "编号", prop: "documentNo",minwidth:220},
        { label: "标题", prop: "title",minwidth:438},
        { label: "当前环节", prop: "currentNode",minwidth:120 },
        { label: "操作人", prop: "currentUser" },
        { label: "拟稿人", prop: "draftUser" }
      ],
      tableCols: [
        { label: "接收日期", prop: "draftTime",width:86 },
        { label: "编号", prop: "documentNo",minwidth:220},
        { label: "标题", prop: "title",minwidth:438},
        { label: "当前环节", prop: "currentNode",minwidth:120 },
        { label: "操作人", prop: "currentUser" },
        { label: "拟稿人", prop: "draftUser" }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      }
    };
  },
  methods: {
    handleClick(tab) {
      this.formData = {};
      this.pagination = {
                    pageNum: 1,
                    pageSize: 20,
                };
      if (tab.index == 0 || tab.index == 1 || tab.index == 2) {
        this.tableCols = this.allCols;
      } else {
        this.tableCols = this.finshCols;
      }
      this.loadData();
    },
    loadData() {

      //当搜索条件为当前操作人时，后端所需字段为undertakeHandlePerson
      if(this.formData.sortKey=='currentUser'){
        this.formData.sortKey='undertakeHandlePerson';
      }

      this.formData.type = this.sonselect;
      this.$api.bianhan
        .ubderTable(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          try {
            this.tableData = res.list.filter(item => {
              item.draftTime = item.draftTime.slice(0, 10);
              return item;
            });
          } catch (e) {
              this.tableData = res.list;
          }

          this.pagination.total = res.total;
          if (this.sonselect === "0") {
            this.needTodoNum = res.total;
          }
        });
    },
    tableRowClassName(row) {
      if (row.isReadFlag == "0" && (this.sonselect == "0" || row.type == "0")) {
        return "warning-row";
      }
    },
    jumpdeal(val) {
      if (this.sonselect == "3") {
        //待办
        if (val.type == "0") {
                    this.hasOpened(val.id,{
            'name': "underdeal",
            // 'query': { id: val.id,ismulti:this.formData.isMulti,parentDocId:this.formData.parentDocId }
            'query': { id: val.id,ismulti:val.type}
          })

          // this.$intent.goNewPage(this, {
          //   name: "underdeal",
          //   query: { id: val.id }
          // });
          //已办
        } else if(val.type=='1'){
          this.$intent.goNewPage(this, {
            name: "underdealHas",
            query: { type: 1, id: val.id,ismulti:val.type }
          });
          //办结
        }else{
           this.$intent.goNewPage(this, {
            name: "underdealHas",
            query: { type: 2, id: val.id,ismulti:val.type }
          });
        }
      } else if (this.sonselect == "0") {
            this.hasOpened(val.id,{
            'name': "underdeal",
            'query': { id: val.id,ismulti:val.type }
          })
        // this.$intent.goNewPage(this, {
        //   name: "underdeal",
        //   query: { id: val.id }
        // });
      } else {
        this.$intent.goNewPage(this, {
          name: "underdealHas",
          query: { type: this.sonselect, id: val.id,ismulti:val.type }
        });
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style scoped lang="less">
.add_memo {
  width: 60px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border: 1px dashed #3b84ee;
  margin-left: 50px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
