<template>

  <el-tabs v-model="activeName" @tab-click="handleTabsClick" v-cloak>
    <el-tab-pane label="国密事项统计" name="tabs-all"></el-tab-pane>
    <!-- <el-tab-pane label="商密事项统计" name="tabs-wait"></el-tab-pane> -->
    <el-row  style="margin-top: -20px;">
      <el-col>
        <el-form
          :model="bank_countersignature"
          ref="bank_countersignature"
          label-width="100px"
          class="demo-bank_countersignature mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="发文日期">
                <div class="block">
                  <el-date-picker
                    @change="fawenTimeChange()"
                    v-model="fawenTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    style="max-width:300px;"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="主办部门">
              <el-input v-model="bank_countersignature.draftDepartmentName" readonly="readonly"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="2">
            <el-button type="primary" @click="getTreeData('hui')">选择</el-button>
            </el-col>
            <el-col :span="8">
              <el-form-item label="文件类型" prop="qianBaoTypeName" ref="qianBaoTypeName">
                <el-select
                  v-model="bank_countersignature.sendType"
                  @change="handleSendTypeChange"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="typeNameitem in StypeName"
                    :key="typeNameitem.label"
                    :label="typeNameitem.label"
                    :value="typeNameitem.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="解密日期">
                <div class="block">
                  <el-date-picker
                    @change="jiemiTimeChange()"
                    v-model="jiemiTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    style="max-width:300px;"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="拟稿人">
                  <el-input v-model="bank_countersignature.draftUserName"></el-input>
                </el-form-item>
              </el-col>
            <el-col :span="10" style="text-align:right;">
              <el-col>
                <el-button type="primary" @click="submitForm">开始统计</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col style="margin: 5px 0 0 0 ;text-align: right;">
        <el-button  @click="printAll">打印</el-button>
        <el-button  @click="toExcel">导出</el-button>
        <!-- <el-button  @click="toExcel">全部导出</el-button> -->
      </el-col>
      <el-col style="margin: 5px 0;">
        <m-table
          size="medium"
          id="nomal"
          class="nomal"
          :isSelection="true"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :isIndexPage="true"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @handleSelectionChange="handleSelectionChange"
          @select="tableSelect"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
        <m-table
          v-show="false"
          size="medium"
          id="custom"
          class="custom"
          :isSelection="true"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableData1"
          :tableCols="tableCols"
          :pagination="pagination"
          :isIndexPage="true"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @select="tableSelect"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
    <Dialog ref="dialog" @checkNode="checkNode" :treeData="treeData"></Dialog>
    <!-- <treeCofig
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
      :fromdata="bank_countersignature"
      :seletOptionsData="seletOptionsData"
      @showCompDialog="showCompDialog"
      :checkOrg="checkOrg"
      :treeTradeCode="treeTradeCode"
    ></treeCofig> -->
  </el-tabs>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
// import treeCofig from "@/components/tree/tree-fawen";
import exportTable from "@/minixs/exportTable";
import Dialog from "@/views/dispatch/departDialog.vue";

const finshData = [
  { label: "文件产生类型", prop: "sendType", align: "center" },
  { label: "发文日期", prop: "sendTime", align: "center" },
  { label: "签发日期", prop: "sendTime", align: "center" },
  { label: "发文字号", prop: "documentNo", align: "center" },
  { label: "密级", prop: "secretFlagType", align: "center" },
  { label: "标题", prop: "title", align: "center" },
  { label: "拟稿部门", prop: "draftDepartment", align: "center" },
  { label: "拟稿人", prop: "draftUser", align: "center" },
  { label: "电话", prop: "phone", align: "center" },
  { label: "解密时间", prop: "decryptTime", align: "center" }
];
export default {
  name: "Swthqkcx",
  components: {
    mTable,
    Dialog
  },
  data() {
    return {
      checkOrg:'', 
      treeTradeCode: "", //完成并发送  树  拆
      // 主办部门
      // undertakeDeptIdData: { function: "unitTreeAll", openSubDept: true },
      undertakeDeptIdData: {
        function: "unitTreeByFirst",
        flag: true,
        openSup: false,
        openSupDept: true,
        openCurr: true,
        openCurrFistDept: true,
        openEqual: false,
        openEqualDept: false,
        openSub: false,
        openSubDept: false,
        wfeUnitId: ''
      },
      bank_countersignature: {
        function: "statistMiWenTongJi",
        decryptTimeStart: "",
        decryptTimeEnd: "",
        sendTimeStart: "",
        sendTimeEnd: "",
        draftDepartmentId: "",
        draftDepartmentName: "",
        sendType: "",
        draftUserName: "",
        dataId: ""
      },
      down: false,
      fawenTime: [],  // 拟稿日期
      jiemiTime: [],  // 归档日期
      tableSelectList:[], // 选中打印项
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
      tableLoading: false,
      activeName: "tabs-all",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableData1: [],
      tableCols: finshData,
      pagination: {
        page: 1, //当前页数
        limit: 20, //每页条数
        total:0
      },
      treeData: [],
      singelCheckF: true,
      checkIds: [], //列表
      checkData: [], //选中数据 回显时使用
      chenCheckData: [], //承办选中数据
      shouCheckData: [], //收文选中数据
      laiCheckData: [], //来文选中数据
      canTab: false, //标示是否左右三列布局
      offenUse: false, //标示常用设置
      dialogType: "", //弹窗类型
      seletOptionsData: [], //弹窗下拉框数据
      dialogState: false,
      dialogTit: "", // 弹框标题
      hasRadio: false, //是否有单选
      dialogTypeNow: "", //当前弹窗类型
      loadingTree: false,
      StypeName:[
        {
          label: "全部",
          value: 0
        },
        {
          label: "发文",
          value: 1
        },
        {
          label: "签报",
          value: 2
        }
      ],
      fromdata: {
        qianBaoTypeName:""
      },
      treeSetData: [],
      isMoreDept: true
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.tableData1 = val;
    },
    tableSelect(rows, row){
      this.tableSelectList=rows;
    },
    printAll(){
      if(this.tableSelectList.length==0){
        this.$message({
          type: "error",
          showClose: true,
          offset: 400,
          message: "请选择需要打印的数据！",
          duration: 1500
        });
      }else{
        sessionStorage.setItem("nationSecretPrint", JSON.stringify(this.tableSelectList));
        this.goNewPage('/nationSecretPrint');
        this.$post
        .postData(
          "doSaveOperationLog",
          JSON.stringify({
            function: "doSaveOperationLog",
            operationType: "打印"
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    goNewPage (path,pageData) {
      const routeData = this.$router.resolve({
        path: path,
        query: pageData
      });
      window.open(routeData.href, "_blank");
    },
    toExcel(){
      this.$post
        .postData(
          "doSaveOperationLog",
          JSON.stringify({
            function: "doSaveOperationLog",
            operationType: "导出"
          }),
          this.$businessCode.fawgl
        )
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        });
      // this.isSelection=false;
      setTimeout(()=>{
        exportTable.exportExcel("国家秘密事项发文统计","#custom");
        // this.isSelection=true;
      },10)
    },
    initData(val) {
      sessionStorage.setItem('QBLIST',JSON.stringify(this.bank_countersignature));
      if (val=='1') {
        this.pagination = {
          page: 1,
          limit: 20,
          total:0
        };
      }
      this.$post
        .postData(
          "statistMiWenTongJi",
          JSON.stringify(Object.assign({},this.bank_countersignature, this.pagination)),
          this.$businessCode.fawgl
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = this.bank_countersignature.total = res.data.total;
          if (res.message!=="0") {
            this.isMoreDept = false
            this.treeSetData = res.message.split(",");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    arrow() {
      this.down = !this.down;
    },
    fawenTimeChange() {
      if (this.fawenTime) {
        this.bank_countersignature.sendTimeStart = dateFormate.date(Date.parse(this.fawenTime[0]))
        this.bank_countersignature.sendTimeEnd = dateFormate.date(Date.parse(this.fawenTime[1]))
      }else {
        this.bank_countersignature.sendTimeStart = ''
        this.bank_countersignature.sendTimeEnd = ''
      }
    },
    handleSendTypeChange(val) {
      console.log(val);
      
    },
    jiemiTimeChange() {
      if (this.jiemiTime) {
        this.bank_countersignature.decryptTimeStart = dateFormate.date(Date.parse(this.jiemiTime[0]))
        this.bank_countersignature.decryptTimeEnd = dateFormate.date(Date.parse(this.jiemiTime[1]))
      }else {
        this.bank_countersignature.decryptTimeStart = ''
        this.bank_countersignature.decryptTimeEnd = ''
      }
    },
    handleOpenPage(path, id ,readType) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          readFlag:readType
        }
      });
      window.open(routeData.href, "_blank");
    },
    cellClick(row, column, cell, event) {
      this.idType = row.id ? row.id : "";
      
      if (row.orderType == "非跨行") {
        this.handleOpenPage("/signquoteOverFkhDispatch", this.idType);
      } else if (row.orderType == "跨行请示" ) {
        this.handleOpenPage("/signquoteOverKhQshDispatch", this.idType);
      } else if (row.orderType == "跨行审批" ) {
        this.handleOpenPage("/signquoteOverKhSphDispatch", this.idType);
      } else if (row.orderType == "实物" ) {
        this.handleOpenPage("/signquoteOverEntityDispatch", this.idType);
      }
     
      // if (!row.orderType || !row.orderStatus) {
      //   this.$message({
      //     type: "error",
      //     offset: 400,
      //     showClose: true,
      //     message: "跳转页面失败",
      //     duration: 1000
      //   });
      //   return;
      // }
    },
    //点击 全部0 待办1  已办2  办结3
    handleTabsClick(tab, event) {
      sessionStorage.setItem('QBLISTtab',tab.name);
      this.tableData = [];
      this.tableLoading = true;
      this.pagination.total = 0;
      this.bank_countersignature.state = tab.index;
      this.bank_countersignature.page = 1;
      this.pagination.page = 1;
      this.bank_countersignature.totalCount = 0;

      // if (tab.index == "0") {
      //   this.tableCols = allData;
      // } else if (tab.index == "1") {
      //   this.tableCols = otherData;
      // } else if (tab.index == "3") {
      //   this.tableCols = finshData;
      // } else {
      //   this.tableCols = otherData;
      // }
      this.tableCols = finshData;
      this.bank_countersignature.state = tab.index;
      this.initData();
      this.tableLoading = false;
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      if (this.bank_countersignature.state == "0") {
        this.getTableOrderAll.page = val;
      } else {
        this.bank_countersignature.page = val;
      }
      this.pagination.page = val;
      this.tableData = [];
      this.tableSelectList = [];
      this.initData();
    },

    handleSizeChange(val) {
      if (this.bank_countersignature.state == "0") {
        this.getTableOrderAll.limit = val;
        this.pagination.limit = val;
        this.pagination.page = this.getTableOrderAll.page = 1;
      } else {
        this.bank_countersignature.limit = val;
        this.pagination.limit = val;
        this.pagination.page = this.bank_countersignature.page = 1;
      }
      this.tableData = [];
      this.tableSelectList = [];
      this.initData();
    },
    submitForm() {
      this.tableData = [];
      this.tableSelectList = [];
      this.initData('1');
    },
    resetForm(formName) {
      this.fawenTime= [];
      this.jiemiTime= [];
      this.bank_countersignature = {
        function: "statistMiWenTongJi",
        decryptTimeStart: "",
        decryptTimeEnd: "",
        sendTimeStart: "",
        sendTimeEnd: "",
        draftDepartmentId: "",
        draftDepartmentName: "",
        sendType: 0,
        draftUserName: "",
        dataId: ""
      }

      this.tableData = [];
      this.tableSelectList = [];
      // this.initData();
    },
    // 单位选择
    getTreeData(n) {
      // let obj = {};
      // let name = "";
      // this.offenUse = false;
      // this.dialogTypeNow = this.dialogType = n;
      let that = this;
      // let clearName = "";
      // this.canTab = false;
      // this.singelCheckF = true;
      // this.treeData = [];
      // //手动清空时处理
      // switch (n) {
      //   case "hui":
      //     //this.bank_main
      //     name = "主办部门";
      //     obj = Object.assign(obj, this.undertakeDeptIdData);
      //     clearName = "draftDepartmentName";
      //     break;
      // }
      // this.clearCheckData(clearName);
      // this.dialogTit = name;
      // this.showCompDialog();
      that.$refs.dialog.openDialog();
      let treeParams = {
        function: "unitTreeByFirst",
        flag: true,
        openSup: false,
        openSupDept: false,
        openCurr: true,
        openCurrFistDept: true,
        openEqual: false,
        openEqualDept: false,
        openSub: false,
        openSubDept: false,
        wfeUnitId: ''
      }
      that.$post
        .postData(
          "unitTreeByFirst",
          JSON.stringify(treeParams),
          that.$businessCode.ggfawgl
        )
        .then(res => {
          if(res.message == "Loading"){
            that.loadingTree = true;
          }else{
            that.loadingTree = false;
          }
          if (that.isMoreDept) {
            that.treeData = (res && res.data) || [];
            that.treeData.map((m,n)=>{
              that.treeData[0].disabled = true;
            })
          } else {
            that.treeData = (res && res.data) || [];
            let transTree = (res && res.data[0].children) || [];
            let transArr = transTree.filter(item => that.treeSetData.some(e => e === item.id));
            that.treeData[0].children = transArr;
          }
        });
    },
    checkNode(result) {
      this.bank_countersignature.draftDepartmentName = result.name;
      this.bank_countersignature.draftDepartmentId = result.id;
    },

    //清空处理
    clearCheckData(name) {
      //手动清空时处理
      if (!this.bank_countersignature[name]) {
        this.checkIds = [];
        this.checkData = [];
        if (name === "draftDepartmentName") {
          this.bank_countersignature.draftDepartmentId = "";
          this.chenCheckData = [];
        }
        if (name === "draftDepartmentName") {
          this.bank_countersignature.draftDepartmentId = "";
          this.shouCheckData = [];
        }
      }
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
          case "hui":
            this.bank_countersignature.draftDepartmentName = names.join("");
            this.bank_countersignature.draftDepartmentId = ids.join("");
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
      switch (type) { 
        case "hui":
          // this.checkIds = this.bank_countersignature.draftDepartmentId||[];
          this.checkIds = this.bank_countersignature.draftDepartmentId
            ? this.bank_countersignature.draftDepartmentId.split(";")
            : [];
          this.checkData = this.chenCheckData;
          break;
      }
    }
  },
  created() {
    if(sessionStorage.getItem('QBLIST')){
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('QBLIST')))
    }
    this.bank_countersignature.sendType = 0;
    this.bank_countersignature.decryptTimeStart = this.$route.query.detail && JSON.parse(JSON.parse(this.$route.query.detail).COMMENTS).decryptTimeStart || '';
    this.bank_countersignature.decryptTimeEnd = this.$route.query.detail && JSON.parse(JSON.parse(this.$route.query.detail).COMMENTS).decryptTimeEnd || '';
    this.jiemiTime = [this.bank_countersignature.decryptTimeStart, this.bank_countersignature.decryptTimeEnd]
    this.bank_countersignature.draftDepartmentId = this.$route.query.detail && JSON.parse(JSON.parse(this.$route.query.detail).COMMENTS).draftDepartmentId || '';
    this.bank_countersignature.draftDepartmentName = this.$route.query.detail && JSON.parse(JSON.parse(this.$route.query.detail).COMMENTS).draftDepartment || '';
    this.initData();
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs__header{
  margin: 0 0 7px;
}
.is10{
  margin: 20px 0 !important;
}
.btn-writeEnDspc {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.btn-writeEnDspc:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
.mt20 {
  padding: 10px 0 0 0;
  position: relative;
  border: 1px solid #f0f0f0;
}
.mtdown {
  padding: 20px 0 80px 0;
}
.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: block;
}
.down {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  text-align: center;
}
.mt20end {
  margin-top: 20px;
}

.arrowup{
  text-align: center;
}
.mt20 {
    margin-top: 10px;
}
/deep/ .bank_dispach_content>.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 6px !important;
}
</style>
