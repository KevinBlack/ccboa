<template>
  <el-tabs v-model="activeName">
    <el-row class="mtJ20">
      <el-col v-show="isAll">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm mt20"
          :class="{mtdown:down}"
        >
          <el-row>
            <el-col :span="6">
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
            <el-col :span="6">
              <el-form-item label="登记日期">
                <div class="block">
                  <el-date-picker
                    @change="timeChange($event)"
                    v-model="ruleForm.searchTime"
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
            <el-col :span="6">
              <el-form-item label="事由提要" prop="summary">
                <el-input v-model="bank_countersignature.summary"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="编号" prop="doucumentNum">
                <el-input v-model="bank_countersignature.doucumentNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" style="text-align: center;">
              <el-button type="primary" @click="initData('1')">搜索</el-button>
              <el-button type="primary" @click="resetForm">重置</el-button>
              <el-button type="danger" class="deleteButton_gly" @click="handleBatchDelete">删除</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col style="margin: 20px 0;">
        <m-table
          size="medium"
          :isSelection="true"
          :isIndex="true"
          :isPagination="true"
          :isHandle="false" 
          :state="0"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @select="handleSelectionChange"
          @selection-change="handleSelectionChange"
          :tableData="tableData"
          :tableCols="tableCols"
          :pagination="pagination"
          @cellClick="cellClick"
          :isIndexPage="true"
          v-loading="tableLoading"
          :default-sort="sortDate"
        ></m-table>
      </el-col>
    </el-row>
  </el-tabs>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import selectOrgOrDept from "components/select/selectOrgOrDept";
const otherData = [
  { label: "传阅时间", prop: "createTime", align: "center",width:"100"},
  { label: "立项依据", prop: "projectBase", align: "center",width:"100"},
  { label: "督办编号", prop: "doucumentNum", align: "center",width:"300" },
  { label: "事由提要", prop: "summary", align: "left",minwidth:"50%"},
  { label: "联系人", prop: "curUser", align: "center",width:"100"},
  { label: "传阅类型", prop: "documentTypeName", align: "center",width:"100"},
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
      unitName:"",
      unitId:"",
      isAll:true,
      deleteIds:"",
      bank_countersignature: {
        function: "selectByPageCY",
        startTime: "",
        endTime: "",
        unitId:"",
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount:0,
        doucumentNum:"",
        summary:""
      },
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
        searchTime: "",
      },
      tableLoading: false,
      activeName: "tabs-done",
      sortDate: [{ prot: "date", order: "descnding" }],
      isEnd: false,
      tableData: [],
      tableCols: otherData,
      pagination: {
        page: 1, //第几页
        total: 0, //共有条数
        limit: 20, //每页条数
      },
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
    this.bank_countersignature.doucumentNum = "〔"+new Date().getFullYear()+"〕";
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf:"1",
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
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
    timeChange() {
      if(this.ruleForm.searchTime[0]){
        this.bank_countersignature.startTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[0]));
        this.bank_countersignature.endTime = dateFormate.date(Date.parse(this.ruleForm.searchTime[1]));
      }
    },
    // 页面初始化加载数据
    initData(type) {
      this.bank_countersignature.unitName = this.unitName
      this.bank_countersignature.unitId = this.unitId
      sessionStorage.setItem('ZXDB',JSON.stringify(this.bank_countersignature));
      if(type == '1'){
        this.bank_countersignature.page = 1; 
        this.pagination.page = 1; 
      }
      this.$post
        .postData(
          "selectByPageCY",
          JSON.stringify(this.bank_countersignature),
          this.$businessCode.zxdb
        )
        .then(res => {
          console.log(parseInt(this.bank_countersignature.state)+1)
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
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
      this.pagination.page = this.bank_countersignature.page = 1;
      this.tableData = [];
      this.initData();
    },
    cellClick(row, column, cell, event) {
      
      const openType = row.documentType == "DXZXDB_CB" ? 'cb':'dx';
      const routeData = this.$router.resolve({
          path: "/cyDetail",
          query: {
            id: row.id,
            state:this.bank_countersignature.state,
            mainDocId: row.mainDocId,
            multiTenancyId: row.multiTenancyId,
            manager:'', 
            unitId:this.unitId,
            readFlag:row.readFlag,
            openType:openType
          }
        });
        window.open(routeData.href, "_blank");
      // this.$post
      //   .postData(
      //     "initCYCurUserDeptInfo",
      //     JSON.stringify({
      //       function: "initCYCurUserDeptInfo",
      //       curUserId: row.curUserId
      //     }),
      //     this.$businessCode.zxdb
      //   )
      //   .then(res => {
         
      //   })
    },
    resetForm(formName) {
      this.bank_countersignature.startTime='';
      this.bank_countersignature.endTime='';
      this.bank_countersignature.doucumentNum="〔"+new Date().getFullYear()+"〕";
      this.bank_countersignature.summary='';
      this.ruleForm.searchTime='';
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
          JSON.stringify({ 
            function: 'doLogicDeleteById', 
            ids: this.deleteIds,
            unitId:this.unitId,
            code:"5" }),
          this.$businessCode.zxdb).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initData()
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
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 6px !important;
}
</style>
