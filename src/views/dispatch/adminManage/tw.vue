<template>
  <div class="dispatchparameterspage">
    <el-row>
      <!-- <el-col>
            <el-select v-model="valueYear" placeholder="全部" @change="getTablesData">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
      </el-col> -->
      <el-col>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm mt20"
            :class="{mtdown:down}">
            <el-row>
              <el-col :span="8">
                <el-form-item label="机构名称">
                  <div class="dispatchcswhlshwh">
                    <select-org-or-dept @select="selectOrg" :disabled="!isGly">
                      <el-input
                        type="text"
                        readonly="readonly"
                        placeholder="请选择"
                        v-model="unitName"
                        suffix-icon="el-icon-arrow-down"
                      />
                    </select-org-or-dept>
                  </div>
                </el-form-item>
              </el-col>
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
                <el-form-item label="退文日期">
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
                    ></el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发文字号" prop="documentNo">
                  <el-input v-model="ruleForm.documentNo"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item label="流程状态">
                  <el-select v-model="bank_tw.curNodeCode">
                    <el-option value="-1" label="流转中"></el-option>
                    <el-option value="800" label="已办结"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
              <el-col style="text-align: center;margin-bottom: 10px;" :span="24">
                <el-button type="primary" @click="submitForm">搜索</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
                <el-button type="danger" style="float:right" @click="handleBatchDelete">删除</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      <el-col style="margin: 10px 0;">
        <mTable
          :isIndex="true"
          :isSelection="true"
          :isPagination="true"
          :tableData="tableData"
          :tableCols="tableCols"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          @handleSelectionChange="handleSelectionChange"
          @selectAll="handleSelectionChange"
          :pagination="pagination"
          :isIndexPage="true"
          @cellClick="cellClick"
        ></mTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue"
import dateFormate from "@/util/filters.js";
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";

export default {
  name: "fwgltw",
  components: {
    mTable,
    selectOrgOrDept
  },
  data() {
    return {
      isGly:false,
      deleteIds: '',
      searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份

      ruleForm: {
        documentNo: "", //发文字号
        hostDepartment: "", //主办部门
        title: "", //标题
        startTime: "",
        endTime: "",
        name: "",
        unitName: "",
        unitId: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: "", //发文类型
        resource: "",
        resource1: "",
        desc: ""
      },
      dialogFormVisible:false,
      tableLoading:false,
      options: [
        {
          label: '2018',
          value: '2018'
        },
        {
          label: '2019',
          value: '2019'
        },
        {
          label: '2020',
          value: '2020'
        }
      ],
      sortDate:[{ prot: 'date', order: 'descnding'}],
      bank_tw: {
        function: 'getAllBackOrderList',
        startTime: '',
        endTime: '',
        documentNo: '',
        title: '',
        curNodeCode: ''
      },
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
      tableData: [],
      tableCols: [
        // { label: "退文时间", prop: "backTime", align: "center", sort: "true", width: "110px" },
        { label: "退文时间", prop: "backTime", align: "center", width: "110px" },
        { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
        { label: "标题", prop: "title", align: "left",minwidth:"40%" },
        { label: "退文环节", prop: "backNode", align: "center", width: "120px" },
        { label: "退文单位", prop: "backDepartment", align: "center", width: "120px" },
        { label: "退文人", prop: "backPeople", align: "center", width: "100px" },
        { label: "拟稿人", prop: "draftUser", align: "center", width: "100px" }
      ],
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
      valueYear: '',
      yearList:[]
    };
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
      if(this.ruleForm.endTime){
        this.bank_tw.startTime = dateFormate.date(Date.parse(this.ruleForm.endTime[0]))
        this.bank_tw.endTime = dateFormate.date(Date.parse(this.ruleForm.endTime[1]))
      } else {
        this.bank_tw.startTime = ''
        this.bank_tw.endTime = ''
      }
    },
    // 页面初始化加载数据
    handleLoadData(val) {
      this.$router.push({
        query: {
          choseYear: this.ruleForm.choseYear
        }
      })
      this.ruleForm.unitName = this.unitName
      this.ruleForm.unitId = this.unitId
      if(val=="a") {
        this.pagination.page = 1;
      }
      console.log("****", this.ruleForm);
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      this.$post.postData("getAllBackOrderList", JSON.stringify(Object.assign({},this.ruleForm, this.bank_tw, this.pagination)), this.$businessCode.fawgl).then(res => {
        this.tableData = res.data.rows
        this.pagination.total = res.data.total;
      })
    },
    // 点击切换分页按钮切换页面
    handleCurrentChange(val) {
      this.pagination.page = val
      this.tableData = []
      this.handleLoadData()
    },

    handleSizeChange(val) {
      this.pagination.limit = val
      this.tableData = []
      this.handleLoadData()
    },
    cellClick(row, column, cell, event){
      let isBackTypt = row.backTypt===1
      let routeData = this.$router.resolve({
        path: isBackTypt?'/twBankCopy':'/twdfh',
        query: {
          id: row.id, 
          unitId: this.unitId,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm() {
      this.bank_tw.title = this.ruleForm.title
      this.bank_tw.documentNo = this.ruleForm.documentNo
      this.handleLoadData('a');
    },
    resetForm(formName) {
      this.$api.setting.organization
      .getTree({
        unitClass:1,
        unitCode: "1",
      })
      .then((res) => {
        this.unitName = res.data[0].unitName||'';
        this.unitId = res.data[0].unitCode||'';
        this.tableData = [];
      })
      this.ruleForm.title = '';
      this.ruleForm.endTime = [];
      this.bank_tw.title = ''
      this.bank_tw.startTime = ''
      this.bank_tw.endTime = ''
      this.bank_tw.curNodeCode = ''
      this.ruleForm.choseYear = ''
      this.$router.push({
        query: {
          choseYear: ''
        }
      })
      this.defaultYear();
      this.tableData = [];
    },
    handleSelectionChange (val) {
      this.checkedArr = val
      const idsArr = []
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id)
      }
      this.deleteIds = idsArr.join(';')
    },
    handleBatchDelete () {
      if (!this.deleteIds) {
        this.$message({
          type: "error",
          message: "请选择要删除的字段！"
        });
        return;
      } else {
        this.$confirm("是否确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post.postData('doDeleteBackOrderRecycle', JSON.stringify({ function: 'doDeleteBackOrderRecycle', ids: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.handleLoadData('a')
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              offset: 100,
              showClose: true,
              message: "已取消删除",
              duation: 1000
            });
          });
      }
    },
    defaultYear() {
      let curDay = new Date();
      let openTimeYear = curDay.getFullYear();
      this.ruleForm.documentNo = this.bank_tw.documentNo = '〔'+ openTimeYear +'〕'
      
    },
    selectYear(val) {
      this.ruleForm.choseYear = val;
      if (val=="") {
        this.defaultYear();
      } else {
        this.ruleForm.documentNo = '〔'+ val +'〕'
      }
    }
  },
  created() {
    this.$post
      .postData(
        "selTableYear",
        JSON.stringify({
          function: "selTableYear"
        }),
        this.$businessCode.fawgl
      )
      .then(res => {
        if (res && res.success) {
          this.yearList = res.data;
        }})
    if(sessionStorage.getItem('FWLIST')){
      this.pagination = Object.assign(this.pagination,JSON.parse(sessionStorage.getItem('FWLIST')))
    }
    this.isGly = isGlyId();
    this.defaultYear();
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
      seletSelf: "1"
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
      this.handleLoadData();
    })
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
.mt20{
  padding: 10px 20px 0 0 !important;
  position: relative;
  border: 1px solid #f0f0f0;
  margin: 0 !important;
}
.mtdown{
  padding:20px 0 80px 0;
}
.center{
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  display: block;
}
.down{
  position: absolute;
  bottom:0px;
  font-size:12px;
  text-align:center;
}
.el-dialog__body{
   border: 0.1px solid #fff;
}
.arrowup{
  padding-left: 20px;
}
.d-body{
  padding: 40px;
  height: 300px;
  width: 800px;
  margin-top: 20px;
  margin-left: 60px;
  border: 1px solid #ccc;
}
.d-body el-form-item{
  margin: 0;
}
.f-box{
  margin-top: 10px;
  margin-left: 65px;
  min-height: 100px;
  padding-left:12px;
  width: 600px;
  border:1px #ccc solid;
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
</style>
