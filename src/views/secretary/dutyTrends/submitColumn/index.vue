<template>
  <div class="submitColumnn">
    <div style="margin: 20px 0">
      <el-row style="margin-bottom: 10px" :gutter="20">
        <!-- <el-col :span="6">
          <select-org-or-dept　:orgOrDeptId="'0'" @select="selectOrg">
            <el-input type="text" readonly="readonly" placeholder="请选择" v-model="searchData.draftOrgan" suffix-icon="el-icon-arrow-down" />
          </select-org-or-dept>
        </el-col> -->
        <el-button v-show="!isShowAddBtns" type="primary" style="margin-left:20px;" @click="add_btn">新增</el-button>
        <el-button v-show="!isShowDelBtns" type="danger" style="margin-left:20px;" @click="delete_btn">删除</el-button>
      </el-row>
      <el-tabs v-model="actionTabsName">
        <el-tab-pane label="投稿栏目配置" name="first"></el-tab-pane>
        <el-tab-pane label="默认栏目配置" name="four"></el-tab-pane>
      </el-tabs>
    </div>
    <m-table v-if="!isShowTable" 
    @refresh="loadData" 
    @cellClick="cellClick" 
    @select="select" 
    size="medium" 
    :isHandle="true"
    :tableData="tableData" 
    :tableCols="tableCols" 
    :pagination="pagination" 
    :isSelection="true"
    ></m-table>

    <m-table v-else 
    @refresh="loadDefaultData" 
    @cellClick="cellDefaultClick" 
    @select="selectDefault" 
    size="medium"
    :isHandle="true"
    :tableData="tableDefaultData" 
    :tableCols="tableDefaultCols" 
    :pagination="paginationDefault" 
    :isSelection="true"></m-table>
  </div>
</template>

<script>
import mTable from '@/components/table/tTable'
/** @description: import selectOrgOrDept from 'components/select/selectOrgOrDept' */

export default {
  name: 'submitColumn',
  components: {
    mTable,
    /** @description: selectOrgOrDept, */
  },
  data() {
    return {
      searchData: {}, /** @description: 搜索条件 */
      isShowTable: false, /** @description: 投稿栏目配置表格 */
      isShowAddBtns: false, /** @description: 默认显示新增按钮 */
      isShowDelBtns: false, /** @description: 默认显示删除按钮 */
      tableData: [], /** @description: 投稿栏目表格数据 */
      tableDefaultData: [], /** @description: 默认栏目配置表格数据 */
      deleteArry: '', /** @description: id拼接 */
      actionTabsName: 'first', /** @description: 默认tabs页 */
      route: '', /** @description: 获取表格数据请求参数 */
      tableCols: [{ label: '栏目名称', prop: 'columnCategory' }], /** @description: 投稿栏目配置表头 */
      tableDefaultCols: [
        /** @description: 默认栏目配置表头 */
        { label: '行内默认栏目', prop: 'innerDefaultConfig_Name' },
        { label: '跨行默认栏目', prop: 'outerDefaultConfig_Name' },
        { label: '子公司默认栏目', prop: 'companyDefaultConfig_Name' },
      ],
      /** @description: 投稿栏目配置分页 */
      pagination: {
        pageNum: 1,
        pageSize: 20,
      },
      /** @description: 默认栏目配置分页 */
      paginationDefault: {
        pageNum: 1,
        pageSize: 20,
      },
      innerList: '',
      outerList: '',
      companyList: '',
    }
  },
  watch: {
    /** @description: 监听tabs切换 */
    actionTabsName: {
      handler(val) {
        switch (val) {
          case 'first':
            this.isShowTable = false
            this.isShowDelBtns = false
            this.isShowAddBtns = false
            this.type = '1'
            this.loadData(this.type)
            break
          case 'four':
            this.isShowTable = true
            this.type = '00002'
            this.route = '00001'
            this.loadDefaultData(this.route)
            break
        }
      },
      immediate: true,
    },
  },
  methods: {
    /** @description: 选择机构的确定按钮 */
    selectOrg(org) {
      this.$set(this.searchData, 'draftOrgan', org.unitName)
      this.$set(this.searchData, 'draftOrganId', org.id)
      this.pagination = {
        pageNum: 1,
        pageSize: 10,
      }
      this.loadData()
    },
    /** @description: 获取表格数据 */
    loadData(type) {
      this.$api.duty
        .submitColumnList(
          { ...this.searchData },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.columnCategoryList
        })
    },
    /** @description: 获取默认栏目配置表格数据 */
    loadDefaultData(type) {
      if(this.type==='00002'){
          type='00001';
      }
      if (this.type === '00002') {
        this.$api.duty
          .submitColumnDefalutList(
            {
              route: type,
            },
            {
              PAGE_JUMP: this.pagination.pageNum,
              REC_IN_PAGE: this.pagination.pageSize,
            }
          )
          .then((res) => {
            console.log(res, '66666')
            this.innerList = JSON.stringify(res.innerList[0])
            this.outerList = JSON.stringify(res.outerList[0])
            this.companyList = JSON.stringify(res.companyList[0])
             this.paginationDefault.total =res.innerList?.length||res.outerList?.length||res.companyList?.length
            if (
              res.innerList.length > 0 &&
              res.outerList.length > 0 &&
              res.companyList.length > 0
            ) {
              this.tableDefaultData = [
                {
                  innerDefaultConfig_Name: res.innerList[0].innerDefaultConfig_Name,
                  outerDefaultConfig_Name: res.outerList[0].outerDefaultConfig_Name,
                  companyDefaultConfig_Name: res.companyList[0].companyDefaultConfig_Name,
                },
              ]
              this.isShowAddBtns = true
              this.isShowDelBtns = true
            } else {
              this.tableDefaultData = []
              this.isShowAddBtns = false
              this.isShowDelBtns = true
            }
          })
      } else {
        this.$api.duty
          .submitColumnList(
            { columnType: this.type },
            {
              PAGE_JUMP: this.pagination.pageNum,
              REC_IN_PAGE: this.pagination.pageSize,
            }
          )
          .then((res) => {
            this.pagination.total = res.total
            this.tableData = res.columnCategoryList
          })
      }
    },
    /** @description: 勾选默认栏目配置表格数据 */
    selectDefault() {},
    /** @description: 换行点击事件 */
    cellClick(row) {
      console.log(row,"row")
      this.$intent.goNewPage(this, {
        path: '/secretary/dutyTrends/params/submitColumn/add',
        query: { rowData: JSON.stringify(row), tabsType: 'save' },
      })
    },
    /** @description: 换行默认栏目配置点击事件 */
    cellDefaultClick(row) {
      console.log(row,"row")
      this.$intent.goNewPage(this, {
        path: '/secretary/dutyTrends/params/submitColumn/addDefault',
        query: {
          rowData: JSON.stringify(row),
          type: 'save',
          tabsType: this.type,
          innerList: this.innerList,
          outerList: this.outerList,
          companyList: this.companyList,
        },
      })
    },
    /** @description: 新增按钮 */
    add_btn() {
      /** @description: 默认栏目配置新增 */
      if (this.type === '00002') {
        this.$intent.goNewPage(this, {
          path: '/secretary/dutyTrends/params/submitColumn/addDefault',
          query: { tabsType: this.type, type: 'add' },
        })
      } else {
        this.$intent.goNewPage(this, {
          path: '/secretary/dutyTrends/params/submitColumn/add',
          query: { tabsType: this.type, type: 'add' },
        })
      }
    },
    /** @description: 勾选的行 */
    select(row) {
      this.deleteArry = row && row.map(item => item.id).join(',');
    },
    /** @description: 删除 */
    delete_btn() {
      if (this.deleteArry) {
        this.$confirm('是否确定删除当前选中数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$api.duty.DeleteTableData({ ids: this.deleteArry }).then((res) => {
            if (res.code == 'SUCCESS') {
              this.deleteArry = ''
              this.$message({
                message: '删除成功',
                type: 'success',
              })
            }
            this.loadData()
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据',
        })
      }
    },
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
/deep/ .el-tabs__nav {
  z-index: 1;
}
</style>




