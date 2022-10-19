<template>
  <div class="check">
    <search-form ref="searchFrom" :formData="formData" :formCfg="formCfg" @reset="reset" @submit="submit" @event="btnevent">
      <el-col :span="8">
        <el-form-item label="拟稿日期">
          <el-date-picker v-model="formData.startDataList" type="daterange" value-format="yyyy-MM-dd" range-separator="-" style="width: 100%" start-placeholder="拟稿开始日期" end-placeholder="拟稿结束日期" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发布日期">
          <el-date-picker v-model="formData.puDateList" type="daterange" value-format="yyyy-MM-dd" range-separator="-" style="width: 100%" start-placeholder="发布开始日期" end-placeholder="发布结束日期" />
        </el-form-item>
      </el-col>
    </search-form>
    <m-table @refresh="loadData()" :pageSizeList='[20,30,50,100,200,500]' @cellClick="cellClick" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :searchData="formData" :isSelection="true"></m-table>
    <!--    选择树-->
    <org-tree v-model="showOrgTree" :title="title" :isSingle="isSingle" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @orgList="getOrgList"></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from '@/components/table/tTable'
import searchForm from 'components/form/searchForm'
import orgTree from 'components/tree/orgTree'
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法

export default {
  name: 'departInfoquery',
  components: {
    mTable,
    orgTree,
    searchForm,
  },
  props: {},
  mixins: [bianhanPublic],
  data() {
    return {
      title: '选择部门',
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: '1',
      formData: {
        /* drafOrgId: '',
        title: '', //标题
        jbNo: '', //简报编号
        jbNm: '', //简报名称
        drafDepId: '', //拟稿部门名称
        pubStaut: '', //发布状态
        drafUid: '', //拟稿人
        drafUnm: '', // 拟稿人名称
        drafTime: '', //拟稿日期
        pubTime: '', //发布日期
        multiTenancyId: '', //流程多实体标示
        curUserid: '', //当前操作人id
        curUsernm: '', //当前操作人名称
        histUserid: '', //历史操作人
        processStaut: '', //流程状态：扭转,办结
        finishYear: '', //办结年份 */
      },
      formCfg: [
        {
          type: 'radios',
          prop: 'pubStaut',
          label: '信息状态',
          options: { '': '全部', 1: '未发布', 2: '已发布' },
        },
        {
          type: 'radios',
          prop: 'infoSource',
          label: '信息类型',
          value: 'all',
          options: { 'make': '制发信息', 'public': '发布信息', 'all': '全部'},
          // 制发信息跳转详情，发布信息跳转金格
        },
        [
          {
            type: 'input',
            prop: 'drafOrgName',
            span: 16,
            style: { width: '80%' },
            disabled: true,
          },
          {
            type: 'button-primary',
            prop: '$selectOrg',
            value: '选择',
            disabled: this.isSave,
            style: { marginLeft: '16px' },
          },
          { type: 'formitem', label: '制发行' },
        ],
        [
          {
            type: 'input',
            prop: 'drafDepNm',
            span: 16,
            style: { width: '80%' },
            disabled: true,
          },
          {
            type: 'button-primary',
            prop: '$selectDepar',
            value: '选择',
            disabled: this.isSave,
            style: { marginLeft: '16px' },
          },
          { type: 'formitem', label: '主办部门' },
        ],
        {
          type: 'input',
          prop: 'title',
          label: '标题',
          span: 15,
          style: { width: '100%' },
        },
        {
          type: 'input',
          prop: 'jbNo',
          label: '简报编号',
          span: 15,
          style: { width: '100%' },
          value: `〔${new Date().getFullYear()}〕`
        },

        [
          { type: 'button-primary', prop: '$submit', value: '查询' },
          { type: 'button', prop: '$reset', value: '重置' },
          {
            type: 'formitem',
            style: { 'text-align': 'center', 'margin-left': '-120px' },
          },
        ],
      ],

      searchData: {},
      tableData: [],
      tableCols: [
        { label: '拟稿日期', prop: 'drafTime' },
        { label: '标题', prop: 'title' },
        { label: '简报编号', prop: 'jbNo' },
        { label: '拟稿部门', prop: 'drafDepNm' },
        { label: '信息类型', prop: 'viewType' },
      ],
      pagination: {
        pageNum: 1, //第几页
        pageSize: 20, //每页条数
        total: 0,
      },
    }
  },
  computed: {},
  methods: {
    reset() {
      this.formData = {}
    },
    submit(params) {
      this.loadData()
    },
    btnevent(params) {
      switch (params.prop) {
        case '$selectOrg':
          this.title = '选择机构'
          this.isSingle = true
          this.orgOrDept = 1
          this.orgOrDeptId = '1'
          this.showOrgTree = true
          break
        case '$selectDepar':
          if (!this.formData.drafOrgId) {
            this.$message({
              message: '请先选择机构',
              type: 'success',
            })
            return
          }
          this.title = '部门'
          this.isSingle = true
          this.orgOrDept = 0
          this.orgOrDeptId = this.formData.drafOrgId
          this.showOrgTree = true
          break
      }
    },
    //获取机构树
    getOrgList(org) {
      if (this.orgOrDeptId == '1') {
        this.$refs.searchFrom.setText('drafOrgName', org.unitName)
        this.$set(this.formData, 'drafOrgId', org.id)
      } else {
        let deptId = ''
        let deptName = ''
        deptId = org.id
        deptName = org.unitName
        // org.map((item) => {
        //   deptId.push(item.id)
        //   deptName.push(item.unitName)
        // })
        this.$refs.searchFrom.setText('drafDepNm', deptName)
        this.$set(this.formData, 'drafDepId', deptId)
      }
    },
    loadData() {
      if (this.formData.startDataList && this.formData.startDataList.length > 0) {
        this.formData.startDate = this.formData.startDataList[0]
        this.formData.endDate = this.formData.startDataList[1]
      }
      if (this.formData.puDateList && this.formData.puDateList.length > 0) {
        this.formData.puStartDate = this.formData.puDateList[0]
        this.formData.puEndDate = this.formData.puDateList[1]
      }
      this.formData.type = 'all' //传给后端查询所有数据标识
      // console.log(this.formCfg[1])
      // this.formData.infoSource = 'all' //传给后端查询所有数据标识
      
      this.$api.pubInfo
        .getJbListCx(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          console.log(res)
          this.pagination.total = res.data.total
          res.data.page.map(item=>{
            if (item.viewType === 'MyHeadInfo' || item.viewType === 'ParentHeadInfo') {
              return item.viewType = '发布信息'
            } else if (item.viewType === 'DeptApply' || this.formData.infoSource === 'make') {
              return item.viewType = '制发信息'
            }
          })
          this.tableData = res.data.page
        })
    },
    cellClick(row) {
      this.writeApply('cakan', row)
    },
    writeApply(flag, row) {
      console.log(row, '获取row')
      if (row.viewType === '发布信息') {
        if (row.pubMainFilePath) {
          this.ifView = 0
          this.shiwuState = 'viewFile'
          let bank_doDownloadFile = { function: 'doDownloadFile' }
          const pathArrays = row.pubMainFilePath.split(',')
          bank_doDownloadFile.fileName = pathArrays[0]
          bank_doDownloadFile.filePath = pathArrays[1]
            this.$post.postData("doDownloadFile", JSON.stringify(bank_doDownloadFile), "A0846C071")
              .then(res => {
              if (res) {
                  res.ifView = 0
                  res.flag = flag
                  this.doDraft(res, row)
              } else {
                  this.$message({
                    type: 'error',
                    showClose: true,
                    offset: 400,
                    message: '下载失败',
                    duration: 500,
                  })
                }
            })
        } else {
          this.$message({
            message: '暂无正文模板',
            type: 'warning',
          })
        }
      } else if (row.viewType === '制发信息' || this.formData.infoSource === 'make') {
        if (row.pubStaut === '2') {
        this.$intent.goNewPage(this, {path:'/publication/departInfo/departfinish',query:{depInfoPubId: row.depInfoPubId, type: '02'}});
        } else {
          if (row.curUserId == JSON.parse(localStorage.getItem('userInfo')).humanCode) {
           // console.log('跳转待办')
            this.hasOpened(row.depInfoPubId,{
            'path':'/publication/departInfo/depart',
            'query': { depInfoPubId: row.depInfoPubId,id:row.depInfoPubId}
          })
            
           // this.$intent.goNewPage(this, {path:'/publication/departInfo/depart',query:{depInfoPubId: row.depInfoPubId}});
          } else {
            this.$intent.goNewPage(this, {path:'/publication/departInfo/departfinish',query:{depInfoPubId: row.depInfoPubId, type: '01'}});
          }
        }
      }
    },
    //打开金格文档申请跳转
    doDraft(fileInfo, row) {
      let Path= getMachineType() ? '/openAndSave_WordHk' : "openAndSave_Wps_Tansun";
      let data = this.$router.resolve({
        path: Path,
        query: {
          tanSun: '3',
          state: fileInfo && fileInfo.flag === 'cakan' ? 'viewFile' : 'newFile',
          id: row.depInfoPubId,
          zhengWenState: 0,
          JYcode: 'A0846C002',
          relativePath: fileInfo ? fileInfo.filePath : '',
          fileName: fileInfo ? fileInfo.fileName : '测试.doc',
          tmpFileName: fileInfo ? fileInfo.fileNameTh : '',
          tmpFilePath: fileInfo ? fileInfo.filePathTh : '',
          EditType: '2',
          cleanDraftFlag: false,
          multiTenancyId: '000076767qwq0',
          showBtns: true,
          serverUrl: '128.192.221.164',
          saveNameAndNumber: row.jbNo + row.title
        },
      })
      this.$forceUpdate()
      var one = data.href.split('?')[0]
      var newPath = '#' + data.href.substring(one.lastIndexOf('/'),data.href.length)
      window.open(newPath, "_blank");
    },
  },
  mounted() {},
  created() {
    this.loadData()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>




