<template>
  <div class="searchForm">
    <!-- <search-form ref="searchForm" :formData="formData" :formCfg="formCfg" @reset="reset" @submit="submit"> -->
    <el-form :model="formData" label-width="160px">

      <el-row>
        <el-col :span="13">
          <el-form-item label="发布日期">
            <el-date-picker v-model="formData.publishDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" style="width:100%" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </el-col>
        <el-col :span="11" style="text-align:left;" v-if="!show">
          <el-col class="arrowup">
            <el-button type="primary" @click="submit">开始查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
            <el-button type="info" size="small" @click="show=!show">
              <i class="el-icon-arrow-down el-icon--left"></i> 展开
            </el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-row v-if="show" style="margin-top:20px">
        <el-col :span="24">
          <el-form-item label="日期查询类型">
            <el-radio-group v-model="formData.queryDateType">
              <el-radio label="1">按收稿日期</el-radio>
              <el-radio label="2">按编辑日期</el-radio>
              <el-radio label="3">按发布日期</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="刊物期数">
            <span style="margin-right:20px;">第</span>
            <el-input onkeyup="value=value.replace(/[^\d\*\ ]/g, '')" style="display: inline;" prop="issue" v-model="formData.issue"></el-input>
            <span style="margin-left:20px;">期</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="刊物总期数">
            <span style="margin-right:20px;">第</span>
            <el-input onkeyup="value=value.replace(/[^\d\*\ ]/g, '')" style="display: inline;" prop="issue" v-model="formData.totalIssue"></el-input>
            <span style="margin-left:20px;">期</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="标题">
            <el-input style="display: inline;" prop="issue" v-model="formData.title"></el-input>
            <span style="margin-left:20px;color:red">*注：多个关键字之间用空格符号间隔</span>
            <el-radio-group v-model="formData.titleType" style="display: block;margin-top:10px">
              <el-radio label="4">与</el-radio>
              <el-radio label="5">或</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="正文内容">
            <el-input style="display: inline;" prop="issue" v-model="formData.content"></el-input>
            <span style="margin-left:20px;color:red">*注：多个关键字之间用空格符号间隔</span>
            <el-radio-group v-model="formData.contentType" style="display: block;margin-top:10px">
              <el-radio label="6">与</el-radio>
              <el-radio label="7">或</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col class="down" v-if="show" style="text-align:center;margin:10px">

          <el-button type="primary" @click="submit">开始查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
          <el-button type="info" size="small" @click="show=!show">
            <i class="el-icon-arrow-up el-icon--left"></i> 收起
          </el-button>
        </el-col>
      </el-row>

    </el-form>
    <!-- </search-form> -->
    <m-table :pageSizeList='[20,30,50,100,200,500]' @refresh="loadData" :searchData="formData" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection='true'></m-table>
  </div>
</template>

<script type="text/ecmascript-6">
// import searchForm from 'components/form/searchForm'
import mTable from 'components/table/tTable'
import exportTable from '../../../minixs/exportTable'
import dateFormate from '@/util/filters.js'
export default {
  name: 'entryQuery',
  components: {
    // searchForm,
    mTable,
  },
  data() {
    return {
      show: false,
      searchData: {},
      formCfg: [
        {
          type: 'radios',
          prop: 'queryDateType',
          label: '日期查询类型',
          options: { 1: '按收稿日期', 2: '按编辑日期', 3: '按发布日期' },
        },
        [
          [
            { type: 'span', prop: '', span: 8, style: { width: '100%' }, value: '第' },
            {
              type: 'input',
              prop: 'issue',
              span: 8,
              style: { width: '68%' },
            },
            { type: 'span', prop: '', span: 8, style: { width: '100%' }, value: '期' },
          ],
          { type: 'formitem', label: '刊物期数' },
        ],
        [
          [
            { type: 'span', prop: '', value: '第' },
            { type: 'input', prop: 'totalIssue', span: 8, style: { width: '68%' } },
            { type: 'span', prop: '', value: '期' },
          ],
          { type: 'formitem', label: '刊物总期数' },
        ],
        [
          { type: 'input', prop: 'title', style: { width: '70%' } },
          { type: 'span', value: '*注：多个关键字之间用空格符号间隔', style: { color: 'red' } },
          { type: 'formitem', label: '标题' },
        ],
        {
          type: 'radios',
          prop: 'titleType',
          options: { 4: '与', 5: '或' },
        },
        [
          { type: 'input', prop: 'content', style: { width: '70%' } },
          { type: 'span', value: '*注：多个关键字之间用空格符号间隔', style: { color: 'red' } },
          { type: 'formitem', label: '正文内容' },
        ],
        {
          type: 'radios',
          prop: 'contentType',
          options: { 6: '与', 7: '或' },
        },
        [
          { type: 'button-primary', prop: '$submit', value: '开始统计' },
          { type: 'button', prop: '$reset', value: '重置' },
          { type: 'formitem', style: { 'text-align': 'center', 'margin-left': '-120px' } },
        ],
      ],
      formData: {}, // 表单的值
      tableData: [], // 表格数据
      // 表格头部
      tableCols: [
        {
          label: '发布日期',
          prop: 'pubTime',
          formatter(row) {
            return row.pubTime == '' || row.pubTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.pubTime)))
          },
        },
        { label: '标题', prop: 'title' },
        { label: '刊物名称', prop: 'journalTypeName' },
        { label: '刊物编号', prop: 'totalIssue' },
      ],
      // 分页
      pagination: {
        pageNum: 1, //第几页
        pageSize: 20, //每页条数
      },
    }
  },
  methods: {
    // 重置
    reset() {
      this.formData = {}
    },
    // 开始统计
    submit() {
      this.loadData()
    },
    // 获取列表数据
    loadData() {
      this.$api.pubStatistics
        .getTableList(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    //导出
    exportData() {
      exportTable.exportExcel('录用条目查询统计表')
    },
  },
  created() {
    this.loadData()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.el-input--small /deep/ .el-input__inner {
  width: 50%;
}
</style>
