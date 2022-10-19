<template>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane label="待阅" name="tabs-wait"></el-tab-pane>
      <el-tab-pane label="已阅" name="tabs-done"></el-tab-pane>
      <el-row>
        <el-col>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm mt20">
            <el-row>
              <el-col :span="7">
                <el-form-item label="时间">
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
              <el-col :span="5">
                <el-form-item label="标题：" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="文号" prop="documentCode">
                  <el-input v-model="ruleForm.documentCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-col class="arrowup">
                  <el-button type="primary" v-show="activeName!='tabs-ptmtdelay'" @click="submitForm">搜索</el-button>
                  <el-button type="primary" v-show="activeName=='tabs-ptmtdelay'" @click="submitForm">开始统计</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-col>
              </el-col>
            </el-row> 
          </el-form>
        </el-col>
        <el-col v-if="btnCheckOut" class="mt20end txtRight">
          <el-button type="primary" size="small" @click="exportExcel">导出本页查询结果</el-button>
        </el-col>
        <el-col v-if="false" class="mt20end txtRight">
          <el-button type="primary" size="small">快速阅览</el-button>
          <el-button type="primary" size="small">行领导标记已阅</el-button>
          <el-button type="primary" size="small">删除</el-button>
        </el-col>
        <el-col style="margin: 20px 0;">
          <m-table
            size="medium"
            :isSelection="false"
            :isIndex="true"
            :isPagination="true"
            :isHandle="false"
            :tableData="tableData"
            :tableCols="tableCols"
            :isIndexPage="true"
            :state="bank_Select.state"
            @selection-change="handleSelectionChange"
            :pagination="pagination"
            @cellClick="cellClick"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            v-loading="tableLoading"
            :default-sort="sortDate"
          ></m-table>
        </el-col>
      </el-row>
    </el-tabs>
</template>
<script>
import mTable from "components/table/mTable.vue";
import { skipPath } from "@/util/skipPath.js";
const wtdnData = [//待办
  { label: "紧急程度", prop: "EMERGENCY_LEVEL", align: "center",width:"100px"},
  { label: "时间", type: "Html", align: "center",
    html:row=>{
      if(row.TMS){
        let TMS = row.TMS.slice(0,16);
        return `<span>${TMS}<span>`;
      }else{
        return ""
      }
    },width:"120px"
  },
  { label: "督办", type:'Html' ,align: "center",
    html:row=>{
      if(row.IS_DUBAN=='1'||row.DATA_TYPE=="DXZXDB_XB"||row.DATA_TYPE=="DXZXDB_CB"){
        return"<span style='display:inline-block;width:10px;height:10px;background-color:#0C9;border-radius: 50%;'></span>"
      }else{
        // return "<span style='display:inline-block;width:15px;height:15px;background-color:#ccc;border-radius: 50%;'></span>"
      }
    },width:"40px"
  },
  { label: "标题", prop: "TITLE", align: "left",minwidth:"40%"},
  { label: "文号", prop: "DOCUMENTCODE", align: "left",width:'200px'}, 
  { label: "文件类型", prop: "DOCUMENT_TYPE_NAME", align: "center",width:"100px"},
  { label: "发送人", prop: "SEND_USER_NAME", align: "center",width:"100px"},
]
const ruleForm={
  title: "", //标题
  statrTime: "",
  endTime: "",
  documentCode:"〔〕",
}
export default {
  name: "Todolist",
  components: {
    mTable
  },
  data() {
    return {
      bank_Select: {
        state:1,
        function: "selectWenJianYuLan",
        readStatus:"0", //0-- 未阅；1--已阅
        page: 1,
        totalCount: 0,
        limit: 20
      },
      btnCheckOut: false,
      ptAuthority:false,
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
      rangeTime:"",
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
        limit:20
      }
    };
  },
  async created() {
    window.addEventListener('beforeunload',this.beforLoad(),true)
    this.getHumanRole();
    await this.initActiveName();
    this.ruleForm = JSON.parse(JSON.stringify(ruleForm));
    await this.initData(this.activeName);
  },
  methods: {
    beforLoad(e){
      if(sessionStorage.getItem('waitReadPage')){
        this.bank_Select.page = this.pagination.page = parseFloat(sessionStorage.getItem('waitReadPage'));
      }
      if(sessionStorage.getItem('waitReadSize')){
        this.bank_Select.limit = this.pagination.limit = parseFloat(sessionStorage.getItem('waitReadSize'));
      }
      if(sessionStorage.getItem('waitReadTab')){
        this.activeName = sessionStorage.getItem('waitReadTab');
      }
    },
    initActiveName(){
      let activeName='';
      if(sessionStorage.getItem('waitReadTab')){
        activeName = sessionStorage.getItem('waitReadTab')
      }else{
        activeName = this.$route.query.activeName;
      }
      this.activeName = activeName?activeName:"tabs-wait";
      this.routerQueryUpdate();
    },
    routerQueryUpdate(){
      if(this.activeName=="tabs-done"){
        this.$router.push({
          path:'/fileRead?activeName=tabs-done'
        })
      }else{
        this.$router.push({
          path:'/fileRead?activeName=tabs-wait'
        })
      }
    },
    /**
     * 用户权限校验
     */
    getHumanRole(){
      let userRole =  JSON.parse(localStorage.getItem('tcHumanRole'));
      userRole.map(item=>{
        if(item.dicCode=="zongheG"||item.dicCode=="deptqfG"||item.dicCode=="dubanG"){
          this.ptAuthority = true; 
        }
      });
    },
    /**
     * @description 请求列表数据
     * @param {String} tabType  tabs-wait:待阅； tabs-done：已阅;
    */
    initData(tabType) {
      if(this.ruleForm.documentCode == "〔〕"){
        this.ruleForm.documentCode = ''
      }
      this.bank_Select = Object.assign(this.bank_Select,this.ruleForm);
      if(tabType=="tabs-wait"){
        this.bank_Select.readStatus = "0"
        this.getWTList();
      }else if(tabType=="tabs-done"){
        this.bank_Select.readStatus = "1"
        this.getDoneList();
      }
    },
    /**
     * 待阅列表查询
    */
    getWTList(){
        this.$post.postData("selectWenJianYuLan",JSON.stringify(this.bank_Select), this.$businessCode.yjgl).then(res => {
          this.tableData = [];
          this.pagination.total = res.data&&res.data.total;
          this.bank_Select.totalCount = res.data&&res.data.total;
          this.tableData = res.data.rows;
          if(this.ruleForm.documentCode == ""){
            this.ruleForm.documentCode = '〔〕'
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 已阅列表查询
    */
    getDoneList(){
      this.$post.postData("selectWenJianYuLan",JSON.stringify(this.bank_Select), this.$businessCode.yjgl).then(res => {
        this.tableData = [];
        this.pagination.total = res.data&&res.data.total;
        this.bank_Select.totalCount = res.data&&res.data.total;
        this.tableData = res.data.rows;
        if(this.ruleForm.documentCode == ""){
          this.ruleForm.documentCode = '〔〕'
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    /**
     * 时间控件change事件
    */
    timeChange(rangeTime) {
      if(!rangeTime||rangeTime=="null"||rangeTime=="undefined"){
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
    handleTabsClick(tab,event) {
      sessionStorage.setItem('waitReadTab',tab.name);
      sessionStorage.setItem('waitReadPage',1);
      this.tableLoading = true;
      this.bank_Select.state = parseFloat(tab.index)+1;
      this.bank_Select.page = this.pagination.page = 1;
      this.bank_Select.limit = this.pagination.limit = 20;
      this.tableData=[];
      this.routerQueryUpdate();
      this.initData(tab.name);
      this.tableLoading = false;
    },
    cellClick(row, column, cell, event) {
      let skipPathObj = skipPath(row);
      if(this.activeName == "tabs-wait"){
        var path = skipPathObj.waitReadRouter;
      }else if(this.activeName == "tabs-done"){
        var path = skipPathObj.doneReadRouter;
      }
      let routeData = this.$router.resolve(path);
      window.open(routeData.href, "_blank");
    },
    submitForm(formName) {
      this.bank_Select.limit =20;
      this.pagination.limit = 20;
      this.pagination.page = 1;
      this.bank_Select.page = 1;
      this.initData(this.activeName);
    },
    resetForm() {
      this.rangeTime = "";
      this.ruleForm = JSON.parse(JSON.stringify(ruleForm));
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCharge () {
      if (this.multipleSelection.length < 1) {
        this.$message({
          type: "error",
          message: "请至少选择一条数据!"
        });
      }
      return
    },
    handleCurrentChange(val) {
      sessionStorage.setItem('waitReadPage',val);
      this.bank_Select.page = val;
      this.pagination.page = val;
      this.initData(this.activeName);
    },
    handleSizeChange(val) {
      this.bank_Select.limit = this.pagination.limit = val;
      sessionStorage.setItem('waitReadSize',val);
      this.pagination.page = this.bank_Select.page = 1
      this.initData(this.activeName);
    },
    // 导出
    exportExcel () {
      this.handleCharge()
    }
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
.arrowup{
  padding-left: 10px;
}
.circle{
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
.green{
  background-color: green;
}
.gray{
  background-color: gray;
}
</style>
