<template>
  <div class="searchForm">
    <!--    导出查询数据   必须放于最上边(以防与下边的table的id冲突)-->
    <!-- <el-row>
      <export-excel v-show="false" :tableData="excelTableData" :tableCols="tableCols" :excelTitle="excelTitle" :startExport="startExport">
      </export-excel>
      <el-col :span="4" style="position: relative;left:0px;top:0px;">
        <el-button @click="exportSearch">导出</el-button>
      </el-col>
    </el-row> -->
    <el-form ref="ruleForm" :model="formData" label-width="120px" style="margin-bottom:20px;">
      <el-row>
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="稿件状态">
            <el-checkbox-group v-model="formData.cyStaut">
              <el-checkbox label="未采用"></el-checkbox>
              <el-checkbox label="备选"></el-checkbox>
              <el-checkbox label="已采用"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row> -->

      <el-row>
        <el-col :span="24">
          <el-form-item label="稿件状态" prop="cyStaut">
            <el-radio-group v-model="formData.cyStaut">
              <el-radio label="1">未采用</el-radio>
              <el-radio label="3">备选</el-radio>
              <el-radio label="2">已采用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div style="float:left">
            <el-form-item label="来稿单位">
              <el-input v-model="formData.editUnit" style="width:640px;margin-right:20px" :disabled="true"></el-input>
              <el-button @click="selectOrg" type="primary" size="medium">选择</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="拟稿部门" prop="submitDept">
            <el-input v-model="formData.submitDept" style="width:640px;margin-right:20px" :disabled="true"></el-input>
            <el-button @click="selectDepar" type="primary" size="medium">选择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收稿日期">
            <el-date-picker v-model="formData.publishDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" style="width:100%" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="isShowFormItem">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编辑日期">
              <el-date-picker v-model="formData.drafTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" style="width:100%" start-placeholder="开始日期" end-placeholder="结束日期" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发布日期">
              <el-date-picker v-model="formData.pubTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" style="width:100%" start-placeholder="开始日期" end-placeholder="结束日期" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="投稿栏目">
            <el-input v-model="formData.pubColumnNm"></el-input>
            <!-- <el-select v-model="formData.pubColumnNm" style="width:100%" placeholder="请选择">
              <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="8">
          <el-form-item label="撰稿人">
            <el-input v-model="formData.drafUnm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="稿件类型">
            <el-checkbox-group v-model="formData.pubType">
              <el-checkbox label="本级行"></el-checkbox>
              <el-checkbox label="下级行"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="适用下级机构" prop="pubType">
            <el-radio-group v-model="formData.pubType">
              <el-radio label="01">否</el-radio>
              <el-radio label="02">是</el-radio>
            </el-radio-group>
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
    </el-form>
    <el-row>
      <el-col :span="24" style="position: relative;left:0px;top:-10px;">
        <el-button type="primary" @click="sheetPageData">按sheet页展示</el-button>
        <el-button type="primary" @click="exportData">查询结果展示</el-button>
        <!-- <el-button type="primary" @click="exportExcel">查询结果展示exportExcel</el-button> -->

      </el-col>
    </el-row>

    <m-table @cellClick="cellClick" :pageSizeList='[20,30,50,100,200,500]' @refresh="loadData" :searchData="formData" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true"></m-table>
    <!-- 选择树 -->
    <org-tree v-model="showOrgTree" :title="title" :isSingle="isSingle" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @orgList="getOrgList"></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/tTable'
import orgTree from 'components/tree/orgTree'
import exportTable from '../../../minixs/exportTableQueryScript'
import dateFormate from '@/util/filters.js'
// import exportExcel from 'components/viewFlow/exportDataExcel'

import XLSX from 'xlsx'
export default {
  name: 'queryScript',
  components: {
    mTable,
    orgTree,
    // exportExcel,
  },
  data() {
    return {
      startExport: false, //判断是否开始导出数据
      excelTitle: '用稿查询',
      excelTableData: [],
      exportPubnmData: [],
      isShowFormItem: Boolean,
      sheetsName: [],
      sheetsNameId: [],
      //
      title: '选择机构',
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: '1',
      //
      searchData: {},
      formData: {
        editUnit: JSON.parse(localStorage.getItem('userInfo')).shortUnitName,
        editUnitId: JSON.parse(localStorage.getItem('userInfo')).unitId,
      },
      options: [],
      tbd: {},
      tableData: [],
      tableCols: [
        {
          label: '收稿日期',
          prop: 'tougaoTime',
          formatter(row) {
            return row.tougaoTime == '' || row.tougaoTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.tougaoTime)))
          },
        },
        {
          label: '编辑日期',
          prop: 'editTime',
          formatter(row) {
            return row.editTime == '' || row.editTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.editTime)))
          },
        },
        {
          label: '发布日期',
          prop: 'pubTime',
          formatter(row) {
            return row.pubTime == '' || row.pubTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.pubTime)))
          },
        },
        { label: '来稿单位', prop: 'drafOrgNm' },
        { label: '标题', prop: 'title' },
        { label: '采用情况', prop: 'cyStaut' },
        { label: '投稿栏目', prop: 'colNm' },
        { label: '撰稿人', prop: 'drafUnm' },
      ],
      pagination: {
        pageNum: 1, //第几页
        pageSize: 20, //每页条数
      },
    }
  },
  mounted() {
    this.getPubManageList() // 获取投稿栏目接口
  },
  watch: {
    // 监听稿件状态
    'formData.cyStaut': {
      handler(val) {
        console.log(val)
        if (val === '2') {
          this.isShowFormItem = true
        } else {
          this.isShowFormItem = false
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 导出查询数据
    exportSearch() {
      this.formData.drafOrgId = ''
      this.$api.pubStatistics
        .pubBrowsingList(
          { ...this.formData },
          {
            PAGE_JUMP: '',
            REC_IN_PAGE: '',
          }
        )
        .then((res) => {
          this.excelTableData = res.data
          if (res.data.length !== 0) {
            this.startExport = true
            setTimeout(() => {
              this.startExport = false
            }, 2000)
          }
        })
    },
    // 当前行
    cellClick(row) {
      console.log(row.gId)
      this.$intent.goNewPage(this, {
        name: 'laigao',
        query: { data: row.gId },
      })
    },
    // 重置
    reset() {
      this.formData = {
       
      }
      this.formData.editUnit = JSON.parse(localStorage.getItem('userInfo')).shortUnitName,
      this.formData.editUnitId = JSON.parse(localStorage.getItem('userInfo')).unitId
      this.loadData()
    },
    // 开始搜索
    submit() {
      this.loadData()
    },
    // 查询列表表格数据接口
    loadData() {
      this.formData.drafOrgId = ''
      this.$api.pubStatistics
        .pubBrowsingList(
          { ...this.formData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
          console.log(res.data)
          //生成sheet页面的sheetNames
          let name = [],
            id = []

          res.data.forEach((item) => {
            name.push(item.drafOrgNm)
            id.push(item.drafOrgId)
          })
          this.sheetsName = Array.from(new Set(name))
          this.sheetsNameId = Array.from(new Set(id))
          //
        })
    },
    //导出
    exportData() {
      if (this.tableData.length !== 0) {
        exportTable.exportExcel('用稿查询统计表')
      } else {
        this.$message({
          type: 'success',
          message: '暂无数据',
        })
      }
    },
    // 按sheet页展示
    sheetPageData() {
      if (this.tableData.length !== 0) {
        exportTable.exportExcelSheet(
          '用稿查询统计表',
          this.sheetsName,
          this.sheetsNameId,
          this.tableData
        )
      } else {
        this.$message({
          type: 'success',
          message: '暂无数据',
        })
      }
    },
    // 选择机构按钮方法
    getOrgList(org) {
      if (this.orgOrDeptId == '1') {
        console.log('org', org)
        this.$set(this.formData, 'editUnit', org.unitName)
        this.$set(this.formData, 'editUnitId', org.id)
        //投稿部门置空
        this.formData.submitDept = ''
      } else {
        let deptId = []
        let deptName = []
        org.map((item) => {
          deptId.push(item.id)
          deptName.push(item.unitName)
        })
        this.$set(this.formData, 'submitDept', deptName.join(','))
        this.$set(this.formData, 'submitDeptId', deptId.join(','))
      }
    },
    // 选择机构按钮
    selectOrg() {
      this.title = '选择机构'
      this.isSingle = true
      this.orgOrDept = 1
      this.orgOrDeptId = '1'
      this.showOrgTree = true
    },
    // 选择部门按钮
    selectDepar() {
      if (!this.formData.editUnit) {
        this.$message({
          message: '请先选择机构',
          type: 'error',
        })
        return
      }
      this.title = '选择部门'
      this.isSingle = false
      this.orgOrDept = 0
      this.orgOrDeptId = this.formData.editUnitId
      this.showOrgTree = true
    },
    // 获取投稿栏目接口
    getPubManageList() {
      this.$api.paraMeter
        .PublicationManagementlist(
          {},
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.options = res.data[0].pubColumnNm.split(',')
        })
    },
  },
  created() {
    // this.loadData()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.formHeader {
  padding: 8px 70px;
  .title-text {
    margin-bottom: 15px;
    font-size: 30px;
    line-height: 75px;
    color: #409eff;
    font-weight: 600;
    text-align: center;
  }
}
.down {
  font-size: 12px;
  text-align: center;
}
</style>
