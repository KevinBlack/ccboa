<template>
  <!-- 这是印章保管人交接 -->
  <div class="sealKeeperChange">
    <!-- 操作按钮 -->
    <template>
      <el-tabs v-model="activeTabName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="alls">
          <!-- 全部流转按钮 -->
          <el-form :inline="true" :model="flowFormInline" class="demo-form-inline">
            <el-form-item>
              <el-button
                v-for="(item, index) in otherBtnList"
                :key="index"
                @click="clickAllsBtns(item)"
                v-show="item.show"
                type="primary"
              >{{item.label}}</el-button>
            </el-form-item>
          </el-form>
          <!-- 全部流转表格 -->
          <t-table
            size="medium"
            @refresh="loadTableData()"
            @cellClick="cellClick_alls"
            @select="selectTable_alls"
            :tableCols="flowTableCols"
            :pagination="pagination_all"
            :isSelection="true"
            :tableData="tableData_alls"
          ></t-table>
        </el-tab-pane>

        <el-tab-pane label="待办" name="flowDoing">
          <!-- 待办流转按钮 -->
          <el-form :inline="true" :model="flowFormInline" class="demo-form-inline">
            <el-form-item>
              <el-button
                v-for="(item, index) in flowingBtnList"
                :key="index"
                @click="clickFlowDoingBtns(item)"
                v-show="item.show"
                type="primary"
              >{{item.label}}</el-button>
            </el-form-item>
          </el-form>
          <!-- 待办流转表格 -->
          <t-table
            size="medium"
            @refresh="loadTableData()"
            @cellClick="cellClick_flowDoing"
            @select="selectTable_flowDoing"
            :tableCols="flowTableCols"
            :pagination="pagination_flowDoing"
            :isSelection="true"
            :tableData="tableData_flow_doing"
          ></t-table>
        </el-tab-pane>

        <el-tab-pane label="已办" name="flowDone">
          <!-- 已办流转按钮 -->
          <el-form :inline="true" :model="flowFormInline" class="demo-form-inline">
            <el-form-item>
              <el-button
                v-for="(item, index) in otherBtnList"
                :key="index"
                @click="clickFlowDoneBtns(item)"
                v-show="item.show"
                type="primary"
              >{{item.label}}</el-button>
            </el-form-item>
          </el-form>
          <!-- 已办流转表格 -->
          <t-table
            size="medium"
            @refresh="loadTableData()"
            @cellClick="cellClick_flowDone"
            @select="selectTable_flowDone"
            :tableCols="flowTableCols"
            :pagination="pagination_flowDone"
            :isSelection="true"
            :tableData="tableData_flow_done"
          ></t-table>
        </el-tab-pane>

        <el-tab-pane label="办结" name="done">
          <div class="doneMain">
            <el-select v-model="selectedDoneYear">
              <el-option
                v-for="item in allDoneYears"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button type="primary" :style="{marginLeft:'10px'}" @click="doQuery('done')">查询</el-button>
            <!-- 办结表格 -->
            <t-table
              size="medium"
              @refresh="loadTableData()"
              @cellClick="cellClick_done"
              @select="selectTable_done"
              :tableCols="doneTableCols"
              :pagination="pagination_done"
              :isSelection="true"
              :tableData="tableData_done"
            ></t-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
// 导入通用表格
import tTable from "@/components/table/tTable";

export default {
  name: "sealKeeperChange",
  components: {
    tTable
  },
  props: {},
  data() {
    return {
      activeTabName: "flowDoing",
      // 全部表
      tableData_alls: [], // 全部表的数据.对象数组
      tableSelects_alls: [], // 全部表的勾选记录.对象数组
      // 待办表
      tableData_flow_doing: [], // 待办表的数据.对象数组
      tableSelects_flow_doing: [], // 待办表的勾选记录。对象数组
      // 已办表
      tableData_flow_done: [], // 已办表的数据
      tableSelects_flow_done: [], // 已办流转表勾选的记录
      // 办结表
      tableData_done: [], // 办结表的数据
      tableSelects_done: [],
      //表格字段
      flowTableCols: [
        { label: "拟稿日期", prop: "Stmp_Main_HndOv_Tm" },
        { label: "印章编号", prop: "Stmp_ECD" },
        { label: "印章名称", prop: "Stmp_Nm" },
        { label: "编号", prop: "Apl_Aply_ID" },
        { label: "移交人", prop: "StmpMain_HndOv_Psn_Nm" },
        { label: "接收人", prop: "Stmp_Main_Rcv_Psn_Nm" },
        { label: "当前环节", prop: "Stmp_HndOv_StCd_Desc" },
        { label: "操作人", prop: "Operator" }
      ],
      doneTableCols: [
        { label: "交出时间", prop: "Stmp_Main_Rcv_Tm" },
        { label: "印章编号", prop: "Stmp_ECD" },
        { label: "印章名称", prop: "Stmp_Nm" },
        { label: "编号", prop: "Apl_Aply_ID" },
        { label: "移交人", prop: "StmpMain_HndOv_Psn_Nm" },
        { label: "接收人", prop: "Stmp_Main_Rcv_Psn_Nm" }
      ],
      pagination_all: {
        pageNum: 1,
        total: 0,
        pageSize: 10
      },
      pagination_flowDoing: {
        pageNum: 1,
        total: 0,
        pageSize: 10
      },
      pagination_flowDone: {
        pageNum: 1,
        total: 0,
        pageSize: 10
      },
      pagination_done: {
        pageNum: 1,
        total: 0,
        pageSize: 10
      },
      otherBtnList: [{ label: "查询", value: "01", show: true }],
      flowingBtnList: [
        { label: "查询", value: "01", show: true },
        { label: "起草", value: "02", show: true }
      ],
      flowFormInline: {
        selectedFlowStatus: ""
      },
      allFlowStatus: [
        {
          label: "待办",
          value: "01"
        },
        {
          label: "已办",
          value: "02"
        }
      ],
      // 办结相关参数
      selectedDoneYear: "",
      allDoneYears: []
    };
  },
  computed: {
    // 如果选择流转环节，则显示流转环节的table表和数据；如果选择办结环节，则显示办结的table表和数据
    tableCols: function() {
      if (this.activeTabName === "flow") {
        return this.flowTableCols;
      } else if (this.activeTabName === "done") {
        return this.doneTableCols;
      } else {
        return this.flowTableCols;
      }
    }
  },
  watch: {
    activeTab(tabVal) {
      // // 如果选择完结，查询年份
      // if (tabVal === 'done') {
      // }
      this.loadTableData();
    }
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "done") {
        // 获取完结的所有年份
        this.getDoneYears();
      }
    },
    // 点击table表的记录
    cellClick_alls(row) {
      console.log("点击全部的记录:", row);
      let _flag = row.Stmp_HndOv_StCd_Desc === "24" ? "see" : "modify"; // 当前环节'A99'-办结
      this.toSealKeeperChangePage(_flag, [row]);
    },
    cellClick_flowDoing(row) {
      console.log("点击待办的记录:", row);
      this.toSealKeeperChangePage("modify", [row]);
    },
    cellClick_flowDone(row) {
      console.log("点击已办的记录:", row);
      this.toSealKeeperChangePage("see", [row]);
    },
    cellClick_done(row) {
      console.log("点击办结的记录:", row);
      this.toSealKeeperChangePage("see", [row]);
    },

    // 保存待办flow表勾选的记录。rows:所有的勾选记录。对象数组
    selectTable_alls(rows) {
      this.tableSelects_alls = rows;
    },
    selectTable_flow_doing(rows) {
      this.tableSelects_flow_doing = rows;
    },
    selectTable_flow_done(rows) {
      this.tableSelects_flow_done = rows;
    },
    selectTable_done(rows) {
      this.tableSelects_done = rows;
    },
    /**
     * 跳转到刻制文档页面。可修改，可查看
     * @param {String} type 文档类型。有 new, modify, see三种
     * @param {Array} [selects] 可选，勾选的记录。对象数组
     * @param {Object} [extraQuery] 可选，额外的query参数对象，其可枚举的属性会复制到跳转query对象里
     */
    toSealKeeperChangePage(type = "see", selects, extraQuery) {
      let query = {};
      query.type = type;
      if (type !== "new") {
        if (!selects || selects.length === 0) {
          this.$message({ message: "请先勾选一条记录！", type: "warning" });
          return;
        }
        if (selects.length > 1) {
          this.$message({ message: "只能勾选一条记录！", type: "warning" });
          return;
        }
        query.Stmp_HndOv_Bsn_ID = selects[0].Stmp_HndOv_Bsn_ID; // 申请业务编号
      }
      // 如果有额外的query参数对象，将其可枚举的属性复制到query对象里
      if (typeof extraQuery === "object") {
        Object.assign(query, extraQuery);
      }
      // 跳转到印章保管交接页面。 query相当于带查询参数?a=jk&b=2
      this.$router.push({
        path: "/sealManage/sealKeeperChange/sealKeeperChangeForm",
        query: query
      });
    },

    // 点击全部流转中的按钮
    clickAllsBtns(btnInfo) {
      console.log("点击全部标签页按钮：", btnInfo);
      let name = btnInfo.value; // 按钮的名字
      if (name === "01") {
        //查询
        this.doQuery("alls");
      }
    },

    // 点击待办流转中的按钮
    clickFlowDoingBtns(btnInfo) {
      console.log("点击的待办完结按钮的信息：", btnInfo);
      let name = btnInfo.value;
      if (name === "01") {
        //查询
        this.doQuery("flowDoing");
      } else if (name === "02") {
        //起草
        this.toSealKeeperChangePage("new");
      }
    },

    // 点击已办流转中的按钮
    clickFlowDoneBtns(btnInfo) {
      console.log("点击的流转完结按钮的信息：", btnInfo);
      let name = btnInfo.value; // 点击按钮的名字
      if (name === "01") {
        //查询
        this.doQuery("flowDone");
      }
    },
    //全部流转数据
    getAllsTableData() {
      //查询前选将表格数据置空
      this.tableData_alls = [];
      let jsonData = {
        Mnplt_TpCd: "03", //全部
        _pagination: {
          PAGE_JUMP: this.pagination_all.pageNum,
          REC_IN_PAGE: this.pagination_all.pageSize
        }
      };
      return this.$api.sealManage.sealKeeperChange.querySealKeeperChange(
        jsonData
      );
    },
    //待办流转数据
    getDoingFlowTableData() {
      //查询前选将表格数据置空
      this.tableData_flow_doing = [];
      let jsonData = {
        Mnplt_TpCd: "01", //待办
        _pagination: {
          PAGE_JUMP: this.pagination_flowDoing.pageNum,
          REC_IN_PAGE: this.pagination_flowDoing.pageSize
        }
      };
      return this.$api.sealManage.sealKeeperChange.querySealKeeperChange(
        jsonData
      );
    },
    //已办流转数据
    getDoneFlowTableData() {
      //查询前选将表格数据置空
      this.tableData_flow_done = [];
      let jsonData = {
        Mnplt_TpCd: "02", //已办
        _pagination: {
          PAGE_JUMP: this.pagination_flowDone.pageNum,
          REC_IN_PAGE: this.pagination_flowDone.pageSize
        }
      };
      return this.$api.sealManage.sealKeeperChange.querySealKeeperChange(
        jsonData
      );
    },
    //办结
    getDoneTableData() {
      //查询前选将表格数据置空
      this.tableData_done = [];
      let jsonData = {
        Mnplt_TpCd: "04", //办结
        _pagination: {
          PAGE_JUMP: this.pagination_done.pageNum,
          REC_IN_PAGE: this.pagination_done.pageSize
        }
      };
      return this.$api.sealManage.sealKeeperChange.querySealKeeperChange(
        jsonData
      );
    },
    // 查询
    doQuery(status) {
      // 全部
      if (status === "alls") {
        this.getAllsTableData()
          .then(res => {
            if (res.Stmp_HndOv_Record_Grp) {
              console.log(
                "querySealRegister返回的数据：",
                res.Stmp_HndOv_Record_Grp
              );
              for (var i = 0; i < res.Stmp_HndOv_Record_Grp.length; i++) {
                res.Stmp_HndOv_Record_Grp[i].Operator = JSON.parse(
                  localStorage.userInfo
                ).humanName;
                if (res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "20") {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "起草";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "21"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "审核";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "22"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "移交";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "23"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "接收";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "24"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc =
                    "交接完成";
                }
                this.tableData_alls.push(res.Stmp_HndOv_Record_Grp[i]);
              }
              console.log("表格数据：", this.tableData_alls);
              if (
                res._COMMON &&
                res._COMMON.COMB &&
                res._COMMON.COMB.TOTAL_REC
              ) {
                this.pagination_all.total = res._COMMON.COMB.TOTAL_REC; // 总数量
              }
            }
          })
          .catch(err => {
            this.$message({
              message: "查询全部流转数据失败！",
              type: "error"
            });
          });
        // 待办流转
      } else if (status === "flowDoing") {
        this.getDoingFlowTableData()
          .then(res => {
            if (res.Stmp_HndOv_Record_Grp) {
              console.log(
                "querySealRegister返回的数据：",
                res.Stmp_HndOv_Record_Grp
              );
              for (var i = 0; i < res.Stmp_HndOv_Record_Grp.length; i++) {
                res.Stmp_HndOv_Record_Grp[i].Operator = JSON.parse(
                  localStorage.userInfo
                ).humanName;
                if (res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "20") {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "起草";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "21"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "审批";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "22"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "移交";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "23"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "接收";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "24"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc =
                    "交接完成";
                }
                this.tableData_flow_doing.push(res.Stmp_HndOv_Record_Grp[i]);
              }
              console.log("表格数据：", this.tableData_flow_doing);
              if (
                res._COMMON &&
                res._COMMON.COMB &&
                res._COMMON.COMB.TOTAL_REC
              ) {
                this.pagination_flowDoing.total = res._COMMON.COMB.TOTAL_REC; // 总数量
              }
            }
          })
          .catch(err => {
            this.$message({
              message: "查询待办流转数据失败！",
              type: "error"
            });
          });

        // 已办流转
      } else if (status === "flowDone") {
        this.getDoneFlowTableData()
          .then(res => {
            if (res.Stmp_HndOv_Record_Grp) {
              console.log(
                "querySealRegister返回的数据：",
                res.Stmp_HndOv_Record_Grp
              );
              for (var i = 0; i < res.Stmp_HndOv_Record_Grp.length; i++) {
                res.Stmp_HndOv_Record_Grp[i].Operator = JSON.parse(
                  localStorage.userInfo
                ).humanName;
                if (res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "21") {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "审核";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "22"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "移交";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "23"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "接收";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "24"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc =
                    "交接完成";
                }
                this.tableData_flow_done.push(res.Stmp_HndOv_Record_Grp[i]);
              }
              console.log("表格数据：", this.tableData_flow_done);
              if (
                res._COMMON &&
                res._COMMON.COMB &&
                res._COMMON.COMB.TOTAL_REC
              ) {
                this.pagination_flowDone.total = res._COMMON.COMB.TOTAL_REC; // 总数量
              }
            }
          })
          .catch(err => {
            // 使用箭头符号函数，这儿this是vue实例对象；如果使用function(){},则this为undefined. todo:why
            this.$message({
              message: "查询已办流转数据失败！",
              type: "error"
            });
          });

        // 办结
      } else if (status === "done") {
        this.getDoneTableData()
          .then(res => {
            if (res.Stmp_HndOv_Record_Grp) {
              console.log(
                "querySealRegister返回的数据：",
                res.Stmp_HndOv_Record_Grp
              );
              for (var i = 0; i < res.Stmp_HndOv_Record_Grp.length; i++) {
                res.Stmp_HndOv_Record_Grp[i].Operator = JSON.parse(
                  localStorage.userInfo
                ).humanName;
                if (res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "21") {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "审核";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "22"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "移交";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "23"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "接收";
                } else if (
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "24"
                ) {
                  res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc =
                    "交接完成";
                }
                this.tableData_done.push(res.Stmp_HndOv_Record_Grp[i]);
              }
              console.log("表格数据：", this.tableData_done);
              if (
                res._COMMON &&
                res._COMMON.COMB &&
                res._COMMON.COMB.TOTAL_REC
              ) {
                this.pagination_done.total = res._COMMON.COMB.TOTAL_REC; // 总数量
              }
            }
          })
          .catch(err => {
            this.$message({
              message: "查询完结数据失败！",
              type: "error"
            });
          });
      }
    },
    // 点击按钮
    buttonClick(item) {
      if (item === "01") {
        this.$router.push({
          path: "/sealManage/sealKeeperChange/sealKeeperChangeForm"
        });
      } else if (item === "02") {
        console.log("审核开始");
        // 判断是否有勾选一条记录
        if (this.selectTableData.length === 0) {
          this.$message({
            message: "请先勾选一条记录再进行修改审批！",
            type: "warning",
            showClose: true
          });
          return;
        }
        // 跳转到修改页面 // query相当于带查询参数?a=jk&b=2， params相当于#a=2
        let selects = this.selectTableData[0];
        console.log("审批选择的记录", selects);
        this.$router.push({
          path: "/sealManage/sealKeeperChange/sealKeeperChangeForm",
          query: { Stmp_HndOv_Bsn_ID: selects.Stmp_HndOv_Bsn_ID }
        });
      } else if (item === "03") {
        console.log("移交开始");
        // 判断是否有勾选一条记录
        if (this.selectTableData.length === 0) {
          this.$message({
            message: "请先勾选一条记录再进行移交！",
            type: "warning",
            showClose: true
          });
          return;
        }
        // 跳转到修改页面 // query相当于带查询参数?a=jk&b=2， params相当于#a=2
        let selects = this.selectTableData[0];
        console.log("移交选择的记录", selects);
        this.$router.push({
          path: "/sealManage/sealKeeperChange/sealKeeperChangeForm",
          query: { Stmp_HndOv_Bsn_ID: selects.Stmp_HndOv_Bsn_ID }
        });
      } else if (item === "04") {
        console.log("接收开始");
        // 判断是否有勾选一条记录
        if (this.selectTableData.length === 0) {
          this.$message({
            message: "请先勾选一条记录再进行接收！",
            type: "warning",
            showClose: true
          });
          return;
        }
        // 跳转到修改页面 // query相当于带查询参数?a=jk&b=2， params相当于#a=2
        let selects = this.selectTableData[0];
        console.log("接收选择的记录", selects);
        this.$router.push({
          path: "/sealManage/sealKeeperChange/sealKeeperChangeForm",
          query: { Stmp_HndOv_Bsn_ID: selects.Stmp_HndOv_Bsn_ID }
        });
      }
      /*
                else if(item === '05'){
                     console.log("删除开始");
                    // 判断是否有勾选一条记录
                    if (this.selectTableData.length === 0) {
                        this.$message({
                                message: '请先勾选一条记录再进行接收！',
                                type: 'warning',
                                showClose: true,
                            });
                        return;
                    }
                    // 跳转到修改页面 // query相当于带查询参数?a\=jk&b=2， params相当于#a=2
                    let selects = this.selectTableData[0];
                    console.log('删除的记录', selects);
                    let jsonData={};
                    jsonData.Mnplt_TpCd="05";//删除
                    jsonData.Stmp_HndOv_Bsn_ID = this.form.Stmp_HndOv_Bsn_ID; //印章交接业务编号
                    //发送交易
                    let that = this;
                    this.$api.sealManage.sealKeeperChange.sealKeeperChangeMgr(jsonData)
                    .then(res =>{
                        console.log('addSealKeeperChange返回的数据：', res, this);
                        that.$message({
                                type: "success",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接删除成功！',
                                duration: 2000
                            });   
                    })
                    .catch((err) => {
                        console.log('报错：', err);
                        that.$message({
                                type: "error",
                                showClose: true,
                                offset: 400,
                                message: '印章保管交接删除失败！\n'+err,
                                duration: 2000
                            });
                    })
                }*/
    },
    // 点击流转里的查询按钮
    getFlowTableData(flowStatus) {
      //查询前选将表格数据置空
      this.tableData = [];
      let jsonData = {
        Mnplt_TpCd: this.flowFormInline.selectedFlowStatus,
        _pagination: {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        }
      };
      this.$api.sealManage.sealKeeperChange
        .querySealKeeperChange(jsonData)
        .then(res => {
          console.log(
            "querySealRegister返回的数据：",
            res.Stmp_HndOv_Record_Grp
          );
          for (var i = 0; i < res.Stmp_HndOv_Record_Grp.length; i++) {
            res.Stmp_HndOv_Record_Grp[i].Operator = JSON.parse(
              localStorage.userInfo
            ).humanName;
            if (res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "21") {
              res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "起草待审核";
            } else if (res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "22") {
              res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "审批待移交";
            } else if (res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd == "23") {
              res.Stmp_HndOv_Record_Grp[i].Stmp_HndOv_StCd_Desc = "移交待接收";
            }
            this.tableData.push(res.Stmp_HndOv_Record_Grp[i]);
          }
          console.log("表格数据：", this.tableData);
        })
        .catch(err => {
          console.log("报错：", err);
        });
    },
    // 点击办结查询按钮
    getDoneTableData(flowStatus) {
      //查询前选将表格数据置空
      this.tableData = [];
      let jsonData = {
        Mnplt_TpCd: "04",
        _pagination: {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize
        }
      };

      this.$api.sealManage.sealKeeperChange
        .querySealKeeperChange(jsonData)
        .then(res => {
          console.log(
            "querySealRegister返回的数据：",
            res.Stmp_HndOv_Record_Grp
          );
          for (var i = 0; i < res.Stmp_HndOv_Record_Grp.length; i++) {
            this.tableData.push(res.Stmp_HndOv_Record_Grp[i]);
          }
          console.log("表格数据：", this.tableData);
        })
        .catch(err => {
          console.log("报错：", err);
        });
    },
    // table表的方法
    loadTableData(val) {
      console.log("loadTableData:", val);
    },
    cellClick(row) {
      console.log("cellClick:", row);
    },
    // 查询完结的所有年份,返回promise实例
    queryDoneYears() {
      // TODO: 以后补全查询年份的方法
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          let isSuccess = true;
          let years = [
            { label: "2009年", value: "2009年" },
            { label: "2010年", value: "2010年" },
            { label: "2011年", value: "2011年" },
            { label: "2012年", value: "2012年" }
          ];
          return isSuccess ? resolve(years) : reject(years);
        }, 200);
      });
    },
    // 获取完结的所有年份
    getDoneYears() {
      this.queryDoneYears()
        .then(years => {
          this.allDoneYears = years;
          this.selectedDoneYear = this.allDoneYears[0].value;
        })
        .catch(err => {
          console.log("getDoneYears:catch", err);
        });
    }
  },
  // 生命周期created:组件实例创建完成，属性已绑定，但DOM还没生出。此时能取到data数据
  created: function() {
    console.log("生命周期created：");
    // 查询完结的所有年份
    this.getDoneYears();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.markDraft {
  min-height: 100vh;
}
</style>