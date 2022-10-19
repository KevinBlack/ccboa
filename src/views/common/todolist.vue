<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
      <el-tab-pane label="后续处理" name="tabs-hxcl"></el-tab-pane>
      <el-tab-pane label="部门未办结" v-if="ptAuthority" name="tabs-ptmtwait"></el-tab-pane>
      <el-tab-pane label="部门待办延迟情况" v-if="ptAuthority&&false" name="tabs-ptmtdelay"></el-tab-pane>
      <el-row>
        <el-col>
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm mt20">
            <el-row>
              <el-col :span="7">
                <el-form-item :label="dateLabel">
                  <div class="block">
                    <el-date-picker
                      @change="timeChange"
                      v-model="rangeTime"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      :picker-options="pickerOptions"
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-show="activeName!='tabs-ptmtdelay'">
                <el-form-item label="标题：" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-show="activeName=='tabs-ptmtwait'">
                <el-form-item label="文件类型">
                  <el-select
                    v-model="ruleForm.modeId"
                    @change="selectType"
                    style="width:100%"
                  >
                    <el-option value label="请选择"></el-option>
                    <el-option
                      v-for="item in SsendType"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-show="activeName=='tabs-wait'||activeName=='tabs-done'">
                <el-form-item label="文号" prop="documentCode">
                  <el-input v-model="ruleForm.documentCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-col class="arrowup">
                  <el-button
                    type="primary"
                    v-show="activeName!='tabs-ptmtdelay'"
                    @click="submitForm"
                  >搜索</el-button>
                  <el-button
                    type="primary"
                    v-show="activeName=='tabs-ptmtdelay'"
                    @click="submitForm"
                  >开始统计</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-col>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col v-if="btnCheckOut" class="mt20end txtRight">
          <el-button type="primary" size="small" @click="exportExcel">导出本页查询结果</el-button>
        </el-col>
        <el-col v-show="activeName=='tabs-wait'" class="mt20end">
          <el-button
            v-show="activeName=='tabs-wait'&&overTodoDays"
            type="primary"
            size="small"
            @click="todoListAllT"
          >全部</el-button>
          <el-button
            v-show="activeName=='tabs-wait'&&overTodoDays"
            type="primary"
            size="small"
            @click="todoListOverT"
          >{{"超过"+overTodoDays+"天"}}</el-button>
          <el-button
            v-show="activeName=='tabs-wait'"
            type="primary"
            size="small"
            style="float:right"
            @click="setNewOrderByTime"
          >{{"按时间"+orderByTimeWord+"序"}}</el-button>
          <el-button
            v-show="activeName=='tabs-wait'"
            type="primary"
            style="float:right"
            size="small"
            @click="todoListnextDo"
          >后续处理</el-button>
        </el-col>
        <el-col v-if="false" class="mt20end txtRight">
          <el-button type="primary" size="small">快速办理</el-button>
          <el-button type="primary" size="small">标记已办</el-button>
          <el-button type="primary" size="small">删除</el-button>
        </el-col>
        <el-col style="margin: 20px 0;">
          <m-table
            size="medium"
            :isSelection="activeName=='tabs-wait'"
            :isPagination="true"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
            @refresh="initData(activeName)"
            @selection-change="handleSelectionChange"
            :state="(parseInt(bank_Select.state)+1)"
            :pagination="pagination"
            :isIndexPage="true"
            :isHome="true"
            :isIndexDb="true"
            @cellClick="cellClick"
            :searchDataIndex="searchDataIndex"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            @select="handleSelectionChange"
            v-loading="tableLoading"
            :default-sort="sortDate"
          ></m-table>
        </el-col>
      </el-row>
    </el-tabs>
    <el-dialog title="提示" :visible.sync="dialogVisibleForUpData" width="30%">
      <span>{{dialogVisibleForUpDataContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dothenUpData()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag title="团队公告" :visible.sync="showTeamNotice" append-to-body>
      <el-form ref="teamNotice" :model="addNoticeform" class="team-notice">
        <el-form-item label="公告名称" prop="noticeHeadName">
          <el-input :disabled="true" v-model="addNoticeform.noticeHeadName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属团队" prop="teamName">
          <el-input :disabled="true" v-model="addNoticeform.teamName" autocomplete="off"></el-input>
          <!-- <el-select :disabled="true" v-model="addNoticeform.teamName" placeholder="请选择">
            <el-option 
              :value="item.team_name"
            ></el-option> 
          </el-select>-->
        </el-form-item>
        <el-form-item label="公告内容" prop="noticeContent">
          <el-input
            :disabled="true"
            type="textarea"
            :rows="3"
            v-model="addNoticeform.noticeContent"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelNotice">取 消</el-button>
        <!-- <el-button type="primary" @click="addNotice">保 存</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import { skipPath, typeNameFormat, allCircle } from "@/util/skipPath.js";
const wtdnData = [
  //待办
  {
    label: "紧急程度",
    prop: "EMELEVEL",
    align: "center",
    width: "100px",
    sortable: "custom"
  },
  {
    label: "时间",
    align: "center",
    prop: "TMS_RES",
    formatter(row) {
      return row.TMS.slice(0, 16) || "";
    },
    width: "120px",
    sortable: "custom"
  },
  {
    label: "督办",
    align: "center",
    prop: "IS_DUBAN",
    type: "Html",
    html: row => {
      if (
        row.IS_DUBAN == "1" ||
        row.DATA_TYPE == "DXZXDB_XB" ||
        row.DATA_TYPE == "DXZXDB_CB"
      ) {
        return "<span style='display:inline-block;width:10px;height:10px;background-color:#0C9;border-radius: 50%;'></span>";
      }
    },
    width: "100px"
  },
  {
    label: "标题",
    prop: "TITLE",
    align: "left",
    minwidth: "35%",
    sortable: "custom"
  },
  { label: "发文字号", prop: "DOCUMENTCODE", align: "left", width: "200px" },
  {
    label: "文件类型",
    align: "center",
    prop: "TYPE_NAME",
    formatter(row) {
      if (row.DATA_TYPE) {
        if (row.DATA_TYPE == "oa2") {
          return row.TYPE_NAME;
        } else {
          let typeName = typeNameFormat(row);
          return typeName;
        }
      } else {
        return row.TYPE_NAME;
      }
    },
    width: "140px"
  },
  {
    label: "环节",
    prop: "PCSAVYNM",
    align: "center",
    width: "100px",
    sortable: "custom"
  },
  {
    label: "发送人",
    prop: "SEND_USER_NAME",
    align: "center",
    width: "100px",
    sortable: "custom"
  }
];
const doneData = [
  //已办
  {
    label: "紧急程度",
    prop: "EMELEVEL",
    align: "center",
    width: "100px",
    sortable: "custom"
  },
  {
    label: "时间",
    align: "center",
    prop: "TMS_RES",
    sortable: "custom",
    width: "120px"
  },
  {
    label: "督办",
    align: "center",
    prop: "IS_DUBAN",
    type: "Html",
    html: row => {
      if (
        row.IS_DUBAN == "1" ||
        row.DATA_TYPE == "DXZXDB_XB" ||
        row.DATA_TYPE == "DXZXDB_CB"
      ) {
        return "<span style='display:inline-block;width:10px;height:10px;background-color:#0C9;border-radius: 50%;'></span>";
      }
    },
    width: "100px"
  },
  {
    label: "标题",
    prop: "TITLE",
    align: "left",
    minwidth: "40%",
    sortable: "custom"
  },
  { label: "发文字号", prop: "DOCUMENTCODE", align: "left", width: "200px" },
  {
    label: "文件类型",
    align: "center",
    prop: "TYPE_NAME",
    formatter(row) {
      if (row.DATA_TYPE) {
        let typeName = typeNameFormat(row);
        return typeName;
      } else {
        return row.TYPE_NAME;
      }
    },
    width: "140px"
  },
  {
    label: "环节",
    prop: "PCSAVYNM",
    align: "center",
    width: "100px",
    sortable: "custom"
  },
  {
    label: "当前处理人",
    prop: "AVYEXCTRNM",
    align: "center",
    width: "100px",
    sortable: "custom"
  }
];
const ptwtData = [
  //部门未办结
  // { label: "是否超时", align: "center",
  //   html:row=>{
  //     if(row.IS_OVERTIME=='1'){
  //       return"<span style='display:inline-block;width:15px;height:15px;background-color:red;border-radius: 50%;'></span>"
  //     }else{
  //       return "<span style='display:inline-block;width:15px;height:15px;background-color:#ccc;border-radius: 50%;'></span>"
  //     }
  //   },
  // },
  {
    label: "紧急程度",
    prop: "EMELEVEL",
    align: "center",
    width: "100px",
    sortable: "custom"
  },
  {
    label: "开始办理时间",
    align: "center",
    prop: "TMS_RES",
    sortable: "custom",
    formatter(row) {
      if (row.TMS_RES) {
        let TMS_RES = row.TMS_RES.slice(0, 16);
        return TMS_RES;
      } else {
        return "";
      }
    }
  },
  {
    label: "标题",
    prop: "TITLE",
    align: "left",
    width: "280px",
    sortable: "custom"
  },
  { label: "发文字号", prop: "DOCUMENTCODE", align: "left", width: "200px" },
  {
    label: "文件类型",
    align: "center",
    prop: "TYPE_NAME",
    formatter(row) {
      if (row.DATA_TYPE) {
        let typeName = typeNameFormat(row);
        return typeName;
      } else {
        return row.TYPE_NAME;
      }
    }
  },
  { label: "环节", prop: "PCSAVYNM", align: "center", sortable: "custom" },
  {
    label: "当前处理人",
    prop: "AVYEXCTRNM",
    align: "center",
    sortable: "custom"
  },
  { label: "", align: "center", width: "1" }
];
const delayData = [
  //部门待办延迟情况
  { label: "处室", prop: "title", align: "center", sortable: "custom" },
  { label: "姓名", prop: "createTime", align: "center", sortable: "custom" },
  {
    label: "当前超时未处理数量",
    prop: "title",
    align: "center",
    sortable: "custom"
  },
  {
    label: "提醒次数",
    prop: "documentNo",
    align: "center",
    sortable: "custom"
  },
  {
    label: "稍后处理次数",
    prop: "currentNode",
    align: "center",
    sortable: "custom"
  },
  { label: "", align: "center", width: "1" },
  { label: "", align: "center", width: "1" }
];
const ruleForm = {
  title: "", //标题
  statrTime: "",
  endTime: "",
  documentCode: "〔〕"
};
export default {
  name: "Todolist",
  components: {
    mTable
  },
  data() {
    return {
      dialogVisibleForUpData: false,
      dialogVisibleUpOne: false,
      copyRow: "",
      dialogVisibleForUpDataContent: "",
      searchDataIndex: {},
      nextDoids: "",
      orderByTimeWord: "升",
      orderByTime: "0",
      showTeamNotice: false, //tuandui
      addNoticeform: {
        noticeHeadName: "",
        noticeContent: "",
        teamName: ""
      },
      dateLabel: "时间",
      bank_Select: {
        function: "toDoSelect",
        // tplbsnids: allCircle,
        overTodoDays: "",
        state: 0,
        page: 1,
        totalCount: 0,
        limit: 20
      },
      overTodoDays: "",
      btnCheckOut: false,
      btnAll: false,
      ptAuthority: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      rangeTime: "",
      ruleForm: {},
      tableLoading: false,
      activeName: "tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      tableData: [],
      multipleSelection: [], //列表已选数据
      tableCols: wtdnData,
      pagination: {
        page: 1,
        total: 0,
        limit: 20
      },
      SsendType: [
        {label:"发文",value:"DZFW,SWFW,D_CFW,S_CFW"},
        {label:"发文会签",value:"D_FWHQ,D_CFWHQ"},
        {label:"收文",value:"SWSW,DZSW,SWSWCT"},
        {label:"收文协办",value:"SWSW_XB,SWSWCT_XB,DZSW_XB"},
        {label:"签报",value:"DZQB,SWQB,KHQBQS,KHQB_SP"},
        {label:"签报会签",value:"DZQB_HQ,KHQB_HQ"},
        {label:"签报协办",value:"KHQB_XB"},
        {label:"便函",value:"D_BHZF,D_BHCB"},
        {label:"事务审批",value:"D_SWSPWH,SW_KHSWSP"},
        {label:"专项督办",value:"DXZX_DB,PLZXDB"},
        {label:"专项督办协办",value:"DXZXDB_XB,PLZXDB_XB"},
        {label:"专项督办承办",value:"DXZXDB_CB,PLZXDB_CB"}
      ]
    };
  },
  methods: {
    selectType(val) {
      console.log(val);
      
      this.ruleForm.modeId = val;
    },
    async dothenUpData() {
      this.dialogVisibleForUpData = false;
      await this.notiUpdata(this.copyRow); // 通知状态更新
      this.bank_Select.limit = 20;
      this.pagination.limit = 20;
      this.pagination.page = 1;
      this.bank_Select.page = 1;
      await this.initData(this.activeName);
    },
    //获取个人时间排序
    getOrderByTime() {
      this.$post
        .postData(
          "getHomeOrder",
          JSON.stringify({
            function: "getHomeOrder"
          }),
          this.$businessCode.dbgl
        )
        .then(res => {
          if (res && res.success) {
            this.orderByTime = res.data;
            this.orderByTimeWord = res.data == "0" ? "升" : "降";
          }
        });
    },
    //设置时间排序
    setNewOrderByTime() {
      this.orderByTime = this.orderByTime == "0" ? "1" : "0";
      this.$post
        .postData(
          "setHomeOrder",
          JSON.stringify({
            function: "setHomeOrder",
            state: this.orderByTime
          }),
          this.$businessCode.dbgl
        )
        .then(res => {
          if (res && res.success) {
            this.orderByTimeWord = this.orderByTime == "0" ? "升" : "降";
            this.initData(this.activeName);
          }
        });
    },
    openTuanDui(id) {
      this.showTeamNotice = true;
      this.$post
        .postData(
          "selectNoticeById",
          JSON.stringify({ function: "selectNoticeById", id: id }),
          this.$businessCode.tdgl
        )
        .then(res => {
          this.addNoticeform.noticeHeadName = res.data.noticeHeadName;
          this.addNoticeform.noticeContent = res.data.noticeContent;
          this.addNoticeform.teamName = res.data.teamName;
        });
    },
    cancelNotice() {
      this.addNoticeform = {};
      this.showTeamNotice = false;
    },
    initActiveName() {
      let activeName = "";
      if (sessionStorage.getItem("indextab")) {
        activeName = sessionStorage.getItem("indextab");
      } else {
        activeName = this.$route.query.activeName;
      }
      this.activeName = activeName ? activeName : "tabs-wait";
      if (this.$route.query.isWcl && this.$route.query.isWcl == "1") {
        activeName = "tabs-wait";
        this.overTodoDays = this.$route.query.overTodoDays;
        this.todoListOverT();
      } else {
        this.routerQueryUpdate();
      }
    },
    routerQueryUpdate() {
      if (this.activeName == "tabs-done") {
        this.$router.push({
          path: "/todolist?activeName=tabs-done"
        });
        this.tableCols = doneData;
      } else if (this.activeName == "tabs-ptmtwait") {
        this.$router.push({
          path: "/todolist?activeName=tabs-ptmtwait"
        });
        this.tableCols = ptwtData;
      } else if (this.activeName == "tabs-hxcl") {
        this.$router.push({
          path: "/todolist?activeName=tabs-hxcl"
        });
        this.tableCols = wtdnData;
      } else if (this.activeName == "tabs-ptmtdelay") {
        this.$router.push({
          path: "/todolist?activeName=tabs-ptmtdelay"
        });
        this.tableCols = delayData;
      } else {
        this.$router.push({
          path: "/todolist?activeName=tabs-wait"
        });
        this.tableCols = wtdnData;
      }
    },
    /**
     * 用户权限校验
     */
    getHumanRole() {
      let userRole = JSON.parse(localStorage.getItem("tcHumanRole"));
      userRole.map(item => {
        if (
          item.dicCode == "zongheG" ||
          item.dicCode == "deptqfG" ||
          item.dicCode == "dubanG"
        ) {
          this.ptAuthority = true;
        }
      });
    },
    /**
     * @description 请求列表数据
     * @param {String} tabType  tab栏类型
     */
    initData(tabType) {
      if (sessionStorage.getItem("indextab")) {
        tabType = this.activeName = sessionStorage.getItem("indextab");
      }
      sessionStorage.setItem(
        "searchDataIndex",
        JSON.stringify(this.searchDataIndex)
      );
      if (this.ruleForm.documentCode == "〔〕") {
        this.ruleForm.documentCode = "";
      }
      this.bank_Select = Object.assign(this.bank_Select, this.ruleForm);
      if (tabType == "tabs-wait") {
        this.bank_Select.state = "0";
        this.getWTList();
      } else if (tabType == "tabs-hxcl") {
        this.bank_Select.state = "1";
        this.getWTList();
      } else if (tabType == "tabs-done") {
        this.bank_Select.state = "";
        this.getDoneList();
      } else if (tabType == "tabs-ptmtwait") {
        this.bank_Select.state = "";
        this.getPTlist();
      }
    },
    /**
     * 待办列表查询
     */
    async getWTList() {
      // this.bank_Select.tplbsnids = allCircle;
      this.bank_Select.function = "toDoSelect";
      this.$post
        .postData(
          "toDoSelect",
          JSON.stringify({ ...this.bank_Select, ...this.searchDataIndex }),
          this.$businessCode.dbgl
        )
        .then(res => {
          this.pagination.total = res.data && res.data.total;
          this.bank_Select.totalCount = res.data && res.data.total;
          this.bank_Select.page = this.pagination.page =
            res.data && res.data.page;
          this.tableLoading = false;
          if (this.ruleForm.documentCode == "") {
            this.ruleForm.documentCode = "〔〕";
          }
          this.tableData = res.data.rows;
        })
        .catch(err => {
          console.log(err);
          this.tableLoading = false;
        });
    },
    /**
     * 已办列表查询
     */
    getDoneList() {
      // this.bank_Select.tplbsnids = allCircle;
      this.bank_Select.function = "doneSelect";
      this.$post
        .postData(
          "doneSelect",
          JSON.stringify({ ...this.bank_Select, ...this.searchDataIndex }),
          this.$businessCode.dbgl
        )
        .then(res => {
          this.pagination.total = res.data && res.data.total;
          this.bank_Select.totalCount = res.data && res.data.total;
          this.bank_Select.page = this.pagination.page =
            res.data && res.data.page;
          this.tableLoading = false;
          if (this.ruleForm.documentCode == "") {
            this.ruleForm.documentCode = "〔〕";
          }
          this.tableData = res.data.rows;
        })
        .catch(err => {
          console.log(err);
          this.tableLoading = false;
        });
    },
    /**
     * 部门未办结列表查询
     */
    getPTlist() {
      // this.bank_Select.tplbsnids = allCircle;
      this.bank_Select.function = "toDoSelectByRole";
      this.$post
        .postData(
          "toDoSelectByRole",
          JSON.stringify({ ...this.bank_Select, ...this.searchDataIndex }),
          this.$businessCode.dbgl
        )
        .then(res => {
          this.pagination.total = res.data && res.data.total;
          this.bank_Select.totalCount = res.data && res.data.total;
          this.bank_Select.page = this.pagination.page =
            res.data && res.data.page;
          this.tableLoading = false;
          this.tableData = res.data.rows;
          if (this.ruleForm.documentCode == "") {
            this.ruleForm.documentCode = "〔〕";
          }
        })
        .catch(err => {
          console.log(err);
          this.tableLoading = false;
        });
    },
    /**
     * 时间控件change事件
     */
    timeChange(rangeTime) {
      if (!rangeTime || rangeTime == "null" || rangeTime == "undefined") {
        this.ruleForm.statrTime = "";
        this.ruleForm.endTime = "";
        return false;
      }
      this.ruleForm.statrTime = rangeTime[0];
      this.ruleForm.endTime = rangeTime[1];
    },
    /**
     * tab栏切换事件
     */
    handleTabsClick(tab, event) {
      sessionStorage.setItem("indextab", tab.name);
      sessionStorage.setItem("indexPage", 1);
      this.bank_Select.state = "";
      this.bank_Select.overTodoDays = "";
      this.bank_Select.page = 1;
      this.pagination.page = 1;
      this.bank_Select.limit = 20;
      this.pagination.limit = 20;
      this.tableData = [];
      this.dateLabel = "时间";
      this.resetForm();
      this.routerQueryUpdate();
      if (tab.name == "tabs-wait") {
        this.bank_Select.state = "0";
        this.tableCols = wtdnData;
      } else if (tab.name == "tabs-hxcl") {
        this.tableCols = wtdnData;
      } else if (tab.name == "tabs-done") {
        this.tableCols = doneData;
      } else if (tab.name == "tabs-ptmtwait") {
        this.tableCols = ptwtData;
      } else {
        this.tableCols = delayData;
        this.dateLabel = "统计周期";
      }
      this.initData(tab.name);
    },
    async cellClick(row, column, cell, event) {
      // if ((row.DATA_TYPE == 'D_BHZF'
      //     || row.DATA_TYPE == 'D_BHCB'
      //     || row.DATA_TYPE == 'D_SWSPWH'
      //     || row.DATA_TYPE == 'SW_KHSWSP'
      //     || row.DATA_TYPE=='SW_KHSWSPSPH'
      //     || row.DATA_TYPE == 'HY_XTHYTZZF'
      //     || row.DATA_TYPE == 'HYGL_BBHYTZZF'
      //     || row.DATA_TYPE == 'HYGL_BMHYTZZF'
      //     || row.DATA_TYPE == 'D_PXTZZF'
      //     || row.DATA_TYPE == 'HY_XTHYTZCH'
      //     || row.DATA_TYPE == 'HYGL_BBHYTZCH'
      //     || row.DATA_TYPE == 'HYGL_BMHYTZCH'
      //     || row.DATA_TYPE == 'D_PXTZCX'
      //     || row.DATA_TYPE == 'HY_XTHYTZCB'
      //     || row.DATA_TYPE == 'D_PXTZCXWH')&&row.UPDATE_FLAG == '2') {
      //     this.dialogVisibleForUpData = true;
      //     this.dialogVisibleForUpDataContent = row.TITLE||'注意：此提示将会在首页消失'
      //     this.copyRow = row;
      //     return
      // }
      if (row.UPDATE_FLAG == "3") {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let userType = userInfo.isProxier;
        let username;
        if (userInfo.oa_account) {
          username = userInfo.oa_account;
        } else {
          username = "";
        }
        var ws = new WebSocket("ws://localhost:4213");
        ws.addEventListener("error", () => {
          this.notiUpdata(row); // 通知状态更新
          this.initData(this.activeName); // 待办事宜
          if (userType == 1) {
            window.location.href =
              "kylincloudclient://username=" +
              localStorage.getItem("LoginName") +
              "&passwd=" +
              localStorage.getItem("Voucher") +
              "&token=" +
              localStorage.getItem("ticket") +
              "&id=" +
              JSON.parse(row.COMMENTS).appId +
              "&url=" +
              JSON.parse(row.COMMENTS).dataUrl;
          } else {
            window.location.href =
              "kylincloudclient://username=" +
              username +
              "&passwd=&token=&id=&url=";
          }
        });
        ws.onopen = event => {
          let OBJ;
          if (userType == 1) {
            OBJ = {
              username: localStorage.getItem("LoginName"),
              passwd: localStorage.getItem("Voucher"),
              token: localStorage.getItem("ticket"),
              id: JSON.parse(row.COMMENTS).appId,
              url: JSON.parse(row.COMMENTS).dataUrl
            };
          } else {
            OBJ = {
              username: username,
              passwd: "",
              token: "",
              id: "",
              url: ""
            };
          }
          ws.send(JSON.stringify(OBJ));
          ws.onmessage = event => {};
          ws.onclose = event => {
            this.notiUpdata(row); // 通知状态更新
            this.initData(this.activeName); // 待办事宜
            //isWebSocketSuccess = true;
            // this.$message({
            //   type: "error",
            //   message: "已启动客户端，请勿重复打开客户端",
            //   duration: 1000
            // })
          };
          ws.onerror = () => {};
          ws.close();
        };
      } else {
        let skipPathObj = skipPath(row);
        if (row.DATA_TYPE == "TDGG" || row.dataType == "TDGG") {
          //dakai tanchuang
          this.showTeamNotice = true;
          this.openTuanDui(row.ID);
          return;
        } else if (
          this.activeName == "tabs-wait" ||
          this.activeName == "tabs-hxcl"
        ) {
          if (row.UPDATE_FLAG == "2") {
            await this.notiUpdata(row);
            await this.getWTList();
            if (
              row.DATA_TYPE == "D_SWSPWH" ||
              row.DATA_TYPE == "SW_KHSWSP" ||
              row.DATA_TYPE == "SW_KHSWSPSPH"
            ) {
              if (row.sourceType && row.sourceType == "1") {
                let routeId =
                  (localStorage.getItem("routeIdList") &&
                    JSON.parse(localStorage.getItem("routeIdList"))) ||
                  []; //2022-4-8
                if (routeId.includes(row.ID)) {
                  //2022-4-8
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "已经打开了该页面!",
                    duration: 1500
                  });
                  return;
                }
                var path = skipPathObj.otherRouter;
              }else if(row.sourceType && row.sourceType == "2"){
                  let routeId =
                  (localStorage.getItem("routeIdList") &&
                    JSON.parse(localStorage.getItem("routeIdList"))) ||
                  []; //2022-4-8
                if (routeId.includes(row.ID)) {
                  //2022-4-8
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "已经打开了该页面!",
                    duration: 1500
                  });
                  return;
                }
                var path = skipPathObj.leaveBeijingRouter;
              } else {
                let routeId =
                  (localStorage.getItem("routeIdList") &&
                    JSON.parse(localStorage.getItem("routeIdList"))) ||
                  []; //2022-4-8
                if (routeId.includes(row.ID)) {
                  //2022-4-8
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "已经打开了该页面!",
                    duration: 1500
                  });
                  return;
                }
                var path = skipPathObj.todoDetailRouter;
              }
            } else {
              let routeId =
                (localStorage.getItem("routeIdList") &&
                  JSON.parse(localStorage.getItem("routeIdList"))) ||
                []; //2022-4-8
              if (routeId.includes(row.ID)) {
                //2022-4-8
                this.$message({
                  type: "error",
                  offset: 400,
                  showClose: true,
                  message: "已经打开了该页面!",
                  duration: 1500
                });
                return;
              }
              var path = skipPathObj.todoDetailRouter;
            }
          } else if (row.UPDATE_FLAG == "4") {
            await this.notiUpdata(row);
            await this.getWTList();
            if (
              row.DATA_TYPE == "D_SWSPWH" ||
              row.DATA_TYPE == "SW_KHSWSP" ||
              row.DATA_TYPE == "SW_KHSWSPSPH"
            ) {
              if (row.sourceType && row.sourceType == "1") {
                var path = skipPathObj.otherRouterDone;
              } else if(row.sourceType && row.sourceType == "2"){
                var path = skipPathObj.leaveBeijingRouterDone;
              }else{
                var path = skipPathObj.doneDetailRouter;
                if (row && row.TODO_RECORD_ID) {
                  path.query = Object.assign(path.query, {
                    from: "home"
                  });
                }
              }
            } else {
              var path = skipPathObj.doneDetailRouter;
              if (row && row.TODO_RECORD_ID) {
                path.query = Object.assign(path.query, {
                  from: "home"
                });
              }
            }
          } else if (row.UPDATE_FLAG == "6") {
            await this.notiUpdata(row);
            await this.getWTList();
            var path = skipPathObj.doneDetailRouter;
          } else if (row.UPDATE_FLAG == "7") {
            await this.notiUpdata(row);
            await this.getWTList();
            return;
          } else {
            if (
              row.DATA_TYPE == "D_SWSPWH" ||
              row.DATA_TYPE == "SW_KHSWSP" ||
              row.DATA_TYPE == "SW_KHSWSPSPH"
            ) {
              if (row.sourceType && row.sourceType == "1") {
                let routeId =
                  (localStorage.getItem("routeIdList") &&
                    JSON.parse(localStorage.getItem("routeIdList"))) ||
                  []; //2022-4-8
                if (routeId.includes(row.ID)) {
                  //2022-4-8
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "已经打开了该页面!",
                    duration: 1500
                  });
                  return;
                }
                var path = skipPathObj.otherRouter;
              } else if(row.sourceType && row.sourceType == "2"){
                let routeId =
                  (localStorage.getItem("routeIdList") &&
                    JSON.parse(localStorage.getItem("routeIdList"))) ||
                  []; //2022-4-8
                if (routeId.includes(row.ID)) {
                  //2022-4-8
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "已经打开了该页面!",
                    duration: 1500
                  });
                  return;
                }
                var path = skipPathObj.leaveBeijingRouter;
              }else{
                let routeId =
                  (localStorage.getItem("routeIdList") &&
                    JSON.parse(localStorage.getItem("routeIdList"))) ||
                  []; //2022-4-8
                if (routeId.includes(row.ID)) {
                  //2022-4-8
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "已经打开了该页面!",
                    duration: 1500
                  });
                  return;
                }
                var path = skipPathObj.todoDetailRouter;
              }
            } else {
              let routeId =
                (localStorage.getItem("routeIdList") &&
                  JSON.parse(localStorage.getItem("routeIdList"))) ||
                []; //2022-4-8
              if (routeId.includes(row.ID)) {
                //2022-4-8
                this.$message({
                  type: "error",
                  offset: 400,
                  showClose: true,
                  message: "已经打开了该页面!",
                  duration: 1500
                });
                return;
              }
              var path = skipPathObj.todoDetailRouter;
            }
            //var path = skipPathObj.todoDetailRouter;
          }
          if (row.UPDATE_FLAG == "1" && row.DATA_TYPE != "LSZSQ") {
            this.dialogVisibleForUpData = true;
            this.dialogVisibleForUpDataContent =
              row.TITLE || "注意：此提示将会在首页消失";
            this.copyRow = row;
            return;
          }
          if (row.UPDATE_FLAG == "2") {
            await this.notiUpdata(row);
            this.bank_Select.limit = 20;
            this.pagination.limit = 20;
            this.pagination.page = 1;
            this.bank_Select.page = 1;
            await this.getWTList();
          }
        } else if (this.activeName == "tabs-done") {
          if (
            row.DATA_TYPE == "D_SWSPWH" ||
            row.DATA_TYPE == "SW_KHSWSP" ||
            row.DATA_TYPE == "SW_KHSWSPSPH"
          ) {
            if (row.sourceType && row.sourceType == "1") {
              var path = skipPathObj.otherRouterDone;
            } else if(row.sourceType && row.sourceType == "2"){
                var path = skipPathObj.leaveBeijingRouterDone;
            }else{
              var path = skipPathObj.doneDetailRouter;
              if (row && row.TODO_RECORD_ID) {
                path.query = Object.assign(path.query, {
                  from: "home"
                });
              }
            }
          } else {
            var path = skipPathObj.doneDetailRouter;
            if (row && row.TODO_RECORD_ID) {
              path.query = Object.assign(path.query, {
                from: "home"
              });
            }
          }
        } else if (this.activeName == "tabs-ptmtwait") {
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          if (
            row.DATA_TYPE == "D_SWSPWH" ||
            row.DATA_TYPE == "SW_KHSWSP" ||
            row.DATA_TYPE == "SW_KHSWSPSPH"
          ) {
            if (row.AVYEXCTRCODE == userInfo.humanCode) {
              if (row.sourceType && row.sourceType == "1") {
                var path = skipPathObj.otherRouter;
              } else if(row.sourceType && row.sourceType == "2"){
                var path = skipPathObj.leaveBeijingRouter;
              }else{
                let routeId =
                  (localStorage.getItem("routeIdList") &&
                    JSON.parse(localStorage.getItem("routeIdList"))) ||
                  []; //2022-4-8
                if (routeId.includes(row.ID)) {
                  //2022-4-8
                  this.$message({
                    type: "error",
                    offset: 400,
                    showClose: true,
                    message: "已经打开了该页面!",
                    duration: 1500
                  });
                  return;
                }
                var path = skipPathObj.todoDetailRouter;
              }
            } else {
              if (row.sourceType && row.sourceType == "1") {
                var path = skipPathObj.otherRouterDone;
              } else if(row.sourceType && row.sourceType == "2"){
                var path = skipPathObj.leaveBeijingRouterDone;
              }else{
                var path = skipPathObj.doneDetailRouter;
              }
            }
          } else {
            var path =
              row.AVYEXCTRCODE == userInfo.humanCode
                ? skipPathObj.todoDetailRouter
                : skipPathObj.doneDetailRouter;
          }
          //path.query=Object.assign(path.query,{tiaoguo:"1"})
        }
        if (
          row.DATA_TYPE == "LSZSQ" ||
          row.DATA_TYPE == "LSZSQ" ||
          row.DATA_TYPE == "SEC_BACK"
        ) {
          let routeData = this.$router.resolve(path);
          window.open(routeData.href, "_blank");
        }
        if (row.UPDATE_FLAG != "1") {
          let routeData = this.$router.resolve(path);
          window.open(routeData.href, "_blank");
        }
      }
    },
    //通知状态更新
    async notiUpdata(row) {
      let param = {
        function: "updateTotodorecordById",
        todoRecordId: row.table_id,
        readFlag: "1",
        todoFlag: "1"
      };
      this.$post
        .postData(
          "updateTotodorecordById",
          JSON.stringify(param),
          this.$businessCode.dbgl
        )
        .then(res => {});
    },
    submitForm(formName) {
      this.bank_Select.limit = 20;
      this.pagination.limit = 20;
      this.pagination.page = 1;
      this.bank_Select.page = 1;
      this.initData(this.activeName);
    },
    resetForm() {
      this.rangeTime = "";
      this.searchDataIndex = {};
      sessionStorage.removeItem("searchDataIndex");
      // this.ruleForm = JSON.parse(JSON.stringify(ruleForm));
      this.ruleForm = {};
      this.bank_Select = {
        function: "toDoSelect",
        // tplbsnids: allCircle,
        overTodoDays: "",
        state: 0,
        page: 1,
        totalCount: 0,
        limit: 20
      }
      if (this.activeName == "tabs-wait") {
        this.bank_Select.state = "0";
      } else if (this.activeName == "tabs-hxcl") {
        this.bank_Select.state = "1";
      } else if (this.activeName == "tabs-done") {
        this.bank_Select.state = "";
      } else if (this.activeName == "tabs-ptmtwait") {
        this.bank_Select.state = "";
      }
    },
    handleSelectionChange(val) {
      this.nextDoids = "";
      const idsArr = [];
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].table_id);
      }
      this.nextDoids = idsArr.join(",");
    },
    handleCharge() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          type: "error",
          message: "请至少选择一条数据!"
        });
      }
      return;
    },
    handleCurrentChange(val) {
      sessionStorage.setItem("indexPage", val);
      this.bank_Select.page = val;
      this.pagination.page = val;
      this.initData(this.activeName);
    },
    handleSizeChange(val) {
      sessionStorage.setItem("indexSize", val);
      this.bank_Select.limit = this.pagination.limit = val;
      this.pagination.page = this.bank_Select.page = 1;
      this.initData(this.activeName);
    },
    todoListOverT() {
      this.pagination.page = this.bank_Select.page = 1;
      this.bank_Select.overTodoDays = this.overTodoDays;
      this.getWTList();
    },
    todoListnextDo() {
      if (this.nextDoids === "") {
        this.$message({
          type: "error",
          message: "请选择要处理的数据!"
        });
        return;
      } else {
        this.$confirm(
          "此操作消息通知会直接删除，其他数据会移入后续处理中。",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$post
              .postData(
                "updateTodoStatus",
                JSON.stringify({
                  function: "updateTodoStatus",
                  status: "1",
                  tableId: this.nextDoids
                }),
                this.$businessCode.dbgl
              )
              .then(res => {
                this.overTodoDays = res.data.overTodoDays;
              })
              .catch(err => {
                this.getWTList();
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
              duration: 1000
            });
          });
      }
    },
    todoListAllT() {
      this.pagination.page = this.bank_Select.page = 1;
      this.bank_Select.overTodoDays = "";
      this.getWTList();
    },
    getOverDays() {
      let st = localStorage.getItem("st");
      let params = {
        function: "toDoConfig",
        st
      };
      this.$post
        .postData("toDoConfig", JSON.stringify(params), this.$businessCode.dbgl)
        .then(res => {
          this.overTodoDays = res.data.overTodoDays;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 导出
    exportExcel() {
      this.handleCharge();
    },
    beforLoad(e) {
      if (sessionStorage.getItem("indexPage")) {
        this.bank_Select.page = this.pagination.page = parseFloat(
          sessionStorage.getItem("indexPage")
        );
      }
      if (sessionStorage.getItem("indexSize")) {
        this.bank_Select.limit = this.pagination.limit = parseFloat(
          sessionStorage.getItem("indexSize")
        );
      }
      if (sessionStorage.getItem("indextab")) {
        this.activeName = sessionStorage.getItem("indextab");
      }
    }
  },
  async created() {
    window.addEventListener("beforeunload", this.beforLoad(), true);
    this.getOverDays();
    this.getHumanRole();
    await this.initActiveName();
    this.ruleForm = JSON.parse(JSON.stringify(ruleForm));
    if (sessionStorage.getItem("searchDataIndex")) {
      this.searchDataIndex = Object.assign(
        this.searchDataIndex,
        JSON.parse(sessionStorage.getItem("searchDataIndex"))
      );
    }
    await this.initData(this.activeName);
    this.getOrderByTime();
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.beforLoad(), true);
  }
};
</script>

<style lang="less" scoped>
.mt20 {
  padding: 20px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.mt20end {
  margin-top: 20px;
}
.arrowup {
  padding-left: 10px;
}
.circle {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
.green {
  background-color: green;
}
.gray {
  background-color: gray;
}
/deep/.el-table .cell {
  padding: 0 !important;
}
/deep/.el-table .cell.el-tooltip {
  min-width: 30px !important;
}
</style>
