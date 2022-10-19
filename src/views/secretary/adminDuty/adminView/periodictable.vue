<!--
 * @Author: your name
 * @Date: 2020-08-07 15:13:09
 * @LastEditTime: 2021-01-15 11:17:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\secretary\adminDuty\adminView\periodictable.vue
--> 
<template>
    <div class="periodictable">
      <el-date-picker
        style="margin-bottom:20px"
        v-model="formData1.dutyDate"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        value-format="yyyy-MM-dd"
        end-placeholder="结束日期"
        @change="loadData()"
      ></el-date-picker>
      <m-table
        @refresh="loadData()"
        size="medium"
        :isSelection="true"
        :isPagination="true"
        :isIndex="true"
        :isHandle="false"
        :tableData="tableData"
        :searchData="searchData"
        :tableCols="tableCols"
        :pagination="pagination"
      ></m-table>
    </div>
  </template>
  
  <script>
  import mTable from "components/table/tTable";
  
  export default {
    name: "periodictable",
    components: {
      mTable,
    },
    props: {},
    data() {
      return {
        tableData: [],
        tableCols: [
          // { label: "序号", prop: "num" },
          { label: "排班周期", prop: "dataWork" },
          { label: "排班类型", prop: "dutyTypeStr" },
          { label: "排班人", prop: "createHumanName" },
          { label: "排班日期", prop: "createTime" },
        ],
        searchData: {
          sortKey: "",
        },
        pagination: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
        },
        formData1: {
          dutyDate: "",
        },
        formData: {
          startDateStr: "",
          endDateStr: "",
        },
      };
    },
    computed: {},
    methods: {
      loadData() {
        // 排序改字段
        if (this.searchData.sortKey === "dutyTypeStr") {
          this.searchData.sortKey = "dutyType";
        }
        if (this.searchData.sortKey === "dataWork") {
          this.searchData.sortKey = "startDate";
        }
  
        //日期
        if (this.formData1.dutyDate) {
          this.formData.startDateStr = this.formData1.dutyDate[0];
          this.formData.endDateStr = this.formData1.dutyDate[1];
        } else {
          this.formData.startDateStr = "";
          this.formData.endDateStr = "";
        }
        console.log("f", this.formData);
        this.$api.secreatary.dutyWork
          .manageList(
            {
              ...this.formData,
              ...this.searchData,
            },
            {
              PAGE_JUMP: this.pagination.pageNum,
              REC_IN_PAGE: this.pagination.pageSize,
            }
          )
          .then((res) => {
            this.tableData = res.data;
            this.pagination.total = res.total;
  
            res.data.map((item) => {
              if (item.createTime) {
                let dataT1 = new Date(item.createTime);
                let yearD1 = dataT1.getFullYear();
                let monthD1 = dataT1.getMonth() + 1;
                let dayD1 = dataT1.getDate();
                monthD1 = monthD1 <= 9 ? "0" + monthD1 : monthD1;
                dayD1 = dayD1 <= 9 ? "0" + dayD1 : dayD1;
                item.createTime = yearD1 + "-" + monthD1 + "-" + dayD1;
              }
  
              if (item.startDate) {
                let dataT2 = new Date(item.startDate);
                let yearD2 = dataT2.getFullYear();
                let monthD2 = dataT2.getMonth() + 1;
                let dayD2 = dataT2.getDate();
                monthD2 = monthD2 <= 9 ? "0" + monthD2 : monthD2;
                dayD2 = dayD2 <= 9 ? "0" + dayD2 : dayD2;
                item.startDate = yearD2 + "-" + monthD2 + "-" + dayD2;
              }
              if (item.endDate) {
                let dataT3 = new Date(item.endDate);
                let yearD3 = dataT3.getFullYear();
                let monthD3 = dataT3.getMonth() + 1;
                let dayD3 = dataT3.getDate();
                monthD3 = monthD3 <= 9 ? "0" + monthD3 : monthD3;
                dayD3 = dayD3 <= 9 ? "0" + dayD3 : dayD3;
                item.endDate = yearD3 + "-" + monthD3 + "-" + dayD3;
              }
              item.dataWork = item.startDate + " 至 " + item.endDate;
            });
          });
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
  </style>
  