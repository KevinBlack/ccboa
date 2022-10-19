<!--
 * @Author: your name
 * @Date: 2020-08-14 16:23:55
 * @LastEditTime: 2020-08-15 14:29:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \OAh:\oa2\src\views\approval\admin\adminTable.vue
--> 
<template>
  <div class="adminTable">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="流转" name="first">
        <el-select v-model="value1" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-tab-pane>
      <el-tab-pane label="办结" name="second">
        <el-date-picker v-model="tableData.value1" type="date" placeholder="选择日期"></el-date-picker>
      </el-tab-pane>
      <el-tab-pane label="传阅" name="third">
        <el-select v-model="value1" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-select v-model="value1" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>-->
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :pageSizeList='[20, 30, 50, 100, 200, 500]'
      :isSelection="true"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/mTable";
export default {
  name: "adminTable",
  components: {
    mTable,
  },
  props: {},
  data() {
    return {
      activeName: "second",
      tableData: [
        {
          name: "行名，部门",
          shenpi: "3",
          shenqing: "行名，部门",
          danwei: "3",
          title: "行名，部门",
          huanjie: "行名，部门",
          ren: "admin",
        },
        {
          name: "行名",
          shenpi: "3",
          shenqing: "部门",
          danwei: "34",
          title: "部门",
          huanjie: "行名",
          ren: "admin",
        },
      ],
      tableCols: [
        { label: "申请时间", prop: "name" },
        { label: "审批编号", prop: "shenpi" },
        { label: "申请编号", prop: "shenqing" },
        { label: "申请单位", prop: "danwei" },
        { label: "标题", prop: "title" },
        { label: "当前环节", prop: "huanjie" },
        { label: "操作人", prop: "ren" },
      ],
      pagination: {
        pageNum: 1,
        total: 10,
      },
      options: [],
      value1: "",
    };
  },
  computed: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    loadData() {},
    cellClick(row) {
      this.$intent.goNewPage(this,{path:'/approval/detail',query:{data:row}})
    },
  },
  activated() {},
  mounted() {},
  created() {},
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
