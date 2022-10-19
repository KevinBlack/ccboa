
<!--
 * @Author: your name
 * @Date: 2020-10-08 15:31:50
 * @LastEditTime: 2020-10-27 12:42:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OA\src\views\publication\editJournal\browsing\laigao.vue
--> 
<template>
  <div class="check">
    <div style="margin: 15px 0">
      <el-button type="primary" style="margin-left:20px;" @click="create_btn">新建</el-button>
      <el-button type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
    </div>
    <m-table
          @select="select" 
          @refresh="loadData"
          :isSelection="true"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
        ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "components/table/tTable";

export default {
  name: "check",
  components: {
    mTable
  },
  props: {},
  data() {
    return {
      // 列表上送参数集合
      listdata: {},
      tplIdArr:[],//模板Id
      tableLoading: false,
      searchData: {},
      tableData: [],
      tableCols: [
        { label: "模板标题", prop: "tplNm" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      options: [],
      value1: "",
      value: "",
      deleteArry: ""
    };
  },
  computed: {},
  methods: {
    // 获取列表选中id
    select(rows){
         let checkArr = [];
      rows.forEach(item => {
        checkArr.push(item.tplId);
      });
      this.tplIdArr= checkArr
    },
    //新建模板
    create_btn(index) {
       this.$router.push({
        path: "/publication/parameter/model/modelManage",
        query: {type:2}//模板标题id
      });
    },
    //初始化列表数据
    loadData() {
      this.$api.paraMeter
        .paraMeterList(this.listdata, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        })
        .then(res => {
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    //单条数据跳转详情
    cellClick(row) {
      console.log(row)
      this.$router.push({
        path: "/publication/parameter/model/modelManage",
        query: {tplId:row.tplId}//模板标题id
      });
    },
    //删除
    delete_btn() {
       this.$api.paraMeter
        .paraMeterDel({tplIdArr:this.tplIdArr})
        .then(res => {
          this.$message({
          type: "success",
          message: "删除成功!"
        });
          this.loadData()
        });
    }
  },
  activated() {},
  mounted() {},
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>




