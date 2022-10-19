<template>
  <div class="searchForm" id="pubStatistics">
    <el-form ref="refForm" :model="formData" label-width="160px">
      <el-col :span="24">
        <el-form-item label="日期查询类型">
          <el-radio-group v-model="formData.queryDateType">
            <el-radio label="按收稿日期"></el-radio>
            <el-radio label="按编辑日期"></el-radio>
            <el-radio label="按发布日期"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="发布日期">
          <el-date-picker value-format="yyyy-MM-dd" v-model="formData.date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :style="{width:'60%'}"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="行别">
          <el-radio-group @click.native="drafOrgTpClass" v-model="formData.drafOrgTp">
            <el-radio label="总行"></el-radio>
            <el-radio label="分行"></el-radio>
            <el-radio label="全部"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <div style="float:left" v-if="isShowFormItem">
          <el-form-item label="行名">
            <el-input class="left" v-model="formData.drafOrgNm" style="width:640px;margin-right:20px" readonly="readonly"></el-input>
            <el-button class="right" @click="add" type="primary" size="medium">添加</el-button>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="24">
        <el-form-item label="类别">
          <el-radio-group v-model="formData.type">
            <el-radio label="HTML"></el-radio>
            <el-radio label="Excel"></el-radio>
            <el-radio label="Word"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <div style="width:100%;text-align:center;margin-bottom:20px">
          <el-button type="primary" @click="submit">开始统计</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </div>
      </el-col>
    </el-form>
    <m-table @refresh="loadData" :searchData="formData" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection='true'></m-table>
    <!--选择树-->
    <org-tree v-model="showOrgTree" :title="title" :isSingle="isSingle" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @orgList="getOrgList"></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/tTable'
import orgTree from 'components/tree/orgTree'
import exportTable from '../../../minixs/exportTable'
import exportTableWord from '../../../minixs/exportTableQueryScript'
import dateFormate from '@/util/filters.js'
export default {
  name: 'detailScript',
  components: {
    mTable,
    orgTree,
  },
  data() {
    return {
      list: {
        title: "2020年09月采用信息",
        item: "办公室分行（12条）",
        table: [
          {
            x: "各分行全方位开展保密密码宣传教育活动（三）",
            zimu: "202-09-01",
          },
          {
            x: "河北省分行扎实推进裕农通服务点提质增效",
            zimu: "202-09-01",
          },
          {
            x: "贵州省分行个贷资产质量管控出实招见效",
            zimu: "202-09-01",
          },
          {
            x: "河北省分行建议增加ATM机吞卡提醒功能",
            zimu: "202-09-01",
          },
        ],
      },
      // 表单的值
      formData: {
        drafOrgTp: '分行',
        queryDateType: '按编辑日期',
      },
      // 是否显示行名
      isShowFormItem: Boolean,
      //
      title: '选择部门',
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: '1',
      // 表格数据
      tableData: [],
      // 表头
      tableCols: [
        {
          label: '收稿日期',
          prop: 'tougao_time',
          formatter(row) {
            return row.tougaoTime == '' || row.tougaoTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.tougaoTime)))
          },
        },
        {
          label: '编辑日期',
          prop: 'beixuanTime',
          formatter(row) {
            return row.beixuanTime == '' || row.beixuanTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.beixuanTime)))
          },
        },
        {
          label: '发布日期',
          prop: 'editTime',
          formatter(row) {
            return row.editTime == '' || row.editTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.editTime)))
          },
        },
        { label: '分行', prop: 'drafOrgNm' },
        { label: '标题', prop: 'title' },
        { label: '期数', prop: 'pubIssue' },
      ],
      // 分页
      pagination: {
        pageNum: 1, //第几页
        pageSize: 20, //每页条数
      },
    }
  },
  watch: {
    // 监听行别
    'formData.drafOrgTp': {
      handler(val) {
        if (val === '全部') {
          this.isShowFormItem = false
        } else {
          this.isShowFormItem = true
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
      this.$api.pubStatistics
        .pubStatisticsList(
          {
            queryType: '1',
            ...this.formData,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    // 开始统计
    submit() {
      if (this.formData.type === 'HTML') {
        this.loadData()
      } else if (this.formData.type === 'Excel') {
        this.exportData() // 调用导出方法
      } else if (this.formData.type === 'Word') {
      // exportDocx("../../../../public/input_3.doc", this.list, `脚本.docx`);
        exportTableWord.exportDocx("input_3.docx", this.list, `脚本.docx`)
      } else {
        this.$message({
          type: 'error',
          message: '请选择类别!',
        })
        return
      }
      // this.loadData()
    },
    // 获取表格数据
    loadData() {
      console.log(this.formData, '获取formData')
      this.$api.pubStatistics
        .pubStatisticsList(
          {
            queryType: '1',
            ...this.formData,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total || 0
          if (this.formData.type === 'HTML') {
            this.tableData = res.data
          } else if (this.formData.type === 'Word') {
            console.log(res.data, '获取表格数据')
            this.$nextTick(() => {
              exportTable.getPdfforBianhan(
                '采用稿件统计',
                res.data,
                'caiyonggaojiantj',
                'A0846C002',
                'biaoti',
                this,
                ['headerClick', 'formHeader', 'bank_dispach_content']
              )
            })
          }
        })
    },
    // 选择机构按钮方法
    getOrgList(org) {
      // console.log(org)
      // this.$set(this.formData, 'drafOrgNm', org.unitName)
      // this.$set(this.formData, 'drafOrgId', org.id)
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
      exportTable.exportExcel('用稿明细情况统计表')
    },
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
/deep/ .el-table__header {
  width: 100% !important;
}
</style>
