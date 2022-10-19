<template>
  <div>
    <el-row>
      <el-col>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm transition_wrap" :class="{mtdown:down}">
          <el-row>
            <el-col :span="8">
              <el-form-item label="文号年份" prop="choseYear">
                <el-select
                  v-model="ruleForm.choseYear"
                  @change="selectYear"
                  placeholder="近两年"
                  style="width: 100%;"
                >
                  <el-option value label="近两年"></el-option>
                  <el-option
                    v-for="yearItem in yearList"
                    :key="yearItem"
                    :label="yearItem"
                    :value="yearItem"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拟稿日期" prop="draftRangeTime">
                <el-date-picker
                  @change="draftRangeTimeChange()"
                  v-model="draftRangeTime"
                  style="width:100%;"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发文字号" prop="documentNo">
                <el-input v-model="ruleForm.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发文日期" prop="sendRangeTime">
                <el-date-picker
                  @change="sendRangeTimeChange()"
                  style="width:100%"
                  value-format="yyyy-MM-dd"
                  v-model="sendRangeTime"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="21">
                  <el-form-item label="主办部门" prop="draftDepartmentId">
                    <el-input v-model="ruleForm.mainOrganNames" readonly="readonly"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-button type="primary" @click="selectDepartment">选择</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col style="text-align: center;margin-bottom: 10px;">
              <el-col v-if="!down" class="arrowup">
                <el-button type="primary" @click="submitForm" style="margin:0 10px">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <!-- <el-button type="info" size="small" @click="arrow()"> <i class="el-icon-arrow-down el-icon--left"></i> 展开</el-button> -->
              </el-col>
            </el-col>
          </el-row>
          <!-- <div v-if="down" class="clearfix">
            <el-row>
              <el-col>
                <el-row class="center">
                  <el-button type="primary" @click="submitForm">搜索</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="down">
                <el-button type="info" size="small"  @click="arrow()"> <i class="el-icon-arrow-up el-icon--left"></i> 收起</el-button>
              </el-col>
            </el-row>
          </div> -->
        </el-form>
      </el-col>
      <el-col style="margin: 10px 0;">
        <m-table
          size="medium"
          :isSelection="false"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :state="bank_select.state"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
          >
        </m-table>
      </el-col>
    </el-row>
    <treeCofig
      :treeData="treeData"
      :canTab="false"
      :hasRadio="false"
      dialogTit="选择部门"
      :singelCheckF="true"
      :dialogState="dialogState"
      :offenUse="false"
      @showCompDialog="showCompDialog"
    ></treeCofig>
    <Dialog ref="dialog" @checkNode="checkNode" :treeData="treeData"></Dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import optionalfield from "components/optionalfield/optionalfield.vue";
import dispatchFileQuery from "@/minixs/dispatchFileQuery"
import Dialog from "@/views/dispatch/departDialog.vue";
import treeCofig from '@/components/tree/tree-fawen';
export default {
  name: "DispatchFile",
  mixins: [dispatchFileQuery],
  components: {
    mTable,
    // optionalfield,
    Dialog,
    treeCofig
  },
  data() {
    return {
      department_params: {
        function: "selUnitTreeByHQ",
        flag: true
      },
      dialogState:false,
      treeData:[],
      draftDepartmentName:"",
      bankOptions:[],
      bank_select: {
        function: "searchSizeExceed",
        state: 1,
        page: 1,
        totalCount: 0,
        limit: 20
      },
      down:false,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      draftRangeTime:[],
      sendRangeTime:[],
      ruleForm: {
        draftTimeStart:'',
        draftTimeEnd:'',
        sendTimeStart:'',
        sendTimeEnd:'',
        title: '',
        documentNo: '',
        draftDepartmentId:"",
        draftOrganId: "",
      },
      tableLoading:false,
      sortDate:[{ prot: 'date', order: 'descnding'}],
      tableData: [],
      tableCols: [
        { label: "拟稿日期", prop: "draftTime", align: "center", width: "150px" },
        { label: "发文日期", prop: "sendTime", align: "center", width: "150px" },
        { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
        { label: "标题", prop: "title", align: "left",minwidth:"40%" },
        { label: "主办部门", prop: "draftDepartment", align: "center", width: "120px" },
        { label: "字数", prop: "sizeFact", align: "center", width: "100px" },
      ],
      pagination: {
        pagNum: 1,
        total: 0,
        limit:10,
      },
    };
  },
  methods: {
    //主办部门选择按钮
    // selectDepartment() {
    //   this.treeData = [];
    //   this.showCompDialog();
    //   this.department_params.unitCodes = "";
    //   this.$post.postData(
    //     "selUnitTreeByHQ",
    //     JSON.stringify(this.department_params),
    //     this.$businessCode.fawgl
    //   ).then(res => {
    //     this.treeData = (res && res.data) || [];
    //   });
    // },
    //弹窗确认按钮
    // showCompDialog(data, status, type, params) {
    //   let that = this;
    //   let id = "";
    //   let departmentName = "";
    //   if (status) {
    //     if (data.length) {
    //       id = data[0].id;
    //       departmentName = data[0].name;
    //     } else {
    //       id = "";
    //       departmentName = "";
    //     }
    //     that.draftDepartmentName = departmentName;
    //     this.ruleForm.draftDepartmentId  = id;
    //     this.$forceUpdate();
    //   }
    //   this.dialogState = !this.dialogState;
    // },
    checkNode(result) {
      this.ruleForm.mainOrganNames = result.name;
      this.ruleForm.deptIds = this.ruleForm.draftDepartmentId = result.id;
    },
    handleCurrentChange(val) {
      this.bank_select.page = this.pagination.page = val;
      this.tableData = [];
      this.getTableList();
    },
    handleSizeChange(val) {
      this.bank_select.limit = this.pagination.limit = val;
      this.pagination.page = this.bank_select.page = 1;
      this.tableData = [];
      this.getTableList();
    },
    /**
     * 发文列表查询
    */
    getTableList(){
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      this.bank_select = Object.assign(this.bank_select,this.ruleForm);
      this.$post.postData("searchSizeExceed", JSON.stringify(this.bank_select), this.$businessCode.fawgl).then(res => {
        this.tableData = res.data&&res.data.rows||[];
        this.pagination.total = res.data.total;
        this.bank_select.totalCount = res.data&&res.data.total||0;
      })
    },
    //搜索条件展开/折叠
    arrow(){
      this.down = !this.down;
    },
    draftRangeTimeChange(times){
      if(!this.draftRangeTime||this.draftRangeTime=="null"||this.draftRangeTime=="undefined"){
        this.ruleForm.draftTimeStart = "";
        this.ruleForm.draftTimeEnd = "";
        return false;
      }
      this.ruleForm.draftTimeStart = this.draftRangeTime[0]; 
      this.ruleForm.draftTimeEnd = this.draftRangeTime[1];
    },
    sendRangeTimeChange(times){
      if(!this.sendRangeTime||this.sendRangeTime=="null"||this.sendRangeTime=="undefined"){
        this.ruleForm.sendTimeStart = "";
        this.ruleForm.sendTimeEnd = "";
        return false;
      }
      this.ruleForm.sendTimeStart = this.sendRangeTime[0]; 
      this.ruleForm.sendTimeEnd = this.sendRangeTime[1];
    },
    cellClick(row, column, cell, event){
      if (row.sendType === '实物') {
        this.handleOpenPage('/bankEntityDispatchDone', row.id, row.readFlag)
      } else if (row.sendType === '电子') {
        this.handleOpenPage('/bankDispachDone', row.id, row.readFlag)
      }
    },
    handleOpenPage (path, id, readType) {
      const routeData = this.$router.resolve({
        path: path,
        query: {
          id: id,
          readFlag:readType,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm() {
      this.getTableList();
    },
    resetForm() {
      this.draftRangeTime="";
      this.sendRangeTime="";
      this.ruleForm.draftTimeStart = this.ruleForm.draftTimeEnd= "";
      this.ruleForm.sendTimeStart = this.ruleForm.sendTimeEnd= "";
      this.draftDepartmentName = "";
      this.ruleForm.draftDepartmentId = "";
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.defaultYear();
      this.tableData = [];
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.ruleForm.documentNo = '〔'+ openTimeYear +'〕'
      
    }
  },
  created() {
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.defaultYear();
    this.bankOptions = JSON.parse(localStorage.getItem("unitInfo"))||[];
  }
}
</script>

<style lang="less" scoped>
.btn-writeEnDspc {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #DCDFE6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin-right: 10px;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
}
.btn-writeEnDspc:hover {
    background: #66b1ff;
    border-color: #66b1ff;
}
.mtdown{
  padding:20px 20px 80px 0;
}
.center{
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  display: block;
}
.down{
  position: absolute;
  bottom:-76px;
  font-size:12px;
  text-align:center;
}
</style>
