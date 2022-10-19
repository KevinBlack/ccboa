/**
* create by zx on 2020-7-8 17:37
* 类注释：
* 备注：
*/
<template>
  <div class="reviewLogs">
    <div class="formHeader">
      <div class="title-text">用户回顾</div>
    </div>
    <fd-form :data="formData" @submit="submit" :columns="formCfg"></fd-form>

    <m-table
      @refresh="loadData()"
      size="medium"
      :isIndex="true"
      :isHandle="false"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import FdForm from "vue-elementui-freedomen/components/form";
import mTable from "components/table/tTable";

export default {
  name: "reviewLogs",
  components: {
    FdForm,
    mTable,
  },
  props: {},
  data() {
    return {
      formCfg: [
        [
          { type: "select", prop: "1", style: { width: "30%" } },
          {
            type: "button-primary",
            prop: "$submit",
            value: "开始查询",
            style: { "margin-left": "20px" },
          },
          { type: "button", prop: "$reset", value: "重置" },
          { type: "formitem", label: "分类方式" },
        ],
      ],
      formData: {},
      tableData: [],
      tableCols: [
        { label: "拟稿日期", prop: "draftTime" },
        { label: "编号", prop: "documentNo" },
        { label: "标题", prop: "title" },
        { label: "当前环节", prop: "currentNode" },
        { label: "操作人", prop: "currentUser" },
        { label: "拟稿人", prop: "draftUser" },
      ],
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 20,
      },
    };
  },
  computed: {},
  methods: {
    submit() {
      this.loadData();
    },
    loadData() {
      console.log("------>", this.formData);
    },
  },
  activated() {},
  mounted() {},
  created() {},
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  padding: 8px 70px;

  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
</style>
