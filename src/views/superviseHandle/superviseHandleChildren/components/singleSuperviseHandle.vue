<template>
  <!-- <el-tabs v-model="activeName" @tab-click="handleTabsClick">
    <el-tab-pane label="全部" name="tabs-all">
    </el-tab-pane>
    <el-tab-pane label="待办" name="tabs-wait"></el-tab-pane>
    <el-tab-pane label="已办" name="tabs-done"></el-tab-pane>
    <el-tab-pane label="办结" name="tabs-end"></el-tab-pane> -->
    <div class="dispatchcswhlshwh">
    <el-row>
      <el-col v-show="iaAll">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="8">
            <el-form-item label="机构名称">
              <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                <el-input
                  type="text"
                  readonly="readonly"
                  placeholder="请选择"
                  v-model="unitName"
                  suffix-icon="el-icon-arrow-down"
                />
              </select-org-or-dept>
            </el-form-item>
        </el-col>
            <el-col :span="8">
              <el-form-item label="登记日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange()"
                    v-model="ruleForm.endTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    style="width:300px"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="事由提要" prop="summary">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="编号" prop="doucumentNum">
                <el-input v-model="ruleForm.documentNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="流程状态">
                <el-select v-model="bank_countersignature.curNodeCode">
                  <el-option value="-1" label="流转中"></el-option>
                  <el-option value="800" label="已办结"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="text-align: center;" :span="24" class="glymt10">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="danger" class="deleteButton_gly" @click="handleBatchDelete">删除</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col class="mt20end" v-if="isAddShow&&bank_countersignature.state == 1">
        <router-link
          tag="a"
          target="_blank"
          :to="{path:'singleSuperviseHandleAdd'}"
          class="btn-writeEnDspc"
        >起草单项督查办</router-link>
      </el-col>
      <el-col style="margin: 10px 0;min-height:500px;">
        <m-table
          size="medium"
          :isSelection="true"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false"
          :state="bank_countersignature.state"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @select="handleSelectionChange"
          @selection-change="handleSelectionChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          :isIndexPage="true"
          @cellClick="cellClick"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
     </div>
  <!-- </el-tabs> -->
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const finshData = [
  { label: "登记日期", prop: "TMS", align: "center" },
  { label: "编号", prop: "DOCUMENTCODE", align: "center", width:"300" },
  { label: "立项依据", prop: "PROJECTBASE", align: "center" },
  { label: "事由提要", prop: "TITLE", align: "center", width:"300" },
  { label: "当前环节", prop: "CURNODENAME", align: "center" },
  { label: "当前处理人 ", prop: "AVYEXCTRNM", align: "center" },
  { label: "联系人 ", prop: "DRAFTUSER", align: "center" },
];
const otherData = [
  { label: "登记日期", prop: "registDate", align: "center",width:"100" },
  { label: "编号", prop: "doucumentNum", align: "center",width:"200" },
  { label: "立项依据", prop: "projectBase", align: "center",width:"100" },
  { label: "事由提要", prop: "summary", align: "left", minwidth:"100%"  },
  { label: "承办部门", prop: "undertakeOrgName", align: "center",width:"100" },
  { label: "当前环节", prop: "curNodeName", align: "center",width:"100" },
  { label: "当前处理人 ", prop: "curUser", align: "center",width:"100" },
  { label: "联系人 ", prop: "contact", align: "center",width:"100" },
];

export default {
  name: "DispatchFile",
  components: {
    mTable,
    selectOrgOrDept
  },
  data() {
    return {
      isGly:false,
      deleteIds:"",
      unitName1:'',
      unitId1:'',
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
      bank_countersignature: {
        function: "getWFTask",
        tplbsnid:'DXZX_DB', 
        state: 0, //全部0 待办1  已办2  办结3
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount:0,
        startDate: '',
        endDate: '',
        documentNum: '',
        summary: '',
        curNodeCode: '',
        unitId: ""
      },
      isAddShow:true,
      iaAll:true,//全部才会显示流转状态
      down: false,
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
      ruleForm: {
        documentNo: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        statrTime: "",
        endTime: "",
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        desc: ""
      },
      tableLoading: false,
      activeName: "tabs-wait",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total:0, //共有条数
        limit:20, //每页条数
      },
      ggJyx:this.$businessCode.zxdbgg,//公共交易线
      baowenzd:this.$businessCode.zxdb,

    };
  },
  created() {
    if(sessionStorage.getItem('ZXDB')){
      this.bank_countersignature = Object.assign(this.bank_countersignature,JSON.parse(sessionStorage.getItem('ZXDB')))
    }
    this.pagination={
      page: this.bank_countersignature.page, //第几页
      total: this.bank_countersignature.totalCount, //共有条数
      limit: this.bank_countersignature.limit, //每页条数
    }
    this.isGly = isGlyId();
    this.ruleForm.documentNo = "〔"+new Date().getFullYear()+"〕";
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf:"1",
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitName1 = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.unitId1 = res.data[0].unitCode||'';
      this.initData();
    })
  },
  methods: {
     // 选择机构
    selectOrg(org) {
      this.unitName = org.unitName;
      this.unitId = org.id;
      console.log(org, this.unitName , this.unitId);
    },
    // 判断登陆人是否业务管理员或系统管理员
    addDrafOrgNm() {
      let manger = JSON.parse(localStorage.getItem("tcHumanRole"));
      this.draforgnmPeople = manger.filter(item => {
        return (
          item.codeType === "manager_type" && item.dicCode === "sys_manager"
        );
      });
      if (this.draforgnmPeople.length !== 0) {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = false;
        this.identity = true;
      } else {
        this.unitName = JSON.parse(
          localStorage.getItem("userInfo")
        ).shortUnitName;
        this.unitId = JSON.parse(
          localStorage.getItem("userInfo")
        ).unitId;
        this.addDis = true;
        this.identity = false;
      }
      console.log(this.unitName,this.unitId)
    },
    // 页面初始化加载数据
    initData(tabindex) {
      this.bank_countersignature.unitName = this.unitName
      this.bank_countersignature.unitId = this.unitId
      sessionStorage.setItem('ZXDB',JSON.stringify(this.bank_countersignature));
      if(this.bank_countersignature.state == "0"){
        this.tableCols = otherData
        Object.assign(this.bank_countersignature,{function:"sysSupervisePage",superviseDirect: '1'})
        this.$post
        .postData(
          "sysSupervisePage",
          JSON.stringify(this.bank_countersignature),
          this.baowenzd
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
      }else{
        this.tableCols = finshData;
        Object.assign(this.bank_countersignature,{function:"getWFTask"})
        this.$post
        .postData(
          "getWFTask",
          JSON.stringify(this.bank_countersignature),
          this.ggJyx
        )
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
      }
      
    },
    arrow() {
      this.down = !this.down;
    },
    timeChange() {
      if (this.ruleForm.endTime) {
        this.bank_countersignature.startDate = dateFormate.date(Date.parse(this.ruleForm.endTime[0]))
        this.bank_countersignature.endDate = dateFormate.date(Date.parse(this.ruleForm.endTime[1]))
      }else {
        this.bank_countersignature.startDate = ''
        this.bank_countersignature.endDate = ''
      }
    },
    handleSelectionChange (val) {
      this.deleteIds="";
      const idsArr = []
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id)
      }
      this.deleteIds = idsArr.join(';')
    },
    handleBatchDelete () {
      if (this.deleteIds === "") {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据!'
        })
        return;
      }else{

      
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        this.$post.postData('doLogicDeleteById', 
          JSON.stringify({ function: 'doLogicDeleteById', 
          ids: this.deleteIds,unitId:this.unitId,
          code:"1" 
          }),
          this.$businessCode.zxdb).then((res) => {
            if(res&&res.success){
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.initData()
            }else {
              this.$message({
                type: 'error',
                message: '删除失败',
                duration: 1000,
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
            duration: 1000,
          });
        });
      }
    },
    //点击 全部0 待办1  已办2  办结3
   handleTabsClick(tab, event) {
     this.bank_countersignature.state = tab.index;
      this.iaAll=true; 
      this.bank_countersignature.totalCount =0;
      this.initData();
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.bank_countersignature.page = val;
      this.pagination.page = val;
      this.tableData = [];
      this.initData();
    },

    handleSizeChange(val) {
      this.bank_countersignature.limit = this.pagination.limit = val;
      this.pagination.page = this.bank_countersignature.page = 1
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      let readFlag;
      let idType;
      if(this.bank_countersignature.state == 0){
        readFlag = row.readFlag ? row.readFlag : '';
        idType = row.id ? row.id : '';
      }else{
        readFlag = row.READFLAG ? row.READFLAG : '';
        idType = row.ID ? row.ID : '';
      }
      // if(this.bank_countersignature.state == 2 || this.bank_countersignature.state == 3 || row.orderStatus == "已办" ||  row.orderStatus == "办结"){
          
          const routeData = this.$router.resolve({
            path: "/singleSuperviseHandleBJYBCopy",
            query: {
              id: idType,
              readFlag:readFlag,
              manager:'', 
              unitId:this.unitId,
            }
          });
          window.open(routeData.href, "_blank");
      // }else{
      //   const routeData = this.$router.resolve({
      //     path: "/singleSuperviseHandleAdd",
      //     query: {
      //       id: idType,
      //       readFlag:readFlag
      //     }
      //   });
      //   window.open(routeData.href, "_blank");
      // }
      
    },
    submitForm() {
      this.bank_countersignature.summary = this.ruleForm.title
      this.bank_countersignature.documentNum = this.ruleForm.documentNo
      this.pagination.page = 1;
      this.bank_countersignature.page = 1;
      this.initData();
    },
    resetForm(formName) {
      this.ruleForm.documentNo = "〔"+new Date().getFullYear()+"〕";
      this.ruleForm.title = '';
      this.ruleForm.endTime = '';
      this.bank_countersignature.summary = ''
      this.bank_countersignature.documentNum = ''
      this.bank_countersignature.startDate = ''
      this.bank_countersignature.endDate = ''
      this.bank_countersignature.curNodeCode = ''
      this.bank_countersignature.unitId = this.unitId1;
      this.unitName=this.unitName1;
      this.unitId=this.unitId1;
      this.initData();
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs__header{
  margin: 0 0 7px;
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
  padding: 20px 0 0 0;
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
/deep/ .dispatchcswhlshwh{
  .tree-div{
    width: 300px !important;
    top: unset;
    position: fixed;
    .el-scrollbar {
      height: 90%;
    }
  }
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
</style>

