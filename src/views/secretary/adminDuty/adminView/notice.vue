
<template>
  <div class="dutyNoticeform">
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="全部" name="tabs-all">
        <el-form :model="formData" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-date-picker
                style="margin-bottom:20px"
                v-model="dutyDate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type:date
                value-format="yyyy-MM-dd"
                :style="{width:'81%'}"
              ></el-date-picker>
            </el-col>
            <el-col :span="10">
              <el-button type="primary" @click="submit" style="margin-left:-20px">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="待确定" name="tabs-to">
        <el-form :model="formData" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-date-picker
                style="margin-bottom:20px"
                v-model="dutyDate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type:date
                value-format="yyyy-MM-dd"
                :style="{width:'81%'}"
              ></el-date-picker>
            </el-col>
            <el-col :span="10">
              <el-button type="primary" @click="submit" style="margin-left:-20px">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="已确定" name="tabs-done">
        <el-form :model="formData" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-date-picker
                style="margin-bottom:20px"
                v-model="dutyDate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type:date
                value-format="yyyy-MM-dd"
                :style="{width:'81%'}"
              ></el-date-picker>
            </el-col>
            <el-col :span="10">
              <el-button type="primary" @click="submit" style="margin-left:-20px">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <m-table
      ref="dutyNoticeTab"
      @refresh="refreshData"
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isHandle="false"
      :searchData="formData"
      :tableData="tableData"
      :tableCols="tableCols"
      @cellClick="cellClick"
      :pagination="pagination"
    ></m-table>
  </div>
</template>
<script>
import mTable from "components/table/tTable";
import baseSearchForm from "components/form/baseSearchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  components: {
    mTable,
    // baseSearchForm,
  },
  props: {},
  data() {
    return {
      activeName: "tabs-all",
      region: "",
        dutyDate: "",
      formData: {
        sortKey: "",
      
        depId: JSON.parse(localStorage.getItem("userInfo")).unitId,
      },
      tableData: [],
      tableCols: [
        // {label: '序号', type: 'index'},
        { label: "值班日期", prop: "dutyDate" },
        { label: "排班类型", prop: "dutyTypeStr" },
        { label: "值班类型", prop: "lightOrNightStr" },
        { label: "值班人", prop: "ondutyHumanName" },
        { label: "排班人", prop: "createHumanName" },
        { label: "排班日期", prop: "createTime" },
        { label: "确认状态", prop: "feedBackFlagStr" },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    //点击导航条切换
    handleTabsClick(tab) {
      if (tab.index == 0) {
        //全部
        this.formData.feedBackFlag = "";
        this.loadData();
      } else if (tab.index == 1) {
        //待确定
        this.formData.feedBackFlag = "1";
        this.loadData();
      } else if (tab.index == 2) {
        //已确定
        this.formData.feedBackFlag = "2";
        this.loadData();
      }
    },
    //点击列表条详情
    cellClick(row) {
      console.log(row);
      console.log(this.activeName);
      if (this.activeName === "tabs-to") {
        //待确定
        this.$intent.goNewPage(this,  {
          name: "dutyNoticeDetail",
          query: { detail: JSON.stringify(row), types: "to" },
        });
      } else if (this.activeName === "tabs-done") {
        //已确定
        this.$intent.goNewPage(this, {
          name: "dutyNoticeDetail",
          query: { detail: JSON.stringify(row), types: "done" },
        });
      } else if (this.activeName === "tabs-all") {
        if (row.feedBackFlagStr === "未确认") {
          //待确定
          this.$intent.goNewPage(this, {
            name: "dutyNoticeDetail",
            query: { detail: JSON.stringify(row), types: "to" },
          });
        } else if (row.feedBackFlagStr === "已确认") {
          //已确定
          this.$intent.goNewPage(this, {
            name: "dutyNoticeDetail",
            query: { detail: JSON.stringify(row), types: "done" },
          });
        }
      }
    },
    reset() {
      this.formData = {
        dutyDate: "",
        depId: JSON.parse(localStorage.getItem("userInfo")).unitId,
      };
      this.loadData();
    },
    submit(params) {
      this.loadData();
    },
    refreshData() {
      if (this.formData.sortKey === "dutyTypeStr") {
        this.formData.sortKey = "dutyType";
      }
      if (this.formData.sortKey === "lightOrNightStr") {
        this.formData.sortKey = "lightOrNight";
      }
      if (this.formData.sortKey === "feedBackFlagStr") {
        this.formData.sortKey = "feedBackFlag";
      }
      this.loadData();
    },
    loadData() {
      console.log("this.formData", this.formData);
      if (this.dutyDate) {
        this.formData.startDateStr = this.dutyDate[0];
        this.formData.endDateStr = this.dutyDate[1];
      }
      // delete this.formData.dutyDate;
      this.$api.secreatary.dutyWork
        .getDytyList(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.data;
          res.data.map((item) => {
            if (item.dutyDate) {
              let dataT = new Date(item.dutyDate);
              let yearD = dataT.getFullYear();
              let monthD = dataT.getMonth() + 1;
              let dayD = dataT.getDate();

              monthD = monthD <= 9 ? "0" + monthD : monthD;
              dayD = dayD <= 9 ? "0" + dayD : dayD;

              item.dutyDate = yearD + "-" + monthD + "-" + dayD;
            }

            if (item.createTime) {
              let dataT1 = new Date(item.createTime);
              let yearD1 = dataT1.getFullYear();
              let monthD1 = dataT1.getMonth() + 1;
              let dayD1 = dataT1.getDate();
              monthD1 = monthD1 <= 9 ? "0" + monthD1 : monthD1;
              dayD1 = dayD1 <= 9 ? "0" + dayD1 : dayD1;
              item.createTime = yearD1 + "-" + monthD1 + "-" + dayD1;
            }
          });
          //     this.pagination.total = res.total
        });
    },
  }, 
  created() {
    
    this.formData.feedBackFlag = "";
    this.loadData();
  },
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.cSpace {
  width: 100%;
  height: 20px;
}
</style>



