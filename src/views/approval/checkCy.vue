<template>
  <div class="checkBj">
    <el-tabs @tab-click="handleClick" v-model="paneTab">
      <el-tab-pane label="全部" name="typeFir">
      </el-tab-pane>

      <el-tab-pane name="typeSec">
        <span slot="label">
          未阅
          <el-badge :value="needTodoNum" class="item" :type="messType"></el-badge>
        </span>
      </el-tab-pane>
      <el-tab-pane label="已阅" name="typeThr">
      </el-tab-pane>
      <el-tab-pane label="办结" name="typefour">
      </el-tab-pane>
    </el-tabs>
　　<div class="cformdata">
          <search-form
            ref="searchForm"
            :formData="formData"
            :config="config"
            :openshow="openshow"
            :hasShow="hasShow"
            @reset="reset"
            @event="btnevent"
            class="mt20"
            @submit="submit"
            :formCfg="formCfg"
          ></search-form>
    </div>
    <m-table
      @refresh="loadData()"
      @cellClick="cellClick"
      @select="select"
      :searchData="searchData"
      size="medium"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      :tableRowClassNames="tableRowClassName"
    ></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from "@/components/table/tTable";
import searchForm from "@/components/form/searchForm";
import shiwucommon from "../approval/minixs/shiwucommon"; //事物审批公共方法
export default {
  name: "checkCy",
  components: {
    mTable,
    searchForm
  },
  mixins: [ shiwucommon],
  props: {},
  data() {
    return {
      config:{labelWidth:'120px'},//查询条件label宽度
      hasShow:false,//查询条件不展示收起按钮
      openshow: true,
      messType: "primary",
      needTodoNum: 0,
      paneTab: "typeSec",
      tabName:'typeSec',
      formData: {
        numYear:'',
        approveNo: "",
        // applyNo: "〔" + new Date().getFullYear() + "〕"
      },
      formCfg: [],
      serverconfig: {
        labelWidth: "140px"
      },
      type: "0",
      tableData: [],
      tableCols: [
        { label: "发传阅时间", prop: "updateTime", width: 100 },
        { label: "审批编号", prop: "approveNo", minwidth: 180 },
        { label: "申请编号", prop: "applyNo", minwidth: 180 },
        { label: "申请单位", prop: "curbank", minwidth: 180 },
        { label: "标题", prop: "title", minwidth: 250 },
        { label: "发送人", prop: "sendPersonCn", width: 100 }
      ],
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 20
      },
      options: [],
      deleteArry: "",
      searchData: {numYear:'',}
    };
  },
  computed: {},
  methods: {
    tableRowClassName(row) {
      if (
        row.isRed == "0" &&
        (this.paneTab == "typeSec" || row.isReadflag == "0")
      ) {
        return "warning-row";
      }
    },
    initData() {
      this.formCfg = [
        {
          type: "select",
          prop: "numYear",
          label: "审批编号年份",
          config: { clearable: true },
          options:'',
          span: 8,
          value:'',
          style: { width: "100%" }
        },
        { type: "input", prop: "title", label: "标题", span: 8, value: "" },
        {
          type: "input",
          prop: "approveNo",
          label: "申请/审批编号",
          span: 8,
          value: ""
        },
        // {
        //   type: "input",
        //   prop: "applyNo",
        //   label: "申请编号",
        //   span: 8,
        //   value: "〔" + new Date().getFullYear() + "〕"
        // },
        {
          type: "date-daterange",
          prop: "$date",
          label: "传阅日期",
          rangeSeparator: "-",
          span: 8,
          valueFormat: "yyyy-MM-dd"
        },
        // { type: "input", prop: "curbank", label: "申请单位", span: 8, value: "" },
        [
          { type: "button-primary", prop: "$submit", value: "开始查询" },
          { type: "button", prop: "$reset", value: "重置" },
           {
            type: "formitem",
            style: { "text-align": "center", "margin-left": "-120px" }
          }
        ]
      ];
    },
    btnevent(params) {
      switch (params.prop) {
        case "title":
          this.formData["title"]=params.value;
          break;
        case "curbank":
          this.formData["curbank"]=params.value;
          break;
        case "numYear":
          this.formData["numYear"] = params.value;
          if(params.value==''){
               this.$refs.searchForm.setText('approveNo', '');
                this.formData["approveNo"] ='';
          }else{
                this.$refs.searchForm.setText('approveNo', '〔'+params.value+'〕');
                this.formData["approveNo"] = '〔'+params.value+'〕';
          }
          break;
        // case "applyNo":
        //   this.formData["applyNo"] = params.value;
        //   break;
        case "approveNo":
          this.formData["approveNo"] = params.value;
          break;
        case "$date":
         // console.log("params", params);
          this.formData["approveTimeStart"]=params.value[0];
          this.formData["approveTimeEnd"]=params.value[1];
          break;
      }
    },
    loadData() {
      this.$api.checkLz
        .checkCYAllTable(
          {
            ...this.searchData,
            type: this.type,
            ...this.formData
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize
          }
        )
        .then(res => {
          if (this.paneTab == "typeSec") {
            this.needTodoNum = res.total;
            if (this.needTodoNum > 0) {
              this.messType = "danger";
            } else {
              this.messType = "primary";
            }
          }
          this.pagination.total = res.total;
          this.tableData = res.data;
        });
    },
    cellClick(row) {
      //改版后数据且是请假备案申请项目,进入新版页面
      if (
        (row.applyProjectName.indexOf("主要负责人请假、备案申请") != -1 ||
          row.applyProjectName.indexOf("主要负责人请假、备案申请") != -1) &&
        row.sourceType === "1"
      ) {
        //是否是代办页面
        const iswait = row.isReadflag == "0" ? true : false;
        this.$intent.goNewPage(this, {
          name: "detailCYv",
          query: { id: row.id, type: "checkCy", iswait: iswait,numyear:this.formData.numYear }
        });
      }


      //全部页签，根据infoType判断跳转页面，0：未阅，1已阅，3办结
      if(this.tabName==='typeFir'&&row.infoType==0||this.tabName==='typeSec'){
        this.hasOpened(row.id,{
          path: "/approval/detailCY",
          query: { id: row.id, type: "checkCy",numyear:this.formData.numYear }
        })
        // this.$intent.goNewPage(this, {
        //   path: "/approval/detailCY",
        //   query: { id: row.id, type: "checkCy" }
        // });      
      }else if(this.tabName==='typeFir'&&(row.infoType==1||row.infoType==3)){
        this.$intent.goNewPage(this, {
          path: "/approval/finDetailCY",
          query: { id: row.id, type: "checkCyFin",numyear:this.formData.numYear }
        });
         //办结页签，跳转已阅页面
      }else if(this.tabName==='typefour'||this.tabName==='typeThr'){
        this.$intent.goNewPage(this, {
          path: "/approval/finDetailCY",
          query: { id: row.id, type: "checkCyFin",numyear:this.formData.numYear}
        });
      }
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
      this.tabName=tab.name;
      this.reset();
      if (tab.name === "typeFir") {
        if(this.formCfg.length==5){
          this.formCfg.splice(4,0,{ type: "input", prop: "curbank", label: "申请单位", span: 8, value: "" })
        }
        this.type = 2;
        this.loadData(this.type);
      } else if (tab.name === "typeSec") {
         if(this.formCfg.length==6){
          this.formCfg.splice(4,1)
        }
        this.type = 0;
        this.loadData(this.type);
      } else if (tab.name === "typeThr") {
        if(this.formCfg.length==6){
          this.formCfg.splice(4,1)
        }
        this.type = 1;
        this.loadData(this.type);
      } else {
        if(this.formCfg.length==6){
          this.formCfg.splice(4,1)
        }
        this.type = 3; //办结
        this.loadData(this.type);
        return;
      }
    },
    //重置
    reset() {
      this.formData = {
        approveNo: "",
        numYear:'',
        // applyNo: "〔" + new Date().getFullYear() + "〕",
      };
      this.$refs.searchForm.setText("numYear","");
      this.$refs.searchForm.setText("$date", "");
      this.$refs.searchForm.setText("title", "");
      this.$refs.searchForm.setText("curbank", "");
      this.$refs.searchForm.setText("approveNo","");
      // this.$refs.searchForm.setText(
      //   "applyNo",
      //   "〔" + new Date().getFullYear() + "〕"
      // );
    },
    // clearAll(){
    //   this.formData = {};
    //   this.$refs.searchForm.setText("$date", "");
    //   this.$refs.searchForm.setText("title", "");
    //   this.$refs.searchForm.setText("curbank", "");
    //   this.$refs.searchForm.setText("approveNo","");
    //   this.$refs.searchForm.setText("applyNo","");
    // },
    //开始查询
    submit(params) {
      this.formData = params;
      this.loadData();
    },
  },
  activated() {},
  mounted() {
    document.title="事务审批";
  },
  created() {
        this.getNumYearListCommon().then((res)=>{
        this.yearList=res;
        this.formCfg.splice(0,1, {
          type: "select",
          prop: "numYear",
          label: "审批编号年份",
          config: { clearable: true },
          options: this.yearList,
          span: 8,
          value:'',
          style: { width: "100%" }
        })
      console.log(res)
    })
    this.initData();
    this.loadData();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.cformdata {
  margin-top: 24px;
}
</style>
