<template>
  <div>
    <div class="draft">
      <el-form ref="statisticalForm" :model="form" label-width="120px">

        <el-row>
          <el-col :span="8">
            <el-form-item label="拟稿时间" style="width: 350px;">
              <el-date-picker value-format="yyyy-MM-dd" v-model="form.startDateList" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构名称" style="width: 350px;">
              <select-org-or-dept @select="selectOrg" :orgOrDept="orgOrDept" :orgOrDeptId="orgOrDeptId" :style="{width: '200px',display: 'inline-block',marginRight:'20px'}">
                <el-input type="text" readonly placeholder="机构名称" v-model="form.drafOrgName" suffix-icon="el-icon-arrow-down" />
              </select-org-or-dept>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <!-- <el-form-item> -->
            <el-button type='primary' @click='query'>查询</el-button>
            <el-button @click='reset'>重置</el-button>
            <!-- </el-form-item> -->
          </el-col>
          <!-- <el-date-picker :style=" {width: '200px' }" type="date" v-model="form.startDate" value-format="yyyy-MM-dd">
              </el-date-picker> -->
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题" style="width: 350px;">
              <el-input placeholder="标题" :style="{width: '230px',marginRight:'20px'}" type="text" v-model="form.title" />
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="简报编号" style="width: 350px;">

              <el-input :style="{width: '200px',marginRight:'20px'}" type="text" v-model="form.jbNo" />
            </el-form-item>

          </el-col>
          <!-- <el-date-picker :style="{width: '200px'}" type="date" v-model="form.startDate" value-format="yyyy-MM-dd"></el-date-picker> -->
        </el-row>
        <!-- <el-form-item label="拟稿结束时间">
          <el-date-picker :style="{width: '200px'}" type="date" v-model="form.endDate" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item> -->
        <!-- <el-form-item label="发布状态" prop="pubStaut">
          <el-select v-model="form.pubStaut" style="width: 200px">
            <el-option v-for="item in FBZTOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="标题"> -->

        <!-- </el-form-item> -->
        <!-- <el-form-item label="简报编号"> -->
        <!-- </el-form-item> -->
        <!-- <el-form-item label="拟稿人">
          <el-input :style="{width: '200px'}" type="text" v-model="form.drafUnm" />
        </el-form-item> -->

      </el-form>
      <el-tabs v-model="activeTab" @tab-click="handleTabsClick">
        <el-tab-pane label="流转" name="tabs-look"></el-tab-pane>
        <el-tab-pane label="办结" name="tabs-file"></el-tab-pane>
      </el-tabs>
      <m-table @refresh="loadData()" @cellClick="cellClick" size="medium" :pageSizeList='[20,30,50,100,200,500]' :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="false" :searchData="form"></m-table>
    </div>
  </div>
</template>
<script>
import mTable from '@/components/table/tTable'
import selectOrgOrDept from 'components/select/selectOrgOrDept'
import exportTable from '../../../minixs/exportTable'
const liuzhuanData = [
   { label: '拟稿日期', prop: 'drafTime' },
    { label: '标题', prop: 'title' },
    { label: '简报编号', prop: 'jbNo' },
    { label: '拟稿部门', prop: 'drafDepNm' },
    { label: '当前环节', prop: 'curNodeName' },
    { label: '操作人', prop: 'curUsernm' },
];
const banjiehData = [
  { label: '拟稿日期', prop: 'drafTime' },
  { label: '标题', prop: 'title' },
  { label: '简报编号', prop: 'jbNo' },
  { label: '拟稿部门', prop: 'drafDepNm' },
];
export default {
  name: 'departInfomanageQuery',
  components: {
    mTable,
    selectOrgOrDept,
  },
  data() {
    return {
      orgOrDept:1,
      orgOrDeptId:'1',
      form: {
        drafOrgName: JSON.parse(localStorage.getItem('userInfo')).shortUnitName,
        drafOrgId: JSON.parse(localStorage.getItem('userInfo')).unitId,
        startDate:  "",
        endDate:  "",
        pubStaut:  "",
        title: "",
        jbNo:  `〔${new Date().getFullYear()}〕`,
        drafUnm:  "",
        startDateList:'',
      },
      // 发布状态下拉数据
      FBZTOption: [
        {
          value: '2',
          label: '已发布',
        },
        {
          value: '1',
          label: '未发布',
        },
      ],
      // 机构ID
      unitCode: '',
      tableData: [],
      // 列表默认加载页签
      activeTab: 'tabs-look',
      // 区分调用接口 2已完结 4流转中
      processType: 4,
      tableCols: liuzhuanData,
      pagination: {
        pageNum: 1,
        total: 0,
        pageSize: 20,
      },
    }
  },
  created() {
    this.loadData()
  },
  mounted() {},
  methods: {
    // 选机构
    selectOrg(org) {
      console.log(org)
      this.$set(this.form, 'drafOrgName', org.unitName)
      this.$set(this.form, 'drafOrgId', org.id)
      this.form.draftOrganId = org.id
      this.unitCode = org.id
    },
    // 开始统计按钮点击事件
    query() {
      this.loadData()
    },
    handleTabsClick(tab) {
      if (tab.index == 0) {
        this.form.type="adminTodo"//流转   
        this.tableCols = liuzhuanData;
        this.pagination={
        pageNum: 1,
        pageSize: 20,
      },
        this.loadData()
      } else if (tab.index == 1) {
        this.form.type="adminFinish" //办结
        this.tableCols = banjiehData;
        this.pagination={
          pageNum: 1,
          pageSize: 20,
        },
        this.loadData()
      }
    },
    // 重置按钮
    reset() {
      this.form.drafOrgName = JSON.parse(localStorage.getItem('userInfo')).shortUnitName
      this.form.drafOrgId = JSON.parse(localStorage.getItem('userInfo')).unitId
      this.form.startDate = ''
      this.form.endDate = ''
      this.form.pubStaut = ''
      this.form.title = ''
      this.form.jbNo ='〔'+ new Date().getFullYear() +'〕'
      this.form.drafUnm = ''
      this.form.startDateList=''
      this.loadData()
    },
    loadData() {
      this.tableData = []
      if(this.activeTab=='tabs-look'){
        this.form.type="adminTodo"   //流转 
      }
      if (this.form.startDateList) {
        this.form.startDate = this.form.startDateList[0]
        this.form.endDate = this.form.startDateList[1]
      }
      this.$api.pubInfo
        .getJbList(
          this.form,
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          console.log('打印返回数据', res)
          this.pagination.total = res.data.total
          this.tableData = res.data.page
        })
    },
    cellClick(row) {
      if(this.activeTab=="tabs-look"){
        this.$intent.goNewPage(this, {path:'/publication/departInfo/departfinish',query:{depInfoPubId: row.depInfoPubId,type:'03'}});
      }else if(this.activeTab=="tabs-file"){
        this.$intent.goNewPage(this, {path:'/publication/departInfo/departfinish',query:{depInfoPubId: row.depInfoPubId,type:'04'}});
      }
    },
  },
}
</script>
<style scoped lang="less" rel="stylesheet/less">
p {
  border: 1px solid;
}
</style>