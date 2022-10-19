<!--
 * @Author: wy
 * @Date: 2020-07-20 10:09:00
 * @LastEditTime: 2021-02-26 18:06:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ccboa\src\views\dashboard\personal-office\daily-work\workCommunicate\components\inquire.vue
--> 
<template>
  <div class="inquire">
    <!-- <div>
      <el-button type="primary" @click="inquire()">开始查询</el-button>
      <el-button type="primary" @click="reset()">重写</el-button>
    </div> -->
    <div class="selectDep">
      <!-- <h4 class="title">工作交流查询</h4> -->
      <search-form
        :formData="formData"
        @reset="reset"
        @submit="submit"
        @event="btnEvent"
        class="mt20"
        :formCfg="formCfg">
        <el-col :span="8">
          <el-form-item label="拟稿日期">
            <el-date-picker
              v-model="formData.dataDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              style="width:100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
      </search-form>
    </div>
    <div style="margin-bottom: 15px;">
      <el-button type="primary" @click="exportData()">导出</el-button>
    </div>
    <div class="list">
      <m-table
        ref="orgTable"
        size="medium"
        @refresh="loadData()"
        :searchData="searchData"
        :isPagination="true"
        :isHandle="false"
        :pagination="pagination"
        :isSelection="true"
        :tableData="tableData"
        :tableCols="tableCols"
        @cellClick="cellClick"
      ></m-table>
    </div>
  </div>
</template>

<script>
import searchForm from "@/components/form/searchForm"
import mTable from 'components/table/tTable'
import exportTable from "@/minixs/exportTable"
// import mForm from 'components/form/mForm'
export default {
  name: 'inquire',
  components: {
    // mForm,
    searchForm,
    mTable
  },
  props: {},
  data () {
    return {
      searchData: {sort:'',sortKey:''},
      formData: {},
      tableData: [],
      tableCols: [
        { label: '起草日期', prop: 'createDate' },
        { label: '拟稿人', prop: 'draftUserName' },
        { label: '标题', prop: 'title' },
        { label: '接收人', prop: 'receivePersonName'}
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20
      },
      formCfg: [
          {type: 'input', label: '拟稿人', prop: 'draftUserName', span: 20},
          {
              type: 'select', label: '行名', prop: 'bankId', span: 10,
              // options:bankOptions1.join(",")
          },
          {type: 'input', prop: 'draftOr', span: 10},
          {
              type: 'select', label: '主办部门', prop: 'deptId', span: 10,
              // options:bankOptions2.join(",")
          },
          {type: 'input', prop: 'draftOrgan', span: 10},
          // {type: 'input', label: '标题', prop: 'title', span: 20},
          [
              {type: 'button-primary', prop: '$submit', value: '开始查询'},
              {type: 'button', prop: '$reset', value: '重置'},
              {type: 'formitem', style: {'text-align': 'center'}}
          ],
      ],
      serverconfig: {
          labelWidth: '140px'
      },
      bankOptions1: [],
      bankOptions1s: [],
      bankOptions2: [],
      bankOptions2s: [],
      selectOPtion: {}
    }
  },
  computed: {},
  methods: {
    initDate() {
        if (this.formData.dataDate) {
            this.formData.startDate = this.formData.dataDate[0]
            this.formData.endDate = this.formData.dataDate[1]
        }
    },
    loadDataSec() {
      this.initDate()
      this.$api.adminConfig.searchColumn(
          {
              ...this.formData,
              searchData: this.searchData
          },
          {
              PAGE_JUMP: this.pagination.pageNum,
              REC_IN_PAGE: this.pagination.pageSize
          }
      ).then(res => {
          this.bankOptions2 = []
          let that = this
          res.data&&res.data.map(function (value, index) {
              that.bankOptions2.push(value.draftDepartment)
          })
          this.initData()
      })
  },
    initData() {
        this.formCfg = [
            {type: 'input', label: '拟稿人', prop: 'draftUserName', span: 20},
            {
                type: 'select', label: '行名', prop: 'bankId', span: 10,
                options: this.bankOptions1.join(",")
            },
            {type: 'input', prop: 'draftOr', span: 10},
            {
                type: 'select', label: '主办部门', prop: 'deptId', span: 10,
                options: this.bankOptions2.join(",")
            },
            {type: 'input', prop: 'draftOrgan', span: 10},
            // {type: 'input', label: '标题', prop: 'title', span: 20},
            [
                {type: 'button-primary', prop: '$submit', value: '开始查询'},
                {type: 'button', prop: '$reset', value: '重置'},
                {type: 'formitem', style: {'text-align': 'center'}}
            ],
        ]
    },
    loadData() {
        this.initDate()
        this.$api.dailyWork.inquireWorkList(
            {
                // type:'',
                ...this.formData,
                searchData:this.searchData
            },
            {
                PAGE_JUMP: this.pagination.pageNum,
                REC_IN_PAGE: this.pagination.pageSize
            }
        ).then(res => {
            this.pagination.total = res.total;
            this.tableData = res.data;
            if (res.data.length === 0) {
                this.$message({
                  message: '未查到符合条件的记录！',
                  type: 'warning'
              });
            }
        })
    },
    optionsData() {
        this.initDate()
        this.$api.adminConfig.searchColumn(
            {
                type:'options',
                searchData: this.searchData,
                ...this.formData
            },
            {
                PAGE_JUMP: this.pagination.pageNum,
                REC_IN_PAGE: this.pagination.pageSize
            }
        ).then(res => {
          console.log(res,'res');
          
            this.bankOptions1.push(res.data.one.draftOrganid)
            this.bankOptions1s = res.data.one
            this.bankOptions2s = res.data.two
            // this.formData.bankId = res.data.one.draftId
            this.bankOptions2 = []
            let that = this
            res.data.two&&res.data.two.map(function (value, index) {
                that.bankOptions2.push(value.draftDepartment)
            })
            this.initData()
            
        })
    },
    cellClick(row){
      // row.isSave = '0'
      this.$router.push({
        path: '/dashboard/personalOffice/dailyWork/workCommunicate/workCommviewDetail',
        query: {
          row
        }
      })
    },
    //开始查询
    submit(params) {
      console.log(params,'params'); 
        this.formData = params
        console.log(this.formData.draftUserName,'draftUserName');
        
        this.bankOptions2s.forEach(element => {
          if (this.formData.deptId === element.draftDepartment) {
            this.formData.deptId = element.draftDepartmentId
          }
        });
        this.formData.bankId = this.bankOptions1s.draftId
        this.formData.sort = ""
        this.formData.sortKey = ""
        this.loadData()
    },
    //重写
    reset () {
      this.formData = {}
    },
    btnEvent(params){
      this.formData = params.row
    },
    //导出
    exportData(){
        exportTable.exportExcel("工作交流查询结果");
    },
  },
  activated () {
  },
  created () {
    this.optionsData()
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.inquire {
  .selectDep {
    /* padding: 40px 30px 30px 100px;
    .title {
      margin-bottom: 20px;
      font-size: 16px;
      line-height: 50px;
      color: #3b85f0;
    } */
    color: #3b85f0;
  }
}
</style>