<template>
  <div class="dispatchparameterspage">
    <el-row>
      <el-col :span="12" class="mgn-b-10">
        <el-button type="primary" size="small" v-if="haveData" @click="handleAddData">新增参数配置方案</el-button>
      </el-col>
      <el-col :span="12" class="txtRight mgn-b-10">
        <el-button type="primary" size="small" @click="handleBatchDelete">删除</el-button>
      </el-col>
    </el-row>
    <m-table
      size="medium"
      :isSelection="true"
      :isIndex="true"
      :isPagination="true"
      :isHandle="false"
      @current-change="handleCurrentChange"
      @handleSelectionChange="handleSelectionChange"
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @cellClick="cellClick"
      v-loading="tableLoading"
      :default-sort="sortDate"
    ></m-table>

    <el-dialog 
    v-dialogDrag
    :visible.sync="dialogVisible" :modal-append-to-body="false" title="收文参数配置">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo_ruleForm"
      >
        <div style="height:500px;">
          <el-scrollbar style="height:100%;">
          <el-col>
            <h3 class="titleGroup">文件要素配置</h3>
          </el-col>
          <el-col>
            <el-form-item label="上午上班时间" prop="amWorkingTime">
              <el-time-picker
                v-model="ruleForm.amWorkingTime"
                @change="changeTime('swsb')"
                placeholder="任意时间点">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col>
          <el-form-item label="上午下班时间" prop="amAfterTime">
              <el-time-picker
                v-model="ruleForm.amAfterTime"
                @change="changeTime('swxb')"
                placeholder="任意时间点">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="下午上班时间" prop="pmWorkingTime">
              <el-time-picker
                v-model="ruleForm.pmWorkingTime"
                @change="changeTime('xwsb')"
                placeholder="任意时间点">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="下午下班时间" prop="pmAfterTime">
              <el-time-picker
                v-model="ruleForm.pmAfterTime"
                @change="changeTime('xwxb')"
                placeholder="任意时间点">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="工作时长" prop="durationTime">
              <el-input v-model="ruleForm.durationTime" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="禁用" prop="hitFlag">
              <el-radio v-model="ruleForm.isUse" :label="1" class="alternative">是</el-radio>
              <el-radio v-model="ruleForm.isUse" :label="0" class="alternative">否</el-radio>
            </el-form-item>
          </el-col>
        </el-scrollbar>
      </div>
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
import dateFormate from "@/util/filters.js";

const tableCol = [
  { label: "机构名称", prop: "unitName", align: "center" },
  { label: "上午上班时间", prop: "amWorkingTime", align: "center" },
  { label: "上午下班时间", prop: "amAfterTime", align: "center" },
  { label: "下午上班时间", prop: "pmWorkingTime", align: "center" },
  { label: "下午下班时间", prop: "pmAfterTime", align: "center" },
  { label: "工作时间", prop: "durationTime", align: "center" },
  { label: "是否启用", prop: "isUse", align: "center",
  formatter(row){
    return row.isUse == '1' ? '是':'否'
  }
  },
];

export default {
  name: 'Fwcspz',
  components: { mTable },
  data () {
    return {
      dialogVisible: false,
      dspcPrmShow: false,
      tableData: [],
      tableCols: tableCol,
      deleteIds: '',
      tableLoading: false,
      sortDate: [{ prot: "date", order: "descnding" }],
      pagination: {
        pageNum: 1,
        totalCount: 10,
        limit: 10
      },
      referForm: {
        function: 'selectWTByPage',
        page: 1, //当前页数
        limit: 10, //每页条数
        totalCount:0
      },
      ruleForm: {
        unitId: '',
        unitName: '',
        amWorkingTime: '',
        amAfterTime: '',  
        pmWorkingTime: '',  
        pmAfterTime: '',
        durationTime: '',
        isUse: '',  
      },
      // 强制性要求
      rules: {
      //   orgName: [
      //     { required: true, message: '请输入机构名称', trigger: 'blur' }
      //   ]
       },
      haveData: true
    }
  },
  methods: {
    handleLoadData () {
      this.$post
        .postData('selectWTByPage', JSON.stringify(this.referForm), this.$businessCode.zxdb)
        .then(res => {
          this.tableData = res.data.rows;
          if (this.tableData.length >=1) {
            this.haveData = false
          } else {
            this.haveData = true
          }
          this.pagination.total = res.data.total;
        })
    },
    changeTime(){
      if(new Date(this.ruleForm.amAfterTime)
        >new Date(this.ruleForm.pmWorkingTime)
        ){
          this.$message({
            type: "error",
            offset: 400,
            showClose: true,
            message: "上午下班时间不得大于下午上班时间",
            duration: 1000
          });
          this.ruleForm.pmWorkingTime = ''
        }
    },
    handleOnSizeChange (val) {
      this.pageSize = val;
    },
    handleCurrentChange(val){
      this.pagination.pageNum = val;
    },
    handleAddData () {
      this.dialogVisible = true;
    },
    handleSaveQX(){
      this.dialogVisible = false;
    },
    handleSave(){
      this.ruleForm.amWorkingTime = dateFormate.date(Date.parse(this.ruleForm.amWorkingTime),'HH:mm:ss')
      this.ruleForm.amAfterTime = dateFormate.date(Date.parse(this.ruleForm.amAfterTime),'HH:mm:ss')
      this.ruleForm.pmWorkingTime = dateFormate.date(Date.parse(this.ruleForm.pmWorkingTime),'HH:mm:ss')
      this.ruleForm.pmAfterTime = dateFormate.date(Date.parse(this.ruleForm.pmAfterTime),'HH:mm:ss')
      this.ruleForm = Object.assign(this.ruleForm,{function:'doWTSaveOrUpdate'})
      this.$post
        .postData('doWTSaveOrUpdate', JSON.stringify(this.ruleForm), this.$businessCode.zxdb)
        .then(res => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.dialogVisible = false;
          this.handleLoadData()
        })
    },
    cellClick(row, column, cell, event) {
      this.dialogVisible = true 
      this.$post.postData('selectWTById', JSON.stringify({ function: 'selectWTById', id: row.id }),  this.$businessCode.zxdb).then((res) => {
        this.ruleForm = res.data;
      })
    },
    handleSelectionChange (val) {
      let idsArr = []
      for (var i = 0; i < val.length; i++) { 
        idsArr.push(val[i].id)
      }
      console.log(idsArr)
      this.deleteIds = idsArr.join(',')
      console.log(this.deleteIds)
    },
    handleBatchDelete () {
      this.$post.postData('doDelWHById', JSON.stringify({ function: 'doDelWHById', id: this.deleteIds }),  this.$businessCode.zxdb).then((res) => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.handleLoadData();
      })
    }
  },
  created () {
    this.handleLoadData();
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
</style>
