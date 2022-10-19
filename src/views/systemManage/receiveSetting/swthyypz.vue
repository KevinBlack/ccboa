<template>
  <div class="dispatchparameterspage" style="min-height:500px;">
    <el-form class="mt20" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="机构名称">
            <select-org-or-dept @select="selectOrg">
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
        <el-button type="primary" size="small" style="margin-left: 50px;" @click="handleLoadData()">查询</el-button>
        <el-button type="primary" size="small" style="float: right;margin-right: 50px;" @click="handleBatchDelete">批量删除</el-button>
        <el-button type="primary" size="small" style="float: right;margin-right: 20px;" @click="handleAddData">新增参数配置方案</el-button>
      </el-row>
    </el-form>
    <m-table
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isPagination="true"
      :isHandle="false"
      @select="handleSelectionChange"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @cellClick="cellClick"
      v-loading="tableLoading"
      :default-sort="sortDate"
    ></m-table>

    <el-dialog :visible.sync="dialogVisible"
    v-dialogDrag
    :modal-append-to-body="false" title="收文退回原因配置"
    @closed="reset('ruleForm')">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo_ruleForm"
      >
        <el-row>
          <el-col>
            <el-form-item label="机构名称" prop="orgName">
              <el-input v-model="ruleForm.orgName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="退文原因" prop="backReason">
              <el-input v-model="ruleForm.backReason"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSaveQX">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mTable from "components/table/mTable.vue";
import selectOrgOrDept from "components/select/selectOrgOrDept";

const tableCol = [
  { label: "机构名称", prop: "orgName", align: "center" },
  { label: "退文原因", prop: "backReason", align: "center" }
];

export default {
  name: 'Fwcspz',
  components: { mTable,selectOrgOrDept },
  data () {
    return {
           searchData: {},
      searchDataInfo: "",
      searchDataInfoId: "",
      unitName: "",
      unitId: "",
      addDis: false, //是否可以选择机构
      identity: Boolean, //登陆人的身份 true 系统管理员或业务管理员 false 普通身份
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      tableCols: tableCol,
      deleteIds: '',
      tableLoading: false,
      sortDate: [{ prot: "date", order: "descnding" }],
      pagination: {
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount:0
      },
      referForm: {
        function: 'selectReceiveBackByPage',
        page: 1, //当前页数
        limit: 20, //每页条数
        totalCount:0,
        unitId: this.unitId,
        manager:'1',
      },
      ruleForm: {
        function: 'saveOrUpdateReceiveBack',
        orgName: '',
        backReason: '',
        id: '',
        unitId: this.unitId,
        manager:'1',
      },
      // 强制性要求
      rules: {
        orgName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        backReason:[
          { required: true, message: '请输入退文原因', trigger: 'change' }
        ]
      },
    }
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
    handleLoadData () {
      this.referForm.unitName = this.unitName
      this.referForm.unitId = this.unitId
      this.$post
        .postData('selectReceiveBackByPage', JSON.stringify(this.referForm), this.$businessCode.swgl)
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
    },
    handleOnSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange(val){
      this.pagination.pageNum = val;
    },
    handleAddData () {
      this.ruleForm.unitId =this.unitId
      this.ruleForm.orgName = this.unitName;
      // this.$post.postData('selectReceiveBackById',
      // JSON.stringify({function:"selectReceiveBackById"}),
      // this.$businessCode.swgl)
      // .then(res => {
      //   this.ruleForm.orgName = res.data.orgName;
      //   this.$forceUpdate()
      // })
      this.dialogVisible = true;
      // this.ruleForm.orgName = JSON.parse(localStorage.getItem('userInfo')).shortUnitName;
      //this.ruleForm.backReason = '';
    },
    handleSave(){
      if(this.ruleForm.backReason!=''){
        let obj = Object.assign(this.ruleForm,{
          unitId: this.unitId,
          manager:'1',
        })
        this.$post
        .postData('saveOrUpdateReceiveBack', JSON.stringify(obj), this.$businessCode.swgl)
        .then(res => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.dialogVisible = false
          this.handleLoadData()
        })
      }else{
        this.$message({
          type: 'error',
          message: '请选择退文原因!'
        })
      }

    },
    handleSaveQX(){
      this.handleLoadData();
      this.dialogVisible = false;
      this.ruleForm.orgName == '';
      this.ruleForm.backReason == '';
    },
    cellClick(row, column, cell, event) {
      this.dialogVisible = true
      this.ruleForm = row
      this.ruleForm = Object.assign(this.ruleForm, {
        function: 'saveOrUpdateReceiveBack',
      })
    },
    handleSelectionChange (val) {
      this.checkedArr = val
      const idsArr = []
      for (var i = 0; i < val.length; i++) {
        idsArr.push(val[i].id)
      }
      this.deleteIds = idsArr.join(',')
      console.log(this.deleteIds)
    },
    handleBatchDelete () {
      if(this.deleteIds === ''){
        this.$message({
          type: 'error',
          message: '请选择要删除的数据!'
        })
        return
      }
      this.$post.postData('deleteReceiveBackById', JSON.stringify({ function: 'deleteReceiveBackById', id: this.deleteIds }), this.$businessCode.swgl).then((res) => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.handleLoadData()
      })
    },
    reset(formName){
      this.ruleForm={
        function: 'saveOrUpdateReceiveBack',
        orgName: '',
        backReason: '',
        id: '',
        unitId: "",
      };
      this.$refs[formName].clearValidate();
      this.$refs[formName].resetFields();
    }
  },
  created () {
    this.$api.setting.organization
    .getTree({
      unitClass:1,
      unitCode: "1",
    })
    .then((res) => {
      this.unitName = res.data[0].unitName||'';
      this.unitId = res.data[0].unitCode||'';
        this.handleLoadData()
    })
    // this.unitName=JSON.parse(localStorage.getItem('userInfo')).shortUnitName
    // this.unitId = JSON.parse(localStorage.getItem('userInfo')).unitId

  }
}
</script>

<style lang="less" scoped>
.titleGroup {
  color: #409EFF;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
}
.mt20 {
  padding: 20px;
}
</style>
