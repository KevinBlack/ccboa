<template>
  <div class="searchForm">
    <el-form ref="refForm" :model="formData" label-width="160px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="收稿日期">
            <el-date-picker v-model="formData.receivedDate" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="编辑日期">
            <el-date-picker v-model="formData.editDate" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发布日期">
            <el-date-picker v-model="formData.publishDate" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="行别">
            <el-radio-group @click.native="drafOrgTpClass" v-model="formData.drafOrgTp">
              <el-radio label="总行"></el-radio>
              <el-radio label="分行"></el-radio>
              <el-radio label="全部"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div style="float:left" v-if="isShowFormItem">
            <el-form-item label="行名">
              <el-input v-model="formData.drafOrgNm" readonly="readonly" style="width:640px;margin-right:20px"></el-input>
              <el-button @click="add" type="primary" size="medium">添加</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div style="width:100%;text-align:center;margin-bottom:20px">
            <el-button type="primary" @click="submit">开始统计</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="4" style="float:right;margin-right: 20px;">
        <el-button style="float:right;margin: 10px;" type="primary" @click="exportData">导出本页统计结果</el-button>
      </el-col>
    </el-row>
    <m-table @refresh="loadData" :searchData="formData" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection='true'></m-table>
    <!--选择树-->
    <org-tree v-model="showOrgTree" :title="title" :isSingle="isSingle" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @orgList="getOrgList">
    </org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/tTable'
import orgTree from 'components/tree/orgTree'
import exportTable from '../../../minixs/exportTable'
export default {
  name: 'rate',
  components: {
    mTable,
    orgTree,
  },
  data() {
    return {
      isShowFormItem: Boolean, // 是否显示行名
      //
      title: '选择部门',
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: '1',
      // 表单的值
      formData: {
        drafOrgTp: '分行',
        type: '',
      },
      // 表格数据
      tableData: [],
      // 表头
      tableCols: [
        { label: '单位名称', prop: 'drafOrgNm' },
        { label: '投稿数', prop: 'tgCount' },
        { label: '采用数', prop: 'cycount' },
        { label: '采用率', prop: 'zhanBi' },
      ],
      // 分页
      pagination: {
        pageNum: 1, // 第几页
        pageSize: 20, // 每页条数
      },
    }
  },
  watch: {
    // 监听行别
    'formData.drafOrgTp': {
      handler(val) {
        if (val === '全部') {
          this.isShowFormItem = false // 隐藏行名
        } else {
          this.isShowFormItem = true // 显示行名
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 选择行别
    drafOrgTpClass() {
      this.formData.drafOrgNm = ''
    },
    // 添加按钮
    add() {
      switch (this.formData.drafOrgTp) {
        case '分行':
          this.title = '选择机构'
          this.isSingle = false
          this.orgOrDept = 1
          this.orgOrDeptId = '1'
          this.showOrgTree = true
          break
        case '总行':
          this.title = '选择部门'
          this.isSingle = false
          this.orgOrDept = 0
          this.orgOrDeptId = 'U010000'
          this.showOrgTree = true
          break
        default:
          break
      }
    },
    // 重置
    reset() {
      this.formData = {}
    },
    // 开始统计
    submit() {
      this.loadData()
    },
    // 获取表格数据
    loadData() {
      switch (this.formData.drafOrgTp) {
        case '分行':
          this.formData.type = '2'
          break
        case '总行':
          this.formData.type = '1'
          break
        default:
          break
      }
      this.$api.pubStatistics
        .pubStatisticsList(
          {
            queryType: '2',
            ...this.formData,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          console.log(res, '获取表格数据')
          this.pagination.total = res.total || 0
          this.tableData = res.data
        })
    },
    //获取机构树
    getOrgList(org) {
      let deptId = []
      let deptName = []
      org.map((item) => {
        deptId.push(item.id)
        deptName.push(item.unitName)
      })
      this.$set(this.formData, 'drafOrgNm', deptName.join(','))
      this.$set(this.formData, 'drafOrgId', deptId.join(','))
    },
    //导出
    exportData() {
      exportTable.exportExcel('用稿率情况统计表')
    },
  },
  created() {
    this.loadData() // 调用表格数据接口
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
