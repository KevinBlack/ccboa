<template>
  <div>
    <el-tabs v-model="moduleId" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in tabList" :label="item.label" :name="item.name" :key="index">
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" v-if="this.isKeys!='0'" @click="createData" style="margin:16px">新增</el-button>
    <el-button type="danger" v-if="this.isKeys!='0'" @click="deleteData" style="margin:16px">删除</el-button>
    <m-table @refresh="loadData()" @selection-change="getRowDatas(row)" @select="select" @cellClick="jumpdeal" size="medium" :isPagination="true" :isHandle="false" :tableData="tableData" :tableCols="tableCols" :pagination="pagination" :isSelection="true" :searchData="searchData"></m-table>
  </div>
</template>

<script >
import mTable from '@/components/table/tTable'

export default {
  name: 'linkTable',
  components: {
    mTable,
  },
  data() {
    return {
      moduleId: '个人链接',
      tabList: [
        { name: '个人链接', label: '个人链接' },
        { name: '公共链接', label: '公共链接' },
      ],
      keys: '0',
      isKeys: '',
      searchData: {},
      deleteArry: [],
      tableData: [],
      tableCols: [
        { label: '序号', prop: 'hyDnr' },
        { label: '链接名称', prop: 'hyName' },
        { label: '链接地址', prop: 'hyAddress' },
        { 
          label: '公用地址', 
          prop: 'keys', 
          formatter(row) {
            if(row.keys == '0'){
              return '否'
            }else if(row.keys == '1'){
              return '是'
            }
          }
        },
      ],
      pagination: {
        pageNum: 1,
        total: 10,
        pageSize: 20,
      },
      perLink: {},
    }
  },
  methods: {
    createData() {
      this.$router.push({
        name: 'linkDeal',
        query: {
          titleLabel: this.moduleId,
        },
      })
    },
    loadData() {
      this.$api.dailyWork_sysConfig
        .viewLinkPer(
          {
            keys: this.keys,
            searchData: this.searchData,
          },
          {
            PAGE_JUMP: this.pagination.pageNum,
            REC_IN_PAGE: this.pagination.pageSize,
          }
        )
        .then((res) => {
          this.pagination.total = res.total
          this.tableData = res.data
          if (this.tableData.length>0 && this.keys == '1') {
            this.isKeys = this.tableData[0].isKeys
          }
        })
    },
    jumpdeal(val) {
      this.perLink = val
      this.$router.push({
        name: 'linkDeal',
        query: {
          linkData: val,isKeys:this.isKeys
        },
      })
    },
    deleteData() {
      if(this.deleteArry.length == '0'){
        this.$message({
            type:"warning",
            message:'请选择数据'
        })
      }else{
        this.$confirm("是否确定删除当前数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
        .then(() => {
            this.$api.dailyWork_sysConfig.deleteLink(
                {id: this.deleteArry}
            ).then(res => {
                if (res.code == "SUCCESS") {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.deleteArry=''
                    this.loadData()
                }
            })
        })
        .catch(() => {
        });
      }
    },
    select(row) {
      let dataArry = []
      row.map(function (value, index) {
        dataArry.push(value.id)
      })
      this.deleteArry = dataArry.join(',')
    },
    handleClick(tab, event) {
      switch (tab.name) {
        case '个人链接':
          this.keys = '0'
          this.loadData()
          this.isKeys = ""
          break
        case '公共链接':
          this.keys = '1'
          this.loadData()
          break
      }
      this.tabLabel = this.moduleId
    },
  },
  created() {
    this.loadData()
  },
}
</script>
<style scoped lang="less">
</style>
