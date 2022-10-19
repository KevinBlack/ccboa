/**
* create by zx on 2020/8/3 10:58
* 类注释：
* 备注：
*/
<template>
  <div class="searchForm">
    <el-form ref="ruleForm" :model="formData" label-width="120px" style="margin-bottom:20px;">
      <el-row>
        <el-col :span="8">
          <el-form-item label="投稿状态">
            <el-radio-group v-model="formData.pubStaut">
              <el-radio label="04">已投稿</el-radio>
              <el-radio label="03">未投稿</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="text-align:left;">
          <el-col class="arrowup">
            <el-button type="primary" @click="submit">开始查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
            <el-button type="info" size="small" @click="show=!show" v-if="!show">
              <i class="el-icon-arrow-down el-icon--left"></i> 展开
            </el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-row v-if="show" style="margin-top:20px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿刊物" prop="pubMgId">
              <el-select @change="changePubMg" v-model="formData.pubNm" style="width:100%" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.list" :value="item.list"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿栏目">
              <el-select ref="select" @click.native="changePubColumnNm" v-model="formData.colNm" style="width:100%" placeholder="请选择">
                <el-option v-for="(item,index) in options2" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿单位">
              <el-input v-model="formData.drafOrgNm" :disabled="true" style="width:330px;"></el-input>
              <el-button @click="selectOrgNew" type="primary" size="medium" style="float:right">选择</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿部门" prop="drafDepNm">
              <el-input v-model="formData.drafDepNm" :disabled="true" style="width:330px;"></el-input>
              <el-button @click="selectDepar" type="primary" size="medium" style="float:right">选择</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投稿时间">

              <el-date-picker v-model="formData.tougaoTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" style="width:70%" start-placeholder="开始日期" end-placeholder="结束日期" />
              <!-- <el-button type="primary" style="margin-left:10px">选择日期</el-button> -->
              <!-- <el-button type="primary" style="margin-left:20px">稿件刷新</el-button> -->
              <!-- <el-date-picker value-format="yyyy-MM-d" v-model="formData.tougaoTime" type="date" placeholder="请选择发布时间"></el-date-picker> -->
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-col :span="6">
          <el-form-item label="投稿单位" prop="drafOrgNm">
            <select-org-or-dept @select="selectOrg">
              <el-input type="text" readonly="readonly" v-model="formData.drafOrgNm" suffix-icon="el-icon-arrow-down" />
            </select-org-or-dept>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="投稿部门">
            <select-org-or-dept @select="selectDept" :orgOrDept="0" :orgOrDeptId="formData.drafOrgId">
              <el-input readonly type="text" placeholder="请选择部门" v-model="formData.drafDepNm" suffix-icon="el-icon-arrow-down" />
            </select-org-or-dept>
          </el-form-item>
        </el-col> -->

      </el-row>
      <el-row v-if="show" style="margin-top:20px">
        <el-col :span="20">
          <el-form-item label="撰稿人">
            <el-input v-model="formData.drafUnm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="down" v-if="show" style="text-align:center;margin:10px 0 0 10px">
          <el-button type="info" size="small" @click="show=!show">
            <i class="el-icon-arrow-up el-icon--left"></i> 收起
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="4" style="position: relative;left:0px;top:-10px;">
        <el-button type="primary" @click="exportData">打印查询结果</el-button>
      </el-col>
    </el-row>
    <m-table @refresh="loadData()" :pageSizeList='[20,30,50,100,200,500]' @cellClick="cellClick" @select="select" :searchData="formData" size="medium" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true"></m-table>
    <!--    选择树-->
    <org-tree v-model="showOrgTree" :title="title" :isSingle="isSingle" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" @orgList="getOrgList"></org-tree>
  </div>
</template>

<script type="text/ecmascript-6">
import mTable from 'components/table/tTable'
import orgTree from 'components/tree/orgTree'
import exportTable from '../../../minixs/exportTable'
// import selectOrgOrDept from 'components/select/selectOrgOrDept'
import dateFormate from '@/util/filters.js'
import bianhanPublic from "@/minixs/bianhan"; //便函公共方法
export default {
  name: 'search',
  components: {
    // selectOrgOrDept,
    mTable,
    orgTree,
  },
  props: {},
  mixins: [bianhanPublic],
  data() {
    return {
      options: [],
      options1: [],
      options2: [],
      show: false,
      orgListStr: [],
      isdialog: false,
      isSava: true,
      title: '选择部门',
      showOrgTree: false,
      isSingle: false,
      orgOrDept: 1,
      orgOrDeptId: '1',
      searchData: {},

      formData: {
        pubMgId: '', //刊物id
        pubNm: '', //刊物名称
        gId: '', //稿件id
        nextHumanId: '', //下一处理人Id
        nextHumanNm: '', //下一处理人name
        nextPcsNodeID: '', //下一环节id
        nextPcsNodeNM: '', //下一环节name
        title: '', //标题
        colId: '', //栏目id
        colNm: '', //栏目名称
        drafDepId: '', //拟稿部门id
        drafDepNm: '', //拟稿部门名称
        drafOrgId: '', //拟稿所属机构id
        drafOrgNm: '', //拟稿所属机构name
        drafUid: '', //拟稿人id
        drafUnm: '', //拟稿人名称
        phone: '', //联系电话
        assessOpinions: '', //评审意见
        zukanOpinions: '', //组刊意见
        auditOpinions: '', //	审批意见
        processInstId: '', //	流程实例Id
        pTplNo: '', //	流程模板Id
        supUserid: '', //	上一个处理人id
        supUsernm: '', //	上一个处理人name
        curPcsAvyId: '', //	当前活动Id
        curNodeCode: '', //	当前环节id
        curNodeName: '', //	当前环节name
        curUserid: '', //	当前处理人id
        curUsernm: '', //	当前处理人name
        supNodeCode: '', //	上一环节id
        pubMainFilePath: '', //	正文附件地址
        caiyongOrgId: '', //	采用机构id
        caiyongOrgNm: '', //	采用机构名称
        grade: '', //	最新评分
        startDate: '', //	投稿查询起始时间
        endDate: '', //投稿查询结束时间
        tougaoTime: '', //投稿时间
        editTime: '', //编辑时间
        pubStaut: '', //投稿状态
        cyStaut: '', //采用状态
      },
      tableData: [],
      tableCols: [
        {
          label: '拟稿日期',
          prop: 'drafTime',
          formatter(row) {
            return row.drafTime == '' || row.drafTime == undefined
              ? ''
              : dateFormate.date(Date.parse(new Date(row.drafTime)))
          },
        },
        { label: '投稿刊物', prop: 'pubNm' },
        { label: '标题', prop: 'title' },
      ],
      pagination: {
        pageNum: 1, //第几页
        pageSize: 20, //每页条数
      },
    }
  },
  computed: {},
  methods: {
    // 选择刊物
    changePubMg(e) {
      // //
      // console.log(this.options1)
      // this.formData.colId = ''
      let obj = {}
      obj = this.options.find((item) => {
        return item.list === e
      })
      this.formData.pubNm = obj.list
      this.formData.pubMgId = obj.value

      this.formData.colNm = ''
    },
    // 选择栏目
    changePubColumnNm(e) {
      // if (!this.formData.pubNm) {

      //   let obj = {}
      //   obj = this.options.find((item) => {
      //     return item.colNm === e
      //   })
      //  console.log()

      //   this.options1 = []
      //   this.$message({
      //     message: '请先选择投稿刊物',
      //     type: 'error',
      //   })
      //   this.$refs.select.blur()
      // } else {
      let fileid = []
      this.options.forEach((item) => {
        fileid.push(item.list)
      })
      // console.log(fileid, this.formData.pubNm)
      let selectColnm = this.options1[fileid.indexOf(this.formData.pubNm)].pubColumnNm.split(',')
      this.options2 = selectColnm
      console.log(this.options2)

      // }
    },
    // 选择机构按钮
    selectOrgNew() {
      this.title = '选择机构'
      this.isSingle = true
      this.orgOrDept = 1
      this.orgOrDeptId = '1'
      this.showOrgTree = true
    },
    // 选择部门按钮
    selectDepar() {
      console.log(this.formData.editUnitId)
      if (!this.formData.drafOrgNm) {
        this.$message({
          message: '请先选择投稿单位',
          type: 'error',
        })
        return
      }
      this.title = '选择部门'
      this.isSingle = false
      this.orgOrDept = 0
      this.orgOrDeptId = this.formData.manageBankId
      this.showOrgTree = true
    },
    selectDept(dept) {
      this.formData.drafDepNm = dept.unitName
      this.formData.drafDepId = dept.id
    },
    selectOrg(org) {
      this.formData.drafOrgNm = org.unitName
      this.formData.drafOrgId = org.id
      console.log(org)
    },
    reset() {
      this.formData = {
        pubMgId: '', //刊物id
        pubNm: '', //刊物名称
        gId: '', //稿件id
        nextHumanId: '', //下一处理人Id
        nextHumanNm: '', //下一处理人name
        nextPcsNodeID: '', //下一环节id
        nextPcsNodeNM: '', //下一环节name
        title: '', //标题
        colId: '', //栏目id
        colNm: '', //栏目名称
        drafDepId: '', //拟稿部门id
        drafDepNm: '', //拟稿部门名称
        drafOrgId: '', //拟稿所属机构id
        drafOrgNm: '', //拟稿所属机构name
        drafUid: '', //拟稿人id
        drafUnm: '', //拟稿人名称
        phone: '', //联系电话
        assessOpinions: '', //评审意见
        zukanOpinions: '', //组刊意见
        auditOpinions: '', //	审批意见
        processInstId: '', //	流程实例Id
        pTplNo: '', //	流程模板Id
        supUserid: '', //	上一个处理人id
        supUsernm: '', //	上一个处理人name
        curPcsAvyId: '', //	当前活动Id
        curNodeCode: '', //	当前环节id
        curNodeName: '', //	当前环节name
        curUserid: '', //	当前处理人id
        curUsernm: '', //	当前处理人name
        supNodeCode: '', //	上一环节id
        pubMainFilePath: '', //	正文附件地址
        caiyongOrgId: '', //	采用机构id
        caiyongOrgNm: '', //	采用机构名称
        grade: '', //	最新评分
        startDate: '', //	投稿查询起始时间
        endDate: '', //投稿查询结束时间
        tougaoTime: '', //投稿时间
        editTime: '', //编辑时间
        pubStaut: '', //投稿状态
        cyStaut: '', //采用状态
      }
    },
    submit() {
      this.loadData()
    },
    loadData() {
      console.log(this.formData.pubNm, '获取formData')
      this.$api.paraMeter
        .ManuscriptCx(this.formData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          console.log(res, '和稿件列表')
          this.pagination.total = res.total
          this.tableData = res.data
        })
    },
    cellClick(row) {
      // console.log(row)
      let rowdata = JSON.stringify(row)
      this.hasOpened(row.gId,{
             'path': '/publication/tgMangement/wriScript/repairScript',
            'query': { rowData: row.gId,id:row.gId, closeCondition: 'query' }
       })
      // this.$intent.goNewPage(this, {
      //   path: '/publication/tgMangement/wriScript/repairScript',
      //   query: { rowData: row.gId, closeCondition: 'query' },
      // })
    },
    //获取机构树
    getOrgList(org) {
      console.log(org, this.orgOrDeptId, 'huoqu org')
      if (this.orgOrDeptId == '1') {
        console.log(org)

        this.formData.manageBankId = org.id
        // this.$refs.searchForm.setText(this.formData, 'approveUnitName', org.unitName)
        // this.$set(this.formData, 'approveUnitName', org.unitName)
        this.formData.drafOrgNm = org.unitName
        this.formData.drafOrgId = org.id
        this.$set(this.formData, 'curbankId', org.id)
        //投稿部门置空
        this.formData.drafDepNm = ''
        // this.orgSelect()
        // this.initData()
      } else {
        let deptId = []
        let deptName = []
        org.map((item) => {
          deptId.push(item.id)
          deptName.push(item.unitName)
        })
        // this.$refs.searchForm.setText(this.formData, 'manageDept', deptName.join(','))
        // this.$set(this.formData, 'manageDept', deptName.join(","))
        console.log(org, 'huoquhuoqu')
        this.formData.drafDepNm = org[0].unitName
        this.formData.drafDepId = org[0].id
        this.$set(this.formData, 'draftDepartmentId', deptId.join(','))
      }
    },
    handleClose() {
      this.isdialog = false
    },
    delecurrentCode() {
      this.isdialog = false
    },
    select() {},
    //获取刊物机构部门下拉数据
    loadData1() {
      this.$api.paraMeter.PublicationManagementlist({}).then((res) => {
        this.options = res.data
        this.options1 = res.data
        let fileid = []
        this.options.forEach((item) => {
          fileid.push({
            list: item.pubNm,
            value: item.pubMgId,
          })
        })
        this.options = fileid
        // console.log(fileid, '<======下拉数据')
      })
    },
    //导出
    exportData() {
      exportTable.exportExcel('投稿查询统计表')
    },
  },
  activated() {},
  mounted() {},
  created() {
    // this.loadData()
    this.loadData1()
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
  // position: absolute;
  // bottom: 0px;
  font-size: 12px;
  text-align: center;
}
</style>
