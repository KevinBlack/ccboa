<template>
  <div class="AllWrapper wh100" style="min-height:600px">
    <el-col :span="24" class="deptTabs">
      <el-tabs v-model="typeFW" @tab-click="tabsClickDEPT_FW" style="height:30px">
        <el-tab-pane label="未办结" name="todoFW" v-if="bhType !=='4'"></el-tab-pane>
        <el-tab-pane label="已办结" name="doneFW"></el-tab-pane>
        <el-row>
          <!-- 会议纪要、发文begin-->
          <el-table :data="tableData" height="480" :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}" ref="finishTable" v-show="bhType ==='4'">
            <el-table-column width="50" type="index" :index="inedxMethod" align="center" label="序号"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='1'" prop="meetingEndTime" label="会议结束时间" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='2'" prop="draft_time" label="拟稿时间" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='3'" prop="createTime" label="会签时间" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="title" label="标题" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='1' || postType ==='3'" prop="documentNo" label="文号" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='2'" prop="document_no" label="文号" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='1' || postType ==='2'" prop="deptName" label="拟稿部门" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='2'" prop="TYPE" label="发文类型" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='3'" prop="disposeDuration" label="会签时长（天）" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='3'" prop="deptName" label="会签部门" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='1'" prop="sendTime" label="办结时间" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='3'" prop="finishtTime" label="办结时间" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="postType ==='1' || postType ==='2'" prop="disposeDuration" label="办理时长（天）" align="center"></el-table-column>
          </el-table>
          <!--end -->
          <!--督办begin-->
          <el-table :data="tableData" height="480" :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}" ref="finishTable" v-show="bhType ==='5'">
            <el-table-column width="50" type="index" :index="inedxMethod" align="center" label="序号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="doucumentNum" label="编号" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="projectBase" label="立项依据" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="undertakeDeptName" label="承办部门" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="underTakeStartTime" label="承办开始时间" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="underTakeEndTimeShow" label="承办结束时间" align="center" v-if = "typeFW=='doneFW'"></el-table-column>
            <el-table-column show-overflow-tooltip prop="finishUseTimeShow" label="办理时长" align="center"></el-table-column>
          </el-table>
          <!--end -->
          <!-- 部门整体、独立承办、协办begin -->
          <el-table :data="tableData" height="480" :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}" ref="finishTable" v-show="finishTimeTrue && bhType !=='4' && bhType !=='5'">
            <el-table-column width="50" type="index" :index="inedxMethod" align="center" label="序号"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="!isXieBan" prop="sendUndertakeTime" label="发承办时间" align="center"></el-table-column>
            <!-- 协办效率 -->
            <el-table-column show-overflow-tooltip v-if="isXieBan" prop="startTime" label="协办开始时间" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="title" label="标题" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="documentCode" label="文号" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="sendOrgName" label="来文单位" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="disposeDuration" label="办理时长（天）" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="undertakeDeptName" v-if="!isXieBan" label="承办部门" align="center"></el-table-column>
            <!-- 协办效率 -->
            <el-table-column show-overflow-tooltip v-if="isXieBan" prop="assistDeptName" label="协办部门" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="isXieBan" prop="updateTime" label="办结时间" align="center"></el-table-column>
          </el-table>
          <el-table :data="tableData" height="480" :header-cell-style="{background:'rgba(255, 255, 255, 0.15)', color:'#fff',fontWeight:'700',border:'1px soild #ccc'}" ref="finishTable1" v-show="!finishTimeTrue && bhType !=='4' && bhType !=='5'">
            <el-table-column width="50" type="index" :index="inedxMethod" align="center" label="序号"></el-table-column>
            <el-table-column show-overflow-tooltip v-if="!isXieBan" prop="sendUndertakeTime" label="发承办时间" align="center"></el-table-column>
            <!-- 协办效率 -->
            <el-table-column show-overflow-tooltip v-if="isXieBan" prop="startTime" label="协办开始时间" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="title" label="标题" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="documentCode" label="文号" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="sendOrgName" label="来文单位" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="disposeDuration" label="办理时长（天）" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="undertakeDeptName" v-if="!isXieBan" label="承办部门" align="center"></el-table-column>
            <!-- 协办效率 -->
            <el-table-column show-overflow-tooltip v-if="isXieBan" prop="assistDeptName" label="协办部门" align="center"></el-table-column>
          </el-table>
          <!--end-->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="postObj.limit" layout="total, sizes, prev, pager, next, jumper" :total="postObj.total"></el-pagination>
        </el-row>
      </el-tabs>
    </el-col>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import dateFormate from "@/util/filters"
export default {
  components: {

  },
  props: {
    postType: { type: String, default: "" },
    processInstId: { type: String, default: "" },
    isXieBan: { type: Boolean, default: false },
    bhType: { type: String, default: "" }
  },
  watch: {
    processInstId(val) {
      if (val) {
        this.initData();
      }
    },
  },
  data() {
    return {
      tableData: [],
      typeFW: "doneFW",
      postObj: {
        total: 0,
        state: '1',
        curNodeCode: '800',
        page: 1, //当前页数
        limit: 10, //每页条数
        function: '',
        curDeptId: '',
        deptId: '',
        type: '1'
      },
      finishTimeTrue: true,
    };
  },
  computed: {
    ...mapGetters("efficiency", ["baseParams"])
  },
  methods: {
    inedxMethod(index) {
      let curpage = this.postObj.page;
      let limitpage = this.postObj.limit;
      return (index + 1) + (curpage - 1) * limitpage
    },
    initData() {
      this.postObj = Object.assign(this.postObj, this.baseParams);
      if (this.bhType === '4') {
        this.postObj.curDeptId = this.processInstId;
        this.postObj.type = this.postType;
        this.postObj.function = 'getEfflciencyForSendData';
      } else if (this.bhType === '5') {
        this.postObj.deptId = this.processInstId;
        this.postObj.type = this.postType;
        this.postObj.function = 'selectSuperviseDetail';
        this.postObj.curNodeCode == '800' ? this.typeFW = 'doneFW' : this.typeFW = 'todoFW';
      } else {
        this.postObj.curDeptId = this.processInstId;
        this.postObj.state == '0' ? this.typeFW = 'todoFW' : this.typeFW = 'doneFW';
        this.postObj.type = this.bhType;
        this.postObj.function = 'receiveDataAll';
      }
      //请求列表数据：TODO
      this.$post
        .postData(
          this.postObj.function,
          JSON.stringify(this.postObj),
          this.$businessCode.xnkb
        )
        .then(res => {
          if (res.success) {
            this.tableData = res.data.rows;
            this.tableData.forEach((item) => {
              item.disposeDuration = item.disposeDuration ? item.disposeDuration + '天' : '--';
              item.meetingEndTime = item.meetingEndTime ? dateFormate.dataFormat(Date.parse(item.meetingEndTime)) : "";
              item.finishUseTimeShow = item.finishUseTime + '天' || "--";
              item.underTakeEndTimeShow = item.underTakeEndTime || "--";
              if (this.postType === '2') {
                item.disposeDuration = item.dispose_duration + '天';
              }
              item.sendUndertakeTime = item.sendUndertakeTime || "--"
            })
            this.postObj.total = res.data.total;
            this.postObj.limit = res.data.pageSize;
          }
        });
    },
    tabsClickDEPT_FW(tab) {
      if (this.bhType !== '4') {
        this.tableData = [];
        this.postObj.total = 0;
        this.postObj.page = 1;
        this.postObj.state = tab.index;
        if (this.postObj.state == 1) {
          this.postObj.curNodeCode = "800";
          this.finishTimeTrue = true;
        } else {
          this.postObj.curNodeCode = ""
          this.finishTimeTrue = false;
        }
        this.initData();
      }
    },
    handleSizeChange(val) {
      this.postObj.limit = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.postObj.page = val;
      this.initData();
    }
  },
  created() {
    this.initData();
  }
}; 
</script>
<style lang="less" scoped>
.AllWrapper {
  background-color: #03417e !important;
}
.wh100 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
/deep/.el-table {
  background-color: transparent;
  th,
  tr {
    background-color: transparent;
    color: #fff;
    font-weight: 700;
  }
}
/deep/.el-table td,
/deep/.el-table th {
  padding: 5px 0;
}
/deep/.el-table tr:hover td {
  background-color: transparent !important;
}
/deep/.el-table__header .cell {
  font-weight: bold;
  font-size: 14px;
}
/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border-bottom: 0;
}
/deep/.el-table__body-wrapper {
  background-color: rgba(255, 255, 255, 0.1);
  height: 447px !important;
}
/deep/.el-table::before {
  height: 0;
}
/deep/.el-tabs__item {
  color: aliceblue;
}
/deep/ .el-tabs__item.is-active {
  color: #409eff !important;
  font-weight: 600;
}
/deep/.el-dialog__header {
  padding: 10px 20px 5px !important;
}
/deep/.el-dialog__body {
  padding-top: 1px !important;
  background-color: #03417e !important;
}
/deep/.el-tabs__nav-wrap:after {
  height: 2px !important;
}
/deep/.el-tabs__active-bar {
  bottom: 0 !important;
  background-color: #409eff !important;
}

</style>

