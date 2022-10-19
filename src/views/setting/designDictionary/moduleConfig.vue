<!--
 * @Author: nwl
 * @Date: 2020-08-05 19:33:27
 * @LastEditTime: 2020-08-07 17:44:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\setting\designDictionary\moduleConfig.vue
-->
<template>
  <div class="content">
    <p class="base-title">部门配置</p>
    <div class="btn-list">
      <div class="btnAdd">+</div>
      <div class="btnDel">删除</div>
    </div>
    <div>
      <m-table
        @refresh="loadData()"
        @selection-change="getRowDatas(row)"
        @cellClick="cellClick"
        size="medium"
        :isPagination="true"
        :isHandle="false"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :isSelection="true"
      ></m-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/mTable";
export default {
  name: "empty",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      tableCols: [
        { label: "模块分类", prop: "moduleClassify"},
        { label: "模块名称", prop: "moduleName" },
        { label: "模块关键字", prop: "moduleKeyWord" },
        { label: "可用功能", prop: "availFunction" },
      ],
      tableData: [
        {
          moduleClassify: "银行",
          moduleName: "Bank",
          moduleKeyWord: "hah",
          availFunction: "xixi",
        },
        {
          moduleClassify: "银行1",
          moduleName: "Bank1",
          moduleKeyWord: "hah1",
          availFunction: "xixi1",
        },
        {
          moduleClassify: "银行2",
          moduleName: "Bank2",
          moduleKeyWord: "hah2",
          availFunction: "xixi2",
        },
        {
          moduleClassify: "银行3",
          moduleName: "Bank3",
          moduleKeyWord: "hah3",
          availFunction: "xixi3",
        },
        {
          moduleClassify: "银行4",
          moduleName: "Bank4",
          moduleKeyWord: "hah4",
          availFunction: "xixi4",
        },
      ],
      pagination: {
        pageNum: 1,
        total: 3,
      },
    };
  },
  computed: {},
  methods: {
    cellClick(e) {
      console.log(e);
      this.$router.push({
        name: "moduleConfigDetail",
        query: this.tableData[e.index],
      });
    },
  },
  activated() {},
  mounted() {},
  created() {},
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.content {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  line-height: 36px;
  .base-title {
    width: 100%;
    margin: 16px 0px;
    text-align: center;
    color: #3b85f0;
    font-size: 28px;
    font-weight: bolder;
  }
  .btn-list {
    margin: 16px 0px;
  .btnAdd{
      display: inline-block;
      line-height: 1;
      width:85px;
      line-height: 28px;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 2px dashed #409EFF;;
      color: #409EFF;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 3px;
      transition: 0.1s;
      font-weight: 500;
      margin-right: 10px;
    }
    .btnDel{
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      width:90px;
      line-height: 30px;
      background: #fff;
      border: 2px solid #409EFF;;
      color: #409EFF;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 3px;
      transition: 0.1s;
      font-weight: 500;
    }
  }
}
</style>
