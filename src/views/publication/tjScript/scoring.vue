<template>

  <div class="searchForm">
    <el-form ref="refForm" :model="formData" label-width="160px">
      <!-- <search-form ref="searchForm" :formData="formData" :formCfg="formCfg" @reset="reset" @event="btnevent" @submit="submit"> -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="稿件状态">
            <el-checkbox-group v-model="formData.pubStates" @change="change">
              <!-- <el-checkbox label="未采用"></el-checkbox>
              <el-checkbox label="备选"></el-checkbox>
              <el-checkbox label="已采用"></el-checkbox> -->
              <el-checkbox label="1">未采用</el-checkbox>
              <el-checkbox label="3">备选</el-checkbox>
              <el-checkbox label="2">已采用</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div style="float:left">
            <el-form-item label="来稿单位">
              <el-input v-model="formData.editUnit" readonly="readonly" style="width:640px;margin-right:20px"></el-input>
              <el-button @click="selectUnit" type="primary" size="medium">选择</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收稿日期">
            <el-date-picker v-model="formData.receivedDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="编辑日期">
            <el-date-picker v-model="formData.editDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" v-show="publishDate">
          <el-form-item label="发布日期">
            <el-date-picker v-model="formData.publishDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="24">
          <div style="float:left">
            <el-form-item label="行名">
              <el-input class="left" v-model="formData.drafOrgNm" style="width:640px;margin-right:20px"></el-input>
              <el-button class="right" @click="add" type="primary" size="medium">添加</el-button>
            </el-form-item>
          </div>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="最新评分">
            <el-radio-group v-model="formData.startSatus">
              <el-radio label="大于"></el-radio>
              <el-radio label="小于"></el-radio>
              <el-radio label="等于"></el-radio>
            </el-radio-group>
            <el-input v-model="formData.startRate" onkeyup="value=value.replace(/[^\-\d\*\ ]/g, '')"></el-input>
            <el-radio-group v-model="formData.endSatus">
              <el-radio label="大于"></el-radio>
              <el-radio label="小于"></el-radio>
              <el-radio label="等于"></el-radio>
            </el-radio-group>
            <el-input v-model="formData.endRate" onkeyup="value=value.replace(/[^\-\d\*\ ]/g, '')"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div style="width:100%;text-align:center;margin-bottom:20px">
            <el-button type="primary" @click="submit">开始查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- </search-form> -->
    </el-form>
    <el-row>
      <el-col :span="4" style="position: relative;left:0px;top:-10px;">
        <el-button type="primary" @click="exportData">查询结果展示</el-button>
      </el-col>
    </el-row>
    <m-table @refresh="loadData" :searchData="formData" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection='true'></m-table>
    <!--    选择树-->

    <org-tree v-model="showOrgTree" :title="title" :isSingle="isSingle" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @orgList="getOrgList">
    </org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
// import searchForm from 'components/form/searchForm'
import mTable from 'components/table/tTable'
import orgTree from 'components/tree/orgTree'
import exportTable from '../../../minixs/exportTable'
export default {
  name: 'rate',
  components: {
    // searchForm,
    mTable,
    orgTree,
  },
  props: {},
  data() {
    return {
      title: '选择来稿单位',
      showOrgTree: false,
      isSingle: true,
      orgOrDept: 1,
      orgOrDeptId: '1',
      publishDate: false, //发布日期
      //   searchData: {},
      //   formCfg: [
      //     {
      //       type: 'radios',
      //       prop: 'type',
      //       label: '稿件状态',
      //       options: { 1: '未采用', 2: '备选', 3: '已采用' },
      //     },
      //     {
      //       type: 'select',
      //       placeholder: '中国建设银行',
      //       style: { width: '100%' },
      //       prop: 'contactName',
      //       label: '撰稿人单位',
      //       span: 15,
      //     },

      //     [
      //       { type: 'input', prop: 'applyProjectName', span: 16, style: { width: '80%' } },
      //       { type: 'button-primary', prop: '$submit', value: '查询', style: { marginLeft: '20px' } },
      //       { type: 'formitem', label: '行名' },
      //     ],
      //     [
      //       { type: 'button-primary', prop: '$submit', value: '开始统计' },
      //       { type: 'button', prop: '$reset', value: '重置' },
      //       { type: 'formitem', style: { 'text-align': 'center', 'margin-left': '-120px' } },
      //     ],
      //   ],
      formData: {
        pubStates: [],
        // khType: '',
      },
      tableData: [],
      tableCols: [
        // { label: '全选', prop: 'applyTime' },
        { label: '来稿单位', prop: 'drafOrgNm' },
        { label: '标题', prop: 'title' },
        { label: '采用情况', prop: 'cyStaut' },
        { label: '评分人', prop: 'pfUnm' },
        { label: '评分', prop: 'grade' },
        { label: '最新评分', prop: 'grade' },
      ],
      pagination: {
        pageNum: 1, //第几页
        pageSize: 20, //每页条数
      },
    }
  },
  methods: {
    //稿件状态选择
    change(index) {
      if (index.length == 0) {
        this.publishDate = false
      }
      for (let i = 0; i < index.length; i++) {
        if (index[i] == '2') {
          this.publishDate = true
        } else {
          this.publishDate = false
        }
      }
    },
    // 添加按钮
    add() {
      this.showOrgTree = true // 显示树结构
    },
    // 重置
    reset() {
      this.formData = {}
    },
    // 开始统计
    submit() {
      console.log('开始统计')
      this.loadData()
    },
    // 获取表格数据
    loadData() {
      let arr = this.formData.pubStates
      this.formData.pubStates = this.formData.pubStates.join(',')
      this.$api.pubStatistics
        .pubStatisticsList(
          {
            queryType: '3',
            ...this.formData,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total || 0
          this.tableData = res.data
          this.formData.pubStates = arr
        })
    },
    // 点击当前行
    cellClick(row) {
      //   let rowdata = JSON.stringify(row)
      //   this.$intent.goNewPage(this, { path: '/approval/searchDetail', query: { rowdata: rowdata } })
    },
    // 选择按钮
    selectUnit() {
      this.title = '选择机构'
      this.isSingle = false
      this.orgOrDept = 1
      this.orgOrDeptId = '1'
      this.showOrgTree = true
    },
    // 选择机构按钮方法
    getOrgList(org) {
      let deptId = []
      let deptName = []
      org.map((item) => {
        deptId.push(item.id)
        deptName.push(item.unitName)
      })
      console.log(org)
      this.$set(this.formData, 'editUnit', deptName.join(','))
      this.$set(this.formData, 'drafOrgId', deptId.join(','))
    },

    // getOrgList(org) {
    //   if (this.orgOrDeptId == '0') {
    //     this.formData.manageBankId = org.id
    //     this.$refs.searchForm.setText(this.formData, 'approveUnitName', org.unitName)
    //     this.$set(this.formData, 'curbankId', org.id)
    //   } else {
    //     let deptId = []
    //     let deptName = []
    //     org.map((item) => {
    //       deptId.push(item.id)
    //       deptName.push(item.unitName)
    //     })
    //     this.$refs.searchForm.setText(this.formData, 'manageDept', deptName.join(','))
    //     this.$set(this.formData, 'draftDepartmentId', deptId.join(','))
    //   }
    // },
    // 勾选的当前行
    select() {},
    //导出
    exportData() {
      exportTable.exportExcel('稿件评分情况统计表')
    },
    // submit(params) {
    //   this.formData = params
    //   this.loadData()
    // },
    // loadData(type) {
    //   if (!type) {
    //     this.pagination.pageNum = 1
    //   }
    //   if (this.formData.dataDate) {
    //     this.formData.approveTimeStart = this.formData.dataDate[0]
    //     this.formData.approveTimeEnd = this.formData.dataDate[1]
    //   }
    //   if (this.formData.khType == '2') {
    //     this.formData.khType = ''
    //   }
    //   if (this.formData.type == '4') {
    //     this.formData.type = '1'
    //   }
    //   this.$api.checkLz
    //     .APSearchTable(
    //       {
    //         ...this.formData,
    //         ...this.searchData,
    //       },
    //       {
    //         PAGE_JUMP: this.pagination.pageNum,
    //         REC_IN_PAGE: this.pagination.pageSize,
    //       }
    //     )
    //     .then((res) => {
    //       this.pagination.total = res.total || 0
    //       this.tableData = res.list
    //     })
    // },
    // cellClick(row) {
    //     let rowdata = JSON.stringify(row)
    //     this.$intent.goNewPage(this, { path: '/approval/searchDetail', query: { rowdata: rowdata } })
    // },
    //获取机构树
    // getOrgList(org) {
    //   if (this.orgOrDeptId == '0') {
    //     this.formData.manageBankId = org.id
    //     this.$refs.searchForm.setText(this.formData, 'approveUnitName', org.unitName)
    //     this.$set(this.formData, 'curbankId', org.id)
    //   } else {
    //     let deptId = []
    //     let deptName = []
    //     org.map((item) => {
    //       deptId.push(item.id)
    //       deptName.push(item.unitName)
    //     })
    //     this.$refs.searchForm.setText(this.formData, 'manageDept', deptName.join(','))
    //     this.$set(this.formData, 'draftDepartmentId', deptId.join(','))
    //   }
    // },
    // handleClose() {
    //   this.isdialog = false
    // },
    // delecurrentCode() {
    //   this.isdialog = false
    // },
    // select() {},
    //导出
    // exportData() {
    //   exportTable.exportExcel('事务审批')
    // },
    // btnevent(params) {
    //   switch (params.prop) {
    //     case '$selectOrg':
    //       this.title = '选择机构'
    //       this.isSingle = true
    //       this.orgOrDept = 1
    //       this.orgOrDeptId = '0'
    //       this.showOrgTree = true
    //       break
    //     case '$selectDepar':
    //       if (!this.formData.curbankId) {
    //         this.$message({
    //           message: '请先选择机构',
    //           type: 'success',
    //         })
    //         return
    //       }
    //       this.title = '部门'
    //       this.isSingle = false
    //       this.orgOrDept = 0
    //       this.orgOrDeptId = this.formData.curbankId
    //       this.showOrgTree = true
    //       break
    //     case '$selectDoOrg':
    //       this.isdialog = true
    //       break
    //   }
    // },
  },
  //   created() {
  //     this.loadData()
  //   },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.left {
  margin-left: 20px;
}
.right {
  margin-right: 20px;
  float: right;
}
</style>
