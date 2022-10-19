<template>
  <div class="checkBj">
    <!-- <nav-article> -->
    <el-tabs @tab-click="handleClick" v-model="paneTab">
      <el-tab-pane label="主办" name="typeFir" class="el_table"></el-tab-pane>
      <el-tab-pane name="typeSec" label="独立承办" class="el_table1">
        <!-- <span slot="label">未阅<el-badge :value="needTodoNum" class="item" :type="messType"></el-badge></span> -->
      </el-tab-pane>
      <el-tab-pane label="配合协办" name="typeThr" class="el_table2"></el-tab-pane>
    </el-tabs>
    <el-form :data="formData" :inline="true" class="demo-ruleForm mt20">
      <el-col :span="10">
        <el-form-item label="督办时间：">
          <el-date-picker
            v-model="formData.superviseDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            style="width:100%"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="deptNameLabel" prop="undertakeDeptName" ref="undertakeDeptName">
          <el-input v-model="formData.undertakeDeptName" placeholder="请选择部门" style="width: 100%;" disabled>
            <el-button slot="append" @click="getTreeData('xie')" icon="el-icon-plus"></el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button size="small" type="primary" @click="search">搜索</el-button>
          <el-button size="small" type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-col>

      <div class="item_space1">
        <el-form-item>
          <el-button size="small" type="primary" @click="del">删除</el-button>
          <el-button size="small" type="primary" @click="exportData">导出明细</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-col style="display:none;" class="el_table6">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="assistDeptName" label="协办部门" align="center"></el-table-column>
        <el-table-column prop="receiveTime" label="收文时间" align="center"></el-table-column>
        <el-table-column prop="sendOrgName" label="来文单位" align="center"></el-table-column>
        <el-table-column prop="documentCode" label="文号" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="topic" label="主题词" align="center"></el-table-column>
        <el-table-column prop="undertakeDeptName" label="承办部门" align="center"></el-table-column>
        <el-table-column prop="superviseDate" label="督办时间" align="center"></el-table-column>
        <el-table-column prop="limitDate" label="办理期限" align="center"></el-table-column>
        <el-table-column prop="progress" label="办理状态" align="center"></el-table-column>
        <el-table-column prop="chiveDeptName" label="归档部门" align="center"></el-table-column>
        <el-table-column prop="undertakeEndTime" label="办结时间" align="center"></el-table-column>
        <el-table-column prop="officeOpinion" label="办公室批办意见" align="center"></el-table-column>
        <el-table-column prop="undertakeOrgOpinion" label="承办部门办理情况" align="center"></el-table-column>
        <el-table-column prop="handleTerminateOpinion" label="办结情况" align="center"></el-table-column>
        <el-table-column prop="curUser" label="当前处理人" align="center"></el-table-column>
        <el-table-column prop="processInfo" label="流程记录" align="center"></el-table-column>
        <!-- <el-table-column prop="max_xb_time" label="备注" align="center"></el-table-column> -->
        <el-table-column prop="assistCreateTime" label="协办开始时间" align="center"></el-table-column>
        <el-table-column prop="assistBjTime" label="协办结束时间" align="center"></el-table-column>
        <el-table-column prop="emergencyName" label="紧急程度" align="center"></el-table-column>
        <el-table-column prop="cbRecord" label="催办信息" align="center"></el-table-column>
        <el-table-column prop="cbCount" label="催办次数" align="center"></el-table-column>
        <el-table-column prop="cbFirstTime" label="首次催办时间" align="center"></el-table-column>
        <el-table-column prop="cbLastTime" label="末次催办时间" align="center"></el-table-column>
        <el-table-column prop="disposeDuration" label="处理工作日" align="center"></el-table-column>
        <el-table-column prop="assistDisposeDuration" label="协办部门处理用时" align="center"></el-table-column>
        <el-table-column prop="xbDeptRate" label="协办部门处理用时占比" align="center"></el-table-column>
      </el-table>
    </el-col>
    <el-col style="margin: 20px 0;display:none" class="el_table7">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="undertakeDeptName" label="承办部门" align="center"></el-table-column>
        <el-table-column prop="receiveTime" label="收文时间" align="center"></el-table-column>
        <el-table-column prop="sendOrgName" label="来文单位" align="center"></el-table-column>
        <el-table-column prop="documentCode" label="文号" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="topic" label="主题词" align="center"></el-table-column>
        <el-table-column prop="superviseDate" label="督办时间" align="center"></el-table-column>
        <el-table-column prop="limitDate" label="办理期限" align="center"></el-table-column>
        <el-table-column prop="progress" label="办理状态" align="center"></el-table-column>
        <el-table-column prop="archiveDeptName" label="归档部门" align="center"></el-table-column>
        <el-table-column prop="undertakeEndTime" label="办结时间" align="center"></el-table-column>
        <el-table-column prop="officeOpinion" label="办公室批办意见" align="center"></el-table-column>
        <el-table-column prop="undertakeOrgOpinion" label="承办部门办理情况" align="center"></el-table-column>
        <el-table-column prop="handleTerminateOpinion" label="办结情况" align="center"></el-table-column>
        <el-table-column prop="curUser" label="当前处理人" align="center"></el-table-column>
        <el-table-column prop="processInfo" label="流程记录" align="center"></el-table-column>
        <!-- <el-table-column prop="max_zb_time" label="备注" align="center"></el-table-column> -->
        <el-table-column prop="emergencyName" label="紧急程度" align="center"></el-table-column>
        <el-table-column prop="cbRecord" label="催办信息" align="center"></el-table-column>
        <el-table-column prop="cbCount" label="催办次数" align="center"></el-table-column>
        <el-table-column prop="cbFirstTime" label="首次催办时间" align="center"></el-table-column>
        <el-table-column prop="cbLastTime" label="末次催办时间" align="center"></el-table-column>
        <el-table-column prop="disposeDuration" label="处理工作日" align="center"></el-table-column>
        <el-table-column prop="undertakeDisposeDuration" label="主办部门处理用时" align="center"></el-table-column>
        <el-table-column prop="zbDeptRate" label="主办部门处理用时占比" align="center"></el-table-column>
      </el-table>
    </el-col>
    <el-col style="display:none" class="el_table8">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="undertakeDeptName" label="承办部门" align="center"></el-table-column>
        <el-table-column prop="receiveTime" label="收文时间" align="center"></el-table-column>
        <el-table-column prop="sendOrgName" label="来文单位" align="center"></el-table-column>
        <el-table-column prop="documentCode" label="文号" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="topic" label="主题词" align="center"></el-table-column>
        <el-table-column prop="superviseDate" label="督办时间" align="center"></el-table-column>
        <el-table-column prop="limitDate" label="办理期限" align="center"></el-table-column>
        <el-table-column prop="progress" label="办理状态" align="center"></el-table-column>
        <el-table-column prop="chiveDeptName" label="归档部门" align="center"></el-table-column>
        <el-table-column prop="undertakeEndTime" label="办结时间" align="center"></el-table-column>
        <el-table-column prop="officeOpinion" label="办公室批办意见" align="center"></el-table-column>
        <el-table-column prop="undertakeOrgOpinion" label="承办部门办理情况" align="center"></el-table-column>
        <el-table-column prop="handleTerminateOpinion" label="办结情况" align="center"></el-table-column>
        <el-table-column prop="curUser" label="当前处理人" align="center"></el-table-column>
        <el-table-column prop="processInfo" label="流程记录" align="center"></el-table-column>
        <!-- <el-table-column prop="" label="备注" align="center"></el-table-column> -->
        <el-table-column prop="xbStartTime" label="发送协办时间" align="center"></el-table-column>
        <el-table-column prop="xbEndTime" label="结束协办时间" align="center"></el-table-column>
        <el-table-column prop="assistDeptName" label="协办部门" align="center"></el-table-column>
        <el-table-column prop="assistCreateTime" label="协办开始时间" align="center"></el-table-column>
        <el-table-column prop="assistBjTime" label="协办结束时间" align="center"></el-table-column>
        <el-table-column prop="emergencyName" label="紧急程度" align="center"></el-table-column>
        <el-table-column prop="cbRecord" label="催办信息" align="center"></el-table-column>
        <el-table-column prop="cbCount" label="催办次数" align="center"></el-table-column>
        <el-table-column prop="cbFirstTime" label="首次催办时间" align="center"></el-table-column>
        <el-table-column prop="cbLastTime" label="末次催办时间" align="center"></el-table-column>
        <el-table-column prop="disposeDuration" label="处理工作日" align="center"></el-table-column>
        <el-table-column prop="undertakeDisposeDuration" label="主办部门处理用时" align="center"></el-table-column>
        <el-table-column prop="zbDeptRate" label="主办部门处理用时占比" align="center"></el-table-column>
        <el-table-column prop="assistDisposeDuration" label="协办部门处理用时" align="center"></el-table-column>
        <el-table-column prop="xbDeptRate" label="协办部门处理用时占比" align="center"></el-table-column>
      </el-table>
    </el-col>
    <m-table
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isPagination="true"
      :isHandle="false"
      @select="select"
      @refresh="loadData"
      :tableData="tableData"
      :tableCols="tableCols"
      :pageSizeList = "[100,200,500]"
      :pagination="pagination"
      @cellClick="cellClick"
      v-loading="tableLoading"
      :default-sort="sortDate"
    ></m-table>
    <treeCofig
      :treeData="treeData"
      :canTab="canTab"
      :loadingTree="loadingTree"
      :hasRadio="hasRadio"
      :dialogType="dialogType"
      :dialogTypeNow="dialogTypeNow"
      :dialogTit="dialogTit"
      :checkIds="checkIds"
      :checkData="checkData"
      :singelCheckF="singelCheckF"
      :dialogState="dialogState"
      :offenUse="offenUse"
      :formData="formData"
      @showCompDialog="showCompDialog"
      :treeTradeCode="treeTradeCode"
      :tableRowClassNames="tableRowClassName"
    ></treeCofig>
    <!-- </nav-article> -->
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import searchForm from "@/components/form/searchForm";
import treeCofig from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";

export default {
  name: "checkCy",
  components: {
    mTable,
    searchForm,
    treeCofig
  },
  props: {},
  data() {
    return {
      deptNameLabel:'承办部门',
      treeData: [],
      canTab: false, //标示是否左右三列布局
      loadingTree: false,
      hasRadio: false, //是否有单选
      dialogType: "", //弹窗类型
      dialogTypeNow: "", //当前弹窗类型
      dialogTit: "", // 弹框标题
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      singelCheckF: true,
      dialogState: false,
      offenUse: false, //标示常用设置
      swglCode: this.$businessCode.swgl,
      formData: {
        function: "selectQsSupervise",
        state: "1",
        page: 1, //当前页数
        limit: 100, //每页条数
        totalCount: 0,
        curNodeCode: "",
        receiveStartTime: "", //发文字号
        receiveEndTime: "", //主办部门
        sendOrgId: "", //标题
        receiveType: "",
        isInner: "",
        formType: "",
        documentCode: "",
        title: "",
        undertakeDeptName: "",
        SUPERVISE_DATE: "", //督办日期
        document_code: "", //文号
        title: "", //标题
        undertake_dept_name: "", //承办部门,
        undertake_end_time: "", // 办结时间
        id: "",
        handle_terminate_opinion: "", //办结情况
        is_statis: "" // 是否纳入统计
      },
      seletOptionsData: [], //弹窗下拉框数据
      treeTradeCode: this.$businessCode.swglgg,

      tableLoading: false,
      sortDate: [{ prot: "date", order: "descnding" }],
      messType: "primary",
      needTodoNum: 0,
      paneTab: "typeFir",
      // formData: {},
      formCfg: [],
      undertakeDeptName: "",
      serverconfig: {
        labelWidth: "140px"
      },
      state: '1',
      tableData: [],
      //tableCols: allData,
      finshData: [
        { label: "督办时间", prop: "superviseDate", align: "center" },
        { label: "文号", prop: "documentCode", align: "center" },
        { label: "标题", prop: "title", align: "center" },
        { label: "承办部门", prop: "undertakeDeptName", align: "center" },
        { label: "协办标志", prop: "helpFlag", align: "center" },
        { label: "办结时间", prop: "undertakeEndTime", align: "center" },
        { label: "办结情况", prop: "handleTerminateOpinion", align: "center" },
        {
          label: "参与统计",
          prop: "isStatis",
          align: "center",
          size: "small",
          type: "Switch",
        }
      ],
      otherData: [
        { label: "协办开始时间", prop: "xbStartTime", align: "center" },
        { label: "文号", prop: "documentCode", align: "center" },
        { label: "标题", prop: "title", align: "center" },
        { label: "承办部门", prop: "undertakeDeptName", align: "center" },
        { label: "协办部门", prop: "assistDeptName", align: "center" },
        { label: "协办标志", prop: "helpFlag", align: "center" },
        { label: "办结结束时间", prop: "xbEndTime", align: "center" },
        { label: "办结情况", prop: "handleTerminateOpinion", align: "center" },
        {
          label: "参与统计",
          prop: "isStatis",
          align: "center",
          size: "small",
          type: "Switch",
          // value:false,
          change: row => {
            // this.detail(row);
          }
        }
      ],
      tableCols: [
        { label: "督办时间", prop: "superviseDate", align: "center" },
        { label: "文号", prop: "documentCode", align: "center" },
        { label: "标题", prop: "title", align: "center" },
        { label: "承办部门", prop: "undertakeDeptName", align: "center" },
        { label: "协办标志", prop: "helpFlag", align: "center" },
        { label: "办结时间", prop: "undertakeEndTime", align: "center" },
        { label: "办结情况", prop: "handleTerminateOpinion", align: "center" },
        {
          label: "参与统计",
          prop: "isStatis",
          align: "center",
          size: "small",
          type: "Switch",
          change: row => {
            // this.detail(row);
          }

        }
      ],
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 100
      },
      deleteArry: "",
      searchData: {},
      bank_mainXiao: {
        function: "selUnitTreeByHQ",
        flag: true,
        showMyDept: ""
      },
    };
  },
  computed: {},
  methods: {
    completeSending() {
      // this.offenUse = true;
      // this.canTab = false;
      // this.treeData = [];
      this.dialogType = "hui";
      this.singelCheckF = false; // 单选true 多选为false
      this.hasRadio = false;
      this.showCompDialog();
      this.$post
        .postData(
          "getUnderTakeDeptTree",
          JSON.stringify(this.bank_selectConfig),
          this.$businessCode.swgl
        )
        .then(res => {
          let dmo = res.data;
          this.treeData = res.data || [];
          this.treeData.forEach(item => {
            item.text = item.name;
          });
          // this.bank_send.pcsAvyId = res.data && res.data[0].PCSAVYID;
        });
    },
    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (this.formData[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "undertakeDeptName") {
          this.formData.undertakeDeptName = "";
          this.chenCheckData = [];
        }
      }
    },
    //请求部门树数据
    getTreeData(n, m) {
      this.ggLx = "";
      this.isCY = false;
      this.dialogType = "hui";
      this.checkOrg = false;
      this.singelCheckF = false;
      this.offenUse = false;
      this.dialogTypeZF = n;
      let name = "";
      let that = this;
      let clearName = "";
      this.canTab = false;
      this.treeData = [];
      //手动清空时处理
      this.dialogTypeNow = n;
      this.useNewDialog = true;
      this.chenBanOnly = true;
      name = "协办部门";
      clearName = "assistDeptName";
      this.dialogTit = name;
      this.showCompDialog();
      this.$post
        .postData(
          "selUnitTreeByHQ",
          JSON.stringify(this.bank_mainXiao),
          this.$businessCode.swglgg
        )
        .then(res => {
          if (res.message == "Loading") {
            this.loadingTree = true;
          } else {
            this.loadingTree = false;
          }
          that.treeData = (res && res.data) || [];
        });
    },
    //完成并发送弹窗
    showCompDialog(data, status, type, params, dtype) {
      let that = this;
      if (status) {
        //确定保存时
        let names = [];
        let ids = [];
        that.checkIds = [];
        if (data.length) {
          this.checkData = [].concat(data);
          data.map(item => {
            names.push(item.name || item.text);
            ids.push(item.id);
            that.checkIds.push(item.id);
          });
        }

        switch (dtype) {
          case "xie":
            this.formData.undertakeDeptName = names.join("");
            this.formData.undertakeDeptId = ids.join("");
            this.chenCheckData = this.checkData;
            break;
        }
      }

      this.dialogState = !this.dialogState;
      //关闭弹窗 并确认完成发送
      if (this.dialogState) {
        this.backDialogData(this.dialogTypeNow);
      }
    },
    //弹窗回显数据
    backDialogData(type) {
      let newA = [];
      switch (type) {
        case "xie":
          this.checkIds = this.formData.undertakeDeptId?this.formData.undertakeDeptId.split(','):[];
          this.checkData=this.chenCheckData;
          break;
      }
    },
    del() {
      if(this.state=="1"||this.state=="2"){
        this.$post
          .postData(
            "doDeleteTj",
            JSON.stringify({
              function: "doDeleteTj",
              ids: this.deleteArry
            }),
            this.$businessCode.swgl
          )
          .then(res => {
            if(res.success==true){
              this.$message({
                type: "success",
                message: "删除成功!"
              });

            }
            this.loadData(this.state);
          });

      }else{
        this.$post
          .postData(
            "doDeleteTj",
            JSON.stringify({
              function: "doDeleteTj",
              ids: this.deleteArry
            }),
            this.$businessCode.swgl
          )
          .then(res => {
            if(res.success==true){
              this.$message({
                type: "success",
                message: "删除成功!"
              });

            }
            this.loadData(this.state);
          });
      }

    },
    exportData() {
      switch (this.state) {
        case '1':
          exportTable.exportExcel("导出主办表",".el_table8");
          break;
        case '2':
          exportTable.exportExcel("导出独立承办表",".el_table7");
          break;
        case '3':
          exportTable.exportExcel("导出配合协办表",".el_table6");
          break
      }

      // if (this.state == "1" || this.state == "2") {
      //   exportTable.exportExcel("会议主办单");
      // } else {
      //   exportTable.exportExcel("会议主办单");
      // }
    },
    search() {
      this.loadData();
    },
    reset(formName) {
      this.formData.superviseDate = [];
      this.formData.undertakeDeptName = "";
      this.formData.undertakeDeptId = "";
      this.checkIds = [];
      this.checkData = [];
      this.chenCheckData = [];
    },
    tableRowClassName(row) {
      if (
        row.isRed == "0" &&
        (this.paneTab == "typeSec" || row.isReadflag == "0")
      ) {
        return "warning-row";
      }
    },
    initData() {
      const _this = this;
      let data = {
        btnType: _this.btnType,
        ..._this.searchData,
        ..._this.formData
      };

      let createStartDate = _this.formData.createStartDate;
      let createEndDate = _this.formData.createEndDate;
      _this.formData.createStartDate = createStartDate
        ? createStartDate.getFullYear() +
        "-" +
        (createStartDate.getMonth() + 1) +
        "-" +
        createStartDate.getDate()
        : "";
      _this.formData.createEndDate = createEndDate
        ? createEndDate.getFullYear() +
        "-" +
        (createEndDate.getMonth() + 1) +
        "-" +
        createEndDate.getDate()
        : "";
    },
    loadData(state) {
      let pagination={
        page: this.pagination.pageNum,
        limit: this.pagination.pageSize,
      };
      this.formData = Object.assign(this.formData, pagination);
      sessionStorage.setItem('page_sw',JSON.stringify(this.formData));
      this.$post
        .postData(
          "selectQsSupervise",
          JSON.stringify(this.formData),
          this.swglCode
        )
        .then(res => {
          this.tableData = res.data.rows || [];
          this.pagination.total=res.data.total;
          this.tableData.map((node)=>{
            node.isStatis = node.isStatis == '是'?true:false;
          })
        });
    },

    cellClick(row, column, cell, event) {
      // debugger
      if (column.label == "参与统计") {
        if(this.state=="1"||this.state=='2'){
          this.$post
            .postData(
              "updateIsStatisById",
              JSON.stringify({
                function: "updateIsStatisById",
                id: row.id,
                isStatis: row.isStatis ?"是":"否",
              }),
              this.swglCode
            )
            .then(res => {
              this.loadData();
            });
        }else if(this.state=='3'){
          this.$post
            .postData(
              "updateIsStatisById",
              JSON.stringify({
                function: "updateIsStatisById",
                id: row.id,
                isStatis: row.isStatis ?"是":"否",
              }),
              this.swglCode
            )
            .then(res => {
              this.loadData();
            });

        }


      } else {
        const routeData = this.$router.resolve({
          path: "/secretary/hostDetail",
          query: {
            id: row.id,
            // mainDocId: row.mainDocId,
            // multiTenancyId: row.multiTenancyId,
            state: this.state
            // readFlag: row.readFlag
          }
        });
        window.open(routeData.href, "_blank");
      }
      // if (row.isReadflag == "0") {
      //   // let rowData=JSON.stringify(row)
      //   this.$intent.goNewPage(this, {
      //     path: "/secretary/hostDetail",
      //     query: { id: row.id, type: "hostDetail" }
      //   });
      // } else if (row.isReadflag == "1") {
      //   // let rowData=JSON.stringify(row)
      //   this.$intent.goNewPage(this, {
      //     path: "/secretary/independentDetail",
      //     query: { id: row.id, type: "independentDetail" }
      //   });
      // }else if(row.isReadflag == "2"){
      //   this.$intent.goNewPage(this,{
      //     path: "/secretary/cooperateDetail",
      //     query:{id:row.id,type:'cooperateDetail'}
      //   })
      // }
    },
    select(row) {
      let dataArry = [];
      row.map(function(value, index) {
        dataArry.push(value.id);
      });
      this.deleteArry = dataArry.join(",");
    },
    //tab切换
    handleClick(tab, event) {
      this.clearCheckData('undertakeDeptName');
      sessionStorage.setItem('tab_sw',tab.name);
      if (tab.name === "typeFir") {
        // this.type=2
        this.state = this.formData.state = '1';
        this.deptNameLabel='承办部门';
        this.tableCols = this.finshData;
        this.loadData(this.state);
      } else if (tab.name === "typeSec") {
        // this.type=0
        this.state = this.formData.state = '2';
        this.deptNameLabel='承办部门';
        this.tableCols = this.finshData;
        this.loadData(this.state);
      } else if (tab.name === "typeThr") {
        // this.type=1
        this.state = this.formData.state = '3';
        this.deptNameLabel='协办部门';
        this.tableCols = this.otherData;
        this.loadData(this.state);
      } else {
        return;
      }
    }
    //开始查询
    // submit(params) {
    //   this.formData = params;
    //   this.loadData();
    // }
  },

  created() {
    if(sessionStorage.getItem('page_sw')){
      this.formData = Object.assign(this.formData,JSON.parse(sessionStorage.getItem('page_sw')));
      this.pagination={
        pageNum: this.formData.page, //第几页
        pageSize: this.formData.limit, //每页条数
        total: 0
      }
    }
    if(sessionStorage.getItem('tab_sw')){
      this.paneTab=sessionStorage.getItem('tab_sw');
      this.handleClick({name:this.paneTab});
    }else{
      this.loadData(this.state);
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.cformdata {
  margin-top: 24px;
}
.item_space1 {
  margin-left: 75%;
}
</style>
