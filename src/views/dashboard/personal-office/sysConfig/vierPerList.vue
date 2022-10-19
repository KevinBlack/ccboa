/**
* create by zx on 2020/8/6 14:57
* 类注释：
* 备注：
*/
<template>
  <div>
    <el-tabs @tab-click="handleTabsClick" v-model="activeName">
      <el-tab-pane label="个人" name="tabs-look"></el-tab-pane>
      <el-tab-pane label="群组" name="tabs-sleep"></el-tab-pane>
    </el-tabs>

    <el-row style="margin-bottom: 10px" :gutter="20" v-if="activeName=='tabs-look'">
      <el-col :span="6">
        <el-button type="primary" @click="fileAdd">新建</el-button>
        <el-button type="danger" @click="deleteSelect">删除</el-button>
      </el-col>
    </el-row>

    <el-row v-if="activeName=='tabs-sleep'">
      <fd-form :data="formDataSelect" :columns="formCfg" @event="btnevent"></fd-form>
    </el-row>

    <div class="vierPerList">
      <div class="infotable">
        <m-table :sortable="sortable" :isSingle="false" @refresh="refreshData()" @cellClick="cellClick" size="medium" :isSelection="true" @select="select" :searchData="searchData" :tableData="tableData" :tableCols="tableCols" :pagination="pagination"></m-table>
      </div>
    </div>
  </div>
</template>

<script>
import mTable from 'components/table/tTable'
import FdForm from 'vue-elementui-freedomen/components/form'

export default {
  name: 'vierPerList',
  components: {
    mTable,
    FdForm,
  },
  props: {},
  data() {
    return {
      formDataSelect: {},
      activeName: '',
      selectRows: [],
      searchData: {
        groupClass: '本行群组',
        sort: '',
        // orders: '',
        sortKey: '',
      },
      tableData: [],
      oldData: [],
      tableCols: [
        { label: '序号', prop: 'sort' },
        { label: '姓名', prop: 'contacterName' },
        { label: '部门', prop: 'deptName' },
      ],
      formCfg: [
        {
          type: 'select',
          prop: 'groupClass',
          span: 6,
          placeholder: '本行群组',
          style: { marginLeft: '-60px', width: '180px' },
          options: { 1: '本行群组', 2: '他行群组', 3: '本部群组' },
        },
        {
          type: 'button-primary',
          prop: 'createData',
          span: 3,
          style: { marginLeft: '-95px' },
          value: '新建本行群组',
        },
        {
          type: 'button-primary',

          span: 3,
          value: '选择他行群组',
          style: { marginLeft: '-105px' },
        },
        {
          type: 'button-primary',

          span: 3,
          value: '新建本部群组',
          style: { marginLeft: '-115px' },
        },
        {
          type: 'button-danger',
          style: { marginLeft: '-120px' },

          span: 2,
          value: '删除',
        },
      ],
      flag: '0', //更新列表页用来判断
      //查看人员
      tableCols2: [
        { label: '序号', prop: 'sort' },
        { label: '姓名', prop: 'contacterName' },
        { label: '部门', prop: 'deptName' },
      ],
      // 查看群组
      tableCols1: [
        { label: '序号', prop: 'sort' },
        { label: '群组名', prop: 'groupName' },
        { label: '群组成员', prop: 'groupMembersCns' },
      ],
      tableColsDep: [
        { label: '序号', prop: 'sort' },
        { label: '群组名', prop: 'groupName' },
        { label: '群组成员', prop: 'groupMembersCns' },
      ],
      sortable: true,
      selectRowData: [],
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 20,
      },
    }
  },
  computed: {},

  methods: {
    refreshData() {
      console.log(this.flag)
      if (this.flag === '0') {
        this.loadData()
      } else if (this.flag === '1') {
        this.$set(this.searchData,"orders",this.searchData.sort)
        // this.searchData.orders = this.searchData.sort
        delete this.searchData.sort
        this.loadGroupData()
      }
    },
    btnevent(params) {
      // console.log(params);
      switch (params.value) {
        case '1':
          this.searchData.groupClass = '本行群组'
          this.loadGroupData()

          break
        case '2':
          this.searchData.groupClass = '他行群组'
          this.loadGroupData()

          break
        case '3':
          this.searchData.groupClass = '部门'
          this.loadGroupData()
          break
        case '新建本行群组':
          this.creatGroup()
          break
        case '选择他行群组':
          this.creatOtherGroup()
          break
        case '新建本部群组':
          this.creatDepart()
          break
        case '删除':
          this.deleteGroupSelect()
          break
      }
    },
    //新建本行群组
    creatGroup() {
      this.$router.push({
        path: '/dashboard/personalOffice/sysConfig/createGroup',
        query: {
          isAdd: JSON.stringify(true),
        },
      })
    },
    //新建本部
    creatDepart() {
      this.$router.push({
        path: '/dashboard/personalOffice/sysConfig/headquarter',
        query: {
          isAdd: JSON.stringify(true),
        },
      })
    },
    //新建他行群组
    creatOtherGroup() {
      this.$router.push({
        path: '/dashboard/personalOffice/sysConfig/otherGroup',
      })
    },
    //人员新建
    fileAdd() {
      this.$router.push({
        path: '/dashboard/personalOffice/sysConfig/vierPer',
        query: {
          isAdd: JSON.stringify(true),
        },
      })
    },
    handleTabsClick(tab) {
      this.selectRowData = []
      this.tableData = []
      if (tab.index == 0) {
        //个人列表
        this.flag = '0'
        this.tableCols = this.tableCols2
        this.loadData()
      } else if (tab.index == 1) {
        console.log(this.searchData.groupClass, '获取群组选项')
        // 群组列表
        this.tableCols = this.tableCols1
        this.flag = '1'
        this.$set(this.searchData, 'groupClass', this.searchData.groupClass)
        //改变排序字段
        this.searchData.sortKey = 'sort'
        this.$set(this.searchData,"orders",this.searchData.sort)
        // this.searchData.orders = this.searchData.sort
        delete this.searchData.sort
        console.log('----', this.searchData)
        this.loadGroupData()
      }
    },
    select(row) {
      this.selectRowData = row
    },

    loadGroupData() {
      console.log(this.selectRowData)
      this.selectRowData = []
      this.$api.dailyWork
        .getVierList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          console.log(res, '获取群组')
          this.tableData = res.data
          this.pagination.total = res.total
        })
    },
    loadData() {
      this.$api.dailyWork
        .getVierPerList(this.searchData, {
          PAGE_JUMP: this.pagination.pageNum,
          REC_IN_PAGE: this.pagination.pageSize,
        })
        .then((res) => {
          this.tableData = res.data
          this.pagination.total = res.total
        })
    },
    //删除
    deleteSelect() {
      if (this.selectRowData.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择数据',
        })
      } else {
        let ids = []
        this.selectRowData.forEach((item) => {
          ids.push(item.id)
        })
        this.$api.dailyWork.deleteVierPer({ ids: ids }).then((res) => {
          this.loadData()
          this.$message({
            type: 'success',
            message: '删除成功',
          })
          // this.selectRowData=[]
        })
      }
    },

    deleteGroupSelect() {
      console.log(this.selectRowData)
      if (this.selectRowData.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择数据',
        })
      } else {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          let ids = []

          this.selectRowData.forEach((item) => {
            ids.push(item.id)
          })
          console.log(ids)
          this.$api.dailyWork.deleteGroup({ ids: ids }).then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功！',
            })
            this.selectRowData = []
            this.loadGroupData()
          })
        })
      }
    },

    save() {
      let obj = {
        oldData: this.oldData,
        tableData: this.tableData,
      }
      this.$api.dailyWork.saveSort(obj).then((res) => {
        this.$message({
          type: 'success',
          message: '保存成功！',
        })
      })
    },
    getName() {
      // if(this.$route.query){

      // }
      console.log('r', this.$route.query)

      if (this.$route.query.activeName === 'tabs-sleep') {
        this.activeName = 'tabs-sleep'
        this.tableCols = this.tableCols1
        this.$set(this.searchData, 'groupClass', '本行群组')
        this.flag = '1'
        this.loadGroupData()
      } else if (this.$route.query.activeName === 'tabs-look') {
        this.activeName = 'tabs-look'
        this.flag = '0'
        this.tableCols = this.tableCols2
        this.loadData()
      } else {
        this.activeName = 'tabs-look'
        this.flag = '0'
        this.tableCols = this.tableCols2
        this.loadData()
      }
      console.log('a', this.activeName)
    },
    cellClick(row) {
      if (this.activeName == 'tabs-sleep') {
        if (this.searchData.groupClass == '部门') {
          //部门详情
          this.$router.push({
            path: '/dashboard/personalOffice/sysConfig/headquarter',
            query: {
              detail: JSON.stringify(row),
              isAdd: JSON.stringify(false),
            },
          })
        } else if (this.searchData.groupClass == '他行群组') {
          this.$router.push({
            path: '/dashboard/personalOffice/sysConfig/headquarterGroup',
            query: {
              detail: JSON.stringify(row),
              isAdd: JSON.stringify(false),
            },
          })
        } else if (this.searchData.groupClass == '本行群组') {
          this.$router.push({
            path: '/dashboard/personalOffice/sysConfig/createGroup',
            query: {
              detail: JSON.stringify(row),
              isAdd: JSON.stringify(false),
            },
          })
        }
      } else if (this.activeName == 'tabs-look') {
        this.$router.push({
          path: '/dashboard/personalOffice/sysConfig/vierPer',
          query: {
            detail: JSON.stringify(row),
            isAdd: JSON.stringify(false),
          },
        })
      }
    },
  },
  activated() {},
  mounted() {},

  created() {
    if (this.activeName === 'tabs-look') {
      this.loadData()
    }
    this.getName()
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.vierPerList {
  width: 100%;
  height: 100%;
  min-height: 80vh;
  display: flex;
  .infotable {
    width: 92%;
  }
  // .btn-aside {
  //   position: fixed;
  //   top: 260px;
  //   left: 92%;
  //   display: flex;
  //   flex-direction: column;
  // }
  // .bottom {
  //   flex: 1;
  //   //  background: red;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;

  //   .el-button {
  //     margin: 8px;
  //   }

  //   #btnfirst {
  //     margin-top: 0;
  //   }
  // }
}
</style>
