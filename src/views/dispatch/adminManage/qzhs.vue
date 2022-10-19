<template>
  <div class="dispatchparameterspage">
    <el-row>
      <!-- <el-col>
        <el-select v-model="valueYear" placeholder="全部">
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
              <el-form-item label="收回日期">
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
                <el-select v-model="bank_qzsh.curNodeCode">
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
            :isSelection="true"
            :isIndex="true"
            :tableData="tableData"
            :tableCols="tableCols"
            @cellClick="cellClick"
            :isPagination="true"
            :pagination="pagination"
            :isIndexPage="true"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
            @handleSelectionChange="handleSelectionChange"
            @selectAll="handleSelectionChange"
            v-loading="tableLoading"
          ></mTable>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import dateFormate from "@/util/filters.js";
import searchForm from "components/form/searchForm";
import selectOrgOrDept from "components/select/selectOrgOrDept";
import dispatchFileQuery from "@/minixs/dispatchFileQuery"

export default {
  name: "fwglqzhs",
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

       options: [{
          value: '',
          label: '全部'
        }, {
          value: '选项1',
          label: '2020'
        }, {
          value: '选项2',
          label: '2019'
        }, {
          value: '选项3',
          label: '2018'
        }, {
          value: '选项4',
          label: '2017'
        }, {
          value: '选项5',
          label: '2016'
        }],
        valueYear: '',
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
     ruleForm: {
        statrTime:'',
        endTime:'',
        name: '',
        unitName: "",
        unitId: "",
        region: '',
        documentNo: '',
        date1: '',
        date2: '',
        delivery: false,
        type: "",
        resource: '',
        resource1: '',
        desc: ''
      },
      tableLoading:false,
      activeName: "tabs-all",
      sortDate:[{ prot: 'date', order: 'descnding'}],
      isEnd:false,
      tableData: [],
      bank_qzsh: {
        function: 'getWithdrawOrderInfoPageByParam',
        startTime: '',
        endTime: '',
        documentNo: '',
        title: '',
        curNodeCode: ''
      },
      tableCols: [
        { label: "收回时间", prop: "withdrawTime", align: "center", width: "110px" },
        { label: "发文字号", prop: "documentNo", align: "left", width: "220px" },
        { label: "标题", prop: "title", align: "left",minwidth:"40%" },
        { label: "收回单位", prop: "withdrawUnit", align: "center", width: "120px" },
        { label: "拟稿部门", prop: "draftDepartment", align: "center", width: "120px" },
        { label: "拟稿人 ", prop: "draftUser", align: "center", width: "100px"  },
        { label: "被收回单位 ", prop: "recycledUnit", align: "center", width: "120px" }
      ],
      pagination: {
        page: 1, //第几页
        total: 10, //共有条数
        limit: 20 //每页条数
      },
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
      if (this.ruleForm.endTime) {
        this.bank_qzsh.startTime = dateFormate.date(Date.parse(this.ruleForm.endTime[0]))
        this.bank_qzsh.endTime = dateFormate.date(Date.parse(this.ruleForm.endTime[1]))
      }else {
        this.bank_qzsh.startTime = ''
        this.bank_qzsh.endTime = ''
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
      this.ruleForm.unitId = this.unitId;
      if(val=="a") {
        this.pagination.page = 1;
      }
      console.log("****", this.ruleForm);
      sessionStorage.setItem('FWLIST',JSON.stringify(this.pagination));
      this.$post.postData("getWithdrawOrderInfoPageByParam", JSON.stringify(Object.assign({},this.ruleForm, this.bank_qzsh, this.pagination)), this.$businessCode.fawgl).then(res => {
        console.log(res.data)
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
      const routeData = this.$router.resolve({
        path: '/qzshBankCopy',
        query: {
          id: row.id,
          unitId: this.unitId,
          choseYear: this.$route.query.choseYear
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm() {
      this.bank_qzsh.title = this.ruleForm.title
      this.bank_qzsh.documentNo = this.ruleForm.documentNo
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
      this.ruleForm.endTime = '';
      this.bank_qzsh.title = ''
      this.bank_qzsh.startTime = ''
      this.bank_qzsh.endTime = ''
      this.bank_qzsh.curNodeCode = ''
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
            this.$post.postData('doDeleteWithdrawOrderRecycle', JSON.stringify({ function: 'doDeleteWithdrawOrderRecycle', ids: this.deleteIds, unitId: this.unitId }), this.$businessCode.fawgl).then((res) => {
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
      this.ruleForm.documentNo = this.bank_qzsh.documentNo = '〔'+ openTimeYear +'〕'
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
.arrowup{
  padding-left: 20px;
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
